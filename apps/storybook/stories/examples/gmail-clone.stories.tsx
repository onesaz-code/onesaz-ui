import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import {
  Box,
  HStack,
  VStack,
  Button,
  IconButton,
  Checkbox,
  Input,
  Avatar,
  Badge,
  Separator,
  Tooltip,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Textarea,
  Caption,
  cn,
} from '@onesaz/ui'

const meta: Meta = {
  title: 'Examples/Gmail Clone',
  parameters: { layout: 'fullscreen' },
}
export default meta
type Story = StoryObj

/* -------------------------------------------------------------------------- */
/* Icons                                                                      */
/* -------------------------------------------------------------------------- */
const I = ({ children, fill = 'none' }: { children: React.ReactNode; fill?: string }) => (
  <svg viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
)
const MenuIcon = () => <I><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></I>
const SearchIcon = () => <I><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></I>
const SlidersIcon = () => <I><line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" /><line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" /><line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" /><line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" /><line x1="17" y1="16" x2="23" y2="16" /></I>
const InboxIcon = () => <I><polyline points="22 12 16 12 14 15 10 15 8 12 2 12" /><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" /></I>
const StarIcon = ({ filled }: { filled?: boolean }) => <I fill={filled ? 'currentColor' : 'none'}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></I>
const ClockIcon = () => <I><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></I>
const SendIcon = () => <I><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></I>
const DraftIcon = () => <I><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z" /></I>
const LabelIcon = () => <I><path d="M20.59 13.41 13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /></I>
const ArchiveIcon = () => <I><polyline points="21 8 21 21 3 21 3 8" /><rect x="1" y="3" width="22" height="5" /><line x1="10" y1="12" x2="14" y2="12" /></I>
const TrashIcon = () => <I><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></I>
const MailOpenIcon = () => <I><path d="M21 10.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8.5" /><path d="m3 10.5 9-6 9 6" /><path d="m3 10.5 7.6 5a2 2 0 0 0 2.8 0l7.6-5" /></I>
const RefreshIcon = () => <I><polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" /></I>
const MoreIcon = () => <I><circle cx="12" cy="5" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="12" cy="19" r="1" /></I>
const AppsIcon = () => <I fill="currentColor"><circle cx="5" cy="5" r="1.6" /><circle cx="12" cy="5" r="1.6" /><circle cx="19" cy="5" r="1.6" /><circle cx="5" cy="12" r="1.6" /><circle cx="12" cy="12" r="1.6" /><circle cx="19" cy="12" r="1.6" /><circle cx="5" cy="19" r="1.6" /><circle cx="12" cy="19" r="1.6" /><circle cx="19" cy="19" r="1.6" /></I>
const SettingsIcon = () => <I><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></I>
const PencilIcon = () => <I><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" /></I>
const PaperclipIcon = () => <I><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" /></I>
const ChevronLeft = () => <I><polyline points="15 18 9 12 15 6" /></I>
const ChevronRight = () => <I><polyline points="9 18 15 12 9 6" /></I>
const ArrowLeft = () => <I><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></I>
const ReplyIcon = () => <I><polyline points="9 17 4 12 9 7" /><path d="M20 18v-2a4 4 0 0 0-4-4H4" /></I>
const HelpIcon = () => <I><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></I>

/* -------------------------------------------------------------------------- */
/* Data                                                                       */
/* -------------------------------------------------------------------------- */
type Cat = 'primary' | 'promotions' | 'social'
type Mail = {
  id: number
  sender: string
  subject: string
  snippet: string
  body: string
  date: string
  ts: number
  unread: boolean
  starred: boolean
  attachment?: string
  cat: Cat
}

