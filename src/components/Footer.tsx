import { useId, useState, type FormEvent } from 'react'
import { Logo } from './Logo'
import { footer } from '../content/site'

// Pragmatic email check: non-empty local part, single @, a dotted domain.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type Status = 'idle' | 'error' | 'success'

/**
 * Site footer with a compact newsletter signup form. Validates the email
 * format on the client before "submitting" and surfaces inline feedback for
 * both the error and success states.
 */
export function Footer() {
  const { newsletter, copyright } = footer
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  const emailId = useId()
  const feedbackId = useId()

  const isInvalid = status === 'error'

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!EMAIL_PATTERN.test(email.trim())) {
      setStatus('error')
      return
    }
    setStatus('success')
    setEmail('')
  }

  return (
    <footer className="border-t border-line bg-cream-card">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-10 px-6 py-14 sm:px-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-[360px]">
          <Logo />
          <p className="mt-4 text-[15px] leading-[1.5] text-sage">
            {copyright}
          </p>
        </div>

        <section
          aria-labelledby={`${feedbackId}-heading`}
          className="w-full max-w-[420px]"
        >
          <h2
            id={`${feedbackId}-heading`}
            className="font-display text-[22px] font-semibold tracking-[-0.01em] text-ink"
          >
            {newsletter.heading}
          </h2>
          <p className="mt-2 text-[15px] leading-[1.5] text-sage">
            {newsletter.description}
          </p>

          <form noValidate onSubmit={handleSubmit} className="mt-5">
            <label htmlFor={emailId} className="sr-only">
              {newsletter.emailLabel}
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                id={emailId}
                type="email"
                name="email"
                autoComplete="email"
                inputMode="email"
                placeholder={newsletter.placeholder}
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value)
                  if (status !== 'idle') setStatus('idle')
                }}
                aria-invalid={isInvalid}
                aria-describedby={status === 'idle' ? undefined : feedbackId}
                className="w-full rounded-full border border-line bg-cream px-5 py-3 text-[15px] text-ink outline-none transition focus-visible:border-forest focus-visible:ring-2 focus-visible:ring-forest/40 sm:flex-1"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-terracotta px-5 py-3 text-[15px] font-semibold text-cream-card shadow-sm transition hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta"
              >
                {newsletter.submitLabel}
              </button>
            </div>

            {status !== 'idle' && (
              <p
                id={feedbackId}
                role={status === 'error' ? 'alert' : 'status'}
                className={`mt-3 text-[14px] ${
                  status === 'error' ? 'text-terracotta' : 'text-forest'
                }`}
              >
                {status === 'error'
                  ? newsletter.invalidMessage
                  : newsletter.successMessage}
              </p>
            )}
          </form>
        </section>
      </div>
    </footer>
  )
}
