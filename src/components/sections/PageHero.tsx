import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";

type PageHeroProps = {
  title: string;
  intro: string;
};

export function PageHero({ title, intro }: PageHeroProps) {
  return (
    <section className="bg-brand-accent-tint py-10 md:py-12">
      <Container>
        <Breadcrumbs currentPage={title} />
        <h1 className="max-w-4xl font-heading text-4xl text-typography-primary lg:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-prose text-xl leading-relaxed text-typography-primary">
          {intro}
        </p>
      </Container>
    </section>
  );
}
