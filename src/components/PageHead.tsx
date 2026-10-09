import Image from "next/image";

/** A full-bleed photographic masthead for interior pages. */
export function PageHead({
  eyebrow,
  title,
  children,
  photo = "/photos/worship-hands-raised.jpg",
  position = "center",
}: {
  eyebrow: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  photo?: string;
  position?: string;
}) {
  return (
    <section className="relative isolate flex min-h-[64vh] items-end overflow-hidden bg-ink text-white sm:min-h-[70vh]">
      <Image src={photo} alt="" fill priority sizes="100vw" className="-z-20 object-cover" style={{ objectPosition: position }} />
      <div className="wash absolute inset-0 -z-10" />
      <div className="wrap pb-14 pt-32 sm:pb-20">
        <p className="eyebrow rise text-sky">{eyebrow}</p>
        <h1 className="display rise shadowed mt-4 max-w-5xl text-[clamp(2.9rem,8vw,7rem)]" style={{ animationDelay: "0.1s" }}>
          {title}
        </h1>
        {children && (
          <div className="rise mt-6 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl" style={{ animationDelay: "0.2s" }}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}

/** The before → after pair: the old word struck through, the new one in sunrise. */
export function Pair({ from, to, className = "" }: { from: string; to: string; className?: string }) {
  return (
    <span className={className} data-reveal>
      <span className="strike">{from}</span>{" "}
      <span className="after">{to}.</span>
    </span>
  );
}
