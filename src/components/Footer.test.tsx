import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Footer } from './Footer'
import { brand, footer } from '../content/site'

describe('Footer', () => {
  it('renders the brand wordmark and tagline', () => {
    render(<Footer />)
    expect(screen.getByText(brand.name)).toBeInTheDocument()
    expect(screen.getByText(footer.tagline)).toBeInTheDocument()
  })

  it('renders each nav column with its links', () => {
    render(<Footer />)
    for (const column of footer.columns) {
      expect(
        screen.getByRole('navigation', { name: column.title }),
      ).toBeInTheDocument()
      for (const link of column.links) {
        const anchor = screen.getByRole('link', { name: link.label })
        expect(anchor).toHaveAttribute('href', link.href)
      }
    }
  })

  it('renders social icons with accessible labels', () => {
    render(<Footer />)
    for (const social of footer.social) {
      expect(
        screen.getByRole('link', { name: social.label }),
      ).toBeInTheDocument()
    }
  })

  it('renders contact details and business hours', () => {
    render(<Footer />)
    expect(screen.getByText(footer.hours)).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'hello@harvest.com' }),
    ).toHaveAttribute('href', 'mailto:hello@harvest.com')
  })

  it('renders the copyright and legal links', () => {
    render(<Footer />)
    expect(screen.getByText(footer.copyright)).toBeInTheDocument()
    for (const link of footer.legal) {
      expect(screen.getByRole('link', { name: link.label })).toBeInTheDocument()
    }
  })
})
