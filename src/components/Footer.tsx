import { brand, navLinks } from '../content/site'

/**
 * Site footer: renders the Harvest wordmark, the primary navigation links, and
 * a copyright line, closing out the landing page below the main content.
 */
export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line bg-cream-card text-ink">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <span className="font-display text-[22px] font-semibold tracking-[-0.01em]">
          {brand.name}
        </span>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-sage">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition hover:text-terracotta">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <p className="text-sm text-sage">
          © {year} {brand.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
