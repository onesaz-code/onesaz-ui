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
  Caption,
  Tooltip,
  Separator,
  ToggleGroup,
  NavItem,
  cn,
} from '@onesaz/ui'

const meta: Meta = {
  title: 'Examples/Issue Tracker',
  parameters: { layout: 'fullscreen' },
}
export default meta
type Story = StoryObj

/* -------------------------------------------------------------------------- */
/* Icons                                                                      */
/* -------------------------------------------------------------------------- */
const I = ({ children, fill = 'none' }: { children: React.ReactNode; fill?: string }) => (
  <svg viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{children}</svg>
)
const MenuIcon = () => <I><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></I>
const SearchIcon = () => <I><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></I>
const PlusIcon = () => <I><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></I>
const FilterIcon = () => <I><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></I>
const SortIcon = () => <I><path d="M11 5h10" /><path d="M11 9h7" /><path d="M11 13h4" /><path d="m3 17 3 3 3-3" /><path d="M6 18V4" /></I>
const ListIcon = () => <I><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></I>
const BoardIcon = () => <I><rect x="3" y="3" width="6" height="18" rx="1" /><rect x="10" y="3" width="6" height="12" rx="1" /><rect x="17" y="3" width="4" height="8" rx="1" /></I>
const MoreIcon = () => <I><circle cx="12" cy="5" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="12" cy="19" r="1" /></I>
const ChevronDown = () => <I><polyline points="6 9 12 15 18 9" /></I>
const ChevronRight = () => <I><polyline points="9 18 15 12 9 6" /></I>
const CloseIcon = () => <I><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></I>
const InboxIcon = () => <I><polyline points="22 12 16 12 14 15 10 15 8 12 2 12" /><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" /></I>
const MyIcon = () => <I><circle cx="12" cy="8" r="4" /><path d="M4 20a8 8 0 0 1 16 0" /></I>
const CommentIcon = () => <I><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></I>

/* Status glyphs (Linear-style small circles) */
type Status = 'backlog' | 'todo' | 'in_progress' | 'in_review' | 'done' | 'canceled'
const StatusIcon = ({ s, size = 14 }: { s: Status; size?: number }) => {
  const c = STATUS[s].color
  const common = { width: size, height: size, viewBox: '0 0 16 16' } as const
  if (s === 'backlog') return <svg {...common}><circle cx="8" cy="8" r="6.5" fill="none" stroke={c} strokeWidth="1.5" strokeDasharray="2 2" /></svg>
  if (s === 'todo') return <svg {...common}><circle cx="8" cy="8" r="6.5" fill="none" stroke={c} strokeWidth="1.5" /></svg>
  if (s === 'in_progress') return <svg {...common}><circle cx="8" cy="8" r="6.5" fill="none" stroke={c} strokeWidth="1.5" /><path d="M8 8 V1.5 A6.5 6.5 0 0 1 14.5 8 Z" fill={c} /></svg>
  if (s === 'in_review') return <svg {...common}><circle cx="8" cy="8" r="6.5" fill="none" stroke={c} strokeWidth="1.5" /><path d="M8 8 V1.5 A6.5 6.5 0 0 1 8 14.5 Z" fill={c} /></svg>
  if (s === 'done') return <svg {...common}><circle cx="8" cy="8" r="7" fill={c} /><path d="M4.5 8.2 7 10.5 11.5 5.5" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
  return <svg {...common}><circle cx="8" cy="8" r="7" fill={c} /><path d="M5.5 5.5 10.5 10.5 M10.5 5.5 5.5 10.5" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" /></svg>
}

