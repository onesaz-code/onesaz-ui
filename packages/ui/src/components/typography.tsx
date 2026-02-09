import * as React from 'react'
import { cn } from '../utils/cn'

type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'overline'
  | 'inherit'

type TypographyColor =
  | 'inherit'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'muted'
  | 'white'
  | 'dark'

type FontWeight = 'light' | 'regular' | 'medium' | 'semibold' | 'bold'

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  /** Typography variant */
  variant?: TypographyVariant
  /** Text color */
  color?: TypographyColor
  /** Font weight override */
  fontWeight?: FontWeight
  /** Text transform */
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize'
  /** Text alignment */
  align?: 'left' | 'center' | 'right' | 'justify'
  /** Vertical alignment */
  verticalAlign?: 'top' | 'middle' | 'bottom' | 'baseline'
  /** Enable text gradient effect */
  textGradient?: boolean
  /** Gradient color (when textGradient is true) */
  gradientColor?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' | 'dark'
  /** Opacity */
  opacity?: number
  /** Render as a different element */
  as?: React.ElementType
  /** Disable bottom margin */
  gutterBottom?: boolean
  /** Prevent text wrap */
  noWrap?: boolean
  /** Paragraph mode (adds bottom margin) */
  paragraph?: boolean
}

const variantMapping: Record<TypographyVariant, React.ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle1: 'h6',
  subtitle2: 'h6',
  body1: 'p',
  body2: 'p',
  caption: 'span',
  overline: 'span',
  inherit: 'span',
}

const variantClasses: Record<TypographyVariant, string> = {
  h1: 'text-4xl font-bold leading-tight tracking-tight',
  h2: 'text-3xl font-bold leading-tight tracking-tight',
  h3: 'text-2xl font-semibold leading-snug',
  h4: 'text-xl font-semibold leading-snug',
  h5: 'text-lg font-medium leading-normal',
  h6: 'text-base font-medium leading-normal',
  subtitle1: 'text-base font-normal leading-relaxed',
  subtitle2: 'text-sm font-medium leading-relaxed',
  body1: 'text-base font-normal leading-relaxed',
  body2: 'text-sm font-normal leading-relaxed',
  caption: 'text-xs font-normal leading-normal',
  overline: 'text-xs font-medium uppercase tracking-widest leading-relaxed',
  inherit: '',
}

const colorClasses: Record<TypographyColor, string> = {
  inherit: '',
  primary: 'text-accent',
  secondary: 'text-muted-foreground',
  success: 'text-green-600 dark:text-green-400',
  warning: 'text-orange-600 dark:text-orange-400',
  error: 'text-destructive',
  info: 'text-blue-600 dark:text-blue-400',
  muted: 'text-muted-foreground',
  white: 'text-white',
  dark: 'text-foreground',
}

const fontWeightClasses: Record<FontWeight, string> = {
  light: 'font-light',
  regular: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
}

const textTransformClasses: Record<string, string> = {
  none: 'normal-case',
  uppercase: 'uppercase',
  lowercase: 'lowercase',
  capitalize: 'capitalize',
}

const alignClasses: Record<string, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify',
}

const verticalAlignClasses: Record<string, string> = {
  top: 'align-top',
  middle: 'align-middle',
  bottom: 'align-bottom',
  baseline: 'align-baseline',
}

const gradientClasses: Record<string, string> = {
  primary: 'from-purple-5 to-purple-8',
  secondary: 'from-slate-5 to-slate-8',
  info: 'from-blue-4 to-blue-7',
  success: 'from-green-4 to-green-7',
  warning: 'from-orange-4 to-orange-7',
  error: 'from-red-4 to-red-7',
  dark: 'from-slate-7 to-slate-10',
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  (
    {
      className,
      variant = 'body1',
      color = 'inherit',
      fontWeight,
      textTransform,
      align,
      verticalAlign,
      textGradient = false,
      gradientColor = 'primary',
      opacity,
      as,
      gutterBottom = false,
      noWrap = false,
      paragraph = false,
      style,
      ...props
    },
    ref
  ) => {
    const Component = as || variantMapping[variant]

    const classes = cn(
      variantClasses[variant],
      color !== 'inherit' && !textGradient && colorClasses[color],
      fontWeight && fontWeightClasses[fontWeight],
      textTransform && textTransformClasses[textTransform],
      align && alignClasses[align],
      verticalAlign && verticalAlignClasses[verticalAlign],
      gutterBottom && 'mb-2',
      noWrap && 'truncate',
      paragraph && 'mb-4',
      // Text gradient styles
      textGradient && [
        'bg-gradient-to-r bg-clip-text text-transparent',
        gradientClasses[gradientColor],
      ],
      className
    )

    const combinedStyle = opacity !== undefined ? { ...style, opacity } : style

    return (
      <Component
        ref={ref}
        className={classes}
        style={combinedStyle}
        {...props}
      />
    )
  }
)
Typography.displayName = 'Typography'

// Convenience components
const H1 = React.forwardRef<HTMLHeadingElement, Omit<TypographyProps, 'variant'>>(
  (props, ref) => <Typography ref={ref} variant="h1" {...props} />
)
H1.displayName = 'H1'

const H2 = React.forwardRef<HTMLHeadingElement, Omit<TypographyProps, 'variant'>>(
  (props, ref) => <Typography ref={ref} variant="h2" {...props} />
)
H2.displayName = 'H2'

const H3 = React.forwardRef<HTMLHeadingElement, Omit<TypographyProps, 'variant'>>(
  (props, ref) => <Typography ref={ref} variant="h3" {...props} />
)
H3.displayName = 'H3'

const H4 = React.forwardRef<HTMLHeadingElement, Omit<TypographyProps, 'variant'>>(
  (props, ref) => <Typography ref={ref} variant="h4" {...props} />
)
H4.displayName = 'H4'

const H5 = React.forwardRef<HTMLHeadingElement, Omit<TypographyProps, 'variant'>>(
  (props, ref) => <Typography ref={ref} variant="h5" {...props} />
)
H5.displayName = 'H5'

const H6 = React.forwardRef<HTMLHeadingElement, Omit<TypographyProps, 'variant'>>(
  (props, ref) => <Typography ref={ref} variant="h6" {...props} />
)
H6.displayName = 'H6'

const Text = React.forwardRef<HTMLParagraphElement, Omit<TypographyProps, 'variant'>>(
  (props, ref) => <Typography ref={ref} variant="body1" {...props} />
)
Text.displayName = 'Text'

const Caption = React.forwardRef<HTMLSpanElement, Omit<TypographyProps, 'variant'>>(
  (props, ref) => <Typography ref={ref} variant="caption" {...props} />
)
Caption.displayName = 'Caption'

export { Typography, H1, H2, H3, H4, H5, H6, Text, Caption }
