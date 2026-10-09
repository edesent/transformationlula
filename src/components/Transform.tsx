"use client";

import { useEffect, useState } from "react";

const pairs = [
  ["lost", "found"],
  ["hungry", "fed"],
  ["empty-handed", "ready"],
  ["strangers", "family"],
  ["alone", "together"],
  ["weary", "renewed"],
];

/**
 * The hero line. Each pair holds for a few seconds: the old word is struck
 * through, then the new one rises in.
 */
export function Transform() {
  const [i, setI] = useState(0);
  const [live, setLive] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLive(true);
      return;
    }
    let t1: number;
    const cycle = () => {
      setLive(false);
      t1 = window.setTimeout(() => setLive(true), 350);
    };
    cycle();
    const t = window.setInterval(() => {
      setI((n) => (n + 1) % pairs.length);
      cycle();
    }, 3600);
    return () => {
      window.clearInterval(t);
      window.clearTimeout(t1);
    };
  }, []);

  const [from, to] = pairs[i];
  return (
    <span className="block min-h-[1.05em]" aria-live="off">
      <span className="sr-only">From lost to found, hungry to fed, alone to together.</span>
      <span key={i} aria-hidden className="inline-flex flex-wrap items-baseline gap-x-[0.3em]">
        <span className={`strike ${live ? "is-live" : ""}`}>{from}</span>
        <span
          className="after inline-block transition-all duration-700 ease-out"
          style={{ opacity: live ? 1 : 0, transform: live ? "none" : "translateY(0.25em)", transitionDelay: "0.55s" }}
        >
          {to}.
        </span>
      </span>
    </span>
  );
}
