import { createHmac, randomBytes, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";
import { org } from "@/lib/site";

/**
 * The endpoint behind every form: contact/prayer, plan-a-visit and volunteer.
 *
 * Messages can go two ways, and the church picks one or both:
 *   - Slack/Teams: FORM_WEBHOOK_URL (an incoming webhook), so they reach
 *     Pastor Mike's phone in seconds.
 *   - Email via Resend: RESEND_API_KEY + FORM_EMAIL_TO (comma-separated) and
 *     FORM_EMAIL_FROM (an address on a domain verified in Resend). Replying
 *     to the email answers the person who filled in the form.
 * Until at least one is set the endpoint answers 503 and the form honestly
 * tells people to call instead.
 *
 * Spam defences: a signed load-time token that must be at least 3 seconds
 * old, a honeypot, a per-IP rate limit, and no web links in free text.
 * The honeypot drops bots; validation failures and rate limits show a clear retry error.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SECRET = process.env.FORM_SECRET || process.env.FORM_WEBHOOK_URL || process.env.RESEND_API_KEY || "";
const MIN_FILL_MS = 3000;
const MAX_AGE_MS = 1000 * 60 * 60 * 6;

function sign(ts: string) {
  return createHmac("sha256", SECRET).update(ts).digest("hex");
}

function tokenOk(token: unknown) {
  if (!SECRET) return true;
  if (typeof token !== "string") return false;
  const [ts, sig] = token.split(".");
  if (!ts || !sig) return false;
  const expected = Buffer.from(sign(ts));
  const given = Buffer.from(sig);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return false;
  const age = Date.now() - Number(ts);
  return age >= MIN_FILL_MS && age <= MAX_AGE_MS;
}

export async function GET() {
  const ts = String(Date.now());
  return NextResponse.json(
    { token: SECRET ? `${ts}.${sign(ts)}` : `${ts}.${randomBytes(8).toString("hex")}` },
    { headers: { "Cache-Control": "no-store" } },
  );
}

const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const clean = (v: unknown, max = 2000) =>
  typeof v === "string"
    ? v.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "").trim().slice(0, max)
    : "";

// Email addresses are removed before the check, so "write me at
// jane@gmail.com" is never mistaken for a spam link.
const hasLink = (s: string) => {
  const t = s.replace(/[^\s@]+@[^\s@]+/g, "");
  return /(https?:\/\/|www\.)/i.test(t) || /\.(com|net|ru|xyz|top|info)\b/i.test(t);
};
const okEmail = (s: string) => !s || /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(s);
const fake = () => NextResponse.json({ ok: true });

type Body = Record<string, unknown>;
type Built = { text: string } | { error: string } | { spam: true };

function who(b: Body): { name: string; email: string; phone: string } | { error: string } {
  const name = clean(b.name, 80);
  const email = clean(b.email, 120);
  const phone = clean(b.phone, 40);
  if (name.split(/\s+/).filter(Boolean).length < 2) return { error: "Please give your first and last name." };
  if (!email && !phone) return { error: "Leave a phone or email so we can reach you." };
  if (!okEmail(email)) return { error: "That email address does not look right." };
  return { name, email, phone };
}

const lines = (xs: (string | false | 0 | undefined)[]) => xs.filter(Boolean).join("\n");

function contactMessage(b: Body): Built {
  const w = who(b);
  if ("error" in w) return w;
  const topic = clean(b.topic, 60);
  const message = clean(b.message, 4000);
  if (!message) return { error: "Please write a message." };
  if ([w.name, message, topic].some(hasLink)) return { spam: true };
  return {
    text: lines([
      `*${topic === "Prayer request" ? "Prayer request" : "New message"} — ${org.short} website*`,
      `*Name:* ${w.name}`,
      w.email && `*Email:* ${w.email}`,
      w.phone && `*Phone:* ${w.phone}`,
      topic && `*About:* ${topic}`,
      "",
      message,
    ]),
  };
}

function visitMessage(b: Body): Built {
  const w = who(b);
  if ("error" in w) return w;
  const when = clean(b.when, 80);
  const size = Math.max(1, Math.min(20, Number(b.size) || 1));
  const notes = clean(b.notes, 1000);
  const kids = Array.isArray(b.kids)
    ? b.kids.slice(0, 8).map((k: Record<string, unknown>) => ({
        name: clean(k?.name, 60),
        age: clean(k?.age, 10),
        notes: clean(k?.notes, 200),
      }))
    : [];
  if ([w.name, notes, when, ...kids.map((k) => k.name + k.notes)].some(hasLink)) return { spam: true };
  return {
    text: lines([
      `*Planning a visit — ${org.short}*`,
      `*Name:* ${w.name}`,
      `*Party of:* ${size}`,
      when && `*When:* ${when}`,
      w.email && `*Email:* ${w.email}`,
      w.phone && `*Phone:* ${w.phone}`,
      kids.length > 0 && `*Kids to pre-register:*\n${kids.map((k) => `• ${k.name}${k.age ? `, ${k.age}` : ""}${k.notes ? ` (${k.notes})` : ""}`).join("\n")}`,
      notes && `*Notes:* ${notes}`,
    ]),
  };
}

function volunteerMessage(b: Body): Built {
  const w = who(b);
  if ("error" in w) return w;
  const help = Array.isArray(b.help) ? b.help.map((h) => clean(h, 60)).filter(Boolean) : [];
  const notes = clean(b.notes, 1000);
  if (!help.length && !notes) return { error: "Pick at least one way you’d like to help." };
  if ([w.name, notes].some(hasLink)) return { spam: true };
  return {
    text: lines([
      `*New volunteer — ${org.short}*`,
      `*Name:* ${w.name}`,
      w.email && `*Email:* ${w.email}`,
      w.phone && `*Phone:* ${w.phone}`,
      help.length > 0 && `*Wants to help with:* ${help.join(", ")}`,
      notes && `*Notes:* ${notes}`,
    ]),
  };
}

export async function POST(request: Request) {
  const raw = await request.text();
  if (raw.length > 12_000) return NextResponse.json({ error: "Too long." }, { status: 413 });

  let body: Body;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (body.website || body.company) return fake();
  if (!tokenOk(body.token)) {
    return NextResponse.json({ error: "Please wait a moment and send the form again." }, { status: 400 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(`${body.kind}:${ip}`)) {
    return NextResponse.json({ error: "You’ve sent several messages. Please try again in a few minutes, or call us." }, { status: 429 });
  }

  const built =
    body.kind === "contact"
      ? contactMessage(body)
      : body.kind === "visit"
        ? visitMessage(body)
        : body.kind === "volunteer"
          ? volunteerMessage(body)
          : null;
  if (!built) return NextResponse.json({ error: "Unknown form." }, { status: 400 });
  if ("spam" in built) {
    return NextResponse.json({ error: "Please leave website links out of the form and try again." }, { status: 400 });
  }
  if ("error" in built) return NextResponse.json({ error: built.error }, { status: 400 });

  const webhook = process.env.FORM_WEBHOOK_URL;
  const resendKey = process.env.RESEND_API_KEY;
  const emailTo = (process.env.FORM_EMAIL_TO || "").split(",").map((a) => a.trim()).filter(Boolean);
  const sendEmail = Boolean(resendKey && emailTo.length);
  if (!webhook && !sendEmail) {
    return NextResponse.json(
      { error: "Our online form isn’t connected yet. Please call Pastor Mike. We’d love to hear from you." },
      { status: 503 },
    );
  }

  const replyTo = clean(body.email, 120);
  const subject = built.text.split("\n")[0].replace(/\*/g, "");
  const attempts: Promise<Response>[] = [];

  if (webhook) {
    attempts.push(
      fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: built.text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"),
          unfurl_links: false,
          unfurl_media: false,
        }),
        signal: AbortSignal.timeout(10_000),
      }),
    );
  }
  if (sendEmail) {
    attempts.push(
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.FORM_EMAIL_FROM || `${org.short} website <onboarding@resend.dev>`,
          to: emailTo,
          subject,
          text: built.text.replace(/\*/g, ""),
          ...(okEmail(replyTo) && replyTo ? { reply_to: replyTo } : {}),
        }),
        signal: AbortSignal.timeout(10_000),
      }),
    );
  }

  // The message counts as delivered if at least one channel took it.
  const results = await Promise.allSettled(attempts);
  const delivered = results.some((r) => r.status === "fulfilled" && r.value.ok);
  if (!delivered) {
    return NextResponse.json({ error: "We couldn’t send that just now. Please call Pastor Mike instead." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
