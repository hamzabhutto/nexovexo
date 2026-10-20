"use client";

import { useEffect, useRef, useState } from "react";

type Stage = {
  n: string;
  title: string;
  body: string;
  lines: string[]; // console output that "runs" for this stage
};

const stages: Stage[] = [
  {
    n: "01",
    title: "Discover",
    body: "We define what success actually looks like before anything is built.",
    lines: [
      "▸ gathering requirements",
      "▸ mapping users & constraints",
      "✓ scope & success metrics locked",
    ],
  },
  {
    n: "02",
    title: "Design",
    body: "Architecture and interfaces, validated before a line of production code.",
    lines: [
      "▸ drafting system architecture",
      "▸ prototyping key flows",
      "✓ design approved",
    ],
  },
  {
    n: "03",
    title: "Build",
    body: "Tight iterations, clean tested code, progress you can see weekly.",
    lines: [
      "▸ scaffolding services",
      "▸ running test suite … 142 passed",
      "✓ feature shipped to staging",
    ],
  },
  {
    n: "04",
    title: "Launch & scale",
    body: "We deploy, monitor and keep improving — launch is the start, not the finish.",
    lines: [
      "▸ deploying to production",
      "▸ monitoring: 99.9% uptime",
      "✓ live & scaling",
    ],
  },
];

const STAGE_MS = 3200;

export default function Process() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  const [active, setActive] = useState(0);
  const [typed, setTyped] = useState<string[]>([]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold: 0.35,
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Auto-advance stages.
  useEffect(() => {
    if (!inView) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setActive(stages.length - 1);
      setTyped(stages[stages.length - 1].lines);
      return;
    }
    const id = setInterval(() => setActive((a) => (a + 1) % stages.length), STAGE_MS);
    return () => clearInterval(id);
  }, [inView]);

  // Reveal the active stage's console lines one by one.
  useEffect(() => {
    if (!inView) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lines = stages[active].lines;
    if (reduce) {
      setTyped(lines);
      return;
    }
    setTyped([]);
    const timers = lines.map((_, i) =>
      setTimeout(() => setTyped(lines.slice(0, i + 1)), 400 + i * 650)
    );
    return () => timers.forEach(clearTimeout);
  }, [active, inView]);

  const fillPct = (active / (stages.length - 1)) * 100;

  return (
    <section id="process" className="relative scroll-mt-24 py-28">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-cyan">
            How we work
          </span>
          <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
            An automated delivery pipeline
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            Every project runs through the same crisp, repeatable stages — so
            delivery is predictable, not improvised.
          </p>
        </div>

        <div ref={ref} className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* Left: vertical stage rail */}
          <div className="relative">
            {/* rail line */}
            <div className="absolute left-[27px] top-4 bottom-4 w-[2px] rounded-full bg-white/[0.08]" aria-hidden />
            <div
              className="absolute left-[27px] top-4 w-[2px] rounded-full brand-gradient transition-[height] duration-700 ease-out"
              style={{ height: `calc(${fillPct}% - 8px)` }}
              aria-hidden
            />

            <ul className="space-y-7">
              {stages.map((s, i) => {
                const isActive = i === active;
                const isDone = i < active;
                return (
                  <li key={s.n} className="relative flex gap-5">
                    <div
                      className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-base font-bold transition-all duration-500 ${
                        isActive
                          ? "brand-gradient scale-105 text-white shadow-[0_0_30px_-6px_rgba(63,116,255,0.8)]"
                          : isDone
                            ? "border border-brand-blue/40 bg-brand-blue/10 text-brand-cyan"
                            : "border border-white/[0.08] bg-background text-muted-dim"
                      }`}
                    >
                      {isDone ? (
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="3">
                          <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : (
                        s.n
                      )}
                    </div>
                    <div className="pt-1.5">
                      <h3 className={`text-lg font-semibold transition-colors duration-500 ${isActive ? "text-foreground" : "text-muted"}`}>
                        {s.title}
                      </h3>
                      <p className={`mt-1.5 text-sm leading-relaxed transition-opacity duration-500 ${isActive ? "text-muted opacity-100" : "text-muted-dim opacity-70"}`}>
                        {s.body}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right: auto-running console */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#07090f] shadow-2xl shadow-black/40">
            <div className="flex items-center gap-2 border-b border-white/[0.06] px-5 py-3.5">
              <span className="h-3 w-3 rounded-full bg-red-400/70" />
              <span className="h-3 w-3 rounded-full bg-amber-400/70" />
              <span className="h-3 w-3 rounded-full bg-green-400/70" />
              <span className="ml-3 font-mono text-xs text-muted-dim">
                nexovexo — {stages[active].title.toLowerCase()}
              </span>
            </div>
            <div className="min-h-[220px] space-y-3 p-6 font-mono text-sm">
              <p className="text-muted-dim">
                <span className="text-brand-cyan">$</span> running stage {stages[active].n} · {stages[active].title}
              </p>
              {typed.map((line, i) => {
                const done = line.startsWith("✓");
                return (
                  <p
                    key={i}
                    className={`${done ? "text-green-400" : "text-muted"} animate-[fade-up_0.4s_ease-out]`}
                  >
                    {line}
                  </p>
                );
              })}
              <span className="inline-block h-4 w-2 animate-pulse bg-brand-cyan align-middle" aria-hidden />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
