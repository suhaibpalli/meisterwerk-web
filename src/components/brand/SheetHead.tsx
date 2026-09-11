import { Registration } from './Registration'
import { cn } from '@/lib/utils'

/**
 * A section header set as a drawing-sheet title block: index, rule, title.
 *
 * Numbering every section is not decoration. Meisterwerk's own capability list
 * is already numbered 01/02/03, their logo is a numbered-construction diagram,
 * and a drawing set is *always* indexed — the index is how a contractor finds
 * the sheet. Carrying that through the page is the difference between a site
 * that has a house style and a site that borrowed one.
 */
export function SheetHead({
  index,
  title,
  aside,
  className,
}: {
  index: string
  title: string
  aside?: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('', className)}>
      <div className="flex items-baseline gap-4">
        <span className="font-display text-[0.6875rem] tabular-nums tracking-[0.16em] text-accent">
          {index}
        </span>
        <span className="u-eyebrow">{title}</span>
        <span aria-hidden className="h-px flex-1 translate-y-[-0.3em] bg-hair" />
        {aside ? <span className="shrink-0">{aside}</span> : null}
        <Registration className="translate-y-[0.15em] text-mute-30" />
      </div>
    </div>
  )
}
