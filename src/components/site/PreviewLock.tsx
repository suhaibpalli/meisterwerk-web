import Link from 'next/link'
import { SplitLines } from '@/components/motion/SplitLines'
import { Reveal } from '@/components/motion/Reveal'

/**
 * What a locked route shows. Designed rather than blank — a visitor who clicks
 * Projects should land on something that looks intentional, not broken.
 */
export function PreviewLock({ title }: { title: string }) {
  return (
    <section
      data-nav="dark"
      className="u-container flex min-h-[82svh] flex-col justify-center pt-36 pb-24"
    >
      <Reveal>
        <p className="u-eyebrow">{title} — in design</p>
      </Reveal>

      <SplitLines
        as="h1"
        className="u-display mt-8 max-w-[15ch] text-paper-soft"
        delay={0.1}
      >
        This page is still on the drawing board
      </SplitLines>

      <Reveal delay={0.3}>
        <p className="mt-8 max-w-[46ch] leading-relaxed text-mute-70">
          The home page is ready to review. The remaining pages are designed in
          the next stage, once the direction is signed off.
        </p>
        <Link href="/" className="u-link mt-12">
          Back to the home page
        </Link>
      </Reveal>
    </section>
  )
}
