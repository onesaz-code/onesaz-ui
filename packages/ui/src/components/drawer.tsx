import * as React from 'react'
import { createPortal } from 'react-dom'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { cn } from '../utils/cn'

// ============================================================================
// Drawer / Sheet - Slide-out panel component
// ============================================================================

export type DrawerVariant = 'panel' | 'sheet'

export type DrawerPortalTarget = 'auto' | 'body'

const ONESAZ_SHEET_ATTR = 'data-onesaz-sheet'

type DrawerContextValue = {
  open: boolean
  onOpenChange: (open: boolean) => void
  variant: DrawerVariant
}

const DrawerContext = React.createContext<DrawerContextValue | null>(null)

function useDrawerContext() {
  const context = React.useContext(DrawerContext)
  if (!context) {
    throw new Error('Drawer components must be used within a Drawer')
  }
  return context
}

export interface DrawerProps extends DialogPrimitive.DialogProps {
  /** `panel` = Radix dialog (default). `sheet` = portal bottom sheet for nested dialogs. */
  variant?: DrawerVariant
}

const Drawer = ({
  variant = 'panel',
  open = false,
  onOpenChange,
  children,
  ...props
}: DrawerProps) => {
  const contextValue = React.useMemo<DrawerContextValue>(
    () => ({
      open: !!open,
      onOpenChange: onOpenChange ?? (() => {}),
      variant,
    }),
    [open, onOpenChange, variant],
  )

  if (variant === 'sheet') {
    return (
      <DrawerContext.Provider value={contextValue}>{children}</DrawerContext.Provider>
    )
  }

  return (
    <DrawerContext.Provider value={contextValue}>
      <DialogPrimitive.Root open={open} onOpenChange={onOpenChange} {...props}>
        {children}
      </DialogPrimitive.Root>
    </DrawerContext.Provider>
  )
}

const DrawerTrigger = DialogPrimitive.Trigger
const DrawerClose = DialogPrimitive.Close
const DrawerPortal = DialogPrimitive.Portal

// ============================================================================
// DrawerOverlay
// ============================================================================

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-black/50',
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
  />
))
DrawerOverlay.displayName = DialogPrimitive.Overlay.displayName

// ============================================================================
// Sheet portal helpers
// ============================================================================

function resolveSheetPortalTarget(target: DrawerPortalTarget): Element {
  if (target === 'body' || typeof document === 'undefined') {
    return typeof document !== 'undefined' ? document.body : (null as unknown as Element)
  }

  const parentDialog = Array.from(document.querySelectorAll('[role="dialog"]')).find(
    (el) => !el.hasAttribute(ONESAZ_SHEET_ATTR),
  )

  return parentDialog || document.body
}

