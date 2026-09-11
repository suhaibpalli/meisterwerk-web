import { Reveal } from '@/components/motion/Reveal'

const FIGURES = [
  { value: '50,000', unit: 'sq ft', label: 'Own facility, Dubai Investment Park' },
  { value: '2012', unit: '', label: 'Operating in the Emirates since' },
  { value: '3', unit: '', label: 'Offices — Dubai, Riyadh, New Delhi' },
]

/**
 * The one accent block on the page.
 *
 * Bang & Olufsen uses a single saturated block once per page and nowhere
 * else; the brief asks for #5B81B2 "used sparingly". This is the whole
 * budget for it — the accent appears nowhere above or below.
 *
 * Figures are set as oversized type rather than counting up. Counters are
 * a B2B-services convention and read as the opposite of quiet luxury.
 */
export function Facility() {
  return (
    <section
      id="facility"
      data-nav="dark"
      className="bg-accent py-block-sm md:py-block"
    >
      <div className="u-container">
        <Reveal>
          <p className="max-w-[40ch] font-display text-h2 font-light leading-snug">
            Everything that matters is made in-house. Nothing that matters is
            subcontracted.
          </p>
        </Reveal>

        <Reveal stagger className="mt-20 grid gap-12 sm:grid-cols-3">
          {FIGURES.map((figure) => (
            <div key={figure.label}>
              <p className="font-display text-[clamp(2.5rem,5vw,3.75rem)] font-light leading-none tracking-[-0.02em] tabular-nums">
                {figure.value}
                {figure.unit ? (
                  <span className="ml-2 align-baseline text-[0.3em] tracking-[0.12em] uppercase opacity-70">
                    {figure.unit}
                  </span>
                ) : null}
              </p>
              <p className="mt-4 max-w-[24ch] text-[0.8125rem] leading-relaxed opacity-80">
                {figure.label}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
