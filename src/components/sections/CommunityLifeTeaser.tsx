import Link from "next/link";
import { site } from "@/content/site";
import { CommunityPhotoGallery } from "@/components/sections/CommunityPhotoGallery";
import { Section } from "@/components/ui/Section";
import { pageCopy } from "@/content/pages";

export function CommunityLifeTeaser() {
  return (
    <Section className="community-life-section overflow-hidden">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2
            className="max-w-2xl font-heading text-4xl leading-tight text-typography-primary sm:text-5xl"
            id="community-life-heading"
          >
            {pageCopy.home.communityHeading}
          </h2>
          <p className="mt-4 max-w-3xl">{pageCopy.home.communityIntroduction}</p>
          <p className="mt-3 max-w-3xl">{pageCopy.home.communityDescription}</p>
        </div>
        <Link
          className="inline-flex min-h-11 shrink-0 items-center gap-2 text-lg font-semibold text-brand-secondary underline decoration-2 underline-offset-4 hover:text-brand-primary motion-safe:transition-colors"
          href="/life/"
        >
          Explore life at {site.name}
          <svg
            aria-hidden="true"
            className="size-5"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              d="M5 12h14m-6-6 6 6-6 6"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.75"
            />
          </svg>
        </Link>
      </div>
      <h3 className="mt-9 font-heading text-2xl text-brand-primary">
        {pageCopy.home.communityLifeHeading}
      </h3>
      <div className="relative left-1/2 mt-8 w-screen -translate-x-1/2 sm:mt-10">
        <CommunityPhotoGallery />
      </div>
    </Section>
  );
}
