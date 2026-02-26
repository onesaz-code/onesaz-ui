# Onesaz UI Component Guide

**Version:** 1.0.0  
**Last Updated:** February 16, 2026

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Core Concepts](#core-concepts)
4. [Component Categories](#component-categories)
5. [Component Reference](#component-reference)
6. [Theming & Customization](#theming--customization)
7. [Accessibility](#accessibility)
8. [Best Practices](#best-practices)
9. [Examples & Patterns](#examples--patterns)

---

## Introduction

Onesaz UI is a comprehensive, production-ready React component library designed for building modern web applications. Built on top of Radix UI primitives, it provides accessible, customizable, and well-tested components following industry best practices.

### Key Features

- ✅ **30+ Production-Ready Components** - Covers all common use cases
- ✅ **Full TypeScript Support** - Complete type safety and excellent IntelliSense
- ✅ **Accessible by Default** - Built on Radix UI with WCAG 2.1 AA compliance
- ✅ **Dark Mode** - First-class theme switching support
- ✅ **Tailwind CSS** - Utility-first styling with easy customization
- ✅ **Tree-Shakeable** - Import only what you need
- ✅ **Composable** - Build complex UIs from simple building blocks
- ✅ **Documented** - Comprehensive Storybook documentation

---

## Getting Started

### Installation

```bash
npm install @onesaz/ui @onesaz/tokens @onesaz/tailwind-config
# or
yarn add @onesaz/ui @onesaz/tokens @onesaz/tailwind-config
# or
pnpm add @onesaz/ui @onesaz/tokens @onesaz/tailwind-config
```

### Setup

#### 1. Configure Tailwind CSS

```javascript
// tailwind.config.js
import { onesazTailwindConfig } from '@onesaz/tailwind-config'

export default onesazTailwindConfig
```

#### 2. Import Global Styles

```typescript
// main.tsx or App.tsx
import '@onesaz/ui/styles.css'
```

#### 3. Wrap Your App with ThemeProvider

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from '@onesaz/ui'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="ui-theme">
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
```

### Basic Usage

```tsx
import { Button, Card, CardHeader, CardTitle, CardContent } from '@onesaz/ui'

function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={() => alert('Hello!')}>Click Me</Button>
      </CardContent>
    </Card>
  )
}
```

---

## Core Concepts

### Component Composition

Onesaz UI follows a compositional approach where complex components are built from smaller, simpler ones:

```tsx
// Instead of a monolithic component with many props
<ComplexCard 
  title="Title"
  description="Description"
  content="Content"
  footer="Footer"
/>

// Use composition for flexibility
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>
```

### Variant System

Components use a variant-based styling system:

```tsx
// Button variants
<Button variant="default">Default</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Alert variants
<Alert variant="info">Information</Alert>
<Alert variant="success">Success!</Alert>
<Alert variant="warning">Warning</Alert>
<Alert variant="error">Error</Alert>
```

### Size System

Most components support consistent sizing:

```tsx
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>

<Input size="sm" />
<Input size="default" />
<Input size="lg" />
```

### Theming

All components respect the theme context:

```tsx
import { useTheme } from '@onesaz/ui'

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  
  return (
    <Button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Toggle Theme
    </Button>
  )
}
```

---

## Component Categories

### 1. Layout Components
Components for structuring your UI layout.

- **Box** - Flexible container
- **Stack / HStack / VStack** - Flexbox layouts
- **Grid** - CSS Grid layouts
- **Separator** - Visual dividers
- **Sidebar** - Side navigation
- **SidebarRail** - Collapsible icon rail sidebar
- **Topbar** - Top navigation bar

### 2. Typography
Text and heading components.

- **Typography** - Base text component
- **H1, H2, H3, H4, H5, H6** - Heading levels
- **Text** - Body text
- **Caption** - Small text

### 3. Form Components
Interactive form elements.

- **Button** - Action buttons
- **IconButton** - Icon-only buttons
- **Input** - Text input
- **TextField** - Input with label
- **Textarea** - Multi-line input
- **Checkbox** - Checkbox input
- **Radio** - Radio buttons
- **Switch** - Toggle switch
- **Select** - Dropdown selection
- **Combobox** - Searchable select
- **Slider** - Range slider
- **Label** - Form labels
- **FormControl** - Form field wrapper
- **InputAdornment** - Input decorations

### 4. Data Display
Components for displaying data.

- **Table** - Basic tables
- **DataGrid** - Advanced data tables
- **Avatar** - User avatars
- **Badge** - Status indicators
- **Card** - Content containers
- **List** - Lists of items
- **Breadcrumbs** - Navigation trail

### 5. Feedback
User feedback components.

- **Alert** - Alert messages
- **Toast** - Toast notifications
- **Progress** - Progress indicators
- **Skeleton** - Loading placeholders
- **Spinner** - Loading spinner
- **Tooltip** - Contextual information

### 6. Overlay
Overlay and modal components.

- **Dialog** - Modal dialogs
- **AlertDialog** - Confirmation dialogs
- **Drawer** - Side panels
- **DropdownMenu** - Dropdown menus
- **Popover** - Floating content

### 7. Navigation
Navigation components.

- **Tabs** - Tab navigation
- **Breadcrumbs** - Page hierarchy
- **Pagination** - Page navigation

### 8. Charts & Data Visualization
Chart components for visualizing data.

- **BarChart** - Bar charts
- **LineChart** - Line charts
- **AreaChart** - Area charts
- **PieChart** - Pie charts
- **DonutChart** - Donut charts
- **ScatterChart** - Scatter plots
- **RadarChart** - Radar charts
- **ProgressDonut** - Progress donut charts
- **MultiProgressDonut** - Multi-segment progress donut

---

## Component Reference

### Accordion

Vertically stacked expandable/collapsible sections.

#### Import

```tsx
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@onesaz/ui'
```

#### Props

**Accordion Props (Radix `type="single"` or `type="multiple"`):**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'single' \| 'multiple'` | `'single'` | Allow one or multiple items open |
| `collapsible` | `boolean` | `false` | Allow collapsing the open item (single mode) |
| `defaultValue` | `string` | - | Default open item value |
| `value` | `string` | - | Controlled open item |
| `onValueChange` | `(value: string) => void` | - | Change handler |
| `className` | `string` | - | Additional CSS classes |

#### Examples

```tsx
// Basic accordion
<Accordion type="single" collapsible defaultValue="item-1" className="space-y-2">
  <AccordionItem value="item-1">
    <AccordionTrigger>What is Onesaz UI?</AccordionTrigger>
    <AccordionContent>
      A modern component library built with Radix UI primitives and Tailwind CSS.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Can I customize styles?</AccordionTrigger>
    <AccordionContent>
      Yes. You can customize via Tailwind classes and theme tokens.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-3">
    <AccordionTrigger>Does it support animations?</AccordionTrigger>
    <AccordionContent>
      Yes. Open/close animations are included by default.
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

#### Stories

Available Storybook stories:
- **Default** - Three-item accordion (`type="single"` collapsible, first item open)

---

### Button

A flexible button component with multiple variants and sizes.

#### Import

```tsx
import { Button } from '@onesaz/ui'
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'destructive' \| 'outline' \| 'secondary' \| 'ghost' \| 'link'` | `'default'` | Visual style variant |
| `size` | `'default' \| 'sm' \| 'lg' \| 'icon'` | `'default'` | Button size |
| `asChild` | `boolean` | `false` | Render as child element |
| `disabled` | `boolean` | `false` | Disable the button |

#### Examples

```tsx
// Basic usage
<Button>Click Me</Button>

// Variants
<Button variant="default">Default</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>

// With icon
<Button>
  <PlusIcon className="mr-2 h-4 w-4" />
  Add Item
</Button>

// Disabled
<Button disabled>Disabled</Button>

// As link
<Button asChild>
  <a href="/about">About</a>
</Button>

// Loading state
<Button disabled>
  <Spinner className="mr-2" />
  Loading...
</Button>
```

#### Best Practices

- Use `destructive` variant for dangerous actions
- Use `outline` or `ghost` for secondary actions
- Always provide meaningful text or aria-label
- Use `disabled` state during async actions
- Consider using `IconButton` for icon-only buttons

#### Stories

Available Storybook stories:
- **Default** - Basic button with default variant
- **Destructive** - Destructive/danger variant
- **Outline** - Outline variant
- **Secondary** - Secondary variant
- **Ghost** - Ghost variant
- **Link** - Link variant
- **Small** - Small size (`size="sm"`)
- **Large** - Large size (`size="lg"`)
- **AllVariants** - All six variants side by side
- **AllSizes** - All sizes including `icon` size
- **Disabled** - Disabled state

---

### Alert

Display important messages with various severity levels.

#### Import

```tsx
import { Alert, AlertTitle, AlertDescription } from '@onesaz/ui'
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'info' \| 'success' \| 'warning' \| 'error' \| 'destructive'` | `'default'` | Alert style variant |
| `dismissible` | `boolean` | `false` | Show close button |
| `showIcon` | `boolean` | `true` | Show status icon |
| `onClose` | `() => void` | - | Callback when dismissed |
| `duration` | `number` | - | Auto-dismiss after ms |

#### Examples

```tsx
// Basic alert
<Alert>
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add more components to your app.
  </AlertDescription>
</Alert>

// Variants
<Alert variant="info">
  <AlertTitle>Information</AlertTitle>
  <AlertDescription>This is informational content.</AlertDescription>
</Alert>

<Alert variant="success">
  <AlertTitle>Success</AlertTitle>
  <AlertDescription>Your changes have been saved.</AlertDescription>
</Alert>

<Alert variant="warning">
  <AlertTitle>Warning</AlertTitle>
  <AlertDescription>Please review before proceeding.</AlertDescription>
</Alert>

<Alert variant="error">
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Something went wrong. Please try again.</AlertDescription>
</Alert>

// Dismissible
<Alert dismissible onClose={() => console.log('Closed')}>
  <AlertTitle>Dismissible Alert</AlertTitle>
  <AlertDescription>Click the X to close this alert.</AlertDescription>
</Alert>

// Without icon
<Alert showIcon={false}>
  <AlertDescription>Alert without icon</AlertDescription>
</Alert>
```

#### Stories

Available Storybook stories:
- **Default** - Basic default alert
- **AllVariants** - All six variants (default, info, success, warning, error, destructive)
- **WithTitleOnly** - Alert with only a title (no description)
- **WithDescriptionOnly** - Alert with only a description
- **Dismissible** - Interactive dismissible alert with show/hide toggle
- **DismissibleVariants** - Dismissible style across info, success, warning, error
- **RealWorldExamples** - Practical usage: new feature, payment success, session expiring, upload failed

---

### Card

A flexible container for grouping content.

#### Import

```tsx
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from '@onesaz/ui'
```

#### Examples

```tsx
// Basic card
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>

// Simple card
<Card>
  <CardContent className="pt-6">
    <p>Simple content without header</p>
  </CardContent>
</Card>

// With custom styling
<Card className="border-primary">
  <CardHeader className="bg-primary/10">
    <CardTitle>Featured Card</CardTitle>
  </CardHeader>
  <CardContent>
    <p>This card has custom styling</p>
  </CardContent>
</Card>
```

#### Stories

Available Storybook stories:
- **Default** - Full card with header, content, and footer
- **LoginForm** - Card containing a login form
- **Simple** - Minimal card with content only

---

### DataGrid

Advanced data table with sorting, filtering, pagination, virtualization, pinned rows/columns, column grouping, row/column spanning, and export support.

#### Import

```tsx
import {
  DataGrid,
  type GridColDef,
  type GridRowSelectionModel,
  type ColumnVisibilityModel,
  type PaginationModel,
  type PinnedRowsModel,
  type PinnedColumnsModel,
  type ColumnGroupModel,
  type GridSpanParams,
  type GridRenderCellParams,
  type GridRenderHeaderParams,
  type GridValueGetterParams,
  type GridValueFormatterParams,
} from '@onesaz/ui'
```

#### Props

##### Data

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `rows` | `TData[]` | **required** | Data rows to display |
| `columns` | `GridColDef<TData>[]` | **required** | Column definitions |
| `getRowId` | `(row: TData) => string \| number` | - | Function to get a unique ID for each row |
| `loading` | `boolean` | `false` | Show loading spinner overlay |
| `rowCount` | `number` | - | Total row count (required for server-side pagination) |

##### Toolbar

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `toolBar` | `boolean` | `false` | Show the toolbar |
| `title` | `string` | - | Title displayed in the toolbar |
| `slotProps` | `object` | - | Customize toolbar slots (see [Toolbar Slot Props](#toolbar-slot-props)) |

##### Selection

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checkboxSelection` | `boolean` | `false` | Enable checkbox-based row selection |
| `rowSelectionModel` | `GridRowSelectionModel` | - | Controlled selected rows (`{ [rowId]: boolean }`) |
| `onRowSelectionModelChange` | `(model: GridRowSelectionModel) => void` | - | Callback when row selection changes |
| `disableRowSelectionOnClick` | `boolean` | `false` | Disable selecting a row by clicking anywhere on it |

##### Column Visibility

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columnVisibilityModel` | `ColumnVisibilityModel` | - | Controlled column visibility (`{ [field]: boolean }`) |
| `onColumnVisibilityModelChange` | `(model: ColumnVisibilityModel) => void` | - | Callback when column visibility changes |

##### Pagination

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `paginationMode` | `'client' \| 'server'` | `'client'` | Client-side or server-side pagination |
| `paginationModel` | `PaginationModel` | - | Controlled pagination (`{ page: number, pageSize: number }`) |
| `onPaginationModelChange` | `(model: PaginationModel) => void` | - | Callback when page or page size changes |
| `pageSizeOptions` | `number[]` | `[10, 25, 50, 100]` | Available page size options |
| `hideFooter` | `boolean` | `false` | Hide the entire footer |
| `hideFooterPagination` | `boolean` | `false` | Hide only the pagination controls in the footer |

##### Sorting

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `sortingMode` | `'client' \| 'server'` | `'client'` | Client-side or server-side sorting |
| `initialSortModel` | `{ field: string; sort: 'asc' \| 'desc' }[]` | - | Initial sort state applied on first render |
| `sortLatestFirst` | `boolean` | `false` | Auto-sort by `createdAt` descending (requires `createdAt` field) |

##### Filtering

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `filterMode` | `'client' \| 'server'` | `'client'` | Client-side or server-side filtering |

##### Appearance

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `height` | `number \| string` | `400` | Fixed height of the grid |
| `minHeight` | `number \| string` | - | Minimum height |
| `maxHeight` | `number \| string` | - | Maximum height |
| `autoHeight` | `boolean` | `false` | Grow to fit all rows (no fixed height) |
| `density` | `'compact' \| 'standard' \| 'comfortable'` | `'standard'` | Row height density |
| `showCellVerticalBorder` | `boolean` | `false` | Show vertical borders between cells |
| `showColumnVerticalBorder` | `boolean` | `false` | Show vertical borders between column headers |
| `className` | `string` | - | Custom CSS class on the root element |
| `sx` | `React.CSSProperties` | - | Inline styles on the root element |

##### Row Styling

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `getRowClassName` | `(params: { row: TData; rowIndex: number }) => string` | - | Function to apply a CSS class to a row |

##### Cell Content

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `wrapText` | `boolean` | `false` | Wrap cell text globally (can be overridden per column) |

##### Virtualization

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `virtualized` | `boolean` | `false` | Enable row virtualization for large datasets |
| `overscan` | `number` | `5` | Extra rows to render outside the visible area |

##### Pinned Rows & Columns

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `pinnedRows` | `PinnedRowsModel<TData>` | - | Rows pinned to `top` and/or `bottom` |
| `pinnedColumns` | `PinnedColumnsModel` | - | Column fields pinned to `left` and/or `right` |

##### Column Grouping

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columnGroupingModel` | `ColumnGroupModel[]` | - | Group columns under a shared header row |

##### Export

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onExport` | `(data: TData[], columns: GridColDef<TData>[]) => void` | - | Custom export handler (triggered by toolbar export button) |
| `exportFileName` | `string` | `'data-export'` | File name used for built-in CSV/JSON exports |

##### Column Resizing

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `resizableColumns` | `boolean` | `false` | Allow dragging column header edges to resize |
| `onColumnResize` | `(columnId: string, width: number) => void` | - | Callback after a column is resized |

##### MUI Compatibility / Disable Flags

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `disableRowSelectionOnClick` | `boolean` | `false` | Already listed under Selection |
| `disableColumnMenu` | `boolean` | `false` | Disable the column header context menu |
| `disableColumnFilter` | `boolean` | `false` | Disable column-level filtering |
| `disableColumnSelector` | `boolean` | `false` | Hide the column visibility button in the toolbar |
| `disableDensitySelector` | `boolean` | `false` | Hide the density selector |
| `sensitiveInfo` | `boolean` | `false` | Mark grid as sensitive — excluded from export |
| `actions` | `{ edit?: boolean; del?: boolean }` | - | Show built-in edit/delete action buttons |

---

#### Toolbar Slot Props

```tsx
slotProps?: {
  toolbar?: {
    showQuickFilter?: boolean          // Show search bar (default: true)
    showColumnSelector?: boolean       // Show column visibility dropdown (default: true)
    showExport?: boolean               // Show export dropdown (default: true)
    customButtons?: React.ReactNode    // Custom buttons rendered at the end of the toolbar
    getExportedColumns?: (columns: GridColDef[]) => GridColDef[]  // Filter columns included in export
    moreOptions?: Array<{              // Additional items in the "..." overflow menu
      label: string
      onClick: () => void
      icon?: React.ReactNode
    }>
  }
}
```

---

#### Column Definition (`GridColDef<T>`)

```tsx
interface GridColDef<T = any> {
  // Core
  field: string                          // Data field key
  headerName?: string                    // Column header label
  type?: 'string' | 'number' | 'date' | 'dateTime' | 'boolean'

  // Sizing
  width?: number                         // Fixed width in px
  minWidth?: number                      // Minimum width
  maxWidth?: number                      // Maximum width
  flex?: number                          // Flex grow factor (like CSS flex-grow)

  // Alignment
  align?: 'left' | 'center' | 'right'   // Cell content alignment
  headerAlign?: 'left' | 'center' | 'right'  // Header text alignment

  // Behaviour
  sortable?: boolean                     // Enable sorting on this column (default: true)
  filterable?: boolean                   // Include in quick filter search
  editable?: boolean                     // Enable inline editing (not yet implemented)
  hide?: boolean                         // Initially hidden
  hideable?: boolean                     // Can the user toggle visibility? (default: true)

  // Rendering
  renderCell?: (params: GridRenderCellParams<T>) => React.ReactNode
  renderHeader?: (params: GridRenderHeaderParams) => React.ReactNode
  valueGetter?: (params: GridValueGetterParams<T>) => any   // Derive display value
  valueFormatter?: (params: GridValueFormatterParams) => string  // Format display value as string

  // Cell content overflow
  wrapText?: boolean                     // Wrap text instead of truncate (default: false)
  scrollable?: boolean                   // Make cell content scrollable when it overflows
  maxCellHeight?: number                 // Max height for scrollable cells (default: 100px)
  cellClassName?: string                 // Custom CSS class on the cell

  // Spanning
  colSpan?: number | ((params: GridSpanParams<T>) => number | undefined)
  // Static or dynamic number of columns this cell spans
  rowSpan?: boolean | ((params: GridSpanParams<T>) => number | undefined)
  // true = auto-merge consecutive identical values; function = custom span count

  // Export
  hideExport?: boolean                   // Exclude this column from exports
  disableExport?: boolean                // Alias for hideExport
}
```

---

#### Type Reference

```tsx
// Params passed to renderCell
interface GridRenderCellParams<TData = any> {
  row: TData
  value: any
  field: string
  rowIndex: number
}

// Params passed to renderHeader
interface GridRenderHeaderParams {
  field: string
  colDef: GridColDef
}

// Params passed to valueGetter
interface GridValueGetterParams<TData = any> {
  row: TData
  field: string
}

// Params passed to valueFormatter
interface GridValueFormatterParams {
  value: any
}

// Params passed to colSpan / rowSpan functions
interface GridSpanParams<TData = any> {
  row: TData
  value: any
  field: string
  rowIndex: number
}

// Controlled pagination
interface PaginationModel {
  page: number      // zero-based page index
  pageSize: number
}

// Key = row ID, value = selected state
interface GridRowSelectionModel {
  [key: string]: boolean
}

// Key = field name, value = visible state
interface ColumnVisibilityModel {
  [key: string]: boolean
}

// Pinned rows
interface PinnedRowsModel<TData = any> {
  top?: TData[]
  bottom?: TData[]
}

// Pinned columns
interface PinnedColumnsModel {
  left?: string[]   // Column field names pinned to the left
  right?: string[]  // Column field names pinned to the right
}

// Column group header
interface ColumnGroupModel {
  groupId: string
  headerName?: string
  children: { field: string }[]
  headerAlign?: 'left' | 'center' | 'right'
}
```

---

#### Examples

```tsx
// ── Default ──────────────────────────────────────────────────
<DataGrid
  rows={users}
  columns={columns}
  getRowId={(row) => row.id}
  height={400}
/>

// ── With Toolbar ──────────────────────────────────────────────
<DataGrid
  rows={users}
  columns={columns}
  getRowId={(row) => row.id}
  toolBar
  title="Users List"
  height={450}
/>

// ── Checkbox Selection ────────────────────────────────────────
const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>({})

<DataGrid
  rows={users}
  columns={columns}
  getRowId={(row) => row.id}
  checkboxSelection
  rowSelectionModel={selectionModel}
  onRowSelectionModelChange={setSelectionModel}
  toolBar
  title="Select Users"
  height={450}
/>

// ── Custom Cell Rendering ─────────────────────────────────────
const columns: GridColDef<User>[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', flex: 1 },
  {
    field: 'status',
    headerName: 'Status',
    width: 120,
    renderCell: ({ value }) => (
      <Badge variant={value === 'active' ? 'default' : 'secondary'}>
        {value}
      </Badge>
    ),
  },
  {
    field: 'salary',
    headerName: 'Salary',
    width: 120,
    align: 'right',
    headerAlign: 'right',
    valueFormatter: ({ value }) => `$${value.toLocaleString()}`,
  },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 150,
    sortable: false,
    renderCell: ({ row }) => (
      <div className="flex gap-2">
        <Button size="sm" variant="outline">Edit</Button>
        <Button size="sm" variant="destructive">Delete</Button>
      </div>
    ),
  },
]

// ── Value Getter ──────────────────────────────────────────────
const columns: GridColDef<User>[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  {
    field: 'fullInfo',
    headerName: 'Full Info',
    flex: 1,
    valueGetter: ({ row }) => `${row.name} (${row.role}) - ${row.department}`,
  },
  {
    field: 'yearsEmployed',
    headerName: 'Years Employed',
    width: 150,
    align: 'center',
    headerAlign: 'center',
    valueGetter: ({ row }) => {
      const years = (Date.now() - new Date(row.joinDate).getTime()) / (1000 * 60 * 60 * 24 * 365)
      return years.toFixed(1)
    },
  },
]

// ── Loading State ─────────────────────────────────────────────
<DataGrid rows={users} columns={columns} getRowId={(row) => row.id} loading toolBar title="Loading..." height={400} />

// ── Empty State ───────────────────────────────────────────────
<DataGrid rows={[]} columns={columns} getRowId={(row) => row.id} toolBar title="No Users Found" height={400} />

// ── Density ───────────────────────────────────────────────────
<DataGrid rows={users} columns={columns} getRowId={(row) => row.id} density="compact"     height={250} />
<DataGrid rows={users} columns={columns} getRowId={(row) => row.id} density="standard"    height={320} />
<DataGrid rows={users} columns={columns} getRowId={(row) => row.id} density="comfortable" height={400} />

// ── Borders ───────────────────────────────────────────────────
<DataGrid
  rows={users}
  columns={columns}
  getRowId={(row) => row.id}
  showCellVerticalBorder
  showColumnVerticalBorder
  toolBar
  title="Table with Borders"
  height={400}
/>

// ── Custom Page Sizes ─────────────────────────────────────────
<DataGrid
  rows={users}
  columns={columns}
  getRowId={(row) => row.id}
  pageSizeOptions={[5, 10, 20]}
  paginationModel={{ page: 0, pageSize: 5 }}
  toolBar
  title="Custom Page Sizes"
  height={400}
/>

// ── Row Class Name ────────────────────────────────────────────
<DataGrid
  rows={users}
  columns={columns}
  getRowId={(row) => row.id}
  getRowClassName={({ row }) => row.status === 'inactive' ? 'opacity-50' : ''}
  toolBar
  title="Highlighted Rows"
  height={400}
/>

// ── Hide Footer ───────────────────────────────────────────────
<DataGrid rows={users} columns={columns} getRowId={(row) => row.id} hideFooter toolBar title="No Footer" height={350} />

// ── Auto Height ───────────────────────────────────────────────
<DataGrid rows={users} columns={columns} getRowId={(row) => row.id} autoHeight toolBar title="Auto Height" />

// ── Server-Side Pagination ────────────────────────────────────
const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 })
const [loading, setLoading] = useState(false)

const handlePaginationChange = (model: PaginationModel) => {
  setLoading(true)
  fetchPage(model).then((data) => {
    setRows(data)
    setLoading(false)
  })
  setPaginationModel(model)
}

<DataGrid
  rows={pagedRows}
  columns={columns}
  getRowId={(row) => row.id}
  paginationMode="server"
  paginationModel={paginationModel}
  onPaginationModelChange={handlePaginationChange}
  rowCount={1000}
  loading={loading}
  pageSizeOptions={[5, 10, 25]}
  toolBar
  title="Server-side Pagination"
  height={400}
/>

// ── Column Visibility ─────────────────────────────────────────
const [columnVisibility, setColumnVisibility] = useState<ColumnVisibilityModel>({
  department: false,  // hidden by default
})

<DataGrid
  rows={users}
  columns={columns}
  getRowId={(row) => row.id}
  toolBar
  title="Column Visibility"
  columnVisibilityModel={columnVisibility}
  onColumnVisibilityModelChange={setColumnVisibility}
  height={450}
/>

// ── Wrap Text ─────────────────────────────────────────────────
// Global wrap for all cells
<DataGrid rows={data} columns={columns} getRowId={(row) => row.id} wrapText height={250} />

// Per-column wrap
const columns: GridColDef[] = [
  { field: 'description', headerName: 'Description', flex: 1, wrapText: true },
]

// ── Scrollable Cell (many badges) ─────────────────────────────
const columns: GridColDef[] = [
  {
    field: 'tags',
    headerName: 'Tags',
    width: 300,
    scrollable: true,
    maxCellHeight: 120,
    renderCell: ({ value }) => (
      <div className="flex flex-wrap gap-1">
        {value.map((tag: string, i: number) => (
          <Badge key={i} variant="secondary" className="text-xs">{tag}</Badge>
        ))}
      </div>
    ),
  },
]

// ── Virtualization ────────────────────────────────────────────
<DataGrid
  rows={largeDataset}         // 10 000+ rows
  columns={columns}
  getRowId={(row) => row.id}
  virtualized
  overscan={10}
  toolBar
  title="Virtualized DataGrid (10,000 rows)"
  height={500}
/>

// ── Export ────────────────────────────────────────────────────
<DataGrid
  rows={users}
  columns={columns}
  getRowId={(row) => row.id}
  toolBar
  title="Export Demo"
  onExport={(data, cols) => {
    console.log('Exporting', data.length, 'rows')
  }}
  exportFileName="users-export"
  height={400}
/>

// ── Custom Toolbar Buttons ────────────────────────────────────
<DataGrid
  rows={users}
  columns={columns}
  getRowId={(row) => row.id}
  toolBar
  title="Custom Toolbar"
  slotProps={{
    toolbar: {
      customButtons: (
        <Button variant="outline" size="sm" onClick={() => alert('Add')}>
          Add User
        </Button>
      ),
      moreOptions: [
        { label: 'Print',    onClick: () => window.print() },
        { label: 'Settings', onClick: () => openSettings() },
      ],
    },
  }}
  height={400}
/>

// ── Resizable Columns ─────────────────────────────────────────
<DataGrid
  rows={users}
  columns={columns}
  getRowId={(row) => row.id}
  resizableColumns
  onColumnResize={(columnId, width) => console.log(columnId, width)}
  toolBar
  title="Resizable Columns"
  height={400}
/>

// ── Pinned Rows ───────────────────────────────────────────────
<DataGrid
  rows={salesData}
  columns={salesColumns}
  getRowId={(row) => row.id}
  height={350}
  toolBar
  title="Sales by Region"
  pinnedRows={{
    top: [averageRow],
    bottom: [grandTotalRow],
  }}
  getRowClassName={({ row }) => row.id === 999 ? 'font-bold' : ''}
/>

// ── Pinned Columns ────────────────────────────────────────────
<DataGrid
  rows={studentScores}
  columns={studentColumns}
  getRowId={(row) => row.id}
  height={350}
  toolBar
  title="Student Scores"
  pinnedColumns={{
    left: ['rollNo', 'name'],
    right: ['total'],
  }}
/>

// ── Column Grouping ───────────────────────────────────────────
const columnGroupingModel: ColumnGroupModel[] = [
  {
    groupId: 'stem',
    headerName: 'STEM Subjects',
    children: [{ field: 'math' }, { field: 'science' }, { field: 'physics' }],
    headerAlign: 'center',
  },
  {
    groupId: 'humanities',
    headerName: 'Humanities',
    children: [{ field: 'english' }, { field: 'history' }],
    headerAlign: 'center',
  },
]

<DataGrid
  rows={studentScores}
  columns={columns}
  getRowId={(row) => row.id}
  height={400}
  toolBar
  title="Grouped Columns"
  columnGroupingModel={columnGroupingModel}
/>

// ── Row Spanning (auto-merge consecutive identical values) ────
const columns: GridColDef<Employee>[] = [
  { field: 'department', headerName: 'Department', width: 150, rowSpan: true },
  { field: 'team',       headerName: 'Team',       width: 130, rowSpan: true },
  { field: 'name',       headerName: 'Name',       width: 160 },
  { field: 'role',       headerName: 'Role',       width: 170 },
  { field: 'salary',     headerName: 'Salary',     width: 130 },
]

<DataGrid
  rows={employeeData}
  columns={columns}
  getRowId={(row) => row.id}
  showCellVerticalBorder
  hideFooter
  height={480}
/>

// ── Column Spanning (dynamic, in the middle of the table) ─────
const columns: GridColDef<ExamMarks>[] = [
  { field: 'student', headerName: 'Student', width: 130, rowSpan: true },
  { field: 'subject', headerName: 'Subject', width: 130 },
  {
    field: 'theory',
    headerName: 'Theory',
    width: 120,
    align: 'center',
    // Span across Theory + Practical when the subject has no lab
    colSpan: ({ row }: GridSpanParams<ExamMarks>) => row.hasLab ? 1 : 2,
    renderCell: ({ row, value }) =>
      row.hasLab
        ? value
        : <span className="text-muted-foreground italic">{value} (Theory only)</span>,
  },
  { field: 'practical', headerName: 'Practical', width: 120, align: 'center' },
  { field: 'total',     headerName: 'Total',     width: 100, align: 'center' },
  { field: 'grade',     headerName: 'Grade',     width: 90,  align: 'center' },
]

<DataGrid
  rows={examMarksData}
  columns={columns}
  getRowId={(row) => row.id}
  showCellVerticalBorder
  hideFooter
  height={520}
/>

// ── All Features Combined ─────────────────────────────────────
const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>({})
const [columnVisibility, setColumnVisibility] = useState<ColumnVisibilityModel>({})

<DataGrid
  rows={users}
  columns={fullColumns}
  getRowId={(row) => row.id}
  checkboxSelection
  rowSelectionModel={selectionModel}
  onRowSelectionModelChange={setSelectionModel}
  columnVisibilityModel={columnVisibility}
  onColumnVisibilityModelChange={setColumnVisibility}
  resizableColumns
  toolBar
  title="Full Featured DataGrid"
  slotProps={{
    toolbar: {
      customButtons: <Button variant="outline" size="sm">Add User</Button>,
      moreOptions: [
        { label: 'Print',    onClick: () => console.log('Print') },
        { label: 'Settings', onClick: () => console.log('Settings') },
      ],
    },
  }}
  height={500}
/>
```

---

### FormControl

Wrapper component for form fields with label, helper text, and error states.

#### Import

```tsx
import { 
  FormControl, 
  FormLabel, 
  FormHelperText,
  FormGroup 
} from '@onesaz/ui'
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `error` | `boolean` | `false` | Error state |
| `disabled` | `boolean` | `false` | Disabled state |
| `required` | `boolean` | `false` | Required field |
| `fullWidth` | `boolean` | `false` | Full width |
| `margin` | `'none' \| 'dense' \| 'normal'` | `'none'` | Spacing |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | Layout direction |

#### Examples

```tsx
// Basic form control
<FormControl>
  <FormLabel>Email</FormLabel>
  <Input type="email" placeholder="you@example.com" />
  <FormHelperText>We'll never share your email.</FormHelperText>
</FormControl>

// Required field
<FormControl required>
  <FormLabel>Username</FormLabel>
  <Input placeholder="Enter username" />
  <FormHelperText>This field is required.</FormHelperText>
</FormControl>

// Error state
<FormControl error>
  <FormLabel>Password</FormLabel>
  <Input type="password" error />
  <FormHelperText>Password must be at least 8 characters.</FormHelperText>
</FormControl>

// Disabled state
<FormControl disabled>
  <FormLabel>Disabled Field</FormLabel>
  <Input disabled defaultValue="Cannot edit" />
</FormControl>

// Horizontal layout
<FormControl orientation="horizontal">
  <FormLabel className="w-32">Name</FormLabel>
  <Input className="flex-1" />
</FormControl>

// Form group (for checkboxes/radios)
<FormControl>
  <FormLabel>Preferences</FormLabel>
  <FormGroup>
    <Checkbox id="email">Email notifications</Checkbox>
    <Checkbox id="sms">SMS notifications</Checkbox>
    <Checkbox id="push">Push notifications</Checkbox>
  </FormGroup>
</FormControl>
```

#### Stories

Available Storybook stories:
- **Default** - Basic form control with label and input
- **Required** - Required field with asterisk
- **WithError** - Error state with helper text
- **Disabled** - Disabled field
- **HorizontalLayout** - Horizontal label + input layout
- **FullWidth** - Full-width form control
- **WithRadioGroup** - FormControl wrapping a radio group
- **WithCheckboxGroup** - FormControl wrapping a checkbox group (FormGroup)
- **WithSelect** - FormControl wrapping a Select dropdown
- **FormGroupRow** - Horizontal checkbox group using `FormGroup row`
- **CompleteForm** - Full form with multiple fields, validation, and submit
- **Margins** - Comparing `margin` prop values (none, dense, normal)

---

### Dialog

Modal dialog for important content and actions.

#### Import

```tsx
import { 
  Dialog, 
  DialogTrigger, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter,
  DialogClose
} from '@onesaz/ui'
```

> **Note:** Dialog also supports a compound component pattern via `Dialog.Trigger`, `Dialog.Content`, `Dialog.Header`, `Dialog.Title`, `Dialog.Description`, `Dialog.Footer`, and `Dialog.Close` (both named and compound imports work).

#### Props

**Dialog Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | - | Controlled open state |
| `onOpenChange` | `(open: boolean) => void` | - | Open state change handler |
| `modal` | `boolean` | `true` | Render as modal (blocks background) |

**DialogContent Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| 'full'` | `'md'` | Dialog width preset |
| `className` | `string` | - | Additional CSS classes |

#### Examples

```tsx
// Basic dialog
<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>
        This is a description of what the dialog is about.
      </DialogDescription>
    </DialogHeader>
    <div className="py-4">
      Dialog content goes here
    </div>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">Cancel</Button>
      </DialogClose>
      <Button>Save</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

// Controlled dialog
const [open, setOpen] = useState(false)

<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Controlled Dialog</DialogTitle>
    </DialogHeader>
    <p>Dialog content</p>
    <DialogFooter>
      <Button onClick={() => setOpen(false)}>Close</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

// Form dialog
<Dialog>
  <DialogTrigger asChild>
    <Button>Add User</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Add New User</DialogTitle>
      <DialogDescription>
        Enter the user details below.
      </DialogDescription>
    </DialogHeader>
    <form onSubmit={handleSubmit}>
      <VStack spacing="md">
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input placeholder="Enter name" />
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input type="email" placeholder="Enter email" />
        </FormControl>
      </VStack>
      <DialogFooter className="mt-4">
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button type="submit">Add User</Button>
      </DialogFooter>
    </form>
  </DialogContent>
</Dialog>
```

#### Stories

Available Storybook stories:
- **Default** - Basic dialog with title, description, and cancel/save actions
- **Confirmation** - Confirmation-style dialog (e.g., delete confirmation)
- **Sizes** - Dialog displayed at all six sizes (sm, md, lg, xl, 2xl, full)

---

### Select & Combobox

Dropdown selection components.

#### Select - Simple Dropdown

```tsx
import { Select } from '@onesaz/ui'
```

`Select` uses a **compound component** pattern via `Select.*` sub-components.

| Sub-component | Description |
|---------------|-------------|
| `Select.Trigger` | Button that opens the dropdown |
| `Select.Value` | Displays selected value / placeholder |
| `Select.Content` | Dropdown container |
| `Select.Item` | Individual selectable option |
| `Select.Group` | Groups related items |
| `Select.Label` | Label for a group |
| `Select.Separator` | Visual divider between groups |

**Select Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | Controlled value |
| `defaultValue` | `string` | - | Default value (uncontrolled) |
| `onValueChange` | `(value: string) => void` | - | Change handler |
| `disabled` | `boolean` | `false` | Disable the select |

```tsx
// Basic select (compound pattern)
<Select>
  <Select.Trigger className="w-[180px]">
    <Select.Value placeholder="Select a fruit" />
  </Select.Trigger>
  <Select.Content>
    <Select.Item value="apple">Apple</Select.Item>
    <Select.Item value="banana">Banana</Select.Item>
    <Select.Item value="orange">Orange</Select.Item>
  </Select.Content>
</Select>

// With groups and separator
<Select>
  <Select.Trigger className="w-[200px]">
    <Select.Value placeholder="Select a timezone" />
  </Select.Trigger>
  <Select.Content>
    <Select.Group>
      <Select.Label>North America</Select.Label>
      <Select.Item value="est">Eastern Standard Time (EST)</Select.Item>
      <Select.Item value="cst">Central Standard Time (CST)</Select.Item>
    </Select.Group>
    <Select.Separator />
    <Select.Group>
      <Select.Label>Europe</Select.Label>
      <Select.Item value="gmt">Greenwich Mean Time (GMT)</Select.Item>
    </Select.Group>
  </Select.Content>
</Select>

// Controlled
const [value, setValue] = useState('')

<Select value={value} onValueChange={setValue}>
  <Select.Trigger>
    <Select.Value placeholder="Select" />
  </Select.Trigger>
  <Select.Content>
    <Select.Item value="1">One</Select.Item>
    <Select.Item value="2">Two</Select.Item>
  </Select.Content>
</Select>

// Disabled
<Select disabled>
  <Select.Trigger className="w-[180px]">
    <Select.Value placeholder="Select a fruit" />
  </Select.Trigger>
  <Select.Content>
    <Select.Item value="apple">Apple</Select.Item>
  </Select.Content>
</Select>
```

> **Note:** Named imports (`SelectTrigger`, `SelectContent`, etc.) also work as an alternative to the compound pattern.

**Available Storybook stories:**
- **Default** - Basic fruit picker
- **WithLabel** - Select with a `Label` above it
- **WithGroups** - Grouped timezone select with `Select.Separator`
- **Disabled** - Disabled select


#### Combobox - Searchable Dropdown

```tsx
import { Combobox } from '@onesaz/ui'
```

**Combobox Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `ComboboxOption[] \| string[]` | - | Options list |
| `simpleOptions` | `boolean` | `false` | Use `string[]` directly as options |
| `placeholder` | `string` | - | Trigger button placeholder text |
| `searchPlaceholder` | `string` | - | Search input placeholder |
| `emptyText` | `string` | `'No results found.'` | Text when no results match |
| `value` | `ComboboxOption \| string \| null` | - | Controlled selected value |
| `onChange` | `(value: ...) => void` | - | Change handler |
| `multiple` | `boolean` | `false` | Allow multiple selections |
| `selectAll` | `boolean` | `false` | Show "Select all" option (multi mode) |
| `labelKey` | `string` | `'label'` | Key to use as label in custom option objects |
| `valueKey` | `string` | `'value'` | Key to use as value in custom option objects |
| `disabled` | `boolean` | `false` | Disable the combobox |

**ComboboxOption shape:**

```ts
interface ComboboxOption {
  value: string
  label: string
  disabled?: boolean  // Disable individual options
}
```

```tsx
// Basic combobox
const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
]

