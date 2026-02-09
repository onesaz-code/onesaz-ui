import type { Meta, StoryObj } from '@storybook/react'
import { Tooltip, Button, IconButton } from '@onesaz/ui'

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
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
    delayDuration: {
      control: { type: 'number', min: 0, max: 1000 },
    },
  },
}

export default meta
type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  args: {
    content: 'This is a tooltip',
    children: <Button>Hover me</Button>,
  },
}

export const Positions: Story = {
  render: () => (
    <div className="flex items-center gap-8 p-8">
      <Tooltip content="Top tooltip" side="top">
        <Button variant="outline">Top</Button>
      </Tooltip>
      <Tooltip content="Right tooltip" side="right">
        <Button variant="outline">Right</Button>
      </Tooltip>
      <Tooltip content="Bottom tooltip" side="bottom">
        <Button variant="outline">Bottom</Button>
      </Tooltip>
      <Tooltip content="Left tooltip" side="left">
        <Button variant="outline">Left</Button>
      </Tooltip>
    </div>
  ),
}

export const Alignments: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4 p-8">
      <div className="flex items-center gap-4">
        <Tooltip content="Aligned to start" side="bottom" align="start">
          <Button variant="outline">Start</Button>
        </Tooltip>
        <Tooltip content="Aligned to center" side="bottom" align="center">
          <Button variant="outline">Center</Button>
        </Tooltip>
        <Tooltip content="Aligned to end" side="bottom" align="end">
          <Button variant="outline">End</Button>
        </Tooltip>
      </div>
    </div>
  ),
}

export const WithDelay: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Tooltip content="No delay" delayDuration={0}>
        <Button variant="outline">No Delay</Button>
      </Tooltip>
      <Tooltip content="200ms delay (default)" delayDuration={200}>
        <Button variant="outline">200ms</Button>
      </Tooltip>
      <Tooltip content="500ms delay" delayDuration={500}>
        <Button variant="outline">500ms</Button>
      </Tooltip>
      <Tooltip content="1000ms delay" delayDuration={1000}>
        <Button variant="outline">1000ms</Button>
      </Tooltip>
    </div>
  ),
}

export const WithArrow: Story = {
  render: () => (
    <div className="flex items-center gap-8 p-8">
      <Tooltip content="With arrow" showArrow>
        <Button variant="outline">With Arrow</Button>
      </Tooltip>
      <Tooltip content="Without arrow">
        <Button variant="outline">Without Arrow</Button>
      </Tooltip>
    </div>
  ),
}

export const LongContent: Story = {
  render: () => (
    <Tooltip content="This is a longer tooltip message that provides more detailed information about the element.">
      <Button variant="outline">Hover for details</Button>
    </Tooltip>
  ),
}

export const OnIconButton: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Tooltip content="Edit item">
        <IconButton aria-label="Edit">
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
        </IconButton>
      </Tooltip>
      <Tooltip content="Delete item">
        <IconButton aria-label="Delete" variant="ghost">
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
        </IconButton>
      </Tooltip>
      <Tooltip content="Settings">
        <IconButton aria-label="Settings" variant="outline">
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
        </IconButton>
      </Tooltip>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Tooltip content="This tooltip won't show" disabled>
        <Button variant="outline">Disabled Tooltip</Button>
      </Tooltip>
      <Tooltip content="This tooltip shows">
        <Button variant="outline">Enabled Tooltip</Button>
      </Tooltip>
    </div>
  ),
}

export const RealWorldExample: Story = {
  render: () => (
    <div className="flex items-center gap-2 p-4 border rounded-lg bg-card">
      <Tooltip content="Bold (Ctrl+B)">
        <IconButton aria-label="Bold" variant="ghost" size="sm">
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
            <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
            <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
          </svg>
        </IconButton>
      </Tooltip>
      <Tooltip content="Italic (Ctrl+I)">
        <IconButton aria-label="Italic" variant="ghost" size="sm">
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
            <line x1="19" y1="4" x2="10" y2="4" />
            <line x1="14" y1="20" x2="5" y2="20" />
            <line x1="15" y1="4" x2="9" y2="20" />
          </svg>
        </IconButton>
      </Tooltip>
      <Tooltip content="Underline (Ctrl+U)">
        <IconButton aria-label="Underline" variant="ghost" size="sm">
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
            <path d="M6 4v6a6 6 0 0 0 12 0V4" />
            <line x1="4" y1="20" x2="20" y2="20" />
          </svg>
        </IconButton>
      </Tooltip>
      <div className="w-px h-6 bg-border mx-1" />
      <Tooltip content="Align Left">
        <IconButton aria-label="Align Left" variant="ghost" size="sm">
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
            <line x1="21" y1="6" x2="3" y2="6" />
            <line x1="15" y1="12" x2="3" y2="12" />
            <line x1="17" y1="18" x2="3" y2="18" />
          </svg>
        </IconButton>
      </Tooltip>
      <Tooltip content="Align Center">
        <IconButton aria-label="Align Center" variant="ghost" size="sm">
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
            <line x1="21" y1="6" x2="3" y2="6" />
            <line x1="17" y1="12" x2="7" y2="12" />
            <line x1="19" y1="18" x2="5" y2="18" />
          </svg>
        </IconButton>
      </Tooltip>
      <Tooltip content="Align Right">
        <IconButton aria-label="Align Right" variant="ghost" size="sm">
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
            <line x1="21" y1="6" x2="3" y2="6" />
            <line x1="21" y1="12" x2="9" y2="12" />
            <line x1="21" y1="18" x2="7" y2="18" />
          </svg>
        </IconButton>
      </Tooltip>
    </div>
  ),
}
