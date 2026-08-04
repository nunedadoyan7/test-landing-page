import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Copyright } from './Copyright'
import { brand, copyright } from '../content/site'

describe('Copyright', () => {
  it('renders the copyright notice with the current year and entity', () => {
    render(<Copyright />)
    const year = new Date().getFullYear()
    expect(
      screen.getByText(
        `© ${year} ${brand.name} ${copyright.entity} ${copyright.rights}`,
      ),
    ).toBeInTheDocument()
  })

  it('exposes the section with an accessible label', () => {
    render(<Copyright />)
    expect(
      screen.getByRole('region', { name: 'Copyright' }),
    ).toBeInTheDocument()
  })

  it('renders every legal link', () => {
    render(<Copyright />)
    for (const link of copyright.links) {
      expect(
        screen.getByRole('link', { name: link.label }),
      ).toHaveAttribute('href', link.href)
    }
  })
})
