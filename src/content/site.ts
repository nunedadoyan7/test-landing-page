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

/** Icon shapes for the "Why Harvest" differentiator cards. */
export type DifferentiatorIcon = 'circle' | 'diamond' | 'square' | 'bar'

export interface Differentiator {
  icon: DifferentiatorIcon
  heading: string
  description: string
}

export const whyHarvest = {
  eyebrow: 'Why Harvest',
  heading: 'Built around real life, real food',
  items: [
    {
      icon: 'circle',
      heading: 'Local within 100 miles',
      description:
        'Every item traces back to a farm you could drive to. Fresher food, fewer miles.',
    },
    {
      icon: 'diamond',
      heading: 'Fully customizable',
      description:
        'Swap items, set preferences, add extras. No two boxes have to look alike.',
    },
    {
      icon: 'square',
      heading: 'No commitment',
      description:
        'Pause, skip a week, or cancel anytime — no fees, no phone calls, no guilt.',
    },
    {
      icon: 'bar',
      heading: 'On your schedule',
      description:
        'Choose delivery days and cadence that fit your week, then let it run on autopilot.',
    },
  ] satisfies readonly Differentiator[],
} as const

export interface PricingPlan {
  name: string
  serves: string
  price: string
  itemsLine: string
  highlighted: boolean
}

export const pricing = {
  eyebrow: 'Pricing',
  heading: 'Pick a box, change it anytime',
  subheading: 'Prices per weekly delivery. Free delivery on every box.',
  ctaHref: '#signup',
  plans: [
    {
      name: 'Small',
      serves: 'Serves 1–2 people',
      price: '$34',
      itemsLine: '8–10 seasonal items · fruit + veg',
      highlighted: false,
    },
    {
      name: 'Medium',
      serves: 'Serves 2–4 people',
      price: '$52',
      itemsLine: '12–15 items · add eggs & dairy',
      highlighted: true,
    },
    {
      name: 'Family',
      serves: 'Serves 4–6 people',
      price: '$78',
      itemsLine: '18–22 items · full pantry add-ons',
      highlighted: false,
    },
  ] satisfies readonly PricingPlan[],
  badgeLabel: 'Most popular',
} as const
