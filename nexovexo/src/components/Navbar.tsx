"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LogoMark } from "./Logo";

const links = [
  { href: "/#services", label: "Services" },
  { href: "/#work", label: "Work" },
  { href: "/#process", label: "Process" },
  { href: "/#stack", label: "Stack" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? Math.min(window.scrollY / h, 1) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Measure the bar so the SVG border rect matches its size exactly.
  useEffect(() => {
    const measure = () => {
      const el = barRef.current;
      if (el) setSize({ w: el.offsetWidth, h: el.offsetHeight });
    };
    measure();
    window.addEventListener("resize", measure);
    const id = setInterval(measure, 500); // catch the top<->scrolled size change
    return () => {
      window.removeEventListener("resize", measure);
      clearInterval(id);
    };
  }, []);

  const r = 16; // matches rounded-2xl
  const perimeter =
    size.w && size.h ? 2 * (size.w + size.h) - 8 * r + 2 * Math.PI * r : 0;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div
        ref={barRef}
        className={`relative mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 transition-all duration-500 sm:px-5 ${
          scrolled ? "glass h-14 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.6)]" : "h-16"
        }`}
      >
        {/* Full-perimeter scroll-progress border */}
        {size.w > 0 && (
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
            aria-hidden
          >
            <defs>
              <linearGradient id="nx-border" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#27c3ff" />
                <stop offset="0.5" stopColor="#3f74ff" />
                <stop offset="1" stopColor="#9333ff" />
              </linearGradient>
            </defs>
            <rect
              x="1"
              y="1"
              width={size.w - 2}
              height={size.h - 2}
              rx={r}
              ry={r}
              fill="none"
              stroke="url(#nx-border)"
              strokeWidth="2"
              strokeLinecap="round"
              style={{
                strokeDasharray: perimeter,
                strokeDashoffset: perimeter * (1 - progress),
                transition: "stroke-dashoffset 0.15s ease-out",
              }}
            />
          </svg>
        )}

        <Link href="/" aria-label="NexoVexo home" className="relative z-10 flex items-center transition-transform hover:scale-[1.02]">
          <LogoMark className="h-9 w-9" />
          {/* EXOVEXO shown on load, flies away once the hero intro completes */}
          <span className="nx-header-letters ml-1 font-display text-lg font-bold uppercase tracking-[0.14em] text-foreground">
            exovexo
          </span>
        </Link>

        <div className="relative z-10 hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative rounded-lg px-4 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              {l.label}
              <span className="pointer-events-none absolute inset-x-4 bottom-1 h-px origin-left scale-x-0 brand-gradient transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </div>

        <div className="relative z-10 hidden items-center gap-2.5 md:flex">
          <a href="/book" className="btn-ghost rounded-full px-4 py-2.5 text-sm font-semibold">
            Book a call
          </a>
          <a href="/#contact" className="btn-primary rounded-full px-5 py-2.5 text-sm font-semibold">
            Start a project
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="btn-ghost relative z-10 flex h-10 w-10 items-center justify-center rounded-xl md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
            {open ? (
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`mx-auto max-w-6xl overflow-hidden px-4 transition-[max-height,opacity] duration-400 md:hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mt-2 flex flex-col gap-1 rounded-2xl glass border border-border p-3">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-medium text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
          <a href="/book" onClick={() => setOpen(false)} className="btn-ghost mt-1 rounded-xl px-5 py-3 text-center text-sm font-semibold">
            Book a free call
          </a>
          <a href="/#contact" onClick={() => setOpen(false)} className="btn-primary rounded-xl px-5 py-3 text-center text-sm font-semibold">
            Start a project
          </a>
        </div>
      </div>
    </header>
  );
}
