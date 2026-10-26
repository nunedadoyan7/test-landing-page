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
  step: string
  title: string
  description: string
}

export const howItWorks = {
  id: 'how',
  eyebrow: 'How it works',
  headline: 'Fresh food, three simple steps.',
  subheadline:
    'Build a box around your week, we harvest and pack it, and it lands on your doorstep — no store trip required.',
  steps: [
    {
      step: '01',
      title: 'Pick your box',
      description:
        'Choose a size and tell us what you love. Swap, add, or skip items anytime before your cutoff.',
    },
    {
      step: '02',
      title: 'We harvest & pack',
      description:
        'Partner farms within 100 miles pick to order, then we pack everything into your box the same day.',
    },
    {
      step: '03',
      title: 'Delivered to you',
      description:
        'Track your delivery and enjoy farm-fresh produce at your door — pause or reschedule whenever you need.',
    },
  ] satisfies readonly HowStep[],
} as const
