import type { Meta, StoryObj } from '@storybook/react'
import { BarChart } from '@onesaz/ui'

// Sample data
const barData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
]

const lineData = [
  { name: 'Jan', value: 400, value2: 240 },
  { name: 'Feb', value: 300, value2: 139 },
  { name: 'Mar', value: 600, value2: 980 },
  { name: 'Apr', value: 800, value2: 390 },
  { name: 'May', value: 500, value2: 480 },
]

// Bar Chart Stories
const barMeta: Meta<typeof BarChart> = {
  title: 'Components/Charts/BarChart',
  component: BarChart,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export const BarChartDefault: StoryObj<typeof BarChart> = {
  args: {
    data: barData,
    dataKey: 'value',
    height: 300,
    showGrid: true,
    showTooltip: true,
    xAxis: { dataKey: 'name' },
  },
  render: (args) => <BarChart {...args} />,
}

export const BarChartMultiple: StoryObj<typeof BarChart> = {
  args: {
    data: lineData,
    dataKeys: [
      { dataKey: 'value', name: 'Series 1' },
      { dataKey: 'value2', name: 'Series 2' },
    ],
    height: 300,
    showGrid: true,
    showTooltip: true,
    showLegend: true,
    xAxis: { dataKey: 'name' },
  },
  render: (args) => <BarChart {...args} />,
}

export const BarChartWithLabels: StoryObj<typeof BarChart> = {
  args: {
    data: barData,
    dataKey: 'value',
    height: 300,
    showGrid: true,
    showTooltip: true,
    xAxis: { dataKey: 'name' },
    barProps: {
      maxBarSize: 50,
      radius: [4, 4, 0, 0],
    },
    labelList: {
      position: 'top',
      formatter: (value: any) => `${value}`,
    },
  },
  render: (args) => <BarChart {...args} />,
}

export const BarChartCustomTooltip: StoryObj<typeof BarChart> = {
  args: {
    data: barData,
    dataKey: 'value',
    height: 300,
    showGrid: true,
    showTooltip: true,
    xAxis: { dataKey: 'name' },
    tooltip: {
      formatter: (value: any, name: string) => [`${value}`, `Value: ${name}`],
      contentStyle: {
        backgroundColor: 'white',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
      },
    },
  },
  render: (args) => <BarChart {...args} />,
}

// ─── New features: stacking + fixed Y-axis + custom tooltip render ───────────
//
// These stories cover the additions made to support consumer use-cases like
// the Onesaz exam-analysis chart, where stacked subject bars with a
// fixed-out-of-N Y-axis and a multi-row tooltip are required.

// Per-subject marks across a series of tests. Each row has Physics /
// Chemistry / Maths plus a `total` + `Marks` + `percentage` summary —
// shape mirrors what the consumer feeds in real-world data.
const stackedExamData = [
  {
    name: 'T1',
    fullName: 'Mock JEE Mains #1',
    PHYSICS: 65,
    CHEMISTRY: 70,
    MATHEMATICS: 82,
    PHYSICSTotal: 100,
    CHEMISTRYTotal: 100,
    MATHEMATICSTotal: 100,
    PHYSICSPercent: 65,
    CHEMISTRYPercent: 70,
    MATHEMATICSPercent: 82,
    Marks: 217,
    total: 300,
    percentage: 72,
  },
  {
    name: 'T2',
    fullName: 'Mock JEE Mains #2',
    PHYSICS: 78,
    CHEMISTRY: 64,
    MATHEMATICS: 91,
    PHYSICSTotal: 100,
    CHEMISTRYTotal: 100,
    MATHEMATICSTotal: 100,
    PHYSICSPercent: 78,
    CHEMISTRYPercent: 64,
    MATHEMATICSPercent: 91,
    Marks: 233,
    total: 300,
    percentage: 78,
  },
  {
    name: 'T3',
    fullName: 'Mock JEE Mains #3',
    PHYSICS: 55,
    CHEMISTRY: 80,
    MATHEMATICS: 70,
    PHYSICSTotal: 100,
    CHEMISTRYTotal: 100,
    MATHEMATICSTotal: 100,
    PHYSICSPercent: 55,
    CHEMISTRYPercent: 80,
    MATHEMATICSPercent: 70,
    Marks: 205,
    total: 300,
    percentage: 68,
  },
  {
    name: 'T4',
    fullName: 'Mock JEE Mains #4',
    PHYSICS: 88,
    CHEMISTRY: 92,
    MATHEMATICS: 95,
    PHYSICSTotal: 100,
    CHEMISTRYTotal: 100,
    MATHEMATICSTotal: 100,
    PHYSICSPercent: 88,
    CHEMISTRYPercent: 92,
    MATHEMATICSPercent: 95,
    Marks: 275,
    total: 300,
    percentage: 92,
  },
]

const subjectColors: Record<string, string> = {
  PHYSICS: '#3358B8',
  CHEMISTRY: '#A83B96',
  MATHEMATICS: '#2BB5C0',
}

/**
 * Stacked bars, **capsule** variant — every segment has all four corners
 * rounded (`radius: 12`). Each subject reads as a discrete pill stacked
 * on the next. Cleaner than the top-only radius which looks awkward on
 * middle segments.
 */
export const BarChartStackedCapsule: StoryObj<typeof BarChart> = {
  args: {
    data: stackedExamData,
    dataKey: 'PHYSICS',
    dataKeys: [
      { dataKey: 'PHYSICS', stackId: 'a', fill: subjectColors.PHYSICS, name: 'Physics' },
      { dataKey: 'CHEMISTRY', stackId: 'a', fill: subjectColors.CHEMISTRY, name: 'Chemistry' },
      { dataKey: 'MATHEMATICS', stackId: 'a', fill: subjectColors.MATHEMATICS, name: 'Maths' },
    ],
    height: 320,
    showGrid: false,
    showLegend: true,
    xAxis: { dataKey: 'name', axisLine: false, tickLine: false, tick: { fontSize: 12, fontWeight: 'bold' } },
    yAxis: { axisLine: false, tickLine: false, tick: { fontSize: 12, fontWeight: 'bold' } },
    barProps: { radius: 12, maxBarSize: 28 },
  },
  render: (args) => <BarChart {...args} />,
}

/**
 * Stacked bars, **flat** variant — no border radius. Subjects join into
 * a single contiguous bar per test. Classic stacked-chart look.
 */
export const BarChartStackedFlat: StoryObj<typeof BarChart> = {
  args: {
    data: stackedExamData,
    dataKey: 'PHYSICS',
    dataKeys: [
      { dataKey: 'PHYSICS', stackId: 'a', fill: subjectColors.PHYSICS, name: 'Physics' },
      { dataKey: 'CHEMISTRY', stackId: 'a', fill: subjectColors.CHEMISTRY, name: 'Chemistry' },
      { dataKey: 'MATHEMATICS', stackId: 'a', fill: subjectColors.MATHEMATICS, name: 'Maths' },
    ],
    height: 320,
    showGrid: false,
    showLegend: true,
    xAxis: { dataKey: 'name', axisLine: false, tickLine: false, tick: { fontSize: 12, fontWeight: 'bold' } },
    yAxis: { axisLine: false, tickLine: false, tick: { fontSize: 12, fontWeight: 'bold' } },
    barProps: { radius: 0, maxBarSize: 28 },
  },
  render: (args) => <BarChart {...args} />,
}

/**
 * Stacked bars with a fixed Y-axis range — proves the new `yAxis.domain`
 * + `yAxis.ticks` props. Useful when a test type has a known total (e.g.
 * JEE Mains is always out of 300, NEET out of 720) and the consumer wants
 * the scale to reflect that regardless of how many subjects rendered.
 */
export const BarChartStackedFixedYAxis: StoryObj<typeof BarChart> = {
  args: {
    data: stackedExamData,
    dataKey: 'PHYSICS',
    dataKeys: [
      { dataKey: 'PHYSICS', stackId: 'a', fill: subjectColors.PHYSICS, name: 'Physics' },
      { dataKey: 'CHEMISTRY', stackId: 'a', fill: subjectColors.CHEMISTRY, name: 'Chemistry' },
      { dataKey: 'MATHEMATICS', stackId: 'a', fill: subjectColors.MATHEMATICS, name: 'Maths' },
    ],
    height: 320,
    showGrid: false,
    showLegend: true,
    xAxis: { dataKey: 'name', axisLine: false, tickLine: false, tick: { fontSize: 12, fontWeight: 'bold' } },
    yAxis: {
      domain: [0, 300],
      ticks: [0, 60, 120, 180, 240, 300],
      axisLine: false,
      tickLine: false,
      tick: { fontSize: 12, fontWeight: 'bold' },
    },
    barProps: { radius: 12, maxBarSize: 28 },
  },
  render: (args) => <BarChart {...args} />,
}

/**
 * Custom multi-row tooltip via the new `tooltip.content` prop. Receives
 * recharts' `{ active, payload, label }` and returns arbitrary JSX —
 * here we render the test name, total marks/percent, and a row per
 * subject with a color swatch.
 */
export const BarChartStackedCustomTooltip: StoryObj<typeof BarChart> = {
  args: {
    data: stackedExamData,
    dataKey: 'PHYSICS',
    dataKeys: [
      { dataKey: 'PHYSICS', stackId: 'a', fill: subjectColors.PHYSICS, name: 'Physics' },
      { dataKey: 'CHEMISTRY', stackId: 'a', fill: subjectColors.CHEMISTRY, name: 'Chemistry' },
      { dataKey: 'MATHEMATICS', stackId: 'a', fill: subjectColors.MATHEMATICS, name: 'Maths' },
    ],
    height: 320,
    showGrid: false,
    showLegend: true,
    xAxis: { dataKey: 'name', axisLine: false, tickLine: false, tick: { fontSize: 12, fontWeight: 'bold' } },
    yAxis: {
      domain: [0, 300],
      ticks: [0, 60, 120, 180, 240, 300],
      axisLine: false,
      tickLine: false,
      tick: { fontSize: 12, fontWeight: 'bold' },
    },
    barProps: { radius: 12, maxBarSize: 28 },
    tooltip: {
      content: ({ active, payload, label }) => {
        if (!active || !payload || payload.length === 0) return null
        const row = payload[0].payload
        return (
          <div
            style={{
              padding: 10,
              minWidth: 200,
              backgroundColor: 'var(--card, #fff)',
              color: 'var(--card-foreground, #0f172a)',
              border: '1px solid var(--border, #e2e8f0)',
              borderRadius: 6,
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: 8 }}>{row.fullName || label}</div>
            <div style={{ fontWeight: 500 }}>
              Total: <span style={{ color: '#3358B8' }}>{row.Marks} / {row.total}</span> ({row.percentage}%)
            </div>
            <hr style={{ margin: '8px 0', borderColor: 'var(--border, #e2e8f0)' }} />
            {['PHYSICS', 'CHEMISTRY', 'MATHEMATICS'].map((subject) => {
              const subjectLabel = subject === 'MATHEMATICS' ? 'MATHS' : subject
              return (
                <div key={subject} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                  <span
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 999,
                      backgroundColor: subjectColors[subject],
                    }}
                  />
                  <span style={{ fontWeight: 500 }}>{subjectLabel}:</span>
                  <span>
                    {row[subject]} / {row[`${subject}Total`]} ({row[`${subject}Percent`]}%)
                  </span>
                </div>
              )
            })}
          </div>
        )
      },
    },
  },
  render: (args) => <BarChart {...args} />,
}

