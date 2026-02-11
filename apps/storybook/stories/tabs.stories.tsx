import type { Meta, StoryObj } from '@storybook/react'
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  UnderlineTabsList,
  UnderlineTabsTrigger,
  UnderlineTabsContent,
  VerticalTabs,
  VerticalTabsList,
  VerticalTabsTrigger,
  VerticalTabsContent,
  VerticalTabsGroupLabel,
  Input,
  Textarea,
  Label,
  Button,
  Separator,
} from '@onesaz/ui'

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Tabs>

// ============================================================================
// Default (pill) variant
// ============================================================================

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <p className="text-sm text-muted-foreground">
          Make changes to your account here. Click save when you're done.
        </p>
      </TabsContent>
      <TabsContent value="password">
        <p className="text-sm text-muted-foreground">
          Change your password here. After saving, you'll be logged out.
        </p>
      </TabsContent>
    </Tabs>
  ),
}

export const WithForm: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="space-y-4 pt-4">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input id="name" defaultValue="John Doe" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input id="email" defaultValue="john@example.com" />
        </div>
        <Button>Save changes</Button>
      </TabsContent>
      <TabsContent value="password" className="space-y-4 pt-4">
        <div className="space-y-1">
          <Label htmlFor="current">Current password</Label>
          <Input id="current" type="password" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="new">New password</Label>
          <Input id="new" type="password" />
        </div>
        <Button>Update password</Button>
      </TabsContent>
    </Tabs>
  ),
}

export const MultipleTabs: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-[500px]">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <p className="text-sm text-muted-foreground">Overview content goes here.</p>
      </TabsContent>
      <TabsContent value="analytics">
        <p className="text-sm text-muted-foreground">Analytics content goes here.</p>
      </TabsContent>
      <TabsContent value="reports">
        <p className="text-sm text-muted-foreground">Reports content goes here.</p>
      </TabsContent>
      <TabsContent value="notifications">
        <p className="text-sm text-muted-foreground">Notifications content goes here.</p>
      </TabsContent>
    </Tabs>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Tabs defaultValue="active" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="disabled" disabled>
          Disabled
        </TabsTrigger>
        <TabsTrigger value="other">Other</TabsTrigger>
      </TabsList>
      <TabsContent value="active">
        <p className="text-sm text-muted-foreground">This tab is active.</p>
      </TabsContent>
      <TabsContent value="other">
        <p className="text-sm text-muted-foreground">This is another tab.</p>
      </TabsContent>
    </Tabs>
  ),
}

export const FullWidth: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-[500px]">
      <TabsList className="w-full grid grid-cols-3">
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <p className="text-sm text-muted-foreground">First tab content.</p>
      </TabsContent>
      <TabsContent value="tab2">
        <p className="text-sm text-muted-foreground">Second tab content.</p>
      </TabsContent>
      <TabsContent value="tab3">
        <p className="text-sm text-muted-foreground">Third tab content.</p>
      </TabsContent>
    </Tabs>
  ),
}

// ============================================================================
// Underline variant (GitHub-style)
// ============================================================================

export const Underline: Story = {
  name: 'Underline',
  render: () => (
    <Tabs defaultValue="general" className="w-[600px]">
      <UnderlineTabsList>
        <UnderlineTabsTrigger value="general">General</UnderlineTabsTrigger>
        <UnderlineTabsTrigger value="security">Security</UnderlineTabsTrigger>
        <UnderlineTabsTrigger value="notifications">Notifications</UnderlineTabsTrigger>
        <UnderlineTabsTrigger value="billing">Billing</UnderlineTabsTrigger>
      </UnderlineTabsList>
      <UnderlineTabsContent value="general">
        <p className="text-sm text-muted-foreground">General settings content.</p>
      </UnderlineTabsContent>
      <UnderlineTabsContent value="security">
        <p className="text-sm text-muted-foreground">Security settings content.</p>
      </UnderlineTabsContent>
      <UnderlineTabsContent value="notifications">
        <p className="text-sm text-muted-foreground">Notification preferences.</p>
      </UnderlineTabsContent>
      <UnderlineTabsContent value="billing">
        <p className="text-sm text-muted-foreground">Billing & plans.</p>
      </UnderlineTabsContent>
    </Tabs>
  ),
}

