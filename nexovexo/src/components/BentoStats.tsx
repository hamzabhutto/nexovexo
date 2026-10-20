import CountUp from "@/components/CountUp";
import Reveal from "@/components/Reveal";

/**
 * Modern "bento" stats grid — asymmetric cards, each a mini data snapshot with
 * an animated count-up figure and a small inline visualization. Reads like a
 * live dashboard tile set.
 */

function Sparkline({ color }: { color: string }) {
  // A gentle upward trend line with a soft area fill.
  return (
    <svg viewBox="0 0 120 40" className="h-10 w-full" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id={`sl-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity="0.35" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0 34 L20 28 L40 30 L60 20 L80 22 L100 10 L120 6 L120 40 L0 40 Z" fill={`url(#sl-${color.replace("#", "")})`} />
      <path d="M0 34 L20 28 L40 30 L60 20 L80 22 L100 10 L120 6" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MiniBars({ color }: { color: string }) {
  const h = [40, 65, 50, 80, 70, 95];
  return (
    <div className="flex h-10 items-end gap-1.5">
      {h.map((v, i) => (
        <span key={i} className="flex-1 rounded-sm" style={{ height: `${v}%`, background: color, opacity: 0.35 + (i / h.length) * 0.65 }} />
      ))}
    </div>
  );
}

function Ring({ pct, color }: { pct: number; color: string }) {
  const r = 20;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 48 48" className="h-12 w-12 -rotate-90" aria-hidden>
      <circle cx="24" cy="24" r={r} fill="none" stroke="var(--surface-3)" strokeWidth="5" />
      <circle cx="24" cy="24" r={r} fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - pct / 100)} />
    </svg>
  );
}

export default function BentoStats() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:grid-rows-2">
      {/* Big hero stat — spans 2x2 on larger screens */}
      <Reveal className="col-span-2 sm:row-span-2">
        <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/[0.07] bg-gradient-to-br from-brand-blue/15 via-white/[0.02] to-transparent p-7">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-blue/20 blur-3xl" aria-hidden />
          <div className="relative">
            <p className="text-sm font-medium text-muted">Projects delivered</p>
            <div className="mt-3 font-display text-6xl font-bold tracking-tight text-foreground sm:text-7xl">
              <CountUp to={40} suffix="+" />
            </div>
          </div>
          <div className="relative mt-6">
            <Sparkline color="#3f74ff" />
            <p className="mt-3 text-xs text-muted-dim">Shipped across web, mobile, cloud &amp; AI</p>
          </div>
        </div>
      </Reveal>

      {/* Uptime with ring */}
      <Reveal delay={80}>
        <div className="flex h-full flex-col justify-between rounded-3xl border border-white/[0.07] bg-white/[0.015] p-5">
          <div className="flex items-start justify-between">
            <p className="text-sm font-medium text-muted">Uptime</p>
            <Ring pct={99} color="#22d3ee" />
          </div>
          <div className="mt-4 font-display text-3xl font-bold text-foreground">
            <CountUp to={99.9} decimals={1} suffix="%" />
          </div>
        </div>
      </Reveal>

      {/* Avg load time */}
      <Reveal delay={140}>
        <div className="flex h-full flex-col justify-between rounded-3xl border border-white/[0.07] bg-white/[0.015] p-5">
          <p className="text-sm font-medium text-muted">Avg. load time</p>
          <div className="mt-3 font-display text-3xl font-bold text-brand-cyan">
            <CountUp to={1.2} decimals={1} suffix="s" />
          </div>
          <div className="mt-3">
            <MiniBars color="#22d3ee" />
          </div>
        </div>
      </Reveal>

      {/* Satisfaction */}
      <Reveal delay={200}>
        <div className="flex h-full flex-col justify-between rounded-3xl border border-white/[0.07] bg-white/[0.015] p-5">
          <div className="flex items-start justify-between">
            <p className="text-sm font-medium text-muted">Satisfaction</p>
            <Ring pct={96} color="#a855f7" />
          </div>
          <div className="mt-4 font-display text-3xl font-bold text-foreground">
            <CountUp to={96} suffix="%" />
          </div>
        </div>
      </Reveal>

      {/* Support */}
      <Reveal delay={260}>
        <div className="flex h-full flex-col justify-between rounded-3xl border border-white/[0.07] bg-white/[0.015] p-5">
          <p className="text-sm font-medium text-muted">Support</p>
          <div className="mt-3 font-display text-3xl font-bold text-foreground">24/7</div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-green-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
            </span>
            online now
          </div>
        </div>
      </Reveal>
    </div>
  );
}
