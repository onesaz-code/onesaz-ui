import * as React from 'react'
import { cn } from '../utils/cn'

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Max content width. Defaults to `lg`. */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  /** Horizontal gutter padding. Defaults to `true` (px-4). */
  gutter?: boolean
  /** Render as a different element */
  as?: React.ElementType
}

const maxWidthClasses: Record<NonNullable<ContainerProps['maxWidth']>, string> = {
  sm: 'max-w-2xl',
  md: 'max-w-4xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  '2xl': 'max-w-[96rem]',
  full: 'max-w-full',
}

/**
 * Centres content and caps its width — the page-shell pattern that otherwise
 * needs a hand-written `mx-auto w-full max-w-* px-4`.
 */
const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ as: Component = 'div', className, maxWidth = 'lg', gutter = true, ...props }, ref) => (
    <Component
      ref={ref}
      className={cn('mx-auto w-full', maxWidthClasses[maxWidth], gutter && 'px-4', className)}
      {...props}
    />
  )
)
Container.displayName = 'Container'

export { Container }
