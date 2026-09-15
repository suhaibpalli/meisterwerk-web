/**
 * Preview lock.
 *
 * Only the home page is open while this is on; every other route renders a
 * designed "in design" screen instead of unfinished work. That matches what
 * the client was told — home page first, the rest in the next stage — and it
 * stops a half-dressed page being judged as a finished one.
 *
 * Three states, so the default is safe and the override is explicit:
 *
 *   PREVIEW_LOCK=1      locked, anywhere, including local development
 *   PREVIEW_LOCK=0      open, anywhere, including a deployed build
 *   unset               locked in production, open in development
 *
 * The unset default is what matters: a deploy is locked with no configuration
 * at all, so the lock cannot be lost by forgetting a dashboard setting. The
 * explicit values exist so the lock can be seen locally without editing code
 * — put PREVIEW_LOCK=1 in .env.local and restart the dev server.
 *
 * Read on the server only. Never expose this as NEXT_PUBLIC_*: a client-side
 * flag would ship the locked routes' real content to the browser anyway.
 *
 * AT LAUNCH: set PREVIEW_LOCK=0 in the production environment, or change the
 * fallback below to `false`.
 */
function resolveLock(): boolean {
  const flag = process.env.PREVIEW_LOCK?.trim().toLowerCase()
  if (flag === '1' || flag === 'true') return true
  if (flag === '0' || flag === 'false') return false
  return process.env.NODE_ENV === 'production'
}

export const PREVIEW_LOCK = resolveLock()