/**
 * **End-capped stack** — per-bar `radius` makes the whole stack read as
 * one capsule from the outside. Bottom bar rounds only its bottom corners,
 * top bar rounds only its top corners, middle bars are flat. The internal
 * subject boundaries stay as crisp horizontal lines.
 *
 * This is the third radius variant alongside `Capsule` (every segment
 * rounded) and `Flat` (no rounding).
 */
export const BarChartStackedEndCapped: StoryObj<typeof BarChart> = {
  args: {
    data: stackedExamData,
    dataKey: 'PHYSICS',
    dataKeys: [
      // Bottom: bottom-left + bottom-right rounded
      { dataKey: 'PHYSICS', stackId: 'a', fill: subjectColors.PHYSICS, name: 'Physics', radius: [0, 0, 12, 12] },
      // Middle: flat
      { dataKey: 'CHEMISTRY', stackId: 'a', fill: subjectColors.CHEMISTRY, name: 'Chemistry', radius: 0 },
      // Top: top-left + top-right rounded
      { dataKey: 'MATHEMATICS', stackId: 'a', fill: subjectColors.MATHEMATICS, name: 'Maths', radius: [12, 12, 0, 0] },
    ],
    height: 320,
    showGrid: false,
    showLegend: true,
    xAxis: { dataKey: 'name', axisLine: false, tickLine: false, tick: { fontSize: 12, fontWeight: 'bold' } },
    yAxis: {
      domain: [0, 300],
      ticks: [0, 60, 120, 180, 240, 300],
      axisLine: false,
      tickLine: false,
      tick: { fontSize: 12, fontWeight: 'bold' },
    },
    barProps: { maxBarSize: 32 },
  },
  render: (args) => <BarChart {...args} />,
}

