import type { Connect, Plugin } from 'vite'
import {
  PRODUCE_CATEGORIES_PATH,
  getProduceCategories,
} from './produceCategories'

/** Minimal shape of the request we read (subset of Node's IncomingMessage). */
interface ApiRequest {
  url?: string
  method?: string
}

/** Minimal shape of the response we write (subset of Node's ServerResponse). */
interface ApiResponse {
  statusCode: number
  setHeader: (key: string, value: string) => void
  end: (chunk?: string) => void
}

/**
 * Connect-style middleware serving the produce categories endpoint.
 *
 * Exported for unit testing; typed structurally so it needs no `@types/node`.
 */
export function produceCategoriesHandler(
  req: ApiRequest,
  res: ApiResponse,
  next: () => void,
): void {
  const url = req.url?.split('?')[0]
  if (url !== PRODUCE_CATEGORIES_PATH) {
    next()
    return
  }

  if (req.method !== 'GET') {
    res.statusCode = 405
    res.setHeader('Allow', 'GET')
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: 'Method Not Allowed' }))
    return
  }

  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Cache-Control', 'no-store')
  res.end(JSON.stringify(getProduceCategories()))
}

/**
 * Vite plugin that serves the produce categories API.
 *
 * Mounts a `GET /api/produce-categories` route on both the dev server and the
 * `vite preview` server, returning a JSON array of produce category names for
 * the landing page's "What's inside" section.
 */
export function produceCategoriesPlugin(): Plugin {
  const handler = produceCategoriesHandler as Connect.NextHandleFunction

  return {
    name: 'harvest:produce-categories-api',
    configureServer(server) {
      server.middlewares.use(handler)
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler)
    },
  }
}
