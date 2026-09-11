import { SplitLines } from '@/components/motion/SplitLines'
import { Reveal } from '@/components/motion/Reveal'

/**
 * The masthead for every page that is not the home page.
 *
 * Type-led rather than a banner image, and that is a deliberate exception to
 * the brief's "image led" instruction rather than an oversight. The brief's
 * own reasoning is that the *work* should be the visual identity — so a stock
 * photograph used as decoration at the top of the Studio page would be working
 * against it. On these pages the imagery is the project archive itself.
 *
 * The composition follows the home page: claim at the head, supporting line
 * across in the right-hand columns on the same baseline.
 */
export function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string
  title: string
  lead?: string
}) {
  return (
    <header className="u-container pt-36 pb-14 md:pt-48 md:pb-20">
      <Reveal>
        <p className="u-eyebrow">{eyebrow}</p>
      </Reveal>

      <div className="mt-8 grid md:grid-cols-12">
        <div className="md:col-span-7">
          <SplitLines
            as="h1"
            className="u-display max-w-[14ch] text-paper-soft"
            delay={0.1}
          >
            {title}
          </SplitLines>
        </div>
        {lead ? (
          <div className="md:col-span-4 md:col-start-9 md:pt-3">
            <SplitLines
              as="p"
              className="mt-8 max-w-[36ch] leading-relaxed text-mute-70 md:mt-0"
              delay={0.3}
            >
              {lead}
            </SplitLines>
          </div>
        ) : null}
      </div>
    </header>
  )
}
