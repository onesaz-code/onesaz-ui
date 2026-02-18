import type { Meta, StoryObj } from '@storybook/react'
import { MultiProgressDonut } from '@onesaz/ui'

const meta: Meta<typeof MultiProgressDonut> = {
  title: 'Components/Charts/MultiProgressDonut',
  component: MultiProgressDonut,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof MultiProgressDonut> = {
  args: {
    data: [
      { value: 75, label: 'Q1' },
      { value: 45, label: 'Q2' },
      { value: 85, label: 'Q3' },
      { value: 25, label: 'Q4' },
    ],
    size: 80,
    showPercentage: true,
    enableShadows: true,
    enableGradients: true,
  },
}

export const CustomColors: StoryObj<typeof MultiProgressDonut> = {
  args: {
    data: [
      { value: 90, label: 'Success' },
      { value: 60, label: 'Warning' },
      { value: 30, label: 'Error' },
      { value: 10, label: 'Critical' },
    ],
    size: 100,
    strokeWidth: 12,
    backgroundStrokeWidth: 12,
    getColor: (value: number) => {
      if (value >= 80) return ['#22c55e', '#16a34a'] // Green
      if (value >= 60) return ['#eab308', '#ca8a04'] // Yellow
      if (value >= 40) return ['#f97316', '#ea580c'] // Orange
      return ['#ef4444', '#dc2626'] // Red
    },
  },
}

export const NoShadows: StoryObj<typeof MultiProgressDonut> = {
  args: {
    data: [
      { value: 65, label: 'CPU' },
      { value: 80, label: 'Memory' },
      { value: 45, label: 'Disk' },
    ],
    size: 90,
    enableShadows: false,
    enableGradients: false,
  },
}

export const SystemMetrics: StoryObj<typeof MultiProgressDonut> = {
  args: {
    data: [
      { value: 85, label: 'CPU Usage' },
      { value: 72, label: 'Memory' },
      { value: 45, label: 'Disk Space' },
      { value: 91, label: 'Network' },
      { value: 38, label: 'Temperature' },
      { value: 67, label: 'Power' },
    ],
    size: 120,
    strokeWidth: 10,
    backgroundStrokeWidth: 10,
    showPercentage: true,
    enableShadows: true,
    enableGradients: true,
  },
}

export const Large: StoryObj<typeof MultiProgressDonut> = {
  args: {
    data: [
      { value: 88, label: 'Project A' },
      { value: 42, label: 'Project B' },
      { value: 73, label: 'Project C' },
    ],
    size: 140,
    strokeWidth: 14,
    backgroundStrokeWidth: 14,
    showPercentage: true,
    enableShadows: true,
    enableGradients: true,
  },
}