import { testimonials } from '../content/site'

/**
 * Testimonials section: an eyebrow + serif heading over a responsive grid of
 * customer quote cards, each with a monogram avatar, name, and detail line.
 */
export function Testimonials() {
  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="mx-auto max-w-[1160px] px-6 py-[76px] sm:px-8"
    >
      <div className="mb-12 text-center">
        <p className="mb-3 text-[14px] font-semibold uppercase tracking-[0.08em] text-terracotta">
          {testimonials.eyebrow}
        </p>
        <h2
          id="reviews-heading"
          className="font-display text-[32px] font-semibold tracking-[-0.02em] sm:text-[40px]"
        >
          {testimonials.heading}
        </h2>
      </div>

      <ul className="grid gap-[22px] md:grid-cols-3">
        {testimonials.items.map((item) => (
          <li
            key={item.name}
            className="flex flex-col rounded-[20px] border border-line bg-cream-card p-[30px]"
          >
            <blockquote className="mb-6 font-display text-[19px] leading-[1.5] text-pretty">
              {`\u201C${item.quote}\u201D`}
            </blockquote>
            <figcaption className="mt-auto flex items-center gap-3">
              <span
                aria-hidden="true"
                className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-badge font-display font-semibold text-forest"
              >
                {item.initial}
              </span>
              <span>
                <span className="block text-[15px] font-semibold">{item.name}</span>
                <span className="block text-[13px] text-sage">{item.detail}</span>
              </span>
            </figcaption>
          </li>
        ))}
      </ul>
    </section>
  )
}
