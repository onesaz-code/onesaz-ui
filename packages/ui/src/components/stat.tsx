import * as React from 'react'
import { cn } from '../utils/cn'

type Trend = 'up' | 'down' | 'flat'
type Sentiment = 'positive' | 'negative' | 'neutral'

export interface StatProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Small overline label, e.g. "Present today" */
  label: React.ReactNode
  /** The primary metric value (rendered large, with tabular figures) */
  value: React.ReactNode
  /** Optional change indicator, e.g. "+2.1%" */
  delta?: React.ReactNode
  /** Arrow direction next to the delta. Defaults to `flat` (no arrow). */
  trend?: Trend
  /**
   * Colour of the delta, independent of arrow direction. Defaults to deriving
   * from `trend` (up→positive/green, down→negative/red). Set explicitly for
   * "lower is better" metrics — e.g. `trend="up" sentiment="negative"` gives a
   * red up-arrow for a rising error rate.
   */
  sentiment?: Sentiment
  /** Optional supporting text under the value */
  hint?: React.ReactNode
  /** Optional leading icon, shown in a tinted tile on the right */
  icon?: React.ReactNode
  /** Render as a bordered card (default) or a bare block */
  variant?: 'card' | 'plain'
}

const sentimentClasses: Record<Sentiment, string> = {
  positive: 'text-success-600 dark:text-success-400',
  negative: 'text-error-600 dark:text-error-400',
  neutral: 'text-muted-foreground',
}

const trendToSentiment: Record<Trend, Sentiment> = {
  up: 'positive',
  down: 'negative',
  flat: 'neutral',
}

const TrendArrow = ({ trend }: { trend: Trend }) => {
  if (trend === 'flat') return null
  return (
    <svg
      className={cn('h-3.5 w-3.5', trend === 'down' && 'rotate-180')}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 19V5" />
      <path d="m5 12 7-7 7 7" />
    </svg>
  )
}

/**
 * A labelled metric tile — the single most-repeated dashboard pattern. Renders
 * an overline label, a large tabular value, and an optional colour-coded
 * delta/trend. Wrap-free: use directly in a Grid.
 */
const Stat = React.forwardRef<HTMLDivElement, StatProps>(
  ({ className, label, value, delta, trend = 'flat', sentiment, hint, icon, variant = 'card', ...props }, ref) => {
    const deltaColor = sentimentClasses[sentiment ?? trendToSentiment[trend]]
    return (
    <div
      ref={ref}
      className={cn(
        variant === 'card' && 'rounded-lg border border-border bg-card p-5 shadow-sm',
        className
      )}
      {...props}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
          <p className="mt-1 text-2xl font-semibold tabular-nums text-foreground">{value}</p>
        </div>
        {icon && (
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground [&_svg]:h-5 [&_svg]:w-5">
            {icon}
          </span>
        )}
      </div>
      {(delta !== undefined || hint) && (
        <div className="mt-2 flex items-center gap-2">
          {delta !== undefined && (
            <span className={cn('inline-flex items-center gap-1 text-sm font-medium tabular-nums', deltaColor)}>
              <TrendArrow trend={trend} />
              {delta}
            </span>
          )}
          {hint && <span className="text-sm text-muted-foreground">{hint}</span>}
        </div>
      )}
    </div>
    )
  }
)
Stat.displayName = 'Stat'

export { Stat }
