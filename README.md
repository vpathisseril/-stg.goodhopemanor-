# Good Hope Manor

An accessible, static website MVP for Good Hope Manor, built with Next.js App Router, TypeScript, and Tailwind CSS.

## Run locally

Use Node.js 22.19.0 as specified in `.nvmrc`, then install dependencies and
start the development server:

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The production build is a static export in `out/`.
The development server and production build generate optimized WebP copies of
the selected supplied images automatically. Run `npm run images` to regenerate
them manually.

```bash
npm run lint
npm run typecheck
npm run build
npm run test:a11y
npm run test:e2e
npm run check:content
```

Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS domain before release. Set `NEXT_PUBLIC_FORMSPREE_ENDPOINT` to the approved HTTPS form endpoint to enable tour requests. See `.env.example`; do not commit real environment files.

## Routes

Home, About Us, Care & Services, Life at Good Hope Manor, For Families, Reviews, Referral Partners, Contact, Privacy Policy, and Accessibility. Privacy and accessibility links are in the shared footer. User login and document administration remain deferred.

## Project notes

- Read the project requirements in [`docs/`](./docs/) before making changes.
- The pages use copy from the verified client brief and supplied live-site reference. Six supplied interior photos are optimized to metadata-stripped WebP derivatives. The Home hero and care approach also use two owner-approved garden concepts, identified as illustrative in their accessible text and not presented as actual residents, staff, or services. Image authenticity and publication approval for the supplied interior photos still require client confirmation.
- The reference site's editorial typography inspired Newsreader headings and Source Sans 3 body text. Good Hope Manor's documented color palette remains in place.
- The client supplied three review excerpts and an authorization statement. The Google Maps search remains a lookup/directions fallback, not an official business-profile URL.
- Contact address, phone, email, fax, hours, license wording, AHCA destination, and policy statements are sourced from the client brief or supplied live-site reference. Reconfirm current contact details and photo permissions before production.
- The tour-request form continues to show its call fallback until an approved HTTPS form endpoint is configured.
