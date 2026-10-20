import type { Metadata } from "next";
import BookingForm from "@/components/BookingForm";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Book a Free Consultation",
  description:
    "Schedule a free 30-minute consultation with NexoVexo. Tell us about your project and we'll map out next steps.",
};

const points = [
  "A 30-minute, no-obligation call",
  "Talk through your goals and challenges",
  "Get a clear, honest recommendation",
  "Walk away with concrete next steps",
];

export default function BookPage() {
  return (
    <section className="relative overflow-hidden pt-36 pb-28 sm:pt-40">
      <div className="aurora" aria-hidden />
      <div className="grid-backdrop absolute inset-0" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* Left: pitch */}
          <div className="lg:pt-6">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-2/60 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-cyan">
                Free consultation
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-5 text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl">
                Let&apos;s talk about <span className="brand-text">what you&apos;re building</span>
              </h1>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
                Pick a day and time that works for you. We&apos;ll jump on a quick
                call to understand your project and show you how we&apos;d approach
                it — no pressure, no fees.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <ul className="mt-8 space-y-3">
                {points.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-sm text-muted">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full brand-gradient text-white">
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Right: booking form */}
          <Reveal delay={120}>
            <BookingForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
