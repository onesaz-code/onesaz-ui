import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Stat } from '../components/stat'
import { Table, TableBody, TableRow, TableCell, TableHead } from '../components/table'
import { CardTitle } from '../components/card'
import { Button, IconButton } from '../components/button'
import { EmptyState, ErrorState } from '../components/empty-state'

describe('Stat', () => {
  it('renders label and value', () => {
    render(<Stat label="Present today" value="1,182" />)
    expect(screen.getByText('Present today')).toBeInTheDocument()
    expect(screen.getByText('1,182')).toBeInTheDocument()
  })
  it('trend up colors the delta green (positive sentiment)', () => {
    render(<Stat label="x" value="1" delta="+2.1%" trend="up" />)
    expect(screen.getByText('+2.1%').className).toContain('text-success-600')
  })
  it('sentiment overrides trend color — up arrow but red (lower-is-better)', () => {
    render(<Stat label="Error rate" value="0.4%" delta="+9" trend="up" sentiment="negative" />)
    expect(screen.getByText('+9').className).toContain('text-error-600')
  })
})

describe('Table cell alignment', () => {
  const wrap = (cell: React.ReactNode) =>
    render(<Table><TableBody><TableRow>{cell}</TableRow></TableBody></Table>)
  it('TableCell align="right" → text-right', () => {
    wrap(<TableCell align="right">$5</TableCell>)
    expect(screen.getByText('$5').className).toContain('text-right')
  })
  it('TableHead defaults to left, align="right" overrides', () => {
    render(<Table><TableBody><TableRow><TableHead align="right">Amt</TableHead></TableRow></TableBody></Table>)
    expect(screen.getByText('Amt').className).toContain('text-right')
  })
})

describe('CardTitle size', () => {
  it('defaults to text-2xl', () => {
    render(<CardTitle>Title</CardTitle>)
    expect(screen.getByText('Title').className).toContain('text-2xl')
  })
  it('size="sm" → text-base', () => {
    render(<CardTitle size="sm">Section</CardTitle>)
    expect(screen.getByText('Section').className).toContain('text-base')
  })
})

describe('Button / IconButton icon sizing', () => {
  it('Button constrains the child svg via [&_svg]', () => {
    render(<Button startIcon={<svg data-testid="ic" />}>Go</Button>)
    const wrapper = screen.getByTestId('ic').parentElement as HTMLElement
    expect(wrapper.className).toContain('[&_svg]:h-full')
  })
  it('IconButton md constrains the glyph to h-5', () => {
    render(<IconButton aria-label="star" size="md"><svg /></IconButton>)
    expect(screen.getByLabelText('star').className).toContain('[&_svg]:h-5')
  })
})

describe('EmptyState / ErrorState', () => {
  it('EmptyState renders title, description, action', () => {
    render(<EmptyState title="No records" description="Nothing yet" action={<button>Add</button>} />)
    expect(screen.getByText('No records')).toBeInTheDocument()
    expect(screen.getByText('Nothing yet')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument()
  })
  it('ErrorState shows a default message and fires onRetry', async () => {
    const onRetry = vi.fn()
    render(<ErrorState onRetry={onRetry} />)
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Try again' }))
    expect(onRetry).toHaveBeenCalledOnce()
  })
})
