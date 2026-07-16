import { profile } from "@/lib/profile";
import { ArrowUpRight } from "lucide-react";

export function Hero({ onOpenChat }: { onOpenChat: () => void }) {
  return (
    <section id="top" className="max-w-7xl mx-auto px-6 pt-32 pb-24 md:pb-32">
      <div className="flex items-center gap-2 mb-8">
        <span className="size-2 rounded-full bg-accent shadow-[0_0_10px_theme(colors.emerald.500/40%)]" />
        <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
          Available for Software engineering roles
        </span>
      </div>

      <div className="max-w-[36ch]">
        {/* <h1 className="font-serif text-5xl sm:text-7xl leading-[0.98] text-balance mb-8 font-medium italic text-page-fg">
          {profile.tagline}
        </h1> */}
        <h1 className="font-serif text-4xl sm:text-5xl leading-[0.98] text-balance mb-8 font-medium italic text-page-fg">
          {profile.tagline}
        </h1>
      </div>
      <div className="max-w-[58ch]">
        <p className="font-serif text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed text-pretty mb-10">
          I am a{" "}
          {profile.title} with 7+ years of experience architecting enterprise Java systems, plus
          deep work in <em>Python</em> and <em>C++</em> systems programming, alongside LLM orchestration.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onOpenChat}
            className="bg-accent text-accent-foreground px-6 py-3 rounded-full font-medium ring-1 ring-black/5 hover:brightness-110 transition-all inline-flex items-center gap-2"
          >
            Ask the AI about me
            <ArrowUpRight className="size-4" strokeWidth={2.25} />
          </button>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full font-medium ring-1 ring-zinc-200 dark:ring-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-white dark:hover:bg-white/10 hover:text-page-fg transition-colors inline-flex items-center gap-2"
          >
            GitHub
            <ArrowUpRight className="size-4" strokeWidth={2.25} />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full font-medium ring-1 ring-zinc-200 dark:ring-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-white dark:hover:bg-white/10 hover:text-page-fg transition-colors inline-flex items-center gap-2"
          >
            LinkedIn
            <ArrowUpRight className="size-4" strokeWidth={2.25} />
          </a>
        </div>
      </div>
    </section>
  );
}