/* Priority glyphs */
type Priority = 0 | 1 | 2 | 3 | 4 // none, low, medium, high, urgent
const PriorityIcon = ({ p }: { p: Priority }) => {
  if (p === 0) return <svg width="14" height="14" viewBox="0 0 16 16"><g fill="#9ca3af">{[3, 7, 11].map((x) => <rect key={x} x={x} y="7" width="2" height="2" rx="0.5" />)}</g></svg>
  if (p === 4) return <svg width="14" height="14" viewBox="0 0 16 16"><rect x="2" y="2" width="12" height="12" rx="2.5" fill="#f59e0b" /><rect x="7" y="4" width="2" height="5" rx="1" fill="#fff" /><rect x="7" y="10.5" width="2" height="2" rx="1" fill="#fff" /></svg>
  const bars = [{ h: 4, on: p >= 1 }, { h: 7, on: p >= 2 }, { h: 10, on: p >= 3 }]
  return (
    <svg width="14" height="14" viewBox="0 0 16 16">
      {bars.map((b, i) => <rect key={i} x={2 + i * 5} y={14 - b.h} width="3" height={b.h} rx="1" fill={b.on ? '#4b5563' : '#d1d5db'} />)}
    </svg>
  )
}

/* -------------------------------------------------------------------------- */
/* Domain                                                                     */
/* -------------------------------------------------------------------------- */
const STATUS: Record<Status, { label: string; color: string; order: number }> = {
  backlog: { label: 'Backlog', color: '#9ca3af', order: 0 },
  todo: { label: 'Todo', color: '#6b7280', order: 1 },
  in_progress: { label: 'In Progress', color: '#f59e0b', order: 2 },
  in_review: { label: 'In Review', color: '#6933d3', order: 3 },
  done: { label: 'Done', color: '#22c55e', order: 4 },
  canceled: { label: 'Canceled', color: '#9ca3af', order: 5 },
}
const STATUS_ORDER: Status[] = ['in_progress', 'todo', 'in_review', 'backlog', 'done', 'canceled']
const PRIORITY_LABEL: Record<Priority, string> = { 0: 'No priority', 1: 'Low', 2: 'Medium', 3: 'High', 4: 'Urgent' }

type Person = { name: string; initials: string; color: string }
const PEOPLE: Person[] = [
  { name: 'Aarav Sharma', initials: 'AS', color: '#6933d3' },
  { name: 'Diya Menon', initials: 'DM', color: '#0ea5e9' },
  { name: 'Kabir Singh', initials: 'KS', color: '#16a34a' },
  { name: 'Meera Iyer', initials: 'MI', color: '#db2777' },
  { name: 'Rahul Menon', initials: 'RM', color: '#ea580c' },
  { name: 'Ananya Rao', initials: 'AR', color: '#0891b2' },
]
const LABELS: Record<string, string> = {
  bug: '#ef4444', feature: '#6933d3', design: '#db2777', infra: '#0891b2',
  a11y: '#16a34a', perf: '#f59e0b', docs: '#6b7280',
}

type Issue = {
  id: number
  key: string
  title: string
  status: Status
  priority: Priority
  assignee: Person | null
  labels: string[]
  project: string
  updated: string
  comments: number
}

