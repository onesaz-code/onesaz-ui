import * as React from 'react'
import dayjs, { type Dayjs } from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { cn } from '../../utils/cn'
import { Label } from '../label'

dayjs.extend(customParseFormat)

// ============================================================================
// Types
// ============================================================================

type PickerVariant = 'desktop' | 'mobile' | 'auto'

interface PickerSharedProps {
  disabled?: boolean
  readOnly?: boolean
  label?: string
  required?: boolean
  className?: string
  /** Hide the text input — show only a button trigger */
  disableInput?: boolean
  /** Disable the calendar/popover — text input only */
  disableCalendar?: boolean
  variant?: PickerVariant
}

export interface DatePickerProps extends PickerSharedProps {
  value?: Date | null
  defaultValue?: Date | null
  onChange?: (date: Date | null) => void
  /** dayjs format string, default: MM/DD/YYYY */
  format?: string
  placeholder?: string
  minDate?: Date
  maxDate?: Date
}

export interface MonthPickerProps extends PickerSharedProps {
  value?: Date | null
  defaultValue?: Date | null
  onChange?: (date: Date | null) => void
  /** dayjs format string, default: MM/YYYY */
  format?: string
  placeholder?: string
  minDate?: Date
  maxDate?: Date
}

export interface YearPickerProps extends PickerSharedProps {
  value?: number | null
  defaultValue?: number | null
  onChange?: (year: number | null) => void
  placeholder?: string
  minYear?: number
  maxYear?: number
}

export interface TimePickerProps extends PickerSharedProps {
  /** 'HH:mm' | 'HH:mm:ss' | 'hh:mm A' | 'hh:mm:ss A' */
  value?: string | null
  defaultValue?: string | null
  onChange?: (time: string | null) => void
  is12Hour?: boolean
  showSeconds?: boolean
  placeholder?: string
}

export interface DateTimePickerProps extends PickerSharedProps {
  value?: Date | null
  defaultValue?: Date | null
  onChange?: (date: Date | null) => void
  /** dayjs format string, default: MM/DD/YYYY hh:mm A */
  format?: string
  placeholder?: string
  is12Hour?: boolean
  showSeconds?: boolean
  minDate?: Date
  maxDate?: Date
}

export interface DateRangePreset {
  label: string
  /** Return the [start, end] Date tuple for this preset */
  getValue: () => [Date, Date]
}

export interface DateRangePickerProps extends PickerSharedProps {
  value?: [Date | null, Date | null]
  defaultValue?: [Date | null, Date | null]
  onChange?: (range: [Date | null, Date | null]) => void
  /** dayjs format string, default: MM/DD/YYYY */
  format?: string
  startPlaceholder?: string
  endPlaceholder?: string
  minDate?: Date
  maxDate?: Date
  /**
   * Preset range options shown alongside the calendars.
   * Pass `DEFAULT_DATE_RANGE_PRESETS` to use built-ins, or supply your own array.
   * Pass `[]` to disable presets entirely.
   */
  presets?: DateRangePreset[]
}

// ============================================================================
// Constants
// ============================================================================

const DAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const MONTHS_FULL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

/** Built-in presets. Pass to `presets` prop or extend with your own. */
export const DEFAULT_DATE_RANGE_PRESETS: DateRangePreset[] = [
  {
    label: 'Today',
    getValue: () => {
      const s = dayjs().startOf('day').toDate()
      const e = dayjs().endOf('day').toDate()
      return [s, e]
    },
  },
  {
    label: 'Yesterday',
    getValue: () => {
      const s = dayjs().subtract(1, 'day').startOf('day').toDate()
      const e = dayjs().subtract(1, 'day').endOf('day').toDate()
      return [s, e]
    },
  },
  {
    label: 'This Week',
    getValue: () => [dayjs().startOf('week').toDate(), dayjs().endOf('week').toDate()],
  },
  {
    label: 'Last Week',
    getValue: () => [
      dayjs().subtract(1, 'week').startOf('week').toDate(),
      dayjs().subtract(1, 'week').endOf('week').toDate(),
    ],
  },
  {
    label: 'This Month',
    getValue: () => [dayjs().startOf('month').toDate(), dayjs().endOf('month').toDate()],
  },
  {
    label: 'Last Month',
    getValue: () => [
      dayjs().subtract(1, 'month').startOf('month').toDate(),
      dayjs().subtract(1, 'month').endOf('month').toDate(),
    ],
  },
  {
    label: 'Last 3 Months',
    getValue: () => [dayjs().subtract(3, 'month').startOf('day').toDate(), dayjs().endOf('day').toDate()],
  },
  {
    label: 'Last 6 Months',
    getValue: () => [dayjs().subtract(6, 'month').startOf('day').toDate(), dayjs().endOf('day').toDate()],
  },
  {
    label: 'This Year',
    getValue: () => [dayjs().startOf('year').toDate(), dayjs().endOf('year').toDate()],
  },
]

// ============================================================================
// useVariant hook
// ============================================================================

function useVariant(variant: PickerVariant = 'auto'): 'desktop' | 'mobile' {
  const [isMobile, setIsMobile] = React.useState(false)
  React.useEffect(() => {
    if (variant !== 'auto') return
    const mq = window.matchMedia('(pointer: coarse)')
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [variant])
  if (variant === 'desktop') return 'desktop'
  if (variant === 'mobile') return 'mobile'
  return isMobile ? 'mobile' : 'desktop'
}

// ============================================================================
// SVG Icons
// ============================================================================

const ChevronLeft = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m15 18-6-6 6-6" />
  </svg>
)
const ChevronRight = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m9 18 6-6-6-6" />
  </svg>
)
const ChevronUp = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m18 15-6-6-6 6" />
  </svg>
)
const ChevronDown = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m6 9 6 6 6-6" />
  </svg>
)
const CalendarIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </svg>
)
const ClockIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)
const XIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
)

// ============================================================================
// PickerWrapper — label, required asterisk, hidden native input for forms
// ============================================================================

function PickerWrapper({
  label,
  required,
  id,
  hasValue,
  children,
}: {
  label?: string
  required?: boolean
  id: string
  hasValue: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      {label && (
        <Label htmlFor={id} className="mb-1.5 block">
          {label}
          {required && <span className="ml-0.5 text-red-500" aria-hidden="true">*</span>}
        </Label>
      )}
      <input
        type="text"
        aria-hidden="true"
        tabIndex={-1}
        required={required}
        value={hasValue ? 'filled' : ''}
        onChange={() => {}}
        className="absolute h-px w-px opacity-0 pointer-events-none"
      />
      {children}
    </div>
  )
}

// ============================================================================
// PickerInput — text field with optional icon + clear button
// ============================================================================

interface PickerInputProps {
  id?: string
  value: string
  onChange: (v: string) => void
  onCommit: (v: string) => void
  placeholder?: string
  disabled?: boolean
  readOnly?: boolean
  icon?: React.ReactNode
  onClear?: () => void
  onIconClick?: () => void
  className?: string
}