<Combobox
  options={options}
  placeholder="Select framework..."
  searchPlaceholder="Search frameworks..."
  emptyText="No framework found."
  onChange={(value) => console.log(value)}
/>

// With simple string options
<Combobox
  simpleOptions
  options={['Alpha', 'Beta', 'Gamma', 'Delta']}
  placeholder="Select option..."
/>

// Controlled
const [value, setValue] = useState(null)

<Combobox
  options={options}
  value={value}
  onChange={setValue}
  placeholder="Select framework..."
/>

// Multi-select
<Combobox
  multiple
  options={options}
  placeholder="Select frameworks..."
/>

// Multi-select with Select All
<Combobox
  multiple
  selectAll
  options={options}
  placeholder="Select frameworks..."
/>

// Custom keys (non-standard object shape)
<Combobox
  options={[
    { id: 'hr', name: 'HR' },
    { id: 'ops', name: 'Operations' },
  ]}
  labelKey="name"
  valueKey="id"
  placeholder="Select department..."
/>

// With disabled options
<Combobox
  options={[
    { value: 'next', label: 'Next.js' },
    { value: 'astro', label: 'Astro', disabled: true },
    { value: 'nuxt', label: 'Nuxt.js' },
  ]}
  placeholder="Select framework..."
/>

// Disabled combobox
<Combobox
  options={options}
  disabled
  placeholder="Select framework..."
