# Transformation Church: website

Transformation Church · 6102-C Banks St., Lula, GA 30554 · Pastor Mike Dorough · SBC / SEND Network plant, launched Feb 26, 2023.

Next.js **16.2.1** (App Router) · React 19 · Tailwind CSS **v4** · deployed on
Vercel, which rebuilds automatically on every push to `main`.

Preview: https://transformationlula.dfd.llc (hidden from search engines).
Their current site: https://wearetransformation.org (SnapPages + Subsplash).

## The idea

"Be transformed." (Romans 12:2, which is already on their homepage.) Every
outreach is shown as a before → after: the old word struck through, the new
one in sunrise gold (*~~hungry~~ fed.*, *~~empty-handed~~ ready.*). The hero
cycles through those pairs (`src/components/Transform.tsx`). Their triangle
logo is redrawn as an SVG (`src/components/Mark.tsx`) and draws itself in on
load. The "1 of 100" giving campaign is drawn as 100 triangles.

## Where things live

| What | File |
| --- | --- |
| Name, address, phone, links, service times, nav | `src/lib/site.ts` |
| The four outreaches (dates, places, needs) | `outreaches` in `src/lib/site.ts` |
| Pastors & staff bios | `leaders` in `src/lib/site.ts` |
| Sermon series cards | `series` in `src/lib/site.ts` (art in `public/series/`) |
| New Members Course videos + PDFs | `memberCourse` in `src/lib/site.ts` |
| Colours & fonts | `src/app/globals.css` |

## Fill-in blanks

Anything we don't know yet shows as a **dashed "fill in" chip** (`<Fill>` in
`src/components/Blank.tsx`). Type the real value between the empty quotes
(`""`) in `src/lib/site.ts` and the chip becomes plain text everywhere.

- Each outreach's next `date`, `endsOn` and `place`.

## Outreach dates expire by themselves

Each outreach has `date` (shown as written, e.g. "Saturday, Dec 12 · 6 PM") and
`endsOn` (`YYYY-MM-DD`). After `endsOn`, the date disappears and the season
text (`when`) shows instead. Pages that show them use
`export const revalidate = 3600` (hourly). **Keep that line**, or the dates
freeze at build time.

## Conventions (read before editing)

- **Next 16:** `params` and `searchParams` are Promises, so `await` them (see
  `src/app/contact/page.tsx`). Don't copy Next 13/14 page signatures.
- **Never name a component prop `ref` or `key`** (React 19 reserves them).
- **Don't import constants from a `"use client"` file into a server page.**
  Shared data lives in `src/lib/`.
- **Custom CSS classes go inside `@layer components`** in `globals.css`.
- **The phone number** is stored base64'd in `site.ts` and put together in the
  browser (`Phone` in `src/components/Reveal.tsx`) so scrapers can't harvest
  it. Don't paste the raw digits into pages. No raw email addresses on the
  site either; link `/contact`.
- **Scroll reveals** use `data-reveal`; `Reveal` in the layout watches for new
  ones after every navigation. Shown state is the `data-in` attribute.
- **Fonts are self-hosted** in `src/fonts/` (Archivo variable with a width axis,
  Newsreader italic for Scripture). Don't switch to `next/font/google`.
- **Photos:** real photos of the church only. No stock and no AI images.
  Sermon-series art is their own artwork from Subsplash.

## Forms

Contact/prayer, plan-a-visit (with kids' pre-registration) and volunteer forms
post to `/api/form`, which forwards to **`FORM_WEBHOOK_URL`** (a Slack incoming
webhook). Until that env var is set in Vercel, the forms say so and show the
phone number. You can also set `FORM_SECRET` for the anti-spam token.

## Giving & sermons

Both stay on their existing Subsplash account (`org.give`, `org.sermons`).
"1 of 100" is a fund they already offer on their Subsplash give form.

## Going live

While the site is on a preview address it hides itself from search engines.
When their domain is connected, set
`NEXT_PUBLIC_SITE_URL=https://wearetransformation.org` in Vercel and redeploy.
Before moving DNS, check their mail records (the domain carries email) and
redirect old SnapPages URLs (`/leadership`, `/what-we-believe`, `/faq-s`,
`/plan-a-visit-page`, `/new-member-video-course`, `/serve`, `/prayer`,
`/contact-us`) to the new pages.

## To confirm with the church

- **Outreach copy is a draft.** The four outreaches came from their grant
  application; the descriptions, "what helps most" lists and seasons are our
  best guess. Confirm dates, places and details.
- **Parking:** their old FAQ mentions the East Hall Community Center, where they
  launched. The new site just says "plenty of parking".
- **Phone** (478) 954-7115 came from the grant form (Pastor Mike). Confirm it's
  OK to publish.
- The contact page on their old site says ZIP 30557; everything else says 30554.
- Their old site lists both mike@ and info@ addresses. Forms will go to Slack
  (or whichever inbox they prefer).
- Lucas & Bethany Maloch's bio on the old site mentioned a baby due Dec 2025;
  left out until updated.
- Scripture quotes: Romans 12:2 (ESV wording), Romans 8:28 (KJV), Matthew 21:13.
  Swap to their preferred translation.
