import { Button } from './Button'
import { pricing } from '../content/site'

/**
 * Pricing section: three box tiers rendered from centralized content. The
 * "Most popular" plan is visually highlighted and marked for assistive tech.
 */
export function Pricing() {
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="border-y border-line bg-cream-card py-[76px]"
    >
      <div className="mx-auto max-w-[1120px] px-6 sm:px-8">
        <div className="mb-12 text-center">
          <p className="mb-3 text-[14px] font-semibold uppercase tracking-[0.08em] text-terracotta">
            {pricing.eyebrow}
          </p>
          <h2
            id="pricing-heading"
            className="font-display text-[40px] font-semibold tracking-[-0.02em]"
          >
            {pricing.heading}
          </h2>
          <p className="mt-3 text-[16px] text-sage">{pricing.subheading}</p>
        </div>

        <div className="grid items-stretch gap-[22px] md:grid-cols-3">
          {pricing.plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-[22px] border p-[34px_30px] ${
                plan.highlighted
                  ? 'border-forest bg-forest text-cream shadow-[0_18px_40px_rgba(38,59,34,0.18)]'
                  : 'border-line bg-cream-card text-ink'
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-terracotta px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-[0.04em] text-cream-card">
                  Most popular
                </span>
              )}
              <h3 className="mb-1 font-display text-[25px] font-semibold">{plan.name}</h3>
              <p className="mb-5 text-[14px] opacity-75">{plan.serves}</p>
              <div className="mb-[22px] flex items-baseline gap-1">
                <span className="font-display text-[44px] font-semibold">{plan.price}</span>
                <span className="text-[15px] opacity-70">/ box</span>
              </div>
              <div
                aria-hidden="true"
                className={`mb-5 h-px ${plan.highlighted ? 'bg-cream/30' : 'bg-line'}`}
              />
              <p className="mb-7 text-[15px] leading-[2]">{plan.itemsLine}</p>
              <Button
                href="#signup"
                variant={plan.highlighted ? 'primary' : 'forest'}
                className="mt-auto w-full py-[13px] text-[16px]"
              >
                Choose {plan.name}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
