import Image from "next/image";
import {
  rosePetalLowerRight,
  rosePetalUpperLeft,
} from "@/content/images";

export function CornerPetalBackground() {
  return (
    <>
      <Image
        alt=""
        aria-hidden="true"
        className="rose-petal-corner rose-petal-upper-left absolute -z-10 object-contain"
        sizes="(min-width: 640px) 192px, 112px"
        src={rosePetalUpperLeft}
      />
      <Image
        alt=""
        aria-hidden="true"
        className="rose-petal-corner rose-petal-lower-right absolute -z-10 object-contain"
        sizes="(min-width: 640px) 192px, 112px"
        src={rosePetalLowerRight}
      />
    </>
  );
}
