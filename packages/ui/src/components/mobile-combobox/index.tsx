import * as React from "react"
import { Combobox, type ComboboxProps } from "../combobox"
import { Drawer, DrawerContent, type DrawerPortalTarget } from "../drawer"
import { cn } from "../../utils/cn"
import { Button } from "../button"

export interface MobileComboboxOption {
  value: string
  label: string
  disabled?: boolean
  image?: string
  color?: string
}

type ComboboxPrimitiveOption = string
type ComboboxObjectOption = object
export type MobileComboboxOptionInput = ComboboxPrimitiveOption | ComboboxObjectOption

type NormalizedOption<T> = {
  value: string
  label: string
  disabled?: boolean
  imageSrc?: string
  color?: string
  raw: T
}

type MobileComboboxViewType = "drawer" | "dropdown"

type BaseProps<T extends MobileComboboxOptionInput> = {
  options: T[]
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
  disabled?: boolean
  className?: string
  inputClassName?: string

  labelKey?: string
  valueKey?: string
  imageKey?: string
  colorKey?: string

  /** Bottom sheet header title (drawer mode only) */
  sheetTitle?: string
  /**
   * `drawer` — bottom sheet via `Drawer variant="sheet"` (default, mobile pickers).
   * `dropdown` — delegates to desktop `Combobox` popover (unchanged combobox source).
   */
  viewType?: MobileComboboxViewType
  /** Where the sheet portals — `auto` nests inside parent dialog when present */
  portalTarget?: DrawerPortalTarget

  required?: boolean
  clearable?: boolean
}

export type MobileComboboxSingleProps<
  T extends MobileComboboxOptionInput = MobileComboboxOptionInput,
> = BaseProps<T> & {
  value?: T | null
  defaultValue?: T | null
  onChange?: (value: T | null) => void
  multiple?: false
}

export type MobileComboboxMultipleProps<
  T extends MobileComboboxOptionInput = MobileComboboxOptionInput,
> = BaseProps<T> & {
  value?: T[]
  defaultValue?: T[]
  onChange?: (value: T[]) => void
  multiple: true
  selectAll?: boolean
  selectAllLabel?: string
  maxDisplayItems?: number
  onDone?: (value: T[]) => void
}

export type MobileComboboxProps<T extends MobileComboboxOptionInput = MobileComboboxOptionInput> =
  | MobileComboboxSingleProps<T>
  | MobileComboboxMultipleProps<T>

function isMultipleProps<T extends MobileComboboxOptionInput>(
  props: MobileComboboxProps<T>,
): props is MobileComboboxMultipleProps<T> {
  return props.multiple === true
}

