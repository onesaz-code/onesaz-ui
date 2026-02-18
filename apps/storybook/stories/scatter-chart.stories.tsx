import type { Meta, StoryObj } from '@storybook/react'
import { ScatterChart } from '@onesaz/ui'

// Sample data
const scatterData = [
  { x: 100, y: 200 },
  { x: 120, y: 100 },
  { x: 170, y: 300 },
  { x: 140, y: 250 },
  { x: 150, y: 400 },
  { x: 110, y: 280 },
]

// Scatter Chart Stories
const scatterMeta: Meta<typeof ScatterChart> = {
  title: 'Components/Charts/ScatterChart',
  component: ScatterChart,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export const ScatterChartDefault: StoryObj<typeof ScatterChart> = {
  args: {
    data: scatterData,
    xDataKey: 'x',
    yDataKey: 'y',
    height: 300,
    showGrid: true,
    showTooltip: true,
  },
}

export default scatterMeta