import * as React from 'react'
import { cn } from '../utils/cn'

// ============================================================================
// Context
// ============================================================================

type DataListOrientation = 'horizontal' | 'vertical'
type DataListSize = '1' | '2' | '3'

interface DataListContextValue {
  orientation: DataListOrientation
  size: DataListSize
}

const DataListContext = React.createContext<DataListContextValue>({
  orientation: 'horizontal',
  size: '2',
})

// ============================================================================
// DataList (root)
// ============================================================================

export interface DataListProps extends React.HTMLAttributes<HTMLDListElement> {
  /** Layout direction of label-value pairs. @default "horizontal" */
  orientation?: DataListOrientation
  /** Controls spacing and font size. @default "2" */
  size?: DataListSize
}

const sizeStyles: Record<DataListSize, string> = {
  '1': 'text-xs gap-y-1',
  '2': 'text-sm gap-y-2',
  '3': 'text-base gap-y-3',
}

const DataList = React.forwardRef<HTMLDListElement, DataListProps>(
  ({ className, orientation = 'horizontal', size = '2', children, ...props }, ref) => {
    return (
      <DataListContext.Provider value={{ orientation, size }}>
        <dl
          ref={ref}
          className={cn('grid', sizeStyles[size], className)}
          {...props}
        >
          {children}
        </dl>
      </DataListContext.Provider>
    )
  }
)
DataList.displayName = 'DataList'

// ============================================================================
// DataListItem
// ============================================================================

export interface DataListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Vertical alignment of label and value within horizontal items. */
  align?: 'start' | 'center' | 'end' | 'baseline' | 'stretch'
}

const alignStyles: Record<NonNullable<DataListItemProps['align']>, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  baseline: 'items-baseline',
  stretch: 'items-stretch',
}

const DataListItem = React.forwardRef<HTMLDivElement, DataListItemProps>(
  ({ className, align = 'baseline', children, ...props }, ref) => {
    const { orientation } = React.useContext(DataListContext)

    return (
      <div
        ref={ref}
        className={cn(
          'flex gap-2 min-w-0',
          orientation === 'horizontal'
            ? [alignStyles[align], 'flex-row']
            : 'flex-col gap-0.5',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
DataListItem.displayName = 'DataListItem'

// ============================================================================
// DataListLabel
// ============================================================================

type DataListColor =
  | 'default'
  | 'muted'
  | 'primary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'

const colorStyles: Record<DataListColor, string> = {
  default: 'text-foreground',
  muted: 'text-muted-foreground',
  primary: 'text-primary',
  success: 'text-success-600 dark:text-success-400',
  warning: 'text-warning-600 dark:text-warning-400',
  error: 'text-error-600 dark:text-error-400',
  info: 'text-info-600 dark:text-info-400',
}

export interface DataListLabelProps extends React.HTMLAttributes<HTMLElement> {
  /** Fixed width of the label column (CSS value, e.g. "120px" or "8rem"). */
  width?: React.CSSProperties['width']
  /** Minimum width of the label. */
  minWidth?: React.CSSProperties['minWidth']
  /** Maximum width of the label. */
  maxWidth?: React.CSSProperties['maxWidth']
  /** Applies a theme color to the label text. @default "muted" */
  color?: DataListColor
  /** Increases color contrast. */
  highContrast?: boolean
}

const DataListLabel = React.forwardRef<HTMLElement, DataListLabelProps>(
  (
    {
      className,
      style,
      width,
      minWidth,
      maxWidth,
      color = 'muted',
      highContrast = false,
      children,
      ...props
    },
    ref
  ) => {
    const { orientation } = React.useContext(DataListContext)

    const resolvedColor = highContrast ? 'text-foreground' : colorStyles[color]

    return (
      <dt
        ref={ref as React.Ref<HTMLElement>}
        className={cn(
          'font-medium shrink-0 leading-snug',
          resolvedColor,
          orientation === 'horizontal' && 'pt-px',
          className
        )}
        style={{
          width: orientation === 'horizontal' ? width : undefined,
          minWidth: orientation === 'horizontal' ? minWidth : undefined,
          maxWidth: orientation === 'horizontal' ? maxWidth : undefined,
          ...style,
        }}
        {...props}
      >
        {children}
      </dt>
    )
  }
)
DataListLabel.displayName = 'DataListLabel'

// ============================================================================
// DataListValue
// ============================================================================

export interface DataListValueProps extends React.HTMLAttributes<HTMLElement> {}

const DataListValue = React.forwardRef<HTMLElement, DataListValueProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <dd
        ref={ref as React.Ref<HTMLElement>}
        className={cn('min-w-0 flex-1 leading-snug text-foreground', className)}
        {...props}
      >
        {children}
      </dd>
    )
  }
)
DataListValue.displayName = 'DataListValue'

// ============================================================================
// Exports
// ============================================================================

export { DataList, DataListItem, DataListLabel, DataListValue }
