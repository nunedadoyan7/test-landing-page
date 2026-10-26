import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { HowItWorks } from './HowItWorks'
import { howItWorks } from '../content/site'

describe('HowItWorks', () => {
  it('renders the section heading and eyebrow', () => {
    render(<HowItWorks />)
    expect(screen.getByText(howItWorks.eyebrow)).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: howItWorks.heading }),
    ).toBeInTheDocument()
  })

  it('renders all three steps with their numbers, titles, and descriptions', () => {
    render(<HowItWorks />)
    expect(howItWorks.steps).toHaveLength(3)
    for (const step of howItWorks.steps) {
      expect(
        screen.getByRole('heading', {
          level: 3,
          name: new RegExp(step.title),
        }),
      ).toBeInTheDocument()
      expect(screen.getByText(step.number)).toBeInTheDocument()
      expect(screen.getByText(step.description)).toBeInTheDocument()
    }
  })

  it('renders the steps as an ordered list', () => {
    render(<HowItWorks />)
    const list = screen.getByRole('list')
    expect(list.tagName).toBe('OL')
    expect(screen.getAllByRole('listitem')).toHaveLength(3)
  })
})
