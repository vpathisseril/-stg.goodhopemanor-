import { googleMapsSearchUrl, site } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { pageCopy } from "@/content/pages";

export function HomeLocation() {
  return (
    <Section className="bg-neutral-surface">
      <div className="mx-auto max-w-4xl">
        <h2 className="font-heading text-3xl text-brand-primary lg:text-4xl">
          {pageCopy.home.locationHeading}
        </h2>
        <p className="mt-4 max-w-prose">
          {pageCopy.home.locationIntroduction}
        </p>
        <address className="mt-5 not-italic">
          <p>
            {site.address.street}
            <br />
            {site.address.city}, {site.address.state} {site.address.zip}
          </p>
        </address>
        <a
          className="mt-3 inline-flex min-h-11 items-center font-semibold text-brand-secondary underline underline-offset-4"
          href={googleMapsSearchUrl}
        >
          Get Directions
        </a>
      </div>
    </Section>
  );
}
