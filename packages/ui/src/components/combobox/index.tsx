import * as React from 'react'
import { cn } from '../../utils/cn'

export interface ComboboxOption {
  value: string
  label: string
  disabled?: boolean
}

type ComboboxPrimitiveOption = string
type ComboboxObjectOption = object
type ComboboxOptionInput = ComboboxPrimitiveOption | ComboboxObjectOption
type NormalizedOption<T> = {
  value: string
  label: string
  disabled?: boolean
  raw: T
}

// ============================================================================
// Shared Props (common to both single and multi)
// ============================================================================
interface ComboboxSharedProps<T extends ComboboxOptionInput = ComboboxOptionInput> {
  options: T[]
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
  disabled?: boolean
  className?: string
  clearable?: boolean
  openOnFocus?: boolean
  inputValue?: string
  onInputChange?: (value: string) => void
  simpleOptions?: boolean
  labelKey?: string
  valueKey?: string
  /** Node rendered at the start (left) of the trigger button */
  startAdornment?: React.ReactNode
  /** Click handler for the start adornment — renders it as a button when provided */
  onStartAdornmentClick?: (e: React.MouseEvent) => void
  /** Node rendered at the end (right) of the trigger button, before the chevron */
  endAdornment?: React.ReactNode
  /** Click handler for the end adornment — renders it as a button when provided */
  onEndAdornmentClick?: (e: React.MouseEvent) => void
}

// ============================================================================
// Single Select Combobox Props
// ============================================================================
export interface ComboboxSingleProps<T extends ComboboxOptionInput = ComboboxOptionInput>
  extends ComboboxSharedProps<T> {
  value?: T | null
  defaultValue?: T | null
  onChange?: (value: T | null) => void
  multiple?: false
}

// ============================================================================
// Multi Select Combobox Props
// ============================================================================
export interface ComboboxMultipleProps<T extends ComboboxOptionInput = ComboboxOptionInput>
  extends ComboboxSharedProps<T> {
  value?: T[]
  defaultValue?: T[]
  onChange?: (value: T[]) => void
  multiple: true
  /** Show select-all option */
  selectAll?: boolean
  /** Label for select-all option */
  selectAllLabel?: string
  /** Maximum number of items to display as chips before showing "+N more" */
  maxDisplayItems?: number
}

export type ComboboxProps =
  | ComboboxSingleProps
  | ComboboxMultipleProps

// Type guard to check if props are for multi-select
function isMultipleProps(props: ComboboxProps): props is ComboboxMultipleProps {
  return props.multiple === true
}

// ============================================================================
// Adornment helper — renders as button (clickable) or span (decorative)
// ============================================================================
function Adornment({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode
  onClick?: (e: React.MouseEvent) => void
  className?: string
}) {
  if (onClick) {
    return (
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onClick(e)
        }}
        className={cn('shrink-0 rounded p-0.5 hover:bg-muted', className)}
      >
        {children}
      </button>
    )
  }
  return (
    <span className={cn('shrink-0 pointer-events-none opacity-50', className)}>
      {children}
    </span>
  )
}

