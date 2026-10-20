"use client";

import { useEffect, useRef, useState } from "react";
import { LogoMark } from "@/components/Logo";

/**
 * Signature load animation.
 *
 * Each letter of "EXOVEXO" launches from the header (top of the viewport) one
 * by one and flies down to its final spot beside the big "N", forming
 * "NEXOVEXO". Fixed-position flying clones do the travel (so nothing is
 * clipped by the hero's overflow); when they land, the real in-place wordmark
 * is revealed and the clones are removed.
 *
 * Respects prefers-reduced-motion by showing the final state instantly.
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

const STAGGER = 160; // ms between each letter launching
const FLIGHT = 900; // ms each letter takes to fly

export default function BrandIntro() {
  const targetRef = useRef<HTMLSpanElement | null>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  // which letters have launched (index < launchedCount are flying/landed)
  const [launched, setLaunched] = useState(0);
  const [targets, setTargets] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDone(true);
      document.documentElement.classList.add("nx-intro-done");
      return;
    }

    // Measure the landing spot of each real (hidden) letter.
    const measure = () => {
      const spots = letterRefs.current.map((el) => {
        if (!el) return { x: 0, y: 0 };
        const r = el.getBoundingClientRect();
        return { x: r.left, y: r.top };
      });
      setTargets(spots);
    };
    measure();

    document.documentElement.classList.add("nx-intro-done"); // hide header EXOVEXO
    setStarted(true);

    // Launch letters one by one.
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < LETTERS.length; i++) {
      timers.push(setTimeout(() => setLaunched((n) => Math.max(n, i + 1)), 250 + i * STAGGER));
    }
    // When the last letter has landed, swap to the static wordmark.
    const endAt = 250 + (LETTERS.length - 1) * STAGGER + FLIGHT + 120;
    timers.push(setTimeout(() => setDone(true), endAt));

    return () => timers.forEach(clearTimeout);
  }, []);

  const headerStart = { x: 92, y: 24 }; // approx header logo-text position

  return (
    <div className="relative flex items-center justify-center" aria-label="NEXOVEXO">
      <LogoMark className="h-24 w-24 sm:h-28 sm:w-28" />

      {/* Real in-place wordmark: hidden letters used as measurement targets,
          revealed once the flight completes. */}
      <span
        ref={targetRef}
        className="brand-wordmark font-display text-5xl font-bold uppercase tracking-[0.08em] sm:text-6xl"
      >
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

      {/* Flying clones (one per letter), fixed-position so they travel the
          full distance from header to hero unclipped. */}
      {started && !done &&
        targets.length === LETTERS.length &&
        LETTERS.map((l, i) => {
          const isLaunched = i < launched;
          const t = targets[i];
          return (
            <span
              key={`fly-${i}`}
              className={`brand-wordmark font-display text-5xl font-bold uppercase tracking-[0.08em] sm:text-6xl ${
                l.brand ? "brand-text" : "text-foreground"
              }`}
              style={{
                position: "fixed",
                left: 0,
                top: 0,
                zIndex: 60,
                pointerEvents: "none",
                transform: isLaunched
                  ? `translate(${t.x}px, ${t.y}px) scale(1)`
                  : `translate(${headerStart.x}px, ${headerStart.y}px) scale(0.4)`,
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
