import type { Metadata } from "next";
import Image from "next/image";
import { VisitForm } from "@/components/Forms";
import { PageHead } from "@/components/PageHead";
import { org, services } from "@/lib/site";

export const metadata: Metadata = {
  title: "Plan a Visit",
  description: "Sundays at 10:00 AM at 6102-C Banks St, Lula, GA. What to expect, kids’ church, and a form so we can meet you at the door.",
  alternates: { canonical: "/visit" },
};

const faqs = [
  ["What time does service start?", "Sunday mornings at 10:00 AM. Our adult Bible study meets Wednesday evenings at 6:30 PM in the Activity Room."],
  ["What should I wear?", "Come as you are. Wear whatever makes you feel comfortable."],
  ["Where do I park?", "There’s plenty of parking. Park anywhere and come in the front entrance. You’ll find lots of smiling people waiting to welcome you."],
  ["What should I expect?", "As you come in, one of our greeters will welcome you and show you where everything is: the children’s areas, the coffee bar and the auditorium. Someone from our team is always nearby if you need anything."],
  ["Is there something for my kids?", "Yes! Children’s church runs from nursery through 5th grade. Stop by the children’s check-in area when you arrive, or pre-register below to save time. Kids hear a Bible lesson made for their age while you worship."],
  ["Will I get to meet the pastor?", "Of course. After the morning service we invite guests to visit with Pastor Mike and his wife, Julie."],
];

export default function Visit() {
  return (
    <>
      <PageHead eyebrow="Plan a visit" title={<>We saved you a seat.</>} photo="/photos/sermon-full-room.jpg" position="center 40%">
        Visiting a church for the first time can feel like a lot. Let us take the guesswork out of it.
      </PageHead>

      <section className="bg-paper py-20 sm:py-28">
        <div className="wrap grid gap-6 md:grid-cols-3">
          {services.map((s) => (
            <div key={s.day} className="rounded-3xl bg-ink p-8 text-white" data-reveal>
              <p className="eyebrow text-sky">{s.day}s</p>
              <p className="display mt-3 text-5xl">{s.time}</p>
              <p className="mt-3 text-lg font-bold">{s.name}</p>
              <p className="text-white/60">{s.note}</p>
            </div>
          ))}
          <div className="rounded-3xl bg-royal p-8 text-white" data-reveal>
            <p className="eyebrow text-sky-soft">Where</p>
            <p className="display mt-3 text-4xl">{org.street}</p>
            <p className="mt-3 text-lg font-bold">{org.city}, Georgia {org.zip}</p>
            <a href={org.directions} className="mt-3 inline-block font-bold text-sun hover:underline">
              Get directions →
            </a>
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 bg-white py-20 sm:py-28">
        <div className="wrap grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow text-royal">Good questions</p>
            <h2 className="display mt-4 text-[clamp(2.4rem,5vw,4.2rem)]">What to expect.</h2>
            <div className="relative mt-10 hidden aspect-[3/4] overflow-hidden rounded-[2rem] lg:block">
              <Image src="/photos/pastor-mike-headshot.jpg" alt="Pastor Mike Dorough" fill sizes="35vw" className="object-cover" />
            </div>
          </div>
          <div className="divide-y divide-line border-y border-line">
            {faqs.map(([q, a]) => (
              <details key={q} className="group py-6" open={q.startsWith("What time")}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-xl font-bold [&::-webkit-details-marker]:hidden">
                  {q}
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-mist text-royal transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-mute">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="form" className="scroll-mt-24 bg-mist py-20 sm:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow text-royal">Let us know you’re coming</p>
            <h2 className="display mt-4 text-[clamp(2.4rem,5vw,4.2rem)]">We’ll meet you at the door.</h2>
            <p className="mt-6 text-lg leading-relaxed text-mute">
              Filling this out does two things. First, someone will be ready to meet you with a smile,
              show you around and save you from figuring it all out alone.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-mute">
              Second, if you have kids from newborn through 5th grade, you can pre-register them for
              Transformation Kids. They’ll already be in our check-in system, so Sunday morning is one
              less rush.
            </p>
          </div>
          <div className="rounded-[2rem] bg-white p-6 shadow-xl shadow-ink/5 sm:p-10">
            <VisitForm />
          </div>
        </div>
      </section>
    </>
  );
}
