import * as React from 'react'
import { cn } from '../utils/cn'

export interface InputAdornmentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Position of the adornment */
  position?: 'start' | 'end'
  /** Disable pointer events (useful for icons) */
  disablePointerEvents?: boolean
}

/**
 * InputAdornment - A wrapper component for input adornments (icons, text, etc.)
 *
 * Can be used standalone or with Input/TextField components.
 *
 * @example
 * ```tsx
 * <Input
 *   startAdornment={
 *     <InputAdornment position="start">
 *       <SearchIcon className="h-4 w-4" />
 *     </InputAdornment>
 *   }
 * />
 *
 * // Or with text
 * <Input
 *   startAdornment={
 *     <InputAdornment position="start">$</InputAdornment>
 *   }
 * />
 * ```
 */
const InputAdornment = React.forwardRef<HTMLDivElement, InputAdornmentProps>(
  ({ className, position = 'start', disablePointerEvents = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center',
          'text-muted-foreground',
          '[&>svg]:h-4 [&>svg]:w-4',
          disablePointerEvents && 'pointer-events-none',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
InputAdornment.displayName = 'InputAdornment'

export { InputAdornment }
