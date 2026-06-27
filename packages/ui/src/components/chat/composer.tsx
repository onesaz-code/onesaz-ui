import * as React from 'react'
import { cn } from '../../utils/cn'

export interface ComposerProps {
  value: string
  onChange: (value: string) => void
  /** Called on Enter (without Shift) or Send click. */
  onSend: () => void
  /** Called when the user presses Stop while streaming. */
  onStop?: () => void
  /** When true, shows a Stop button instead of Send. */
  isStreaming?: boolean
  disabled?: boolean
  placeholder?: string
  /** Slot rendered on the left of the input (e.g. an attach button). */
  startAdornment?: React.ReactNode
  /** Max textarea rows before it scrolls. */
  maxRows?: number
  className?: string
}

const SendIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
)

const StopIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
    <rect x="6" y="6" width="12" height="12" rx="2" />
  </svg>
)

/** Auto-growing message input with Send/Stop control. */
export const Composer = React.forwardRef<HTMLTextAreaElement, ComposerProps>(
  (
    {
      value,
      onChange,
      onSend,
      onStop,
      isStreaming = false,
      disabled = false,
      placeholder = 'Type a message…',
      startAdornment,
      maxRows = 6,
      className,
    },
    ref
  ) => {
    const innerRef = React.useRef<HTMLTextAreaElement | null>(null)
    const setRefs = (node: HTMLTextAreaElement | null) => {
      innerRef.current = node
      if (typeof ref === 'function') ref(node)
      else if (ref) (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = node
    }

    // Auto-resize to fit content up to maxRows.
    React.useLayoutEffect(() => {
      const el = innerRef.current
      if (!el) return
      el.style.height = 'auto'
      const lineHeight = parseInt(getComputedStyle(el).lineHeight || '20', 10) || 20
      const max = lineHeight * maxRows
      el.style.height = `${Math.min(el.scrollHeight, max)}px`
      el.style.overflowY = el.scrollHeight > max ? 'auto' : 'hidden'
    }, [value, maxRows])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
        e.preventDefault()
        if (!disabled && !isStreaming && value.trim()) onSend()
      }
    }

    const canSend = !disabled && value.trim().length > 0

    return (
      <div
        className={cn(
          'flex items-end gap-2 rounded-2xl border border-border bg-background p-2',
          'focus-within:border-accent focus-within:ring-2 focus-within:ring-ring/30',
          disabled && 'opacity-60',
          className
        )}
      >
        {startAdornment && <div className="flex shrink-0 items-center pb-1">{startAdornment}</div>}

        <textarea
          ref={setRefs}
          rows={1}
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="max-h-full flex-1 resize-none bg-transparent px-2 py-1.5 text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />

        {isStreaming ? (
          <button
            type="button"
            onClick={onStop}
            aria-label="Stop generating"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-foreground transition-colors hover:bg-muted/80"
          >
            <StopIcon />
          </button>
        ) : (
          <button
            type="button"
            onClick={onSend}
            disabled={!canSend}
            aria-label="Send message"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground transition-colors hover:bg-accent-hover disabled:pointer-events-none disabled:opacity-40"
          >
            <SendIcon />
          </button>
        )}
      </div>
    )
  }
)
Composer.displayName = 'Composer'
