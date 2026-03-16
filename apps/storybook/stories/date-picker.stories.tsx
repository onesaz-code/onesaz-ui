import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  DatePicker,
  MonthPicker,
  YearPicker,
  TimePicker,
  DateTimePicker,
  DateRangePicker,
  DEFAULT_DATE_RANGE_PRESETS,
  type DateRangePreset,
} from '@onesaz/ui'

// We use DatePicker as the representative component for the meta
const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof DatePicker>

// ─── Helpers ─────────────────────────────────────────────────────────────────

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5 w-[280px]">
      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{label}</p>
      {children}
    </div>
  )
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap gap-8 items-start">{children}</div>
}

// ============================================================================
// DatePicker stories
// ============================================================================

export const Default: Story = {
  name: 'DatePicker — default',
  render: () => (
    <Field label="DatePicker">
      <DatePicker placeholder="MM/DD/YYYY" />
    </Field>
  ),
}

export const DatePickerWithLabel: Story = {
  name: 'DatePicker — label & required',
  render: () => (
    <Row>
      <DatePicker label="Date of birth" placeholder="MM/DD/YYYY" />
      <DatePicker label="Expiry date" required placeholder="MM/DD/YYYY" />
    </Row>
  ),
}

export const DatePickerControlled: Story = {
  name: 'DatePicker — controlled',
  render: function Controlled() {
    const [date, setDate] = React.useState<Date | null>(null)
    return (
      <div className="flex flex-col gap-3 w-[280px]">
        <DatePicker label="Pick a date" value={date} onChange={setDate} />
        <p className="text-xs text-muted-foreground">
          Selected: {date ? date.toLocaleDateString() : 'None'}
        </p>
      </div>
    )
  },
}

export const DatePickerWithMinMax: Story = {
  name: 'DatePicker — min & max dates',
  render: () => {
    const today = new Date()
    const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7)
    const maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7)
    return (
      <Field label="Only ±7 days from today">
        <DatePicker label="Restricted range" minDate={minDate} maxDate={maxDate} placeholder="MM/DD/YYYY" />
      </Field>
    )
  },
}

export const DatePickerDisableInput: Story = {
  name: 'DatePicker — disableInput (button trigger)',
  render: () => (
    <Field label="No text input">
      <DatePicker label="Date" disableInput placeholder="MM/DD/YYYY" />
    </Field>
  ),
}

export const DatePickerDisableCalendar: Story = {
  name: 'DatePicker — disableCalendar (type only)',
  render: () => (
    <Field label="Type only, no calendar">
      <DatePicker label="Date" disableCalendar placeholder="MM/DD/YYYY" />
    </Field>
  ),
}

export const DatePickerDisabled: Story = {
  name: 'DatePicker — disabled',
  render: () => (
    <Field label="Disabled">
      <DatePicker label="Date" disabled defaultValue={new Date()} />
    </Field>
  ),
}

export const DatePickerCustomFormat: Story = {
  name: 'DatePicker — custom format (DD-MM-YYYY)',
  render: () => (
    <Field label="European date format">
      <DatePicker label="Date" format="DD-MM-YYYY" placeholder="DD-MM-YYYY" />
    </Field>
  ),
}

// ============================================================================
// MonthPicker stories
// ============================================================================

export const MonthPickerDefault: Story = {
  name: 'MonthPicker — default',
  render: () => (
    <Field label="MonthPicker">
      <MonthPicker placeholder="MM/YYYY" />
    </Field>
  ),
}

export const MonthPickerControlled: Story = {
  name: 'MonthPicker — controlled',
  render: function MonthControlled() {
    const [date, setDate] = React.useState<Date | null>(null)
    return (
      <div className="flex flex-col gap-3 w-[280px]">
        <MonthPicker label="Billing month" value={date} onChange={setDate} />
        <p className="text-xs text-muted-foreground">
          Selected:{' '}
          {date
            ? date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
            : 'None'}
        </p>
      </div>
    )
  },
}

