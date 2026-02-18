import type { Meta, StoryObj } from '@storybook/react'
import { ProgressDonut } from '@onesaz/ui'

const meta: Meta<typeof ProgressDonut> = {
  title: 'Components/Charts/ProgressDonut',
  component: ProgressDonut,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof ProgressDonut> = {
  args: {
    data: [
      { value: 75, label: 'Q1' },
      { value: 45, label: 'Q2' },
      { value: 85, label: 'Q3' },
      { value: 25, label: 'Q4' },
    ],
    width: 300,
    height: 300,
    innerRadius: 60,
    outerRadius: 80,
    showTooltip: true,
    showLegend: false,
  },
}

export const CustomColors: StoryObj<typeof ProgressDonut> = {
  args: {
    data: [
      { value: 90, label: 'Success' },
      { value: 60, label: 'Warning' },
      { value: 30, label: 'Error' },
      { value: 10, label: 'Critical' },
    ],
    width: 400,
    height: 400,
    innerRadius: 80,
    outerRadius: 100,
    getColor: (value: number) => {
      if (value >= 80) return '#22c55e' // Green
      if (value >= 60) return '#eab308' // Yellow
      if (value >= 40) return '#f97316' // Orange
      return '#ef4444' // Red
    },
    showTooltip: true,
    showLegend: true,
  },
}

export const NoTooltip: StoryObj<typeof ProgressDonut> = {
  args: {
    data: [
      { value: 65, label: 'CPU' },
      { value: 80, label: 'Memory' },
      { value: 45, label: 'Disk' },
    ],
    width: 350,
    height: 350,
    innerRadius: 70,
    outerRadius: 90,
    showTooltip: false,
    showLegend: false,
  },
}

export const SystemMetrics: StoryObj<typeof ProgressDonut> = {
  args: {
    data: [
      { value: 85, label: 'CPU Usage' },
      { value: 72, label: 'Memory' },
      { value: 45, label: 'Disk Space' },
      { value: 91, label: 'Network' },
      { value: 38, label: 'Temperature' },
      { value: 67, label: 'Power' },
    ],
    width: 500,
    height: 500,
    innerRadius: 100,
    outerRadius: 120,
    showTooltip: true,
    showLegend: true,
  },
}

export const Large: StoryObj<typeof ProgressDonut> = {
  args: {
    data: [
      { value: 88, label: 'Project A' },
      { value: 42, label: 'Project B' },
      { value: 73, label: 'Project C' },
    ],
    width: 600,
    height: 600,
    innerRadius: 150,
    outerRadius: 180,
    showTooltip: true,
    showLegend: true,
  },
}