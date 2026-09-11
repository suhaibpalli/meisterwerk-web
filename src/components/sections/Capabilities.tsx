import { CAPABILITIES } from '@/lib/content'
import { Reveal } from '@/components/motion/Reveal'

export function Capabilities() {
  return (
    <section
      id="capabilities"
      data-nav="dark"
      className="py-block-sm md:py-block"
    >
      <div className="u-container">
        <p className="u-eyebrow">Capabilities</p>

        <div className="mt-16">
          {CAPABILITIES.map((item) => (
            <Reveal key={item.index}>
              <article className="grid gap-6 border-t border-hair py-12 md:grid-cols-[auto_1fr_1.4fr] md:gap-16">
                <p className="font-display text-[0.8125rem] text-mute-30">
                  {item.index}
                </p>
                <h3 className="font-display text-h2 font-light leading-tight tracking-[-0.01em]">
                  {item.title}
                </h3>
                <p className="max-w-[52ch] text-mute-70">{item.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
