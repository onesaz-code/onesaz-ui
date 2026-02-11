import * as React from 'react'
import { cn } from '../utils/cn'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Input size variant */
  inputSize?: 'sm' | 'md' | 'lg'
  /** Error state */
  error?: boolean
  /** Start adornment */
  startAdornment?: React.ReactNode
  /** End adornment */
  endAdornment?: React.ReactNode
  /** Wrapper class (when using adornments) */
  containerClassName?: string
}

const sizeClasses = {
  sm: 'h-8 text-sm px-2.5',
  md: 'h-10 text-sm px-3',
  lg: 'h-12 text-base px-4',
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      inputSize = 'md',
      error,
      startAdornment,
      endAdornment,
      containerClassName,
      ...props
    },
    ref
  ) => {
    const hasAdornment = startAdornment || endAdornment

    if (hasAdornment) {
      return (
        <div
          className={cn(
            'flex items-center w-full rounded-md border',
            'bg-background',
            error
              ? 'border-destructive focus-within:ring-2 focus-within:ring-destructive/20'
              : 'border-input focus-within:ring-2 focus-within:ring-ring/20 focus-within:border-ring',
            'transition-colors',
            props.disabled && 'opacity-50 cursor-not-allowed bg-muted',
            containerClassName
          )}
        >
          {startAdornment && (
            <div className="flex items-center pl-3 text-muted-foreground">
              {startAdornment}
            </div>
          )}
          <input
            type={type}
            className={cn(
              'flex w-full bg-transparent py-2',
              'text-foreground',
              'placeholder:text-muted-foreground',
              'focus:outline-none',
              'disabled:cursor-not-allowed',
              'file:border-0 file:bg-transparent file:text-sm file:font-medium',
              sizeClasses[inputSize],
              startAdornment && 'pl-2',
              endAdornment && 'pr-2',
              className
            )}
            ref={ref}
            {...props}
          />
          {endAdornment && (
            <div className="flex items-center pr-3 text-muted-foreground">
              {endAdornment}
            </div>
          )}
        </div>
      )
    }

    return (
      <input
        type={type}
        className={cn(
          'flex w-full rounded-md border',
          'bg-background text-foreground',
          'placeholder:text-muted-foreground',
          error
            ? 'border-destructive focus:ring-2 focus:ring-destructive/20'
            : 'border-input focus:ring-2 focus:ring-ring/20 focus:border-ring',
          'focus:outline-none',
          'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted',
          'transition-colors',
          'file:border-0 file:bg-transparent file:text-sm file:font-medium',
          sizeClasses[inputSize],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }
