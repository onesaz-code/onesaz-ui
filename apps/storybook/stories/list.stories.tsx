import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  ListItemAvatar,
  ListSubheader,
  ListDivider,
  VirtualList,
  Avatar,
  Checkbox,
  IconButton,
  Badge,
  Switch,
} from '@onesaz/ui'

const meta: Meta<typeof List> = {
  title: 'Components/List',
  component: List,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof List>

// ─── Shared icons ────────────────────────────────────────────────────────────

const InboxIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
    <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
  </svg>
)
const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)
const SendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
)
const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
  </svg>
)
const MoreIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />
  </svg>
)
const FolderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
)
const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6" />
  </svg>
)
const WifiIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12.55a11 11 0 0 1 14.08 0" /><path d="M1.42 9a16 16 0 0 1 21.16 0" /><path d="M8.53 16.11a6 6 0 0 1 6.95 0" /><line x1="12" y1="20" x2="12.01" y2="20" />
  </svg>
)
const BluetoothIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6.5 6.5 17.5 17.5 12 23 12 1 17.5 6.5 6.5 17.5" />
  </svg>
)

// ─── Basic ────────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => (
    <div className="w-[350px] border rounded-lg bg-card overflow-hidden">
      <List>
        <ListItem><ListItemText primary="List item 1" /></ListItem>
        <ListItem><ListItemText primary="List item 2" /></ListItem>
        <ListItem><ListItemText primary="List item 3" /></ListItem>
      </List>
    </div>
  ),
}

export const WithSecondaryText: Story = {
  render: () => (
    <div className="w-[360px] border rounded-lg bg-card overflow-hidden">
      <List>
        <ListItem>
          <ListItemText primary="Brunch this weekend?" secondary="Ali Connors — I'll be in your neighborhood doing errands" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Summer BBQ" secondary="to Scott, Alex, Jennifer — Wish I could come, but I'm out of town" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Oui Oui" secondary="Sandra Adams — Do you have Paris recommendations?" />
        </ListItem>
      </List>
    </div>
  ),
}

// ─── ListItemButton (interactive) ────────────────────────────────────────────

export const ItemButton: Story = {
  name: 'ListItemButton',
  render: function ItemButtonStory() {
    const [selected, setSelected] = React.useState('inbox')
    return (
      <div className="w-[280px] border rounded-lg bg-card overflow-hidden">
        <List disablePadding>
          {[
            { id: 'inbox', label: 'Inbox', icon: <InboxIcon />, badge: 12 },
            { id: 'starred', label: 'Starred', icon: <StarIcon /> },
            { id: 'sent', label: 'Sent', icon: <SendIcon /> },
            { id: 'trash', label: 'Trash', icon: <TrashIcon /> },
          ].map(({ id, label, icon, badge }) => (
            <ListItemButton
              key={id}
              selected={selected === id}
              onClick={() => setSelected(id)}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={label} />
              {badge && <Badge>{badge}</Badge>}
            </ListItemButton>
          ))}
        </List>
      </div>
    )
  },
}

export const ItemButtonWithDivider: Story = {
  name: 'ListItemButton — divider prop',
  render: () => (
    <div className="w-[280px] border rounded-lg bg-card overflow-hidden">
      <List disablePadding>
        <ListItemButton divider>
          <ListItemIcon><InboxIcon /></ListItemIcon>
          <ListItemText primary="Inbox" secondary="All your messages" />
        </ListItemButton>
        <ListItemButton divider>
          <ListItemIcon><StarIcon /></ListItemIcon>
          <ListItemText primary="Starred" secondary="Bookmarked items" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon><SendIcon /></ListItemIcon>
          <ListItemText primary="Sent" secondary="Delivered messages" />
        </ListItemButton>
      </List>
    </div>
  ),
}

export const ItemButtonDisabled: Story = {
  name: 'ListItemButton — disabled',
  render: () => (
    <div className="w-[280px] border rounded-lg bg-card overflow-hidden">
      <List disablePadding>
        <ListItemButton><ListItemIcon><InboxIcon /></ListItemIcon><ListItemText primary="Inbox" /></ListItemButton>
        <ListItemButton disabled><ListItemIcon><StarIcon /></ListItemIcon><ListItemText primary="Starred (disabled)" /></ListItemButton>
        <ListItemButton><ListItemIcon><SendIcon /></ListItemIcon><ListItemText primary="Sent" /></ListItemButton>
      </List>
    </div>
  ),
}

