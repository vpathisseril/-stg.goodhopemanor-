import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export function Button({ children, className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex min-h-12 items-center justify-center rounded-lg bg-brand-primary px-6 py-3 text-lg font-semibold text-neutral-surface motion-safe:transition motion-safe:duration-150 motion-safe:hover:-translate-y-1 hover:brightness-90 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
