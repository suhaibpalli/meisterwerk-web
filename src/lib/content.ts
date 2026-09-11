/**
 * Site content. Temporary — this moves into the content platform once the
 * design is approved. Figures and copy are drawn from meisterwerk.ae and
 * the client's written design direction.
 */

export const OFFICES = [
  {
    city: 'Dubai',
    lines: ['Warehouse 19, 20, 28–30', 'Dubai Investment Park 1', 'United Arab Emirates'],
  },
  {
    city: 'Riyadh',
    lines: ['Office 410, Al Attas Complex', 'Umm Salim', 'Kingdom of Saudi Arabia'],
  },
  {
    city: 'New Delhi',
    lines: ['Office B20/C', 'Patparganj', 'India'],
  },
] as const

export const MAISONS = [
  'Van Cleef & Arpels',
  'Bvlgari',
  'Cartier',
  'Tiffany & Co.',
  'Piaget',
  'A. Lange & Söhne',
  'Jaeger-LeCoultre',
  'Hermès',
  'Roger Dubuis',
  'Chaumet',
  'Montblanc',
  'IWC',
  'Damiani',
  'Roberto Coin',
] as const

export const CAPABILITIES = [
  {
    index: '01',
    title: 'Fit-out',
    body:
      'Shell to handover. Civil works, partitions, floors and wall finishes, glass and steel, MEP coordination and special facades — delivered to the maison’s drawing, at the maison’s tolerance.',
  },
  {
    index: '02',
    title: 'Millwork',
    body:
      'Furniture and vitrine fabrication, joinery, wall lining, high-gloss lacquer, Corian and solid surface, tapestry and curtains. Produced in our own 50,000 square foot facility in Dubai Investment Park.',
  },
  {
    index: '03',
    title: 'Renovation & maintenance',
    body:
      'Refurbishment of trading boutiques, facade repair, rolling maintenance and visual merchandising changeovers. Executed within mall hours, most often overnight, without closing the store.',
  },
] as const

export type Project = {
  slug: string
  descriptor: string
  location: string
  year: string
  area: string
  scope: string
  /** Source photo id only — the crop is decided by the layout using it. */
  photo: string
}

/**
 * Builds a crop on demand.
 *
 * Storing a finished URL forces one aspect ratio on every layout, and a
 * portrait crop used as a full-screen landscape background loses the middle of
 * the picture — which on a fit-out site is the whole subject. The layout knows
 * the shape it needs; the content should only know which photograph it is.
 *
 * This is also where a CDN swap lands later: when the client's own photography
 * arrives, only this function changes.
 */
export function photo(id: string, w: number, h: number, q = 80): string {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=${q}`
}

/**
 * Placeholder projects. Imagery is licence-free stock standing in for
 * Meisterwerk's own photography, and MUST be replaced before launch —
 * Unsplash grants no property or model release. See docs/brand.md.
 *
 * Every tile is an *interior*, never a product. A watch macro or a handbag
 * says "we sell luxury goods"; a room says "we built this". Meisterwerk does
 * not sell the product, it builds the box the product sits in, and the
 * photography has to make that distinction on its own — most visitors will
 * never read the caption.
 */
export const PROJECTS: Project[] = [
  {
    slug: 'swiss-watch-maison-dubai-mall',
    descriptor: 'Swiss watch maison',
    location: 'Dubai Mall',
    year: '2025',
    area: '340 sqm',
    scope: 'Full fit-out',
    photo: 'photo-1782834294783-dff56aa2a540',
  },
  {
    slug: 'high-jewellery-house-mall-of-the-emirates',
    descriptor: 'High jewellery house',
    location: 'Mall of the Emirates',
    year: '2025',
    area: '210 sqm',
    scope: 'Fit-out and millwork',
    photo: 'photo-1774110101478-bb066db7ccf0',
  },
  {
    slug: 'maison-facade-city-walk',
    descriptor: 'Leather goods maison',
    location: 'City Walk',
    year: '2024',
    area: '180 sqm',
    scope: 'Millwork and vitrines',
    photo: 'photo-1771830936338-fa3c6587e81a',
  },
  {
    slug: 'watch-boutique-riyadh-park',
    descriptor: 'Watch boutique',
    location: 'Riyadh Park',
    year: '2024',
    area: '265 sqm',
    scope: 'Turnkey delivery',
    photo: 'photo-1622704776938-bed6cd156e04',
  },
]
