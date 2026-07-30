import * as React from 'react'
import { cn } from '../utils/cn'

export interface ChipInputProps {
  /** Current chips (controlled) */
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string
  disabled?: boolean
  /** Prevent duplicate entries (default true) */
  unique?: boolean
  className?: string
  'aria-label'?: string
}

/**
 * A token / tag / recipient input — type and press Enter or comma to add a
 * chip, Backspace on an empty field removes the last, and each chip has a
 * remove button. Controlled via `value` + `onChange`.
 */
const ChipInput = React.forwardRef<HTMLInputElement, ChipInputProps>(
  ({ value, onChange, placeholder, disabled, unique = true, className, 'aria-label': ariaLabel }, ref) => {
    const [draft, setDraft] = React.useState('')
    const commit = () => {
      const v = draft.trim().replace(/,+$/, '').trim()
      if (v && (!unique || !value.includes(v))) onChange([...value, v])
      setDraft('')
    }
    return (
      <div
        className={cn(
          'flex flex-wrap items-center gap-1.5 rounded-md border border-input bg-background px-2 py-1.5',
          'focus-within:ring-2 focus-within:ring-ring',
          disabled && 'pointer-events-none opacity-50',
          className
        )}
      >
        {value.map((chip, i) => (
          <span key={`${chip}-${i}`} className="inline-flex max-w-full items-center gap-1 rounded-full bg-muted py-0.5 pl-2.5 pr-1 text-sm text-foreground">
            <span className="truncate">{chip}</span>
            <button
              type="button"
              aria-label={`Remove ${chip}`}
              onClick={() => onChange(value.filter((_, j) => j !== i))}
              className="shrink-0 rounded-full p-0.5 text-muted-foreground hover:bg-foreground/10 hover:text-foreground"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
          </span>
        ))}
        <input
          ref={ref}
          value={draft}
          disabled={disabled}
          aria-label={ariaLabel}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); commit() }
            else if (e.key === 'Backspace' && !draft && value.length) onChange(value.slice(0, -1))
          }}
          onBlur={commit}
          placeholder={value.length ? '' : placeholder}
          className="min-w-[80px] flex-1 border-0 bg-transparent p-0.5 text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>
    )
  }
)
ChipInput.displayName = 'ChipInput'

export { ChipInput }
