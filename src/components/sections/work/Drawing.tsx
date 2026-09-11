import Image from 'next/image'
import Link from 'next/link'
import { PROJECTS, photo } from '@/lib/content'
import { ImageReveal } from '@/components/motion/ImageReveal'
import { Reveal } from '@/components/motion/Reveal'
import { SheetHead } from '@/components/brand/SheetHead'

/**
 * Work as a set of plates rather than a grid of tiles.
 *
 * The two-up, zero-gutter, edge-to-edge tile grid is the other half of the
 * fashion template, and it carries an assumption that does not hold here: that
 * the picture is the product. For a maison it is — you are looking at the bag.
 * For a fit-out contractor the picture is evidence, and evidence needs a
 * caption, a number and a dimension.
 *
 * So each project is a numbered plate: indexed, ruled off, with its metadata
 * set as an annotation block beneath rather than a line of small grey text.
 * The column rule between them is the fluting from the logo's column.
 */
export function WorkDrawing() {
  return (
    <section id="work" data-nav="dark" className="pb-block-sm md:pb-block">
      <div className="u-container">
        <SheetHead
          index="02"
          title="Selected work"
          aside={
            <Link href="/projects" className="u-link text-[0.6875rem]">
              All projects
            </Link>
          }
        />

        <div className="mt-12 grid gap-x-10 gap-y-14 md:grid-cols-2 md:gap-y-20">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.slug}>
              <article className={i % 2 === 1 ? 'md:u-flute md:pl-10' : ''}>
                <Link href={`/projects/${project.slug}`} className="group block">
                  <ImageReveal className="relative aspect-[4/3] w-full">
                    <Image
                      src={photo(project.photo, 1400, 1050)}
                      alt={`${project.descriptor}, ${project.location}`}
                      fill
                      sizes="(min-width: 768px) 46vw, 100vw"
                      className="u-img u-zoom object-cover"
                    />
                  </ImageReveal>

                  <div className="mt-5 flex items-baseline gap-4">
                    <span className="font-display text-[0.6875rem] tabular-nums tracking-[0.16em] text-accent">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-display text-[1.125rem] font-light tracking-[-0.005em]">
                      {project.descriptor}
                    </h3>
                  </div>

                  {/* The annotation block: four facts, ruled, aligned, in the
                      order a contractor writes them. */}
                  <dl className="mt-5 grid grid-cols-2 gap-x-8 gap-y-4 border-t border-hair pt-4 sm:grid-cols-4">
                    {[
                      ['Location', project.location],
                      ['Area', project.area],
                      ['Scope', project.scope],
                      ['Year', project.year],
                    ].map(([term, value]) => (
                      <div key={term}>
                        <dt className="text-[0.625rem] uppercase tracking-[0.16em] text-mute-30">
                          {term}
                        </dt>
                        <dd className="mt-1.5 text-micro tabular-nums text-mute-70">
                          {value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
