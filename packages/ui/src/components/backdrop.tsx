import * as React from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../utils/cn'

// ============================================================================
// Types
// ============================================================================

export interface BackdropProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether the backdrop is visible */
  open: boolean
  /** Makes the backdrop fully transparent — still captures clicks/events */
  invisible?: boolean
  /** Duration of the fade transition in ms @default 225 */
  transitionDuration?: number
  /** Keep the element in the DOM when closed (avoids remount cost) @default false */
  keepMounted?: boolean
  /** Render inline instead of in a portal @default false */
  disablePortal?: boolean
  /** Lock body scroll when open @default true */
  disableScrollLock?: boolean
}

// ============================================================================
// Backdrop
// ============================================================================

const Backdrop = React.forwardRef<HTMLDivElement, BackdropProps>(
  (
    {
      open,
      invisible          = false,
      transitionDuration = 225,
      keepMounted        = false,
      disablePortal      = false,
      disableScrollLock  = false,
      className,
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    const [mounted, setMounted]   = React.useState(open)
    const [visible, setVisible]   = React.useState(false)

    // Open: mount → next frame → fade in
    // Close: fade out → after transition → unmount (unless keepMounted)
    React.useEffect(() => {
      if (open) {
        setMounted(true)
        const raf = requestAnimationFrame(() => setVisible(true))
        return () => cancelAnimationFrame(raf)
      } else {
        setVisible(false)
        if (!keepMounted) {
          const t = setTimeout(() => setMounted(false), transitionDuration)
          return () => clearTimeout(t)
        }
      }
    }, [open, keepMounted, transitionDuration])

    // Scroll lock
    React.useEffect(() => {
      if (disableScrollLock) return
      if (open) {
        const prev = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        return () => { document.body.style.overflow = prev }
      }
    }, [open, disableScrollLock])

    if (!mounted) return null

    const node = (
      <div
        ref={ref}
        aria-hidden="true"
        onClick={onClick}
        style={{ transitionDuration: `${transitionDuration}ms` }}
        className={cn(
          'fixed inset-0 z-50 flex items-center justify-center transition-opacity',
          invisible ? 'bg-transparent' : 'bg-black/50',
          visible ? 'opacity-100' : 'opacity-0',
          !visible && 'pointer-events-none',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )

    if (disablePortal || typeof document === 'undefined') return node
    return createPortal(node, document.body)
  }
)
Backdrop.displayName = 'Backdrop'

export { Backdrop }
