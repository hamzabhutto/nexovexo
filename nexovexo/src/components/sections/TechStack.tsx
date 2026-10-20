import Reveal from "@/components/Reveal";
import TechIcon from "@/components/TechIcon";

type Tech = { slug: string; label: string };

const groups: { heading: string; items: Tech[] }[] = [
  {
    heading: "Languages & frameworks",
    items: [
      { slug: "typescript", label: "TypeScript" },
      { slug: "react", label: "React" },
      { slug: "nextdotjs", label: "Next.js" },
      { slug: "nodedotjs", label: "Node.js" },
      { slug: "python", label: "Python" },
      { slug: "go", label: "Go" },
      { slug: "tailwindcss", label: "Tailwind" },
      { slug: "postgresql", label: "PostgreSQL" },
    ],
  },
  {
    heading: "Cloud, infra & delivery",
    items: [
      { slug: "docker", label: "Docker" },
      { slug: "kubernetes", label: "Kubernetes" },
      { slug: "terraform", label: "Terraform" },
      { slug: "vercel", label: "Vercel" },
    ],
  },
];

export default function TechStack() {
  return (
    <section id="stack" className="relative scroll-mt-24 border-y border-white/[0.06] bg-white/[0.012] py-28">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-cyan">
              Our tech stack
            </span>
            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
              Built on tools we trust
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              A modern, battle-tested stack we use every day to ship fast,
              reliable software.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 space-y-12">
          {groups.map((group, gi) => (
            <div key={group.heading}>
              <Reveal>
                <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-muted-dim">
                  {group.heading}
                </h3>
              </Reveal>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {group.items.map((t, i) => (
                  <Reveal key={t.slug} delay={(i % 4) * 70 + gi * 40}>
                    <div className="group flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.015] p-5 transition-colors duration-300 hover:border-brand-blue/30 hover:bg-white/[0.035]">
                      <TechIcon slug={t.slug} className="h-9 w-9 shrink-0" />
                      <span className="text-[15px] font-medium text-foreground">{t.label}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
