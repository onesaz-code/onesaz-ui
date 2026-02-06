import * as React from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { cn } from '../../utils/cn'

export interface ComboboxOption {
  value: string
  label: string
  disabled?: boolean
}

export interface ComboboxProps {
  options: ComboboxOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
  disabled?: boolean
  className?: string
}

const Combobox = React.forwardRef<HTMLButtonElement, ComboboxProps>(
  (
    {
      options,
      value: controlledValue,
      defaultValue,
      onValueChange,
      placeholder = 'Select option...',
      searchPlaceholder = 'Search...',
      emptyMessage = 'No results found.',
      disabled = false,
      className,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false)
    const [search, setSearch] = React.useState('')
    const [internalValue, setInternalValue] = React.useState(defaultValue ?? '')

    const value = controlledValue !== undefined ? controlledValue : internalValue

    const filteredOptions = React.useMemo(() => {
      if (!search) return options
      return options.filter((option) =>
        option.label.toLowerCase().includes(search.toLowerCase())
      )
    }, [options, search])

    const selectedOption = options.find((option) => option.value === value)

    const handleSelect = (optionValue: string) => {
      if (controlledValue === undefined) {
        setInternalValue(optionValue)
      }
      onValueChange?.(optionValue)
      setOpen(false)
      setSearch('')
    }

    return (
      <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
        <PopoverPrimitive.Trigger asChild>
          <button
            ref={ref}
            type="button"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            className={cn(
              'flex h-10 w-full items-center justify-between rounded-[var(--radius)] border border-[var(--input)] bg-[var(--background)] px-3 py-2 text-sm',
              'ring-offset-[var(--background)]',
              'placeholder:text-[var(--muted-foreground)]',
              'focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2',
              'disabled:cursor-not-allowed disabled:opacity-50',
              className
            )}
          >
            <span className={cn(!selectedOption && 'text-[var(--muted-foreground)]')}>
              {selectedOption?.label ?? placeholder}
            </span>
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
                'ml-2 h-4 w-4 shrink-0 opacity-50 transition-transform',
                open && 'rotate-180'
              )}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </PopoverPrimitive.Trigger>
        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            className={cn(
              'z-50 w-[var(--radix-popover-trigger-width)] overflow-hidden rounded-[var(--radius)] border border-[var(--border)] bg-[var(--popover)] text-[var(--popover-foreground)] shadow-md',
              'data-[state=open]:animate-in data-[state=closed]:animate-out',
              'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
              'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
              'data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2'
            )}
            sideOffset={4}
          >
            <div className="flex items-center border-b border-[var(--border)] px-3">
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
                className="flex h-10 w-full bg-transparent py-3 text-sm outline-none placeholder:text-[var(--muted-foreground)]"
                placeholder={searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="max-h-[300px] overflow-y-auto p-1">
              {filteredOptions.length === 0 ? (
                <div className="py-6 text-center text-sm text-[var(--muted-foreground)]">
                  {emptyMessage}
                </div>
              ) : (
                filteredOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    disabled={option.disabled}
                    onClick={() => handleSelect(option.value)}
                    className={cn(
                      'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none',
                      'hover:bg-[var(--muted)] hover:text-[var(--foreground)]',
                      'focus:bg-[var(--muted)] focus:text-[var(--foreground)]',
                      'disabled:pointer-events-none disabled:opacity-50',
                      option.value === value && 'bg-[var(--muted)]'
                    )}
                  >
                    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                      {option.value === value && (
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
                      )}
                    </span>
                    {option.label}
                  </button>
                ))
              )}
            </div>
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
    )
  }
)
Combobox.displayName = 'Combobox'

export { Combobox }
