import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Sidebar, SidebarItem } from '../components/sidebar'

describe('SidebarItem a11y (div → button fix)', () => {
  it('renders a real <button>, not a role="button" div', () => {
    render(<Sidebar><SidebarItem>Home</SidebarItem></Sidebar>)
    const item = screen.getByRole('button', { name: 'Home' })
    expect(item.tagName).toBe('BUTTON')
  })

  it('is keyboard-operable — Enter/Space fire onClick natively', async () => {
    const onClick = vi.fn()
    render(<Sidebar><SidebarItem onClick={onClick}>Reports</SidebarItem></Sidebar>)
    const item = screen.getByRole('button', { name: 'Reports' })
    item.focus()
    await userEvent.keyboard('{Enter}')
    await userEvent.keyboard(' ')
    expect(onClick).toHaveBeenCalledTimes(2)
  })

  it('renders an anchor when href is provided', () => {
    render(<Sidebar><SidebarItem href="/dash">Dashboard</SidebarItem></Sidebar>)
    expect(screen.getByRole('link', { name: 'Dashboard' })).toHaveAttribute('href', '/dash')
  })
})
