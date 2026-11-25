import { ContactDetails } from "@/components/sections/ContactDetails";
import { ContactForm } from "@/components/sections/ContactForm";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { createPageMetadata } from "@/lib/metadata";
import { pageMetadata } from "@/content/metadata";
import { site } from "@/content/site";
import { pageCopy } from "@/content/pages";

export const metadata = createPageMetadata(
  pageMetadata.contact.title,
  pageMetadata.contact.description,
  "/contact/",
);

export default function ContactPage() {
  return (
    <>
      <PageHero
        intro={pageCopy.contact.introduction}
        title={pageCopy.contact.title}
      />
      <Section>
        <div className="grid items-start gap-8 lg:grid-cols-12">
          <div className="order-2 lg:order-1 lg:col-span-7">
            <h2 className="mb-6 font-heading text-3xl text-typography-primary">
              {pageCopy.contact.formHeading}
            </h2>
            <ContactForm
              endpoint={site.formEndpoint}
              privacyPolicyUrl={site.privacyPolicyUrl}
            />
          </div>
          <div className="order-1 lg:order-2 lg:col-span-5">
            <ContactDetails />
          </div>
        </div>
      </Section>
      <Section className="bg-brand-secondary-tint">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-heading text-3xl text-typography-primary lg:text-4xl">
            {pageCopy.contact.tourHeading}
          </h2>
          <p className="mt-4">{pageCopy.contact.tourIntroduction}</p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {pageCopy.contact.tourChecklist.map((item) => (
              <li className="rounded-lg bg-neutral-surface p-4" key={item}>
                {item}
              </li>
            ))}
          </ul>
          <h3 className="mt-8 font-heading text-2xl text-brand-primary">
            {pageCopy.contact.questionsHeading}
          </h3>
          <p className="mt-3">{pageCopy.contact.questions}</p>
          <h3 className="mt-8 font-heading text-2xl text-brand-primary">
            {pageCopy.contact.admissionHeading}
          </h3>
          <p className="mt-3">{pageCopy.contact.admission}</p>
        </div>
      </Section>
    </>
  );
}
