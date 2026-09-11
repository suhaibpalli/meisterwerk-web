import type { Metadata } from 'next'
import { STUDIO } from '@/lib/content'
import { PageHeader } from '@/components/site/PageHeader'
import { Workshop } from '@/components/sections/Workshop'
import { Facility } from '@/components/sections/Facility'
import { Maisons } from '@/components/sections/Maisons'
import { ContactCta } from '@/components/sections/ContactCta'
import { Reveal } from '@/components/motion/Reveal'
import { SplitLines } from '@/components/motion/SplitLines'

export const metadata: Metadata = {
  title: 'Studio',
  description:
    'Meisterwerk has built boutiques for luxury maisons in the Emirates since 2012, with joinery, vitrines and lacquer produced in its own 50,000 sq ft facility in Dubai Investment Park.',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Studio"
        title="We are not the architect"
        lead="We are the reason the drawing survives contact with the building."
      />

      <section data-nav="dark" className="u-container pb-block-sm md:pb-block">
        <div className="grid gap-12 md:grid-cols-12 md:gap-0">
          <div className="md:col-span-7 md:pr-16">
            {STUDIO.body.map((paragraph, i) => (
              <Reveal key={paragraph.slice(0, 24)} delay={i * 0.05}>
                <p className="mt-6 max-w-[58ch] leading-relaxed text-mute-70 first:mt-0">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="principles" data-nav="dark" className="u-container pb-block-sm md:pb-block">
        <p className="u-eyebrow">How we work</p>
        <div className="mt-12">
          {STUDIO.principles.map((principle) => (
            <Reveal key={principle.index}>
              <article className="grid gap-6 border-t border-hair py-12 md:grid-cols-[auto_1fr_1.4fr] md:gap-16">
                <p className="font-display text-[0.8125rem] tabular-nums text-mute-30">
                  {principle.index}
                </p>
                <h2 className="font-display text-h2 font-light leading-tight tracking-[-0.01em]">
                  {principle.title}
                </h2>
                <p className="max-w-[52ch] leading-relaxed text-mute-70">
                  {principle.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section data-nav="dark" className="u-container pb-block-sm md:pb-block">
        <SplitLines
          as="p"
          className="max-w-[34ch] font-display text-h2 font-light leading-snug tracking-[-0.01em] text-paper-soft"
        >
          {STUDIO.lead}
        </SplitLines>
      </section>

      <Workshop />
      <Facility />
      <Maisons />
      <ContactCta />
    </>
  )
}
