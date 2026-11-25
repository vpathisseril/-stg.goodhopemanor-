import type { Metadata } from "next";
import { site } from "@/content/site";

export function createPageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  const metadataBase = site.url ? new URL(site.url) : undefined;
  const fullTitle = `${title} | ${site.name}`;

  return {
    title: fullTitle,
    description,
    openGraph: {
      type: "website",
      siteName: site.name,
      title: fullTitle,
      description,
      ...(site.url
        ? { url: new URL(path, site.url).toString() }
        : {}),
    },
    twitter: {
      card: "summary",
      title: fullTitle,
      description,
    },
    ...(metadataBase
      ? {
          metadataBase,
          alternates: { canonical: path },
        }
      : {}),
  };
}
