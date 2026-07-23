import { describe, expect, it, vi } from 'vitest'
import {
  PRODUCE_CATEGORIES_PATH,
  getProduceCategories,
  produceCategories,
} from './produceCategories'
import { produceCategoriesHandler } from './produceCategoriesPlugin'

describe('getProduceCategories', () => {
  it('returns a JSON-serializable array of category names', () => {
    const result = getProduceCategories()
    expect(Array.isArray(result)).toBe(true)
    expect(result.every((c) => typeof c === 'string')).toBe(true)
  })

  it('includes at least four sample categories', () => {
    expect(getProduceCategories().length).toBeGreaterThanOrEqual(4)
  })

  it('includes the core sample categories', () => {
    expect(getProduceCategories()).toEqual(
      expect.arrayContaining(['Fruits', 'Vegetables', 'Herbs', 'Dairy']),
    )
  })

  it('returns a defensive copy that does not mutate the source', () => {
    const result = getProduceCategories()
    result.push('Tampered')
    expect(getProduceCategories()).not.toContain('Tampered')
    expect(produceCategories).not.toContain('Tampered')
  })
})

/** Minimal fake response capturing what the handler writes. */
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

describe('produceCategoriesHandler', () => {
  it('responds to GET with a 200 JSON array of categories', () => {
    const res = createResponse()
    const next = vi.fn()

    produceCategoriesHandler(
      { url: PRODUCE_CATEGORIES_PATH, method: 'GET' },
      res,
      next,
    )

    expect(next).not.toHaveBeenCalled()
    expect(res.statusCode).toBe(200)
    expect(res.headers['Content-Type']).toBe('application/json')
    expect(JSON.parse(res.body ?? '[]')).toEqual(getProduceCategories())
  })

  it('ignores query strings when matching the route', () => {
    const res = createResponse()
    const next = vi.fn()

    produceCategoriesHandler(
      { url: `${PRODUCE_CATEGORIES_PATH}?foo=bar`, method: 'GET' },
      res,
      next,
    )

    expect(next).not.toHaveBeenCalled()
    expect(res.statusCode).toBe(200)
  })

  it('returns 405 for non-GET methods', () => {
    const res = createResponse()
    const next = vi.fn()

    produceCategoriesHandler(
      { url: PRODUCE_CATEGORIES_PATH, method: 'POST' },
      res,
      next,
    )

    expect(next).not.toHaveBeenCalled()
    expect(res.statusCode).toBe(405)
    expect(res.headers['Allow']).toBe('GET')
  })

  it('passes through to next() for unrelated routes', () => {
    const res = createResponse()
    const next = vi.fn()

    produceCategoriesHandler({ url: '/something-else', method: 'GET' }, res, next)

    expect(next).toHaveBeenCalledTimes(1)
    expect(res.statusCode).toBe(0)
  })
})