/**
 * Per-segment **horizontal** text labels. Uses `dataKeys[i].label` to
 * write the marks inside each subject segment. Falls back to the chart-
 * wide `labelList` prop when not set.
 */
export const BarChartStackedWithLabels: StoryObj<typeof BarChart> = {
  args: {
    data: stackedExamData,
    dataKey: 'PHYSICS',
    dataKeys: [
      {
        dataKey: 'PHYSICS',
        stackId: 'a',
        fill: subjectColors.PHYSICS,
        name: 'Physics',
        radius: [0, 0, 12, 12],
        label: { orientation: 'horizontal', formatter: (v: any) => `${v}` },
      },
      {
        dataKey: 'CHEMISTRY',
        stackId: 'a',
        fill: subjectColors.CHEMISTRY,
        name: 'Chemistry',
        radius: 0,
        label: { orientation: 'horizontal', formatter: (v: any) => `${v}` },
      },
      {
        dataKey: 'MATHEMATICS',
        stackId: 'a',
        fill: subjectColors.MATHEMATICS,
        name: 'Maths',
        radius: [12, 12, 0, 0],
        label: { orientation: 'horizontal', formatter: (v: any) => `${v}` },
      },
    ],
    height: 320,
    showGrid: false,
    showLegend: true,
    xAxis: { dataKey: 'name', axisLine: false, tickLine: false, tick: { fontSize: 12, fontWeight: 'bold' } },
    yAxis: {
      domain: [0, 300],
      ticks: [0, 60, 120, 180, 240, 300],
      axisLine: false,
      tickLine: false,
      tick: { fontSize: 12, fontWeight: 'bold' },
    },
    barProps: { maxBarSize: 40 },
  },
  render: (args) => <BarChart {...args} />,
}

