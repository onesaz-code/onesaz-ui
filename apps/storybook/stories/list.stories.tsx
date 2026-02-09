import type { Meta, StoryObj } from '@storybook/react'
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemAvatar,
  ListSubheader,
  ListDivider,
  Avatar,
  Checkbox,
  IconButton,
  Badge,
} from '@onesaz/ui'

const meta: Meta<typeof List> = {
  title: 'Components/List',
  component: List,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof List>

// Icons
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
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
)

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
  </svg>
)

const MoreIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="1" />
    <circle cx="19" cy="12" r="1" />
    <circle cx="5" cy="12" r="1" />
  </svg>
)

export const Default: Story = {
  render: () => (
    <div className="w-[350px] border rounded-lg bg-card">
      <List>
        <ListItem>
          <ListItemText primary="List item 1" />
        </ListItem>
        <ListItem>
          <ListItemText primary="List item 2" />
        </ListItem>
        <ListItem>
          <ListItemText primary="List item 3" />
        </ListItem>
      </List>
    </div>
  ),
}

export const WithSecondaryText: Story = {
  render: () => (
    <div className="w-[350px] border rounded-lg bg-card">
      <List>
        <ListItem>
          <ListItemText
            primary="Brunch this weekend?"
            secondary="Ali Connors — I'll be in your neighborhood doing errands"
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Summer BBQ"
            secondary="to Scott, Alex, Jennifer — Wish I could come, but I'm out of town"
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Oui Oui"
            secondary="Sandra Adams — Do you have Paris recommendations?"
          />
        </ListItem>
      </List>
    </div>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <div className="w-[350px] border rounded-lg bg-card">
      <List>
        <ListItem leading={<ListItemIcon><InboxIcon /></ListItemIcon>}>
          <ListItemText primary="Inbox" />
        </ListItem>
        <ListItem leading={<ListItemIcon><StarIcon /></ListItemIcon>}>
          <ListItemText primary="Starred" />
        </ListItem>
        <ListItem leading={<ListItemIcon><SendIcon /></ListItemIcon>}>
          <ListItemText primary="Sent" />
        </ListItem>
        <ListItem leading={<ListItemIcon><TrashIcon /></ListItemIcon>}>
          <ListItemText primary="Trash" />
        </ListItem>
      </List>
    </div>
  ),
}

export const WithAvatars: Story = {
  render: () => (
    <div className="w-[350px] border rounded-lg bg-card">
      <List>
        <ListItem
          leading={
            <ListItemAvatar>
              <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" alt="John" />
            </ListItemAvatar>
          }
        >
          <ListItemText primary="John Doe" secondary="john@example.com" />
        </ListItem>
        <ListItem
          leading={
            <ListItemAvatar>
              <Avatar src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" alt="Jane" />
            </ListItemAvatar>
          }
        >
          <ListItemText primary="Jane Smith" secondary="jane@example.com" />
        </ListItem>
        <ListItem
          leading={
            <ListItemAvatar>
              <Avatar fallback="Bob Wilson" />
            </ListItemAvatar>
          }
        >
          <ListItemText primary="Bob Wilson" secondary="bob@example.com" />
        </ListItem>
      </List>
    </div>
  ),
}

export const Clickable: Story = {
  render: () => (
    <div className="w-[350px] border rounded-lg bg-card">
      <List clickable>
        <ListItem onClick={() => console.log('Inbox clicked')}>
          <ListItemIcon><InboxIcon /></ListItemIcon>
          <ListItemText primary="Inbox" />
          <Badge>12</Badge>
        </ListItem>
        <ListItem onClick={() => console.log('Starred clicked')}>
          <ListItemIcon><StarIcon /></ListItemIcon>
          <ListItemText primary="Starred" />
        </ListItem>
        <ListItem onClick={() => console.log('Sent clicked')}>
          <ListItemIcon><SendIcon /></ListItemIcon>
          <ListItemText primary="Sent" />
        </ListItem>
      </List>
    </div>
  ),
}

export const WithSecondaryAction: Story = {
  render: () => (
    <div className="w-[350px] border rounded-lg bg-card">
      <List>
        <ListItem
          leading={<Checkbox />}
          secondaryAction={
            <IconButton aria-label="More options" variant="ghost" size="sm">
              <MoreIcon />
            </IconButton>
          }
        >
          <ListItemText primary="Buy groceries" secondary="Don't forget the milk" />
        </ListItem>
        <ListItem
          leading={<Checkbox />}
          secondaryAction={
            <IconButton aria-label="More options" variant="ghost" size="sm">
              <MoreIcon />
            </IconButton>
          }
        >
          <ListItemText primary="Call mom" secondary="Wish her happy birthday" />
        </ListItem>
        <ListItem
          leading={<Checkbox />}
          secondaryAction={
            <IconButton aria-label="More options" variant="ghost" size="sm">
              <MoreIcon />
            </IconButton>
          }
        >
          <ListItemText primary="Finish project" secondary="Due next week" />
        </ListItem>
      </List>
    </div>
  ),
}

export const WithSubheaders: Story = {
  render: () => (
    <div className="w-[350px] border rounded-lg bg-card max-h-[400px] overflow-auto">
      <List>
        <ListSubheader sticky>Inbox</ListSubheader>
        <ListItem leading={<ListItemIcon><InboxIcon /></ListItemIcon>}>
          <ListItemText primary="All Mail" />
        </ListItem>
        <ListItem leading={<ListItemIcon><StarIcon /></ListItemIcon>}>
          <ListItemText primary="Starred" />
        </ListItem>
        <ListDivider />
        <ListSubheader sticky>Labels</ListSubheader>
        <ListItem>
          <ListItemText primary="Work" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Personal" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Shopping" />
        </ListItem>
      </List>
    </div>
  ),
}

export const Dense: Story = {
  render: () => (
    <div className="w-[350px] border rounded-lg bg-card">
      <List dense>
        <ListItem>
          <ListItemText primary="Dense item 1" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Dense item 2" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Dense item 3" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Dense item 4" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Dense item 5" />
        </ListItem>
      </List>
    </div>
  ),
}

export const SelectedState: Story = {
  render: () => (
    <div className="w-[350px] border rounded-lg bg-card">
      <List>
        <ListItem clickable>
          <ListItemIcon><InboxIcon /></ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItem>
        <ListItem clickable selected>
          <ListItemIcon><StarIcon /></ListItemIcon>
          <ListItemText primary="Starred" />
        </ListItem>
        <ListItem clickable>
          <ListItemIcon><SendIcon /></ListItemIcon>
          <ListItemText primary="Sent" />
        </ListItem>
      </List>
    </div>
  ),
}

export const NoDividers: Story = {
  render: () => (
    <div className="w-[350px] border rounded-lg bg-card">
      <List dividers={false}>
        <ListItem>
          <ListItemText primary="Item without divider 1" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Item without divider 2" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Item without divider 3" />
        </ListItem>
      </List>
    </div>
  ),
}
