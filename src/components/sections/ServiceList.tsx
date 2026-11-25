import { services } from "@/content/services";
import { Card } from "@/components/ui/Card";

export function ServiceList() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {services.map((service, index) => (
        <section
          aria-labelledby={`${service.slug}-heading`}
          className={index % 2 === 1 ? "rounded-xl bg-brand-secondary-tint p-1" : ""}
          id={service.slug}
          key={service.slug}
        >
          <Card className="h-full">
            <h2
              className="font-heading text-2xl text-brand-primary"
              id={`${service.slug}-heading`}
            >
              {service.title}
            </h2>
            <p className="mt-4">{service.summary}</p>
            {service.details ? (
              <ul className="mt-4 list-disc space-y-2 pl-6">
                {service.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            ) : null}
          </Card>
        </section>
      ))}
    </div>
  );
}
