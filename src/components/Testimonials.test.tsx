import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Testimonials } from './Testimonials'
import { testimonials } from '../content/site'

describe('Testimonials', () => {
  it('renders the section heading', () => {
    render(<Testimonials />)
    expect(
      screen.getByRole('heading', { level: 2, name: testimonials.heading }),
    ).toBeInTheDocument()
  })

  it('renders the eyebrow label', () => {
    render(<Testimonials />)
    expect(screen.getByText(testimonials.eyebrow)).toBeInTheDocument()
  })

  it('renders every testimonial with its author and detail', () => {
    render(<Testimonials />)
    for (const item of testimonials.items) {
      expect(screen.getByText(item.name)).toBeInTheDocument()
      expect(screen.getByText(item.detail)).toBeInTheDocument()
      // The quote is wrapped in typographic quotes in the DOM.
      expect(
        screen.getByText((content) => content.includes(item.quote)),
      ).toBeInTheDocument()
    }
  })
})
