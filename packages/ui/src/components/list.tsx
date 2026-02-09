import * as React from 'react'
import { cn } from '../utils/cn'

// ============================================================================
// List - Container for list items
// ============================================================================

export interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
  /** Whether the list has dividers between items */
  dividers?: boolean
  /** Padding for each list item */
  dense?: boolean
  /** Whether items are clickable (adds hover styles) */
  clickable?: boolean
}

const List = React.forwardRef<HTMLUListElement, ListProps>(
  ({ dividers = false, dense = false, clickable = false, className, ...props }, ref) => (
    <ul
      ref={ref}
      role="list"
      data-dividers={dividers}
      data-dense={dense}
      data-clickable={clickable}
      className={cn('flex flex-col', className)}
      {...props}
    />
  )
)
List.displayName = 'List'

// ============================================================================
// ListItem - Individual item in a list
// ============================================================================

export interface ListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  /** Whether this item is selected/active */
  selected?: boolean
  /** Whether this item is disabled */
  disabled?: boolean
  /** Whether this item is clickable */
  clickable?: boolean
  /** Leading element (icon, avatar, etc.) */
  leading?: React.ReactNode
  /** Trailing element (icon, action, etc.) */
  trailing?: React.ReactNode
  /** Secondary action element */
  secondaryAction?: React.ReactNode
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
        'flex items-center gap-3 px-4 py-3',
        'border-b border-border last:border-b-0',
        '[ul[data-dividers="false"]_&]:border-b-0',
        '[ul[data-dense="true"]_&]:py-2 [ul[data-dense="true"]_&]:px-3',
        clickable && !disabled && [
          'cursor-pointer',
          'hover:bg-muted',
          'focus:outline-none focus:bg-muted',
        ],
        '[ul[data-clickable="true"]_&]:cursor-pointer [ul[data-clickable="true"]_&]:hover:bg-muted',
        selected && 'bg-muted',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      {...props}
    >
      {leading && <div className="shrink-0">{leading}</div>}
      <div className="flex-1 min-w-0">{children}</div>
      {trailing && <div className="shrink-0">{trailing}</div>}
      {secondaryAction && <div className="shrink-0 ml-2">{secondaryAction}</div>}
    </li>
  )
)
ListItem.displayName = 'ListItem'

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
}

const ListItemText = React.forwardRef<HTMLDivElement, ListItemTextProps>(
  ({ primary, secondary, noWrap = false, className, children, ...props }, ref) => (
    <div ref={ref} className={cn('min-w-0', className)} {...props}>
      {primary && (
        <div
          className={cn(
            'text-sm font-medium text-foreground',
            noWrap && 'truncate'
          )}
        >
          {primary}
        </div>
      )}
      {secondary && (
        <div
          className={cn(
            'text-sm text-muted-foreground',
            noWrap && 'truncate'
          )}
        >
          {secondary}
        </div>
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
      className={cn('shrink-0 text-muted-foreground', className)}
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
  /** Whether the subheader is sticky */
  sticky?: boolean
}

const ListSubheader = React.forwardRef<HTMLLIElement, ListSubheaderProps>(
  ({ sticky = false, className, ...props }, ref) => (
    <li
      ref={ref}
      role="presentation"
      className={cn(
        'px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground bg-background',
        sticky && 'sticky top-0 z-10',
        className
      )}
      {...props}
    />
  )
)
ListSubheader.displayName = 'ListSubheader'

// ============================================================================
// ListDivider - Divider between list items
// ============================================================================

export interface ListDividerProps extends React.HTMLAttributes<HTMLLIElement> {
  /** Whether the divider is inset (indented) */
  inset?: boolean
}

const ListDivider = React.forwardRef<HTMLLIElement, ListDividerProps>(
  ({ inset = false, className, ...props }, ref) => (
    <li
      ref={ref}
      role="separator"
      className={cn(
        'border-t border-border my-1',
        inset && 'ml-14',
        className
      )}
      {...props}
    />
  )
)
ListDivider.displayName = 'ListDivider'

export {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemAvatar,
  ListSubheader,
  ListDivider,
}
