import Image from "next/image";
import { activityIllustrations } from "@/content/activities";
import { Section } from "@/components/ui/Section";

export function ActivityIllustrations() {
  return (
    <Section className="bg-neutral-surface">
      <h2 className="mb-4 font-heading text-3xl text-typography-primary lg:text-4xl">
        Moments worth making room for
      </h2>
      <p className="mb-3 max-w-prose">
        These original illustrations offer ideas for the kinds of shared moments
        families may want to ask about.
      </p>
      <p className="mb-7 max-w-prose text-base text-typography-muted">
        They are conceptual illustrations, not photographs of Good Hope Manor,
        its residents, or confirmed activities.
      </p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {activityIllustrations.map((activity) => (
          <figure
            className="overflow-hidden rounded-xl bg-neutral-base"
            key={activity.id}
          >
            <Image
              alt={activity.description}
              className="h-auto w-full"
              height={800}
              src={activity.src}
              width={1200}
            />
            <figcaption className="p-5 font-heading text-xl text-typography-primary">
              {activity.title}
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
