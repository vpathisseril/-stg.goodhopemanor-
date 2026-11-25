import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceList } from "@/components/sections/ServiceList";
import { services } from "@/content/services";
import { communityPhotos } from "@/content/images";
import { TextLink } from "@/components/ui/TextLink";
import { Section } from "@/components/ui/Section";
import { CommunityPhotoImage } from "@/components/ui/CommunityPhotoImage";
import { createPageMetadata } from "@/lib/metadata";
import { pageMetadata } from "@/content/metadata";
import { pageCopy } from "@/content/pages";

export const metadata = createPageMetadata(
  pageMetadata.services.title,
  pageMetadata.services.description,
  "/services/",
);

export default function ServicesPage() {
  return (
    <>
      <PageHero
        intro={pageCopy.services.introduction}
        title={pageCopy.services.title}
      />
      <Section>
        <p className="mx-auto max-w-4xl text-lg">
          At Good Hope Manor, assisted living support is designed around each
          resident&apos;s individual needs, preferences, abilities, and care plan.
          Our goal is to provide appropriate assistance while supporting
          dignity, comfort, independence, and quality of life.
        </p>
      </Section>
      <Section>
        <h2 className="mb-4 font-heading text-2xl text-typography-primary">
          {pageCopy.services.jumpHeading}
        </h2>
        <ul className="flex flex-wrap gap-2">
          {services.map((service) => (
            <li key={service.slug}>
              <a
                className="inline-flex min-h-11 items-center rounded-lg border-2 border-brand-secondary bg-neutral-surface px-4 text-lg text-brand-secondary underline underline-offset-4"
                href={`#${service.slug}`}
              >
                {service.title}
              </a>
            </li>
          ))}
        </ul>
      </Section>
      <Section className="pt-0">
        <ServiceList />
        <div className="mt-8">
          <h2 className="font-heading text-3xl text-typography-primary">
            {pageCopy.services.approachHeading}
          </h2>
          <div className="mt-4 space-y-4">
            {pageCopy.services.approach.map((paragraph) => (
              <p className="max-w-prose" key={paragraph}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        <div className="mt-8 rounded-xl bg-brand-accent-tint p-6">
          <h2 className="font-heading text-2xl text-typography-primary">
            {pageCopy.services.qualificationsHeading}
          </h2>
          <ul className="mt-3 list-disc space-y-3 pl-6">
            {pageCopy.services.qualifications.map((qualification) => (
              <li key={qualification}>{qualification}</li>
            ))}
          </ul>
        </div>
        <TextLink
          className="mt-6 inline-flex min-h-11 items-center"
          href="/contact/"
        >
          {pageCopy.services.askLink}
        </TextLink>
      </Section>
      <Section className="bg-neutral-surface">
        <h2 className="mb-4 font-heading text-3xl text-typography-primary lg:text-4xl">
          See the spaces
        </h2>
        <p className="mb-7 max-w-prose">
          Photos can help you prepare for a visit. Ask the team about the rooms,
          daily arrangements, and services that matter to your family.
        </p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {communityPhotos.map((photo) => (
            <figure key={photo.id}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <CommunityPhotoImage
                  photo={photo}
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                />
              </div>
              <figcaption className="mt-3 font-semibold">{photo.title}</figcaption>
            </figure>
          ))}
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
