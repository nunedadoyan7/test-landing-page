import { describe, expect, it } from 'vitest'
import { isValidEmail, isValidZip } from './validation'

describe('isValidEmail', () => {
  it('accepts well-formed email addresses', () => {
    expect(isValidEmail('person@example.com')).toBe(true)
    expect(isValidEmail('a.b+tag@sub.domain.co')).toBe(true)
    expect(isValidEmail('  trimmed@example.com  ')).toBe(true)
  })

  it('rejects malformed email addresses', () => {
    expect(isValidEmail('not-an-email')).toBe(false)
    expect(isValidEmail('missing@tld')).toBe(false)
    expect(isValidEmail('@no-local.com')).toBe(false)
    expect(isValidEmail('spaces in@email.com')).toBe(false)
    expect(isValidEmail('')).toBe(false)
  })
})

describe('isValidZip', () => {
  it('accepts five-digit ZIP codes', () => {
    expect(isValidZip('97201')).toBe(true)
    expect(isValidZip('00000')).toBe(true)
  })

  it('rejects anything that is not exactly five digits', () => {
    expect(isValidZip('123')).toBe(false)
    expect(isValidZip('123456')).toBe(false)
    expect(isValidZip('9720a')).toBe(false)
    expect(isValidZip('')).toBe(false)
  })
})
