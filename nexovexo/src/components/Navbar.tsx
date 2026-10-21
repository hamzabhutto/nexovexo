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
  const [hidden, setHidden] = useState(false); // hide header when scrolling down
  const barRef = useRef<HTMLDivElement | null>(null);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? Math.min(y / h, 1) : 0);

      // Hide on scroll down (past a small threshold), reveal on scroll up.
      // Never hide while the mobile menu is open.
      if (!open) {
        if (y > lastY.current && y > 80) setHidden(true);
        else if (y < lastY.current) setHidden(false);
      }
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);



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
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      } ${hidden ? "-translate-y-full" : "translate-y-0"}`}
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
          {/* Wordmark only on desktop; mobile header shows just the N mark */}
          <span className="nx-header-letters ml-1 hidden font-display text-lg font-bold uppercase tracking-[0.14em] text-foreground md:inline-block">
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
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="btn-ghost relative z-[70] flex h-11 w-11 items-center justify-center rounded-xl md:hidden"
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
    </header>

    {/*
      Mobile menu — rendered OUTSIDE the <header> on purpose. The header has a
      CSS transform (hide-on-scroll), and a transformed ancestor breaks
      position:fixed for its children. As a top-level sibling, this fixed
      overlay positions against the viewport correctly.
    */}
    {open && (
      <>
        {/* tap-catch backdrop */}
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[60] bg-background/60 backdrop-blur-sm md:hidden"
        />
        <div className="fixed inset-x-3 top-[76px] z-[65] md:hidden">
          <div className="flex flex-col gap-1 rounded-2xl border border-border bg-background p-3 shadow-2xl">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3.5 text-base font-medium text-foreground transition-colors active:bg-surface-2"
              >
                {l.label}
              </a>
            ))}
            <a
              href="/book"
              onClick={() => setOpen(false)}
              className="btn-ghost mt-1 rounded-xl px-5 py-3.5 text-center text-sm font-semibold"
            >
              Book a free call
            </a>
            <a
              href="/#contact"
              onClick={() => setOpen(false)}
              className="btn-primary rounded-xl px-5 py-3.5 text-center text-sm font-semibold"
            >
              Start a project
            </a>
          </div>
        </div>
      </>
    )}
    </>
  );
}
