import type { Meta, StoryObj } from '@storybook/react'
import { RangeSlider } from '@onesaz/ui'
import { useState } from 'react'

const meta: Meta<typeof RangeSlider> = {
  title: 'Components/RangeSlider',
  component: RangeSlider,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof RangeSlider> = {
  args: {
    min: 0,
    max: 100,
    value: [20, 80],
    step: 1,
  },
  render: (args) => {
    const [value, setValue] = useState<[number, number]>(args.value || [20, 80])
    return (
      <div className="w-80">
        <RangeSlider {...args} value={value} onChange={setValue} />
      </div>
    )
  },
}

export const WithCustomLabels: StoryObj<typeof RangeSlider> = {
  args: {
    min: 0,
    max: 300,
    value: [50, 200],
    step: 10,
    minLabel: 'From',
    maxLabel: 'To',
  },
  render: (args) => {
    const [value, setValue] = useState<[number, number]>(args.value || [50, 200])
    return (
      <div className="w-80">
        <RangeSlider {...args} value={value} onChange={setValue} />
      </div>
    )
  },
}

export const MarksRange: StoryObj<typeof RangeSlider> = {
  args: {
    min: 0,
    max: 720,
    value: [100, 500],
    step: 10,
    minLabel: 'Min Marks',
    maxLabel: 'Max Marks',
    showValues: true,
    valuePosition: 'top',
  },
  render: (args) => {
    const [value, setValue] = useState<[number, number]>(args.value || [100, 500])
    return (
      <div className="w-96">
        <h3 className="text-sm font-medium mb-4">Distribution Range</h3>
        <RangeSlider {...args} value={value} onChange={setValue} />
      </div>
    )
  },
}

export const PercentageRange: StoryObj<typeof RangeSlider> = {
  args: {
    min: 0,
    max: 100,
    value: [25, 75],
    step: 5,
    minLabel: 'Min %',
    maxLabel: 'Max %',
    valueFormatter: (val) => `${val}%`,
  },
  render: (args) => {
    const [value, setValue] = useState<[number, number]>(args.value || [25, 75])
    return (
      <div className="w-80">
        <RangeSlider {...args} value={value} onChange={setValue} />
      </div>
    )
  },
}

export const LabelsOnBottom: StoryObj<typeof RangeSlider> = {
  args: {
    min: 0,
    max: 1000,
    value: [200, 800],
    step: 50,
    showValues: true,
    valuePosition: 'bottom',
  },
  render: (args) => {
    const [value, setValue] = useState<[number, number]>(args.value || [200, 800])
    return (
      <div className="w-80">
        <RangeSlider {...args} value={value} onChange={setValue} />
      </div>
    )
  },
}

export const PriceRange: StoryObj<typeof RangeSlider> = {
  args: {
    min: 0,
    max: 10000,
    value: [1000, 5000],
    step: 100,
    minLabel: 'Min Price',
    maxLabel: 'Max Price',
    valueFormatter: (val) => `₹${val.toLocaleString()}`,
  },
  render: (args) => {
    const [value, setValue] = useState<[number, number]>(args.value || [1000, 5000])
    return (
      <div className="w-96">
        <h3 className="text-sm font-medium mb-4">Price Filter</h3>
        <RangeSlider {...args} value={value} onChange={setValue} />
      </div>
    )
  },
}

export const Disabled: StoryObj<typeof RangeSlider> = {
  args: {
    min: 0,
    max: 100,
    value: [30, 70],
    disabled: true,
  },
  render: (args) => (
    <div className="w-80">
      <RangeSlider {...args} />
    </div>
  ),
}
