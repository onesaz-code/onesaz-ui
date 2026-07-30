import * as React from 'react'
import { cn } from '../utils/cn'

type StackSpacing = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16
type StackAlign = 'start' | 'end' | 'center' | 'baseline' | 'stretch'
type StackJustify = 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly'

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Stack direction */
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
  /** Spacing between items */
  spacing?: StackSpacing
  /** Alias for `spacing` (matches the Box/Grid vocabulary) */
  gap?: StackSpacing
  /** Align items */
  align?: StackAlign
  /** Alias for `align` (matches the Box vocabulary) */
  alignItems?: StackAlign
  /** Justify content */
  justify?: StackJustify
  /** Alias for `justify` (matches the Box vocabulary) */
  justifyContent?: StackJustify
  /** Padding (all sides) — matches the Box spacing vocabulary */
  p?: StackSpacing
  /** Horizontal padding */
  px?: StackSpacing
  /** Vertical padding */
  py?: StackSpacing
  /** Wrap items */
  wrap?: 'wrap' | 'nowrap' | 'wrap-reverse'
  /** Alias for `wrap` (matches the Box vocabulary) */
  flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse'
  /** Grow to fill available space along the parent flex axis (flex: 1 1 0%) */
  grow?: boolean
  /** Set to `false` to prevent flex shrinking (applies `shrink-0`) */
  shrink?: boolean
  /** Min height. `0` is required on a growing flex child for inner scroll to engage. */
  minH?: 0 | 'full' | 'screen'
  /** Min width. `0` lets a flex child shrink below its content. */
  minW?: 0 | 'full'
  /** Divider between items */
  divider?: React.ReactNode
  /** Render as a different element */
  as?: React.ElementType
}

const minHClasses: Record<string, string> = { 0: 'min-h-0', full: 'min-h-full', screen: 'min-h-screen' }
const minWClasses: Record<string, string> = { 0: 'min-w-0', full: 'min-w-full' }

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

const paddingClasses: Record<number, string> = {
  0: 'p-0', 1: 'p-1', 2: 'p-2', 3: 'p-3', 4: 'p-4', 5: 'p-5', 6: 'p-6', 8: 'p-8', 10: 'p-10', 12: 'p-12', 16: 'p-16',
}
const paddingXClasses: Record<number, string> = {
  0: 'px-0', 1: 'px-1', 2: 'px-2', 3: 'px-3', 4: 'px-4', 5: 'px-5', 6: 'px-6', 8: 'px-8', 10: 'px-10', 12: 'px-12', 16: 'px-16',
}
const paddingYClasses: Record<number, string> = {
  0: 'py-0', 1: 'py-1', 2: 'py-2', 3: 'py-3', 4: 'py-4', 5: 'py-5', 6: 'py-6', 8: 'py-8', 10: 'py-10', 12: 'py-12', 16: 'py-16',
}

const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  (
    {
      as: Component = 'div',
      className,
      direction = 'column',
      spacing,
      gap,
      align,
      alignItems,
      justify,
      justifyContent,
      p,
      px,
      py,
      wrap,
      flexWrap,
      grow,
      shrink,
      minH,
      minW,
      divider,
      children,
      ...props
    },
    ref
  ) => {
    // Accept both the Stack vocabulary (spacing/justify/align) and the
    // Box/Grid vocabulary (gap/justifyContent/alignItems). Explicit values win.
    const resolvedSpacing = gap ?? spacing ?? 0
    const resolvedAlign = alignItems ?? align
    const resolvedJustify = justifyContent ?? justify

    const classes = cn(
      'flex',
      directionClasses[direction],
      spacingClasses[resolvedSpacing],
      resolvedAlign && alignClasses[resolvedAlign],
      resolvedJustify && justifyClasses[resolvedJustify],
      p !== undefined && paddingClasses[p],
      px !== undefined && paddingXClasses[px],
      py !== undefined && paddingYClasses[py],
      (wrap ?? flexWrap) && wrapClasses[(wrap ?? flexWrap) as string],
      grow && 'flex-1',
      shrink === false && 'shrink-0',
      minH !== undefined && minHClasses[minH],
      minW !== undefined && minWClasses[minW],
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
