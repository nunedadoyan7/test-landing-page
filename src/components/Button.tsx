import type { AnchorHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'forest' | 'ghost'

const variantClasses: Record<ButtonVariant, string> = {
  // Terracotta hero CTA
  primary:
    'bg-terracotta text-cream-card shadow-sm hover:brightness-105 focus-visible:outline-terracotta',
  // Forest green nav CTA
  forest:
    'bg-forest text-cream hover:brightness-110 focus-visible:outline-forest',
  // Text-only link-style button
  ghost:
    'text-forest hover:text-terracotta focus-visible:outline-forest',
}

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  variant?: ButtonVariant
  children: ReactNode
}

/**
 * Anchor styled as a pill button. Rendered as an <a> because every CTA in the
 * Harvest design navigates to an on-page section.
 */
export function Button({
  href,
  variant = 'primary',
  children,
  className = '',
  ...rest
}: ButtonProps) {
  const isGhost = variant === 'ghost'
  const base =
    'inline-flex items-center justify-center gap-2 font-semibold transition ' +
    'focus-visible:outline-2 focus-visible:outline-offset-2'
  const shape = isGhost ? 'px-2' : 'rounded-full px-5 py-2.5'

  return (
    <a
      href={href}
      className={`${base} ${shape} ${variantClasses[variant]} ${className}`}
      {...rest}
    >
      {children}
    </a>
  )
}
