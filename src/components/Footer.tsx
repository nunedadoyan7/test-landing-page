import { footer } from '../content/site'

/**
 * Site footer. Displays the copyright line, centred and in the muted
 * secondary text style shared across the page.
 */
export function Footer() {
  return (
    <footer className="mx-auto max-w-[1200px] px-6 pb-10 pt-8 sm:px-8">
      <p className="text-center text-[14px] text-sage">{footer.copyright}</p>
    </footer>
  )
}
