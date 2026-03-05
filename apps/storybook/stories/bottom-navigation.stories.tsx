import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { BottomNavigation, BottomNavigationAction } from '@onesaz/ui'

// ─── Icons ────────────────────────────────────────────────────────────────────

const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
)

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
)

const FavoritesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
)

const ProfileIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4" />
    <path d="M20 21a8 8 0 1 0-16 0" />
  </svg>
)

const NotificationsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
)

const FolderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
)

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof BottomNavigation> = {
  title: 'Components/BottomNavigation',
  component: BottomNavigation,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof BottomNavigation>

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState('home')
    return (
      <div className="w-96 border rounded-lg overflow-hidden shadow">
        <BottomNavigation value={value} onChange={(_, v) => setValue(v)} showLabels>
          <BottomNavigationAction label="Home" icon={<HomeIcon />} value="home" />
          <BottomNavigationAction label="Search" icon={<SearchIcon />} value="search" />
          <BottomNavigationAction label="Favorites" icon={<FavoritesIcon />} value="favorites" />
          <BottomNavigationAction label="Profile" icon={<ProfileIcon />} value="profile" />
        </BottomNavigation>
      </div>
    )
  },
}

export const NoLabels: Story = {
  render: () => {
    const [value, setValue] = React.useState('home')
    return (
      <div className="w-96 border rounded-lg overflow-hidden shadow">
        <BottomNavigation value={value} onChange={(_, v) => setValue(v)}>
          <BottomNavigationAction label="Home" icon={<HomeIcon />} value="home" />
          <BottomNavigationAction label="Search" icon={<SearchIcon />} value="search" />
          <BottomNavigationAction label="Favorites" icon={<FavoritesIcon />} value="favorites" />
          <BottomNavigationAction label="Profile" icon={<ProfileIcon />} value="profile" />
        </BottomNavigation>
      </div>
    )
  },
}

export const ShowLabelOnlyForSelected: Story = {
  name: 'Label only on selected (default)',
  render: () => {
    const [value, setValue] = React.useState('home')
    return (
      <div className="w-96 border rounded-lg overflow-hidden shadow">
        <BottomNavigation value={value} onChange={(_, v) => setValue(v)}>
          <BottomNavigationAction label="Home" icon={<HomeIcon />} value="home" />
          <BottomNavigationAction label="Search" icon={<SearchIcon />} value="search" />
          <BottomNavigationAction label="Favorites" icon={<FavoritesIcon />} value="favorites" />
          <BottomNavigationAction label="Profile" icon={<ProfileIcon />} value="profile" />
        </BottomNavigation>
      </div>
    )
  },
}

export const FiveItems: Story = {
  render: () => {
    const [value, setValue] = React.useState('home')
    return (
      <div className="w-96 border rounded-lg overflow-hidden shadow">
        <BottomNavigation value={value} onChange={(_, v) => setValue(v)} showLabels>
          <BottomNavigationAction label="Home" icon={<HomeIcon />} value="home" />
          <BottomNavigationAction label="Search" icon={<SearchIcon />} value="search" />
          <BottomNavigationAction label="Files" icon={<FolderIcon />} value="files" />
          <BottomNavigationAction label="Alerts" icon={<NotificationsIcon />} value="alerts" />
          <BottomNavigationAction label="Profile" icon={<ProfileIcon />} value="profile" />
        </BottomNavigation>
      </div>
    )
  },
}

export const Disabled: Story = {
  render: () => {
    const [value, setValue] = React.useState('home')
    return (
      <div className="w-96 border rounded-lg overflow-hidden shadow">
        <BottomNavigation value={value} onChange={(_, v) => setValue(v)} showLabels>
          <BottomNavigationAction label="Home" icon={<HomeIcon />} value="home" />
          <BottomNavigationAction label="Search" icon={<SearchIcon />} value="search" />
          <BottomNavigationAction label="Favorites" icon={<FavoritesIcon />} value="favorites" disabled />
          <BottomNavigationAction label="Profile" icon={<ProfileIcon />} value="profile" disabled />
        </BottomNavigation>
      </div>
    )
  },
}

export const FixedToBottom: Story = {
  render: () => {
    const [value, setValue] = React.useState('home')
    return (
      <div className="relative w-96 h-80 border rounded-lg overflow-hidden shadow bg-muted/30">
        <div className="p-4 text-sm text-muted-foreground">
          Page content area — BottomNavigation is fixed to the bottom of this container.
        </div>
        <BottomNavigation
          value={value}
          onChange={(_, v) => setValue(v)}
          showLabels
          className="absolute bottom-0 left-0 right-0"
        >
          <BottomNavigationAction label="Home" icon={<HomeIcon />} value="home" />
          <BottomNavigationAction label="Search" icon={<SearchIcon />} value="search" />
          <BottomNavigationAction label="Alerts" icon={<NotificationsIcon />} value="alerts" />
          <BottomNavigationAction label="Profile" icon={<ProfileIcon />} value="profile" />
        </BottomNavigation>
      </div>
    )
  },
}
