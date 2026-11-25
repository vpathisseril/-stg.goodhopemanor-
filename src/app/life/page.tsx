import { CtaBand } from "@/components/sections/CtaBand";
import { LifeGallery } from "@/components/sections/LifeGallery";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { createPageMetadata } from "@/lib/metadata";
import { pageMetadata } from "@/content/metadata";
import { pageCopy } from "@/content/pages";

export const metadata = createPageMetadata(
  pageMetadata.life.title,
  pageMetadata.life.description,
  "/life/",
);

export default function LifePage() {
  return (
    <>
      <PageHero
        intro={pageCopy.life.introduction}
        title={pageCopy.life.title}
      />
      <Section>
        <p className="mx-auto max-w-4xl">{pageCopy.life.community}</p>
        <h2 className="mt-8 font-heading text-3xl text-brand-primary">
          {pageCopy.life.activitiesHeading}
        </h2>
        <p className="mt-4 max-w-4xl">{pageCopy.life.activities}</p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {pageCopy.life.activitiesList.map((activity) => (
            <li
              className="rounded-lg bg-brand-secondary-tint p-4"
              key={activity}
            >
              {activity}
            </li>
          ))}
        </ul>
        <p className="mt-4 max-w-4xl">{pageCopy.life.activitiesNote}</p>
      </Section>
      <Section className="bg-brand-secondary-tint">
        <h2 className="font-heading text-3xl text-brand-primary">
          {pageCopy.life.diningHeading}
        </h2>
        <h3 className="mt-3 font-heading text-2xl text-typography-primary">
          {pageCopy.life.diningSubheading}
        </h3>
        <p className="mt-4 max-w-4xl">{pageCopy.life.dining}</p>
        <h2 className="mt-8 font-heading text-3xl text-brand-primary">
          {pageCopy.life.comfortHeading}
        </h2>
        <p className="mt-4 max-w-4xl">{pageCopy.life.comfort}</p>
        <h2 className="mt-8 font-heading text-3xl text-brand-primary">
          {pageCopy.life.connectionHeading}
        </h2>
        <p className="mt-4 max-w-4xl">{pageCopy.life.connection}</p>
      </Section>
      <LifeGallery />
      <Section className="bg-neutral-surface">
        <h2 className="font-heading text-3xl text-brand-primary">
          {pageCopy.life.peopleHeading}
        </h2>
        <h3 className="mt-3 font-heading text-2xl text-typography-primary">
          {pageCopy.life.peopleSubheading}
        </h3>
        <p className="mt-4 max-w-4xl">{pageCopy.life.people}</p>
        <h2 className="mt-8 font-heading text-3xl text-brand-primary">
          {pageCopy.life.galleryHeading}
        </h2>
        <p className="mt-4 max-w-4xl">{pageCopy.life.gallery}</p>
      </Section>
      <CtaBand />
    </>
  );
}
