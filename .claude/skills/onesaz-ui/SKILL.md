---
name: onesaz-ui
description: Build UIs with the @onesaz/ui React component library — layouts, forms, tables, dashboards, app shells, theming. Use whenever code imports from '@onesaz/ui', when adding/using components (Button, Card, DataGrid, Stack, Grid, Stat, ToggleGroup, SelectField, …), or when building screens in a repo that depends on @onesaz/ui. Encodes the correct prop APIs so you don't guess.
---

# Using @onesaz/ui

A React + Tailwind component library with 12-step colour scales, scoped theming (Radix under the hood), and MUI-compatible `DataGrid`. **The generated, always-accurate prop reference is [`docs/COMPONENT-API.md`](../../docs/COMPONENT-API.md)** — regenerate with `npm run generate:api --workspace=@onesaz/ui`. This skill is the practical layer: correct APIs, patterns, and the gotchas that actually bite.

## Setup
Wrap the app in `ThemeProvider` and import the stylesheet once.
```tsx
import { ThemeProvider } from '@onesaz/ui'
import '@onesaz/ui/styles.css' // + '@onesaz/tailwind-config/v4.css' in your Tailwind entry
<ThemeProvider defaultTheme="system" accentColor="violet" grayColor="slate" radius="medium">…</ThemeProvider>
```

## Layout primitives — prefer these props over `className`
`Box`, `Stack`/`HStack`/`VStack`, `Grid`, `Container` all take structured props. Reach for `className` only when nothing fits.

- **Box** — `p/px/py/pt/pr/pb/pl`, `gap`, `justifyContent`, `alignItems`, `flexDirection`, `display`, `bg`, `rounded`, `shadow`, `border`, `w/h` (keywords) or `width/height` (numeric px), `grow`, `shrink={false}` (→ shrink-0), `minH`/`minW` (`0`/'full'/'screen'), `position`, `inset`, `top/right/bottom/left`, `z`, `overflow`.
- **Stack / HStack / VStack** — `gap`, `justifyContent`, `alignItems`, `p/px/py`, `flexWrap`, `grow`, `minH/minW`, `divider`. (Legacy `spacing`/`justify`/`align` also work.)
- **Grid** — just works as a container: `<Grid gap={4} columns={4}>` or responsive `columns={{ default: 1, md: 2, lg: 4 }}`. (MUI style `container`/`item` + `xs`/`spacing` also supported.)
- **Container** — `<Container maxWidth="lg">` centres + caps width (sm/md/lg/xl/2xl/full).

**Fill-height scrolling panes** (app shells): a growing pane that scrolls needs `grow` **and** `minH={0}`:
```tsx
<Box grow minH={0} overflow="auto">{list}</Box>
```

## Correct prop values (these are the ones that get guessed wrong)
- **Button** `variant`: `contained | outlined | secondary | ghost | link | destructive` (NOT `default`/`outline`). `color`: `default | accent | success | warning | error | destructive`. Also `size`, `fullWidth`, `loading`, `startIcon`, `endIcon`. Icons are auto-sized — pass a raw `<svg>`; don't size it yourself.
- **IconButton** — icon-only; `size` `xs|sm|md|lg`; child svg auto-sized. Requires `aria-label`.
- **Badge** — status colour is on **`color`** (`success|warning|error|info|destructive|normal|archived|default`), not `variant`. `variant`: `contained|outlined|soft|text`.
- **Chip** — `variant` `contained|outlined`, `color`, `size` `small|medium`.
- **Alert** — `variant` `default|success|warning|error` (no `info`/`destructive`). `onClose`, `icon`.
- **CardTitle** — `size` `sm|md|lg` (default `lg`=2xl). Use `sm`/`md` for section headers.
- **Table** — `TableCell`/`TableHead` take `align="left|center|right"` (right for numeric). `tabular-nums` is built in.

## Components you should use instead of hand-rolling
- **Stat** — KPI tile: `<Stat label value delta trend="up" sentiment="negative" icon />`. `sentiment` decouples colour from arrow (red up-arrow for a rising error rate).
- **ToggleGroup** — segmented single-select: `<ToggleGroup value onValueChange options={[{value,label,icon}]} />` (List/Board, Buy/Sell, time-range).
- **NavItem** — sidebar/list row: `<NavItem icon active endAdornment={count} href?>Label</NavItem>` (real button/anchor).
- **SelectField** — `Select` + label/helper aligned with `TextField`: `<SelectField label required helperText options value onValueChange />`. Use in forms so selects line up with text fields.
- **ChipInput** — token/recipient field: `<ChipInput value onChange placeholder />` (Enter/comma add, Backspace/× remove).
- **Stepper** — `<Stepper steps={[{label}]} active={1} />`.
- **StatusDot** — `<StatusDot color="success" pulse label />`.
- **EmptyState / ErrorState** — `<EmptyState icon title description action />`, `<ErrorState onRetry />`.
- **DataGrid** — MUI-compatible `columns` (GridColDef) + `rows`. Column `align`, `valueFormatter`, `renderCell`. **Conditional cell colour without renderCell**: `cellClassName: (p) => p.value < 0 ? 'text-error-600' : 'text-success-600'`. Density via `density`; header height is `columnHeaderHeight` (independent of density).

## Recipes
**Responsive app shell** (topbar + sidebar that collapses to a drawer on mobile):
```tsx
<Box h="screen" display="flex" flexDirection="column" overflow="hidden">
  <HStack px={4} py={2} className="shrink-0 border-b border-border">…top bar…
    <IconButton aria-label="Menu" variant="ghost" size="sm" className="lg:hidden" onClick={openNav}><MenuIcon/></IconButton>
  </HStack>
  <Box display="flex" grow overflow="hidden">
    <Box className="hidden lg:block">{sidebar}</Box>
    {navOpen && (<><Box position="fixed" inset z={40} className="bg-black/40 lg:hidden" onClick={closeNav}/>
      <Box position="fixed" top={0} bottom={0} left={0} z={50} className="bg-card shadow-xl lg:hidden">{sidebar}</Box></>)}
    <Box grow minW={0} overflow="auto" p={6}>{content}</Box>
  </Box>
</Box>
```
**KPI row**: `<Grid gap={4} columns={4}>{stats.map(s => <Stat key={s.label} {...s}/>)}</Grid>`
**Dense list** (fits width, no horizontal scroll): rows are `flex` with `min-w-0` + `truncate` on the text — never a `<Table>` for an email-style list.

## Gotchas
- A `<Grid>` with no `columns` defaults to 12 cols. Set `columns` for equal columns.
- For a Select that must align with TextFields in a form row, use **SelectField** (not a raw Select) and set the grid `alignItems="start"`.
- Charts (Recharts wrappers) need on-brand hex; pass palette values (`#6933d3` accent, `#22c55e/#f59e0b/#ef4444/#3b82f6` semantic).
- Numbers in tables: rely on built-in `tabular-nums` + `align="right"`.

## Verify
This repo has a test net (`npm test --workspace=@onesaz/ui`) and drift guards for tokens + generated API docs. When you change a token or a component prop, run `npm run generate:css`/`generate:api` and `npm test`.