/>
```

**Available Storybook stories:**
- **Default** - Basic framework picker
- **WithLabel** - Combobox with a `Label` above it
- **Countries** - Large country list
- **SimpleOptions** - `simpleOptions` with `string[]`
- **ControlledSimple** - Controlled simple mode with state display
- **CustomKeys** - Custom `labelKey`/`valueKey` for non-standard objects
- **ControlledMultiCustomKeys** - Controlled multi with custom keys
- **Controlled** - Controlled single-select with state display
- **Disabled** - Disabled combobox
- **WithDisabledOptions** - Options with individual `disabled: true`
- **MultiSelect** - Multiple selection mode
- **ControlledSimpleMulti** - Controlled simple multi-select
- **MultiSelectWithSelectAll** - Multi-select with "Select All" toggle
- **MultiSelectControlled** - Controlled multi-select with external state
- **MultiSelectManyOptions** - Multi-select with many options
- **MultiSelectCustomMaxDisplay** - Custom max displayed selections
- **SingleVsMulti** - Side-by-side single vs multi comparison

---

### Avatar

User avatar component with image fallback support.

#### Import

```tsx
import { Avatar, AvatarImage, AvatarFallback, AvatarGroup } from '@onesaz/ui'
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | - | Avatar image URL |
| `alt` | `string` | - | Alt text for image |
| `fallback` | `string` | - | Fallback text/initials |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'md'` | Avatar size |
| `shape` | `'circle' \| 'square'` | `'circle'` | Avatar shape |
| `bordered` | `boolean` | `false` | Show border |

**AvatarGroup Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `max` | `number` | - | Maximum avatars to show before collapsing |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'md'` | Size applied to all avatars in group |

#### Examples

```tsx
// With image
<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" alt="User" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>

// With fallback text
<Avatar fallback="John Doe" />

// With initials
<Avatar fallback="JD" />

// Different sizes
<Avatar size="xs" fallback="XS" />
<Avatar size="sm" fallback="SM" />
<Avatar size="md" fallback="MD" />
<Avatar size="lg" fallback="LG" />
<Avatar size="xl" fallback="XL" />
<Avatar size="2xl" fallback="2X" />

// Square shape
<Avatar shape="square" fallback="SQ" />

// With border
<Avatar bordered fallback="BD" />

// Avatar group
<AvatarGroup max={3}>
  <Avatar fallback="JD" />
  <Avatar fallback="AS" />
  <Avatar fallback="MK" />
  <Avatar fallback="+2" />
</AvatarGroup>
```

#### Stories

Available Storybook stories:
- **Default** - Avatar with image src
- **WithFallback** - Avatar with full name as fallback
- **WithInitials** - Avatar with initials fallback (`"JD"`)
- **NoImageOrFallback** - Avatar with neither src nor fallback (shows placeholder)
- **AllSizes** - All six sizes (xs → 2xl) side by side
- **Shapes** - Circle vs square comparison
- **Bordered** - Bordered avatar
- **WithImages** - Multiple avatars using real image URLs
- **Group** - `AvatarGroup` with `max={3}` overflow
- **GroupSizes** - `AvatarGroup` at sm, md, and lg sizes

---

### Badge

Small status indicator for displaying metadata.

#### Import

```tsx
import { Badge } from '@onesaz/ui'
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'secondary' \| 'destructive' \| 'outline' \| 'success' \| 'warning' \| 'info'` | `'default'` | Badge variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Badge size |

#### Examples

```tsx
// Variants
<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="info">Info</Badge>

// Sizes
<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>

// With icons
<Badge>
  <CheckIcon className="mr-1 h-3 w-3" />
  Verified
</Badge>

// In use
<div className="flex items-center gap-2">
  <span>Status:</span>
  <Badge variant="success">Active</Badge>
</div>
```

#### Stories

Available Storybook stories:
- **Default** - Default variant badge
- **Secondary** - Secondary variant
- **Destructive** - Destructive variant
- **Outline** - Outline variant
- **Success** - Success variant
- **Warning** - Warning variant
- **Info** - Info variant
- **AllVariants** - All seven variants displayed together

---

### Chip

Tag/label component for representing categories, statuses, or attributes.

#### Import

```tsx
import { Chip } from '@onesaz/ui'
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Chip label text |
| `variant` | `'filled' \| 'outlined'` | `'filled'` | Visual style |
| `color` | `'default' \| 'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'default'` | Color theme |
| `size` | `'small' \| 'medium'` | `'medium'` | Chip size |
| `clickable` | `boolean` | `false` | Make chip interactive/clickable |
| `disabled` | `boolean` | `false` | Disable the chip |
| `onDelete` | `() => void` | - | Show delete icon and handle delete |
| `onClick` | `() => void` | - | Click handler |
| `icon` | `React.ReactNode` | - | Icon displayed before the label |

#### Examples

```tsx
// Basic chip
<Chip label="Default" />

// Variants
<Chip label="Filled" variant="filled" />
<Chip label="Outlined" variant="outlined" />

// Colors
<Chip label="Primary" color="primary" />
<Chip label="Success" color="success" />
<Chip label="Warning" color="warning" />
<Chip label="Error" color="error" />
<Chip label="Info" color="info" />

// Sizes
<Chip label="Small" size="small" />
<Chip label="Medium" size="medium" />

// Deletable
<Chip label="Deletable" onDelete={() => console.log('deleted')} />

// Clickable
<Chip label="Clickable" clickable onClick={() => console.log('clicked')} />

// Disabled
<Chip label="Disabled" disabled />

// With icon
<Chip label="With Icon" icon={<StarIcon className="h-4 w-4" />} />

// Tag list
<div className="flex flex-wrap gap-2">
  <Chip label="React" color="primary" variant="outlined" />
  <Chip label="TypeScript" color="info" variant="outlined" />
  <Chip label="Tailwind" color="success" variant="outlined" />
</div>

// Filterable tags (clickable + deletable)
const [tags, setTags] = useState(['React', 'TypeScript', 'CSS'])

<div className="flex flex-wrap gap-2">
  {tags.map(tag => (
    <Chip
      key={tag}
      label={tag}
      color="primary"
      onDelete={() => setTags(tags.filter(t => t !== tag))}
    />
  ))}
</div>
```

#### Stories

Available Storybook stories:
- **Default** - Default chip
- **FilledColors** - All color options with filled variant
- **OutlinedColors** - All color options with outlined variant
- **Sizes** - Small and medium sizes compared
- **Deletable** - Chips with delete icons
- **Clickable** - Interactive clickable chips
- **Disabled** - Disabled state chips
- **WithIcon** - Chips with leading icons

---

### Box

Flexible container component with styling utilities.

#### Import

```tsx
import { Box } from '@onesaz/ui'
```

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `display` | `string` | CSS display property |
| `p, px, py, pt, pr, pb, pl` | `number \| string` | Padding |
| `m, mx, my, mt, mr, mb, ml` | `number \| string` | Margin |
| `w, h` | `string` | Width and height |
| `rounded` | `string` | Border radius |
| `shadow` | `string` | Box shadow |
| `flexDirection` | `string` | Flex direction |
| `alignItems` | `string` | Align items |
| `justifyContent` | `string` | Justify content |
| `gap` | `number` | Gap between children |
| `as` | `React.ElementType` | Polymorphic: render as a different HTML element or component |

#### Examples

```tsx
// Basic container
<Box p={4} className="bg-muted">
  Content
</Box>

// Flex container
<Box display="flex" gap={4} alignItems="center" justifyContent="center">
  <div>Item 1</div>
  <div>Item 2</div>
</Box>

// Flex column
<Box display="flex" flexDirection="column" gap={2}>
  <div>Row 1</div>
  <div>Row 2</div>
</Box>

// With padding and shadow
<Box p={6} rounded="lg" shadow="md" className="bg-card">
  Card content
</Box>

// Responsive
<Box
  display={{ base: 'block', md: 'flex' }}
  gap={{ base: 2, md: 4 }}
>
  Responsive layout
</Box>

// Polymorphic (render as a different element)
<Box as="section" p={4}>Section element</Box>
<Box as="article" p={4}>Article element</Box>
<Box as="button" p={2} onClick={handleClick}>Button element</Box>
```

#### Stories

Available Storybook stories:
- **Default** - Basic box with background color
- **FlexContainer** - Horizontal flex with gap
- **FlexColumn** - Vertical flex column
- **CenteredContent** - Centered content using flex
- **WithShadows** - Various shadow presets
- **BorderRadius** - Rounded corner variations
- **Spacing** - Padding and margin examples
- **PolymorphicAs** - Rendering different HTML elements using `as` prop

---

### Checkbox

Checkbox input with label support.

#### Import

```tsx
import { Checkbox, Label } from '@onesaz/ui'
```

#### Props

Extends standard HTML input element attributes.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | - | Controlled checked state |
| `defaultChecked` | `boolean` | - | Default checked state |
| `disabled` | `boolean` | `false` | Disable checkbox |
| `onChange` | `(event: ChangeEvent<HTMLInputElement>) => void` | - | Change handler |
| `required` | `boolean` | `false` | Required field |
| `className` | `string` | - | Additional CSS classes |

#### Examples

```tsx
// Basic checkbox
<Checkbox />

// With label
<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms and conditions</Label>
</div>

// Controlled (see Controlled story in Storybook)
const [checked, setChecked] = useState(false)

<Checkbox 
  checked={checked} 
  onChange={(e) => setChecked(e.target.checked)} 
/>

// With button toggle
const [checked, setChecked] = useState(false)

<div className="flex flex-col space-y-4">
  <div className="flex items-center space-x-2">
    <Checkbox 
      id="controlled" 
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
    <Label htmlFor="controlled">
      Controlled checkbox (currently {checked ? 'checked' : 'unchecked'})
    </Label>
  </div>
  <button onClick={() => setChecked(!checked)}>
    Toggle via button
  </button>
</div>

// Disabled
<Checkbox disabled />
<Checkbox disabled defaultChecked />

// Default checked (uncontrolled)
<Checkbox defaultChecked />
```

#### Stories

Available Storybook stories:
- **Default** - Basic checkbox
- **Checked** - Default checked state
- **WithLabel** - Checkbox with label
- **Disabled** - Disabled state
- **DisabledChecked** - Disabled and checked
- **Controlled** - Fully controlled checkbox with state management and button toggle

---

### Input

Basic text input component.

#### Import

```tsx
import { Input, Label } from '@onesaz/ui'
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `string` | `'text'` | Input type |
| `placeholder` | `string` | - | Placeholder text |
| `disabled` | `boolean` | `false` | Disable input |
| `readOnly` | `boolean` | `false` | Read-only state |
| `error` | `boolean` | `false` | Error state |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Input size |

#### Examples

```tsx
// Basic input
<Input placeholder="Enter text..." />

// With label
<div className="grid w-full max-w-sm gap-1.5">
  <Label htmlFor="email">Email</Label>
  <Input type="email" id="email" placeholder="you@example.com" />
</div>

// Input types
<Input type="text" placeholder="Text" />
<Input type="email" placeholder="Email" />
<Input type="password" placeholder="Password" />
<Input type="number" placeholder="Number" />
<Input type="tel" placeholder="Phone" />
<Input type="url" placeholder="URL" />
<Input type="search" placeholder="Search" />
<Input type="date" />

// Disabled
<Input disabled placeholder="Disabled" />

// Error state
<Input error placeholder="Error" />

// File input
<Input type="file" />

// Controlled
const [value, setValue] = useState('')

<Input
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="Controlled input"
/>
```

#### Stories

Available Storybook stories:
- **Default** - Basic text input with placeholder
- **WithLabel** - Input paired with a `Label` component
- **Disabled** - Disabled input
- **WithValue** - Read-only input with a pre-set value (`readOnly`)
- **Password** - Password type input
- **File** - File upload input with label

---

### InputAdornment

Wrapper component for adding icons, text, or buttons to inputs.

#### Import

```tsx
import { InputAdornment } from '@onesaz/ui'
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `position` | `'start' \| 'end'` | `'start'` | Position of adornment |
| `disablePointerEvents` | `boolean` | `false` | Disable pointer events |
| `children` | `React.ReactNode` | - | Adornment content |

#### Examples

```tsx
// With icon at start
<Input
  placeholder="Search..."
  startAdornment={
    <InputAdornment position="start">
      <SearchIcon className="h-4 w-4" />
    </InputAdornment>
  }
/>

// With icon at end
<Input
  placeholder="Enter email..."
  endAdornment={
    <InputAdornment position="end">
      <MailIcon className="h-4 w-4" />
    </InputAdornment>
  }
/>

// With text prefix
<Input
  type="number"
  placeholder="0.00"
  startAdornment={
    <InputAdornment position="start">$</InputAdornment>
  }
/>

// With text suffix
<Input
  type="number"
  placeholder="Enter weight"
  endAdornment={
    <InputAdornment position="end">kg</InputAdornment>
  }
/>

// Both prefix and suffix
<Input
  type="number"
  placeholder="0.00"
  startAdornment={
    <InputAdornment position="start">$</InputAdornment>
  }
  endAdornment={
    <InputAdornment position="end">.00</InputAdornment>
  }
/>

// With clickable icon (button)
<Input
  type="password"
  placeholder="Password"
  endAdornment={
    <InputAdornment position="end" disablePointerEvents={false}>
      <IconButton
        size="sm"
        variant="ghost"
        onClick={() => setShowPassword(!showPassword)}
        aria-label="Toggle password visibility"
      >
        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
      </IconButton>
    </InputAdornment>
  }
/>

// With loading spinner
<Input
  placeholder="Searching..."
  endAdornment={
    <InputAdornment position="end">
      <Spinner size="sm" />
    </InputAdornment>
  }
/>

// URL input with protocol
<Input
  type="url"
  placeholder="example.com"
  startAdornment={
    <InputAdornment position="start">
      <span className="text-muted-foreground">https://</span>
    </InputAdornment>
  }
/>

// Complete search example
function SearchInput() {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    setLoading(true)
    // Perform search...
    setLoading(false)
  }

  return (
    <Input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search..."
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon className="h-4 w-4" />
        </InputAdornment>
      }
      endAdornment={
        <InputAdornment position="end" disablePointerEvents={false}>
          {loading ? (
            <Spinner size="sm" />
          ) : query ? (
            <IconButton
              size="sm"
              variant="ghost"
              onClick={() => setQuery('')}
              aria-label="Clear search"
            >
              <XIcon className="h-4 w-4" />
            </IconButton>
          ) : null}
        </InputAdornment>
      }
    />
  )
}
```

---

### TextField

Input with integrated label and helper text.

#### Import

```tsx
import { TextField } from '@onesaz/ui'
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Field label |
| `helperText` | `string` | - | Helper text |
| `errorMessage` | `string` | - | Error message |
| `required` | `boolean` | `false` | Required field |
| `disabled` | `boolean` | `false` | Disabled state |
| `fullWidth` | `boolean` | `false` | Full width |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Field size |
| `type` | `string` | `'text'` | Input type |

#### Examples

```tsx
// Basic text field
<TextField
  label="Email"
  placeholder="you@example.com"
  helperText="We'll never share your email"
/>

// Required field
<TextField
  label="Username"
  required
  placeholder="Enter username"
/>

// With error
<TextField
  label="Email"
  errorMessage="Please enter a valid email"
/>

// Sizes
<TextField label="Small" size="sm" />
<TextField label="Medium" size="md" />
<TextField label="Large" size="lg" />

// Full width
<TextField label="Full Width" fullWidth />

// With input adornment
<TextField
  label="Amount"
  type="number"
  startAdornment={<InputAdornment position="start">$</InputAdornment>}
  endAdornment={<InputAdornment position="end">.00</InputAdornment>}
/>
```

#### Stories

Available Storybook stories:
- **Default** - Basic email field with placeholder
- **WithHelperText** - Password field with helper text
- **WithError** - Email field showing `errorMessage`
- **Required** - Required field with asterisk
- **Sizes** - All three sizes (`sm`, `md`, `lg`) side by side
- **Disabled** - Disabled text field
- **FullWidth** - Full-width text field
- **InputTypes** - Different `type` values (text, email, password, number, tel, url)
- **WithStartAdornment** - Field with icon/text before the input
- **WithEndAdornment** - Field with icon/text after the input
- **WithInputAdornment** - Field using `InputAdornment` component
- **FormExample** - Multi-field form using `TextField`
- **LoginForm** - Full login form example

---

### Textarea

Multi-line text input component for longer text content.

#### Import

```tsx
import { Textarea } from '@onesaz/ui'
```

#### Props

Extends standard HTML textarea attributes.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placeholder` | `string` | - | Placeholder text |
| `disabled` | `boolean` | `false` | Disable textarea |
| `rows` | `number` | - | Number of visible rows |
| `value` | `string` | - | Controlled value |
| `defaultValue` | `string` | - | Default value (uncontrolled) |
| `onChange` | `(event: ChangeEvent) => void` | - | Change handler |
| `className` | `string` | - | Additional CSS classes |

