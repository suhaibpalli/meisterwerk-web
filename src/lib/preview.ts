/**
 * Preview lock.
 *
 * Only the home page is open on the deployed preview; every other route shows
 * a deliberate "in design" screen instead of unfinished work. This matches
 * what the client was told — the home page first, the rest in the next stage —
 * and it stops a half-dressed page being judged as a finished one.
 *
 * Deliberately a committed constant rather than an environment variable:
 * `.env*` is gitignored here, so an env-based switch would live only in the
 * Vercel dashboard where it is invisible in review and easy to forget. This is
 * visible in the diff and it is one line to change.
 *
 * Local development is never locked, so the full site stays workable.
 *
 * AT LAUNCH: set this to `false`.
 */
export const PREVIEW_LOCK = process.env.NODE_ENV === 'production'
