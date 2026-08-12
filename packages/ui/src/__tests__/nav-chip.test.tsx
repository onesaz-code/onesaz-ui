import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NavItem } from '../components/nav-item'
import { ChipInput } from '../components/chip-input'

describe('NavItem', () => {
  it('renders a real button by default and fires onClick', async () => {
    const fn = vi.fn()
    render(<NavItem onClick={fn}>Inbox</NavItem>)
    const el = screen.getByRole('button', { name: /Inbox/ })
    expect(el.tagName).toBe('BUTTON')
    await userEvent.click(el)
    expect(fn).toHaveBeenCalledOnce()
  })
  it('active sets aria-current and renders the trailing adornment', () => {
    render(<NavItem active endAdornment={12}>Inbox</NavItem>)
    const el = screen.getByRole('button', { name: /Inbox/ })
    expect(el).toHaveAttribute('aria-current', 'page')
    expect(screen.getByText('12')).toBeInTheDocument()
  })
  it('renders an anchor when href is set', () => {
    render(<NavItem href="/sent">Sent</NavItem>)
    expect(screen.getByRole('link', { name: /Sent/ })).toHaveAttribute('href', '/sent')
  })
})

describe('ChipInput', () => {
  it('renders existing chips', () => {
    render(<ChipInput value={['a@x.com', 'b@y.com']} onChange={() => {}} />)
    expect(screen.getByText('a@x.com')).toBeInTheDocument()
    expect(screen.getByText('b@y.com')).toBeInTheDocument()
  })
  it('adds a chip on Enter', async () => {
    const fn = vi.fn()
    render(<ChipInput value={['a@x.com']} onChange={fn} aria-label="Recipients" />)
    const input = screen.getByLabelText('Recipients')
    await userEvent.type(input, 'c@z.com{Enter}')
    expect(fn).toHaveBeenCalledWith(['a@x.com', 'c@z.com'])
  })
  it('removes a chip via its remove button', async () => {
    const fn = vi.fn()
    render(<ChipInput value={['a@x.com', 'b@y.com']} onChange={fn} />)
    await userEvent.click(screen.getByLabelText('Remove a@x.com'))
    expect(fn).toHaveBeenCalledWith(['b@y.com'])
  })
})
