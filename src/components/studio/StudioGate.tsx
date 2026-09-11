'use client'

import { useEffect, useState } from 'react'
import { StudioPanel } from './StudioPanel'

const FLAG = 'mw:studio'

/**
 * The panel exists only for the client's review. It is never rendered for a
 * visitor: it appears after ?studio=1 is opened once, persists in that browser
 * so the link does not have to be re-used on every page, and is dismissed for
 * good with ?studio=0. Nothing about it is indexed or linked to.
 */
export function StudioGate() {
  const [on, setOn] = useState(false)

  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get('studio')
    if (param === '1') window.localStorage.setItem(FLAG, 'on')
    if (param === '0') window.localStorage.removeItem(FLAG)
    setOn(window.localStorage.getItem(FLAG) === 'on')
  }, [])

  return on ? <StudioPanel /> : null
}
