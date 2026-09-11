import Image from 'next/image'
import { SplitLines } from '@/components/motion/SplitLines'
import { Reveal } from '@/components/motion/Reveal'

const FACTS = [
  'Est. 2012',
  '50,000 sq ft facility',
  'Dubai · Riyadh · New Delhi',
  '14 maisons',
]

/**
 * Image-led, nav overlaying, no boxes — the written direction, followed.
 *
 * The one thing the brief leaves entirely open is *where the type sits*, and
 * that is where this layout earns its own identity. The convention — Gucci,
 * FLOS, every maison site — anchors hero type to the bottom-left of the frame
 * and leaves the top empty for the nav. This inverts it: the headline sits
 * directly under the nav at the head of the page, and the baseline carries
 * nothing but a single wide-tracked line of facts.
 *
 * Two reasons it is better here, not just different:
 *
 * 1. It reads as a masthead rather than a campaign image. A visitor meets the
 *    claim before the atmosphere, which suits a company being assessed on
 *    competence rather than desire.
 * 2. Bottom-anchored type needs a heavy scrim at the bottom of every hero
 *    image, and the bottom of an interior photograph is the floor. Top-anchored
 *    type darkens the ceiling instead — which is usually the least interesting
 *    part of the frame and the part already in shadow.
 */
export function HeroEditorial() {
  return (
    <section id="top" data-nav="dark" className="relative h-[94svh] min-h-[600px] w-full">
      <Image
        src="https://images.unsplash.com/photo-1782834294716-8e28c18bdba6?auto=format&fit=crop&w=2400&h=1500&q=88"
        alt="Completed boutique interior — stone plinths, bronze-mirrored reveals and a solid marble stair"
        fill
        priority
        quality={90}
        sizes="100vw"
        className="u-img object-cover"
      />
      {/* Weighted to the head of the frame, where the type is. No box, no
          card — a tonal gradient is not a decorative element. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(11,11,11,0.88) 0%, rgba(11,11,11,0.62) 34%, rgba(11,11,11,0.18) 62%, rgba(11,11,11,0.55) 100%)',
        }}
      />

      <div className="u-container absolute inset-x-0 top-0 pt-32 md:pt-40">
        <div className="grid md:grid-cols-12">
          <div className="md:col-span-7">
            <SplitLines
              as="h1"
              className="u-display max-w-[13ch] text-paper-soft"
              delay={0.1}
            >
              Boutiques built to the millimetre
            </SplitLines>
          </div>
          <div className="md:col-span-4 md:col-start-9 md:pt-3">
            <SplitLines
              as="p"
              className="mt-8 max-w-[34ch] leading-relaxed text-mute-70 md:mt-0"
              delay={0.35}
            >
              The maison draws it. We build it — to their tolerance, inside a
              trading mall, most often overnight.
            </SplitLines>
          </div>
        </div>
      </div>

      <Reveal delay={0.6} className="absolute inset-x-0 bottom-0">
        <ul className="u-container flex flex-wrap gap-x-10 gap-y-2 pb-10 text-[0.6875rem] uppercase tracking-[0.2em] text-mute-50 md:pb-12">
          {FACTS.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
