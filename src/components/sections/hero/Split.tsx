import Image from 'next/image'
import { SplitLines } from '@/components/motion/SplitLines'
import { Reveal } from '@/components/motion/Reveal'
import { ImageReveal } from '@/components/motion/ImageReveal'

/**
 * Half type, half photograph, meeting on a single vertical line.
 *
 * The full-bleed hero puts type *over* an image and therefore needs a scrim,
 * which costs the photograph a stop of contrast and costs the type a clean
 * ground. Splitting the screen gives both their own field: the copy sits on
 * pure ink at full legibility, the image runs uncropped by any overlay.
 *
 * It also changes the register. Full-bleed is a magazine cover; a split screen
 * is a specification sheet next to the thing it specifies — which is closer to
 * what Meisterwerk actually sells.
 */
export function HeroSplit() {
  return (
    <section
      id="top"
      data-nav="dark"
      className="grid min-h-[92svh] grid-cols-1 md:grid-cols-2"
    >
      <div className="order-2 flex flex-col justify-end px-6 pt-14 pb-14 md:order-1 md:px-10 md:pt-40 md:pb-20 lg:px-16">
        <p className="u-eyebrow">Dubai · Riyadh · New Delhi</p>
        <SplitLines
          as="h1"
          className="mt-8 max-w-[14ch] font-display text-[clamp(2.25rem,4.4vw,3.75rem)] font-light leading-[1.02] tracking-[-0.015em] text-paper-soft"
          delay={0.1}
        >
          Boutiques built to the millimetre
        </SplitLines>
        <SplitLines
          as="p"
          className="mt-8 max-w-[40ch] leading-relaxed text-mute-70"
          delay={0.3}
        >
          The maison draws it. We build it — to their tolerance, inside a
          trading mall, most often overnight.
        </SplitLines>
        <Reveal delay={0.5} className="mt-12">
          <hr className="u-rule" />
          <p className="mt-6 max-w-[34ch] text-micro leading-relaxed text-mute-50">
            Fit-out, millwork and facades for the world&rsquo;s luxury maisons,
            from a 50,000 sq ft facility in Dubai Investment Park.
          </p>
        </Reveal>
      </div>

      <ImageReveal className="relative order-1 min-h-[46svh] md:order-2 md:min-h-full">
        <Image
          src="https://images.unsplash.com/photo-1782834294716-8e28c18bdba6?auto=format&fit=crop&w=1600&h=2000&q=85"
          alt="Completed boutique interior — stone plinths, bronze-mirrored reveals and a solid marble stair"
          fill
          priority
          quality={90}
          sizes="(min-width: 768px) 50vw, 100vw"
          className="u-img object-cover"
        />
        {/* The nav crosses this half of the screen, and this photograph is
            cream marble. A short scrim at the top edge only — enough to hold
            white type, not enough to read as a treatment on the image. The
            alternative, flipping the whole header to dark, would put a dark
            wordmark on the ink panel to its left. */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-36"
          style={{
            background:
              'linear-gradient(180deg, rgba(11,11,11,0.62) 0%, rgba(11,11,11,0) 100%)',
          }}
        />
      </ImageReveal>
    </section>
  )
}