#### Examples

```tsx
// Basic textarea
<Textarea placeholder="Enter text..." />

// With rows
<Textarea rows={4} placeholder="Enter description..." />
<Textarea rows={10} placeholder="Long text..." />

// With label (using FormControl)
<FormControl>
  <FormLabel>Description</FormLabel>
  <Textarea placeholder="Enter a description..." rows={4} />
  <FormHelperText>Provide a detailed description</FormHelperText>
</FormControl>

// Controlled
const [text, setText] = useState('')

<Textarea
  value={text}
  onChange={(e) => setText(e.target.value)}
  placeholder="Type something..."
  rows={5}
/>

// With character count
function TextareaWithCount() {
  const [text, setText] = useState('')
  const maxLength = 500

  return (
    <FormControl>
      <FormLabel>Bio</FormLabel>
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Tell us about yourself..."
        rows={4}
        maxLength={maxLength}
      />
      <FormHelperText>
        {text.length}/{maxLength} characters
      </FormHelperText>
    </FormControl>
  )
}

// Disabled
<Textarea disabled placeholder="Disabled textarea" rows={3} />

// With error state
<FormControl error>
  <FormLabel>Comments</FormLabel>
  <Textarea placeholder="Enter comments..." rows={4} />
  <FormHelperText error>Comments are required</FormHelperText>
</FormControl>

// In a form
function FeedbackForm() {
  const [feedback, setFeedback] = useState('')

  return (
    <Card>
      <CardHeader>
        <CardTitle>Feedback</CardTitle>
      </CardHeader>
      <CardContent>
        <FormControl>
          <FormLabel>Your Feedback</FormLabel>
          <Textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Share your thoughts..."
            rows={6}
          />
        </FormControl>
      </CardContent>
      <CardFooter>
        <Button>Submit Feedback</Button>
      </CardFooter>
    </Card>
  )
}
```

---

### Radio

Radio button group component.

#### Import

```tsx
import { RadioGroup, RadioGroupItem, Radio, Label } from '@onesaz/ui'
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | Controlled value |
| `defaultValue` | `string` | - | Default value |
| `onValueChange` | `(value: string) => void` | - | Change handler |
| `orientation` | `'horizontal' \| 'vertical'` | `'vertical'` | Layout direction |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Radio size |
| `disabled` | `boolean` | `false` | Disable all radios |

**Radio Sub-component Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | required | Radio value |
| `label` | `string` | - | Label text |
| `description` | `string` | - | Helper description below label |
| `disabled` | `boolean` | `false` | Disable individual radio |

#### Examples

```tsx
// Basic radio group
<RadioGroup defaultValue="option-1">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-1" id="r1" />
    <Label htmlFor="r1">Option 1</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-2" id="r2" />
    <Label htmlFor="r2">Option 2</Label>
  </div>
</RadioGroup>

// Using Radio component (with label integrated)
<RadioGroup defaultValue="comfortable">
  <Radio value="default" label="Default" />
  <Radio value="comfortable" label="Comfortable" />
  <Radio value="compact" label="Compact" />
</RadioGroup>

// With descriptions
<RadioGroup defaultValue="standard">
  <Radio
    value="standard"
    label="Standard"
    description="Basic account with limited features"
  />
  <Radio
    value="premium"
    label="Premium"
    description="All features with priority support"
  />
</RadioGroup>

// Horizontal
<RadioGroup orientation="horizontal" defaultValue="1">
  <Radio value="1" label="Option 1" />
  <Radio value="2" label="Option 2" />
  <Radio value="3" label="Option 3" />
</RadioGroup>

// Controlled
const [value, setValue] = useState('option-1')

<RadioGroup value={value} onValueChange={setValue}>
  <Radio value="option-1" label="Option 1" />
  <Radio value="option-2" label="Option 2" />
</RadioGroup>
```

#### Stories

Available Storybook stories:
- **Default** - Basic `RadioGroup` using `RadioGroupItem` + `Label`
- **WithRadioComponent** - Using the higher-level `Radio` component with `label` prop
- **WithDescriptions** - `Radio` items with `description` prop for extra context
- **Horizontal** - `orientation="horizontal"` radio group
- **Sizes** - All three sizes (sm, md, lg) stacked
- **Disabled** - Individual radio items set to `disabled`
- **WithFormControl** - Wrapped in `FormControl` + `FormLabel`
- **Controlled** - Fully controlled with state; shows selected value
- **PaymentMethods** - Real-world: card, PayPal, bank transfer, crypto selection
- **PlanSelection** - Real-world: highlighted plan-selection cards (free, pro, enterprise)

---

### Switch

Toggle switch component.

#### Import

```tsx
import { Switch, Label } from '@onesaz/ui'
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | - | Controlled checked state |
| `defaultChecked` | `boolean` | - | Default checked state (uncontrolled) |
| `onChange` | `(event: React.ChangeEvent<HTMLInputElement>) => void` | - | Change handler |
| `disabled` | `boolean` | `false` | Disable switch |

#### Examples

```tsx
import { useState } from 'react'
import { Switch, Label, FormControl, FormLabel, FormHelperText } from '@onesaz/ui'

// Basic switch (uncontrolled - works automatically)
<Switch defaultChecked={false} />

// With default checked state
<Switch defaultChecked={true} />

// With label
<div className="flex items-center space-x-2">
  <Switch id="airplane-mode" />
  <Label htmlFor="airplane-mode">Airplane Mode</Label>
</div>

// ✅ CONTROLLED (Recommended for ERP/Forms)
// For controlled behavior, you MUST use state management
function MyComponent() {
  const [enabled, setEnabled] = useState(false)

  return (
    <div className="flex items-center space-x-2">
      <Switch 
        id="notifications" 
        checked={enabled} 
        onChange={(e) => setEnabled(e.target.checked)} 
      />
      <Label htmlFor="notifications">
        Enable Notifications {enabled ? '(On)' : '(Off)'}
      </Label>
    </div>
  )
}

// Complete controlled example with form
function SettingsForm() {
  const [emailEnabled, setEmailEnabled] = useState(false)
  const [smsEnabled, setSmsEnabled] = useState(true)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({ emailEnabled, smsEnabled })
    // Submit to API...
  }

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing="md">
        <FormControl orientation="horizontal" className="justify-between">
          <div>
            <FormLabel>Email Notifications</FormLabel>
            <FormHelperText>Receive updates via email</FormHelperText>
          </div>
          <Switch 
            checked={emailEnabled} 
            onChange={(e) => setEmailEnabled(e.target.checked)} 
          />
        </FormControl>

        <FormControl orientation="horizontal" className="justify-between">
          <div>
            <FormLabel>SMS Notifications</FormLabel>
            <FormHelperText>Receive updates via SMS</FormHelperText>
          </div>
          <Switch 
            checked={smsEnabled} 
            onChange={(e) => setSmsEnabled(e.target.checked)} 
          />
        </FormControl>

        <Button type="submit">Save Settings</Button>
      </VStack>
    </form>
  )
}

// Disabled states
<Switch disabled />
<Switch disabled checked />

// With loading state
function SwitchWithLoading() {
  const [enabled, setEnabled] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = async (checked: boolean) => {
    setLoading(true)
    try {
      // API call
      await updateSettings({ enabled: checked })
      setEnabled(checked)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Switch 
      checked={enabled} 
      onChange={(e) => handleChange(e.target.checked)}
      disabled={loading}
    />
  )
}
```

#### Important Notes

⚠️ **For ERP/Dynamic Forms:** Always use **controlled mode** with `checked` and `onChange` props.

❌ **Wrong (won't update):**
```tsx
<Switch checked={someValue} /> // Missing onChange!
```

✅ **Correct:**
```tsx
const [value, setValue] = useState(false)
<Switch checked={value} onChange={(e) => setValue(e.target.checked)} />
```

#### Stories

Available Storybook stories:
- **Default** - Basic uncontrolled switch
- **Checked** - Default checked state (`defaultChecked={true}`)
- **Controlled** - Controlled switch with state; shows On/Off label
- **WithLabel** - Switch paired with a `Label` (e.g., "Airplane Mode")
- **Disabled** - Disabled switch

---

### Slider

Range slider component for selecting numeric values.

#### Import

```tsx
import { Slider } from '@onesaz/ui'
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | - | Controlled value |
| `defaultValue` | `number` | `50` | Default value (uncontrolled) |
| `onChange` | `(value: number) => void` | - | Change handler |
| `min` | `number` | `0` | Minimum value |
| `max` | `number` | `100` | Maximum value |
| `step` | `number` | `1` | Step increment |
| `disabled` | `boolean` | `false` | Disable slider |
| `showValue` | `boolean` | `false` | Show current value |
| `valuePosition` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Value label position |
| `valueFormatter` | `(value: number) => string` | - | Custom value formatter |

#### Examples

```tsx
// Basic slider (uncontrolled)
<Slider />

// With default value
<Slider defaultValue={75} />

// Controlled slider
const [value, setValue] = useState(50)

<Slider value={value} onChange={setValue} />

// Custom range
<Slider min={0} max={200} step={10} defaultValue={100} />

// With value display
<Slider showValue defaultValue={60} />

// Value at different positions
<Slider showValue valuePosition="bottom" defaultValue={50} />
<Slider showValue valuePosition="left" defaultValue={50} />
<Slider showValue valuePosition="right" defaultValue={50} />

// Custom value formatter
<Slider
  showValue
  defaultValue={50}
  valueFormatter={(value) => `${value}%`}
/>

// Full example with labels
function VolumeControl() {
  const [volume, setVolume] = useState(70)

  return (
    <FormControl>
      <FormLabel>Volume ({volume}%)</FormLabel>
      <Slider
        value={volume}
        onChange={setVolume}
        min={0}
        max={100}
        step={5}
      />
      <FormHelperText>Adjust the volume level</FormHelperText>
    </FormControl>
  )
}

// Price range slider
function PriceFilter() {
  const [price, setPrice] = useState(500)

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Max Price</label>
      <Slider
        value={price}
        onChange={setPrice}
        min={0}
        max={1000}
        step={50}
        showValue
        valueFormatter={(value) => `$${value}`}
      />
    </div>
  )
}

// Disabled slider
<Slider disabled defaultValue={50} />
```

#### Stories

Available Storybook stories:
- **Default** - Controlled slider from 0–100, value shown below
- **WithValueLabel** - `showValue` + `valuePosition="top"`, step 5
- **ValueOnBottom** - `valuePosition="bottom"`
- **ValueOnLeft** - `valuePosition="left"`
- **CustomFormatter** - Float range 0–1 with `valueFormatter` converting to percentage
- **Disabled** - Disabled slider
- **VolumeControl** - Practical volume control with `valuePosition="right"` and `%` formatter

---

### IconButton

Icon-only button component.

#### Import

```tsx
import { IconButton } from '@onesaz/ui'
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'destructive' \| 'outline' \| 'secondary' \| 'ghost' \| 'link'` | `'default'` | Button variant |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `rounded` | `boolean` | `false` | Fully rounded |
| `disabled` | `boolean` | `false` | Disable button |
| `aria-label` | `string` | - | Accessibility label (required) |

#### Examples

```tsx
// Basic icon button
<IconButton aria-label="Add">
  <PlusIcon />
</IconButton>

// Variants
<IconButton variant="default" aria-label="Edit">
  <EditIcon />
</IconButton>
<IconButton variant="outline" aria-label="Delete">
  <TrashIcon />
</IconButton>
<IconButton variant="ghost" aria-label="Settings">
  <SettingsIcon />
</IconButton>

// Sizes
<IconButton size="xs" aria-label="Small"><PlusIcon /></IconButton>
<IconButton size="sm" aria-label="Small"><PlusIcon /></IconButton>
<IconButton size="md" aria-label="Medium"><PlusIcon /></IconButton>
<IconButton size="lg" aria-label="Large"><PlusIcon /></IconButton>

// Rounded
<IconButton rounded aria-label="Add">
  <PlusIcon />
</IconButton>

// In toolbar
<div className="flex items-center gap-2">
  <IconButton variant="ghost" aria-label="Bold">
    <BoldIcon />
  </IconButton>
  <IconButton variant="ghost" aria-label="Italic">
    <ItalicIcon />
  </IconButton>
  <IconButton variant="ghost" aria-label="Underline">
    <UnderlineIcon />
  </IconButton>
</div>
```

#### Stories

Available Storybook stories:
- **Default** - Default variant with a plus icon
- **AllVariants** - All six variants side by side
- **AllSizes** - All four sizes (xs, sm, md, lg)
- **Rounded** - Rounded (fully circular) icon buttons across variants
- **RoundedSizes** - Rounded icon buttons at all sizes
- **Disabled** - Disabled state for default, destructive, and outline variants
- **ActionBar** - Practical action bar with ghost icon buttons and a divider

---

### Typography

Text and heading components.

#### Import

```tsx
import { 
  Typography, 
  H1, H2, H3, H4, H5, H6, 
  Text, Caption 
} from '@onesaz/ui'
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6' \| 'subtitle1' \| 'subtitle2' \| 'body1' \| 'body2' \| 'caption' \| 'overline'` | `'body1'` | Typography variant |
| `color` | `'inherit' \| 'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error' \| 'info' \| 'muted' \| 'white' \| 'dark'` | `'inherit'` | Text color |
| `fontWeight` | `'light' \| 'regular' \| 'medium' \| 'semibold' \| 'bold'` | - | Font weight |
| `align` | `'left' \| 'center' \| 'right' \| 'justify'` | `'left'` | Text alignment |
| `truncate` | `boolean` | `false` | Truncate with ellipsis |
| `textTransform` | `'uppercase' \| 'lowercase' \| 'capitalize' \| 'none'` | - | CSS text-transform |
| `textGradient` | `boolean` | `false` | Apply gradient text effect |
| `gradientColor` | `'primary' \| 'info' \| 'success' \| 'warning' \| 'error' \| 'dark'` | - | Gradient color (requires `textGradient`) |
| `gutterBottom` | `boolean` | `false` | Add bottom margin spacing |
| `noWrap` | `boolean` | `false` | Prevent wrapping, truncate with ellipsis |
| `paragraph` | `boolean` | `false` | Render as `<p>` with bottom margin |
| `as` | `React.ElementType` | - | Polymorphic: render as a different element |

#### Examples

```tsx
// Using Typography component
<Typography variant="h1">Heading 1</Typography>
<Typography variant="h2">Heading 2</Typography>
<Typography variant="body1">Body text</Typography>
<Typography variant="caption">Caption text</Typography>

// Using helper components
<H1>Heading 1</H1>
<H2>Heading 2</H2>
<H3>Heading 3</H3>
<H4>Heading 4</H4>
<H5>Heading 5</H5>
<H6>Heading 6</H6>
<Text>Body text</Text>
<Caption>Caption text</Caption>

// With colors
<Typography variant="h3" color="primary">Primary Color</Typography>
<Typography variant="h3" color="success">Success Color</Typography>
<Typography variant="h3" color="error">Error Color</Typography>
<Typography variant="h3" color="muted">Muted Color</Typography>

// Font weights
<Typography fontWeight="light">Light</Typography>
<Typography fontWeight="regular">Regular</Typography>
<Typography fontWeight="medium">Medium</Typography>
<Typography fontWeight="semibold">Semibold</Typography>
<Typography fontWeight="bold">Bold</Typography>

// Alignment
<Typography align="left">Left aligned</Typography>
<Typography align="center">Center aligned</Typography>
<Typography align="right">Right aligned</Typography>

// Truncate
<Typography truncate className="max-w-xs">
  This is a very long text that will be truncated with an ellipsis
</Typography>

// Text transform
<Typography textTransform="uppercase">UPPERCASE text</Typography>
<Typography textTransform="lowercase">lowercase text</Typography>
<Typography textTransform="capitalize">Capitalize text</Typography>

// Gradient text
<Typography variant="h2" textGradient gradientColor="primary">Primary Gradient</Typography>
<Typography variant="h2" textGradient gradientColor="success">Success Gradient</Typography>

// Gutter bottom
<Typography variant="h3" gutterBottom>Heading with gutter</Typography>
<Typography variant="body1">Paragraph that follows with proper spacing.</Typography>

// No wrap (truncate with overflow)
<div className="w-48">
  <Typography noWrap>Very long text that will be truncated...</Typography>
</div>

// Paragraph (adds bottom margin like a <p> tag)
<Typography paragraph>First paragraph with bottom margin.</Typography>
<Typography paragraph>Second paragraph.</Typography>

// Polymorphic (render as a different element)
<Typography as="span" variant="h4">H4 styled as span</Typography>
<Typography as="div" variant="body1">Body1 styled as div</Typography>
<Typography as="label" variant="body2">Body2 styled as label</Typography>
```

#### Stories

Available Storybook stories:
- **Default** - Default body1 typography
- **AllVariants** - All 12 variants (h1–h6, subtitle1–2, body1–2, caption, overline)
- **HelperComponents** - H1–H6, Text, and Caption shorthand components
- **Colors** - All color options including `white` and `dark`
- **FontWeights** - All five font weights
- **TextTransform** - uppercase, lowercase, capitalize, none
- **TextAlignment** - left, center, right, justify
- **TextGradient** - Gradient effect with all gradient color options
- **GutterBottom** - Heading with `gutterBottom` followed by body text
- **NoWrap** - Overflow truncation in a constrained container
- **Paragraph** - Multiple paragraphs with `paragraph` prop spacing
- **PolymorphicAs** - Rendering different HTML elements using `as` prop

---

### Stack / HStack / VStack

Flexbox layout components for arranging children.

#### Import

```tsx
import { Stack, HStack, VStack } from '@onesaz/ui'
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `direction` | `'row' \| 'column' \| 'row-reverse' \| 'column-reverse'` | `'row'` | Flex direction |
| `spacing` |  `number \| string` | `0` | Gap between children |
| `align` | `'start' \| 'end' \| 'center' \| 'baseline' \| 'stretch'` | `'stretch'` | Align items |
| `justify` | `'start' \| 'end' \| 'center' \| 'between' \| 'around' \| 'evenly'` | `'start'` | Justify content |
| `wrap` | `boolean` | `false` | Allow wrapping |
| `divider` | `React.ReactNode` | - | Divider between items |

#### Examples

```tsx
// Horizontal stack (default)
<Stack direction="row" spacing={4}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Stack>

// Using HStack helper
<HStack spacing={4}>
  <Button>Button 1</Button>
  <Button>Button 2</Button>
  <Button>Button 3</Button>
</HStack>

// Vertical stack
<VStack spacing={4}>
  <Card>Card 1</Card>
  <Card>Card 2</Card>
  <Card>Card 3</Card>
</VStack>

// With alignment
<HStack spacing={4} align="center" justify="between">
  <Text>Label</Text>
  <Button>Action</Button>
</HStack>

// With divider
<VStack spacing={4} divider={<Separator />}>
  <div>Section 1</div>
  <div>Section 2</div>
  <div>Section 3</div>
</VStack>

// Wrap items
<HStack spacing={2} wrap>
  <Badge>Tag 1</Badge>
  <Badge>Tag 2</Badge>
  <Badge>Tag 3</Badge>
  <Badge>Tag 4</Badge>
  <Badge>Tag 5</Badge>
