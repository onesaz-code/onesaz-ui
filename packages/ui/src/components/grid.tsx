import * as React from 'react'
import { cn } from '../utils/cn'

type GridSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'auto'
type GridSpacing = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** If true, the component will be a container (uses display: grid) */
  container?: boolean
  /** If true, the component will be a grid item */
  item?: boolean
  /** Number of columns the item spans (1-12) or 'auto' */
  xs?: GridSize
  /** Columns at sm breakpoint (640px) */
  sm?: GridSize
  /** Columns at md breakpoint (768px) */
  md?: GridSize
  /** Columns at lg breakpoint (1024px) */
  lg?: GridSize
  /** Columns at xl breakpoint (1280px) */
  xl?: GridSize
  /** Columns at 2xl breakpoint (1536px) */
  xxl?: GridSize
  /** Gap between grid items */
  spacing?: GridSpacing
  /** Row gap */
  rowSpacing?: GridSpacing
  /** Column gap */
  columnSpacing?: GridSpacing
  /** Number of columns in the grid (for container) */
  columns?: 1 | 2 | 3 | 4 | 5 | 6 | 12
  /** Align items */
  alignItems?: 'start' | 'end' | 'center' | 'baseline' | 'stretch'
  /** Justify items */
  justifyItems?: 'start' | 'end' | 'center' | 'stretch'
  /** Justify content */
  justifyContent?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly'
}

const spacingClasses: Record<GridSpacing, string> = {
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

const rowSpacingClasses: Record<GridSpacing, string> = {
  0: 'gap-y-0',
  1: 'gap-y-1',
  2: 'gap-y-2',
  3: 'gap-y-3',
  4: 'gap-y-4',
  5: 'gap-y-5',
  6: 'gap-y-6',
  8: 'gap-y-8',
  10: 'gap-y-10',
  12: 'gap-y-12',
  16: 'gap-y-16',
}

const columnSpacingClasses: Record<GridSpacing, string> = {
  0: 'gap-x-0',
  1: 'gap-x-1',
  2: 'gap-x-2',
  3: 'gap-x-3',
  4: 'gap-x-4',
  5: 'gap-x-5',
  6: 'gap-x-6',
  8: 'gap-x-8',
  10: 'gap-x-10',
  12: 'gap-x-12',
  16: 'gap-x-16',
}

const columnsClasses: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  12: 'grid-cols-12',
}

const alignItemsClasses: Record<string, string> = {
  start: 'items-start',
  end: 'items-end',
  center: 'items-center',
  baseline: 'items-baseline',
  stretch: 'items-stretch',
}

const justifyItemsClasses: Record<string, string> = {
  start: 'justify-items-start',
  end: 'justify-items-end',
  center: 'justify-items-center',
  stretch: 'justify-items-stretch',
}

const justifyContentClasses: Record<string, string> = {
  start: 'justify-start',
  end: 'justify-end',
  center: 'justify-center',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
}

// Column span classes for different breakpoints
const colSpanClasses: Record<string, Record<GridSize, string>> = {
  xs: {
    1: 'col-span-1',
    2: 'col-span-2',
    3: 'col-span-3',
    4: 'col-span-4',
    5: 'col-span-5',
    6: 'col-span-6',
    7: 'col-span-7',
    8: 'col-span-8',
    9: 'col-span-9',
    10: 'col-span-10',
    11: 'col-span-11',
    12: 'col-span-12',
    auto: 'col-auto',
  },
  sm: {
    1: 'sm:col-span-1',
    2: 'sm:col-span-2',
    3: 'sm:col-span-3',
    4: 'sm:col-span-4',
    5: 'sm:col-span-5',
    6: 'sm:col-span-6',
    7: 'sm:col-span-7',
    8: 'sm:col-span-8',
    9: 'sm:col-span-9',
    10: 'sm:col-span-10',
    11: 'sm:col-span-11',
    12: 'sm:col-span-12',
    auto: 'sm:col-auto',
  },
  md: {
    1: 'md:col-span-1',
    2: 'md:col-span-2',
    3: 'md:col-span-3',
    4: 'md:col-span-4',
    5: 'md:col-span-5',
    6: 'md:col-span-6',
    7: 'md:col-span-7',
    8: 'md:col-span-8',
    9: 'md:col-span-9',
    10: 'md:col-span-10',
    11: 'md:col-span-11',
    12: 'md:col-span-12',
    auto: 'md:col-auto',
  },
  lg: {
    1: 'lg:col-span-1',
    2: 'lg:col-span-2',
    3: 'lg:col-span-3',
    4: 'lg:col-span-4',
    5: 'lg:col-span-5',
    6: 'lg:col-span-6',
    7: 'lg:col-span-7',
    8: 'lg:col-span-8',
    9: 'lg:col-span-9',
    10: 'lg:col-span-10',
    11: 'lg:col-span-11',
    12: 'lg:col-span-12',
    auto: 'lg:col-auto',
  },
  xl: {
    1: 'xl:col-span-1',
    2: 'xl:col-span-2',
    3: 'xl:col-span-3',
    4: 'xl:col-span-4',
    5: 'xl:col-span-5',
    6: 'xl:col-span-6',
    7: 'xl:col-span-7',
    8: 'xl:col-span-8',
    9: 'xl:col-span-9',
    10: 'xl:col-span-10',
    11: 'xl:col-span-11',
    12: 'xl:col-span-12',
    auto: 'xl:col-auto',
  },
  xxl: {
    1: '2xl:col-span-1',
    2: '2xl:col-span-2',
    3: '2xl:col-span-3',
    4: '2xl:col-span-4',
    5: '2xl:col-span-5',
    6: '2xl:col-span-6',
    7: '2xl:col-span-7',
    8: '2xl:col-span-8',
    9: '2xl:col-span-9',
    10: '2xl:col-span-10',
    11: '2xl:col-span-11',
    12: '2xl:col-span-12',
    auto: '2xl:col-auto',
  },
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  (
    {
      className,
      container,
      item,
      xs,
      sm,
      md,
      lg,
      xl,
      xxl,
      spacing,
      rowSpacing,
      columnSpacing,
      columns = 12,
      alignItems,
      justifyItems,
      justifyContent,
      children,
      ...props
    },
    ref
  ) => {
    const classes = cn(
      // Container styles
      container && 'grid',
      container && columnsClasses[columns],
      container && spacing !== undefined && spacingClasses[spacing],
      container && rowSpacing !== undefined && rowSpacingClasses[rowSpacing],
      container && columnSpacing !== undefined && columnSpacingClasses[columnSpacing],
      container && alignItems && alignItemsClasses[alignItems],
      container && justifyItems && justifyItemsClasses[justifyItems],
      container && justifyContent && justifyContentClasses[justifyContent],
      // Item styles (column spans)
      item && xs && colSpanClasses.xs[xs],
      item && sm && colSpanClasses.sm[sm],
      item && md && colSpanClasses.md[md],
      item && lg && colSpanClasses.lg[lg],
      item && xl && colSpanClasses.xl[xl],
      item && xxl && colSpanClasses.xxl[xxl],
      className
    )

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    )
  }
)
Grid.displayName = 'Grid'

export { Grid }
