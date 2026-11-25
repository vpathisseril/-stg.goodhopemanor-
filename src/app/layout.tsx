import type { Metadata } from "next";
import { Newsreader, Source_Sans_3 } from "next/font/google";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SkipLink } from "@/components/layout/SkipLink";
import { StickyMobileBar } from "@/components/layout/StickyMobileBar";
import { pageMetadata } from "@/content/metadata";
import { site } from "@/content/site";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
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
