import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Mark } from "@/components/Mark";
import { PageHead } from "@/components/PageHead";
import { leaders, org } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "Our story, our leaders and what we believe. Transformation Church is a SEND Network church plant in Lula, Georgia, launched in 2023.",
  alternates: { canonical: "/about" },
};

const beliefs = [
  ["The Bible", "God’s revelation of Himself, written by men divinely inspired. It has God for its author, salvation for its end, and truth, without any mixture of error, for its matter."],
  ["God", "One living and true God, eternally revealed as Father, Son and Holy Spirit, infinite in holiness, all powerful and all knowing."],
  ["Jesus Christ", "The eternal Son of God, born of the virgin Mary, who lived without sin, died in our place on the cross and rose bodily from the dead."],
  ["Salvation", "A free gift of God’s grace, received by repentance and faith in Jesus Christ as Lord and Savior. It cannot be earned."],
  ["The Church", "A local body of baptized believers, joined together to worship, grow, serve and carry the gospel to the ends of the earth."],
  ["The Great Commission", "Every believer is called to make disciples of all nations, starting right here in East Hall and Lula."],
];

export default function About() {
  return (
    <>
      <PageHead eyebrow="About us" title={<>A church for anyone who wants to be changed.</>} photo="/photos/worship-hands-raised.jpg">
        Transformation Church launched on {org.launched}. We’re a young, growing church family in Northeast Georgia.
      </PageHead>

      <section className="bg-paper py-20 sm:py-28">
        <div className="wrap grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow text-royal">Our story</p>
            <h2 className="display mt-4 text-[clamp(2.4rem,5.5vw,4.6rem)]">Thirty students and a lot of prayer.</h2>
          </div>
          <div className="prose-tc text-lg leading-relaxed text-mute" data-reveal>
            <p>
              With a faithful group of about thirty fired-up Truett McConnell University students, and
              a mix of people from every decade of life, from children to senior adults, we began
              planting Transformation Church.
            </p>
            <p>
              We prayed, worked hard and trusted God as we prepared to launch on February 26, 2023,
              in the East Hall Community Center. God met a large share of our needs before we ever
              opened the doors.
            </p>
            <p>
              Our desire is to be a church where anyone can be transformed by the truth of Jesus:
              serious about the Great Commission (Matthew 28:18–20) and about living the Greatest
              Commandments (Matthew 22:34–40). God has given us a multi-generational, multi-cultural
              congregation that is <strong className="text-ink">intentional</strong> about seeing lives{" "}
              <strong className="text-ink">transformed</strong> in Northeast Georgia and the nations,
              for the glory of God.
            </p>
            <p>
              Today we gather in Lula, at {org.street}. We’re a SEND Network church plant of the North
              American Mission Board and a Southern Baptist congregation.
            </p>
          </div>
        </div>
      </section>

      <section id="leaders" className="scroll-mt-20 bg-ink py-20 text-white sm:py-28">
        <div className="wrap">
          <p className="eyebrow text-sky">Pastors & staff</p>
          <h2 className="display mt-4 text-[clamp(2.4rem,5.5vw,4.6rem)]">The people you’ll meet.</h2>
          <div className="mt-14 space-y-20">
            {leaders.map((l, i) => (
              <article key={l.name} className="grid gap-8 md:grid-cols-[0.75fr_1.25fr] md:items-center md:gap-14" data-reveal>
                <div className={`relative aspect-[3/4] overflow-hidden rounded-[1.75rem] bg-night ${i % 2 ? "md:order-2" : ""}`}>
                  <Image src={l.photo} alt={l.name} fill sizes="(min-width: 768px) 35vw, 100vw" className="object-cover" />
                </div>
                <div>
                  <p className="eyebrow text-sun">{l.role}</p>
                  <h3 className="display mt-3 text-[clamp(2rem,4.4vw,3.6rem)]">{l.name}</h3>
                  <div className="prose-tc mt-5 text-lg leading-relaxed text-white/75">
                    {l.bio.map((b) => (
                      <p key={b.slice(0, 20)}>{b}</p>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="beliefs" className="scroll-mt-20 bg-white py-20 sm:py-28">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-royal">What we believe</p>
              <h2 className="display mt-4 text-[clamp(2.4rem,5.5vw,4.6rem)]">Built on the Book.</h2>
            </div>
            <p className="max-w-md text-mute">
              We affirm the{" "}
              <a href="https://bfm.sbc.net/bfm2000/" className="font-bold text-royal underline">
                Baptist Faith & Message 2000
              </a>
              . Here it is in brief.
            </p>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {beliefs.map(([t, d]) => (
              <div key={t} className="bg-white p-8" data-reveal>
                <Mark className="h-6 w-9 text-sky" strokeWidth={7} />
                <h3 className="mt-5 text-xl font-extrabold">{t}</h3>
                <p className="mt-3 leading-relaxed text-mute">{d}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-mute">
            Want the full picture? Our{" "}
            <Link href="/grow#course" className="font-bold text-royal underline">
              New Members Course
            </Link>{" "}
            walks through our message, model and mission in five short videos.
          </p>
        </div>
      </section>
    </>
  );
}
