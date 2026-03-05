import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  DataList,
  DataListItem,
  DataListLabel,
  DataListValue,
} from '@onesaz/ui'
import { Badge } from '@onesaz/ui'

// ─── Shared icons ─────────────────────────────────────────────────────────────

const UserIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
    <circle cx="12" cy="8" r="4" />
    <path d="M20 21a8 8 0 1 0-16 0" />
  </svg>
)

const PhoneIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 11.8a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 5.55 5.55l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 15.5v1.42z" />
  </svg>
)

const BookIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
)

const CopyIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
)

const CopyButton = ({ value }: { value: string }) => {
  const [copied, setCopied] = React.useState(false)
  return (
    <button
      type="button"
      onClick={() => { navigator.clipboard?.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 1500) }}
      title={copied ? 'Copied!' : 'Copy'}
      className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
    >
      <CopyIcon />
    </button>
  )
}

const meta: Meta<typeof DataList> = {
  title: 'Components/DataList',
  component: DataList,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof DataList>

// ─── Default (horizontal) ────────────────────────────────────────────────────

export const Default: Story = {
  render: () => (
    <DataList className="w-80">
      <DataListItem>
        <DataListLabel width="100px">Name</DataListLabel>
        <DataListValue>Emily Chen</DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListLabel width="100px">Email</DataListLabel>
        <DataListValue>emily.chen@example.com</DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListLabel width="100px">Role</DataListLabel>
        <DataListValue>Product Designer</DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListLabel width="100px">Status</DataListLabel>
        <DataListValue>Active</DataListValue>
      </DataListItem>
    </DataList>
  ),
}

// ─── Vertical orientation ─────────────────────────────────────────────────────

export const Vertical: Story = {
  render: () => (
    <DataList orientation="vertical" className="w-80">
      <DataListItem>
        <DataListLabel>Name</DataListLabel>
        <DataListValue>Emily Chen</DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListLabel>Email</DataListLabel>
        <DataListValue>emily.chen@example.com</DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListLabel>Role</DataListLabel>
        <DataListValue>Product Designer</DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListLabel>Department</DataListLabel>
        <DataListValue>Engineering</DataListValue>
      </DataListItem>
    </DataList>
  ),
}

// ─── Sizes ───────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      {(['1', '2', '3'] as const).map((size) => (
        <div key={size}>
          <p className="mb-2 text-xs text-muted-foreground font-mono">size="{size}"</p>
          <DataList size={size} className="w-80">
            <DataListItem>
              <DataListLabel width="100px">Name</DataListLabel>
              <DataListValue>Emily Chen</DataListValue>
            </DataListItem>
            <DataListItem>
              <DataListLabel width="100px">Email</DataListLabel>
              <DataListValue>emily.chen@example.com</DataListValue>
            </DataListItem>
            <DataListItem>
              <DataListLabel width="100px">Role</DataListLabel>
              <DataListValue>Product Designer</DataListValue>
            </DataListItem>
          </DataList>
        </div>
      ))}
    </div>
  ),
}

// ─── Label colors ─────────────────────────────────────────────────────────────

export const LabelColors: Story = {
  render: () => (
    <DataList className="w-96">
      <DataListItem>
        <DataListLabel width="120px" color="muted">Muted (default)</DataListLabel>
        <DataListValue>Text muted-foreground</DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListLabel width="120px" color="default">Default</DataListLabel>
        <DataListValue>Text foreground</DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListLabel width="120px" color="primary">Primary</DataListLabel>
        <DataListValue>Uses primary color</DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListLabel width="120px" color="success">Success</DataListLabel>
        <DataListValue>Uses green color</DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListLabel width="120px" color="warning">Warning</DataListLabel>
        <DataListValue>Uses yellow color</DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListLabel width="120px" color="error">Error</DataListLabel>
        <DataListValue>Uses destructive color</DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListLabel width="120px" color="info">Info</DataListLabel>
        <DataListValue>Uses blue color</DataListValue>
      </DataListItem>
    </DataList>
  ),
}

