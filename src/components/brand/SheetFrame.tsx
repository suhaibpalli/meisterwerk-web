/**
 * The sheet border, with a registration tick at each corner.
 *
 * Every drawing Meisterwerk works from arrives inside a border like this. It
 * is also the cleanest way to break the habit the rest of this sector has:
 * luxury-retail sites are edge-to-edge because they are selling atmosphere,
 * and a contractor selling precision should not look like one. A visible frame
 * says the page has been set out, not poured in.
 *
 * Fixed, so the frame belongs to the window rather than the document, and the
 * content scrolls behind it.
 */
export function SheetFrame() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-45 border border-hair"
      style={{ inset: 'var(--sheet-inset)' }}
    >
      {[
        'left-0 top-0 border-l border-t',
        'right-0 top-0 border-r border-t',
        'left-0 bottom-0 border-l border-b',
        'right-0 bottom-0 border-r border-b',
      ].map((pos) => (
        <span
          key={pos}
          className={`absolute h-3 w-3 border-white/25 ${pos}`}
          style={{ margin: '-1px' }}
        />
      ))}
    </div>
  )
}
