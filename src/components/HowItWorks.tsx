import { howItWorks } from '../content/site'

/**
 * "How it works" section: eyebrow badge, serif headline, supporting copy, and a
 * three-step ordered list explaining the Harvest delivery flow. Fulfils the
 * existing `#how` navigation link.
 */
export function HowItWorks() {
  return (
    <section
      id={howItWorks.id}
      aria-labelledby="how-heading"
      className="mx-auto max-w-[1200px] px-6 py-16 sm:px-8 md:py-20"
    >
      <div className="max-w-[620px]">
        <p className="mb-6 inline-flex items-center gap-2 rounded-full bg-badge px-3.5 py-1.5 text-[13px] font-semibold tracking-[0.02em] text-sage">
          <span aria-hidden="true" className="h-[7px] w-[7px] rounded-full bg-terracotta" />
          {howItWorks.eyebrow}
        </p>

        <h2
          id="how-heading"
          className="mb-4 font-display text-[32px] font-semibold leading-[1.08] tracking-[-0.02em] sm:text-[40px] md:text-[46px]"
        >
          {howItWorks.headline}
        </h2>

        <p className="max-w-[490px] text-[18px] leading-[1.5] text-sage sm:text-[20px]">
          {howItWorks.subheadline}
        </p>
      </div>

      <ol className="mt-12 grid gap-6 md:grid-cols-3 md:gap-8">
        {howItWorks.steps.map((step) => (
          <li
            key={step.step}
            className="rounded-[20px] border border-line bg-cream-card p-6 sm:p-7"
          >
            <span
              aria-hidden="true"
              className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-forest font-display text-[17px] font-semibold text-cream"
            >
              {step.step}
            </span>
            <h3 className="mb-2 font-display text-[22px] font-semibold leading-[1.15]">
              {step.title}
            </h3>
            <p className="text-[15px] leading-[1.55] text-sage">{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
