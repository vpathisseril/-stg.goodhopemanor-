import { Container } from "@/components/ui/Container";
import { pageCopy } from "@/content/pages";

export function PillarGrid() {
  return (
    <section
      aria-labelledby="home-pillars-heading"
      className="bg-brand-secondary-tint py-12 md:py-16 lg:py-20"
    >
      <Container>
        <div className="mx-auto max-w-6xl py-4 sm:py-6 lg:py-8">
          <h2
            className="mb-10 max-w-4xl font-heading text-3xl text-brand-primary lg:mb-12 lg:text-4xl"
            id="home-pillars-heading"
          >
            {pageCopy.home.whyChooseHeading}
          </h2>
          <div className="grid gap-x-8 gap-y-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-10">
            {pageCopy.home.pillars.map((pillar) => (
              <article
                className="border-t border-brand-secondary/40 pt-5"
                key={pillar.title}
              >
                <h3 className="font-heading text-2xl text-brand-primary">
                  {pillar.title}
                </h3>
                <p className="mt-3 max-w-prose text-lg leading-relaxed text-typography-primary">
                  {pillar.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
