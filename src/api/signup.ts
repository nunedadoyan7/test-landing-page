/**
 * Signup form submission endpoint.
 *
 * The Harvest landing page collects an email address and a ZIP code from the
 * hero signup form (see "Harvest Landing Page.html") to check delivery
 * availability. This module is the framework-agnostic handler for that POST
 * endpoint: it validates the incoming payload, persists the submission, and
 * returns a structured HTTP-style response.
 *
 * It is deliberately transport-agnostic so it can be mounted on any server
 * (Node http, Express, a serverless function, etc.) while staying fully
 * unit-testable under Vitest. `handleSignup` receives a parsed body and returns
 * a plain `{ status, body }` result rather than touching request/response
 * objects directly.
 */

/** Raw, untrusted signup payload as received from the client. */
export interface SignupRequest {
  /** Subscriber email address, e.g. "pat@example.com". */
  email: string
  /** US ZIP code, either 5-digit ("94103") or ZIP+4 ("94103-1234"). */
  zip: string
}

/** A stored, validated + normalized signup submission. */
export interface SignupSubmission {
  email: string
  zip: string
  /** ISO-8601 timestamp of when the submission was accepted. */
  submittedAt: string
}

/** Successful response body. */
export interface SignupSuccess {
  ok: true
  message: string
  submission: SignupSubmission
}

/** Validation-error response body. `errors` is keyed by field name. */
export interface SignupError {
  ok: false
  message: string
  errors: Partial<Record<keyof SignupRequest, string>>
}

/** HTTP-style result returned by the handler. */
export interface SignupResult {
  status: number
  body: SignupSuccess | SignupError
}

/**
 * Pragmatic email check: a single "@", non-empty local part, and a domain with
 * at least one dot and a 2+ character TLD. Deliberately not RFC-5322-exhaustive
 * — the goal is to reject obvious typos, not to be a parser.
 */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** US ZIP: 5 digits, optionally followed by a "-" and 4 digits (ZIP+4). */
const ZIP_RE = /^\d{5}(-\d{4})?$/

/** Validate and normalize a single email; returns the trimmed, lowercased value. */
function normalizeEmail(value: unknown): { value?: string; error?: string } {
  if (typeof value !== 'string' || value.trim() === '') {
    return { error: 'Email is required.' }
  }
  const email = value.trim().toLowerCase()
  if (!EMAIL_RE.test(email)) {
    return { error: 'Enter a valid email address.' }
  }
  return { value: email }
}

/** Validate and normalize a single ZIP; returns the trimmed value. */
function normalizeZip(value: unknown): { value?: string; error?: string } {
  if (typeof value !== 'string' || value.trim() === '') {
    return { error: 'ZIP code is required.' }
  }
  const zip = value.trim()
  if (!ZIP_RE.test(zip)) {
    return { error: 'Enter a valid US ZIP code (e.g. 94103).' }
  }
  return { value: zip }
}

/**
 * Storage abstraction for signup submissions. The default implementation keeps
 * submissions in memory, which is sufficient for the landing page and for
 * tests; a production deployment can supply a database-backed store.
 */
export interface SignupStore {
  save(submission: SignupSubmission): void
  all(): readonly SignupSubmission[]
}

/** Simple in-memory store. Not durable across process restarts by design. */
export class InMemorySignupStore implements SignupStore {
  private readonly submissions: SignupSubmission[] = []

  save(submission: SignupSubmission): void {
    this.submissions.push(submission)
  }

  all(): readonly SignupSubmission[] {
    return this.submissions
  }
}

/** Process-wide default store used when no explicit store is provided. */
export const signupStore: SignupStore = new InMemorySignupStore()

/**
 * Handle a signup form submission.
 *
 * @param body  Parsed request body (may be any shape — it is not trusted).
 * @param store Store to persist accepted submissions into. Defaults to the
 *              shared in-memory store.
 * @returns An HTTP-style result: `201` on success, `400` on validation error.
 */
export function handleSignup(
  body: unknown,
  store: SignupStore = signupStore,
): SignupResult {
  const payload = (body ?? {}) as Partial<SignupRequest>

  const email = normalizeEmail(payload.email)
  const zip = normalizeZip(payload.zip)

  const errors: SignupError['errors'] = {}
  if (email.error) errors.email = email.error
  if (zip.error) errors.zip = zip.error

  if (Object.keys(errors).length > 0) {
    return {
      status: 400,
      body: {
        ok: false,
        message: 'Please correct the highlighted fields.',
        errors,
      },
    }
  }

  const submission: SignupSubmission = {
    // Non-null assertions are safe: absence of an error guarantees a value.
    email: email.value!,
    zip: zip.value!,
    submittedAt: new Date().toISOString(),
  }
  store.save(submission)

  return {
    status: 201,
    body: {
      ok: true,
      message: "You're on the list — we'll check delivery for your area.",
      submission,
    },
  }
}
