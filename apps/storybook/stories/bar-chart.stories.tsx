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
}

export default barMeta