import Image from 'next/image'
import { ImageReveal } from '@/components/motion/ImageReveal'
import { Reveal } from '@/components/motion/Reveal'

/**
 * The proof shot, placed immediately before the claim it proves.
 *
 * Every fit-out contractor in the region says "own facility". Almost none
 * show it. The photograph is deliberately not full-bleed — it sits inside the
 * container with a caption beneath, which is how a factual image is presented
 * in print, as opposed to the full-bleed atmospheric images used elsewhere on
 * the page. The change in treatment is the signal that this one is evidence
 * rather than mood.
 */
export function Workshop() {
  return (
    <section id="workshop" data-nav="dark" className="pb-block-sm md:pb-block">
      <div className="u-container">
        <ImageReveal className="relative aspect-[16/9] w-full">
          <Image
            src="https://images.unsplash.com/photo-1619759247378-6a73e3ad45f1?auto=format&fit=crop&w=2000&h=1125&q=82"
            alt="The joinery facility — panel saw, edgebander and assembly benches in production"
            fill
            sizes="(min-width: 1440px) 1360px, 100vw"
            className="u-img object-cover"
          />
        </ImageReveal>

        <Reveal className="mt-6 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
          <p className="text-micro text-mute-50">
            Joinery facility — Dubai Investment Park 1
          </p>
          <p className="text-micro text-mute-30">
            Panel processing, edgebanding, spray and assembly under one roof
          </p>
        </Reveal>
      </div>
    </section>
  )
}
