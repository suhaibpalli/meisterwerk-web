'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

/**
 * Live design controls.
 *
 * The purpose is decision-capture, not configuration. Rather than describing
 * motion in an email and asking the client to imagine it, they open the site,
 * turn things on and off against their own content, and send back the one
 * combination they want. That combination is then baked in as the default and
 * the panel disappears from the public build.
 *
 * Everything here degrades to "off", and every animation on the site is a
 * GSAP .from() against the element's natural CSS state — so switching a
 * toggle off can never strand content at opacity 0 or leave a broken layout.
 * That is the property that makes this safe to hand over.
 */

export type MotionLevel = 'restrained' | 'balanced' | 'expressive'
export type Rhythm = 'compact' | 'standard' | 'generous'
export type ImageTone = 'full' | 'soft' | 'deep'

export type Prefs = {
  level: MotionLevel
  veil: boolean
  reveals: boolean
  splitText: boolean
  imageReveal: boolean
  parallax: boolean
  hoverZoom: boolean
  marquee: boolean
  rhythm: Rhythm
  imageTone: ImageTone
  accent: string
}

/** What each master level implies. Individual switches override it after. */
export const LEVELS: Record<MotionLevel, Omit<Prefs, 'level' | 'rhythm' | 'imageTone' | 'accent'>> = {
  restrained: {
    veil: false,
    reveals: true,
    splitText: false,
    imageReveal: false,
    parallax: false,
    hoverZoom: true,
    marquee: true,
  },
  balanced: {
    veil: true,
    reveals: true,
    splitText: true,
    imageReveal: true,
    parallax: false,
    hoverZoom: true,
    marquee: true,
  },
  expressive: {
    veil: true,
    reveals: true,
    splitText: true,
    imageReveal: true,
    parallax: true,
    hoverZoom: true,
    marquee: true,
  },
}

/**
 * The shipped default is `balanced` — the client's written direction asks for
 * "subtle fades, gentle image reveals, smooth transitions" and warns against
 * "excessive parallax, constant movement". Balanced is exactly that line:
 * every reveal, no parallax.
 */
export const DEFAULTS: Prefs = {
  level: 'balanced',
  ...LEVELS.balanced,
  rhythm: 'standard',
  imageTone: 'soft',
  accent: '#5B81B2',
}

/**
 * A multiplier rather than an absolute, so each layout keeps its own density
 * and the dial scales whatever that layout chose.
 */
const RHYTHM: Record<Rhythm, string> = {
  compact: '0.72',
  standard: '1',
  generous: '1.3',
}

const TONE: Record<ImageTone, string> = {
  full: '1',
  soft: '0.88',
  deep: '0.74',
}

const STORAGE = 'mw:prefs'

type Ctx = {
  prefs: Prefs
  ready: boolean
  set: <K extends keyof Prefs>(key: K, value: Prefs[K]) => void
  setLevel: (level: MotionLevel) => void
  reset: () => void
}

const PrefsContext = createContext<Ctx>({
  prefs: DEFAULTS,
  ready: false,
  set: () => {},
  setLevel: () => {},
  reset: () => {},
})

export function MotionPrefsProvider({ children }: { children: ReactNode }) {
  const [prefs, setPrefs] = useState<Prefs>(DEFAULTS)
  // Animations wait for `ready` so the first paint is never the wrong config,
  // and so the server and client agree on the initial markup.
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE)
      if (raw) setPrefs({ ...DEFAULTS, ...(JSON.parse(raw) as Partial<Prefs>) })
    } catch {
      /* Private mode, blocked storage — defaults are correct anyway. */
    }
    setReady(true)
  }, [])

  // Design tokens are plain CSS custom properties, so a runtime override on
  // :root reaches every utility that references them. No re-render needed.
  useEffect(() => {
    if (!ready) return
    const root = document.documentElement
    root.style.setProperty('--rhythm-scale', RHYTHM[prefs.rhythm])
    root.style.setProperty('--img-brightness', TONE[prefs.imageTone])
    root.style.setProperty('--color-accent', prefs.accent)
    root.dataset.hoverZoom = prefs.hoverZoom ? 'on' : 'off'
    try {
      window.localStorage.setItem(STORAGE, JSON.stringify(prefs))
    } catch {
      /* no-op */
    }
  }, [prefs, ready])

  const set = useCallback<Ctx['set']>((key, value) => {
    setPrefs((p) => ({ ...p, [key]: value }))
  }, [])

  const setLevel = useCallback((level: MotionLevel) => {
    setPrefs((p) => ({ ...p, level, ...LEVELS[level] }))
  }, [])

  const reset = useCallback(() => setPrefs(DEFAULTS), [])

  const value = useMemo(
    () => ({ prefs, ready, set, setLevel, reset }),
    [prefs, ready, set, setLevel, reset],
  )

  return <PrefsContext.Provider value={value}>{children}</PrefsContext.Provider>
}

export function useMotionPrefs() {
  return useContext(PrefsContext)
}

/**
 * The single question every animated component asks: should I run?
 * `prefers-reduced-motion` is checked here once so no component can forget it.
 */
export function useMotionEnabled(key: keyof Prefs) {
  const { prefs, ready } = useMotionPrefs()
  const [systemOK, setSystemOK] = useState(true)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const read = () => setSystemOK(!mq.matches)
    read()
    mq.addEventListener('change', read)
    return () => mq.removeEventListener('change', read)
  }, [])

  return { enabled: ready && systemOK && prefs[key] === true, ready }
}
