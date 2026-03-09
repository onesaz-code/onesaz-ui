import * as React from 'react'
import { cn } from '../utils/cn'

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Renders a dash instead of a checkmark — useful for "select some" states */
  indeterminate?: boolean
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      checked,
      defaultChecked,
      onChange,
      disabled,
      indeterminate = false,
      ...props
    },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null)
    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement)

    // Track visual state — works for both controlled and uncontrolled usage
    const [isChecked, setIsChecked] = React.useState<boolean>(
      checked !== undefined ? Boolean(checked) : Boolean(defaultChecked)
    )

    // Keep visual state in sync when controlled from outside
    React.useEffect(() => {
      if (checked !== undefined) setIsChecked(Boolean(checked))
    }, [checked])

    // Indeterminate is not a real HTML attribute — must be set via JS
    React.useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = indeterminate
      }
    }, [indeterminate])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (checked === undefined) setIsChecked(e.target.checked)
      onChange?.(e)
    }

    const active = isChecked || indeterminate

    return (
      <label
        className={cn(
          'relative inline-flex h-4 w-4 shrink-0',
          disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
          className
        )}
      >
        {/* Real input — visually hidden but accessible for keyboard, forms, and screen readers */}
        <input
          ref={inputRef}
          type="checkbox"
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={handleChange}
          disabled={disabled}
          className="peer sr-only"
          {...props}
        />

        {/* Custom visual box — sibling of input so peer-* variants work */}
        <span
          aria-hidden="true"
          className={cn(
            'h-4 w-4 rounded-sm border transition-colors duration-150',
            'flex items-center justify-center',
            // Focus ring mirrors the hidden input's focus-visible state
            'peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background peer-focus-visible:outline-none',
            active
              ? 'bg-accent border-accent text-accent-foreground'
              : 'bg-background border-muted-foreground text-transparent'
          )}
        >
          {indeterminate ? (
            // Dash for indeterminate
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
            </svg>
          ) : (
            // Checkmark
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </span>
      </label>
    )
  }
)
Checkbox.displayName = 'Checkbox'

export { Checkbox }
