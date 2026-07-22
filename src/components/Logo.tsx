import { brand } from '../content/site'

/**
 * Harvest wordmark: a forest-green circular monogram beside the serif wordmark.
 */
export function Logo() {
  return (
    <a href="#top" className="flex items-center gap-2.5" aria-label={`${brand.name} home`}>
      <span
        aria-hidden="true"
        className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-forest font-display text-[17px] font-semibold text-cream"
      >
        {brand.monogram}
      </span>
      <span className="font-display text-[22px] font-semibold tracking-[-0.01em] text-ink">
        {brand.name}
      </span>
    </a>
  )
}
