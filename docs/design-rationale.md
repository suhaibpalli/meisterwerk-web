# Design rationale

Why every decision on this site was made. Written so that any choice can be defended to the client, or reversed on purpose rather than by accident.

---

## 1. The theme — and it is one theme

**Editorial minimalism.** Nothing else.

Not Swiss/International (that would mean a visible grid, hairline rules, monospace data — the client's brief explicitly excludes boxes, borders and decorative elements). Not bento grid (cards, which are excluded). Not brutalism or neo-brutalism (hard shadows, heavy borders, loud type — the opposite of quiet luxury). Not glassmorphism (no material credibility; nothing about it says "we manufacture in lacquer").

Editorial minimalism means the page is composed like a printed art book: **large photography, generous negative space, restrained type at low weights, and almost no interface.** Sections are separated by space, not by containers. The only recurring graphic device is the 8%-white hairline, used as a rule between list items — never as a border around anything.

**Why this one:** the client's own words are "contemporary quiet luxury with editorial minimalism", their references are Bang & Olufsen, FLOS and Gucci, and their core principle is *luxury brand first, fit-out company second*. All four point to the same place.

**The consistency test:** if a new element needs a border, a radius, a shadow or a fill to be understood, it is wrong for this theme. Rework it with space and type instead.

---

## 2. On originality

The tokens in `docs/brand.md` were **derived by measurement**, not copied. The three reference sites were analysed for what they actually do — computed styles, font metrics, section heights, easing curves — because "make it feel like Bang & Olufsen" is not a spec until someone measures what that means.

What was taken is *proportion and discipline*, which is not ownable: a 160/80/32 spacing triad, negative tracking on display type and positive on small caps, two easing curves, a nav that inverts colour rather than gaining a background.

What is **not** taken: layout, structure, copy, imagery, component design, or any code. The section order, the chaptered home page, the maison list set as type instead of logos, the capability list, the copy voice — all original to this project.

**The reason the client's own references matter more than an awards gallery:** they named B&O, FLOS and Gucci, and they named abragroup.ae as too much. That is the actual brief. Building something that looks like an Awwwards winner but ignores that brief would be the real failure.

---

## 3. Hero — full-bleed image, 90svh

**Why an image, not a typographic hero.** The brief says "strongly image led… project photography should take centre stage". For a fit-out contractor the work *is* the identity — there is no product to show otherwise. A type-only hero would make this a consultancy.

**Why 90svh and not 100.** At exactly 100vh the page looks like it ends. At 90 the next section peeks above the fold, which tells the reader there is more without a scroll indicator. Bang & Olufsen go further and run their hero at 74vh.

**Why `svh` and not `vh`.** On mobile, `100vh` is measured against the *largest* viewport, so the browser chrome covers the bottom of the hero and the headline sits too low. `svh` uses the smallest viewport and behaves correctly with the address bar visible.

**Why the four-stop scrim.** The headline has to be legible over a photograph whose content we do not control. A single flat overlay greys the whole image; a gradient that is heavy top and bottom and light through the middle keeps the photograph readable where it matters and the type readable where it sits.

**Why `priority` on the hero image.** It is the Largest Contentful Paint element. It must not be lazy-loaded.

**Why the hero does not fade in.** Animating the hero from `opacity: 0` delays LCP by the duration of the animation. The hero is present at first paint; motion starts below the fold.

---

## 4. Navigation — overlaid, never a bar

The brief: "the navigation should overlay the hero or banner image rather than sit inside a separate navigation bar… navigation colours can adapt for contrast as the user moves between dark and light sections."

Two implementations exist in the references. B&O fade a solid background in once you scroll past the hero. **Gucci never give the header a background at all** — it stays transparent permanently and only the text colour inverts. Gucci's is the purer reading of the brief and the one used here.

**How it works:** each section declares `data-nav="dark"` or `data-nav="light"`. A scroll listener finds whichever section is crossing a probe line 80px down and sets the header colour from it. Adding a light section later needs one attribute, not new code.

**Why a scroll listener and not IntersectionObserver.** The question is not "is this section visible" but "which section is under the header right now" — a single point test. A passive scroll listener reading `getBoundingClientRect` answers it directly.

---

## 5. Rhythm — 160 / 80 / 32

Lifted from FLOS's own CSS variables, because the alternative is arbitrary numbers. 160px between sections on desktop, 80 on mobile, 32 within a section.

**The section pattern is the architecture:** full-bleed image (85–90vh) → short text-only breath (12–17vh) → image → repeat. The breath sections look empty. That is what makes the photography land — an image that follows another image is wallpaper; an image that follows silence is a statement.

**Why 1440px container with 40px gutters.** Matches FLOS and B&O. Wider than 1440 and running text exceeds a comfortable measure; narrower and full-bleed imagery loses its impact on a large display.

---

## 6. Projects — 3:4 portrait, two up, zero gutter

**Why portrait.** Retail interiors are vertical spaces — height, vitrines, wall systems. A landscape crop of a boutique throws away the ceiling, which is where much of the fit-out work actually is.

**Why two across at 50% each with no gutter and no card.** This is how Gucci build a grid without cards, and it is the answer to the brief's exclusion of boxes. Images meeting edge to edge read as a composed spread; images in cards read as a product listing.

**Why captions sit below the image, never over it.** Text over photography always costs either legibility or image. Below, both survive, and it reads as a plate caption in a book — which is the register the whole site is aiming at.

**Why the hover is a 1.02 scale and nothing else.** It confirms the element is interactive without announcing itself. Anything larger becomes a zoom effect, which is a stock-photo-site idiom.

---

## 7. Typography

**Two faces, one of them client-specified.** Glacial Indifference for body (their choice), Jost for display at 40px and above.

**Why Jost.** The brief asks for "a refined modern sans inspired by Bang & Olufsen". B&O use BeoSupreme, which is proprietary and cannot be licensed. BeoSupreme's defining proportions were measured: x-height/cap of 0.634 (unusually low — capitals tower over lowercase) and rounds 16% wider than tall. Jost is the closest freely licensed match at 0.657 and 1.137, with the same single-storey `g`. Outfit and Figtree were the runners-up.

**Why weights 300–400 and never bold.** B&O render their entire homepage at weight 400 and carry hierarchy on size, colour and space alone. Gucci go further and invert the usual instinct: 64px display at weight 300, 14px labels at 700. Bold display type reads as commercial; light display type reads as expensive.

**Why tracking is negative on display and positive on labels.** Large type has too much apparent space between letters and needs tightening; small uppercase has too little and needs opening. This polarity is measurable on B&O: −0.5px at 36px, +2px at 14px uppercase.

---

## 8. Colour

Palette is the client's: `#171717 → #0B0B0B` gradient, white, `#5B81B2` accent.

**Why the accent appears on exactly one block.** The brief says "used sparingly… blue should function as an accent rather than a dominant brand colour". B&O demonstrate the discipline — one saturated block per page and nowhere else. Spread the same colour across buttons, links, icons and rules and it stops being an accent and becomes a brand colour.

**Contrast was measured, not assumed.** `#5B81B2` on `#0B0B0B` is 4.87:1, which passes WCAG AA for body text with no lightening needed.

**Why a gradient ground rather than flat.** The brief specifies "subtle dark gradient". It also prevents the flat-black deadness that makes dark sites feel like a terminal rather than a room.

---

## 9. Motion — and where the ceiling is

**One entrance animation:** opacity plus a 16px rise, 0.9s, easeOutQuart, triggered once at 85% viewport. That is the whole vocabulary.

**Why so little.** The brief is unambiguous: *"Avoid excessive parallax, constant movement, elaborate cursor effects or animations that slow access to content. The premium feeling should come from restraint rather than excessive motion."* The client named abragroup.ae as the example of too much — and that site runs 72 scroll-reveal elements across four different entrance directions, 37 material ripples and three separate carousel engines. Nothing arrives the same way twice, so nothing reads as intentional.

**FLOS is the proof.** It ships **zero animation libraries** and one bespoke IntersectionObserver fade at 40% visibility — on a site of far greater visual ambition than this one.

**Why `.from()` and not `.to()`.** The resting state is the element's natural CSS state, so content is visible if JavaScript fails, if a bot renders the page, or if the user has reduced motion on. The alternative — hiding elements in CSS and revealing them with JS — is the single most common way a site ships with invisible content.

**Two easing curves, site-wide:** easeOutQuart for entrances, easeInOutQuad for hovers. Both measured off the references. Durations 0.2–0.5s, with 500ms a hard ceiling.

**Deliberately excluded:** parallax, floating or bobbing elements, animated counters, custom cursors, ripple effects, hero background video, scroll-jacking, multiple carousel engines, and `height`/`line-height` transitions.

**No smooth-scroll library.** All three positive references use native scroll. Scroll hijacking adds input latency, and the brief specifically warns against motion that slows access to content.

---

## 10. Things deliberately not done

| Not done | Why |
|---|---|
| Animated counters | B2B-services convention. The competitor uses them. Figures are set as oversized type instead. |
| Client logo carousel | Meisterwerk cannot reproduce maison logos without permission, and a logo carousel is the defining contractor-website cliché. The names are set as type — Studio Dumbar index their archive by client name for the same reason: the names *are* the credential. |
| Pill buttons | The competitor's 2px-outlined, 30px-radius pills are the clearest "template" signal in this market. CTAs here are underlines. |
| Drop shadows on photography | Also the competitor. It makes a photograph look like a sticker. |
| A wide "hero shot" of a finished store | Wide store shots look like every interior design firm. Detail crops prove fit-out. |

---

## 11. Reading as a fit-out contractor, not an interior designer

This is the hardest thing on the page and it is carried by copy and image selection, not layout.

- The hero line is **"Boutiques built to the millimetre"** — built, not designed.
- The opening statement is explicit: *"We are not the architect. We are the reason the drawing survives contact with the building."*
- Capabilities are named as trades — fit-out, millwork, renovation and maintenance — not as services like "concept design" or "interior design", which would put Meisterwerk in competition with their own clients' architects.
- Project imagery is matched to the maison category it describes, and the descriptors carry sqm, programme and scope — contractor language.
- The accent statement is about tolerance: *"A mitred brass reveal is either right or it is visible. There is no third outcome."*

---

## 12. Placeholder imagery — a known constraint

Current photography is licensed-free stock and is **the binding constraint on how good this can look.**

Searching the free libraries for luxury boutique fit-out returns fast-fashion retail, residential interiors and product flatlays. Credible photography of a completed high-jewellery or watch boutique effectively does not exist outside the maisons' own archives — which is precisely why Meisterwerk's own images matter more here than on a normal project.

Current approach: full colour, no desaturation, each project image matched to its maison category — a watch macro for the watch maison, high jewellery for the jewellery house, leather goods for the leather maison. It reads better than random interiors, but it is not their work.

**Replace before launch.** Stock carries no property or model release, and more importantly it is generic — and the entire argument of this design is that Meisterwerk are not generic.

---

## 13. The motion layer

Everything on this page moves in **one gesture, repeated at three scales**: a clip-path curtain.

| Scale | Where | Duration |
|---|---|---|
| Page | Opening veil — the site uncovers itself, once per session | 1.1s |
| Screen | Mobile menu — the panel arrives the same way | 1.1s open / 0.7s close |
| Element | Image mask reveal — each photograph uncovers as you reach it | 1.2s |

This is the whole point. A site that opens with a curtain, slides its menu in from the right, and fades its images is speaking three motion languages at once and reads as assembled from tutorials. One vocabulary applied consistently is what makes motion feel authored.

Underneath it there are exactly two supporting moves:

- **Reveal** — opacity plus a 16px rise. The base entrance for anything that is not a headline or an image.
- **SplitLines** — headline type rising a line at a time out of its own mask. Reserved for the hero, the thesis statement and the craft statement. It mirrors how type is set in print and it is the one thing on the page that reads as genuinely editorial. Used on every heading it would become a tic.

Two easing curves only: `power3.out` for anything entering, `power3.inOut` for anything that is a curtain. Nothing bounces, nothing overshoots, nothing loops except the maison marquee.

**The maison marquee** is the one continuous movement, and it earns it. A slider with arrows and dots asks a visitor to do work to see a client list, and every contractor site in the region ships one. Two rows running against each other at different speeds cannot be tracked by the eye, which is precisely the impression a fourteen-maison client list should leave. It slows to a stop on hover rather than stopping dead.

**What motion is not allowed to do here:** block content, run on a timer, restart on every visit, or fail closed. The opening veil carries a hard 4-second deadline — browsers throttle animation in backgrounded tabs, and a decorative curtain is never permitted to hold the page behind it. Every animation is a GSAP `.from()` against the element's natural CSS state, so if JavaScript never runs, the page still renders complete.

---

## 14. Design controls (client preview only)

`?studio=1` mounts a control panel in the corner of the site. It is not part of the public build.

The reason it exists: motion is the one part of a design that cannot be agreed in an email. "Subtle fades, gentle image reveals" means three different things to three people. Rather than describing it, the client opens the site, switches each piece on and off against their own pages, and sends back the combination they want — which then becomes the shipped default and the panel is removed.

It exposes three master levels (Restrained / Balanced / Expressive), seven individual switches, and three design dials — section spacing, image depth and accent colour. The design dials work because every token in `globals.css` is a CSS custom property, so overriding one on `:root` reaches every utility that references it, with no rebuild.

The default is **Balanced**: every reveal, no parallax. That is the client's written direction read literally — *"subtle fades, gentle image reveals, smooth transitions"*, and *"avoid excessive parallax, constant movement"*. Expressive exists so they can see what was declined rather than take it on trust.

Switching anything off can never break a layout, because "off" simply means the animation does not run and the element stays in its natural CSS state — the same property that makes the site work without JavaScript.

---

## 15. The four layouts

The design controls offer four layouts. They are not four skins of the same page — each makes a different argument about what Meisterwerk is selling, and each has a case against it.

They differ in exactly **two** places: how the page opens, and how the work is presented. Everything from Capabilities down is shared across all four. That is deliberate and structural — four independent home pages would drift within a week, a copy fix landing in one and not the others.

### Editorial *(shipped default)*

Full-bleed hero, wide margins, two-up 3:4 project tiles. The Gucci / FLOS lineage.

**For:** it is the client's brief read literally, and it is the safest of the four with placeholder photography — full-bleed imagery is forgiving of a picture that is only adequate.
**Against:** it is also the most common. Every luxury-adjacent site in the region is reaching for the same reference, and at four projects the tile grid looks thin.

### Index

No hero photograph. The page opens on type and a hairline row of facts — 2012, 50,000 sq ft, 14 maisons, 3 offices — and the work is a ledger: year, project, location, area, scope. The photograph moves to hover.

**For:** this is the one that fits Meisterwerk's actual constraint rather than fighting it. Their best work is contractually unnameable, and the stock standing in for it is the weakest thing on the site. A ledger row reading *"Swiss watch maison · Dubai Mall · 340 sqm · full fit-out"* carries everything a procurement lead needs without a single identifying image. It also scales: a gallery of thirty looks like a stock library, a ledger of thirty looks like a track record. And no competitor in the audit has anything like it — two of them have no projects page at all.
**Against:** it is the least immediately seductive. A maison's creative director looking for craft will find data first.

### Split

Half type on ink, half photograph, meeting on one vertical line. Work as a sticky heading against a column of images scrolling past.

**For:** it fixes the two real weaknesses of full-bleed. Type over an image needs a scrim, which costs the photograph contrast and the type a clean ground; splitting gives both their own field. And a held heading keeps the framing sentence on screen for the whole sequence, so each image is read against the claim instead of on its own. It is also the densest of the four, which directly answers "this feels too simple".
**Against:** the fixed vertical line is a strong commitment. It works at 1440 and it works on a phone, but it is awkward on a short laptop screen in landscape.

### Cinematic

One full screen per project, type centred, scroll-snapped by proximity.

**For:** the highest-impact first ten seconds of the four.
**Against:** the lowest information density, and it contradicts the client's written direction on constant movement. It works for a visitor who already knows who Meisterwerk are and wants to confirm a standard; it works badly for a cold procurement lead. The metadata is deliberately kept on every screen rather than dropped for a cleaner picture — a portfolio that hides sqm and scope is a screensaver.

### Mechanics

The layout is a **cookie read on the server**, not client state. Holding it in React would put all four layouts in the browser bundle for every visitor in order to serve a control two people will ever touch. With a cookie, the server renders exactly one, and the client bundle contains only what that layout actually uses.

The cost is that reading a cookie opts the route into dynamic rendering. That is correct for a preview build and wrong for production: at launch, `src/lib/layout-server.ts` is deleted, `DEFAULT_LAYOUT` is used directly, and the site returns to being fully static.

Section density is layout-aware without fighting the spacing dial: each layout sets `--rhythm-base`, the dial sets `--rhythm-scale`, and `--spacing-block` is their product. The ledger runs tighter because it carries more information per screen; the cinematic sequence runs looser because full-height blocks supply their own air.

---

## 16. The brand's own artwork, and what it changed

The client supplied the logo as a PDF on 11 Sep. Two things in it were not guesses any more.

**The blue.** The artwork contains exactly three colours: `#FFFFFF`, `#100F0D` and `#AAC2E9` — the last being the MEISTER half of the wordmark. That is *not* the accent named in the written direction, which specifies `#5B81B2`. Both are real; they do different jobs. `#5B81B2` is the accent and the only blue the UI uses, per the brief. `#AAC2E9` belongs to the wordmark and appears nowhere else.

While checking this: `#5B81B2` on `#0B0B0B` measures **4.87:1**, which passes AA for text. The earlier note claiming the brand blue fails contrast on a dark ground was wrong and has been removed. It also appears in the requirements checklist already issued to the client and should be corrected there.

**The wordmark split.** MEISTER is blue, WERK is white. That is a brand rule, not a flourish, and it is reproduced in the footer — the one place on the site that is permanently on ink and can carry it at full contrast.

The logo is line-art: Leonardo's circle-and-square construction, a fluted classical column, a half Vitruvian figure, all in white hairline. That is a strong, ownable visual language — and it is the basis of the **Drawing** layout, which is why that layout exists. It is also, squarely, *not* what the written direction asks for. See below.

---

## 17. Following the brief, and where the work does not

The written direction is specific. Every layout is measured against it honestly:

| Brief requirement | Editorial | Drawing | Index | Split | Cinematic |
|---|---|---|---|---|---|
| Nav overlays the hero, not a separate bar | ✅ | ❌ ruled title block | ⚠️ no hero image to overlay | ⚠️ overlays half | ✅ |
| Image led, full-width banners | ✅ | ❌ contained plates | ❌ type led | ⚠️ half width | ✅ |
| No boxes, borders, cards, decoration | ✅ | ❌ sheet border, drawn rules | ✅ | ✅ | ✅ |
| Generous negative space | ✅ | ✅ | ⚠️ dense by design | ✅ | ✅ |
| Minimal, purposeful animation; no excessive parallax | ✅ | ✅ | ✅ | ✅ | ❌ parallax is the point |
| Accent `#5B81B2` used sparingly | ✅ | ✅ | ✅ | ✅ | ✅ |
| "Luxury brand first, fit out company second" | ✅ | ❌ inverts it deliberately | ⚠️ contractor-first | ✅ | ✅ |

**Editorial is the default because it is the only one that satisfies the brief on every line.**

Its problem was never compliance — it was that Gucci is one of the named references, so building to the reference list produced something close to Gucci. The brief leaves one thing completely unspecified, and that is where the difference now lives: **where the type sits**.

The convention anchors hero type to the bottom-left corner of the frame. This layout does not: the headline and its lead are centred in the frame as one block, split across the grid, with a wide-tracked rail of facts on the baseline.

Centring the *block* is not the same as centring the text. The headline stays hard left on the column grid and the lead sits across in columns 8–12 — what is centred is the pair, vertically. That keeps the asymmetry that makes the composition specific while giving the frame a stable middle, which the earlier top-anchored version did not have: it left the type stranded under the nav with the whole lower two-thirds unanchored.

The two blocks align at the **bottom**, not the top. At ~50px against 16px their first lines can never share a baseline, so matching tops leaves them about 12px out — close enough to read as a mistake and far enough to see. Aligning at the bottom puts the lead's last baseline exactly on the headline's last baseline, which is a real typographic relationship and needs no hand-tuned offset. The facts rail runs on the same twelve columns with spans set per item (2 + 3 + 4 + 3) rather than divided evenly, because four equal columns break the longest fact onto a second line.

The work section differentiates the same way — by **ratio sequence** rather than chrome. One project at full width and 21:9, the rest three-up in portrait with a real gutter. The uniform zero-gutter tile grid is what makes portfolios read as catalogues, and it makes every project look equally important, which is the one thing a portfolio must not do.

**Drawing is kept and labelled honestly.** It is the strongest expression of Meisterwerk's own graphic language and the weakest fit to the document they signed off. That is exactly the kind of decision the client should make by looking at it rather than by reading an argument about it — which is what the design-controls panel is for.
