import Image from 'next/image'
import { SplitLines } from '@/components/motion/SplitLines'
import { Reveal } from '@/components/motion/Reveal'

/**
 * Spans are set per item rather than divided evenly. Four equal columns is the
 * lazy answer and it breaks the longest fact onto a second line, which is the
 * one thing a single-line rail cannot survive. 2 + 3 + 4 + 3 = 12.
 */
const FACTS = [
  { label: 'Est. 2012', span: 'md:col-span-2' },
  { label: '50,000 sq ft facility', span: 'md:col-span-3' },
  { label: 'Dubai · Riyadh · New Delhi', span: 'md:col-span-4' },
  { label: '14 maisons', span: 'md:col-span-3' },
]

/**
 * Image-led, nav overlaying, no boxes — the written direction, followed.
 *
 * The one thing the brief leaves entirely open is *where the type sits*, and
 * that is where this layout earns its own identity. The convention — Gucci,
 * FLOS, every maison site — anchors hero type to the bottom-left corner. This
 * does not: the headline and its lead are centred in the frame as one block,
 * split across the grid, with a wide-tracked rail of facts on the baseline.
 *
 * Centring the *block* is not the same as centring the text. The headline stays
 * hard left on the column grid and the lead sits across in columns 8–12; what
 * is centred is the pair, vertically. That keeps the asymmetry that makes the
 * composition specific while giving the frame a stable middle.
 *
 * The two blocks align at the bottom. At ~50px against 16px their first lines
 * can never share a baseline, so matching tops leaves them ~12px out — close
 * enough to read as a mistake, far enough to see. Aligning at the bottom puts
 * the lead's last baseline on the headline's last baseline, which is a real
 * typographic relationship and needs no magic number.
 */
export function HeroEditorial() {
  return (
    <section
      id="top"
      data-nav="dark"
      className="relative flex h-[94svh] min-h-[600px] w-full items-center overflow-hidden"
    >
      <Image
        src="https://images.unsplash.com/photo-1782834294716-8e28c18bdba6?auto=format&fit=crop&w=2400&h=1500&q=88"
        alt="Completed boutique interior — stone plinths, bronze-mirrored reveals and a solid marble stair"
        fill
        priority
        quality={90}
        sizes="100vw"
        className="u-img object-cover"
      />
      {/* Three jobs, one gradient: hold the nav at the very top, hold the
          centred type through the middle band, hold the facts rail on the
          baseline — and open up around 76% so the photograph still has a
          passage at full strength. A single flat overlay heavy enough for all
          three would grey the whole image. No box, no card; a tonal gradient
          is not a decorative element. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(11,11,11,0.80) 0%, rgba(11,11,11,0.50) 22%, rgba(11,11,11,0.54) 48%, rgba(11,11,11,0.34) 64%, rgba(11,11,11,0.16) 76%, rgba(11,11,11,0.68) 100%)',
        }}
      />

      {/* pb offsets the facts rail below, so the block optically centres in
          the space actually available to it rather than in the whole frame. */}
      <div className="u-container relative w-full pt-10 pb-20 md:pb-24">
        {/* items-end, not a hand-tuned top offset.
            The headline is ~50px and the lead is 16px, so their first lines can
            never share a baseline — matching the tops leaves them 12px apart,
            which is close enough to read as a mistake and far enough to see.
            Aligning the blocks at the bottom puts the lead's last baseline on
            the headline's last baseline, which is a real typographic
            relationship and holds at every viewport without a magic number. */}
        <div className="grid md:grid-cols-12 md:items-end">
          <div className="md:col-span-6">
            <SplitLines
              as="h1"
              className="u-display max-w-[13ch] text-paper-soft"
              delay={0.1}
            >
              Boutiques built to the millimetre
            </SplitLines>
          </div>
          <div className="md:col-span-5 md:col-start-8">
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

      {/* The facts sit on the same 12-column grid as the headline above, three
          columns each, so the rail lines up with the composition instead of
          ragging out as a flex-wrap of unequal chips. */}
      <Reveal delay={0.6} className="absolute inset-x-0 bottom-0">
        <ul className="u-container grid grid-cols-2 gap-y-3 pb-10 text-[0.6875rem] uppercase tracking-[0.2em] text-mute-50 md:grid-cols-12 md:pb-12">
          {FACTS.map((fact) => (
            <li key={fact.label} className={fact.span}>
              {fact.label}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
