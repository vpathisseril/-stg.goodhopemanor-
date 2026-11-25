import { site } from "@/content/site";

export const pageMetadata = {
  home: {
    title: "Assisted Living in Oakland Park",
    description:
      `Learn about assisted living, services, and life at ${site.name}, a family-owned community in Oakland Park, Florida.`,
  },
  about: {
    title: "About Us",
    description:
      `Get to know ${site.name}, a family-owned assisted living community in Oakland Park, Florida.`,
  },
  services: {
    title: "Care & Services",
    description:
      `Explore personalized assisted living, care coordination, table-service dining, and activities at ${site.name}.`,
  },
  life: {
    title: "Life at Good Hope Manor",
    description:
      `Learn about dining, activities, community life, and spaces at ${site.name}.`,
  },
  families: {
    title: "For Families",
    description:
      `Prepare for a conversation about services and care at ${site.name}, an assisted living community in Oakland Park.`,
  },
  reviews: {
    title: "Why Families Recommend Good Hope Manor",
    description:
      `Read review excerpts supplied by ${site.name} and learn how to arrange a visit.`,
  },
  referrals: {
    title: "Referral Partners",
    description:
      `Information for families and community professionals considering assisted living referrals to ${site.name}.`,
  },
  privacy: {
    title: "Privacy Policy",
    description: `Read the website privacy information for ${site.name}.`,
  },
  accessibility: {
    title: "Accessibility",
    description:
      `Learn about accessibility features on the ${site.name} website and how to request assistance.`,
  },
  contact: {
    title: "Contact",
    description:
      `Contact ${site.name} in Oakland Park, Florida, to ask about a visit. Call if the request form is not connected.`,
  },
} as const;