export const MonthPickerWithLabel: Story = {
  name: 'MonthPicker — label & required',
  render: () => (
    <Row>
      <MonthPicker label="Report month" placeholder="MM/YYYY" />
      <MonthPicker label="Required month" required placeholder="MM/YYYY" />
    </Row>
  ),
}

// ============================================================================
// YearPicker stories
// ============================================================================

export const YearPickerDefault: Story = {
  name: 'YearPicker — default',
  render: () => (
    <Field label="YearPicker">
      <YearPicker placeholder="YYYY" />
    </Field>
  ),
}

export const YearPickerControlled: Story = {
  name: 'YearPicker — controlled',
  render: function YearControlled() {
    const [year, setYear] = React.useState<number | null>(null)
    return (
      <div className="flex flex-col gap-3 w-[280px]">
        <YearPicker label="Graduation year" value={year} onChange={setYear} />
        <p className="text-xs text-muted-foreground">Selected: {year ?? 'None'}</p>
      </div>
    )
  },
}

export const YearPickerWithRange: Story = {
  name: 'YearPicker — limited range',
  render: () => (
    <Field label="2000–2030 only">
      <YearPicker label="Year" minYear={2000} maxYear={2030} placeholder="YYYY" />
    </Field>
  ),
}

export const YearPickerWithLabel: Story = {
  name: 'YearPicker — label & required',
  render: () => (
    <Row>
      <YearPicker label="Year founded" placeholder="YYYY" />
      <YearPicker label="Required year" required placeholder="YYYY" />
    </Row>
  ),
}

// ============================================================================
// TimePicker stories
// ============================================================================

export const TimePickerDefault: Story = {
  name: 'TimePicker — 24-hour',
  render: () => (
    <Field label="TimePicker 24h">
      <TimePicker placeholder="HH:mm" />
    </Field>
  ),
}

export const TimePicker12Hour: Story = {
  name: 'TimePicker — 12-hour (AM/PM)',
  render: () => (
    <Field label="TimePicker 12h">
      <TimePicker is12Hour label="Time" placeholder="hh:mm A" />
    </Field>
  ),
}

export const TimePickerWithSeconds: Story = {
  name: 'TimePicker — with seconds',
  render: () => (
    <Row>
      <TimePicker label="24h with seconds" showSeconds placeholder="HH:mm:ss" />
      <TimePicker label="12h with seconds" is12Hour showSeconds placeholder="hh:mm:ss A" />
    </Row>
  ),
}

export const TimePickerControlled: Story = {
  name: 'TimePicker — controlled',
  render: function TimeControlled() {
    const [time, setTime] = React.useState<string | null>(null)
    return (
      <div className="flex flex-col gap-3 w-[280px]">
        <TimePicker label="Meeting time" value={time} onChange={setTime} />
        <p className="text-xs text-muted-foreground">Selected: {time ?? 'None'}</p>
      </div>
    )
  },
}

export const TimePickerWithLabel: Story = {
  name: 'TimePicker — label & required',
  render: () => (
    <Row>
      <TimePicker label="Start time" placeholder="HH:mm" />
      <TimePicker label="Required time" required placeholder="HH:mm" />
    </Row>
  ),
}

// ============================================================================
// DateTimePicker stories
// ============================================================================

export const DateTimePickerDefault: Story = {
  name: 'DateTimePicker — default',
  render: () => (
    <Field label="DateTimePicker">
      <DateTimePicker placeholder="MM/DD/YYYY HH:mm" />
    </Field>
  ),
}

export const DateTimePicker12Hour: Story = {
  name: 'DateTimePicker — 12-hour',
  render: () => (
    <Field label="12-hour format">
      <DateTimePicker label="Appointment" is12Hour placeholder="MM/DD/YYYY hh:mm A" />
    </Field>
  ),
}

export const DateTimePickerWithSeconds: Story = {
  name: 'DateTimePicker — with seconds',
  render: () => (
    <Field label="With seconds">
      <DateTimePicker label="Timestamp" showSeconds placeholder="MM/DD/YYYY HH:mm:ss" />
    </Field>
  ),
}

