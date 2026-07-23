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

export interface Testimonial {
  quote: string
  initial: string
  name: string
  detail: string
}

export const testimonials = {
  eyebrow: 'Loved by busy households',
  heading: 'People who got their evenings back',
  items: [
    {
      quote:
        "I used to lose a whole Saturday to the store. Now the best produce I've had in years just shows up — and I actually cook again.",
      initial: 'M',
      name: 'Maya R.',
      detail: 'Parent of two, Portland',
    },
    {
      quote:
        "The customization sold me. I skip the things my kids won't touch and load up on greens. Pausing for vacation took ten seconds.",
      initial: 'D',
      name: 'Daniel K.',
      detail: 'Software engineer, Austin',
    },
    {
      quote:
        "Knowing it's all from farms nearby makes a difference you can taste. It feels like a farmers market that comes to me.",
      initial: 'P',
      name: 'Priya N.',
      detail: 'Nurse, Denver',
    },
  ] satisfies readonly Testimonial[],
} as const

export const signup = {
  heading: 'See if we deliver to you',
  description:
    'Enter your email and ZIP to check availability and claim $20 off your first box. No commitment to start.',
  email: {
    label: 'Email address',
    placeholder: 'you@email.com',
  },
  zip: {
    label: 'ZIP code',
    placeholder: 'e.g. 97201',
    maxLength: 5,
  },
  submit: 'Check availability',
  disclaimer: 'Pause or cancel anytime. No card required to check.',
} as const

export interface FooterLink {
  label: string
  href: string
}

export interface FooterColumn {
  title: string
  links: readonly FooterLink[]
}

export interface SocialLink {
  label: string
  href: string
}

export const footer = {
  tagline:
    'Farm-fresh groceries from local growers, delivered on your schedule.',
  social: [
    { label: 'In', href: '#signup' },
    { label: 'Ig', href: '#signup' },
    { label: 'X', href: '#signup' },
  ] satisfies readonly SocialLink[],
  columns: [
    {
      title: 'Product',
      links: [
        { label: 'How it works', href: '#how' },
        { label: "What's inside", href: '#box' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'Gift a box', href: '#signup' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'Our farms', href: '#' },
        { label: 'Sustainability', href: '#' },
        { label: 'Reviews', href: '#reviews' },
        { label: 'Careers', href: '#' },
      ],
    },
    {
      title: 'Contact',
      links: [
        { label: 'hello@harvest.com', href: 'mailto:hello@harvest.com' },
        { label: '1-800-555-0100', href: 'tel:18005550100' },
      ],
    },
  ] satisfies readonly FooterColumn[],
  hours: 'Mon–Fri, 8am–6pm',
  copyright: '© 2026 Harvest Foods, Inc. All rights reserved.',
  legal: [
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
    { label: 'Delivery areas', href: '#' },
  ] satisfies readonly FooterLink[],
} as const