</HStack>
```

#### Stories

Available Storybook stories:
- **Default** - Vertical stack with Box items
- **Horizontal** - Stack with `direction="row"`
- **HStackHelper** - Using the `HStack` shorthand
- **VStackHelper** - Using the `VStack` shorthand
- **WithDivider** - Stack with `Separator` dividers between items
- **Alignment** - `align` options (start, center, end) side-by-side
- **Justification** - `justify` options (start, center, end, between) side-by-side
- **Wrapping** - `wrap` prop with many items

---

### Grid

CSS Grid layout component.

#### Import

```tsx
import { Grid } from '@onesaz/ui'
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `container` | `boolean` | `false` | Grid container |
| `item` | `boolean` | `false` | Grid item |
| `columns` | `number` | `12` | Number of columns |
| `spacing` | `number \| string` | `0` | Gap between items |
| `xs, sm, md, lg, xl` | `number` | - | Responsive column spans |

#### Examples

```tsx
// Basic grid
<Grid container columns={12} spacing={4}>
  <Grid item xs={12}>
    <div>Full width</div>
  </Grid>
  <Grid item xs={6}>
    <div>Half width</div>
  </Grid>
  <Grid item xs={6}>
    <div>Half width</div>
  </Grid>
</Grid>

// Responsive grid
<Grid container spacing={4}>
  <Grid item xs={12} sm={6} md={4} lg={3}>
    <Card>Item 1</Card>
  </Grid>
  <Grid item xs={12} sm={6} md={4} lg={3}>
    <Card>Item 2</Card>
  </Grid>
  <Grid item xs={12} sm={6} md={4} lg={3}>
    <Card>Item 3</Card>
  </Grid>
  <Grid item xs={12} sm={6} md={4} lg={3}>
    <Card>Item 4</Card>
  </Grid>
</Grid>

// Unequal columns
<Grid container columns={12} spacing={4}>
  <Grid item xs={12} md={8}>
    <Card>Main content (8 columns)</Card>
  </Grid>
  <Grid item xs={12} md={4}>
    <Card>Sidebar (4 columns)</Card>
  </Grid>
</Grid>
```

#### Stories

Available Storybook stories:
- **Default** - 12-column grid with full-width, half-width, and third-width items
- **ResponsiveGrid** - Grid items that reflow across xs, sm, md, lg breakpoints
- **UnequalColumns** - Main content (8 cols) + sidebar (4 cols) layout
- **ThreeColumnLayout** - Left sidebar, main content, right sidebar
- **CardGrid** - Responsive card grid (1 → 2 → 3 columns)
- **DifferentSpacing** - Comparing spacing={2}, spacing={4}, spacing={8}
- **NestedGrid** - Grid nested inside a parent grid item

---

### Separator

Visual divider component for creating horizontal or vertical separators.

#### Import

```tsx
import { Separator } from '@onesaz/ui'
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Separator orientation |
| `className` | `string` | - | Additional CSS classes |

#### Examples

```tsx
// Horizontal separator (default)
<Separator />

// Vertical separator
<div className="flex h-10">
  <div>Item 1</div>
  <Separator orientation="vertical" />
  <div>Item 2</div>
</div>

// In a list
<VStack spacing={4} divider={<Separator />}>
  <div>Section 1</div>
  <div>Section 2</div>
  <div>Section 3</div>
</VStack>

// In a menu
<div className="py-2">
  <MenuItem>Profile</MenuItem>
  <MenuItem>Settings</MenuItem>
  <Separator className="my-2" />
  <MenuItem>Logout</MenuItem>
</div>

// Between content sections
<div>
  <H2>Section 1</H2>
  <Text>Content for section 1...</Text>
  
  <Separator className="my-6" />
  
  <H2>Section 2</H2>
  <Text>Content for section 2...</Text>
</div>

// In a card
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <Separator />
  <CardContent>
    <p>Card content</p>
  </CardContent>
  <Separator />
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>

// Vertical in toolbar
<div className="flex items-center gap-2 h-8">
  <Button variant="ghost" size="icon">
    <BoldIcon />
  </Button>
  <Button variant="ghost" size="icon">
    <ItalicIcon />
  </Button>
  <Separator orientation="vertical" className="mx-1" />
  <Button variant="ghost" size="icon">
    <LinkIcon />
  </Button>
  <Button variant="ghost" size="icon">
    <ImageIcon />
  </Button>
</div>

// Styled separator
<Separator className="bg-primary" />
<Separator className="bg-gradient-to-r from-transparent via-primary to-transparent" />
```

---

### Table

Basic HTML table component.

#### Import

```tsx
import { 
  Table,
  TableHeader, 
  TableBody, 
  TableFooter,
  TableRow, 
  TableHead, 
  TableCell,
  TableCaption 
} from '@onesaz/ui'
```

#### Examples

```tsx
// Basic table
<Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>INV001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>$250.00</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>INV002</TableCell>
      <TableCell>Pending</TableCell>
      <TableCell>$150.00</TableCell>
    </TableRow>
  </TableBody>
</Table>

// With footer
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Product</TableHead>
      <TableHead>Quantity</TableHead>
      <TableHead className="text-right">Price</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Widget A</TableCell>
      <TableCell>2</TableCell>
      <TableCell className="text-right">$50.00</TableCell>
    </TableRow>
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell colSpan={2}>Total</TableCell>
      <TableCell className="text-right">$50.00</TableCell>
    </TableRow>
  </TableFooter>
</Table>

// Alternative compound syntax (both patterns work)
<Table.Root>
  <Table.Caption>Caption text</Table.Caption>
  <Table.Header>
    <Table.Row>
      <Table.Head>Name</Table.Head>
      <Table.Head>Value</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    <Table.Row>
      <Table.Cell>Item 1</Table.Cell>
      <Table.Cell>100</Table.Cell>
    </Table.Row>
  </Table.Body>
  <Table.Footer>
    <Table.Row>
      <Table.Cell colSpan={2}>Total: 100</Table.Cell>
    </Table.Row>
  </Table.Footer>
</Table.Root>
```

> **Note:** The Table component supports both named imports (`TableHeader`, `TableBody`, etc.) and a compound component pattern (`Table.Header`, `Table.Body`, etc.). Both are equivalent.

#### Stories

Available Storybook stories:
- **Default** - Full table with caption, header, body rows, and striped styling
- **WithFooter** - Table with a total row in the footer
- **Simple** - Minimal table without caption or footer

---

### List

Styled list component for displaying items.

#### Import

```tsx
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemAvatar,
  ListSubheader,
  ListDivider
} from '@onesaz/ui'
```

#### Examples

```tsx
// Basic list
<List>
  <ListItem>
    <ListItemText primary="Item 1" />
  </ListItem>
  <ListItem>
    <ListItemText primary="Item 2" />
  </ListItem>
</List>

// With secondary text
<List>
  <ListItem>
    <ListItemText
      primary="Brunch this weekend?"
      secondary="Ali Connors — I'll be in your neighborhood"
    />
  </ListItem>
</List>

// With icons
<List>
  <ListItem>
    <ListItemIcon><InboxIcon /></ListItemIcon>
    <ListItemText primary="Inbox" />
  </ListItem>
  <ListItem>
    <ListItemIcon><StarIcon /></ListItemIcon>
    <ListItemText primary="Starred" />
  </ListItem>
</List>

// With avatars
<List>
  <ListItem>
    <ListItemAvatar>
      <Avatar fallback="JD" />
    </ListItemAvatar>
    <ListItemText
      primary="John Doe"
      secondary="john@example.com"
    />
  </ListItem>
</List>

// With subheaders and dividers
<List>
  <ListSubheader>Section 1</ListSubheader>
  <ListItem>
    <ListItemText primary="Item 1" />
  </ListItem>
  <ListDivider />
  <ListSubheader>Section 2</ListSubheader>
  <ListItem>
    <ListItemText primary="Item 2" />
  </ListItem>
</List>

// Interactive list
<List>
  <ListItem button onClick={() => console.log('clicked')}>
    <ListItemText primary="Clickable item" />
  </ListItem>
</List>
```

#### Stories

Available Storybook stories:
- **Default** - Basic list with primary text
- **WithSecondaryText** - Items with primary and secondary text
- **WithIcons** - List items with leading icons
- **WithAvatars** - List items with avatar thumbnails
- **Clickable** - Interactive list with `button` items and hover states
- **WithSecondaryAction** - Items with trailing action buttons
- **WithSubheaders** - Grouped lists with subheader labels
- **Dense** - Compact/dense list variant
- **SelectedState** - Items with selected highlighting
- **NoDividers** - List without item dividers

---

### Tooltip

Contextual tooltip component.

#### Import

```tsx
import { Tooltip } from '@onesaz/ui'
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `React.ReactNode` | - | Tooltip content |
| `side` | `'top' \| 'right' \| 'bottom' \| 'left'` | `'top'` | Tooltip position |
| `align` | `'start' \| 'center' \| 'end'` | `'center'` | Tooltip alignment |
| `delayDuration` | `number` | `200` | Delay before showing (ms) |
| `showArrow` | `boolean` | `false` | Show arrow pointer |
| `disabled` | `boolean` | `false` | Disable the tooltip entirely |

#### Examples

```tsx
// Basic tooltip
<Tooltip content="This is a tooltip">
  <Button>Hover me</Button>
</Tooltip>

// Different positions
<Tooltip content="Top tooltip" side="top">
  <Button>Top</Button>
</Tooltip>
<Tooltip content="Right tooltip" side="right">
  <Button>Right</Button>
</Tooltip>
<Tooltip content="Bottom tooltip" side="bottom">
  <Button>Bottom</Button>
</Tooltip>
<Tooltip content="Left tooltip" side="left">
  <Button>Left</Button>
</Tooltip>

// With arrow
<Tooltip content="Tooltip with arrow" showArrow>
  <Button>With Arrow</Button>
</Tooltip>

// Custom delay
<Tooltip content="No delay" delayDuration={0}>
  <Button>Instant</Button>
</Tooltip>
<Tooltip content="Slow delay" delayDuration={1000}>
  <Button>Slow</Button>
</Tooltip>

// On icon button
<Tooltip content="Settings">
  <IconButton aria-label="Settings">
    <SettingsIcon />
  </IconButton>
</Tooltip>

// Complex content
<Tooltip
  content={
    <div className="space-y-1">
      <p className="font-semibold">John Doe</p>
      <p className="text-xs">john@example.com</p>
    </div>
  }
>
  <Avatar fallback="JD" />
</Tooltip>

// Disabled tooltip (won't show on hover)
<Tooltip content="This won't show" disabled>
  <Button variant="outline">Disabled Tooltip</Button>
</Tooltip>
```

#### Stories

Available Storybook stories:
- **Default** - Basic tooltip on a button
- **Positions** - All four sides (top, right, bottom, left)
- **Alignments** - start, center, end alignment
- **WithDelay** - No delay, 200ms, 500ms, 1000ms variants
- **WithArrow** - Arrow vs no-arrow comparison
- **LongContent** - Longer tooltip message text
- **OnIconButton** - Tooltip wrapping edit, delete, settings `IconButton`s
- **Disabled** - Disabled tooltip compared with enabled tooltip
- **RealWorldExample** - Text-editor toolbar with Bold/Italic/Underline/Align icon buttons and tooltips

---

### Progress

Progress indicator components (linear and circular).

#### Import

```tsx
import { LinearProgress, CircularProgress, Progress } from '@onesaz/ui'
```

**LinearProgress / Progress Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | - | Progress value (0-100); omit for indeterminate |
| `variant` | `'default' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'default'` | Progress variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Progress bar height |
| `showValue` | `boolean` | `false` | Show percentage label |
| `formatValue` | `(value: number) => string` | - | Custom value formatter |

> **Note:** `Progress` is an alias for `LinearProgress`.

**CircularProgress Additional Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| number` | `'md'` | Circle size (preset or px number) |
| `thickness` | `number` | - | Stroke thickness in px |
| `children` | `React.ReactNode` | - | Custom center content |

#### Examples

```tsx
// Linear progress - determinate
<LinearProgress value={60} />

// Linear progress - indeterminate
<LinearProgress />

// Sizes
<LinearProgress value={60} size="sm" />
<LinearProgress value={60} size="md" />
<LinearProgress value={60} size="lg" />

// Variants
<LinearProgress value={60} variant="default" />
<LinearProgress value={60} variant="success" />
<LinearProgress value={60} variant="warning" />
<LinearProgress value={60} variant="error" />
<LinearProgress value={60} variant="info" />

// With value display
<LinearProgress value={45} showValue />
<LinearProgress
  value={75}
  showValue
  formatValue={(v) => `${v}% complete`}
/>

// Circular progress
<CircularProgress value={60} />
<CircularProgress /> {/* Indeterminate */}

// Circular with size preset and custom thickness
<CircularProgress value={60} size="sm" />
<CircularProgress value={60} size="md" />
<CircularProgress value={60} size="lg" />
<CircularProgress value={60} size="xl" />
<CircularProgress value={60} size={100} thickness={8} />

// Circular with value shown
<CircularProgress value={75} showValue size="lg" />

// Circular with custom center content (children)
<CircularProgress value={75} size="xl">
  <div className="text-center">
    <div className="text-lg font-bold">75%</div>
    <div className="text-xs text-muted-foreground">Complete</div>
  </div>
</CircularProgress>

// Usage in loading state
function FileUpload() {
  const [progress, setProgress] = useState(0)

  return (
    <div className="w-full space-y-2">
      <p>Uploading file...</p>
      <LinearProgress value={progress} showValue />
    </div>
  )
}
```

#### Stories

Available Storybook stories:
- **Default** - LinearProgress at 60%
- **LinearDeterminate** - LinearProgress at 25, 50, 75, 100%
- **LinearIndeterminate** - LinearProgress with no value (animated)
- **LinearSizes** - sm, md, lg sizes
- **LinearVariants** - All five variants
- **LinearWithValue** - `showValue` and custom `formatValue`
- **CircularDeterminate** - CircularProgress at 25, 50, 75, 100%
- **CircularIndeterminate** - Spinning indeterminate circle
- **CircularSizes** - sm, md, lg, xl, and custom numeric size with `thickness`
- **CircularVariants** - All five variants
- **CircularWithValue** - `showValue` at multiple sizes
- **CircularWithCustomContent** - Custom JSX center content via `children`
- **Animated** - Live animated progress cycling 0→100% for both linear and circular
- **ProgressAlias** - Demonstrates that `Progress` is identical to `LinearProgress`

---

### Skeleton

Loading placeholder components.

#### Import

```tsx
import { 
  Skeleton, 
  SkeletonText, 
  SkeletonAvatar,
  SkeletonCard,
  SkeletonTableRow 
} from '@onesaz/ui'
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'text' \| 'circular' \| 'rectangular' \| 'rounded'` | `'text'` | Skeleton variant |
| `animation` | `'pulse' \| 'wave' \| 'none'` | `'pulse'` | Animation type |
| `width` | `number \| string` | `'100%'` | Skeleton width |
| `height` | `number \| string` | - | Skeleton height |

**SkeletonText Additional Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `lines` | `number` | `3` | Number of text lines |
| `lastLineWidth` | `number` | - | Last line width as percentage |
| `gap` | `'sm' \| 'md' \| 'lg'` | `'md'` | Gap between lines |

**SkeletonCard Additional Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `hasImage` | `boolean` | `true` | Include an image placeholder at the top |

#### Examples

```tsx
// Basic skeleton
<Skeleton width={200} height={20} />

// Variants
<Skeleton variant="text" width="100%" />
<Skeleton variant="circular" width={40} height={40} />
<Skeleton variant="rectangular" width="100%" height={100} />
<Skeleton variant="rounded" width="100%" height={100} />

// Animations
<Skeleton animation="pulse" />
<Skeleton animation="wave" />
<Skeleton animation="none" />

// Text skeleton (multiple lines)
<SkeletonText lines={3} />
<SkeletonText lines={5} lastLineWidth={80} />
<SkeletonText lines={3} gap="lg" />

// Avatar skeleton (all sizes)
<SkeletonAvatar size="xs" />
<SkeletonAvatar size="sm" />
<SkeletonAvatar size="md" />
<SkeletonAvatar size="lg" />
<SkeletonAvatar size="xl" />

// Card skeleton
<SkeletonCard />
<SkeletonCard hasImage />
<SkeletonCard hasImage={false} />

// Custom loading skeleton
<Card>
  <CardHeader>
    <Skeleton variant="text" width="60%" height={24} />
    <Skeleton variant="text" width="80%" height={16} />
  </CardHeader>
  <CardContent>
    <Skeleton variant="rectangular" width="100%" height={200} />
  </CardContent>
</Card>

// Table row skeleton
<Table>
  <TableBody>
    <SkeletonTableRow columns={3} />
    <SkeletonTableRow columns={3} />
    <SkeletonTableRow columns={3} />
  </TableBody>
</Table>
```

#### Stories

Available Storybook stories:
- **Default** - Single skeleton rectangle (width 200, height 20)
- **Variants** - All four variants (text, circular, rectangular, rounded)
- **Animations** - pulse, wave, and none animations
- **TextSkeleton** - `SkeletonText` with 3 lines
- **TextSkeletonVariations** - Default 3 lines, 5 lines with `lastLineWidth`, and `gap="lg"`
- **AvatarSkeleton** - `SkeletonAvatar` at all sizes (xs → xl)
- **CardSkeleton** - Default `SkeletonCard`
- **CardSkeletonVariations** - `SkeletonCard` with `hasImage={true}` vs `hasImage={false}`
- **TableRowSkeleton** - `SkeletonTableRow` with 4 columns repeated 3 times
- **CompleteExample** - Full card loading skeleton with avatar, text lines, and action buttons

---

### Spinner

Loading spinner component.

#### Import

```tsx
import { Spinner } from '@onesaz/ui'
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'default' \| 'lg'` | `'default'` | Spinner size |

#### Examples

```tsx
// Basic spinner
<Spinner />

// Sizes
<Spinner size="sm" />
<Spinner size="default" />
<Spinner size="lg" />

// With button
<Button disabled>
  <Spinner size="sm" className="mr-2" />
  Loading...
</Button>

// Centered in page
<div className="flex items-center justify-center h-screen">
  <Spinner size="lg" />
</div>

// In card
<Card>
  <CardContent className="flex items-center justify-center py-12">
    <Spinner />
  </CardContent>
</Card>
```

#### Stories

Available Storybook stories:
- **Default** - Default size spinner
- **Small** - `size="sm"`
- **Large** - `size="lg"`
- **AllSizes** - sm, default, lg side by side
- **WithButton** - Spinner inside a disabled `Button` (loading state)

---

### Drawer

Side panel overlay component.

#### Import

```tsx
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
  DrawerFooter,
  DrawerClose
} from '@onesaz/ui'
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `side` | `'left' \| 'right' \| 'top' \| 'bottom'` | `'right'` | Drawer position |
| `open` | `boolean` | - | Controlled open state |
| `onOpenChange` | `(open: boolean) => void` | - | Open state change handler |

#### Examples

