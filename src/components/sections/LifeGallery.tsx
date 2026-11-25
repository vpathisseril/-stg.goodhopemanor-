import { lifeGallery } from "@/content/images";
import { CommunityPhotoImage } from "@/components/ui/CommunityPhotoImage";
import { Section } from "@/components/ui/Section";

export function LifeGallery() {
  return (
    <div>
      {lifeGallery.map((group, index) => (
        <Section
          className={index % 2 === 1 ? "bg-brand-secondary-tint" : ""}
          id={group.id}
          key={group.id}
        >
          <h2 className="mb-4 font-heading text-3xl text-typography-primary lg:text-4xl">
            {group.title}
          </h2>
          <p className="mb-7 max-w-prose">{group.intro}</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {group.photos.map((photo, photoIndex) => (
              <figure className="overflow-hidden rounded-lg bg-neutral-surface" key={photo.id}>
                <div className="relative aspect-[4/3]">
                  <CommunityPhotoImage
                    eager={index === 0 && photoIndex === 0}
                    photo={photo}
                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  />
                </div>
                <figcaption className="p-4 text-lg font-semibold">
                  {photo.title}
                </figcaption>
              </figure>
            ))}
          </div>
        </Section>
      ))}
    </div>
  );
}
