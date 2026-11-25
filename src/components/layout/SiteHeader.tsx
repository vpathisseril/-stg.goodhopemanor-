import Link from "next/link";
import Image from "next/image";
import { site } from "@/content/site";
import { goodHopeManorLogo } from "@/content/images";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";
import { MainNav } from "@/components/layout/MainNav";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { pageCopy } from "@/content/pages";

export function SiteHeader() {
  return (
    <header className="relative z-30 bg-neutral-surface">
      <div className="hidden lg:block">
        <div className="mx-auto flex min-h-16 w-full items-center justify-end gap-6 px-4 sm:px-6">
          <a
            className="inline-flex min-h-11 items-center gap-2 font-semibold text-brand-secondary underline"
            href={`tel:${site.phone.tel}`}
          >
            <Icon name="phone" />
            {site.phone.display}
          </a>
          <ButtonLink href="/contact/">
            {pageCopy.common.scheduleTour}
          </ButtonLink>
        </div>
      </div>
      <div className="mx-auto flex min-h-20 w-full items-center justify-between gap-2 px-4 py-2 sm:gap-4 sm:px-6 lg:min-h-24">
        <Link
          className="min-w-0 sm:shrink-0"
          href="/"
        >
          <Image
            alt="Good Hope Manor"
            className="h-auto w-[250px] max-w-full sm:w-[330px] lg:w-[420px]"
            height={36}
            priority
            sizes="(min-width: 1024px) 420px, (min-width: 640px) 330px, 250px"
            src={goodHopeManorLogo}
            width={160}
          />
        </Link>
        <MainNav />
        <MobileMenu />
      </div>
    </header>
  );
}
