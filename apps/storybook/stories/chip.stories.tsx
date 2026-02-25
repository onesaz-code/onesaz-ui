import type { Meta, StoryObj } from '@storybook/react'
import { Chip } from '@onesaz/ui'

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outlined'],
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'error', 'info'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
    },
    clickable: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof Chip>

export const Default: Story = {
  args: {
    label: 'Default Chip',
  },
}

export const FilledColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Chip label="Default" color="default" />
      <Chip label="Primary" color="primary" />
      <Chip label="Secondary" color="secondary" />
      <Chip label="Success" color="success" />
      <Chip label="Warning" color="warning" />
      <Chip label="Error" color="error" />
      <Chip label="Info" color="info" />
    </div>
  ),
}

export const OutlinedColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Chip label="Default" variant="outlined" color="default" />
      <Chip label="Primary" variant="outlined" color="primary" />
      <Chip label="Secondary" variant="outlined" color="secondary" />
      <Chip label="Success" variant="outlined" color="success" />
      <Chip label="Warning" variant="outlined" color="warning" />
      <Chip label="Error" variant="outlined" color="error" />
      <Chip label="Info" variant="outlined" color="info" />
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Chip label="Small" size="small" />
      <Chip label="Medium" size="medium" />
    </div>
  ),
}

export const Deletable: Story = {
  args: {
    label: 'Deletable Chip',
    onDelete: () => alert('Deleted!'),
  },
}

export const Clickable: Story = {
  args: {
    label: 'Clickable Chip',
    clickable: true,
    onClick: () => alert('Clicked!'),
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled Chip',
    disabled: true,
  },
}

export const WithIcon: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px' }}>
      <Chip
        label="With Icon"
        color="info"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clipRule="evenodd"
            />
          </svg>
        }
      />
      <Chip
        label="Deletable with Icon"
        color="success"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
          </svg>
        }
        onDelete={() => alert('Deleted!')}
      />
    </div>
  ),
}
