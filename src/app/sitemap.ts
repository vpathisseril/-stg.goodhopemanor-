import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export const dynamic = "force-static";

const routes = [
  "",
  "/about/",
  "/services/",
  "/life/",
  "/families/",
  "/reviews/",
  "/referrals/",
  "/contact/",
  "/privacy/",
  "/accessibility/",
];

export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.url || site.isStaging) return [];

  return routes.map((route) => ({
    url: new URL(route, site.url).toString(),
  }));
}
