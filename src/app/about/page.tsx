import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { CommunityPhotoImage } from "@/components/ui/CommunityPhotoImage";
import { bedroomPhoto } from "@/content/images";
import { createPageMetadata } from "@/lib/metadata";
import { pageMetadata } from "@/content/metadata";
import { pageCopy } from "@/content/pages";

export const metadata = createPageMetadata(
  pageMetadata.about.title,
  pageMetadata.about.description,
  "/about/",
);

export default function AboutPage() {
  return (
    <>
      <PageHero
        intro={pageCopy.about.introduction}
        title={pageCopy.about.title}
      />
      <Section>
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <h2 className="font-heading text-3xl text-typography-primary lg:text-4xl">
              {pageCopy.about.familyHeading}
            </h2>
            <h3 className="mt-4 font-heading text-2xl text-brand-primary">
              {pageCopy.about.familySubheading}
            </h3>
            <div className="mt-5 max-w-prose space-y-4">
              {pageCopy.about.familyParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <figure>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
              <CommunityPhotoImage
                photo={bedroomPhoto}
                sizes="(max-width: 1023px) 100vw, 50vw"
              />
            </div>
            <figcaption className="mt-3 text-base text-typography-muted">
              A bedroom with seating and bedside furniture.
            </figcaption>
          </figure>
        </div>
      </Section>
      <Section className="bg-neutral-surface">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-heading text-3xl text-typography-primary lg:text-4xl">
            {pageCopy.about.staffHeading}
          </h2>
          <h3 className="mt-4 font-heading text-2xl text-brand-primary">
            {pageCopy.about.staffSubheading}
          </h3>
          <div className="mt-5 space-y-4">
            {pageCopy.about.staffParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </Section>
      <Section className="bg-brand-secondary-tint">
        <h2 className="font-heading text-3xl text-typography-primary lg:text-4xl">
          {pageCopy.about.approachHeading}
        </h2>
        <p className="mt-5 max-w-prose">{pageCopy.about.approachIntroduction}</p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {pageCopy.about.approachValues.map((value) => (
            <li className="rounded-lg bg-neutral-surface p-4" key={value}>
              {value}
            </li>
          ))}
        </ul>
      </Section>
      <Section>
        <h2 className="font-heading text-3xl text-brand-primary lg:text-4xl">
          {pageCopy.about.communityHeading}
        </h2>
        <p className="mt-5 max-w-prose">{pageCopy.about.community}</p>
        <h3 className="mt-8 font-heading text-2xl text-typography-primary">
          {pageCopy.about.commitmentHeading}
        </h3>
        <p className="mt-3 font-heading text-xl text-brand-primary">
          {pageCopy.about.commitmentSubheading}
        </p>
        <p className="mt-4 max-w-prose">{pageCopy.about.commitment}</p>
        <ul className="mt-4 flex flex-wrap gap-3">
          {pageCopy.about.commitmentValues.map((value) => (
            <li
              className="rounded-full bg-brand-secondary-tint px-4 py-2 font-semibold"
              key={value}
            >
              {value}
            </li>
          ))}
        </ul>
        <h3 className="mt-8 font-heading text-2xl text-typography-primary">
          {pageCopy.about.visitHeading}
        </h3>
        <p className="mt-4 max-w-prose">{pageCopy.about.visit}</p>
      </Section>
      <CtaBand />
    </>
  );
}
