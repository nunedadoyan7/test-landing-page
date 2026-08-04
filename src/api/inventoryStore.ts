/**
 * In-memory inventory store (TLP-20).
 *
 * Stands in for a persistent database. The dataset is created already migrated
 * to the current schema version (see `inventorySchema.ts`). The store applies
 * validated sync updates as an upsert keyed by SKU and exposes read helpers for
 * the endpoint handler.
 */

import {
  INVENTORY_SCHEMA_VERSION,
  type InventoryDataset,
  type InventoryItem,
  createEmptyDataset,
} from './inventorySchema'
import type { InventoryUpdate } from './inventoryValidation'

/** Result of applying a batch of sync updates. */
export interface SyncOutcome {
  /** SKUs that did not previously exist and were inserted. */
  created: string[]
  /** SKUs that already existed and had their quantity/name updated. */
  updated: string[]
  /** Schema version the dataset is stored at. */
  version: number
}

/** A backing store for inventory rows, migrated to the current schema. */
export class InventoryStore {
  private dataset: InventoryDataset

  constructor(initial: InventoryDataset = createEmptyDataset()) {
    this.dataset = initial
  }

  /** Apply validated updates as an upsert, stamping each with `updatedAt`. */
  sync(updates: InventoryUpdate[], now: Date = new Date()): SyncOutcome {
    const timestamp = now.toISOString()
    const created: string[] = []
    const updated: string[] = []

    for (const update of updates) {
      const existing = this.dataset.items.find((i) => i.sku === update.sku)
      if (existing) {
        existing.name = update.name
        existing.quantity = update.quantity
        existing.updatedAt = timestamp
        updated.push(update.sku)
      } else {
        this.dataset.items.push({
          sku: update.sku,
          name: update.name,
          quantity: update.quantity,
          updatedAt: timestamp,
        })
        created.push(update.sku)
      }
    }

    return { created, updated, version: this.dataset.version }
  }

  /** Return a defensive copy of all inventory rows, ordered by SKU. */
  list(): InventoryItem[] {
    return this.dataset.items
      .map((item) => ({ ...item }))
      .sort((a, b) => a.sku.localeCompare(b.sku))
  }

  /** The schema version this store's dataset is at. */
  get version(): number {
    return this.dataset.version
  }
}

/** Process-wide store instance used by the endpoint handler. */
export const inventoryStore = new InventoryStore()

/** Re-exported for callers that want to assert the expected version. */
export { INVENTORY_SCHEMA_VERSION }
