# Meisterwerk

Website for **Meisterwerk Fitout LLC** — a Dubai-based luxury retail fit-out contractor building and renovating boutiques for hard-luxury maisons across the UAE and Saudi Arabia.

Replaces the existing WordPress single-page site at [meisterwerk.ae](https://meisterwerk.ae).

Agreement: `BQL-2026-MW-002` · Black Quantum Labs

---

## Stack

| | |
|---|---|
| Framework | Next.js 16.3.4 — App Router, statically generated |
| React | 19.2.8 |
| Styling | Tailwind CSS v4 (CSS-first — no `tailwind.config.ts`) |
| Motion | GSAP 3.15 + ScrollTrigger, via `@gsap/react` |
| Smooth scroll | Lenis 1.3 |
| Content | Sanity — added after design approval |
| Hosting | Vercel |

## Getting started

```bash
npm run dev     # http://localhost:3000
npm run build
npm start
```

Node 20.9+ required (developed on 22.x). There is no lint script — `next lint` was removed in Next 16.

> **Do not run installs from an agent or container shell.** Native binaries (swc, sharp) are platform-specific; install on the development machine.

## Scope

Six page types — home, about, capabilities, projects index, project detail, contact — with a content management system so the client publishes projects themselves. Fifteen projects loaded at launch; the client adds the rest.

**Not in scope** without a change order: Arabic / RTL, news, careers, capability sub-pages, a process page, e-commerce, visitor accounts, custom backend.

## Documentation

| File | Contents |
|---|---|
| `AGENTS.md` | Project rules, stack decisions, hard constraints. **Read before writing code.** |
| `PLAN.md` | Build order, milestones, current status |
| `docs/brand.md` | Design tokens — palette, type, spacing, motion |

`CLAUDE.md` points at `AGENTS.md`; there is one source of truth.

## Conventions

- Flat project URLs: `/projects/<slug>` — no nested category, so links survive taxonomy changes.
- Animation lives in small `"use client"` leaf components. Layouts and pages stay server components.
- Every animation goes inside `useGSAP()` with a `scope`.
- Animate `transform` and `opacity` only.

## Budgets

LCP ≤ 2.5s · INP ≤ 200ms · CLS ≤ 0.1 · JS ≤ 170kb gzipped first load.

## Accounts

Domain, hosting and CMS are registered in the client's name and billed to them directly. No credentials in this repo.
