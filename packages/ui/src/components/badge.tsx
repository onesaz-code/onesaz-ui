import * as React from 'react'
import { cn } from '../utils/cn'

export type BadgeColor =
  | 'default'
  | 'success'
  | 'warning'
  | 'error'
  | 'destructive'
  | 'info'
  | 'normal'
  | 'archived'
export type BadgeVariant = 'contained' | 'outlined' | 'soft' | 'text'

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: BadgeColor
  variant?: BadgeVariant
  /** When true with `variant="outlined"`, renders a soft filled background with bold text. */
  bg?: boolean
}

const archivedFilledClasses =
  'bg-[#f1ece6] text-[#92837a] dark:bg-[#3a332e] dark:text-[#c9bdb4]'

const containedClasses: Record<BadgeColor, string> = {
  default:     'bg-accent text-accent-foreground',
  success:     'bg-success-500 text-white dark:bg-success-600',
  warning:     'bg-warning-500 text-white dark:bg-warning-600',
  error:       'bg-error-500 text-white dark:bg-error-600',
  destructive: 'bg-destructive text-destructive-foreground',
  info:        'bg-info-500 text-white dark:bg-info-600',
  normal:      'bg-slate-4 text-slate-8 dark:bg-slate-6 dark:text-slate-100',
  archived:    archivedFilledClasses,
}

const outlinedClasses: Record<BadgeColor, string> = {
  default:     'border border-accent text-accent',
  success:     'border border-success-500 text-success-600 dark:text-success-400',
  warning:     'border border-warning-500 text-warning-600 dark:text-warning-400',
  error:       'border border-error-500 text-error-600 dark:text-error-400',
  destructive: 'border border-destructive text-destructive',
  info:        'border border-info-500 text-info-600 dark:text-info-400',
  normal:      'border border-slate-4 text-slate-7 dark:border-slate-6 dark:text-slate-400',
  archived:    'border border-[#92837a]/45 text-[#92837a] dark:border-[#c9bdb4]/45 dark:text-[#c9bdb4]',
}

const outlinedBgClasses: Record<BadgeColor, string> = {
  default:     'border-0 bg-accent/15 text-accent',
  success:     'border-0 bg-success-200 text-success-700 dark:bg-success-500/20 dark:text-success-300',
  warning:     'border-0 bg-warning-200 text-warning-700 dark:bg-warning-500/20 dark:text-warning-300',
  error:       'border-0 bg-error-200 text-error-700 dark:bg-error-500/20 dark:text-error-300',
  destructive: 'border-0 bg-destructive/15 text-destructive',
  info:        'border-0 bg-info-200 text-info-700 dark:bg-info-500/20 dark:text-info-300',
  normal:      'border-0 bg-slate-3 text-slate-7 dark:bg-slate-5/25 dark:text-slate-300',
  archived:    `border-0 ${archivedFilledClasses}`,
}

const softClasses: Record<BadgeColor, string> = {
  default:     'bg-accent/10 text-accent',
  success:     'bg-success-500/10 text-success-700 dark:text-success-300',
  warning:     'bg-warning-500/10 text-warning-700 dark:text-warning-300',
  error:       'bg-error-500/10 text-error-700 dark:text-error-300',
  destructive: 'bg-destructive/10 text-destructive',
  info:        'bg-info-500/10 text-info-700 dark:text-info-300',
  normal:      'bg-slate-500/15 text-slate-700 dark:text-slate-300',
  archived:    'bg-[#f1ece6]/80 text-[#92837a] dark:bg-[#3a332e]/80 dark:text-[#c9bdb4]',
}

const textClasses: Record<BadgeColor, string> = {
  default:     'text-accent',
  success:     'text-success-600 dark:text-success-400',
  warning:     'text-warning-600 dark:text-warning-400',
  error:       'text-error-600 dark:text-error-400',
  destructive: 'text-destructive',
  info:        'text-info-600 dark:text-info-400',
  normal:      'text-slate-7 dark:text-slate-400',
  archived:    'text-[#92837a] dark:text-[#c9bdb4]',
}

const variantMap = {
  contained: containedClasses,
  outlined:  outlinedClasses,
  soft:      softClasses,
  text:      textClasses,
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, color = 'default', variant = 'contained', bg = false, ...props }, ref) => {
    const useOutlinedBg = variant === 'outlined' && bg
    const colorClasses = useOutlinedBg
      ? outlinedBgClasses[color]
      : (variantMap[variant] ?? variantMap.contained)[color] ?? ''

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs transition-colors',
          useOutlinedBg ? 'font-bold' : 'font-semibold',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
          colorClasses,
          className
        )}
        {...props}
      />
    )
  }
)
Badge.displayName = 'Badge'

export { Badge }
