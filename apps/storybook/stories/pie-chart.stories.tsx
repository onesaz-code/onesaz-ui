import type { Meta, StoryObj } from '@storybook/react'
import { PieChart } from '@onesaz/ui'

// Sample data
const pieData = [
  { name: 'Desktop', value: 400 },
  { name: 'Mobile', value: 300 },
  { name: 'Tablet', value: 200 },
  { name: 'Other', value: 100 },
]

// Pie Chart Stories
const pieMeta: Meta<typeof PieChart> = {
  title: 'Components/Charts/PieChart',
  component: PieChart,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export const PieChartDefault: StoryObj<typeof PieChart> = {
  args: {
    data: pieData,
    dataKey: 'value',
    nameKey: 'name',
    height: 300,
    showTooltip: true,
  },
}

export default pieMeta