/** Validation helpers for the signup form. */

/** Basic RFC-ish email check: something@something.tld with no whitespace. */
export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

/** US ZIP: exactly five digits. */
export function isValidZip(value: string): boolean {
  return /^\d{5}$/.test(value.trim())
}
