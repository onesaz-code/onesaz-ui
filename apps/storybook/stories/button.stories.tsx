import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@onesaz/ui'

const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" x2="12" y1="15" y2="3" />
  </svg>
)

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
)

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
)

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
    color: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'destructive'],
    },
    loading: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Button>

// ── Existing variants (backward-compatible) ────────────────────────────────

export const Default: Story = {
  args: { children: 'Button', variant: 'default' },
}

export const Destructive: Story = {
  args: { children: 'Delete', variant: 'destructive' },
}

export const Outline: Story = {
  args: { children: 'Outline', variant: 'outline' },
}

export const Secondary: Story = {
  args: { children: 'Secondary', variant: 'secondary' },
}

export const Ghost: Story = {
  args: { children: 'Ghost', variant: 'ghost' },
}

export const Link: Story = {
  args: { children: 'Link', variant: 'link' },
}

export const Small: Story = {
  args: { children: 'Small', size: 'sm' },
}

export const Large: Story = {
  args: { children: 'Large', size: 'lg' },
}

export const Disabled: Story = {
  args: { children: 'Disabled', disabled: true },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button>Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">
        <PlusIcon />
      </Button>
    </div>
  ),
}

// ── Loading ────────────────────────────────────────────────────────────────

export const Loading: Story = {
  args: { children: 'Saving…', loading: true },
}

export const LoadingVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button loading>Default</Button>
      <Button variant="outline" loading>Outline</Button>
      <Button variant="secondary" loading>Secondary</Button>
      <Button variant="ghost" loading>Ghost</Button>
    </div>
  ),
}

// ── Icons ──────────────────────────────────────────────────────────────────

export const WithStartIcon: Story = {
  args: {
    children: 'Add Item',
    startIcon: <PlusIcon />,
  },
}

export const WithEndIcon: Story = {
  args: {
    children: 'Continue',
    endIcon: <ArrowRightIcon />,
  },
}

export const WithBothIcons: Story = {
  args: {
    children: 'Download',
    startIcon: <DownloadIcon />,
    endIcon: <ArrowRightIcon />,
  },
}

export const IconSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm" startIcon={<PlusIcon />}>Small</Button>
      <Button size="default" startIcon={<PlusIcon />}>Default</Button>
      <Button size="lg" startIcon={<PlusIcon />}>Large</Button>
    </div>
  ),
}

// ── Color prop ─────────────────────────────────────────────────────────────

export const Colors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button color="default">Default</Button>
      <Button color="success">Success</Button>
      <Button color="warning">Warning</Button>
      <Button color="error">Error</Button>
      <Button color="destructive">Destructive</Button>
    </div>
  ),
}

export const ColorsOutline: Story = {
  name: 'Colors – Outline',
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="outline" color="default">Default</Button>
      <Button variant="outline" color="success">Success</Button>
      <Button variant="outline" color="warning">Warning</Button>
      <Button variant="outline" color="error">Error</Button>
      <Button variant="outline" color="destructive">Destructive</Button>
    </div>
  ),
}

export const ColorsGhost: Story = {
  name: 'Colors – Ghost',
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="ghost" color="default">Default</Button>
      <Button variant="ghost" color="success">Success</Button>
      <Button variant="ghost" color="warning">Warning</Button>
      <Button variant="ghost" color="error">Error</Button>
      <Button variant="ghost" color="destructive">Destructive</Button>
    </div>
  ),
}

export const ColorsSecondary: Story = {
  name: 'Colors – Secondary',
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="secondary" color="default">Default</Button>
      <Button variant="secondary" color="success">Success</Button>
      <Button variant="secondary" color="warning">Warning</Button>
      <Button variant="secondary" color="error">Error</Button>
      <Button variant="secondary" color="destructive">Destructive</Button>
    </div>
  ),
}

export const ColorsLink: Story = {
  name: 'Colors – Link',
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="link" color="default">Default</Button>
      <Button variant="link" color="success">Success</Button>
      <Button variant="link" color="warning">Warning</Button>
      <Button variant="link" color="error">Error</Button>
      <Button variant="link" color="destructive">Destructive</Button>
    </div>
  ),
}

// ── Combined ───────────────────────────────────────────────────────────────

export const ColorWithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button color="success" startIcon={<PlusIcon />}>Add</Button>
      <Button color="error" variant="outline" endIcon={<ArrowRightIcon />}>Remove</Button>
      <Button color="warning" variant="secondary" startIcon={<DownloadIcon />}>Export</Button>
    </div>
  ),
}

export const LoadingWithColor: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button color="success" loading>Saving</Button>
      <Button color="error" variant="outline" loading>Deleting</Button>
      <Button color="warning" variant="secondary" loading>Processing</Button>
    </div>
  ),
}
