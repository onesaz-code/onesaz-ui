import * as React from 'react'
import { cn } from '../utils/cn'

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Render as a different element */
  as?: React.ElementType
  /** Display type */
  display?: 'block' | 'inline-block' | 'inline' | 'flex' | 'inline-flex' | 'grid' | 'inline-grid' | 'none'
  /** Flex direction */
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
  /** Align items */
  alignItems?: 'start' | 'end' | 'center' | 'baseline' | 'stretch'
  /** Justify content */
  justifyContent?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly'
  /** Flex wrap */
  flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse'
  /** Gap */
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16
  /** Padding */
  p?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16
  /** Padding X */
  px?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16
  /** Padding Y */
  py?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16
  /** Margin */
  m?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 'auto'
  /** Margin X */
  mx?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 'auto'
  /** Margin Y */
  my?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 'auto'
  /** Border radius */
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  /** Shadow */
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  /** Background color */
  bg?: 'background' | 'foreground' | 'muted' | 'accent' | 'card' | 'popover' | 'destructive' | 'transparent'
  /** Text color */
  color?: 'foreground' | 'muted-foreground' | 'accent' | 'accent-foreground' | 'destructive' | 'destructive-foreground'
  /** Border */
  border?: boolean
  /** Border color */
  borderColor?: 'border' | 'input' | 'ring' | 'transparent'
  /** Width */
  w?: 'full' | 'auto' | 'screen' | 'min' | 'max' | 'fit'
  /** Height */
  h?: 'full' | 'auto' | 'screen' | 'min' | 'max' | 'fit'
  /** Position */
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky'
  /** Overflow */
  overflow?: 'auto' | 'hidden' | 'visible' | 'scroll'
  /** Fixed width/height in px (escape hatch beyond the keyword sizes) */
  width?: number
  height?: number
  /** Grow to fill available space along the flex axis (flex: 1 1 0%) */
  grow?: boolean
  /** Set to `false` to prevent flex shrinking (applies `shrink-0`) */
  shrink?: boolean
  /** Min height. `0` is required on a growing flex child for inner scroll to engage. */
  minH?: 0 | 'full' | 'screen'
  /** Min width. `0` lets a flex child shrink below its content (e.g. so a grid/table can scroll). */
  minW?: 0 | 'full'
  /** Padding per side */
  pt?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16
  pr?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16
  pb?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16
  pl?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16
  /** Pin all inset edges to 0 (for an absolute overlay) */
  inset?: boolean
  /** Inset offsets (for position sticky/absolute/fixed) */
  top?: 0 | 2 | 4 | 6 | 8 | 10 | 12 | 16 | 20 | 24
  right?: 0 | 2 | 4 | 6 | 8 | 10 | 12 | 16 | 20 | 24
  bottom?: 0 | 2 | 4 | 6 | 8 | 10 | 12 | 16 | 20 | 24
  left?: 0 | 2 | 4 | 6 | 8 | 10 | 12 | 16 | 20 | 24
  /** z-index tier (maps to the design-system z scale) */
  z?: 0 | 10 | 20 | 30 | 40 | 50
}

const displayClasses: Record<string, string> = {
  block: 'block',
  'inline-block': 'inline-block',
  inline: 'inline',
  flex: 'flex',
  'inline-flex': 'inline-flex',
  grid: 'grid',
  'inline-grid': 'inline-grid',
  none: 'hidden',
}

const flexDirectionClasses: Record<string, string> = {
  row: 'flex-row',
  'row-reverse': 'flex-row-reverse',
  column: 'flex-col',
  'column-reverse': 'flex-col-reverse',
}

const alignItemsClasses: Record<string, string> = {
  start: 'items-start',
  end: 'items-end',
  center: 'items-center',
  baseline: 'items-baseline',
  stretch: 'items-stretch',
}

const justifyContentClasses: Record<string, string> = {
  start: 'justify-start',
  end: 'justify-end',
  center: 'justify-center',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
}

const flexWrapClasses: Record<string, string> = {
  wrap: 'flex-wrap',
  nowrap: 'flex-nowrap',
  'wrap-reverse': 'flex-wrap-reverse',
}

