import Link from "next/link";
import { navigation } from "@/content/navigation";

type NavLinkListProps = {
  currentPath: string;
  className?: string;
  linkClassName?: string;
};

export function NavLinkList({
  currentPath,
  className = "",
  linkClassName = "",
}: NavLinkListProps) {
  const normalizedPath =
    currentPath === "/" ? "/" : `${currentPath.replace(/\/+$/, "")}/`;

  return (
    <ul className={className}>
      {navigation.map((item) => {
        const isCurrent = item.href === normalizedPath;

        return (
          <li key={item.href}>
            <Link
              aria-current={isCurrent ? "page" : undefined}
              className={`inline-flex min-h-11 items-center justify-center rounded-full border-2 px-4 py-2 text-center text-lg no-underline motion-safe:transition-colors motion-safe:duration-150 ${
                isCurrent
                  ? "border-brand-secondary/65 bg-neutral-base font-bold text-typography-primary hover:border-brand-secondary hover:bg-brand-secondary-tint hover:text-brand-secondary"
                  : "border-brand-primary bg-brand-primary font-medium text-neutral-surface hover:bg-brand-primary"
              } ${linkClassName}`}
              href={item.href}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
