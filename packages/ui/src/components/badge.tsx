import * as React from 'react'
import { cn } from '../utils/cn'

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?
    : 'default'
    | 'secondary'
    | 'destructive'
    | 'outline'
    | 'success'
    | 'warning'
    | 'info'
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
          {
            'border-transparent bg-accent text-accent-foreground':
              variant === 'default',
            'border-transparent bg-muted text-foreground':
              variant === 'secondary',
            'border-transparent bg-destructive text-destructive-foreground':
              variant === 'destructive',
            'border border-border text-foreground':
              variant === 'outline',
            'border border-green-300 bg-green-100 text-green-800':
              variant === 'success',
            'border border-yellow-300 bg-yellow-100 text-yellow-800':
              variant === 'warning',
            'border border-blue-300 bg-blue-100 text-blue-800':
              variant === 'info',
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
