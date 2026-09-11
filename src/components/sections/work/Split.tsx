import Image from 'next/image'
import Link from 'next/link'
import { PROJECTS, photo } from '@/lib/content'
import { ImageReveal } from '@/components/motion/ImageReveal'
import { Reveal } from '@/components/motion/Reveal'

/**
 * A sticky column of type against a column of images that scrolls past it.
 *
 * The reason this feels more substantial than a grid: a grid asks the eye to
 * scan, and scanning is what you do to a catalogue. A held heading with work
 * moving past it asks the eye to *dwell*, and it keeps the framing sentence on
 * screen for the entire sequence, so every image is read in the context of the
 * claim rather than on its own.
 *
 * It also solves a real problem with a two-up grid on a contractor site: the
 * images are wildly inconsistent in subject — a vitrine next to a storefront
 * next to a workshop — and a grid makes that inconsistency look like a
 * mistake. A single column makes it read as a sequence.
 */
export function WorkSplit() {
  return (
    <section id="work" data-nav="dark" className="pb-block-sm md:pb-block">
      <div className="u-container grid gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-16 lg:gap-24">
        <div className="md:sticky md:top-32 md:h-fit md:self-start">
          <p className="u-eyebrow">Selected work</p>
          <h2 className="mt-8 max-w-[16ch] font-display text-h1 font-light leading-tight tracking-[-0.012em]">
            Thirty stores a year, most of them overnight
          </h2>
          <p className="mt-8 max-w-[38ch] leading-relaxed text-mute-70">
            Trading malls do not close for a fit-out. The programme is agreed
            around the store&rsquo;s hours, not ours, and handover is to the
            maison&rsquo;s snagging standard rather than a main contractor&rsquo;s.
          </p>
          <Link href="/projects" className="u-link mt-10">
            All projects
          </Link>
        </div>

        <div className="space-y-16 md:space-y-24">
          {PROJECTS.map((project) => (
            <article key={project.slug}>
              <Link href={`/projects/${project.slug}`} className="group block">
                <ImageReveal className="relative aspect-[4/5] w-full">
                  <Image
                    src={photo(project.photo, 1400, 1750)}
                    alt={`${project.descriptor}, ${project.location}`}
                    fill
                    sizes="(min-width: 768px) 55vw, 100vw"
                    className="u-img u-zoom object-cover"
                  />
                </ImageReveal>
                <Reveal className="mt-5 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1">
                  <h3 className="font-display text-[1.0625rem] font-light tracking-[-0.005em]">
                    {project.descriptor}
                  </h3>
                  <p className="text-micro tabular-nums text-mute-50">
                    {project.location} · {project.area} · {project.scope} · {project.year}
                  </p>
                </Reveal>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
