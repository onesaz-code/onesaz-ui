import * as React from 'react'
import { cn } from '../utils/cn'

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Stack direction */
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
  /** Spacing between items */
  spacing?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16
  /** Align items */
  align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch'
  /** Justify content */
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly'
  /** Wrap items */
  wrap?: 'wrap' | 'nowrap' | 'wrap-reverse'
  /** Divider between items */
  divider?: React.ReactNode
  /** Render as a different element */
  as?: React.ElementType
}

const directionClasses: Record<string, string> = {
  row: 'flex-row',
  'row-reverse': 'flex-row-reverse',
  column: 'flex-col',
  'column-reverse': 'flex-col-reverse',
}

const spacingClasses: Record<number, string> = {
  0: 'gap-0',
  1: 'gap-1',
  2: 'gap-2',
  3: 'gap-3',
  4: 'gap-4',
  5: 'gap-5',
  6: 'gap-6',
  8: 'gap-8',
  10: 'gap-10',
  12: 'gap-12',
  16: 'gap-16',
}

const alignClasses: Record<string, string> = {
  start: 'items-start',
  end: 'items-end',
  center: 'items-center',
  baseline: 'items-baseline',
  stretch: 'items-stretch',
}

const justifyClasses: Record<string, string> = {
  start: 'justify-start',
  end: 'justify-end',
  center: 'justify-center',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
}

const wrapClasses: Record<string, string> = {
  wrap: 'flex-wrap',
  nowrap: 'flex-nowrap',
  'wrap-reverse': 'flex-wrap-reverse',
}

const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  (
    {
      as: Component = 'div',
      className,
      direction = 'column',
      spacing = 0,
      align,
      justify,
      wrap,
      divider,
      children,
      ...props
    },
    ref
  ) => {
    const classes = cn(
      'flex',
      directionClasses[direction],
      spacingClasses[spacing],
      align && alignClasses[align],
      justify && justifyClasses[justify],
      wrap && wrapClasses[wrap],
      className
    )

    // If divider is provided, insert it between children
    if (divider) {
      const childArray = React.Children.toArray(children).filter(Boolean)
      const childrenWithDividers = childArray.reduce<React.ReactNode[]>(
        (acc, child, index) => {
          if (index === 0) {
            return [child]
          }
          return [...acc, React.cloneElement(divider as React.ReactElement, { key: `divider-${index}` }), child]
        },
        []
      )

      return (
        <Component ref={ref} className={classes} {...props}>
          {childrenWithDividers}
        </Component>
      )
    }

    return (
      <Component ref={ref} className={classes} {...props}>
        {children}
      </Component>
    )
  }
)
Stack.displayName = 'Stack'

// HStack - Horizontal Stack helper
const HStack = React.forwardRef<HTMLDivElement, Omit<StackProps, 'direction'>>(
  (props, ref) => <Stack ref={ref} direction="row" {...props} />
)
HStack.displayName = 'HStack'

// VStack - Vertical Stack helper
const VStack = React.forwardRef<HTMLDivElement, Omit<StackProps, 'direction'>>(
  (props, ref) => <Stack ref={ref} direction="column" {...props} />
)
VStack.displayName = 'VStack'

export { Stack, HStack, VStack }
