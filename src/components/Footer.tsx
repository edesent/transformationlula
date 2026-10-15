import Link from "next/link";
import { nav, org, services } from "@/lib/site";
import { Mark, Wordmark } from "./Mark";
import { Phone } from "./Reveal";
import { VisitButton } from "./VisitDialog";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <Mark className="pointer-events-none absolute -bottom-24 -right-20 h-[26rem] w-[38rem] text-white/[0.04]" strokeWidth={3} />
      <div className="wrap relative grid gap-12 py-16 sm:py-20 md:grid-cols-[1.3fr_1fr_1fr_0.8fr]">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <Mark className="h-10 w-auto shrink-0 text-sky" strokeWidth={5} />
            <Wordmark className="text-2xl" />
          </Link>
          <p className="scripture mt-6 max-w-sm text-xl leading-snug text-white/75">
            “Be transformed by the renewing of your mind.”
            <span className="mt-1 block font-sans text-xs not-italic tracking-[0.2em] text-sky uppercase">Romans 12:2</span>
          </p>
        </div>

        <div>
          <p className="eyebrow text-sky">Gather</p>
          <ul className="mt-4 space-y-3">
            {services.map((s) => (
              <li key={s.day}>
                <span className="font-bold">{s.day}s · {s.time}</span>
                <span className="block text-sm text-white/60">{s.name}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow text-sky">Find us</p>
          <address className="mt-4 not-italic leading-relaxed text-white/80">
            {org.street}
            <br />
            {org.city}, {org.stateCode} {org.zip}
            <span className="block text-sm text-white/55">Beside Lula Pharmacy</span>
          </address>
          <a href={org.directions} className="mt-2 inline-block text-sm font-bold text-sun hover:underline">
            Get directions →
          </a>
          <p className="mt-4 text-sm text-white/55">Mail: {org.mailing}</p>
          <p className="mt-3 text-sm">
            <Phone className="font-bold hover:text-sky" fallback="Call Pastor Mike" />
          </p>
        </div>

        <div>
          <p className="eyebrow text-sky">Explore</p>
          <ul className="mt-4 space-y-2 font-semibold text-white/80">
            {[...nav, { href: "/visit", label: "Plan a visit" }, { href: "/contact", label: "Contact" }].map((n) => (
              <li key={n.href}>
                {n.href === "/visit" ? (
                  <VisitButton className="hover:text-sky">{n.label}</VisitButton>
                ) : (
                  <Link href={n.href} className="hover:text-sky">{n.label}</Link>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-5 flex gap-3">
            <a href={org.facebook} aria-label="Facebook" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 hover:border-sky hover:text-sky">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M14 8h3V4h-3c-2.8 0-4.5 1.9-4.5 4.7V11H7v4h2.5v9h4v-9h3l.5-4h-3.5V9c0-.6.4-1 1-1Z" /></svg>
            </a>
            <a href={org.instagram} aria-label="Instagram" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 hover:border-sky hover:text-sky">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" /></svg>
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="wrap flex flex-col justify-between gap-2 py-6 text-xs text-white/45 sm:flex-row">
          <p>© {new Date().getFullYear()} Transformation Church · Lula, Georgia · A SEND Network church plant</p>
          <p>Planted {org.launched}</p>
        </div>
      </div>
    </footer>
  );
}
