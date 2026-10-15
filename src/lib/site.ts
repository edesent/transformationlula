/**
 * Everything about the church in one place. Edit values here and every page
 * updates. Empty strings ("") show as a dashed "fill in" chip on the site.
 */

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://transformationlula.elijahdesent.com";

// While the site lives on a preview address it hides itself from search
// engines. Setting NEXT_PUBLIC_SITE_URL to their real domain flips this off.
export const isDemo = !/wearetransformation\.org$/.test(new URL(siteUrl).hostname);

export const org = {
  name: "Transformation Church",
  short: "Transformation",
  tagline: "Be transformed.",
  street: "6102-C Banks St.",
  city: "Lula",
  state: "Georgia",
  stateCode: "GA",
  zip: "30554",
  landmark: "Corner of Main & Banks, beside Lula Pharmacy",
  mailing: "P.O. Box 116, Lula, GA 30554",
  // Pastor Mike's number, base64'd so it is never in the HTML for scrapers.
  phoneB64: "NDc4OTU0NzExNQ==",
  launched: "February 26, 2023",
  directions:
    "https://www.google.com/maps/dir/?api=1&destination=6102-C+Banks+St,+Lula,+GA+30554",
  facebook: "https://www.facebook.com/tcgainesville",
  instagram: "https://www.instagram.com/tcgainesville/",
  youtube: "https://www.youtube.com/@TransformationChurchofLula",
  give: "https://subsplash.com/u/-HWRWRC/give",
  sermons: "https://subsplash.com/+5wc3/media",
};

export const services = [
  { day: "Sunday", name: "Worship", time: "10:00 AM", note: "Kids’ church, nursery through 5th grade" },
  { day: "Wednesday", name: "Adult Bible Study", time: "6:30 PM", note: "In the Activity Room" },
];

export const nav = [
  { href: "/about", label: "About" },
  { href: "/outreach", label: "Outreach" },
  { href: "/sermons", label: "Sermons" },
  { href: "/grow", label: "Grow" },
  { href: "/give", label: "Give" },
];

/**
 * The four outreaches. `from` and `to` are the before → after shown with a
 * strike-through on the site.
 *
 * Dates: put the next date in `date` (shown as written) and the last day in
 * `endsOn` (YYYY-MM-DD). After `endsOn` passes, the date line disappears by
 * itself and the season (`when`) shows instead. Update them each year.
 */
export type Outreach = {
  slug: string;
  name: string;
  from: string;
  to: string;
  when: string;
  date: string;
  endsOn: string;
  place: string;
  blurb: string;
  needs: string[];
  photo?: string;
  photoAlt?: string;
};

export const outreaches: Outreach[] = [
  {
    slug: "backpacks",
    name: "Back-to-School Backpacks",
    from: "empty-handed",
    to: "ready",
    when: "Every July, before the first bell",
    date: "",
    endsOn: "",
    place: "East Hall Community Center, 3911 P Davidson Rd, Gainesville",
    blurb:
      "FREE backpacks, FREE school supplies and a FREE BBQ lunch for the kids of Lula and East Hall. Tables full of backpacks, a kitchen full of volunteers, and a church family cheering every kid into the new school year. (Each child must be present.)",
    needs: ["Backpacks", "Notebooks & folders", "Pencils, crayons, glue", "Kitchen & lunch crew"],
    photo: "/photos/backpacks-volunteers.jpg",
    photoAlt: "Two volunteers smiling behind tables piled with free backpacks at the July 2026 giveaway",
  },
  {
    slug: "feeding",
    name: "Feeding the Homeless",
    from: "hungry",
    to: "fed",
    when: "Throughout the year",
    date: "",
    endsOn: "",
    place: "",
    blurb:
      "Hot meals carried to neighbors who are living without a home. We bring food, sit down, learn names and pray with anyone who would like it.",
    needs: ["Cooks", "Drivers", "Bottled water", "Socks & hygiene kits"],
  },
  {
    slug: "kids",
    name: "Kids Outreach Event",
    from: "strangers",
    to: "friends",
    when: "Once a year",
    date: "",
    endsOn: "",
    place: "",
    blurb:
      "A big, loud, free day for children and their families: games, food, a Bible story and a church that is genuinely glad to meet them.",
    needs: ["Game leaders", "Grill crew", "Face painters", "Prizes & candy"],
    photo: "/photos/kids-girls.jpg",
    photoAlt: "Three smiling girls at Transformation Church",
  },
  {
    slug: "christmas",
    name: "Christmas in the Park",
    from: "alone",
    to: "together",
    when: "Every December",
    date: "",
    endsOn: "",
    place: "",
    blurb:
      "Lula’s Christmas night out. Carols, cocoa, lights and the story of the first Christmas, told in the open air for the whole town. Everyone is welcome.",
    needs: ["Hot cocoa table", "Carolers", "Set-up crew", "Hand warmers"],
    photo: "/photos/christmas-candlelight.jpg",
    photoAlt: "The church family singing by candlelight at a Christmas service",
  },
];

