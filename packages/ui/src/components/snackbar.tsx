import * as React from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../utils/cn'
import { Alert } from './alert'
import type { AlertVariant } from './alert'

// ============================================================================
// Types
// ============================================================================

export type SnackbarCloseReason = 'timeout' | 'clickaway' | 'escapeKeyDown'

export interface SnackbarOrigin {
  vertical:   'top' | 'bottom'
  horizontal: 'left' | 'center' | 'right'
}

// ============================================================================
// SnackbarContent  (default renderer for plain-text snackbars)
// ============================================================================

export interface SnackbarContentProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: React.ReactNode
  action?:  React.ReactNode
}

const SnackbarContent = React.forwardRef<HTMLDivElement, SnackbarContentProps>(
  ({ className, message, action, ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={cn(
        'flex items-center gap-3 min-w-72 max-w-[568px] rounded-lg px-4 py-3 text-sm shadow-lg',
        'bg-foreground text-background',
        className
      )}
      {...props}
    >
      <span className="flex-1">{message}</span>
      {action && <span className="shrink-0">{action}</span>}
    </div>
  )
)
SnackbarContent.displayName = 'SnackbarContent'

// ============================================================================
// Snackbar  (standalone controlled component)
// ============================================================================

export interface SnackbarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClose'> {
  /** Whether the snackbar is visible */
  open:               boolean
  /** Simple text/node — used when no children provided */
  message?:           React.ReactNode
  /** Action element rendered inside SnackbarContent */
  action?:            React.ReactNode
  /** Ms before auto-close. null to disable. @default 6000 */
  autoHideDuration?:  number | null
  /** Fired when the snackbar wants to close */
  onClose?:           (event: React.SyntheticEvent | Event | null, reason: SnackbarCloseReason) => void
  /** Position on screen @default { vertical: 'bottom', horizontal: 'left' } */
  anchorOrigin?:      SnackbarOrigin
  /** Transition duration in ms @default 225 */
  transitionDuration?: number
  /** Don't pause timer when window loses focus */
  disableWindowBlurListener?: boolean
  /** Render inline instead of in a portal */
  disablePortal?:     boolean
  /** Use <Alert> or any custom content */
  children?:          React.ReactNode
}

const anchorClasses: Record<string, string> = {
  'top-left':      'top-4 left-4',
  'top-center':    'top-4 left-1/2 -translate-x-1/2',
  'top-right':     'top-4 right-4',
  'bottom-left':   'bottom-4 left-4',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
  'bottom-right':  'bottom-4 right-4',
}

const Snackbar = React.forwardRef<HTMLDivElement, SnackbarProps>(
  (
    {
      open,
      message,
      action,
      autoHideDuration            = 6000,
      onClose,
      anchorOrigin                = { vertical: 'bottom', horizontal: 'left' },
      transitionDuration          = 225,
      disableWindowBlurListener   = false,
      disablePortal               = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [mounted, setMounted] = React.useState(open)
    const [visible, setVisible] = React.useState(false)
    const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

    const posKey   = `${anchorOrigin.vertical}-${anchorOrigin.horizontal}`
    const position = anchorClasses[posKey] ?? anchorClasses['bottom-left']
    const slideDir = anchorOrigin.vertical === 'top' ? '-8px' : '8px'

    const clearTimer  = React.useCallback(() => { if (timer.current) clearTimeout(timer.current) }, [])
    const startTimer  = React.useCallback(() => {
      if (!autoHideDuration) return
      clearTimer()
      timer.current = setTimeout(() => onClose?.(null, 'timeout'), autoHideDuration)
    }, [autoHideDuration, onClose, clearTimer])

    // Open/close animation cycle
    React.useEffect(() => {
      if (open) {
        setMounted(true)
        const raf = requestAnimationFrame(() => setVisible(true))
        return () => cancelAnimationFrame(raf)
      } else {
        setVisible(false)
        const t = setTimeout(() => setMounted(false), transitionDuration)
        return () => clearTimeout(t)
      }
    }, [open, transitionDuration])

    // Auto-hide timer
    React.useEffect(() => {
      if (open) { startTimer(); return clearTimer }
    }, [open, startTimer, clearTimer])

    // Pause on window blur, resume on focus
    React.useEffect(() => {
      if (disableWindowBlurListener || !open) return
      window.addEventListener('blur',  clearTimer)
      window.addEventListener('focus', startTimer)
      return () => {
        window.removeEventListener('blur',  clearTimer)
        window.removeEventListener('focus', startTimer)
      }
    }, [open, disableWindowBlurListener, clearTimer, startTimer])

    // Escape key to close
    React.useEffect(() => {
      if (!open) return
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') { e.stopPropagation(); onClose?.(e as unknown as Event, 'escapeKeyDown') }
      }
      document.addEventListener('keydown', onKey)
      return () => document.removeEventListener('keydown', onKey)
    }, [open, onClose])

    if (!mounted) return null

    const node = (
      <div
        ref={ref}
        className={cn('fixed z-[1400]', position, className)}
        style={{
          opacity:    visible ? 1 : 0,
          transform:  visible ? 'translateY(0)' : `translateY(${slideDir})`,
          transition: `opacity ${transitionDuration}ms ease, transform ${transitionDuration}ms ease`,
        }}
        onMouseEnter={clearTimer}
        onMouseLeave={startTimer}
        {...props}
      >
        {children ?? <SnackbarContent message={message} action={action} />}
      </div>
    )

    if (disablePortal || typeof document === 'undefined') return node
    return createPortal(node, document.body)
  }
)
Snackbar.displayName = 'Snackbar'

// ============================================================================
// Internal: managed item + animated row
// ============================================================================

interface ManagedItem {
  key:              string
  content:          React.ReactNode
  autoHideDuration: number | null
  anchorOrigin:     SnackbarOrigin
  onClose?:         () => void
}

