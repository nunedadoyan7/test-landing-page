/**
 * Centralized copy + navigation config for the Harvest landing page.
 * Copy is transcribed verbatim from the reference design
 * ("Harvest Landing Page.html") so components stay presentational.
 */

export interface NavLink {
  label: string
  href: string
}

export const brand = {
  name: 'Harvest',
  monogram: 'H',
} as const

export const navLinks: readonly NavLink[] = [
  { label: 'How it works', href: '#how' },
  { label: "What's inside", href: '#box' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Reviews', href: '#reviews' },
]

export const nav = {
  signIn: { label: 'Sign in', href: '#signup' },
  cta: { label: 'Start your first box', href: '#signup' },
} as const

export const copyright = {
  // The legal entity displayed in the copyright line; the year is derived at
  // render time so the notice never goes stale.
  entity: 'Harvest Foods, Inc.',
  rights: 'All rights reserved.',
  links: [
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
    { label: 'Delivery areas', href: '#' },
  ],
} as const

export const hero = {
  eyebrow: 'Sourced from farms within 100 miles',
  headline: 'Farm-fresh groceries, delivered on your schedule.',
  subheadline:
    'Skip the store, never skip fresh. Handpicked produce from local growers, packed into a box built entirely around you.',
  primaryCta: { label: 'Start your first box', href: '#signup' },
  secondaryCta: { label: 'See how it works →', href: '#how' },
  stats: [
    { value: '40+', label: 'partner farms' },
    { value: 'Pause anytime', label: 'no commitment, ever' },
  ],
  visual: {
    caption: 'Drop hero photo — fresh produce box',
    badge: { label: 'Next delivery', value: 'Thu, this week' },
  },
} as const
