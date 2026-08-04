/**
 * Server-side validation for the inventory sync endpoint (TLP-20).
 *
 * The sync endpoint accepts an untrusted JSON body describing the inventory
 * levels to apply. These helpers validate and normalise that input before it
 * reaches the store, keeping the transport layer free of business rules.
 */

/** A single validated inventory update from a sync request. */
export interface InventoryUpdate {
  sku: string
  name: string
  quantity: number
}

/** Successful validation result carrying the normalised updates. */
export interface ValidationSuccess {
  ok: true
  updates: InventoryUpdate[]
}

/** Failed validation result carrying human-readable error messages. */
export interface ValidationFailure {
  ok: false
  errors: string[]
}

export type ValidationResult = ValidationSuccess | ValidationFailure

const MAX_SKU_LENGTH = 64
const MAX_NAME_LENGTH = 200
const MAX_QUANTITY = 1_000_000
const MAX_ITEMS = 500

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/**
 * Validate a parsed sync request body.
 *
 * Expected shape: `{ items: Array<{ sku, name, quantity }> }`.
 *
 * Rules enforced:
 * - `items` must be a non-empty array (max {@link MAX_ITEMS} entries).
 * - `sku` — non-empty trimmed string, ≤ {@link MAX_SKU_LENGTH} chars, unique.
 * - `name` — non-empty trimmed string, ≤ {@link MAX_NAME_LENGTH} chars.
 * - `quantity` — integer in the range `[0, {@link MAX_QUANTITY}]`.
 *
 * Errors are aggregated so the client sees every problem in one response.
 */
export function validateSyncRequest(body: unknown): ValidationResult {
  const errors: string[] = []

  if (!isObject(body)) {
    return { ok: false, errors: ['Request body must be a JSON object.'] }
  }

  const { items } = body
  if (!Array.isArray(items)) {
    return { ok: false, errors: ['"items" must be an array.'] }
  }
  if (items.length === 0) {
    return { ok: false, errors: ['"items" must contain at least one entry.'] }
  }
  if (items.length > MAX_ITEMS) {
    return {
      ok: false,
      errors: [`"items" must contain at most ${MAX_ITEMS} entries.`],
    }
  }

  const updates: InventoryUpdate[] = []
  const seenSkus = new Set<string>()

  items.forEach((raw, index) => {
    const at = `items[${index}]`

    if (!isObject(raw)) {
      errors.push(`${at} must be an object.`)
      return
    }

    const { sku, name, quantity } = raw

    let normalisedSku = ''
    if (typeof sku !== 'string' || sku.trim() === '') {
      errors.push(`${at}.sku must be a non-empty string.`)
    } else {
      normalisedSku = sku.trim()
      if (normalisedSku.length > MAX_SKU_LENGTH) {
        errors.push(`${at}.sku must be at most ${MAX_SKU_LENGTH} characters.`)
      } else if (seenSkus.has(normalisedSku)) {
        errors.push(`${at}.sku "${normalisedSku}" is duplicated in this request.`)
      } else {
        seenSkus.add(normalisedSku)
      }
    }

    let normalisedName = ''
    if (typeof name !== 'string' || name.trim() === '') {
      errors.push(`${at}.name must be a non-empty string.`)
    } else {
      normalisedName = name.trim()
      if (normalisedName.length > MAX_NAME_LENGTH) {
        errors.push(`${at}.name must be at most ${MAX_NAME_LENGTH} characters.`)
      }
    }

    if (typeof quantity !== 'number' || !Number.isInteger(quantity)) {
      errors.push(`${at}.quantity must be an integer.`)
    } else if (quantity < 0 || quantity > MAX_QUANTITY) {
      errors.push(
        `${at}.quantity must be between 0 and ${MAX_QUANTITY} (inclusive).`,
      )
    }

    if (normalisedSku && normalisedName && errors.length === 0) {
      updates.push({
        sku: normalisedSku,
        name: normalisedName,
        quantity: quantity as number,
      })
    }
  })

  if (errors.length > 0) {
    return { ok: false, errors }
  }

  return { ok: true, updates }
}
