"use client";

import { useEffect, useRef, useState } from "react";
import { LogoMark } from "@/components/Logo";

/**
 * Brand lockup: the "N" mark followed by the "EXOVEXO" wordmark = NEXOVEXO.
 *
 * Desktop: the letters fly in one-by-one from the header on load (signature
 * animation), aborting cleanly if the user scrolls.
 * Mobile / reduced-motion: renders the finished lockup immediately (the fly-in
 * is cramped and unreliable on narrow screens), so it always looks correct.
 */
const LETTERS = [
  { ch: "E", brand: false },
  { ch: "X", brand: true },
  { ch: "O", brand: false },
  { ch: "V", brand: true },
  { ch: "E", brand: false },
  { ch: "X", brand: true },
  { ch: "O", brand: false },
];

const STAGGER = 150;
const FLIGHT = 850;

export default function BrandIntro() {
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [started, setStarted] = useState(false);
  // Start "done" = letters shown in place. Desktop flips this to animate.
  const [done, setDone] = useState(true);
  const [launched, setLaunched] = useState(0);
  const [targets, setTargets] = useState<{ x: number; y: number }[]>([]);
  const [start, setStart] = useState({ x: 72, y: 22 });

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isDesktop = window.innerWidth >= 768;

    // On mobile or reduced-motion, leave the finished lockup visible. Done.
    if (reduce || !isDesktop) {
      document.documentElement.classList.add("nx-intro-done");
      return;
    }

    // Desktop: run the fly-in. Hide the letters first, then animate them in.
    setDone(false);

    const finishNow = () => {
      setDone(true);
      setStarted(false);
      document.documentElement.classList.add("nx-intro-done");
    };

    const spots = letterRefs.current.map((el) => {
      if (!el) return { x: 0, y: 0 };
      const r = el.getBoundingClientRect();
      return { x: r.left, y: r.top };
    });
    setTargets(spots);
    setStart({ x: 72, y: 22 });
    document.documentElement.classList.add("nx-intro-done");
    setStarted(true);

    const startY = window.scrollY;
    const onScroll = () => {
      if (Math.abs(window.scrollY - startY) > 40) finishNow();
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < LETTERS.length; i++) {
      timers.push(setTimeout(() => setLaunched((n) => Math.max(n, i + 1)), 250 + i * STAGGER));
    }
    timers.push(setTimeout(finishNow, 250 + (LETTERS.length - 1) * STAGGER + FLIGHT + 120));

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center" aria-label="NEXOVEXO">
      <LogoMark className="h-16 w-16 sm:h-24 sm:w-24" />

      <span className="brand-wordmark font-display text-3xl font-bold uppercase tracking-[0.06em] sm:text-5xl sm:tracking-[0.08em]">
        {LETTERS.map((l, i) => (
          <span
            key={i}
            ref={(el) => {
              letterRefs.current[i] = el;
            }}
            className={`${l.brand ? "brand-text" : "text-foreground"} transition-opacity duration-150 ${
              done ? "opacity-100" : "opacity-0"
            }`}
          >
            {l.ch}
          </span>
        ))}
      </span>

      {/* Flying clones (desktop only, while animating) */}
      {started && !done && targets.length === LETTERS.length &&
        LETTERS.map((l, i) => {
          const isLaunched = i < launched;
          const t = targets[i];
          return (
            <span
              key={`fly-${i}`}
              className={`brand-wordmark font-display text-5xl font-bold uppercase tracking-[0.08em] ${
                l.brand ? "brand-text" : "text-foreground"
              }`}
              style={{
                position: "fixed",
                left: 0,
                top: 0,
                zIndex: 30,
                pointerEvents: "none",
                transform: isLaunched
                  ? `translate(${t.x}px, ${t.y}px) scale(1)`
                  : `translate(${start.x}px, ${start.y}px) scale(0.4)`,
                opacity: isLaunched ? 1 : 0,
                transition: `transform ${FLIGHT}ms cubic-bezier(0.22,1,0.36,1), opacity ${FLIGHT * 0.6}ms ease`,
              }}
            >
              {l.ch}
            </span>
          );
        })}
    </div>
  );
}
