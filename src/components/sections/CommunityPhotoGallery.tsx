"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { CommunityPhoto } from "@/types/content";
import { communityPhotos } from "@/content/images";

function GalleryArrow({ direction }: { direction: "previous" | "next" }) {
  return (
    <svg
      aria-hidden="true"
      className="size-5"
      fill="none"
      viewBox="0 0 24 24"
    >
      {direction === "previous" ? (
        <path
          d="M19 12H5m6 6-6-6 6-6"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.75"
        />
      ) : (
        <path
          d="M5 12h14m-6-6 6 6-6 6"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.75"
        />
      )}
    </svg>
  );
}

export function CommunityPhotoGallery() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [canScrollBackward, setCanScrollBackward] = useState(false);
  const [canScrollForward, setCanScrollForward] = useState(
    communityPhotos.length > 1,
  );

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) {
      return;
    }

    const updateScrollControls = () => {
      const galleryLeft = gallery.getBoundingClientRect().left;
      const cards = Array.from(gallery.querySelectorAll("li"));
      setCanScrollBackward(
        cards.some((card) => card.getBoundingClientRect().left < galleryLeft - 1),
      );
      setCanScrollForward(
        cards.some((card) => card.getBoundingClientRect().left > galleryLeft + 1),
      );
    };

    gallery.addEventListener("scroll", updateScrollControls, { passive: true });
    const resizeObserver = new ResizeObserver(updateScrollControls);
    resizeObserver.observe(gallery);
    updateScrollControls();

    return () => {
      gallery.removeEventListener("scroll", updateScrollControls);
      resizeObserver.disconnect();
    };
  }, []);

  function scrollGallery(direction: "backward" | "forward") {
    const gallery = galleryRef.current;
    const cards = gallery?.querySelectorAll("li");
    if (!gallery || !cards?.length) {
      return;
    }

    const galleryLeft = gallery.getBoundingClientRect().left;
    const nextCard =
      direction === "forward"
        ? Array.from(cards).find(
            (card) => card.getBoundingClientRect().left > galleryLeft + 1,
          )
        : Array.from(cards)
            .reverse()
            .find((card) => card.getBoundingClientRect().left < galleryLeft - 1);

    if (!nextCard) {
      return;
    }

    const scrollDelta = nextCard.getBoundingClientRect().left - galleryLeft;
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches
      ? "auto"
      : "smooth";

    gallery.scrollTo({
      left: gallery.scrollLeft + scrollDelta,
      behavior,
    });
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div
        aria-label="Photographs of living, dining, bedroom, and bathroom spaces"
        aria-keyshortcuts="ArrowLeft ArrowRight"
        aria-roledescription="photo gallery"
        className="overflow-x-auto overscroll-x-contain touch-pan-x"
        data-testid="community-photo-gallery-viewport"
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" && canScrollBackward) {
            event.preventDefault();
            scrollGallery("backward");
          } else if (event.key === "ArrowRight" && canScrollForward) {
            event.preventDefault();
            scrollGallery("forward");
          }
        }}
        ref={galleryRef}
        role="region"
        tabIndex={0}
      >
        <ul className="flex w-max snap-x snap-mandatory items-start gap-6 pb-3 sm:gap-8 lg:gap-10">
          {communityPhotos.map((photo, index) => (
            <CommunityPhotoCard
              eager={index === 0}
              key={photo.id}
              photo={photo}
            />
          ))}
        </ul>
      </div>
      <div className="mt-4 flex justify-end gap-3">
        <button
          aria-label="Previous spaces"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-brand-secondary/35 text-brand-secondary hover:bg-brand-secondary hover:text-neutral-surface disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-brand-secondary motion-safe:transition-colors"
          disabled={!canScrollBackward}
          onClick={() => scrollGallery("backward")}
          type="button"
        >
          <GalleryArrow direction="previous" />
        </button>
        <button
          aria-label="Next spaces"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-brand-secondary/35 text-brand-secondary hover:bg-brand-secondary hover:text-neutral-surface disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-brand-secondary motion-safe:transition-colors"
          disabled={!canScrollForward}
          onClick={() => scrollGallery("forward")}
          type="button"
        >
          <GalleryArrow direction="next" />
        </button>
      </div>
    </div>
  );
}

type CommunityPhotoCardProps = {
  eager: boolean;
  photo: CommunityPhoto;
};

function CommunityPhotoCard({ eager, photo }: CommunityPhotoCardProps) {
  return (
    <li className="w-fit shrink-0 snap-start">
      <figure>
        <Image
          alt={photo.alt}
          className="h-56 w-auto max-w-none rounded-lg object-cover sm:h-64 lg:h-72"
          height={photo.src.height}
          loading={eager ? "eager" : "lazy"}
          sizes="(max-width: 639px) 140vw, (max-width: 1023px) 75vw, 50vw"
          src={photo.src}
          width={photo.src.width}
        />
        <figcaption className="mt-3 font-heading text-xl text-typography-primary">
          {photo.title}
        </figcaption>
      </figure>
    </li>
  );
}
