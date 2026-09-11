import { SplitLines } from '@/components/motion/SplitLines'
import { Reveal } from '@/components/motion/Reveal'

const FACTS = [
  { value: '2012', label: 'Operating in the Emirates since' },
  { value: '50,000', unit: 'sq ft', label: 'Own facility, Dubai Investment Park' },
  { value: '14', label: 'Maisons built for' },
  { value: '3', label: 'Offices — Dubai, Riyadh, New Delhi' },
]

/**
 * A hero with no photograph.
 *
 * This is the sharpest answer to Meisterwerk's actual constraint: the best
 * images they own are of stores they are contractually forbidden to name, and
 * the stock standing in for them is the weakest thing on the site. A layout
 * that opens on type and data is not a compromise around that — it is a
 * stronger opening for a contractor than any single photograph, because the
 * claim is the record, not the picture.
 *
 * The facts sit on the baseline of the screen behind a hairline, the way a
 * masthead carries its imprint. A visitor takes the whole proposition in one
 * screen without scrolling, which is what a procurement lead actually wants.
 */
export function HeroIndex() {
  return (
    <section
      id="top"
      data-nav="dark"
      className="flex min-h-[92svh] flex-col justify-between pt-36 pb-10 md:pt-44"
    >
      <div className="u-container">
        <p className="u-eyebrow">Retail fit-out · Dubai · Riyadh · New Delhi</p>
        <SplitLines as="h1" className="u-display mt-10 max-w-[15ch]" delay={0.1}>
          Boutiques built to the millimetre
        </SplitLines>
        <SplitLines
          as="p"
          className="mt-10 max-w-[54ch] text-lead leading-relaxed text-mute-70"
          delay={0.3}
        >
          The maison draws it. We build it — to their tolerance, inside a
          trading mall, most often overnight.
        </SplitLines>
      </div>

      <div className="u-container">
        <hr className="u-rule" />
        <Reveal stagger className="grid grid-cols-2 gap-x-8 gap-y-8 pt-8 md:grid-cols-4" delay={0.5}>
          {FACTS.map((fact) => (
            <div key={fact.label}>
              <p className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-light leading-none tracking-[-0.02em] tabular-nums">
                {fact.value}
                {fact.unit ? (
                  <span className="ml-2 align-baseline text-[0.32em] tracking-[0.12em] uppercase text-mute-50">
                    {fact.unit}
                  </span>
                ) : null}
              </p>
              <p className="mt-3 max-w-[22ch] text-micro leading-relaxed text-mute-50">
                {fact.label}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
