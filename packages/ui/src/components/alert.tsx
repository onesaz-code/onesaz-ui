import * as React from 'react'
import { cn } from '../utils/cn'

// ============================================================================
// Types
// ============================================================================

export type AlertVariant = 'default' | 'success' | 'warning' | 'error'

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant
  /** Renders a close button; called when clicked. */
  onClose?: () => void
  /** Override the default icon. Pass `null` to hide it. */
  icon?: React.ReactNode | null
}

export interface AlertTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export interface AlertDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

// ============================================================================
// Variant styles
// ============================================================================

const variantConfig: Record<
  AlertVariant,
  { root: string; strip: string; iconColor: string }
> = {
  default: {
    root: 'bg-accent/10',
    strip: 'bg-accent',
    iconColor: 'text-accent',
  },
  success: {
    root: 'bg-success-500/10',
    strip: 'bg-success-500',
    iconColor: 'text-success-600 dark:text-success-400',
  },
  warning: {
    root: 'bg-warning-500/10',
    strip: 'bg-warning-500',
    iconColor: 'text-warning-600 dark:text-warning-400',
  },
  error: {
    root: 'bg-error-500/10',
    strip: 'bg-error-500',
    iconColor: 'text-error-600 dark:text-error-400',
  },
}

// ============================================================================
// Icons
// ============================================================================

const InfoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 mt-px">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4M12 8h.01" />
  </svg>
)

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 mt-px">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <path d="m9 11 3 3L22 4" />
  </svg>
)

const WarningIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 mt-px">
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <path d="M12 9v4M12 17h.01" />
  </svg>
)

const ErrorIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 mt-px">
    <circle cx="12" cy="12" r="10" />
    <path d="m15 9-6 6M9 9l6 6" />
  </svg>
)

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
)

const defaultIcons: Record<AlertVariant, React.ReactNode> = {
  default: <InfoIcon />,
  success: <CheckIcon />,
  warning: <WarningIcon />,
  error: <ErrorIcon />,
}

// ============================================================================
// Alert
// ============================================================================

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'default', onClose, icon, children, ...props }, ref) => {
    const cfg = variantConfig[variant]
    const resolvedIcon = icon === null ? null : (icon ?? defaultIcons[variant])

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          'relative flex gap-3 rounded-lg border border-border pl-5 pr-4 py-3 text-sm overflow-hidden',
          cfg.root,
          className,
        )}
        {...props}
      >
          {/* Left accent strip */}
          <div className={cn('absolute left-0 top-0 bottom-0 w-1', cfg.strip)} />

          {/* Left icon */}
          {resolvedIcon && (
            <span className={cn('mt-0.5', cfg.iconColor)}>{resolvedIcon}</span>
          )}

          {/* Content */}
          <div className="flex-1 min-w-0">{children}</div>

          {/* Close button */}
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Dismiss"
              className="shrink-0 self-start mt-0.5 rounded text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <CloseIcon />
            </button>
          )}
        </div>
    )
  }
)
Alert.displayName = 'Alert'

// ============================================================================
// AlertTitle
// ============================================================================

const AlertTitle = React.forwardRef<HTMLHeadingElement, AlertTitleProps>(
  ({ className, children, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn('font-semibold leading-snug text-foreground', className)}
      {...props}
    >
      {children}
    </h5>
  )
)
AlertTitle.displayName = 'AlertTitle'

// ============================================================================
// AlertDescription
// ============================================================================

const AlertDescription = React.forwardRef<HTMLParagraphElement, AlertDescriptionProps>(
  ({ className, children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-muted-foreground mt-0.5 leading-relaxed', className)}
      {...props}
    >
      {children}
    </p>
  )
)
AlertDescription.displayName = 'AlertDescription'

// ============================================================================
// Exports
// ============================================================================

export { Alert, AlertTitle, AlertDescription }
