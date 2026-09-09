# Design tokens

Working values. Replaces on receipt of the client's palette and typeface selection — the structure stays, the values change.

## Palette

Built out from the existing logo: the light blue stays as the single accent, the grey goes darker as requested, white becomes a warm off-white. The light orange is held in reserve as a rare signal colour, not a second brand colour.

| Token | Value | Role |
|---|---|---|
| `--ground` | `#0B0D11` | Page ground. Cool near-black — **never `#000`** |
| `--surface` | `#141821` | Raised surfaces |
| `--line` | `#262C38` | Hairline rules and borders |
| `--paper` | `#F4F3EF` | Primary text, warm off-white |
| `--muted` | `#8A9099` | Captions, metadata |
| `--accent` | `#7FB4DC` | The client's blue, lifted for AA on dark |
| `--signal` | `#C08A3E` | The client's orange. Rare use only |

**Contrast:** the brand blue at its logo value fails AA on near-black. `#7FB4DC` is the lifted value for anything readable; keep the original for the logo mark itself. Test every accent-on-dark pairing at 4.5:1 before shipping.

## Typography

Two families maximum. On dark grounds, high-contrast serifs lose their hairlines — specify optical sizes and avoid thin weights below ~40px.

| Role | Stand-in | Client-supplied |
|---|---|---|
| Display | Instrument Serif (Google, OFL) | TBC |
| Text / UI | Archivo (Google, OFL) | TBC |
| Data / spec | IBM Plex Mono (OFL) | — |

Paid alternatives if the client wants to license: **ABC Diatype** (Dinamo — priced on company size, unlimited web traffic, best value) or **Söhne + Signifier** (Klim — Signifier is engineered for dark grounds). Buy in the client's name; web font licences are non-transferable.

Running text near 65 characters. `text-wrap: balance` on headings. Uppercase labels get letter-spacing.

## Motion

Something heavy moving precisely — not something bouncing.

| | |
|---|---|
| Easing | `power2.out`, `power3.out`, `power3.inOut` |
| Duration | 0.6–1.4s |
| Stagger | 0.06–0.09s |
| Forbidden | `back.out`, `elastic`, springs, bounce |

**Devices:** mask reveals (`clip-path` inset on wrapper + counter-scale on image), hairline draws (`scaleX` from origin-left), dimension-line figures instead of counting numbers, a looping client logo rail.

## Spacing & grid

12-column editorial grid with real gutters. Space scale on a 4px base. Section rhythm carried by hairline rules rather than large blank gaps.

## Imagery

**Macro detail over wide shots.** Brass reveals, lacquer edges, stone junctions, joinery seams — that is what proves fit-out. Wide store shots prove nothing and look like every competitor.

Apply a global `rgba(10,10,10,.10)` multiply overlay across hero imagery to normalise photography arriving from many different sources into one house look.

Note: stone and timber lose detail on near-black. Plan for a lighter bracket around material-heavy bays if the photography needs it.
