'use client'

import { useEffect, useState } from 'react'
import {
  LAYOUTS,
  LAYOUT_COOKIE,
  DEFAULT_LAYOUT,
  resolveLayout,
  type LayoutKey,
} from '@/lib/layouts'
import {
  useMotionPrefs,
  DEFAULTS,
  type MotionLevel,
  type Prefs,
  type Rhythm,
  type ImageTone,
} from '@/lib/motion-prefs'

const LEVELS: { id: MotionLevel; label: string; note: string }[] = [
  { id: 'restrained', label: 'Restrained', note: 'Fades only. No opening, no parallax.' },
  { id: 'balanced', label: 'Balanced', note: 'The brief, read literally. Shipped default.' },
  { id: 'expressive', label: 'Expressive', note: 'Adds scroll parallax on full-bleed imagery.' },
]

const SWITCHES: { key: keyof Prefs; label: string; note: string }[] = [
  { key: 'veil', label: 'Opening curtain', note: 'Once per visit, on first load only.' },
  { key: 'reveals', label: 'Scroll reveals', note: 'Sections fade and rise as they enter.' },
  { key: 'splitText', label: 'Headline line reveal', note: 'Type rises a line at a time.' },
  { key: 'imageReveal', label: 'Image mask reveal', note: 'Photographs uncover as you reach them.' },
  { key: 'parallax', label: 'Scroll parallax', note: 'Full-bleed images drift against the scroll.' },
  { key: 'hoverZoom', label: 'Hover on project tiles', note: 'Slight push-in on the image.' },
  { key: 'marquee', label: 'Maison list in motion', note: 'Off renders the same names, static.' },
]

const RHYTHMS: { id: Rhythm; label: string }[] = [
  { id: 'compact', label: 'Compact' },
  { id: 'standard', label: 'Standard' },
  { id: 'generous', label: 'Generous' },
]

const TONES: { id: ImageTone; label: string }[] = [
  { id: 'full', label: 'Full' },
  { id: 'soft', label: 'Soft' },
  { id: 'deep', label: 'Deep' },
]

const ACCENTS = ['#5B81B2', '#8A6A3E', '#6E7F6A', '#9A3B3B', '#FCFAEE']

