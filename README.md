# Didoabe Property Company Website

A lightweight React and Vite website for Didoabe Property Company. The public site is static: it has no database, API server, authentication, analytics, or inquiry storage.

## Features

- Home, about, services, landlord, tenant, process, reporting information, FAQ, and contact sections.
- Responsive navigation and light/dark display themes.
- A browser-only rental income scenario calculator. It has no prefilled rent or fee rate and uses only values entered by the visitor.
- Contact forms validate locally and prepare WhatsApp drafts. The visitor must review the draft and press **Send** in WhatsApp before the company receives it. Telephone, email, and map links are also provided.
- Local property photos with generated smaller JPEG variants, intrinsic dimensions, responsive source selection, lazy loading below the fold, and a one-shot branded fallback if an image fails to load.
- Browser metadata is updated for the active site section. Hash-based navigation keeps the site on one static document.

The reporting panel is a layout illustration; it contains no real client, tenant, rent, fee, transaction, or payment data. Service availability, scope, fees, costs, and payment arrangements must be confirmed with the company for each property.

## Company information

The source content includes the company name, contact information, Kampala office addresses, postal address, listed service areas, mission, and values. Verify these facts and any service terms with the company before publication.

Main content is maintained in `src/data/companyData.ts`. Site sections are in `src/components/`, with application navigation and page metadata in `src/App.tsx`.

## Run locally

Use a supported Node.js version for the installed Vite release, then run:

```sh
npm ci
npm run dev
```

Vite serves the site at `http://localhost:3000`. For temporary testing from another device on the same network, run `npm run dev:lan`; this exposes the development server to the local network.

## Checks

```sh
npm run typecheck
npm test
npm run build
```

`npm run lint` is an alias for the TypeScript checks; ESLint is not configured.

## Cloudflare Pages deployment

Create a Pages project using this repository and set:

- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Environment variables:** none required

The app uses hash-based navigation, so all sections are served from the static `index.html` document and do not need per-route rewrite rules. `public/_headers` provides response headers and cache policies copied into `dist` by Vite. Its Content Security Policy includes hashes for the two inline scripts in `index.html`; update those hashes if either script changes. Cloudflare Pages serves the built files; no Node.js API server or database is required.

The site generates its canonical URL from the deployed origin. A sitemap with absolute URLs is not included because the production domain must be confirmed first.

## Source archive

From the project root, run `./scripts/package-source.ps1`. The script excludes `node_modules`, `dist`, `.aistudio`, existing release archives, environment files, and ZIP files. Deploy `dist/`; do not upload the source archive as the site.

`src/assets/images/` mirrors the base JPEG photos in `public/assets/images/`; smaller responsive variants are stored beside the published base images. These copies are not full-resolution photographic originals.
