'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { PROJECTS, photo } from '@/lib/content'
import { gsap, useGSAP, EASE } from '@/lib/gsap'
import { Reveal } from '@/components/motion/Reveal'

/**
 * The archive, set as a ledger rather than a gallery.
 *
 * Two arguments for this over image tiles:
 *
 * 1. It scales. A gallery of four looks considered; a gallery of thirty looks
 *    like a stock library. Meisterwerk will publish thirty and then a hundred,
 *    and a ledger is the only form that gets *better* as the list grows — the
 *    length is the argument.
 * 2. It is the honest form for confidential work. Half these projects can
 *    never be named, and a row that reads "Swiss watch maison · Dubai Mall ·
 *    340 sqm · full fit-out" carries every fact a procurement lead needs
 *    without a single identifying photograph. A tile with a blurred image and
 *    no name just looks like something is missing.
 *
 * The photograph moves to hover, where it supports the row instead of
 * competing with it. On touch devices there is no hover, so each row carries
 * its own small still — the information never depends on the interaction.
 */
export function WorkIndex() {
  const scope = useRef<HTMLDivElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<number | null>(null)

  useGSAP(
    () => {
      const el = panel.current
      if (!el) return

      // Hover-follow is for pointers only. A coarse pointer never fires these
      // events, and prefers-reduced-motion means the panel simply never moves.
      const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (!fine) return

      const xTo = gsap.quickTo(el, 'x', { duration: reduced ? 0 : 0.6, ease: EASE.entrance })
      const yTo = gsap.quickTo(el, 'y', { duration: reduced ? 0 : 0.6, ease: EASE.entrance })

      const move = (e: PointerEvent) => {
        xTo(e.clientX + 32)
        yTo(e.clientY - 150)
      }

      const root = scope.current
      root?.addEventListener('pointermove', move)
      return () => root?.removeEventListener('pointermove', move)
    },
    { scope },
  )

  return (
    <section id="work" data-nav="dark" className="pb-block-sm md:pb-block">
      <div className="u-container">
        <div className="mb-10 flex items-baseline justify-between">
          <p className="u-eyebrow">Selected work</p>
          <Link href="/projects" className="u-link">
            All projects
          </Link>
        </div>

        <div ref={scope} onPointerLeave={() => setActive(null)}>
          {/* Column headings, set as a caption rather than a table header —
              the rows are links, not data cells. */}
          <div className="hidden border-b border-hair pb-3 text-[0.6875rem] uppercase tracking-[0.16em] text-mute-30 md:grid md:grid-cols-[4.5rem_1.4fr_1fr_6rem_1fr] md:gap-8">
            <span>Year</span>
            <span>Project</span>
            <span>Location</span>
            <span>Area</span>
            <span>Scope</span>
          </div>

          <Reveal stagger>
            {PROJECTS.map((project, i) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                onPointerEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="group block border-b border-hair py-6 transition-colors duration-300 ease-hover hover:border-white/25 md:grid md:grid-cols-[4.5rem_1.4fr_1fr_6rem_1fr] md:items-baseline md:gap-8 md:py-7"
              >
                <span className="text-micro tabular-nums text-mute-30">
                  {project.year}
                </span>
                <span className="mt-2 block font-display text-[clamp(1.25rem,2vw,1.75rem)] font-light leading-tight tracking-[-0.01em] transition-opacity duration-300 ease-hover md:mt-0 group-hover:opacity-100">
                  {project.descriptor}
                </span>
                <span className="mt-1 block text-micro text-mute-70 md:mt-0">
                  {project.location}
                </span>
                <span className="mt-1 block text-micro tabular-nums text-mute-50 md:mt-0">
                  {project.area}
                </span>
                <span className="mt-1 block text-micro text-mute-50 md:mt-0">
                  {project.scope}
                </span>

                {/* Touch fallback: the still lives in the row itself. */}
                <span className="relative mt-5 block aspect-[16/9] w-full overflow-hidden md:hidden">
                  <Image
                    src={photo(project.photo, 1000, 562)}
                    alt={`${project.descriptor}, ${project.location}`}
                    fill
                    sizes="100vw"
                    className="u-img object-cover"
                  />
                </span>
              </Link>
            ))}
          </Reveal>
        </div>
      </div>

      {/* One panel, four stacked stills, cross-faded. Rendering a single
          element and swapping its src would flash on every row change. */}
      <div
        ref={panel}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-30 hidden h-[300px] w-[230px] md:block"
      >
        {PROJECTS.map((project, i) => (
          <div
            key={project.slug}
            className="absolute inset-0 transition-opacity duration-500 ease-hover"
            style={{ opacity: active === i ? 1 : 0 }}
          >
            <Image
              src={photo(project.photo, 600, 780)}
              alt=""
              fill
              sizes="230px"
              className="u-img object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
