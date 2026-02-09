import * as React from 'react'
import { cn } from '../utils/cn'

// ============================================================================
// TopBar Root
// ============================================================================

export interface TopBarProps extends React.HTMLAttributes<HTMLElement> {
  /** Whether the topbar has a bottom border */
  bordered?: boolean
  /** Whether the topbar is sticky at the top */
  sticky?: boolean
  /** Height variant */
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'h-12',
  md: 'h-14',
  lg: 'h-16',
}

const TopBar = React.forwardRef<HTMLElement, TopBarProps>(
  ({ className, bordered = true, sticky = false, size = 'md', children, ...props }, ref) => {
    return (
      <header
        ref={ref}
        className={cn(
          'flex items-center px-4 bg-card text-foreground',
          sizeClasses[size],
          bordered && 'border-b border-border',
          sticky && 'sticky top-0 z-40',
          className
        )}
        {...props}
      >
        {children}
      </header>
    )
  }
)
TopBar.displayName = 'TopBar'

// ============================================================================
// TopBar Brand
// ============================================================================

export interface TopBarBrandProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Logo element or image */
  logo?: React.ReactNode
  /** Brand name text */
  name?: string
  /** Link href for the brand */
  href?: string
}

const TopBarBrand = React.forwardRef<HTMLDivElement, TopBarBrandProps>(
  ({ className, logo, name, href, children, ...props }, ref) => {
    const content = (
      <>
        {logo && <span className="shrink-0">{logo}</span>}
        {name && <span className="font-semibold text-lg">{name}</span>}
        {children}
      </>
    )

    if (href) {
      return (
        <div ref={ref} className={cn('flex items-center gap-2', className)} {...props}>
          <a href={href} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            {content}
          </a>
        </div>
      )
    }

    return (
      <div ref={ref} className={cn('flex items-center gap-2', className)} {...props}>
        {content}
      </div>
    )
  }
)
TopBarBrand.displayName = 'TopBarBrand'

// ============================================================================
// TopBar Nav
// ============================================================================

export interface TopBarNavProps extends React.HTMLAttributes<HTMLElement> {}

const TopBarNav = React.forwardRef<HTMLElement, TopBarNavProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        className={cn('flex items-center gap-1', className)}
        {...props}
      >
        {children}
      </nav>
    )
  }
)
TopBarNav.displayName = 'TopBarNav'

// ============================================================================
// TopBar NavItem
// ============================================================================

export interface TopBarNavItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Whether this nav item is active */
  active?: boolean
}

const TopBarNavItem = React.forwardRef<HTMLAnchorElement, TopBarNavItemProps>(
  ({ className, active, children, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={cn(
          'px-3 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer',
          active
            ? 'bg-muted text-foreground'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50',
          className
        )}
        {...props}
      >
        {children}
      </a>
    )
  }
)
TopBarNavItem.displayName = 'TopBarNavItem'

// ============================================================================
// TopBar Section
// ============================================================================

export interface TopBarSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Alignment of the section */
  align?: 'left' | 'center' | 'right'
}

const TopBarSection = React.forwardRef<HTMLDivElement, TopBarSectionProps>(
  ({ className, align = 'left', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center gap-2',
          {
            'mr-auto': align === 'left',
            'mx-auto': align === 'center',
            'ml-auto': align === 'right',
          },
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
TopBarSection.displayName = 'TopBarSection'

// ============================================================================
// TopBar Divider
// ============================================================================

export interface TopBarDividerProps extends React.HTMLAttributes<HTMLDivElement> {}

const TopBarDivider = React.forwardRef<HTMLDivElement, TopBarDividerProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('h-6 w-px bg-border mx-2', className)}
        {...props}
      />
    )
  }
)
TopBarDivider.displayName = 'TopBarDivider'

export {
  TopBar,
  TopBarBrand,
  TopBarNav,
  TopBarNavItem,
  TopBarSection,
  TopBarDivider,
}
