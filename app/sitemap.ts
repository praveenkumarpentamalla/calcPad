import type { MetadataRoute } from "next"; import { tools } from "@/lib/tools"; import { SITE } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date(); const pages = ["", "/about", "/contact", "/privacy-policy", "/terms", "/disclaimer"].map((p) => ({ url: SITE.url + p, lastModified: now, priority: p ? 0.3 : 1 }));
  return [...pages, ...tools.map((t) => ({ url: `${SITE.url}/tools/${t.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 }))];
}
