import type { MetadataRoute } from "next";
import { restaurant } from "@/lib/restaurant";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? restaurant.siteUrl;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
