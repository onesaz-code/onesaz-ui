import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  Snackbar,
  SnackbarProvider,
  useSnackbar,
  Alert,
  AlertTitle,
  AlertDescription,
  Button,
  ButtonGroup,
} from '@onesaz/ui'

const meta: Meta = {
  title: 'Components/Snackbar',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj

// ─── Simple message ───────────────────────────────────────────────────────────

export const Simple: Story = {
  render: function Render() {
    const [open, setOpen] = React.useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Snackbar</Button>
        <Snackbar
          open={open}
          message="Your changes have been saved."
          autoHideDuration={4000}
          onClose={(_, reason) => { if (reason !== 'clickaway') setOpen(false) }}
        />
      </>
    )
  },
}

// ─── With action ─────────────────────────────────────────────────────────────

export const WithAction: Story = {
  render: function Render() {
    const [open, setOpen] = React.useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Archive item</Button>
        <Snackbar
          open={open}
          message="Item archived."
          autoHideDuration={6000}
          onClose={(_, reason) => { if (reason !== 'clickaway') setOpen(false) }}
          action={
            <button
              className="text-xs font-semibold text-accent uppercase tracking-wide hover:underline"
              onClick={() => setOpen(false)}
            >
              Undo
            </button>
          }
        />
      </>
    )
  },
}

// ─── With Alert ───────────────────────────────────────────────────────────────

export const WithAlert: Story = {
  render: function Render() {
    const [open, setOpen] = React.useState(false)
    const [variant, setVariant] = React.useState<'success' | 'warning' | 'error' | 'default'>('success')
    const messages = {
      success: 'Profile updated successfully.',
      warning: 'Your session will expire in 5 minutes.',
      error:   'Failed to save changes. Please try again.',
      default: 'A new software update is available.',
    }
    const show = (v: typeof variant) => { setVariant(v); setOpen(true) }
    return (
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => show('success')}>Success</Button>
          <Button variant="secondary" onClick={() => show('warning')}>Warning</Button>
          <Button variant="destructive" onClick={() => show('error')}>Error</Button>
          <Button variant="outline" onClick={() => show('default')}>Info</Button>
        </div>
        <Snackbar
          open={open}
          autoHideDuration={5000}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          onClose={(_, reason) => { if (reason !== 'clickaway') setOpen(false) }}
        >
          <Alert variant={variant} onClose={() => setOpen(false)}>
            <AlertTitle>{variant.charAt(0).toUpperCase() + variant.slice(1)}</AlertTitle>
            <AlertDescription>{messages[variant]}</AlertDescription>
          </Alert>
        </Snackbar>
      </div>
    )
  },
}

// ─── Positions ────────────────────────────────────────────────────────────────

const positions = [
  { vertical: 'top',    horizontal: 'left'   },
  { vertical: 'top',    horizontal: 'center' },
  { vertical: 'top',    horizontal: 'right'  },
  { vertical: 'bottom', horizontal: 'left'   },
  { vertical: 'bottom', horizontal: 'center' },
  { vertical: 'bottom', horizontal: 'right'  },
] as const

export const Positions: Story = {
  render: function Render() {
    const [pos, setPos] = React.useState<(typeof positions)[number] | null>(null)
    return (
      <div className="grid grid-cols-3 gap-2">
        {positions.map((p) => (
          <Button
            key={`${p.vertical}-${p.horizontal}`}
            variant="outline"
            size="sm"
            onClick={() => setPos(p)}
          >
            {p.vertical} {p.horizontal}
          </Button>
        ))}
        {pos && (
          <Snackbar
            open
            message={`${pos.vertical} · ${pos.horizontal}`}
            autoHideDuration={2500}
            anchorOrigin={pos}
            onClose={() => setPos(null)}
          />
        )}
      </div>
    )
  },
}

// ─── Imperative via useSnackbar ───────────────────────────────────────────────

function ImperativeDemo() {
  const { enqueueSnackbar } = useSnackbar()
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        onClick={() => enqueueSnackbar('File uploaded successfully.', { variant: 'success' })}
      >
        Success
      </Button>
      <Button
        variant="secondary"
        onClick={() => enqueueSnackbar('Storage is 90% full.', { variant: 'warning' })}
      >
        Warning
      </Button>
      <Button
        variant="destructive"
        onClick={() => enqueueSnackbar('Connection lost. Retrying…', { variant: 'error' })}
      >
        Error
      </Button>
      <Button
        variant="outline"
        onClick={() => enqueueSnackbar('Copied to clipboard.', {
          action: (
            <button className="text-xs font-semibold uppercase text-blue-400 hover:underline">
              Dismiss
            </button>
          ),
        })}
      >
        Plain
      </Button>
    </div>
  )
}

export const Imperative: Story = {
  render: () => (
    <SnackbarProvider anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
      <ImperativeDemo />
    </SnackbarProvider>
  ),
}

// ─── Stacking ────────────────────────────────────────────────────────────────

function StackingDemo() {
  const { enqueueSnackbar } = useSnackbar()
  const variants = ['success', 'warning', 'error', 'default'] as const
  let i = 0
  return (
    <Button
      onClick={() => {
        enqueueSnackbar(`Notification #${++i}`, { variant: variants[i % variants.length] })
      }}
    >
      Add notification
    </Button>
  )
}

export const Stacking: Story = {
  render: () => (
    <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
      <StackingDemo />
    </SnackbarProvider>
  ),
}
