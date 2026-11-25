# Good Hope Manor — Agent Instructions

Before changing the site, read:

1. `docs/MEMORY.md`
2. `docs/RULES.md`
3. `docs/PRD.md`
4. `docs/DESIGN.md`
5. `docs/ARCHITECTURE.md`
6. `docs/PHASES.md`

Do not invent content, care claims, reviews, URLs, or images. Use the supplied source material and images; describe images only by what they visibly show. Exclude visibly watermarked images. Where source details are missing, omit the unsupported detail or clearly explain the available next step without inserting a placeholder into the site. Keep the site statically exportable and maintain the accessibility requirements in `docs/RULES.md`.

The image pipeline (`npm run images`) creates optimized, metadata-stripped WebP derivatives in the ignored `assets/optimized/` directory. Development, type-checking, and builds run it automatically; regenerate manually after changing an input image.

Run `npm run lint`, `npm run typecheck`, `npm run build`, and `npm run test:a11y` after code changes. Update `docs/MEMORY.md` before handing off.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
