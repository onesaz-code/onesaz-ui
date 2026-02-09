import * as React from 'react'
import { cn } from '../utils/cn'

// ============================================================================
// Linear Progress
// ============================================================================

export interface LinearProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Progress value (0-100). If undefined, shows indeterminate state */
  value?: number
  /** Color variant */
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
  /** Size of the progress bar */
  size?: 'sm' | 'md' | 'lg'
  /** Whether to show the value label */
  showValue?: boolean
  /** Custom label format */
  formatValue?: (value: number) => string
  /** Whether to animate (only for determinate progress) */
  animated?: boolean
}

const linearSizeClasses = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
}

const variantClasses = {
  default: 'bg-primary-500',
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  error: 'bg-red-500',
  info: 'bg-blue-500',
}

const LinearProgress = React.forwardRef<HTMLDivElement, LinearProgressProps>(
  (
    {
      value,
      variant = 'default',
      size = 'md',
      showValue = false,
      formatValue = (v) => `${Math.round(v)}%`,
      animated = true,
      className,
      ...props
    },
    ref
  ) => {
    const isIndeterminate = value === undefined

    return (
      <div ref={ref} className={cn('w-full', className)} {...props}>
        <div
          className={cn(
            'w-full overflow-hidden rounded-full bg-muted',
            linearSizeClasses[size]
          )}
          role="progressbar"
          aria-valuenow={isIndeterminate ? undefined : value}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className={cn(
              'h-full rounded-full',
              variantClasses[variant],
              animated && !isIndeterminate && 'transition-all duration-300 ease-out',
              isIndeterminate && 'animate-indeterminate-progress w-1/3'
            )}
            style={
              !isIndeterminate
                ? { width: `${Math.min(100, Math.max(0, value))}%` }
                : undefined
            }
          />
        </div>
        {showValue && !isIndeterminate && (
          <span className="mt-1 text-sm text-muted-foreground">
            {formatValue(value!)}
          </span>
        )}
      </div>
    )
  }
)
LinearProgress.displayName = 'LinearProgress'

// ============================================================================
// Circular Progress
// ============================================================================

export interface CircularProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Progress value (0-100). If undefined, shows indeterminate state */
  value?: number
  /** Color variant */
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
  /** Size of the circular progress */
  size?: 'sm' | 'md' | 'lg' | 'xl' | number
  /** Thickness of the progress ring */
  thickness?: number
  /** Whether to show the value in the center */
  showValue?: boolean
  /** Custom label format */
  formatValue?: (value: number) => string
  /** Content to show in the center */
  children?: React.ReactNode
}

const circularSizeValues = {
  sm: 24,
  md: 40,
  lg: 56,
  xl: 72,
}

const strokeColors = {
  default: 'stroke-primary-500',
  success: 'stroke-green-500',
  warning: 'stroke-yellow-500',
  error: 'stroke-red-500',
  info: 'stroke-blue-500',
}

const CircularProgress = React.forwardRef<HTMLDivElement, CircularProgressProps>(
  (
    {
      value,
      variant = 'default',
      size = 'md',
      thickness = 4,
      showValue = false,
      formatValue = (v) => `${Math.round(v)}%`,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const isIndeterminate = value === undefined
    const sizeValue = typeof size === 'number' ? size : circularSizeValues[size]
    const radius = (sizeValue - thickness) / 2
    const circumference = 2 * Math.PI * radius
    const strokeDashoffset = isIndeterminate
      ? 0
      : circumference - (Math.min(100, Math.max(0, value)) / 100) * circumference

    return (
      <div
        ref={ref}
        className={cn('relative inline-flex items-center justify-center', className)}
        style={{ width: sizeValue, height: sizeValue }}
        role="progressbar"
        aria-valuenow={isIndeterminate ? undefined : value}
        aria-valuemin={0}
        aria-valuemax={100}
        {...props}
      >
        <svg
          className={cn(isIndeterminate && 'animate-spin')}
          width={sizeValue}
          height={sizeValue}
          viewBox={`0 0 ${sizeValue} ${sizeValue}`}
        >
          {/* Background circle */}
          <circle
            className="stroke-muted"
            fill="none"
            strokeWidth={thickness}
            cx={sizeValue / 2}
            cy={sizeValue / 2}
            r={radius}
          />
          {/* Progress circle */}
          <circle
            className={cn(
              strokeColors[variant],
              !isIndeterminate && 'transition-all duration-300 ease-out'
            )}
            fill="none"
            strokeWidth={thickness}
            strokeLinecap="round"
            cx={sizeValue / 2}
            cy={sizeValue / 2}
            r={radius}
            strokeDasharray={circumference}
            strokeDashoffset={isIndeterminate ? circumference * 0.75 : strokeDashoffset}
            transform={`rotate(-90 ${sizeValue / 2} ${sizeValue / 2})`}
          />
        </svg>
        {/* Center content */}
        {(showValue || children) && !isIndeterminate && (
          <div className="absolute inset-0 flex items-center justify-center">
            {children || (
              <span
                className="text-foreground font-medium"
                style={{ fontSize: sizeValue * 0.25 }}
              >
                {formatValue(value!)}
              </span>
            )}
          </div>
        )}
      </div>
    )
  }
)
CircularProgress.displayName = 'CircularProgress'

// ============================================================================
// Progress (alias that defaults to Linear)
// ============================================================================

export interface ProgressProps extends LinearProgressProps {}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>((props, ref) => (
  <LinearProgress ref={ref} {...props} />
))
Progress.displayName = 'Progress'

export { LinearProgress, CircularProgress, Progress }
