import { useId, useState, type FormEvent } from 'react'
import { signup } from '../content/site'
import { isValidEmail, isValidZip } from '../lib/validation'

/**
 * Signup section: collects an email + ZIP, validates both before "submitting",
 * and swaps to a confirmation state. Errors are announced via role="alert" and
 * fields are wired to their messages with aria-describedby / aria-invalid.
 */
export function Signup() {
  const [email, setEmail] = useState('')
  const [zip, setZip] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const emailId = useId()
  const zipId = useId()
  const errorId = useId()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!isValidEmail(email)) {
      setError(signup.errors.email)
      return
    }
    if (!isValidZip(zip)) {
      setError(signup.errors.zip)
      return
    }
    setError(null)
    setSubmitted(true)
  }

  function handleReset() {
    setEmail('')
    setZip('')
    setError(null)
    setSubmitted(false)
  }

  return (
    <section
      id="signup"
      aria-labelledby="signup-heading"
      className="mx-auto max-w-[1200px] px-6 pb-20 pt-5 sm:px-8"
    >
      <div className="grid items-center gap-12 rounded-[28px] bg-forest p-10 text-cream sm:p-[60px] md:grid-cols-2">
        <div>
          <h2
            id="signup-heading"
            className="mb-4 font-display text-[36px] font-semibold leading-[1.08] tracking-[-0.02em] sm:text-[42px]"
          >
            {signup.heading}
          </h2>
          <p className="max-w-[420px] text-[18px] leading-[1.5] text-cream/80">{signup.blurb}</p>
        </div>

        <div className="rounded-[20px] bg-cream-card p-8 text-ink">
          {submitted ? (
            <div className="px-1 py-3 text-center">
              <div className="mx-auto mb-[18px] flex h-[54px] w-[54px] items-center justify-center rounded-full bg-forest text-[26px] text-cream">
                <span aria-hidden="true">{'\u2713'}</span>
              </div>
              <h3 className="mb-2 font-display text-[24px] font-semibold">
                {signup.success.heading}
              </h3>
              <p className="mb-5 text-[15px] text-sage">
                We&apos;ll email you at {email} the moment boxes open in {zip}.
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="rounded-full border border-line px-5 py-2.5 text-[14px] font-semibold text-forest transition-colors hover:bg-badge"
              >
                {signup.success.resetLabel}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <label
                htmlFor={emailId}
                className="mb-[7px] block text-[14px] font-semibold"
              >
                {signup.emailLabel}
              </label>
              <input
                id={emailId}
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={signup.emailPlaceholder}
                aria-invalid={error === signup.errors.email}
                aria-describedby={error ? errorId : undefined}
                className="mb-[18px] w-full rounded-[11px] border border-line bg-white px-[15px] py-[13px] text-[16px] outline-none focus:border-forest"
              />

              <label
                htmlFor={zipId}
                className="mb-[7px] block text-[14px] font-semibold"
              >
                {signup.zipLabel}
              </label>
              <input
                id={zipId}
                name="zip"
                type="text"
                inputMode="numeric"
                maxLength={5}
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                placeholder={signup.zipPlaceholder}
                aria-invalid={error === signup.errors.zip}
                aria-describedby={error ? errorId : undefined}
                className="mb-[18px] w-full rounded-[11px] border border-line bg-white px-[15px] py-[13px] text-[16px] outline-none focus:border-forest"
              />

              {error && (
                <div id={errorId} role="alert" className="mb-3.5 text-[14px] text-[#C0442C]">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full rounded-full bg-terracotta py-[15px] text-[17px] font-semibold text-cream-card transition hover:brightness-105"
              >
                {signup.submitLabel}
              </button>
              <p className="mt-3.5 text-center text-[13px] text-sage">{signup.finePrint}</p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