const gapClasses: Record<number, string> = {
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

const paddingClasses: Record<number, string> = {
  0: 'p-0',
  1: 'p-1',
  2: 'p-2',
  3: 'p-3',
  4: 'p-4',
  5: 'p-5',
  6: 'p-6',
  8: 'p-8',
  10: 'p-10',
  12: 'p-12',
  16: 'p-16',
}

const paddingXClasses: Record<number, string> = {
  0: 'px-0',
  1: 'px-1',
  2: 'px-2',
  3: 'px-3',
  4: 'px-4',
  5: 'px-5',
  6: 'px-6',
  8: 'px-8',
  10: 'px-10',
  12: 'px-12',
  16: 'px-16',
}

const paddingYClasses: Record<number, string> = {
  0: 'py-0',
  1: 'py-1',
  2: 'py-2',
  3: 'py-3',
  4: 'py-4',
  5: 'py-5',
  6: 'py-6',
  8: 'py-8',
  10: 'py-10',
  12: 'py-12',
  16: 'py-16',
}

const marginClasses: Record<number | 'auto', string> = {
  0: 'm-0',
  1: 'm-1',
  2: 'm-2',
  3: 'm-3',
  4: 'm-4',
  5: 'm-5',
  6: 'm-6',
  8: 'm-8',
  10: 'm-10',
  12: 'm-12',
  16: 'm-16',
  auto: 'm-auto',
}

const marginXClasses: Record<number | 'auto', string> = {
  0: 'mx-0',
  1: 'mx-1',
  2: 'mx-2',
  3: 'mx-3',
  4: 'mx-4',
  5: 'mx-5',
  6: 'mx-6',
  8: 'mx-8',
  10: 'mx-10',
  12: 'mx-12',
  16: 'mx-16',
  auto: 'mx-auto',
}

const marginYClasses: Record<number | 'auto', string> = {
  0: 'my-0',
  1: 'my-1',
  2: 'my-2',
  3: 'my-3',
  4: 'my-4',
  5: 'my-5',
  6: 'my-6',
  8: 'my-8',
  10: 'my-10',
  12: 'my-12',
  16: 'my-16',
  auto: 'my-auto',
}

const roundedClasses: Record<string, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  full: 'rounded-full',
}

const shadowClasses: Record<string, string> = {
  none: 'shadow-none',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  '2xl': 'shadow-2xl',
}

const bgClasses: Record<string, string> = {
  background: 'bg-background',
  foreground: 'bg-foreground',
  muted: 'bg-muted',
  accent: 'bg-accent',
  card: 'bg-card',
  popover: 'bg-popover',
  destructive: 'bg-destructive',
  transparent: 'bg-transparent',
}

const colorClasses: Record<string, string> = {
  foreground: 'text-foreground',
  'muted-foreground': 'text-muted-foreground',
  accent: 'text-accent',
  'accent-foreground': 'text-accent-foreground',
  destructive: 'text-destructive',
  'destructive-foreground': 'text-destructive-foreground',
}

const borderColorClasses: Record<string, string> = {
  border: 'border-border',
  input: 'border-input',
  ring: 'border-ring',
  transparent: 'border-transparent',
}

const widthClasses: Record<string, string> = {
  full: 'w-full',
  auto: 'w-auto',
  screen: 'w-screen',
  min: 'w-min',
  max: 'w-max',
  fit: 'w-fit',
}

const heightClasses: Record<string, string> = {
  full: 'h-full',
  auto: 'h-auto',
  screen: 'h-screen',
  min: 'h-min',
  max: 'h-max',
  fit: 'h-fit',
}

const positionClasses: Record<string, string> = {
  static: 'static',
  relative: 'relative',
  absolute: 'absolute',
  fixed: 'fixed',
  sticky: 'sticky',
}

const overflowClasses: Record<string, string> = {
  auto: 'overflow-auto',
  hidden: 'overflow-hidden',
  visible: 'overflow-visible',
  scroll: 'overflow-scroll',
}

const ptClasses: Record<number, string> = { 0: 'pt-0', 1: 'pt-1', 2: 'pt-2', 3: 'pt-3', 4: 'pt-4', 5: 'pt-5', 6: 'pt-6', 8: 'pt-8', 10: 'pt-10', 12: 'pt-12', 16: 'pt-16' }
const prClasses: Record<number, string> = { 0: 'pr-0', 1: 'pr-1', 2: 'pr-2', 3: 'pr-3', 4: 'pr-4', 5: 'pr-5', 6: 'pr-6', 8: 'pr-8', 10: 'pr-10', 12: 'pr-12', 16: 'pr-16' }
const pbClasses: Record<number, string> = { 0: 'pb-0', 1: 'pb-1', 2: 'pb-2', 3: 'pb-3', 4: 'pb-4', 5: 'pb-5', 6: 'pb-6', 8: 'pb-8', 10: 'pb-10', 12: 'pb-12', 16: 'pb-16' }
const plClasses: Record<number, string> = { 0: 'pl-0', 1: 'pl-1', 2: 'pl-2', 3: 'pl-3', 4: 'pl-4', 5: 'pl-5', 6: 'pl-6', 8: 'pl-8', 10: 'pl-10', 12: 'pl-12', 16: 'pl-16' }

