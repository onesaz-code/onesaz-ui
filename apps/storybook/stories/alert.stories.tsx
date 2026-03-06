import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Alert, AlertTitle, AlertDescription, Button } from '@onesaz/ui'

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Alert>

// ─── All variants ─────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  render: () => (
    <div className="w-[460px] space-y-3">
      <Alert variant="default">
        <AlertTitle>Info</AlertTitle>
        <AlertDescription>Your session will expire in 30 minutes.</AlertDescription>
      </Alert>
      <Alert variant="success">
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>Your changes have been saved successfully.</AlertDescription>
      </Alert>
      <Alert variant="warning">
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>This action may affect other users in your team.</AlertDescription>
      </Alert>
      <Alert variant="error">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Failed to connect to the server. Please try again.</AlertDescription>
      </Alert>
    </div>
  ),
}

// ─── Title only ───────────────────────────────────────────────────────────────

export const TitleOnly: Story = {
  render: () => (
    <div className="w-[460px] space-y-3">
      <Alert variant="default"><AlertTitle>Your account is under review.</AlertTitle></Alert>
      <Alert variant="success"><AlertTitle>Payment processed.</AlertTitle></Alert>
      <Alert variant="warning"><AlertTitle>Storage is 90% full.</AlertTitle></Alert>
      <Alert variant="error"><AlertTitle>Invalid API key.</AlertTitle></Alert>
    </div>
  ),
}

// ─── Description only ────────────────────────────────────────────────────────

export const DescriptionOnly: Story = {
  render: () => (
    <div className="w-[460px] space-y-3">
      <Alert variant="default">
        <AlertDescription>
          We've updated our privacy policy. Please review it at your earliest convenience.
        </AlertDescription>
      </Alert>
      <Alert variant="warning">
        <AlertDescription>
          Your free trial ends in 3 days. Upgrade to keep access to all features.
        </AlertDescription>
      </Alert>
    </div>
  ),
}

// ─── Dismissible ─────────────────────────────────────────────────────────────

export const Dismissible: Story = {
  render: function Render() {
    const [dismissed, setDismissed] = React.useState<Record<string, boolean>>({})
    const dismiss = (key: string) => setDismissed(p => ({ ...p, [key]: true }))

    return (
      <div className="w-[460px] space-y-3">
        {!dismissed.default && (
          <Alert variant="default" onClose={() => dismiss('default')}>
            <AlertTitle>New Feature Available</AlertTitle>
            <AlertDescription>Dark mode is now available in settings.</AlertDescription>
          </Alert>
        )}
        {!dismissed.success && (
          <Alert variant="success" onClose={() => dismiss('success')}>
            <AlertTitle>Profile Updated</AlertTitle>
            <AlertDescription>Your profile information has been saved.</AlertDescription>
          </Alert>
        )}
        {!dismissed.warning && (
          <Alert variant="warning" onClose={() => dismiss('warning')}>
            <AlertTitle>Unsaved Changes</AlertTitle>
            <AlertDescription>You have unsaved changes that will be lost.</AlertDescription>
          </Alert>
        )}
        {!dismissed.error && (
          <Alert variant="error" onClose={() => dismiss('error')}>
            <AlertTitle>Upload Failed</AlertTitle>
            <AlertDescription>report.pdf could not be uploaded. Check your connection.</AlertDescription>
          </Alert>
        )}
        {Object.keys(dismissed).length > 0 && (
          <Button variant="outline" size="sm" onClick={() => setDismissed({})}>Reset</Button>
        )}
      </div>
    )
  },
}

// ─── Custom icon / no icon ────────────────────────────────────────────────────

export const CustomIcon: Story = {
  render: () => (
    <div className="w-[460px] space-y-3">
      <Alert
        variant="default"
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 mt-px">
            <path d="M18 20V10M12 20V4M6 20v-6" />
          </svg>
        }
      >
        <AlertTitle>Analytics Updated</AlertTitle>
        <AlertDescription>Your dashboard metrics were refreshed 2 minutes ago.</AlertDescription>
      </Alert>
      <Alert variant="success" icon={null}>
        <AlertTitle>No Icon</AlertTitle>
        <AlertDescription>Pass icon=&#123;null&#125; to hide the icon entirely.</AlertDescription>
      </Alert>
    </div>
  ),
}

// ─── Real-world examples ──────────────────────────────────────────────────────

export const RealWorld: Story = {
  render: () => (
    <div className="w-[460px] space-y-3">
      <Alert variant="default">
        <AlertTitle>Scheduled Maintenance</AlertTitle>
        <AlertDescription>
          The platform will be unavailable on Sunday, Mar 10 from 2–4 AM UTC.
        </AlertDescription>
      </Alert>
      <Alert variant="success">
        <AlertTitle>Payment Successful</AlertTitle>
        <AlertDescription>
          Your payment of ₹4,999 has been processed. A receipt has been sent to your email.
        </AlertDescription>
      </Alert>
      <Alert variant="warning">
        <AlertTitle>Session Expiring Soon</AlertTitle>
        <AlertDescription>
          You'll be logged out in 5 minutes due to inactivity.
        </AlertDescription>
      </Alert>
      <Alert variant="error">
        <AlertTitle>Submission Failed</AlertTitle>
        <AlertDescription>
          Please check all required fields and try again.
        </AlertDescription>
      </Alert>
    </div>
  ),
}
