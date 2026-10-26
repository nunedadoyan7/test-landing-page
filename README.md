# Harvest — Test Landing Page (TLP)

A warm, earthy landing page for **Harvest**, a farm-fresh grocery delivery
service. Built with React 19, TypeScript, Vite, and Tailwind CSS v4.

The visual design reference lives in `Harvest Landing Page.html`.

## Tech stack

- **React 19** + **TypeScript** (strict)
- **Vite 6** for dev/build tooling
- **Tailwind CSS v4** with design tokens for the Harvest palette
- **Vitest** + **React Testing Library** for component tests
- **ESLint** (typescript-eslint) for linting

## Getting started

```bash
npm install      # install dependencies
npm run dev      # start the dev server
npm run build    # type-check + production build
npm run test     # run the test suite
npm run lint     # lint the codebase
npm run typecheck # type-check without emitting
```

## Project structure

```
src/
  components/     Presentational React components
    Button.tsx      Reusable pill button (primary / forest / ghost)
    Logo.tsx        Harvest monogram + wordmark
    Navbar.tsx      Sticky navigation with responsive mobile menu
    Hero.tsx        Hero section (headline, CTAs, stats, visual)
    HowItWorks.tsx  3-step "How it works" process
    WhatsInBox.tsx  Produce-category showcase
    ProduceBox.tsx  On-brand SVG hero illustration
  content/
    site.ts         Centralized copy + navigation config
  App.tsx           Page composition
  index.css         Tailwind import + Harvest design tokens
```

## Implemented sections

- **Navigation bar** — logo/wordmark, primary nav links, sign-in, and a
  "Start your first box" CTA. Collapses to a toggle menu on mobile.
- **Hero** — eyebrow badge, serif headline, subheadline, primary + secondary
  CTAs, trust stats, and a produce-box visual with a floating delivery card.
- **How it works** — 3-step process (Choose your box → Customize → Delivered
  weekly), each a numbered card with a short description.
- **What's in a box** — deep-forest showcase of produce categories (leafy
  greens, seasonal fruit, root veg, herbs, eggs & dairy, pantry staples) with
  on-brand SVG placeholder art and label overlays.

## Design tokens

| Token         | Value     | Usage                     |
| ------------- | --------- | ------------------------- |
| `cream`       | `#F6F1E6` | Page background           |
| `cream-card`  | `#FBF8F0` | Cards / surfaces          |
| `ink`         | `#23301F` | Body text                 |
| `forest`      | `#34502F` | Primary brand green       |
| `terracotta`  | `#C56A34` | Accent / primary CTA      |
| `sage`        | `#5B6551` | Muted text                |
| `line`        | `#E4DAC5` | Borders                   |
| `badge`       | `#EADFC8` | Eyebrow badge background  |

Type: **Spectral** (serif display) and **Work Sans** (sans body).
