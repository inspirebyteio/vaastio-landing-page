# Vaastio — Landing Page

Marketing site for **Vaastio**, a society management platform by Inspirebyte.
Built with Next.js (App Router) and deployed on Netlify.

## Tech stack

- **Next.js 16** (App Router, Turbopack) + React + TypeScript
- **Tailwind CSS** + Radix UI primitives (`components/ui/*`)
- Custom landing styles in `public/landing.css` and `app/builders/builders.css`
- **Montserrat** via `next/font`
- Early-access forms via **Tally** (embed script in `app/layout.tsx`)
- Social/OG images generated at build time with `next/og` (`app/**/opengraph-image.tsx`)

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build
npm run start    # serve the production build
npm run lint     # lint
```

## Project structure

```
app/
  page.tsx              # home
  builders/page.tsx     # /builders (for builders & developers)
  privacy/, terms/      # legal pages
  opengraph-image.tsx   # generated OG image (per-route variants in subfolders)
  robots.ts, sitemap.ts # SEO
components/landing/      # page sections (Hero, DemoSection, Footer, …)
components/ui/           # Radix-based UI primitives
public/landing.css       # global landing styles
```

## Deployment

Deployed on **Netlify** (`netlify.toml` + `@netlify/plugin-nextjs`).
`public/_redirects` 301s `vaastio.in` → `vaastio.com`. Production domain: `vaastio.com`.

Analytics are not wired in — enable Netlify Analytics in the dashboard, or add a
client script (Plausible / GA4) in `app/layout.tsx`.
