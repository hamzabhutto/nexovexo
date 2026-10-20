import Reveal from "@/components/Reveal";
import Carousel from "@/components/Carousel";
import { getProjects, splitCommas } from "@/lib/data";

const coverMap: Record<string, string> = {
  cyan: "from-brand-cyan/20 to-transparent",
  blue: "from-brand-blue/20 to-transparent",
  violet: "from-brand-violet/20 to-transparent",
};

export default async function Work() {
  const projects = await getProjects();

  return (
    <section id="work" className="relative scroll-mt-24 py-28">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-cyan">
                Selected work
              </span>
              <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
                Products we&apos;ve shipped
              </h2>
            </div>
            <a href="/#contact" className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-brand-cyan transition-colors hover:text-foreground">
              Have a project in mind?
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </Reveal>

        <div className="mt-14">
          <Carousel>
            {projects.map((p) => (
              <article
                key={p.id}
                className="group flex w-[400px] shrink-0 snap-start flex-col overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.015] transition-colors duration-300 hover:border-brand-blue/30 hover:bg-white/[0.03] sm:w-[440px]"
              >
                <div className={`relative flex h-52 items-center justify-center bg-gradient-to-br ${coverMap[p.coverColor] ?? coverMap.blue}`}>
                  <span className="relative text-7xl font-bold text-foreground/90">
                    {p.title.charAt(0)}
                  </span>
                  <span className="absolute right-4 top-4 rounded-full border border-white/[0.08] bg-background/40 px-3 py-1 text-xs text-muted backdrop-blur">
                    {p.category}
                  </span>
                  {p.featured && (
                    <span className="absolute left-4 top-4 rounded-full bg-brand-blue px-3 py-1 text-xs font-semibold text-white">
                      Featured
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-brand-cyan">
                    {p.title}
                  </h3>
                  {p.client && <p className="mt-1 text-xs text-muted-dim">{p.client}</p>}
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">{p.summary}</p>
                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {splitCommas(p.techStack).slice(0, 4).map((t) => (
                      <span key={t} className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 text-[11px] text-muted">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
