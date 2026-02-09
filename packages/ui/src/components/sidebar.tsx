import * as React from 'react'
import { cn } from '../utils/cn'

// ============================================================================
// Sidebar Context
// ============================================================================

interface SidebarContextValue {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}

const SidebarContext = React.createContext<SidebarContextValue | undefined>(undefined)

const useSidebar = () => {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a Sidebar')
  }
  return context
}

// ============================================================================
// Sidebar Root
// ============================================================================

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  /** Whether the sidebar is collapsed */
  collapsed?: boolean
  /** Callback when collapsed state changes */
  onCollapsedChange?: (collapsed: boolean) => void
  /** Default collapsed state (uncontrolled) */
  defaultCollapsed?: boolean
  /** Width when expanded */
  width?: number | string
  /** Width when collapsed */
  collapsedWidth?: number | string
  /** Whether the sidebar has a right border */
  bordered?: boolean
}

const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  (
    {
      className,
      collapsed: controlledCollapsed,
      onCollapsedChange,
      defaultCollapsed = false,
      width = 256,
      collapsedWidth = 64,
      bordered = true,
      children,
      ...props
    },
    ref
  ) => {
    const [uncontrolledCollapsed, setUncontrolledCollapsed] = React.useState(defaultCollapsed)

    const isControlled = controlledCollapsed !== undefined
    const collapsed = isControlled ? controlledCollapsed : uncontrolledCollapsed

    const setCollapsed = React.useCallback(
      (value: boolean) => {
        if (!isControlled) {
          setUncontrolledCollapsed(value)
        }
        onCollapsedChange?.(value)
      },
      [isControlled, onCollapsedChange]
    )

    return (
      <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
        <aside
          ref={ref}
          className={cn(
            'flex flex-col bg-card text-foreground transition-all duration-300 ease-in-out h-full',
            bordered && 'border-r border-border',
            className
          )}
          style={{
            width: collapsed ? collapsedWidth : width,
            minWidth: collapsed ? collapsedWidth : width,
          }}
          {...props}
        >
          {children}
        </aside>
      </SidebarContext.Provider>
    )
  }
)
Sidebar.displayName = 'Sidebar'

// ============================================================================
// Sidebar Header
// ============================================================================

export interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const SidebarHeader = React.forwardRef<HTMLDivElement, SidebarHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center h-14 px-4 border-b border-border shrink-0', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
SidebarHeader.displayName = 'SidebarHeader'

// ============================================================================
// Sidebar Content
// ============================================================================

export interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const SidebarContent = React.forwardRef<HTMLDivElement, SidebarContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex-1 overflow-y-auto py-2', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
SidebarContent.displayName = 'SidebarContent'

// ============================================================================
// Sidebar Footer
// ============================================================================

export interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const SidebarFooter = React.forwardRef<HTMLDivElement, SidebarFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('mt-auto border-t border-border p-4 shrink-0', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
SidebarFooter.displayName = 'SidebarFooter'

// ============================================================================
// Sidebar Group
// ============================================================================

export interface SidebarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Group label */
  label?: string
}

const SidebarGroup = React.forwardRef<HTMLDivElement, SidebarGroupProps>(
  ({ className, label, children, ...props }, ref) => {
    const { collapsed } = useSidebar()

    return (
      <div ref={ref} className={cn('px-2 py-2', className)} {...props}>
        {label && !collapsed && (
          <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {label}
          </div>
        )}
        {label && collapsed && (
          <div className="flex justify-center py-1.5">
            <div className="h-px w-4 bg-border" />
          </div>
        )}
        <div className="space-y-1">{children}</div>
      </div>
    )
  }
)
SidebarGroup.displayName = 'SidebarGroup'

// ============================================================================
// Sidebar Item
// ============================================================================

export interface SidebarItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Icon element */
  icon?: React.ReactNode
  /** Whether this item is active */
  active?: boolean
  /** Whether this item is disabled */
  disabled?: boolean
  /** Badge or count to show */
  badge?: React.ReactNode
  /** Click handler */
  onClick?: () => void
  /** Link href */
  href?: string
}

