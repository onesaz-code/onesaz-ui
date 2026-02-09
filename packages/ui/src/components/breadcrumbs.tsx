import * as React from 'react'
import { cn } from '../utils/cn'

// ============================================================================
// Breadcrumbs - Navigation breadcrumb trail
// ============================================================================

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  /** Custom separator element */
  separator?: React.ReactNode
  /** Maximum number of items to display before collapsing */
  maxItems?: number
  /** Number of items to show at the beginning when collapsed */
  itemsBeforeCollapse?: number
  /** Number of items to show at the end when collapsed */
  itemsAfterCollapse?: number
}

const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>(
  (
    {
      separator,
      maxItems,
      itemsBeforeCollapse = 1,
      itemsAfterCollapse = 2,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const childArray = React.Children.toArray(children)
    const totalItems = childArray.length

    // Default separator
    const separatorElement = separator ?? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-muted-foreground"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    )

    // Determine if we need to collapse
    const shouldCollapse = maxItems && totalItems > maxItems

    let displayedItems: React.ReactNode[]

    if (shouldCollapse) {
      const startItems = childArray.slice(0, itemsBeforeCollapse)
      const endItems = childArray.slice(-itemsAfterCollapse)

      displayedItems = [
        ...startItems,
        <BreadcrumbEllipsis key="ellipsis" />,
        ...endItems,
      ]
    } else {
      displayedItems = childArray
    }

    return (
      <nav ref={ref} aria-label="Breadcrumb" className={className} {...props}>
        <ol className="flex items-center gap-1.5 flex-wrap">
          {displayedItems.map((child, index) => (
            <li key={index} className="flex items-center gap-1.5">
              {index > 0 && (
                <span className="flex items-center" aria-hidden="true">
                  {separatorElement}
                </span>
              )}
              {child}
            </li>
          ))}
        </ol>
      </nav>
    )
  }
)
Breadcrumbs.displayName = 'Breadcrumbs'

// ============================================================================
// BreadcrumbItem - Individual breadcrumb item
// ============================================================================

export interface BreadcrumbItemProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Whether this is the current/active page */
  current?: boolean
  /** Href for the breadcrumb link */
  href?: string
  /** Click handler */
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLSpanElement>
}

const BreadcrumbItem = React.forwardRef<HTMLSpanElement, BreadcrumbItemProps>(
  ({ current = false, href, onClick, className, children, ...props }, ref) => {
    const baseClasses = cn(
      'text-sm transition-colors',
      current
        ? 'font-medium text-foreground'
        : 'text-muted-foreground hover:text-foreground',
      !current && (href || onClick) && 'cursor-pointer',
      className
    )

    if (current) {
      return (
        <span
          ref={ref}
          aria-current="page"
          className={baseClasses}
          {...props}
        >
          {children}
        </span>
      )
    }

    if (href) {
      return (
        <a
          href={href}
          onClick={onClick}
          className={baseClasses}
        >
          {children}
        </a>
      )
    }

    return (
      <span
        ref={ref}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        onClick={onClick}
        onKeyDown={onClick ? (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onClick(e as unknown as React.MouseEvent<HTMLSpanElement>)
          }
        } : undefined}
        className={baseClasses}
        {...props}
      >
        {children}
      </span>
    )
  }
)
BreadcrumbItem.displayName = 'BreadcrumbItem'

// ============================================================================
// BreadcrumbLink - Styled link for breadcrumbs (alias for convenience)
// ============================================================================

export interface BreadcrumbLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ className, ...props }, ref) => (
    <a
      ref={ref}
      className={cn(
        'text-sm text-muted-foreground hover:text-foreground transition-colors',
        className
      )}
      {...props}
    />
  )
)
BreadcrumbLink.displayName = 'BreadcrumbLink'

// ============================================================================
// BreadcrumbSeparator - Custom separator component
// ============================================================================

export interface BreadcrumbSeparatorProps extends React.HTMLAttributes<HTMLSpanElement> {}

const BreadcrumbSeparator = React.forwardRef<HTMLSpanElement, BreadcrumbSeparatorProps>(
  ({ className, children, ...props }, ref) => (
    <span
      ref={ref}
      role="presentation"
      aria-hidden="true"
      className={cn('text-muted-foreground', className)}
      {...props}
    >
      {children ?? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      )}
    </span>
  )
)
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator'

// ============================================================================
// BreadcrumbEllipsis - Ellipsis for collapsed breadcrumbs
// ============================================================================

export interface BreadcrumbEllipsisProps extends React.HTMLAttributes<HTMLSpanElement> {}

const BreadcrumbEllipsis = React.forwardRef<HTMLSpanElement, BreadcrumbEllipsisProps>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      role="presentation"
      aria-hidden="true"
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="1" />
        <circle cx="19" cy="12" r="1" />
        <circle cx="5" cy="12" r="1" />
      </svg>
    </span>
  )
)
BreadcrumbEllipsis.displayName = 'BreadcrumbEllipsis'

// ============================================================================
// BreadcrumbPage - Current page indicator
// ============================================================================

export interface BreadcrumbPageProps extends React.HTMLAttributes<HTMLSpanElement> {}

const BreadcrumbPage = React.forwardRef<HTMLSpanElement, BreadcrumbPageProps>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      aria-current="page"
      className={cn('text-sm font-medium text-foreground', className)}
      {...props}
    />
  )
)
BreadcrumbPage.displayName = 'BreadcrumbPage'

export {
  Breadcrumbs,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
  BreadcrumbPage,
}
