import type { Meta, StoryObj } from '@storybook/react'
import { ButtonGroup, Button } from '@onesaz/ui'

const meta: Meta<typeof ButtonGroup> = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
}

export default meta
type Story = StoryObj<typeof ButtonGroup>

export const Default: Story = {
  render: () => (
    <ButtonGroup variant="outline">
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </ButtonGroup>
  ),
}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-start">
      <ButtonGroup variant="default">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
      <ButtonGroup variant="outline">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
      <ButtonGroup variant="secondary">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
      <ButtonGroup variant="destructive">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-start">
      <ButtonGroup variant="outline" size="sm">
        <Button>Small</Button>
        <Button>Small</Button>
        <Button>Small</Button>
      </ButtonGroup>
      <ButtonGroup variant="outline" size="default">
        <Button>Default</Button>
        <Button>Default</Button>
        <Button>Default</Button>
      </ButtonGroup>
      <ButtonGroup variant="outline" size="lg">
        <Button>Large</Button>
        <Button>Large</Button>
        <Button>Large</Button>
      </ButtonGroup>
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div className="flex gap-6 items-start">
      <ButtonGroup variant="outline" orientation="vertical">
        <Button>Top</Button>
        <Button>Middle</Button>
        <Button>Bottom</Button>
      </ButtonGroup>
      <ButtonGroup variant="default" orientation="vertical">
        <Button>Top</Button>
        <Button>Middle</Button>
        <Button>Bottom</Button>
      </ButtonGroup>
      <ButtonGroup variant="secondary" orientation="vertical">
        <Button>Top</Button>
        <Button>Middle</Button>
        <Button>Bottom</Button>
      </ButtonGroup>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-start">
      <ButtonGroup variant="outline" disabled>
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
      <ButtonGroup variant="default" disabled>
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
    </div>
  ),
}

export const MixedButtons: Story = {
  render: () => (
    <ButtonGroup variant="outline">
      <Button>One</Button>
      <Button variant="default">Two (override)</Button>
      <Button>Three</Button>
    </ButtonGroup>
  ),
}

export const FullWidth: Story = {
  render: () => (
    <div className="w-80">
      <ButtonGroup variant="outline" fullWidth>
        <Button fullWidth>One</Button>
        <Button fullWidth>Two</Button>
        <Button fullWidth>Three</Button>
      </ButtonGroup>
    </div>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-start">
      <ButtonGroup variant="outline">
        <Button>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Prev
        </Button>
        <Button>
          Next
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </Button>
      </ButtonGroup>

      <ButtonGroup variant="outline">
        <Button size="icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="14" y="3" rx="1" /><rect width="7" height="7" x="14" y="14" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" />
          </svg>
        </Button>
        <Button size="icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" x2="21" y1="6" y2="6" /><line x1="3" x2="21" y1="12" y2="12" /><line x1="3" x2="21" y1="18" y2="18" />
          </svg>
        </Button>
      </ButtonGroup>
    </div>
  ),
}
