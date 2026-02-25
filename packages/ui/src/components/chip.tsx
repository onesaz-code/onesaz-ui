import * as React from 'react'
import { cn } from '../utils/cn'

export interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The text content of the chip */
  label?: string
  /** Visual style variant */
  variant?: 'filled' | 'outlined'
  /** Color scheme */
  color?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'error'
    | 'info'
  /** Size of the chip */
  size?: 'small' | 'medium'
  /** Icon element displayed before the label */
  icon?: React.ReactNode
  /** Avatar element displayed before the label */
  avatar?: React.ReactNode
  /** If provided, renders a delete icon and calls this on click */
  onDelete?: (event: React.MouseEvent) => void
  /** Custom delete icon */
  deleteIcon?: React.ReactNode
  /** Whether the chip is clickable */
  clickable?: boolean
  /** Whether the chip is disabled */
  disabled?: boolean
}

const filledColorClasses: Record<string, string> = {
  default: 'bg-muted text-foreground',
  primary: 'bg-accent text-accent-foreground',
  secondary: 'bg-muted text-muted-foreground',
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  error: 'bg-red-100 text-red-800',
  info: 'bg-blue-100 text-blue-800',
}

const outlinedColorClasses: Record<string, string> = {
  default: 'border-border text-foreground',
  primary: 'border-accent text-accent',
  secondary: 'border-muted-foreground text-muted-foreground',
  success: 'border-green-500 text-green-700',
  warning: 'border-yellow-500 text-yellow-700',
  error: 'border-red-500 text-red-700',
  info: 'border-blue-500 text-blue-700',
}

const sizeClasses: Record<string, string> = {
  small: 'h-6 text-xs px-2',
  medium: 'h-8 text-sm px-3',
}

const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  (
    {
      className,
      label,
      variant = 'filled',
      color = 'default',
      size = 'medium',
      icon,
      avatar,
      onDelete,
      deleteIcon,
      clickable = false,
      disabled = false,
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    const isClickable = clickable || !!onClick
    const content = label ?? children

    return (
      <div
        ref={ref}
        role={isClickable ? 'button' : undefined}
        tabIndex={isClickable && !disabled ? 0 : undefined}
        onClick={disabled ? undefined : onClick}
        className={cn(
          'inline-flex items-center rounded-full font-medium transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1',
          sizeClasses[size],
          variant === 'filled'
            ? filledColorClasses[color]
            : cn('border bg-transparent', outlinedColorClasses[color]),
          isClickable && !disabled && 'cursor-pointer hover:opacity-80',
          disabled && 'pointer-events-none opacity-50',
          className
        )}
        {...props}
      >
        {avatar && (
          <span className="mr-1 -ml-1 flex items-center justify-center [&>*]:h-5 [&>*]:w-5 [&>*]:rounded-full">
            {avatar}
          </span>
        )}
        {!avatar && icon && (
          <span className="mr-1 -ml-0.5 flex items-center justify-center [&>svg]:h-4 [&>svg]:w-4">
            {icon}
          </span>
        )}
        <span className="truncate">{content}</span>
        {onDelete && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              if (!disabled) onDelete(e)
            }}
            className={cn(
              'ml-1 -mr-1 flex items-center justify-center rounded-full',
              'h-4 w-4 hover:bg-black/10 focus:outline-none',
              disabled && 'pointer-events-none'
            )}
            disabled={disabled}
            aria-label="Remove"
          >
            {deleteIcon ?? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-3 w-3"
              >
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            )}
          </button>
        )}
      </div>
    )
  }
)
Chip.displayName = 'Chip'

export { Chip }
