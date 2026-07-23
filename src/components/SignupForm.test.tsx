import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { SignupForm } from './SignupForm'
import { signup } from '../content/site'

describe('SignupForm', () => {
  it('renders the section heading and description', () => {
    render(<SignupForm />)
    expect(
      screen.getByRole('heading', { level: 2, name: signup.heading }),
    ).toBeInTheDocument()
    expect(screen.getByText(signup.description)).toBeInTheDocument()
  })

  it('renders the email and ZIP fields with labels', () => {
    render(<SignupForm />)
    const email = screen.getByLabelText(signup.email.label)
    const zip = screen.getByLabelText(signup.zip.label)
    expect(email).toHaveAttribute('type', 'email')
    expect(email).toHaveAttribute('placeholder', signup.email.placeholder)
    expect(zip).toHaveAttribute('placeholder', signup.zip.placeholder)
    expect(zip).toHaveAttribute('maxLength', String(signup.zip.maxLength))
  })

  it('renders the submit CTA', () => {
    render(<SignupForm />)
    expect(
      screen.getByRole('button', { name: signup.submit }),
    ).toHaveAttribute('type', 'submit')
  })

  it('lets the user type into both fields', async () => {
    const user = userEvent.setup()
    render(<SignupForm />)
    const email = screen.getByLabelText(signup.email.label)
    const zip = screen.getByLabelText(signup.zip.label)

    await user.type(email, 'you@example.com')
    await user.type(zip, '97201')

    expect(email).toHaveValue('you@example.com')
    expect(zip).toHaveValue('97201')
  })
})
