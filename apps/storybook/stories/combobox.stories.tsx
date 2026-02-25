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

export const SimpleOptions: Story = {
  render: () => (
    <div className="grid w-[300px] items-center gap-1.5">
      <Label>Simple Options</Label>
      <Combobox
        simpleOptions
        options={['Alpha', 'Beta', 'Gamma', 'Delta']}
        placeholder="Select option..."
      />
    </div>
  ),
}

export const ControlledSimple: Story = {
  render: function ControlledSimple() {
    const [value, setValue] = React.useState<string | null>(null)

    return (
      <div className="grid w-[300px] items-center gap-1.5">
        <Label>Controlled Simple</Label>
        <Combobox
          simpleOptions
          options={['Alpha', 'Beta', 'Gamma', 'Delta']}
          value={value}
          onChange={setValue}
          placeholder="Select option..."
        />
        <p className="text-sm text-[var(--muted-foreground)]">
          Selected: {value ?? 'None'}
        </p>
      </div>
    )
  },
}

export const CustomKeys: Story = {
  render: () => (
    <div className="grid w-[300px] items-center gap-1.5">
      <Label>Custom Keys</Label>
      <Combobox
        options={[
          { id: 'hr', name: 'HR' },
          { id: 'ops', name: 'Operations' },
          { id: 'sales', name: 'Sales' },
        ]}
        labelKey="name"
        valueKey="id"
        placeholder="Select department..."
      />
    </div>
  ),
}

export const ControlledMultiCustomKeys: Story = {
  render: function ControlledMultiCustomKeys() {
    const [value, setValue] = React.useState<{ id: string; name: string }[]>([])

    return (
      <div className="grid w-[350px] items-center gap-1.5">
        <Label>Custom Keys (Multi)</Label>
        <Combobox
          multiple
          options={[
            { id: 'hr', name: 'HR' },
            { id: 'ops', name: 'Operations' },
            { id: 'sales', name: 'Sales' },
          ]}
          labelKey="name"
          valueKey="id"
          value={value}
          onChange={setValue}
          placeholder="Select departments..."
        />
        <p className="text-sm text-[var(--muted-foreground)]">
          Selected: {value.length ? value.map((v) => v.name).join(', ') : 'None'}
        </p>
      </div>
    )
  },
}

