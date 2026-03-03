import * as React from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { cn } from '../utils/cn'

// ============================================================================
// List - Container for list items
// ============================================================================

export interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
  /** Whether the list has dividers between items */
  dividers?: boolean
  /** Compact mode — reduces item padding */
  dense?: boolean
  /** Whether items are clickable (adds hover styles to all children) */
  clickable?: boolean
  /** Removes the list container's vertical padding */
  disablePadding?: boolean
}

const List = React.forwardRef<HTMLUListElement, ListProps>(
  (
    {
      dividers = false,
      dense = false,
      clickable = false,
      disablePadding = false,
      className,
      ...props
    },
    ref
  ) => (
    <ul
      ref={ref}
      role="list"
      data-dividers={dividers}
      data-dense={dense}
      data-clickable={clickable}
      className={cn('flex flex-col', !disablePadding && 'py-1', className)}
      {...props}
    />
  )
)
List.displayName = 'List'

// ============================================================================
// ListItem - Container for list item content (non-interactive)
// ============================================================================

export interface ListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  /** Whether this item is selected/active */
  selected?: boolean
  /** Whether this item is disabled */
  disabled?: boolean
  /** @deprecated Prefer using ListItemButton for interactive items */
  clickable?: boolean
  /** Leading element (icon, avatar, etc.) */
  leading?: React.ReactNode
  /** Trailing element (icon, action, etc.) */
  trailing?: React.ReactNode
  /** Secondary action element (absolutely positioned at end) */
  secondaryAction?: React.ReactNode
  /** Indents the item to align with items that have a leading icon/avatar */
  inset?: boolean
  /** Removes left and right padding */
  disableGutters?: boolean
  /** Vertical alignment for multi-line content */
  alignItems?: 'center' | 'flex-start'
}

const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  (
    {
      selected = false,
      disabled = false,
      clickable = false,
      leading,
      trailing,
      secondaryAction,
      inset = false,
      disableGutters = false,
      alignItems = 'center',
      className,
      children,
      ...props
    },
    ref
  ) => (
    <li
      ref={ref}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable && !disabled ? 0 : undefined}
      aria-selected={selected}
      aria-disabled={disabled}
      className={cn(
        'relative flex gap-3 py-2',
        alignItems === 'center' ? 'items-center' : 'items-start',
        !disableGutters && 'px-4',
        'border-b border-border last:border-b-0',
        '[ul[data-dividers="false"]_&]:border-b-0',
        '[ul[data-dense="true"]_&]:py-1',
        inset && 'pl-14',
        clickable && !disabled && [
          'cursor-pointer',
          'hover:bg-muted',
          'focus:outline-none focus:bg-muted',
        ],
        '[ul[data-clickable="true"]_&]:cursor-pointer [ul[data-clickable="true"]_&]:hover:bg-muted',
        selected && 'bg-muted',
        disabled && 'opacity-50 cursor-not-allowed',
        secondaryAction && 'pr-12',
        className
      )}
      {...props}
    >
      {leading && (
        <div
          className={cn(
            'shrink-0',
            alignItems === 'center' ? 'self-center' : 'self-start mt-0.5'
          )}
        >
          {leading}
        </div>
      )}
      <div className="flex-1 min-w-0">{children}</div>
      {trailing && <div className="shrink-0">{trailing}</div>}
      {secondaryAction && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 shrink-0">
          {secondaryAction}
        </div>
      )}
    </li>
  )
)
ListItem.displayName = 'ListItem'

// ============================================================================
// ListItemButton - Interactive list item (preferred over clickable ListItem)
// ============================================================================

export interface ListItemButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Whether this item is selected/active */
  selected?: boolean
  /** Compact mode — reduces padding */
  dense?: boolean
  /** Removes left and right padding */
  disableGutters?: boolean
  /** Adds a bottom border to act as a divider */
  divider?: boolean
  /** Vertical alignment for multi-line content */
  alignItems?: 'center' | 'flex-start'
  /** Auto-focuses this element on mount */
  autoFocus?: boolean
}

