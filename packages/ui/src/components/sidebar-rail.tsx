import * as React from 'react'
import { cn } from '../utils/cn'

// ============================================================================
// SidebarRail Context
// ============================================================================

interface SidebarRailContextValue {
  activeRail: string | null
  setActiveRail: (rail: string | null) => void
  expanded: boolean
  setExpanded: (expanded: boolean) => void
  hoverExpand: boolean
  railExpanded: boolean
  setRailExpanded: (expanded: boolean) => void
  overlayRail: boolean
  expandableRail: boolean
}

const SidebarRailContext = React.createContext<SidebarRailContextValue | undefined>(undefined)

const useSidebarRail = () => {
  const context = React.useContext(SidebarRailContext)
  if (!context) {
    throw new Error('useSidebarRail must be used within a SidebarRail')
  }
  return context
}

// ============================================================================
// SidebarRail Root
// ============================================================================

export interface SidebarRailProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Default active rail */
  defaultActiveRail?: string | null
  /** Controlled active rail */
  activeRail?: string | null
  /** Callback when active rail changes */
  onActiveRailChange?: (rail: string | null) => void
  /** Whether the panel expands on hover (vs click) */
  hoverExpand?: boolean
  /** Width of the icon rail */
  railWidth?: number
  /** Width of the expanded panel */
  panelWidth?: number
  /** Whether the icon rail can expand to show labels */
  expandableRail?: boolean
  /** Default rail expanded state (uncontrolled) */
  defaultRailExpanded?: boolean
  /** Controlled rail expanded state */
  railExpanded?: boolean
  /** Callback when rail expanded state changes */
  onRailExpandedChange?: (expanded: boolean) => void
  /** Width of expanded rail (labels visible) */
  railExpandedWidth?: number
  /** Overlay expanded rail on top of secondary panel instead of taking layout space */
  overlayRail?: boolean
}

const SidebarRail = React.forwardRef<HTMLDivElement, SidebarRailProps>(
  (
    {
      className,
      defaultActiveRail = null,
      activeRail: controlledActiveRail,
      onActiveRailChange,
      hoverExpand = false,
      railWidth = 56,
      panelWidth = 240,
      expandableRail = false,
      defaultRailExpanded = false,
      railExpanded: controlledRailExpanded,
      onRailExpandedChange,
      railExpandedWidth = 220,
      overlayRail = false,
      children,
      ...props
    },
    ref
  ) => {
    const [uncontrolledActiveRail, setUncontrolledActiveRail] = React.useState(defaultActiveRail)
    const [expanded, setExpanded] = React.useState(!!defaultActiveRail)
    const [uncontrolledRailExpanded, setUncontrolledRailExpanded] =
      React.useState(defaultRailExpanded)

    const isControlled = controlledActiveRail !== undefined
    const activeRail = isControlled ? controlledActiveRail : uncontrolledActiveRail
    const isRailControlled = controlledRailExpanded !== undefined
    const railExpanded = isRailControlled ? controlledRailExpanded : uncontrolledRailExpanded

    const setActiveRail = React.useCallback(
      (rail: string | null) => {
        if (!isControlled) {
          setUncontrolledActiveRail(rail)
        }
        onActiveRailChange?.(rail)
        setExpanded(rail !== null)
      },
      [isControlled, onActiveRailChange]
    )

    const setRailExpanded = React.useCallback(
      (value: boolean) => {
        if (!isRailControlled) {
          setUncontrolledRailExpanded(value)
        }
        onRailExpandedChange?.(value)
      },
      [isRailControlled, onRailExpandedChange]
    )

    return (
      <SidebarRailContext.Provider
        value={{
          activeRail,
          setActiveRail,
          expanded,
          setExpanded,
          hoverExpand,
          railExpanded,
          setRailExpanded,
          overlayRail: overlayRail && expandableRail,
          expandableRail,
        }}
      >
        <div
          ref={ref}
          className={cn(
            'flex h-full',
            overlayRail && expandableRail && 'relative',
            className
          )}
          style={
            {
              '--rail-width': `${railWidth}px`,
              '--rail-expanded-width': `${railExpandedWidth}px`,
              '--panel-width': `${panelWidth}px`,
            } as React.CSSProperties
          }
          {...props}
        >
          {children}
        </div>
      </SidebarRailContext.Provider>
    )
  }
)
SidebarRail.displayName = 'SidebarRail'

// ============================================================================
// IconRail - The narrow always-visible rail with icons
// ============================================================================

export interface IconRailProps extends React.HTMLAttributes<HTMLDivElement> {}

const IconRail = React.forwardRef<HTMLDivElement, IconRailProps>(
  ({ className, children, ...props }, ref) => {
    const { railExpanded, overlayRail, expandableRail } = useSidebarRail()
    const isExpanded = expandableRail && railExpanded

    return (
      <div
        ref={ref}
        className={cn(
          'relative h-full shrink-0',
          isExpanded && !overlayRail ? 'w-[var(--rail-expanded-width)]' : 'w-[var(--rail-width)]'
        )}
        {...props}
      >
        <div
          className={cn(
            'flex flex-col bg-card border-r border-border h-full',
            'transition-[width] duration-200',
            overlayRail && isExpanded
              ? 'absolute left-0 top-0 z-30 w-[var(--rail-expanded-width)] shadow-lg'
              : 'w-full',
            className
          )}
        >
          {children}
        </div>
      </div>
    )
  }
)
IconRail.displayName = 'IconRail'

// ============================================================================
// IconRail Header
// ============================================================================