/**
 * One-off events. Each disappears by itself the day after `endsOn`.
 */
export const events = [
  {
    name: "Christmas Concert with Jeff Cleghorn",
    date: "Sunday, December 6 · 6:00 PM",
    endsOn: "2026-12-06",
    place: "Transformation Church, 6102-C Banks St.",
    blurb:
      "A night of Christmas music with Pastor Mike’s friend Jeff Cleghorn, a full-time music evangelist whose latest recording was made with the Prague Philharmonic Orchestra. Bring the whole family and a neighbor.",
  },
];

export function upcomingEvents(now = new Date()) {
  const today = now.toISOString().slice(0, 10);
  return events.filter((e) => e.endsOn >= today);
}

/** The next date for an outreach, or "" once it has passed. */
export function upcomingDate(o: Outreach, now = new Date()) {
  if (!o.date || !o.endsOn) return "";
  const today = now.toISOString().slice(0, 10);
  return o.endsOn >= today ? o.date : "";
}

export const leaders = [
  {
    name: "Mike & Julie Dorough",
    role: "Lead / Founding Pastor",
    photo: "/photos/mike-and-julie-dorough.jpg",
    bio: [
      "Pastor Mike is a Cordele native, a University of Georgia graduate (UGA Concert Band) and holds a master’s degree from Liberty Baptist Theological Seminary. Prince Avenue Baptist Church in Athens licensed him to the gospel ministry in 1990.",
      "After almost seven years as a youth pastor in Virginia, he served at Second Baptist Warner Robins from 1996. In 2016 God called the Doroughs to Northeast Georgia, and today Mike and Julie are SEND Network church planters with the North American Mission Board. He has led mission trips to Russia, Germany, Brazil, Poland, the Bahamas and Nicaragua.",
      "Mike and Julie married in 1988. Julie, also a UGA graduate, leads our Children’s Ministry. They have two grown children and two grandsons, and they love Georgia Bulldog sports and the beach. Mike’s life verse is Romans 8:28; his favorite song is “Because He Lives.”",
    ],
  },
  {
    name: "Brad & Amanda Thomas",
    role: "Associate Pastor",
    photo: "/photos/brad-and-amanda-thomas.jpg",
    bio: [
      "Brad grew up in a minister’s home and trusted Christ at fourteen during a revival service. He served our country in the U.S. Navy and works in telecommunications. He answered the call to preach in 2006 and was ordained at Glory Road Baptist Church in 2011.",
      "Brad and Amanda (“Poo”) have five children, two sons-in-law and a granddaughter, Summer. Brad loves fishing, hunting and hiking, especially in the mountains of Montana and Wyoming. Favorite verse: Ephesians 1:6.",
    ],
  },
  {
    name: "Lucas & Bethany Maloch",
    role: "Worship Pastor",
    photo: "/photos/lucas-and-bethany-maloch.jpg",
    bio: [
      "Lucas-Waylon is the second person licensed to gospel ministry by Transformation Church. An East Hall High graduate, he has played guitar and other stringed instruments for more than sixteen years. Bethany is a kindergarten paraprofessional with Gainesville City Schools.",
      "They love anything outdoors: hiking, camping, kayaking. Lucas is restoring his grandpa’s 1949 Dodge Forestry truck with his dad. His favorite hymn is “I Saw the Light.”",
    ],
  },
  {
    name: "David Berliner",
    role: "Director of Technology",
    photo: "/photos/david-berliner.jpg",
    bio: [
      "David started running sound for a youth choir in Cleveland, Georgia in the mid-’70s and served Concord Baptist in Clermont for 22 years, helping launch three satellite campuses.",
      "Today he edits and uploads our weekly sermons, runs the sound desk and looks after everything technical, so every Sunday in our new Lula home sounds like worship and not like wires.",
    ],
  },
];

// Subsplash links: a series is `${media}/l/<code>-<name>`, one sermon is
// `${media}/d/<code>-<name>`. Copy them from the library; the old `/u/-HWRWRC/media`
// addresses show "Page not found".
const media = "https://subsplash.com/u/transformationchurch-ga/media";

/**
 * Sermon series, newest first. The first one shows as the current series.
 * `url` is the series page in their Subsplash media library. `messages` is the
 * count for a finished series; leave it off while a series is still running.
 */
