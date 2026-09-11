import type { Metadata } from 'next'
import { CONTACT, OFFICES } from '@/lib/content'
import { PageHeader } from '@/components/site/PageHeader'
import { Reveal } from '@/components/motion/Reveal'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Meisterwerk Fitout LLC — Dubai, Riyadh and New Delhi. Send the mall, the area, the drawing set and the trading date.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Tell us what you are opening"
        lead={CONTACT.lead}
      />

      <section data-nav="dark" className="u-container pb-block-sm md:pb-block">
        <div className="grid gap-12 md:grid-cols-12 md:gap-0">
          <Reveal className="md:col-span-7 md:pr-16">
            <p className="max-w-[54ch] text-lead leading-relaxed text-mute-70">
              {CONTACT.body}
            </p>

            <div className="mt-12 space-y-6">
              <div className="border-t border-hair pt-4">
                <p className="text-[0.625rem] uppercase tracking-[0.18em] text-mute-30">
                  Email
                </p>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="mt-2 inline-block font-display text-[clamp(1.25rem,2.4vw,1.875rem)] font-light tracking-[-0.01em] transition-opacity duration-300 ease-hover hover:opacity-70"
                >
                  {CONTACT.email}
                </a>
              </div>
              <div className="border-t border-hair pt-4">
                <p className="text-[0.625rem] uppercase tracking-[0.18em] text-mute-30">
                  Telephone
                </p>
                <a
                  href={`tel:${CONTACT.telephone.replace(/\s/g, '')}`}
                  className="mt-2 inline-block whitespace-nowrap font-display text-[clamp(1.25rem,2.4vw,1.875rem)] font-light tabular-nums tracking-[-0.01em] transition-opacity duration-300 ease-hover hover:opacity-70"
                >
                  {CONTACT.telephone}
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal stagger className="space-y-10 md:col-span-4 md:col-start-9">
            {OFFICES.map((office) => (
              <div key={office.city} className="border-t border-hair pt-4">
                <p className="u-eyebrow">{office.city}</p>
                <address className="mt-3 not-italic leading-relaxed text-mute-70">
                  {office.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                  <a
                    href={`tel:${office.telephone.replace(/\s/g, '')}`}
                    className="mt-2 inline-block whitespace-nowrap tabular-nums text-mute-50 transition-colors duration-300 ease-hover hover:text-paper"
                  >
                    {office.telephone}
                  </a>
                </address>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  )
}