export const DateTimePickerControlled: Story = {
  name: 'DateTimePicker — controlled',
  render: function DateTimeControlled() {
    const [dt, setDt] = React.useState<Date | null>(null)
    return (
      <div className="flex flex-col gap-3 w-[320px]">
        <DateTimePicker label="Event time" value={dt} onChange={setDt} />
        <p className="text-xs text-muted-foreground">
          Selected: {dt ? dt.toLocaleString() : 'None'}
        </p>
      </div>
    )
  },
}

export const DateTimePickerWithLabel: Story = {
  name: 'DateTimePicker — label & required',
  render: () => (
    <Row>
      <DateTimePicker label="Scheduled at" placeholder="MM/DD/YYYY HH:mm" />
      <DateTimePicker label="Required" required placeholder="MM/DD/YYYY HH:mm" />
    </Row>
  ),
}

// ============================================================================
// DateRangePicker stories
// ============================================================================

export const DateRangePickerDefault: Story = {
  name: 'DateRangePicker — default',
  render: () => (
    <div className="w-[580px]">
      <DateRangePicker />
    </div>
  ),
}

export const DateRangePickerControlled: Story = {
  name: 'DateRangePicker — controlled',
  render: function RangeControlled() {
    const [range, setRange] = React.useState<[Date | null, Date | null]>([null, null])
    return (
      <div className="flex flex-col gap-3 w-[580px]">
        <DateRangePicker label="Travel dates" value={range} onChange={setRange} />
        <p className="text-xs text-muted-foreground">
          Start: {range[0] ? range[0].toLocaleDateString() : 'None'}
          {' · '}
          End: {range[1] ? range[1].toLocaleDateString() : 'None'}
        </p>
      </div>
    )
  },
}

export const DateRangePickerWithMinMax: Story = {
  name: 'DateRangePicker — min & max',
  render: () => {
    const today = new Date()
    const minDate = new Date(today.getFullYear(), today.getMonth(), 1)
    const maxDate = new Date(today.getFullYear(), today.getMonth() + 2, 0)
    return (
      <div className="w-[580px]">
        <DateRangePicker label="This & next month only" minDate={minDate} maxDate={maxDate} />
      </div>
    )
  },
}

export const DateRangePickerButtonTrigger: Story = {
  name: 'DateRangePicker — button trigger (disableInput)',
  render: () => (
    <div className="w-[300px]">
      <DateRangePicker label="Date range" disableInput />
    </div>
  ),
}

export const DateRangePickerWithLabel: Story = {
  name: 'DateRangePicker — label & required',
  render: () => (
    <Row>
      <div className="w-[580px]">
        <DateRangePicker label="Report period" />
      </div>
      <div className="w-[580px]">
        <DateRangePicker label="Required range" required />
      </div>
    </Row>
  ),
}

// ============================================================================
// All pickers side-by-side
// ============================================================================

export const AllPickers: Story = {
  name: 'All pickers — overview',
  render: () => (
    <div className="grid grid-cols-2 gap-6 max-w-2xl">
      <DatePicker label="DatePicker" placeholder="MM/DD/YYYY" />
      <MonthPicker label="MonthPicker" placeholder="MM/YYYY" />
      <YearPicker label="YearPicker" placeholder="YYYY" />
      <TimePicker label="TimePicker" placeholder="HH:mm" />
      <DateTimePicker label="DateTimePicker" placeholder="MM/DD/YYYY HH:mm" />
      <div className="col-span-2">
        <DateRangePicker label="DateRangePicker" />
      </div>
    </div>
  ),
}

// ============================================================================
// Variants
// ============================================================================

export const ForceDesktop: Story = {
  name: 'Variants — forced desktop',
  render: () => (
    <Field label="variant='desktop'">
      <DatePicker label="Always desktop" variant="desktop" placeholder="MM/DD/YYYY" />
    </Field>
  ),
}

