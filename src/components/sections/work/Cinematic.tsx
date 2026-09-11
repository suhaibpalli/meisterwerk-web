import Image from 'next/image'
import Link from 'next/link'
import { PROJECTS, photo } from '@/lib/content'
import { Parallax } from '@/components/motion/Parallax'
import { Reveal } from '@/components/motion/Reveal'

/**
 * One project, one screen.
 *
 * The risk with a cinematic sequence is that it turns a portfolio into a
 * screensaver — beautiful, and useless to the person who has to decide whether
 * to invite you to tender. So the metadata is not dropped to make the picture
 * cleaner: every screen still carries location, area, scope and year on the
 * baseline. The image is given the screen; the facts are given the edge of it.
 *
 * Snapping is `proximity`, never `mandatory`. Mandatory snapping fights the
 * user's own scroll, traps trackpads mid-gesture and is the single most common
 * reason this treatment gets abandoned after launch.
 */
export function WorkCinematic() {
  return (
    <section id="work" data-nav="dark">
      <div className="u-container pb-10">
        <p className="u-eyebrow">Selected work</p>
      </div>

      {PROJECTS.map((project) => (
        <article
          key={project.slug}
          className="relative flex h-[100svh] snap-start items-end"
        >
          <Parallax className="absolute inset-0" amount={12}>
            <Image
              src={photo(project.photo, 2400, 1350, 82)}
              alt={`${project.descriptor}, ${project.location}`}
              fill
              sizes="100vw"
              className="u-img object-cover"
            />
          </Parallax>
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(11,11,11,0.30) 0%, rgba(11,11,11,0.10) 40%, rgba(11,11,11,0.85) 100%)',
            }}
          />

          <div className="u-container relative pb-16 md:pb-20">
            <Reveal>
              <Link href={`/projects/${project.slug}`} className="group block">
                <h3 className="max-w-[16ch] font-display text-[clamp(1.75rem,3.4vw,3rem)] font-light leading-tight tracking-[-0.015em] text-paper-soft">
                  {project.descriptor}
                </h3>
                <div className="mt-5 flex flex-wrap gap-x-8 gap-y-1 text-micro text-mute-70">
                  <span>{project.location}</span>
                  <span className="tabular-nums">{project.area}</span>
                  <span>{project.scope}</span>
                  <span className="tabular-nums">{project.year}</span>
                </div>
              </Link>
            </Reveal>
          </div>
        </article>
      ))}
    </section>
  )
}
