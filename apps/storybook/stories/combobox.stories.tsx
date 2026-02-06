import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Combobox, Label } from '@onesaz/ui'

const meta: Meta<typeof Combobox> = {
  title: 'Components/Combobox',
  component: Combobox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Combobox>

const frameworks = [
  { value: 'next', label: 'Next.js' },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' },
  { value: 'gatsby', label: 'Gatsby' },
  { value: 'nuxt', label: 'Nuxt.js' },
  { value: 'sveltekit', label: 'SvelteKit' },
]

const countries = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
  { value: 'in', label: 'India' },
]

export const Default: Story = {
  args: {
    options: frameworks,
    placeholder: 'Select framework...',
  },
  decorators: [
    (Story) => (
      <div className="w-[300px]">
        <Story />
      </div>
    ),
  ],
}

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-[300px] items-center gap-1.5">
      <Label>Framework</Label>
      <Combobox
        options={frameworks}
        placeholder="Select framework..."
        searchPlaceholder="Search frameworks..."
      />
    </div>
  ),
}

export const Countries: Story = {
  render: () => (
    <div className="grid w-[300px] items-center gap-1.5">
      <Label>Country</Label>
      <Combobox
        options={countries}
        placeholder="Select country..."
        searchPlaceholder="Search countries..."
      />
    </div>
  ),
}

export const Controlled: Story = {
  render: function ControlledCombobox() {
    const [value, setValue] = React.useState('')

    return (
      <div className="grid w-[300px] items-center gap-1.5">
        <Label>Framework</Label>
        <Combobox
          options={frameworks}
          value={value}
          onValueChange={setValue}
          placeholder="Select framework..."
        />
        <p className="text-sm text-[var(--muted-foreground)]">
          Selected: {value || 'None'}
        </p>
      </div>
    )
  },
}

export const Disabled: Story = {
  args: {
    options: frameworks,
    placeholder: 'Select framework...',
    disabled: true,
  },
  decorators: [
    (Story) => (
      <div className="w-[300px]">
        <Story />
      </div>
    ),
  ],
}

export const WithDisabledOptions: Story = {
  args: {
    options: [
      { value: 'next', label: 'Next.js' },
      { value: 'remix', label: 'Remix' },
      { value: 'astro', label: 'Astro', disabled: true },
      { value: 'gatsby', label: 'Gatsby', disabled: true },
      { value: 'nuxt', label: 'Nuxt.js' },
    ],
    placeholder: 'Select framework...',
  },
  decorators: [
    (Story) => (
      <div className="w-[300px]">
        <Story />
      </div>
    ),
  ],
}
