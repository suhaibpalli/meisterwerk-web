# Build plan

**Deliverable:** designed home page on a live URL — **12 September 2026**. Not a wireframe. A non-technical stakeholder is being shown it.

Full site: 6–7 weeks from kickoff.

---

## Status

| # | Stage | State |
|---|---|---|
| 0 | Scaffold — Next 16, Tailwind v4, GSAP, Lenis, git | ✅ Done |
| 1 | Project docs — AGENTS, README, PLAN, brand | ✅ Done |
| 2 | Design tokens — palette, type scale, spacing | ⬜ Next |
| 3 | Shell — layout, nav, footer, Lenis wiring, reduced-motion guard | ⬜ |
| 4 | Home page — full designed page | ⬜ |
| 5 | Motion — mask reveals, hairline draws, logo rail | ⬜ |
| 6 | Deploy preview to Vercel | ⬜ |
| — | *Client review — 12 Sep* | |
| 7 | Remaining page designs | ⬜ |
| 8 | Projects index + detail template | ⬜ |
| 9 | Sanity — schema, image pipeline, approval fields | ⬜ |
| 10 | Content load (15 projects), QA, launch | ⬜ |

---

## Phase detail

### 2 · Design tokens
Near-black ground (never `#000`), the client's brand blue lifted to pass AA on dark, warm off-white, one type scale. Tailwind v4 `@theme` block in `globals.css`. Fonts via `next/font` — Instrument Serif + Archivo as stand-ins until the client supplies their selection.

### 3 · Shell
Root layout stays a server component. `<SmoothScroll>` is a thin `"use client"` wrapper mounting `ReactLenis root` with `autoRaf: false`, driven from `gsap.ticker`. Plugin registration in `lib/gsap.ts`, once. Nav with scroll state; footer carrying three offices.

### 4 · Home page
Chaptered single-scroll structure — each chapter a condensed section linking to its full page. Hero, about, capabilities, selected projects, client logo rail, contact. Dimension-line figures rather than counting numbers.

### 5 · Motion
Mask reveals (`clip-path` inset on a wrapper, counter-scale on the image inside). Hairline rules drawing in via `scaleX`. Logo rail looping. Nothing pinned yet — pinned sections come after design approval.

### 6 · Deploy
Push to GitHub, import to Vercel under the client's account. Verify on real mobile, not just a resized window.

---

## Open items

**Blocking launch, not the 12th:**

- [ ] **Swap placeholder photography before launch.** The 12th draft uses free stock (Unsplash/Pexels), which grants no property or model release — acceptable in a review meeting, not publishable. Replace with either real Meisterwerk photography or Adobe Stock (carries releases and indemnity).
- [ ] Logo as SVG. Wordmark is set in type until it arrives.
- [ ] Client's typeface selection, **with evidence of a web licence** — desktop and print licences do not permit webfont use.
- [ ] Client's colour palette confirmed against the working values in `docs/brand.md`.

**Needed for the full build:**

- [ ] Which client brands may be named publicly, or whether projects go out anonymised.
- [ ] Project metadata for the 15 launch projects — descriptor, location, area, programme weeks, scope of works.
- [ ] Detail/macro photography specifically. Wide store shots alone weaken the whole art direction.
- [ ] Confirm which Meisterwerk entity is contracting (UAE / KSA).
- [ ] Nominated email address for enquiry delivery.

## Decisions taken

| Decision | Reason |
|---|---|
| GSAP over Motion | One animation runtime. GSAP is stronger at timeline choreography; all plugins free since 3.13. |
| Lenis over ScrollSmoother | Cannot run both. Lenis is lighter and is the current standard. |
| React `<ViewTransition>` for route transitions | Zero config on Next 16. Not `next-view-transitions`, not Barba, not AnimatePresence. |
| Static generation throughout | Pages serve from CDN rather than regional compute. Faster, and resilient to a single-region outage. |
| Sanity deferred until after design approval | Schema should follow the finished project template, not precede it. |
| No component library | Nothing in the popular set suits a luxury editorial register. shadcn/Radix for behaviour only. |
| Free stock as placeholder for the 12th | Fastest path to a designed page for review. Must be swapped before launch — no property or model release. |
| Wordmark set in type until the SVG arrives | Costs nothing to swap later; unblocks the shell now. |


## Open with the client (as of 11 Sep 2026)

- **Enquiry form.** Not built. The contact page publishes the email address and
  each office's telephone number instead. A form needs a mail transport and a
  spam control decided first, and a form that silently drops enquiries is worse
  than no form. Raise it before launch.
- **Milan.** meisterwerk.ae says the team is "strategically located in Dubai,
  Riyadh, Milan, and New Delhi", but publishes contact details for only three.
  Confirm whether Milan is an office that belongs in the footer.
- **Published enquiry line.** +971 55 605 1199 appears against all three offices
  on the current site. Confirm which number should be the published one.
- **Requirements checklist correction.** The issued checklist says the brand blue
  fails contrast on a dark background. It does not — #5B81B2 on #0B0B0B measures
  4.87:1 and passes AA. Correct it if the document is reissued.
- **Still outstanding from Group 1:** web font licence confirmation for the brand
  typeface, and vector logo artwork (.ai or .svg — the supplied PDF has been
  traced, which is adequate for now but not ideal at small sizes).
- **Group 2 content** replaces every word on /about, /capabilities and the
  project descriptions. All current copy is placeholder written from the two
  briefing calls and the existing site.
