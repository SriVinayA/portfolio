import { useEffect, useRef, useState } from "react";
import { Search, X, Square, CornerDownLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useStreamingChat } from "@/hooks/useStreamingChat";



export function ChatCommandPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { messages, status, sendMessage, stop, reset } = useStreamingChat();
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const feedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    // Focus after mount animation
    const t = setTimeout(() => inputRef.current?.focus(), 60);
    return () => {
      document.removeEventListener("keydown", handleKey);
      clearTimeout(t);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight;
    }
  }, [messages, status]);

  if (!open) return null;

  const isStreaming = status === "streaming";
  const hasThread = messages.length > 0;

  const submit = (text?: string) => {
    const value = (text ?? input).trim();
    if (!value || isStreaming) return;
    setInput("");
    void sendMessage(value);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4 bg-zinc-950/25 backdrop-blur-[2px] animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white dark:bg-card rounded-2xl shadow-2xl ring-1 ring-black/10 dark:ring-white/10 overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95 slide-in-from-top-4 duration-200"
        onClick={(e) => e.stopPropagation()}
      >


        {/* Content */}
        <div ref={feedRef} className="flex-1 overflow-y-auto">
          {!hasThread ? (
            <div className="p-8 flex flex-row items-center justify-center text-left gap-6">
              <img
                src="/panda-hi.png"
                alt="Panda saying hi"
                className="w-64 h-64 mb-6 rounded-2xl shadow-sm object-cover"
                // className="w-28 h-28 rounded-2xl shadow-sm object-cover shrink-0"
              />
              <div>
                <h3 className="font-excalifont text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-2">
                  Hi, I am Vinay's AI assistant.
                </h3>
                <p className="font-excalifont text-sm text-zinc-500 dark:text-zinc-400 max-w-[250px] leading-relaxed">
                  You can ask anything about his experience, projects, or stack here.
                </p>
              </div>
            </div>
          ) : (
            <div className="p-6 space-y-6">
              {messages.map((m) => (
                <div key={m.id} className={m.role === "user" ? "flex justify-end" : ""}>
                  {m.role === "user" ? (
                    <div className="max-w-[85%]">
                      <div className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 mb-1 text-right">
                        You
                      </div>
                      <div className="bg-accent text-accent-foreground px-4 py-2.5 rounded-2xl rounded-tr-md text-sm leading-relaxed">
                        {m.content}
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-3 max-w-full">
                      <div className="size-8 rounded-full bg-accent flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-[11px] font-serif italic text-accent-foreground">
                          A
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 mb-1">
                          Assistant
                        </div>
                        <div className="text-sm leading-relaxed text-zinc-800 dark:text-zinc-300 prose prose-sm max-w-none prose-p:my-2 prose-p:leading-relaxed prose-strong:text-page-fg prose-code:text-accent prose-code:bg-zinc-50 dark:prose-code:bg-white/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-a:text-accent prose-ul:my-2 prose-li:my-0.5">
                          {m.content ? (
                            <ReactMarkdown>{m.content}</ReactMarkdown>
                          ) : (
                            <span className="inline-flex gap-1 py-2">
                              <span
                                className="size-1.5 bg-accent/50 rounded-full animate-pulse"
                                style={{ animationDelay: "0ms" }}
                              />
                              <span
                                className="size-1.5 bg-accent/50 rounded-full animate-pulse"
                                style={{ animationDelay: "150ms" }}
                              />
                              <span
                                className="size-1.5 bg-accent/50 rounded-full animate-pulse"
                                style={{ animationDelay: "300ms" }}
                              />
                            </span>
                          )}
                          {isStreaming && m === messages[messages.length - 1] && m.content && (
                            <span className="inline-block w-1.5 h-4 ml-0.5 bg-accent/60 align-middle animate-pulse" />
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Input row */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
          className="px-4 py-3 border-t border-zinc-100 dark:border-white/10 flex items-center gap-3 bg-white dark:bg-card"
        >
          <Search className="size-4 shrink-0 text-zinc-400" strokeWidth={2.25} />
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Ask about Vinay's experience, projects, or stack…"
            className="flex-1 bg-transparent border-none !outline-none text-base placeholder:text-zinc-400 py-1 text-page-fg"
            autoComplete="off"
          />
          {isStreaming ? (
            <button
              type="button"
              onClick={stop}
              className="inline-flex items-center gap-1.5 px-2 py-1 text-[11px] font-medium text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-white/10 rounded hover:bg-zinc-200 dark:hover:bg-white/20 transition-colors"
            >
              <Square className="size-3 fill-current" />
              Stop
            </button>
          ) : hasThread ? (
            <button
              type="button"
              onClick={() => {
                reset();
                setInput("");
                inputRef.current?.focus();
              }}
              className="text-[11px] font-medium text-zinc-500 hover:text-page-fg transition-colors"
            >
              Clear
            </button>
          ) : (
            <span className="text-[10px] font-semibold text-zinc-400 border border-zinc-200 px-1.5 py-0.5 rounded">
              ESC
            </span>
          )}
          <button
            type="button"
            onClick={onClose}
            className="text-zinc-400 hover:text-page-fg transition-colors sm:hidden"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
