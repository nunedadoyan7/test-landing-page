import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { WhatsInBox } from './WhatsInBox'
import { box } from '../content/site'

describe('WhatsInBox', () => {
  it('renders the section heading, eyebrow, and intro', () => {
    render(<WhatsInBox />)
    expect(screen.getByText(box.eyebrow)).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: box.heading }),
    ).toBeInTheDocument()
    expect(screen.getByText(box.intro)).toBeInTheDocument()
  })

  it('renders a labelled tile for every produce category', () => {
    render(<WhatsInBox />)
    expect(screen.getAllByRole('listitem')).toHaveLength(box.categories.length)
    for (const category of box.categories) {
      expect(screen.getByText(category.label)).toBeInTheDocument()
    }
  })
})
