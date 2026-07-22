import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Hero } from './Hero'
import { hero } from '../content/site'

describe('Hero', () => {
  it('renders the headline as a level-1 heading', () => {
    render(<Hero />)
    expect(
      screen.getByRole('heading', { level: 1, name: hero.headline }),
    ).toBeInTheDocument()
  })

  it('renders the subheadline copy', () => {
    render(<Hero />)
    expect(screen.getByText(hero.subheadline)).toBeInTheDocument()
  })

  it('renders the primary CTA linking to signup', () => {
    render(<Hero />)
    const cta = screen.getByRole('link', { name: hero.primaryCta.label })
    expect(cta).toHaveAttribute('href', hero.primaryCta.href)
  })

  it('renders the eyebrow badge and trust stats', () => {
    render(<Hero />)
    expect(screen.getByText(hero.eyebrow)).toBeInTheDocument()
    for (const stat of hero.stats) {
      expect(screen.getByText(stat.value)).toBeInTheDocument()
      // The label appears twice: once in a visually-hidden <dt> for screen
      // readers and once in the visible <dd>.
      expect(screen.getAllByText(stat.label).length).toBeGreaterThan(0)
    }
  })

  it('renders the produce-box hero visual with an accessible label', () => {
    render(<Hero />)
    expect(
      screen.getByRole('img', { name: /crate filled with fresh produce/i }),
    ).toBeInTheDocument()
  })
})
