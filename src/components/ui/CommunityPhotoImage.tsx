import Image from "next/image";
import type { CommunityPhoto } from "@/types/content";

type CommunityPhotoImageProps = {
  photo: CommunityPhoto;
  sizes: string;
  eager?: boolean;
};

export function CommunityPhotoImage({
  photo,
  sizes,
  eager = false,
}: CommunityPhotoImageProps) {
  return (
    <Image
      alt={photo.alt}
      className="object-cover"
      fill
      loading={eager ? "eager" : "lazy"}
      sizes={sizes}
      src={photo.src}
    />
  );
}
