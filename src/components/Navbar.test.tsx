import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Navbar } from './Navbar'
import { navLinks, nav, brand } from '../content/site'

describe('Navbar', () => {
  it('renders the Harvest logo/wordmark linking home', () => {
    render(<Navbar />)
    const logo = screen.getByRole('link', { name: `${brand.name} home` })
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('href', '#top')
    expect(logo).toHaveTextContent(brand.name)
  })

  it('renders every primary nav link with the correct href', () => {
    render(<Navbar />)
    const primaryNav = screen.getByRole('navigation', { name: 'Primary' })
    expect(primaryNav).toBeInTheDocument()

    for (const link of navLinks) {
      const anchor = within(primaryNav).getByRole('link', { name: link.label })
      expect(anchor).toBeInTheDocument()
      expect(anchor).toHaveAttribute('href', link.href)
    }
  })

  it('renders the sign-in link', () => {
    render(<Navbar />)
    const signIn = screen.getAllByRole('link', { name: nav.signIn.label })[0]
    expect(signIn).toBeInTheDocument()
    expect(signIn).toHaveAttribute('href', nav.signIn.href)
  })

  it('renders the CTA button linking to signup', () => {
    render(<Navbar />)
    const cta = screen.getAllByRole('link', { name: nav.cta.label })[0]
    expect(cta).toBeInTheDocument()
    expect(cta).toHaveAttribute('href', nav.cta.href)
  })

  it('toggles the mobile menu open and closed', async () => {
    const user = userEvent.setup()
    render(<Navbar />)
    const toggle = screen.getByRole('button', {
      name: /toggle navigation menu/i,
    })

    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByRole('navigation', { name: 'Mobile' })).toBeNull()

    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    const mobileNav = screen.getByRole('navigation', { name: 'Mobile' })
    expect(mobileNav).toBeInTheDocument()
    // The mobile menu exposes the same primary links.
    for (const link of navLinks) {
      expect(
        within(mobileNav).getByRole('link', { name: link.label }),
      ).toBeInTheDocument()
    }

    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByRole('navigation', { name: 'Mobile' })).toBeNull()
  })
})
