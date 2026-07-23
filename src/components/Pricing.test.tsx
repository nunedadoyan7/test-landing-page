import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Pricing } from './Pricing'
import { pricing } from '../content/site'

describe('Pricing', () => {
  it('renders the section header as a level-2 heading', () => {
    render(<Pricing />)
    expect(
      screen.getByRole('heading', { level: 2, name: pricing.heading }),
    ).toBeInTheDocument()
    expect(screen.getByText(pricing.eyebrow)).toBeInTheDocument()
    expect(screen.getByText(pricing.subheading)).toBeInTheDocument()
  })

  it('renders all three tiers with name, price, and key features', () => {
    render(<Pricing />)
    expect(pricing.plans).toHaveLength(3)
    for (const plan of pricing.plans) {
      expect(
        screen.getByRole('heading', { level: 3, name: plan.name }),
      ).toBeInTheDocument()
      expect(screen.getByText(plan.price)).toBeInTheDocument()
      expect(screen.getByText(plan.serves)).toBeInTheDocument()
      expect(screen.getByText(plan.itemsLine)).toBeInTheDocument()
    }
  })

  it('marks only the highlighted plan as "most popular"', () => {
    render(<Pricing />)
    const badges = screen.getAllByText(pricing.badgeLabel)
    const highlightedCount = pricing.plans.filter((p) => p.highlighted).length
    expect(badges).toHaveLength(highlightedCount)
  })

  it('renders a CTA per plan linking to signup', () => {
    render(<Pricing />)
    for (const plan of pricing.plans) {
      const cta = screen.getByRole('link', { name: `Choose ${plan.name}` })
      expect(cta).toHaveAttribute('href', pricing.ctaHref)
    }
  })
})
