import { describe, expect, it, vi } from 'vitest'
import { PRODUCE_CATEGORIES_PATH } from './produceCategories'
import { produceCategoriesHandler } from './produceCategoriesPlugin'

/**
 * TLP-24 — Endpoint contract test for the produce categories endpoint (TLP-13).
 *
 * Confirms the acceptance criteria: a GET request to the endpoint returns a
 * 200 status and a JSON array with at least one category.
 */

/** Minimal fake response that captures the status, headers, and body written. */
function createResponse() {
  const headers: Record<string, string> = {}
  return {
    statusCode: 0,
    headers,
    body: undefined as string | undefined,
    setHeader(key: string, value: string) {
      headers[key] = value
    },
    end(chunk?: string) {
      this.body = chunk
    },
  }
}

describe('GET /api/produce-categories', () => {
  it('returns a 200 status and a non-empty JSON array of categories', () => {
    const res = createResponse()
    const next = vi.fn()

    produceCategoriesHandler(
      { url: PRODUCE_CATEGORIES_PATH, method: 'GET' },
      res,
      next,
    )

    // The route was handled, not passed through.
    expect(next).not.toHaveBeenCalled()

    // 200 status.
    expect(res.statusCode).toBe(200)

    // JSON content type.
    expect(res.headers['Content-Type']).toBe('application/json')

    // Body parses to a JSON array with at least one category.
    const payload = JSON.parse(res.body ?? 'null')
    expect(Array.isArray(payload)).toBe(true)
    expect(payload.length).toBeGreaterThanOrEqual(1)
    expect(payload.every((category: unknown) => typeof category === 'string')).toBe(
      true,
    )
  })
})