```tsx
// Basic drawer
<Drawer>
  <DrawerTrigger asChild>
    <Button>Open Drawer</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Drawer Title</DrawerTitle>
      <DrawerDescription>Drawer description</DrawerDescription>
    </DrawerHeader>
    <DrawerBody>
      <p>Drawer content goes here</p>
    </DrawerBody>
    <DrawerFooter>
      <DrawerClose asChild>
        <Button variant="outline">Cancel</Button>
      </DrawerClose>
      <Button>Save</Button>
    </DrawerFooter>
  </DrawerContent>
</Drawer>

// Different sides
<Drawer>
  <DrawerTrigger asChild>
    <Button>Left Drawer</Button>
  </DrawerTrigger>
  <DrawerContent side="left">
    <DrawerHeader>
      <DrawerTitle>Left Drawer</DrawerTitle>
    </DrawerHeader>
    <DrawerBody>Content</DrawerBody>
  </DrawerContent>
</Drawer>

// Controlled
const [open, setOpen] = useState(false)

<Drawer open={open} onOpenChange={setOpen}>
  <DrawerTrigger asChild>
    <Button>Open</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Drawer</DrawerTitle>
    </DrawerHeader>
    <DrawerBody>
      <Button onClick={() => setOpen(false)}>Close</Button>
    </DrawerBody>
  </DrawerContent>
</Drawer>

// Form in drawer
<Drawer>
  <DrawerTrigger asChild>
    <Button>Add Item</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Add New Item</DrawerTitle>
    </DrawerHeader>
    <DrawerBody>
      <form>
        <VStack spacing="md">
          <TextField label="Name" />
          <TextField label="Description" />
        </VStack>
      </form>
    </DrawerBody>
    <DrawerFooter>
      <DrawerClose asChild>
        <Button variant="outline">Cancel</Button>
      </DrawerClose>
      <Button>Add Item</Button>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
```

#### Stories

Available Storybook stories:
- **Default** - Right-side drawer (default position)
- **LeftSide** - Drawer sliding in from the left
- **TopSide** - Drawer sliding down from the top
- **BottomSide** - Drawer sliding up from the bottom
- **AllSides** - Four buttons each opening a drawer from a different side
- **WithForm** - Drawer containing a form with inputs
- **NoCloseButton** - Drawer without the built-in close button
- **LongContent** - Scrollable drawer with tall content
- **SheetAlias** - Using `Sheet` / `SheetContent` (alias for Drawer)
- **NavigationDrawer** - Mobile-style navigation menu in a drawer

---

### DropdownMenu

Dropdown menu component with items, checkboxes, and radio groups.

#### Import

```tsx
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup
} from '@onesaz/ui'
```

#### Examples

```tsx
// Basic dropdown menu
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Open Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Log out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

// With icons and shortcuts
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button>Actions</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>
      <EditIcon className="mr-2 h-4 w-4" />
      Edit
      <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuItem>
      <CopyIcon className="mr-2 h-4 w-4" />
      Copy
      <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

// With checkboxes
const [showPanel, setShowPanel] = useState(false)

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button>View Options</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Appearance</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuCheckboxItem
      checked={showPanel}
      onCheckedChange={setShowPanel}
    >
      Show Panel
    </DropdownMenuCheckboxItem>
  </DropdownMenuContent>
</DropdownMenu>

// With radio group
const [position, setPosition] = useState('bottom')

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button>Position</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
      <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
    </DropdownMenuRadioGroup>
  </DropdownMenuContent>
</DropdownMenu>

// With submenu
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button>More Options</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>More Tools</DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuItem>Save Page As...</DropdownMenuItem>
        <DropdownMenuItem>Create Shortcut...</DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Settings</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

#### Stories

Available Storybook stories:
- **Default** - Basic dropdown with label, separator, and menu items
- **WithIcons** - Menu items with leading icons and keyboard shortcuts
- **WithCheckboxes** - Checkbox items for toggling options
- **WithRadioGroup** - Radio group for mutually exclusive selection
- **WithSubmenus** - Nested submenus with `DropdownMenuSub`
- **UserMenu** - Avatar-triggered user account menu
- **ContextMenuStyle** - Context-menu style with checkboxes, radios, and submenus
- **ActionMenu** - Simple action menus (text button and icon button variants)

---

### AlertDialog

Confirmation dialog component.

#### Import

```tsx
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel
} from '@onesaz/ui'
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | - | Controlled open state |
| `onOpenChange` | `(open: boolean) => void` | - | Open state change handler |
| `variant` | `'default' \| 'destructive' \| 'success' \| 'warning' \| 'info'` | `'default'` | Dialog variant |

#### Examples

```tsx
// Basic alert dialog
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button>Delete</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your
        account and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

// Destructive action
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Delete Account</Button>
  </AlertDialogTrigger>
  <AlertDialogContent variant="destructive">
    <AlertDialogHeader>
      <AlertDialogTitle>Delete Account</AlertDialogTitle>
      <AlertDialogDescription>
        Are you sure? All your data will be permanently removed.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction className="bg-destructive hover:bg-destructive/90">
        Delete Account
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

// Success confirmation
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button>Confirm Payment</Button>
  </AlertDialogTrigger>
  <AlertDialogContent variant="success">
    <AlertDialogHeader>
      <AlertDialogTitle>Payment Successful</AlertDialogTitle>
      <AlertDialogDescription>
        Your payment of $99.00 has been processed successfully.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogAction>Done</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

// With async action
function DeleteButton({ onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await onDelete()
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
```

#### Stories

Available Storybook stories:
- **Default** - Basic confirmation dialog
- **Destructive** - Destructive action variant (delete)
- **Success** - Success confirmation variant
- **Warning** - Warning variant
- **Info** - Info variant (`variant="info"`)
- **AllVariants** - All five variants shown together

---

### Sidebar

Side navigation component.

#### Import

```tsx
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarItem,
  SidebarSubMenu,
  SidebarToggle
} from '@onesaz/ui'
```

#### Props

**Sidebar Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `collapsed` | `boolean` | `false` | Collapsed (icon-only) state |
| `onCollapsedChange` | `(collapsed: boolean) => void` | - | Callback when collapse state changes |
| `bordered` | `boolean` | `true` | Show right border |
| `className` | `string` | - | Additional CSS classes |

#### Examples

```tsx
// Basic sidebar
<Sidebar>
  <SidebarHeader>
    <div className="flex items-center gap-2">
      <LogoIcon />
      <span className="font-semibold">App Name</span>
    </div>
  </SidebarHeader>
  <SidebarContent>
    <SidebarGroup>
      <SidebarItem icon={<HomeIcon />} active>
        Dashboard
      </SidebarItem>
      <SidebarItem icon={<UsersIcon />}>
        Users
      </SidebarItem>
      <SidebarItem icon={<SettingsIcon />}>
        Settings
      </SidebarItem>
    </SidebarGroup>
  </SidebarContent>
  <SidebarFooter>
    <SidebarItem icon={<LogoutIcon />}>
      Logout
    </SidebarItem>
  </SidebarFooter>
</Sidebar>

// With badges
<Sidebar>
  <SidebarContent>
    <SidebarItem icon={<InboxIcon />} badge={<Badge>5</Badge>}>
      Inbox
    </SidebarItem>
    <SidebarItem icon={<NotificationIcon />} badge={<Badge>12</Badge>}>
      Notifications
    </SidebarItem>
  </SidebarContent>
</Sidebar>

// With submenu
<Sidebar>
  <SidebarContent>
    <SidebarSubMenu
      trigger={
        <SidebarItem icon={<FolderIcon />}>
          Projects
        </SidebarItem>
      }
    >
      <SidebarItem>Project 1</SidebarItem>
      <SidebarItem>Project 2</SidebarItem>
      <SidebarItem>Project 3</SidebarItem>
    </SidebarSubMenu>
  </SidebarContent>
</Sidebar>

// Collapsible sidebar
function AppLayout() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="flex">
      <Sidebar collapsed={collapsed}>
        <SidebarHeader>
          <SidebarToggle onToggle={() => setCollapsed(!collapsed)} />
        </SidebarHeader>
        <SidebarContent>
          <SidebarItem icon={<HomeIcon />}>Dashboard</SidebarItem>
        </SidebarContent>
      </Sidebar>
      <main className="flex-1">Content</main>
    </div>
  )
}
```

#### Stories

Available Storybook stories:
- **Default** - Basic sidebar with header, nav items, and footer
- **WithGroups** - Sidebar with grouped navigation sections
- **WithSubMenus** - Sidebar with expandable submenu items
- **Collapsible** - Sidebar with collapse/expand toggle button
- **WithUserFooter** - Sidebar with user avatar and info in the footer
- **FullLayout** - Full-page layout combining TopBar + Sidebar + main content

---

### SidebarRail

Advanced collapsible sidebar with icon rail and expandable panel.

#### Import

```tsx
import {
  SidebarRail,
  IconRail,
  IconRailHeader,
  IconRailContent,
  IconRailFooter,
  IconRailItem,
  RailPanel,
  RailPanelGroup,
  RailPanelItem
} from '@onesaz/ui'
```

#### Props

**SidebarRail Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultActiveRail` | `string \| null` | `null` | Default active rail item |
| `activeRail` | `string \| null` | - | Controlled active rail |
| `onActiveRailChange` | `(rail: string \| null) => void` | - | Active rail change handler |
| `hoverExpand` | `boolean` | `false` | Expand panel on hover vs click |
| `railWidth` | `number` | `64` | Width of icon rail (px) |
| `panelWidth` | `number` | `256` | Width of expanded panel (px) |
| `expandableRail` | `boolean` | `false` | Allow rail icons to expand |
| `railExpandedWidth` | `number` | `180` | Width of expanded rail |
| `overlayRail` | `boolean` | `true` | Overlay rail expansion |

#### Examples

```tsx
// Basic sidebar rail
<SidebarRail>
  <IconRail>
    <IconRailHeader>
      <LogoIcon />
    </IconRailHeader>
    <IconRailContent>
      <RailTrigger rail="dashboard" icon={<HomeIcon />}>
        Dashboard
      </RailTrigger>
      <RailTrigger rail="projects" icon={<FolderIcon />}>
        Projects
      </RailTrigger>
      <RailTrigger rail="team" icon={<UsersIcon />}>
        Team
      </RailTrigger>
    </IconRailContent>
    <IconRailFooter>
      <RailTrigger rail="settings" icon={<SettingsIcon />}>
        Settings
      </RailTrigger>
    </IconRailFooter>
  </IconRail>

  <RailPanel rail="dashboard">
    <RailPanelContent>
      <div className="p-4">
        <H3>Dashboard</H3>
        <VStack spacing="sm">
          <RailItem href="/overview">Overview</RailItem>
          <RailItem href="/analytics">Analytics</RailItem>
          <RailItem href="/reports">Reports</RailItem>
        </VStack>
      </div>
    </RailPanelContent>
  </RailPanel>

  <RailPanel rail="projects">
    <RailPanelContent>
      <div className="p-4">
        <H3>Projects</H3>
        <VStack spacing="sm">
          <RailItem href="/projects/all">All Projects</RailItem>
          <RailItem href="/projects/active">Active</RailItem>
          <RailItem href="/projects/archived">Archived</RailItem>
        </VStack>
      </div>
    </RailPanelContent>
  </RailPanel>
</SidebarRail>

// With hover expansion
<SidebarRail hoverExpand>
  <IconRail>
    <IconRailContent>
      <RailTrigger rail="home" icon={<HomeIcon />}>Home</RailTrigger>
      <RailTrigger rail="docs" icon={<FileIcon />}>Docs</RailTrigger>
    </IconRailContent>
  </IconRail>
  
  <RailPanel rail="home">
    <RailPanelContent>
      <div className="p-4">
        <H3>Home</H3>
        <p>Home panel content</p>
      </div>
    </RailPanelContent>
  </RailPanel>
</SidebarRail>

// Controlled sidebar rail
function AppLayout() {
  const [activeRail, setActiveRail] = useState<string | null>('dashboard')

  return (
    <div className="flex h-screen">
      <SidebarRail 
        activeRail={activeRail} 
        onActiveRailChange={setActiveRail}
        railWidth={72}
        panelWidth={280}
      >
        <IconRail>
          <IconRailHeader>
            <Avatar size="sm" fallback="CO" />
          </IconRailHeader>
          <IconRailContent>
            <RailTrigger rail="dashboard" icon={<LayoutDashboardIcon />}>
              Dashboard
            </RailTrigger>
            <RailTrigger rail="projects" icon={<FolderIcon />}>
              Projects
            </RailTrigger>
            <RailTrigger rail="team" icon={<UsersIcon />}>
              Team
            </RailTrigger>
            <RailTrigger rail="calendar" icon={<CalendarIcon />}>
              Calendar
            </RailTrigger>
          </IconRailContent>
          <IconRailFooter>
            <RailTrigger rail="settings" icon={<SettingsIcon />}>
              Settings
            </RailTrigger>
          </IconRailFooter>
        </IconRail>

        <RailPanel rail="dashboard">
          <RailPanelContent>
            <div className="p-4">
              <H4>Dashboard</H4>
              <Separator className="my-3" />
              <VStack spacing="xs">
                <RailItem href="/overview">Overview</RailItem>
                <RailItem href="/analytics">Analytics</RailItem>
                <RailItem href="/reports">Reports</RailItem>
              </VStack>
            </div>
          </RailPanelContent>
        </RailPanel>

        <RailPanel rail="projects">
          <RailPanelContent>
            <div className="p-4">
              <H4>Projects</H4>
              <Separator className="my-3" />
              <VStack spacing="xs">
                <RailItem href="/projects/all">All Projects</RailItem>
                <RailItem href="/projects/active">Active</RailItem>
                <RailItem href="/projects/completed">Completed</RailItem>
                <RailItem href="/projects/archived">Archived</RailItem>
              </VStack>
            </div>
          </RailPanelContent>
        </RailPanel>
      </SidebarRail>

      <main className="flex-1 overflow-auto">
        {/* Main content */}
      </main>
    </div>
  )
}

// Expandable rail (with labels on hover)
<SidebarRail 
  expandableRail 
  overlayRail 
  railWidth={64} 
  railExpandedWidth={200}
>
  <IconRail>
    <IconRailContent>
      <RailTrigger rail="home" icon={<HomeIcon />}>Home</RailTrigger>
      <RailTrigger rail="inbox" icon={<InboxIcon />}>
        Inbox
      </RailTrigger>
      <RailTrigger rail="starred" icon={<StarIcon />}>Starred</RailTrigger>
    </IconRailContent>
  </IconRail>
  
  <RailPanel rail="inbox">
    <RailPanelContent>
      <div className="p-4">
        <H3>Inbox</H3>
        <VStack spacing="sm">
          <RailItem>All Mail</RailItem>
          <RailItem>Unread</RailItem>
          <RailItem>Flagged</RailItem>
        </VStack>
      </div>
    </RailPanelContent>
  </RailPanel>
</SidebarRail>

// With badges and notifications
<SidebarRail>
  <IconRail>
    <IconRailContent>
      <RailTrigger 
        rail="inbox" 
        icon={<InboxIcon />}
        badge={<Badge variant="destructive" size="sm">12</Badge>}
      >
        Inbox
      </RailTrigger>
      <RailTrigger 
        rail="notifications" 
        icon={<BellIcon />}
        badge={<Badge variant="info" size="sm">3</Badge>}
      >
        Notifications
      </RailTrigger>
    </IconRailContent>
  </IconRail>
</SidebarRail>
```

#### Use Cases

- **Application Layouts** - Main navigation for complex apps
- **Dashboard Interfaces** - Multi-section control panels
- **Admin Panels** - Navigation with nested menus
- **Email Clients** - Folder structure navigation
- **Project Management** - Hierarchical project navigation

#### Stories

Available Storybook stories:
- **Default** - Icon rail with expandable content panel
- **RailOverlay** - Panel overlays main content instead of pushing it
- **HoverExpand** - Panel opens on icon hover rather than click
- **SlackStyle** - Slack-inspired layout with icon rail and panel
- **WithTopBar** - Full layout combining SidebarRail with TopBar

---

### Topbar

Top navigation bar component.

#### Import

```tsx
import {
  TopBar,
  TopBarBrand,
  TopBarNav,
  TopBarNavItem,
  TopBarSection,
  TopBarDivider
} from '@onesaz/ui'
```

#### Props

**TopBar Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Height size of the top bar |
| `sticky` | `boolean` | `false` | Stick to top of viewport on scroll |
| `bordered` | `boolean` | `false` | Show bottom border |
| `className` | `string` | - | Additional CSS classes |

#### Examples

```tsx
// Basic topbar
<TopBar>
  <TopBarBrand name="App Name" logo={<LogoIcon />} href="/" />
  <TopBarSection align="right">
    <Button variant="ghost" size="icon">
      <BellIcon />
    </Button>
    <Avatar fallback="JD" size="sm" />
  </TopBarSection>
</TopBar>

// With navigation
<TopBar>
  <TopBarBrand name="Dashboard" logo={<LogoIcon />} />
  <TopBarDivider />
  <TopBarNav>
    <TopBarNavItem href="/" active>Dashboard</TopBarNavItem>
    <TopBarNavItem href="/projects">Projects</TopBarNavItem>
    <TopBarNavItem href="/team">Team</TopBarNavItem>
  </TopBarNav>
  <TopBarSection align="right">
    <Button>New Project</Button>
  </TopBarSection>
</TopBar>

// With search
<TopBar>
  <TopBarBrand name="App" logo={<LogoIcon />} />
  <TopBarSection align="center" className="flex-1 max-w-md mx-8">
    <Input
      placeholder="Search..."
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      }
    />
  </TopBarSection>
  <TopBarSection align="right">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <BellIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Notification 1</DropdownMenuItem>
        <DropdownMenuItem>Notification 2</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    <Avatar fallback="JD" size="sm" />
  </TopBarSection>
</TopBar>

// Full example with user menu
<TopBar>
  <TopBarBrand name="Onesaz" logo={<LogoIcon />} />
  <TopBarNav>
    <TopBarNavItem href="/" active>Home</TopBarNavItem>
    <TopBarNavItem href="/products">Products</TopBarNavItem>
    <TopBarNavItem href="/pricing">Pricing</TopBarNavItem>
  </TopBarNav>
  <TopBarSection align="right">
    <Button variant="ghost" size="icon">
      <BellIcon />
    </Button>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="gap-2">
          <Avatar fallback="JD" size="sm" />
          <span>John Doe</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </TopBarSection>
</TopBar>
```

#### Stories

Available Storybook stories:
- **Default** - Basic topbar with brand and avatar
- **WithNavigation** - TopBar with nav items
- **WithSearch** - TopBar with centered search input
- **WithUserMenu** - Full topbar with navigation, notifications, and user dropdown
- **MobileWithHamburger** - Mobile-friendly topbar with hamburger menu button
- **Sizes** - All three sizes (sm, md, lg) displayed together
- **Sticky** - Sticky topbar that stays at the top while scrolling

---

### Navigation Components

#### Tabs

```tsx
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
} from '@onesaz/ui'
```

**Three Tab Styles:**

| Style | Components | Use Case |
|-------|-----------|----------|
| Pill (default) | `TabsList`, `TabsTrigger`, `TabsContent` | Standard pill/button tabs |
| Underline | `UnderlineTabsList`, `UnderlineTabsTrigger`, `UnderlineTabsContent` | GitHub-style underline tabs |
| Vertical | `VerticalTabs`, `VerticalTabsList`, `VerticalTabsTrigger`, `VerticalTabsContent` | Sidebar/settings navigation |

**UnderlineTabsTrigger Additional Props:**

| Prop | Type | Description |
|------|------|-------------|
| `count` | `number` | Badge count shown next to tab label |
| `disabled` | `boolean` | Disable individual tab |

**VerticalTabsTrigger Additional Props:**

| Prop | Type | Description |
|------|------|-------------|
| `icon` | `React.ReactNode` | Icon shown before the label |
| `disabled` | `boolean` | Disable individual tab |

```tsx
// Pill tabs (default)
<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
    <TabsTrigger value="notifications">Notifications</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Account settings content</TabsContent>
  <TabsContent value="password">Password settings content</TabsContent>
  <TabsContent value="notifications">Notification settings content</TabsContent>