const PickerInput = React.forwardRef<HTMLInputElement, PickerInputProps>(
  ({ id, value, onChange, onCommit, placeholder, disabled, readOnly, icon, onClear, onIconClick, className }, ref) => (
    <div className={cn('relative flex items-center', className)}>
      <input
        ref={ref}
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={(e) => onCommit(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') onCommit(value) }}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm',
          'placeholder:text-muted-foreground',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          (onClear || icon) && 'pr-16',
        )}
      />
      <div className="absolute right-2 flex items-center gap-1">
        {onClear && value && (
          <button type="button" onClick={onClear} disabled={disabled} className="text-muted-foreground hover:text-foreground">
            <XIcon />
          </button>
        )}
        {icon && (
          <button type="button" onClick={onIconClick} disabled={disabled} className="text-muted-foreground hover:text-foreground">
            {icon}
          </button>
        )}
      </div>
    </div>
  )
)
PickerInput.displayName = 'PickerInput'

// ============================================================================
// TriggerButton — used when disableInput=true
// ============================================================================

function TriggerButton({
  value,
  placeholder,
  disabled,
  onClick,
  icon,
  onClear,
  className,
}: {
  value: string
  placeholder?: string
  disabled?: boolean
  onClick?: () => void
  icon?: React.ReactNode
  onClear?: () => void
  className?: string
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm text-left',
        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        !value && 'text-muted-foreground',
        className,
      )}
    >
      <span className="flex-1 truncate">{value || placeholder}</span>
      <div className="flex items-center gap-1 shrink-0">
        {onClear && value && (
          <span
            role="button"
            tabIndex={0}
            onClick={(e) => { e.stopPropagation(); onClear() }}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.stopPropagation(); onClear() } }}
            className="text-muted-foreground hover:text-foreground"
          >
            <XIcon />
          </span>
        )}
        {icon}
      </div>
    </button>
  )
}

// ============================================================================
// PickerPopover — desktop dropdown
// ============================================================================

function PickerPopover({
  open,
  onClose,
  triggerRef,
  children,
  className,
}: {
  open: boolean
  onClose: () => void
  triggerRef: React.RefObject<HTMLElement | null>
  children: React.ReactNode
  className?: string
}) {
  const popoverRef = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (
        popoverRef.current && !popoverRef.current.contains(e.target as Node) &&
        triggerRef.current && !triggerRef.current.contains(e.target as Node)
      ) onClose()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open, onClose, triggerRef])

  if (!open) return null
  return (
    <div
      ref={popoverRef}
      className={cn('absolute left-0 top-full mt-1 z-50 rounded-md border border-border bg-popover shadow-md', className)}
    >
      {children}
    </div>
  )
}

// ============================================================================
// PickerModal — mobile bottom sheet
// ============================================================================

