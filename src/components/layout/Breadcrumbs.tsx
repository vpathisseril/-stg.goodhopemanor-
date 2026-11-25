import Link from "next/link";

type BreadcrumbsProps = {
  currentPage: string;
};

export function Breadcrumbs({ currentPage }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-base">
        <li>
          <Link
            className="inline-flex min-h-11 items-center text-brand-secondary underline underline-offset-4"
            href="/"
          >
            Home
          </Link>
        </li>
        <li aria-hidden="true">›</li>
        <li aria-current="page" className="min-h-11 py-2 text-typography-primary">
          {currentPage}
        </li>
      </ol>
    </nav>
  );
}
