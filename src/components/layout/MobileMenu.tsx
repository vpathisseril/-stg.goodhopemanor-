"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { NavLinkList } from "@/components/layout/NavLinkList";
import { Icon } from "@/components/ui/Icon";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!isOpen) return;

    const panel = panelRef.current;
    const focusable = panel?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])',
    );
    focusable?.[0]?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        toggleRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <div className="lg:hidden">
      <button
        aria-controls="mobile-navigation"
        aria-expanded={isOpen}
        className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-lg border-2 border-brand-secondary px-3 text-lg font-semibold text-brand-secondary"
        onClick={() => setIsOpen((open) => !open)}
        ref={toggleRef}
        type="button"
      >
        <Icon name={isOpen ? "close" : "menu"} />
        <span>Menu</span>
      </button>
      {isOpen ? (
        <div
          className="absolute inset-x-0 top-full border-t border-brand-secondary-tint bg-neutral-surface px-4 py-4 shadow-lg"
          id="mobile-navigation"
          ref={panelRef}
        >
          <button
            className="mb-3 inline-flex min-h-11 items-center gap-2 rounded-lg px-3 text-lg font-semibold text-brand-secondary underline underline-offset-4"
            onClick={closeMenu}
            type="button"
          >
            <Icon name="close" />
            Close
          </button>
          <nav aria-label="Primary">
            <NavLinkList
              className="flex flex-col gap-2"
              currentPath={pathname}
              linkClassName="w-full"
            />
          </nav>
        </div>
      ) : null}
    </div>
  );
}
