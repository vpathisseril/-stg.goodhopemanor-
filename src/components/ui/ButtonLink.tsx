import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary" | "inverted";
  className?: string;
};

const variants = {
  primary: "bg-brand-primary text-neutral-surface hover:brightness-90",
  secondary:
    "border-2 border-brand-secondary bg-neutral-surface text-brand-secondary hover:bg-brand-secondary-tint",
  inverted:
    "bg-neutral-surface text-brand-secondary hover:brightness-95",
};

export function ButtonLink({
  children,
  href,
  variant = "primary",
  className = "",
}: ButtonLinkProps) {
  return (
    <Link
      className={`inline-flex min-h-12 items-center justify-center rounded-lg px-6 py-3 text-center text-lg font-semibold motion-safe:transition motion-safe:duration-150 motion-safe:hover:-translate-y-1 ${variants[variant]} ${className}`}
      href={href}
    >
      {children}
    </Link>
  );
}