</Tabs>

// Disabled tab
<Tabs defaultValue="active">
  <TabsList>
    <TabsTrigger value="active">Active</TabsTrigger>
    <TabsTrigger value="disabled" disabled>Disabled</TabsTrigger>
    <TabsTrigger value="other">Other</TabsTrigger>
  </TabsList>
  <TabsContent value="active">Active content</TabsContent>
  <TabsContent value="other">Other content</TabsContent>
</Tabs>

// Full-width tabs
<Tabs defaultValue="tab1">
  <TabsList className="w-full grid grid-cols-3">
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
    <TabsTrigger value="tab3">Tab 3</TabsTrigger>
  </TabsList>
  ...
</Tabs>

// Underline tabs (GitHub-style)
<Tabs defaultValue="code">
  <UnderlineTabsList>
    <UnderlineTabsTrigger value="code">Code</UnderlineTabsTrigger>
    <UnderlineTabsTrigger value="issues" count={12}>Issues</UnderlineTabsTrigger>
    <UnderlineTabsTrigger value="pulls" count={3}>Pull requests</UnderlineTabsTrigger>
    <UnderlineTabsTrigger value="settings">Settings</UnderlineTabsTrigger>
  </UnderlineTabsList>
  <UnderlineTabsContent value="code">Repository code</UnderlineTabsContent>
  <UnderlineTabsContent value="issues">12 open issues</UnderlineTabsContent>
</Tabs>

// Vertical tabs (settings sidebar style)
<VerticalTabs defaultValue="profile" className="w-[800px]">
  <VerticalTabsList>
    <VerticalTabsTrigger value="profile" icon={<UserIcon />}>Profile</VerticalTabsTrigger>
    <VerticalTabsTrigger value="account" icon={<SettingsIcon />}>Account</VerticalTabsTrigger>
    <VerticalTabsTrigger value="notifications" icon={<BellIcon />}>Notifications</VerticalTabsTrigger>
    <VerticalTabsGroupLabel>Danger Zone</VerticalTabsGroupLabel>
    <VerticalTabsTrigger value="delete" icon={<TrashIcon />}>Delete Account</VerticalTabsTrigger>
  </VerticalTabsList>
  <VerticalTabsContent value="profile">Profile settings</VerticalTabsContent>
  <VerticalTabsContent value="account">Account settings</VerticalTabsContent>
</VerticalTabs>
```

**Available Storybook stories:**
- **Default** - Pill tabs with two tabs
- **WithForm** - Pill tabs containing form fields
- **MultipleTabs** - Four pill tabs
- **Disabled** - Pill tabs with one disabled tab
- **FullWidth** - Full-width pill tabs using CSS grid
- **Underline** - Underline variant (GitHub settings style)
- **UnderlineWithCounts** - Underline tabs with `count` badges (GitHub repo style)
- **UnderlineGitHubSettings** - Full GitHub settings page example
- **UnderlineDisabled** - Underline tabs with a disabled tab and count badge
- **Vertical** - Vertical tabs with icons (GitHub settings sidebar)
- **VerticalWithGroups** - Vertical tabs with `VerticalTabsGroupLabel` section headers

#### Breadcrumbs

```tsx
import {
  Breadcrumbs,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@onesaz/ui'
```

**Breadcrumbs Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `separator` | `string \| ReactNode` | `'/'` | Custom separator between items |
| `maxItems` | `number` | - | Max items to show before collapsing |
| `itemsBeforeCollapse` | `number` | `1` | Items to show before the ellipsis |
| `itemsAfterCollapse` | `number` | `1` | Items to show after the ellipsis |
| `className` | `string` | - | Additional CSS classes |

**BreadcrumbItem Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string` | - | Navigation URL |
| `current` | `boolean` | `false` | Marks item as current page |
| `onClick` | `() => void` | - | Click handler |
| `className` | `string` | - | Additional CSS classes |

```tsx
// Basic breadcrumbs
<Breadcrumbs>
  <BreadcrumbItem href="#">Home</BreadcrumbItem>
  <BreadcrumbItem href="#">Products</BreadcrumbItem>
  <BreadcrumbItem current>Electronics</BreadcrumbItem>
</Breadcrumbs>

// Custom separator
<Breadcrumbs separator="→">
  <BreadcrumbItem href="#">Home</BreadcrumbItem>
  <BreadcrumbItem href="#">Products</BreadcrumbItem>
  <BreadcrumbItem current>Category</BreadcrumbItem>
</Breadcrumbs>

// Collapsed long paths
<Breadcrumbs maxItems={4} itemsBeforeCollapse={1} itemsAfterCollapse={2}>
  <BreadcrumbItem href="#">Home</BreadcrumbItem>
  <BreadcrumbItem href="#">Category</BreadcrumbItem>
  <BreadcrumbItem href="#">Subcategory</BreadcrumbItem>
  <BreadcrumbItem href="#">Products</BreadcrumbItem>
  <BreadcrumbItem href="#">Electronics</BreadcrumbItem>
  <BreadcrumbItem current>Smartphones</BreadcrumbItem>
</Breadcrumbs>

// With click handlers
<Breadcrumbs>
  <BreadcrumbItem onClick={() => navigate('/')}>Home</BreadcrumbItem>
  <BreadcrumbItem onClick={() => navigate('/products')}>Products</BreadcrumbItem>
  <BreadcrumbItem current>Details</BreadcrumbItem>
</Breadcrumbs>

// Using BreadcrumbLink / BreadcrumbPage sub-components
<Breadcrumbs>
  <BreadcrumbLink href="#">Home</BreadcrumbLink>
  <BreadcrumbLink href="#">Library</BreadcrumbLink>
  <BreadcrumbPage>Current Page</BreadcrumbPage>
</Breadcrumbs>
```

**Available Storybook stories:**
- **Default** - Three items using `BreadcrumbItem` with `href` and `current`
- **WithLinks** - Using `BreadcrumbLink` and `BreadcrumbPage` sub-components
- **CustomSeparator** - Three breadcrumbs with `/`, `•`, `→` separators
- **CustomSeparatorIcon** - SVG chevron icon as separator
- **Collapsed** - Long path collapsed with `maxItems`, `itemsBeforeCollapse`, `itemsAfterCollapse`
- **WithClickHandlers** - Items with `onClick` handlers instead of `href`
- **WithIcons** - Items with inline SVG icons
- **LongPath** - Items with long text labels
- **SingleItem** - Single current item
- **TwoItems** - Two items (home + current)
- **InCard** - Breadcrumbs rendered inside a card component

#### Pagination

```tsx
import { Pagination } from '@onesaz/ui'
```

Pagination uses a **compound component** pattern via `Pagination.*` sub-components.

| Sub-component | Description |
|---------------|-------------|
| `Pagination.Content` | Wraps all pagination items |
| `Pagination.Item` | Individual page item wrapper |
| `Pagination.Link` | Page number link; `isActive` marks the current page |
| `Pagination.Previous` | Previous page button |
| `Pagination.Next` | Next page button |
| `Pagination.Ellipsis` | "…" separator for skipped pages |

```tsx
// Default pagination with previous/next and page numbers
<Pagination>
  <Pagination.Content>
    <Pagination.Item>
      <Pagination.Previous />
    </Pagination.Item>
    <Pagination.Item>
      <Pagination.Link>1</Pagination.Link>
    </Pagination.Item>
    <Pagination.Item>
      <Pagination.Link isActive>2</Pagination.Link>
    </Pagination.Item>
    <Pagination.Item>
      <Pagination.Link>3</Pagination.Link>
    </Pagination.Item>
    <Pagination.Item>
      <Pagination.Ellipsis />
    </Pagination.Item>
    <Pagination.Item>
      <Pagination.Link>10</Pagination.Link>
    </Pagination.Item>
    <Pagination.Item>
      <Pagination.Next />
    </Pagination.Item>
  </Pagination.Content>
</Pagination>

// Simple prev/next only
<Pagination>
  <Pagination.Content>
    <Pagination.Item>
      <Pagination.Previous />
    </Pagination.Item>
    <Pagination.Item>
      <Pagination.Next />
    </Pagination.Item>
  </Pagination.Content>
</Pagination>

// Numbered pages only
<Pagination>
  <Pagination.Content>
    <Pagination.Item><Pagination.Link>1</Pagination.Link></Pagination.Item>
    <Pagination.Item><Pagination.Link>2</Pagination.Link></Pagination.Item>
    <Pagination.Item><Pagination.Link isActive>3</Pagination.Link></Pagination.Item>
    <Pagination.Item><Pagination.Link>4</Pagination.Link></Pagination.Item>
    <Pagination.Item><Pagination.Link>5</Pagination.Link></Pagination.Item>
  </Pagination.Content>
</Pagination>
```

**Available Storybook stories:**
- **Default** - Full pagination with previous, numbered pages, ellipsis, and next
- **Simple** - Previous/next arrows only
- **WithNumbers** - Numbered pages only (no prev/next)

---

## Charts & Data Visualization

Onesaz UI provides a comprehensive set of chart components built on Recharts for visualizing data. All charts support theming, responsive sizing, and extensive customization options.

### Common Chart Features

All chart components share these common features:

- **Responsive** - Automatically adapt to container size
- **Theme-aware** - Respect light/dark mode
- **Customizable** - Extensive styling and configuration options
- **Accessible** - Built with accessibility in mind
- **TypeScript** - Full type safety

### BarChart

Bar chart component for comparing values across categories.

#### Import

```tsx
import { BarChart } from '@onesaz/ui'
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `any[]` | required | Chart data array |
| `dataKey` | `string` | required | Key for bar values |
| `dataKeys` | `Array<{dataKey, fill?, name?}>` | - | Multiple bars configuration |
| `fill` | `string` | theme color | Bar fill color |
| `name` | `string` | - | Bar name for legend |
| `width` | `number \| string` | `'100%'` | Chart width |
| `height` | `number \| string` | `300` | Chart height |
| `showGrid` | `boolean` | `true` | Show grid lines |
| `showTooltip` | `boolean` | `true` | Show tooltip on hover |
| `showLegend` | `boolean` | `false` | Show legend |
| `xAxis` | `object` | - | X-axis configuration |
| `yAxis` | `object` | - | Y-axis configuration |
| `colors` | `string[]` | - | Custom color array |

#### Examples

```tsx
// Basic bar chart
const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
]

<BarChart
  data={data}
  dataKey="value"
  xAxis={{ dataKey: 'name' }}
  yAxis={{}}
  height={300}
/>

// Multiple bars (grouped)
const salesData = [
  { month: 'Jan', product1: 400, product2: 240 },
  { month: 'Feb', product1: 300, product2: 380 },
  { month: 'Mar', product1: 600, product2: 500 },
  { month: 'Apr', product1: 800, product2: 700 },
]

<BarChart
  data={salesData}
  dataKeys={[
    { dataKey: 'product1', name: 'Product A', fill: '#8884d8' },
    { dataKey: 'product2', name: 'Product B', fill: '#82ca9d' },
  ]}
  xAxis={{ dataKey: 'month' }}
  yAxis={{}}
  showLegend
  height={350}
/>

// With custom styling
<BarChart
  data={data}
  dataKey="value"
  xAxis={{ 
    dataKey: 'name',
    label: 'Months',
    angle: -45,
    textAnchor: 'end'
  }}
  yAxis={{ 
    label: 'Revenue ($)',
    position: 'insideLeft'
  }}
  barProps={{
    radius: [8, 8, 0, 0],
    maxBarSize: 60
  }}
  colors={['#0088FE', '#00C49F', '#FFBB28', '#FF8042']}
  height={400}
/>
```

#### Stories

Available Storybook stories:
- **BarChartDefault** - Simple single-bar chart
- **BarChartMultiple** - Grouped multi-bar chart
- **BarChartWithLabels** - Bars with axis labels
- **BarChartCustomTooltip** - Custom tooltip formatter

---

### LineChart

Line chart component for showing trends over time.

#### Import

```tsx
import { LineChart } from '@onesaz/ui'
```

#### Props

Similar to BarChart with line-specific options.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `any[]` | required | Chart data array |
| `dataKey` | `string` | required | Key for line values |
| `dataKeys` | `Array<{dataKey, stroke?, name?}>` | - | Multiple lines configuration |
| `stroke` | `string` | theme color | Line stroke color |
| `strokeWidth` | `number` | `2` | Line width |
| `dot` | `boolean` | `true` | Show data points |
| `activeDot` | `boolean` | `true` | Show active dot on hover |

#### Examples

```tsx
// Basic line chart
const data = [
  { date: '2024-01', users: 1000 },
  { date: '2024-02', users: 1200 },
  { date: '2024-03', users: 1100 },
  { date: '2024-04', users: 1400 },
  { date: '2024-05', users: 1600 },
]

<LineChart
  data={data}
  dataKey="users"
  xAxis={{ dataKey: 'date' }}
  yAxis={{}}
  height={300}
/>

// Multiple lines
const trafficData = [
  { month: 'Jan', desktop: 4000, mobile: 2400, tablet: 1200 },
  { month: 'Feb', desktop: 3000, mobile: 1398, tablet: 1100 },
  { month: 'Mar', desktop: 2000, mobile: 9800, tablet: 1500 },
  { month: 'Apr', desktop: 2780, mobile: 3908, tablet: 1700 },
]

<LineChart
  data={trafficData}
  dataKeys={[
    { dataKey: 'desktop', name: 'Desktop', stroke: '#8884d8' },
    { dataKey: 'mobile', name: 'Mobile', stroke: '#82ca9d' },
    { dataKey: 'tablet', name: 'Tablet', stroke: '#ffc658' },
  ]}
  xAxis={{ dataKey: 'month' }}
  yAxis={{}}
  showLegend
  height={350}
/>

// Smooth curve
<LineChart
  data={data}
  dataKey="users"
  xAxis={{ dataKey: 'date' }}
  lineProps={{
    type: 'monotone', // smooth curve
    strokeWidth: 3,
    dot: { r: 4 },
    activeDot: { r: 6 }
  }}
  height={300}
/>
```

#### Stories

Available Storybook stories:
- **LineChartDefault** - Single-line trend chart
- **LineChartMultiple** - Multi-line chart with legend

---

### AreaChart

Area chart component for showing cumulative values.

#### Import

```tsx
import { AreaChart } from '@onesaz/ui'
```

#### Props

Similar to LineChart with area fill options.

#### Examples

```tsx
// Basic area chart
const data = [
  { month: 'Jan', value: 400 },
  { month: 'Feb', value: 300 },
  { month: 'Mar', value: 600 },
  { month: 'Apr', value: 800 },
]

<AreaChart
  data={data}
  dataKey="value"
  xAxis={{ dataKey: 'month' }}
  yAxis={{}}
  height={300}
/>

// Stacked area chart
const stackedData = [
  { month: 'Jan', category1: 400, category2: 240, category3: 150 },
  { month: 'Feb', category1: 300, category2: 380, category3: 200 },
  { month: 'Mar', category1: 600, category2: 500, category3: 300 },
]

<AreaChart
  data={stackedData}
  dataKeys={[
    { dataKey: 'category1', name: 'Category 1', fill: '#8884d8' },
    { dataKey: 'category2', name: 'Category 2', fill: '#82ca9d' },
    { dataKey: 'category3', name: 'Category 3', fill: '#ffc658' },
  ]}
  xAxis={{ dataKey: 'month' }}
  yAxis={{}}
  showLegend
  height={350}
/>

// Gradient fill
<AreaChart
  data={data}
  dataKey="value"
  xAxis={{ dataKey: 'month' }}
  areaProps={{
    type: 'monotone',
    fillOpacity: 0.6,
    stroke: '#8884d8',
    fill: 'url(#colorGradient)'
  }}
  height={300}
/>
```

#### Stories

Available Storybook stories:
- **AreaChartDefault** - Basic area chart
- **AreaChartStacked** - Stacked multi-area chart

---

### PieChart

Pie chart component for showing proportional distribution.

#### Import

```tsx
import { PieChart } from '@onesaz/ui'
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `any[]` | required | Chart data array |
| `dataKey` | `string` | required | Key for values |
| `nameKey` | `string` | `'name'` | Key for labels |
| `innerRadius` | `number` | `0` | Inner radius (for donut) |
| `outerRadius` | `number` | `80` | Outer radius |
| `showLabels` | `boolean` | `true` | Show labels |
| `showLegend` | `boolean` | `true` | Show legend |
| `colors` | `string[]` | - | Custom colors |

#### Examples

```tsx
// Basic pie chart
const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
]

<PieChart
  data={data}
  dataKey="value"
  nameKey="name"
  height={300}
/>

// With custom colors
<PieChart
  data={data}
  dataKey="value"
  nameKey="name"
  colors={['#0088FE', '#00C49F', '#FFBB28', '#FF8042']}
  height={300}
/>

// With percentage labels
<PieChart
  data={data}
  dataKey="value"
  nameKey="name"
  label={{
    position: 'outside',
    formatter: (value, entry) => `${((value / entry.total) * 100).toFixed(0)}%`
  }}
  height={350}
/>
```

#### Stories

Available Storybook stories:
- **PieChartDefault** - Basic pie chart with legend

---

### DonutChart

Donut chart component (pie chart with center hole).

#### Import

```tsx
import { DonutChart } from '@onesaz/ui'
```

#### Props

Similar to PieChart with additional center text options.

#### Examples

```tsx
// Basic donut chart
const data = [
  { name: 'Desktop', value: 5000 },
  { name: 'Mobile', value: 3000 },
  { name: 'Tablet', value: 2000 },
]

<DonutChart
  data={data}
  dataKey="value"
  nameKey="name"
  innerRadius={60}
  outerRadius={90}
  height={300}
/>

// With center text
<DonutChart
  data={data}
  dataKey="value"
  nameKey="name"
  innerRadius={70}
  outerRadius={100}
  centerText={{
    value: '10,000',
    label: 'Total Users'
  }}
  height={350}
/>
```

#### Stories

Available Storybook stories:
- **DonutChartDefault** - Basic donut with an inner hole
- **DonutChartAdvanced** - Donut with center text showing total
- **DonutChartWithLabels** - Donut with percentage labels outside

---

### ScatterChart

Scatter plot component for showing correlation between variables.

#### Import

```tsx
import { ScatterChart } from '@onesaz/ui'
```

#### Examples

```tsx
// Basic scatter plot
const data = [
  { x: 100, y: 200, z: 200 },
  { x: 120, y: 100, z: 260 },
  { x: 170, y: 300, z: 400 },
  { x: 140, y: 250, z: 280 },
]

<ScatterChart
  data={data}
  xDataKey="x"
  yDataKey="y"
  xAxis={{ label: 'Height (cm)' }}
  yAxis={{ label: 'Weight (kg)' }}
  height={350}
/>

// Multiple scatter series
<ScatterChart
  dataKeys={[
    { data: dataset1, xDataKey: 'x', yDataKey: 'y', name: 'Group A', fill: '#8884d8' },
    { data: dataset2, xDataKey: 'x', yDataKey: 'y', name: 'Group B', fill: '#82ca9d' },
  ]}
  xAxis={{ label: 'Variable X' }}
  yAxis={{ label: 'Variable Y' }}
  showLegend
  height={400}
/>
```

#### Stories

Available Storybook stories:
- **ScatterChartDefault** - Basic scatter plot

---

### RadarChart

Radar chart component for multivariate data.

#### Import

```tsx
import { RadarChart } from '@onesaz/ui'
```

#### Examples