const Combobox = React.forwardRef<HTMLInputElement, ComboboxProps>(
  (props, ref) => {
    const {
      options,
      placeholder = 'Select option...',
      searchPlaceholder = 'Search...',
      emptyMessage = 'No results found.',
      disabled = false,
      clearable = true,
      openOnFocus = true,
      className,
      startAdornment,
      onStartAdornmentClick,
      endAdornment,
      onEndAdornmentClick,
    } = props

    const labelKey = props.labelKey ?? 'label'
    const valueKey = props.valueKey ?? 'value'

    const getOptionLabel = React.useCallback(
      (option: ComboboxOptionInput) => {
        if (typeof option === 'string') return option
        const record = option as Record<string, unknown>
        const maybeLabel = record[labelKey]
        return typeof maybeLabel === 'string' ? maybeLabel : String(maybeLabel ?? '')
      },
      [labelKey]
    )

    const getOptionValue = React.useCallback(
      (option: ComboboxOptionInput) => {
        if (typeof option === 'string') return option
        const record = option as Record<string, unknown>
        const maybeValue = record[valueKey]
        if (maybeValue !== undefined && maybeValue !== null) {
          return String(maybeValue)
        }
        return getOptionLabel(option)
      },
      [valueKey, getOptionLabel]
    )

    const normalizedOptions = React.useMemo<NormalizedOption<ComboboxOptionInput>[]>(
      () =>
        (options ?? []).map((option) => ({
          raw: option,
          label: getOptionLabel(option),
          value: getOptionValue(option),
          disabled: Boolean((option as { disabled?: boolean }).disabled),
        })),
      [options, getOptionLabel, getOptionValue]
    )

    const [open, setOpen] = React.useState(false)
    const [internalSearch, setInternalSearch] = React.useState('')
    const containerRef = React.useRef<HTMLDivElement>(null)
    const searchInputRef = React.useRef<HTMLInputElement | null>(null)

    // Handle single vs multiple value state
    const isMultiple = isMultipleProps(props)
    const selectAll = isMultiple ? (props.selectAll ?? false) : false
    const selectAllLabel = isMultiple ? (props.selectAllLabel ?? 'Select all') : 'Select all'

    // Single select state
    const [internalSingleValue, setInternalSingleValue] = React.useState<
      ComboboxOptionInput | null
    >(!isMultiple ? (props.defaultValue ?? null) : null)

    // Multi select state
    const [internalMultiValue, setInternalMultiValue] = React.useState<
      ComboboxOptionInput[]
    >(isMultiple ? (props.defaultValue ?? []) : [])

    // Get current value(s)
    const singleValue = !isMultiple
      ? (props.value !== undefined ? (props.value as ComboboxOptionInput | null) : internalSingleValue)
      : null
    const multiValue = isMultiple
      ? (props.value !== undefined ? (props.value as ComboboxOptionInput[]) : internalMultiValue)
      : []

    const search = props.inputValue !== undefined ? props.inputValue : internalSearch

    const filteredOptions = React.useMemo(() => {
      if (!search) return normalizedOptions
      return normalizedOptions.filter((option) =>
        option.label.toLowerCase().includes(search.toLowerCase())
      )
    }, [normalizedOptions, search])

    // Single select: get selected option
    // Multi select: get selected options
    const selectedOptions = isMultiple ? multiValue : []
    const selectedValueKeys = React.useMemo(
      () => new Set(selectedOptions.map((option) => getOptionValue(option))),
      [selectedOptions, getOptionValue]
    )
    const singleValueKey = singleValue ? getOptionValue(singleValue) : null
    const selectableOptions = React.useMemo(
      () => normalizedOptions.filter((option) => !option.disabled),
      [normalizedOptions]
    )
    const allSelected =
      isMultiple &&
      selectableOptions.length > 0 &&
      selectableOptions.every((option) => selectedValueKeys.has(option.value))

    const handleSingleSelect = (option: ComboboxOptionInput) => {
      if (!isMultiple) {
        if (props.value === undefined) {
          setInternalSingleValue(option)
        }
        props.onChange?.(option as never)
        setOpen(false)
        if (props.inputValue === undefined) {
          setInternalSearch('')
        }
      }
    }

    const handleMultiSelect = (option: ComboboxOptionInput) => {
      if (isMultiple) {
        const optionKey = getOptionValue(option)
        const exists = multiValue.some((item) => getOptionValue(item) === optionKey)
        const newValue = exists
          ? multiValue.filter((item) => getOptionValue(item) !== optionKey)
          : [...multiValue, option]

        if (props.value === undefined) {
          setInternalMultiValue(newValue)
        }
        props.onChange?.(newValue as never)
      }
    }

    const handleRemoveItem = (optionValue: string, e: React.MouseEvent) => {
      e.stopPropagation()
      if (isMultiple) {
        const newValue = multiValue.filter((v) => getOptionValue(v) !== optionValue)
        if (props.value === undefined) {
          setInternalMultiValue(newValue)
        }
        props.onChange?.(newValue as never)
      }
    }

    const handleClearAll = (e: React.MouseEvent) => {
      e.stopPropagation()
      if (isMultiple) {
        if (props.value === undefined) {
          setInternalMultiValue([])
        }
        props.onChange?.([] as never)
      }
    }

    const handleSelectAll = (e: React.MouseEvent) => {
      e.stopPropagation()
      if (!isMultiple) return
      const nextValue = allSelected ? [] : selectableOptions
      if (props.value === undefined) {
        setInternalMultiValue(nextValue.map((option) => option.raw))
      }
      props.onChange?.(nextValue.map((option) => option.raw) as never)
    }

    const handleClearSingle = (e: React.MouseEvent) => {
      e.stopPropagation()
      if (!isMultiple) {
        if (props.value === undefined) {
          setInternalSingleValue(null)
        }
        props.onChange?.(null)
        if (props.inputValue === undefined) {
          setInternalSearch('')
        }
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

    React.useEffect(() => {
      if (open) {
        searchInputRef.current?.focus()
      }
    }, [open])

    React.useImperativeHandle(
      ref,
      () => searchInputRef.current as HTMLInputElement,
      []
    )

    const setSearchRef = (node: HTMLInputElement | null) => {
      searchInputRef.current = node
    }

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
            'flex min-h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm text-left',
            'ring-offset-background',
            'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            isMultiple && selectedOptions.length > 0 && 'h-auto',
            className
          )}
        >
          {/* Start adornment */}
          {startAdornment && (
            <Adornment onClick={onStartAdornmentClick} className="mr-1.5">
              {startAdornment}
            </Adornment>
          )}

          {isMultiple ? (
            <div className="flex flex-1 flex-wrap items-center gap-1">
              {selectedOptions.length === 0 ? (
                <span className="text-muted-foreground">{placeholder}</span>
              ) : (
                <>
                  {displayedOptions.map((option) => (
                    <span
                      key={getOptionValue(option)}
                      className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 text-xs font-medium"
                    >
                      {getOptionLabel(option)}
                      <button
                        type="button"
                        onClick={(e) => handleRemoveItem(getOptionValue(option), e)}
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
            <span className={cn('flex-1', !singleValue && 'text-muted-foreground')}>
              {singleValue ? getOptionLabel(singleValue) : placeholder}
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
            {!isMultiple && clearable && singleValue && (
              <button
                type="button"
                onClick={handleClearSingle}
                className="rounded p-0.5 hover:bg-muted"
                aria-label="Clear selection"
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

            {/* End adornment — sits before the chevron */}
            {endAdornment && (
              <Adornment onClick={onEndAdornmentClick}>
                {endAdornment}
              </Adornment>
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
                ref={setSearchRef}
                className="flex h-10 w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
                placeholder={searchPlaceholder}
                value={search}
                onChange={(e) => {
                  if (props.inputValue === undefined) {
                    setInternalSearch(e.target.value)
                  }
                  props.onInputChange?.(e.target.value)
                }}
                onFocus={() => {
                  if (openOnFocus && !disabled) setOpen(true)
                }}
              />
            </div>
            <div className="max-h-[300px] overflow-y-auto p-1">
              {filteredOptions.length === 0 ? (
                <div className="py-6 text-center text-sm text-muted-foreground">
                  {emptyMessage}
                </div>
              ) : (
                <>
                  {isMultiple && selectAll && (
                    <button
                      type="button"
                      onClick={handleSelectAll}
                      className={cn(
                        'relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none',
                        'hover:bg-muted hover:text-foreground',
                        'focus:bg-muted focus:text-foreground',
                        allSelected && 'bg-muted'
                      )}
                    >
                      <span className="absolute left-2 flex h-4 w-4 items-center justify-center">
                        <div
                          className={cn(
                            'flex h-4 w-4 items-center justify-center rounded border border-input',
                            allSelected && 'bg-accent border-accent'
                          )}
                        >
                          {allSelected && (
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
                              className="h-3 w-3"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>
                      </span>
                      {selectAllLabel}
                    </button>
                  )}
                  {filteredOptions.map((option) => {
                    const isSelected = isMultiple
                      ? selectedValueKeys.has(option.value)
                      : option.value === singleValueKey

                    return (
                      <button
                        key={option.value}
                        type="button"
                        disabled={option.disabled}
                        onClick={() =>
                          isMultiple
                            ? handleMultiSelect(option.raw)
                            : handleSingleSelect(option.raw)
                        }
                        className={cn(
                          'relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none',
                          'hover:bg-muted hover:text-foreground',
                          'focus:bg-muted focus:text-foreground',
                          'disabled:pointer-events-none disabled:opacity-50',
                          isSelected && 'bg-muted'
                        )}
                      >
                        <span className="absolute left-2 flex h-4 w-4 items-center justify-center">
                          {isMultiple ? (
                            // Checkbox for multi-select
                            <div
                              className={cn(
                                'flex h-4 w-4 items-center justify-center rounded border border-input',
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
                                  className="h-3 w-3"
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
                  })}
                </>
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
