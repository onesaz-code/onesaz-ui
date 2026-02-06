import * as React from 'react'
import { cn } from '../utils/cn'

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2',
          {
            'border-transparent bg-[var(--accent)] text-[var(--accent-foreground)]':
              variant === 'default',
            'border-transparent bg-[var(--muted)] text-[var(--foreground)]':
              variant === 'secondary',
            'border-transparent bg-[var(--destructive)] text-[var(--destructive-foreground)]':
              variant === 'destructive',
            'border border-[var(--border)] text-[var(--foreground)]':
              variant === 'outline',
          },
          className
        )}
        {...props}
      />
    )
  }
)
Badge.displayName = 'Badge'

export { Badge }
