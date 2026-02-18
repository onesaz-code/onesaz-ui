import type { Meta, StoryObj } from '@storybook/react'
import { AreaChart } from '@onesaz/ui'

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

// Area Chart Stories
const areaMeta: Meta<typeof AreaChart> = {
  title: 'Components/Charts/AreaChart',
  component: AreaChart,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export const AreaChartDefault: StoryObj<typeof AreaChart> = {
  args: {
    data: barData,
    dataKey: 'value',
    height: 300,
    showGrid: true,
    showTooltip: true,
    xAxis: { dataKey: 'name' },
  },
}

export const AreaChartStacked: StoryObj<typeof AreaChart> = {
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
    stack: true,
    xAxis: { dataKey: 'name' },
  },
}

export default areaMeta