const topClasses: Record<number, string> = { 0: 'top-0', 2: 'top-2', 4: 'top-4', 6: 'top-6', 8: 'top-8', 10: 'top-10', 12: 'top-12', 16: 'top-16', 20: 'top-20', 24: 'top-24' }
const rightClasses: Record<number, string> = { 0: 'right-0', 2: 'right-2', 4: 'right-4', 6: 'right-6', 8: 'right-8', 10: 'right-10', 12: 'right-12', 16: 'right-16', 20: 'right-20', 24: 'right-24' }
const bottomClasses: Record<number, string> = { 0: 'bottom-0', 2: 'bottom-2', 4: 'bottom-4', 6: 'bottom-6', 8: 'bottom-8', 10: 'bottom-10', 12: 'bottom-12', 16: 'bottom-16', 20: 'bottom-20', 24: 'bottom-24' }
const leftClasses: Record<number, string> = { 0: 'left-0', 2: 'left-2', 4: 'left-4', 6: 'left-6', 8: 'left-8', 10: 'left-10', 12: 'left-12', 16: 'left-16', 20: 'left-20', 24: 'left-24' }

const zClasses: Record<number, string> = { 0: 'z-0', 10: 'z-10', 20: 'z-20', 30: 'z-30', 40: 'z-40', 50: 'z-50' }
const minHClasses: Record<string, string> = { 0: 'min-h-0', full: 'min-h-full', screen: 'min-h-screen' }
const minWClasses: Record<string, string> = { 0: 'min-w-0', full: 'min-w-full' }

const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  (
    {
      as: Component = 'div',
      className,
      display,
      flexDirection,
      alignItems,
      justifyContent,
      flexWrap,
      gap,
      p,
      px,
      py,
      m,
      mx,
      my,
      rounded,
      shadow,
      bg,
      color,
      border,
      borderColor,
      w,
      h,
      position,
      overflow,
      width,
      height,
      grow,
      shrink,
      minH,
      minW,
      pt,
      pr,
      pb,
      pl,
      inset,
      top,
      right,
      bottom,
      left,
      z,
      style,
      ...props
    },
    ref
  ) => {
    const classes = cn(
      display && displayClasses[display],
      flexDirection && flexDirectionClasses[flexDirection],
      alignItems && alignItemsClasses[alignItems],
      justifyContent && justifyContentClasses[justifyContent],
      flexWrap && flexWrapClasses[flexWrap],
      gap !== undefined && gapClasses[gap],
      p !== undefined && paddingClasses[p],
      px !== undefined && paddingXClasses[px],
      py !== undefined && paddingYClasses[py],
      m !== undefined && marginClasses[m],
      mx !== undefined && marginXClasses[mx],
      my !== undefined && marginYClasses[my],
      rounded && roundedClasses[rounded],
      shadow && shadowClasses[shadow],
      bg && bgClasses[bg],
      color && colorClasses[color],
      border && 'border',
      borderColor && borderColorClasses[borderColor],
      w && widthClasses[w],
      h && heightClasses[h],
      position && positionClasses[position],
      overflow && overflowClasses[overflow],
      grow && 'flex-1',
      shrink === false && 'shrink-0',
      minH !== undefined && minHClasses[minH],
      minW !== undefined && minWClasses[minW],
      pt !== undefined && ptClasses[pt],
      pr !== undefined && prClasses[pr],
      pb !== undefined && pbClasses[pb],
      pl !== undefined && plClasses[pl],
      inset && 'inset-0',
      top !== undefined && topClasses[top],
      right !== undefined && rightClasses[right],
      bottom !== undefined && bottomClasses[bottom],
      left !== undefined && leftClasses[left],
      z !== undefined && zClasses[z],
      className
    )

    const mergedStyle =
      width !== undefined || height !== undefined
        ? { ...style, ...(width !== undefined && { width }), ...(height !== undefined && { height }) }
        : style

    return <Component ref={ref} className={classes} style={mergedStyle} {...props} />
  }
)
Box.displayName = 'Box'

export { Box }
