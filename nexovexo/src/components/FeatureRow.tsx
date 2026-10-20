import Reveal from "@/components/Reveal";

type FeatureRowProps = {
  index: number; // used to alternate sides
  eyebrow: string;
  title: React.ReactNode;
  body: string;
  points?: string[];
  visual: React.ReactNode;
};

/**
 * A single storytelling row: text on one side, a visual on the other. Even
 * rows put the visual on the right, odd rows flip it to the left.
 */
export default function FeatureRow({
  index,
  eyebrow,
  title,
  body,
  points = [],
  visual,
}: FeatureRowProps) {
  const flip = index % 2 === 1;

  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
      {/* Text */}
      <Reveal className={flip ? "lg:order-2" : ""}>
        <div>
          {/* Specialty name — enlarged so it reads clearly */}
          <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {eyebrow}
          </h3>
          <p className="mt-3 text-xl font-medium leading-snug text-muted sm:text-2xl">
            {title}
          </p>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
            {body}
          </p>
          {points.length > 0 && (
            <ul className="mt-7 space-y-3">
              {points.map((p) => (
                <li key={p} className="flex items-center gap-3 text-[15px] text-foreground/90">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-green-500/40 bg-green-500/10 text-green-400">
                    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-5">
            <a href="/book" className="btn-primary rounded-full px-6 py-3 text-sm font-semibold">
              Book a consultation
            </a>
            <a href="/#contact" className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand-cyan transition-colors hover:text-foreground">
              Contact us
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </Reveal>

      {/* Visual */}
      <Reveal delay={120} className={flip ? "lg:order-1" : ""}>
        {visual}
      </Reveal>
    </div>
  );
}
