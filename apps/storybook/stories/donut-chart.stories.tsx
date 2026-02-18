import type { Meta, StoryObj } from '@storybook/react'
import { DonutChart } from '@onesaz/ui'

// Sample data
const pieData = [
  { name: 'Desktop', value: 400 },
  { name: 'Mobile', value: 300 },
  { name: 'Tablet', value: 200 },
  { name: 'Other', value: 100 },
]

// Donut Chart Stories
const meta: Meta<typeof DonutChart> = {
  title: 'Components/Charts/DonutChart',
  component: DonutChart,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export const DonutChartDefault: StoryObj<typeof DonutChart> = {
  args: {
    data: pieData,
    dataKey: 'value',
    nameKey: 'name',
    height: 300,
    showTooltip: true,
  },
}

export const DonutChartAdvanced: StoryObj<typeof DonutChart> = {
  args: {
    data: pieData,
    dataKey: 'value',
    nameKey: 'name',
    height: 300,
    showTooltip: true,
    innerRadius: 60,
    outerRadius: 120,
    advancedStyling: {
      enableGradients: true,
      enableShadows: true,
    },
  },
}

export const DonutChartWithLabels: StoryObj<typeof DonutChart> = {
  args: {
    data: pieData,
    dataKey: 'value',
    nameKey: 'name',
    height: 300,
    showTooltip: true,
    tooltip: {
      formatter: (value: any, name: string) => [`${value}%`, name],
    },
  },
}

export default meta