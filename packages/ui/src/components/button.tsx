import * as React from 'react'
import { cn } from '../utils/cn'

// ============================================================================
// ButtonGroup Context
// ============================================================================

interface ButtonGroupContextValue {
  variant?: ButtonProps['variant']
  size?: ButtonProps['size']
  disabled?: boolean
}

const ButtonGroupContext = React.createContext<ButtonGroupContextValue>({})
const useButtonGroup = () => React.useContext(ButtonGroupContext)

// ============================================================================
// Button
// ============================================================================

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  /** Whether the button should take the full width of its container */
  fullWidth?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth = false, disabled, ...props }, ref) => {
    const groupCtx = useButtonGroup()
    const resolvedVariant = variant ?? groupCtx.variant ?? 'default'
    const resolvedSize = size ?? groupCtx.size ?? 'default'
    const resolvedDisabled = disabled ?? groupCtx.disabled

    return (
      <button
        disabled={resolvedDisabled}
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors cursor-pointer',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed',
          {
            'bg-accent text-accent-foreground hover:bg-accent-hover':
              resolvedVariant === 'default',
            'bg-destructive text-destructive-foreground hover:bg-destructive/90':
              resolvedVariant === 'destructive',
            'border border-input bg-background hover:bg-muted hover:text-foreground':
              resolvedVariant === 'outline',
            'bg-muted text-foreground hover:bg-muted/80':
              resolvedVariant === 'secondary',
            'hover:bg-muted hover:text-foreground':
              resolvedVariant === 'ghost',
            'text-accent underline-offset-4 hover:underline':
              resolvedVariant === 'link',
          },
          {
            'h-10 px-4 py-2': resolvedSize === 'default',
            'h-9 rounded-md px-3': resolvedSize === 'sm',
            'h-11 rounded-md px-8': resolvedSize === 'lg',
            'h-10 w-10': resolvedSize === 'icon',
          },
          fullWidth && 'w-full',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

// ============================================================================
// IconButton - Specialized button for icons
// ============================================================================

export interface IconButtonProps extends Omit<ButtonProps, 'size'> {
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
  ({ className, variant = 'ghost', size = 'md', rounded = false, ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center transition-colors cursor-pointer',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed',
          {
            'bg-accent text-accent-foreground hover:bg-accent-hover':
              variant === 'default',
            'bg-destructive text-destructive-foreground hover:bg-destructive/90':
              variant === 'destructive',
            'border border-input bg-background hover:bg-muted hover:text-foreground':
              variant === 'outline',
            'bg-muted text-foreground hover:bg-muted/80':
              variant === 'secondary',
            'hover:bg-muted hover:text-foreground':
              variant === 'ghost',
            'text-accent underline-offset-4 hover:underline':
              variant === 'link',
          },
          iconButtonSizes[size],
          rounded ? 'rounded-full' : 'rounded-md',
          className
        )}
        ref={ref}
        {...props}
      />
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
      orientation = 'horizontal',
      disabled,
      fullWidth = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <ButtonGroupContext.Provider value={{ variant, size, disabled }}>
        <div
          ref={ref}
          role="group"
          className={cn(
            'inline-flex',
            orientation === 'vertical' && 'flex-col',
            fullWidth && 'flex w-full',
            // Horizontal: collapse inner borders and strip inner radius
            orientation === 'horizontal' && [
              '[&>*:not(:first-child)]:rounded-l-none',
              '[&>*:not(:last-child)]:rounded-r-none',
              '[&>*:not(:first-child)]:-ml-px',
              // Bring hovered/focused button's border to front
              '[&>*]:relative',
              '[&>*:hover]:z-10',
              '[&>*:focus-visible]:z-10',
            ],
            // Vertical: collapse inner borders and strip inner radius
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
