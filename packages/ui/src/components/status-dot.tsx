import * as React from 'react'
import { cn } from '../utils/cn'

type DotColor = 'success' | 'warning' | 'error' | 'info' | 'accent' | 'neutral'

export interface StatusDotProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Semantic colour of the dot */
  color?: DotColor
  size?: 'sm' | 'md'
  /** Soft pulsing ring — for "live" / active indicators */
  pulse?: boolean
  /** Optional text rendered next to the dot */
  label?: React.ReactNode
}

const dotColors: Record<DotColor, string> = {
  success: 'bg-success-500',
  warning: 'bg-warning-500',
  error: 'bg-error-500',
  info: 'bg-info-500',
  accent: 'bg-accent',
  neutral: 'bg-muted-foreground',
}

const dotSizes = { sm: 'h-2 w-2', md: 'h-2.5 w-2.5' }

/**
 * A small status indicator dot (health, online, live). Optionally pulses and
 * can carry a label — replaces the hand-rolled `<span className="h-2 w-2 …" />`.
 */
const StatusDot = React.forwardRef<HTMLSpanElement, StatusDotProps>(
  ({ className, color = 'neutral', size = 'md', pulse = false, label, ...props }, ref) => {
    const dot = (
      <span className={cn('relative inline-flex', dotSizes[size])}>
        {pulse && (
          <span className={cn('absolute inline-flex h-full w-full animate-ping rounded-full opacity-75', dotColors[color])} />
        )}
        <span className={cn('relative inline-flex rounded-full', dotSizes[size], dotColors[color])} />
      </span>
    )
    if (label === undefined) {
      return <span ref={ref} className={cn('inline-flex', className)} {...props}>{dot}</span>
    }
    return (
      <span ref={ref} className={cn('inline-flex items-center gap-2', className)} {...props}>
        {dot}
        <span className="text-sm text-foreground">{label}</span>
      </span>
    )
  }
)
StatusDot.displayName = 'StatusDot'

export { StatusDot }
