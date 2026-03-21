import * as React from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { cn } from '../utils/cn'

// ============================================================================
// Popover Primitives (low-level building blocks)
// ============================================================================

const PopoverRoot = PopoverPrimitive.Root
const PopoverTrigger = PopoverPrimitive.Trigger
const PopoverPortal = PopoverPrimitive.Portal
const PopoverClose = PopoverPrimitive.Close
const PopoverAnchor = PopoverPrimitive.Anchor

// ============================================================================
// PopoverArrow
// ============================================================================

const PopoverArrow = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Arrow>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Arrow>
>(({ className, ...props }, ref) => (
  <PopoverPrimitive.Arrow
    ref={ref}
    className={cn('fill-white dark:fill-neutral-800', className)}
    {...props}
  />
))
PopoverArrow.displayName = PopoverPrimitive.Arrow.displayName

// ============================================================================
// PopoverContent
// ============================================================================

export interface PopoverContentProps
  extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {
  /** Show an arrow pointing to the trigger */
  showArrow?: boolean
}

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>(({ className, align = 'center', sideOffset = 6, showArrow = false, children, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        'z-50 rounded-lg border border-neutral-200 bg-white p-4 shadow-md outline-none',
        'dark:border-neutral-700 dark:bg-neutral-800',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        'data-[side=bottom]:slide-in-from-top-2',
        'data-[side=left]:slide-in-from-right-2',
        'data-[side=right]:slide-in-from-left-2',
        'data-[side=top]:slide-in-from-bottom-2',
        className
      )}
      {...props}
    >
      {children}
      {showArrow && <PopoverArrow />}
    </PopoverPrimitive.Content>
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

// ============================================================================
// Popover - Convenience wrapper
//
// Two modes controlled by the `modal` prop (mirrors MUI's Popper vs Popover):
//   modal={false} (default) → Popper-like: non-blocking, page stays scrollable,
//                             no focus trap, no click-away close
//   modal={true}            → Popover-like: scroll locked, focus trapped,
//                             closes on outside click (via onInteractOutside)
// ============================================================================

export interface PopoverProps {
  /** Trigger element */
  children: React.ReactNode
  /** Content shown inside the floating panel */
  content: React.ReactNode
  /** Side where the panel appears */
  side?: 'top' | 'right' | 'bottom' | 'left'
  /** Alignment relative to the trigger */
  align?: 'start' | 'center' | 'end'
  /** Offset from the trigger in px */
  sideOffset?: number
  /** Controlled open state */
  open?: boolean
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void
  /** Default open state (uncontrolled) */
  defaultOpen?: boolean
  /**
   * When true: scroll locked + focus trapped (like MUI Popover / Dialog).
   * When false (default): non-blocking float (like MUI Popper).
   */
  modal?: boolean
  /** Show an arrow pointing to the trigger */
  showArrow?: boolean
  /** Additional className for the content panel */
  className?: string
}

const Popover = ({
  children,
  content,
  side = 'bottom',
  align = 'center',
  sideOffset = 6,
  open,
  onOpenChange,
  defaultOpen,
  modal = false,
  showArrow = false,
  className,
}: PopoverProps) => {
  return (
    <PopoverRoot
      open={open}
      onOpenChange={onOpenChange}
      defaultOpen={defaultOpen}
      modal={modal}
    >
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        side={side}
        align={align}
        sideOffset={sideOffset}
        showArrow={showArrow}
        className={className}
      >
        {content}
      </PopoverContent>
    </PopoverRoot>
  )
}
Popover.displayName = 'Popover'

// ============================================================================
// Popper - Alias for Popover with modal=false (explicit non-blocking variant)
// Use this when you want tooltip-like positioning without any modal behavior.
// ============================================================================

export interface PopperProps extends Omit<PopoverProps, 'modal'> {}

const Popper = (props: PopperProps) => <Popover {...props} modal={false} />
Popper.displayName = 'Popper'

export {
  // Primitives
  PopoverRoot,
  PopoverTrigger,
  PopoverPortal,
  PopoverClose,
  PopoverAnchor,
  PopoverArrow,
  PopoverContent,
  // Convenience components
  Popover,
  Popper,
}
