import Reveal from "@/components/Reveal";
import BrandIntro from "@/components/BrandIntro";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-24 sm:pt-44 sm:pb-32">
      {/* backdrops */}
      <div className="aurora" aria-hidden />
      <div className="grid-backdrop absolute inset-0" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal delay={0}>
            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl">
              We build software that
              <br className="hidden sm:block" />{" "}
              <span className="brand-text-animated">moves you forward</span>
            </h1>
          </Reveal>

          <Reveal delay={100}>
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
              NexoVexo is a software house delivering fast, custom websites,
              cloud platforms, and AI-driven products — engineered for
              performance and built to ship.
            </p>
          </Reveal>

          <Reveal delay={180}>
            <div className="mt-10 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
              <a href="/book" className="btn-primary w-full rounded-full px-8 py-4 text-sm font-semibold sm:w-auto">
                Book a free consultation
              </a>
              <a href="#work" className="btn-ghost group inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-semibold sm:w-auto">
                See our work
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </div>
          </Reveal>

          {/* Animated brand lockup: N + EXOVEXO flies in from the header */}
          <div className="relative mt-20 flex justify-center">
            <div className="absolute top-1/2 h-56 w-[32rem] max-w-full -translate-y-1/2 rounded-full bg-brand-blue/15 blur-3xl" aria-hidden />
            <div className="relative">
              <BrandIntro />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
