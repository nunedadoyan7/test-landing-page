import { brand, copyright } from '../content/site'

/**
 * Copyright section: the footer's bottom bar with the legal notice and a set of
 * secondary links (Privacy, Terms, Delivery areas). The year is computed at
 * render time so the notice stays current.
 */
export function Copyright() {
  const year = new Date().getFullYear()

  return (
    <section
      aria-label="Copyright"
      className="border-t border-line bg-forest text-cream"
    >
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-3 px-6 py-6 text-[13px] sm:px-8">
        <p className="text-cream/80">
          &copy; {year} {brand.name} {copyright.entity} {copyright.rights}
        </p>

        <nav aria-label="Legal">
          <ul className="flex flex-wrap items-center gap-x-[22px] gap-y-2">
            {copyright.links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-cream/80 transition-colors hover:text-cream"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  )
}