const RAW: Omit<Mail, 'ts'>[] = [
  { id: 1, sender: 'GitHub', subject: 'erra-abhay invited you to erra-abhay/Optimus', snippet: '@erra-abhay has invited you to collaborate on the erra-abhay/Optimus repository. You can accept or decline.', body: '@erra-abhay has invited you to collaborate on the erra-abhay/Optimus repository.\n\nYou can accept or decline this invitation. You can also visit the repository to review it.', date: '20:29', unread: true, starred: false, cat: 'social' },
  { id: 2, sender: 'Canva', subject: 'Action required: please update your payment method', snippet: "We don't have your details on file and your subscription renews soon.", body: "We don't have your current payment details on file. To keep Canva Pro, please update your payment method before your renewal date.", date: '18:26', unread: true, starred: false, cat: 'promotions' },
  { id: 3, sender: 'Tina Kriplani (tikr)', subject: "Exclusive Invitation: Join Odoo India's Biggest Tech Event!", snippet: 'Hello, As your dedicated Business Adviser at Odoo, I want to personally invite you to the biggest business event.', body: 'Hello,\n\nAs your dedicated Business Adviser at Odoo, I want to personally invite you to the biggest business event of the year. Free pass inside.', date: '17:26', unread: true, starred: false, cat: 'promotions' },
  { id: 4, sender: 'npm', subject: 'Successfully published @onesaz/ui@0.4.24', snippet: 'Hi har919! A new version of the package @onesaz/ui (0.4.24) was published.', body: 'Hi har919!\n\nA new version of the package @onesaz/ui (0.4.24) was published at 2026-07-30T06:23:31.836Z from 2406:b400:1a29.', date: '11:53', unread: false, starred: true, cat: 'primary' },
  { id: 5, sender: 'Google', subject: 'Security alert', snippet: 'A new sign-in on Mac harshavardhan.k@onesaz.com. We noticed a new sign-in to your Google Account.', body: "A new sign-in on Mac\n\nWe noticed a new sign-in to your Google Account on a Mac device. If this was you, you don't need to do anything.", date: '10:16', unread: false, starred: false, cat: 'primary' },
  { id: 6, sender: 'MongoDB Atlas', subject: 'Alert - Project 0 - CPU (User) % above 95', snippet: 'ORGANIZATION Acad Hub edu tech private limited PROJECT Project 0 System: CPU (User) % has gone above 95.', body: 'ORGANIZATION Acad Hub edu tech private limited\nPROJECT Project 0\n\nAn alert is open for your Atlas project: System CPU (User) % has gone above 95 on clustern-shard-00.', date: '07:12', unread: true, starred: false, cat: 'primary' },
  { id: 7, sender: 'MongoDB Atlas', subject: 'Alert - Project 0 - alert is open', snippet: 'ORGANIZATION Acad Hub edu tech private limited PROJECT Project 0 An alert is open for your Atlas project.', body: 'ORGANIZATION Acad Hub edu tech private limited\nPROJECT Project 0\n\nAn alert is open for your Atlas project: ALERT System CPU (User).', date: '07:04', unread: true, starred: false, cat: 'primary' },
  { id: 8, sender: 'Cursor Team', subject: 'Cursor, now on iPad', snippet: 'All the power and convenience of Cursor on iPhone, now in a bigger form factor.', body: 'All the power and convenience of Cursor on iPhone, now in a bigger form factor. Try it today.', date: '02:06', unread: false, starred: false, cat: 'promotions' },
  { id: 9, sender: 'Priya Nair', subject: 'Q3 board deck — final review needed', snippet: 'Hi team, the updated board deck is attached. I need sign-off on slides 4–7 before Friday.', body: 'Hi team,\n\nThe updated board deck is attached. I need sign-off on slides 4–7 before Friday so we can send it to the board.\n\nThanks,\nPriya', date: '29 Jul', unread: true, starred: true, attachment: 'Q3-board-deck.pdf', cat: 'primary' },
  { id: 10, sender: 'harsha', subject: '[onesaz-code/erp-ui] Run failed: CI/CD — Build and Deploy', snippet: 'Attempt #2 - release (ddeb086). CI/CD — Build and Deploy (erp-ui) workflow run.', body: '[onesaz-code/erp-ui] Run failed: CI/CD — Build and Deploy (erp-ui), Attempt #2 - release (ddeb086).', date: '28 Jul', unread: false, starred: false, cat: 'primary' },
  { id: 11, sender: 'harsha', subject: '[onesaz-code/erp-ui] Run failed: CI/CD — Build and Deploy', snippet: 'release (ddeb086). CI/CD — Build and Deploy (erp-ui) workflow run.', body: '[onesaz-code/erp-ui] Run failed: CI/CD — Build and Deploy (erp-ui) - release (ddeb086).', date: '28 Jul', unread: false, starred: false, cat: 'primary' },
  { id: 12, sender: 'Notion Team', subject: '4 quick wins for your workspace', snippet: 'Set up your Notion workspace and workflows the right way.', body: 'Set up your Notion workspace and workflows the right way. Here are four quick wins to get started.', date: '28 Jul', unread: false, starred: false, cat: 'promotions' },
  { id: 13, sender: 'harsha', subject: '[onesaz-code/onesaz] Run failed: CI/CD — Build and Deploy', snippet: 'release (3a8af7e). CI/CD — Build and Deploy (onesaz) workflow run.', body: '[onesaz-code/onesaz] Run failed: CI/CD — Build and Deploy (onesaz) - release (3a8af7e).', date: '28 Jul', unread: false, starred: false, cat: 'primary' },
  { id: 14, sender: 'MongoDB Cloud', subject: 'Acad Hub edu tech private limited - Invoice Charge Successful', snippet: 'ORGANIZATION Acad Hub edu tech private limited. Your latest bill for the MongoDB Atlas.', body: 'Greetings from MongoDB,\n\nYour latest bill for the MongoDB Atlas organization Acad Hub edu tech private limited was charged successfully.', date: '28 Jul', unread: false, starred: false, attachment: 'MongoDB-Atlas-invoice.pdf', cat: 'primary' },
  { id: 15, sender: 'Canva', subject: 'Your business 🎉 wedding season', snippet: 'Canva Print Shop helps you stand out this season.', body: 'Canva Print Shop helps you stand out this wedding season with ready-to-print templates.', date: '28 Jul', unread: false, starred: false, cat: 'promotions' },
  { id: 16, sender: 'Anita Desai', subject: 'Re: Offsite logistics + dinner reservation', snippet: 'Booked the table for 14 at 7:30. Let me know if anyone has dietary restrictions.', body: 'Booked the table for 14 at 7:30. Let me know if anyone has dietary restrictions and I will update the reservation.', date: '27 Jul', unread: false, starred: false, cat: 'primary' },
  { id: 17, sender: 'Stripe', subject: 'Your July payout is on the way', snippet: 'A payout of ₹4,82,190.00 is expected to arrive in your bank account by Aug 2.', body: 'A payout of ₹4,82,190.00 is expected to arrive in your bank account by Aug 2. View the breakdown in your dashboard.', date: '27 Jul', unread: false, starred: true, cat: 'primary' },
  { id: 18, sender: 'mongodb-atlas', subject: 'Your weekly query performance report: Project 0', snippet: "Review the top query shapes impacting your cluster's performance.", body: "Review the top query shapes impacting your cluster's performance. Query Shape Performance Report — Organization Acad Hub.", date: '27 Jul', unread: false, starred: false, cat: 'primary' },
  { id: 19, sender: 'Rahul Menon', subject: 'ARR reconciliation — numbers attached', snippet: 'Priya, checked slide 5. The ARR should be ₹18.4Cr not ₹17.9Cr — finance updated.', body: 'Priya, checked slide 5. The ARR should be ₹18.4Cr not ₹17.9Cr — finance updated the model this morning.', date: '26 Jul', unread: false, starred: false, attachment: 'ARR-recon.xlsx', cat: 'primary' },
  { id: 20, sender: 'LinkedIn', subject: 'You appeared in 9 searches this week', snippet: 'See who’s been looking at your profile and grow your network.', body: 'You appeared in 9 searches this week. See who’s been looking at your profile and grow your network.', date: '26 Jul', unread: false, starred: false, cat: 'social' },
  { id: 21, sender: 'Figma', subject: 'Kiran commented on "Email client — 3 pane"', snippet: 'Can we make the unread weight a touch heavier? The list scans a bit flat right now.', body: '"Can we make the unread weight a touch heavier? The list scans a bit flat right now." — Kiran', date: '26 Jul', unread: false, starred: false, cat: 'social' },
  { id: 22, sender: 'Deepa Rao', subject: 'Candidate feedback — Senior FE loop', snippet: 'Strong on systems design, wants to see more depth on accessibility. My notes below.', body: 'Strong on systems design, wants to see more depth on accessibility. My notes below — happy to debrief tomorrow.', date: '25 Jul', unread: false, starred: false, cat: 'primary' },
  { id: 23, sender: 'Vercel', subject: 'Deployment ready: onesaz-ui-storybook', snippet: 'Your deployment for onesaz-ui-storybook is ready. Preview it now.', body: 'Your deployment for onesaz-ui-storybook is ready. Preview it now at the assigned URL.', date: '25 Jul', unread: false, starred: false, cat: 'primary' },
  { id: 24, sender: 'Slack', subject: 'You have 12 unread messages in #design-system', snippet: 'Catch up on the conversation in #design-system and 3 other channels.', body: 'Catch up on the conversation in #design-system and 3 other channels.', date: '24 Jul', unread: false, starred: false, cat: 'social' },
  { id: 25, sender: 'Aarav Sharma', subject: 'Fees receipt for Term 2', snippet: 'Attaching the receipt for the Term 2 fee payment. Please confirm receipt.', body: 'Attaching the receipt for the Term 2 fee payment. Please confirm receipt at your convenience.', date: '24 Jul', unread: false, starred: false, attachment: 'receipt-t2.pdf', cat: 'primary' },
  { id: 26, sender: 'Amazon', subject: 'Your order has shipped', snippet: 'Arriving tomorrow: USB-C hub and mechanical keyboard.', body: 'Arriving tomorrow: USB-C hub and mechanical keyboard. Track your package in the app.', date: '23 Jul', unread: false, starred: false, cat: 'promotions' },
  { id: 27, sender: 'Meera Iyer', subject: 'Design review moved to 3pm', snippet: 'Heads up — pushed the design review to 3pm to avoid the standup clash.', body: 'Heads up — pushed the design review to 3pm to avoid the standup clash. Calendar updated.', date: '23 Jul', unread: false, starred: false, cat: 'primary' },
  { id: 28, sender: 'Atlassian', subject: 'Weekly digest: 6 issues assigned to you', snippet: '3 in progress, 2 in review, 1 blocked. Jump back into your board.', body: '3 in progress, 2 in review, 1 blocked. Jump back into your board.', date: '22 Jul', unread: false, starred: false, cat: 'primary' },
  { id: 29, sender: 'Kabir Singh', subject: 'Re: API contract for reporting service', snippet: 'Left comments on the schema. The pagination cursor should be opaque.', body: 'Left comments on the schema. The pagination cursor should be opaque — we can bikeshed the field name later.', date: '22 Jul', unread: false, starred: false, cat: 'primary' },
  { id: 30, sender: 'Zoom', subject: 'Your meeting recording is ready', snippet: 'The recording for "Sprint planning" is ready to view and share.', body: 'The recording for "Sprint planning" is ready to view and share.', date: '21 Jul', unread: false, starred: false, cat: 'primary' },
  { id: 31, sender: 'Spotify', subject: 'Your 2026 Wrapped is almost here', snippet: 'Get ready to look back on the year in music.', body: 'Get ready to look back on the year in music. Your 2026 Wrapped is almost here.', date: '21 Jul', unread: false, starred: false, cat: 'promotions' },
  { id: 32, sender: 'Ananya Rao', subject: 'Lunch on Friday?', snippet: 'Team’s thinking of trying the new place near the office. You in?', body: 'Team’s thinking of trying the new place near the office. You in? Around 1pm.', date: '20 Jul', unread: false, starred: false, cat: 'social' },
]

