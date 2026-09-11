'use client'

import { useRef, type ReactNode } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { useMotionEnabled } from '@/lib/motion-prefs'
import { cn } from '@/lib/utils'

type Props = {
  items: readonly string[]
  /** Seconds for one full pass. Larger = slower. */
  duration?: number
  reverse?: boolean
  className?: string
  children?: ReactNode
}

/**
 * An infinite typographic marquee.
 *
 * Why a marquee and not a slider: a slider with arrows and dots asks the
 * visitor to do work to see a client list, and every contractor site in the
 * region ships one. A marquee shows the whole list without being asked, has
 * no controls to style, and — the real reason — it never ends, which is the
 * point being made. The names keep coming.
 *
 * Why names and not logos: Meisterwerk cannot reproduce maison wordmarks
 * without written permission, and a strip of borrowed logos is the oldest
 * cliché in the sector. Set as type in the site's own display face, the
 * list reads as a credential rather than a badge wall.
 *
 * Mechanics: the list is rendered twice and the track is translated exactly
 * -50%, so the seam lands on an identical frame and the loop is invisible.
 * Linear easing — any curve makes a continuous loop visibly pulse.
 */
export function Marquee({ items, duration = 40, reverse = false, className }: Props) {
  const root = useRef<HTMLDivElement>(null)
  const tween = useRef<gsap.core.Tween | null>(null)
  const { enabled, ready } = useMotionEnabled('marquee')

  useGSAP(
    () => {
      const track = root.current?.querySelector<HTMLElement>('[data-track]')
      if (!track || !ready) return

      if (!enabled) {
        // Static, wrapped, fully readable — nothing is lost when it is off.
        track.style.flexWrap = 'wrap'
        track.style.width = '100%'
        return
      }

      track.style.flexWrap = ''
      track.style.width = ''

      tween.current = gsap.fromTo(
        track,
        { xPercent: reverse ? -50 : 0 },
        {
          xPercent: reverse ? 0 : -50,
          duration,
          ease: 'none',
          repeat: -1,
        },
      )
    },
    { scope: root, dependencies: [duration, reverse, enabled, ready] },
  )

  // Slows to a stop rather than stopping dead — a hard pause on a moving
  // line reads as a bug.
  const ease = (to: number) => {
    if (tween.current) gsap.to(tween.current, { timeScale: to, duration: 0.5 })
  }

  return (
    <div
      ref={root}
      className={cn('relative overflow-hidden', className)}
      onMouseEnter={() => ease(0)}
      onMouseLeave={() => ease(1)}
      aria-label="Maisons we have built for"
    >
      <div data-track className="flex w-max items-center will-change-transform">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex items-center" aria-hidden={copy === 1}>
            {items.map((name) => (
              <li
                key={`${copy}-${name}`}
                className="flex items-center whitespace-nowrap font-display text-[clamp(1.5rem,4vw,2.75rem)] font-light tracking-[-0.01em] text-mute-70"
              >
                {name}
                {/* flex-none, or the dot stretches to fill the gap it sits
                    in. Muted rather than accent: the accent has exactly one
                    home on this page and it is the facility block. */}
                <span
                  aria-hidden
                  className="mx-[clamp(1.5rem,4vw,3rem)] h-1 w-1 flex-none rounded-full bg-mute-30"
                />
              </li>
            ))}
          </ul>
        ))}
      </div>

      {/* The list runs off both edges rather than stopping at the container —
          a hard cut implies the list has ended. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32"
        style={{ background: 'linear-gradient(90deg, #0B0B0B 0%, rgba(11,11,11,0) 100%)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32"
        style={{ background: 'linear-gradient(270deg, #0B0B0B 0%, rgba(11,11,11,0) 100%)' }}
      />
    </div>
  )
}
