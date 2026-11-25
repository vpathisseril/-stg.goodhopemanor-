import type { NextConfig } from "next";

if (!process.env.NEXT_PUBLIC_SITE_URL?.trim()) {
  console.warn(
    "NEXT_PUBLIC_SITE_URL is not set; canonical URLs, sitemap URLs, and absolute Open Graph URLs will be omitted.",
  );
}

const nextConfig: NextConfig = {
  experimental: {
    agentUpgrade: "security",
  },
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
