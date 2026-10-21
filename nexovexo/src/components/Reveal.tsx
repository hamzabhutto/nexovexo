"use client";

import { useEffect, useRef, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article" | "li" | "span";
};

/**
 * Entrance animation that is a pure, non-blocking enhancement.
 *
 * SSR renders content fully visible (class "reveal"). On the client we add
 * "reveal-anim" (which hides it) and then "is-visible" when it scrolls into
 * view. Because the hidden state is only ever added by client JS AFTER mount,
 * there is no hydration mismatch, and content is never stuck invisible if JS
 * fails or is slow.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [anim, setAnim] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // leave content plainly visible

    // Turn on the animated (hidden) state now that JS controls it.
    setAnim(true);

    // If already in view, reveal on the next frame; else observe.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.95) {
      requestAnimationFrame(() => setVisible(true));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0, rootMargin: "0px 0px -5% 0px" }
    );
    observer.observe(el);

    const failSafe = setTimeout(() => setVisible(true), 1500);
    return () => {
      observer.disconnect();
      clearTimeout(failSafe);
    };
  }, []);

  const Tag = as as React.ElementType;

  return (
    <Tag
      ref={ref}
      className={`reveal ${anim ? "reveal-anim" : ""} ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
