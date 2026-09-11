import { cn } from '@/lib/utils'

/**
 * The construction mark: a square inscribed in a circle.
 *
 * This is the geometry Meisterwerk's own logo is built on — Leonardo's
 * *homo ad quadratum et ad circulum*, the diagram that accompanies Vitruvius.
 * Reduced to its two lines it becomes a mark the site can use anywhere: a
 * section register, a bullet, a corner tick.
 *
 * It is drawn rather than imported because the logo file is 100kb of Vitruvian
 * line-art and this needs to render at 14px in a caption.
 */
export function Registration({ className }: { className?: string }) {
  // Square inscribed in a circle of radius r has side r√2, so the offset from
  // centre is r/√2. At r = 11 that is 7.78.
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      aria-hidden
      className={cn('h-4 w-4 shrink-0', className)}
    >
      <circle cx="12" cy="12" r="11.2" />
      <rect x="4.16" y="4.16" width="15.68" height="15.68" />
    </svg>
  )
}
