"use client";

import { useState } from "react";
import { outreaches, serveTeams } from "@/lib/site";
import { Phone } from "./Reveal";
import { useForm } from "./useForm";

function Sent({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl bg-ink p-8 text-white sm:p-10">
      <p className="display text-4xl text-sun sm:text-5xl">{title}</p>
      <p className="mt-4 text-lg text-white/75">{children}</p>
    </div>
  );
}

function ErrorNote({ error }: { error: string }) {
  return (
    <p role="alert" className="rounded-xl bg-sun/15 p-4 font-semibold text-ink sm:col-span-2">
      {error} <Phone className="underline" fallback="" />
    </p>
  );
}

function Honeypot() {
  return (
    <div className="absolute -left-[9999px]" aria-hidden>
      <label>
        Company <input name="company" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

function NameAndReach({ prefix }: { prefix: string }) {
  return (
    <>
      <div className="sm:col-span-2">
        <label htmlFor={`${prefix}-name`} className="label">Your name</label>
        <input id={`${prefix}-name`} name="name" required className="field" autoComplete="name" />
      </div>
      <div>
        <label htmlFor={`${prefix}-phone`} className="label">Phone</label>
        <input id={`${prefix}-phone`} name="phone" type="tel" className="field" autoComplete="tel" />
      </div>
      <div>
        <label htmlFor={`${prefix}-email`} className="label">Email</label>
        <input id={`${prefix}-email`} name="email" type="email" className="field" autoComplete="email" />
      </div>
    </>
  );
}

type Kid = { name: string; age: string; notes: string };

/** Plan a visit, with optional kids' pre-registration so Sunday check-in is quick. */
export function VisitForm() {
  const { submit, status, error } = useForm("visit");
  const [kids, setKids] = useState<Kid[]>([]);

  if (status === "sent")
    return (
      <Sent title="We’ll be watching for you.">
        Someone will meet you at the door with a smile on Sunday at 10:00.
        {kids.length > 0 && " Your kids are pre-registered, so check-in will take a minute."}
      </Sent>
    );

  const setKid = (i: number, k: keyof Kid, v: string) =>
    setKids((ks) => ks.map((kid, j) => (j === i ? { ...kid, [k]: v } : kid)));

  return (
    <form
      className="relative grid gap-5 sm:grid-cols-2"
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        submit({ ...Object.fromEntries(fd.entries()), kids: kids.filter((k) => k.name.trim()) });
      }}
    >
      <NameAndReach prefix="v" />
      <div>
        <label htmlFor="v-when" className="label">Which Sunday?</label>
        <input id="v-when" name="when" className="field" placeholder="This Sunday, the 18th…" />
      </div>
      <div>
        <label htmlFor="v-size" className="label">How many coming?</label>
        <input id="v-size" name="size" type="number" min={1} max={20} defaultValue={1} className="field" />
      </div>

      <div className="sm:col-span-2">
        <span className="label">Bringing kids? (nursery–5th grade)</span>
        <div className="space-y-3">
          {kids.map((kid, i) => (
            <div key={i} className="grid gap-3 rounded-2xl border border-line bg-mist/50 p-4 sm:grid-cols-[1.4fr_0.6fr_1.6fr_auto]">
              <input aria-label="Child’s name" placeholder="Child’s name" className="field" value={kid.name} onChange={(e) => setKid(i, "name", e.target.value)} />
              <input aria-label="Age" placeholder="Age" className="field" value={kid.age} onChange={(e) => setKid(i, "age", e.target.value)} />
              <input aria-label="Allergies or notes" placeholder="Allergies or notes" className="field" value={kid.notes} onChange={(e) => setKid(i, "notes", e.target.value)} />
              <button type="button" className="rounded-xl px-3 font-bold text-mute hover:text-ink" onClick={() => setKids((ks) => ks.filter((_, j) => j !== i))} aria-label="Remove child">
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            className="chip"
            onClick={() => setKids((ks) => (ks.length < 8 ? [...ks, { name: "", age: "", notes: "" }] : ks))}
          >
            + Add a child
          </button>
        </div>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="v-notes" className="label">Anything we should know? (optional)</label>
        <textarea id="v-notes" name="notes" rows={3} className="field" placeholder="A wheelchair, a question, a prayer request…" />
      </div>
      <Honeypot />
      {status === "error" && <ErrorNote error={error} />}
      <div className="sm:col-span-2">
        <button type="submit" className="btn btn-ink" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "We’re coming"}
        </button>
      </div>
    </form>
  );
}

/** Join an outreach or a Sunday team. */
export function VolunteerForm({ preset }: { preset?: string }) {
  const { submit, status, error } = useForm("volunteer");

  if (status === "sent")
    return (
      <Sent title="You’re on the team.">
        Thank you! Pastor Mike or one of the team leaders will reach out to get you on a rotation.
      </Sent>
    );

  const options = [...outreaches.map((o) => o.name), ...serveTeams];

  return (
    <form
      className="relative grid gap-5 sm:grid-cols-2"
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        submit({ ...Object.fromEntries(fd.entries()), help: fd.getAll("help") });
      }}
    >
      <NameAndReach prefix="s" />
      <fieldset className="sm:col-span-2">
        <legend className="label">I’d like to help with…</legend>
        <div className="flex flex-wrap gap-2">
          {options.map((h) => (
            <label key={h} className="chip">
              <input type="checkbox" name="help" value={h} defaultChecked={h === preset} /> {h}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="sm:col-span-2">
        <label htmlFor="s-notes" className="label">Anything else? (optional)</label>
        <textarea id="s-notes" name="notes" rows={3} className="field" placeholder="I can donate 20 backpacks, I have a truck, I make a mean chili…" />
      </div>
      <Honeypot />
      {status === "error" && <ErrorNote error={error} />}
      <div className="sm:col-span-2">
        <button type="submit" className="btn btn-ink" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Count me in"}
        </button>
      </div>
    </form>
  );
}

const topics = ["A question", "Prayer request", "Talk with Pastor Mike", "Outreach & serving", "Giving", "Something else"];

export function ContactForm({ topic }: { topic?: string }) {
  const { submit, status, error } = useForm("contact");

  if (status === "sent")
    return <Sent title="Message sent.">Thank you. We’ll be in touch soon, and if you asked for prayer, we’re already praying.</Sent>;

  return (
    <form
      className="relative grid gap-5 sm:grid-cols-2"
      onSubmit={(e) => {
        e.preventDefault();
        submit(Object.fromEntries(new FormData(e.currentTarget).entries()));
      }}
    >
      <NameAndReach prefix="c" />
      <div className="sm:col-span-2">
        <label htmlFor="c-topic" className="label">What’s it about?</label>
        <select id="c-topic" name="topic" className="field" defaultValue={topic ?? topics[0]}>
          {topics.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="c-message" className="label">Message</label>
        <textarea id="c-message" name="message" rows={6} required className="field" />
      </div>
      <Honeypot />
      {status === "error" && <ErrorNote error={error} />}
      <div className="sm:col-span-2">
        <button type="submit" className="btn btn-ink" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}