// ─── High contrast labels ─────────────────────────────────────────────────────

export const HighContrast: Story = {
  render: () => (
    <DataList className="w-80">
      <DataListItem>
        <DataListLabel width="120px" color="primary" highContrast>
          Name
        </DataListLabel>
        <DataListValue>Emily Chen</DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListLabel width="120px" color="primary" highContrast>
          Email
        </DataListLabel>
        <DataListValue>emily.chen@example.com</DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListLabel width="120px" color="success" highContrast>
          Status
        </DataListLabel>
        <DataListValue>Active</DataListValue>
      </DataListItem>
    </DataList>
  ),
}

// ─── Rich values (with Badge, code, etc.) ────────────────────────────────────

export const RichValues: Story = {
  render: () => (
    <DataList className="w-96">
      <DataListItem align="center">
        <DataListLabel width="120px">Status</DataListLabel>
        <DataListValue>
          <Badge variant="default">Active</Badge>
        </DataListValue>
      </DataListItem>
      <DataListItem align="center">
        <DataListLabel width="120px">Plan</DataListLabel>
        <DataListValue>
          <Badge variant="secondary">Pro</Badge>
        </DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListLabel width="120px">API Key</DataListLabel>
        <DataListValue>
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
            sk-abc123…xyz
          </code>
        </DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListLabel width="120px">Website</DataListLabel>
        <DataListValue>
          <a
            href="#"
            className="text-primary underline-offset-4 hover:underline"
            onClick={(e) => e.preventDefault()}
          >
            example.com
          </a>
        </DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListLabel width="120px">Created</DataListLabel>
        <DataListValue>Jan 12, 2025</DataListValue>
      </DataListItem>
    </DataList>
  ),
}

// ─── Item alignment ───────────────────────────────────────────────────────────

export const ItemAlignment: Story = {
  render: () => (
    <DataList className="w-96">
      {(['start', 'center', 'end', 'baseline'] as const).map((align) => (
        <DataListItem key={align} align={align}>
          <DataListLabel width="100px" className="capitalize">
            {align}
          </DataListLabel>
          <DataListValue>
            <div className="space-y-1">
              <p>First line of value text</p>
              <p className="text-muted-foreground text-xs">Second line with extra detail</p>
            </div>
          </DataListValue>
        </DataListItem>
      ))}
    </DataList>
  ),
}

// ─── User profile card example ────────────────────────────────────────────────

export const ProfileCard: Story = {
  render: () => (
    <div className="rounded-lg border border-border bg-card p-6 shadow-sm w-[420px]">
      <h3 className="mb-4 text-sm font-semibold text-foreground">User Profile</h3>
      <DataList size="2">
        <DataListItem>
          <DataListLabel width="140px">Full name</DataListLabel>
          <DataListValue>Emily Chen</DataListValue>
        </DataListItem>
        <DataListItem>
          <DataListLabel width="140px">Email</DataListLabel>
          <DataListValue>emily.chen@example.com</DataListValue>
        </DataListItem>
        <DataListItem align="center">
          <DataListLabel width="140px">Status</DataListLabel>
          <DataListValue>
            <Badge variant="default" className="text-xs">Active</Badge>
          </DataListValue>
        </DataListItem>
        <DataListItem>
          <DataListLabel width="140px">Role</DataListLabel>
          <DataListValue>Product Designer</DataListValue>
        </DataListItem>
        <DataListItem>
          <DataListLabel width="140px">Department</DataListLabel>
          <DataListValue>Engineering</DataListValue>
        </DataListItem>
        <DataListItem>
          <DataListLabel width="140px">Member since</DataListLabel>
          <DataListValue>January 12, 2024</DataListValue>
        </DataListItem>
        <DataListItem>
          <DataListLabel width="140px">API key</DataListLabel>
          <DataListValue>
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              sk-••••••••xyz9
            </code>
          </DataListValue>
        </DataListItem>
      </DataList>
    </div>
  ),
}

