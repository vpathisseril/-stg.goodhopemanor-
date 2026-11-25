import { CtaBand } from "@/components/sections/CtaBand";
import { faqs } from "@/content/faqs";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { createPageMetadata } from "@/lib/metadata";
import { pageMetadata } from "@/content/metadata";
import { pageCopy } from "@/content/pages";

export const metadata = createPageMetadata(
  pageMetadata.families.title,
  pageMetadata.families.description,
  "/families/",
);

export default function FamiliesPage() {
  return (
    <>
      <PageHero
        intro={pageCopy.families.introduction}
        title={pageCopy.families.title}
      />
      <Section>
        <div className="mx-auto max-w-4xl">
          <div className="space-y-4">
            {pageCopy.families.explanation.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {pageCopy.families.commonQuestions.map((question) => (
              <li className="rounded-lg bg-brand-secondary-tint p-4" key={question}>
                {question}
              </li>
            ))}
          </ul>
        </div>
      </Section>
      <Section className="bg-brand-secondary-tint">
        <h2 className="font-heading text-3xl text-typography-primary lg:text-4xl">
          {pageCopy.families.consideringHeading}
        </h2>
        <p className="mt-5 max-w-4xl">{pageCopy.families.considering}</p>
        <h3 className="mt-8 font-heading text-2xl text-brand-primary">
          {pageCopy.families.tourQuestionsHeading}
        </h3>
        <ul className="mt-5 grid gap-3 md:grid-cols-2">
          {pageCopy.families.tourQuestions.map((question) => (
            <li className="rounded-lg bg-neutral-surface p-4" key={question}>
              {question}
            </li>
          ))}
        </ul>
        <p className="mt-5 max-w-4xl">{pageCopy.families.tourQuestionsNote}</p>
      </Section>
      <Section>
        <h2 className="font-heading text-3xl text-brand-primary lg:text-4xl">
          {pageCopy.families.moveHeading}
        </h2>
        <p className="mt-4 max-w-4xl">{pageCopy.families.moveIntroduction}</p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {pageCopy.families.moveItems.map((item) => (
            <li className="rounded-lg bg-brand-secondary-tint p-4" key={item}>
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-5 max-w-4xl">{pageCopy.families.moveNote}</p>
      </Section>
      <Section className="bg-brand-secondary-tint">
        <h2 className="font-heading text-3xl text-typography-primary lg:text-4xl">
          {pageCopy.families.levelHeading}
        </h2>
        <div className="mt-5 max-w-4xl space-y-4">
          {pageCopy.families.levelParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <h3 className="mt-8 font-heading text-2xl text-brand-primary">
          {pageCopy.families.transitionsHeading}
        </h3>
        <p className="mt-4 max-w-4xl">{pageCopy.families.transitions}</p>
      </Section>
      <Section className="bg-brand-secondary-tint">
        <h2 className="mb-6 font-heading text-3xl text-typography-primary lg:text-4xl">
          {pageCopy.families.faqHeading}
        </h2>
        <div className="grid gap-4">
          {faqs.map((faq) => (
            <details
              className="rounded-xl bg-neutral-surface p-5"
              key={faq.question}
            >
              <summary className="cursor-pointer text-lg font-semibold">
                {faq.question}
              </summary>
              <p className="mt-4">{faq.answer}</p>
            </details>
          ))}
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