function useSheetPortalTarget(
  open: boolean,
  portalTarget: DrawerPortalTarget,
): Element | null {
  const [portalEl, setPortalEl] = React.useState<Element | null>(null)

  React.useEffect(() => {
    if (!open) {
      setPortalEl(null)
      return undefined
    }

    setPortalEl(resolveSheetPortalTarget(portalTarget))

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [open, portalTarget])

  return portalEl
}

// ============================================================================
// DrawerContent
// ============================================================================

export interface DrawerContentProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    'title'
  > {
  /** Side from which the drawer slides in */
  side?: 'left' | 'right' | 'top' | 'bottom'
  /** Whether to show the close button */
  showClose?: boolean
  /** Extra classes for the dimmed overlay (useful for nested drawers) */
  overlayClassName?: string
  /**
   * Presentation variant. Inherits from `Drawer` when omitted.
   * - `panel`: Radix dialog slide-out (StudentProfileLayout, full drawers)
   * - `sheet`: Portal bottom sheet for nested pickers (Combobox mobile)
   */
  variant?: DrawerVariant
  /** Portal target for sheet variant — `auto` finds parent dialog, else `body` */
  portalTarget?: DrawerPortalTarget
  /** Title rendered in the sheet header */
  title?: React.ReactNode
  /** Show drag handle grabber (sheet variant, bottom side) */
  showGrabber?: boolean
  /** Extra header content below title (search, filters, etc.) */
  headerExtra?: React.ReactNode
  /** Fixed footer slot (Done button, actions) */
  footer?: React.ReactNode
  /** Sheet height CSS value */
  height?: string
  /** Sheet max-height CSS value */
  maxHeight?: string
}

const slideVariants = {
  left: 'inset-y-0 left-0 h-full w-3/4 max-w-sm data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left',
  right: 'inset-y-0 right-0 h-full w-3/4 max-w-sm data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right',
  top: 'inset-x-0 top-0 w-full data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
  bottom:
    'inset-x-0 bottom-0 w-full max-h-[95dvh] overflow-hidden data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
}

const DrawerSheetContent = React.forwardRef<HTMLDivElement, DrawerContentProps>(
  (
    {
      side = 'bottom',
      showClose = true,
      showGrabber = side === 'bottom',
      title,
      headerExtra,
      footer,
      portalTarget = 'auto',
      height = 'min(72dvh, 560px)',
      maxHeight = '72dvh',
      className,
      children,
    },
    ref,
  ) => {
    const { open, onOpenChange } = useDrawerContext()
    const portalEl = useSheetPortalTarget(open, portalTarget)
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => setMounted(true), [])

    if (!mounted || !open || !portalEl) {
      return null
    }

    const nestedInDialog = portalEl !== document.body

    const handleClose = () => onOpenChange(false)

    return createPortal(
      <div
        ref={ref}
        className={cn(
          nestedInDialog ? 'absolute' : 'fixed',
          'inset-0 z-[9999] overflow-hidden',
        )}
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === 'string' ? title : 'Sheet'}
        {...{ [ONESAZ_SHEET_ATTR]: '' }}
        style={{ pointerEvents: 'auto' }}
      >
        <div
          role="presentation"
          className="absolute inset-0 bg-black/40"
          onClick={handleClose}
        />
        <div
          className={cn(
            'absolute z-[1] flex flex-col overflow-hidden border border-border bg-background shadow-2xl',
            side === 'bottom' && 'bottom-0 left-0 right-0 rounded-t-[20px]',
            side === 'top' && 'top-0 left-0 right-0 rounded-b-[20px]',
            className,
          )}
          onClick={(e) => e.stopPropagation()}
          style={{
            height: side === 'bottom' || side === 'top' ? height : undefined,
            maxHeight: side === 'bottom' || side === 'top' ? maxHeight : undefined,
            pointerEvents: 'auto',
          }}
        >
          {(title || showGrabber || showClose || headerExtra) && (
            <div className="shrink-0 border-b border-border/60 bg-background px-4">
              {showGrabber && side === 'bottom' && (
                <div className="flex justify-center pt-2.5" aria-hidden="true">
                  <div className="h-[5px] w-10 rounded-full bg-muted" />
                </div>
              )}
              {(title || showClose) && (
                <div className="flex items-center justify-between pb-2.5 pt-2">
                  {title ? (
                    <h2 className="text-[17px] font-bold capitalize tracking-tight text-foreground">
                      {title}
                    </h2>
                  ) : (
                    <span />
                  )}
                  {showClose && (
                    <button
                      type="button"
                      aria-label="Close"
                      onClick={handleClose}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-foreground"
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
                        <path d="M18 6 6 18M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              )}
              {headerExtra}
            </div>
          )}

          <div
            className="min-h-0 flex-1 overflow-y-auto overscroll-contain"
            style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-y' }}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            {children}
          </div>

          {footer ? (
            <div className="shrink-0 border-t border-border bg-background px-4 pb-[max(14px,env(safe-area-inset-bottom))] pt-3">
              {footer}
            </div>
          ) : null}
        </div>
      </div>,
      portalEl,
    )
  },
)
DrawerSheetContent.displayName = 'DrawerSheetContent'

const DrawerPanelContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DrawerContentProps
>(
  (
    {
      side = 'right',
      showClose = true,
      overlayClassName,
      className,
      children,
      variant: _variant,
      portalTarget: _portalTarget,
      title: _title,
      showGrabber: _showGrabber,
      headerExtra: _headerExtra,
      footer: _footer,
      height: _height,
      maxHeight: _maxHeight,
      ...props
    },
    ref,
  ) => (
  <DrawerPortal>
    <DrawerOverlay className={overlayClassName} />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed z-50 bg-background shadow-lg',
        'flex flex-col',
        'duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out',
        slideVariants[side],
        className
      )}
      {...props}
    >
      {children}
      {showClose && (
        <DrawerClose
          className={cn(
            'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity',
            'hover:opacity-100',
            'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
            'disabled:pointer-events-none'
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
          <span className="sr-only">Close</span>
        </DrawerClose>
      )}
    </DialogPrimitive.Content>
  </DrawerPortal>
  ),
)
DrawerPanelContent.displayName = 'DrawerPanelContent'

const DrawerContent = React.forwardRef<HTMLDivElement, DrawerContentProps>(
  ({ variant: variantProp, ...props }, ref) => {
    const { variant: contextVariant } = useDrawerContext()
    const variant = variantProp ?? contextVariant

    if (variant === 'sheet') {
      return <DrawerSheetContent ref={ref} {...props} />
    }

    return (
      <DrawerPanelContent
        ref={ref as React.Ref<React.ElementRef<typeof DialogPrimitive.Content>>}
        {...props}
      />
    )
  },
)
DrawerContent.displayName = 'DrawerContent'

// ============================================================================
// DrawerHeader
// ============================================================================

export interface DrawerHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const DrawerHeader = React.forwardRef<HTMLDivElement, DrawerHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col gap-1.5 p-6 pb-0', className)}
      {...props}
    />
  )
)
DrawerHeader.displayName = 'DrawerHeader'

// ============================================================================
// DrawerTitle
// ============================================================================

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold text-foreground', className)}
    {...props}
  />
))
DrawerTitle.displayName = DialogPrimitive.Title.displayName

