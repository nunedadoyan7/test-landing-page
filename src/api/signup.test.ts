import { beforeEach, describe, expect, it } from 'vitest'
import {
  handleSignup,
  InMemorySignupStore,
  type SignupError,
  type SignupSuccess,
} from './signup'

describe('handleSignup', () => {
  let store: InMemorySignupStore

  beforeEach(() => {
    store = new InMemorySignupStore()
  })

  it('accepts a valid email + ZIP, stores it, and returns 201', () => {
    const result = handleSignup({ email: 'Pat@Example.com', zip: '94103' }, store)

    expect(result.status).toBe(201)
    const body = result.body as SignupSuccess
    expect(body.ok).toBe(true)
    expect(body.submission.email).toBe('pat@example.com') // normalized
    expect(body.submission.zip).toBe('94103')
    expect(body.submission.submittedAt).toMatch(/^\d{4}-\d{2}-\d{2}T/)

    expect(store.all()).toHaveLength(1)
    expect(store.all()[0].email).toBe('pat@example.com')
  })

  it('accepts a ZIP+4 code', () => {
    const result = handleSignup({ email: 'a@b.co', zip: '94103-1234' }, store)
    expect(result.status).toBe(201)
    expect(store.all()).toHaveLength(1)
  })

  it('trims surrounding whitespace before validating', () => {
    const result = handleSignup(
      { email: '  pat@example.com  ', zip: '  94103  ' },
      store,
    )
    expect(result.status).toBe(201)
    const body = result.body as SignupSuccess
    expect(body.submission.email).toBe('pat@example.com')
    expect(body.submission.zip).toBe('94103')
  })

  it('rejects a malformed email', () => {
    const result = handleSignup({ email: 'not-an-email', zip: '94103' }, store)
    expect(result.status).toBe(400)
    const body = result.body as SignupError
    expect(body.ok).toBe(false)
    expect(body.errors.email).toBeDefined()
    expect(body.errors.zip).toBeUndefined()
    expect(store.all()).toHaveLength(0)
  })

  it('rejects an empty email', () => {
    const result = handleSignup({ email: '   ', zip: '94103' }, store)
    expect(result.status).toBe(400)
    expect((result.body as SignupError).errors.email).toBeDefined()
  })

  it('rejects an invalid ZIP', () => {
    const result = handleSignup({ email: 'pat@example.com', zip: 'abcde' }, store)
    expect(result.status).toBe(400)
    const body = result.body as SignupError
    expect(body.errors.zip).toBeDefined()
    expect(body.errors.email).toBeUndefined()
    expect(store.all()).toHaveLength(0)
  })

  it('rejects a too-short ZIP', () => {
    const result = handleSignup({ email: 'pat@example.com', zip: '941' }, store)
    expect(result.status).toBe(400)
    expect((result.body as SignupError).errors.zip).toBeDefined()
  })

  it('reports both fields when both are invalid', () => {
    const result = handleSignup({ email: '', zip: '' }, store)
    expect(result.status).toBe(400)
    const body = result.body as SignupError
    expect(body.errors.email).toBeDefined()
    expect(body.errors.zip).toBeDefined()
    expect(store.all()).toHaveLength(0)
  })

  it('handles missing / non-object bodies gracefully', () => {
    for (const bad of [undefined, null, 'oops', 42, {}]) {
      const result = handleSignup(bad, store)
      expect(result.status).toBe(400)
      expect(result.body.ok).toBe(false)
    }
    expect(store.all()).toHaveLength(0)
  })

  it('ignores non-string field values', () => {
    const result = handleSignup({ email: 123, zip: {} }, store)
    expect(result.status).toBe(400)
    const body = result.body as SignupError
    expect(body.errors.email).toBeDefined()
    expect(body.errors.zip).toBeDefined()
  })
})
