import { site } from "@/content/site";
import { pageCopy } from "@/content/pages";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Section } from "@/components/ui/Section";

export function CtaBand() {
  return (
    <Section className="bg-brand-secondary-tint text-center">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-heading text-3xl text-typography-primary lg:text-4xl">
          {pageCopy.callToAction.heading}
        </h2>
        <p className="mt-4 text-lg">
          {pageCopy.callToAction.body}
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <ButtonLink className="min-h-14 px-8 text-xl" href="/contact/">
            {pageCopy.common.scheduleTour}
          </ButtonLink>
          <a
            className="inline-flex min-h-11 items-center text-lg font-semibold text-brand-secondary underline underline-offset-4"
            href={`tel:${site.phone.tel}`}
          >
            Call {site.phone.display}
          </a>
        </div>
      </div>
    </Section>
  );
}
