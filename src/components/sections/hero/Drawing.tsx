import Image from 'next/image'
import { SplitLines } from '@/components/motion/SplitLines'
import { Reveal } from '@/components/motion/Reveal'
import { ImageReveal } from '@/components/motion/ImageReveal'
import { Registration } from '@/components/brand/Registration'
import { Dimension } from '@/components/brand/Dimension'

/**
 * The page as a drawing sheet.
 *
 * What this is NOT, deliberately: a full-bleed photograph with the headline
 * laid over its bottom-left corner and a gradient scrim holding the type up.
 * That composition is the luxury-fashion template — every maison site in the
 * world opens that way — and running it for a contractor borrows the customer's
 * clothes. It also makes the weakest possible use of Meisterwerk's own brand,
 * which is not atmospheric at all: it is white hairline line-art of Leonardo's
 * circle-and-square construction and a fluted classical column.
 *
 * So the image is *set out* rather than bled: given a frame, a margin, a
 * registration mark and dimensions, on a sheet with a visible border. The
 * headline sits on the page beside it, on its own ground, at full contrast
 * with no scrim. A visitor reads structure before they read mood — which is
 * the correct order for a company hired to build to tolerance.
 */
export function HeroDrawing() {
  return (
    <section
      id="top"
      data-nav="dark"
      className="u-container pt-32 pb-12 md:pt-40 md:pb-14"
    >
      <div className="grid gap-10 md:grid-cols-12 md:gap-0">
        {/* Title block */}
        <div className="md:col-span-5 md:pr-10">
          <div className="flex items-center gap-3">
            <Registration className="text-accent" />
            <p className="u-eyebrow">Retail fit-out · Est. 2012</p>
          </div>

          <SplitLines
            as="h1"
            className="mt-8 max-w-[13ch] font-display text-[clamp(2.25rem,4.2vw,3.5rem)] font-light leading-[1.04] tracking-[-0.018em] text-paper-soft"
            delay={0.1}
          >
            Boutiques built to the millimetre
          </SplitLines>

          <SplitLines
            as="p"
            className="mt-8 max-w-[34ch] leading-relaxed text-mute-70"
            delay={0.3}
          >
            The maison draws it. We build it — to their tolerance, inside a
            trading mall, most often overnight.
          </SplitLines>

          <Reveal delay={0.5} className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8">
            <Dimension value="50,000" label="sq ft facility" />
            <Dimension value="14" label="Maisons" />
            <Dimension value="3" label="Offices" />
            <Dimension value="2012" label="In the Emirates since" />
          </Reveal>
        </div>

        {/* The plate */}
        <figure className="md:col-span-7 md:u-flute md:pl-10">
          <ImageReveal className="relative aspect-[4/3] w-full md:aspect-[5/4]">
            <Image
              src="https://images.unsplash.com/photo-1782834294716-8e28c18bdba6?auto=format&fit=crop&w=2000&h=1600&q=88"
              alt="Completed boutique interior — stone plinths, bronze-mirrored reveals and a solid marble stair"
              fill
              priority
              quality={90}
              sizes="(min-width: 768px) 58vw, 100vw"
              className="u-img object-cover"
            />
          </ImageReveal>

          <Reveal delay={0.3}>
            <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 text-micro text-mute-50">
              <span>Boutique, Dubai Mall — stone, bronze mirror, solid marble stair</span>
              <span className="tabular-nums text-mute-30">Plate 01</span>
            </figcaption>
          </Reveal>
        </figure>
      </div>
    </section>
  )
}
