import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Chip } from '@onesaz/ui'

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant:   { control: 'select', options: ['filled', 'outlined'] },
    color:     { control: 'select', options: ['default', 'success', 'warning', 'error', 'destructive'] },
    size:      { control: 'select', options: ['small', 'medium'] },
    clickable: { control: 'boolean' },
    disabled:  { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Chip>

export const Default: Story = {
  args: { label: 'Chip' },
}

// ─── All colors × variants ────────────────────────────────────────────────────

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-3">
      {(['filled', 'outlined'] as const).map((variant) => (
        <div key={variant} className="flex flex-wrap gap-2 items-center">
          <span className="text-xs text-muted-foreground w-16 capitalize shrink-0">{variant}</span>
          <Chip label="Default"     variant={variant} color="default" />
          <Chip label="Success"     variant={variant} color="success" />
          <Chip label="Warning"     variant={variant} color="warning" />
          <Chip label="Error"       variant={variant} color="error" />
          <Chip label="Destructive" variant={variant} color="destructive" />
        </div>
      ))}
    </div>
  ),
}

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => (
    <div className="space-y-3">
      {(['filled', 'outlined'] as const).map((variant) => (
        <div key={variant} className="flex flex-wrap gap-2 items-center">
          <span className="text-xs text-muted-foreground w-16 capitalize shrink-0">{variant}</span>
          <Chip label="Small"  size="small"  variant={variant} color="success" />
          <Chip label="Medium" size="medium" variant={variant} color="success" />
        </div>
      ))}
    </div>
  ),
}

// ─── Deletable ────────────────────────────────────────────────────────────────

export const Deletable: Story = {
  render: function Render() {
    const [chips, setChips] = React.useState(['React', 'TypeScript', 'Tailwind', 'Vitest'])
    const remove = (chip: string) => setChips((p) => p.filter((c) => c !== chip))
    return (
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {chips.map((c) => (
            <Chip key={c} label={c} color="default" onDelete={() => remove(c)} />
          ))}
          {chips.length === 0 && (
            <button
              className="text-xs text-muted-foreground underline"
              onClick={() => setChips(['React', 'TypeScript', 'Tailwind', 'Vitest'])}
            >
              Reset
            </button>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          Click ✕ or focus a chip and press <kbd className="px-1 border rounded">Delete</kbd> /&nbsp;
          <kbd className="px-1 border rounded">Backspace</kbd>
        </p>
      </div>
    )
  },
}

// ─── Clickable / filter ───────────────────────────────────────────────────────

export const ClickableFilter: Story = {
  render: function Render() {
    const filters = [
      { label: 'All',     color: 'default'  },
      { label: 'Success', color: 'success'  },
      { label: 'Warning', color: 'warning'  },
      { label: 'Error',   color: 'error'    },
    ] as const
    const [active, setActive] = React.useState<string[]>(['All'])
    const toggle = (v: string) =>
      setActive((p) => p.includes(v) ? p.filter((x) => x !== v) : [...p, v])
    return (
      <div className="space-y-2">
        <div className="flex flex-wrap gap-2">
          {filters.map(({ label, color }) => (
            <Chip
              key={label}
              label={label}
              clickable
              color={color}
              variant={active.includes(label) ? 'filled' : 'outlined'}
              onClick={() => toggle(label)}
            />
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          Active: {active.join(', ')}. Also supports <kbd className="px-1 border rounded">Enter</kbd> /&nbsp;
          <kbd className="px-1 border rounded">Space</kbd>
        </p>
      </div>
    )
  },
}

// ─── Link chip ────────────────────────────────────────────────────────────────

export const LinkChip: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Chip label="Visit site" color="default" href="#" clickable />
      <Chip label="Documentation" color="success" variant="outlined" href="#" clickable />
    </div>
  ),
}

// ─── With icon ────────────────────────────────────────────────────────────────

const CheckIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
  </svg>
)
const WarnIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
  </svg>
)

export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Chip label="Verified"  color="success" icon={<CheckIcon />} />
      <Chip label="Warning"   color="warning" variant="outlined" icon={<WarnIcon />} />
      <Chip label="Verified"  color="success" size="small" icon={<CheckIcon />} />
    </div>
  ),
}

// ─── With avatar ─────────────────────────────────────────────────────────────

export const WithAvatar: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Chip
        label="Arjun"
        avatar={<img src="https://i.pravatar.cc/40?img=3" alt="Arjun" />}
        color="default"
        onDelete={() => {}}
      />
      <Chip
        label="Priya"
        avatar={<img src="https://i.pravatar.cc/40?img=5" alt="Priya" />}
        variant="outlined"
        color="default"
      />
    </div>
  ),
}

// ─── Disabled ─────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Chip label="Disabled filled"   color="success"  disabled />
      <Chip label="Disabled outlined" color="error"    disabled variant="outlined" />
      <Chip label="Deletable"         color="default"  disabled onDelete={() => {}} />
    </div>
  ),
}
