import type { Connect, Plugin } from 'vite'
import { InventoryStore, inventoryStore } from './inventoryStore'
import { validateSyncRequest } from './inventoryValidation'

/** Route the inventory sync endpoint is served from. */
export const INVENTORY_SYNC_PATH = '/api/inventory/sync'

/** Maximum accepted request body size (bytes) to guard against abuse. */
const MAX_BODY_BYTES = 1_000_000

/** Minimal shape of the request we read (subset of Node's IncomingMessage). */
interface ApiRequest {
  url?: string
  method?: string
  on?: (event: string, listener: (chunk?: unknown) => void) => void
}

/** Minimal shape of the response we write (subset of Node's ServerResponse). */
interface ApiResponse {
  statusCode: number
  setHeader: (key: string, value: string) => void
  end: (chunk?: string) => void
}

function sendJson(res: ApiResponse, status: number, payload: unknown): void {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Cache-Control', 'no-store')
  res.end(JSON.stringify(payload))
}

/**
 * Read the full request body as a string, enforcing {@link MAX_BODY_BYTES}.
 *
 * Resolves with the raw text, or rejects if the payload is too large. Typed
 * structurally so it needs no `@types/node`.
 */
function readBody(req: ApiRequest): Promise<string> {
  return new Promise((resolve, reject) => {
    if (typeof req.on !== 'function') {
      resolve('')
      return
    }

    const chunks: string[] = []
    let size = 0

    req.on('data', (chunk) => {
      const text = String(chunk)
      size += text.length
      if (size > MAX_BODY_BYTES) {
        reject(new Error('Payload Too Large'))
        return
      }
      chunks.push(text)
    })
    req.on('end', () => resolve(chunks.join('')))
    req.on('error', () => reject(new Error('Request stream error')))
  })
}

/**
 * Core sync logic, decoupled from the transport stream.
 *
 * Validates `rawBody`, applies it to `store`, and returns the HTTP status and
 * JSON payload to send. Exported so unit tests can exercise every branch
 * without constructing a fake request stream.
 */
export function handleInventorySync(
  rawBody: string,
  store: InventoryStore = inventoryStore,
): { status: number; payload: unknown } {
  let parsed: unknown
  try {
    parsed = rawBody.trim() === '' ? undefined : JSON.parse(rawBody)
  } catch {
    return { status: 400, payload: { error: 'Invalid JSON body.' } }
  }

  const result = validateSyncRequest(parsed)
  if (!result.ok) {
    return { status: 422, payload: { error: 'Validation failed', details: result.errors } }
  }

  const outcome = store.sync(result.updates)
  return {
    status: 200,
    payload: {
      ok: true,
      created: outcome.created,
      updated: outcome.updated,
      version: outcome.version,
      items: store.list(),
    },
  }
}

/**
 * Connect-style middleware serving the inventory sync endpoint.
 *
 * Exported for unit testing; typed structurally so it needs no `@types/node`.
 */
export function inventorySyncHandler(
  req: ApiRequest,
  res: ApiResponse,
  next: () => void,
): void {
  const url = req.url?.split('?')[0]
  if (url !== INVENTORY_SYNC_PATH) {
    next()
    return
  }

  if (req.method !== 'POST') {
    res.statusCode = 405
    res.setHeader('Allow', 'POST')
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: 'Method Not Allowed' }))
    return
  }

  readBody(req)
    .then((rawBody) => {
      const { status, payload } = handleInventorySync(rawBody)
      sendJson(res, status, payload)
    })
    .catch((err: unknown) => {
      const message = err instanceof Error ? err.message : 'Bad Request'
      const status = message === 'Payload Too Large' ? 413 : 400
      sendJson(res, status, { error: message })
    })
}

/**
 * Vite plugin that serves the inventory sync API.
 *
 * Mounts a `POST /api/inventory/sync` route on both the dev server and the
 * `vite preview` server. The endpoint validates the submitted inventory levels
 * server-side and upserts them into the versioned in-memory store.
 */
export function inventorySyncPlugin(): Plugin {
  const handler = inventorySyncHandler as Connect.NextHandleFunction

  return {
    name: 'harvest:inventory-sync-api',
    configureServer(server) {
      server.middlewares.use(handler)
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler)
    },
  }
}
