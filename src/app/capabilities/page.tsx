import type { Metadata } from 'next'
import { PREVIEW_LOCK } from '@/lib/preview'
import { PreviewLock } from '@/components/site/PreviewLock'
import { CAPABILITIES } from '@/lib/content'
import { PageHeader } from '@/components/site/PageHeader'
import { Workshop } from '@/components/sections/Workshop'
import { ContactCta } from '@/components/sections/ContactCta'
import { Reveal } from '@/components/motion/Reveal'

export const metadata: Metadata = {
  title: 'Capabilities',
  description:
    'Fit-out, millwork and joinery, renovation and maintenance for luxury retail across the UAE and Saudi Arabia — delivered to the maison’s drawing and the maison’s tolerance.',
  alternates: { canonical: '/capabilities' },
}

/**
 * Trades, not services.
 *
 * The wording matters more than the layout here. "Concept design", "space
 * planning" and "interior design" would put Meisterwerk in direct competition
 * with their own clients' architects — who are the people specifying them.
 * Everything on this page is named as something built.
 */
export default function CapabilitiesPage() {
  if (PREVIEW_LOCK) return <PreviewLock title="Capabilities" />

  return (
    <>
      <PageHeader
        eyebrow="Capabilities"
        title="Built, not designed"
        lead="The maison’s architect sets the detail. We hold it — through procurement, production, a live mall and handover."
      />

      <section data-nav="dark" className="u-container pb-block-sm md:pb-block">
        {CAPABILITIES.map((item) => (
          <Reveal key={item.index}>
            <article className="grid gap-6 border-t border-hair py-14 md:grid-cols-[auto_1fr_1.4fr] md:gap-16">
              <p className="font-display text-[0.8125rem] tabular-nums text-mute-30">
                {item.index}
              </p>
              <h2 className="font-display text-h1 font-light leading-tight tracking-[-0.012em]">
                {item.title}
              </h2>
              <p className="max-w-[52ch] text-lead leading-relaxed text-mute-70">
                {item.body}
              </p>
            </article>
          </Reveal>
        ))}
      </section>

      <Workshop />
      <ContactCta />
    </>
  )
}