export const UnderlineWithCounts: Story = {
  name: 'Underline with Counts',
  render: () => (
    <Tabs defaultValue="code" className="w-[700px]">
      <UnderlineTabsList>
        <UnderlineTabsTrigger value="code">Code</UnderlineTabsTrigger>
        <UnderlineTabsTrigger value="issues" count={12}>
          Issues
        </UnderlineTabsTrigger>
        <UnderlineTabsTrigger value="pulls" count={3}>
          Pull requests
        </UnderlineTabsTrigger>
        <UnderlineTabsTrigger value="actions">Actions</UnderlineTabsTrigger>
        <UnderlineTabsTrigger value="projects" count={1}>
          Projects
        </UnderlineTabsTrigger>
        <UnderlineTabsTrigger value="security">Security</UnderlineTabsTrigger>
        <UnderlineTabsTrigger value="settings">Settings</UnderlineTabsTrigger>
      </UnderlineTabsList>
      <UnderlineTabsContent value="code">
        <p className="text-sm text-muted-foreground">Repository code goes here.</p>
      </UnderlineTabsContent>
      <UnderlineTabsContent value="issues">
        <p className="text-sm text-muted-foreground">12 open issues.</p>
      </UnderlineTabsContent>
      <UnderlineTabsContent value="pulls">
        <p className="text-sm text-muted-foreground">3 open pull requests.</p>
      </UnderlineTabsContent>
      <UnderlineTabsContent value="actions">
        <p className="text-sm text-muted-foreground">CI/CD workflows.</p>
      </UnderlineTabsContent>
      <UnderlineTabsContent value="projects">
        <p className="text-sm text-muted-foreground">1 project board.</p>
      </UnderlineTabsContent>
      <UnderlineTabsContent value="security">
        <p className="text-sm text-muted-foreground">Security advisories.</p>
      </UnderlineTabsContent>
      <UnderlineTabsContent value="settings">
        <p className="text-sm text-muted-foreground">Repository settings.</p>
      </UnderlineTabsContent>
    </Tabs>
  ),
}

export const UnderlineGitHubSettings: Story = {
  name: 'Underline - GitHub Settings Page',
  render: () => (
    <Tabs defaultValue="profile" className="w-[700px]">
      <UnderlineTabsList className="w-full">
        <UnderlineTabsTrigger value="profile">Profile</UnderlineTabsTrigger>
        <UnderlineTabsTrigger value="account">Account</UnderlineTabsTrigger>
        <UnderlineTabsTrigger value="appearance">Appearance</UnderlineTabsTrigger>
        <UnderlineTabsTrigger value="accessibility">Accessibility</UnderlineTabsTrigger>
        <UnderlineTabsTrigger value="notifications">Notifications</UnderlineTabsTrigger>
      </UnderlineTabsList>

      <UnderlineTabsContent value="profile" className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Public profile</h3>
          <p className="text-sm text-muted-foreground">
            This information will be displayed publicly.
          </p>
        </div>
        <div className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="settings-name">Name</Label>
            <Input id="settings-name" defaultValue="John Doe" className="max-w-md" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="settings-bio">Bio</Label>
            <Input id="settings-bio" placeholder="Tell us about yourself" className="max-w-md" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="settings-url">URL</Label>
            <Input id="settings-url" placeholder="https://example.com" className="max-w-md" />
          </div>
          <Button>Update profile</Button>
        </div>
      </UnderlineTabsContent>

      <UnderlineTabsContent value="account" className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Account settings</h3>
          <p className="text-sm text-muted-foreground">Manage your account preferences.</p>
        </div>
        <div className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="settings-email">Email</Label>
            <Input id="settings-email" defaultValue="john@example.com" className="max-w-md" />
          </div>
          <Button>Save</Button>
        </div>
      </UnderlineTabsContent>

      <UnderlineTabsContent value="appearance">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Appearance</h3>
          <p className="text-sm text-muted-foreground">
            Customize the appearance of the app. Choose between light and dark themes.
          </p>
        </div>
      </UnderlineTabsContent>

      <UnderlineTabsContent value="accessibility">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Accessibility</h3>
          <p className="text-sm text-muted-foreground">
            Manage accessibility preferences.
          </p>
        </div>
      </UnderlineTabsContent>

      <UnderlineTabsContent value="notifications">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
          <p className="text-sm text-muted-foreground">
            Configure how you receive notifications.
          </p>
        </div>
      </UnderlineTabsContent>
    </Tabs>
  ),
}