// ============================================================================
// DrawerDescription
// ============================================================================

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))
DrawerDescription.displayName = DialogPrimitive.Description.displayName

// ============================================================================
// DrawerBody
// ============================================================================

export interface DrawerBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

const DrawerBody = React.forwardRef<HTMLDivElement, DrawerBodyProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex-1 overflow-auto p-6', className)}
      {...props}
    />
  )
)
DrawerBody.displayName = 'DrawerBody'

// ============================================================================
// DrawerFooter
// ============================================================================

export interface DrawerFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const DrawerFooter = React.forwardRef<HTMLDivElement, DrawerFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-col-reverse gap-2 p-6 pt-0 sm:flex-row sm:justify-end',
        className
      )}
      {...props}
    />
  )
)
DrawerFooter.displayName = 'DrawerFooter'

// ============================================================================
// Sheet - Alias for Drawer (common alternative name)
// ============================================================================

const Sheet = Drawer
const SheetTrigger = DrawerTrigger
const SheetClose = DrawerClose
const SheetPortal = DrawerPortal
const SheetOverlay = DrawerOverlay
const SheetContent = DrawerContent
const SheetHeader = DrawerHeader
const SheetTitle = DrawerTitle
const SheetDescription = DrawerDescription
const SheetBody = DrawerBody
const SheetFooter = DrawerFooter

export {
  // Drawer exports
  Drawer,
  DrawerTrigger,
  DrawerClose,
  DrawerPortal,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
  DrawerFooter,
  // Sheet exports (aliases)
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetPortal,
  SheetOverlay,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetBody,
  SheetFooter,
}
