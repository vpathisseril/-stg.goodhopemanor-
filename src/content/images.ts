import bedroomIvoryblue from "../../assets/optimized/bedroom-ivoryblue.webp";
import diningRoomBlue from "../../assets/optimized/dining-room-blue.webp";
import diningRoomRed from "../../assets/optimized/dining-room-red.webp";
import gardenLaughter from "../../assets/optimized/garden-laughter.webp";
import livingRoom2 from "../../assets/optimized/living-room-2.webp";
import livingRoom3 from "../../assets/optimized/living-room-3.webp";
import washingCloset from "../../assets/optimized/washing-closet.webp";
import warmGardenCaregiving from "../../assets/optimized/warm-garden-caregiving-conversation.webp";
import rosePetalUpperLeft from "../../assets/optimized/rose-petal-upper-left.webp";
import rosePetalLowerRight from "../../assets/optimized/rose-petal-lower-right.webp";
import goodHopeManorLogo from "../../assets/brand/good-hope-manor-logo.jpg";
import type { CommunityPhoto, LifeGallerySection } from "@/types/content";

export { goodHopeManorLogo, rosePetalLowerRight, rosePetalUpperLeft };

const mainLivingRoom: CommunityPhoto = {
  id: "main-living-room",
  title: "Living room",
  alt: "A living room with sofas, armchairs, and a bookcase.",
  src: livingRoom3,
};

const secondLivingRoom: CommunityPhoto = {
  id: "second-living-room",
  title: "Shared room",
  alt: "A shared room with bookshelves, a television, a table, and chairs.",
  src: livingRoom2,
};

const firstDiningRoom: CommunityPhoto = {
  id: "dining-room-one",
  title: "Dining room",
  alt: "Dining room with tables, chairs, and windows.",
  src: diningRoomBlue,
};

const secondDiningRoom: CommunityPhoto = {
  id: "dining-room-two",
  title: "Dining room",
  alt: "Dining room with tables, chairs, and blue tablecloths.",
  src: diningRoomRed,
};

export const bedroomPhoto: CommunityPhoto = {
  id: "bedroom",
  title: "Bedroom",
  alt: "Bedroom with a bed, chair, and bedside furniture.",
  src: bedroomIvoryblue,
};

const bathroom: CommunityPhoto = {
  id: "bathroom-details",
  title: "Bathroom",
  alt: "Bathroom with grab bars, a shower seat, and a walk-in shower.",
  src: washingCloset,
};

export const homeHeroBackground: CommunityPhoto = {
  id: "home-hero-garden-illustration",
  title: "Garden gathering",
  alt: "Illustrative image of three older adults smiling together in a garden.",
  src: gardenLaughter,
};

export const caregivingIllustration = {
  alt: "Illustrative image of a caregiver talking with an older woman in a garden.",
  src: warmGardenCaregiving,
};

export const communityPhotos: CommunityPhoto[] = [
  mainLivingRoom,
  firstDiningRoom,
  bedroomPhoto,
  secondLivingRoom,
  secondDiningRoom,
  bathroom,
];

export const lifeGallery: LifeGallerySection[] = [
  {
    id: "living-spaces",
    title: "Living spaces",
    intro: "A lounge with sofas, armchairs, and bookshelves.",
    photos: [mainLivingRoom, secondLivingRoom],
  },
  {
    id: "dining",
    title: "Dining rooms",
    intro:
      "Two dining rooms, each arranged with tables and chairs. Ask about meal arrangements when you call.",
    photos: [firstDiningRoom, secondDiningRoom],
  },
  {
    id: "bedrooms",
    title: "Bedroom",
    intro: "A bedroom with a bed, seating, and bedside furniture.",
    photos: [bedroomPhoto],
  },
  {
    id: "bathroom",
    title: "Bathroom",
    intro: "A bathroom with grab bars, a shower seat, and a walk-in shower.",
    photos: [bathroom],
  },
];
