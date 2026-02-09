import type { Meta, StoryObj } from '@storybook/react'
import { useState, useEffect } from 'react'
import { LinearProgress, CircularProgress, Progress } from '@onesaz/ui'

const meta: Meta<typeof LinearProgress> = {
  title: 'Components/Progress',
  component: LinearProgress,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
}

export default meta
type Story = StoryObj<typeof LinearProgress>

export const Default: Story = {
  args: {
    value: 60,
  },
  render: (args) => (
    <div className="w-[300px]">
      <LinearProgress {...args} />
    </div>
  ),
}

export const LinearDeterminate: Story = {
  render: () => (
    <div className="w-[300px] space-y-4">
      <LinearProgress value={25} />
      <LinearProgress value={50} />
      <LinearProgress value={75} />
      <LinearProgress value={100} />
    </div>
  ),
}

export const LinearIndeterminate: Story = {
  render: () => (
    <div className="w-[300px]">
      <LinearProgress />
    </div>
  ),
}

export const LinearSizes: Story = {
  render: () => (
    <div className="w-[300px] space-y-4">
      <div>
        <p className="text-sm text-muted-foreground mb-2">Small</p>
        <LinearProgress value={60} size="sm" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Medium (default)</p>
        <LinearProgress value={60} size="md" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Large</p>
        <LinearProgress value={60} size="lg" />
      </div>
    </div>
  ),
}

export const LinearVariants: Story = {
  render: () => (
    <div className="w-[300px] space-y-4">
      <LinearProgress value={60} variant="default" />
      <LinearProgress value={60} variant="success" />
      <LinearProgress value={60} variant="warning" />
      <LinearProgress value={60} variant="error" />
      <LinearProgress value={60} variant="info" />
    </div>
  ),
}

export const LinearWithValue: Story = {
  render: () => (
    <div className="w-[300px] space-y-4">
      <LinearProgress value={45} showValue />
      <LinearProgress
        value={75}
        showValue
        formatValue={(v) => `${v}% complete`}
      />
    </div>
  ),
}

export const CircularDeterminate: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <CircularProgress value={25} />
      <CircularProgress value={50} />
      <CircularProgress value={75} />
      <CircularProgress value={100} />
    </div>
  ),
}

export const CircularIndeterminate: Story = {
  render: () => <CircularProgress />,
}

export const CircularSizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <CircularProgress value={60} size="sm" />
      <CircularProgress value={60} size="md" />
      <CircularProgress value={60} size="lg" />
      <CircularProgress value={60} size="xl" />
      <CircularProgress value={60} size={100} thickness={8} />
    </div>
  ),
}

export const CircularVariants: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <CircularProgress value={60} variant="default" />
      <CircularProgress value={60} variant="success" />
      <CircularProgress value={60} variant="warning" />
      <CircularProgress value={60} variant="error" />
      <CircularProgress value={60} variant="info" />
    </div>
  ),
}

export const CircularWithValue: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <CircularProgress value={45} showValue />
      <CircularProgress value={75} showValue size="lg" />
      <CircularProgress value={90} showValue size="xl" />
    </div>
  ),
}

export const CircularWithCustomContent: Story = {
  render: () => (
    <CircularProgress value={75} size="xl">
      <div className="text-center">
        <div className="text-lg font-bold">75%</div>
        <div className="text-xs text-muted-foreground">Complete</div>
      </div>
    </CircularProgress>
  ),
}

// Animated progress example
const AnimatedProgress = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0
        return prev + 10
      })
    }, 500)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="space-y-4">
      <div className="w-[300px]">
        <LinearProgress value={progress} showValue />
      </div>
      <div className="flex justify-center">
        <CircularProgress value={progress} showValue size="lg" />
      </div>
    </div>
  )
}

export const Animated: Story = {
  render: () => <AnimatedProgress />,
}

export const ProgressAlias: Story = {
  render: () => (
    <div className="w-[300px] space-y-4">
      <p className="text-sm text-muted-foreground">Progress is an alias for LinearProgress</p>
      <Progress value={60} />
      <Progress value={80} variant="success" showValue />
    </div>
  ),
}
