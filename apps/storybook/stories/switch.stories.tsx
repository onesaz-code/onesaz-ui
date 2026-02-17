import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Switch, Label } from '@onesaz/ui'

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Switch>

export const Default: Story = {
  args: {},
}

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
}

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false)
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="controlled-switch"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
          <Label htmlFor="controlled-switch">
            {checked ? 'On' : 'Off'}
          </Label>
        </div>
        <p className="text-sm text-gray-600">
          Switch is {checked ? 'checked' : 'unchecked'}
        </p>
      </div>
    )
  },
}

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}