export const UnderlineDisabled: Story = {
  name: 'Underline - Disabled Tab',
  render: () => (
    <Tabs defaultValue="active" className="w-[500px]">
      <UnderlineTabsList>
        <UnderlineTabsTrigger value="active">Active</UnderlineTabsTrigger>
        <UnderlineTabsTrigger value="disabled" disabled>
          Disabled
        </UnderlineTabsTrigger>
        <UnderlineTabsTrigger value="another" count={5}>
          Another
        </UnderlineTabsTrigger>
      </UnderlineTabsList>
      <UnderlineTabsContent value="active">
        <p className="text-sm text-muted-foreground">This tab is active.</p>
      </UnderlineTabsContent>
      <UnderlineTabsContent value="another">
        <p className="text-sm text-muted-foreground">Another tab content.</p>
      </UnderlineTabsContent>
    </Tabs>
  ),
}

// ============================================================================
// Vertical variant (GitHub Settings sidebar)
// ============================================================================

// Inline SVG icons for stories
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
)
const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
)
const PaletteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor" /><circle cx="17.5" cy="10.5" r=".5" fill="currentColor" /><circle cx="8.5" cy="7.5" r=".5" fill="currentColor" /><circle cx="6.5" cy="12" r=".5" fill="currentColor" /><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" /></svg>
)
const AccessibilityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="16" cy="4" r="1" /><path d="m18 19 1-7-6 1" /><path d="m5 8 3-3 5.5 3-2.36 3.5" /><path d="M4.24 14.5a5 5 0 0 0 6.88 6" /><path d="M13.76 17.5a5 5 0 0 0-6.88-6" /></svg>
)
const BellIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
)
const CreditCardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2" /><line x1="2" x2="22" y1="10" y2="10" /></svg>
)
const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
)
const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /></svg>
)
const KeyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4" /><path d="m21 2-9.6 9.6" /><circle cx="7.5" cy="15.5" r="5.5" /></svg>
)
const BuildingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2" /><path d="M9 22v-4h6v4" /><path d="M8 6h.01" /><path d="M16 6h.01" /><path d="M12 6h.01" /><path d="M12 10h.01" /><path d="M12 14h.01" /><path d="M16 10h.01" /><path d="M16 14h.01" /><path d="M8 10h.01" /><path d="M8 14h.01" /></svg>
)
const CodeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
)

export const Vertical: Story = {
  name: 'Vertical',
  parameters: { layout: 'padded' },
  render: () => (
    <VerticalTabs defaultValue="profile" className="w-[800px]">
      <VerticalTabsList>
        <VerticalTabsTrigger value="profile" icon={<UserIcon />}>
          Profile
        </VerticalTabsTrigger>
        <VerticalTabsTrigger value="account" icon={<SettingsIcon />}>
          Account
        </VerticalTabsTrigger>
        <VerticalTabsTrigger value="appearance" icon={<PaletteIcon />}>
          Appearance
        </VerticalTabsTrigger>
        <VerticalTabsTrigger value="notifications" icon={<BellIcon />}>
          Notifications
        </VerticalTabsTrigger>
      </VerticalTabsList>

      <VerticalTabsContent value="profile" className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Public profile</h2>
          <p className="text-sm text-muted-foreground mt-1">This information will be displayed publicly.</p>
        </div>
        <Separator />
        <div className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="v-name">Name</Label>
            <Input id="v-name" defaultValue="harsha" className="max-w-md" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="v-bio">Bio</Label>
            <Textarea id="v-bio" placeholder="Tell us a little bit about yourself" className="max-w-md" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="v-url">URL</Label>
            <Input id="v-url" placeholder="https://example.com" className="max-w-md" />
          </div>
          <Button>Update profile</Button>
        </div>
      </VerticalTabsContent>

      <VerticalTabsContent value="account" className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Account</h2>
          <p className="text-sm text-muted-foreground mt-1">Manage your account settings.</p>
        </div>
        <Separator />
        <div className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="v-email">Email</Label>
            <Input id="v-email" defaultValue="harsha@example.com" className="max-w-md" />
          </div>
          <Button>Save</Button>
        </div>
      </VerticalTabsContent>

      <VerticalTabsContent value="appearance">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Appearance</h2>
          <p className="text-sm text-muted-foreground mt-1">Customize the look and feel.</p>
        </div>
      </VerticalTabsContent>

      <VerticalTabsContent value="notifications">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Notifications</h2>
          <p className="text-sm text-muted-foreground mt-1">Configure how you receive notifications.</p>
        </div>
      </VerticalTabsContent>
    </VerticalTabs>
  ),
}

