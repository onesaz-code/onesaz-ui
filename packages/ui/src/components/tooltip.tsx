import * as React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { cn } from '../utils/cn'

// Tooltip Provider - wrap your app or section with this
const TooltipProvider = TooltipPrimitive.Provider

// Tooltip Root
const TooltipRoot = TooltipPrimitive.Root

// Tooltip Trigger
const TooltipTrigger = TooltipPrimitive.Trigger

// Tooltip Portal
const TooltipPortal = TooltipPrimitive.Portal

// Tooltip Arrow
const TooltipArrow = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Arrow>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Arrow>
>(({ className, ...props }, ref) => (
  <TooltipPrimitive.Arrow
    ref={ref}
    className={cn('fill-popover', className)}
    {...props}
  />
))
TooltipArrow.displayName = TooltipPrimitive.Arrow.displayName

// Tooltip Content
export interface TooltipContentProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> {
  /** Whether to show an arrow pointing to the trigger */
  showArrow?: boolean
}

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(({ className, sideOffset = 4, showArrow = false, children, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      'z-50 overflow-hidden rounded-md bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md',
      'animate-in fade-in-0 zoom-in-95',
      'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
      'data-[side=bottom]:slide-in-from-top-2',
      'data-[side=left]:slide-in-from-right-2',
      'data-[side=right]:slide-in-from-left-2',
      'data-[side=top]:slide-in-from-bottom-2',
      className
    )}
    {...props}
  >
    {children}
    {showArrow && <TooltipArrow />}
  </TooltipPrimitive.Content>
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

// ============================================================================
// Simple Tooltip - A convenience wrapper for common use cases
// ============================================================================

export interface TooltipProps {
  /** The content to show in the tooltip */
  content: React.ReactNode
  /** The element that triggers the tooltip */
  children: React.ReactNode
  /** Side where the tooltip appears */
  side?: 'top' | 'right' | 'bottom' | 'left'
  /** Alignment of the tooltip */
  align?: 'start' | 'center' | 'end'
  /** Delay before showing (ms) */
  delayDuration?: number
  /** Whether the tooltip is open (controlled) */
  open?: boolean
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void
  /** Whether the tooltip should be disabled */
  disabled?: boolean
  /** Whether to show an arrow */
  showArrow?: boolean
  /** Additional className for the content */
  className?: string
}

const Tooltip = React.forwardRef<HTMLButtonElement, TooltipProps>(
  (
    {
      content,
      children,
      side = 'top',
      align = 'center',
      delayDuration = 200,
      open,
      onOpenChange,
      disabled = false,
      showArrow = false,
      className,
    },
    ref
  ) => {
    if (disabled) {
      return <>{children}</>
    }

    return (
      <TooltipProvider>
        <TooltipRoot
          delayDuration={delayDuration}
          open={open}
          onOpenChange={onOpenChange}
        >
          <TooltipTrigger ref={ref} asChild>
            {children}
          </TooltipTrigger>
          <TooltipPortal>
            <TooltipContent
              side={side}
              align={align}
              showArrow={showArrow}
              className={className}
            >
              {content}
            </TooltipContent>
          </TooltipPortal>
        </TooltipRoot>
      </TooltipProvider>
    )
  }
)
Tooltip.displayName = 'Tooltip'

export {
  Tooltip,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
  TooltipContent,
  TooltipPortal,
  TooltipArrow,
}
