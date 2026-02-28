import type { Meta, StoryObj } from '@storybook/react'
import { PackedBubbleChart } from '@onesaz/ui'

// Sample data - question error percentages
const errorData = [
  { name: 'Q1', value: 75, color: '#F70000' },
  { name: 'Q2', value: 45, color: '#FF91A5' },
  { name: 'Q3', value: 60, color: '#F70000' },
  { name: 'Q4', value: 30, color: '#FF91A5' },
  { name: 'Q5', value: 85, color: '#F70000' },
  { name: 'Q6', value: 25, color: '#FF91A5' },
  { name: 'Q7', value: 55, color: '#F70000' },
  { name: 'Q8', value: 40, color: '#FF91A5' },
]

const simpleData = [
  { name: 'A', value: 100 },
  { name: 'B', value: 80 },
  { name: 'C', value: 60 },
  { name: 'D', value: 40 },
  { name: 'E', value: 20 },
]

const meta: Meta<typeof PackedBubbleChart> = {
  title: 'Components/Charts/PackedBubbleChart',
  component: PackedBubbleChart,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    onBubbleClick: { action: 'bubbleClicked' },
  },
}

export default meta
type Story = StoryObj<typeof PackedBubbleChart>

export const Default: Story = {
  args: {
    data: simpleData,
    title: 'Simple Packed Bubbles',
    height: 300,
    showLabels: true,
  },
}

export const ErrorAnalysis: Story = {
  args: {
    data: errorData,
    title: 'Error Analysis - Question Distribution',
    height: 300,
    showLabels: true,
    showValues: false,
  },
}

export const WithValues: Story = {
  args: {
    data: errorData,
    title: 'Error Percentage by Question',
    height: 350,
    showLabels: true,
    showValues: true,
  },
}

export const ColorByValue: Story = {
  args: {
    data: simpleData.map(({ name, value }) => ({ name, value })),
    title: 'Color Based on Value',
    height: 300,
    showLabels: true,
    colorByValue: (value: number) => (value > 50 ? '#F70000' : '#3BBDED'),
  },
}

export const CustomSizes: Story = {
  args: {
    data: errorData,
    title: 'Custom Min/Max Sizes',
    height: 400,
    minSize: 20,
    maxSize: 80,
    showLabels: true,
  },
}

export const Interactive: Story = {
  args: {
    data: errorData,
    title: 'Click on bubbles',
    height: 300,
    showLabels: true,
    showValues: true,
  },
}

export const LargeDataset: Story = {
  args: {
    data: Array.from({ length: 20 }, (_, i) => ({
      name: `Q${i + 1}`,
      value: Math.floor(Math.random() * 100),
    })),
    title: 'Large Dataset - 20 Questions',
    height: 400,
    showLabels: true,
    colorByValue: (value: number) => {
      if (value >= 70) return '#F70000'
      if (value >= 40) return '#FFA500'
      return '#4CAF50'
    },
  },
}
