import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

const paths = ["", "/visit", "/about", "/outreach", "/sermons", "/grow", "/give", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((p) => ({ url: `${siteUrl}${p}`, lastModified: new Date() }));
}
