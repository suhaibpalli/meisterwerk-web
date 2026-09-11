# Design tokens

**Locked from the client's written design direction, 11 September 2026.**
"Contemporary quiet luxury with editorial minimalism."

Implemented in `src/app/globals.css` under `@theme`. Change values there, not in components.

## Core principle

> **Luxury brand first, fit-out company second.** Keep the corporate information, but present it through the visual language of a premium design house. The work itself becomes the visual identity.

**Keywords:** quiet luxury · minimal · architectural · editorial · contemporary · premium · sophisticated · image led · refined · timeless

## Palette

| Token | Value | Role |
|---|---|---|
| `--color-ink` | `#0B0B0B` | Page ground, bottom of the gradient |
| `--color-ink-raised` | `#171717` | Top of the gradient, raised surfaces |
| `--color-paper` | `#FFFFFF` | Primary text |
| `--color-paper-soft` | `#FCFAEE` | Copy set over photography — warmer, softer than pure white on imagery |
| `--color-accent` | `#5B81B2` | Highlights, links, one block per page |
| `--color-mute-70/50/30` | white at 70/50/30% | Secondary, tertiary, quaternary text |
| `--color-hair` | white at 8% | Hairline dividers — **used instead of borders** |

Body carries `linear-gradient(180deg, #171717 0%, #0B0B0B 60%)` fixed, per the brief's "subtle dark gradient".

**Contrast, measured:** `#5B81B2` on `#0B0B0B` is **4.87:1** — passes WCAG AA for body text unmodified. No lightening needed.

**Accent discipline:** one block per page, nowhere else. Currently the Facility section. This follows Bang & Olufsen, who use a single saturated block (`#060DAA`) once and never again.

## Typography

Sans-serif only, per the brief.

| Role | Face | Notes |
|---|---|---|
| Body | **Glacial Indifference** | Client-specified. SIL OFL 1.1, self-hosted from `/public/fonts`. Four weights: Regular, Medium, SemiBold, Bold. Not on Google Fonts. |
| Display | **Jost** | Google Fonts, OFL. Used at 40px and above only. |

**Why Jost.** The brief asks for "a refined modern sans inspired by Bang & Olufsen". B&O use **BeoSupreme**, proprietary and unlicensable. Measured against BeoSupreme's defining proportions — x-height/cap 0.634, rounds 16% wider than tall, single-storey `g` — Jost is the closest freely licensed match (0.657 / 1.137, single-storey `g`). Outfit and Figtree are the runners-up.

Worth knowing: **Glacial Indifference itself measures closer to BeoSupreme than any Google font** (0.647 / 1.137). The client's two instincts converged on the same letterform DNA independently.

### Scale

Tracking polarity follows B&O: **negative on display, positive on small uppercase labels.**

| Token | Size | Line height | Tracking |
|---|---|---|---|
| `text-display` | `clamp(2.5rem, 6vw, 4.5rem)` | 1.0 | −0.015em |
| `text-h1` | `clamp(2rem, 4vw, 3rem)` | 1.1 | −0.012em |
| `text-h2` | `clamp(1.5rem, 2.4vw, 2.25rem)` | 1.25 | −0.01em |
| `text-lead` | `clamp(1.125rem, 1.6vw, 1.5rem)` | 1.5 | 0 |
| `text-body` | 1rem | 1.65 | +0.012em |
| `text-eyebrow` | 0.75rem UPPERCASE | 1.4 | +0.18em |
| `text-micro` | 0.8125rem | 1.5 | — |

Display weight is **300–400, never bold**. B&O render their entire homepage at weight 400 and carry hierarchy on size, colour and space alone. Gucci invert it further: 64px display at weight 300, 14px labels at 700.

## Rhythm

| Token | Value |
|---|---|
| `--spacing-block` | 160px — desktop section spacing |
| `--spacing-block-sm` | 80px — mobile |
| `--spacing-tight` | 32px — intra-section |
| `--container-site` | 1440px, 40px gutters |
| `--container-bleed` | 1700px |

The 160/80/32 triad is lifted from FLOS, whose vertical rhythm is the cleanest of the references.

**Section pattern:** full-bleed image at 85–90vh → short text-only breath at 12–17vh → image section → repeat. That alternation is the whole architecture.

## Layout rules — from the brief, non-negotiable

> Avoid unnecessary boxes, borders, cards and decorative elements.

- **No cards. No borders. No border-radius. No box-shadows.** Hairlines at 8% white instead of borders.
- **CTAs are underlines, never pills.** The competitor's 2px-outlined 30px-radius pills are the single clearest "contractor template" signal.
- Project tiles: **3:4 portrait, two across at 50vw each, zero gutter**, captions below the image as plain type — never overlaid.
- Heroes: 16:9 or 16:10 full-bleed, `object-fit: cover`.
- One container, generous negative space, no nesting.

## Navigation

Overlays the hero rather than sitting in its own bar. Background stays **permanently transparent**; only the text colour inverts as it passes between dark and light sections. Sections declare polarity via `data-nav="light" | "dark"`.

The brief requires it: *"navigation should overlay the hero or banner image rather than sit inside a separate navigation bar"*. B&O's alternative (fade a solid ground in past the hero) is the fallback if a section ever proves illegible.

## Motion

> Animations should be minimal, smooth and purposeful. The premium feeling should come from restraint rather than excessive motion.

**Two easing curves for the whole site:**

| | Curve | Use |
|---|---|---|
| Entrance | `cubic-bezier(0.165, 0.84, 0.44, 1)` — `power4.out` | Reveals |
| Hover | `cubic-bezier(0.455, 0.03, 0.515, 0.955)` — `power2.inOut` | Interactions |

- Durations 0.2–0.5s. **500ms is a hard ceiling** — both B&O and FLOS stop there.
- **One entrance animation, one direction:** opacity + 16px rise. Applied to at most ~10 elements per page.
- Reveal trigger at `top 85%`, `once: true`.
- **Forbidden:** parallax, floating or bobbing elements, animated counters, custom cursors, ripples, background video in the hero, multiple carousel engines, `height`/`line-height` transitions.

**No Lenis.** All three positive references — Bang & Olufsen, FLOS and Gucci — use native scroll, and FLOS ships **zero animation libraries** on a site of far greater visual ambition than this one. Smooth-scroll hijacking adds input latency and is exactly the kind of motion the brief warns against. The package stays installed but unused; remove it before launch if it is still unused.

**Reference for the ceiling:** abragroup.ae, which the client named as too much, runs 72 scroll-reveal elements across four different entrance directions, 37 ripple effects and three separate carousel engines. Nothing arrives the same way twice, so nothing reads as intentional.

## Imagery

Image-led. Large-scale project photography, full-width banners, carefully cropped architectural imagery.

**Macro detail over wide shots.** Brass reveals, lacquer edges, stone junctions, joinery seams — that is what proves fit-out. Wide store shots look like every interior design firm.

Currently placeholder: grayscale stock via `picsum.photos`, configured in `next.config.ts`. **Must be replaced before launch** — it carries no property or model release.
