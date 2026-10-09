"use client";

import { useEffect, useState } from "react";
import { org } from "@/lib/site";

/**
 * Fades sections in as they scroll into view. Mounted once in the layout, so
 * it watches the page for new [data-reveal] elements after every navigation;
 * the shown state is the data-in ATTRIBUTE (React rewrites className).
 */
export function Reveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.setAttribute("data-in", "");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    const scan = () =>
      document.querySelectorAll("[data-reveal]:not([data-in])").forEach((el) => io.observe(el));
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
  return null;
}

/**
 * Pastor Mike's number, put together in the browser after the page loads so
 * it never sits in the HTML for spam scrapers to harvest.
 */
export function Phone({
  className = "",
  fallback = "Call Pastor Mike",
}: {
  className?: string;
  fallback?: string;
}) {
  const [digits, setDigits] = useState<string | null>(null);
  useEffect(() => setDigits(atob(org.phoneB64)), []);
  if (!digits) return <span className={className}>{fallback}</span>;
  const pretty = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  return (
    <a href={`tel:+1${digits}`} className={className}>
      {pretty}
    </a>
  );
}
