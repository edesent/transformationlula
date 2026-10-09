import type { Metadata } from "next";
import Image from "next/image";
import { PageHead } from "@/components/PageHead";
import { org, series } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sermons",
  description: "Verse-by-verse preaching from Transformation Church in Lula, GA. Watch or listen to recent sermons and past series.",
  alternates: { canonical: "/sermons" },
};

export default function Sermons() {
  const [current, ...rest] = series;
  return (
    <>
      <PageHead eyebrow="Sermons" title={<>Open the Book with us.</>} photo="/photos/sermon-full-room.jpg" position="center 35%">
        Missed a Sunday? Catch up on any message, any time, from your phone or your couch.
      </PageHead>

      <section className="bg-ink py-20 text-white sm:py-28">
        <div className="wrap grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <a href={org.sermons} className="group relative block aspect-video overflow-hidden rounded-[1.75rem]" data-reveal>
            <Image src={current.img} alt={`${current.title} sermon series`} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
            <span className="absolute bottom-5 left-5 flex h-16 w-16 items-center justify-center rounded-full bg-sun text-ink shadow-xl">
              <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7" fill="currentColor"><path d="M7 4.5v15l13-7.5z" /></svg>
            </span>
          </a>
          <div data-reveal>
            <p className="eyebrow text-sky">Current series</p>
            <h2 className="display mt-4 text-[clamp(2.4rem,5vw,4.4rem)]">{current.title}</h2>
            <p className="mt-4 text-lg text-white/70">{current.note}, Sundays at 10:00 AM.</p>
            <a href={org.sermons} className="btn btn-sun mt-8">
              Watch the latest
            </a>
          </div>
        </div>
      </section>

      <section className="bg-paper py-20 sm:py-28">
        <div className="wrap">
          <p className="eyebrow text-royal">Past series</p>
          <h2 className="display mt-4 text-[clamp(2.2rem,5vw,4rem)]">The archive.</h2>
          <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((s) => (
              <a key={s.title} href={org.sermons} className="group" data-reveal>
                <div className="relative aspect-video overflow-hidden rounded-2xl bg-mist">
                  <Image src={s.img} alt={`${s.title} sermon series`} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <h3 className="mt-4 text-xl font-extrabold group-hover:text-royal">{s.title}</h3>
                <p className="text-mute">{s.note}</p>
              </a>
            ))}
          </div>
          <p className="mt-14 text-mute">
            All of our sermons live in our free media library, which also works in the Subsplash app.{" "}
            <a href={org.sermons} className="font-bold text-royal underline">
              Open the library →
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
