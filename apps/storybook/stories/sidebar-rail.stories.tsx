import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  SidebarRail,
  IconRail,
  IconRailHeader,
  IconRailContent,
  IconRailFooter,
  IconRailItem,
  RailPanel,
  RailPanelGroup,
  RailPanelItem,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarItem,
  SidebarSubMenu,
  Avatar,
  Badge,
  TopBar,
  TopBarBrand,
  TopBarSection,
  Input,
  InputAdornment,
} from '@onesaz/ui'

const meta: Meta<typeof SidebarRail> = {
  title: 'Layout/SidebarRail',
  component: SidebarRail,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SidebarRail>

// Icons
const HomeIcon = () => (
  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
)

const SearchIcon = () => (
  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
  </svg>
)

const FolderIcon = () => (
  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>
  </svg>
)

const UsersIcon = () => (
  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
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

const GitBranchIcon = () => (
  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>
  </svg>
)

const ExtensionsIcon = () => (
  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v4"/><path d="m15.2 7.8 2.8-2.8"/><path d="M18 12h4"/><path d="m15.2 16.2 2.8 2.8"/><path d="M12 18v4"/><path d="m4.9 19.1 2.8-2.8"/><path d="M2 12h4"/><path d="m4.9 4.9 2.8 2.8"/>
  </svg>
)

const LogoIcon = () => (
  <svg className="h-7 w-7 text-accent" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
  </svg>
)

const FileIcon = () => (
  <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/>
  </svg>
)

const ModuleIcon = ({ letter }: { letter: string }) => (
  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-muted text-[10px] font-semibold text-muted-foreground">
    {letter}
  </div>
)

const moduleNavigation = [
  {
    id: 'org',
    label: 'Organization',
    description: 'Setup, locations, users, automation',
    items: [
      { id: 'zonal', label: 'Zonal Creation' },
      { id: 'batches', label: 'Manage Batches' },
      { id: 'branch', label: 'Branch Creation' },
      { id: 'users', label: 'User Management' },
      { id: 'ay', label: 'Academic Year' },
      { id: 'activity', label: 'User Activity' },
      { id: 'utils', label: 'Utility Locations' },
      { id: 'automation', label: 'Automation Center' },
      { id: 'posts', label: 'Posts Feed' },
    ],
  },
  {
    id: 'admissions',
    label: 'Admissions',
    description: 'Leads → Applications → Enrollment',
    items: [
      { id: 'leads', label: 'Leads' },
      { id: 'applications', label: 'Applications' },
      { id: 'interviews', label: 'Interviews' },
      { id: 'offers', label: 'Offers' },
      { id: 'enroll', label: 'Enrollment' },
    ],
  },
  {
    id: 'academics',
    label: 'Academics',
    description: 'Classes, syllabus, timetable',
    items: [
      { id: 'classes', label: 'Classes' },
      { id: 'subjects', label: 'Subjects' },
      { id: 'timetable', label: 'Timetable' },
      { id: 'syllabus', label: 'Syllabus' },
      { id: 'homework', label: 'Homework' },
    ],
  },
  {
    id: 'finance',
    label: 'Finance',
    description: 'Fees, invoices, payments',
    items: [
      { id: 'feePlans', label: 'Fee Plans' },
      { id: 'invoices', label: 'Invoices' },
      { id: 'receipts', label: 'Receipts' },
      { id: 'refunds', label: 'Refunds' },
      { id: 'reports', label: 'Finance Reports' },
    ],
  },
  {
    id: 'attendance',
    label: 'Attendance',
    description: 'Biometric, shifts, reports',
    items: [
      { id: 'devices', label: 'Devices' },
      { id: 'shifts', label: 'Work Schedules' },
      { id: 'punches', label: 'Punch Logs' },
      { id: 'daily', label: 'Daily Attendance' },
      { id: 'attReports', label: 'Attendance Reports' },
    ],
  },
  {
    id: 'live',
    label: 'Live Classes',
    description: 'Sessions, recordings',
    items: [
      { id: 'sessions', label: 'Sessions' },
      { id: 'recordings', label: 'Recordings' },
      { id: 'hosts', label: 'Hosts' },
    ],
  },
  {
    id: 'questions',
    label: 'Questions',
    description: 'Question bank, exams',
    items: [
      { id: 'qb', label: 'Question Bank' },
      { id: 'exams', label: 'Exams' },
      { id: 'evaluations', label: 'Evaluations' },
    ],
  },
  {
    id: 'analysis',
    label: 'Analysis',
    description: 'Dashboards, insights',
    items: [
      { id: 'dash', label: 'Dashboards' },
      { id: 'student', label: 'Student Analytics' },
      { id: 'financeAna', label: 'Finance Analytics' },
    ],
  },
  {
    id: 'comms',
    label: 'Communications',
    description: 'SMS/WhatsApp/email',
    items: [
      { id: 'templates', label: 'Templates' },
      { id: 'campaigns', label: 'Campaigns' },
      { id: 'delivery', label: 'Delivery Reports' },
      { id: 'optIn', label: 'Consent / Opt-in' },
    ],
  },
  {
    id: 'offline',
    label: 'Offline Utilities',
    description: 'Sync, exports',
    items: [
      { id: 'sync', label: 'Sync Status' },
      { id: 'exports', label: 'Exports' },
      { id: 'imports', label: 'Imports' },
    ],
  },
  {
    id: 'inventory',
    label: 'Inventory',
    description: 'Assets, consumables',
    items: [
      { id: 'catalog', label: 'Item Catalog' },
      { id: 'po', label: 'Purchase Orders' },
      { id: 'stock', label: 'Stock Ledger' },
      { id: 'assign', label: 'Assignments' },
    ],
  },
  {
    id: 'transport',
    label: 'Transport',
    description: 'Routes, vehicles',
    items: [
      { id: 'routes', label: 'Routes' },
      { id: 'vehicles', label: 'Vehicles' },
      { id: 'stops', label: 'Stops' },
      { id: 'tracking', label: 'Live Tracking' },
    ],
  },
  {
    id: 'admin',
    label: 'Admin',
    description: 'Permissions, audit',
    items: [
      { id: 'roles', label: 'Roles & Permissions' },
      { id: 'audit', label: 'Audit Log' },
      { id: 'integrations', label: 'Integrations' },
      { id: 'settings', label: 'Settings' },
    ],
  },
]

const ModuleSidePanel = ({
  activeRail,
  onClose,
}: {
  activeRail?: string | null
  onClose?: () => void
}) => {
  const activeModule = moduleNavigation.find((module) => module.id === activeRail)
    ?? moduleNavigation[0]

  return (
    <Sidebar width={288}>
      <SidebarHeader className="gap-2">
        <div className="flex items-center justify-between w-full gap-3">
          <div className="flex items-center gap-2">
            <div className="text-sm font-semibold">{activeModule.label}</div>
            <div className="text-xs text-muted-foreground">{activeModule.description}</div>
          </div>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
              aria-label="Close sidebar"
              title="Close sidebar"
            >
              <svg
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup label="Module Navigation">
          <SidebarSubMenu
            icon={<ModuleIcon letter={activeModule.label.slice(0, 1).toUpperCase()} />}
            label={activeModule.label}
            defaultOpen
          >
            {activeModule.items.map((item) => (
              <SidebarItem key={item.id}>{item.label}</SidebarItem>
            ))}
          </SidebarSubMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center gap-3">
          <Avatar name="Harsha" size="sm" />
          <div className="text-sm">
            <div className="font-medium">Harsha Vardhan</div>
            <div className="text-xs text-muted-foreground">Admin</div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

const RailOverlayStory = () => {
  const [activeRail, setActiveRail] = React.useState<string | null>('org')
  const [railExpanded, setRailExpanded] = React.useState(false)
  const [sidebarOpen, setSidebarOpen] = React.useState(true)
  const lastActiveRailRef = React.useRef<string | null>('org')

  React.useEffect(() => {
    if (activeRail) {
      lastActiveRailRef.current = activeRail
    }
  }, [activeRail])

  const handleSidebarClose = () => {
    setSidebarOpen(false)
    setActiveRail(null)
    setRailExpanded(false)
  }

  const handleSidebarOpen = () => {
    setSidebarOpen(true)
    setActiveRail(lastActiveRailRef.current ?? 'org')
  }

  return (
    <div className="h-[600px] flex">
      {sidebarOpen && (
        <SidebarRail
          activeRail={activeRail}
          onActiveRailChange={setActiveRail}
          expandableRail
          overlayRail
          railExpandedWidth={240}
          railExpanded={railExpanded}
          onRailExpandedChange={setRailExpanded}
          defaultRailExpanded={false}
        >
          <IconRail>
            <IconRailHeader>
              <IconRailItem
                asButton
                toggleRail
                icon={
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </svg>
                }
                label="Menu"
              />
            </IconRailHeader>
            <IconRailContent>
              {moduleNavigation.map((module) => (
                <IconRailItem
                  key={module.id}
                  railId={module.id}
                  icon={<ModuleIcon letter={module.label.slice(0, 1).toUpperCase()} />}
                  label={module.label}
                />
              ))}
            </IconRailContent>
            <IconRailFooter>
              <IconRailItem icon={<SettingsIcon />} label="Settings" />
              <Avatar name="Harsha" size="sm" className="mt-2" />
            </IconRailFooter>
          </IconRail>
        </SidebarRail>
      )}

      {sidebarOpen && (
        <ModuleSidePanel activeRail={activeRail} onClose={handleSidebarClose} />
      )}

      <main className="flex-1 p-6 bg-muted/30 overflow-auto">
        {!sidebarOpen && (
          <button
            type="button"
            onClick={handleSidebarOpen}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-border bg-card text-sm font-medium shadow-sm hover:bg-muted"
          >
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <line x1="9" y1="3" x2="9" y2="21" />
            </svg>
            Open sidebar
          </button>
        )}
        <h1 className="text-2xl font-bold mb-4">Rail Overlay Behavior</h1>
        <p className="text-muted-foreground">
          The secondary panel stays open. Expanding the icon rail overlays on top of it.
        </p>
      </main>
    </div>
  )
}

export const Default: Story = {
  render: () => (
    <div className="h-[600px] flex">
      <SidebarRail defaultActiveRail="explorer">
        <IconRail>
          <IconRailHeader>
            <LogoIcon />
          </IconRailHeader>
          <IconRailContent>
            <IconRailItem railId="explorer" icon={<FolderIcon />} label="Explorer" />
            <IconRailItem railId="search" icon={<SearchIcon />} label="Search" />
            <IconRailItem railId="git" icon={<GitBranchIcon />} label="Source Control" />
            <IconRailItem railId="extensions" icon={<ExtensionsIcon />} label="Extensions" />
          </IconRailContent>
          <IconRailFooter>
            <IconRailItem railId="settings" icon={<SettingsIcon />} label="Settings" />
            <Avatar name="John Doe" size="sm" className="mt-2" />
          </IconRailFooter>
        </IconRail>

        <RailPanel railId="explorer" title="Explorer">
          <RailPanelGroup label="Open Editors">
            <RailPanelItem icon={<FileIcon />} active>index.tsx</RailPanelItem>
            <RailPanelItem icon={<FileIcon />}>styles.css</RailPanelItem>
          </RailPanelGroup>
          <RailPanelGroup label="Onesaz UI">
            <RailPanelItem icon={<FolderIcon />}>src</RailPanelItem>
            <RailPanelItem icon={<FolderIcon />}>components</RailPanelItem>
            <RailPanelItem icon={<FileIcon />}>package.json</RailPanelItem>
            <RailPanelItem icon={<FileIcon />}>tsconfig.json</RailPanelItem>
          </RailPanelGroup>
        </RailPanel>

        <RailPanel railId="search" title="Search">
          <div className="p-3">
            <Input placeholder="Search files..." inputSize="sm" />
          </div>
          <RailPanelGroup>
            <RailPanelItem>Recent: "button"</RailPanelItem>
            <RailPanelItem>Recent: "sidebar"</RailPanelItem>
            <RailPanelItem>Recent: "useState"</RailPanelItem>
          </RailPanelGroup>
        </RailPanel>

        <RailPanel railId="git" title="Source Control">
          <RailPanelGroup label="Changes">
            <RailPanelItem icon={<FileIcon />} badge={<span className="text-xs text-yellow-500">M</span>}>
              button.tsx
            </RailPanelItem>
            <RailPanelItem icon={<FileIcon />} badge={<span className="text-xs text-green-500">A</span>}>
              sidebar-rail.tsx
            </RailPanelItem>
          </RailPanelGroup>
        </RailPanel>

        <RailPanel railId="extensions" title="Extensions">
          <RailPanelGroup label="Installed">
            <RailPanelItem>ESLint</RailPanelItem>
            <RailPanelItem>Prettier</RailPanelItem>
            <RailPanelItem>TypeScript</RailPanelItem>
          </RailPanelGroup>
        </RailPanel>

        <RailPanel railId="settings" title="Settings">
          <RailPanelGroup>
            <RailPanelItem>General</RailPanelItem>
            <RailPanelItem>Appearance</RailPanelItem>
            <RailPanelItem>Keyboard Shortcuts</RailPanelItem>
            <RailPanelItem>Extensions</RailPanelItem>
          </RailPanelGroup>
        </RailPanel>
      </SidebarRail>

      <main className="flex-1 p-6 bg-muted/30 overflow-auto">
        <h1 className="text-2xl font-bold mb-4">VS Code Style Sidebar</h1>
        <p className="text-muted-foreground">
          Click on the icons in the left rail to toggle different panels.
        </p>
      </main>
    </div>
  ),
}

export const RailOverlay: Story = {
  name: 'Rail Overlay',
  render: () => <RailOverlayStory />,
  parameters: {
    docs: {
      source: {
        code: [
          "const [activeRail, setActiveRail] = React.useState('org')",
          'const [sidebarOpen, setSidebarOpen] = React.useState(true)',
          '',
          '{sidebarOpen && (',
          '  <SidebarRail',
          '    activeRail={activeRail}',
          '    onActiveRailChange={setActiveRail}',
          '    expandableRail',
          '    overlayRail',
          '    railExpandedWidth={240}',
          '    defaultRailExpanded={false}',
          '  >',
          '    <IconRail>',
          '      <IconRailHeader>',
          '        <IconRailItem asButton toggleRail icon={<MenuIcon />} label="Menu" />',
          '      </IconRailHeader>',
          '      <IconRailContent>',
          '        {modules.map((module) => (',
          '          <IconRailItem',
          '            key={module.id}',
          '            railId={module.id}',
          '            icon={<ModuleIcon letter={module.label[0]} />}',
          '            label={module.label}',
          '          />',
          '        ))}',
          '      </IconRailContent>',
          '    </IconRail>',
          '  </SidebarRail>',
          ')}',
          '',
          '{sidebarOpen && (',
          '  <Sidebar width={288}>',
          '    {/* Secondary panel stays open */}',
          '    ...',
          '  </Sidebar>',
          ')}',
        ].join('\n'),
        language: 'tsx',
        type: 'code',
      },
    },
  },
}

export const HoverExpand: Story = {
  name: 'Hover to Expand',
  render: () => (
    <div className="h-[600px] flex">
      <SidebarRail hoverExpand>
        <IconRail>
          <IconRailHeader>
            <LogoIcon />
          </IconRailHeader>
          <IconRailContent>
            <IconRailItem railId="home" icon={<HomeIcon />} label="Home" />
            <IconRailItem railId="inbox" icon={<InboxIcon />} label="Inbox" />
            <IconRailItem railId="projects" icon={<FolderIcon />} label="Projects" />
            <IconRailItem railId="team" icon={<UsersIcon />} label="Team" />
          </IconRailContent>
          <IconRailFooter>
            <IconRailItem railId="settings" icon={<SettingsIcon />} label="Settings" />
          </IconRailFooter>
        </IconRail>

        <RailPanel railId="home" title="Home">
          <RailPanelGroup>
            <RailPanelItem active>Dashboard</RailPanelItem>
            <RailPanelItem>Activity</RailPanelItem>
            <RailPanelItem>Notifications</RailPanelItem>
          </RailPanelGroup>
        </RailPanel>

        <RailPanel railId="inbox" title="Inbox">
          <RailPanelGroup>
            <RailPanelItem badge={<Badge>5</Badge>}>All Messages</RailPanelItem>
            <RailPanelItem badge={<Badge variant="secondary">2</Badge>}>Unread</RailPanelItem>
            <RailPanelItem>Starred</RailPanelItem>
            <RailPanelItem>Archived</RailPanelItem>
          </RailPanelGroup>
        </RailPanel>

        <RailPanel railId="projects" title="Projects">
          <RailPanelGroup label="Recent">
            <RailPanelItem>Onesaz UI</RailPanelItem>
            <RailPanelItem>ERP Dashboard</RailPanelItem>
            <RailPanelItem>Mobile App</RailPanelItem>
          </RailPanelGroup>
          <RailPanelGroup label="All Projects">
            <RailPanelItem>View All Projects →</RailPanelItem>
          </RailPanelGroup>
        </RailPanel>

        <RailPanel railId="team" title="Team">
          <RailPanelGroup>
            <RailPanelItem icon={<Avatar name="John" size="xs" />}>John Doe</RailPanelItem>
            <RailPanelItem icon={<Avatar name="Jane" size="xs" />}>Jane Smith</RailPanelItem>
            <RailPanelItem icon={<Avatar name="Bob" size="xs" />}>Bob Wilson</RailPanelItem>
          </RailPanelGroup>
        </RailPanel>

        <RailPanel railId="settings" title="Settings">
          <RailPanelGroup>
            <RailPanelItem>Profile</RailPanelItem>
            <RailPanelItem>Preferences</RailPanelItem>
            <RailPanelItem>Security</RailPanelItem>
          </RailPanelGroup>
        </RailPanel>
      </SidebarRail>

      <main className="flex-1 p-6 bg-muted/30">
        <h1 className="text-2xl font-bold mb-4">Hover to Expand</h1>
        <p className="text-muted-foreground">
          Hover over icons to expand the panel. Move mouse away to collapse.
        </p>
      </main>
    </div>
  ),
}

export const SlackStyle: Story = {
  name: 'Slack Style',
  render: () => (
    <div className="h-[600px] flex">
      <SidebarRail defaultActiveRail="workspace">
        <IconRail className="bg-slate-900 border-slate-800">
          <IconRailHeader>
            <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center text-accent-foreground font-bold">
              O
            </div>
          </IconRailHeader>
          <IconRailContent>
            <IconRailItem
              railId="workspace"
              icon={
                <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                  WS
                </div>
              }
              label="Workspace"
            />
            <IconRailItem
              railId="dms"
              icon={
                <div className="w-9 h-9 rounded-lg bg-green-600 flex items-center justify-center text-white font-bold text-sm">
                  DM
                </div>
              }
              label="Direct Messages"
            />
          </IconRailContent>
          <IconRailFooter>
            <IconRailItem
              asButton
              icon={
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14"/><path d="M12 5v14"/>
                </svg>
              }
              label="Add Workspace"
            />
          </IconRailFooter>
        </IconRail>

        <RailPanel railId="workspace" title="Onesaz" className="bg-slate-800 border-slate-700 text-white">
          <div className="p-3">
            <Input placeholder="Search..." inputSize="sm" className="bg-slate-700 border-slate-600" />
          </div>
          <RailPanelGroup label="Channels" className="text-slate-300">
            <RailPanelItem className="text-slate-300 hover:bg-slate-700" active># general</RailPanelItem>
            <RailPanelItem className="text-slate-300 hover:bg-slate-700"># engineering</RailPanelItem>
            <RailPanelItem className="text-slate-300 hover:bg-slate-700"># design</RailPanelItem>
            <RailPanelItem className="text-slate-300 hover:bg-slate-700 text-slate-500">+ Add channel</RailPanelItem>
          </RailPanelGroup>
          <RailPanelGroup label="Direct Messages" className="text-slate-300">
            <RailPanelItem className="text-slate-300 hover:bg-slate-700" icon={<Avatar name="John" size="xs" />}>
              John Doe
            </RailPanelItem>
            <RailPanelItem className="text-slate-300 hover:bg-slate-700" icon={<Avatar name="Jane" size="xs" />}>
              Jane Smith
            </RailPanelItem>
          </RailPanelGroup>
        </RailPanel>

        <RailPanel railId="dms" title="Direct Messages" className="bg-slate-800 border-slate-700 text-white">
          <RailPanelGroup className="text-slate-300">
            <RailPanelItem className="text-slate-300 hover:bg-slate-700" icon={<Avatar name="John" size="xs" />}>
              John Doe
            </RailPanelItem>
            <RailPanelItem className="text-slate-300 hover:bg-slate-700" icon={<Avatar name="Jane" size="xs" />}>
              Jane Smith
            </RailPanelItem>
            <RailPanelItem className="text-slate-300 hover:bg-slate-700" icon={<Avatar name="Bob" size="xs" />}>
              Bob Wilson
            </RailPanelItem>
          </RailPanelGroup>
        </RailPanel>
      </SidebarRail>

      <main className="flex-1 bg-white">
        <div className="border-b border-border p-4">
          <h2 className="font-semibold"># general</h2>
        </div>
        <div className="p-4">
          <p className="text-muted-foreground">Messages would appear here...</p>
        </div>
      </main>
    </div>
  ),
}

export const WithTopBar: Story = {
  name: 'Full App Layout',
  render: () => (
    <div className="h-[700px] flex flex-col">
      <TopBar>
        <TopBarBrand name="Onesaz Admin" logo={<LogoIcon />} />
        <TopBarSection align="center" className="flex-1 max-w-md mx-4">
          <Input
            placeholder="Search everything..."
            className="w-full"
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
          />
        </TopBarSection>
        <TopBarSection align="right">
          <Avatar
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
            name="John Doe"
            size="sm"
          />
        </TopBarSection>
      </TopBar>

      <div className="flex flex-1 overflow-hidden">
        <SidebarRail defaultActiveRail="dashboard">
          <IconRail>
            <IconRailContent>
              <IconRailItem railId="dashboard" icon={<HomeIcon />} label="Dashboard" />
              <IconRailItem railId="inbox" icon={<InboxIcon />} label="Inbox" />
              <IconRailItem railId="projects" icon={<FolderIcon />} label="Projects" />
              <IconRailItem railId="team" icon={<UsersIcon />} label="Team" />
            </IconRailContent>
            <IconRailFooter>
              <IconRailItem railId="settings" icon={<SettingsIcon />} label="Settings" />
            </IconRailFooter>
          </IconRail>

          <RailPanel railId="dashboard" title="Dashboard">
            <RailPanelGroup>
              <RailPanelItem active>Overview</RailPanelItem>
              <RailPanelItem>Analytics</RailPanelItem>
              <RailPanelItem>Reports</RailPanelItem>
            </RailPanelGroup>
          </RailPanel>

          <RailPanel railId="inbox" title="Inbox">
            <RailPanelGroup>
              <RailPanelItem badge={<Badge>12</Badge>}>All Messages</RailPanelItem>
              <RailPanelItem>Unread</RailPanelItem>
              <RailPanelItem>Starred</RailPanelItem>
            </RailPanelGroup>
          </RailPanel>

          <RailPanel railId="projects" title="Projects">
            <RailPanelGroup label="Active">
              <RailPanelItem>Onesaz UI</RailPanelItem>
              <RailPanelItem>ERP Dashboard</RailPanelItem>
            </RailPanelGroup>
            <RailPanelGroup label="Archived">
              <RailPanelItem>Old Project</RailPanelItem>
            </RailPanelGroup>
          </RailPanel>

          <RailPanel railId="team" title="Team">
            <RailPanelGroup>
              <RailPanelItem icon={<Avatar name="John" size="xs" />}>John Doe</RailPanelItem>
              <RailPanelItem icon={<Avatar name="Jane" size="xs" />}>Jane Smith</RailPanelItem>
            </RailPanelGroup>
          </RailPanel>

          <RailPanel railId="settings" title="Settings">
            <RailPanelGroup>
              <RailPanelItem>General</RailPanelItem>
              <RailPanelItem>Security</RailPanelItem>
              <RailPanelItem>Billing</RailPanelItem>
            </RailPanelGroup>
          </RailPanel>
        </SidebarRail>

        <main className="flex-1 p-6 bg-muted/30 overflow-auto">
          <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>
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
  ),
}
