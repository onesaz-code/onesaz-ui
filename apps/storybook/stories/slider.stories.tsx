import type { Meta, StoryObj } from '@storybook/react'
import { Slider } from '@onesaz/ui'
import { useState } from 'react'

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof Slider> = {
  args: {
    min: 0,
    max: 100,
    value: 50,
    step: 1,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value)
    return (
      <div className="w-64">
        <Slider {...args} value={value} onChange={setValue} />
        <p className="mt-2 text-sm text-muted-foreground">Value: {value}</p>
      </div>
    )
  },
}

export const WithValueLabel: StoryObj<typeof Slider> = {
  args: {
    min: 0,
    max: 100,
    value: 75,
    step: 5,
    showValue: true,
    valuePosition: 'top',
  },
  render: (args) => {
    const [value, setValue] = useState(args.value)
    return (
      <div className="w-64">
        <Slider {...args} value={value} onChange={setValue} />
      </div>
    )
  },
}

export const ValueOnBottom: StoryObj<typeof Slider> = {
  args: {
    min: 0,
    max: 100,
    value: 25,
    showValue: true,
    valuePosition: 'bottom',
  },
  render: (args) => {
    const [value, setValue] = useState(args.value)
    return (
      <div className="w-64">
        <Slider {...args} value={value} onChange={setValue} />
      </div>
    )
  },
}

export const ValueOnLeft: StoryObj<typeof Slider> = {
  args: {
    min: 0,
    max: 100,
    value: 60,
    showValue: true,
    valuePosition: 'left',
  },
  render: (args) => {
    const [value, setValue] = useState(args.value)
    return (
      <div className="w-64">
        <Slider {...args} value={value} onChange={setValue} />
      </div>
    )
  },
}

export const CustomFormatter: StoryObj<typeof Slider> = {
  args: {
    min: 0,
    max: 1,
    value: 0.5,
    step: 0.1,
    showValue: true,
    valuePosition: 'top',
    valueFormatter: (value) => `${(value * 100).toFixed(0)}%`,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value)
    return (
      <div className="w-64">
        <Slider {...args} value={value} onChange={setValue} />
      </div>
    )
  },
}

export const Disabled: StoryObj<typeof Slider> = {
  args: {
    min: 0,
    max: 100,
    value: 40,
    disabled: true,
  },
  render: (args) => (
    <div className="w-64">
      <Slider {...args} />
    </div>
  ),
}

export const VolumeControl: StoryObj<typeof Slider> = {
  args: {
    min: 0,
    max: 100,
    value: 30,
    step: 1,
    showValue: true,
    valuePosition: 'right',
    valueFormatter: (value) => `${value}%`,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value)
    return (
      <div className="w-64">
        <label className="block text-sm font-medium mb-2">Volume</label>
        <Slider {...args} value={value} onChange={setValue} />
      </div>
    )
  },
}