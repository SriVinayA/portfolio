import { useCallback, useRef, useState } from "react";

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

// Base URL of the Spring Boot chatbot backend.
// Defaults to http://localhost:8080 for local development.
// To point at a deployed backend, set VITE_CHAT_API_URL at build time.
const CHAT_API_BASE =
  (import.meta.env.VITE_CHAT_API_URL as string | undefined) ?? "http://localhost:8080";

const uid = () => Math.random().toString(36).slice(2, 10);

/**
 * Parse a chunk of text from the /api/chat/stream endpoint.
 * Handles both raw text streaming and text/event-stream `data: ...` framing.
 */
function extractDelta(buffer: string): { text: string; rest: string } {
  // If no SSE framing at all, treat the whole chunk as raw text.
  if (!buffer.includes("data:") && !buffer.includes("\n\n")) {
    return { text: buffer, rest: "" };
  }
  const parts = buffer.split("\n\n");
  const rest = parts.pop() ?? "";
  let text = "";
  for (const evt of parts) {
    const lines = evt.split("\n");
    for (const line of lines) {
      if (line.startsWith("data:")) {
        const payload = line.slice(5).replace(/^ /, "");
        if (payload === "[DONE]") continue;
        // Try JSON first; fall back to raw string.
        try {
          const parsed = JSON.parse(payload);
          if (typeof parsed === "string") text += parsed;
          else if (parsed && typeof parsed.content === "string") text += parsed.content;
          else if (parsed && typeof parsed.delta === "string") text += parsed.delta;
          else text += payload;
        } catch {
          text += payload;
        }
      } else if (line.trim() && !line.startsWith(":")) {
        // Non-SSE line — append as-is.
        text += line;
      }
    }
  }
  return { text, rest };
}

export function useStreamingChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<"idle" | "streaming" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setMessages([]);
    setStatus("idle");
    setError(null);
  }, []);

  const stop = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setStatus("idle");
  }, []);

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = { id: uid(), role: "user", content: trimmed };
    const assistantMsg: ChatMessage = { id: uid(), role: "assistant", content: "" };
    setMessages((m) => [...m, userMsg, assistantMsg]);
    setError(null);
    setStatus("streaming");

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch(`${CHAT_API_BASE}/api/chat/stream`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "text/event-stream" },
        body: JSON.stringify({ message: trimmed }),
        signal: controller.signal,
      });

      if (!res.ok || !res.body) {
        throw new Error(`Request failed (${res.status})`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const { text, rest } = extractDelta(buffer);
        buffer = rest;
        if (text) {
          setMessages((prev) =>
            prev.map((m) => (m.id === assistantMsg.id ? { ...m, content: m.content + text } : m)),
          );
        }
      }

      // Flush any remaining buffered content.
      if (buffer.trim()) {
        const { text } = extractDelta(buffer + "\n\n");
        if (text) {
          setMessages((prev) =>
            prev.map((m) => (m.id === assistantMsg.id ? { ...m, content: m.content + text } : m)),
          );
        }
      }

      setStatus("idle");
    } catch (err) {
      if ((err as Error).name === "AbortError") {
        setStatus("idle");
        return;
      }
      const msg =
        (err as Error).message ??
        "Couldn't reach the chat service. Make sure the backend is running at " + CHAT_API_BASE;
      setError(msg);
      setStatus("error");
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMsg.id && !m.content
            ? {
                ...m,
                content: `_Couldn't reach the chat service._\n\n${msg}\n\nMake sure the Spring Boot backend is running at \`${CHAT_API_BASE}\`.`,
              }
            : m,
        ),
      );
    } finally {
      abortRef.current = null;
    }
  }, []);

  return { messages, status, error, sendMessage, stop, reset };
}
