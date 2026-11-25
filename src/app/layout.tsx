import type { Metadata } from "next";
import localFont from "next/font/local";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SkipLink } from "@/components/layout/SkipLink";
import { StickyMobileBar } from "@/components/layout/StickyMobileBar";
import { pageMetadata } from "@/content/metadata";
import { site } from "@/content/site";
import "./globals.css";

// Fonts are self-hosted from @fontsource (SIL OFL) so builds never depend on
// fonts.googleapis.com being reachable and visitors make no third-party requests.
const newsreader = localFont({
  variable: "--font-newsreader",
  display: "swap",
  src: [
    { path: "../../node_modules/@fontsource/newsreader/files/newsreader-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../../node_modules/@fontsource/newsreader/files/newsreader-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../../node_modules/@fontsource/newsreader/files/newsreader-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../../node_modules/@fontsource/newsreader/files/newsreader-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
});

const sourceSans = localFont({
  variable: "--font-source-sans",
  display: "swap",
  src: [
    { path: "../../node_modules/@fontsource/source-sans-3/files/source-sans-3-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../../node_modules/@fontsource/source-sans-3/files/source-sans-3-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../../node_modules/@fontsource/source-sans-3/files/source-sans-3-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../../node_modules/@fontsource/source-sans-3/files/source-sans-3-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
});

export const metadata: Metadata = {
  metadataBase: site.url ? new URL(site.url) : undefined,
  title: `${pageMetadata.home.title} | ${site.name}`,
  description: pageMetadata.home.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${pageMetadata.home.title} | ${site.name}`,
    description: pageMetadata.home.description,
    ...(site.url ? { url: site.url } : {}),
  },
  twitter: {
    card: "summary",
    title: `${pageMetadata.home.title} | ${site.name}`,
    description: pageMetadata.home.description,
  },
  icons: {
    icon: "/favicon.svg",
  },
  ...(site.isStaging ? { robots: { index: false, follow: false } } : {}),
};

const localBusinessAddress = {
  "@type": "PostalAddress",
  ...(site.address.street ? { streetAddress: site.address.street } : {}),
  ...(site.address.city ? { addressLocality: site.address.city } : {}),
  ...(site.address.state ? { addressRegion: site.address.state } : {}),
  ...(site.address.zip ? { postalCode: site.address.zip } : {}),
};

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  ...(site.name ? { name: site.name } : {}),
  ...(site.phone.tel ? { telephone: site.phone.tel } : {}),
  ...(site.url ? { url: site.url } : {}),
  ...(Object.keys(localBusinessAddress).length > 1
    ? { address: localBusinessAddress }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${newsreader.variable} ${sourceSans.variable} h-full antialiased`}
      lang="en"
    >
      <body className="flex min-h-full flex-col pb-24 lg:pb-0">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusiness).replace(/</g, "\\u003c"),
          }}
        />
        <SkipLink />
        <SiteHeader />
        <main className="flex-1" id="main" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
        <StickyMobileBar />
      </body>
    </html>
  );
}
