# Predator Awareness — Mark Coats

Working website concept by Astra Productions, using the original books, published training imagery and field resources. This repository contains the website source only; private research, email drafts and QA screenshots are kept outside it.

## Pages and original resources

- `index.html`: Mark's approach, both books, selected resources, and routes into the complete collections.
- `training.html`: all 12 video lessons from the original site's navigation, with search, topic filters, real on-demand YouTube players and direct video fallbacks.
- `articles.html`: all 23 original PDF resources, stored locally in `articles/`, with search and topic filters.
- `field-observations.html`: all 139 wildlife photographs and 36 cattle photographs, with progressive loading, collection filters and an accessible enlarged-image viewer. Without JavaScript, all images remain available as ordinary image links.
- `links.html`: all 11 reference links from Mark's original site, plus routes to his original contact and donation pages. No contact or payment backend is recreated.

The wildlife gallery preserves Mark's identification of the pictured canids as coyotes, not wolves. Original PDF files are unchanged. Camera photographs are optimized locally without cropping. Video playback remains provided by YouTube; embedded playback requires its service to be available. Some original publisher references require subscriber access or restrict automated clients.

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

Edit the five HTML pages, `styles.css`, `script.js`, `articles/`, and `assets/` at the repository root. The build creates `dist/`, which is ignored by Git. For a local build, set `SITE_URL` to the intended HTTPS origin and run `node build.mjs`. You can also open the root `index.html` directly in a browser without building.

Deploy only `dist/`. The homepage's no-index meta and Cloudflare `_headers` remain enabled for the concept. No-index does not restrict access to people with the URL. Official launch, domain changes and removing no-index are separate steps.

## Content and assets

Book covers, camera images and video thumbnails are sourced from Mark Coats' published Predator Awareness material. The site links to his existing resources. No guarantees of effectiveness, fabricated endorsements, or invented book content are included. The concept is not an official replacement for his existing website. Confirm final copy, image permissions, book edition and purchase destinations with the author before official launch.

The field viewer and article filters progressively enhance complete fallback content. No contact backend, CMS, analytics or third-party runtime scripts are included.
