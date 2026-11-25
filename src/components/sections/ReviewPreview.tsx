import { reviews } from "@/content/reviews";
import { ReviewCard } from "@/components/sections/ReviewCard";
import { pageCopy } from "@/content/pages";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import Link from "next/link";

export function ReviewPreview() {
  return (
    <Section className="bg-neutral-surface">
      <SectionHeading>{pageCopy.home.reviewsHeading}</SectionHeading>
      <p className="max-w-prose">{pageCopy.home.reviewsIntroduction}</p>
      <p className="mt-3 max-w-prose">{pageCopy.reviews.wordOfMouth}</p>
      <div className="mt-7 grid gap-5 md:grid-cols-2">
        {reviews.slice(0, 2).map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
      <Link
        className="mt-5 inline-flex min-h-11 items-center text-lg text-brand-secondary underline underline-offset-4"
        href="/reviews/"
      >
        {pageCopy.home.reviewLink}
      </Link>
      <p className="mt-5 max-w-prose text-base text-typography-muted">
        {pageCopy.home.reviewNote}
      </p>
    </Section>
  );
}
