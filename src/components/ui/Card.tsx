import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-xl bg-neutral-surface p-6 shadow-sm md:p-8 ${className}`}
    >
      {children}
    </div>
  );
}
