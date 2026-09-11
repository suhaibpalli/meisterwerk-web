import { cn } from '@/lib/utils'

/**
 * A dimension annotation, drawn the way it is drawn on a shop drawing:
 * a witness tick at each end, a rule between, the value sitting on the rule.
 *
 * This is the site's single most brand-specific device. No luxury retail site
 * uses it, because no luxury retailer builds anything — and that is precisely
 * the distinction Meisterwerk has been failing to make. A sqm figure set as a
 * dimension says "we measured this and we built to it". The same figure set as
 * a caption says "here is some information about a shop".
 */
export function Dimension({
  value,
  label,
  className,
}: {
  value: string
  label?: string
  className?: string
}) {
  return (
    <div className={cn('min-w-0', className)}>
      <div className="flex items-center gap-2 text-mute-30" aria-hidden>
        <span className="block h-2 w-px bg-current" />
        <span className="block h-px flex-1 bg-current" />
        <span className="block h-2 w-px bg-current" />
      </div>
      <p className="mt-2 font-display text-[0.9375rem] font-light tabular-nums text-paper">
        {value}
      </p>
      {label ? (
        <p className="mt-1 text-[0.6875rem] uppercase tracking-[0.14em] text-mute-50">
          {label}
        </p>
      ) : null}
    </div>
  )
}
