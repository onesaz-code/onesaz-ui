import * as React from 'react'
import { cn } from '../utils/cn'

// Omit the native `title` attribute so our richer ReactNode `title` prop wins.
export interface EmptyStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Icon or illustration shown above the title */
  icon?: React.ReactNode
  /** Short, primary message describing the empty condition */
  title: React.ReactNode
  /** Optional supporting text below the title */
  description?: React.ReactNode
  /** Optional action(s), e.g. a Button to create the first record */
  action?: React.ReactNode
  /** Vertical padding density */
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses: Record<NonNullable<EmptyStateProps['size']>, string> = {
  sm: 'py-6 gap-2',
  md: 'py-10 gap-3',
  lg: 'py-16 gap-4',
}

/**
 * Neutral placeholder for "there is nothing here yet" — an empty table, an
 * unfilled list, a search with no results. Pair with an `action` to point the
 * user at the next step. For an error condition (a load that failed), use
 * `ErrorState` instead.
 */
const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, icon, title, description, action, size = 'md', ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-col items-center justify-center text-center',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {icon && (
        <div className="text-muted-foreground [&_svg]:h-10 [&_svg]:w-10" aria-hidden="true">
          {icon}
        </div>
      )}
      <div className="space-y-1">
        <p className="text-sm font-semibold text-foreground">{title}</p>
        {description && (
          <p className="mx-auto max-w-sm text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {action && <div className="mt-1 flex items-center gap-2">{action}</div>}
    </div>
  )
)
EmptyState.displayName = 'EmptyState'

export interface ErrorStateProps extends Omit<EmptyStateProps, 'title'> {
  /** Primary message. Defaults to a generic failure message. */
  title?: React.ReactNode
  /** Called when the user clicks the built-in retry affordance */
  onRetry?: () => void
  /** Label for the built-in retry button */
  retryLabel?: React.ReactNode
}

/**
 * Signals that something went wrong (a failed fetch, a rejected action) rather
 * than an empty-but-healthy state. Renders a default error icon and message,
 * and an optional retry control wired to `onRetry`. Any `action` you pass is
 * rendered alongside the retry button.
 */
const ErrorState = React.forwardRef<HTMLDivElement, ErrorStateProps>(
  (
    {
      className,
      icon,
      title = 'Something went wrong',
      description = 'An unexpected error occurred. Please try again.',
      action,
      onRetry,
      retryLabel = 'Try again',
      ...props
    },
    ref
  ) => (
    <EmptyState
      ref={ref}
      className={className}
      icon={
        icon ?? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        )
      }
      title={title}
      description={description}
      action={
        <>
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className={cn(
                'inline-flex items-center gap-2 rounded-md border border-input bg-transparent',
                'px-3 py-1.5 text-sm font-medium text-foreground transition-colors',
                'hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
              )}
            >
              {retryLabel}
            </button>
          )}
          {action}
        </>
      }
      {...props}
    />
  )
)
ErrorState.displayName = 'ErrorState'

export { EmptyState, ErrorState }
