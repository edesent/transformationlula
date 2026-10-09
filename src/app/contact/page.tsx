import type { Metadata } from "next";
import { ContactForm } from "@/components/Forms";
import { PageHead } from "@/components/PageHead";
import { Phone } from "@/components/Reveal";
import { org, services } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Questions, prayer requests or a specific need? Reach Transformation Church in Lula, GA.",
  alternates: { canonical: "/contact" },
};

const topicFor: Record<string, string> = {
  prayer: "Prayer request",
  pastor: "Talk with Pastor Mike",
  giving: "Giving",
  serve: "Outreach & serving",
};

export default async function Contact({ searchParams }: { searchParams: Promise<{ topic?: string }> }) {
  const { topic } = await searchParams;
  return (
    <>
      <PageHead eyebrow="Contact" title={<>Let’s talk.</>} photo="/photos/sermon-full-room.jpg" position="center 35%">
        A question about the church, a prayer request or a specific need: we’d love to hear from you.
      </PageHead>

      <section className="bg-paper py-20 sm:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-8">
            <div>
              <p className="label">Call or text</p>
              <Phone className="display text-4xl hover:text-royal" fallback="Pastor Mike" />
            </div>
            <div>
              <p className="label">Visit</p>
              <p className="text-lg font-bold">
                {org.street}
                <br />
                {org.city}, GA {org.zip}
              </p>
              <a href={org.directions} className="font-bold text-royal hover:underline">
                Get directions →
              </a>
            </div>
            <div>
              <p className="label">Mail</p>
              <p className="text-lg">{org.mailing}</p>
            </div>
            <div>
              <p className="label">Gather</p>
              {services.map((s) => (
                <p key={s.day} className="text-lg">
                  <strong>{s.day}s, {s.time}</strong> · {s.name}
                </p>
              ))}
            </div>
          </div>
          <div className="rounded-[2rem] bg-white p-6 shadow-xl shadow-ink/5 sm:p-10">
            <ContactForm topic={topic ? topicFor[topic] : undefined} />
          </div>
        </div>
      </section>
    </>
  );
}
