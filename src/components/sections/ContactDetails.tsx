import { googleMapsSearchUrl, site } from "@/content/site";
import { pageCopy } from "@/content/pages";
import { Card } from "@/components/ui/Card";

export function ContactDetails() {
  return (
    <Card>
      <h2 className="font-heading text-2xl text-brand-primary">
        {pageCopy.contact.visitHeading}
      </h2>
      <address className="mt-4 not-italic">
        <p>
          {site.address.street}
          <br />
          {site.address.city}, {site.address.state} {site.address.zip}
        </p>
        <a
          className="mt-2 inline-flex min-h-11 items-center text-lg font-semibold text-brand-secondary underline underline-offset-4"
          href={`tel:${site.phone.tel}`}
        >
          {site.phone.display}
        </a>
        <p>
          <a
            className="inline-flex min-h-11 items-center text-brand-secondary underline underline-offset-4"
            href={site.email.href}
          >
            {site.email.display}
          </a>
        </p>
        <p className="mt-2">
          {pageCopy.contactDetails.fax}: {site.fax}
        </p>
      </address>
      <dl className="mt-5 space-y-3">
        <div>
          <dt className="font-semibold">{pageCopy.contactDetails.officeHours}</dt>
          <dd>{site.officeHours}</dd>
        </div>
        <div>
          <dt className="font-semibold">{pageCopy.contactDetails.visitingHours}</dt>
          <dd>{site.visitingHours}</dd>
        </div>
      </dl>
      <p className="mt-5">
        <a
          className="text-lg text-brand-secondary underline underline-offset-4"
          href={googleMapsSearchUrl}
        >
          {pageCopy.contactDetails.directions}
        </a>
      </p>
    </Card>
  );
}
