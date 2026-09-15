import type { Metadata, Viewport } from 'next'
import { glacial, jost } from '@/lib/fonts'
import { Header } from '@/components/site/Header'
import { Footer } from '@/components/site/Footer'
import { Veil } from '@/components/motion/Veil'
import { MotionPrefsProvider } from '@/lib/motion-prefs'
import { StudioGate } from '@/components/studio/StudioGate'
import { getLayout } from '@/lib/layout-server'
import { PREVIEW_LOCK } from '@/lib/preview'
import './globals.css'

const SITE = 'https://meisterwerk.ae'

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: 'Meisterwerk — Luxury retail fit-out, Dubai & Riyadh',
    template: '%s — Meisterwerk',
  },
  description:
    'Meisterwerk builds and renovates boutiques for the world’s luxury maisons across the UAE and Saudi Arabia. Fit-out, millwork and facade work delivered to the maison’s drawing, at the maison’s tolerance.',
  keywords: [
    'luxury retail fit-out Dubai',
    'boutique fit-out contractor UAE',
    'millwork and joinery Dubai',
    'retail renovation Riyadh',
    'shopfitting Middle East',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_AE',
    url: SITE,
    siteName: 'Meisterwerk',
    title: 'Meisterwerk — Luxury retail fit-out, Dubai & Riyadh',
    description:
      'Boutiques built for the world’s luxury maisons across the UAE and Saudi Arabia.',
  },
  // The preview is not for search engines. Flip PREVIEW_LOCK at launch.
  robots: PREVIEW_LOCK
    ? { index: false, follow: false }
    : { index: true, follow: true },
  alternates: { canonical: SITE },
}

export const viewport: Viewport = {
  themeColor: '#0B0B0B',
  colorScheme: 'dark',
}

const organisationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Meisterwerk Fitout LLC',
  url: SITE,
  description:
    'Luxury retail fit-out contractor delivering boutiques for international maisons across the UAE and Saudi Arabia.',
  foundingDate: '2020',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Dubai Investment Park 1',
    addressLocality: 'Dubai',
    addressCountry: 'AE',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Stamped on <html> so layout-specific CSS (density, scroll-snap) applies on
  // the very first paint rather than after hydration.
  const layout = await getLayout()

  return (
    <html
      lang="en"
      data-layout={layout}
      className={`${glacial.variable} ${jost.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationSchema) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[60] focus:bg-white focus:px-4 focus:py-2 focus:text-black"
        >
          Skip to content
        </a>
        <MotionPrefsProvider>
          <Veil />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <StudioGate />
        </MotionPrefsProvider>
      </body>
    </html>
  )
}
