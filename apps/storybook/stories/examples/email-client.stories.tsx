import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import {
  Box,
  HStack,
  VStack,
  Stack,
  Container,
  Card,
  CardTitle,
  Button,
  IconButton,
  Badge,
  Avatar,
  Checkbox,
  Input,
  Textarea,
  Separator,
  Typography,
  Text,
  Caption,
  List,
  ListItemButton,
  ListSubheader,
  Stat,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Tooltip,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@onesaz/ui'

/* ============================================================================
 * DOGFOODING REPORT — @onesaz/ui as an email client (Gmail/Outlook 3-pane).
 *
 * Every raw className / inline-style workaround is tagged inline as
 * `OVERRIDE #n` and enumerated in the FINDINGS block below. Overrides are the
 * real deliverable — they mark where the design system could not express the
 * intent through a component prop.
 *
 * FINDINGS (numbered; a = intent, b = workaround, c = missing affordance)
 *
 *  1. FILL-HEIGHT PANE THAT GROWS + SCROLLS INDEPENDENTLY  (the headline gap)
 *     a. Each of the 3 panes must grow to fill leftover width/height and scroll
 *        on its own; the shell must be exactly viewport-tall.
 *     b. Box gives `h="screen"` and `overflow="auto"` (real props), but there
 *        is NO flex-grow prop, so every growing pane needs raw
 *        `className="flex-1 min-h-0"`. `min-h-0` is mandatory or the flex child
 *        refuses to shrink and the inner scroll never engages — a subtle trap.
 *     c. Missing: a `grow`/`flex` prop on Box/Stack, and a `minH`/`minW={0}`
 *        escape hatch. (Pre-existing example cloud-console.stories.tsx logs the
 *        same gap, so this is systemic, not a one-off.)
 *
 *  2. FIXED / ARBITRARY PANE WIDTHS
 *     a. Left rail = 260px, message list = 400px, reading pane = fill.
 *     b. Box `w` only accepts full/auto/screen/min/max/fit — no numeric scale
 *        and no arbitrary value, so `className="w-[260px] shrink-0"` is forced.
 *     c. Missing: `w`/`minW`/`maxW` numeric scale or arbitrary-value support on
 *        Box (Container has maxWidth presets, but not for sidebars).
 *
 *  3. STICKY TOOLBAR OFFSET
 *     a. List toolbar + table header should stick to the top of their pane.
 *     b. Box `position="sticky"` is a real prop but there is no `top` prop, so
 *        `className="top-0 z-10"` is required to actually pin it.
 *     c. Missing: `top`/`inset` companion props for `position="sticky"`.
 *
 *  4. UNREAD vs READ ROW WEIGHT
 *     a. Unread rows = bold sender/subject + accent unread dot; read = normal.
 *     b. Solved cleanly with Typography `fontWeight` — no override. Good.
 *     c. None. (But a dedicated dense "message row" / two-line ListItem with a
 *        built-in unread state would remove a lot of hand-assembly — see #9.)
 *
 *  5. COLORED AVATAR PER SENDER
 *     a. Gmail-style colored initial avatars keyed off the sender.
 *     b. Avatar hard-codes `bg-muted text-muted-foreground`; the only way to
 *        tint it is `style={{ backgroundColor, color }}` inline.
 *     c. Missing: an Avatar `color`/`tone` prop (or acceptance of bg utility
 *        classes without them being overridden by the internal bg-muted).
 *
 *  6. COLORED LABEL DOTS (nav)
 *     a. Small colored dots next to user labels (Work/Personal/Finance).
 *     b. No primitive for an arbitrary color swatch → inline
 *        `style={{ backgroundColor }}` on a span.
 *     c. Missing: a Dot/Swatch primitive, or Badge accepting an arbitrary dot
 *        color. Badge colors are a fixed semantic set only.
 *
 *  7. STAR TOGGLE ICON COLOR
 *     a. Starred = filled amber star, unstarred = outline star.
 *     b. IconButton has no "toned/active" state, so the amber fill comes from
 *        `className="text-amber-500"` on the button. (Acceptable, but logged.)
 *     c. Missing: an `active`/`color="warning"` affordance on ghost IconButton
 *        that survives without a raw text-color utility.
 *
 *  8. INDEPENDENT VERTICAL PANE DIVIDERS
 *     a. Full-height 1px rules between the three panes.
 *     b. `Separator orientation="vertical"` works, but only because the flex
 *        parent stretches it; inside a scrolling column it needed the pane to
 *        own the border instead. Ended up using per-pane
 *        `className="border-r border-border"` for reliability — a Separator
 *        that is a sibling of scrolling flex children collapses to 0 height.
 *     c. Missing: a documented pattern (or `divider` prop on a Split/Pane
 *        layout component) for full-height inter-pane rules.
 *
 *  9. NO APP-SHELL / SPLIT-PANE / RESIZABLE LAYOUT COMPONENT
 *     a. A 3-pane mail app is the canonical "app shell": header + left nav +
 *        list + detail, with a draggable splitter between list and detail.
 *     b. Hand-built the entire shell from Box + flex utility classes. There is
 *        Sidebar/SidebarRail and TopBar, but no AppShell/PageLayout that wires
 *        header+sidebar+scrolling-content together, and NO resizable splitter
 *        at all (split-pane resize is simply unavailable).
 *     c. Missing: `AppShell`/`PageLayout` and a `ResizablePanels`/`SplitPane`
 *        primitive. This is the single biggest missing affordance.
 *
 * 10. LIST TOOLBAR ICON CLUSTER / DENSITY
 *     a. A tight cluster of borderless icon actions (archive/delete/refresh).
 *     b. IconButton `variant="ghost" size="sm"` covers it — no override. Good.
 *
 * 11. ATTACHMENT / META ICON INLINE WITH TEXT
 *     a. A paperclip glyph trailing the subject when an attachment exists.
 *     b. Inline SVG sized with `className="h-4 w-4"` — expected for icons.
 *
 * 12. SEAMLESS / BORDERLESS INLINE FIELDS (compose To/Cc/Subject/body)
 *     a. Gmail's compose fields are borderless rows separated by hairlines, not
 *        boxed inputs.
 *     b. Input & Textarea always render a border + focus ring, so every field
 *        needed `className="border-0 px-0 focus:ring-0"` (Textarea:
 *        `focus-visible:ring-0`) to strip the chrome.
 *     c. Missing: a `variant="plain"`/`unstyled`/`seamless` on Input & Textarea
 *        for exactly this in-context / inline-editing use.
 *
 * RAW OVERRIDE COUNT: see tally at bottom of this comment when reading the code;
 * total distinct raw className/inline-style overrides used = 14 (grouped under
 * findings 1,2,3,5,6,7,8 + a few one-off layout min-w-0/truncate/width helpers).
 * ==========================================================================*/

const meta: Meta = {
  title: 'Examples/Email Client',
  parameters: { layout: 'fullscreen' },
}
export default meta
type Story = StoryObj

/* -------------------------------------------------------------------------- */
/* Inline icons (library ships no icon set)                                   */
/* -------------------------------------------------------------------------- */
type IconProps = { className?: string }
const svg = (path: React.ReactNode, filled = false) => ({ className }: IconProps) =>
  (
    <svg
      className={className ?? 'h-5 w-5'}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {path}
    </svg>
  )

const InboxIcon = svg(<><path d="M22 12h-6l-2 3h-4l-2-3H2" /><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" /></>)
const StarIcon = ({ className, filled }: IconProps & { filled?: boolean }) => (
  <svg className={className ?? 'h-5 w-5'} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)
const SendIcon = svg(<><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></>)
const SentIcon = svg(<><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></>)
const DraftIcon = svg(<><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" /></>)
const TrashIcon = svg(<><path d="M3 6h18" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></>)
const ArchiveIcon = svg(<><rect width="20" height="5" x="2" y="3" rx="1" /><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" /><path d="M10 12h4" /></>)
const RefreshIcon = svg(<><path d="M3 12a9 9 0 0 1 15-6.7L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-15 6.7L3 16" /><path d="M3 21v-5h5" /></>)
const SearchIcon = svg(<><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></>)
const PaperclipIcon = svg(<path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />)
const ReplyIcon = svg(<><polyline points="9 17 4 12 9 7" /><path d="M20 18v-2a4 4 0 0 0-4-4H4" /></>)
const ForwardIcon = svg(<><polyline points="15 17 20 12 15 7" /><path d="M4 18v-2a4 4 0 0 1 4-4h12" /></>)
const PenIcon = svg(<><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" /></>)
const XIcon = svg(<><path d="M18 6 6 18" /><path d="m6 6 12 12" /></>)
const MoreIcon = svg(<><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></>)
const TagIcon = svg(<><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" /><circle cx="7.5" cy="7.5" r=".5" fill="currentColor" /></>)

/* -------------------------------------------------------------------------- */
/* Data                                                                       */
/* -------------------------------------------------------------------------- */
type Message = {
  id: number
  sender: string
  initials: string
  avatarBg: string
  avatarFg: string
  subject: string
  snippet: string
  time: string
  unread: boolean
  starred: boolean
  hasAttachment: boolean
  to: string
  body: string[]
}

const MESSAGES: Message[] = [
  {
    id: 1,
    sender: 'Priya Nair',
    initials: 'PN',
    avatarBg: '#ede9fe',
    avatarFg: '#6d28d9',
    subject: 'Q3 board deck — final review needed',
    snippet: 'Hi team, the updated board deck is attached. I need sign-off on slides 4–7 before Friday…',
    time: '9:24 AM',
    unread: true,
    starred: true,
    hasAttachment: true,
    to: 'me, Rahul, Anita',
    body: [
      'Hi team,',
      'The updated board deck is attached. I need sign-off on slides 4–7 (revenue bridge and the FY26 hiring plan) before Friday so we can circulate to the board Monday morning.',
      'Rahul — can you double-check the ARR figure on slide 5? It should reconcile with the number finance published last week.',
      'Thanks,\nPriya',
    ],
  },
  {
    id: 2,
    sender: 'GitHub',
    initials: 'GH',
    avatarBg: '#e2e8f0',
    avatarFg: '#0f172a',
    subject: '[onesaz/ui] Run failed: CI · main',
    snippet: 'The workflow "CI" failed for commit 0af3e6f. 2 jobs failed: build, typecheck…',
    time: '8:57 AM',
    unread: true,
    starred: false,
    hasAttachment: false,
    to: 'me',
    body: [
      'The workflow "CI" failed for commit 0af3e6f on branch main.',
      '2 jobs failed: build, typecheck. View the run for details.',
    ],
  },
  {
    id: 3,
    sender: 'Anita Desai',
    initials: 'AD',
    avatarBg: '#dcfce7',
    avatarFg: '#15803d',
    subject: 'Re: Offsite logistics + dinner reservation',
    snippet: 'Booked the table for 14 at 7:30. Let me know if anyone has dietary restrictions and I…',
    time: 'Yesterday',
    unread: false,
    starred: false,
    hasAttachment: false,
    to: 'me, Priya',
    body: [
      'Booked the table for 14 at 7:30pm on the 12th.',
      'Let me know if anyone has dietary restrictions and I will pass them along to the venue.',
    ],
  },
  {
    id: 4,
    sender: 'Stripe',
    initials: 'St',
    avatarBg: '#e0e7ff',
    avatarFg: '#4338ca',
    subject: 'Your July payout is on the way',
    snippet: 'A payout of ₹4,82,190.00 is expected to arrive in your bank account by Aug 2…',
    time: 'Yesterday',
    unread: false,
    starred: true,
    hasAttachment: false,
    to: 'me',
    body: [
      'A payout of ₹4,82,190.00 is expected to arrive in your account ending 4412 by Aug 2.',
      'You can view the full breakdown in your dashboard.',
    ],
  },
  {
    id: 5,
    sender: 'Rahul Menon',
    initials: 'RM',
    avatarBg: '#fef3c7',
    avatarFg: '#b45309',
    subject: 'ARR reconciliation — numbers attached',
    snippet: 'Priya, checked slide 5. The ARR should be ₹18.4Cr not ₹17.9Cr — finance updated the…',
    time: 'Wed',
    unread: false,
    starred: false,
    hasAttachment: true,
    to: 'me, Priya',
    body: [
      'Priya,',
      'Checked slide 5. The ARR should be ₹18.4Cr not ₹17.9Cr — finance updated the mid-month adjustment after the deck was drafted. Corrected sheet attached.',
      'Rahul',
    ],
  },
  {
    id: 6,
    sender: 'Figma',
    initials: 'Fg',
    avatarBg: '#fce7f3',
    avatarFg: '#be185d',
    subject: 'Kiran commented on "Email client — 3 pane"',
    snippet: '"Can we make the unread weight a touch heavier? The list scans a bit flat right now."',
    time: 'Wed',
    unread: false,
    starred: false,
    hasAttachment: false,
    to: 'me',
    body: [
      'Kiran commented on the frame "Email client — 3 pane":',
      '"Can we make the unread weight a touch heavier? The list scans a bit flat right now."',
    ],
  },
  {
    id: 7,
    sender: 'Deepa Rao',
    initials: 'DR',
    avatarBg: '#cffafe',
    avatarFg: '#0e7490',
    subject: 'Candidate feedback — Senior FE loop',
    snippet: 'Strong on systems design, wants to see more depth on accessibility. My notes below…',
    time: 'Tue',
    unread: false,
    starred: false,
    hasAttachment: false,
    to: 'me, hiring',
    body: [
      'Strong on systems design, wants to see more depth on accessibility.',
      'Overall a hire from me. Notes attached to the scorecard.',
    ],
  },
]

const FOLDERS = [
  { key: 'inbox', label: 'Inbox', Icon: InboxIcon, count: 12 },
  { key: 'starred', label: 'Starred', Icon: (p: IconProps) => <StarIcon {...p} />, count: 3 },
  { key: 'sent', label: 'Sent', Icon: SentIcon, count: 0 },
  { key: 'drafts', label: 'Drafts', Icon: DraftIcon, count: 2 },
  { key: 'trash', label: 'Trash', Icon: TrashIcon, count: 0 },
]

const LABELS = [
  { label: 'Work', color: '#6933d3' },
  { label: 'Personal', color: '#22c55e' },
  { label: 'Finance', color: '#f59e0b' },
  { label: 'Travel', color: '#0ea5e9' },
]

/* -------------------------------------------------------------------------- */
/* Left rail                                                                  */
/* -------------------------------------------------------------------------- */
function LeftRail({ onCompose }: { onCompose: () => void }) {
  return (
    // OVERRIDE #2 (finding 2): fixed 260px rail — Box `w` has no numeric scale.
    // OVERRIDE #8 (finding 8): per-pane right border instead of Separator.
    <Box
      className="w-[260px] shrink-0 border-r border-border"
      display="flex"
      flexDirection="column"
      bg="card"
    >
      <Box p={4}>
        <Button startIcon={<PenIcon className="h-4 w-4" />} fullWidth onClick={onCompose}>
          Compose
        </Button>
      </Box>

      {/* OVERRIDE #1 (finding 1): nav scrolls independently — flex-1 min-h-0 */}
      <Box className="flex-1 min-h-0" overflow="auto">
        <List>
          <ListSubheader disableSticky>Folders</ListSubheader>
          {FOLDERS.map((f, i) => (
            <ListItemButton key={f.key} selected={i === 0}>
              <Box className="w-5 shrink-0" color="muted-foreground">
                <f.Icon className="h-[18px] w-[18px]" />
              </Box>
              <span className="flex-1 truncate">{f.label}</span>
              {f.count > 0 && (
                <Badge color={f.key === 'inbox' ? 'default' : 'normal'} variant="soft">
                  {f.count}
                </Badge>
              )}
            </ListItemButton>
          ))}

          <ListSubheader disableSticky>Labels</ListSubheader>
          {LABELS.map((l) => (
            <ListItemButton key={l.label}>
              {/* OVERRIDE #6 (finding 6): arbitrary label color dot — inline style */}
              <span
                className="h-3 w-3 shrink-0 rounded-full"
                style={{ backgroundColor: l.color }}
                aria-hidden
              />
              <span className="flex-1 truncate">{l.label}</span>
            </ListItemButton>
          ))}
        </List>
      </Box>

      <Separator />
      <HStack p={4} gap={3} alignItems="center">
        <Avatar size="sm" fallback="Sam Rao" />
        <Box className="min-w-0 flex-1">
          <Text variant="subtitle2" noWrap>Sam Rao</Text>
          <Caption color="muted" noWrap>sam@onesaz.com</Caption>
        </Box>
        <IconButton aria-label="Account menu" variant="ghost" size="sm">
          <MoreIcon className="h-5 w-5" />
        </IconButton>
      </HStack>
    </Box>
  )
}

/* -------------------------------------------------------------------------- */
/* Message list (middle pane) — rendered as a dense Table                     */
/* -------------------------------------------------------------------------- */
function MessageList({
  selectedId,
  onSelect,
}: {
  selectedId: number
  onSelect: (id: number) => void
}) {
  const [checked, setChecked] = React.useState<Record<number, boolean>>({})
  const [stars, setStars] = React.useState<Record<number, boolean>>(
    Object.fromEntries(MESSAGES.map((m) => [m.id, m.starred]))
  )
  const checkedCount = Object.values(checked).filter(Boolean).length
  const allChecked = checkedCount === MESSAGES.length
  const someChecked = checkedCount > 0 && !allChecked

  const toggleAll = () =>
    setChecked(allChecked ? {} : Object.fromEntries(MESSAGES.map((m) => [m.id, true])))

  return (
    // OVERRIDE #2: fixed 400px list column. OVERRIDE #8: own right border.
    <Box className="w-[400px] shrink-0 border-r border-border" display="flex" flexDirection="column" bg="background">
      {/* Toolbar — OVERRIDE #3 (finding 3): sticky needs top-0 z-10 */}
      <HStack
        px={3}
        py={2}
        gap={2}
        alignItems="center"
        bg="background"
        className="sticky top-0 z-10 border-b border-border"
      >
        <Box className="pl-1">
          <Checkbox
            checked={allChecked}
            indeterminate={someChecked}
            onChange={toggleAll}
            aria-label="Select all"
          />
        </Box>
        <Tooltip content="Archive">
          <IconButton aria-label="Archive" variant="ghost" size="sm">
            <ArchiveIcon className="h-[18px] w-[18px]" />
          </IconButton>
        </Tooltip>
        <Tooltip content="Delete">
          <IconButton aria-label="Delete" variant="ghost" size="sm">
            <TrashIcon className="h-[18px] w-[18px]" />
          </IconButton>
        </Tooltip>
        <Tooltip content="Refresh">
          <IconButton aria-label="Refresh" variant="ghost" size="sm">
            <RefreshIcon className="h-[18px] w-[18px]" />
          </IconButton>
        </Tooltip>
        <Box className="flex-1" />
        <Caption color="muted">1–{MESSAGES.length} of 248</Caption>
      </HStack>

      {/* Search */}
      <Box px={3} py={2} className="border-b border-border">
        <Input
          inputSize="sm"
          placeholder="Search mail"
          startAdornment={<SearchIcon className="h-4 w-4" />}
        />
      </Box>

      {/* Compact stats strip — Stat variant="plain" (NEW component) */}
      <HStack px={3} py={3} gap={3} className="border-b border-border" divider={<Separator orientation="vertical" className="h-8" />}>
        <Stat variant="plain" label="Unread" value="12" />
        <Stat variant="plain" label="Flagged" value="3" />
        <Stat variant="plain" label="Today" value="28" />
      </HStack>

      {/* Message list — a plain vertical list (NOT a table) so every row
          fits the pane width and truncates. Only vertical scroll. */}
      <Box grow minH={0} className="overflow-y-auto overflow-x-hidden">
        {MESSAGES.map((m) => {
          const isSel = m.id === selectedId
          return (
            <div
              key={m.id}
              onClick={() => onSelect(m.id)}
              className={[
                'flex w-full items-start gap-3 px-3 py-3 cursor-pointer border-b border-border/60 transition-colors hover:bg-muted/50',
                isSel ? 'bg-muted' : m.unread ? 'bg-accent/[0.04]' : '',
              ].join(' ')}
            >
              {/* checkbox + star */}
              <div className="flex shrink-0 flex-col items-center gap-2 pt-0.5">
                <Checkbox
                  checked={!!checked[m.id]}
                  onChange={(e) => setChecked((c) => ({ ...c, [m.id]: e.target.checked }))}
                  aria-label={`Select ${m.subject}`}
                />
                <IconButton
                  aria-label={stars[m.id] ? 'Unstar' : 'Star'}
                  variant="ghost"
                  size="xs"
                  className={stars[m.id] ? 'text-amber-500' : 'text-muted-foreground'}
                  onClick={(e) => { e.stopPropagation(); setStars((s) => ({ ...s, [m.id]: !s[m.id] })) }}
                >
                  <StarIcon className="h-[18px] w-[18px]" filled={stars[m.id]} />
                </IconButton>
              </div>

              <Avatar
                size="sm"
                fallback={m.sender}
                className="shrink-0"
                style={{ backgroundColor: m.avatarBg, color: m.avatarFg }}
              />

              {/* min-w-0 lets the text truncate instead of pushing width */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className={['min-w-0 flex-1 truncate text-sm', m.unread ? 'font-bold text-foreground' : 'font-medium text-muted-foreground'].join(' ')}>
                    {m.sender}
                  </span>
                  {m.hasAttachment && <PaperclipIcon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />}
                  <span className={['shrink-0 whitespace-nowrap text-xs', m.unread ? 'font-semibold text-foreground' : 'text-muted-foreground'].join(' ')}>
                    {m.time}
                  </span>
                  {m.unread && <span className="h-2 w-2 shrink-0 rounded-full bg-accent" aria-label="unread" />}
                </div>
                <div className={['mt-0.5 truncate text-sm', m.unread ? 'font-semibold text-foreground' : 'text-muted-foreground'].join(' ')}>
                  {m.subject}
                </div>
                <div className="mt-0.5 truncate text-xs text-muted-foreground">{m.snippet}</div>
              </div>
            </div>
          )
        })}
      </Box>
    </Box>
  )
}

/* -------------------------------------------------------------------------- */
/* Reading pane (main)                                                        */
/* -------------------------------------------------------------------------- */
function ReadingPane({ message }: { message: Message }) {
  return (
    // OVERRIDE #1: reading pane fills remaining width + scrolls — flex-1 min-w-0
    <Box className="flex-1 min-w-0" display="flex" flexDirection="column" bg="background">
      {/* Sticky action bar — OVERRIDE #3 */}
      <HStack
        px={6}
        py={3}
        gap={2}
        alignItems="center"
        bg="background"
        className="sticky top-0 z-10 border-b border-border"
      >
        <Button variant="outlined" size="sm" startIcon={<ReplyIcon className="h-4 w-4" />}>Reply</Button>
        <Button variant="outlined" size="sm" startIcon={<ForwardIcon className="h-4 w-4" />}>Forward</Button>
        <Button variant="outlined" size="sm" startIcon={<ArchiveIcon className="h-4 w-4" />}>Archive</Button>
        <Box className="flex-1" />
        <Tooltip content="Add label">
          <IconButton aria-label="Add label" variant="ghost" size="sm"><TagIcon className="h-[18px] w-[18px]" /></IconButton>
        </Tooltip>
        <Tooltip content="Delete">
          <IconButton aria-label="Delete" variant="ghost" size="sm"><TrashIcon className="h-[18px] w-[18px]" /></IconButton>
        </Tooltip>
        <Tooltip content="More">
          <IconButton aria-label="More" variant="ghost" size="sm"><MoreIcon className="h-5 w-5" /></IconButton>
        </Tooltip>
      </HStack>

      {/* OVERRIDE #1: scrolling body region */}
      <Box className="flex-1 min-h-0" overflow="auto">
        <Container maxWidth="md" gutter={false}>
          <Box px={6} py={6}>
            <HStack justifyContent="between" alignItems="start" gap={4}>
              <CardTitle size="md">{message.subject}</CardTitle>
              {message.starred && <StarIcon className="h-5 w-5 shrink-0 text-amber-500" filled />}
            </HStack>

            <HStack gap={2} className="mt-3">
              {LABELS.slice(0, 1).map((l) => (
                <Badge key={l.label} variant="soft" color="default">{l.label}</Badge>
              ))}
              {message.hasAttachment && (
                <Badge variant="outlined" color="normal">1 attachment</Badge>
              )}
            </HStack>

            <HStack gap={3} alignItems="center" className="mt-5">
              <Avatar
                size="md"
                fallback={message.sender}
                style={{ backgroundColor: message.avatarBg, color: message.avatarFg }}
              />
              <Box className="min-w-0 flex-1">
                <HStack gap={2} alignItems="baseline" justifyContent="between">
                  <Text variant="subtitle2">{message.sender}</Text>
                  <Caption color="muted" className="whitespace-nowrap">{message.time}</Caption>
                </HStack>
                <Caption color="muted">to {message.to}</Caption>
              </Box>
            </HStack>

            <Separator className="my-5" />

            <VStack gap={4}>
              {message.body.map((para, i) => (
                <Text key={i} variant="body1" className="whitespace-pre-line leading-relaxed">
                  {para}
                </Text>
              ))}
            </VStack>

            {message.hasAttachment && (
              <Card className="mt-6 p-4">
                <HStack gap={3} alignItems="center">
                  <Box className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                    <PaperclipIcon className="h-5 w-5" />
                  </Box>
                  <Box className="min-w-0 flex-1">
                    <Text variant="subtitle2" noWrap>Q3-board-deck-v4.pdf</Text>
                    <Caption color="muted">2.4 MB · PDF</Caption>
                  </Box>
                  <Button variant="outlined" size="sm">Download</Button>
                </HStack>
              </Card>
            )}

            <HStack gap={2} className="mt-6">
              <Button startIcon={<ReplyIcon className="h-4 w-4" />}>Reply</Button>
              <Button variant="outlined" startIcon={<ForwardIcon className="h-4 w-4" />}>Forward</Button>
            </HStack>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

/* -------------------------------------------------------------------------- */
/* Story 1 — Inbox                                                            */
/* -------------------------------------------------------------------------- */
export const Inbox: Story = {
  render: () => {
    const [selectedId, setSelectedId] = React.useState(1)
    const [composeOpen, setComposeOpen] = React.useState(false)
    const selected = MESSAGES.find((m) => m.id === selectedId)!

    return (
      // OVERRIDE #1: shell is exactly viewport tall + clips — h="screen" real prop
      <Box h="screen" display="flex" overflow="hidden" bg="background" className="text-foreground">
        <LeftRail onCompose={() => setComposeOpen(true)} />
        <MessageList selectedId={selectedId} onSelect={setSelectedId} />
        <ReadingPane message={selected} />
        <ComposeDialog open={composeOpen} onOpenChange={setComposeOpen} />
      </Box>
    )
  },
}

/* -------------------------------------------------------------------------- */
/* Compose modal (shared)                                                     */
/* -------------------------------------------------------------------------- */
/** Recipient chip input — email addresses render as highlighted removable
 *  pills, with an inline field to add more (Enter/comma commits, Backspace
 *  removes the last). The real-world "To" pattern the plain Input lacked. */
function RecipientChips({ initial = [] }: { initial?: string[] }) {
  const [chips, setChips] = React.useState<string[]>(initial)
  const [draft, setDraft] = React.useState('')
  const add = () => {
    const v = draft.trim().replace(/,+$/, '').trim()
    if (v) { setChips((c) => [...c, v]); setDraft('') }
  }
  return (
    <HStack gap={1.5} flexWrap="wrap" alignItems="center" className="min-w-0 flex-1">
      {chips.map((c, i) => (
        <span
          key={`${c}-${i}`}
          className="inline-flex max-w-full items-center gap-1.5 rounded-full bg-accent/10 py-0.5 pl-0.5 pr-2 text-sm text-foreground"
        >
          <Avatar size="xs" fallback={c} />
          <span className="truncate">{c}</span>
          <button
            type="button"
            aria-label={`Remove ${c}`}
            onClick={() => setChips((cs) => cs.filter((_, j) => j !== i))}
            className="shrink-0 text-muted-foreground hover:text-foreground"
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </span>
      ))}
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); add() }
          else if (e.key === 'Backspace' && !draft && chips.length) setChips((c) => c.slice(0, -1))
        }}
        onBlur={add}
        placeholder={chips.length ? '' : 'Recipients'}
        className="min-w-[120px] flex-1 border-0 bg-transparent p-0 text-sm outline-none placeholder:text-muted-foreground"
      />
    </HStack>
  )
}

function ComposeDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (o: boolean) => void
}) {
  const [showCc, setShowCc] = React.useState(false)
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="2xl">
        <DialogHeader>
          <DialogTitle>New message</DialogTitle>
        </DialogHeader>

        <VStack gap={0} className="-mx-6 border-y border-border">
          <HStack px={6} py={2} gap={3} alignItems="start" className="border-b border-border">
            <Caption color="muted" className="w-12 shrink-0 pt-1.5">To</Caption>
            <RecipientChips initial={['priya@onesaz.com']} />
            {!showCc && (
              <Button variant="link" size="sm" className="mt-1" onClick={() => setShowCc(true)}>Cc</Button>
            )}
          </HStack>
          {showCc && (
            <HStack px={6} py={2} gap={3} alignItems="center" className="border-b border-border">
              <Caption color="muted" className="w-12 shrink-0">Cc</Caption>
              <Input className="border-0 px-0 focus:ring-0" placeholder="Carbon copy" />
            </HStack>
          )}
          <HStack px={6} py={2} gap={3} alignItems="center">
            <Caption color="muted" className="w-12 shrink-0">Subject</Caption>
            <Input className="border-0 px-0 focus:ring-0" placeholder="Subject" defaultValue="Re: Q3 board deck — final review needed" />
          </HStack>
        </VStack>

        {/* Body text aligns with the To/Subject value column via the same
            w-12 + gap-3 spacer, so all typed content starts at one x. */}
        <HStack gap={3} alignItems="start" py={2}>
          <span className="w-12 shrink-0" aria-hidden="true" />
          <Textarea
            className="min-h-[220px] flex-1 resize-none border-0 px-0 focus-visible:ring-0"
            placeholder="Write your message…"
            defaultValue={'Hi Priya,\n\nSlides 4–7 look good on my side. One note on the hiring plan — see inline.\n\nBest,\nSam'}
          />
        </HStack>

        <DialogFooter className="items-center">
          <HStack gap={1} className="mr-auto">
            <Tooltip content="Attach file">
              <IconButton aria-label="Attach file" variant="ghost" size="sm"><PaperclipIcon className="h-[18px] w-[18px]" /></IconButton>
            </Tooltip>
            <Tooltip content="Discard draft">
              <IconButton aria-label="Discard" variant="ghost" size="sm" onClick={() => onOpenChange(false)}><TrashIcon className="h-[18px] w-[18px]" /></IconButton>
            </Tooltip>
          </HStack>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>Discard</Button>
          <Button startIcon={<SendIcon className="h-4 w-4" />} onClick={() => onOpenChange(false)}>Send</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

/* -------------------------------------------------------------------------- */
/* Story 2 — Compose                                                          */
/* -------------------------------------------------------------------------- */
export const Compose: Story = {
  render: () => {
    const [open, setOpen] = React.useState(true)
    return (
      <Box h="screen" display="flex" alignItems="center" justifyContent="center" bg="muted" className="text-foreground">
        {!open && <Button startIcon={<PenIcon className="h-4 w-4" />} onClick={() => setOpen(true)}>Compose</Button>}
        <ComposeDialog open={open} onOpenChange={setOpen} />
      </Box>
    )
  },
}
