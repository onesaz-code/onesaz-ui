import * as React from 'react'
import { cn } from '../utils/cn'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Variant of the skeleton shape */
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded'
  /** Width of the skeleton (can be number for px or string for any CSS value) */
  width?: number | string
  /** Height of the skeleton (can be number for px or string for any CSS value) */
  height?: number | string
  /** Whether to animate the skeleton */
  animation?: 'pulse' | 'wave' | 'none'
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      variant = 'text',
      width,
      height,
      animation = 'pulse',
      className,
      style,
      ...props
    },
    ref
  ) => {
    const variantClasses = {
      text: 'rounded-md',
      circular: 'rounded-full',
      rectangular: 'rounded-none',
      rounded: 'rounded-lg',
    }

    const animationClasses = {
      pulse: 'animate-pulse',
      wave: 'animate-shimmer bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%]',
      none: '',
    }

    // Default heights based on variant
    const defaultHeight = variant === 'text' ? '1em' : undefined

    return (
      <div
        ref={ref}
        className={cn(
          'bg-muted',
          variantClasses[variant],
          animationClasses[animation],
          className
        )}
        style={{
          width: typeof width === 'number' ? `${width}px` : width,
          height: typeof height === 'number' ? `${height}px` : (height ?? defaultHeight),
          ...style,
        }}
        {...props}
      />
    )
  }
)
Skeleton.displayName = 'Skeleton'

// Skeleton Text - Multiple lines of text skeleton
export interface SkeletonTextProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of lines */
  lines?: number
  /** Width of the last line (percentage or 'full') */
  lastLineWidth?: number | 'full'
  /** Gap between lines */
  gap?: 'sm' | 'md' | 'lg'
  /** Animation type */
  animation?: SkeletonProps['animation']
}

const SkeletonText = React.forwardRef<HTMLDivElement, SkeletonTextProps>(
  (
    {
      lines = 3,
      lastLineWidth = 60,
      gap = 'md',
      animation = 'pulse',
      className,
      ...props
    },
    ref
  ) => {
    const gapClasses = {
      sm: 'space-y-1',
      md: 'space-y-2',
      lg: 'space-y-3',
    }

    return (
      <div ref={ref} className={cn(gapClasses[gap], className)} {...props}>
        {Array.from({ length: lines }).map((_, index) => (
          <Skeleton
            key={index}
            variant="text"
            animation={animation}
            style={{
              width:
                index === lines - 1 && lastLineWidth !== 'full'
                  ? `${lastLineWidth}%`
                  : '100%',
            }}
          />
        ))}
      </div>
    )
  }
)
SkeletonText.displayName = 'SkeletonText'

// Skeleton Avatar
export interface SkeletonAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Size of the avatar skeleton */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  /** Animation type */
  animation?: SkeletonProps['animation']
}

const sizeMap = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 64,
}

const SkeletonAvatar = React.forwardRef<HTMLDivElement, SkeletonAvatarProps>(
  ({ size = 'md', animation = 'pulse', className, ...props }, ref) => {
    const sizeValue = sizeMap[size]
    return (
      <Skeleton
        ref={ref}
        variant="circular"
        width={sizeValue}
        height={sizeValue}
        animation={animation}
        className={className}
        {...props}
      />
    )
  }
)
SkeletonAvatar.displayName = 'SkeletonAvatar'

// Skeleton Card - Common card skeleton pattern
export interface SkeletonCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether to show an image placeholder */
  hasImage?: boolean
  /** Image height */
  imageHeight?: number
  /** Number of text lines */
  lines?: number
  /** Animation type */
  animation?: SkeletonProps['animation']
}

const SkeletonCard = React.forwardRef<HTMLDivElement, SkeletonCardProps>(
  (
    {
      hasImage = true,
      imageHeight = 200,
      lines = 3,
      animation = 'pulse',
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn('rounded-lg border border-border p-4 space-y-4', className)}
        {...props}
      >
        {hasImage && (
          <Skeleton
            variant="rounded"
            height={imageHeight}
            animation={animation}
          />
        )}
        <div className="space-y-2">
          <Skeleton variant="text" width="60%" animation={animation} />
          <SkeletonText lines={lines} animation={animation} />
        </div>
      </div>
    )
  }
)
SkeletonCard.displayName = 'SkeletonCard'

// Skeleton Table Row
export interface SkeletonTableRowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of columns */
  columns?: number
  /** Animation type */
  animation?: SkeletonProps['animation']
}

const SkeletonTableRow = React.forwardRef<HTMLDivElement, SkeletonTableRowProps>(
  ({ columns = 4, animation = 'pulse', className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center gap-4 py-3', className)}
        {...props}
      >
        {Array.from({ length: columns }).map((_, index) => (
          <Skeleton
            key={index}
            variant="text"
            animation={animation}
            className="flex-1"
          />
        ))}
      </div>
    )
  }
)
SkeletonTableRow.displayName = 'SkeletonTableRow'

export { Skeleton, SkeletonText, SkeletonAvatar, SkeletonCard, SkeletonTableRow }
