import type { Metadata } from "next";
import Link from "next/link";
import { Mark } from "@/components/Mark";
import { PageHead } from "@/components/PageHead";
import { org } from "@/lib/site";

export const metadata: Metadata = {
  title: "Give",
  description: "Give online to Transformation Church, or become “1 of 100”: $25 a week to help reach Lula and East Hall for Christ.",
  alternates: { canonical: "/give" },
};

const ways = [
  ["Online", "Give once or set up a recurring gift by card or bank account. Choose “1 of 100” to join the campaign.", "Give online", org.give],
  ["On Sunday", "There’s a place to give during worship every Sunday at 10:00 AM.", "", ""],
  ["By mail", `Make checks payable to Transformation Church and mail them to ${org.mailing}.`, "", ""],
];

export default function Give() {
  return (
    <>
      <PageHead eyebrow="Give" title={<>Help us transform lives in <span className="text-sun">our town.</span></>} photo="/photos/congregation-seated.jpg">
        Every gift helps reach our East Hall community and the nations for Christ.
      </PageHead>

      <section className="relative overflow-hidden bg-night py-20 text-white sm:py-28">
        <div className="wrap grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="eyebrow text-sky">The 1 of 100 campaign</p>
            <h2 className="display mt-4 text-[clamp(2.8rem,7vw,6rem)]">
              $25 a week.
              <br />
              <span className="text-sun">One of 100.</span>
            </h2>
            <div className="prose-tc mt-8 text-lg leading-relaxed text-white/75">
              <p>
                As we continue the journey God has put in front of us, we’re asking Him to raise up 100
                people, churches, families or businesses who will each be “1 of 100.”
              </p>
              <p>
                For $25 a week, or $100 a month (less than a family fast-food meal each week), you’ll help
                share Christ with our community and provide a small salary for our staff. It also helps a
                young church budget well in its early days.
              </p>
              <p>
                Would you, your Sunday school class, your church or your business prayerfully consider it?
                It will reap <strong className="text-white">eternal dividends</strong>.
              </p>
            </div>
            <a href={org.give} className="btn btn-sun mt-9">
              Choose “1 of 100” →
            </a>
          </div>
          <div className="grid grid-cols-10 gap-2 sm:gap-3" aria-hidden data-reveal>
            {Array.from({ length: 100 }).map((_, i) => (
              <Mark key={i} strokeWidth={6} className={`aspect-[106/70] w-full ${i === 99 ? "text-sun" : "text-sky/35"}`} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-20 sm:py-28">
        <div className="wrap">
          <p className="eyebrow text-royal">Ways to give</p>
          <h2 className="display mt-4 text-[clamp(2.2rem,5vw,4rem)]">However works for you.</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {ways.map(([t, d, cta, href]) => (
              <div key={t} className="flex flex-col rounded-3xl bg-white p-8 shadow-lg shadow-ink/5" data-reveal>
                <p className="display text-3xl">{t}</p>
                <p className="mt-4 flex-1 leading-relaxed text-mute">{d}</p>
                {cta && (
                  <a href={href} className="btn btn-ink mt-6 self-start">
                    {cta}
                  </a>
                )}
              </div>
            ))}
          </div>
          <p className="mt-12 text-mute">
            Questions about giving?{" "}
            <Link href="/contact?topic=giving" className="font-bold text-royal underline">
              Send us a note
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