export const VerticalGitHubSettings: Story = {
  name: 'Vertical - GitHub Settings',
  parameters: { layout: 'padded' },
  render: () => (
    <VerticalTabs defaultValue="profile" className="w-[900px]">
      <VerticalTabsList className="w-[240px]">
        <VerticalTabsTrigger value="profile" icon={<UserIcon />}>
          Public profile
        </VerticalTabsTrigger>
        <VerticalTabsTrigger value="account" icon={<SettingsIcon />}>
          Account
        </VerticalTabsTrigger>
        <VerticalTabsTrigger value="appearance" icon={<PaletteIcon />}>
          Appearance
        </VerticalTabsTrigger>
        <VerticalTabsTrigger value="accessibility" icon={<AccessibilityIcon />}>
          Accessibility
        </VerticalTabsTrigger>
        <VerticalTabsTrigger value="notifications" icon={<BellIcon />}>
          Notifications
        </VerticalTabsTrigger>

        <VerticalTabsGroupLabel>Access</VerticalTabsGroupLabel>
        <VerticalTabsTrigger value="billing" icon={<CreditCardIcon />}>
          Billing and licensing
        </VerticalTabsTrigger>
        <VerticalTabsTrigger value="emails" icon={<MailIcon />}>
          Emails
        </VerticalTabsTrigger>
        <VerticalTabsTrigger value="security" icon={<ShieldIcon />}>
          Password and authentication
        </VerticalTabsTrigger>
        <VerticalTabsTrigger value="ssh" icon={<KeyIcon />}>
          SSH and GPG keys
        </VerticalTabsTrigger>
        <VerticalTabsTrigger value="organizations" icon={<BuildingIcon />}>
          Organizations
        </VerticalTabsTrigger>

        <VerticalTabsGroupLabel>Code, planning, and automation</VerticalTabsGroupLabel>
        <VerticalTabsTrigger value="repos" icon={<CodeIcon />}>
          Repositories
        </VerticalTabsTrigger>
      </VerticalTabsList>

      <VerticalTabsContent value="profile" className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Public profile</h2>
        <Separator />
        <div className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="gh-name" className="font-semibold">Name</Label>
            <Input id="gh-name" defaultValue="harsha" className="max-w-md" />
            <p className="text-xs text-muted-foreground">Your name may appear around GitHub where you contribute or are mentioned. You can remove it at any time.</p>
          </div>
          <div className="space-y-1">
            <Label htmlFor="gh-bio" className="font-semibold">Bio</Label>
            <Textarea id="gh-bio" placeholder="Tell us a little bit about yourself" className="max-w-md" rows={4} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="gh-url" className="font-semibold">URL</Label>
            <Input id="gh-url" className="max-w-md" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="gh-company" className="font-semibold">Company</Label>
            <Input id="gh-company" className="max-w-md" />
          </div>
          <Button>Update profile</Button>
        </div>
      </VerticalTabsContent>

      <VerticalTabsContent value="account" className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Account settings</h2>
        <Separator />
        <p className="text-sm text-muted-foreground">Manage your account preferences and settings.</p>
      </VerticalTabsContent>

      <VerticalTabsContent value="appearance">
        <h2 className="text-xl font-semibold text-foreground">Appearance</h2>
        <Separator className="my-4" />
        <p className="text-sm text-muted-foreground">Choose how GitHub looks to you. Select a single theme, or sync with your system.</p>
      </VerticalTabsContent>

      <VerticalTabsContent value="accessibility">
        <h2 className="text-xl font-semibold text-foreground">Accessibility</h2>
        <Separator className="my-4" />
        <p className="text-sm text-muted-foreground">Manage accessibility preferences.</p>
      </VerticalTabsContent>

      <VerticalTabsContent value="notifications">
        <h2 className="text-xl font-semibold text-foreground">Notifications</h2>
        <Separator className="my-4" />
        <p className="text-sm text-muted-foreground">Choose how and when to be notified.</p>
      </VerticalTabsContent>

      <VerticalTabsContent value="billing">
        <h2 className="text-xl font-semibold text-foreground">Billing and licensing</h2>
        <Separator className="my-4" />
        <p className="text-sm text-muted-foreground">Manage your billing information and subscriptions.</p>
      </VerticalTabsContent>

      <VerticalTabsContent value="emails">
        <h2 className="text-xl font-semibold text-foreground">Emails</h2>
        <Separator className="my-4" />
        <p className="text-sm text-muted-foreground">Manage your email addresses.</p>
      </VerticalTabsContent>

      <VerticalTabsContent value="security">
        <h2 className="text-xl font-semibold text-foreground">Password and authentication</h2>
        <Separator className="my-4" />
        <p className="text-sm text-muted-foreground">Change your password and manage two-factor authentication.</p>
      </VerticalTabsContent>

      <VerticalTabsContent value="ssh">
        <h2 className="text-xl font-semibold text-foreground">SSH and GPG keys</h2>
        <Separator className="my-4" />
        <p className="text-sm text-muted-foreground">Manage your SSH and GPG keys for authentication.</p>
      </VerticalTabsContent>

      <VerticalTabsContent value="organizations">
        <h2 className="text-xl font-semibold text-foreground">Organizations</h2>
        <Separator className="my-4" />
        <p className="text-sm text-muted-foreground">Manage your organization memberships.</p>
      </VerticalTabsContent>

      <VerticalTabsContent value="repos">
        <h2 className="text-xl font-semibold text-foreground">Repositories</h2>
        <Separator className="my-4" />
        <p className="text-sm text-muted-foreground">Manage repository default settings.</p>
      </VerticalTabsContent>
    </VerticalTabs>
  ),
}

