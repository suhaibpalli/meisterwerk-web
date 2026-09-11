import Link from 'next/link'
import { OFFICES } from '@/lib/content'

export function Footer() {
  return (
    <footer data-nav="dark" className="pt-block-sm pb-12">
      <div className="u-container">
        <hr className="u-rule" />

        <div className="grid gap-12 pt-16 md:grid-cols-[1.2fr_2fr]">
          <div>
            {/* MEISTER blue, WERK white — the split is in the supplied
                artwork, and the footer sits permanently on ink, so this is the
                one place it can be reproduced at full contrast. The brief asks
                for the blue "sparingly"; the wordmark is what it is for. */}
            <p className="font-display text-2xl font-light tracking-[0.2em] uppercase">
              <span className="text-accent">Meister</span>
              <span>werk</span>
            </p>
            <p className="mt-4 max-w-[32ch] text-mute-50">
              Aesthetics through ethics.
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {OFFICES.map((office) => (
              <div key={office.city}>
                <p className="u-eyebrow">{office.city}</p>
                <address className="mt-4 not-italic text-[0.8125rem] leading-relaxed text-mute-70">
                  {office.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.75rem] tracking-[0.08em] text-mute-30">
            © {new Date().getFullYear()} Meisterwerk Fitout LLC
          </p>
          <Link href="/contact" className="u-link">
            Start a conversation
          </Link>
        </div>
      </div>
    </footer>
  )
}
