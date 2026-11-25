import Image from "next/image";
import { TextLink } from "@/components/ui/TextLink";
import { Section } from "@/components/ui/Section";
import { CornerPetalBackground } from "@/components/sections/CornerPetalBackground";
import { caregivingIllustration } from "@/content/images";
import { pageCopy } from "@/content/pages";

export function CareApproach() {
  return (
    <Section className="corner-petal-section relative isolate overflow-hidden bg-neutral-base">
      <CornerPetalBackground />
      <div className="mx-auto grid max-w-6xl gap-7 md:gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-16">
        <div className="max-w-xl border-l-2 border-brand-accent pl-5 sm:pl-7">
          <h2 className="font-heading text-3xl leading-tight text-typography-primary sm:text-4xl lg:text-5xl">
            {pageCopy.home.careApproachHeading}
          </h2>
          <Image
            alt={caregivingIllustration.alt}
            className="mt-6 aspect-[4/3] w-full rounded-lg object-cover"
            height={caregivingIllustration.src.height}
            sizes="(min-width: 1024px) 40vw, calc(100vw - 2rem)"
            src={caregivingIllustration.src}
            width={caregivingIllustration.src.width}
          />
        </div>
        <div className="max-w-2xl">
          <h3 className="mb-4 font-heading text-2xl text-brand-primary">
            {pageCopy.home.careApproachSubheading}
          </h3>
          <div className="space-y-4 text-lg leading-relaxed md:text-xl">
            {pageCopy.home.careApproach.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <TextLink
            className="mt-7 inline-flex min-h-11 items-center font-semibold decoration-2 underline-offset-4 motion-safe:transition-colors"
            href="/services/"
          >
            Explore Care & Services
          </TextLink>
        </div>
      </div>
    </Section>
  );
}
