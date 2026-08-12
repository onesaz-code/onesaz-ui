import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { ToggleGroup } from '../components/toggle-group'
import { StatusDot } from '../components/status-dot'
import { Typography } from '../components/typography'
import { SelectField } from '../components/select-field'
import { Stepper } from '../components/stepper'

describe('ToggleGroup', () => {
  const opts = [{ value: 'list', label: 'List' }, { value: 'board', label: 'Board' }]
  it('renders a radiogroup with the active option checked', () => {
    render(<ToggleGroup value="list" onValueChange={() => {}} options={opts} />)
    expect(screen.getByRole('radiogroup')).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: 'List' })).toHaveAttribute('aria-checked', 'true')
    expect(screen.getByRole('radio', { name: 'Board' })).toHaveAttribute('aria-checked', 'false')
  })
  it('calls onValueChange with the clicked value', async () => {
    const fn = vi.fn()
    render(<ToggleGroup value="list" onValueChange={fn} options={opts} />)
    await userEvent.click(screen.getByRole('radio', { name: 'Board' }))
    expect(fn).toHaveBeenCalledWith('board')
  })
  it('has no a11y violations', async () => {
    const { container } = render(<ToggleGroup value="list" onValueChange={() => {}} options={opts} />)
    expect(await axe(container)).toHaveNoViolations()
  })
})

describe('StatusDot', () => {
  it('applies the semantic colour', () => {
    const { container } = render(<StatusDot color="success" />)
    expect(container.querySelector('.bg-success-500')).toBeTruthy()
  })
  it('renders a label and pulse ring', () => {
    const { container } = render(<StatusDot color="error" pulse label="Down" />)
    expect(screen.getByText('Down')).toBeInTheDocument()
    expect(container.querySelector('.animate-ping')).toBeTruthy()
  })
})

describe('Typography mono / tabularNums', () => {
  it('mono adds font-mono', () => {
    render(<Typography mono>DS-100</Typography>)
    expect(screen.getByText('DS-100').className).toContain('font-mono')
  })
  it('tabularNums adds tabular-nums', () => {
    render(<Typography tabularNums>1,182</Typography>)
    expect(screen.getByText('1,182').className).toContain('tabular-nums')
  })
})

describe('SelectField', () => {
  it('renders label with required marker and matches TextField spacing', () => {
    const { container } = render(
      <SelectField label="State" required placeholder="Select state" helperText="Determines GST" options={[{ value: 'ka', label: 'Karnataka' }]} />
    )
    expect(screen.getByText('State')).toBeInTheDocument()
    expect(screen.getByText('*')).toBeInTheDocument()
    expect(screen.getByText('Determines GST')).toBeInTheDocument()
    // structural parity with TextField
    expect((container.firstChild as HTMLElement).className).toContain('gap-1.5')
  })
})

describe('Stepper', () => {
  const steps = [{ label: 'Cart' }, { label: 'Shipping' }, { label: 'Payment' }]
  it('marks the active step with aria-current and renders all labels', () => {
    render(<Stepper steps={steps} active={1} />)
    steps.forEach((s) => expect(screen.getByText(s.label)).toBeInTheDocument())
    expect(screen.getByText('Shipping').closest('li')).toHaveAttribute('aria-current', 'step')
  })
  it('shows a check on completed steps (no number)', () => {
    render(<Stepper steps={steps} active={2} />)
    const cartLi = screen.getByText('Cart').closest('li') as HTMLElement
    expect(cartLi.querySelector('svg')).toBeTruthy()
  })
})
