
## Plan: Vinay Appari's Portfolio + AI Chat

Build a single-page editorial portfolio with a Cmd+K command-palette style AI chatbot streaming from the existing Spring Boot backend.

### Design system
- Fonts: Newsreader (serif, italic display) + Inter (sans body), loaded via `<link>` in `__root.tsx`.
- Tokens in `src/styles.css`: page bg `#fafafa`, fg `#18181b`, accent forest-green `#166534` (as oklch), zinc scale via Tailwind.
- Semantic tokens only — no hardcoded hex in components.

### Content (from uploaded profile)
- Hero: name, italic serif tagline, one-line summary, CTAs → "Ask the AI" (opens Cmd+K) + "GitHub".
- Professional Trajectory: horizontal snap-scroll cards for Qualcomm → Toyota → LJA Engineering → Centene → Mindmade (real companies/locations from the markdown, not placeholder copy).
- Technical Craft: skills grouped by real categories (Backend, Frontend, Cloud & DevOps, Databases, AI/LLM, Languages) as chip clusters.
- Featured Projects: BoltFetch, TalentTrek, Portfolio Website — each with generated abstract cover image, tech stack, description, links.
- Key Strengths: compact list.
- Education + closing quote.
- Footer: LinkedIn, GitHub, email, "Available for hire" status.

### AI Chatbot (Cmd+K command palette)
- Trigger: nav button, floating hint, or `Cmd/Ctrl+K` keyboard shortcut.
- Overlay modal (shadcn Dialog) matching prototype: search-style input, suggested queries when empty, streaming message thread when active.
- Session-only history in component state (no persistence).
- Suggested prompts: "What's his experience with Kafka?", "Tell me about BoltFetch", "Summarize his AI/LLM work", "Java vs Rust experience?".
- Streaming: `fetch('http://localhost:8080/api/chat/stream', { method: 'POST', body: JSON.stringify({ message }) })` → read response body as a ReadableStream, decode chunks, append tokens to the current assistant message. Handle SSE `data:` framing defensively (parse lines starting with `data:` and join; fall back to raw text if plain stream).
- API base URL via `VITE_CHAT_API_URL` env var, defaulting to `http://localhost:8080`. Documented in a comment for later swap.
- UI states: idle (suggestions), streaming (typing pulse), complete, error (retry).
- Assistant messages: no bubble background (per chat-ui-composition); user messages: accent bg + white text.
- Markdown rendering via `react-markdown` for assistant output.

### Routing / structure
- Rewrite `src/routes/index.tsx` as the portfolio (no new route).
- Update `__root.tsx` head: real title "Vinay Appari — Full Stack Java Developer", description, og tags. Add Google Fonts `<link>`.
- Components under `src/components/portfolio/`: `Nav`, `Hero`, `Trajectory`, `Skills`, `Projects`, `Strengths`, `Footer`, `ChatCommandPalette`.
- Hook: `src/hooks/useStreamingChat.ts` — manages messages array, `sendMessage(text)`, aborts in-flight streams.

### Assets
- Generate 3 abstract cover images (BoltFetch, TalentTrek, Portfolio) via `imagegen` in monochrome/accent style matching the editorial aesthetic. Import as ES6.

### Files to create/modify
```text
src/routes/__root.tsx          (update head + font link)
src/routes/index.tsx           (rewrite as portfolio page)
src/styles.css                 (add tokens: accent, serif/sans font vars)
src/lib/profile.ts             (typed profile data extracted from markdown)
src/hooks/useStreamingChat.ts  (new)
src/components/portfolio/Nav.tsx
src/components/portfolio/Hero.tsx
src/components/portfolio/Trajectory.tsx
src/components/portfolio/Skills.tsx
src/components/portfolio/Projects.tsx
src/components/portfolio/Strengths.tsx
src/components/portfolio/Footer.tsx
src/components/portfolio/ChatCommandPalette.tsx
src/assets/boltfetch-cover.jpg
src/assets/talenttrek-cover.jpg
src/assets/portfolio-cover.jpg
```

### Deps
- `react-markdown` for streaming markdown.
- `bun add react-markdown`.

### Notes / caveats
- The API is at `localhost:8080`; browsers on a hosted preview cannot reach it. This will only work when the user runs the Spring Boot backend locally alongside the site. CORS on the backend must allow the preview origin — flagged in a short README note but not fixed here.
- No persistence, no accounts, no Lovable Cloud needed.
