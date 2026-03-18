import * as React from 'react'
import { cn } from '../utils/cn'

// ============================================================================
// Types
// ============================================================================

export type ButtonColor = 'default' | 'success' | 'warning' | 'error' | 'destructive'

// ============================================================================
// ButtonGroup Context
// ============================================================================

interface ButtonGroupContextValue {
  variant?: ButtonProps['variant']
  size?: ButtonProps['size']
  color?: ButtonColor
  disabled?: boolean
}

const ButtonGroupContext = React.createContext<ButtonGroupContextValue>({})
const useButtonGroup = () => React.useContext(ButtonGroupContext)

// ============================================================================
// Color × Shape class maps
// ============================================================================

/** Classes applied when color is non-default, keyed by variant shape */
const colorMap: Record<
  Exclude<ButtonColor, 'default'>,
  Record<'contained' | 'outlined' | 'secondary' | 'ghost' | 'link', string>
> = {
  success: {
    contained: 'bg-success-500 text-white hover:bg-success-600 dark:bg-success-600 dark:hover:bg-success-700',
    outlined:  'border border-success-500 bg-transparent text-success-600 hover:bg-success-500/10 dark:text-success-400 dark:hover:bg-success-500/10',
    secondary: 'bg-success-500/10 text-success-700 hover:bg-success-500/15 dark:text-success-300 dark:hover:bg-success-500/15',
    ghost:     'text-success-600 hover:bg-success-500/10 dark:text-success-400 dark:hover:bg-success-500/10',
    link:      'text-success-600 dark:text-success-400',
  },
  warning: {
    contained: 'bg-warning-500 text-white hover:bg-warning-600 dark:bg-warning-600 dark:hover:bg-warning-700',
    outlined:  'border border-warning-500 bg-transparent text-warning-600 hover:bg-warning-500/10 dark:text-warning-400 dark:hover:bg-warning-500/10',
    secondary: 'bg-warning-500/10 text-warning-700 hover:bg-warning-500/15 dark:text-warning-300 dark:hover:bg-warning-500/15',
    ghost:     'text-warning-600 hover:bg-warning-500/10 dark:text-warning-400 dark:hover:bg-warning-500/10',
    link:      'text-warning-600 dark:text-warning-400',
  },
  error: {
    contained: 'bg-error-500 text-white hover:bg-error-600 dark:bg-error-600 dark:hover:bg-error-700',
    outlined:  'border border-error-500 bg-transparent text-error-600 hover:bg-error-500/10 dark:text-error-400 dark:hover:bg-error-500/10',
    secondary: 'bg-error-500/10 text-error-700 hover:bg-error-500/15 dark:text-error-300 dark:hover:bg-error-500/15',
    ghost:     'text-error-600 hover:bg-error-500/10 dark:text-error-400 dark:hover:bg-error-500/10',
    link:      'text-error-600 dark:text-error-400',
  },
  destructive: {
    contained: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    outlined:  'border border-destructive bg-transparent text-destructive hover:bg-destructive/10',
    secondary: 'bg-destructive/10 text-destructive hover:bg-destructive/20',
    ghost:     'text-destructive hover:bg-destructive/10',
    link:      'text-destructive',
  },
}

/** Maps variant name → shape key used in colorMap */
function variantToShape(
  variant: ButtonProps['variant']
): 'contained' | 'outlined' | 'secondary' | 'ghost' | 'link' {
  switch (variant) {
    case 'outlined':   return 'outlined'
    case 'secondary':  return 'secondary'
    case 'ghost':      return 'ghost'
    case 'link':       return 'link'
    default:           return 'contained' // 'contained' and 'destructive'
  }
}

// ============================================================================
// Spinner (inline, no external dep)
// ============================================================================

const Spinner = ({ className }: { className?: string }) => (
  <svg
    className={cn('animate-spin', className)}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
    />
  </svg>
)

