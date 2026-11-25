import type { StaticImageData } from "next/image";

export type NavigationItem = {
  href: string;
  label: string;
};

export type Service = {
  slug: string;
  title: string;
  summary: string;
  details?: string[];
};

export type Review = {
  id: string;
  source: string;
  dateTime: string;
  dateLabel: string;
  text: string;
};

export type CommunityPhoto = {
  id: string;
  title: string;
  alt: string;
  src: StaticImageData;
};

export type LifeGallerySection = {
  id: string;
  title: string;
  intro: string;
  photos: CommunityPhoto[];
};
