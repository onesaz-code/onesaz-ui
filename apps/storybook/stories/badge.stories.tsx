import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from '@onesaz/ui'

const BADGE_COLORS = [
  'default',
  'success',
  'warning',
  'error',
  'destructive',
  'info',
  'normal',
  'archived',
] as const

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: BADGE_COLORS,
    },
    variant: {
      control: 'select',
      options: ['contained', 'outlined', 'text'],
    },
    bg: {
      control: 'boolean',
      description: 'Soft filled background for outlined variant (bold text)',
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
      {BADGE_COLORS.map((color) => (
        <Badge key={color} color={color}>
          {color.charAt(0).toUpperCase() + color.slice(1)}
        </Badge>
      ))}
    </div>
  ),
}

// ─── Outlined ─────────────────────────────────────────────────────────────────

export const Outlined: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {BADGE_COLORS.map((color) => (
        <Badge key={color} color={color} variant="outlined">
          {color.charAt(0).toUpperCase() + color.slice(1)}
        </Badge>
      ))}
    </div>
  ),
}

// ─── Outlined with bg (soft filled) ───────────────────────────────────────────

export const OutlinedWithBg: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {BADGE_COLORS.map((color) => (
          <Badge key={color} color={color} variant="outlined" bg>
            {color.charAt(0).toUpperCase() + color.slice(1)}
          </Badge>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        Use <code>bg</code> with <code>variant=&quot;outlined&quot;</code> for a light filled background and bold text.
      </p>
    </div>
  ),
}

// ─── Text ─────────────────────────────────────────────────────────────────────

export const Text: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {BADGE_COLORS.map((color) => (
        <Badge key={color} color={color} variant="text">
          {color.charAt(0).toUpperCase() + color.slice(1)}
        </Badge>
      ))}
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
          {BADGE_COLORS.map((color) => (
            <Badge key={color} color={color} variant={variant}>
              {color.charAt(0).toUpperCase() + color.slice(1)}
            </Badge>
          ))}
        </div>
      ))}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-xs text-muted-foreground w-20 shrink-0">outlined + bg</span>
        {BADGE_COLORS.map((color) => (
          <Badge key={color} color={color} variant="outlined" bg>
            {color.charAt(0).toUpperCase() + color.slice(1)}
          </Badge>
        ))}
      </div>
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
      <div className="flex items-center gap-2">
        <span className="text-sm text-foreground">Announcement</span>
        <Badge color="success" variant="outlined" bg>Published</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-foreground">Priority</span>
        <Badge color="normal" variant="outlined" bg>Normal</Badge>
        <Badge color="archived" variant="outlined" bg>Archived</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-foreground">Notice</span>
        <Badge color="info" variant="outlined" bg>Info</Badge>
      </div>
    </div>
  ),
}
