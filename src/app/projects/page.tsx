import type { Metadata } from 'next'
import { PREVIEW_LOCK } from '@/lib/preview'
import { PreviewLock } from '@/components/site/PreviewLock'
import Image from 'next/image'
import Link from 'next/link'
import { PROJECTS, photo } from '@/lib/content'
import { PageHeader } from '@/components/site/PageHeader'
import { ImageReveal } from '@/components/motion/ImageReveal'
import { Reveal } from '@/components/motion/Reveal'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Boutique fit-out, millwork and facade projects delivered for luxury maisons across the UAE and Saudi Arabia. Scope, area and programme for each.',
  alternates: { canonical: '/projects' },
}

/**
 * The archive.
 *
 * Ratio alternates down the page — a wide plate, then a portrait pair — for
 * the same reason the home page does it: a uniform grid makes every project
 * look equally important, and at thirty entries it reads as a catalogue. The
 * alternation also forces a second crop of each photograph, which is what
 * "carefully cropped architectural imagery" actually requires in practice.
 */
export default function ProjectsPage() {
  if (PREVIEW_LOCK) return <PreviewLock title="Projects" />

  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Stores built for the maisons"
        lead="Scope, area and programme for each. Names appear where the maison has granted permission; the rest are anonymised, with the work intact."
      />

      <div className="u-container space-y-20 pb-block-sm md:space-y-28 md:pb-block">
        {PROJECTS.map((project, i) => {
          const wide = i % 3 === 0
          return (
            <Reveal key={project.slug}>
              <article>
                <Link href={`/projects/${project.slug}`} className="group block">
                  <ImageReveal
                    className={`relative w-full ${wide ? 'aspect-[16/10] md:aspect-[21/9]' : 'aspect-[4/3] md:aspect-[3/2]'}`}
                  >
                    <Image
                      src={
                        wide
                          ? photo(project.photo, 2400, 1030, 82)
                          : photo(project.photo, 1800, 1200)
                      }
                      alt={`${project.descriptor}, ${project.location}`}
                      fill
                      priority={i === 0}
                      sizes="100vw"
                      className="u-img u-zoom object-cover"
                    />
                  </ImageReveal>

                  <div className="mt-6 grid gap-6 md:grid-cols-12">
                    <h2 className="font-display text-h2 font-light tracking-[-0.01em] md:col-span-5">
                      {project.descriptor}
                    </h2>
                    <p className="max-w-[52ch] leading-relaxed text-mute-70 md:col-span-5">
                      {project.description}
                    </p>
                    <p className="text-[0.6875rem] uppercase leading-relaxed tracking-[0.18em] tabular-nums text-mute-50 md:col-span-2">
                      {project.location}
                      <br />
                      {project.area}
                      <br />
                      {project.scope}
                      <br />
                      {project.programme}
                    </p>
                  </div>
                </Link>
              </article>
            </Reveal>
          )
        })}
      </div>
    </>
  )
}
