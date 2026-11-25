"use client";

import { usePathname } from "next/navigation";
import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";
import { pageCopy } from "@/content/pages";

export function StickyMobileBar() {
  const pathname = usePathname();
  const isContactPage = pathname.replace(/\/+$/, "") === "/contact";

  return (
    <div
      aria-label="Mobile contact actions"
      className={`fixed inset-x-0 bottom-0 z-40 grid ${
        isContactPage ? "grid-cols-1" : "grid-cols-2"
      } gap-3 bg-neutral-surface p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-lg lg:hidden`}
      role="group"
    >
      <a
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border-2 border-brand-secondary bg-neutral-surface px-3 text-lg font-semibold text-brand-secondary"
        href={`tel:${site.phone.tel}`}
      >
        <Icon name="phone" />
        {isContactPage ? `${pageCopy.common.call} ${site.phone.display}` : pageCopy.common.call}
      </a>
      {!isContactPage ? (
        <ButtonLink className="w-full px-3" href="/contact/">
          {pageCopy.common.scheduleTour}
        </ButtonLink>
      ) : null}
    </div>
  );
}
