import Link from "next/link";
import type { ReactNode } from "react";

type TextLinkProps = {
  children: ReactNode;
  href: string;
  className?: string;
};

export function TextLink({ children, href, className = "" }: TextLinkProps) {
  return (
    <Link
      className={`text-brand-secondary underline decoration-2 underline-offset-4 hover:text-brand-primary ${className}`}
      href={href}
    >
      {children}
    </Link>
  );
}
