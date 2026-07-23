import type { PricingPlan } from '../content/site'
import { pricing } from '../content/site'

/**
 * A single pricing tier card. The highlighted plan (from the reference design)
 * inverts to a forest-green surface, gains a "Most popular" badge, and uses the
 * terracotta CTA; other tiers stay on the cream surface with a forest CTA.
 */
function PriceCard({ plan }: { plan: PricingPlan }) {
  const { highlighted } = plan

  const surface = highlighted
    ? 'bg-forest text-cream border-[#436141] shadow-[0_18px_40px_rgba(38,59,34,0.22)]'
    : 'bg-cream text-ink border-line'
  const dividerColor = highlighted ? 'bg-[#436141]' : 'bg-line'
  const button = highlighted
    ? 'bg-terracotta text-cream-card'
    : 'bg-forest text-cream-card'

  return (
    <li
      className={`relative flex flex-col rounded-[22px] border px-[30px] py-[34px] ${surface}`}
    >
      {highlighted && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-terracotta px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-[0.04em] text-cream-card">
          {pricing.badgeLabel}
        </span>
      )}

      <h3 className="mb-1 font-display text-[25px] font-semibold">{plan.name}</h3>
      <p className="mb-5 text-[14px] opacity-75">{plan.serves}</p>

      <p className="mb-[22px] flex items-baseline gap-1">
        <span className="font-display text-[44px] font-semibold">{plan.price}</span>
        <span className="text-[15px] opacity-70">/ box</span>
      </p>

      <span aria-hidden="true" className={`mb-5 h-px ${dividerColor}`} />

      <p className="mb-7 text-[15px] leading-[2]">{plan.itemsLine}</p>

      <a
        href={pricing.ctaHref}
        className={`mt-auto rounded-full py-3 text-center text-[16px] font-semibold transition hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 ${button}`}
      >
        Choose {plan.name}
      </a>
    </li>
  )
}

/**
 * Pricing section: a centered header plus a three-tier comparison
 * (Small / Medium / Family box). Each tier lists its plan name, price, and key
 * features, matching the reference design ("Harvest Landing Page.html").
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
            className="font-display text-[32px] font-semibold tracking-[-0.02em] sm:text-[40px]"
          >
            {pricing.heading}
          </h2>
          <p className="mt-3 text-[16px] text-sage">{pricing.subheading}</p>
        </div>

        <ul className="grid grid-cols-1 items-stretch gap-[22px] md:grid-cols-3">
          {pricing.plans.map((plan) => (
            <PriceCard key={plan.name} plan={plan} />
          ))}
        </ul>
      </div>
    </section>
  )
}
