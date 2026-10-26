import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { HowItWorks } from './HowItWorks'
import { howItWorks } from '../content/site'

describe('HowItWorks', () => {
  it('renders the section headline as a level-2 heading', () => {
    render(<HowItWorks />)
    expect(
      screen.getByRole('heading', { level: 2, name: howItWorks.headline }),
    ).toBeInTheDocument()
  })

  it('renders the eyebrow badge and supporting copy', () => {
    render(<HowItWorks />)
    expect(screen.getByText(howItWorks.eyebrow)).toBeInTheDocument()
    expect(screen.getByText(howItWorks.subheadline)).toBeInTheDocument()
  })

  it('renders every step with its title and description', () => {
    render(<HowItWorks />)
    const items = screen.getAllByRole('listitem')
    expect(items).toHaveLength(howItWorks.steps.length)
    for (const step of howItWorks.steps) {
      expect(
        screen.getByRole('heading', { level: 3, name: step.title }),
      ).toBeInTheDocument()
      expect(screen.getByText(step.description)).toBeInTheDocument()
    }
  })

  it('exposes the section with the "how" id for the nav link', () => {
    const { container } = render(<HowItWorks />)
    expect(container.querySelector(`#${howItWorks.id}`)).not.toBeNull()
  })
})
