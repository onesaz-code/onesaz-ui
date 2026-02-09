import * as React from 'react'
import { cn } from '../../utils/cn'

export interface ComboboxOption {
  value: string
  label: string
  disabled?: boolean
}

// ============================================================================
// Single Select Combobox Props
// ============================================================================
export interface ComboboxSingleProps {
  options: ComboboxOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
  disabled?: boolean
  className?: string
  multiple?: false
}

// ============================================================================
// Multi Select Combobox Props
// ============================================================================
export interface ComboboxMultipleProps {
  options: ComboboxOption[]
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
  disabled?: boolean
  className?: string
  multiple: true
  /** Maximum number of items to display as chips before showing "+N more" */
  maxDisplayItems?: number
}

export type ComboboxProps = ComboboxSingleProps | ComboboxMultipleProps

// Type guard to check if props are for multi-select
function isMultipleProps(props: ComboboxProps): props is ComboboxMultipleProps {
  return props.multiple === true
}

const Combobox = React.forwardRef<HTMLInputElement, ComboboxProps>(
  (props, ref) => {
    const {
      options,
      placeholder = 'Select option...',
      searchPlaceholder = 'Search...',
      emptyMessage = 'No results found.',
      disabled = false,
      className,
    } = props

    const [open, setOpen] = React.useState(false)
    const [search, setSearch] = React.useState('')
    const containerRef = React.useRef<HTMLDivElement>(null)

    // Handle single vs multiple value state
    const isMultiple = isMultipleProps(props)

    // Single select state
    const [internalSingleValue, setInternalSingleValue] = React.useState(
      !isMultiple ? (props.defaultValue ?? '') : ''
    )

    // Multi select state
    const [internalMultiValue, setInternalMultiValue] = React.useState<string[]>(
      isMultiple ? (props.defaultValue ?? []) : []
    )

    // Get current value(s)
    const singleValue = !isMultiple
      ? (props.value !== undefined ? props.value : internalSingleValue)
      : ''
    const multiValue = isMultiple
      ? (props.value !== undefined ? props.value : internalMultiValue)
      : []

    const filteredOptions = React.useMemo(() => {
      if (!search) return options
      return options.filter((option) =>
        option.label.toLowerCase().includes(search.toLowerCase())
      )
    }, [options, search])

    // Single select: get selected option
    const selectedOption = !isMultiple
      ? options.find((option) => option.value === singleValue)
      : undefined

    // Multi select: get selected options
    const selectedOptions = isMultiple
      ? options.filter((option) => multiValue.includes(option.value))
      : []

    const handleSingleSelect = (optionValue: string) => {
      if (!isMultiple) {
        if (props.value === undefined) {
          setInternalSingleValue(optionValue)
        }
        props.onValueChange?.(optionValue)
        setOpen(false)
        setSearch('')
      }
    }

    const handleMultiSelect = (optionValue: string) => {
      if (isMultiple) {
        const newValue = multiValue.includes(optionValue)
          ? multiValue.filter((v) => v !== optionValue)
          : [...multiValue, optionValue]

        if (props.value === undefined) {
          setInternalMultiValue(newValue)
        }
        props.onValueChange?.(newValue)
      }
    }

    const handleRemoveItem = (optionValue: string, e: React.MouseEvent) => {
      e.stopPropagation()
      if (isMultiple) {
        const newValue = multiValue.filter((v) => v !== optionValue)
        if (props.value === undefined) {
          setInternalMultiValue(newValue)
        }
        props.onValueChange?.(newValue)
      }
    }

    const handleClearAll = (e: React.MouseEvent) => {
      e.stopPropagation()
      if (isMultiple) {
        if (props.value === undefined) {
          setInternalMultiValue([])
        }
        props.onValueChange?.([])
      }
    }

    // Close on click outside
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setOpen(false)
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const maxDisplayItems = isMultiple ? (props.maxDisplayItems ?? 3) : 0
    const displayedOptions = selectedOptions.slice(0, maxDisplayItems)
    const remainingCount = selectedOptions.length - maxDisplayItems

    return (
      <div ref={containerRef} className="relative">
        <button
          type="button"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          onClick={() => setOpen(!open)}
          className={cn(
            'flex min-h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm',
            'ring-offset-background',
            'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            isMultiple && selectedOptions.length > 0 && 'h-auto',
            className
          )}
        >
          {isMultiple ? (
            <div className="flex flex-1 flex-wrap items-center gap-1">
              {selectedOptions.length === 0 ? (
                <span className="text-muted-foreground">{placeholder}</span>
              ) : (
                <>
                  {displayedOptions.map((option) => (
                    <span
                      key={option.value}
                      className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 text-xs font-medium"
                    >
                      {option.label}
                      <button
                        type="button"
                        onClick={(e) => handleRemoveItem(option.value, e)}
                        className="ml-1 rounded-full hover:bg-background/50"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
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
                    </span>
                  ))}
                  {remainingCount > 0 && (
                    <span className="text-xs text-muted-foreground">
                      +{remainingCount} more
                    </span>
                  )}
                </>
              )}
            </div>
          ) : (
            <span className={cn(!selectedOption && 'text-muted-foreground')}>
              {selectedOption?.label ?? placeholder}
            </span>
          )}

          <div className="flex items-center gap-1">
            {/* Clear all button for multi-select */}
            {isMultiple && selectedOptions.length > 0 && (
              <button
                type="button"
                onClick={handleClearAll}
                className="rounded p-0.5 hover:bg-muted"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-50 hover:opacity-100"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            )}
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
              className={cn(
                'h-4 w-4 shrink-0 opacity-50 transition-transform',
                open && 'rotate-180'
              )}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </button>

        {open && (
          <div className="absolute z-50 mt-1 w-full overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-md">
            <div className="flex items-center border-b border-border px-3">
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
                className="mr-2 h-4 w-4 shrink-0 opacity-50"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                ref={ref}
                className="flex h-10 w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
                placeholder={searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="max-h-[300px] overflow-y-auto p-1">
              {filteredOptions.length === 0 ? (
                <div className="py-6 text-center text-sm text-muted-foreground">
                  {emptyMessage}
                </div>
              ) : (
                filteredOptions.map((option) => {
                  const isSelected = isMultiple
                    ? multiValue.includes(option.value)
                    : option.value === singleValue

                  return (
                    <button
                      key={option.value}
                      type="button"
                      disabled={option.disabled}
                      onClick={() =>
                        isMultiple
                          ? handleMultiSelect(option.value)
                          : handleSingleSelect(option.value)
                      }
                      className={cn(
                        'relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none',
                        'hover:bg-muted hover:text-foreground',
                        'focus:bg-muted focus:text-foreground',
                        'disabled:pointer-events-none disabled:opacity-50',
                        isSelected && 'bg-muted'
                      )}
                    >
                      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                        {isMultiple ? (
                          // Checkbox for multi-select
                          <div
                            className={cn(
                              'h-4 w-4 rounded border border-input',
                              isSelected && 'bg-accent border-accent'
                            )}
                          >
                            {isSelected && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="white"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4"
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            )}
                          </div>
                        ) : (
                          // Checkmark for single-select
                          isSelected && (
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
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )
                        )}
                      </span>
                      {option.label}
                    </button>
                  )
                })
              )}
            </div>
          </div>
        )}
      </div>
    )
  }
)
Combobox.displayName = 'Combobox'

export { Combobox }