export interface IconRailHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const IconRailHeader = React.forwardRef<HTMLDivElement, IconRailHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center justify-center h-14 border-b border-border shrink-0',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
IconRailHeader.displayName = 'IconRailHeader'

// ============================================================================
// IconRail Content
// ============================================================================

export interface IconRailContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const IconRailContent = React.forwardRef<HTMLDivElement, IconRailContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex-1 flex flex-col items-center py-2 gap-1 overflow-y-auto', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
IconRailContent.displayName = 'IconRailContent'

// ============================================================================
// IconRail Footer
// ============================================================================

export interface IconRailFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const IconRailFooter = React.forwardRef<HTMLDivElement, IconRailFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'mt-auto flex flex-col items-center py-2 gap-1 border-t border-border',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
IconRailFooter.displayName = 'IconRailFooter'

// ============================================================================
// IconRail Item - Icon button that toggles a panel
// ============================================================================

export interface IconRailItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Unique identifier for this rail item */
  railId?: string
  /** Icon to display */
  icon: React.ReactNode
  /** Tooltip label */
  label?: string
  /** Whether this is just a button (no panel) */
  asButton?: boolean
  /** Toggle rail expansion when clicked */
  toggleRail?: boolean
}

const IconRailItem = React.forwardRef<HTMLButtonElement, IconRailItemProps>(
  ({ className, railId, icon, label, asButton = false, toggleRail = false, onClick, ...props }, ref) => {
    const {
      activeRail,
      setActiveRail,
      hoverExpand,
      railExpanded,
      setRailExpanded,
      expandableRail,
    } =
      useSidebarRail()
    const isActive = railId ? activeRail === railId : false
    const isRailExpanded = expandableRail && railExpanded

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!asButton && railId) {
        setActiveRail(isActive ? null : railId)
      }
      if (toggleRail && expandableRail) {
        setRailExpanded(!railExpanded)
      }
      onClick?.(e)
    }

    const handleMouseEnter = () => {
      if (hoverExpand && !asButton && railId) {
        setActiveRail(railId)
      }
    }

    return (
      <button
        ref={ref}
        type="button"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        className={cn(
          'flex items-center rounded-md transition-colors cursor-pointer',
          isRailExpanded
            ? 'h-10 px-3 justify-start gap-3 w-full'
            : 'w-10 h-10 justify-center',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          isActive
            ? 'bg-accent text-accent-foreground'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted',
          className
        )}
        title={label}
        aria-label={label}
        {...props}
      >
        {icon}
        {isRailExpanded && label && (
          <span className="text-sm font-medium truncate">{label}</span>
        )}
      </button>
    )
  }
)
IconRailItem.displayName = 'IconRailItem'

// ============================================================================
// RailPanel - The expandable panel
// ============================================================================

export interface RailPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Which rail this panel belongs to */
  railId: string
  /** Panel title */
  title?: string
}

const RailPanel = React.forwardRef<HTMLDivElement, RailPanelProps>(
  ({ className, railId, title, children, ...props }, ref) => {
    const { activeRail, setActiveRail, hoverExpand } = useSidebarRail()
    const isVisible = activeRail === railId

    const handleMouseLeave = () => {
      if (hoverExpand) {
        setActiveRail(null)
      }
    }

    if (!isVisible) return null

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col bg-card border-r border-border h-full shrink-0',
          'w-[var(--panel-width)]',
          'animate-in slide-in-from-left-2 duration-200',
          className
        )}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {title && (
          <div className="flex items-center justify-between h-14 px-4 border-b border-border shrink-0">
            <span className="font-semibold text-sm">{title}</span>
            <button
              type="button"
              onClick={() => setActiveRail(null)}
              className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer"
              aria-label="Close panel"
            >
              <svg
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
        )}
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    )
  }
)
RailPanel.displayName = 'RailPanel'

// ============================================================================
// RailPanelGroup - Group items within a panel
// ============================================================================

export interface RailPanelGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Group label */
  label?: string
}

const RailPanelGroup = React.forwardRef<HTMLDivElement, RailPanelGroupProps>(
  ({ className, label, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('px-2 py-2', className)} {...props}>
        {label && (
          <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {label}
          </div>
        )}
        <div className="space-y-1">{children}</div>
      </div>
    )
  }
)
RailPanelGroup.displayName = 'RailPanelGroup'

// ============================================================================
// RailPanelItem - Item within a panel
// ============================================================================

export interface RailPanelItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Icon element */
  icon?: React.ReactNode
  /** Whether this item is active */
  active?: boolean
  /** Whether this item is disabled */
  disabled?: boolean
  /** Badge or count */
  badge?: React.ReactNode
  /** Link href */
  href?: string
}

const RailPanelItem = React.forwardRef<HTMLDivElement, RailPanelItemProps>(
  ({ className, icon, active, disabled, badge, href, children, onClick, ...props }, ref) => {
    const content = (
      <>
        {icon && <span className="shrink-0">{icon}</span>}
        <span className="flex-1 truncate">{children}</span>
        {badge && <span className="shrink-0">{badge}</span>}
      </>
    )

    const itemClasses = cn(
      'flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors cursor-pointer',
      active
        ? 'bg-accent text-accent-foreground'
        : 'text-muted-foreground hover:text-foreground hover:bg-muted',
      disabled && 'opacity-50 pointer-events-none',
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
RailPanelItem.displayName = 'RailPanelItem'

export {
  SidebarRail,
  IconRail,
  IconRailHeader,
  IconRailContent,
  IconRailFooter,
  IconRailItem,
  RailPanel,
  RailPanelGroup,
  RailPanelItem,
  useSidebarRail,
}
