'use client'

import { useRef, type ReactNode } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { useMotionEnabled } from '@/lib/motion-prefs'
import { cn } from '@/lib/utils'

type Props = {
  children: ReactNode
  className?: string
  /** Total travel as a percentage of the element's own height. */
  amount?: number
}

/**
 * Scroll parallax on a full-bleed image.
 *
 * Off by default. The client's written direction names parallax specifically
 * as something to avoid, so this exists as a switch they can try rather than
 * a decision made for them. The travel is deliberately small — the image is
 * oversized by the same amount it moves, so no edge is ever exposed, and the
 * scrub is tied to scroll position rather than run on a timer, which is the
 * difference between parallax that feels like weight and parallax that feels
 * like lag.
 */
export function Parallax({ children, className, amount = 12 }: Props) {
  const scope = useRef<HTMLDivElement>(null)
  const { enabled, ready } = useMotionEnabled('parallax')

  useGSAP(
    () => {
      const root = scope.current
      const inner = root?.firstElementChild as HTMLElement | null
      if (!root || !inner || !ready || !enabled) return

      gsap.set(inner, { height: `${100 + amount}%`, top: `-${amount / 2}%` })
      gsap.fromTo(
        inner,
        { yPercent: -amount / 2 },
        {
          yPercent: amount / 2,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      )
    },
    { scope, dependencies: [enabled, ready, amount] },
  )

  return (
    <div ref={scope} className={cn('relative overflow-hidden', className)}>
      <div className="absolute inset-0">{children}</div>
    </div>
  )
}
