import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Backdrop, Button, CircularProgress } from '@onesaz/ui'

const meta: Meta<typeof Backdrop> = {
  title: 'Components/Backdrop',
  component: Backdrop,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    open:              { control: 'boolean' },
    invisible:         { control: 'boolean' },
    transitionDuration:{ control: 'number' },
    disableScrollLock: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Backdrop>

// ─── Basic ────────────────────────────────────────────────────────────────────

export const Basic: Story = {
  render: function Render() {
    const [open, setOpen] = React.useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Show Backdrop</Button>
        <Backdrop open={open} onClick={() => setOpen(false)} />
      </>
    )
  },
}

// ─── With spinner ─────────────────────────────────────────────────────────────

export const WithSpinner: Story = {
  render: function Render() {
    const [open, setOpen] = React.useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Show Loading</Button>
        <Backdrop open={open} onClick={() => setOpen(false)}>
          <CircularProgress variant="default" size="lg" />
        </Backdrop>
      </>
    )
  },
}

// ─── With content ─────────────────────────────────────────────────────────────

export const WithContent: Story = {
  render: function Render() {
    const [open, setOpen] = React.useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Show Backdrop</Button>
        <Backdrop open={open} onClick={() => setOpen(false)}>
          <div
            className="flex flex-col items-center gap-4 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <CircularProgress size="lg" />
            <p className="text-sm font-medium">Processing your request…</p>
            <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </Backdrop>
      </>
    )
  },
}

// ─── Invisible ────────────────────────────────────────────────────────────────

export const Invisible: Story = {
  render: function Render() {
    const [open, setOpen] = React.useState(false)
    return (
      <>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Show Invisible Backdrop
        </Button>
        <Backdrop open={open} invisible onClick={() => setOpen(false)}>
          <div className="bg-background border border-border rounded-lg shadow-lg p-6 flex flex-col gap-3">
            <p className="text-sm font-medium text-foreground">
              Invisible backdrop — click anywhere to dismiss
            </p>
            <Button size="sm" onClick={() => setOpen(false)}>Close</Button>
          </div>
        </Backdrop>
      </>
    )
  },
}

// ─── Custom transition ────────────────────────────────────────────────────────

export const SlowTransition: Story = {
  render: function Render() {
    const [open, setOpen] = React.useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Slow fade (600 ms)</Button>
        <Backdrop open={open} transitionDuration={600} onClick={() => setOpen(false)}>
          <p className="text-white text-sm">Click to dismiss</p>
        </Backdrop>
      </>
    )
  },
}
