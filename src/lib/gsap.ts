'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

// Registered once, in one place. SplitText is free as of GSAP 3.13.
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)

/**
 * Two easing curves for the whole site, matched to the client's references.
 *
 * GSAP's power scale: power1 = quad, power2 = cubic, power3 = quart, power4 = quint.
 *   entrance -> easeOutQuart    cubic-bezier(0.165, 0.84, 0.44, 1)   (Bang & Olufsen)
 *   hover    -> easeInOutQuad   cubic-bezier(0.455, 0.03, 0.515, 0.955)  (FLOS)
 *   veil     -> easeInOutQuart  reserved for the one full-screen gesture
 */
export const EASE = {
  entrance: 'power3.out',
  hover: 'power1.inOut',
  veil: 'power3.inOut',
} as const

export const DUR = {
  fast: 0.2,
  base: 0.4,
  slow: 0.5,   // ceiling for hovers and micro-interactions
  reveal: 0.9, // entrances
  veil: 1.1,   // the single full-screen gesture
} as const

export { gsap, ScrollTrigger, SplitText, useGSAP }
