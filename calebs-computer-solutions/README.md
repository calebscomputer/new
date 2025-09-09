# Caleb's Computer Solutions

A Vite + React + TypeScript + Tailwind site for Caleb's Computer Solutions.

## Quick start

```bash
npm i
npm run dev
```

Open http://localhost:5173

## Build

```bash
npm run build
npm run preview
```

## Deploy

- **Vercel**: Import the repo, framework preset "Vite". Build `npm run build` • Output `dist`.
- **Netlify**: Build `npm run build` • Publish directory `dist`.
- **Cloudflare Pages**: Build `npm run build` • Output `dist`.

## Logo & Forms

- Logo file is `public/ccs-logo-256.png` and referenced as `/ccs-logo-256.png` in the component.
- Contact & review forms post to Formspree (`https://formspree.io/f/xgvlrgzb`) with a mailto fallback.

## Notes

- Tailwind config already includes the right content globs.
- If you change the reviews or pricing, edit `src/SmallBusinessSite.tsx`.


## GitHub Pages via Actions

1. Push this repo to GitHub on the `main` branch.
2. In GitHub → **Settings → Pages**, set **Build and deployment** Source = "GitHub Actions".
3. The included workflow `.github/workflows/deploy.yml` builds the site and deploys to Pages on every push to `main`.
4. Your site will be published at `https://<username>.github.io/<repo>/`.

> The workflow passes `--base=/<repo>/` to Vite so asset paths work on Pages. No extra config needed.


## Vercel via GitHub Actions

This repo includes `.github/workflows/vercel-preview.yml` and `.github/workflows/vercel-prod.yml`.

### Setup secrets (GitHub → Settings → Secrets and variables → Actions)
- `VERCEL_TOKEN` — from https://vercel.com/account/tokens
- `VERCEL_ORG_ID` — run `vercel link` locally to create `.vercel/project.json` then copy `orgId`
- `VERCEL_PROJECT_ID` — from the same `.vercel/project.json` (`projectId`)

### What it does
- **Preview**: any push to non-`main` branches builds and deploys a Preview on Vercel.
- **Production**: pushes to `main` build and deploy to Production on Vercel.

The workflows use `vercel pull`, `vercel build`, and `vercel deploy --prebuilt`.
