import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Reveal } from "@/components/Reveal";
import { isDemo, org, siteUrl } from "@/lib/site";
import "./globals.css";

// Fonts are self-hosted so the build never depends on reaching Google.
const archivo = localFont({
  src: [{ path: "../fonts/archivo.woff2", weight: "100 900", style: "normal" }],
  variable: "--font-archivo",
  display: "swap",
});

const newsreader = localFont({
  src: [{ path: "../fonts/newsreader-italic.woff2", weight: "200 800", style: "italic" }],
  variable: "--font-newsreader",
  display: "swap",
});

const description =
  "Transformation Church in Lula, Georgia: a multi-generational church family where anyone can meet Jesus and be transformed. Sundays at 10:00 AM at 6102-C Banks St.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Transformation Church · Lula, Georgia",
    template: "%s · Transformation Church",
  },
  description,
  appleWebApp: { title: "Transformation" },
  openGraph: {
    type: "website",
    siteName: org.name,
    title: "Be transformed. Transformation Church, Lula GA",
    description,
  },
  twitter: { card: "summary_large_image" },
  robots: isDemo ? { index: false, follow: false } : undefined,
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#050f22",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Church",
  name: org.name,
  url: siteUrl,
  image: `${siteUrl}/photos/worship-hands-raised.jpg`,
  foundingDate: "2023-02-26",
  address: {
    "@type": "PostalAddress",
    streetAddress: org.street,
    addressLocality: org.city,
    addressRegion: org.stateCode,
    postalCode: org.zip,
    addressCountry: "US",
  },
  sameAs: [org.facebook, org.instagram],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${archivo.variable} ${newsreader.variable}`}>
      <body className="min-h-screen antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Reveal />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
