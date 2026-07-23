import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Signup } from './Signup'
import { signup } from '../content/site'

describe('Signup form', () => {
  it('renders the email and ZIP fields and submit button', () => {
    render(<Signup />)
    expect(screen.getByLabelText(signup.emailLabel)).toBeInTheDocument()
    expect(screen.getByLabelText(signup.zipLabel)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: signup.submitLabel }),
    ).toBeInTheDocument()
  })

  it('rejects an invalid email and does not advance to the success state', async () => {
    const user = userEvent.setup()
    render(<Signup />)

    await user.type(screen.getByLabelText(signup.emailLabel), 'nope')
    await user.type(screen.getByLabelText(signup.zipLabel), '97201')
    await user.click(screen.getByRole('button', { name: signup.submitLabel }))

    expect(screen.getByRole('alert')).toHaveTextContent(signup.errors.email)
    expect(
      screen.queryByText(signup.success.heading),
    ).not.toBeInTheDocument()
    expect(screen.getByLabelText(signup.emailLabel)).toHaveAttribute(
      'aria-invalid',
      'true',
    )
  })

  it('rejects an invalid ZIP when the email is valid', async () => {
    const user = userEvent.setup()
    render(<Signup />)

    await user.type(
      screen.getByLabelText(signup.emailLabel),
      'person@example.com',
    )
    await user.type(screen.getByLabelText(signup.zipLabel), '123')
    await user.click(screen.getByRole('button', { name: signup.submitLabel }))

    expect(screen.getByRole('alert')).toHaveTextContent(signup.errors.zip)
    expect(
      screen.queryByText(signup.success.heading),
    ).not.toBeInTheDocument()
  })

  it('accepts a valid email + ZIP and shows the confirmation state', async () => {
    const user = userEvent.setup()
    render(<Signup />)

    await user.type(
      screen.getByLabelText(signup.emailLabel),
      'person@example.com',
    )
    await user.type(screen.getByLabelText(signup.zipLabel), '97201')
    await user.click(screen.getByRole('button', { name: signup.submitLabel }))

    expect(
      screen.getByRole('heading', { name: signup.success.heading }),
    ).toBeInTheDocument()
    expect(screen.getByText(/person@example\.com/)).toBeInTheDocument()
    expect(screen.getByText(/97201/)).toBeInTheDocument()
    // The form fields should no longer be present in the success state.
    expect(screen.queryByLabelText(signup.emailLabel)).not.toBeInTheDocument()
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('lets the user reset back to the form from the confirmation state', async () => {
    const user = userEvent.setup()
    render(<Signup />)

    await user.type(
      screen.getByLabelText(signup.emailLabel),
      'person@example.com',
    )
    await user.type(screen.getByLabelText(signup.zipLabel), '97201')
    await user.click(screen.getByRole('button', { name: signup.submitLabel }))
    await user.click(
      screen.getByRole('button', { name: signup.success.resetLabel }),
    )

    // Back to the form with cleared inputs.
    expect(screen.getByLabelText(signup.emailLabel)).toHaveValue('')
    expect(screen.getByLabelText(signup.zipLabel)).toHaveValue('')
  })
})