function ChevronIcon() {
  return (
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
      className="h-4 w-4 shrink-0 opacity-50 transition-transform"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className ?? "h-4 w-4"}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function CloseIcon() {
  return (
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
      className="h-4 w-4"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}

function toComboboxProps<T extends MobileComboboxOptionInput>(
  props: MobileComboboxProps<T>,
): ComboboxProps {
  const {
    sheetTitle: _sheetTitle,
    viewType: _viewType,
    portalTarget: _portalTarget,
    inputClassName: _inputClassName,
    ...comboboxProps
  } = props
  return comboboxProps as ComboboxProps
}

export function MobileCombobox<
  T extends MobileComboboxOptionInput = MobileComboboxOptionInput,
>(props: MobileComboboxProps<T>) {
  const {
    options,
    placeholder = "Select option...",
    searchPlaceholder = "Search...",
    emptyMessage = "No results found.",
    disabled = false,
    className,
    inputClassName,
    sheetTitle,
    viewType = "drawer",
    portalTarget = "auto",
    labelKey,
    valueKey,
    imageKey,
    colorKey,
    clearable = true,
  } = props

  if (viewType === "dropdown") {
    return <Combobox {...toComboboxProps(props)} />
  }

  const labelK = labelKey ?? "label"
  const valueK = valueKey ?? "value"

  const getOptionLabel = React.useCallback(
    (option: T) => {
      if (typeof option === "string") return option
      const record = option as Record<string, unknown>
      const maybeLabel = record[labelK]
      return typeof maybeLabel === "string" ? maybeLabel : String(maybeLabel ?? "")
    },
    [labelK],
  )

  const getOptionValue = React.useCallback(
    (option: T) => {
      if (typeof option === "string") return option
      const record = option as Record<string, unknown>
      const maybeValue = record[valueK]
      if (maybeValue !== undefined && maybeValue !== null) return String(maybeValue)
      return getOptionLabel(option)
    },
    [valueK, getOptionLabel],
  )

  const getOptionImage = React.useCallback(
    (option: T): string | undefined => {
      if (!imageKey || typeof option === "string") return undefined
      const record = option as Record<string, unknown>
      const raw = record[imageKey]
      return typeof raw === "string" && raw.trim() ? raw : undefined
    },
    [imageKey],
  )

  const getOptionColor = React.useCallback(
    (option: T): string | undefined => {
      if (!colorKey || typeof option === "string") return undefined
      const record = option as Record<string, unknown>
      const raw = record[colorKey]
      return typeof raw === "string" && raw.trim() ? raw : undefined
    },
    [colorKey],
  )

  const normalizedOptions = React.useMemo<NormalizedOption<T>[]>(
    () =>
      (options ?? []).map((option) => ({
        raw: option,
        label: getOptionLabel(option),
        value: getOptionValue(option),
        disabled: Boolean((option as { disabled?: boolean }).disabled),
        imageSrc: getOptionImage(option),
        color: getOptionColor(option),
      })),
    [options, getOptionLabel, getOptionValue, getOptionImage, getOptionColor],
  )

  const isMultiple = isMultipleProps(props)

  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const searchRef = React.useRef<HTMLInputElement | null>(null)

  // Internal state for uncontrolled usage
  const [internalSingle, setInternalSingle] = React.useState<T | null>(
    !isMultiple ? (props.defaultValue ?? null) : null,
  )
  const [internalMulti, setInternalMulti] = React.useState<T[]>(
    isMultiple ? (props.defaultValue ?? []) : [],
  )

  const selectedSingle = !isMultiple
    ? props.value !== undefined
      ? (props.value as T | null)
      : internalSingle
    : null

  const selectedMulti = isMultiple
    ? props.value !== undefined
      ? (props.value as T[])
      : internalMulti
    : []

  const selectedValueKeys = React.useMemo(() => {
    if (!isMultiple) return new Set<string>()
    return new Set(selectedMulti.map((v) => getOptionValue(v)))
  }, [isMultiple, selectedMulti, getOptionValue])

  const filteredOptions = React.useMemo(() => {
    if (!search) return normalizedOptions
    const q = search.toLowerCase()
    return normalizedOptions.filter((o) => o.label.toLowerCase().includes(q))
  }, [normalizedOptions, search])

  React.useEffect(() => {
    if (!open) return
    const t = window.setTimeout(() => searchRef.current?.focus(), 0)
    return () => window.clearTimeout(t)
  }, [open])

  React.useEffect(() => {
    if (!open) setSearch("")
  }, [open])

  const drawerTitle =
    sheetTitle ??
    (placeholder.replace(/^Select\s+/i, "").trim() || placeholder || "Select")

  const maxDisplayItems = isMultiple ? (props.maxDisplayItems ?? 3) : 0
  const displayedSelected = isMultiple ? selectedMulti.slice(0, maxDisplayItems) : []
  const remainingCount = isMultiple ? selectedMulti.length - displayedSelected.length : 0

  const handleSinglePick = (raw: T) => {
    if (disabled) return
    if (!isMultiple) {
      if (props.value === undefined) setInternalSingle(raw)
      ;(props as MobileComboboxSingleProps<T>).onChange?.(raw)
      setOpen(false)
    }
  }

  const handleMultiToggle = (raw: T) => {
    if (!isMultiple || disabled) return
    const optionKey = getOptionValue(raw)
    const exists = selectedMulti.some((v) => getOptionValue(v) === optionKey)
    const next = exists ? selectedMulti.filter((v) => getOptionValue(v) !== optionKey) : [...selectedMulti, raw]

    if (props.value === undefined) setInternalMulti(next)
    ;(props as MobileComboboxMultipleProps<T>).onChange?.(next)
  }

  const selectAll = isMultiple ? (props.selectAll ?? false) : false
  const selectAllLabel = isMultiple ? (props.selectAllLabel ?? "Select all") : ""

  const selectableOptions = React.useMemo(() => normalizedOptions.filter((o) => !o.disabled), [normalizedOptions])
  const allSelected =
    isMultiple &&
    selectableOptions.length > 0 &&
    selectableOptions.every((o) => selectedValueKeys.has(o.value))

  const [doneError, setDoneError] = React.useState<string | null>(null)
  React.useEffect(() => {
    if (!open || !isMultiple) return
    if (doneError && selectedMulti.length > 0) setDoneError(null)
  }, [open, isMultiple, doneError, selectedMulti.length])

  const triggerDisplay = (() => {
    if (isMultiple) {
      if (!selectedMulti.length) return <span className="text-muted-foreground">{placeholder}</span>
      return (
        <>
          <span className="min-w-0 flex-1 truncate">
            {displayedSelected.map((v) => getOptionLabel(v)).join(", ")}
          </span>
          {remainingCount > 0 ? (
            <span className="shrink-0 text-xs text-muted-foreground">+{remainingCount} more</span>
          ) : null}
        </>
      )
    }
    if (!selectedSingle) return <span className="text-muted-foreground">{placeholder}</span>
    return <span className="min-w-0 flex-1 truncate">{getOptionLabel(selectedSingle)}</span>
  })()

  return (
    <>
      {/* Trigger */}
      <div className="relative w-full">
        <button
          type="button"
          disabled={disabled}
          aria-expanded={open}
          onClick={() => !disabled && setOpen((v) => !v)}
          onKeyDown={(e) => {
            if (disabled) return
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault()
              setOpen((v) => !v)
            }
            if (e.key === "Escape") setOpen(false)
          }}
          className={cn(
            "flex min-h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-left",
            "ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            isMultiple && selectedMulti.length > 0 ? "h-auto items-start justify-between" : "items-center justify-between",
            className,
          )}
        >
          <div className={cn("flex min-w-0 flex-1 items-center gap-2", inputClassName)}>
            {triggerDisplay}
          </div>
          <div className="flex items-center gap-1 shrink-0">
            {clearable && !isMultiple && selectedSingle ? (
              <button
                type="button"
                className="rounded p-0.5 hover:bg-muted"
                onClick={(e) => {
                  e.stopPropagation()
                  if (disabled) return
                  if (props.value === undefined) setInternalSingle(null)
                  ;(props as MobileComboboxSingleProps<T>).onChange?.(null)
                }}
                aria-label="Clear selection"
              >
                <CloseIcon />
              </button>
            ) : null}
            <span className={cn("transition-transform", open && "rotate-180")}>
              <ChevronIcon />
            </span>
          </div>
        </button>
      </div>

      {/* Mobile sheet */}
      <Drawer variant="sheet" open={open} onOpenChange={setOpen}>
        <DrawerContent
          variant="sheet"
          side="bottom"
          portalTarget={portalTarget}
          title={drawerTitle}
          showGrabber
          showClose
          headerExtra={
            <div className="pb-3">
              <div className="flex items-center rounded-2xl border border-border/80 bg-muted/50 px-3">
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
                  ref={searchRef}
                  className="flex h-11 w-full bg-transparent py-2.5 text-base outline-none placeholder:text-muted-foreground"
                  placeholder={searchPlaceholder}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              {isMultiple && selectAll && filteredOptions.length > 0 ? (
                <div className="flex items-center justify-between pb-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      const next = allSelected ? [] : selectableOptions.map((o) => o.raw)
                      if (props.value === undefined) setInternalMulti(next)
                      ;(props as MobileComboboxMultipleProps<T>).onChange?.(next)
                    }}
                    className="h-auto border-0 bg-transparent p-0 text-[13px] font-bold text-accent"
                  >
                    {allSelected ? "Clear all" : selectAllLabel}
                  </button>
                </div>
              ) : null}
            </div>
          }
          footer={
            isMultiple ? (
              <>
                {doneError ? (
                  <p
                    role="alert"
                    className="mb-2 text-center text-[13px] font-medium text-destructive"
                    style={{ color: "var(--destructive, #ef4444)" }}
                  >
                    {doneError}
                  </p>
                ) : null}
                <Button
                  type="button"
                  variant="secondary"
                  color="accent"
                  onClick={() => {
                    if (!selectedMulti.length) {
                      setDoneError("Have to select at least one")
                      return
                    }
                    setDoneError(null)
                    setOpen(false)
                    ;(props as MobileComboboxMultipleProps<T>).onDone?.(selectedMulti)
                  }}
                  className="h-12 w-full rounded-xl text-[15px] font-bold"
                  style={{
                    display: "inline-flex",
                    width: "100%",
                    height: 48,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 12,
                    border: "none",
                    backgroundColor:
                      "color-mix(in srgb, var(--accent, #6933d3) 18%, white)",
                    color: "var(--accent, #6933d3)",
                    fontSize: 15,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Done
                </Button>
              </>
            ) : undefined
          }
        >
          {filteredOptions.length === 0 ? (
            <div className="py-10 text-center text-[13.5px] text-muted-foreground">
              {emptyMessage}
            </div>
          ) : (
            <div className="flex flex-col pb-4 px-2">
              {filteredOptions.map((option) => {
                const isSelected = isMultiple
                  ? selectedValueKeys.has(option.value)
                  : option.value === (selectedSingle ? getOptionValue(selectedSingle) : null)

                return (
                  <button
                    key={option.value}
                    type="button"
                    disabled={option.disabled}
                    onClick={() => {
                      if (isMultiple) handleMultiToggle(option.raw)
                      else handleSinglePick(option.raw)
                    }}
                    className={cn(
                      "flex w-full items-center gap-3 border-0 border-b border-border/60 bg-transparent px-4 py-3.5 text-left transition-colors last:border-b-0",
                      "active:bg-muted/60 disabled:pointer-events-none disabled:opacity-50",
                      isSelected && "bg-accent/10",
                    )}
                  >
                    {isMultiple ? (
                      <span
                        className={cn(
                          "flex h-5 w-5 shrink-0 items-center justify-center rounded border border-input",
                          isSelected && "border-accent bg-accent",
                        )}
                      >
                        {isSelected ? (
                          <CheckIcon className="h-3 w-3 text-white" />
                        ) : null}
                      </span>
                    ) : null}

                    {option.imageSrc ? (
                      <img
                        src={option.imageSrc}
                        alt=""
                        className="h-7 w-7 shrink-0 rounded-md object-cover"
                      />
                    ) : null}

                    {option.color ? (
                      <span
                        className="h-2 w-2 shrink-0 rounded-full"
                        style={{ backgroundColor: option.color }}
                        aria-hidden="true"
                      />
                    ) : null}

                    <span
                      className={cn(
                        "min-w-0 flex-1 break-all text-[15px] leading-snug",
                        !isMultiple
                          ? isSelected
                            ? "font-semibold text-accent"
                            : "font-medium text-foreground"
                          : isSelected
                            ? "font-semibold text-accent"
                            : "font-medium text-foreground",
                      )}
                    >
                      {option.label}
                    </span>

                    {!isMultiple && isSelected ? (
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                        <CheckIcon className="h-4 w-4" />
                      </span>
                    ) : null}
                  </button>
                )
              })}
            </div>
          )}
        </DrawerContent>
      </Drawer>
    </>
  )
}

