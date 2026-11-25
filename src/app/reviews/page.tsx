import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { ReviewList } from "@/components/sections/ReviewList";
import { googleMapsSearchUrl } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { createPageMetadata } from "@/lib/metadata";
import { pageMetadata } from "@/content/metadata";
import { pageCopy } from "@/content/pages";

export const metadata = createPageMetadata(
  pageMetadata.reviews.title,
  pageMetadata.reviews.description,
  "/reviews/",
);

export default function ReviewsPage() {
  return (
    <>
      <PageHero
        intro={pageCopy.reviews.introduction}
        title={pageCopy.reviews.title}
      />
      <Section>
        <p className="max-w-prose">{pageCopy.reviews.introduction}</p>
        <p className="mt-4 max-w-prose">{pageCopy.reviews.wordOfMouth}</p>
        <h2 className="mt-8 font-heading text-3xl text-brand-primary">
          {pageCopy.reviews.quotesHeading}
        </h2>
        <div className="mt-6">
          <ReviewList />
        </div>
        <a
          className="mt-5 inline-flex min-h-11 items-center text-lg text-brand-secondary underline underline-offset-4"
          href={googleMapsSearchUrl}
        >
          {pageCopy.reviews.googleLink}
        </a>
        <h2 className="mt-10 font-heading text-3xl text-brand-primary">
          {pageCopy.reviews.communityHeading}
        </h2>
        <p className="mt-4 max-w-prose">{pageCopy.reviews.community}</p>
        <h2 className="mt-8 font-heading text-2xl text-typography-primary">
          {pageCopy.reviews.noteHeading}
        </h2>
        <p className="mt-3 max-w-prose">{pageCopy.reviews.note}</p>
      </Section>
      <CtaBand />
    </>
  );
}
