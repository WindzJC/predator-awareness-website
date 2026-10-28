# Predator Awareness — Mark Coats

Working homepage concept by Astra Productions, using the original books, published training imagery and field resources. This repository contains the website source only; private research, email drafts and QA screenshots are kept outside it.

## Cloudflare Pages settings

| Setting | Value |
|---|---|
| Production branch | `main` |
| Framework preset | None |
| Build command | `node build.mjs` |
| Build output directory | `dist` |
| Root directory | Leave blank |

No dependencies or installation command are required. Use Node.js 20 or newer. Cloudflare Pages provides `CF_PAGES_URL`; the build uses it for an absolute HTTPS Open Graph image URL. To use an approved custom domain for social sharing, set `SITE_URL` to that domain's HTTPS origin.

## Editing and local preview

Edit `index.html`, `styles.css`, `script.js`, and `assets/` at the repository root. The build creates `dist/`, which is ignored by Git. For a local build, set `SITE_URL` to the intended HTTPS origin and run `node build.mjs`. You can also open the root `index.html` directly in a browser without building.

Deploy only `dist/`. The homepage's no-index meta and Cloudflare `_headers` remain enabled for the concept. No-index does not restrict access to people with the URL. Official launch, domain changes and removing no-index are separate steps.

## Content and assets

Book covers, camera images and video thumbnails are sourced from Mark Coats' published Predator Awareness material. The site links to his existing resources. No guarantees of effectiveness, fabricated endorsements, or invented book content are included. The concept is not an official replacement for his existing website. Confirm final copy, image permissions, book edition and purchase destinations with the author before official launch.

The field viewer and article filters progressively enhance complete fallback content. No contact backend, CMS, analytics or third-party runtime scripts are included.