// ============================================================================
// Button
// ============================================================================

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'contained' | 'destructive' | 'outlined' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  color?: ButtonColor
  /** Whether the button should take the full width of its container */
  fullWidth?: boolean
  /** Shows a loading spinner and disables the button */
  loading?: boolean
  /** Element rendered before the button label */
  startIcon?: React.ReactNode
  /** Element rendered after the button label */
  endIcon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      color,
      fullWidth = false,
      disabled,
      loading = false,
      startIcon,
      endIcon,
      children,
      ...props
    },
    ref
  ) => {
    const groupCtx = useButtonGroup()
    const resolvedVariant  = variant  ?? groupCtx.variant  ?? 'contained'
    const resolvedSize     = size     ?? 'default'
    const resolvedColor    = color    ?? groupCtx.color    ?? 'default'
    const resolvedDisabled = disabled ?? groupCtx.disabled

    // When color is non-default, derive classes from the color map.
    // When color is 'default', fall through to the original variant classes (full BC).
    const colorOverride =
      resolvedColor !== 'default'
        ? (colorMap[resolvedColor]?.[variantToShape(resolvedVariant)] ?? null)
        : null

    // Original per-variant classes (only used when no color override)
    const variantClasses = colorOverride
      ? null
      : {
          'bg-accent text-accent-foreground hover:bg-accent-hover':
            resolvedVariant === 'contained',
          'bg-destructive text-destructive-foreground hover:bg-destructive/90':
            resolvedVariant === 'destructive',
          'border border-input bg-background hover:text-foreground dark:border-border dark:text-foreground dark:hover:bg-muted':
            resolvedVariant === 'outlined',
          'bg-muted text-foreground hover:bg-muted/80':
            resolvedVariant === 'secondary',
          'hover:bg-muted hover:text-foreground':
            resolvedVariant === 'ghost',
          'text-accent underline-offset-4 hover:underline':
            resolvedVariant === 'link',
        }

    const iconSize =
      resolvedSize === 'sm' ? 'h-3.5 w-3.5' :
      resolvedSize === 'lg' ? 'h-5 w-5'     : 'h-4 w-4'

    return (
      <button
        disabled={resolvedDisabled || loading}
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors cursor-pointer',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed',
          colorOverride ?? variantClasses,
          {
            'h-10 px-4 py-2': resolvedSize === 'default',
            'h-9 rounded-md px-3': resolvedSize === 'sm',
            'h-11 rounded-md px-8': resolvedSize === 'lg',
            'h-10 w-10': resolvedSize === 'icon',
          },
          fullWidth && 'w-full',
          loading && 'gap-2',
          (startIcon || endIcon) && !loading && 'gap-2',
          className
        )}
        ref={ref}
        {...props}
      >
        {loading ? (
          <>
            <Spinner className={iconSize} />
            {children}
          </>
        ) : (
          <>
            {startIcon && <span className={cn('shrink-0', iconSize)}>{startIcon}</span>}
            {children}
            {endIcon && <span className={cn('shrink-0', iconSize)}>{endIcon}</span>}
          </>
        )}
      </button>
    )
  }
)
Button.displayName = 'Button'

// ============================================================================
// IconButton - Specialized button for icons
// ============================================================================

export interface IconButtonProps extends Omit<ButtonProps, 'size' | 'startIcon' | 'endIcon'> {
  /** Size of the icon button */
  size?: 'xs' | 'sm' | 'md' | 'lg'
  /** Whether the button is rounded (circular) */
  rounded?: boolean
  /** Aria label for accessibility (required for icon-only buttons) */
  'aria-label': string
}

const iconButtonSizes = {
  xs: 'h-7 w-7',
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant = 'contained', color = 'default', size = 'md', rounded = false, loading = false, ...props }, ref) => {
    const colorOverride =
      color !== 'default'
        ? (colorMap[color]?.[variantToShape(variant)] ?? null)
        : null

    const variantClasses = colorOverride
      ? null
      : {
          'bg-accent text-accent-foreground hover:bg-accent-hover': variant === 'contained',
          'bg-destructive text-destructive-foreground hover:bg-destructive/90': variant === 'destructive',
          'border border-input bg-background hover:text-foreground dark:border-border dark:text-foreground dark:hover:bg-muted': variant === 'outlined',
          'bg-muted text-foreground hover:bg-muted/80': variant === 'secondary',
          'hover:bg-muted hover:text-foreground': variant === 'ghost',
          'text-accent underline-offset-4 hover:underline': variant === 'link',
        }

    return (
      <button
        disabled={loading}
        className={cn(
          'inline-flex items-center justify-center transition-colors cursor-pointer',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed',
          colorOverride ?? variantClasses,
          iconButtonSizes[size],
          rounded ? 'rounded-full' : 'rounded-md',
          className
        )}
        ref={ref}
        {...props}
      >
        {loading ? <Spinner className="h-4 w-4" /> : props.children}
      </button>
    )
  }
)
IconButton.displayName = 'IconButton'

// ============================================================================
// ButtonGroup
// ============================================================================

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Variant applied to all child buttons (can be overridden per button) */
  variant?: ButtonProps['variant']
  /** Size applied to all child buttons (can be overridden per button) */
  size?: ButtonProps['size']
  /** Color applied to all child buttons (can be overridden per button) */
  color?: ButtonColor
  /** Layout direction */
  orientation?: 'horizontal' | 'vertical'
  /** Disable all child buttons */
  disabled?: boolean
  /** Stretch group to fill container width */
  fullWidth?: boolean
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    {
      className,
      variant,
      size,
      color,
      orientation = 'horizontal',
      disabled,
      fullWidth = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <ButtonGroupContext.Provider value={{ variant, size, color, disabled }}>
        <div
          ref={ref}
          role="group"
          className={cn(
            'inline-flex',
            orientation === 'vertical' && 'flex-col',
            fullWidth && 'flex w-full',
            orientation === 'horizontal' && [
              '[&>*:not(:first-child)]:rounded-l-none',
              '[&>*:not(:last-child)]:rounded-r-none',
              '[&>*:not(:first-child)]:-ml-px',
              '[&>*]:relative',
              '[&>*:hover]:z-10',
              '[&>*:focus-visible]:z-10',
            ],
            orientation === 'vertical' && [
              '[&>*:not(:first-child)]:rounded-t-none',
              '[&>*:not(:last-child)]:rounded-b-none',
              '[&>*:not(:first-child)]:-mt-px',
              '[&>*]:relative',
              '[&>*:hover]:z-10',
              '[&>*:focus-visible]:z-10',
            ],
            className
          )}
          {...props}
        >
          {children}
        </div>
      </ButtonGroupContext.Provider>
    )
  }
)
ButtonGroup.displayName = 'ButtonGroup'

export { Button, IconButton, ButtonGroup }
