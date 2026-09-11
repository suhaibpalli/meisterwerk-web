import { MAISONS } from '@/lib/content'
import { Marquee } from '@/components/motion/Marquee'
import { Reveal } from '@/components/motion/Reveal'

const half = Math.ceil(MAISONS.length / 2)
const ROW_A = MAISONS.slice(0, half)
const ROW_B = MAISONS.slice(half)

/**
 * The client list, set as type and put in motion.
 *
 * Two rows running against each other, at different speeds. One row reads as
 * a ticker; two counter-running rows read as scale — the eye cannot track
 * either one, which is exactly the impression the list is meant to leave.
 * The section is full-bleed because a client list constrained to the text
 * column looks like a footnote.
 */
export function Maisons() {
  return (
    <section id="maisons" data-nav="dark" className="py-block-sm md:py-block">
      <div className="u-container">
        <p className="u-eyebrow">Built for</p>
      </div>

      <Reveal className="mt-12 space-y-4 md:mt-16 md:space-y-6">
        <Marquee items={ROW_A} duration={46} />
        <Marquee items={ROW_B} duration={58} reverse />
      </Reveal>

      <div className="u-container">
        <p className="mt-12 max-w-[52ch] text-micro text-mute-30 md:mt-16">
          Project names and imagery are published only where the maison has
          granted permission. Confidential work appears in anonymised form.
        </p>
      </div>
    </section>
  )
}