// ─── Student profile card ─────────────────────────────────────────────────────

export const StudentProfile: Story = {
  name: 'Student Profile Card',
  parameters: { layout: 'padded' },
  render: () => (
    <div className="rounded-lg border border-border bg-card overflow-hidden w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-border">

        {/* ── Student Info ── */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-5">
            <UserIcon />
            <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
              Student Info
            </span>
          </div>

          <DataList orientation="vertical" size="2" className="grid-cols-3 gap-x-6 gap-y-5">
            <DataListItem>
              <DataListLabel>First Name</DataListLabel>
              <DataListValue className="font-bold flex items-center gap-1.5">
                HARSHAVARDHAN GOOLLA
                <CopyButton value="HARSHAVARDHAN GOOLLA" />
              </DataListValue>
            </DataListItem>

            <DataListItem>
              <DataListLabel>Last Name</DataListLabel>
              <DataListValue>harsha vardhan</DataListValue>
            </DataListItem>

            <DataListItem>
              <DataListLabel>Class</DataListLabel>
              <DataListValue className="font-bold">11</DataListValue>
            </DataListItem>

            <DataListItem>
              <DataListLabel>Application No</DataListLabel>
              <DataListValue className="font-bold flex items-center gap-1.5">
                9940575
                <CopyButton value="9940575" />
              </DataListValue>
            </DataListItem>

            <DataListItem>
              <DataListLabel>Admission No</DataListLabel>
              <DataListValue className="font-bold flex items-center gap-1.5">
                24DRU0531
                <CopyButton value="24DRU0531" />
              </DataListValue>
            </DataListItem>

            <DataListItem>
              <DataListLabel>Branch</DataListLabel>
              <DataListValue className="font-bold">
                SR Edu Center Druva Nakkalagutta Hanamkonda
              </DataListValue>
            </DataListItem>

            <DataListItem>
              <DataListLabel>Batch</DataListLabel>
              <DataListValue className="font-bold">JR BiPC FOCUS</DataListValue>
            </DataListItem>

            <DataListItem>
              <DataListLabel>Section</DataListLabel>
              <DataListValue className="font-bold">A</DataListValue>
            </DataListItem>

            <DataListItem>
              <DataListLabel>Admission Type</DataListLabel>
              <DataListValue className="font-bold">Residential</DataListValue>
            </DataListItem>

            <DataListItem>
              <DataListLabel>Group</DataListLabel>
              <DataListValue className="font-bold">BiPC</DataListValue>
            </DataListItem>

            <DataListItem>
              <DataListLabel>Admission Date</DataListLabel>
              <DataListValue className="font-bold">16-02-2024</DataListValue>
            </DataListItem>

            <DataListItem>
              <DataListLabel>Joining AY</DataListLabel>
              <DataListValue className="font-bold">2024-2025</DataListValue>
            </DataListItem>

            <DataListItem>
              <DataListLabel>Current AY</DataListLabel>
              <DataListValue className="font-bold">2024-2025</DataListValue>
            </DataListItem>
          </DataList>
        </div>

        {/* ── Parent & Contact ── */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-5">
            <PhoneIcon />
            <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
              Parent &amp; Contact
            </span>
          </div>

          <DataList orientation="vertical" size="2" className="grid-cols-2 gap-x-6 gap-y-5">
            <DataListItem>
              <DataListLabel>Father Name</DataListLabel>
              <DataListValue className="font-bold">VERENDER</DataListValue>
            </DataListItem>

            <DataListItem>
              <DataListLabel>Father No.</DataListLabel>
              <DataListValue className="font-bold">9666920220</DataListValue>
            </DataListItem>
          </DataList>

          <div className="mt-6 border-t border-border pt-4">
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline underline-offset-4"
            >
              <BookIcon />
              View Plan Details
            </a>
          </div>
        </div>

      </div>
    </div>
  ),
}
