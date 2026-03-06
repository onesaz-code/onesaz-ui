import * as React from 'react'
import { cn } from '../utils/cn'

export type BadgeColor = 'default' | 'success' | 'warning' | 'error' | 'destructive'
export type BadgeVariant = 'contained' | 'outlined' | 'text'

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: BadgeColor
  variant?: BadgeVariant
}

const containedClasses: Record<BadgeColor, string> = {
  default:     'bg-accent text-accent-foreground',
  success:     'bg-success-500 text-white dark:bg-success-600',
  warning:     'bg-warning-500 text-white dark:bg-warning-600',
  error:       'bg-error-500 text-white dark:bg-error-600',
  destructive: 'bg-destructive text-destructive-foreground',
}

const outlinedClasses: Record<BadgeColor, string> = {
  default:     'border border-accent text-accent',
  success:     'border border-success-500 text-success-600 dark:text-success-400',
  warning:     'border border-warning-500 text-warning-600 dark:text-warning-400',
  error:       'border border-error-500 text-error-600 dark:text-error-400',
  destructive: 'border border-destructive text-destructive',
}

const textClasses: Record<BadgeColor, string> = {
  default:     'text-accent',
  success:     'text-success-600 dark:text-success-400',
  warning:     'text-warning-600 dark:text-warning-400',
  error:       'text-error-600 dark:text-error-400',
  destructive: 'text-destructive',
}

const variantMap = {
  contained: containedClasses,
  outlined:  outlinedClasses,
  text:      textClasses,
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, color = 'default', variant = 'contained', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
          (variantMap[variant] ?? variantMap.contained)[color] ?? '',
          className
        )}
        {...props}
      />
    )
  }
)
Badge.displayName = 'Badge'

export { Badge }
