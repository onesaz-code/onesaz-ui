import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Checkbox, Label } from '@onesaz/ui'

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  args: {},
}

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
}

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
  },
}

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false)
    
    return (
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="controlled" 
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
          <Label htmlFor="controlled">
            Controlled checkbox (currently {checked ? 'checked' : 'unchecked'})
          </Label>
        </div>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setChecked(!checked)}
        >
          Toggle via button
        </button>
      </div>
    )
  },
}
