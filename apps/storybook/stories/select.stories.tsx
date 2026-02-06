import type { Meta, StoryObj } from '@storybook/react'
import { Select, Label } from '@onesaz/ui'

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Select>

export const Default: Story = {
  render: () => (
    <Select>
      <Select.Trigger className="w-[180px]">
        <Select.Value placeholder="Select a fruit" />
      </Select.Trigger>
      <Select.Content>
        <Select.Item value="apple">Apple</Select.Item>
        <Select.Item value="banana">Banana</Select.Item>
        <Select.Item value="orange">Orange</Select.Item>
        <Select.Item value="grape">Grape</Select.Item>
        <Select.Item value="mango">Mango</Select.Item>
      </Select.Content>
    </Select>
  ),
}

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label>Favorite Fruit</Label>
      <Select>
        <Select.Trigger>
          <Select.Value placeholder="Select a fruit" />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="apple">Apple</Select.Item>
          <Select.Item value="banana">Banana</Select.Item>
          <Select.Item value="orange">Orange</Select.Item>
        </Select.Content>
      </Select>
    </div>
  ),
}

export const WithGroups: Story = {
  render: () => (
    <Select>
      <Select.Trigger className="w-[200px]">
        <Select.Value placeholder="Select a timezone" />
      </Select.Trigger>
      <Select.Content>
        <Select.Group>
          <Select.Label>North America</Select.Label>
          <Select.Item value="est">Eastern Standard Time (EST)</Select.Item>
          <Select.Item value="cst">Central Standard Time (CST)</Select.Item>
          <Select.Item value="pst">Pacific Standard Time (PST)</Select.Item>
        </Select.Group>
        <Select.Separator />
        <Select.Group>
          <Select.Label>Europe</Select.Label>
          <Select.Item value="gmt">Greenwich Mean Time (GMT)</Select.Item>
          <Select.Item value="cet">Central European Time (CET)</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Select disabled>
      <Select.Trigger className="w-[180px]">
        <Select.Value placeholder="Select a fruit" />
      </Select.Trigger>
      <Select.Content>
        <Select.Item value="apple">Apple</Select.Item>
      </Select.Content>
    </Select>
  ),
}
