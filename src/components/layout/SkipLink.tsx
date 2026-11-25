import { pageCopy } from "@/content/pages";

export function SkipLink() {
  return (
    <a
      className="absolute left-4 top-4 z-50 -translate-y-24 rounded-lg bg-neutral-surface px-5 py-3 text-lg font-semibold text-brand-secondary focus:translate-y-0"
      href="#main"
    >
      {pageCopy.common.skipToContent}
    </a>
  );
}
