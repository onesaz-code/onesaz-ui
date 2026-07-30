import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Button } from '../components/button'
import { Card, CardHeader, CardTitle, CardContent } from '../components/card'
import { Stat } from '../components/stat'
import { EmptyState } from '../components/empty-state'

describe('accessibility (jest-axe)', () => {
  it('Button has no violations', async () => {
    const { container } = render(<Button>Save</Button>)
    expect(await axe(container)).toHaveNoViolations()
  })

  it('Card composition has no violations', async () => {
    const { container } = render(
      <Card>
        <CardHeader><CardTitle>Report</CardTitle></CardHeader>
        <CardContent>Body content</CardContent>
      </Card>
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  it('Stat has no violations', async () => {
    const { container } = render(<Stat label="Users" value="1,204" delta="+2%" trend="up" />)
    expect(await axe(container)).toHaveNoViolations()
  })

  it('EmptyState has no violations', async () => {
    const { container } = render(<EmptyState title="No data" description="Nothing here yet" />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
