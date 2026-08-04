/**
 * Inventory schema + migrations (TLP-20).
 *
 * This project has no external database, so the inventory "table" is modelled
 * as an in-memory store (see `inventoryStore.ts`). To keep the persisted shape
 * evolvable we version it with an ordered list of migrations, mirroring how a
 * real SQL migration runner would apply incremental, forward-only changes.
 */

/** Current schema version. Bump this whenever a new migration is appended. */
export const INVENTORY_SCHEMA_VERSION = 1

/** A single inventory row keyed by SKU. */
export interface InventoryItem {
  /** Stock keeping unit — the primary key. */
  sku: string
  /** Human-readable product name. */
  name: string
  /** Current on-hand quantity (non-negative integer). */
  quantity: number
  /** ISO-8601 timestamp of the last sync that touched this row. */
  updatedAt: string
}

/** The full persisted inventory dataset, tagged with its schema version. */
export interface InventoryDataset {
  version: number
  items: InventoryItem[]
}

/**
 * A forward-only migration step.
 *
 * `toVersion` is the schema version produced by running `up`. Migrations are
 * applied in ascending order until the dataset reaches
 * {@link INVENTORY_SCHEMA_VERSION}.
 */
export interface InventoryMigration {
  toVersion: number
  description: string
  up: (dataset: InventoryDataset) => InventoryDataset
}

/**
 * Ordered list of migrations. Each entry advances the dataset by exactly one
 * version. Never edit a shipped migration — append a new one instead.
 */
export const inventoryMigrations: readonly InventoryMigration[] = [
  {
    toVersion: 1,
    description: 'Initialise inventory table (sku, name, quantity, updatedAt).',
    up: (dataset) => ({
      version: 1,
      items: dataset.items.map((item) => ({
        sku: item.sku,
        name: item.name,
        quantity: item.quantity,
        updatedAt: item.updatedAt,
      })),
    }),
  },
]

/**
 * Apply any pending migrations, bringing `dataset` up to the current schema
 * version. Idempotent: a dataset already at the latest version is returned
 * unchanged. Throws if the dataset is newer than the code understands.
 */
export function migrateInventory(dataset: InventoryDataset): InventoryDataset {
  if (dataset.version > INVENTORY_SCHEMA_VERSION) {
    throw new Error(
      `Inventory dataset version ${dataset.version} is newer than supported ` +
        `version ${INVENTORY_SCHEMA_VERSION}.`,
    )
  }

  let migrated = dataset
  for (const migration of inventoryMigrations) {
    if (migration.toVersion > migrated.version) {
      migrated = migration.up(migrated)
    }
  }
  return migrated
}

/** An empty, fully-migrated dataset — the starting point for a fresh store. */
export function createEmptyDataset(): InventoryDataset {
  return migrateInventory({ version: 0, items: [] })
}
