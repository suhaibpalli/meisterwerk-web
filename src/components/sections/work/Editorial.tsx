import Image from 'next/image'
import Link from 'next/link'
import { PROJECTS, photo } from '@/lib/content'
import { ImageReveal } from '@/components/motion/ImageReveal'
import { Reveal } from '@/components/motion/Reveal'

const [lead, ...rest] = PROJECTS

/**
 * Image-led work, with no cards, borders or rules — as the brief requires.
 *
 * The departure from the reference sites is the *ratio sequence*. The template
 * everyone reaches for is a uniform grid of identical tiles, usually two-up and
 * usually butted edge to edge with no gutter. It is fast to build and it makes
 * every project look equally important, which is exactly what a portfolio
 * should not do.
 *
 * Here one project is given the full width at 21:9 and the rest sit three-up in
 * portrait, with a real gutter between them. That does three things: it creates
 * a hierarchy, it forces "carefully cropped architectural imagery" rather than
 * one crop applied to everything, and the change of shape halfway down the
 * section is what stops a long page from reading as a catalogue.
 */
export function WorkEditorial() {
  return (
    <section id="work" data-nav="dark" className="pb-block-sm md:pb-block">
      <div className="u-container mb-10 flex items-baseline justify-between md:mb-14">
        <p className="u-eyebrow">Selected work</p>
        <Link href="/projects" className="u-link">
          All projects
        </Link>
      </div>

      <Reveal>
        <Link href={`/projects/${lead.slug}`} className="group block">
          <ImageReveal className="relative aspect-[16/10] w-full md:aspect-[21/9]">
            <Image
              src={photo(lead.photo, 2400, 1030, 82)}
              alt={`${lead.descriptor}, ${lead.location}`}
              fill
              priority
              sizes="100vw"
              className="u-img u-zoom object-cover"
            />
          </ImageReveal>
          <div className="u-container mt-6 flex flex-wrap items-baseline justify-between gap-x-10 gap-y-2">
            <h3 className="font-display text-h2 font-light tracking-[-0.01em]">
              {lead.descriptor}
            </h3>
            <p className="text-[0.6875rem] uppercase tracking-[0.2em] tabular-nums text-mute-50">
              {lead.location} · {lead.area} · {lead.scope} · {lead.year}
            </p>
          </div>
        </Link>
      </Reveal>

      <div className="u-container mt-20 grid gap-x-8 gap-y-14 sm:grid-cols-2 md:mt-28 md:grid-cols-3 md:gap-x-10">
        {rest.map((project) => (
          <Reveal key={project.slug}>
            <Link href={`/projects/${project.slug}`} className="group block">
              <ImageReveal className="relative aspect-[3/4] w-full">
                <Image
                  src={photo(project.photo, 900, 1200)}
                  alt={`${project.descriptor}, ${project.location}`}
                  fill
                  sizes="(min-width: 768px) 30vw, (min-width: 640px) 46vw, 100vw"
                  className="u-img u-zoom object-cover"
                />
              </ImageReveal>
              <h3 className="mt-5 font-display text-[1.0625rem] font-light tracking-[-0.005em]">
                {project.descriptor}
              </h3>
              <p className="mt-2 text-[0.6875rem] uppercase tracking-[0.18em] tabular-nums text-mute-50">
                {project.location} · {project.area}
              </p>
              <p className="mt-1 text-[0.6875rem] uppercase tracking-[0.18em] text-mute-30">
                {project.scope}
              </p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
