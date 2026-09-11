import { SplitLines } from '@/components/motion/SplitLines'

/**
 * The short text-only breath between full-height image sections.
 * FLOS runs these at 12–17vh; the rhythm is what makes the imagery land.
 *
 * This one is set line by line rather than faded as a block — it is the
 * site's thesis sentence, and revealing it a line at a time makes the reader
 * arrive at "the drawing survives contact with the building" last.
 */
export function Statement() {
  return (
    <section id="ethos" data-nav="dark" className="py-block-sm md:py-block">
      <div className="u-container">
        <SplitLines
          as="p"
          className="max-w-[38ch] font-display text-h2 font-light leading-snug tracking-[-0.01em]"
        >
          Meisterwerk is the German word for masterpiece. We are not the
          architect. We are the reason the drawing survives contact with the
          building.
        </SplitLines>
      </div>
    </section>
  )
}
