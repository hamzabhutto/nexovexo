import CountUp from "@/components/CountUp";
import Reveal from "@/components/Reveal";
import { getSiteStats } from "@/lib/data";

/**
 * Modern "bento" stats grid, driven by the SiteStat records in the database
 * (editable from the admin app). The first stat renders as the large hero
 * tile; the rest fill the smaller tiles.
 */

const colorHex: Record<string, string> = {
  cyan: "#22d3ee",
  blue: "#3f74ff",
  violet: "#a855f7",
  teal: "#2dd4bf",
  pink: "#ec4899",
  amber: "#f59e0b",
  green: "#22c55e",
};

// Parse a display value like "40+", "99.9%", "1.2s", "24/7" into the pieces
// CountUp needs. Non-numeric values (e.g. "24/7") render as-is.
function parseValue(value: string): {
  numeric: boolean;
  to: number;
  decimals: number;
  prefix: string;
  suffix: string;
} {
  const match = value.match(/^(\D*)(\d+(?:\.\d+)?)(\D*)$/);
  if (!match) return { numeric: false, to: 0, decimals: 0, prefix: "", suffix: "" };
  const [, prefix, num, suffix] = match;
  const decimals = num.includes(".") ? num.split(".")[1].length : 0;
  return { numeric: true, to: parseFloat(num), decimals, prefix, suffix };
}

function StatValue({ value, className }: { value: string; className?: string }) {
  const p = parseValue(value);
  if (!p.numeric) return <span className={className}>{value}</span>;
  return (
    <CountUp
      to={p.to}
      decimals={p.decimals}
      prefix={p.prefix}
      suffix={p.suffix}
      className={className}
    />
  );
}

function Sparkline({ color }: { color: string }) {
  const id = `sl-${color.replace("#", "")}`;
  return (
    <svg viewBox="0 0 120 40" className="h-10 w-full" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity="0.35" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0 34 L20 28 L40 30 L60 20 L80 22 L100 10 L120 6 L120 40 L0 40 Z" fill={`url(#${id})`} />
      <path d="M0 34 L20 28 L40 30 L60 20 L80 22 L100 10 L120 6" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
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

export default async function BentoStats() {
  const stats = await getSiteStats();
  if (stats.length === 0) return null;

  const [hero, ...rest] = stats;
  const heroColor = colorHex[hero.color] ?? colorHex.blue;

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:grid-rows-2">
      {/* Large hero stat */}
      <Reveal className="col-span-2 sm:row-span-2">
        <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/[0.07] bg-gradient-to-br from-brand-blue/15 via-white/[0.02] to-transparent p-7">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-blue/20 blur-3xl" aria-hidden />
          <div className="relative">
            <p className="text-sm font-medium text-muted">{hero.label}</p>
            <StatValue
              value={hero.value}
              className="mt-3 block font-display text-6xl font-bold tracking-tight text-foreground sm:text-7xl"
            />
          </div>
          <div className="relative mt-6">
            <Sparkline color={heroColor} />
          </div>
        </div>
      </Reveal>

      {/* Smaller tiles */}
      {rest.map((s, i) => {
        const color = colorHex[s.color] ?? colorHex.cyan;
        const showRing = i % 2 === 0; // alternate ring / plain for variety
        return (
          <Reveal key={s.id} delay={80 + i * 60}>
            <div className="flex h-full flex-col justify-between rounded-3xl border border-white/[0.07] bg-white/[0.015] p-5">
              <div className="flex items-start justify-between">
                <p className="text-sm font-medium text-muted">{s.label}</p>
                {showRing && <Ring pct={s.percent} color={color} />}
              </div>
              <StatValue
                value={s.value}
                className="mt-4 block font-display text-3xl font-bold"
              />
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
