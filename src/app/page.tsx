import Image from "next/image";
import Link from "next/link";
import { Mark } from "@/components/Mark";
import { Pair } from "@/components/PageHead";
import { Transform } from "@/components/Transform";
import { org, outreaches, series, services, upcomingDate, upcomingEvents } from "@/lib/site";

// Outreach dates drop off by themselves once they pass.
export const revalidate = 3600;

export default function Home() {
  return (
    <>
      {/* ───────── Hero ───────── */}
      <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink text-white">
        <Image
          src="/photos/baptism-lake.jpg"
          alt="A new believer coming up out of the lake at a Transformation Church baptism, celebrating"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-[46%_30%]"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(5_15_34/0.9)_0%,rgb(5_15_34/0.62)_26%,rgb(5_15_34/0.12)_48%,rgb(5_15_34/0.1)_64%,rgb(5_15_34/0.88)_100%)]" />

        <div className="wrap flex flex-1 flex-col justify-between gap-10 pb-10 pt-28 sm:pt-32 lg:pt-28">
          <div>
            <p className="eyebrow rise text-sky">Transformation Church · Lula, Georgia</p>
            <h1 className="display shadowed mt-5 text-[clamp(2.4rem,10.6vw,9.6rem)] [font-variation-settings:'wdth'_100] lg:text-[clamp(5rem,7.3vw,7.3rem)]">
              <span className="rise block lg:inline">Be </span>
              <span className="rise block lg:inline" style={{ animationDelay: "0.12s" }}>
                transformed.
              </span>
            </h1>
            <p
              className="display rise shadowed mt-3 text-[clamp(1.9rem,5.4vw,4.4rem)] text-white lg:text-[clamp(2.4rem,3.6vw,3.6rem)]"
              style={{ animationDelay: "0.3s" }}
            >
              <Transform />
            </p>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <p className="rise max-w-md text-lg font-semibold leading-snug shadowed sm:text-xl" style={{ animationDelay: "0.45s" }}>
              Everyone is welcome. Nobody is perfect.{" "}
              <span className="text-sun">Transformation is happening.</span>
            </p>
            <div className="rise flex flex-wrap gap-3" style={{ animationDelay: "0.55s" }}>
              <Link href="/visit" className="btn btn-sun">
                Plan your visit
              </Link>
              <Link href="/sermons" className="btn btn-ghost bg-ink/30 backdrop-blur">
                Watch a sermon
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/15 bg-ink/70 backdrop-blur">
          <div className="wrap grid gap-4 py-5 text-sm sm:grid-cols-3 sm:gap-8">
            {services.map((s) => (
              <p key={s.day}>
                <span className="eyebrow block text-sky">{s.day}s</span>
                <span className="mt-1 block text-base font-bold">
                  {s.time} · {s.name}
                </span>
              </p>
            ))}
            <p>
              <span className="eyebrow block text-sky">Where</span>
              <a href={org.directions} className="mt-1 block text-base font-bold hover:text-sun">
                {org.street}, {org.city} →
              </a>
              <span className="block text-white/55">Beside Lula Pharmacy</span>
            </p>
          </div>
        </div>
      </section>

      {/* ───────── Coming up (drops off by itself) ───────── */}
      {upcomingEvents().map((e) => (
        <section key={e.name} className="bg-sun text-ink">
          <div className="wrap flex flex-col gap-4 py-7 md:flex-row md:items-center md:justify-between md:gap-10">
            <div className="flex items-center gap-5">
              <span className="eyebrow shrink-0 rounded-full bg-ink px-3 py-1.5 text-sun">Coming up</span>
              <p>
                <span className="block text-xl font-extrabold">{e.name}</span>
                <span className="font-semibold">{e.date} · {e.place}</span>
              </p>
            </div>
            <Link href="/outreach#events" className="btn btn-ink shrink-0 self-start md:self-auto">
              Details
            </Link>
          </div>
        </section>
      ))}

      {/* ───────── Romans 12:2 ───────── */}
      <section className="relative overflow-hidden bg-night py-24 text-white sm:py-32">
        <Mark className="pointer-events-none absolute -left-24 bottom-0 h-[30rem] w-[44rem] text-royal/25" strokeWidth={2} />
        <div className="wrap relative grid gap-14 lg:grid-cols-[1.35fr_1fr] lg:items-end">
          <blockquote data-reveal>
            <p className="scripture text-[clamp(2rem,4.6vw,3.9rem)] leading-[1.08] text-white">
              “Do not be conformed to this world, but be{" "}
              <span className="text-sun">transformed</span> by the renewing of your mind.”
            </p>
            <footer className="eyebrow mt-6 text-sky">Romans 12:2</footer>
          </blockquote>
          <div data-reveal className="text-lg leading-relaxed text-white/75">
            <p>
              In the Bible, <strong className="text-white">transformation</strong> means a renewal:
              a change from a life that reflects the ways of the world to one that reflects Jesus.
            </p>
            <p className="mt-4">
              That’s our name and our whole story. We want to be a church where anyone can be
              transformed by the truth of Jesus, then carry that change out the door and into Lula.
            </p>
            <Link href="/about" className="mt-6 inline-block font-bold text-sky hover:text-sun">
              Our story →
            </Link>
          </div>
        </div>
      </section>

      {/* ───────── Outreach ───────── */}
      <section className="bg-ink text-white">
        <div className="wrap pb-6 pt-24 sm:pt-32">
          <p className="eyebrow text-sky" data-reveal>
            Transformation, out the door
          </p>
          <h2 className="display mt-4 max-w-4xl text-[clamp(2.6rem,7vw,6rem)]" data-reveal>
            Changed lives change a town.
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-white/70" data-reveal>
            All year long we take church outside the walls. Everything is free, everyone
            is welcome, and every one of them needs more hands.
          </p>
        </div>

        <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
          {outreaches.map((o, i) => {
            const next = upcomingDate(o);
            return (
              <article key={o.slug} className="group relative overflow-hidden">
                <div className="wrap grid gap-6 py-12 sm:py-16 lg:grid-cols-[1.25fr_1fr] lg:items-center lg:gap-16">
                  <div className={i % 2 ? "lg:order-2" : ""}>
                    <p className="eyebrow text-white/50">
                      0{i + 1} · {o.name}
                    </p>
                    <p className="display mt-3 text-[clamp(3rem,9vw,7.5rem)]">
                      <Pair from={o.from} to={o.to} />
                    </p>
                  </div>
                  <div className={i % 2 ? "lg:order-1" : ""} data-reveal>
                    {o.photo && (
                      <div className="relative mb-6 aspect-[3/2] overflow-hidden rounded-2xl">
                        <Image src={o.photo} alt={o.photoAlt ?? ""} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
                      </div>
                    )}
                    <p className="text-lg leading-relaxed text-white/80">{o.blurb}</p>
                    <p className="mt-5 text-sm font-bold text-sky">
                      {next ? <>Next: {next}</> : o.when}
                    </p>
                    <Link href={`/outreach#${o.slug}`} className="mt-5 inline-flex items-center gap-2 font-bold text-white hover:text-sun">
                      Lend a hand →
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="wrap flex flex-wrap items-center justify-between gap-6 py-14">
          <p className="max-w-xl text-white/70">
            You don’t have to be a member to serve. Join the Community Outreach Team and we’ll
            let you know when the next one is coming.
          </p>
          <Link href="/outreach#join" className="btn btn-sun">
            Join the outreach team
          </Link>
        </div>
      </section>

      {/* ───────── A Sunday ───────── */}
      <section className="bg-paper py-24 sm:py-32">
        <div className="wrap grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-mist" data-reveal>
            <Image
              src="/photos/congregation-seated.jpg"
              alt="Families seated together on a Sunday morning in the Lula sanctuary"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="eyebrow text-royal" data-reveal>
              Your first Sunday
            </p>
            <h2 className="display mt-4 text-[clamp(2.6rem,6vw,5rem)]" data-reveal>
              Come as you are.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-mute" data-reveal>
              Showing up somewhere new is a big deal. We want you to feel at home from the moment
              you pull into the parking lot.
            </p>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2" data-reveal>
              {[
                ["10:00 AM", "Worship, Bible teaching and a warm welcome."],
                ["Wear anything", "Jeans are great. Wear what makes you comfortable."],
                ["Kids’ church", "Nursery through 5th grade, with check-in at the door."],
                ["Coffee’s on", "Greeters will show you the coffee bar and the auditorium."],
              ].map(([t, d]) => (
                <li key={t} className="border-t-2 border-ink pt-4">
                  <p className="display text-2xl">{t}</p>
                  <p className="mt-2 text-mute">{d}</p>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-3" data-reveal>
              <Link href="/visit" className="btn btn-ink">
                Plan your visit
              </Link>
              <Link href="/visit#faq" className="btn border-[1.5px] border-ink/25 hover:bg-mist">
                Questions & answers
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Why are we here in Lula? ───────── */}
      <section className="relative overflow-hidden bg-royal py-24 text-white sm:py-32">
        <Mark className="pointer-events-none absolute -right-28 -top-10 h-[34rem] w-[50rem] text-white/[0.07]" strokeWidth={2} />
        <div className="wrap relative grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <p className="eyebrow text-sky-soft" data-reveal>
              Planted {org.launched}
            </p>
            <h2 className="display mt-4 text-[clamp(2.6rem,6.4vw,5.6rem)]" data-reveal>
              Why are we here in Lula?
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/85" data-reveal>
              We started with about thirty fired-up Truett McConnell University students and a mix
              of people from every decade of life. Today we’re a multi-generational, multi-cultural
              church family, intentional about one thing: seeing lives transformed in Northeast
              Georgia and the nations, for the glory of God.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2" data-reveal>
              <div className="rounded-2xl bg-white/10 p-5">
                <p className="eyebrow text-sun">The Great Commission</p>
                <p className="mt-2 text-white/85">Go and make disciples. Matthew 28:18–20</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-5">
                <p className="eyebrow text-sun">The Greatest Commandments</p>
                <p className="mt-2 text-white/85">Love God, love your neighbor. Matthew 22:34–40</p>
              </div>
            </div>
          </div>
          <figure data-reveal>
            <div className="relative aspect-video overflow-hidden rounded-[1.5rem] shadow-2xl shadow-ink/40">
              <Image
                src="/series/why-are-we-here-in-lula.jpg"
                alt="Sermon series art: Why Are We Here, Part 1: Connect People With Jesus, over the Lula train depot"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-4 text-sm text-white/70">
              From the series “Why Are We Here in Lula?” Part 1: Connect people with Jesus.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ───────── Sermons ───────── */}
      <section className="bg-ink py-24 text-white sm:py-28">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-sky" data-reveal>
                Sermons
              </p>
              <h2 className="display mt-4 text-[clamp(2.4rem,5.6vw,4.6rem)]" data-reveal>
                Verse by verse.
              </h2>
            </div>
            <Link href="/sermons" className="btn btn-ghost" data-reveal>
              All sermons
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-5 lg:grid-cols-4 lg:grid-rows-2">
            {series.slice(0, 5).map((s, i) =>
              i === 0 ? (
                <Link
                  key={s.title}
                  href="/sermons"
                  data-reveal
                  className="group relative isolate col-span-2 block overflow-hidden rounded-2xl bg-night lg:row-span-2"
                >
                  <div className="relative aspect-video lg:aspect-auto lg:h-full">
                    <Image src={s.img} alt={`${s.title} sermon series`} fill sizes="(min-width: 1024px) 50vw, 100vw" className="-z-10 object-cover object-[30%_50%] transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/80 to-transparent p-5 pt-16">
                    <p className="eyebrow text-sun">Current series</p>
                    <p className="mt-1 text-2xl font-extrabold group-hover:text-sky sm:text-3xl">{s.title}</p>
                    <p className="text-sm text-white/65">{s.note}</p>
                  </div>
                </Link>
              ) : (
                <Link key={s.title} href="/sermons" data-reveal className="group flex flex-col">
                  <div className="relative aspect-video overflow-hidden rounded-xl bg-night">
                    <Image src={s.img} alt={`${s.title} sermon series`} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <p className="mt-3 text-[0.95rem] font-bold leading-tight group-hover:text-sky sm:text-lg">{s.title}</p>
                  <p className="hidden text-sm text-white/55 sm:block">{s.note}</p>
                </Link>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ───────── Meet the pastor ───────── */}
      <section className="bg-paper py-24 sm:py-32">
        <div className="wrap grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
          <div className="relative mx-auto aspect-[2/3] w-full max-w-md overflow-hidden rounded-[2rem]" data-reveal>
            <Image src="/photos/mike-and-julie-dorough.jpg" alt="Pastor Mike and Julie Dorough" fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />
          </div>
          <div>
            <p className="eyebrow text-royal" data-reveal>
              Meet the pastor
            </p>
            <h2 className="display mt-4 text-[clamp(2.6rem,6vw,5rem)]" data-reveal>
              Pastor Mike & Julie.
            </h2>
            <div className="prose-tc mt-6 text-lg leading-relaxed text-mute" data-reveal>
              <p>
                Mike and Julie Dorough are SEND Network church planters with the North American
                Mission Board, and they planted Transformation Church in 2023. Mike has served in ministry for
                more than three decades, from Virginia to Warner Robins to Northeast Georgia.
              </p>
              <p>
                After the service on Sunday, they make a point of meeting every guest. Come say
                hello. They’d love to know your name.
              </p>
            </div>
            <p className="scripture mt-8 text-2xl text-ink" data-reveal>
              “And we know that all things work together for good to them that love God.”
              <span className="eyebrow mt-2 block not-italic text-royal">Romans 8:28 · Pastor Mike’s life verse</span>
            </p>
            <Link href="/about#leaders" className="mt-8 inline-block font-bold text-royal hover:text-ink" data-reveal>
              Meet the whole team →
            </Link>
          </div>
        </div>
      </section>

      {/* ───────── 1 of 100 ───────── */}
      <section className="relative overflow-hidden bg-night py-24 text-white sm:py-32">
        <div className="wrap grid gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow text-sky" data-reveal>
              Invest in Transformation
            </p>
            <h2 className="display mt-4 text-[clamp(2.8rem,7vw,6rem)]" data-reveal>
              Be one <span className="text-sun">of 100.</span>
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/75" data-reveal>
              We’re asking God to raise up 100 people, families, churches and businesses to give
              $25 a week, or $100 a month: less than a family fast-food meal. It reaches our East
              Hall community for Christ and helps a young church plant budget with confidence.
            </p>
            <div className="mt-8 flex flex-wrap gap-3" data-reveal>
              <Link href="/give" className="btn btn-sun">
                Become 1 of 100
              </Link>
              <a href={org.give} className="btn btn-ghost">
                Give online
              </a>
            </div>
          </div>
          <div className="grid grid-cols-10 gap-2 sm:gap-3" aria-hidden data-reveal>
            {Array.from({ length: 100 }).map((_, i) => (
              <Mark
                key={i}
                strokeWidth={6}
                className={`aspect-[106/96] w-full ${i === 99 ? "text-sun" : "text-sky/35"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Closing ───────── */}
      <section className="relative isolate overflow-hidden bg-ink py-28 text-center text-white sm:py-40">
        <Image src="/photos/worship-band.jpg" alt="" fill sizes="100vw" className="-z-20 object-cover opacity-35" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink via-ink/70 to-ink" />
        <div className="wrap">
          <Mark draw className="mx-auto h-16 w-24 text-sky" strokeWidth={4} />
          <h2 className="display mt-8 text-[clamp(3rem,9vw,8rem)]" data-reveal>
            See you Sunday.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/80" data-reveal>
            10:00 AM at {org.street}, {org.city}, at the corner of Main & Banks beside Lula Pharmacy.
            There’s plenty of parking, and smiling people at the front door.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3" data-reveal>
            <Link href="/visit" className="btn btn-sun">
              Plan your visit
            </Link>
            <a href={org.directions} className="btn btn-ghost">
              Get directions
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
