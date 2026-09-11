import localFont from 'next/font/local'
import { Jost } from 'next/font/google'

/**
 * Body — Glacial Indifference, specified by the client.
 * SIL Open Font License 1.1. Self-hosted from /public/fonts.
 * Source: github.com/marcologous/glacial-indifference
 */
export const glacial = localFont({
  src: [
    { path: '../../public/fonts/GlacialIndifference-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../../public/fonts/GlacialIndifference-Medium.ttf', weight: '500', style: 'normal' },
    { path: '../../public/fonts/GlacialIndifference-SemiBold.ttf', weight: '600', style: 'normal' },
    { path: '../../public/fonts/GlacialIndifference-Bold.ttf', weight: '700', style: 'normal' },
  ],
  variable: '--font-glacial',
  display: 'swap',
  // Metric-matched fallback keeps CLS at zero while the face loads.
  fallback: ['system-ui', 'sans-serif'],
})

/**
 * Display — Jost.
 * Measured as the closest freely licensed match to Bang & Olufsen's
 * proprietary BeoSupreme: low x-height, tall caps, near-circular bowls,
 * single-storey g. Used at 40px and above only.
 */
export const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-jost',
  display: 'swap',
})