export const ForceMobile: Story = {
  name: 'Variants — forced mobile (bottom sheet)',
  render: () => (
    <Field label="variant='mobile'">
      <DatePicker label="Always mobile" variant="mobile" placeholder="MM/DD/YYYY" />
    </Field>
  ),
}

// ============================================================================
// DateRangePicker — Presets
// ============================================================================

export const DateRangePickerWithPresets: Story = {
  name: 'DateRangePicker — with default presets',
  render: function WithPresets() {
    const [range, setRange] = React.useState<[Date | null, Date | null]>([null, null])
    return (
      <div className="flex flex-col gap-3 w-[700px]">
        <DateRangePicker
          label="Date range"
          value={range}
          onChange={setRange}
          presets={DEFAULT_DATE_RANGE_PRESETS}
        />
        <p className="text-xs text-muted-foreground">
          {range[0] ? range[0].toLocaleDateString() : '—'} → {range[1] ? range[1].toLocaleDateString() : '—'}
        </p>
      </div>
    )
  },
}

export const DateRangePickerCustomPresets: Story = {
  name: 'DateRangePicker — custom presets',
  render: function CustomPresets() {
    const [range, setRange] = React.useState<[Date | null, Date | null]>([null, null])

    const customPresets: DateRangePreset[] = [
      {
        label: 'Q1 2026',
        getValue: () => [new Date(2026, 0, 1), new Date(2026, 2, 31)],
      },
      {
        label: 'Q2 2026',
        getValue: () => [new Date(2026, 3, 1), new Date(2026, 5, 30)],
      },
      {
        label: 'Q3 2026',
        getValue: () => [new Date(2026, 6, 1), new Date(2026, 8, 30)],
      },
      {
        label: 'Q4 2026',
        getValue: () => [new Date(2026, 9, 1), new Date(2026, 11, 31)],
      },
      {
        label: 'Full Year',
        getValue: () => [new Date(2026, 0, 1), new Date(2026, 11, 31)],
      },
    ]

    return (
      <div className="flex flex-col gap-3 w-[600px]">
        <DateRangePicker
          label="Fiscal quarter"
          value={range}
          onChange={setRange}
          presets={customPresets}
        />
        <p className="text-xs text-muted-foreground">
          {range[0] ? range[0].toLocaleDateString() : '—'} → {range[1] ? range[1].toLocaleDateString() : '—'}
        </p>
      </div>
    )
  },
}

export const DateRangePickerMixedPresets: Story = {
  name: 'DateRangePicker — default + custom presets combined',
  render: function MixedPresets() {
    const [range, setRange] = React.useState<[Date | null, Date | null]>([null, null])

    const extraPresets: DateRangePreset[] = [
      {
        label: 'Last 7 Days',
        getValue: () => {
          const end = new Date()
          const start = new Date()
          start.setDate(start.getDate() - 6)
          return [start, end]
        },
      },
      {
        label: 'Last 30 Days',
        getValue: () => {
          const end = new Date()
          const start = new Date()
          start.setDate(start.getDate() - 29)
          return [start, end]
        },
      },
    ]

    return (
      <div className="flex flex-col gap-3 w-[700px]">
        <DateRangePicker
          label="Report period"
          value={range}
          onChange={setRange}
          presets={[...extraPresets, ...DEFAULT_DATE_RANGE_PRESETS]}
        />
        <p className="text-xs text-muted-foreground">
          {range[0] ? range[0].toLocaleDateString() : '—'} → {range[1] ? range[1].toLocaleDateString() : '—'}
        </p>
      </div>
    )
  },
}

export const DateRangePickerNoPresets: Story = {
  name: 'DateRangePicker — no presets (calendars only)',
  render: () => (
    <div className="w-[580px]">
      <DateRangePicker label="Date range" presets={[]} />
    </div>
  ),
}

// ============================================================================
// Mobile stories (forced variant='mobile')
// ============================================================================

