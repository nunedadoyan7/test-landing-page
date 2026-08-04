import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Footer } from './Footer'
import { footer } from '../content/site'

describe('Footer', () => {
  it('renders the copyright line', () => {
    render(<Footer />)
    expect(screen.getByText(footer.copyright)).toBeInTheDocument()
  })

  it('is a contentinfo landmark', () => {
    render(<Footer />)
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })
})