const EMAILS: Mail[] = RAW.map((m, i) => ({ ...m, ts: RAW.length - i }))

const CATS: { key: Cat; label: string; icon: React.ReactNode }[] = [
  { key: 'primary', label: 'Primary', icon: <InboxIcon /> },
  { key: 'promotions', label: 'Promotions', icon: <LabelIcon /> },
  { key: 'social', label: 'Social', icon: <MailOpenIcon /> },
]

/* -------------------------------------------------------------------------- */
/* App                                                                        */
/* -------------------------------------------------------------------------- */
function GmailApp() {
  const [emails, setEmails] = React.useState<Mail[]>(EMAILS)
  const [folder, setFolder] = React.useState<'inbox' | 'starred' | 'snoozed' | 'sent' | 'drafts'>('inbox')
  const [cat, setCat] = React.useState<Cat>('primary')
  const [query, setQuery] = React.useState('')
  const [sel, setSel] = React.useState<Set<number>>(new Set())
  const [openId, setOpenId] = React.useState<number | null>(null)
  const [navOpen, setNavOpen] = React.useState(false)
  const [compose, setCompose] = React.useState(false)

  const unreadCount = emails.filter((e) => e.unread).length
  const starredCount = emails.filter((e) => e.starred).length

  const visible = React.useMemo(() => {
    let list = emails
    if (folder === 'starred') list = list.filter((e) => e.starred)
    else if (folder === 'inbox') list = list.filter((e) => e.cat === cat)
    else list = [] // sent/drafts/snoozed empty in this demo
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter((e) => (e.sender + e.subject + e.snippet).toLowerCase().includes(q))
    }
    return list
  }, [emails, folder, cat, query])

  const patch = (ids: number[], fn: (m: Mail) => Partial<Mail>) =>
    setEmails((es) => es.map((e) => (ids.includes(e.id) ? { ...e, ...fn(e) } : e)))
  const remove = (ids: number[]) => setEmails((es) => es.filter((e) => !ids.includes(e.id)))

  const toggleSel = (id: number) =>
    setSel((s) => {
      const n = new Set(s)
      n.has(id) ? n.delete(id) : n.add(id)
      return n
    })
  const allVisibleChecked = visible.length > 0 && visible.every((e) => sel.has(e.id))
  const toggleAll = () =>
    setSel(allVisibleChecked ? new Set() : new Set(visible.map((e) => e.id)))
  const selIds = [...sel]

  const open = (id: number) => {
    patch([id], () => ({ unread: false }))
    setOpenId(id)
  }
  const openMail = emails.find((e) => e.id === openId) || null

  const nav = [
    { key: 'inbox' as const, label: 'Inbox', icon: <InboxIcon />, count: unreadCount },
    { key: 'starred' as const, label: 'Starred', icon: <StarIcon />, count: starredCount },
    { key: 'snoozed' as const, label: 'Snoozed', icon: <ClockIcon /> },
    { key: 'sent' as const, label: 'Sent', icon: <SendIcon /> },
    { key: 'drafts' as const, label: 'Drafts', icon: <DraftIcon />, count: 1 },
  ]

  const Sidebar = (
    <VStack gap={1} py={2} className="w-64 shrink-0" alignItems="stretch">
      <Box px={2} pb={2}>
        <Button startIcon={<PencilIcon />} className="rounded-2xl" onClick={() => setCompose(true)}>
          Compose
        </Button>
      </Box>
      {nav.map((n) => {
        const active = folder === n.key
        return (
          <button
            key={n.key}
            onClick={() => { setFolder(n.key); setNavOpen(false); setOpenId(null) }}
            className={cn(
              'mx-2 flex items-center gap-4 rounded-r-full py-2 pl-4 pr-3 text-sm transition-colors',
              active ? 'bg-accent/15 font-semibold text-accent' : 'text-foreground hover:bg-muted'
            )}
          >
            <span className="[&_svg]:h-5 [&_svg]:w-5 shrink-0">{n.icon}</span>
            <span className="flex-1 text-left">{n.label}</span>
            {n.count ? <span className="text-xs font-semibold">{n.count}</span> : null}
          </button>
        )
      })}
      <Box px={4} pt={3}>
        <Caption color="muted">Labels</Caption>
      </Box>
      {['Work', 'Personal', 'Receipts'].map((l) => (
        <div key={l} className="mx-2 flex items-center gap-4 rounded-r-full py-2 pl-4 pr-3 text-sm text-foreground hover:bg-muted">
          <span className="[&_svg]:h-5 [&_svg]:w-5 shrink-0 text-muted-foreground"><LabelIcon /></span>
          <span className="flex-1">{l}</span>
        </div>
      ))}
    </VStack>
  )

  return (
    <Box h="screen" display="flex" flexDirection="column" overflow="hidden" bg="background">
      {/* Top bar */}
      <HStack px={4} py={2} gap={4} alignItems="center" className="shrink-0 border-b border-border">
        <IconButton aria-label="Menu" variant="ghost" size="sm" className="md:hidden" onClick={() => setNavOpen(true)}>
          <MenuIcon />
        </IconButton>
        <HStack gap={2} alignItems="center" className="shrink-0">
          <span className="text-error-500 [&_svg]:h-7 [&_svg]:w-7"><MailOpenIcon /></span>
          <span className="hidden text-xl font-medium text-foreground sm:block">Mail</span>
        </HStack>
        <Box grow minW={0} className="mx-auto max-w-2xl">
          <Input
            inputSize="md"
            placeholder="Search mail"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            startAdornment={<span className="[&_svg]:h-4 [&_svg]:w-4"><SearchIcon /></span>}
            endAdornment={<span className="[&_svg]:h-4 [&_svg]:w-4 text-muted-foreground"><SlidersIcon /></span>}
            className="rounded-full bg-muted"
          />
        </Box>
        <HStack gap={1} alignItems="center" className="shrink-0">
          <IconButton aria-label="Help" variant="ghost" size="sm" className="hidden sm:inline-flex"><HelpIcon /></IconButton>
          <IconButton aria-label="Settings" variant="ghost" size="sm" className="hidden sm:inline-flex"><SettingsIcon /></IconButton>
          <IconButton aria-label="Apps" variant="ghost" size="sm" className="hidden sm:inline-flex"><AppsIcon /></IconButton>
          <Avatar size="sm" fallback="Harsha Vardhan" className="ml-1" />
        </HStack>
      </HStack>

      {/* Body */}
      <Box display="flex" overflow="hidden" grow>
        {/* Desktop sidebar */}
        <Box className="hidden md:block overflow-y-auto">{Sidebar}</Box>

        {/* Mobile drawer */}
        {navOpen && (
          <>
            <Box position="fixed" inset z={40} className="bg-black/40 md:hidden" onClick={() => setNavOpen(false)} />
            <Box position="fixed" top={0} bottom={0} left={0} z={50} className="bg-card shadow-xl md:hidden overflow-y-auto" onClick={() => setNavOpen(false)}>
              {Sidebar}
            </Box>
          </>
        )}

        {/* Main */}
        <Box grow minW={0} display="flex" flexDirection="column" className="overflow-hidden border-l border-border">
          {openMail ? (
            <ReadingView mail={openMail} onBack={() => setOpenId(null)} onStar={() => patch([openMail.id], (m) => ({ starred: !m.starred }))} onDelete={() => { remove([openMail.id]); setOpenId(null) }} />
          ) : (
            <>
              {/* Toolbar */}
              <HStack px={3} py={2} gap={1} alignItems="center" className="shrink-0 border-b border-border">
                <Box className="pl-1">
                  <Checkbox checked={allVisibleChecked} indeterminate={sel.size > 0 && !allVisibleChecked} onChange={toggleAll} aria-label="Select all" />
                </Box>
                {sel.size === 0 ? (
                  <>
                    <Tooltip content="Refresh"><IconButton aria-label="Refresh" variant="ghost" size="sm"><RefreshIcon /></IconButton></Tooltip>
                    <Tooltip content="More"><IconButton aria-label="More" variant="ghost" size="sm"><MoreIcon /></IconButton></Tooltip>
                    <Box grow />
                    <Caption color="muted" className="hidden sm:block">1–{visible.length} of {emails.length}</Caption>
                    <IconButton aria-label="Newer" variant="ghost" size="sm"><ChevronLeft /></IconButton>
                    <IconButton aria-label="Older" variant="ghost" size="sm"><ChevronRight /></IconButton>
                  </>
                ) : (
                  <>
                    <Tooltip content="Archive"><IconButton aria-label="Archive" variant="ghost" size="sm" onClick={() => { remove(selIds); setSel(new Set()) }}><ArchiveIcon /></IconButton></Tooltip>
                    <Tooltip content="Delete"><IconButton aria-label="Delete" variant="ghost" size="sm" onClick={() => { remove(selIds); setSel(new Set()) }}><TrashIcon /></IconButton></Tooltip>
                    <Tooltip content="Mark as read"><IconButton aria-label="Mark read" variant="ghost" size="sm" onClick={() => { patch(selIds, () => ({ unread: false })); setSel(new Set()) }}><MailOpenIcon /></IconButton></Tooltip>
                    <Tooltip content="Snooze"><IconButton aria-label="Snooze" variant="ghost" size="sm" onClick={() => { remove(selIds); setSel(new Set()) }}><ClockIcon /></IconButton></Tooltip>
                    <Box grow />
                    <Caption color="muted">{sel.size} selected</Caption>
                  </>
                )}
              </HStack>

              {/* Category tabs (inbox only) */}
              {folder === 'inbox' && (
                <HStack className="shrink-0 border-b border-border" alignItems="stretch">
                  {CATS.map((c) => {
                    const active = cat === c.key
                    const n = emails.filter((e) => e.cat === c.key && e.unread).length
                    return (
                      <button
                        key={c.key}
                        onClick={() => { setCat(c.key); setSel(new Set()) }}
                        className={cn(
                          'flex flex-1 items-center gap-3 px-4 py-3 text-sm transition-colors sm:flex-none sm:min-w-[180px]',
                          active ? 'border-b-2 border-accent font-semibold text-accent' : 'text-muted-foreground hover:bg-muted/50'
                        )}
                      >
                        <span className="[&_svg]:h-5 [&_svg]:w-5">{c.icon}</span>
                        <span>{c.label}</span>
                        {n > 0 && <Badge variant="soft" color="info">{n} new</Badge>}
                      </button>
                    )
                  })}
                </HStack>
              )}

              {/* List */}
              <Box grow minH={0} className="overflow-y-auto overflow-x-hidden">
                {visible.length === 0 ? (
                  <Box py={16} className="text-center">
                    <Caption color="muted">Nothing here.</Caption>
                  </Box>
                ) : (
                  visible.map((m) => (
                    <div
                      key={m.id}
                      onClick={() => open(m.id)}
                      className={cn(
                        'group relative flex h-12 cursor-pointer items-center gap-3 border-b border-border/50 px-4 transition-shadow',
                        sel.has(m.id) ? 'bg-accent/10' : m.unread ? 'bg-background' : 'bg-muted/30',
                        'hover:z-10 hover:shadow-md'
                      )}
                    >
                      <span onClick={(e) => e.stopPropagation()} className="shrink-0">
                        <Checkbox checked={sel.has(m.id)} onChange={() => toggleSel(m.id)} aria-label={`Select ${m.subject}`} />
                      </span>
                      <button
                        onClick={(e) => { e.stopPropagation(); patch([m.id], (x) => ({ starred: !x.starred })) }}
                        aria-label={m.starred ? 'Unstar' : 'Star'}
                        className={cn('shrink-0 [&_svg]:h-[18px] [&_svg]:w-[18px]', m.starred ? 'text-amber-400' : 'text-muted-foreground/60 hover:text-foreground')}
                      >
                        <StarIcon filled={m.starred} />
                      </button>
                      <span className={cn('w-40 shrink-0 truncate text-sm sm:w-48', m.unread ? 'font-semibold text-foreground' : 'text-muted-foreground')}>
                        {m.sender}
                      </span>
                      <span className="min-w-0 flex-1 truncate text-sm">
                        <span className={m.unread ? 'font-semibold text-foreground' : 'text-foreground'}>{m.subject}</span>
                        <span className="text-muted-foreground"> — {m.snippet}</span>
                      </span>
                      {m.attachment && <span className="shrink-0 text-muted-foreground [&_svg]:h-4 [&_svg]:w-4"><PaperclipIcon /></span>}
                      {/* date, replaced by actions on hover */}
                      <span className={cn('w-16 shrink-0 text-right text-xs group-hover:hidden', m.unread ? 'font-semibold text-foreground' : 'text-muted-foreground')}>
                        {m.date}
                      </span>
                      <span className="hidden shrink-0 items-center gap-0.5 group-hover:flex" onClick={(e) => e.stopPropagation()}>
                        <Tooltip content="Archive"><IconButton aria-label="Archive" variant="ghost" size="xs" onClick={() => remove([m.id])}><ArchiveIcon /></IconButton></Tooltip>
                        <Tooltip content="Delete"><IconButton aria-label="Delete" variant="ghost" size="xs" onClick={() => remove([m.id])}><TrashIcon /></IconButton></Tooltip>
                        <Tooltip content={m.unread ? 'Mark read' : 'Mark unread'}><IconButton aria-label="Mark read" variant="ghost" size="xs" onClick={() => patch([m.id], (x) => ({ unread: !x.unread }))}><MailOpenIcon /></IconButton></Tooltip>
                        <Tooltip content="Snooze"><IconButton aria-label="Snooze" variant="ghost" size="xs" onClick={() => remove([m.id])}><ClockIcon /></IconButton></Tooltip>
                      </span>
                    </div>
                  ))
                )}
              </Box>
            </>
          )}
        </Box>
      </Box>

      {/* Compose */}
      <Dialog open={compose} onOpenChange={setCompose}>
        <DialogContent size="xl">
          <DialogHeader><DialogTitle>New message</DialogTitle></DialogHeader>
          <VStack gap={0} className="-mx-6 border-y border-border">
            <HStack px={6} py={2} gap={3} alignItems="center" className="border-b border-border">
              <Caption color="muted" className="w-16 shrink-0">To</Caption>
              <Input className="border-0 px-0 focus:ring-0" placeholder="Recipients" />
            </HStack>
            <HStack px={6} py={2} gap={3} alignItems="center">
              <Caption color="muted" className="w-16 shrink-0">Subject</Caption>
              <Input className="border-0 px-0 focus:ring-0" placeholder="Subject" />
            </HStack>
          </VStack>
          <Textarea className="min-h-[200px] resize-none border-0 px-0 focus-visible:ring-0" placeholder="Write your message…" />
          <DialogFooter>
            <Button variant="ghost" onClick={() => setCompose(false)}>Discard</Button>
            <Button startIcon={<SendIcon />} onClick={() => setCompose(false)}>Send</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Box>
  )
}