interface ManagedRowProps {
  item:              ManagedItem
  vertical:          'top' | 'bottom'
  transitionDuration: number
  onRemove:          (key: string) => void
}

function ManagedRow({ item, vertical, transitionDuration, onRemove }: ManagedRowProps) {
  const [visible, setVisible] = React.useState(false)
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const slideDir = vertical === 'top' ? '-8px' : '8px'

  const clearTimer = React.useCallback(() => { if (timer.current) clearTimeout(timer.current) }, [])
  const startTimer = React.useCallback(() => {
    if (!item.autoHideDuration) return
    clearTimer()
    timer.current = setTimeout(() => { onRemove(item.key); item.onClose?.() }, item.autoHideDuration)
  }, [item, onRemove, clearTimer])

  React.useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  React.useEffect(() => { startTimer(); return clearTimer }, [startTimer, clearTimer])

  return (
    <div
      style={{
        opacity:    visible ? 1 : 0,
        transform:  visible ? 'translateY(0)' : `translateY(${slideDir})`,
        transition: `opacity ${transitionDuration}ms ease, transform ${transitionDuration}ms ease`,
      }}
      onMouseEnter={clearTimer}
      onMouseLeave={startTimer}
    >
      {item.content}
    </div>
  )
}

// ============================================================================
// SnackbarProvider + useSnackbar
// ============================================================================

export interface EnqueueOptions {
  /** Wraps the message in an <Alert> with this variant */
  variant?:          AlertVariant
  autoHideDuration?: number | null
  anchorOrigin?:     SnackbarOrigin
  /** Action rendered inside plain SnackbarContent (ignored when variant is set) */
  action?:           React.ReactNode
  onClose?:          () => void
}

interface SnackbarContextValue {
  enqueueSnackbar: (message: React.ReactNode, options?: EnqueueOptions) => string
  closeSnackbar:   (key: string) => void
}

const SnackbarContext = React.createContext<SnackbarContextValue>({
  enqueueSnackbar: () => '',
  closeSnackbar:   () => {},
})

export interface SnackbarProviderProps {
  children:           React.ReactNode
  /** Default anchor position @default { vertical: 'bottom', horizontal: 'left' } */
  anchorOrigin?:      SnackbarOrigin
  /** Default auto-hide duration in ms @default 5000 */
  autoHideDuration?:  number | null
  /** Max snackbars shown at once @default 3 */
  maxSnack?:          number
  /** Transition duration in ms @default 225 */
  transitionDuration?: number
}

function SnackbarProvider({
  children,
  anchorOrigin       = { vertical: 'bottom', horizontal: 'left' },
  autoHideDuration   = 5000,
  maxSnack           = 3,
  transitionDuration = 225,
}: SnackbarProviderProps) {
  const [items, setItems] = React.useState<ManagedItem[]>([])

  const closeSnackbar = React.useCallback((key: string) => {
    setItems((prev) => prev.filter((i) => i.key !== key))
  }, [])

  const enqueueSnackbar = React.useCallback(
    (message: React.ReactNode, options: EnqueueOptions = {}): string => {
      const key = `snk-${Date.now()}-${Math.random().toString(36).slice(2)}`
      const { variant, action, onClose, autoHideDuration: dur, anchorOrigin: anchor } = options

      // Build content node
      let content: React.ReactNode
      if (variant) {
        content = (
          <Alert variant={variant} onClose={() => { closeSnackbar(key); onClose?.() }}>
            {message}
          </Alert>
        )
      } else if (React.isValidElement(message)) {
        content = message
      } else {
        content = <SnackbarContent message={message} action={action} />
      }

      setItems((prev) => {
        const capped = prev.length >= maxSnack ? prev.slice(-(maxSnack - 1)) : prev
        return [
          ...capped,
          {
            key,
            content,
            autoHideDuration: dur !== undefined ? dur : autoHideDuration,
            anchorOrigin:     anchor ?? anchorOrigin,
            onClose,
          },
        ]
      })

      return key
    },
    [autoHideDuration, anchorOrigin, maxSnack, closeSnackbar]
  )

  // Group items by anchor position
  const groups = React.useMemo(() => {
    const map = new Map<string, ManagedItem[]>()
    items.forEach((item) => {
      const k = `${item.anchorOrigin.vertical}-${item.anchorOrigin.horizontal}`
      map.set(k, [...(map.get(k) ?? []), item])
    })
    return map
  }, [items])

  return (
    <SnackbarContext.Provider value={{ enqueueSnackbar, closeSnackbar }}>
      {children}

      {typeof document !== 'undefined' &&
        Array.from(groups.entries()).map(([posKey, posItems]) => {
          const [vertical, horizontal] = posKey.split('-') as ['top' | 'bottom', 'left' | 'center' | 'right']

          return createPortal(
            <div
              key={posKey}
              className={cn(
                'fixed z-[1400] flex gap-2 pointer-events-none',
                vertical === 'top' ? 'top-4 flex-col' : 'bottom-4 flex-col-reverse',
                horizontal === 'left'   ? 'left-4'
                  : horizontal === 'right' ? 'right-4'
                  : 'left-1/2 -translate-x-1/2',
              )}
            >
              {posItems.map((item) => (
                <div key={item.key} className="pointer-events-auto">
                  <ManagedRow
                    item={item}
                    vertical={vertical}
                    transitionDuration={transitionDuration}
                    onRemove={closeSnackbar}
                  />
                </div>
              ))}
            </div>,
            document.body
          )
        })}
    </SnackbarContext.Provider>
  )
}

const useSnackbar = () => React.useContext(SnackbarContext)

export { Snackbar, SnackbarContent, SnackbarProvider, useSnackbar }
