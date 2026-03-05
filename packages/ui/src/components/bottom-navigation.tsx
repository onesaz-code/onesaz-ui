import * as React from 'react'
import { cn } from '../utils/cn'

// ============================================================================
// Context
// ============================================================================

interface BottomNavigationContextValue {
  value: any
  onChange: (event: React.SyntheticEvent, newValue: any) => void
  showLabels: boolean
}

const BottomNavigationContext = React.createContext<BottomNavigationContextValue>({
  value: null,
  onChange: () => {},
  showLabels: false,
})

// ============================================================================
// BottomNavigation
// ============================================================================

export interface BottomNavigationProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** The currently selected value. */
  value?: any
  /** Callback fired when the value changes. */
  onChange?: (event: React.SyntheticEvent, newValue: any) => void
  /** If true, all action labels are always visible (not just the selected one). */
  showLabels?: boolean
}

const BottomNavigation = React.forwardRef<HTMLDivElement, BottomNavigationProps>(
  ({ className, value, onChange = () => {}, showLabels = false, children, ...props }, ref) => {
    return (
      <BottomNavigationContext.Provider value={{ value, onChange, showLabels }}>
        <div
          ref={ref}
          role="navigation"
          className={cn(
            'flex h-14 w-full items-stretch bg-background border-t border-border',
            className
          )}
          {...props}
        >
          {children}
        </div>
      </BottomNavigationContext.Provider>
    )
  }
)
BottomNavigation.displayName = 'BottomNavigation'

// ============================================================================
// BottomNavigationAction
// ============================================================================

export interface BottomNavigationActionProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
  /** Text label shown below the icon. */
  label?: React.ReactNode
  /** Icon element. */
  icon?: React.ReactNode
  /** The value of this action (matched against BottomNavigation's value). */
  value?: any
  /** If true, always show the label regardless of selection. Overrides parent showLabels. */
  showLabel?: boolean
}

const BottomNavigationAction = React.forwardRef<HTMLButtonElement, BottomNavigationActionProps>(
  ({ className, label, icon, value, showLabel, disabled, onClick, ...props }, ref) => {
    const ctx = React.useContext(BottomNavigationContext)
    const selected = ctx.value !== undefined && ctx.value !== null && ctx.value === value
    const labelVisible = showLabel ?? ctx.showLabels ?? selected

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      ctx.onChange(e, value)
      onClick?.(e)
    }

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={selected}
        disabled={disabled}
        onClick={handleClick}
        className={cn(
          'flex flex-1 flex-col items-center justify-center gap-0.5 px-2 py-1',
          'text-xs font-medium transition-colors duration-150',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset',
          'disabled:pointer-events-none disabled:opacity-40',
          selected
            ? 'text-accent'
            : 'text-muted-foreground hover:text-foreground',
          className
        )}
        {...props}
      >
        {/* Icon */}
        {icon && (
          <span
            className={cn(
              'transition-transform duration-150',
              selected && 'scale-110'
            )}
          >
            {icon}
          </span>
        )}

        {/* Label — always rendered for layout stability; opacity controls visibility */}
        {label !== undefined && (
          <span
            className={cn(
              'transition-all duration-150 leading-none',
              labelVisible ? 'opacity-100 max-h-4' : 'opacity-0 max-h-0 overflow-hidden'
            )}
          >
            {label}
          </span>
        )}
      </button>
    )
  }
)
BottomNavigationAction.displayName = 'BottomNavigationAction'

export { BottomNavigation, BottomNavigationAction }
