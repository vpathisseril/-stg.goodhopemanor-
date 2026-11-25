import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { pageCopy } from "@/content/pages";
import { pageMetadata } from "@/content/metadata";
import { site } from "@/content/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  pageMetadata.accessibility.title,
  pageMetadata.accessibility.description,
  "/accessibility/",
);

export default function AccessibilityPage() {
  return (
    <>
      <PageHero
        intro={pageCopy.accessibility.introduction}
        title={pageCopy.accessibility.title}
      />
      <Section>
        <div className="mx-auto max-w-3xl space-y-5">
          <p>{pageCopy.accessibility.statement}</p>
          <p>
            {pageCopy.accessibility.contact}{" "}
            <a
              className="font-semibold text-brand-secondary underline underline-offset-4"
              href={`tel:${site.phone.tel}`}
            >
              {site.phone.display}
            </a>
            .
          </p>
        </div>
      </Section>
    </>
  );
}
