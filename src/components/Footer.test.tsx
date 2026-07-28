import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Footer } from './Footer'
import { footer } from '../content/site'

const { newsletter } = footer

describe('Footer newsletter signup', () => {
  it('renders an email input and submit button', () => {
    render(<Footer />)
    expect(
      screen.getByRole('textbox', { name: newsletter.emailLabel }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: newsletter.submitLabel }),
    ).toBeInTheDocument()
  })

  it('shows a validation error for an invalid email', async () => {
    const user = userEvent.setup()
    render(<Footer />)

    await user.type(
      screen.getByRole('textbox', { name: newsletter.emailLabel }),
      'not-an-email',
    )
    await user.click(
      screen.getByRole('button', { name: newsletter.submitLabel }),
    )

    const alert = screen.getByRole('alert')
    expect(alert).toHaveTextContent(newsletter.invalidMessage)
    expect(
      screen.getByRole('textbox', { name: newsletter.emailLabel }),
    ).toHaveAttribute('aria-invalid', 'true')
  })

  it('accepts a valid email and confirms the subscription', async () => {
    const user = userEvent.setup()
    render(<Footer />)

    const input = screen.getByRole('textbox', { name: newsletter.emailLabel })
    await user.type(input, 'grower@harvest.co')
    await user.click(
      screen.getByRole('button', { name: newsletter.submitLabel }),
    )

    expect(screen.getByRole('status')).toHaveTextContent(
      newsletter.successMessage,
    )
    expect(screen.queryByRole('alert')).toBeNull()
    // Field resets after a successful submit.
    expect(input).toHaveValue('')
  })

  it('clears the error once the user edits the field again', async () => {
    const user = userEvent.setup()
    render(<Footer />)

    const input = screen.getByRole('textbox', { name: newsletter.emailLabel })
    await user.type(input, 'bad')
    await user.click(
      screen.getByRole('button', { name: newsletter.submitLabel }),
    )
    expect(screen.getByRole('alert')).toBeInTheDocument()

    await user.type(input, '@harvest.co')
    expect(screen.queryByRole('alert')).toBeNull()
    expect(input).toHaveAttribute('aria-invalid', 'false')
  })
})
