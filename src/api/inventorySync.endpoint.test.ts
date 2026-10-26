import { describe, expect, it } from 'vitest'
import {
  INVENTORY_SCHEMA_VERSION,
  createEmptyDataset,
  migrateInventory,
} from './inventorySchema'
import { validateSyncRequest } from './inventoryValidation'
import { InventoryStore } from './inventoryStore'
import { handleInventorySync } from './inventorySyncPlugin'

/**
 * TLP-20 — Inventory sync backend endpoint.
 *
 * Covers schema migration, server-side validation, the store upsert, and the
 * transport-agnostic endpoint handler.
 */

describe('inventory schema migration', () => {
  it('migrates a fresh dataset to the current version', () => {
    const dataset = createEmptyDataset()
    expect(dataset.version).toBe(INVENTORY_SCHEMA_VERSION)
    expect(dataset.items).toEqual([])
  })

  it('is idempotent when already at the latest version', () => {
    const dataset = createEmptyDataset()
    expect(migrateInventory(dataset)).toEqual(dataset)
  })

  it('throws when the dataset is newer than supported', () => {
    expect(() =>
      migrateInventory({ version: INVENTORY_SCHEMA_VERSION + 1, items: [] }),
    ).toThrow()
  })
})

describe('validateSyncRequest', () => {
  it('accepts a well-formed request and normalises whitespace', () => {
    const result = validateSyncRequest({
      items: [{ sku: '  apple-01 ', name: '  Apples ', quantity: 12 }],
    })
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.updates).toEqual([
        { sku: 'apple-01', name: 'Apples', quantity: 12 },
      ])
    }
  })

  it('rejects a non-object body', () => {
    const result = validateSyncRequest(null)
    expect(result.ok).toBe(false)
  })

  it('rejects an empty items array', () => {
    const result = validateSyncRequest({ items: [] })
    expect(result.ok).toBe(false)
  })

  it('collects errors for invalid fields', () => {
    const result = validateSyncRequest({
      items: [{ sku: '', name: '', quantity: -5 }],
    })
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.errors.length).toBeGreaterThanOrEqual(3)
    }
  })

  it('rejects non-integer quantities', () => {
    const result = validateSyncRequest({
      items: [{ sku: 'a', name: 'A', quantity: 1.5 }],
    })
    expect(result.ok).toBe(false)
  })

  it('rejects duplicate SKUs within a request', () => {
    const result = validateSyncRequest({
      items: [
        { sku: 'dup', name: 'One', quantity: 1 },
        { sku: 'dup', name: 'Two', quantity: 2 },
      ],
    })
    expect(result.ok).toBe(false)
  })
})

describe('InventoryStore', () => {
  it('inserts new rows and upserts existing ones by SKU', () => {
    const store = new InventoryStore()

    const first = store.sync([{ sku: 'a', name: 'Apples', quantity: 5 }])
    expect(first.created).toEqual(['a'])
    expect(first.updated).toEqual([])

    const second = store.sync([{ sku: 'a', name: 'Apples', quantity: 8 }])
    expect(second.created).toEqual([])
    expect(second.updated).toEqual(['a'])

    const rows = store.list()
    expect(rows).toHaveLength(1)
    expect(rows[0].quantity).toBe(8)
    expect(rows[0].updatedAt).toMatch(/\d{4}-\d{2}-\d{2}T/)
  })

  it('reports the current schema version', () => {
    expect(new InventoryStore().version).toBe(INVENTORY_SCHEMA_VERSION)
  })
})

describe('POST /api/inventory/sync (handler)', () => {
  it('returns 200 with the synced result for a valid body', () => {
    const store = new InventoryStore()
    const body = JSON.stringify({
      items: [{ sku: 'kale-1', name: 'Kale', quantity: 20 }],
    })

    const { status, payload } = handleInventorySync(body, store)
    expect(status).toBe(200)

    const result = payload as {
      ok: boolean
      created: string[]
      version: number
      items: unknown[]
    }
    expect(result.ok).toBe(true)
    expect(result.created).toEqual(['kale-1'])
    expect(result.version).toBe(INVENTORY_SCHEMA_VERSION)
    expect(result.items).toHaveLength(1)
  })

  it('returns 400 for malformed JSON', () => {
    const { status } = handleInventorySync('{ not json', new InventoryStore())
    expect(status).toBe(400)
  })

  it('returns 422 with details for validation failures', () => {
    const store = new InventoryStore()
    const body = JSON.stringify({ items: [{ sku: '', name: '', quantity: -1 }] })

    const { status, payload } = handleInventorySync(body, store)
    expect(status).toBe(422)

    const result = payload as { error: string; details: string[] }
    expect(result.error).toBe('Validation failed')
    expect(result.details.length).toBeGreaterThan(0)
    expect(store.list()).toHaveLength(0)
  })
})
