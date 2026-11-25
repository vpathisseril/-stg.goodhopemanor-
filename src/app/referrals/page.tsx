import Link from "next/link";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { site } from "@/content/site";
import { pageCopy } from "@/content/pages";
import { pageMetadata } from "@/content/metadata";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  pageMetadata.referrals.title,
  pageMetadata.referrals.description,
  "/referrals/",
);

export default function ReferralsPage() {
  return (
    <>
      <PageHero
        intro={pageCopy.referrals.introduction}
        title={pageCopy.referrals.title}
      />
      <Section>
        <div className="mx-auto max-w-4xl">
          <h2 className="font-heading text-3xl text-brand-primary">
            {pageCopy.referrals.welcomeHeading}
          </h2>
          <p className="mt-4">{pageCopy.referrals.welcome}</p>
          <p className="mt-4">
            We understand that transitions in care can involve many people. Our
            goal is to communicate clearly, respond respectfully, and help
            families understand whether Good Hope Manor may be an appropriate
            fit.
          </p>
        </div>
      </Section>
      <Section className="bg-brand-secondary-tint">
        <h2 className="mb-6 font-heading text-3xl text-typography-primary">
          Our Community Referral Relationships
        </h2>
        <p className="mb-6">We welcome appropriate conversations and referrals from:</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pageCopy.referrals.referralSources.map((source) => (
            <Card className="h-full" key={source}>
              <p className="font-semibold">{source}</p>
            </Card>
          ))}
        </div>
        <p className="mt-6 max-w-prose">
          We are especially grateful for the families who recommend Good Hope
          Manor through their own personal experiences.
        </p>
      </Section>
      <Section>
        <div className="mx-auto max-w-4xl space-y-8">
          <div>
            <h2 className="font-heading text-3xl text-brand-primary">
              {pageCopy.referrals.transitionsHeading}
            </h2>
            <p className="mt-4">{pageCopy.referrals.transitions}</p>
            <p className="mt-4">{pageCopy.referrals.admission}</p>
          </div>
          <div>
            <h2 className="font-heading text-3xl text-brand-primary">
              {pageCopy.referrals.approachHeading}
            </h2>
            <p className="mt-4">{pageCopy.referrals.approach}</p>
            <p className="mt-4">{pageCopy.referrals.fit}</p>
          </div>
          <div>
            <h2 className="font-heading text-3xl text-brand-primary">
              {pageCopy.referrals.thanksHeading}
            </h2>
            <p className="mt-4">{pageCopy.referrals.thanks}</p>
            <p className="mt-4">
              <Link
                className="font-semibold text-brand-secondary underline underline-offset-4"
                href="/contact/"
              >
                Contact Good Hope Manor
              </Link>
            </p>
            <address className="mt-5 not-italic">
              <a
                className="inline-flex min-h-11 items-center font-semibold text-brand-secondary underline underline-offset-4"
                href={`tel:${site.phone.tel}`}
              >
                {site.phone.display}
              </a>
              <br />
              <a
                className="inline-flex min-h-11 items-center text-brand-secondary underline underline-offset-4"
                href={site.email.href}
              >
                {site.email.display}
              </a>
            </address>
          </div>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
