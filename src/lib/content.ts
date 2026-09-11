/**
 * Site content. Temporary — this moves into the content platform once the
 * design is approved. Figures and copy are drawn from meisterwerk.ae and
 * the client's written design direction.
 */

/**
 * Addresses and telephone numbers transcribed from meisterwerk.ae, not
 * invented. Still to confirm with the client: which number should be the
 * published enquiry line, and whether the Milan location their current site
 * mentions is an office that belongs here.
 */
export const OFFICES = [
  {
    city: 'Dubai',
    lines: [
      'Warehouse 19, 20, 28, 29 & 30',
      'Dubai Investment Park 1',
      'PO Box 62699, United Arab Emirates',
    ],
    telephone: '+971 55 605 1199',
  },
  {
    city: 'Riyadh',
    lines: [
      'Office 410, Al Attas Commercial Complex',
      '8602 Umm Salim, 3923 Riyadh 12744',
      'Kingdom of Saudi Arabia',
    ],
    telephone: '+966 56 621 5918',
  },
  {
    city: 'New Delhi',
    lines: ['Office B20/C', 'Patparganj', 'New Delhi 110092, India'],
    telephone: '+91 7907 945010',
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
  /** Weeks on site. Programme is the figure a maison actually negotiates. */
  programme: string
  description: string
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
    programme: '14 weeks',
    description:
      'A full fit-out delivered inside a trading mall, with the store handed back to the maison\'s own visual merchandising team on the agreed date. Stone floor and wall linings, bronze-mirrored reveals, a solid marble stair and fourteen bespoke vitrines, all coordinated to the maison\'s global store manual rather than a local interpretation of it.',
    photo: 'photo-1782834294783-dff56aa2a540',
  },
  {
    slug: 'high-jewellery-house-mall-of-the-emirates',
    descriptor: 'High jewellery house',
    location: 'Mall of the Emirates',
    year: '2025',
    area: '210 sqm',
    scope: 'Fit-out and millwork',
    programme: '11 weeks',
    description:
      'Fit-out and millwork for a high jewellery house, produced in our own facility and installed overnight across six weeks of mall trading. The vitrine programme drove the sequence: every case was dry-assembled, lit and signed off in Dubai Investment Park before a single unit went to site.',
    photo: 'photo-1774110101478-bb066db7ccf0',
  },
  {
    slug: 'maison-facade-city-walk',
    descriptor: 'Leather goods maison',
    location: 'City Walk',
    year: '2024',
    area: '180 sqm',
    scope: 'Millwork and vitrines',
    programme: '9 weeks',
    description:
      'A millwork and vitrine package for a leather goods maison, executed while the store remained open. Wall-lining, display joinery and back-of-house casework in figured timber and high-gloss lacquer, with a finish standard set by a control sample approved by the maison\'s architect.',
    photo: 'photo-1771830936338-fa3c6587e81a',
  },
  {
    slug: 'watch-boutique-riyadh-park',
    descriptor: 'Watch boutique',
    location: 'Riyadh Park',
    year: '2024',
    area: '265 sqm',
    scope: 'Turnkey delivery',
    programme: '16 weeks',
    description:
      'Turnkey delivery in Riyadh — civil works, MEP coordination, joinery, finishes and handover under one contract. Managed from our Riyadh office with production in Dubai, which is the arrangement most maisons now ask for across the two markets.',
    photo: 'photo-1622704776938-bed6cd156e04',
  },
]

/**
 * Inner-page copy. Placeholder, pending the client's Group 2 content —
 * company narrative, service descriptions and credentials. Written to be
 * accurate to what is already published on meisterwerk.ae and to the two
 * briefing calls, so nothing here should need retracting; it needs replacing
 * with their own words.
 */

export const STUDIO = {
  lead:
    'Meisterwerk is the German word for masterpiece. We are not the architect. We are the reason the drawing survives contact with the building.',
  body: [
    'A luxury maison arrives with a store manual, a set of drawings and a tolerance. What it does not arrive with is a slab that is level, a bulkhead at the right height, or a mall willing to close for the work. Closing that gap — between the drawing and the building as found — is the whole of what we do.',
    'We have been doing it in the Emirates since 2012, and in Saudi Arabia since the market opened to the maisons in earnest. Joinery, vitrines, lacquer and solid surface are produced in our own 50,000 square foot facility in Dubai Investment Park, which is the reason we can hold a finish standard across a programme rather than hope for one.',
    'Almost everything we build is under a confidentiality covenant that extends to the store’s existence, not only its photographs. Where a maison has granted permission we name them. Where they have not, the work appears here in anonymised form, with the scope and the programme intact.',
  ],
  principles: [
    {
      index: '01',
      title: 'The drawing is the contract',
      body:
        'We do not redesign in the field. Where a detail cannot be built as drawn, it comes back to the maison’s architect as a proposal with a sample, not as a change already made.',
    },
    {
      index: '02',
      title: 'Made in-house',
      body:
        'Joinery, vitrines, lacquer and solid surface are produced in our own facility. Subcontracting the millwork is subcontracting the finish standard, and the finish standard is the job.',
    },
    {
      index: '03',
      title: 'The mall does not close',
      body:
        'Programmes are built around the store’s trading hours rather than ours. Most of our work happens between 22:00 and 08:00, in a live mall, without a hoarding line that embarrasses the brand next door.',
    },
  ],
} as const

export const CONTACT = {
  lead: 'Drawings, programme, mall, handover date. We will tell you what it takes.',
  body:
    'The most useful first message contains the mall, the approximate area, the maison’s drawing set if you have it, and the date the store has to trade. We can give a considered answer to that in a couple of days. Without a date we can only give you a range.',
  email: 'info@meisterwerk.ae',
  telephone: '+971 55 605 1199',
} as const
