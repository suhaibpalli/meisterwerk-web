'use client'

import { useRef, type ReactNode } from 'react'
import { gsap, useGSAP, EASE } from '@/lib/gsap'
import { useMotionEnabled } from '@/lib/motion-prefs'

type RevealProps = {
  children: ReactNode
  className?: string
  /** Animate direct children in sequence rather than the container as one. */
  stagger?: boolean
  delay?: number
}

/**
 * The base entrance: opacity plus a 16px rise, 0.9s, easeOutQuart.
 *
 * The resting state is the element's natural CSS state and the animation is a
 * .from(), so content is visible if JavaScript never runs, if the toggle is
 * off, or under prefers-reduced-motion — no FOUC and nothing stranded at
 * opacity 0.
 */
export function Reveal({ children, className, stagger = false, delay = 0 }: RevealProps) {
  const scope = useRef<HTMLDivElement>(null)
  const { enabled, ready } = useMotionEnabled('reveals')

  useGSAP(
    () => {
      const root = scope.current
      if (!root || !ready || !enabled) return

      const targets: gsap.TweenTarget = stagger ? Array.from(root.children) : root

      gsap.from(targets, {
        autoAlpha: 0,
        y: 16,
        duration: 0.9,
        ease: EASE.entrance,
        delay,
        stagger: stagger ? 0.08 : 0,
        scrollTrigger: { trigger: root, start: 'top 85%', once: true },
      })
    },
    { scope, dependencies: [stagger, delay, enabled, ready], revertOnUpdate: true },
  )

  return (
    <div ref={scope} className={className}>
      {children}
    </div>
  )
}
