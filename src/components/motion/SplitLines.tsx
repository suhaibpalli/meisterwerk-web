'use client'

import { useRef, createElement, type ReactNode } from 'react'
import { gsap, useGSAP, SplitText, EASE } from '@/lib/gsap'
import { useMotionEnabled } from '@/lib/motion-prefs'

type Props = {
  children: ReactNode
  as?: 'h1' | 'h2' | 'h3' | 'p'
  className?: string
  delay?: number
}

/**
 * Line-by-line text reveal.
 *
 * Each line gets its own overflow mask and rises into place. This is the one
 * piece of motion on the site that reads as genuinely editorial rather than
 * generic: it mirrors how type is set in print, a line at a time. SplitText
 * became free in GSAP 3.13, so it costs nothing but the plugin weight.
 *
 * The element is rendered directly — no wrapper div — so it can be dropped in
 * anywhere the original heading sat without disturbing layout or margins.
 * `autoSplit` re-splits on font load and resize, which is what stops the
 * classic bug where lines break differently after the webfont arrives.
 */
export function SplitLines({ children, as = 'p', className, delay = 0 }: Props) {
  const el = useRef<HTMLElement>(null)
  const { enabled, ready } = useMotionEnabled('splitText')

  useGSAP(
    () => {
      const target = el.current
      if (!target || !ready || !enabled) return

      const split = new SplitText(target, {
        type: 'lines',
        linesClass: 'mw-line',
        autoSplit: true,
        mask: 'lines',
        onSplit(self) {
          return gsap.from(self.lines, {
            yPercent: 112,
            duration: 1,
            ease: EASE.entrance,
            stagger: 0.09,
            delay,
            scrollTrigger: { trigger: target, start: 'top 88%', once: true },
          })
        },
      })

      return () => split.revert()
    },
    { dependencies: [delay, enabled, ready] },
  )

  return createElement(as, { ref: el, className }, children)
}
