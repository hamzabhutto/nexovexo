"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Original friendly AI-ops bot illustration (inline SVG, our own design) with
 * floating operation stats around it. No card / borders — it sits open on the
 * page. Stats tick/cycle automatically. Colors follow a fixed vivid order.
 */

const CYAN = "#00E5FF";
const BLUE = "#2F6BFF";
const VIOLET = "#B026FF";
const TEAL = "#00E0A4";
const PINK = "#FF3D8B";
const AMBER = "#FFB020";

export default function OpsOrbit() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  const [logs, setLogs] = useState(0);
  const [fails, setFails] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setLogs(2418);
      setFails(37);
      return;
    }
    const id = setInterval(() => {
      setLogs((n) => n + Math.floor(Math.random() * 40) + 5);
      setFails((n) => (Math.random() > 0.7 ? n + 1 : n));
    }, 1200);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <div ref={ref} className="relative mx-auto flex aspect-square w-full max-w-[420px] items-center justify-center">
      {/* soft ambient glow behind the bot */}
      <div
        className="absolute h-56 w-56 rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${BLUE}33, transparent 70%)` }}
        aria-hidden
      />

      {/* ---- The AI bot (original design) ---- */}
      <svg viewBox="0 0 220 240" className="relative z-10 w-[62%] animate-float" role="img" aria-label="AI operations assistant">
        <defs>
          <linearGradient id="bot-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1b2130" />
            <stop offset="1" stopColor="#11151f" />
          </linearGradient>
          <linearGradient id="bot-visor" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={CYAN} />
            <stop offset="1" stopColor={VIOLET} />
          </linearGradient>
          <linearGradient id="bot-accent" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor={CYAN} />
            <stop offset="1" stopColor={BLUE} />
          </linearGradient>
        </defs>

        {/* antenna */}
        <line x1="110" y1="34" x2="110" y2="14" stroke="url(#bot-accent)" strokeWidth="4" strokeLinecap="round" />
        <circle cx="110" cy="10" r="6" fill={CYAN}>
          <animate attributeName="opacity" values="1;0.3;1" dur="1.6s" repeatCount="indefinite" />
        </circle>

        {/* head */}
        <rect x="52" y="34" width="116" height="92" rx="26" fill="url(#bot-body)" stroke="#2a3346" strokeWidth="2" />
        {/* visor */}
        <rect x="66" y="52" width="88" height="54" rx="18" fill="#0a0e16" />
        <rect x="66" y="52" width="88" height="54" rx="18" fill="url(#bot-visor)" opacity="0.14" />
        {/* eyes */}
        <circle cx="92" cy="80" r="9" fill="url(#bot-visor)">
          <animate attributeName="r" values="9;3;9" dur="4s" begin="1s" repeatCount="indefinite" />
        </circle>
        <circle cx="128" cy="80" r="9" fill="url(#bot-visor)">
          <animate attributeName="r" values="9;3;9" dur="4s" begin="1s" repeatCount="indefinite" />
        </circle>
        {/* smile */}
        <path d="M96 96 q14 10 28 0" fill="none" stroke={CYAN} strokeWidth="3" strokeLinecap="round" opacity="0.8" />

        {/* neck */}
        <rect x="104" y="126" width="12" height="12" fill="#1b2130" />

        {/* body */}
        <rect x="64" y="138" width="92" height="74" rx="22" fill="url(#bot-body)" stroke="#2a3346" strokeWidth="2" />
        {/* chest core */}
        <circle cx="110" cy="172" r="15" fill="#0a0e16" />
        <circle cx="110" cy="172" r="9" fill="url(#bot-accent)">
          <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
        </circle>
        {/* chest status bars */}
        <rect x="86" y="196" width="48" height="4" rx="2" fill="#2a3346" />
        <rect x="86" y="196" width="30" height="4" rx="2" fill={TEAL}>
          <animate attributeName="width" values="12;40;24;40" dur="3s" repeatCount="indefinite" />
        </rect>

        {/* arms */}
        <rect x="46" y="146" width="12" height="40" rx="6" fill="#1b2130" stroke="#2a3346" strokeWidth="2" />
        <rect x="162" y="146" width="12" height="40" rx="6" fill="#1b2130" stroke="#2a3346" strokeWidth="2" />
      </svg>

      {/* ---- Floating stats (no borders) ---- */}
      <Stat className="left-0 top-10" color={CYAN} value={logs.toLocaleString()} label="logs analyzed" />
      <Stat className="right-0 top-20" color={PINK} value={fails.toString()} label="failures caught" />
      <Stat className="bottom-24 left-0" color={TEAL} value="99.9%" label="uptime" />
      <Stat className="bottom-10 right-2" color={AMBER} value="1.3s" label="avg. triage" />
    </div>
  );
}

function Stat({
  className,
  color,
  value,
  label,
}: {
  className: string;
  color: string;
  value: string;
  label: string;
}) {
  return (
    <div className={`absolute z-20 ${className}`}>
      <div className="flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: color, boxShadow: `0 0 8px ${color}` }} />
        <span className="font-mono text-xl font-bold tabular-nums" style={{ color }}>
          {value}
        </span>
      </div>
      <span className="mt-0.5 block text-[11px] text-white/55">{label}</span>
    </div>
  );
}