const TITLES: [string, Status, Priority, string[], string, number][] = [
  ['DataGrid header height should be independent of density', 'in_progress', 3, ['bug'], 'Design System', 4],
  ['Charts render blank — animation stuck at 0', 'done', 4, ['bug'], 'Design System', 9],
  ['Grid primitive silently no-ops without `container`', 'done', 3, ['bug'], 'Design System', 2],
  ['Add Stepper / Wizard component', 'todo', 2, ['feature'], 'Design System', 1],
  ['SelectField: label + helper wrapper to match TextField', 'in_review', 2, ['feature'], 'Design System', 3],
  ['Icon sizing: Button/IconButton must constrain child SVG', 'done', 3, ['bug', 'a11y'], 'Design System', 0],
  ['RecipientChips input for the compose "To" field', 'in_progress', 2, ['feature'], 'Mail', 5],
  ['Email list horizontal scroll — convert table to list', 'done', 3, ['bug'], 'Mail', 2],
  ['Mobile: 3-pane shell must collapse to hamburger', 'in_progress', 3, ['bug'], 'Mail', 6],
  ['Command palette (⌘K) for quick navigation', 'backlog', 1, ['feature'], 'Platform', 0],
  ['Virtualize the issue list for 10k+ rows', 'backlog', 2, ['perf'], 'Platform', 1],
  ['Bulk actions bar on multi-select', 'todo', 2, ['feature'], 'Platform', 0],
  ['Keyboard shortcuts: j/k navigation, x to select', 'backlog', 1, ['a11y'], 'Platform', 2],
  ['Optimistic updates for status changes', 'todo', 2, ['feature'], 'Platform', 1],
  ['Dark mode contrast audit for badges', 'in_review', 2, ['a11y', 'design'], 'Design System', 4],
  ['Token pipeline: generate CSS from TS to stop drift', 'todo', 3, ['infra'], 'Design System', 3],
  ['AppShell component (topbar + sidebar + scroll)', 'todo', 2, ['feature'], 'Platform', 2],
  ['Sparkline component for dense metric tiles', 'backlog', 1, ['feature'], 'Design System', 0],
  ['Status dot / indicator primitive', 'todo', 1, ['feature'], 'Design System', 1],
  ['Mono / tabular Typography variant', 'todo', 2, ['feature'], 'Design System', 2],
  ['Drag-and-drop between board columns', 'backlog', 2, ['feature'], 'Platform', 0],
  ['Snackbar with undo for destructive actions', 'todo', 2, ['feature'], 'Platform', 1],
  ['Fix flexWrap prop leaking to the DOM', 'done', 1, ['bug'], 'Design System', 0],
  ['Segmented / ToggleGroup control with selection', 'todo', 2, ['feature'], 'Design System', 3],
  ['AspectRatio + Card media slot for streaming grid', 'backlog', 1, ['feature'], 'Design System', 0],
  ['Reduce z-index from 99999 to a proper scale', 'done', 2, ['infra'], 'Design System', 1],
  ['CI: build + typecheck on every PR', 'canceled', 1, ['infra'], 'Platform', 2],
  ['Empty & error states for every data view', 'in_progress', 2, ['feature'], 'Platform', 3],
  ['Chart panel: compact preset (height + margins)', 'todo', 1, ['feature'], 'Design System', 0],
  ['Facet filter list component for log explorer', 'backlog', 1, ['feature'], 'Platform', 0],
  ['Right-align + tabular-nums on numeric table columns', 'done', 2, ['bug'], 'Design System', 1],
  ['Responsive audit: verify every example at 375px', 'in_progress', 3, ['a11y'], 'Platform', 5],
]

const ISSUES: Issue[] = TITLES.map(([title, status, priority, labels, project, comments], i) => ({
  id: i + 1,
  key: `${project === 'Mail' ? 'MAIL' : project === 'Platform' ? 'PLT' : 'DS'}-${100 + i}`,
  title,
  status,
  priority,
  labels,
  project,
  assignee: i % 5 === 4 ? null : PEOPLE[i % PEOPLE.length],
  updated: ['1h', '2h', '4h', '1d', '2d', '3d', '5d', '1w'][i % 8],
  comments,
}))

