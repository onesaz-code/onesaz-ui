import type { Meta, StoryObj } from '@storybook/react'
import { LineChart } from '@onesaz/ui'

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

// Line Chart Stories
const lineMeta: Meta<typeof LineChart> = {
  title: 'Components/Charts/LineChart',
  component: LineChart,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export const LineChartDefault: StoryObj<typeof LineChart> = {
  args: {
    data: barData,
    dataKey: 'value',
    height: 300,
    showGrid: true,
    showTooltip: true,
    xAxis: { dataKey: 'name' },
  },
}

export const LineChartMultiple: StoryObj<typeof LineChart> = {
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
}

export default lineMeta