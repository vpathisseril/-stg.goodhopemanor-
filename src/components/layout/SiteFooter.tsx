import Link from "next/link";
import { navigation } from "@/content/navigation";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { pageCopy } from "@/content/pages";

export function SiteFooter() {
  return (
    <footer className="on-dark bg-brand-secondary py-12 text-neutral-surface">
      <Container>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="font-heading text-2xl font-bold">{site.name}</p>
            <p className="mt-4 max-w-prose text-lg">{site.tagline}</p>
            <ul className="mt-4 space-y-1 text-base">
              {pageCopy.footer.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-heading text-xl font-bold">Contact</h2>
            <address className="mt-4 not-italic">
              <p>
                {site.address.street}
                <br />
                {site.address.city}, {site.address.state} {site.address.zip}
              </p>
              <a
                className="mt-2 inline-flex min-h-11 items-center text-lg underline underline-offset-4"
                href={`tel:${site.phone.tel}`}
              >
                {site.phone.display}
              </a>
              <p>
                <a
                  className="inline-flex min-h-11 items-center text-lg underline underline-offset-4"
                  href={site.email.href}
                >
                  {site.email.display}
                </a>
              </p>
              <p className="text-base">
                {pageCopy.contactDetails.fax}: {site.fax}
              </p>
              <p className="mt-4 text-base">
                Need help using this site? Call{" "}
                <a
                  className="underline underline-offset-4"
                  href={`tel:${site.phone.tel}`}
                >
                  {site.phone.display}
                </a>
                .
              </p>
            </address>
          </div>
          <div>
            <h2 className="font-heading text-xl font-bold">Explore</h2>
            <nav aria-label="Footer" className="mt-3">
              <ul className="grid grid-cols-2 gap-x-3 gap-y-2">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      className="inline-flex min-h-11 items-center text-lg underline underline-offset-4"
                      href={item.href}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    className="inline-flex min-h-11 items-center text-lg underline underline-offset-4"
                    href="/privacy/"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    className="inline-flex min-h-11 items-center text-lg underline underline-offset-4"
                    href="/accessibility/"
                  >
                    Accessibility
                  </Link>
                </li>
              </ul>
            </nav>
            <ButtonLink
              className="mt-5"
              href="/contact/"
              variant="inverted"
            >
              {pageCopy.common.scheduleTour}
            </ButtonLink>
          </div>
        </div>
        <div className="mt-10 border-t border-neutral-surface/50 pt-6">
          <p className="font-semibold">{pageCopy.footer.license}</p>
          <p className="mt-3">
            <strong>Important Information:</strong>{" "}
            {pageCopy.footer.importantInformation}
          </p>
          <a
            className="mt-3 inline-flex min-h-11 items-center underline underline-offset-4"
            href={site.ahcaConsumerInformationUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            AHCA consumer information for licensed facilities (opens in a new
            tab)
          </a>
        </div>
        <p className="mt-10 border-t border-neutral-surface/50 pt-6 text-base">
          Copyright © {new Date().getFullYear()} {site.name}.
        </p>
      </Container>
    </footer>
  );
}
