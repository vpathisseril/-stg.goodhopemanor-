"use client";

import { usePathname } from "next/navigation";
import { NavLinkList } from "@/components/layout/NavLinkList";

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="hidden min-w-0 flex-1 lg:block">
      <NavLinkList
        className="flex flex-wrap items-center justify-end gap-2"
        currentPath={pathname}
      />
    </nav>
  );
}