const SidebarItem = React.forwardRef<HTMLDivElement, SidebarItemProps>(
  ({ className, icon, active, disabled, badge, onClick, href, children, ...props }, ref) => {
    const { collapsed } = useSidebar()

    const content = (
      <>
        {icon && (
          <span className={cn('shrink-0', collapsed ? 'mx-auto' : '')}>
            {icon}
          </span>
        )}
        {!collapsed && (
          <>
            <span className="flex-1 truncate">{children}</span>
            {badge && <span className="shrink-0">{badge}</span>}
          </>
        )}
      </>
    )

    const itemClasses = cn(
      'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer',
      active
        ? 'bg-accent text-accent-foreground'
        : 'text-muted-foreground hover:text-foreground hover:bg-muted',
      disabled && 'opacity-50 pointer-events-none',
      collapsed && 'justify-center px-2',
      className
    )

    if (href) {
      return (
        <div ref={ref} {...props}>
          <a href={href} className={itemClasses}>
            {content}
          </a>
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={itemClasses}
        onClick={disabled ? undefined : onClick}
        role="button"
        tabIndex={disabled ? -1 : 0}
        {...props}
      >
        {content}
      </div>
    )
  }
)
SidebarItem.displayName = 'SidebarItem'

// ============================================================================
// Sidebar SubMenu
// ============================================================================

export interface SidebarSubMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Icon element */
  icon?: React.ReactNode
  /** Label text */
  label: string
  /** Whether the submenu is open by default */
  defaultOpen?: boolean
}

const SidebarSubMenu = React.forwardRef<HTMLDivElement, SidebarSubMenuProps>(
  ({ className, icon, label, defaultOpen = false, children, ...props }, ref) => {
    const [open, setOpen] = React.useState(defaultOpen)
    const { collapsed } = useSidebar()

    // Close submenu when sidebar collapses
    React.useEffect(() => {
      if (collapsed) {
        setOpen(false)
      }
    }, [collapsed])

    if (collapsed) {
      return (
        <SidebarItem icon={icon} className={className}>
          {label}
        </SidebarItem>
      )
    }

    return (
      <div ref={ref} className={className} {...props}>
        <div
          className={cn(
            'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer',
            'text-muted-foreground hover:text-foreground hover:bg-muted'
          )}
          onClick={() => setOpen(!open)}
          role="button"
          tabIndex={0}
        >
          {icon && <span className="shrink-0">{icon}</span>}
          <span className="flex-1 truncate">{label}</span>
          <svg
            className={cn('h-4 w-4 shrink-0 transition-transform', open && 'rotate-90')}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </div>
        {open && (
          <div className="ml-4 pl-3 border-l border-border space-y-1 mt-1">
            {children}
          </div>
        )}
      </div>
    )
  }
)
SidebarSubMenu.displayName = 'SidebarSubMenu'

// ============================================================================
// Sidebar Toggle
// ============================================================================

export interface SidebarToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const SidebarToggle = React.forwardRef<HTMLButtonElement, SidebarToggleProps>(
  ({ className, children, ...props }, ref) => {
    const { collapsed, setCollapsed } = useSidebar()

    return (
      <button
        ref={ref}
        type="button"
        onClick={() => setCollapsed(!collapsed)}
        className={cn(
          'inline-flex items-center justify-center rounded-md p-2 transition-colors cursor-pointer',
          'text-muted-foreground hover:text-foreground hover:bg-muted',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          className
        )}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        {...props}
      >
        {children || (
          <svg
            className={cn('h-5 w-5 transition-transform', collapsed && 'rotate-180')}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M9 3v18" />
            <path d="m14 9 3 3-3 3" />
          </svg>
        )}
      </button>
    )
  }
)
SidebarToggle.displayName = 'SidebarToggle'

export {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarItem,
  SidebarSubMenu,
  SidebarToggle,
  useSidebar,
}
