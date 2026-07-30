import * as React from 'react'
import { cn } from '../utils/cn'

export interface ToggleOption {
  value: string
  label?: React.ReactNode
  icon?: React.ReactNode
  'aria-label'?: string
}

export interface ToggleGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Currently selected value */
  value: string
  /** Called with the newly selected value */
  onValueChange: (value: string) => void
  /** The segments */
  options: ToggleOption[]
  size?: 'sm' | 'md'
  /** Stretch to fill the container, each segment equal width */
  fullWidth?: boolean
}

const sizeClasses: Record<NonNullable<ToggleGroupProps['size']>, string> = {
  sm: 'h-7 px-2 text-xs',
  md: 'h-8 px-3 text-sm',
}

/**
 * A single-select segmented control — the "List / Board", "Buy / Sell",
 * "1h / 24h / 7d" pattern that was hand-rolled everywhere. Controlled via
 * `value` + `onValueChange`. Renders an accessible radiogroup.
 */
const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(
  ({ className, value, onValueChange, options, size = 'md', fullWidth, ...props }, ref) => (
    <div
      ref={ref}
      role="radiogroup"
      className={cn(
        'inline-flex items-center gap-0.5 rounded-md border border-border bg-muted/40 p-0.5',
        fullWidth && 'flex w-full',
        className
      )}
      {...props}
    >
      {options.map((o) => {
        const active = o.value === value
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={o['aria-label'] ?? (typeof o.label === 'string' ? o.label : undefined)}
            onClick={() => onValueChange(o.value)}
            className={cn(
              'inline-flex items-center justify-center gap-1.5 rounded font-medium transition-colors',
              '[&_svg]:h-4 [&_svg]:w-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              sizeClasses[size],
              fullWidth && 'flex-1',
              active ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {o.icon}
            {o.label}
          </button>
        )
      })}
    </div>
  )
)
ToggleGroup.displayName = 'ToggleGroup'

export { ToggleGroup }