function readLayoutCookie(): LayoutKey {
  const hit = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${LAYOUT_COOKIE}=`))
  return resolveLayout(hit?.split('=')[1])
}

function Switch({
  on,
  onChange,
  label,
  note,
}: {
  on: boolean
  onChange: (v: boolean) => void
  label: string
  note: string
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className="flex w-full items-start gap-3 py-2 text-left"
    >
      <span
        aria-hidden
        className="mt-[3px] flex h-[14px] w-[26px] shrink-0 items-center rounded-full border border-white/25 p-[2px] transition-colors duration-300"
        style={{ background: on ? 'var(--color-accent)' : 'transparent' }}
      >
        <span
          className="block h-2 w-2 rounded-full bg-white transition-transform duration-300"
          style={{ transform: on ? 'translateX(12px)' : 'translateX(0)' }}
        />
      </span>
      <span className="min-w-0">
        <span className="block text-[11px] tracking-[0.04em] text-white">{label}</span>
        <span className="mt-[2px] block text-[10px] leading-snug text-white/40">{note}</span>
      </span>
    </button>
  )
}

function Segmented<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T
  options: { id: T; label: string }[]
  onChange: (v: T) => void
}) {
  return (
    <div className="flex gap-1">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          onClick={() => onChange(o.id)}
          aria-pressed={value === o.id}
          className="flex-1 border px-2 py-[6px] text-[10px] uppercase tracking-[0.1em] transition-colors duration-200"
          style={{
            borderColor: value === o.id ? 'var(--color-accent)' : 'rgba(255,255,255,0.16)',
            color: value === o.id ? '#fff' : 'rgba(255,255,255,0.5)',
          }}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

/**
 * The client-side control panel.
 *
 * Not part of the public site — it is mounted only behind ?studio=1 and is
 * there so the client can make motion and density decisions against their own
 * pages instead of against a description in an email. Whatever they land on
 * gets baked in as the default and this panel is removed from the build.
 */
export function StudioPanel() {
  const { prefs, set, setLevel, reset } = useMotionPrefs()
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [layout, setLayoutState] = useState<LayoutKey>(DEFAULT_LAYOUT)

  useEffect(() => {
    setLayoutState(readLayoutCookie())
  }, [])

  /**
   * Layout is a cookie and a reload, not client state.
   *
   * The alternative — holding it in React and switching at runtime — would put
   * all four layouts in the browser bundle for every visitor, to serve a
   * control that only two people will ever touch. A cookie lets the server
   * render exactly one, and at launch the cookie read is deleted and the site
   * goes back to being fully static.
   */
  const changeLayout = (next: LayoutKey) => {
    document.cookie = `${LAYOUT_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`
    window.sessionStorage.setItem('mw:veil', 'seen') // don't replay the opening on a layout switch
    window.location.reload()
  }

  // Open by default on a desktop, closed on a phone — on a 375px screen the
  // panel would otherwise cover the page it is meant to be judging.
  useEffect(() => {
    setOpen(window.matchMedia('(min-width: 768px)').matches)
  }, [])

  useEffect(() => {
    if (!copied) return
    const id = window.setTimeout(() => setCopied(false), 1600)
    return () => window.clearTimeout(id)
  }, [copied])

  const dirty = JSON.stringify(prefs) !== JSON.stringify(DEFAULTS)

  return (
    <aside
      className="fixed bottom-4 right-4 z-40 w-[280px] max-w-[calc(100vw-2rem)] border border-white/12 bg-black/85 text-white backdrop-blur-md"
      style={{ fontFamily: 'var(--font-body)' }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-4 py-3"
        aria-expanded={open}
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/70">
          Design controls
        </span>
        <span aria-hidden className="text-[10px] text-white/40">
          {open ? '—' : '+'}
        </span>
      </button>

      {open ? (
        <div className="max-h-[min(70vh,520px)] overflow-y-auto border-t border-white/10 px-4 pb-4">
          <section className="pt-4">
            <p className="mb-2 text-[10px] uppercase tracking-[0.16em] text-white/35">
              Layout
            </p>
            <div className="space-y-1">
              {LAYOUTS.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => changeLayout(l.id)}
                  aria-pressed={layout === l.id}
                  className="block w-full border px-3 py-2 text-left transition-colors duration-200"
                  style={{
                    borderColor:
                      layout === l.id ? 'var(--color-accent)' : 'rgba(255,255,255,0.12)',
                  }}
                >
                  <span className="block text-[11px] tracking-[0.04em]">{l.label}</span>
                  <span className="mt-[2px] block text-[10px] leading-snug text-white/40">
                    {l.note}
                  </span>
                </button>
              ))}
            </div>
          </section>

          <hr className="my-4 border-0 border-t border-white/10" />

          <section>
            <p className="mb-2 text-[10px] uppercase tracking-[0.16em] text-white/35">
              Motion level
            </p>
            <div className="space-y-1">
              {LEVELS.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => setLevel(l.id)}
                  aria-pressed={prefs.level === l.id}
                  className="block w-full border px-3 py-2 text-left transition-colors duration-200"
                  style={{
                    borderColor:
                      prefs.level === l.id ? 'var(--color-accent)' : 'rgba(255,255,255,0.12)',
                  }}
                >
                  <span className="block text-[11px] tracking-[0.04em]">{l.label}</span>
                  <span className="mt-[2px] block text-[10px] leading-snug text-white/40">
                    {l.note}
                  </span>
                </button>
              ))}
            </div>
          </section>

          <hr className="my-4 border-0 border-t border-white/10" />

          <section>
            <p className="mb-1 text-[10px] uppercase tracking-[0.16em] text-white/35">
              Individual
            </p>
            {SWITCHES.map((s) => (
              <Switch
                key={s.key}
                label={s.label}
                note={s.note}
                on={prefs[s.key] === true}
                onChange={(v) => set(s.key, v as Prefs[typeof s.key])}
              />
            ))}
          </section>

          <hr className="my-4 border-0 border-t border-white/10" />

          <section className="space-y-4">
            <div>
              <p className="mb-2 text-[10px] uppercase tracking-[0.16em] text-white/35">
                Section spacing
              </p>
              <Segmented
                value={prefs.rhythm}
                options={RHYTHMS}
                onChange={(v) => set('rhythm', v)}
              />
            </div>

            <div>
              <p className="mb-2 text-[10px] uppercase tracking-[0.16em] text-white/35">
                Image depth
              </p>
              <Segmented
                value={prefs.imageTone}
                options={TONES}
                onChange={(v) => set('imageTone', v)}
              />
            </div>

            <div>
              <p className="mb-2 text-[10px] uppercase tracking-[0.16em] text-white/35">
                Accent
              </p>
              <div className="flex gap-2">
                {ACCENTS.map((hex) => (
                  <button
                    key={hex}
                    type="button"
                    onClick={() => set('accent', hex)}
                    aria-label={hex}
                    aria-pressed={prefs.accent === hex}
                    className="h-6 w-6 border transition-transform duration-200"
                    style={{
                      background: hex,
                      borderColor:
                        prefs.accent === hex ? '#fff' : 'rgba(255,255,255,0.15)',
                      transform: prefs.accent === hex ? 'scale(1)' : 'scale(0.86)',
                    }}
                  />
                ))}
              </div>
            </div>
          </section>

          <hr className="my-4 border-0 border-t border-white/10" />

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                window.sessionStorage.removeItem('mw:veil')
                window.location.reload()
              }}
              className="border border-white/16 px-3 py-2 text-[10px] uppercase tracking-[0.12em] text-white/70"
            >
              Replay opening
            </button>
            <button
              type="button"
              onClick={() => {
                void navigator.clipboard
                  ?.writeText(JSON.stringify(prefs, null, 2))
                  .then(() => setCopied(true))
              }}
              className="border border-white/16 px-3 py-2 text-[10px] uppercase tracking-[0.12em] text-white/70"
            >
              {copied ? 'Copied' : 'Copy settings'}
            </button>
            {dirty ? (
              <button
                type="button"
                onClick={reset}
                className="border border-white/16 px-3 py-2 text-[10px] uppercase tracking-[0.12em] text-white/40"
              >
                Reset
              </button>
            ) : null}
          </div>

          <p className="mt-3 text-[10px] leading-snug text-white/30">
            Choices are saved in this browser. Send the copied settings back and
            they become the site&rsquo;s permanent defaults — this panel is not
            part of the public site.
          </p>
        </div>
      ) : null}
    </aside>
  )
}
