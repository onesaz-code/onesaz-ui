import type { Meta, StoryObj } from '@storybook/react'
import { Avatar, AvatarGroup } from '@onesaz/ui'

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    shape: {
      control: 'select',
      options: ['circle', 'square'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Avatar>

export const Default: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    alt: 'User avatar',
  },
}

export const WithFallback: Story = {
  args: {
    fallback: 'John Doe',
  },
}

export const WithInitials: Story = {
  args: {
    fallback: 'JD',
  },
}

export const NoImageOrFallback: Story = {
  args: {},
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <Avatar size="xs" fallback="XS" />
      <Avatar size="sm" fallback="SM" />
      <Avatar size="md" fallback="MD" />
      <Avatar size="lg" fallback="LG" />
      <Avatar size="xl" fallback="XL" />
      <Avatar size="2xl" fallback="2X" />
    </div>
  ),
}

export const Shapes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar shape="circle" fallback="Circle" />
      <Avatar shape="square" fallback="Square" />
    </div>
  ),
}

export const Bordered: Story = {
  args: {
    bordered: true,
    fallback: 'BD',
  },
}

export const WithImages: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
        alt="User 1"
      />
      <Avatar
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
        alt="User 2"
      />
      <Avatar
        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
        alt="User 3"
      />
    </div>
  ),
}

export const Group: Story = {
  render: () => (
    <AvatarGroup max={3}>
      <Avatar
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
        alt="User 1"
      />
      <Avatar
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
        alt="User 2"
      />
      <Avatar
        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
        alt="User 3"
      />
      <Avatar fallback="A" />
      <Avatar fallback="B" />
    </AvatarGroup>
  ),
}

export const GroupSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <AvatarGroup size="sm">
        <Avatar fallback="A" />
        <Avatar fallback="B" />
        <Avatar fallback="C" />
      </AvatarGroup>
      <AvatarGroup size="md">
        <Avatar fallback="A" />
        <Avatar fallback="B" />
        <Avatar fallback="C" />
      </AvatarGroup>
      <AvatarGroup size="lg">
        <Avatar fallback="A" />
        <Avatar fallback="B" />
        <Avatar fallback="C" />
      </AvatarGroup>
    </div>
  ),
}
