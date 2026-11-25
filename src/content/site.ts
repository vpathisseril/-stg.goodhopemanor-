export const site = {
  name: "Good Hope Manor",
  tagline: "Quality Care Without Compromise.",
  phone: {
    display: "(954) 677-2900",
    tel: "+19546772900",
  },
  email: {
    display: "info@goodhopemanor.com",
    href: "mailto:info@goodhopemanor.com",
  },
  fax: "(954) 486-5335",
  address: {
    street: "2251 NW 29th Ct.",
    city: "Oakland Park",
    state: "FL",
    zip: "33311",
  },
  officeHours: "Monday–Friday, 9 AM–5 PM",
  visitingHours: "Monday–Sunday, 9 AM–9 PM",
  ahcaConsumerInformationUrl: "https://quality.healthfinder.fl.gov/",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "",
  formEndpoint: process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? "",
  privacyPolicyUrl: "/privacy/",
  /** Set NEXT_PUBLIC_SITE_ENV=staging on non-production hosts to block search indexing. */
  isStaging: (process.env.NEXT_PUBLIC_SITE_ENV ?? "").trim().toLowerCase() === "staging",
} as const;

export const googleMapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${site.name}, ${site.address.street}, ${site.address.city}, ${site.address.state} ${site.address.zip}`,
)}`;

if (site.url) {
  const url = new URL(site.url);
  if (url.protocol !== "https:") {
    throw new Error("NEXT_PUBLIC_SITE_URL must use HTTPS.");
  }
}

if (site.formEndpoint) {
  const endpoint = new URL(site.formEndpoint);
  if (endpoint.protocol !== "https:") {
    throw new Error("NEXT_PUBLIC_FORMSPREE_ENDPOINT must use HTTPS.");
  }
}
