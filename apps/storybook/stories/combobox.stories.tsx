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

// ============================================================================
// Multi-Select Examples
// ============================================================================

export const MultiSelect: Story = {
  render: () => (
    <div className="grid w-[350px] items-center gap-1.5">
      <Label>Frameworks (Multi-select)</Label>
      <Combobox
        multiple
        options={frameworks}
        placeholder="Select frameworks..."
        searchPlaceholder="Search frameworks..."
      />
    </div>
  ),
}

export const MultiSelectControlled: Story = {
  render: function ControlledMultiCombobox() {
    const [value, setValue] = React.useState<string[]>(['next', 'remix'])

    return (
      <div className="grid w-[350px] items-center gap-1.5">
        <Label>Frameworks</Label>
        <Combobox
          multiple
          options={frameworks}
          value={value}
          onValueChange={setValue}
          placeholder="Select frameworks..."
        />
        <p className="text-sm text-[var(--muted-foreground)]">
          Selected: {value.length > 0 ? value.join(', ') : 'None'}
        </p>
      </div>
    )
  },
}

export const MultiSelectManyOptions: Story = {
  render: function MultiSelectManyOptions() {
    const [value, setValue] = React.useState<string[]>(['us', 'uk', 'ca', 'de', 'fr'])

    return (
      <div className="grid w-[350px] items-center gap-1.5">
        <Label>Countries (shows +N more)</Label>
        <Combobox
          multiple
          options={countries}
          value={value}
          onValueChange={setValue}
          placeholder="Select countries..."
          maxDisplayItems={3}
        />
        <p className="text-sm text-[var(--muted-foreground)]">
          {value.length} countries selected
        </p>
      </div>
    )
  },
}

export const MultiSelectCustomMaxDisplay: Story = {
  render: () => (
    <div className="space-y-6 w-[350px]">
      <div className="space-y-2">
        <Label>Max 2 displayed</Label>
        <Combobox
          multiple
          options={frameworks}
          defaultValue={['next', 'remix', 'astro', 'gatsby']}
          placeholder="Select frameworks..."
          maxDisplayItems={2}
        />
      </div>
      <div className="space-y-2">
        <Label>Max 5 displayed</Label>
        <Combobox
          multiple
          options={frameworks}
          defaultValue={['next', 'remix', 'astro', 'gatsby']}
          placeholder="Select frameworks..."
          maxDisplayItems={5}
        />
      </div>
    </div>
  ),
}

export const SingleVsMulti: Story = {
  render: () => (
    <div className="space-y-6 w-[350px]">
      <div className="space-y-2">
        <Label>Single Select</Label>
        <Combobox
          options={frameworks}
          placeholder="Select one framework..."
        />
      </div>
      <div className="space-y-2">
        <Label>Multi Select</Label>
        <Combobox
          multiple
          options={frameworks}
          placeholder="Select multiple frameworks..."
        />
      </div>
    </div>
  ),
}
