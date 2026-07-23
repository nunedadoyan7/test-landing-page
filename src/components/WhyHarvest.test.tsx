import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { WhyHarvest } from './WhyHarvest'
import { whyHarvest } from '../content/site'

describe('WhyHarvest', () => {
  it('renders the section header as a level-2 heading', () => {
    render(<WhyHarvest />)
    expect(
      screen.getByRole('heading', { level: 2, name: whyHarvest.heading }),
    ).toBeInTheDocument()
    expect(screen.getByText(whyHarvest.eyebrow)).toBeInTheDocument()
  })

  it('renders every differentiator with a heading and description', () => {
    render(<WhyHarvest />)
    for (const item of whyHarvest.items) {
      expect(
        screen.getByRole('heading', { level: 3, name: item.heading }),
      ).toBeInTheDocument()
      expect(screen.getByText(item.description)).toBeInTheDocument()
    }
  })

  it('renders one card per differentiator', () => {
    render(<WhyHarvest />)
    expect(
      screen.getAllByRole('heading', { level: 3 }),
    ).toHaveLength(whyHarvest.items.length)
  })
})
