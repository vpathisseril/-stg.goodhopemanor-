# Cloudflare Pages Deployment

This guide deploys the existing static Next.js export from GitHub. It does not require a GoDaddy hosting plan. The domain can remain registered at GoDaddy; connecting the repository to Cloudflare does not change GoDaddy DNS.

## Choose how people will reach the site

| Option | Visitor address | GoDaddy DNS change | Use |
| --- | --- | --- | --- |
| **1. Cloudflare preview/Pages address** | A Cloudflare `*.pages.dev` URL | No | Publish for client viewing while leaving the current domain destination untouched. |
| **2. Custom `www` domain** | `www.goodhopemanor.com` | Yes: update only the `www` record to the target Cloudflare provides | Make the Cloudflare site available at the client’s domain. The domain registration and DNS management can stay with GoDaddy. |

Both options use the same Cloudflare Pages project and Git deployment. Option 1 is reachable online, but uses a Cloudflare address. Option 2 uses the business domain and changes where `www` points. Do not change the apex (`goodhopemanor.com`), Replit verification records, or unrelated DNS records as part of the `www` change. Consider apex forwarding only after `www` works and the client approves it.

## One-time Git deployment setup

1. Confirm the exact reviewed commit is pushed to the GitHub repository `yantralabs101-arch/Good-Hope-Manor`.
2. In Cloudflare, open **Workers & Pages → Create application → Pages → Import an existing Git repository** and authorize the repository.
3. Set the production branch to `main`. Pull requests and other branches can receive preview deployments; merge reviewed work to `main` for production.
4. Set the build command to `npm run build` and the output directory to `out`.
5. Set the environment variable `NODE_VERSION` to `22.19.0`.
6. Save and deploy. Cloudflare will build the static export and provide a `pages.dev` URL. Check the deployed pages, images, navigation and contact links.

The build script runs the image optimization step before Next.js generates the static export. The repository’s GitHub Actions workflow separately runs lint, typecheck, build, accessibility, end-to-end and Lighthouse checks on pull requests and pushes to `main`. Protect `main` so required checks pass before merging; Cloudflare’s build/deploy is a separate integration.

## Option 1: publish at the Cloudflare address

Share the Pages URL with the client. No GoDaddy DNS change is needed, and the current destination of `goodhopemanor.com` and `www.goodhopemanor.com` is unaffected. A production deployment on the Pages URL updates when approved changes are merged to `main`.

## Option 2: publish at `www.goodhopemanor.com`

1. In the Pages project, add `www.goodhopemanor.com` under **Custom domains** and follow Cloudflare’s domain verification/setup instructions.
2. In GoDaddy DNS, change only the conflicting `www` record to the exact target Cloudflare instructs you to use. Do not guess the target or delete unrelated records.
3. Wait for Cloudflare to verify the domain and issue TLS, then check `https://www.goodhopemanor.com` and the site’s routes.
4. Once `www` is confirmed and approved, decide whether to forward the apex domain to `www` through GoDaddy. Verify the forwarding before considering any apex DNS changes.

Adding a custom domain to the Pages project is required before its DNS record can serve the project. Cloudflare’s instructions for apex domains differ from subdomains; this guide uses `www` to avoid moving the domain’s nameservers.

## The `/stg/` suggestion

The current export is built to run at the root of its host. Deploying it unchanged gives a root site at `project.pages.dev/`; it does not create `www.goodhopemanor.com/stg/index.html` alongside a separate construction page at `/`. That layout needs additional build or hosting configuration. If the code and build must remain unchanged, use the `pages.dev` address for review, or use a staging subdomain after agreeing to its DNS change.

## References

- [Cloudflare: Deploy a static Next.js site](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/)
- [Cloudflare: Git integration](https://developers.cloudflare.com/pages/configuration/git-integration/)
- [Cloudflare: Custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/)
