import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Alert, AlertTitle, AlertDescription, Button } from '@onesaz/ui'

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'info', 'success', 'warning', 'error', 'destructive'],
    },
    dismissible: {
      control: 'boolean',
    },
    showIcon: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof Alert>

export const Default: Story = {
  args: {
    children: 'This is a default alert message.',
  },
  render: (args) => (
    <div className="w-[400px]">
      <Alert {...args} />
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="w-[400px] space-y-4">
      <Alert variant="default">
        <AlertTitle>Default</AlertTitle>
        <AlertDescription>This is a default alert message.</AlertDescription>
      </Alert>
      <Alert variant="info">
        <AlertTitle>Info</AlertTitle>
        <AlertDescription>This is an informational alert message.</AlertDescription>
      </Alert>
      <Alert variant="success">
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>Your action was completed successfully.</AlertDescription>
      </Alert>
      <Alert variant="warning">
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>Please be careful with this action.</AlertDescription>
      </Alert>
      <Alert variant="error">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Something went wrong. Please try again.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertTitle>Destructive</AlertTitle>
        <AlertDescription>This action cannot be undone.</AlertDescription>
      </Alert>
    </div>
  ),
}

export const WithTitleOnly: Story = {
  render: () => (
    <div className="w-[400px] space-y-4">
      <Alert variant="info">
        <AlertTitle>Information</AlertTitle>
      </Alert>
      <Alert variant="success">
        <AlertTitle>Success</AlertTitle>
      </Alert>
      <Alert variant="warning">
        <AlertTitle>Warning</AlertTitle>
      </Alert>
    </div>
  ),
}

export const WithDescriptionOnly: Story = {
  render: () => (
    <div className="w-[400px] space-y-4">
      <Alert variant="info">
        <AlertDescription>
          This is a longer description that provides more context about the alert.
          It can span multiple lines if needed.
        </AlertDescription>
      </Alert>
    </div>
  ),
}

export const WithoutIcon: Story = {
  render: () => (
    <div className="w-[400px] space-y-4">
      <Alert variant="info" showIcon={false}>
        <AlertTitle>No Icon</AlertTitle>
        <AlertDescription>This alert is displayed without an icon.</AlertDescription>
      </Alert>
    </div>
  ),
}

const DismissibleExample = () => {
  const [show, setShow] = useState(true)

  return (
    <div className="w-[400px] space-y-4">
      {show ? (
        <Alert variant="success" dismissible onDismiss={() => setShow(false)}>
          <AlertTitle>Dismissible Alert</AlertTitle>
          <AlertDescription>Click the X button to dismiss this alert.</AlertDescription>
        </Alert>
      ) : (
        <Button onClick={() => setShow(true)}>Show Alert</Button>
      )}
    </div>
  )
}

export const Dismissible: Story = {
  render: () => <DismissibleExample />,
}

export const DismissibleVariants: Story = {
  render: () => (
    <div className="w-[400px] space-y-4">
      <Alert variant="info" dismissible>
        <AlertTitle>Info</AlertTitle>
        <AlertDescription>Dismissible info alert.</AlertDescription>
      </Alert>
      <Alert variant="success" dismissible>
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>Dismissible success alert.</AlertDescription>
      </Alert>
      <Alert variant="warning" dismissible>
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>Dismissible warning alert.</AlertDescription>
      </Alert>
      <Alert variant="error" dismissible>
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Dismissible error alert.</AlertDescription>
      </Alert>
    </div>
  ),
}

export const CustomIcon: Story = {
  render: () => (
    <div className="w-[400px]">
      <Alert
        variant="info"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        }
      >
        <AlertTitle>Custom Icon</AlertTitle>
        <AlertDescription>This alert uses a custom message icon.</AlertDescription>
      </Alert>
    </div>
  ),
}

export const RealWorldExamples: Story = {
  render: () => (
    <div className="w-[450px] space-y-4">
      <Alert variant="info">
        <AlertTitle>New Feature Available</AlertTitle>
        <AlertDescription>
          We've added a new dark mode option. You can enable it in your settings.
        </AlertDescription>
      </Alert>

      <Alert variant="success">
        <AlertTitle>Payment Successful</AlertTitle>
        <AlertDescription>
          Your payment of $49.99 has been processed. A confirmation email has been sent.
        </AlertDescription>
      </Alert>

      <Alert variant="warning" dismissible>
        <AlertTitle>Session Expiring</AlertTitle>
        <AlertDescription>
          Your session will expire in 5 minutes. Please save your work.
        </AlertDescription>
      </Alert>

      <Alert variant="error">
        <AlertTitle>Upload Failed</AlertTitle>
        <AlertDescription>
          The file "report.pdf" could not be uploaded. Please check your connection and try again.
        </AlertDescription>
      </Alert>
    </div>
  ),
}