function PickerModal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
}) {
  React.useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-t-2xl border border-border bg-popover shadow-xl">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <button type="button" onClick={onClose} className="text-sm text-muted-foreground hover:text-foreground">
            Cancel
          </button>
          {title && <span className="text-sm font-medium">{title}</span>}
          <button type="button" onClick={onClose} className="text-sm font-semibold text-primary-500 hover:text-primary-600">
            Done
          </button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto px-2 py-3">
          {children}
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// CalendarGrid — month view
// ============================================================================

interface CalendarGridProps {
  viewDate: Dayjs
  selectedDate?: Dayjs | null
  onDateSelect: (date: Dayjs) => void
  onViewChange: (date: Dayjs) => void
  minDate?: Dayjs
  maxDate?: Dayjs
  rangeStart?: Dayjs | null
  rangeEnd?: Dayjs | null
  hoveredDate?: Dayjs | null
  onDateHover?: (date: Dayjs | null) => void
  showNavigation?: boolean
}

function CalendarGrid({
  viewDate,
  selectedDate,
  onDateSelect,
  onViewChange,
  minDate,
  maxDate,
  rangeStart,
  rangeEnd,
  hoveredDate,
  onDateHover,
  showNavigation = true,
}: CalendarGridProps) {
  const startOfMonth = viewDate.startOf('month')
  const startDayOfWeek = startOfMonth.day()
  const daysInMonth = viewDate.daysInMonth()

  const cells: Array<{ date: Dayjs; currentMonth: boolean }> = []
  for (let i = startDayOfWeek - 1; i >= 0; i--)
    cells.push({ date: startOfMonth.subtract(i + 1, 'day'), currentMonth: false })
  for (let i = 1; i <= daysInMonth; i++)
    cells.push({ date: viewDate.date(i), currentMonth: true })
  const remaining = 42 - cells.length
  for (let i = 1; i <= remaining; i++)
    cells.push({ date: viewDate.endOf('month').add(i, 'day'), currentMonth: false })

  const isDisabled = (d: Dayjs) =>
    (!!minDate && d.isBefore(minDate, 'day')) || (!!maxDate && d.isAfter(maxDate, 'day'))

  const isSelected = (d: Dayjs) => {
    if (selectedDate) return d.isSame(selectedDate, 'day')
    if (rangeStart && !rangeEnd) return d.isSame(rangeStart, 'day')
    if (rangeStart && rangeEnd) return d.isSame(rangeStart, 'day') || d.isSame(rangeEnd, 'day')
    return false
  }

  const isInRange = (d: Dayjs) => {
    const end = rangeEnd ?? hoveredDate
    if (!rangeStart || !end) return false
    const [a, b] = rangeStart.isBefore(end) ? [rangeStart, end] : [end, rangeStart]
    return d.isAfter(a, 'day') && d.isBefore(b, 'day')
  }

  const isRangeEdge = (d: Dayjs) => {
    if (!rangeStart) return false
    const end = rangeEnd ?? hoveredDate
    if (!end) return false
    return d.isSame(rangeStart, 'day') || d.isSame(end, 'day')
  }

  return (
    <div className="p-3 select-none w-full min-w-[260px]">
      {showNavigation && (
        <div className="flex items-center justify-between mb-3">
          <button
            type="button"
            onClick={() => onViewChange(viewDate.subtract(1, 'month'))}
            className="flex h-7 w-7 items-center justify-center rounded hover:bg-muted"
          >
            <ChevronLeft />
          </button>
          <span className="text-sm font-medium">
            {MONTHS_FULL[viewDate.month()]} {viewDate.year()}
          </span>
          <button
            type="button"
            onClick={() => onViewChange(viewDate.add(1, 'month'))}
            className="flex h-7 w-7 items-center justify-center rounded hover:bg-muted"
          >
            <ChevronRight />
          </button>
        </div>
      )}
      <div className="grid grid-cols-7 mb-1">
        {DAY_LABELS.map((d) => (
          <div key={d} className="text-center text-xs font-medium text-muted-foreground py-1">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {cells.map(({ date, currentMonth }, idx) => {
          const disabled = isDisabled(date)
          const selected = isSelected(date)
          const inRange = isInRange(date)
          const rangeEdge = isRangeEdge(date)
          const isToday = date.isSame(dayjs(), 'day')
          return (
            <button
              key={idx}
              type="button"
              disabled={disabled}
              onClick={() => onDateSelect(date)}
              onMouseEnter={() => onDateHover?.(date)}
              onMouseLeave={() => onDateHover?.(null)}
              className={cn(
                'relative flex aspect-square w-full items-center justify-center text-xs transition-colors',
                'disabled:pointer-events-none disabled:opacity-30',
                !currentMonth && 'text-muted-foreground opacity-40',
                isToday && !selected && !rangeEdge && 'font-semibold text-primary-500',
                inRange && 'bg-primary-100 dark:bg-primary-900/30',
                (selected || rangeEdge) && 'bg-primary-500 text-white rounded-full',
                !selected && !rangeEdge && !inRange && 'hover:bg-muted rounded-full',
              )}
            >
              {date.date()}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ============================================================================
// MonthGrid — 12-month grid
// ============================================================================

function MonthGrid({
  viewYear,
  selectedDate,
  onMonthSelect,
  onYearChange,
  minDate,
  maxDate,
}: {
  viewYear: number
  selectedDate?: Dayjs | null
  onMonthSelect: (date: Dayjs) => void
  onYearChange: (year: number) => void
  minDate?: Dayjs
  maxDate?: Dayjs
}) {
  return (
    <div className="p-3 select-none w-[240px]">
      <div className="flex items-center justify-between mb-3">
        <button type="button" onClick={() => onYearChange(viewYear - 1)} className="flex h-7 w-7 items-center justify-center rounded hover:bg-muted">
          <ChevronLeft />
        </button>
        <span className="text-sm font-medium">{viewYear}</span>
        <button type="button" onClick={() => onYearChange(viewYear + 1)} className="flex h-7 w-7 items-center justify-center rounded hover:bg-muted">
          <ChevronRight />
        </button>
      </div>
      <div className="grid grid-cols-3 gap-1">
        {MONTHS_SHORT.map((month, idx) => {
          const date = dayjs().year(viewYear).month(idx).startOf('month')
          const selected = selectedDate
            ? selectedDate.year() === viewYear && selectedDate.month() === idx
            : false
          const disabled =
            (!!minDate && date.isBefore(minDate, 'month')) ||
            (!!maxDate && date.isAfter(maxDate, 'month'))
          return (
            <button
              key={month}
              type="button"
              disabled={disabled}
              onClick={() => onMonthSelect(date)}
              className={cn(
                'py-2 text-sm rounded-md hover:bg-muted transition-colors',
                'disabled:pointer-events-none disabled:opacity-30',
                selected && 'bg-primary-500 text-white hover:bg-primary-600',
              )}
            >
              {month}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ============================================================================
// YearGrid — scrollable year list
// ============================================================================

function YearGrid({
  selectedYear,
  onYearSelect,
  minYear = 1900,
  maxYear = 2100,
}: {
  selectedYear?: number | null
  onYearSelect: (year: number) => void
  minYear?: number
  maxYear?: number
}) {
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const years = React.useMemo(
    () => Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i),
    [minYear, maxYear]
  )
  React.useEffect(() => {
    if (!scrollRef.current || !selectedYear) return
    const idx = years.indexOf(selectedYear)
    if (idx >= 0) scrollRef.current.scrollTop = Math.max(0, idx - 3) * 36
  }, [])

  return (
    <div ref={scrollRef} className="max-h-64 overflow-y-auto p-1 w-[120px]">
      {years.map((year) => (
        <button
          key={year}
          type="button"
          onClick={() => onYearSelect(year)}
          className={cn(
            'w-full text-sm text-center py-2 rounded-md hover:bg-muted transition-colors',
            selectedYear === year && 'bg-primary-500 text-white hover:bg-primary-600',
          )}
        >
          {year}
        </button>
      ))}
    </div>
  )
}

// ============================================================================
// TimeWheelColumn — individual scroll drum column
// ============================================================================

const WHEEL_ITEM_H = 40
const WHEEL_VISIBLE = 5
const WHEEL_PADDING = 2

function TimeWheelColumn({
  items,
  selectedIndex,
  onSelect,
  label,
}: {
  items: string[]
  selectedIndex: number
  onSelect: (idx: number) => void
  label?: string
}) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const isScrollingRef = React.useRef(false)
  const scrollTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  // Sync external changes → scroll position (only when not user-scrolling)
  React.useEffect(() => {
    if (isScrollingRef.current) return
    containerRef.current?.scrollTo({ top: selectedIndex * WHEEL_ITEM_H })
  }, [selectedIndex])

  const handleScroll = React.useCallback(() => {
    isScrollingRef.current = true
    if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current)
    scrollTimerRef.current = setTimeout(() => {
      if (!containerRef.current) return
      const idx = Math.round(containerRef.current.scrollTop / WHEEL_ITEM_H)
      const clamped = Math.max(0, Math.min(idx, items.length - 1))
      containerRef.current.scrollTo({ top: clamped * WHEEL_ITEM_H, behavior: 'smooth' })
      isScrollingRef.current = false
      onSelect(clamped)
    }, 120)
  }, [items.length, onSelect])

  return (
    <div className="flex flex-col items-center gap-1">
      {label && <span className="text-xs text-muted-foreground font-medium">{label}</span>}
      <div
        style={{ height: WHEEL_VISIBLE * WHEEL_ITEM_H, width: 60, position: 'relative', overflow: 'hidden' }}
      >
        {/* Top fade */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 bg-gradient-to-b from-popover to-transparent" style={{ height: WHEEL_PADDING * WHEEL_ITEM_H }} />
        {/* Selection highlight */}
        <div className="pointer-events-none absolute inset-x-0 border-y border-border bg-muted/40" style={{ top: WHEEL_PADDING * WHEEL_ITEM_H, height: WHEEL_ITEM_H }} />
        {/* Bottom fade */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-popover to-transparent" style={{ height: WHEEL_PADDING * WHEEL_ITEM_H }} />
        <div
          ref={containerRef}
          onScroll={handleScroll}
          style={{
            height: '100%',
            overflowY: 'scroll',
            scrollSnapType: 'y mandatory',
            scrollbarWidth: 'none',
          }}
        >
          {Array.from({ length: WHEEL_PADDING }).map((_, i) => (
            <div key={`pt${i}`} style={{ height: WHEEL_ITEM_H, flexShrink: 0 }} />
          ))}
          {items.map((item, idx) => (
            <div
              key={item}
              onClick={() => {
                onSelect(idx)
                containerRef.current?.scrollTo({ top: idx * WHEEL_ITEM_H, behavior: 'smooth' })
              }}
              className={cn(
                'flex items-center justify-center text-sm cursor-pointer transition-colors select-none',
                idx === selectedIndex ? 'font-semibold text-foreground' : 'text-muted-foreground',
              )}
              style={{ height: WHEEL_ITEM_H, scrollSnapAlign: 'center' }}
            >
              {item}
            </div>
          ))}
          {Array.from({ length: WHEEL_PADDING }).map((_, i) => (
            <div key={`pb${i}`} style={{ height: WHEEL_ITEM_H, flexShrink: 0 }} />
          ))}
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// TimeWheel — full mobile time wheel (hours + minutes + optional seconds + period)
// ============================================================================

interface TimeState {
  hour: number
  minute: number
  second: number
  period: 'AM' | 'PM'
}

function TimeWheel({
  timeState,
  onChange,
  showSeconds,
  is12Hour,
}: {
  timeState: TimeState
  onChange: (t: TimeState) => void
  showSeconds?: boolean
  is12Hour?: boolean
}) {
  const hours = is12Hour
    ? Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'))
    : Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'))
  const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'))
  const seconds = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'))
  const periods = ['AM', 'PM']

  const displayHour = is12Hour ? (timeState.hour % 12 || 12) : timeState.hour
  const hourIdx = is12Hour ? displayHour - 1 : timeState.hour

  return (
    <div className="flex items-center justify-center gap-1">
      <TimeWheelColumn
        items={hours}
        selectedIndex={hourIdx}
        onSelect={(idx) => {
          const raw = is12Hour ? idx + 1 : idx
          const newHour = is12Hour
            ? (raw % 12) + (timeState.period === 'PM' ? 12 : 0)
            : raw
          onChange({ ...timeState, hour: newHour })
        }}
        label="HH"
      />
      <div className="flex flex-col items-center gap-0.5">
        <span className="text-xs opacity-0 select-none">·</span>
        <span className="text-lg font-semibold text-muted-foreground leading-none">:</span>
      </div>
      <TimeWheelColumn
        items={minutes}
        selectedIndex={timeState.minute}
        onSelect={(idx) => onChange({ ...timeState, minute: idx })}
        label="MM"
      />
      {showSeconds && (
        <>
          <div className="flex flex-col items-center gap-0.5">
        <span className="text-xs opacity-0 select-none">·</span>
        <span className="text-lg font-semibold text-muted-foreground leading-none">:</span>
      </div>
          <TimeWheelColumn
            items={seconds}
            selectedIndex={timeState.second}
            onSelect={(idx) => onChange({ ...timeState, second: idx })}
            label="SS"
          />
        </>
      )}
      {is12Hour && (
        <TimeWheelColumn
          items={periods}
          selectedIndex={timeState.period === 'AM' ? 0 : 1}
          onSelect={(idx) => {
            const newPeriod = idx === 0 ? 'AM' : 'PM'
            const baseHour = timeState.hour % 12
            const newHour = baseHour + (newPeriod === 'PM' ? 12 : 0)
            onChange({ ...timeState, period: newPeriod, hour: newHour })
          }}
          label="AM/PM"
        />
      )}
    </div>
  )
}

// ============================================================================
// TimeSpinnerDesktop — up/down spinner columns (desktop)
// ============================================================================

function SpinnerCol({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  onChange: (v: number) => void
}) {
  const wrap = (v: number) => (v > max ? min : v < min ? max : v)
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="text-xs text-muted-foreground">{label}</span>
      <div className="flex flex-col items-center border border-border rounded-md">
        <button type="button" className="flex h-6 w-8 items-center justify-center hover:bg-muted rounded-t-md" onClick={() => onChange(wrap(value + 1))}>
          <ChevronUp />
        </button>
        <input
          type="text"
          value={String(value).padStart(2, '0')}
          onChange={(e) => {
            const v = parseInt(e.target.value)
            if (!isNaN(v)) onChange(Math.max(min, Math.min(max, v)))
          }}
          className="w-8 text-center text-sm font-medium bg-transparent outline-none py-1"
        />
        <button type="button" className="flex h-6 w-8 items-center justify-center hover:bg-muted rounded-b-md" onClick={() => onChange(wrap(value - 1))}>
          <ChevronDown />
        </button>
      </div>
    </div>
  )
}

function TimeSpinnerDesktop({
  timeState,
  onChange,
  showSeconds,
  is12Hour,
}: {
  timeState: TimeState
  onChange: (t: TimeState) => void
  showSeconds?: boolean
  is12Hour?: boolean
}) {
  const displayHour = is12Hour ? (timeState.hour % 12 || 12) : timeState.hour
  return (
    <div className="flex items-center gap-2 p-3 border-t border-border">
      <SpinnerCol
        label="Hour"
        value={displayHour}
        min={is12Hour ? 1 : 0}
        max={is12Hour ? 12 : 23}
        onChange={(v) => {
          const newHour = is12Hour ? (v % 12) + (timeState.period === 'PM' ? 12 : 0) : v
          onChange({ ...timeState, hour: newHour })
        }}
      />
      <div className="flex flex-col items-center gap-0.5">
        <span className="text-xs opacity-0 select-none">·</span>
        <span className="text-lg font-semibold text-muted-foreground leading-none">:</span>
      </div>
      <SpinnerCol
        label="Min"
        value={timeState.minute}
        min={0}
        max={59}
        onChange={(v) => onChange({ ...timeState, minute: v })}
      />
      {showSeconds && (
        <>
          <div className="flex flex-col items-center gap-0.5">
        <span className="text-xs opacity-0 select-none">·</span>
        <span className="text-lg font-semibold text-muted-foreground leading-none">:</span>
      </div>
          <SpinnerCol
            label="Sec"
            value={timeState.second}
            min={0}
            max={59}
            onChange={(v) => onChange({ ...timeState, second: v })}
          />
        </>
      )}
      {is12Hour && (
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-xs text-muted-foreground">AM/PM</span>
          <div className="flex flex-col border border-border rounded-md overflow-hidden">
            {(['AM', 'PM'] as const).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => {
                  const base = timeState.hour % 12
                  onChange({ ...timeState, period: p, hour: base + (p === 'PM' ? 12 : 0) })
                }}
                className={cn('px-2.5 py-1 text-xs', timeState.period === p ? 'bg-primary-500 text-white' : 'hover:bg-muted')}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ============================================================================
// Helpers — parse time string ↔ TimeState
// ============================================================================

function parseTimeString(str: string | null | undefined, is12Hour: boolean): TimeState {
  if (!str) return { hour: 0, minute: 0, second: 0, period: 'AM' }
  const fmt = is12Hour ? 'hh:mm A' : 'HH:mm'
  const d = dayjs(str, [fmt, 'hh:mm:ss A', 'HH:mm:ss'], true)
  if (!d.isValid()) return { hour: 0, minute: 0, second: 0, period: 'AM' }
  const hour = d.hour()
  return {
    hour,
    minute: d.minute(),
    second: d.second(),
    period: hour >= 12 ? 'PM' : 'AM',
  }
}

function formatTimeState(t: TimeState, is12Hour: boolean, showSeconds: boolean): string {
  const fmt = is12Hour
    ? (showSeconds ? 'hh:mm:ss A' : 'hh:mm A')
    : (showSeconds ? 'HH:mm:ss' : 'HH:mm')
  return dayjs().hour(t.hour).minute(t.minute).second(t.second).format(fmt)
}

// ============================================================================
// DatePicker
// ============================================================================

const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>((props, ref) => {
  const {
    value,
    defaultValue,
    onChange,
    format: fmt = 'MM/DD/YYYY',
    placeholder = 'MM/DD/YYYY',
    disabled = false,
    readOnly = false,
    label,
    required = false,
    className,
    disableInput = false,
    disableCalendar = false,
    variant = 'auto',
    minDate,
    maxDate,
  } = props

  const resolvedVariant = useVariant(variant)
  const id = React.useId()
  const triggerRef = React.useRef<HTMLDivElement>(null)
  const minDay = minDate ? dayjs(minDate) : undefined
  const maxDay = maxDate ? dayjs(maxDate) : undefined

  const [internalValue, setInternalValue] = React.useState<Dayjs | null>(
    defaultValue ? dayjs(defaultValue) : null
  )
  const controlled = value !== undefined
  const current: Dayjs | null = controlled ? (value ? dayjs(value) : null) : internalValue

  const [open, setOpen] = React.useState(false)
  const [inputText, setInputText] = React.useState(current ? current.format(fmt) : '')
  const [viewDate, setViewDate] = React.useState<Dayjs>(current ?? dayjs())

  React.useEffect(() => {
    setInputText(current ? current.format(fmt) : '')
  }, [current?.valueOf(), fmt])

  const setValue = (d: Dayjs | null) => {
    if (!controlled) setInternalValue(d)
    onChange?.(d ? d.toDate() : null)
  }

  const handleSelect = (d: Dayjs) => { setValue(d); setOpen(false) }
  const handleClear = () => { setValue(null); setInputText('') }
  const handleCommit = (text: string) => {
    if (!text) { handleClear(); return }
    const parsed = dayjs(text, fmt, true)
    if (parsed.isValid()) { setValue(parsed); setViewDate(parsed) }
    else setInputText(current ? current.format(fmt) : '')
  }

  const hasValue = current != null
  const displayText = current ? current.format(fmt) : ''

  const calendar = (
    <CalendarGrid
      viewDate={viewDate}
      selectedDate={current}
      onDateSelect={handleSelect}
      onViewChange={setViewDate}
      minDate={minDay}
      maxDate={maxDay}
    />
  )

  return (
    <PickerWrapper label={label} required={required} id={id} hasValue={hasValue}>
      <div ref={triggerRef} className={cn('relative', className)}>
        {disableInput ? (
          <TriggerButton
            value={displayText}
            placeholder={placeholder}
            disabled={disabled}
            onClick={() => !disableCalendar && setOpen(!open)}
            icon={<CalendarIcon className="h-4 w-4 opacity-50" />}
            onClear={hasValue ? handleClear : undefined}
          />
        ) : (
          <PickerInput
            ref={ref}
            id={id}
            value={inputText}
            onChange={setInputText}
            onCommit={handleCommit}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            onClear={hasValue ? handleClear : undefined}
            icon={!disableCalendar ? <CalendarIcon className="h-4 w-4" /> : undefined}
            onIconClick={!disableCalendar ? () => setOpen(!open) : undefined}
          />
        )}
        {!disableCalendar && resolvedVariant === 'desktop' && (
          <PickerPopover open={open} onClose={() => setOpen(false)} triggerRef={triggerRef}>
            {calendar}
          </PickerPopover>
        )}
      </div>
      {!disableCalendar && resolvedVariant === 'mobile' && (
        <PickerModal open={open} onClose={() => setOpen(false)} title="Select Date">
          {calendar}
        </PickerModal>
      )}
    </PickerWrapper>
  )
})
DatePicker.displayName = 'DatePicker'

// ============================================================================
// MonthPicker
// ============================================================================

const MonthPicker = React.forwardRef<HTMLInputElement, MonthPickerProps>((props, ref) => {
  const {
    value,
    defaultValue,
    onChange,
    format: fmt = 'MM/YYYY',
    placeholder = 'MM/YYYY',
    disabled = false,
    readOnly = false,
    label,
    required = false,
    className,
    disableInput = false,
    disableCalendar = false,
    variant = 'auto',
    minDate,
    maxDate,
  } = props

  const resolvedVariant = useVariant(variant)
  const id = React.useId()
  const triggerRef = React.useRef<HTMLDivElement>(null)
  const minDay = minDate ? dayjs(minDate) : undefined
  const maxDay = maxDate ? dayjs(maxDate) : undefined

  const [internalValue, setInternalValue] = React.useState<Dayjs | null>(
    defaultValue ? dayjs(defaultValue) : null
  )
  const controlled = value !== undefined
  const current: Dayjs | null = controlled ? (value ? dayjs(value) : null) : internalValue

  const [open, setOpen] = React.useState(false)
  const [inputText, setInputText] = React.useState(current ? current.format(fmt) : '')
  const [viewYear, setViewYear] = React.useState(current ? current.year() : dayjs().year())

  React.useEffect(() => {
    setInputText(current ? current.format(fmt) : '')
  }, [current?.valueOf(), fmt])

  const setValue = (d: Dayjs | null) => {
    if (!controlled) setInternalValue(d)
    onChange?.(d ? d.toDate() : null)
  }

  const handleSelect = (d: Dayjs) => { setValue(d); setOpen(false) }
  const handleClear = () => { setValue(null); setInputText('') }
  const handleCommit = (text: string) => {
    if (!text) { handleClear(); return }
    const parsed = dayjs(text, fmt, true)
    if (parsed.isValid()) { setValue(parsed); setViewYear(parsed.year()) }
    else setInputText(current ? current.format(fmt) : '')
  }

  const hasValue = current != null
  const displayText = current ? current.format(fmt) : ''

  const grid = (
    <MonthGrid
      viewYear={viewYear}
      selectedDate={current}
      onMonthSelect={handleSelect}
      onYearChange={setViewYear}
      minDate={minDay}
      maxDate={maxDay}
    />
  )

  return (
    <PickerWrapper label={label} required={required} id={id} hasValue={hasValue}>
      <div ref={triggerRef} className={cn('relative', className)}>
        {disableInput ? (
          <TriggerButton
            value={displayText}
            placeholder={placeholder}
            disabled={disabled}
            onClick={() => !disableCalendar && setOpen(!open)}
            icon={<CalendarIcon className="h-4 w-4 opacity-50" />}
            onClear={hasValue ? handleClear : undefined}
          />
        ) : (
          <PickerInput
            ref={ref}
            id={id}
            value={inputText}
            onChange={setInputText}
            onCommit={handleCommit}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            onClear={hasValue ? handleClear : undefined}
            icon={!disableCalendar ? <CalendarIcon className="h-4 w-4" /> : undefined}
            onIconClick={!disableCalendar ? () => setOpen(!open) : undefined}
          />
        )}
        {!disableCalendar && resolvedVariant === 'desktop' && (
          <PickerPopover open={open} onClose={() => setOpen(false)} triggerRef={triggerRef}>
            {grid}
          </PickerPopover>
        )}
      </div>
      {!disableCalendar && resolvedVariant === 'mobile' && (
        <PickerModal open={open} onClose={() => setOpen(false)} title="Select Month">
          {grid}
        </PickerModal>
      )}
    </PickerWrapper>
  )
})
MonthPicker.displayName = 'MonthPicker'

// ============================================================================
// YearPicker
// ============================================================================

const YearPicker = React.forwardRef<HTMLInputElement, YearPickerProps>((props, ref) => {
  const {
    value,
    defaultValue,
    onChange,
    placeholder = 'YYYY',
    disabled = false,
    readOnly = false,
    label,
    required = false,
    className,
    disableInput = false,
    disableCalendar = false,
    variant = 'auto',
    minYear = 1900,
    maxYear = 2100,
  } = props

  const resolvedVariant = useVariant(variant)
  const id = React.useId()
  const triggerRef = React.useRef<HTMLDivElement>(null)

  const [internalValue, setInternalValue] = React.useState<number | null>(defaultValue ?? null)
  const controlled = value !== undefined
  const current = controlled ? value ?? null : internalValue

  const [open, setOpen] = React.useState(false)
  const [inputText, setInputText] = React.useState(current != null ? String(current) : '')

  React.useEffect(() => {
    setInputText(current != null ? String(current) : '')
  }, [current])

  const setValue = (y: number | null) => {
    if (!controlled) setInternalValue(y)
    onChange?.(y)
  }

  const handleSelect = (y: number) => { setValue(y); setOpen(false) }
  const handleClear = () => { setValue(null); setInputText('') }
  const handleCommit = (text: string) => {
    if (!text) { handleClear(); return }
    const y = parseInt(text)
    if (!isNaN(y) && y >= minYear && y <= maxYear) setValue(y)
    else setInputText(current != null ? String(current) : '')
  }

  const hasValue = current != null
  const displayText = current != null ? String(current) : ''

  const grid = (
    <YearGrid selectedYear={current} onYearSelect={handleSelect} minYear={minYear} maxYear={maxYear} />
  )

  return (
    <PickerWrapper label={label} required={required} id={id} hasValue={hasValue}>
      <div ref={triggerRef} className={cn('relative', className)}>
        {disableInput ? (
          <TriggerButton
            value={displayText}
            placeholder={placeholder}
            disabled={disabled}
            onClick={() => !disableCalendar && setOpen(!open)}
            icon={<CalendarIcon className="h-4 w-4 opacity-50" />}
            onClear={hasValue ? handleClear : undefined}
          />
        ) : (
          <PickerInput
            ref={ref}
            id={id}
            value={inputText}
            onChange={setInputText}
            onCommit={handleCommit}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            onClear={hasValue ? handleClear : undefined}
            icon={!disableCalendar ? <CalendarIcon className="h-4 w-4" /> : undefined}
            onIconClick={!disableCalendar ? () => setOpen(!open) : undefined}
          />
        )}
        {!disableCalendar && resolvedVariant === 'desktop' && (
          <PickerPopover open={open} onClose={() => setOpen(false)} triggerRef={triggerRef}>
            {grid}
          </PickerPopover>
        )}
      </div>
      {!disableCalendar && resolvedVariant === 'mobile' && (
        <PickerModal open={open} onClose={() => setOpen(false)} title="Select Year">
          {grid}
        </PickerModal>
      )}
    </PickerWrapper>
  )
})
YearPicker.displayName = 'YearPicker'

// ============================================================================
// TimePicker
// ============================================================================

const TimePicker = React.forwardRef<HTMLInputElement, TimePickerProps>((props, ref) => {
  const {
    value,
    defaultValue,
    onChange,
    is12Hour = false,
    showSeconds = false,
    placeholder,
    disabled = false,
    readOnly = false,
    label,
    required = false,
    className,
    disableInput = false,
    disableCalendar = false,
    variant = 'auto',
  } = props

  const resolvedVariant = useVariant(variant)
  const id = React.useId()
  const triggerRef = React.useRef<HTMLDivElement>(null)
  const defaultFmt = is12Hour ? (showSeconds ? 'hh:mm:ss A' : 'hh:mm A') : (showSeconds ? 'HH:mm:ss' : 'HH:mm')
  const ph = placeholder ?? defaultFmt

  const [internalValue, setInternalValue] = React.useState<string | null>(defaultValue ?? null)
  const controlled = value !== undefined
  const current = controlled ? value ?? null : internalValue

  const [open, setOpen] = React.useState(false)
  const [inputText, setInputText] = React.useState(current ?? '')
  const [timeState, setTimeState] = React.useState<TimeState>(parseTimeString(current, is12Hour))

  React.useEffect(() => {
    setInputText(current ?? '')
    setTimeState(parseTimeString(current, is12Hour))
  }, [current])

  const setValue = (t: TimeState) => {
    const str = formatTimeState(t, is12Hour, showSeconds)
    if (!controlled) setInternalValue(str)
    onChange?.(str)
  }

  const handleTimeChange = (t: TimeState) => {
    setTimeState(t)
    setValue(t)
  }

  const handleClear = () => {
    if (!controlled) setInternalValue(null)
    onChange?.(null)
    setInputText('')
  }
  const handleCommit = (text: string) => {
    if (!text) { handleClear(); return }
    const parsed = dayjs(text, [defaultFmt, 'hh:mm:ss A', 'HH:mm:ss', 'HH:mm', 'hh:mm A'], true)
    if (parsed.isValid()) {
      const t: TimeState = {
        hour: parsed.hour(), minute: parsed.minute(), second: parsed.second(),
        period: parsed.hour() >= 12 ? 'PM' : 'AM',
      }
      setTimeState(t)
      setValue(t)
    } else setInputText(current ?? '')
  }

  const hasValue = current != null && current !== ''
  const displayText = current ?? ''

  const timePicker = resolvedVariant === 'desktop'
    ? <TimeSpinnerDesktop timeState={timeState} onChange={handleTimeChange} showSeconds={showSeconds} is12Hour={is12Hour} />
    : <TimeWheel timeState={timeState} onChange={handleTimeChange} showSeconds={showSeconds} is12Hour={is12Hour} />

  return (
    <PickerWrapper label={label} required={required} id={id} hasValue={hasValue}>
      <div ref={triggerRef} className={cn('relative', className)}>
        {disableInput ? (
          <TriggerButton
            value={displayText}
            placeholder={ph}
            disabled={disabled}
            onClick={() => !disableCalendar && setOpen(!open)}
            icon={<ClockIcon className="h-4 w-4 opacity-50" />}
            onClear={hasValue ? handleClear : undefined}
          />
        ) : (
          <PickerInput
            ref={ref}
            id={id}
            value={inputText}
            onChange={setInputText}
            onCommit={handleCommit}
            placeholder={ph}
            disabled={disabled}
            readOnly={readOnly}
            onClear={hasValue ? handleClear : undefined}
            icon={!disableCalendar ? <ClockIcon className="h-4 w-4" /> : undefined}
            onIconClick={!disableCalendar ? () => setOpen(!open) : undefined}
          />
        )}
        {!disableCalendar && resolvedVariant === 'desktop' && (
          <PickerPopover open={open} onClose={() => setOpen(false)} triggerRef={triggerRef}>
            {timePicker}
          </PickerPopover>
        )}
      </div>
      {!disableCalendar && resolvedVariant === 'mobile' && (
        <PickerModal open={open} onClose={() => setOpen(false)} title="Select Time">
          {timePicker}
        </PickerModal>
      )}
    </PickerWrapper>
  )
})
TimePicker.displayName = 'TimePicker'

// ============================================================================
// DateTimePicker
// ============================================================================

const DateTimePicker = React.forwardRef<HTMLInputElement, DateTimePickerProps>((props, ref) => {
  const {
    value,
    defaultValue,
    onChange,
    format: fmt,
    placeholder,
    disabled = false,
    readOnly = false,
    label,
    required = false,
    className,
    is12Hour = false,
    showSeconds = false,
    disableInput = false,
    disableCalendar = false,
    variant = 'auto',
    minDate,
    maxDate,
  } = props

  const resolvedVariant = useVariant(variant)
  const id = React.useId()
  const triggerRef = React.useRef<HTMLDivElement>(null)
  const minDay = minDate ? dayjs(minDate) : undefined
  const maxDay = maxDate ? dayjs(maxDate) : undefined
  const defaultFmt = fmt ?? (is12Hour ? (showSeconds ? 'MM/DD/YYYY hh:mm:ss A' : 'MM/DD/YYYY hh:mm A') : (showSeconds ? 'MM/DD/YYYY HH:mm:ss' : 'MM/DD/YYYY HH:mm'))
  const ph = placeholder ?? defaultFmt

  const [internalValue, setInternalValue] = React.useState<Dayjs | null>(
    defaultValue ? dayjs(defaultValue) : null
  )
  const controlled = value !== undefined
  const current: Dayjs | null = controlled ? (value ? dayjs(value) : null) : internalValue

  const [open, setOpen] = React.useState(false)
  const [inputText, setInputText] = React.useState(current ? current.format(defaultFmt) : '')
  const [viewDate, setViewDate] = React.useState<Dayjs>(current ?? dayjs())
  const [timeState, setTimeState] = React.useState<TimeState>(
    current
      ? { hour: current.hour(), minute: current.minute(), second: current.second(), period: current.hour() >= 12 ? 'PM' : 'AM' }
      : { hour: 0, minute: 0, second: 0, period: 'AM' }
  )

  React.useEffect(() => {
    setInputText(current ? current.format(defaultFmt) : '')
    if (current) {
      setTimeState({ hour: current.hour(), minute: current.minute(), second: current.second(), period: current.hour() >= 12 ? 'PM' : 'AM' })
    }
  }, [current?.valueOf(), defaultFmt])

  const setDateTime = (d: Dayjs | null) => {
    if (!controlled) setInternalValue(d)
    onChange?.(d ? d.toDate() : null)
  }

  const handleDateSelect = (d: Dayjs) => {
    const merged = d.hour(timeState.hour).minute(timeState.minute).second(timeState.second)
    setDateTime(merged)
    // Don't close — let user pick time too
  }

  const handleTimeChange = (t: TimeState) => {
    setTimeState(t)
    const base = current ?? dayjs()
    const merged = base.hour(t.hour).minute(t.minute).second(t.second)
    setDateTime(merged)
  }

  const handleClear = () => { setDateTime(null); setInputText('') }
  const handleCommit = (text: string) => {
    if (!text) { handleClear(); return }
    const parsed = dayjs(text, defaultFmt, true)
    if (parsed.isValid()) {
      setDateTime(parsed)
      setViewDate(parsed)
      setTimeState({ hour: parsed.hour(), minute: parsed.minute(), second: parsed.second(), period: parsed.hour() >= 12 ? 'PM' : 'AM' })
    } else setInputText(current ? current.format(defaultFmt) : '')
  }

  const hasValue = current != null
  const displayText = current ? current.format(defaultFmt) : ''

  const content = (
    <div>
      <CalendarGrid
        viewDate={viewDate}
        selectedDate={current}
        onDateSelect={handleDateSelect}
        onViewChange={setViewDate}
        minDate={minDay}
        maxDate={maxDay}
      />
      {resolvedVariant === 'desktop'
        ? <TimeSpinnerDesktop timeState={timeState} onChange={handleTimeChange} showSeconds={showSeconds} is12Hour={is12Hour} />
        : <TimeWheel timeState={timeState} onChange={handleTimeChange} showSeconds={showSeconds} is12Hour={is12Hour} />
      }
    </div>
  )

  return (
    <PickerWrapper label={label} required={required} id={id} hasValue={hasValue}>
      <div ref={triggerRef} className={cn('relative', className)}>
        {disableInput ? (
          <TriggerButton
            value={displayText}
            placeholder={ph}
            disabled={disabled}
            onClick={() => !disableCalendar && setOpen(!open)}
            icon={<CalendarIcon className="h-4 w-4 opacity-50" />}
            onClear={hasValue ? handleClear : undefined}
          />
        ) : (
          <PickerInput
            ref={ref}
            id={id}
            value={inputText}
            onChange={setInputText}
            onCommit={handleCommit}
            placeholder={ph}
            disabled={disabled}
            readOnly={readOnly}
            onClear={hasValue ? handleClear : undefined}
            icon={!disableCalendar ? <CalendarIcon className="h-4 w-4" /> : undefined}
            onIconClick={!disableCalendar ? () => setOpen(!open) : undefined}
          />
        )}
        {!disableCalendar && resolvedVariant === 'desktop' && (
          <PickerPopover open={open} onClose={() => setOpen(false)} triggerRef={triggerRef}>
            {content}
          </PickerPopover>
        )}
      </div>
      {!disableCalendar && resolvedVariant === 'mobile' && (
        <PickerModal open={open} onClose={() => setOpen(false)} title="Select Date & Time">
          {content}
        </PickerModal>
      )}
    </PickerWrapper>
  )
})
DateTimePicker.displayName = 'DateTimePicker'

// ============================================================================
// DateRangePicker
// ============================================================================

const DateRangePicker = React.forwardRef<HTMLInputElement, DateRangePickerProps>((props, ref) => {
  const {
    value,
    defaultValue,
    onChange,
    format: fmt = 'MM/DD/YYYY',
    startPlaceholder = 'Start date',
    endPlaceholder = 'End date',
    disabled = false,
    readOnly = false,
    label,
    required = false,
    className,
    disableInput = false,
    disableCalendar = false,
    variant = 'auto',
    minDate,
    maxDate,
    presets,
  } = props

  const resolvedVariant = useVariant(variant)
  const id = React.useId()
  const triggerRef = React.useRef<HTMLDivElement>(null)
  const minDay = minDate ? dayjs(minDate) : undefined
  const maxDay = maxDate ? dayjs(maxDate) : undefined

  const [internalRange, setInternalRange] = React.useState<[Dayjs | null, Dayjs | null]>([
    defaultValue?.[0] ? dayjs(defaultValue[0]) : null,
    defaultValue?.[1] ? dayjs(defaultValue[1]) : null,
  ])
  const controlled = value !== undefined
  const current: [Dayjs | null, Dayjs | null] = controlled
    ? [value?.[0] ? dayjs(value[0]) : null, value?.[1] ? dayjs(value[1]) : null]
    : internalRange

  const [open, setOpen] = React.useState(false)
  const [selecting, setSelecting] = React.useState<'start' | 'end'>('start')
  const [hoveredDate, setHoveredDate] = React.useState<Dayjs | null>(null)
  const [leftView, setLeftView] = React.useState<Dayjs>(current[0] ?? dayjs())
  const [rightView, setRightView] = React.useState<Dayjs>((current[1] ?? current[0] ?? dayjs()).add(1, 'month'))
  const [startText, setStartText] = React.useState(current[0] ? current[0].format(fmt) : '')
  const [endText, setEndText] = React.useState(current[1] ? current[1].format(fmt) : '')

  React.useEffect(() => {
    setStartText(current[0] ? current[0].format(fmt) : '')
    setEndText(current[1] ? current[1].format(fmt) : '')
  }, [current[0]?.valueOf(), current[1]?.valueOf(), fmt])

  const setRange = (range: [Dayjs | null, Dayjs | null]) => {
    if (!controlled) setInternalRange(range)
    onChange?.([range[0] ? range[0].toDate() : null, range[1] ? range[1].toDate() : null])
  }

  const handleDateSelect = (d: Dayjs) => {
    if (selecting === 'start') {
      setRange([d, null])
      setSelecting('end')
    } else {
      const [start] = current
      if (start && d.isBefore(start, 'day')) {
        setRange([d, start])
      } else {
        setRange([start, d])
      }
      setSelecting('start')
      setOpen(false)
    }
  }

  const handleClear = () => {
    setRange([null, null])
    setStartText('')
    setEndText('')
    setSelecting('start')
  }

  const handleStartCommit = (text: string) => {
    if (!text) { setRange([null, current[1]]); return }
    const d = dayjs(text, fmt, true)
    if (d.isValid()) { setRange([d, current[1]]); setLeftView(d) }
    else setStartText(current[0] ? current[0].format(fmt) : '')
  }

  const handleEndCommit = (text: string) => {
    if (!text) { setRange([current[0], null]); return }
    const d = dayjs(text, fmt, true)
    if (d.isValid()) { setRange([current[0], d]); setRightView(d) }
    else setEndText(current[1] ? current[1].format(fmt) : '')
  }

  const hasValue = current[0] != null || current[1] != null
  const displayText = [
    current[0] ? current[0].format(fmt) : startPlaceholder,
    current[1] ? current[1].format(fmt) : endPlaceholder,
  ].join(' → ')

  const rangeStart = current[0]
  const rangeEnd = current[1]

  // Detect which preset (if any) matches current range
  const activePresetLabel = React.useMemo(() => {
    if (!presets?.length || !current[0] || !current[1]) return null
    for (const preset of presets) {
      const [ps, pe] = preset.getValue()
      if (dayjs(ps).isSame(current[0], 'day') && dayjs(pe).isSame(current[1], 'day'))
        return preset.label
    }
    return null
  }, [presets, current[0]?.valueOf(), current[1]?.valueOf()])

  const applyPreset = (preset: DateRangePreset) => {
    const [s, e] = preset.getValue()
    const start = dayjs(s)
    const end = dayjs(e)
    setRange([start, end])
    setLeftView(start)
    setRightView(end.isSame(start, 'month') ? end.add(1, 'month') : end)
    setSelecting('start')
    setOpen(false)
  }

  // Preset list column — shared between desktop and mobile
  const presetList = presets && presets.length > 0 ? (
    <div className="flex flex-col py-2 min-w-[130px] border-r border-border">
      {presets.map((preset) => (
        <button
          key={preset.label}
          type="button"
          onClick={() => applyPreset(preset)}
          className={cn(
            'px-4 py-2 text-sm text-left hover:bg-muted transition-colors',
            activePresetLabel === preset.label
              ? 'text-primary-500 font-semibold bg-primary-50 dark:bg-primary-900/20'
              : 'text-foreground',
          )}
        >
          {preset.label}
        </button>
      ))}
    </div>
  ) : null

  // Mobile preset chips row
  const presetChips = presets && presets.length > 0 ? (
    <div className="flex gap-2 overflow-x-auto pb-2 mb-3 scrollbar-none">
      {presets.map((preset) => (
        <button
          key={preset.label}
          type="button"
          onClick={() => applyPreset(preset)}
          className={cn(
            'shrink-0 rounded-full border px-3 py-1 text-xs whitespace-nowrap transition-colors',
            activePresetLabel === preset.label
              ? 'border-primary-500 bg-primary-500 text-white'
              : 'border-border text-foreground hover:bg-muted',
          )}
        >
          {preset.label}
        </button>
      ))}
    </div>
  ) : null

  // Desktop: preset column + two calendars side by side
  const desktopCalendars = (
    <div className="flex flex-row">
      {presetList}
      <div className="flex flex-row">
        <CalendarGrid
          viewDate={leftView}
          onDateSelect={handleDateSelect}
          onViewChange={(d) => {
            setLeftView(d)
            if (!d.isBefore(rightView, 'month')) setRightView(d.add(1, 'month'))
          }}
          minDate={minDay}
          maxDate={maxDay}
          rangeStart={rangeStart}
          rangeEnd={rangeEnd}
          hoveredDate={hoveredDate}
          onDateHover={setHoveredDate}
        />
        <div className="border-l border-border">
          <CalendarGrid
            viewDate={rightView}
            onDateSelect={handleDateSelect}
            onViewChange={(d) => {
              setRightView(d)
              if (!d.isAfter(leftView, 'month')) setLeftView(d.subtract(1, 'month'))
            }}
            minDate={minDay}
            maxDate={maxDay}
            rangeStart={rangeStart}
            rangeEnd={rangeEnd}
            hoveredDate={hoveredDate}
            onDateHover={setHoveredDate}
          />
        </div>
      </div>
    </div>
  )

  // Mobile: single calendar, step through start → end
  const mobileView = selecting === 'start' ? leftView : rightView
  const setMobileView = (d: Dayjs) => selecting === 'start' ? setLeftView(d) : setRightView(d)
  const mobileCalendar = (
    <div>
      {/* Preset chips */}
      {presetChips}
      {/* Step indicator */}
      <div className="mb-3 px-1">
        <div className="flex items-center justify-between mb-1.5">
          <span className={cn('text-xs font-medium', selecting === 'start' ? 'text-primary-500' : 'text-muted-foreground')}>
            Start date
          </span>
          <span className={cn('text-xs font-medium', selecting === 'end' ? 'text-primary-500' : 'text-muted-foreground')}>
            End date
          </span>
        </div>
        <div className="flex gap-1">
          <div className={cn('h-1 flex-1 rounded-full', selecting === 'start' ? 'bg-primary-500' : 'bg-primary-200')} />
          <div className={cn('h-1 flex-1 rounded-full', selecting === 'end' ? 'bg-primary-500' : 'bg-muted')} />
        </div>
        {current[0] && (
          <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
            <span className="font-medium text-foreground">{current[0].format(fmt)}</span>
            {current[1] && <><span>→</span><span className="font-medium text-foreground">{current[1].format(fmt)}</span></>}
          </div>
        )}
      </div>
      <CalendarGrid
        viewDate={mobileView}
        onDateSelect={handleDateSelect}
        onViewChange={setMobileView}
        minDate={minDay}
        maxDate={maxDay}
        rangeStart={rangeStart}
        rangeEnd={rangeEnd}
        hoveredDate={hoveredDate}
        onDateHover={setHoveredDate}
      />
    </div>
  )

  return (
    <PickerWrapper label={label} required={required} id={id} hasValue={hasValue}>
      <div ref={triggerRef} className={cn('relative', className)}>
        {disableInput ? (
          <TriggerButton
            value={hasValue ? displayText : ''}
            placeholder={`${startPlaceholder} → ${endPlaceholder}`}
            disabled={disabled}
            onClick={() => !disableCalendar && setOpen(!open)}
            icon={<CalendarIcon className="h-4 w-4 opacity-50" />}
            onClear={hasValue ? handleClear : undefined}
          />
        ) : (
          <div className="flex items-center gap-2">
            <PickerInput
              ref={ref}
              id={id}
              value={startText}
              onChange={setStartText}
              onCommit={handleStartCommit}
              placeholder={startPlaceholder}
              disabled={disabled}
              readOnly={readOnly}
              icon={!disableCalendar ? <CalendarIcon className="h-4 w-4" /> : undefined}
              onIconClick={!disableCalendar ? () => { setSelecting('start'); setOpen(!open) } : undefined}
            />
            <span className="text-muted-foreground shrink-0">→</span>
            <PickerInput
              value={endText}
              onChange={setEndText}
              onCommit={handleEndCommit}
              placeholder={endPlaceholder}
              disabled={disabled}
              readOnly={readOnly}
              onClear={hasValue ? handleClear : undefined}
              icon={!disableCalendar ? <CalendarIcon className="h-4 w-4" /> : undefined}
              onIconClick={!disableCalendar ? () => { setSelecting('end'); setOpen(!open) } : undefined}
            />
          </div>
        )}
        {!disableCalendar && resolvedVariant === 'desktop' && (
          <PickerPopover open={open} onClose={() => setOpen(false)} triggerRef={triggerRef}>
            <div className="px-3 pt-2 text-xs">
              {selecting === 'start'
                ? <span className="text-muted-foreground">Select start date</span>
                : <span className="text-primary-500 font-medium">Now select end date</span>
              }
            </div>
            {desktopCalendars}
          </PickerPopover>
        )}
      </div>
      {!disableCalendar && resolvedVariant === 'mobile' && (
        <PickerModal open={open} onClose={() => setOpen(false)} title="Select Date Range">
          {mobileCalendar}
        </PickerModal>
      )}
    </PickerWrapper>
  )
})
DateRangePicker.displayName = 'DateRangePicker'

// ============================================================================
// Exports
// ============================================================================

export {
  DatePicker,
  MonthPicker,
  YearPicker,
  TimePicker,
  DateTimePicker,
  DateRangePicker,
}