export const MobileDatePicker: Story = {
  name: 'Mobile — DatePicker',
  render: function MobileDatePicker() {
    const [date, setDate] = React.useState<Date | null>(null)
    return (
      <div className="flex flex-col gap-3 w-[280px]">
        <DatePicker label="Date" variant="mobile" value={date} onChange={setDate} placeholder="MM/DD/YYYY" />
        <p className="text-xs text-muted-foreground">Selected: {date ? date.toLocaleDateString() : 'None'}</p>
      </div>
    )
  },
}

export const MobileMonthPicker: Story = {
  name: 'Mobile — MonthPicker',
  render: function MobileMonthPicker() {
    const [date, setDate] = React.useState<Date | null>(null)
    return (
      <div className="flex flex-col gap-3 w-[280px]">
        <MonthPicker label="Month" variant="mobile" value={date} onChange={setDate} />
        <p className="text-xs text-muted-foreground">
          Selected: {date ? date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'None'}
        </p>
      </div>
    )
  },
}

export const MobileYearPicker: Story = {
  name: 'Mobile — YearPicker',
  render: function MobileYearPicker() {
    const [year, setYear] = React.useState<number | null>(null)
    return (
      <div className="flex flex-col gap-3 w-[280px]">
        <YearPicker label="Year" variant="mobile" value={year} onChange={setYear} />
        <p className="text-xs text-muted-foreground">Selected: {year ?? 'None'}</p>
      </div>
    )
  },
}

export const MobileTimePicker: Story = {
  name: 'Mobile — TimePicker (scroll wheel)',
  render: function MobileTimePicker() {
    const [time, setTime] = React.useState<string | null>(null)
    return (
      <div className="flex flex-col gap-6 w-[280px]">
        <div className="flex flex-col gap-2">
          <TimePicker label="24h" variant="mobile" value={time} onChange={setTime} placeholder="HH:mm" />
          <p className="text-xs text-muted-foreground">Selected: {time ?? 'None'}</p>
        </div>
        <TimePicker label="12h with seconds" variant="mobile" is12Hour showSeconds placeholder="hh:mm:ss A" />
      </div>
    )
  },
}

export const MobileDateTimePicker: Story = {
  name: 'Mobile — DateTimePicker',
  render: function MobileDateTimePicker() {
    const [dt, setDt] = React.useState<Date | null>(null)
    return (
      <div className="flex flex-col gap-3 w-[280px]">
        <DateTimePicker label="Appointment" variant="mobile" value={dt} onChange={setDt} is12Hour />
        <p className="text-xs text-muted-foreground">Selected: {dt ? dt.toLocaleString() : 'None'}</p>
      </div>
    )
  },
}

export const MobileDateRangePicker: Story = {
  name: 'Mobile — DateRangePicker (step-based)',
  render: function MobileDateRangePicker() {
    const [range, setRange] = React.useState<[Date | null, Date | null]>([null, null])
    return (
      <div className="flex flex-col gap-3 w-[300px]">
        <DateRangePicker
          label="Trip dates"
          variant="mobile"
          value={range}
          onChange={setRange}
          presets={DEFAULT_DATE_RANGE_PRESETS}
        />
        <p className="text-xs text-muted-foreground">
          {range[0] ? range[0].toLocaleDateString() : '—'} → {range[1] ? range[1].toLocaleDateString() : '—'}
        </p>
      </div>
    )
  },
}

export const MobileAllPickers: Story = {
  name: 'Mobile — all pickers overview',
  render: function MobileAll() {
    return (
      <div className="grid grid-cols-2 gap-4 max-w-sm">
        <DatePicker label="Date" variant="mobile" placeholder="MM/DD/YYYY" />
        <MonthPicker label="Month" variant="mobile" placeholder="MM/YYYY" />
        <YearPicker label="Year" variant="mobile" placeholder="YYYY" />
        <TimePicker label="Time" variant="mobile" placeholder="HH:mm" />
        <div className="col-span-2">
          <DateTimePicker label="Date & Time" variant="mobile" placeholder="MM/DD/YYYY HH:mm" />
        </div>
        <div className="col-span-2">
          <DateRangePicker label="Range" variant="mobile" presets={DEFAULT_DATE_RANGE_PRESETS} />
        </div>
      </div>
    )
  },
}
