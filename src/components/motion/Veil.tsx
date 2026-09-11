'use client'

import { useRef } from 'react'
import { gsap, useGSAP, EASE, DUR } from '@/lib/gsap'
import { useMotionEnabled } from '@/lib/motion-prefs'

/**
 * The opening gesture — a curtain drawn up off the page on first load.
 *
 * One deliberate moment, not constant movement:
 *
 *  1. It runs once per session. A returning visitor, or anyone navigating
 *     back, never waits again.
 *  2. It never blocks. The page is fully rendered beneath; the veil is a
 *     sibling overlay that removes itself on completion.
 *  3. It is skipped entirely under prefers-reduced-motion, and when the
 *     client switches it off.
 *
 * The wordmark rises as the curtain leaves — the two are one gesture, not a
 * loading screen followed by a page.
 */
export function Veil() {
  const root = useRef<HTMLDivElement>(null)
  const { enabled, ready } = useMotionEnabled('veil')

  useGSAP(
    () => {
      const el = root.current
      if (!el || !ready) return

      const seen = window.sessionStorage.getItem('mw:veil') === 'seen'

      // A tab opened in the background should not greet the visitor with a
      // curtain several seconds later — by then they have arrived, not loaded.
      const backgrounded = document.visibilityState === 'hidden'

      if (!enabled || seen || backgrounded) {
        el.remove()
        return
      }

      window.sessionStorage.setItem('mw:veil', 'seen')
      document.documentElement.style.overflow = 'hidden'

      const finish = () => {
        document.documentElement.style.overflow = ''
        el.remove()
      }

      /* Browsers throttle requestAnimationFrame in hidden or backgrounded
         tabs, which would leave the timeline part-played and the page locked
         behind it. A hard deadline guarantees the page is never held by its
         own opening — the animation is decoration, and decoration is not
         allowed to fail closed. */
      const deadline = window.setTimeout(finish, 4000)

      gsap
        .timeline({
          onComplete: () => {
            window.clearTimeout(deadline)
            finish()
          },
        })
        .to('[data-veil-mark]', {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: EASE.entrance,
        })
        .to('[data-veil-mark]', { autoAlpha: 0, duration: 0.4, ease: EASE.hover }, '+=0.25')
        .to(
          el,
          {
            // Drawn up from the bottom edge — a curtain, not a fade.
            clipPath: 'inset(0% 0% 100% 0%)',
            duration: DUR.veil,
            ease: EASE.veil,
          },
          '-=0.1',
        )
    },
    { scope: root, dependencies: [enabled, ready] },
  )

  return (
    <div
      ref={root}
      aria-hidden
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
      style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
    >
      <span
        data-veil-mark
        className="font-display text-lg tracking-[0.42em] uppercase text-paper opacity-0"
        style={{ transform: 'translateY(12px)' }}
      >
        Meisterwerk
      </span>
    </div>
  )
}
