import type { Meta, StoryObj } from '@storybook/react'
import { EmptyState, ErrorState, Button } from '@onesaz/ui'

const InboxIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
    <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
  </svg>
)

const meta: Meta<typeof EmptyState> = {
  title: 'Feedback/EmptyState',
  component: EmptyState,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
}

export default meta
type Story = StoryObj<typeof EmptyState>

export const Default: Story = {
  args: {
    icon: <InboxIcon />,
    title: 'No records yet',
    description: 'When records are added they will show up here.',
  },
}

export const WithAction: Story = {
  args: {
    icon: <InboxIcon />,
    title: 'No students in this class',
    description: 'Add your first student to get started.',
    action: <Button size="sm">Add student</Button>,
  },
}

export const NoResults: Story = {
  args: {
    title: 'No results found',
    description: 'Try adjusting your filters or search terms.',
    size: 'sm',
  },
}

export const Error: StoryObj<typeof ErrorState> = {
  render: (args) => <ErrorState {...args} />,
  args: {
    onRetry: () => alert('Retrying…'),
  },
}

export const ErrorWithCustomMessage: StoryObj<typeof ErrorState> = {
  render: (args) => <ErrorState {...args} />,
  args: {
    title: 'Could not load report',
    description: 'The server took too long to respond.',
    onRetry: () => alert('Retrying…'),
  },
}
