import { useState } from 'react'
import { Logo } from './Logo'
import { Button } from './Button'
import { navLinks, nav } from '../content/site'

/**
 * Sticky, translucent top navigation. On mobile the primary links collapse
 * behind a toggle while the CTA stays visible.
 */
export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header
      id="top"
      className="sticky top-0 z-50 border-b border-line bg-cream/[0.88] backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-6 px-6 py-4 sm:px-8">
        <Logo />

        <nav
          aria-label="Primary"
          className="hidden items-center gap-8 text-[15px] font-medium md:flex"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-forest transition-colors hover:text-terracotta"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Button href={nav.signIn.href} variant="ghost" className="hidden text-[15px] sm:inline-flex">
            {nav.signIn.label}
          </Button>
          <Button href={nav.cta.href} variant="forest" className="text-[15px]">
            {nav.cta.label}
          </Button>
          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-forest transition-colors hover:bg-badge md:hidden"
          >
            <span aria-hidden="true" className="text-xl leading-none">
              {open ? '\u2715' : '\u2630'}
            </span>
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-line bg-cream px-6 py-4 md:hidden"
        >
          <ul className="flex flex-col gap-4 text-[15px] font-medium">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-forest transition-colors hover:text-terracotta"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={nav.signIn.href}
                onClick={() => setOpen(false)}
                className="text-forest transition-colors hover:text-terracotta"
              >
                {nav.signIn.label}
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
