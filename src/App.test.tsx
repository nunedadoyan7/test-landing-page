import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'
import { hero, pricing, signup } from './content/site'

describe('App landing page', () => {
  it('renders the major landing page sections without errors', () => {
    render(<App />)

    // Hero
    expect(
      screen.getByRole('heading', { level: 1, name: hero.headline }),
    ).toBeInTheDocument()

    // Pricing
    expect(
      screen.getByRole('heading', { level: 2, name: pricing.heading }),
    ).toBeInTheDocument()

    // Signup form
    expect(
      screen.getByRole('heading', { level: 2, name: signup.heading }),
    ).toBeInTheDocument()
    expect(screen.getByLabelText(signup.emailLabel)).toBeInTheDocument()
    expect(screen.getByLabelText(signup.zipLabel)).toBeInTheDocument()
  })
})
