import * as React from 'react'
import { cn } from '../utils/cn'

// ============================================================================
// Types
// ============================================================================

export type ChipColor   = 'default' | 'success' | 'warning' | 'error' | 'destructive'
export type ChipVariant = 'contained' | 'outlined'
export type ChipSize    = 'small' | 'medium'

export interface ChipProps extends React.HTMLAttributes<HTMLElement> {
  /** The text content of the chip */
  label?: string
  /** Visual style variant */
  variant?: ChipVariant
  /** Color scheme */
  color?: ChipColor
  /** Size of the chip */
  size?: ChipSize
  /** Icon element displayed before the label */
  icon?: React.ReactNode
  /** Avatar element displayed before the label */
  avatar?: React.ReactNode
  /** If provided, renders a delete icon and calls this on click.
   *  Also triggered by pressing Delete or Backspace when the chip is focused. */
  onDelete?: (event: React.SyntheticEvent) => void
  /** Custom delete icon */
  deleteIcon?: React.ReactNode
  /** Makes the chip act as a button (adds role, cursor, keyboard support) */
  clickable?: boolean
  /** Whether the chip is disabled */
  disabled?: boolean
  /** Render as a link chip — sets the underlying element to <a> */
  href?: string
  /** HTML element or React component to render as. Overrides href-based inference. */
  component?: React.ElementType
}

// ============================================================================
// Color maps
// ============================================================================

const containedClasses: Record<ChipColor, string> = {
  default:     'bg-accent text-accent-foreground',
  success:     'bg-success-500 text-white dark:bg-success-600',
  warning:     'bg-warning-500 text-white dark:bg-warning-600',
  error:       'bg-error-500 text-white dark:bg-error-600',
  destructive: 'bg-destructive text-destructive-foreground',
}

const containedHoverClasses: Record<ChipColor, string> = {
  default:     'hover:bg-accent-hover',
  success:     'hover:bg-success-600 dark:hover:bg-success-500',
  warning:     'hover:bg-warning-600 dark:hover:bg-warning-500',
  error:       'hover:bg-error-600 dark:hover:bg-error-500',
  destructive: 'hover:bg-destructive/90',
}

const outlinedClasses: Record<ChipColor, string> = {
  default:     'border-accent text-accent',
  success:     'border-success-500 text-success-600 dark:border-success-400 dark:text-success-400',
  warning:     'border-warning-500 text-warning-600 dark:border-warning-400 dark:text-warning-400',
  error:       'border-error-500 text-error-600 dark:border-error-400 dark:text-error-400',
  destructive: 'border-destructive text-destructive',
}

const outlinedHoverClasses: Record<ChipColor, string> = {
  default:     'hover:bg-accent/10',
  success:     'hover:bg-success-500/10',
  warning:     'hover:bg-warning-500/10',
  error:       'hover:bg-error-500/10',
  destructive: 'hover:bg-destructive/10',
}

// ============================================================================
// Size maps
// ============================================================================

const sizeClasses: Record<ChipSize, string> = {
  small:  'h-6 text-xs px-2 gap-1',
  medium: 'h-8 text-sm px-3 gap-1.5',
}

const iconSizeClasses: Record<ChipSize, string> = {
  small:  '[&>svg]:h-3 [&>svg]:w-3',
  medium: '[&>svg]:h-4 [&>svg]:w-4',
}

const avatarSizeClasses: Record<ChipSize, string> = {
  small:  '[&>*]:h-4 [&>*]:w-4',
  medium: '[&>*]:h-5 [&>*]:w-5',
}

const deleteBtnSizeClasses: Record<ChipSize, string> = {
  small:  'h-3.5 w-3.5',
  medium: 'h-4 w-4',
}

// ============================================================================
// Delete icon
// ============================================================================

const DefaultDeleteIcon = ({ size }: { size: ChipSize }) => (
  <svg viewBox="0 0 20 20" fill="currentColor" className={deleteBtnSizeClasses[size]}>
    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
  </svg>
)

// ============================================================================
// Chip
// ============================================================================

const Chip = React.forwardRef<HTMLElement, ChipProps>(
  (
    {
      className,
      label,
      variant  = 'contained',
      color    = 'default',
      size     = 'medium',
      icon,
      avatar,
      onDelete,
      deleteIcon,
      clickable = false,
      disabled  = false,
      href,
      component,
      children,
      onClick,
      onKeyDown,
      ...props
    },
    ref
  ) => {
    const content    = label ?? children
    const isClickable = clickable || !!onClick || !!href
    const Component: React.ElementType = component ?? (href ? 'a' : 'div')
    const safeSize = (size in sizeClasses ? size : 'medium') as keyof typeof sizeClasses
    const safeVariant = (variant === 'contained' || variant === 'outlined' ? variant : 'contained') as ChipVariant

    const colorClass  = safeVariant === 'contained'
      ? (containedClasses[color]   ?? containedClasses.default)
      : (outlinedClasses[color] ?? outlinedClasses.default)

    const hoverClass  = isClickable && !disabled
      ? safeVariant === 'contained'
        ? (containedHoverClasses[color]   ?? containedHoverClasses.default)
        : (outlinedHoverClasses[color] ?? outlinedHoverClasses.default)
      : ''

    // Keyboard: Enter/Space → click; Delete/Backspace → onDelete
    const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
      if (!disabled) {
        if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault()
          ;(e.currentTarget as HTMLElement).click()
        }
        if (onDelete && (e.key === 'Delete' || e.key === 'Backspace')) {
          e.preventDefault()
          onDelete(e)
        }
      }
      onKeyDown?.(e as React.KeyboardEvent<HTMLElement>)
    }

    return (
      <Component
        ref={ref}
        href={href}
        role={isClickable ? 'button' : undefined}
        tabIndex={isClickable && !disabled ? 0 : onDelete && !disabled ? 0 : undefined}
        aria-disabled={disabled || undefined}
        onClick={disabled ? undefined : onClick}
        onKeyDown={handleKeyDown}
        className={cn(
          'inline-flex items-center rounded-full font-medium transition-colors select-none',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
          sizeClasses[safeSize],
          safeVariant === 'outlined' && 'border bg-transparent',
          colorClass,
          hoverClass,
          isClickable && !disabled ? 'cursor-pointer' : 'cursor-default',
          disabled && 'pointer-events-none opacity-50',
          className
        )}
        {...props}
      >
        {/* Avatar */}
        {avatar && (
          <span className={cn('-ml-1 flex shrink-0 items-center justify-center [&>*]:rounded-full', avatarSizeClasses[safeSize])}>
            {avatar}
          </span>
        )}

        {/* Icon */}
        {!avatar && icon && (
          <span className={cn('-ml-0.5 flex shrink-0 items-center justify-center', iconSizeClasses[safeSize])}>
            {icon}
          </span>
        )}

        {/* Label */}
        <span className="truncate">{content}</span>

        {/* Delete button */}
        {onDelete && (
          <button
            type="button"
            tabIndex={-1}
            onClick={(e) => {
              e.stopPropagation()
              if (!disabled) onDelete(e)
            }}
            className={cn(
              '-mr-1 flex shrink-0 items-center justify-center rounded-full',
              'opacity-60 hover:opacity-100 focus:outline-none transition-opacity',
              disabled && 'pointer-events-none'
            )}
            disabled={disabled}
            aria-label="Remove"
          >
            {deleteIcon ?? <DefaultDeleteIcon size={safeSize} />}
          </button>
        )}
      </Component>
    )
  }
)
Chip.displayName = 'Chip'

export { Chip }
