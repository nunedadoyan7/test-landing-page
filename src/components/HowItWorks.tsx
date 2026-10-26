import { howItWorks } from '../content/site'

/**
 * "How it works" section: a centered eyebrow + heading followed by a 3-step
 * process. Each step is a card with a numbered badge, title, and short copy.
 * Stacks to a single column on mobile and spreads to three columns on desktop.
 */
export function HowItWorks() {
  return (
    <section
      id="how"
      aria-labelledby="how-heading"
      className="mx-auto max-w-[1200px] px-6 py-16 sm:px-8"
    >
      <div className="mb-12 text-center">
        <p className="mb-3 text-[14px] font-semibold uppercase tracking-[0.08em] text-terracotta">
          {howItWorks.eyebrow}
        </p>
        <h2
          id="how-heading"
          className="font-display text-[32px] font-semibold tracking-[-0.02em] sm:text-[40px]"
        >
          {howItWorks.heading}
        </h2>
      </div>

      <ol className="grid gap-6 md:grid-cols-3">
        {howItWorks.steps.map((step) => (
          <li
            key={step.number}
            className="rounded-[20px] border border-line bg-cream-card p-8"
          >
            <span
              aria-hidden="true"
              className="mb-6 flex h-11 w-11 items-center justify-center rounded-full bg-forest font-display text-[20px] font-semibold text-cream"
            >
              {step.number}
            </span>
            <h3 className="mb-2.5 font-display text-[23px] font-semibold">
              <span className="sr-only">{`Step ${step.number}: `}</span>
              {step.title}
            </h3>
            <p className="text-[16px] leading-[1.55] text-sage">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </section>
  )
}
