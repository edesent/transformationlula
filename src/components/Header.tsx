"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/lib/site";
import { Mark, Wordmark } from "./Mark";

/** Floats clear over every page's photo masthead, then turns solid navy. */
export default function Header() {
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        solid || open ? "bg-ink/95 shadow-[0_1px_0_rgb(255_255_255/0.08)] backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="wrap flex h-16 items-center justify-between gap-4 sm:h-20">
        <Link href="/" className="flex items-center gap-2.5 text-white" aria-label="Transformation Church home">
          <Mark className="h-8 w-11 text-sky sm:h-9 sm:w-12" strokeWidth={5} />
          <Wordmark className="text-[1.15rem] sm:text-[1.3rem]" />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`eyebrow !text-[0.76rem] transition-colors hover:text-sky ${
                pathname.startsWith(n.href) ? "text-sky" : "text-white/85"
              }`}
            >
              {n.label}
            </Link>
          ))}
          <Link href="/visit" className="btn btn-sun !px-5 !py-2.5">
            Plan a visit
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <svg viewBox="0 0 20 20" className="h-5 w-5" stroke="currentColor" strokeWidth="1.8">
            {open ? <path d="M5 5l10 10M15 5L5 15" /> : <path d="M3 6h14M3 10h14M3 14h14" />}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-ink lg:hidden">
          <div className="wrap grid gap-1 py-4">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className="display rounded-xl px-3 py-3 text-3xl text-white hover:text-sky">
                {n.label}
              </Link>
            ))}
            <Link href="/visit" className="btn btn-sun mt-3">
              Plan a visit
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
