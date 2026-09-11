import Image from 'next/image'
import { Parallax } from '@/components/motion/Parallax'
import { SplitLines } from '@/components/motion/SplitLines'

/**
 * Full-bleed image section at 85vh. The second half of the FLOS rhythm:
 * full-height image, short text breath, tall image, repeat.
 */
export function ImageBreak() {
  return (
    <section id="craft" data-nav="dark" className="relative h-[85svh] min-h-[480px] w-full">
      <Parallax className="absolute inset-0" amount={16}>
        <Image
          src="https://images.unsplash.com/photo-1774110073583-2475ab5ed8b2?auto=format&fit=crop&w=2400&h=1500&q=85"
          alt="A completed vitrine — cove-lit interior, mitred joints and a seamless back panel"
          fill
          sizes="100vw"
          className="u-img object-cover"
        />
      </Parallax>

      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, rgba(11,11,11,0.35), rgba(11,11,11,0.75))' }}
      />
      <div className="u-container absolute inset-x-0 bottom-0 pb-16 md:pb-20">
        <SplitLines
          as="p"
          className="max-w-[34ch] font-display text-h2 font-light leading-snug text-paper-soft"
        >
          A mitred brass reveal is either right or it is visible. There is no
          third outcome.
        </SplitLines>
      </div>
    </section>
  )
}
