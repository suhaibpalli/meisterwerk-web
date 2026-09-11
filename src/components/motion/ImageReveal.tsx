'use client'

import { useRef, type ReactNode } from 'react'
import { gsap, useGSAP, EASE } from '@/lib/gsap'
import { useMotionEnabled } from '@/lib/motion-prefs'
import { cn } from '@/lib/utils'

type Props = {
  children: ReactNode
  className?: string
  /** Direction the mask retreats towards. */
  from?: 'bottom' | 'top'
}

/**
 * The image mask reveal — a clip-path curtain plus a slow settle.
 *
 * Two things move together: the mask opens, and the photograph inside eases
 * from 1.06 back to 1.0. The counter-movement is what makes it read as a
 * photograph being uncovered rather than a div being animated. It is the same
 * curtain gesture as the site's opening and its mobile menu, applied at a
 * third scale — one vocabulary, three sizes.
 *
 * The mask lives on a wrapper and the scale on an inner element, so neither
 * transform fights `next/image`'s own `fill` positioning.
 */
export function ImageReveal({ children, className, from = 'bottom' }: Props) {
  const scope = useRef<HTMLDivElement>(null)
  const { enabled, ready } = useMotionEnabled('imageReveal')

  useGSAP(
    () => {
      const root = scope.current
      const inner = root?.firstElementChild
      if (!root || !inner || !ready || !enabled) return

      const closed =
        from === 'bottom' ? 'inset(0% 0% 100% 0%)' : 'inset(100% 0% 0% 0%)'

      gsap
        .timeline({ scrollTrigger: { trigger: root, start: 'top 88%', once: true } })
        .fromTo(
          root,
          { clipPath: closed },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: EASE.veil },
        )
        .fromTo(
          inner,
          { scale: 1.06 },
          { scale: 1, duration: 1.6, ease: EASE.entrance },
          0,
        )
    },
    { scope, dependencies: [enabled, ready, from] },
  )

  return (
    <div ref={scope} className={cn('overflow-hidden', className)}>
      <div className="relative h-full w-full">{children}</div>
    </div>
  )
}
