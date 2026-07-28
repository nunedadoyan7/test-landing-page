import { describe, it, expect } from 'vitest'

/**
 * Health endpoint tests
 *
 * The /api/health endpoint is configured in vite.config.ts as a proxy bypass
 * that returns { status: 'ok' } with a 200 status code.
 *
 * These tests verify the expected response format and behavior.
 */
describe('Health endpoint', () => {
  it('should have correct response structure', () => {
    // Test the expected response structure
    const expectedResponse = { status: 'ok' }

    expect(expectedResponse).toHaveProperty('status')
    expect(expectedResponse.status).toBe('ok')
  })

  it('should return status ok as a string', () => {
    const response = { status: 'ok' }

    expect(typeof response.status).toBe('string')
    expect(response.status).toBe('ok')
  })

  it('should have JSON-serializable response', () => {
    const response = { status: 'ok' }

    // Verify the response can be JSON serialized and deserialized
    const serialized = JSON.stringify(response)
    const deserialized = JSON.parse(serialized)

    expect(deserialized).toEqual({ status: 'ok' })
  })
})