/* -------------------------------------------------------------------------- */
/* App                                                                        */
/* -------------------------------------------------------------------------- */
function IssueApp() {
  const [issues, setIssues] = React.useState<Issue[]>(ISSUES)
  const [view, setView] = React.useState<'list' | 'board'>('list')
  const [query, setQuery] = React.useState('')
  const [statusFilter, setStatusFilter] = React.useState<Status | 'all'>('all')
  const [sortByPriority, setSortByPriority] = React.useState(false)
  const [sel, setSel] = React.useState<Set<number>>(new Set())
  const [openId, setOpenId] = React.useState<number | null>(null)
  const [collapsed, setCollapsed] = React.useState<Set<Status>>(new Set(['done', 'canceled']))
  const [navOpen, setNavOpen] = React.useState(false)

  const filtered = React.useMemo(() => {
    let l = issues
    if (statusFilter !== 'all') l = l.filter((i) => i.status === statusFilter)
    if (query.trim()) {
      const q = query.toLowerCase()
      l = l.filter((i) => (i.key + i.title + i.project + i.labels.join(' ')).toLowerCase().includes(q))
    }
    if (sortByPriority) l = [...l].sort((a, b) => b.priority - a.priority)
    return l
  }, [issues, statusFilter, query, sortByPriority])

  const grouped = React.useMemo(() => {
    const g: Record<Status, Issue[]> = { backlog: [], todo: [], in_progress: [], in_review: [], done: [], canceled: [] }
    filtered.forEach((i) => g[i.status].push(i))
    return g
  }, [filtered])

  const patch = (ids: number[], p: Partial<Issue>) =>
    setIssues((is) => is.map((i) => (ids.includes(i.id) ? { ...i, ...p } : i)))
  const toggleSel = (id: number) =>
    setSel((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n })
  const toggleCollapse = (s: Status) =>
    setCollapsed((c) => { const n = new Set(c); n.has(s) ? n.delete(s) : n.add(s); return n })

  const openIssue = issues.find((i) => i.id === openId) || null
  const activeCount = issues.filter((i) => i.status === 'in_progress' || i.status === 'todo').length

  const Sidebar = (
    <VStack gap={1} p={3} className="w-60 shrink-0" alignItems="stretch">
      <HStack gap={2} alignItems="center" px={2} py={1}>
        <span className="flex h-6 w-6 items-center justify-center rounded bg-accent text-xs font-bold text-white">O</span>
        <span className="font-semibold text-foreground">Onesaz</span>
        <Box grow />
        <IconButton aria-label="New issue" variant="ghost" size="xs"><PlusIcon /></IconButton>
      </HStack>
      <Box py={1} />
      {[
        { icon: <InboxIcon />, label: 'Inbox', count: 3 },
        { icon: <MyIcon />, label: 'My issues', count: activeCount },
      ].map((n) => (
        <NavItem key={n.label} icon={n.icon} endAdornment={n.count}>{n.label}</NavItem>
      ))}
      <Box px={2} pt={3}><Caption color="muted">Your teams</Caption></Box>
      {['Design System', 'Platform', 'Mail'].map((t, i) => (
        <NavItem
          key={t}
          active={i === 0}
          icon={<span className="h-2 w-2 rounded-sm" style={{ background: ['#6933d3', '#0891b2', '#db2777'][i] }} />}
          endAdornment={issues.filter((x) => x.project === t).length}
        >
          {t}
        </NavItem>
      ))}
    </VStack>
  )

  const selIds = [...sel]

  return (
    <Box h="screen" display="flex" flexDirection="column" overflow="hidden" bg="background">
      <Box display="flex" overflow="hidden" grow>
        {/* Sidebar */}
        <Box className="hidden lg:block overflow-y-auto border-r border-border">{Sidebar}</Box>
        {navOpen && (
          <>
            <Box position="fixed" inset z={40} className="bg-black/40 lg:hidden" onClick={() => setNavOpen(false)} />
            <Box position="fixed" top={0} bottom={0} left={0} z={50} className="bg-card shadow-xl lg:hidden overflow-y-auto" onClick={() => setNavOpen(false)}>{Sidebar}</Box>
          </>
        )}

        {/* Main */}
        <Box grow minW={0} display="flex" flexDirection="column" overflow="hidden">
          {/* Header */}
          <HStack px={4} py={3} gap={3} alignItems="center" className="shrink-0 border-b border-border">
            <IconButton aria-label="Menu" variant="ghost" size="sm" className="lg:hidden" onClick={() => setNavOpen(true)}><MenuIcon /></IconButton>
            <span className="h-2.5 w-2.5 rounded-sm bg-accent" />
            <span className="font-semibold text-foreground">Design System</span>
            <Badge variant="soft" color="normal">{filtered.length}</Badge>
            <Box grow />
            <ToggleGroup
              size="sm"
              value={view}
              onValueChange={(v) => setView(v as 'list' | 'board')}
              options={[
                { value: 'list', label: 'List', icon: <ListIcon /> },
                { value: 'board', label: 'Board', icon: <BoardIcon /> },
              ]}
            />
            <Avatar size="sm" fallback="Harsha Vardhan" />
          </HStack>

          {/* Toolbar */}
          <HStack px={4} py={2} gap={2} alignItems="center" className="shrink-0 border-b border-border">
            <Box className="relative w-56 max-w-[40vw]">
              <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground [&_svg]:h-4 [&_svg]:w-4"><SearchIcon /></span>
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search issues…" className="h-8 w-full rounded-md border border-border bg-background pl-8 pr-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
            </Box>
            {/* Status filter */}
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as Status | 'all')} className="h-8 rounded-md border border-border bg-background px-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring">
              <option value="all">All statuses</option>
              {STATUS_ORDER.map((s) => <option key={s} value={s}>{STATUS[s].label}</option>)}
            </select>
            <Button variant={sortByPriority ? 'secondary' : 'ghost'} size="sm" startIcon={<SortIcon />} onClick={() => setSortByPriority((v) => !v)}>
              {sortByPriority ? 'Priority' : 'Sort'}
            </Button>
            <Box grow />
            <Button size="sm" startIcon={<PlusIcon />}>New issue</Button>
          </HStack>

          {/* Bulk bar */}
          {sel.size > 0 && (
            <HStack px={4} py={2} gap={2} alignItems="center" className="shrink-0 border-b border-border bg-accent/5">
              <Caption className="font-medium">{sel.size} selected</Caption>
              <Separator orientation="vertical" className="h-4" />
              <Button variant="ghost" size="sm" onClick={() => { patch(selIds, { status: 'done' }); setSel(new Set()) }}>Mark done</Button>
              <Button variant="ghost" size="sm" onClick={() => { patch(selIds, { status: 'in_progress' }); setSel(new Set()) }}>Start</Button>
              <Button variant="ghost" size="sm" onClick={() => { setIssues((is) => is.filter((i) => !sel.has(i.id))); setSel(new Set()) }}>Delete</Button>
              <Box grow />
              <Button variant="ghost" size="sm" onClick={() => setSel(new Set())}>Clear</Button>
            </HStack>
          )}

          {/* Content */}
          {view === 'list' ? (
            <Box grow minH={0} className="overflow-y-auto">
              {STATUS_ORDER.map((s) => {
                const rows = grouped[s]
                if (rows.length === 0) return null
                const isCollapsed = collapsed.has(s)
                return (
                  <div key={s}>
                    <button onClick={() => toggleCollapse(s)} className="flex w-full items-center gap-2 bg-muted/40 px-4 py-1.5 text-left hover:bg-muted/70">
                      <span className="text-muted-foreground [&_svg]:h-3.5 [&_svg]:w-3.5">{isCollapsed ? <ChevronRight /> : <ChevronDown />}</span>
                      <StatusIcon s={s} />
                      <span className="text-sm font-medium text-foreground">{STATUS[s].label}</span>
                      <span className="text-xs text-muted-foreground">{rows.length}</span>
                    </button>
                    {!isCollapsed && rows.map((it) => (
                      <div key={it.id} onClick={() => setOpenId(it.id)}
                        className={cn('group flex h-11 cursor-pointer items-center gap-3 border-b border-border/50 px-4 hover:bg-muted/40', sel.has(it.id) && 'bg-accent/10')}>
                        <span onClick={(e) => e.stopPropagation()} className="shrink-0 opacity-0 group-hover:opacity-100 data-[on=true]:opacity-100" data-on={sel.has(it.id)}>
                          <Checkbox checked={sel.has(it.id)} onChange={() => toggleSel(it.id)} aria-label={`Select ${it.key}`} />
                        </span>
                        <PriorityIcon p={it.priority} />
                        <span className="w-16 shrink-0 font-mono text-xs text-muted-foreground">{it.key}</span>
                        <StatusIcon s={it.status} />
                        <span className="min-w-0 flex-1 truncate text-sm text-foreground">{it.title}</span>
                        <span className="hidden shrink-0 gap-1 sm:flex">
                          {it.labels.map((l) => (
                            <span key={l} className="inline-flex items-center gap-1 rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground">
                              <span className="h-1.5 w-1.5 rounded-full" style={{ background: LABELS[l] }} />{l}
                            </span>
                          ))}
                        </span>
                        {it.comments > 0 && (
                          <span className="hidden shrink-0 items-center gap-1 text-xs text-muted-foreground sm:flex [&_svg]:h-3.5 [&_svg]:w-3.5"><CommentIcon />{it.comments}</span>
                        )}
                        <span className="w-8 shrink-0 text-right text-xs text-muted-foreground">{it.updated}</span>
                        {it.assignee
                          ? <Avatar size="xs" fallback={it.assignee.name} className="shrink-0" style={{ backgroundColor: it.assignee.color, color: '#fff' }} />
                          : <span className="h-5 w-5 shrink-0 rounded-full border border-dashed border-border" />}
                      </div>
                    ))}
                  </div>
                )
              })}
              {filtered.length === 0 && <Box py={16} className="text-center"><Caption color="muted">No issues match your filters.</Caption></Box>}
            </Box>
          ) : (
            <Box grow minH={0} className="overflow-auto">
              <HStack gap={3} p={4} alignItems="start" className="h-full">
                {STATUS_ORDER.filter((s) => s !== 'canceled').map((s) => (
                  <Box key={s} className="w-72 shrink-0">
                    <HStack gap={2} alignItems="center" py={2}>
                      <StatusIcon s={s} />
                      <span className="text-sm font-medium text-foreground">{STATUS[s].label}</span>
                      <span className="text-xs text-muted-foreground">{grouped[s].length}</span>
                      <Box grow />
                      <IconButton aria-label="Add" variant="ghost" size="xs"><PlusIcon /></IconButton>
                    </HStack>
                    <VStack gap={2} alignItems="stretch">
                      {grouped[s].map((it) => (
                        <div key={it.id} onClick={() => setOpenId(it.id)} className="cursor-pointer rounded-lg border border-border bg-card p-3 shadow-sm hover:border-accent/40">
                          <HStack gap={2} alignItems="center" className="mb-2">
                            <span className="font-mono text-xs text-muted-foreground">{it.key}</span>
                            <Box grow />
                            <PriorityIcon p={it.priority} />
                          </HStack>
                          <div className="text-sm text-foreground">{it.title}</div>
                          <HStack gap={1} alignItems="center" flexWrap="wrap" className="mt-2">
                            {it.labels.map((l) => (
                              <span key={l} className="inline-flex items-center gap-1 rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground">
                                <span className="h-1.5 w-1.5 rounded-full" style={{ background: LABELS[l] }} />{l}
                              </span>
                            ))}
                            <Box grow />
                            {it.assignee && <Avatar size="xs" fallback={it.assignee.name} style={{ backgroundColor: it.assignee.color, color: '#fff' }} />}
                          </HStack>
                        </div>
                      ))}
                      {grouped[s].length === 0 && <div className="rounded-lg border border-dashed border-border py-6 text-center text-xs text-muted-foreground">No issues</div>}
                    </VStack>
                  </Box>
                ))}
              </HStack>
            </Box>
          )}
        </Box>

        {/* Detail drawer */}
        {openIssue && (
          <>
            <Box position="fixed" inset z={40} className="bg-black/30 xl:hidden" onClick={() => setOpenId(null)} />
            <Box className="fixed right-0 top-0 z-50 h-full w-full max-w-md xl:static xl:z-auto xl:h-auto xl:w-[380px] xl:max-w-none" bg="card">
              <Box className="h-full overflow-y-auto border-l border-border" display="flex" flexDirection="column">
                <IssueDetail
                  issue={openIssue}
                  onClose={() => setOpenId(null)}
                  onStatus={(st) => patch([openIssue.id], { status: st })}
                  onPriority={(p) => patch([openIssue.id], { priority: p })}
                  onAssignee={(a) => patch([openIssue.id], { assignee: a })}
                />
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Box>
  )
}

