import { CareApproach } from "@/components/sections/CareApproach";
import { CornerPetalBackground } from "@/components/sections/CornerPetalBackground";
import { CommunityLifeTeaser } from "@/components/sections/CommunityLifeTeaser";
import { CtaBand } from "@/components/sections/CtaBand";
import { HomeHero } from "@/components/sections/HomeHero";
import { HomeDining } from "@/components/sections/HomeDining";
import { HomeLocation } from "@/components/sections/HomeLocation";
import { PillarGrid } from "@/components/sections/PillarGrid";
import { ReviewPreview } from "@/components/sections/ReviewPreview";
import { createPageMetadata } from "@/lib/metadata";
import { pageMetadata } from "@/content/metadata";
import { pageCopy } from "@/content/pages";

export const metadata = createPageMetadata(
  pageMetadata.home.title,
  pageMetadata.home.description,
  "/",
);

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <section className="corner-petal-section relative isolate overflow-hidden bg-neutral-base py-12 md:py-16">
        <CornerPetalBackground />
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl text-brand-primary lg:text-4xl">
            {pageCopy.home.brandPromiseHeading}
          </h2>
          <div className="mt-5 space-y-4 text-lg">
            {pageCopy.home.brandPromise.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-neutral-surface py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl text-brand-primary lg:text-4xl">
            {pageCopy.home.teamHeading}
          </h2>
          <h3 className="mt-3 font-heading text-2xl text-typography-primary">
            {pageCopy.home.teamSubheading}
          </h3>
          <p className="mt-5 text-lg">{pageCopy.home.teamIntroduction}</p>
          <p className="mt-4 text-lg">{pageCopy.home.teamDescription}</p>
        </div>
      </section>
      <CareApproach />
      <HomeDining />
      <CommunityLifeTeaser />
      <PillarGrid />
      <ReviewPreview />
      <HomeLocation />
      <CtaBand />
    </>
  );
}
