import { site } from "@/content/site";
import { homeHeroBackground } from "@/content/images";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { pageCopy } from "@/content/pages";

export function HomeHero() {
  return (
    <section className="relative isolate overflow-hidden bg-neutral-base py-8 md:py-12 lg:py-16">
      <div
        aria-label={homeHeroBackground.alt}
        className="absolute inset-0 -z-10 bg-cover bg-[position:50%_42%] sm:bg-[position:50%_48%]"
        role="img"
        style={{ backgroundImage: `url("${homeHeroBackground.src.src}")` }}
      />
      <div aria-hidden="true" className="home-hero-wash absolute inset-0 -z-10" />
      <Container className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="relative isolate p-6 motion-safe:animate-[home-hero-reveal_200ms_ease-out_both] sm:p-8 lg:col-span-5 lg:p-9">
          <div
            aria-hidden="true"
            className="home-hero-backdrop pointer-events-none absolute inset-0 -z-10"
          />
          <h1 className="home-hero-heading font-heading text-4xl leading-tight text-brand-primary lg:text-5xl">
            {pageCopy.home.title}
          </h1>
          <p className="home-hero-introduction mt-4 max-w-prose font-heading text-2xl font-medium leading-relaxed tracking-[0.01em] text-white sm:mt-5">
            {pageCopy.home.subtitle}
          </p>
          <p className="mt-3 max-w-prose text-lg leading-relaxed text-white">
            {pageCopy.home.introduction}
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink className="min-h-14 px-8 text-xl" href="/contact/">
              {pageCopy.common.scheduleTour}
            </ButtonLink>
            <a
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-lg border-2 border-brand-secondary bg-neutral-surface px-6 py-3 text-lg font-semibold text-brand-secondary underline underline-offset-4"
              href={`tel:${site.phone.tel}`}
            >
              <span>Call {site.phone.display}</span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
