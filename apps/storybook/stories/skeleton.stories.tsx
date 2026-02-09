import type { Meta, StoryObj } from '@storybook/react'
import { Skeleton, SkeletonText, SkeletonAvatar, SkeletonCard, SkeletonTableRow } from '@onesaz/ui'

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'circular', 'rectangular', 'rounded'],
    },
    animation: {
      control: 'select',
      options: ['pulse', 'wave', 'none'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Skeleton>

export const Default: Story = {
  args: {
    width: 200,
    height: 20,
  },
}

export const Variants: Story = {
  render: () => (
    <div className="space-y-4 w-[300px]">
      <Skeleton variant="text" width="100%" />
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="rectangular" width="100%" height={100} />
      <Skeleton variant="rounded" width="100%" height={100} />
    </div>
  ),
}

export const Animations: Story = {
  render: () => (
    <div className="space-y-4 w-[300px]">
      <div>
        <p className="text-sm text-muted-foreground mb-2">Pulse (default)</p>
        <Skeleton animation="pulse" width="100%" height={20} />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Wave</p>
        <Skeleton animation="wave" width="100%" height={20} />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">None</p>
        <Skeleton animation="none" width="100%" height={20} />
      </div>
    </div>
  ),
}

export const TextSkeleton: Story = {
  render: () => (
    <div className="w-[300px]">
      <SkeletonText lines={3} />
    </div>
  ),
}

export const TextSkeletonVariations: Story = {
  render: () => (
    <div className="space-y-8 w-[300px]">
      <div>
        <p className="text-sm text-muted-foreground mb-2">Default (3 lines)</p>
        <SkeletonText />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">5 lines, last line 80%</p>
        <SkeletonText lines={5} lastLineWidth={80} />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Large gap</p>
        <SkeletonText lines={3} gap="lg" />
      </div>
    </div>
  ),
}

export const AvatarSkeleton: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <SkeletonAvatar size="xs" />
      <SkeletonAvatar size="sm" />
      <SkeletonAvatar size="md" />
      <SkeletonAvatar size="lg" />
      <SkeletonAvatar size="xl" />
    </div>
  ),
}

export const CardSkeleton: Story = {
  render: () => (
    <div className="w-[300px]">
      <SkeletonCard />
    </div>
  ),
}

export const CardSkeletonVariations: Story = {
  render: () => (
    <div className="flex gap-4">
      <div className="w-[250px]">
        <p className="text-sm text-muted-foreground mb-2">With image</p>
        <SkeletonCard hasImage />
      </div>
      <div className="w-[250px]">
        <p className="text-sm text-muted-foreground mb-2">Without image</p>
        <SkeletonCard hasImage={false} />
      </div>
    </div>
  ),
}

export const TableRowSkeleton: Story = {
  render: () => (
    <div className="w-[500px] border rounded-lg p-4">
      <SkeletonTableRow columns={4} />
      <SkeletonTableRow columns={4} />
      <SkeletonTableRow columns={4} />
    </div>
  ),
}

export const CompleteExample: Story = {
  render: () => (
    <div className="w-[400px] p-4 border rounded-lg space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <SkeletonAvatar size="lg" />
        <div className="flex-1">
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="40%" className="mt-2" />
        </div>
      </div>
      {/* Content */}
      <SkeletonText lines={4} />
      {/* Actions */}
      <div className="flex gap-2">
        <Skeleton variant="rounded" width={80} height={36} />
        <Skeleton variant="rounded" width={80} height={36} />
      </div>
    </div>
  ),
}
