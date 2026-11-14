import type { MetadataRoute } from "next";
import { CASE_STUDIES } from "@/content/projects";
import { BOOKING } from "@/content/booking";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://connorodea.com";
  return [
    { url: `${base}/`, priority: 1 },
    { url: BOOKING.canonicalUrl, priority: 0.9 },
    ...CASE_STUDIES.map((p) => ({
      url: `${base}/work/${p.slug}/`,
      priority: 0.8,
    })),
  ];
}
