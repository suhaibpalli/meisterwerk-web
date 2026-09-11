import Link from 'next/link'
import { Reveal } from '@/components/motion/Reveal'

export function ContactCta() {
  return (
    <section id="contact" data-nav="dark" className="pb-block-sm md:pb-block">
      <div className="u-container">
        <hr className="u-rule" />
        <Reveal>
          <div className="grid gap-10 pt-16 md:grid-cols-[1.4fr_1fr] md:items-end">
            <h2 className="u-display max-w-[16ch]">
              Tell us what you are opening
            </h2>
            <div className="md:pb-3">
              <p className="max-w-[36ch] text-mute-70">
                Drawings, programme, mall, handover date. We will tell you what
                it takes.
              </p>
              <Link href="/contact" className="u-link mt-8">
                Start a conversation
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
