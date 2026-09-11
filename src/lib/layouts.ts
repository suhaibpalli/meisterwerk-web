/**
 * The four layouts.
 *
 * Data only — no component imports — so this module is safe in both the
 * client preference context and the server page. The component map lives in
 * `src/components/layouts/index.tsx` and is imported by the page alone, which
 * is what keeps three unused layouts out of the shipped bundle.
 */

export const LAYOUT_KEYS = ['editorial', 'drawing', 'index', 'split', 'cinematic'] as const
export type LayoutKey = (typeof LAYOUT_KEYS)[number]

/** The shipped layout. Change this when the client picks. */
export const DEFAULT_LAYOUT: LayoutKey = 'editorial'

export const LAYOUT_COOKIE = 'mw_layout'

export const LAYOUTS: { id: LayoutKey; label: string; note: string }[] = [
  {
    id: 'editorial',
    label: 'Editorial',
    note: 'The written brief. Image-led, nav over the banner, no borders.',
  },
  {
    id: 'drawing',
    label: 'Drawing',
    note: 'Sheet border, framed plates, dimensions. Departs from the brief.',
  },
  {
    id: 'index',
    label: 'Index',
    note: 'No hero image. Projects as a ledger; image on hover.',
  },
  {
    id: 'split',
    label: 'Split',
    note: 'Half type, half image. Denser, two-column throughout.',
  },
  {
    id: 'cinematic',
    label: 'Cinematic',
    note: 'One full screen per project. Maximum impression.',
  },
]

export function isLayout(value: unknown): value is LayoutKey {
  return typeof value === 'string' && (LAYOUT_KEYS as readonly string[]).includes(value)
}

export function resolveLayout(value: unknown): LayoutKey {
  return isLayout(value) ? value : DEFAULT_LAYOUT
}
