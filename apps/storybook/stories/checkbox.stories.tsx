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
  args: { defaultChecked: true },
}

export const Disabled: Story = {
  args: { disabled: true },
}

export const DisabledChecked: Story = {
  args: { disabled: true, defaultChecked: true },
}

/**
 * Indeterminate is a controlled state — the parent manages it.
 * This story is intentionally non-interactive (read-only visual).
 * See IndeterminateControlled below for the working pattern.
 */
export const IndeterminateReadOnly: Story = {
  name: 'Indeterminate (read-only visual)',
  args: { indeterminate: true, disabled: true },
}

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
}

export const AllStates: Story = {
  name: 'All states',
  render: () => (
    <div className="flex flex-col gap-3">
      {[
        { label: 'Unchecked', props: {} },
        { label: 'Checked', props: { defaultChecked: true } },
        { label: 'Indeterminate (controlled — see story below)', props: { indeterminate: true, disabled: true } },
        { label: 'Disabled unchecked', props: { disabled: true } },
        { label: 'Disabled checked', props: { disabled: true, defaultChecked: true } },
        { label: 'Disabled indeterminate', props: { disabled: true, indeterminate: true } },
      ].map(({ label, props }) => (
        <div key={label} className="flex items-center gap-2">
          <Checkbox id={label} {...props} />
          <Label htmlFor={label}>{label}</Label>
        </div>
      ))}
    </div>
  ),
}

export const Controlled: Story = {
  render: function ControlledStory() {
    const [checked, setChecked] = useState(false)
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Checkbox
            id="controlled"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
          <Label htmlFor="controlled">
            {checked ? 'Checked' : 'Unchecked'}
          </Label>
        </div>
        <button
          className="px-3 py-1.5 text-sm rounded bg-accent text-accent-foreground hover:bg-accent/90"
          onClick={() => setChecked((v) => !v)}
        >
          Toggle
        </button>
      </div>
    )
  },
}

export const IndeterminateControlled: Story = {
  name: 'Indeterminate — select all pattern',
  render: function IndeterminateControlled() {
    const items = ['Inbox', 'Starred', 'Sent', 'Drafts']
    const [selected, setSelected] = useState<string[]>([items[0], items[1]])

    const allChecked = selected.length === items.length
    const someChecked = selected.length > 0 && !allChecked

    const toggleAll = () =>
      setSelected(allChecked ? [] : [...items])

    const toggleItem = (item: string) =>
      setSelected((prev) =>
        prev.includes(item) ? prev.filter((v) => v !== item) : [...prev, item]
      )

    return (
      <div className="flex flex-col gap-2 w-[220px]">
        <div className="flex items-center gap-2 pb-2 border-b border-border">
          <Checkbox
            id="select-all"
            checked={allChecked}
            indeterminate={someChecked}
            onChange={toggleAll}
          />
          <Label htmlFor="select-all" className="font-medium">
            Select all
          </Label>
        </div>
        {items.map((item) => (
          <div key={item} className="flex items-center gap-2 pl-2">
            <Checkbox
              id={item}
              checked={selected.includes(item)}
              onChange={() => toggleItem(item)}
            />
            <Label htmlFor={item}>{item}</Label>
          </div>
        ))}
        <p className="text-xs text-muted-foreground mt-1">
          {selected.length} of {items.length} selected
        </p>
      </div>
    )
  },
}
