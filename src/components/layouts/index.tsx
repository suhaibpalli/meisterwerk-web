import type { LayoutKey } from '@/lib/layouts'

import { HeroEditorial } from '@/components/sections/hero/Editorial'
import { HeroDrawing } from '@/components/sections/hero/Drawing'
import { HeroIndex } from '@/components/sections/hero/Index'
import { HeroSplit } from '@/components/sections/hero/Split'
import { HeroCinematic } from '@/components/sections/hero/Cinematic'

import { WorkEditorial } from '@/components/sections/work/Editorial'
import { WorkDrawing } from '@/components/sections/work/Drawing'
import { WorkIndex } from '@/components/sections/work/Index'
import { WorkSplit } from '@/components/sections/work/Split'
import { WorkCinematic } from '@/components/sections/work/Cinematic'

import { Statement } from '@/components/sections/Statement'
import { ImageBreak } from '@/components/sections/ImageBreak'
import { CraftDrawing } from '@/components/sections/CraftDrawing'
import { Capabilities } from '@/components/sections/Capabilities'
import { Workshop } from '@/components/sections/Workshop'
import { Facility } from '@/components/sections/Facility'
import { Maisons } from '@/components/sections/Maisons'
import { ContactCta } from '@/components/sections/ContactCta'

/**
 * The four layouts differ in exactly two places — how the page opens and how
 * the work is presented — because those are the two decisions a visitor reads
 * as "layout". Everything below the work section is shared.
 *
 * That is the whole reason this is maintainable. Four independent home pages
 * would drift within a week: a copy fix lands in one and not the others, and
 * by launch three of them are subtly wrong. Here there is one Capabilities,
 * one Facility, one Maisons, and a change to any of them is a change to all
 * four layouts at once.
 */

import { SheetFrame } from '@/components/brand/SheetFrame'

function EditorialHome() {
  return (
    <>
      <HeroEditorial />
      <Statement />
      <WorkEditorial />
      <ImageBreak />
      <Capabilities />
      <Workshop />
      <Facility />
      <Maisons />
      <ContactCta />
    </>
  )
}

function DrawingHome() {
  return (
    <>
      <SheetFrame />
      <HeroDrawing />
      <Statement />
      <WorkDrawing />
      <CraftDrawing />
      <Capabilities />
      <Workshop />
      <Facility />
      <Maisons />
      <ContactCta />
    </>
  )
}

function IndexHome() {
  return (
    <>
      <HeroIndex />
      <Statement />
      <WorkIndex />
      <Capabilities />
      <Workshop />
      <Facility />
      <Maisons />
      <ContactCta />
    </>
  )
}

function SplitHome() {
  return (
    <>
      <HeroSplit />
      <Statement />
      <WorkSplit />
      <ImageBreak />
      <Capabilities />
      <Workshop />
      <Facility />
      <Maisons />
      <ContactCta />
    </>
  )
}

function CinematicHome() {
  return (
    <>
      <HeroCinematic />
      <WorkCinematic />
      <Statement />
      <ImageBreak />
      <Capabilities />
      <Workshop />
      <Facility />
      <Maisons />
      <ContactCta />
    </>
  )
}

const HOMES: Record<LayoutKey, () => React.ReactElement> = {
  editorial: EditorialHome,
  drawing: DrawingHome,
  index: IndexHome,
  split: SplitHome,
  cinematic: CinematicHome,
}

export function HomeLayout({ layout }: { layout: LayoutKey }) {
  const Home = HOMES[layout]
  return <Home />
}
