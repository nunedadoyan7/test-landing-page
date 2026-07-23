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

export interface Plan {
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
  ] satisfies Plan[],
} as const

export const signup = {
  heading: 'See if we deliver to you',
  blurb:
    'Enter your email and ZIP to check availability and claim $20 off your first box. No commitment to start.',
  emailLabel: 'Email address',
  emailPlaceholder: 'you@email.com',
  zipLabel: 'ZIP code',
  zipPlaceholder: 'e.g. 97201',
  submitLabel: 'Check availability',
  finePrint: 'Pause or cancel anytime. No card required to check.',
  errors: {
    email: 'Please enter a valid email address.',
    zip: 'Please enter a valid 5-digit ZIP code.',
  },
  success: {
    heading: "You're on the list!",
    resetLabel: 'Check another address',
  },
} as const
