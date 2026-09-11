'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { gsap, useGSAP, EASE, DUR } from '@/lib/gsap'
import { cn } from '@/lib/utils'
import { OFFICES } from '@/lib/content'

const NAV = [
  { href: '/projects', label: 'Projects' },
  { href: '/capabilities', label: 'Capabilities' },
  { href: '/about', label: 'Studio' },
  { href: '/contact', label: 'Contact' },
]

/**
 * The nav overlays the hero rather than sitting in its own bar, and never
 * gains a background of its own — only its colour inverts as it passes
 * between dark and light sections. Sections declare their own polarity with
 * data-nav="light" / data-nav="dark".
 *
 * The mobile panel uses the *same* gesture as the opening veil — a
 * clip-path curtain — deliberately. A site that opens with a curtain and
 * then slides its menu in from the right is speaking two motion languages;
 * one vocabulary, reused, is what makes a site feel authored rather than
 * assembled. The links rise out of their own masks on the same easing as
 * every other text reveal on the site.
 */
export function Header() {
  const [onLight, setOnLight] = useState(false)
  const [open, setOpen] = useState(false)
  const panel = useRef<HTMLDivElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const pathname = usePathname()

  /* ---- Colour inversion ------------------------------------------- */
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('[data-nav]')
    if (!sections.length) return

    // Probe line sits just below the nav; whichever section crosses it wins.
    const probe = 80

    const read = () => {
      let polarity = 'dark'
      for (const section of sections) {
        const { top, bottom } = section.getBoundingClientRect()
        if (top <= probe && bottom > probe) polarity = section.dataset.nav ?? 'dark'
      }
      setOnLight(polarity === 'light')
    }

    read()
    window.addEventListener('scroll', read, { passive: true })
    window.addEventListener('resize', read, { passive: true })
    return () => {
      window.removeEventListener('scroll', read)
      window.removeEventListener('resize', read)
    }
  }, [])

  /* ---- Close on route change --------------------------------------- */
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  /* ---- Escape to close, and scroll lock ---------------------------- */
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        trigger.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    // Compensating for the scrollbar keeps the wordmark from jumping.
    const gap = window.innerWidth - document.documentElement.clientWidth
    document.documentElement.style.overflow = 'hidden'
    if (gap > 0) document.body.style.paddingRight = `${gap}px`
    return () => {
      document.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [open])

  /* ---- The panel animation ----------------------------------------- */
  useGSAP(
    () => {
      const el = panel.current
      if (!el) return

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const items = el.querySelectorAll('[data-menu-item]')
      const meta = el.querySelectorAll('[data-menu-meta]')

      if (reduced) {
        gsap.set(el, { autoAlpha: open ? 1 : 0, clipPath: 'inset(0% 0% 0% 0%)' })
        gsap.set([items, meta], { yPercent: 0, autoAlpha: 1 })
        return
      }

      if (open) {
        gsap
          .timeline()
          .set(el, { autoAlpha: 1, pointerEvents: 'auto' })
          .fromTo(
            el,
            { clipPath: 'inset(0% 0% 100% 0%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: DUR.veil, ease: EASE.veil },
          )
          .fromTo(
            items,
            { yPercent: 115 },
            { yPercent: 0, duration: 0.85, ease: EASE.entrance, stagger: 0.07 },
            '-=0.72',
          )
          .fromTo(
            meta,
            { autoAlpha: 0, y: 12 },
            { autoAlpha: 1, y: 0, duration: DUR.slow, ease: EASE.entrance, stagger: 0.06 },
            '-=0.45',
          )
      } else {
        gsap
          .timeline()
          .to(el, {
            // Leaves the way it came — upward, not a fade-out.
            clipPath: 'inset(0% 0% 100% 0%)',
            duration: 0.7,
            ease: EASE.veil,
          })
          .set(el, { autoAlpha: 0, pointerEvents: 'none' })
      }
    },
    { dependencies: [open] },
  )

  const tone = open || !onLight ? 'text-paper' : 'text-ink'

  return (
    <header className={cn('fixed inset-x-0 top-0 z-50', tone)}>
      <div className="u-container relative z-10 flex items-center justify-between py-6 md:py-8">
        <Link
          href="/"
          className="font-display text-base font-normal tracking-[0.22em] uppercase transition-colors duration-300 ease-hover"
          aria-label="Meisterwerk — home"
        >
          Meisterwerk
        </Link>

        <nav className="hidden md:block" aria-label="Primary">
          <ul className="flex items-center gap-10">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[0.75rem] uppercase tracking-[0.16em] opacity-70 transition-opacity duration-200 hover:opacity-100"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Two hairlines that cross. No three-line burger — the site has one
            hairline weight and the control is drawn in it. */}
        <button
          ref={trigger}
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="relative h-6 w-7 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          <span
            className={cn(
              'absolute left-0 block h-px w-full bg-current transition-transform duration-500 ease-entrance',
              open ? 'top-1/2 rotate-45' : 'top-[35%]',
            )}
          />
          <span
            className={cn(
              'absolute left-0 block h-px w-full bg-current transition-transform duration-500 ease-entrance',
              open ? 'top-1/2 -rotate-45' : 'top-[65%]',
            )}
          />
        </button>
      </div>

      <div
        ref={panel}
        id="mobile-nav"
        className="fixed inset-0 bg-ink text-paper opacity-0 md:hidden"
        style={{ clipPath: 'inset(0% 0% 100% 0%)', pointerEvents: 'none' }}
      >
        <div className="u-container flex h-full flex-col justify-between pt-32 pb-14">
          <nav aria-label="Mobile">
            <ul>
              {NAV.map((item) => (
                <li key={item.href} className="overflow-hidden py-1">
                  <Link
                    href={item.href}
                    data-menu-item
                    onClick={() => setOpen(false)}
                    className="block font-display text-[clamp(2.25rem,11vw,3.5rem)] font-light leading-[1.15] tracking-[-0.015em]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-6">
            <hr data-menu-meta className="u-rule" />
            <ul data-menu-meta className="flex flex-wrap gap-x-8 gap-y-2">
              {OFFICES.map((office) => (
                <li
                  key={office.city}
                  className="text-[0.75rem] uppercase tracking-[0.16em] text-mute-50"
                >
                  {office.city}
                </li>
              ))}
            </ul>
            <a
              data-menu-meta
              href="mailto:info@meisterwerk.ae"
              className="u-link"
            >
              info@meisterwerk.ae
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
