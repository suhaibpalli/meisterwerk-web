import Image from 'next/image'
import { Parallax } from '@/components/motion/Parallax'
import { SplitLines } from '@/components/motion/SplitLines'
import { Reveal } from '@/components/motion/Reveal'

/**
 * One full screen, type centred, nothing else on it.
 *
 * The trade is explicit: this is the highest-impact opening of the four and
 * the lowest-information. It works when the visitor arrives already knowing
 * who Meisterwerk are — from a referral, a maison's procurement list, an
 * awards page — and is looking to confirm a standard rather than learn a
 * proposition. It works least well for a cold procurement lead who needs the
 * facility and the sqm on screen.
 */
export function HeroCinematic() {
  return (
    <section
      id="top"
      data-nav="dark"
      className="relative flex h-[100svh] snap-start items-center justify-center"
    >
      <Parallax className="absolute inset-0" amount={14}>
        <Image
          src="https://images.unsplash.com/photo-1782834294716-8e28c18bdba6?auto=format&fit=crop&w=2400&h=1500&q=85"
          alt="Completed boutique interior — stone plinths, bronze-mirrored reveals and a solid marble stair"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="u-img object-cover"
        />
      </Parallax>
      {/* Centred type over a full-bleed photograph is the hardest legibility
          case on the site — the copy lands in the brightest part of the frame
          rather than at a controllable edge. Two layers do the work: a linear
          scrim for the header and the baseline, and a soft radial vignette
          that darkens only behind the words. A single flat overlay strong
          enough to hold this type would grey the whole image. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(11,11,11,0.66) 0%, rgba(11,11,11,0.34) 42%, rgba(11,11,11,0.86) 100%)',
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 62% 42% at 50% 48%, rgba(11,11,11,0.52) 0%, rgba(11,11,11,0) 100%)',
        }}
      />

      <div className="u-container relative text-center">
        <p className="u-eyebrow">Dubai · Riyadh · New Delhi</p>
        <SplitLines
          as="h1"
          className="u-display mx-auto mt-8 max-w-[18ch] text-paper-soft"
          delay={0.15}
        >
          Boutiques built to the millimetre
        </SplitLines>
        <Reveal delay={0.4}>
          <p className="mx-auto mt-8 max-w-[46ch] text-lead leading-relaxed text-mute-70">
            The maison draws it. We build it — to their tolerance, inside a
            trading mall, most often overnight.
          </p>
        </Reveal>
      </div>

      <p
        aria-hidden
        className="absolute inset-x-0 bottom-8 text-center text-[0.6875rem] uppercase tracking-[0.2em] text-mute-30"
      >
        Scroll
      </p>
    </section>
  )
}
