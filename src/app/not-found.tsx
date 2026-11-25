import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Section } from "@/components/ui/Section";
import { site } from "@/content/site";
import { pageCopy } from "@/content/pages";

export const metadata: Metadata = {
  title: "Page not found",
  description: `The requested ${site.name} page could not be found.`,
};

export default function NotFound() {
  return (
    <Section>
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="font-heading text-4xl text-brand-primary lg:text-5xl">
          {pageCopy.notFound.title}
        </h1>
        <p className="mt-5 text-lg">
          {pageCopy.notFound.body}
        </p>
        <div className="mt-7 flex flex-col justify-center gap-4 sm:flex-row">
          <ButtonLink href="/">Go to Home</ButtonLink>
          <ButtonLink href="/contact/" variant="secondary">
            Contact us
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