export const VerticalNoIcons: Story = {
  name: 'Vertical - No Icons',
  parameters: { layout: 'padded' },
  render: () => (
    <VerticalTabs defaultValue="general" className="w-[700px]">
      <VerticalTabsList>
        <VerticalTabsTrigger value="general">General</VerticalTabsTrigger>
        <VerticalTabsTrigger value="security">Security</VerticalTabsTrigger>
        <VerticalTabsTrigger value="integrations">Integrations</VerticalTabsTrigger>
        <VerticalTabsTrigger value="advanced">Advanced</VerticalTabsTrigger>
      </VerticalTabsList>
      <VerticalTabsContent value="general">
        <h2 className="text-xl font-semibold text-foreground">General</h2>
        <p className="text-sm text-muted-foreground mt-2">General settings content.</p>
      </VerticalTabsContent>
      <VerticalTabsContent value="security">
        <h2 className="text-xl font-semibold text-foreground">Security</h2>
        <p className="text-sm text-muted-foreground mt-2">Security settings content.</p>
      </VerticalTabsContent>
      <VerticalTabsContent value="integrations">
        <h2 className="text-xl font-semibold text-foreground">Integrations</h2>
        <p className="text-sm text-muted-foreground mt-2">Integrations settings content.</p>
      </VerticalTabsContent>
      <VerticalTabsContent value="advanced">
        <h2 className="text-xl font-semibold text-foreground">Advanced</h2>
        <p className="text-sm text-muted-foreground mt-2">Advanced settings content.</p>
      </VerticalTabsContent>
    </VerticalTabs>
  ),
}
