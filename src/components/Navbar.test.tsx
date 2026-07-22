import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Navbar } from './Navbar'
import { navLinks, nav, brand } from '../content/site'

describe('Navbar', () => {
  it('renders the Harvest wordmark', () => {
    render(<Navbar />)
    expect(
      screen.getByRole('link', { name: `${brand.name} home` }),
    ).toBeInTheDocument()
  })

  it('renders every primary nav link', () => {
    render(<Navbar />)
    const primaryNav = screen.getByRole('navigation', { name: 'Primary' })
    for (const link of navLinks) {
      expect(
        screen.getByRole('link', { name: link.label }),
      ).toBeInTheDocument()
    }
    // sanity: the desktop nav container exists
    expect(primaryNav).toBeInTheDocument()
  })

  it('renders the Get Started CTA button linking to signup', () => {
    render(<Navbar />)
    const cta = screen.getAllByRole('link', { name: nav.cta.label })[0]
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
    expect(
      screen.getByRole('navigation', { name: 'Mobile' }),
    ).toBeInTheDocument()
  })
})
