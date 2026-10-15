import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHead } from "@/components/PageHead";
import { Video } from "@/components/Video";
import { org, recentSermons, series, youtubeSermons } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sermons",
  description: "Verse-by-verse preaching from Transformation Church in Lula, GA. Watch recent sermons, past series, and messages from our YouTube channel.",
  alternates: { canonical: "/sermons" },
};

const play = <path d="M7 4.5v15l13-7.5z" />;

export default function Sermons() {
  const [current, ...rest] = series;
  const [featured, ...moreVideos] = youtubeSermons;
  return (
    <>
      <PageHead eyebrow="Sermons" title={<>Open the Book with us.</>} photo="/photos/worship-team-blue.jpg" position="center 40%">
        Missed a Sunday? Catch up on any message, any time, from your phone or your couch.
      </PageHead>

      <section className="bg-ink py-20 text-white sm:py-28">
        <div className="wrap grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <a href={current.url} className="group relative block aspect-video overflow-hidden rounded-[1.75rem]" data-reveal>
            <Image src={current.img} alt={`${current.title} sermon series`} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
            <span className="absolute bottom-5 left-5 flex h-16 w-16 items-center justify-center rounded-full bg-sun text-ink shadow-xl">
              <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7" fill="currentColor">{play}</svg>
            </span>
          </a>
          <div data-reveal>
            <p className="eyebrow text-sky">Current series</p>
            <h2 className="display mt-4 text-[clamp(2.2rem,4.4vw,3.6rem)]">{current.title}</h2>
            <p className="mt-4 text-lg text-white/70">{current.note}, Sundays at 10:00 AM.</p>
            <ol className="mt-8 border-t border-white/15">
              {recentSermons.map((s) => (
                <li key={s.url} className="border-b border-white/15">
                  <a href={s.url} className="group flex items-center gap-4 py-3.5">
                    <span className="eyebrow w-[4.5rem] shrink-0 whitespace-nowrap text-sky">{s.date}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-bold leading-snug group-hover:text-sun">{s.title}</span>
                      <span className="block text-sm text-white/55">{s.part} · {s.speaker}</span>
                    </span>
                    <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5 shrink-0 text-white/40 transition-transform group-hover:translate-x-1 group-hover:text-sun" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </a>
                </li>
              ))}
            </ol>
            <a href={current.url} className="btn btn-sun mt-8">
              The whole series
            </a>
          </div>
        </div>
      </section>

      <section id="youtube" className="scroll-mt-16 bg-paper py-20 sm:py-28">
        <div className="wrap">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
            <div>
              <p className="eyebrow text-royal">On YouTube</p>
              <h2 className="display mt-4 text-[clamp(2.4rem,5.5vw,4.6rem)]">Watch it right here.</h2>
            </div>
            <div>
              <p className="text-lg leading-relaxed text-mute">
                Some Sunday messages also go up on our YouTube channel. Press play and the whole message runs on
                this page.
              </p>
              <a href={org.youtube} className="btn btn-ink mt-6">
                <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4" fill="currentColor"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8ZM9.75 15.02V8.98L15.5 12z" /></svg>
                Our YouTube channel
              </a>
            </div>
          </div>

          <article className="mt-12 grid overflow-hidden rounded-3xl bg-white shadow-lg shadow-ink/5 lg:grid-cols-[1.6fr_1fr]" data-reveal>
            <div className="relative aspect-video bg-ink">
              <Video id={featured.youtube} title={featured.title} hd />
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
              <p className="eyebrow text-royal">{featured.note}</p>
              <h3 className="mt-3 text-2xl font-extrabold leading-tight sm:text-3xl">{featured.title}</h3>
              <p className="mt-3 text-mute">{featured.speaker} · {featured.passage}</p>
              <p className="mt-1 text-sm text-mute">{featured.date} · {featured.length}</p>
            </div>
          </article>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {moreVideos.map((v) => (
              <article key={v.youtube} className="overflow-hidden rounded-3xl bg-white shadow-lg shadow-ink/5" data-reveal>
                <div className="relative aspect-video bg-ink">
                  <Video id={v.youtube} title={v.title} />
                </div>
                <div className="p-6">
                  <p className="eyebrow text-royal">{v.note}</p>
                  <h3 className="mt-2 text-xl font-extrabold leading-snug">{v.title}</h3>
                  <p className="mt-2 text-sm text-mute">{v.speaker} · {v.passage} · {v.length}</p>
                  <p className="text-sm text-mute">{v.date}</p>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-10 text-mute">
            Thinking about membership? The five-part{" "}
            <Link href="/grow#course" className="font-bold text-royal underline">
              New Members Course
            </Link>{" "}
            is on YouTube too.
          </p>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="wrap">
          <p className="eyebrow text-royal">Past series</p>
          <h2 className="display mt-4 text-[clamp(2.2rem,5vw,4rem)]">The archive.</h2>
          <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((s) => (
              <a key={s.title} href={s.url} className="group" data-reveal>
                <div className="relative aspect-video overflow-hidden rounded-2xl bg-mist">
                  <Image src={s.img} alt={`${s.title} sermon series`} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <h3 className="mt-4 text-xl font-extrabold group-hover:text-royal">{s.title}</h3>
                <p className="text-mute">
                  {s.note}
                  {s.messages ? <> · {s.messages} messages</> : null}
                </p>
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
