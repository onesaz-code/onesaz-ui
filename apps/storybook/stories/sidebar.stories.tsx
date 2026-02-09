import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarItem,
  SidebarSubMenu,
  SidebarToggle,
  Avatar,
  Badge,
  TopBar,
  TopBarBrand,
  TopBarSection,
  Button,
} from '@onesaz/ui'

const meta: Meta<typeof Sidebar> = {
  title: 'Layout/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Sidebar>

// Icons
const HomeIcon = () => (
  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
)

const UsersIcon = () => (
  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
)

const FolderIcon = () => (
  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>
  </svg>
)

const SettingsIcon = () => (
  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>
  </svg>
)

const InboxIcon = () => (
  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
  </svg>
)

const CalendarIcon = () => (
  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>
  </svg>
)

const ChartIcon = () => (
  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/>
  </svg>
)

const HelpIcon = () => (
  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>
  </svg>
)

const LogoIcon = () => (
  <svg className="h-8 w-8 text-accent" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
  </svg>
)

export const Default: Story = {
  render: () => (
    <div className="h-[600px] flex">
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <LogoIcon />
            <span className="font-semibold text-lg">Onesaz</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarItem icon={<HomeIcon />} active>Dashboard</SidebarItem>
            <SidebarItem icon={<InboxIcon />} badge={<Badge>5</Badge>}>Inbox</SidebarItem>
            <SidebarItem icon={<CalendarIcon />}>Calendar</SidebarItem>
            <SidebarItem icon={<FolderIcon />}>Projects</SidebarItem>
            <SidebarItem icon={<UsersIcon />}>Team</SidebarItem>
            <SidebarItem icon={<ChartIcon />}>Analytics</SidebarItem>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarItem icon={<SettingsIcon />}>Settings</SidebarItem>
          <SidebarItem icon={<HelpIcon />}>Help & Support</SidebarItem>
        </SidebarFooter>
      </Sidebar>
      <main className="flex-1 p-6 bg-muted/30">
        <h1 className="text-2xl font-bold">Main Content</h1>
        <p className="text-muted-foreground mt-2">This is where your main content goes.</p>
      </main>
    </div>
  ),
}

export const WithGroups: Story = {
  render: () => (
    <div className="h-[600px] flex">
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <LogoIcon />
            <span className="font-semibold text-lg">Onesaz</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup label="Main">
            <SidebarItem icon={<HomeIcon />} active>Dashboard</SidebarItem>
            <SidebarItem icon={<InboxIcon />} badge={<Badge variant="secondary">12</Badge>}>Inbox</SidebarItem>
            <SidebarItem icon={<CalendarIcon />}>Calendar</SidebarItem>
          </SidebarGroup>
          <SidebarGroup label="Workspace">
            <SidebarItem icon={<FolderIcon />}>Projects</SidebarItem>
            <SidebarItem icon={<UsersIcon />}>Team</SidebarItem>
            <SidebarItem icon={<ChartIcon />}>Analytics</SidebarItem>
          </SidebarGroup>
          <SidebarGroup label="Settings">
            <SidebarItem icon={<SettingsIcon />}>Preferences</SidebarItem>
            <SidebarItem icon={<HelpIcon />}>Help</SidebarItem>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <main className="flex-1 p-6 bg-muted/30">
        <h1 className="text-2xl font-bold">Grouped Sidebar</h1>
      </main>
    </div>
  ),
}

export const WithSubMenus: Story = {
  render: () => (
    <div className="h-[600px] flex">
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <LogoIcon />
            <span className="font-semibold text-lg">Onesaz</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarItem icon={<HomeIcon />} active>Dashboard</SidebarItem>
            <SidebarSubMenu icon={<FolderIcon />} label="Projects" defaultOpen>
              <SidebarItem>All Projects</SidebarItem>
              <SidebarItem>Active</SidebarItem>
              <SidebarItem>Archived</SidebarItem>
            </SidebarSubMenu>
            <SidebarSubMenu icon={<UsersIcon />} label="Team">
              <SidebarItem>Members</SidebarItem>
              <SidebarItem>Roles</SidebarItem>
              <SidebarItem>Invitations</SidebarItem>
            </SidebarSubMenu>
            <SidebarSubMenu icon={<ChartIcon />} label="Reports">
              <SidebarItem>Overview</SidebarItem>
              <SidebarItem>Sales</SidebarItem>
              <SidebarItem>Traffic</SidebarItem>
            </SidebarSubMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarItem icon={<SettingsIcon />}>Settings</SidebarItem>
        </SidebarFooter>
      </Sidebar>
      <main className="flex-1 p-6 bg-muted/30">
        <h1 className="text-2xl font-bold">Sidebar with Submenus</h1>
      </main>
    </div>
  ),
}

export const Collapsible: Story = {
  render: function CollapsibleSidebar() {
    const [collapsed, setCollapsed] = useState(false)

    return (
      <div className="h-[600px] flex">
        <Sidebar collapsed={collapsed} onCollapsedChange={setCollapsed}>
          <SidebarHeader className="justify-between">
            {!collapsed && (
              <div className="flex items-center gap-2">
                <LogoIcon />
                <span className="font-semibold text-lg">Onesaz</span>
              </div>
            )}
            {collapsed && <LogoIcon />}
            <SidebarToggle />
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup label="Main">
              <SidebarItem icon={<HomeIcon />} active>Dashboard</SidebarItem>
              <SidebarItem icon={<InboxIcon />} badge={<Badge>5</Badge>}>Inbox</SidebarItem>
              <SidebarItem icon={<CalendarIcon />}>Calendar</SidebarItem>
              <SidebarItem icon={<FolderIcon />}>Projects</SidebarItem>
              <SidebarItem icon={<UsersIcon />}>Team</SidebarItem>
              <SidebarItem icon={<ChartIcon />}>Analytics</SidebarItem>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarItem icon={<SettingsIcon />}>Settings</SidebarItem>
          </SidebarFooter>
        </Sidebar>
        <main className="flex-1 p-6 bg-muted/30">
          <h1 className="text-2xl font-bold">Collapsible Sidebar</h1>
          <p className="text-muted-foreground mt-2">
            Click the toggle button in the sidebar header to collapse/expand.
          </p>
          <Button className="mt-4" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          </Button>
        </main>
      </div>
    )
  },
}

export const WithUserFooter: Story = {
  render: () => (
    <div className="h-[600px] flex">
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <LogoIcon />
            <span className="font-semibold text-lg">Onesaz</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarItem icon={<HomeIcon />} active>Dashboard</SidebarItem>
            <SidebarItem icon={<InboxIcon />}>Inbox</SidebarItem>
            <SidebarItem icon={<FolderIcon />}>Projects</SidebarItem>
            <SidebarItem icon={<UsersIcon />}>Team</SidebarItem>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted cursor-pointer">
            <Avatar
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
              name="John Doe"
              size="sm"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">John Doe</p>
              <p className="text-xs text-muted-foreground truncate">john@example.com</p>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <main className="flex-1 p-6 bg-muted/30">
        <h1 className="text-2xl font-bold">Sidebar with User Footer</h1>
      </main>
    </div>
  ),
}

export const FullLayout: Story = {
  name: 'Full Layout (TopBar + Sidebar)',
  render: function FullLayout() {
    const [collapsed, setCollapsed] = useState(false)

    return (
      <div className="h-[700px] flex flex-col">
        <TopBar bordered>
          <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)} className="mr-2">
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>
            </svg>
          </Button>
          <TopBarBrand name="Onesaz Admin" />
          <TopBarSection align="right">
            <Avatar name="John Doe" size="sm" />
          </TopBarSection>
        </TopBar>
        <div className="flex flex-1 overflow-hidden">
          <Sidebar collapsed={collapsed} onCollapsedChange={setCollapsed} bordered={false} className="border-r border-border">
            <SidebarContent>
              <SidebarGroup label="Menu">
                <SidebarItem icon={<HomeIcon />} active>Dashboard</SidebarItem>
                <SidebarItem icon={<InboxIcon />} badge={<Badge>3</Badge>}>Messages</SidebarItem>
                <SidebarItem icon={<FolderIcon />}>Projects</SidebarItem>
                <SidebarItem icon={<UsersIcon />}>Team</SidebarItem>
                <SidebarItem icon={<ChartIcon />}>Reports</SidebarItem>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
              <SidebarItem icon={<SettingsIcon />}>Settings</SidebarItem>
            </SidebarFooter>
          </Sidebar>
          <main className="flex-1 p-6 bg-muted/30 overflow-auto">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="p-4 bg-card rounded-lg border border-border">
                  <h3 className="font-medium">Card {i}</h3>
                  <p className="text-sm text-muted-foreground mt-1">Some content here</p>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    )
  },
}
