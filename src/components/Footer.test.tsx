import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Footer } from './Footer'
import { navLinks, brand } from '../content/site'

describe('Footer', () => {
  it('renders the Harvest wordmark', () => {
    render(<Footer />)
    expect(screen.getByText(brand.name)).toBeInTheDocument()
  })

  it('renders every primary nav link', () => {
    render(<Footer />)
    const footerNav = screen.getByRole('navigation', { name: 'Footer' })
    for (const link of navLinks) {
      expect(
        screen.getByRole('link', { name: link.label }),
      ).toHaveAttribute('href', link.href)
    }
    expect(footerNav).toBeInTheDocument()
  })

  it('renders a copyright line for the current year', () => {
    render(<Footer />)
    const year = new Date().getFullYear()
    expect(
      screen.getByText(new RegExp(`© ${year} ${brand.name}`)),
    ).toBeInTheDocument()
  })
})