function IssueDetail({ issue, onClose, onStatus, onPriority, onAssignee }: {
  issue: Issue
  onClose: () => void
  onStatus: (s: Status) => void
  onPriority: (p: Priority) => void
  onAssignee: (a: Person) => void
}) {
  const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <HStack gap={3} alignItems="center" py={2} justifyContent="between">
      <Caption color="muted" className="w-20 shrink-0">{label}</Caption>
      <Box grow minW={0} className="text-right">{children}</Box>
    </HStack>
  )
  return (
    <>
      <HStack px={4} py={3} gap={2} alignItems="center" className="shrink-0 border-b border-border">
        <span className="font-mono text-xs text-muted-foreground">{issue.key}</span>
        <Box grow />
        <IconButton aria-label="More" variant="ghost" size="sm"><MoreIcon /></IconButton>
        <IconButton aria-label="Close" variant="ghost" size="sm" onClick={onClose}><CloseIcon /></IconButton>
      </HStack>
      <Box grow minH={0} className="overflow-y-auto" px={4} py={4}>
        <h1 className="text-lg font-semibold text-foreground">{issue.title}</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Tracked as part of the {issue.project} project. This drawer is fully editable — change the status, priority, or
          assignee below and the list/board update live.
        </p>

        <Box py={3}><Separator /></Box>

        <Row label="Status">
          <select value={issue.status} onChange={(e) => onStatus(e.target.value as Status)} className="rounded-md border border-border bg-background px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-ring">
            {STATUS_ORDER.map((s) => <option key={s} value={s}>{STATUS[s].label}</option>)}
          </select>
        </Row>
        <Row label="Priority">
          <select value={issue.priority} onChange={(e) => onPriority(Number(e.target.value) as Priority)} className="rounded-md border border-border bg-background px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-ring">
            {[4, 3, 2, 1, 0].map((p) => <option key={p} value={p}>{PRIORITY_LABEL[p as Priority]}</option>)}
          </select>
        </Row>
        <Row label="Assignee">
          <HStack gap={1} justifyContent="end" flexWrap="wrap">
            {PEOPLE.slice(0, 5).map((p) => (
              <button key={p.name} onClick={() => onAssignee(p)} aria-label={p.name}
                className={cn('rounded-full ring-offset-2 ring-offset-card', issue.assignee?.name === p.name && 'ring-2 ring-accent')}>
                <Avatar size="xs" fallback={p.name} style={{ backgroundColor: p.color, color: '#fff' }} />
              </button>
            ))}
          </HStack>
        </Row>
        <Row label="Labels">
          <HStack gap={1} justifyContent="end" flexWrap="wrap">
            {issue.labels.length === 0 && <Caption color="muted">None</Caption>}
            {issue.labels.map((l) => (
              <span key={l} className="inline-flex items-center gap-1 rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: LABELS[l] }} />{l}
              </span>
            ))}
          </HStack>
        </Row>
        <Row label="Project"><span className="text-sm text-foreground">{issue.project}</span></Row>

        <Box py={3}><Separator /></Box>
        <Caption color="muted">Activity</Caption>
        <VStack gap={3} alignItems="stretch" className="mt-3">
          {[
            [issue.assignee?.name || 'Someone', 'changed status to ' + STATUS[issue.status].label, issue.updated + ' ago'],
            ['Meera Iyer', 'added the label', '2d ago'],
            ['Aarav Sharma', 'created the issue', '4d ago'],
          ].map(([who, what, when], i) => (
            <HStack key={i} gap={2} alignItems="start">
              <Avatar size="xs" fallback={who as string} />
              <Box grow minW={0}>
                <div className="text-sm text-foreground"><span className="font-medium">{who}</span> <span className="text-muted-foreground">{what}</span></div>
                <div className="text-xs text-muted-foreground">{when}</div>
              </Box>
            </HStack>
          ))}
        </VStack>
        <Box pt={4}>
          <input placeholder="Leave a comment…" className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
        </Box>
      </Box>
    </>
  )
}

export const Default: Story = { render: () => <IssueApp /> }
