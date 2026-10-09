import type { Metadata } from "next";
import { Fill } from "@/components/Blank";
import { VolunteerForm } from "@/components/Forms";
import { Mark } from "@/components/Mark";
import { PageHead, Pair } from "@/components/PageHead";
import { outreaches, upcomingDate } from "@/lib/site";

export const metadata: Metadata = {
  title: "Outreach",
  description: "Free back-to-school backpacks, meals for our homeless neighbors, a kids’ outreach day and Christmas in the Park. Transformation Church in Lula, GA.",
  alternates: { canonical: "/outreach" },
};

// Dates drop off by themselves once they pass.
export const revalidate = 3600;

export default function Outreach() {
  return (
    <>
      <PageHead
        eyebrow="Outreach"
        title={
          <>
            Church, outside <span className="text-sun">the walls.</span>
          </>
        }
        photo="/photos/worship-hands-raised.jpg"
      >
        Transformation doesn’t stay inside on Sunday. Here’s how we serve Lula and East Hall, and how
        you can help. It’s all free, and it’s all for our neighbors.
      </PageHead>

      {outreaches.map((o, i) => {
        const next = upcomingDate(o);
        const dark = i % 2 === 0;
        return (
          <section
            key={o.slug}
            id={o.slug}
            className={`relative scroll-mt-16 overflow-hidden py-20 sm:py-28 ${dark ? "bg-ink text-white" : "bg-paper text-ink"}`}
          >
            <Mark
              className={`pointer-events-none absolute -bottom-16 ${i % 2 ? "-left-24" : "-right-24"} h-[24rem] w-[36rem] ${dark ? "text-white/[0.05]" : "text-royal/[0.07]"}`}
              strokeWidth={2.5}
            />
            <div className="wrap relative grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-start">
              <div>
                <p className={`eyebrow ${dark ? "text-sky" : "text-royal"}`}>
                  0{i + 1} · {o.name}
                </p>
                <h2 className="display mt-4 text-[clamp(3rem,9vw,7.2rem)]">
                  <Pair from={o.from} to={o.to} />
                </h2>
                <p className={`mt-8 max-w-xl text-xl leading-relaxed ${dark ? "text-white/80" : "text-mute"}`} data-reveal>
                  {o.blurb}
                </p>
              </div>
              <div className={`rounded-3xl p-7 sm:p-9 ${dark ? "bg-white/[0.06] ring-1 ring-white/10" : "bg-white shadow-xl shadow-ink/5"}`} data-reveal>
                <dl className="space-y-5">
                  <div>
                    <dt className="label">When</dt>
                    <dd className="text-lg font-bold">
                      {next || o.when}
                      {!next && (
                        <span className="mt-1 block text-sm font-normal opacity-80">
                          <Fill value="" label="Next date" />
                        </span>
                      )}
                    </dd>
                  </div>
                  <div>
                    <dt className="label">Where</dt>
                    <dd className="text-lg font-bold">
                      <Fill value={o.place} label="Location" />
                    </dd>
                  </div>
                  <div>
                    <dt className="label">What helps most</dt>
                    <dd className="mt-2 flex flex-wrap gap-2">
                      {o.needs.map((n) => (
                        <span key={n} className={`rounded-full px-3 py-1.5 text-sm font-semibold ${dark ? "bg-white/10" : "bg-mist"}`}>
                          {n}
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>
                <a href="#join" className={`btn mt-7 w-full ${dark ? "btn-sun" : "btn-ink"}`}>
                  I can help
                </a>
              </div>
            </div>
          </section>
        );
      })}

      <section id="join" className="scroll-mt-16 bg-mist py-20 sm:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow text-royal">Community Outreach Team</p>
            <h2 className="display mt-4 text-[clamp(2.4rem,5vw,4.2rem)]">Count me in.</h2>
            <p className="mt-6 text-lg leading-relaxed text-mute">
              You don’t have to be a member to serve. Tell us what you’d like to help with, and we’ll
              reach out before the next outreach. Want to give supplies instead? Say so in the note.
            </p>
          </div>
          <div className="rounded-[2rem] bg-white p-6 shadow-xl shadow-ink/5 sm:p-10">
            <VolunteerForm preset="Community outreach" />
          </div>
        </div>
      </section>
    </>
  );
}
