import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from '@onesaz/ui'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'destructive'],
    },
    variant: {
      control: 'select',
      options: ['contained', 'outlined', 'text'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {
  args: { children: 'Badge', color: 'default', variant: 'contained' },
}

// ─── Contained ────────────────────────────────────────────────────────────────

export const Contained: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge color="default">Default</Badge>
      <Badge color="success">Success</Badge>
      <Badge color="warning">Warning</Badge>
      <Badge color="error">Error</Badge>
      <Badge color="destructive">Destructive</Badge>
    </div>
  ),
}

// ─── Outlined ─────────────────────────────────────────────────────────────────

export const Outlined: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge color="default" variant="outlined">Default</Badge>
      <Badge color="success" variant="outlined">Success</Badge>
      <Badge color="warning" variant="outlined">Warning</Badge>
      <Badge color="error" variant="outlined">Error</Badge>
      <Badge color="destructive" variant="outlined">Destructive</Badge>
    </div>
  ),
}

// ─── Text ─────────────────────────────────────────────────────────────────────

export const Text: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge color="default" variant="text">Default</Badge>
      <Badge color="success" variant="text">Success</Badge>
      <Badge color="warning" variant="text">Warning</Badge>
      <Badge color="error" variant="text">Error</Badge>
      <Badge color="destructive" variant="text">Destructive</Badge>
    </div>
  ),
}

// ─── All ──────────────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      {(['contained', 'outlined', 'text'] as const).map((variant) => (
        <div key={variant} className="flex flex-wrap gap-2 items-center">
          <span className="text-xs text-muted-foreground w-20 capitalize shrink-0">{variant}</span>
          <Badge color="default" variant={variant}>Default</Badge>
          <Badge color="success" variant={variant}>Success</Badge>
          <Badge color="warning" variant={variant}>Warning</Badge>
          <Badge color="error" variant={variant}>Error</Badge>
          <Badge color="destructive" variant={variant}>Destructive</Badge>
        </div>
      ))}
    </div>
  ),
}

// ─── Real-world ───────────────────────────────────────────────────────────────

export const RealWorld: Story = {
  render: () => (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-sm text-foreground">Order #1042</span>
        <Badge color="success">Paid</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-foreground">Order #1043</span>
        <Badge color="warning" variant="outlined">Pending</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-foreground">Order #1044</span>
        <Badge color="error" variant="outlined">Failed</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-foreground">Submission</span>
        <Badge color="destructive" variant="text">Overdue</Badge>
      </div>
    </div>
  ),
}
