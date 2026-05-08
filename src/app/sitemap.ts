import type { MetadataRoute } from "next";
import { restaurant } from "@/lib/restaurant";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? restaurant.siteUrl;

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "", priority: 1 },
    { path: "/menu", priority: 0.95 },
    { path: "/cart", priority: 0.9 },
    { path: "/gallery", priority: 0.75 },
    { path: "/booking", priority: 0.85 },
    { path: "/reviews", priority: 0.7 },
    { path: "/faqs", priority: 0.65 },
    { path: "/contact", priority: 0.8 },
    { path: "/terms-and-conditions", priority: 0.35 },
    { path: "/privacy-policy", priority: 0.3 },
  ];

  return pages.map((page) => ({
    url: `${siteUrl}${page.path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: page.priority,
  }));
}
