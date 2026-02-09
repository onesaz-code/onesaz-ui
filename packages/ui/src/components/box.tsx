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
      className
    )

    return <Component ref={ref} className={classes} {...props} />
  }
)
Box.displayName = 'Box'

export { Box }
