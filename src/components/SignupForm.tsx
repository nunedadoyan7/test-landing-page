import { useState, type FormEvent } from 'react'
import { signup } from '../content/site'

/**
 * Signup section: a forest-green panel pairing a headline/description with a
 * cream card holding the availability-check form (email + ZIP + submit CTA).
 *
 * UI only — submission is intercepted client-side and the form fields are
 * controlled locally. The backend availability endpoint is wired up in a
 * separate task; `onSubmit` is the single seam that call will hook into.
 */
export function SignupForm() {
  const [email, setEmail] = useState('')
  const [zip, setZip] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // No backend yet — prevent a full-page navigation so the UI stays put.
    event.preventDefault()
  }

  return (
    <section
      id="signup"
      aria-labelledby="signup-heading"
      className="mx-auto max-w-[1200px] px-6 pb-20 pt-5 sm:px-8"
    >
      <div className="grid items-center gap-10 rounded-[28px] bg-forest p-8 text-cream sm:p-12 lg:grid-cols-2 lg:gap-12 lg:p-[60px]">
        <div>
          <h2
            id="signup-heading"
            className="mb-4 font-display text-[34px] font-semibold leading-[1.08] tracking-[-0.02em] sm:text-[42px]"
          >
            {signup.heading}
          </h2>
          <p className="max-w-[420px] text-[18px] leading-[1.5] text-forest-muted">
            {signup.description}
          </p>
        </div>

        <div className="rounded-[20px] bg-cream-card p-8 text-ink">
          <form onSubmit={handleSubmit} noValidate>
            <label
              htmlFor="signup-email"
              className="mb-[7px] block text-[14px] font-semibold"
            >
              {signup.email.label}
            </label>
            <input
              id="signup-email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={signup.email.placeholder}
              className="mb-[18px] w-full rounded-[11px] border border-line bg-white px-[15px] py-[13px] text-[16px] outline-none focus-visible:border-terracotta"
            />

            <label
              htmlFor="signup-zip"
              className="mb-[7px] block text-[14px] font-semibold"
            >
              {signup.zip.label}
            </label>
            <input
              id="signup-zip"
              name="zip"
              type="text"
              inputMode="numeric"
              autoComplete="postal-code"
              maxLength={signup.zip.maxLength}
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              placeholder={signup.zip.placeholder}
              className="mb-[18px] w-full rounded-[11px] border border-line bg-white px-[15px] py-[13px] text-[16px] outline-none focus-visible:border-terracotta"
            />

            <button
              type="submit"
              className="w-full cursor-pointer rounded-full bg-terracotta px-4 py-[15px] text-[17px] font-semibold text-cream-card transition hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta"
            >
              {signup.submit}
            </button>

            <p className="mt-[14px] text-center text-[13px] text-sage">
              {signup.disclaimer}
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
