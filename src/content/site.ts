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

export interface HowStep {
  number: string
  title: string
  description: string
}

export const howItWorks = {
  eyebrow: 'How it works',
  heading: 'Fresh food, three simple steps',
  steps: [
    {
      number: '1',
      title: 'Choose your box',
      description:
        'Pick the size that fits your household — Small, Medium, or Family. Start small and scale whenever.',
    },
    {
      number: '2',
      title: 'Customize it',
      description:
        "Swap items you don't want, set dietary preferences, and add extras. Every box is yours to shape.",
    },
    {
      number: '3',
      title: 'Delivered weekly',
      description:
        'We harvest, pack, and drop it at your door every week. Skip a week or pause whenever life gets busy.',
    },
  ] satisfies readonly HowStep[],
} as const

export interface ProduceCategory {
  id: string
  label: string
}

export const box = {
  eyebrow: "What's in a box",
  heading: "A season's best, picked days before it reaches you",
  intro:
    "Contents rotate with what's ripe and local. Here's a taste of what a typical week looks like.",
  categories: [
    { id: 'greens', label: 'Leafy greens' },
    { id: 'fruit', label: 'Seasonal fruit' },
    { id: 'root', label: 'Root vegetables' },
    { id: 'herbs', label: 'Fresh herbs' },
    { id: 'dairy', label: 'Eggs & dairy' },
    { id: 'pantry', label: 'Pantry staples' },
  ] satisfies readonly ProduceCategory[],
} as const
