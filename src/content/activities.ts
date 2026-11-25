import creativeTable from "../../assets/illustrations/creative-table.svg";
import readingTogether from "../../assets/illustrations/reading-together.svg";
import sharedMeal from "../../assets/illustrations/shared-meal.svg";

export const activityIllustrations = [
  {
    id: "creative-table",
    title: "A creative table",
    description:
      "An older adult and a companion painting together at a shared table.",
    src: creativeTable,
  },
  {
    id: "shared-meal",
    title: "Sharing a meal",
    description:
      "Three older adults seated together around a dining table.",
    src: sharedMeal,
  },
  {
    id: "reading-together",
    title: "Reading together",
    description:
      "An older adult and a visitor looking at a book together in a sitting area.",
    src: readingTogether,
  },
] as const;
