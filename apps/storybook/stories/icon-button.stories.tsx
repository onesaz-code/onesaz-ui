import type { Meta, StoryObj } from '@storybook/react'
import { IconButton } from '@onesaz/ui'

// Icons as inline SVGs
const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
)

const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
  </svg>
)

const EditIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
)

const SettingsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
)

const meta: Meta<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
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
      options: ['xs', 'sm', 'md', 'lg'],
    },
    rounded: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof IconButton>

export const Default: Story = {
  args: {
    'aria-label': 'Add item',
    children: <PlusIcon />,
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <IconButton aria-label="Add" variant="default">
        <PlusIcon />
      </IconButton>
      <IconButton aria-label="Delete" variant="destructive">
        <TrashIcon />
      </IconButton>
      <IconButton aria-label="Edit" variant="outline">
        <EditIcon />
      </IconButton>
      <IconButton aria-label="Settings" variant="secondary">
        <SettingsIcon />
      </IconButton>
      <IconButton aria-label="Add" variant="ghost">
        <PlusIcon />
      </IconButton>
      <IconButton aria-label="Edit" variant="link">
        <EditIcon />
      </IconButton>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <IconButton aria-label="Extra small" size="xs">
        <PlusIcon />
      </IconButton>
      <IconButton aria-label="Small" size="sm">
        <PlusIcon />
      </IconButton>
      <IconButton aria-label="Medium" size="md">
        <PlusIcon />
      </IconButton>
      <IconButton aria-label="Large" size="lg">
        <PlusIcon />
      </IconButton>
    </div>
  ),
}

export const Rounded: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <IconButton aria-label="Add" rounded>
        <PlusIcon />
      </IconButton>
      <IconButton aria-label="Delete" variant="destructive" rounded>
        <TrashIcon />
      </IconButton>
      <IconButton aria-label="Edit" variant="outline" rounded>
        <EditIcon />
      </IconButton>
      <IconButton aria-label="Settings" variant="secondary" rounded>
        <SettingsIcon />
      </IconButton>
    </div>
  ),
}

export const RoundedSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <IconButton aria-label="Extra small" size="xs" rounded variant="outline">
        <PlusIcon />
      </IconButton>
      <IconButton aria-label="Small" size="sm" rounded variant="outline">
        <PlusIcon />
      </IconButton>
      <IconButton aria-label="Medium" size="md" rounded variant="outline">
        <PlusIcon />
      </IconButton>
      <IconButton aria-label="Large" size="lg" rounded variant="outline">
        <PlusIcon />
      </IconButton>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <IconButton aria-label="Add" disabled>
        <PlusIcon />
      </IconButton>
      <IconButton aria-label="Delete" variant="destructive" disabled>
        <TrashIcon />
      </IconButton>
      <IconButton aria-label="Edit" variant="outline" disabled>
        <EditIcon />
      </IconButton>
    </div>
  ),
}

export const ActionBar: Story = {
  render: () => (
    <div className="flex items-center gap-1 p-2 border rounded-lg bg-card">
      <IconButton aria-label="Edit" variant="ghost" size="sm">
        <EditIcon />
      </IconButton>
      <IconButton aria-label="Settings" variant="ghost" size="sm">
        <SettingsIcon />
      </IconButton>
      <div className="w-px h-6 bg-border mx-1" />
      <IconButton aria-label="Delete" variant="ghost" size="sm">
        <TrashIcon />
      </IconButton>
    </div>
  ),
}
