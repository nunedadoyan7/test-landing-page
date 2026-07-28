/**
 * Produce categories API data + handler.
 *
 * Powers the "What's inside" section of the Harvest landing page. The list of
 * available produce categories is defined here as the single source of truth
 * and exposed over a simple GET endpoint (see `produceCategoriesPlugin`).
 */

/** The current list of available produce categories, in display order. */
export const produceCategories: readonly string[] = [
  'Fruits',
  'Vegetables',
  'Herbs',
  'Dairy',
  'Bakery',
  'Pantry',
] as const

/** Route the endpoint is served from. */
export const PRODUCE_CATEGORIES_PATH = '/api/produce-categories'

/**
 * Pure handler returning the produce categories response body.
 *
 * Kept transport-agnostic so it can be unit tested directly and reused by any
 * server adapter (Vite dev middleware, edge function, etc.).
 */
export function getProduceCategories(): string[] {
  return [...produceCategories]
}