function ReadingView({ mail, onBack, onStar, onDelete }: { mail: Mail; onBack: () => void; onStar: () => void; onDelete: () => void }) {
  return (
    <>
      <HStack px={3} py={2} gap={1} alignItems="center" className="shrink-0 border-b border-border">
        <Tooltip content="Back"><IconButton aria-label="Back" variant="ghost" size="sm" onClick={onBack}><ArrowLeft /></IconButton></Tooltip>
        <Tooltip content="Archive"><IconButton aria-label="Archive" variant="ghost" size="sm" onClick={onDelete}><ArchiveIcon /></IconButton></Tooltip>
        <Tooltip content="Delete"><IconButton aria-label="Delete" variant="ghost" size="sm" onClick={onDelete}><TrashIcon /></IconButton></Tooltip>
        <Tooltip content="Mark unread"><IconButton aria-label="Mark unread" variant="ghost" size="sm" onClick={onBack}><MailOpenIcon /></IconButton></Tooltip>
      </HStack>
      <Box grow minH={0} className="overflow-y-auto">
        <Box className="mx-auto max-w-3xl" px={6} py={5}>
          <HStack justifyContent="between" alignItems="start" gap={3}>
            <h1 className="text-2xl font-normal text-foreground">{mail.subject}</h1>
            <button onClick={onStar} className={cn('shrink-0 [&_svg]:h-5 [&_svg]:w-5', mail.starred ? 'text-amber-400' : 'text-muted-foreground')}>
              <StarIcon filled={mail.starred} />
            </button>
          </HStack>
          <HStack gap={3} alignItems="center" className="mt-5">
            <Avatar size="md" fallback={mail.sender} />
            <Box minW={0} grow>
              <HStack gap={2} alignItems="baseline">
                <span className="font-semibold text-foreground">{mail.sender}</span>
                <span className="truncate text-xs text-muted-foreground">to me</span>
              </HStack>
              <div className="text-xs text-muted-foreground">{mail.date}</div>
            </Box>
          </HStack>
          <div className="mt-6 whitespace-pre-line text-sm leading-relaxed text-foreground">{mail.body}</div>
          {mail.attachment && (
            <HStack gap={2} alignItems="center" p={3} className="mt-6 w-fit rounded-lg border border-border">
              <span className="text-muted-foreground [&_svg]:h-5 [&_svg]:w-5"><PaperclipIcon /></span>
              <span className="text-sm text-foreground">{mail.attachment}</span>
            </HStack>
          )}
          <HStack gap={2} className="mt-8">
            <Button variant="outlined" startIcon={<ReplyIcon />}>Reply</Button>
            <Button variant="outlined">Forward</Button>
          </HStack>
        </Box>
      </Box>
    </>
  )
}

export const Default: Story = { render: () => <GmailApp /> }
