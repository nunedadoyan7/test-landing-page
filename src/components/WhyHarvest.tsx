import type { DifferentiatorIcon } from '../content/site'
import { whyHarvest } from '../content/site'

/**
 * Small forest-green glyph inside a badge tile. Each differentiator uses a
 * distinct shape (circle / diamond / square / bar), matching the reference
 * design ("Harvest Landing Page.html").
 */
function DifferentiatorGlyph({ icon }: { icon: DifferentiatorIcon }) {
  const shape: Record<DifferentiatorIcon, string> = {
    circle: 'h-4 w-4 rounded-full bg-forest',
    diamond: 'h-4 w-4 rotate-45 bg-forest',
    square: 'h-4 w-4 rounded bg-forest',
    bar: 'h-3 w-[18px] rounded-sm bg-forest',
  }

  return (
    <span className="mb-[18px] flex h-10 w-10 items-center justify-center rounded-[10px] bg-badge">
      <span aria-hidden="true" className={shape[icon]} />
    </span>
  )
}

/**
 * "Why Harvest" differentiators: a centered section header plus a four-up grid
 * of cards, each with an icon, heading, and short description. Collapses to a
 * single column on mobile and two columns on tablet.
 */
export function WhyHarvest() {
  return (
    <section
      aria-labelledby="why-harvest-heading"
      className="mx-auto max-w-[1200px] px-6 py-[76px] sm:px-8"
    >
      <div className="mb-12 text-center">
        <p className="mb-3 text-[14px] font-semibold uppercase tracking-[0.08em] text-terracotta">
          {whyHarvest.eyebrow}
        </p>
        <h2
          id="why-harvest-heading"
          className="font-display text-[32px] font-semibold tracking-[-0.02em] sm:text-[40px]"
        >
          {whyHarvest.heading}
        </h2>
      </div>

      <ul className="grid grid-cols-1 gap-[22px] sm:grid-cols-2 lg:grid-cols-4">
        {whyHarvest.items.map((item) => (
          <li key={item.heading} className="p-1.5">
            <DifferentiatorGlyph icon={item.icon} />
            <h3 className="mb-2 font-display text-[20px] font-semibold">
              {item.heading}
            </h3>
            <p className="text-[15px] leading-[1.55] text-sage">
              {item.description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}