export const Controlled: Story = {
  render: function ControlledCombobox() {
    const [value, setValue] = React.useState<(typeof frameworks)[number] | null>(null)

    return (
      <div className="grid w-[300px] items-center gap-1.5">
        <Label>Framework</Label>
        <Combobox
          options={frameworks}
          value={value}
          onChange={setValue}
          placeholder="Select framework..."
        />
        <p className="text-sm text-[var(--muted-foreground)]">
          Selected: {value?.label ?? 'None'}
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

export const ControlledSimpleMulti: Story = {
  render: function ControlledSimpleMulti() {
    const [value, setValue] = React.useState<string[]>([])

    return (
      <div className="grid w-[350px] items-center gap-1.5">
        <Label>Controlled Simple (Multi)</Label>
        <Combobox
          multiple
          simpleOptions
          options={['Alpha', 'Beta', 'Gamma', 'Delta']}
          value={value}
          onChange={setValue}
          placeholder="Select options..."
        />
        <p className="text-sm text-[var(--muted-foreground)]">
          Selected: {value.length ? value.join(', ') : 'None'}
        </p>
      </div>
    )
  },
}

export const MultiSelectWithSelectAll: Story = {
  render: () => (
    <div className="grid w-[350px] items-center gap-1.5">
      <Label>Frameworks (Select all)</Label>
      <Combobox
        multiple
        selectAll
        options={frameworks}
        placeholder="Select frameworks..."
        searchPlaceholder="Search frameworks..."
      />
    </div>
  ),
}

export const MultiSelectControlled: Story = {
  render: function ControlledMultiCombobox() {
    const [value, setValue] = React.useState<(typeof frameworks)[number][]>([
      frameworks[0],
      frameworks[1],
    ])

    return (
      <div className="grid w-[350px] items-center gap-1.5">
        <Label>Frameworks</Label>
        <Combobox
          multiple
          options={frameworks}
          value={value}
          onChange={setValue}
          placeholder="Select frameworks..."
        />
        <p className="text-sm text-[var(--muted-foreground)]">
          Selected: {value.length > 0 ? value.map((v) => v.label).join(', ') : 'None'}
        </p>
      </div>
    )
  },
}

export const MultiSelectManyOptions: Story = {
  render: function MultiSelectManyOptions() {
    const [value, setValue] = React.useState<(typeof countries)[number][]>([
      countries[0],
      countries[1],
      countries[2],
      countries[4],
      countries[5],
    ])

    return (
      <div className="grid w-[350px] items-center gap-1.5">
        <Label>Countries (shows +N more)</Label>
        <Combobox
          multiple
          options={countries}
          value={value}
          onChange={setValue}
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
          defaultValue={[frameworks[0], frameworks[1], frameworks[2], frameworks[3]]}
          placeholder="Select frameworks..."
          maxDisplayItems={2}
        />
      </div>
      <div className="space-y-2">
        <Label>Max 5 displayed</Label>
        <Combobox
          multiple
          options={frameworks}
          defaultValue={[frameworks[0], frameworks[1], frameworks[2], frameworks[3]]}
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

// ============================================================================
// Adornment Examples
// ============================================================================

// Inline SVG icons used across adornment stories
const GlobeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </svg>
)

const FilterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
)

const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </svg>
)

const InfoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
)

/** Decorative start adornment — no click handler, rendered as a non-interactive span */
export const WithStartAdornment: Story = {
  render: () => (
    <div className="grid w-[300px] items-center gap-1.5">
      <Label>Country</Label>
      <Combobox
        options={countries}
        placeholder="Select country..."
        startAdornment={<GlobeIcon />}
      />
    </div>
  ),
}

/** Decorative end adornment — no click handler */
export const WithEndAdornment: Story = {
  render: () => (
    <div className="grid w-[300px] items-center gap-1.5">
      <Label>Framework</Label>
      <Combobox
        options={frameworks}
        placeholder="Select framework..."
        endAdornment={<FilterIcon />}
      />
    </div>
  ),
}

/** Both adornments as decorative icons */
export const WithBothAdornments: Story = {
  render: () => (
    <div className="grid w-[300px] items-center gap-1.5">
      <Label>Scheduled Date</Label>
      <Combobox
        options={frameworks}
        placeholder="Select framework..."
        startAdornment={<CalendarIcon />}
        endAdornment={<InfoIcon />}
      />
    </div>
  ),
}

/** Clickable start adornment — handler fires without opening the dropdown */
export const WithClickableStartAdornment: Story = {
  render: function WithClickableStartAdornment() {
    const [log, setLog] = React.useState<string | null>(null)

    return (
      <div className="grid w-[300px] items-center gap-1.5">
        <Label>Country (clickable globe)</Label>
        <Combobox
          options={countries}
          placeholder="Select country..."
          startAdornment={<GlobeIcon />}
          onStartAdornmentClick={() => setLog('Globe clicked!')}
        />
        {log && (
          <p className="text-xs text-[var(--muted-foreground)]">{log}</p>
        )}
      </div>
    )
  },
}

/** Clickable end adornment — demonstrates a custom action slot */
export const WithClickableEndAdornment: Story = {
  render: function WithClickableEndAdornment() {
    const [log, setLog] = React.useState<string | null>(null)

    return (
      <div className="grid w-[300px] items-center gap-1.5">
        <Label>Framework (clickable filter)</Label>
        <Combobox
          options={frameworks}
          placeholder="Select framework..."
          endAdornment={<FilterIcon />}
          onEndAdornmentClick={() => setLog('Filter clicked!')}
        />
        {log && (
          <p className="text-xs text-[var(--muted-foreground)]">{log}</p>
        )}
      </div>
    )
  },
}

/** Both adornments clickable — full API demonstration */
export const WithBothClickableAdornments: Story = {
  render: function WithBothClickableAdornments() {
    const [log, setLog] = React.useState<string>('—')

    return (
      <div className="grid w-[320px] items-center gap-1.5">
        <Label>Framework</Label>
        <Combobox
          options={frameworks}
          placeholder="Select framework..."
          startAdornment={<GlobeIcon />}
          onStartAdornmentClick={() => setLog('Start adornment clicked')}
          endAdornment={<FilterIcon />}
          onEndAdornmentClick={() => setLog('End adornment clicked')}
        />
        <p className="text-xs text-[var(--muted-foreground)]">Last action: {log}</p>
      </div>
    )
  },
}

/** Adornments work identically in multi-select mode */
export const MultiSelectWithAdornments: Story = {
  render: function MultiSelectWithAdornments() {
    const [value, setValue] = React.useState<(typeof countries)[number][]>([])

    return (
      <div className="grid w-[350px] items-center gap-1.5">
        <Label>Countries</Label>
        <Combobox
          multiple
          options={countries}
          value={value}
          onChange={setValue}
          placeholder="Select countries..."
          startAdornment={<GlobeIcon />}
          endAdornment={<FilterIcon />}
        />
        <p className="text-sm text-[var(--muted-foreground)]">
          {value.length} selected
        </p>
      </div>
    )
  },
}
