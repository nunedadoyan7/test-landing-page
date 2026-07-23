import { brand, footer } from '../content/site'

/**
 * Site footer: brand blurb + social icons, three link columns (Product,
 * Company, Contact), and a legal bar with copyright and policy links.
 */
export function Footer() {
  return (
    <footer className="bg-forest-deep pb-[34px] pt-[60px] text-forest-muted">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8">
        <div className="grid gap-10 border-b border-forest-line pb-11 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="mb-4 flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-cream font-display font-semibold text-forest-deep"
              >
                {brand.monogram}
              </span>
              <span className="font-display text-[22px] font-semibold text-cream">
                {brand.name}
              </span>
            </div>
            <p className="max-w-[280px] text-[15px] leading-[1.55]">
              {footer.tagline}
            </p>
            <ul className="mt-5 flex gap-2.5">
              {footer.social.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-forest-line text-[14px] font-semibold transition-colors hover:border-cream hover:text-cream"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {footer.columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="mb-4 text-[14px] font-bold text-cream">
                {column.title}
              </h2>
              <ul className="flex flex-col gap-[11px] text-[15px]">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="transition-colors hover:text-cream">
                      {link.label}
                    </a>
                  </li>
                ))}
                {column.title === 'Contact' && (
                  <li className="text-forest-muted">{footer.hours}</li>
                )}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-6 text-[13px]">
          <span>{footer.copyright}</span>
          <ul className="flex gap-[22px]">
            {footer.legal.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="transition-colors hover:text-cream">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