// ─── Icons & Avatars ──────────────────────────────────────────────────────────

export const WithIcons: Story = {
  render: () => (
    <div className="w-[280px] border rounded-lg bg-card overflow-hidden">
      <List>
        <ListItem leading={<ListItemIcon><InboxIcon /></ListItemIcon>}><ListItemText primary="Inbox" /></ListItem>
        <ListItem leading={<ListItemIcon><StarIcon /></ListItemIcon>}><ListItemText primary="Starred" /></ListItem>
        <ListItem leading={<ListItemIcon><SendIcon /></ListItemIcon>}><ListItemText primary="Sent" /></ListItem>
        <ListItem leading={<ListItemIcon><TrashIcon /></ListItemIcon>}><ListItemText primary="Trash" /></ListItem>
      </List>
    </div>
  ),
}

export const WithAvatars: Story = {
  render: () => (
    <div className="w-[360px] border rounded-lg bg-card overflow-hidden">
      <List>
        <ListItem leading={<ListItemAvatar><Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" alt="John" /></ListItemAvatar>}>
          <ListItemText primary="John Doe" secondary="john@example.com" />
        </ListItem>
        <ListItem leading={<ListItemAvatar><Avatar src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" alt="Jane" /></ListItemAvatar>}>
          <ListItemText primary="Jane Smith" secondary="jane@example.com" />
        </ListItem>
        <ListItem leading={<ListItemAvatar><Avatar fallback="Bob Wilson" /></ListItemAvatar>}>
          <ListItemText primary="Bob Wilson" secondary="bob@example.com" />
        </ListItem>
      </List>
    </div>
  ),
}

// ─── alignItems ──────────────────────────────────────────────────────────────

export const AlignItemsFlexStart: Story = {
  name: 'alignItems="flex-start" (multi-line)',
  render: () => (
    <div className="w-[380px] border rounded-lg bg-card overflow-hidden">
      <List>
        <ListItem
          alignItems="flex-start"
          leading={<ListItemAvatar><Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" alt="John" /></ListItemAvatar>}
        >
          <ListItemText
            primary="Brunch this weekend?"
            secondary="Ali Connors — I'll be in your neighborhood doing errands this Saturday. Do you want to grab brunch?"
          />
        </ListItem>
        <ListDivider inset />
        <ListItem
          alignItems="flex-start"
          leading={<ListItemAvatar><Avatar fallback="Scott" /></ListItemAvatar>}
        >
          <ListItemText
            primary="Summer BBQ"
            secondary="to Scott, Alex, Jennifer — Wish I could come, but I'm out of town this weekend."
          />
        </ListItem>
        <ListDivider inset />
        <ListItem
          alignItems="flex-start"
          leading={<ListItemAvatar><Avatar src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" alt="Sandra" /></ListItemAvatar>}
        >
          <ListItemText
            primary="Oui Oui"
            secondary="Sandra Adams — Do you have Paris recommendations? Have you ever been?"
          />
        </ListItem>
      </List>
    </div>
  ),
}

// ─── inset ───────────────────────────────────────────────────────────────────

export const InsetAlignment: Story = {
  name: 'inset — align mixed items',
  render: () => (
    <div className="w-[320px] border rounded-lg bg-card overflow-hidden">
      <List disablePadding>
        <ListItemButton>
          <ListItemIcon><InboxIcon /></ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon><StarIcon /></ListItemIcon>
          <ListItemText primary="Starred" />
        </ListItemButton>
        <ListDivider />
        {/* Items without icons — use inset to align text with icon items above */}
        <ListItemButton>
          <ListItemText inset primary="All mail" />
        </ListItemButton>
        <ListItemButton>
          <ListItemText inset primary="Trash" />
        </ListItemButton>
        <ListItemButton>
          <ListItemText inset primary="Spam" />
        </ListItemButton>
      </List>
    </div>
  ),
}

// ─── Secondary actions ────────────────────────────────────────────────────────

export const WithSecondaryAction: Story = {
  render: () => (
    <div className="w-[360px] border rounded-lg bg-card overflow-hidden">
      <List>
        {['Buy groceries', 'Call mom', 'Finish project'].map((task, i) => (
          <ListItem
            key={task}
            leading={<Checkbox defaultChecked={i === 0} />}
            secondaryAction={
              <IconButton aria-label="More options" variant="ghost" size="sm">
                <MoreIcon />
              </IconButton>
            }
          >
            <ListItemText
              primary={task}
              secondary={['Don\'t forget the milk', 'Wish her happy birthday', 'Due next week'][i]}
            />
          </ListItem>
        ))}
      </List>
    </div>
  ),
}

export const WithSwitchAction: Story = {
  name: 'Secondary action — Switch',
  render: () => (
    <div className="w-[360px] border rounded-lg bg-card overflow-hidden">
      <List>
        <ListItem
          leading={<ListItemIcon><WifiIcon /></ListItemIcon>}
          trailing={<Switch defaultChecked />}
        >
          <ListItemText primary="Wi-Fi" secondary="Connected to Home_Network" />
        </ListItem>
        <ListItem
          leading={<ListItemIcon><BluetoothIcon /></ListItemIcon>}
          trailing={<Switch />}
        >
          <ListItemText primary="Bluetooth" secondary="Off" />
        </ListItem>
      </List>
    </div>
  ),
}

// ─── Subheaders ───────────────────────────────────────────────────────────────

export const WithSubheaders: Story = {
  render: () => (
    <div className="w-[320px] border rounded-lg bg-card overflow-hidden max-h-[360px] overflow-y-auto">
      <List disablePadding>
        <ListSubheader>Inbox</ListSubheader>
        <ListItemButton><ListItemIcon><InboxIcon /></ListItemIcon><ListItemText primary="All Mail" /></ListItemButton>
        <ListItemButton><ListItemIcon><StarIcon /></ListItemIcon><ListItemText primary="Starred" /></ListItemButton>
        <ListDivider />
        <ListSubheader>Labels</ListSubheader>
        <ListItemButton><ListItemText inset primary="Work" /></ListItemButton>
        <ListItemButton><ListItemText inset primary="Personal" /></ListItemButton>
        <ListItemButton><ListItemText inset primary="Shopping" /></ListItemButton>
        <ListDivider />
        <ListSubheader>More</ListSubheader>
        <ListItemButton><ListItemText inset primary="Archive" /></ListItemButton>
        <ListItemButton><ListItemText inset primary="Spam" /></ListItemButton>
        <ListItemButton><ListItemText inset primary="Trash" /></ListItemButton>
      </List>
    </div>
  ),
}

export const SubheaderNotSticky: Story = {
  name: 'Subheader — disableSticky',
  render: () => (
    <div className="w-[320px] border rounded-lg bg-card overflow-hidden max-h-[280px] overflow-y-auto">
      <List disablePadding>
        <ListSubheader disableSticky>Section A (scrolls away)</ListSubheader>
        {Array.from({ length: 5 }, (_, i) => (
          <ListItemButton key={i}><ListItemText primary={`Item A-${i + 1}`} /></ListItemButton>
        ))}
        <ListDivider />
        <ListSubheader disableSticky>Section B (scrolls away)</ListSubheader>
        {Array.from({ length: 5 }, (_, i) => (
          <ListItemButton key={i}><ListItemText primary={`Item B-${i + 1}`} /></ListItemButton>
        ))}
      </List>
    </div>
  ),
}

// ─── Dense ───────────────────────────────────────────────────────────────────

export const Dense: Story = {
  render: () => (
    <div className="w-[280px] border rounded-lg bg-card overflow-hidden">
      <List dense disablePadding>
        {['Compact item 1', 'Compact item 2', 'Compact item 3', 'Compact item 4', 'Compact item 5'].map((label) => (
          <ListItemButton key={label}>
            <ListItemIcon><FolderIcon /></ListItemIcon>
            <ListItemText primary={label} />
          </ListItemButton>
        ))}
      </List>
    </div>
  ),
}

// ─── disableGutters ───────────────────────────────────────────────────────────

export const DisableGutters: Story = {
  name: 'disableGutters — no horizontal padding',
  render: () => (
    <div className="w-[280px] border rounded-lg bg-card overflow-hidden">
      <List disablePadding>
        <ListItemButton disableGutters>
          <ListItemText primary="No gutter item 1" />
        </ListItemButton>
        <ListItemButton disableGutters>
          <ListItemText primary="No gutter item 2" />
        </ListItemButton>
        <ListItemButton disableGutters>
          <ListItemText primary="No gutter item 3" />
        </ListItemButton>
      </List>
    </div>
  ),
}

// ─── primaryTypographyProps ───────────────────────────────────────────────────

export const TypographyProps: Story = {
  name: 'primaryTypographyProps / secondaryTypographyProps',
  render: () => (
    <div className="w-[360px] border rounded-lg bg-card overflow-hidden">
      <List>
        <ListItem leading={<ListItemAvatar><Avatar fallback="A" /></ListItemAvatar>}>
          <ListItemText
            primary="Bold primary, colored secondary"
            secondary="Custom secondary color"
            primaryTypographyProps={{ className: 'font-bold' }}
            secondaryTypographyProps={{ className: 'text-blue-500' }}
          />
        </ListItem>
        <ListItem leading={<ListItemAvatar><Avatar fallback="B" /></ListItemAvatar>}>
          <ListItemText
            primary="Truncated long primary text that will be cut off"
            secondary="Truncated secondary too — this goes on and on and on"
            noWrap
          />
        </ListItem>
        <ListItem leading={<ListItemAvatar><Avatar fallback="C" /></ListItemAvatar>}>
          <ListItemText
            primary="Error state"
            secondary="Something went wrong"
            primaryTypographyProps={{ className: 'text-red-500 font-semibold' }}
            secondaryTypographyProps={{ className: 'text-red-400' }}
          />
        </ListItem>
      </List>
    </div>
  ),
}

// ─── Nested lists ─────────────────────────────────────────────────────────────

export const NestedList: Story = {
  render: function NestedListStory() {
    const [open, setOpen] = React.useState(true)
    return (
      <div className="w-[300px] border rounded-lg bg-card overflow-hidden">
        <List disablePadding>
          <ListItemButton onClick={() => setOpen(!open)}>
            <ListItemIcon><InboxIcon /></ListItemIcon>
            <ListItemText primary="Inbox" />
            <span className={cn('transition-transform', open && 'rotate-90')}>
              <ChevronRightIcon />
            </span>
          </ListItemButton>
          {open && (
            <List disablePadding className="pl-4 border-l border-border ml-4">
              <ListItemButton><ListItemText primary="Starred" /></ListItemButton>
              <ListItemButton><ListItemText primary="Sent Mail" /></ListItemButton>
              <ListItemButton><ListItemText primary="Drafts" /></ListItemButton>
            </List>
          )}
          <ListItemButton>
            <ListItemIcon><StarIcon /></ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon><SendIcon /></ListItemIcon>
            <ListItemText primary="Sent Mail" />
          </ListItemButton>
        </List>
      </div>
    )
  },
}

// ─── Checkbox list ────────────────────────────────────────────────────────────

export const CheckboxList: Story = {
  render: function CheckboxListStory() {
    const items = ['Walk the dog', 'Buy groceries', 'Read a book', 'Write code']
    const [checked, setChecked] = React.useState<string[]>([items[0]])

    const toggle = (value: string) =>
      setChecked((prev) =>
        prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
      )

    return (
      <div className="w-[320px] border rounded-lg bg-card overflow-hidden">
        <List disablePadding>
          {items.map((item) => (
            <ListItemButton key={item} onClick={() => toggle(item)}>
              <Checkbox
                checked={checked.includes(item)}
                onChange={() => toggle(item)}
                onClick={(e) => e.stopPropagation()}
                className="mr-1"
              />
              <ListItemText
                primary={item}
                primaryTypographyProps={{
                  className: checked.includes(item) ? 'line-through text-muted-foreground' : '',
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </div>
    )
  },
}

// ─── Selected state ───────────────────────────────────────────────────────────

export const SelectedState: Story = {
  render: function SelectedStateStory() {
    const [selected, setSelected] = React.useState<string | null>('starred')
    const navItems = [
      { id: 'inbox', label: 'Inbox', icon: <InboxIcon /> },
      { id: 'starred', label: 'Starred', icon: <StarIcon /> },
      { id: 'sent', label: 'Sent', icon: <SendIcon /> },
      { id: 'trash', label: 'Trash', icon: <TrashIcon /> },
    ]
    return (
      <div className="w-[260px] border rounded-lg bg-card overflow-hidden">
        <List disablePadding>
          {navItems.map(({ id, label, icon }) => (
            <ListItemButton
              key={id}
              selected={selected === id}
              onClick={() => setSelected(id)}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          ))}
        </List>
      </div>
    )
  },
}

// ─── Settings-style list ──────────────────────────────────────────────────────

export const SettingsList: Story = {
  name: 'Settings list (real-world)',
  render: function SettingsListStory() {
    const [wifi, setWifi] = React.useState(true)
    const [bt, setBt] = React.useState(false)

    return (
      <div className="w-[380px] border rounded-lg bg-card overflow-hidden">
        <List disablePadding>
          <ListSubheader>Connectivity</ListSubheader>
          <ListItem
            leading={<ListItemIcon><WifiIcon /></ListItemIcon>}
            trailing={<Switch checked={wifi} onCheckedChange={setWifi} />}
          >
            <ListItemText
              primary="Wi-Fi"
              secondary={wifi ? 'Connected to Home_Network' : 'Off'}
            />
          </ListItem>
          <ListItem
            leading={<ListItemIcon><BluetoothIcon /></ListItemIcon>}
            trailing={<Switch checked={bt} onCheckedChange={setBt} />}
          >
            <ListItemText primary="Bluetooth" secondary={bt ? 'On' : 'Off'} />
          </ListItem>
          <ListDivider />
          <ListSubheader>Storage</ListSubheader>
          {['Documents', 'Downloads', 'Desktop'].map((folder) => (
            <ListItemButton key={folder}>
              <ListItemIcon><FolderIcon /></ListItemIcon>
              <ListItemText primary={folder} secondary="42 items" />
              <ChevronRightIcon />
            </ListItemButton>
          ))}
        </List>
      </div>
    )
  },
}

// ─── VirtualList ──────────────────────────────────────────────────────────────

type Person = { id: number; name: string; email: string }

const generatePeople = (count: number): Person[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    name: `Person ${i + 1}`,
    email: `person${i + 1}@example.com`,
  }))

const people10k = generatePeople(10_000)

export const VirtualBasic: Story = {
  name: 'VirtualList — 10 000 items',
  render: () => (
    <div className="w-[400px] border rounded-lg bg-card overflow-hidden">
      <VirtualList
        items={people10k}
        height={320}
        itemHeight={48}
        renderItem={(item) => (
          <div className="flex items-center gap-3 px-4 border-b border-border h-full">
            <ListItemText primary={item.name} secondary={item.email} />
          </div>
        )}
      />
    </div>
  ),
}

export const VirtualWithAvatars: Story = {
  name: 'VirtualList — with avatars',
  render: () => (
    <div className="w-[400px] border rounded-lg bg-card overflow-hidden">
      <VirtualList
        items={people10k}
        height={320}
        itemHeight={56}
        renderItem={(item) => (
          <div className="flex items-center gap-3 px-4 border-b border-border h-full">
            <Avatar fallback={item.name} className="shrink-0" />
            <ListItemText primary={item.name} secondary={item.email} noWrap />
          </div>
        )}
      />
    </div>
  ),
}

export const VirtualClickable: Story = {
  name: 'VirtualList — clickable rows',
  render: function VirtualClickableStory() {
    const [selected, setSelected] = React.useState<number | null>(null)
    return (
      <div className="w-[400px] space-y-2">
        <p className="text-sm text-muted-foreground px-1">
          Selected: {selected !== null ? `Person ${selected + 1}` : 'None'}
        </p>
        <div className="border rounded-lg bg-card overflow-hidden">
          <VirtualList
            items={people10k}
            height={320}
            itemHeight={48}
            renderItem={(item, index) => (
              <button
                type="button"
                onClick={() => setSelected(index)}
                className={cn(
                  'flex items-center gap-3 px-4 border-b border-border h-full w-full text-left',
                  'hover:bg-muted transition-colors',
                  selected === index && 'bg-muted'
                )}
              >
                <ListItemText primary={item.name} secondary={item.email} noWrap />
              </button>
            )}
          />
        </div>
      </div>
    )
  },
}

export const VirtualWithRowNumbers: Story = {
  name: 'VirtualList — row numbers',
  render: () => (
    <div className="w-[400px] border rounded-lg bg-card overflow-hidden">
      <VirtualList
        items={people10k}
        height={320}
        itemHeight={48}
        renderItem={(item, index) => (
          <div className="flex items-center gap-3 px-4 border-b border-border h-full">
            <span className="text-xs tabular-nums text-muted-foreground w-10 shrink-0 text-right">
              {index + 1}
            </span>
            <ListItemText primary={item.name} secondary={item.email} noWrap />
          </div>
        )}
      />
    </div>
  ),
}

// helper needed in JSX outside module scope
function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ')
}
