import { TextLink } from "@/components/ui/TextLink";
import { Section } from "@/components/ui/Section";
import { pageCopy } from "@/content/pages";

export function HomeDining() {
  return (
    <Section className="bg-brand-secondary-tint">
      <div className="mx-auto max-w-4xl">
        <h2 className="font-heading text-3xl text-brand-primary lg:text-4xl">
          {pageCopy.home.diningHeading}
        </h2>
        <h3 className="mt-3 font-heading text-2xl text-typography-primary">
          {pageCopy.home.diningSubheading}
        </h3>
        <div className="mt-5 space-y-4">
          {pageCopy.home.dining.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <TextLink
          className="mt-6 inline-flex min-h-11 items-center"
          href="/life/"
        >
          {pageCopy.home.diningLink}
        </TextLink>
      </div>
    </Section>
  );
}
