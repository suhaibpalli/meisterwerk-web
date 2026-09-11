import { cookies } from 'next/headers'
import { LAYOUT_COOKIE, resolveLayout, type LayoutKey } from './layouts'

/**
 * Reads the preview layout from a cookie rather than a query string, so the
 * choice survives navigation between pages without the client having to carry
 * a parameter around.
 *
 * NOTE: reading cookies opts these routes into dynamic rendering. That is
 * correct for a preview build and wrong for production — at launch, delete
 * this module's call sites and use DEFAULT_LAYOUT directly, and the whole site
 * goes back to being statically generated.
 */
export async function getLayout(): Promise<LayoutKey> {
  const store = await cookies()
  return resolveLayout(store.get(LAYOUT_COOKIE)?.value)
}