const ListItemButton = React.forwardRef<HTMLButtonElement, ListItemButtonProps>(
  (
    {
      selected = false,
      dense = false,
      disableGutters = false,
      divider = false,
      alignItems = 'center',
      autoFocus = false,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => (
    <button
      ref={ref}
      type="button"
      autoFocus={autoFocus}
      disabled={disabled}
      aria-selected={selected}
      className={cn(
        'relative flex w-full gap-3 py-2 text-left text-sm',
        'transition-colors',
        alignItems === 'center' ? 'items-center' : 'items-start',
        !disableGutters && 'px-4',
        dense ? 'py-1' : 'py-2',
        '[ul[data-dense="true"]_&]:py-1',
        divider && 'border-b border-border',
        'hover:bg-muted',
        'focus:outline-none focus-visible:bg-muted',
        selected && 'bg-muted text-foreground',
        disabled && 'pointer-events-none opacity-50',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
)
ListItemButton.displayName = 'ListItemButton'

// ============================================================================
// ListItemText - Text content for a list item
// ============================================================================

export interface ListItemTextProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Primary text */
  primary?: React.ReactNode
  /** Secondary text */
  secondary?: React.ReactNode
  /** Whether to prevent text wrapping */
  noWrap?: boolean
  /** Indents text to align with items that have a leading icon/avatar */
  inset?: boolean
  /** Additional props forwarded to the primary text element */
  primaryTypographyProps?: React.HTMLAttributes<HTMLParagraphElement>
  /** Additional props forwarded to the secondary text element */
  secondaryTypographyProps?: React.HTMLAttributes<HTMLParagraphElement>
}

const ListItemText = React.forwardRef<HTMLDivElement, ListItemTextProps>(
  (
    {
      primary,
      secondary,
      noWrap = false,
      inset = false,
      primaryTypographyProps,
      secondaryTypographyProps,
      className,
      children,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cn('min-w-0 flex-1', inset && 'pl-10', className)}
      {...props}
    >
      {primary && (
        <p
          {...primaryTypographyProps}
          className={cn(
            'text-sm font-medium text-foreground leading-snug',
            noWrap && 'truncate',
            primaryTypographyProps?.className
          )}
        >
          {primary}
        </p>
      )}
      {secondary && (
        <p
          {...secondaryTypographyProps}
          className={cn(
            'text-xs text-muted-foreground leading-snug mt-0.5',
            noWrap && 'truncate',
            secondaryTypographyProps?.className
          )}
        >
          {secondary}
        </p>
      )}
      {!primary && !secondary && children}
    </div>
  )
)
ListItemText.displayName = 'ListItemText'

// ============================================================================
// ListItemIcon - Icon wrapper for list items
// ============================================================================

export interface ListItemIconProps extends React.HTMLAttributes<HTMLDivElement> {}

const ListItemIcon = React.forwardRef<HTMLDivElement, ListItemIconProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('shrink-0 flex items-center justify-center text-muted-foreground w-5', className)}
      {...props}
    />
  )
)
ListItemIcon.displayName = 'ListItemIcon'

// ============================================================================
// ListItemAvatar - Avatar wrapper for list items
// ============================================================================

export interface ListItemAvatarProps extends React.HTMLAttributes<HTMLDivElement> {}

const ListItemAvatar = React.forwardRef<HTMLDivElement, ListItemAvatarProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('shrink-0', className)} {...props} />
  )
)
ListItemAvatar.displayName = 'ListItemAvatar'

// ============================================================================
// ListSubheader - Section header for lists
// ============================================================================

export interface ListSubheaderProps extends React.HTMLAttributes<HTMLLIElement> {
  /** Disables sticky positioning (sticky is on by default) */
  disableSticky?: boolean
  /** Removes left and right padding */
  disableGutters?: boolean
  /** @deprecated Use disableSticky instead */
  sticky?: boolean
}

const ListSubheader = React.forwardRef<HTMLLIElement, ListSubheaderProps>(
  ({ disableSticky = false, disableGutters = false, sticky, className, ...props }, ref) => {
    // sticky prop (legacy) defaults to true unless explicitly set to false
    const isSticky = sticky !== undefined ? sticky : !disableSticky
    return (
      <li
        ref={ref}
        role="presentation"
        className={cn(
          'py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground bg-background',
          !disableGutters && 'px-4',
          isSticky && 'sticky top-0 z-10',
          className
        )}
        {...props}
      />
    )
  }
)
ListSubheader.displayName = 'ListSubheader'

// ============================================================================
// ListDivider - Divider between list items
// ============================================================================

export interface ListDividerProps extends React.HTMLAttributes<HTMLLIElement> {
  /** Whether the divider is inset (indented to align with item text) */
  inset?: boolean
}

const ListDivider = React.forwardRef<HTMLLIElement, ListDividerProps>(
  ({ inset = false, className, ...props }, ref) => (
    <li
      ref={ref}
      role="separator"
      className={cn('border-t border-border my-1', inset && 'ml-14', className)}
      {...props}
    />
  )
)
ListDivider.displayName = 'ListDivider'

// ============================================================================
// VirtualList - Virtualized list for large datasets
// ============================================================================

export interface VirtualListProps<T = unknown> {
  /** Array of items to render */
  items: T[]
  /** Fixed height of each row in pixels */
  itemHeight?: number
  /** Height of the scrollable container in pixels */
  height?: number
  /** Number of extra items to render beyond the visible area */
  overscan?: number
  /** Render function called for each item */
  renderItem: (item: T, index: number) => React.ReactNode
  className?: string
}

function VirtualList<T = unknown>({
  items,
  itemHeight = 48,
  height = 400,
  overscan = 5,
  renderItem,
  className,
}: VirtualListProps<T>) {
  const parentRef = React.useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => itemHeight,
    overscan,
  })

  return (
    <div
      ref={parentRef}
      style={{ height, overflowY: 'auto' }}
      className={cn('relative', className)}
    >
      <ul
        role="list"
        style={{ height: virtualizer.getTotalSize(), position: 'relative' }}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => (
          <li
            key={virtualRow.key}
            style={{
              position: 'absolute',
              top: virtualRow.start,
              left: 0,
              right: 0,
              height: virtualRow.size,
            }}
          >
            {renderItem(items[virtualRow.index], virtualRow.index)}
          </li>
        ))}
      </ul>
    </div>
  )
}

export {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  ListItemAvatar,
  ListSubheader,
  ListDivider,
  VirtualList,
}
