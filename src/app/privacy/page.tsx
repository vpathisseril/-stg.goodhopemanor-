import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { pageCopy } from "@/content/pages";
import { pageMetadata } from "@/content/metadata";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  pageMetadata.privacy.title,
  pageMetadata.privacy.description,
  "/privacy/",
);

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        intro={pageCopy.privacy.introduction}
        title={pageCopy.privacy.title}
      />
      <Section>
        <div className="mx-auto max-w-3xl space-y-5">
          {pageCopy.privacy.statements.map((statement) => (
            <p key={statement}>{statement}</p>
          ))}
        </div>
      </Section>
    </>
  );
}
