import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  Popover,
  Popper,
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
  Button,
  Input,
  Label,
} from '@onesaz/ui'

const InfoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4M12 8h.01" />
  </svg>
)

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
)

// ============================================================================
// Meta
// ============================================================================

const meta: Meta<typeof Popover> = {
  title: 'Overlays/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
    },
    modal: { control: 'boolean' },
    showArrow: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Popover>

// ============================================================================
// Stories
// ============================================================================

export const Default: Story = {
  args: {
    side: 'bottom',
    align: 'center',
    modal: false,
    showArrow: false,
    content: (
      <div className="space-y-1">
        <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Popover title</p>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          This is a non-blocking popover. The page stays scrollable.
        </p>
      </div>
    ),
  },
  render: (args) => (
    <Popover {...args}>
      <Button variant="outline">Open Popover</Button>
    </Popover>
  ),
}

export const WithArrow: Story = {
  render: () => (
    <Popover
      showArrow
      side="top"
      content={
        <p className="text-sm text-neutral-700 dark:text-neutral-300">
          Popover with an arrow pointing to the trigger.
        </p>
      }
    >
      <Button variant="outline">With Arrow</Button>
    </Popover>
  ),
}

export const ModalMode: Story = {
  name: 'Modal mode (scroll locked)',
  render: () => (
    <Popover
      modal
      content={
        <div className="space-y-3 w-56">
          <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
            Modal Popover
          </p>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Scroll is locked and focus is trapped while this is open.
          </p>
          <Button size="sm" className="w-full">Confirm</Button>
        </div>
      }
    >
      <Button>Open Modal Popover</Button>
    </Popover>
  ),
}

export const Placements: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      {(['top', 'bottom', 'left', 'right'] as const).map((side) => (
        <Popover
          key={side}
          side={side}
          showArrow
          content={<p className="text-sm text-neutral-700 dark:text-neutral-300">side="{side}"</p>}
        >
          <Button variant="outline" size="sm">
            {side}
          </Button>
        </Popover>
      ))}
    </div>
  ),
}

export const WithForm: Story = {
  render: () => (
    <Popover
      side="bottom"
      align="start"
      content={
        <div className="space-y-3 w-64">
          <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            Edit profile
          </p>
          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue="John Doe" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="username">Username</Label>
            <Input id="username" defaultValue="@johndoe" />
          </div>
          <Button size="sm">Save changes</Button>
        </div>
      }
    >
      <Button variant="outline">Edit Profile</Button>
    </Popover>
  ),
}

export const WithCloseButton: Story = {
  render: () => (
    <PopoverRoot>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <InfoIcon />
          <span>Info</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1">
            <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
              Important notice
            </p>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              This uses the low-level primitives with a close button.
            </p>
          </div>
          <PopoverClose asChild>
            <button className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors">
              <XIcon />
            </button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </PopoverRoot>
  ),
}

// ============================================================================
// Controlled state
// ============================================================================

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => setOpen(true)}>
            Open
          </Button>
          <Button size="sm" variant="outline" onClick={() => setOpen(false)}>
            Close
          </Button>
        </div>
        <p className="text-xs text-neutral-500">
          State: <strong>{open ? 'open' : 'closed'}</strong>
        </p>
        <Popover
          open={open}
          onOpenChange={setOpen}
          content={
            <div className="space-y-2 w-52">
              <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                Controlled popover
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Open/close is driven by external state.
              </p>
              <Button size="sm" variant="outline" className="w-full" onClick={() => setOpen(false)}>
                Dismiss
              </Button>
            </div>
          }
        >
          <Button>Trigger</Button>
        </Popover>
      </div>
    )
  },
}

// ============================================================================
// Popper stories
// ============================================================================

export const PopperStory: Story = {
  name: 'Popper (non-blocking alias)',
  render: () => (
    <Popper
      showArrow
      content={
        <p className="text-sm text-neutral-700 dark:text-neutral-300">
          This is a <strong>Popper</strong> — always non-blocking.
        </p>
      }
    >
      <Button variant="ghost">
        <InfoIcon /> Hover / Click
      </Button>
    </Popper>
  ),
}