export const series: { title: string; note: string; img: string; url: string; messages?: number }[] = [
  { title: "People Get Ready: Revelation", note: "Verse by verse through Revelation", img: "/series/revelation.jpg", url: `${media}/l/hn45gm4-revelation` },
  { title: "Why Are We Here in Lula?", note: "Connect people with Jesus", img: "/series/why-are-we-here-in-lula.jpg", url: `${media}/l/96775vh-why-are-we-here-in-lula`, messages: 4 },
  { title: "Take It Up a Notch", note: "2 Peter 1:3–11", img: "/series/take-it-up-a-notch.jpg", url: `${media}/l/95sz832-take-it-up-a-notch`, messages: 2 },
  { title: "He Is Risen", note: "Easter", img: "/series/he-is-risen.jpg", url: `${media}/l/zp3mdzq-he-is-risen`, messages: 4 },
  { title: "Relentless Love", note: "The Book of Hosea", img: "/series/relentless-love.jpg", url: `${media}/l/v23txv7-relentless-love-series`, messages: 9 },
  { title: "Stand", note: "A series on standing firm", img: "/series/stand.jpg", url: `${media}/l/7xdqmmf-stand-series`, messages: 4 },
  { title: "The Book of James", note: "Real talk. Real life. Real faith.", img: "/series/book-of-james.jpg", url: `${media}/l/g5t4m7d-the-book-of-james`, messages: 10 },
  { title: "The Book of John", note: "That you may believe", img: "/series/book-of-john.jpg", url: `${media}/l/cgww4fm-book-of-john`, messages: 9 },
  { title: "Single-Topic Sermons", note: "One Sunday, one subject", img: "/series/single-topic-sermons.jpg", url: `${media}/l/qyjrghx-single-topic-sermons` },
];

/** The most recent Sunday messages, newest first. Each links to its page on Subsplash. */
export const recentSermons = [
  { date: "Oct 11", title: "Who Else Is Worthy", part: "Revelation, Part 9", speaker: "Pastor Mike Dorough", url: `${media}/d/4qdk2tt-part-9-who-else-is-worthy` },
  { date: "Oct 4", title: "The Throne Is Still Occupied", part: "Revelation, Part 8", speaker: "Pastor Mike Dorough", url: `${media}/d/jzcp73m-part-8-the-throne-is-still-occupied` },
  { date: "Sep 27", title: "Lukewarm or Lost", part: "Revelation, Part 7", speaker: "Pastor Mike Dorough", url: `${media}/d/vyfc3js-part-7-lukewarm-or-lost` },
  { date: "Sep 20", title: "Wake Up, Church", part: "Revelation, Part 6", speaker: "Pastor Mike Dorough", url: `${media}/d/x63rbxq-part-6-wake-up-church` },
  { date: "Sep 13", title: "Hold Fast", part: "Revelation, Part 5", speaker: "Pastor Brad Thomas", url: `${media}/d/6dk8fmg-part-5-hold-fast` },
];

/** Sunday messages on the church's YouTube channel, newest first. `youtube` is the video ID. */
export const youtubeSermons = [
  { youtube: "hpH4HvVlajQ", title: "Characteristics of a Difference Maker", speaker: "Dr. Thomas Hammond", date: "August 2, 2026", passage: "Mark 2", length: "42:57", note: "Building dedication Sunday" },
  { youtube: "-uuFEaABi5U", title: "Blessed Is the Nation", speaker: "Pastor Mike Dorough", date: "July 5, 2026", passage: "Psalm 33", length: "39:52", note: "Fourth of July weekend" },
  { youtube: "ejtfS8oRAyg", title: "How to Avoid Spiritual Idolatry", speaker: "Pastor Mike Dorough", date: "February 1, 2026", passage: "Hosea 2", length: "50:52", note: "Relentless Love, Part 3" },
  { youtube: "z8kdWtZGjiA", title: "How to Handle the Deep Hurts of Life & Marriage", speaker: "Pastor Mike Dorough", date: "January 25, 2026", passage: "Hosea 1", length: "33:32", note: "Relentless Love, Part 2" },
];

export const memberCourse = [
  { part: 1, title: "Our Message", length: "25:16", youtube: "NbFDdz-qm64", pdf: "https://storage2.snappages.site/HWRWRC/assets/files/New-Member-Guide-Part-1.pdf" },
  { part: 2, title: "Our Model", length: "9:17", youtube: "7oYfFEtNzKI", pdf: "https://storage2.snappages.site/HWRWRC/assets/files/New-Member-Guide-Part-2.pdf" },
  { part: 3, title: "Our Mission", length: "19:48", youtube: "_8hmE02rq44", pdf: "https://storage2.snappages.site/HWRWRC/assets/files/New-Member-Guide-Part-3.pdf" },
  { part: 4, title: "Our Methods", length: "7:09", youtube: "glT3UGtgFeQ", pdf: "https://storage2.snappages.site/HWRWRC/assets/files/New-Member-Guide-Part-4.pdf" },
  { part: 5, title: "Our Challenge", length: "23:10", youtube: "JG7I-4UKFq8", pdf: "https://storage2.snappages.site/HWRWRC/assets/files/New-Member-Guide-Part-5.pdf" },
];

export const serveTeams = [
  "Ushers & greeters",
  "Children’s workers",
  "Set-up / tear-down",
  "Media (ProPresenter, lights, audio)",
  "NextGen leaders",
  "Community outreach",
  "Worship band",
  "Welcome center",
  "Special events",
  "Parking",
  "Coffee bar",
  "Prayer team",
];
