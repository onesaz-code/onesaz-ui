import type { Meta, StoryObj } from '@storybook/react'
import { Spinner, Button } from '@onesaz/ui'

const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Spinner>

export const Default: Story = {
  args: {},
}

export const Small: Story = {
  args: {
    size: 'sm',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Spinner size="sm" />
      <Spinner size="default" />
      <Spinner size="lg" />
    </div>
  ),
}

export const WithButton: Story = {
  render: () => (
    <Button disabled>
      <Spinner size="sm" className="mr-2" />
      Loading...
    </Button>
  ),
}
