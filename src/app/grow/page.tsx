import type { Metadata } from "next";
import Link from "next/link";
import { VolunteerForm } from "@/components/Forms";
import { PageHead } from "@/components/PageHead";
import { Video } from "@/components/Video";
import { memberCourse, serveTeams } from "@/lib/site";

export const metadata: Metadata = {
  title: "Grow",
  description: "Next steps at Transformation Church: the New Members Course, serving on a team, and our prayer ministry.",
  alternates: { canonical: "/grow" },
};

export default function Grow() {
  return (
    <>
      <PageHead eyebrow="Next steps" title={<>Belong. Serve. <span className="text-sun">Pray.</span></>} photo="/photos/worship-hands-raised.jpg">
        Transformation is a lifelong journey, and nobody walks it alone. Here’s where to take your next step.
      </PageHead>

      <section id="course" className="scroll-mt-16 bg-paper py-20 sm:py-28">
        <div className="wrap">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
            <div>
              <p className="eyebrow text-royal">New Members Course</p>
              <h2 className="display mt-4 text-[clamp(2.4rem,5.5vw,4.6rem)]">Five videos. One family.</h2>
            </div>
            <p className="text-lg leading-relaxed text-mute">
              Five short sessions (about twenty minutes each) on what Transformation Church believes and
              what we’re working toward in the East Hall community. Watch at home, then download the guide
              for each part.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {memberCourse.map((c) => (
              <article key={c.part} className="overflow-hidden rounded-3xl bg-white shadow-lg shadow-ink/5" data-reveal>
                <div className="relative aspect-video bg-ink">
                  <Video id={c.youtube} title={`New Members Course Part ${c.part}: ${c.title}`} />
                </div>
                <div className="flex items-center justify-between gap-4 p-6">
                  <div>
                    <p className="eyebrow text-royal">Part {c.part} · {c.length}</p>
                    <h3 className="mt-1 text-xl font-extrabold">{c.title}</h3>
                  </div>
                  <a href={c.pdf} className="shrink-0 rounded-full border-[1.5px] border-line px-4 py-2 text-sm font-bold hover:border-royal hover:text-royal">
                    Guide (PDF)
                  </a>
                </div>
              </article>
            ))}
            <div className="flex flex-col justify-between rounded-3xl bg-royal p-8 text-white" data-reveal>
              <p className="display text-3xl">Ready to join?</p>
              <p className="mt-3 text-white/80">
                Also worth a read: the Baptist Faith & Message 2000 and our church bylaws. Then talk with
                Pastor Mike about membership.
              </p>
              <Link href="/contact?topic=pastor" className="btn btn-sun mt-6 self-start">
                Talk with Pastor Mike
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="serve" className="scroll-mt-16 bg-ink py-20 text-white sm:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow text-sky">Serve</p>
            <h2 className="display mt-4 text-[clamp(2.4rem,5.5vw,4.6rem)]">There’s a spot with your name on it.</h2>
            <p className="mt-6 text-lg leading-relaxed text-white/75">
              We’re a portable church plant, so every Sunday takes many hands: first impressions, kids,
              music, media, NextGen and much more. Our First Impressions team serves behind the scenes
              too: security, medical response, coffee baristas and greeters.
            </p>
            <p className="mt-4 text-lg font-bold text-sun">You don’t have to be a member to serve.</p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {serveTeams.map((t) => (
                <li key={t} className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[2rem] bg-white p-6 text-ink sm:p-10">
            <VolunteerForm />
          </div>
        </div>
      </section>

      <section id="prayer" className="scroll-mt-16 bg-paper py-20 sm:py-28">
        <div className="wrap max-w-4xl text-center">
          <p className="eyebrow text-royal">Prayer ministry</p>
          <p className="scripture mt-6 text-[clamp(2rem,5vw,3.8rem)] leading-tight">“My house shall be called the house of prayer.”</p>
          <p className="eyebrow mt-4 text-mute">Matthew 21:13</p>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-mute">
            Prayer is the engine of everything we do. Send us a request and our prayer team will lift
            it up this week, or ask about joining the team. Cynthia Brooks leads our prayer ministry.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/contact?topic=prayer" className="btn btn-ink">
              Send a prayer request
            </Link>
            <Link href="/contact?topic=prayer" className="btn border-[1.5px] border-ink/25 hover:bg-mist">
              Join the prayer team
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
