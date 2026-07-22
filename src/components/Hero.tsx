import { Button } from './Button'
import { ProduceBox } from './ProduceBox'
import { hero } from '../content/site'

/**
 * Hero section: eyebrow badge, serif headline, subheadline, dual CTAs, trust
 * stats, and the produce-box visual with a floating "next delivery" card.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="mx-auto grid max-w-[1200px] items-center gap-12 px-6 pb-10 pt-16 sm:px-8 md:pt-[72px] lg:grid-cols-[1.05fr_0.95fr] lg:gap-14"
    >
      <div>
        <p className="mb-6 inline-flex items-center gap-2 rounded-full bg-badge px-3.5 py-1.5 text-[13px] font-semibold tracking-[0.02em] text-sage">
          <span aria-hidden="true" className="h-[7px] w-[7px] rounded-full bg-terracotta" />
          {hero.eyebrow}
        </p>

        <h1
          id="hero-heading"
          className="mb-5 font-display text-[40px] font-semibold leading-[1.04] tracking-[-0.02em] sm:text-[52px] md:text-[60px]"
        >
          {hero.headline}
        </h1>

        <p className="mb-8 max-w-[490px] text-[18px] leading-[1.5] text-sage sm:text-[20px]">
          {hero.subheadline}
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <Button href={hero.primaryCta.href} variant="primary" className="px-[30px] py-[15px] text-[17px]">
            {hero.primaryCta.label}
          </Button>
          <Button href={hero.secondaryCta.href} variant="ghost" className="py-[15px] text-[17px]">
            {hero.secondaryCta.label}
          </Button>
        </div>

        <dl className="mt-11 flex items-stretch gap-8">
          {hero.stats.map((stat, i) => (
            <div key={stat.label} className="flex items-stretch gap-8">
              {i > 0 && <span aria-hidden="true" className="w-px bg-line" />}
              <div>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-[26px] font-semibold">{stat.value}</dd>
                <dd className="text-[14px] text-sage">{stat.label}</dd>
              </div>
            </div>
          ))}
        </dl>
      </div>

      <div className="relative">
        <div className="aspect-[4/5] overflow-hidden rounded-[24px] border border-line bg-cream-card">
          <ProduceBox />
        </div>
        <div className="absolute -right-3.5 -top-3.5 rounded-[16px] border border-line bg-cream-card px-4 py-3.5 shadow-[0_12px_30px_rgba(38,59,34,0.12)]">
          <p className="text-[13px] font-medium text-sage">{hero.visual.badge.label}</p>
          <p className="font-display text-[18px] font-semibold">{hero.visual.badge.value}</p>
        </div>
      </div>
    </section>
  )
}
