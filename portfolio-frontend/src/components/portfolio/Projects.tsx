import { projects } from "@/lib/profile";
import { ArrowUpRight } from "lucide-react";

export function Projects() {
  return (
    <section id="projects" className="bg-zinc-100/60 py-24 md:py-32 border-y border-zinc-200/60">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500 mb-6">
            Featured Builds
          </h2>
          <h3 className="font-serif text-3xl md:text-4xl font-medium leading-tight max-w-[24ch] text-page-fg italic">
            Three things I've built that I care about.
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((p) => (
            <article
              key={p.name}
              className="group bg-white rounded-2xl ring-1 ring-black/5 overflow-hidden flex flex-col"
            >
              <div className="aspect-[16/10] overflow-hidden bg-zinc-50 border-b border-zinc-100">
                <img
                  src={p.cover}
                  alt={`${p.name} cover`}
                  loading="lazy"
                  width={1024}
                  height={640}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-baseline justify-between mb-2">
                  <h4 className="font-serif text-2xl font-medium text-page-fg">{p.name}</h4>
                  {p.link !== "#" && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-accent transition-colors"
                      aria-label={`Open ${p.name}`}
                    >
                      <ArrowUpRight className="size-4" strokeWidth={2.25} />
                    </a>
                  )}
                </div>
                <p className="text-sm text-zinc-500 italic mb-4 font-serif">{p.tagline}</p>
                <p className="text-sm text-zinc-600 leading-relaxed mb-5 flex-1">
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-zinc-100">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 bg-zinc-50 text-zinc-600 text-[11px] rounded ring-1 ring-black/5"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
