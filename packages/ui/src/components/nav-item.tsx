import * as React from 'react'
import { cn } from '../utils/cn'

export interface NavItemProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onClick'> {
  /** Leading icon (auto-sized) */
  icon?: React.ReactNode
  /** Active/selected state */
  active?: boolean
  /** Trailing content — a count, badge, or shortcut */
  endAdornment?: React.ReactNode
  /** Renders an anchor instead of a button */
  href?: string
  onClick?: () => void
  disabled?: boolean
}

/**
 * A navigation / list row with a leading icon, label, active state, and a
 * trailing slot — the sidebar/list item that was hand-rolled in every shell.
 * Renders a real `<button>` (keyboard-operable) or an `<a>` when `href` is set.
 */
const NavItem = React.forwardRef<HTMLElement, NavItemProps>(
  ({ className, icon, active, endAdornment, href, onClick, disabled, children, ...props }, ref) => {
    const classes = cn(
      'flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
      active ? 'bg-accent/10 font-medium text-accent' : 'text-foreground hover:bg-muted',
      disabled && 'pointer-events-none opacity-50',
      className
    )
    const content = (
      <>
        {icon && <span className="shrink-0 text-muted-foreground [&_svg]:h-4 [&_svg]:w-4">{icon}</span>}
        <span className="min-w-0 flex-1 truncate text-left">{children}</span>
        {endAdornment != null && <span className="shrink-0 text-xs text-muted-foreground">{endAdornment}</span>}
      </>
    )
    if (href) {
      return (
        <a ref={ref as React.Ref<HTMLAnchorElement>} href={href} className={classes} aria-current={active ? 'page' : undefined} {...props}>
          {content}
        </a>
      )
    }
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        className={classes}
        onClick={onClick}
        disabled={disabled}
        aria-current={active ? 'page' : undefined}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    )
  }
)
NavItem.displayName = 'NavItem'

export { NavItem }
