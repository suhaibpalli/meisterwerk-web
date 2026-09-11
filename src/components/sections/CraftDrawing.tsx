import Image from 'next/image'
import { SplitLines } from '@/components/motion/SplitLines'
import { Reveal } from '@/components/motion/Reveal'
import { ImageReveal } from '@/components/motion/ImageReveal'
import { SheetHead } from '@/components/brand/SheetHead'
import { Dimension } from '@/components/brand/Dimension'

/**
 * The tolerance statement, set against a detail plate.
 *
 * The full-bleed version of this section exists for the other layouts, but it
 * cannot run here: a photograph bleeding past a drawn sheet border reads as a
 * printing error, not as a choice. Set inside the sheet it becomes what it
 * should have been all along — a detail blown up next to the note explaining
 * what the detail is for.
 *
 * The portrait ratio is doing work too. A wide shot shows a room; a tall crop
 * shows a junction, and the junction is the thing Meisterwerk is actually paid
 * to get right.
 */
export function CraftDrawing() {
  return (
    <section id="craft" data-nav="dark" className="py-block-sm md:py-block">
      <div className="u-container">
        <SheetHead index="03" title="Tolerance" />

        <div className="mt-12 grid gap-10 md:grid-cols-12 md:gap-0">
          <div className="md:col-span-6 md:pr-12">
            <SplitLines
              as="p"
              className="max-w-[22ch] font-display text-h2 font-light leading-snug tracking-[-0.01em] text-paper-soft"
            >
              A mitred brass reveal is either right or it is visible. There is
              no third outcome.
            </SplitLines>

            <Reveal delay={0.2}>
              <p className="mt-10 max-w-[42ch] leading-relaxed text-mute-70">
                The maison&rsquo;s architect sets the detail. Our job starts at
                the point where the drawing meets a slab that is out of level, a
                bulkhead that is 14mm low, and a mall that will not close.
              </p>
            </Reveal>

            <Reveal delay={0.35} className="mt-12 grid max-w-md grid-cols-2 gap-x-8">
              <Dimension value="±1 mm" label="Joinery tolerance" />
              <Dimension value="22:00–08:00" label="Typical working window" />
            </Reveal>
          </div>

          <figure className="md:col-span-6 md:u-flute md:pl-12">
            <ImageReveal className="relative aspect-[4/5] w-full">
              <Image
                src="https://images.unsplash.com/photo-1774110073583-2475ab5ed8b2?auto=format&fit=crop&w=1400&h=1750&q=85"
                alt="A completed vitrine — cove-lit interior, mitred joints and a seamless back panel"
                fill
                sizes="(min-width: 768px) 48vw, 100vw"
                className="u-img object-cover"
              />
            </ImageReveal>
            <Reveal>
              <figcaption className="mt-4 flex items-baseline justify-between gap-6 text-micro text-mute-50">
                <span>Vitrine — cove lighting, mitred joints, seamless back panel</span>
                <span className="tabular-nums text-mute-30">Plate 02</span>
              </figcaption>
            </Reveal>
          </figure>
        </div>
      </div>
    </section>
  )
}
