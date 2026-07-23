import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Pricing } from './Pricing'
import { pricing } from '../content/site'

describe('Pricing', () => {
  it('renders the section heading', () => {
    render(<Pricing />)
    expect(
      screen.getByRole('heading', { level: 2, name: pricing.heading }),
    ).toBeInTheDocument()
  })

  it('renders every plan with its name, price, and CTA', () => {
    render(<Pricing />)
    for (const plan of pricing.plans) {
      expect(
        screen.getByRole('heading', { level: 3, name: plan.name }),
      ).toBeInTheDocument()
      expect(screen.getByText(plan.price)).toBeInTheDocument()
      expect(
        screen.getByRole('link', { name: `Choose ${plan.name}` }),
      ).toHaveAttribute('href', '#signup')
    }
  })

  it('marks the highlighted plan as most popular', () => {
    render(<Pricing />)
    expect(screen.getByText('Most popular')).toBeInTheDocument()
  })
})
