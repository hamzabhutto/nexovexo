import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import Carousel from "@/components/Carousel";
import { getServices, splitLines } from "@/lib/data";

// The specialty section already tells the AI-security/ops/platform story,
// so this section is the broader "build & delivery" catalogue, shown as a
// calm horizontal carousel the visitor swipes through.
const SPECIALTY_SLUGS = [
  "ai-aware-devsecops",
  "ai-assisted-operations",
  "secure-ai-agent-operations",
  "platform-engineering-cloud",
];

type ServiceRecord = Awaited<ReturnType<typeof getServices>>[number];

export default async function Services() {
  const services = await getServices();
  const items = services.filter((s) => !SPECIALTY_SLUGS.includes(s.slug));

  return (
    <section id="services" className="relative scroll-mt-24 py-28">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-cyan">
                Build &amp; delivery
              </span>
              <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
                Everything you need to ship
              </h2>
            </div>
            <p className="max-w-sm text-sm text-muted">
              From web and mobile to microservices, AI integration and low-code —
              swipe to explore.
            </p>
          </div>
        </Reveal>

        <div className="mt-14">
          <Carousel>
            {items.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service: s }: { service: ServiceRecord }) {
  return (
    <article className="group flex w-[380px] shrink-0 snap-start flex-col rounded-3xl bg-white p-8 shadow-xl shadow-black/30 ring-1 ring-black/5 transition-transform duration-300 hover:-translate-y-1.5 sm:w-[420px]">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl brand-gradient text-white">
        <Icon name={s.icon} className="h-7 w-7" />
      </div>
      <h3 className="mt-6 text-2xl font-semibold tracking-tight text-neutral-900">{s.title}</h3>
      <p className="mt-3 text-[15px] leading-relaxed text-neutral-600">{s.summary}</p>
      <ul className="mt-6 flex-1 space-y-2.5 border-t border-black/10 pt-6">
        {splitLines(s.features).slice(0, 4).map((f) => (
          <li key={f} className="flex items-center gap-2.5 text-sm text-neutral-700">
            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-green-500/15 text-green-600">
              <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            {f}
          </li>
        ))}
      </ul>
      <a
        href="/#contact"
        className="group/cta mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue transition-colors hover:text-brand-violet"
      >
        Contact us
        <span className="transition-transform duration-300 group-hover/cta:translate-x-1">→</span>
      </a>
    </article>
  );
}