/**
 * Per-segment **vertical** text labels — useful when the bar is narrow
 * relative to its height (typical for tall stacks). Text rotates -90° so
 * it reads bottom-to-top.
 */
export const BarChartStackedWithVerticalLabels: StoryObj<typeof BarChart> = {
  args: {
    data: stackedExamData,
    dataKey: 'PHYSICS',
    dataKeys: [
      {
        dataKey: 'PHYSICS',
        stackId: 'a',
        fill: subjectColors.PHYSICS,
        name: 'Physics',
        radius: [0, 0, 12, 12],
        label: { orientation: 'vertical', formatter: (v: any) => `PHY ${v}` },
      },
      {
        dataKey: 'CHEMISTRY',
        stackId: 'a',
        fill: subjectColors.CHEMISTRY,
        name: 'Chemistry',
        radius: 0,
        label: { orientation: 'vertical', formatter: (v: any) => `CHE ${v}` },
      },
      {
        dataKey: 'MATHEMATICS',
        stackId: 'a',
        fill: subjectColors.MATHEMATICS,
        name: 'Maths',
        radius: [12, 12, 0, 0],
        label: { orientation: 'vertical', formatter: (v: any) => `MTH ${v}` },
      },
    ],
    height: 360,
    showGrid: false,
    showLegend: true,
    xAxis: { dataKey: 'name', axisLine: false, tickLine: false, tick: { fontSize: 12, fontWeight: 'bold' } },
    yAxis: {
      domain: [0, 300],
      ticks: [0, 60, 120, 180, 240, 300],
      axisLine: false,
      tickLine: false,
      tick: { fontSize: 12, fontWeight: 'bold' },
    },
    barProps: { maxBarSize: 32 },
  },
  render: (args) => <BarChart {...args} />,
}