```tsx
// Basic radar chart
const data = [
  { subject: 'Math', score: 120 },
  { subject: 'Chinese', score: 98 },
  { subject: 'English', score: 86 },
  { subject: 'Geography', score: 99 },
  { subject: 'Physics', score: 85 },
  { subject: 'History', score: 65 },
]

<RadarChart
  data={data}
  dataKey="score"
  nameKey="subject"
  height={350}
/>

// Multiple datasets
<RadarChart
  data={data}
  dataKeys={[
    { dataKey: 'studentA', name: 'Student A', stroke: '#8884d8', fill: '#8884d8' },
    { dataKey: 'studentB', name: 'Student B', stroke: '#82ca9d', fill: '#82ca9d' },
  ]}
  nameKey="subject"
  showLegend
  height={400}
/>
```

#### Stories

Available Storybook stories:
- **RadarChartDefault** - Basic radar/spider chart

---

### ProgressDonut

Single progress donut chart.

#### Import

```tsx
import { ProgressDonut } from '@onesaz/ui'
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `Array<{value: number, label: string}>` | required | Array of concentric progress rings |
| `width` | `number` | - | SVG width in pixels |
| `height` | `number` | - | SVG height in pixels |
| `innerRadius` | `number` | `60` | Inner radius of the rings |
| `outerRadius` | `number` | `80` | Outer radius of the rings |
| `showTooltip` | `boolean` | `true` | Show tooltip on hover |
| `showLegend` | `boolean` | `false` | Show legend below chart |
| `getColor` | `(value: number) => string` | - | Custom color function based on value (0-100) |

#### Examples

```tsx
// Basic progress donut with concentric rings
<ProgressDonut
  data={[
    { value: 75, label: 'Q1' },
    { value: 45, label: 'Q2' },
    { value: 85, label: 'Q3' },
    { value: 25, label: 'Q4' },
  ]}
  width={300}
  height={300}
  innerRadius={60}
  outerRadius={80}
  showTooltip
/>

// With custom color function (status-based)
<ProgressDonut
  data={[
    { value: 90, label: 'Success' },
    { value: 60, label: 'Warning' },
    { value: 30, label: 'Error' },
  ]}
  width={400}
  height={400}
  innerRadius={80}
  outerRadius={100}
  getColor={(value) => {
    if (value >= 80) return '#22c55e'  // green
    if (value >= 60) return '#eab308'  // yellow
    if (value >= 40) return '#f97316'  // orange
    return '#ef4444'                    // red
  }}
  showLegend
/>

// System metrics dashboard
<ProgressDonut
  data={[
    { value: 85, label: 'CPU Usage' },
    { value: 72, label: 'Memory' },
    { value: 45, label: 'Disk Space' },
    { value: 91, label: 'Network' },
  ]}
  width={500}
  height={500}
  innerRadius={100}
  outerRadius={120}
  showTooltip
  showLegend
/>
```

#### Stories

Available Storybook stories:
- **Default** - Four concentric rings with Q1–Q4 data
- **CustomColors** - Color function based on value thresholds
- **NoTooltip** - Rings without tooltip or legend
- **SystemMetrics** - Six-ring system resource dashboard
- **Large** - Large chart with increased radius

---

### MultiProgressDonut

Multi-segment progress donut chart.

#### Import

```tsx
import { MultiProgressDonut } from '@onesaz/ui'
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `Array<{value: number, label: string}>` | required | Array of individual donut elements |
| `size` | `number` | `80` | Size (diameter) of each donut in pixels |
| `strokeWidth` | `number` | - | Foreground arc stroke thickness |
| `backgroundStrokeWidth` | `number` | - | Background track stroke thickness |
| `showPercentage` | `boolean` | `true` | Show percentage value in center of each donut |
| `enableShadows` | `boolean` | `true` | Enable drop shadow effect |
| `enableGradients` | `boolean` | `true` | Enable gradient fill on the arc |
| `getColor` | `(value: number) => string[]` | - | Returns `[primaryColor, darkerColor]` pair for gradient |

#### Examples

```tsx
// Basic multi-progress donuts
<MultiProgressDonut
  data={[
    { value: 75, label: 'Q1' },
    { value: 45, label: 'Q2' },
    { value: 85, label: 'Q3' },
    { value: 25, label: 'Q4' },
  ]}
  size={80}
  showPercentage
  enableShadows
  enableGradients
/>

// With custom color function (status-based gradient pairs)
<MultiProgressDonut
  data={[
    { value: 90, label: 'Success' },
    { value: 60, label: 'Warning' },
    { value: 30, label: 'Error' },
    { value: 10, label: 'Critical' },
  ]}
  size={100}
  strokeWidth={12}
  backgroundStrokeWidth={12}
  getColor={(value) => {
    if (value >= 80) return ['#22c55e', '#16a34a']  // green
    if (value >= 60) return ['#eab308', '#ca8a04']  // yellow
    if (value >= 40) return ['#f97316', '#ea580c']  // orange
    return ['#ef4444', '#dc2626']                    // red
  }}
/>

// System metrics without effects
<MultiProgressDonut
  data={[
    { value: 85, label: 'CPU Usage' },
    { value: 72, label: 'Memory' },
    { value: 45, label: 'Disk Space' },
    { value: 91, label: 'Network' },
    { value: 38, label: 'Temperature' },
    { value: 67, label: 'Power' },
  ]}
  size={120}
  strokeWidth={10}
  backgroundStrokeWidth={10}
  showPercentage
  enableShadows
  enableGradients
/>
```

#### Stories

Available Storybook stories:
- **Default** - Four donuts with Q1–Q4 data
- **CustomColors** - Color function returning gradient pairs based on value
- **NoShadows** - Donuts without shadow or gradient effects
- **SystemMetrics** - Six-donut system resource layout
- **Large** - Larger donuts with thicker strokes

---

### Chart Best Practices

#### Data Preparation

```tsx
// ✅ Good - Clean, structured data
const chartData = sales.map(item => ({
  month: format(item.date, 'MMM'),
  revenue: item.amount,
  target: item.target
}))

// ❌ Avoid - Raw, unformatted data
<BarChart data={rawDatabaseData} />
```

#### Responsive Design

```tsx
// ✅ Good - Responsive container
<div className="w-full">
  <BarChart data={data} width="100%" height={300} />
</div>

// ✅ Good - Adapt height to screen size
<BarChart 
  data={data} 
  width="100%" 
  height={window.innerWidth < 768 ? 250 : 400} 
/>
```

#### Color Selection

```tsx
// ✅ Good - Accessible color palette
const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

// ✅ Good - Theme-aware colors
<BarChart 
  data={data}
  dataKey="value"
  colors={[
    'hsl(var(--primary))',
    'hsl(var(--accent))',
    'hsl(var(--success))'
  ]}
/>
```

#### Performance

```tsx
// ✅ Good - Limit data points for performance
const displayData = data.slice(-50) // Last 50 points

// ✅ Good - Memoize chart data
const chartData = useMemo(
  () => transformData(rawData),
  [rawData]
)

<LineChart data={chartData} />
```

---

## Theming & Customization

### Theme Provider

The `ThemeProvider` manages theme state and provides context to all components.

```tsx
import { ThemeProvider } from '@onesaz/ui'

<ThemeProvider
  defaultTheme="system"  // 'light' | 'dark' | 'system'
  storageKey="ui-theme"  // localStorage key
>
  <App />
</ThemeProvider>
```

### Using Theme

```tsx
import { useTheme } from '@onesaz/ui'

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </Button>
  )
}
```

### Customizing Colors

Colors are defined in the `@onesaz/tokens` package. You can override them in your Tailwind config:

```javascript
// tailwind.config.js
import { onesazTailwindConfig } from '@onesaz/tailwind-config'

export default {
  ...onesazTailwindConfig,
  theme: {
    ...onesazTailwindConfig.theme,
    extend: {
      ...onesazTailwindConfig.theme.extend,
      colors: {
        ...onesazTailwindConfig.theme.extend.colors,
        // Override specific colors
        primary: {
          DEFAULT: '#0066FF',
          foreground: '#FFFFFF',
          // ... other shades
        },
      },
    },
  },
}
```

### Custom Component Styles

Use the `cn` utility to merge custom classes:

```tsx
import { Button, cn } from '@onesaz/ui'

<Button className={cn('custom-class', 'another-class')}>
  Custom Styled Button
</Button>
```

### CSS Variables

Theme colors are implemented using CSS variables:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  /* ... more variables */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --primary: 210 40% 98%;
  --primary-foreground: 222.2 47.4% 11.2%;
  /* ... more variables */
}
```

---

## Accessibility

All Onesaz UI components are built with accessibility in mind, following WCAG 2.1 AA standards.

### Keyboard Navigation

All interactive components support keyboard navigation:

- **Tab** - Move focus between elements
- **Enter/Space** - Activate buttons and select items
- **Arrow keys** - Navigate lists, menus, and tabs
- **Escape** - Close dialogs and overlays
- **Home/End** - Jump to first/last item

### Screen Reader Support

Components include proper ARIA attributes:

```tsx
// Buttons have accessible names
<Button aria-label="Close dialog">✕</Button>

// Form fields are properly labeled
<FormControl>
  <FormLabel htmlFor="email">Email</FormLabel>
  <Input id="email" aria-describedby="email-helper" />
  <FormHelperText id="email-helper">Enter your email</FormHelperText>
</FormControl>

// Dialogs have proper roles and focus management
<Dialog> {/* Automatically manages focus and aria-hidden */}
  <DialogTitle> {/* Announces dialog purpose */}
  ...
</Dialog>
```

### Focus Management

Components properly manage focus:

```tsx
// Dialogs trap focus
<Dialog>...</Dialog>

// Drawers return focus on close
<Drawer>...</Drawer>

// Dropdowns navigate with keyboard
<DropdownMenu>...</DropdownMenu>
```

### Best Practices

1. **Always provide text alternatives** for icons and images
2. **Use semantic HTML** - buttons for actions, links for navigation
3. **Provide labels** for all form inputs
4. **Use appropriate heading hierarchy** - H1, H2, H3, etc.
5. **Ensure sufficient color contrast** - at least 4.5:1 for normal text
6. **Test with keyboard only** - ensure all functionality is accessible
7. **Test with screen readers** - NVDA, JAWS, VoiceOver
8. **Use ARIA sparingly** - prefer semantic HTML when possible

---

## Best Practices

### Component Organization

```tsx
// ✅ Good - Clear hierarchy and composition
<Card>
  <CardHeader>
    <CardTitle>User Profile</CardTitle>
    <CardDescription>Manage your account settings</CardDescription>
  </CardHeader>
  <CardContent>
    <form>...</form>
  </CardContent>
  <CardFooter>
    <Button>Save Changes</Button>
  </CardFooter>
</Card>

// ❌ Avoid - Flat structure without semantic grouping
<div className="card">
  <div>User Profile</div>
  <div>Manage your account settings</div>
  <form>...</form>
  <button>Save Changes</button>
</div>
```

### State Management

```tsx
// ✅ Good - Controlled components when you need state
const [value, setValue] = useState('')

<Input value={value} onChange={(e) => setValue(e.target.value)} />

// ✅ Good - Uncontrolled with refs for simple forms
const inputRef = useRef<HTMLInputElement>(null)

<Input ref={inputRef} defaultValue="initial" />

// ❌ Avoid - Mixing controlled and uncontrolled
<Input value={value} defaultValue="initial" /> // Don't do this
```

### Error Handling

```tsx
// ✅ Good - Clear error states with helpful messages
<FormControl error={!!errors.email}>
  <FormLabel>Email</FormLabel>
  <Input 
    type="email" 
    error={!!errors.email}
    aria-invalid={!!errors.email}
    aria-describedby="email-error"
  />
  {errors.email && (
    <FormHelperText id="email-error" error>
      {errors.email}
    </FormHelperText>
  )}
</FormControl>

// ❌ Avoid - Generic errors without context
{error && <div>Something went wrong</div>}
```

### Loading States

```tsx
// ✅ Good - Clear loading indicators
<Button disabled={isLoading}>
  {isLoading && <Spinner className="mr-2" />}
  {isLoading ? 'Saving...' : 'Save'}
</Button>

// ✅ Good - Skeleton for content loading
{isLoading ? (
  <Skeleton height={200} />
) : (
  <Card>...</Card>
)}
```

### Performance

```tsx
// ✅ Good - Memoize expensive computations
const sortedData = useMemo(
  () => data.sort((a, b) => a.name.localeCompare(b.name)),
  [data]
)

// ✅ Good - Virtualize long lists
<DataGrid
  rows={largeDataset}
  columns={columns}
  virtualization // Enable virtualization for large datasets
/>

// ✅ Good - Lazy load heavy components
const Dialog = lazy(() => import('./HeavyDialog'))
```

---

## Examples & Patterns

### Login Form

```tsx
import { 
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
  FormControl, FormLabel, FormHelperText,
  Input, Button, Checkbox, VStack 
} from '@onesaz/ui'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [errors, setErrors] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle login
  }

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Welcome Back</CardTitle>
        <CardDescription>Enter your credentials to continue</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <VStack spacing="md">
            <FormControl error={!!errors.email} required>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!errors.email}
              />
              {errors.email && (
                <FormHelperText error>{errors.email}</FormHelperText>
              )}
            </FormControl>

            <FormControl error={!!errors.password} required>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!errors.password}
              />
              {errors.password && (
                <FormHelperText error>{errors.password}</FormHelperText>
              )}
            </FormControl>

            <Checkbox
              checked={remember}
              onCheckedChange={setRemember}
            >
              Remember me
            </Checkbox>
          </VStack>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button className="w-full" onClick={handleSubmit}>
          Sign In
        </Button>
        <Button variant="link" className="w-full">
          Forgot password?
        </Button>
      </CardFooter>
    </Card>
  )
}
```

### Data Table with Actions

```tsx
import { 
  DataGrid, Avatar, AvatarImage, AvatarFallback,
  Badge, Button, DropdownMenu, DropdownMenuTrigger,
  DropdownMenuContent, DropdownMenuItem,
  type GridColDef 
} from '@onesaz/ui'

interface User {
  id: number
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
  avatar?: string
}

function UsersTable() {
  const [users, setUsers] = useState<User[]>([])
  const [selected, setSelected] = useState({})

  const columns: GridColDef<User>[] = [
    {
      field: 'name',
      headerName: 'User',
      flex: 1,
      renderCell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar size="sm">
            <AvatarImage src={row.avatar} alt={row.name} />
            <AvatarFallback>{row.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{row.name}</div>
            <div className="text-sm text-muted-foreground">{row.email}</div>
          </div>
        </div>
      ),
    },
    {
      field: 'role',
      headerName: 'Role',
      width: 120,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 100,
      renderCell: ({ value }) => (
        <Badge variant={value === 'active' ? 'success' : 'secondary'}>
          {value}
        </Badge>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 80,
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVerticalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleEdit(row)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleView(row)}>
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => handleDelete(row)}
              className="text-destructive"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  return (
    <DataGrid
      rows={users}
      columns={columns}
      getRowId={(row) => row.id}
      checkboxSelection
      rowSelectionModel={selected}
      onRowSelectionModelChange={setSelected}
      toolBar
      title="Users"
      height={600}
    />
  )
}
```

### Dashboard Layout

```tsx
import { 
  Box, Grid, Card, CardHeader, CardTitle, CardDescription,
  CardContent, VStack, HStack, Badge, Button,
  Avatar, AvatarFallback, Topbar, Sidebar
} from '@onesaz/ui'

function Dashboard() {
  return (
    <Box className="flex h-screen">
      <Sidebar />
      
      <Box className="flex-1 flex flex-col">
        <Topbar />
        
        <Box className="flex-1 overflow-auto p-6">
          {/* Stats Grid */}
          <Grid cols={4} gap="md" className="mb-6">
            <Card>
              <CardContent className="pt-6">
                <VStack align="start" spacing="sm">
                  <span className="text-sm text-muted-foreground">
                    Total Revenue
                  </span>
                  <span className="text-2xl font-bold">$45,231.89</span>
                  <span className="text-xs text-green-600">
                    +20.1% from last month
                  </span>
                </VStack>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <VStack align="start" spacing="sm">
                  <span className="text-sm text-muted-foreground">
                    New Users
                  </span>
                  <span className="text-2xl font-bold">+2,350</span>
                  <span className="text-xs text-green-600">
                    +12.5% from last month
                  </span>
                </VStack>
              </CardContent>
            </Card>
            
            {/* More cards... */}
          </Grid>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates from your team</CardDescription>
            </CardHeader>
            <CardContent>
              <VStack spacing="md">
                {activities.map((activity) => (
                  <HStack key={activity.id} justify="between">
                    <HStack spacing="sm">
                      <Avatar size="sm">
                        <AvatarFallback>{activity.user[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium">
                          {activity.user}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {activity.action}
                        </div>
                      </div>
                    </HStack>
                    <span className="text-xs text-muted-foreground">
                      {activity.time}
                    </span>
                  </HStack>
                ))}
              </VStack>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  )
}
```

### Form with Validation

```tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Card, CardHeader, CardTitle, CardContent, CardFooter,
  FormControl, FormLabel, FormHelperText,
  Input, Textarea, Select, SelectTrigger, SelectValue,
  SelectContent, SelectItem, Button, VStack
} from '@onesaz/ui'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  role: z.string().min(1, 'Please select a role'),
  bio: z.string().max(500, 'Bio must be less than 500 characters'),
})

type FormData = z.infer<typeof schema>

function UserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log(data)
  }

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <CardTitle>Create User</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <VStack spacing="md">
            <FormControl error={!!errors.name} required>
              <FormLabel>Name</FormLabel>
              <Input
                {...register('name')}
                placeholder="Enter name"
                error={!!errors.name}
              />
              {errors.name && (
                <FormHelperText error>{errors.name.message}</FormHelperText>
              )}
            </FormControl>

            <FormControl error={!!errors.email} required>
              <FormLabel>Email</FormLabel>
              <Input
                {...register('email')}
                type="email"
                placeholder="you@example.com"
                error={!!errors.email}
              />
              {errors.email && (
                <FormHelperText error>{errors.email.message}</FormHelperText>
              )}
            </FormControl>

            <FormControl error={!!errors.role} required>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={(value) => setValue('role', value)}>
                <SelectTrigger error={!!errors.role}>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="guest">Guest</SelectItem>
                </SelectContent>
              </Select>
              {errors.role && (
                <FormHelperText error>{errors.role.message}</FormHelperText>
              )}
            </FormControl>

            <FormControl error={!!errors.bio}>
              <FormLabel>Bio</FormLabel>
              <Textarea
                {...register('bio')}
                placeholder="Tell us about yourself"
                rows={4}
                error={!!errors.bio}
              />
              {errors.bio && (
                <FormHelperText error>{errors.bio.message}</FormHelperText>
              )}
            </FormControl>
          </VStack>
        </CardContent>
        <CardFooter className="justify-end gap-2">
          <Button variant="outline" type="button">
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create User'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
```

### Confirmation Dialog

```tsx
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  Button,
} from '@onesaz/ui'

function DeleteButton({ onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await onDelete()
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete Item</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the item
            and remove it from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
```

---

## Additional Resources

### Links

- **Storybook Documentation**: Run `npm run storybook` to view all components
- **GitHub**: [https://github.com/onesaz/onesaz-ui](https://github.com/onesaz/onesaz-ui)
- **NPM**: [@onesaz/ui](https://www.npmjs.com/package/@onesaz/ui)

### Contributing

Contributions are welcome! Please see our contributing guidelines in the repository.

### Support

For issues and questions:
- Open an issue on GitHub
- Check existing Storybook documentation
- Review component stories for usage examples

### License

MIT License - see LICENSE file for details.

---

**Last Updated:** February 16, 2026  
**Version:** 1.0.0
