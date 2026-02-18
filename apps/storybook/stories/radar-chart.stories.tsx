import type { Meta, StoryObj } from '@storybook/react'
import { RadarChart } from '@onesaz/ui'

// Sample data
const radarData = [
  { name: 'Speed', value: 120 },
  { name: 'Accuracy', value: 110 },
  { name: 'Power', value: 99 },
  { name: 'Defense', value: 130 },
  { name: 'Agility', value: 105 },
]

// Radar Chart Stories
const radarMeta: Meta<typeof RadarChart> = {
  title: 'Components/Charts/RadarChart',
  component: RadarChart,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export const RadarChartDefault: StoryObj<typeof RadarChart> = {
  args: {
    data: radarData,
    dataKey: 'value',
    nameKey: 'name',
    height: 300,
    showTooltip: true,
  },
}

export default radarMeta