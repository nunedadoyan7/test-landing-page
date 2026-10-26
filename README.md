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
    ProduceBox.tsx  On-brand SVG hero illustration
    WhyHarvest.tsx  Differentiators grid (icon / heading / description)
    Pricing.tsx     3-tier pricing comparison (Small / Medium / Family)
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
- **Why Harvest** — four differentiator cards (local sourcing, customization,
  no commitment, flexible schedule), each with an icon, heading, and short
  description.
- **Pricing** — three-tier comparison (Small / Medium / Family box) with plan
  name, price, and key features; the Medium tier is highlighted as "Most
  popular".

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