/**
 * Mobile-tuned stack — same data + props as `BarChartStackedFixedYAxis`,
 * but sized for a narrow viewport: smaller bars, smaller font, slimmer
 * margins, legend hidden (consumers usually render it as a separate row
 * above the chart on mobile to save vertical space).
 *
 * Storybook lets you wrap a story in a viewport — the args here are the
 * mobile-mode props the consumer would feed when window width is below
 * the design breakpoint.
 */
export const BarChartStackedMobile: StoryObj<typeof BarChart> = {
  args: {
    data: stackedExamData.slice(0, 3),
    dataKey: 'PHYSICS',
    dataKeys: [
      { dataKey: 'PHYSICS', stackId: 'a', fill: subjectColors.PHYSICS, name: 'Physics' },
      { dataKey: 'CHEMISTRY', stackId: 'a', fill: subjectColors.CHEMISTRY, name: 'Chemistry' },
      { dataKey: 'MATHEMATICS', stackId: 'a', fill: subjectColors.MATHEMATICS, name: 'Maths' },
    ],
    height: 240,
    showGrid: false,
    showLegend: false,
    margin: { top: 8, right: 4, left: -16, bottom: 0 },
    xAxis: { dataKey: 'name', axisLine: false, tickLine: false, tick: { fontSize: 10 } },
    yAxis: {
      domain: [0, 300],
      ticks: [0, 100, 200, 300],
      axisLine: false,
      tickLine: false,
      tick: { fontSize: 10 },
    },
    barProps: { radius: 8, maxBarSize: 16 },
    tooltip: {
      cursor: { fill: 'var(--muted)', opacity: 0.5 },
    },
  },
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 360, maxWidth: '100%', padding: 8 }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => <BarChart {...args} />,
}

/**
 * Custom hover cursor — proves the new `tooltip.cursor` prop. Set to
 * `false` here to disable the gray cursor rect entirely; consumers who
 * want a different shade can pass `{ fill: '...', opacity: 0.5 }`.
 */
export const BarChartStackedCursorDisabled: StoryObj<typeof BarChart> = {
  args: {
    data: stackedExamData,
    dataKey: 'PHYSICS',
    dataKeys: [
      { dataKey: 'PHYSICS', stackId: 'a', fill: subjectColors.PHYSICS, name: 'Physics' },
      { dataKey: 'CHEMISTRY', stackId: 'a', fill: subjectColors.CHEMISTRY, name: 'Chemistry' },
      { dataKey: 'MATHEMATICS', stackId: 'a', fill: subjectColors.MATHEMATICS, name: 'Maths' },
    ],
    height: 320,
    showGrid: false,
    showLegend: true,
    xAxis: { dataKey: 'name', axisLine: false, tickLine: false, tick: { fontSize: 12, fontWeight: 'bold' } },
    yAxis: { axisLine: false, tickLine: false, tick: { fontSize: 12, fontWeight: 'bold' } },
    barProps: { radius: 12, maxBarSize: 28 },
    tooltip: {
      cursor: false,
    },
  },
  render: (args) => <BarChart {...args} />,
}

/**
 * Mixed: stacked bars whose Y-axis range adapts to the dataset (auto)
 * — useful for "Custom" exam types where total marks aren't fixed.
 */
export const BarChartStackedAutoRange: StoryObj<typeof BarChart> = {
  args: {
    data: stackedExamData,
    dataKey: 'PHYSICS',
    dataKeys: [
      { dataKey: 'PHYSICS', stackId: 'a', fill: subjectColors.PHYSICS, name: 'Physics' },
      { dataKey: 'CHEMISTRY', stackId: 'a', fill: subjectColors.CHEMISTRY, name: 'Chemistry' },
      { dataKey: 'MATHEMATICS', stackId: 'a', fill: subjectColors.MATHEMATICS, name: 'Maths' },
    ],
    height: 320,
    showGrid: false,
    showLegend: true,
    xAxis: { dataKey: 'name', axisLine: false, tickLine: false, tick: { fontSize: 12 } },
    yAxis: { domain: [0, 'auto'] as any, axisLine: false, tickLine: false, tick: { fontSize: 12 } },
    barProps: { radius: 12, maxBarSize: 28 },
  },
  render: (args) => <BarChart {...args} />,
}

export default barMeta