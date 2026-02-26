import * as React from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type RowSelectionState,
  type PaginationState,
  type VisibilityState,
  type ColumnSizingState,
} from '@tanstack/react-table'
import { useVirtualizer } from '@tanstack/react-virtual'
import { cn } from '../../utils/cn'
import { Checkbox } from '../checkbox'
import { Input } from '../input'
import { Button } from '../button'
import { Spinner } from '../spinner'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
} from '../pagination'

// MUI DataGrid-compatible column definition
export interface GridColDef<TData = any> {
  field: string
  headerName?: string
  width?: number
  minWidth?: number
  maxWidth?: number
  flex?: number
  sortable?: boolean
  filterable?: boolean
  editable?: boolean
  hide?: boolean
  hideable?: boolean // Can this column be hidden by user?
  align?: 'left' | 'center' | 'right'
  headerAlign?: 'left' | 'center' | 'right'
  renderCell?: (params: GridRenderCellParams<TData>) => React.ReactNode
  renderHeader?: (params: GridRenderHeaderParams) => React.ReactNode
  valueGetter?: (params: GridValueGetterParams<TData>) => any
  valueFormatter?: (params: GridValueFormatterParams) => string
  type?: 'string' | 'number' | 'date' | 'dateTime' | 'boolean'
  // Cell content handling
  wrapText?: boolean // If true, text wraps instead of truncating (default: false)
  scrollable?: boolean // If true, cell content becomes scrollable when it overflows
  maxCellHeight?: number // Maximum height for scrollable cells (default: 100px)
  cellClassName?: string // Custom className for cell content
  // Spanning
  colSpan?: number | ((params: GridSpanParams<TData>) => number | undefined) // Number of columns this cell should span
  rowSpan?: boolean | ((params: GridSpanParams<TData>) => number | undefined) // true for auto-merge consecutive same values, or function returning span count
  // For export exclusion
  export?: boolean
  hideExport?: boolean
  disableExport?: boolean
}

export interface GridRenderCellParams<TData = any> {
  row: TData
  value: any
  field: string
  rowIndex: number
}

export interface GridRenderHeaderParams {
  field: string
  colDef: GridColDef
}

export interface GridValueGetterParams<TData = any> {
  row: TData
  field: string
}

export interface GridValueFormatterParams {
  value: any
}

export interface GridSpanParams<TData = any> {
  row: TData
  value: any
  field: string
  rowIndex: number
}

export interface PaginationModel {
  page: number
  pageSize: number
}

export interface GridRowSelectionModel {
  [key: string]: boolean
}

export interface ColumnVisibilityModel {
  [key: string]: boolean
}

// Pinned rows model (MUI DataGrid Pro compatible)
export interface PinnedRowsModel<TData = any> {
  top?: TData[]
  bottom?: TData[]
}

// Pinned columns model (MUI DataGrid Pro compatible)
export interface PinnedColumnsModel {
  left?: string[]
  right?: string[]
}

// Column group definition (MUI DataGrid Pro compatible)
export interface ColumnGroupModel {
  groupId: string
  headerName?: string
  children: { field: string }[]
  headerAlign?: 'left' | 'center' | 'right'
}

// Density affects row height
type GridDensity = 'compact' | 'standard' | 'comfortable'

export interface DataGridProps<TData = any> {
  // Required
  rows: TData[]
  columns: GridColDef<TData>[]

  // Row identification
  getRowId?: (row: TData) => string | number

  // Loading state
  loading?: boolean

  // Title and toolbar
  title?: string
  toolBar?: boolean

  // Selection
  checkboxSelection?: boolean
  rowSelectionModel?: GridRowSelectionModel
  onRowSelectionModelChange?: (model: GridRowSelectionModel) => void
  disableRowSelectionOnClick?: boolean

  // Column visibility
  columnVisibilityModel?: ColumnVisibilityModel
  onColumnVisibilityModelChange?: (model: ColumnVisibilityModel) => void

  // Pagination
  paginationMode?: 'client' | 'server'
  paginationModel?: PaginationModel
  onPaginationModelChange?: (model: PaginationModel) => void
  rowCount?: number
  pageSizeOptions?: number[]

  // Sorting
  sortingMode?: 'client' | 'server'
  /** Initial sort model - array of { field: string, sort: 'asc' | 'desc' } */
  initialSortModel?: { field: string; sort: 'asc' | 'desc' }[]
  /** If true, sorts by createdAt descending (latest first). Requires a 'createdAt' field in rows. */
  sortLatestFirst?: boolean

  // Filtering
  filterMode?: 'client' | 'server'

  // Appearance
  height?: number | string
  minHeight?: number | string
  maxHeight?: number | string
  density?: GridDensity
  showCellVerticalBorder?: boolean
  showColumnVerticalBorder?: boolean
  hideFooter?: boolean
  hideFooterPagination?: boolean

  // Virtualization
  virtualized?: boolean // Enable row virtualization for large datasets
  overscan?: number // Number of rows to render outside visible area (default: 5)

  // Cell content handling
  wrapText?: boolean // If true, text wraps instead of truncating (global default, can be overridden per column)

  // Row styling
  getRowClassName?: (params: { row: TData; rowIndex: number }) => string

  // Pinned rows (MUI DataGrid Pro compatible)
  pinnedRows?: PinnedRowsModel<TData>

  // Pinned columns (MUI DataGrid Pro compatible)
  pinnedColumns?: PinnedColumnsModel

  // Column grouping (MUI DataGrid Pro compatible)
  columnGroupingModel?: ColumnGroupModel[]

  // Custom slot props (for toolbar customization)
  slotProps?: {
    toolbar?: {
      getExportedColumns?: (columns: GridColDef[]) => GridColDef[]
      showQuickFilter?: boolean
      showColumnSelector?: boolean
      showExport?: boolean
      customButtons?: React.ReactNode
      moreOptions?: {
        label: string
        onClick: () => void
        icon?: React.ReactNode
      }[]
    }
  }

  // Export configuration
  onExport?: (data: TData[], columns: GridColDef<TData>[]) => void
  exportFileName?: string

  // Column resizing
  resizableColumns?: boolean
  onColumnResize?: (columnId: string, width: number) => void

  // Custom styles
  className?: string
  sx?: React.CSSProperties

  // Actions (edit/delete) - simplified for V0
  actions?: {
    edit?: boolean
    del?: boolean
  }

  // Sensitive info - affects export
  sensitiveInfo?: boolean

  // Other MUI compatibility props
  autoHeight?: boolean
  disableColumnMenu?: boolean
  disableColumnFilter?: boolean
  disableColumnSelector?: boolean
  disableDensitySelector?: boolean
}

// Convert MUI column def to TanStack column def
function convertColumns<TData>(
  columns: GridColDef<TData>[],
  checkboxSelection?: boolean
): ColumnDef<TData>[] {
  const tanstackColumns: ColumnDef<TData>[] = []

  // Add checkbox column if enabled
  if (checkboxSelection) {
    tanstackColumns.push({
      id: '__select__',
      header: ({ table }) => (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onChange={(e) => table.toggleAllPageRowsSelected(e.target.checked)}
            aria-label="Select all"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={row.getIsSelected()}
            onChange={(e) => row.toggleSelected(e.target.checked)}
            aria-label="Select row"
          />
        </div>
      ),
      size: 50,
      enableSorting: false,
      enableColumnFilter: false,
      enableHiding: false,
    })
  }

  // Convert each MUI column
  columns.forEach((col) => {
    // Skip if column is initially hidden via hide prop
    if (col.hide) return

    const tanstackCol: ColumnDef<TData> = {
      id: col.field,
      accessorFn: (row) => {
        if (col.valueGetter) {
          return col.valueGetter({ row, field: col.field })
        }
        return (row as any)[col.field]
      },
      header: col.renderHeader
        ? () => col.renderHeader!({ field: col.field, colDef: col })
        : col.headerName || col.field,
      cell: ({ row, getValue }) => {
        const value = getValue()
        if (col.renderCell) {
          return col.renderCell({
            row: row.original,
            value,
            field: col.field,
            rowIndex: row.index,
          })
        }
        if (col.valueFormatter) {
          return col.valueFormatter({ value })
        }
        return value
      },
      enableSorting: col.sortable !== false,
      enableHiding: col.hideable !== false,
      size: col.width,
      minSize: col.minWidth,
      maxSize: col.maxWidth,
      meta: {
        align: col.align,
        headerAlign: col.headerAlign,
        flex: col.flex,
        headerName: col.headerName || col.field,
        wrapText: col.wrapText,
        scrollable: col.scrollable,
        maxCellHeight: col.maxCellHeight,
        cellClassName: col.cellClassName,
        colSpan: col.colSpan,
        rowSpan: col.rowSpan,
      },
    }

    tanstackColumns.push(tanstackCol)
  })

  return tanstackColumns
}

// Density to height mapping
const densityRowHeights: Record<GridDensity, number> = {
  compact: 36,
  standard: 52,
  comfortable: 68,
}

// Calculate initial column widths based on flex, width, minWidth, maxWidth (like MUI DataGrid)
// This only calculates initial widths - resized widths are handled by TanStack Table's columnSizing state
interface CalculatedColumnWidth {
  id: string
  width: number
  minWidth: number
  maxWidth: number
  flex?: number
}

function calculateInitialColumnWidths(
  columns: GridColDef[],
  containerWidth: number,
  checkboxSelection: boolean,
  columnSizing: ColumnSizingState // Already resized columns
): Map<string, CalculatedColumnWidth> {
  const widthMap = new Map<string, CalculatedColumnWidth>()

  if (containerWidth <= 0) return widthMap

  let remainingWidth = containerWidth

  // Reserve space for checkbox column
  if (checkboxSelection) {
    widthMap.set('__select__', { id: '__select__', width: 50, minWidth: 50, maxWidth: 50 })
    remainingWidth -= 50
  }

  // First pass: handle fixed width columns and manually resized columns
  const flexColumns: { col: GridColDef; flex: number; minWidth: number; maxWidth: number }[] = []
  let totalFlex = 0

  columns.forEach((col) => {
    if (col.hide) return

    const minWidth = col.minWidth || 50
    const maxWidth = col.maxWidth || 9999

    // If column was manually resized, use that width (it becomes fixed)
    if (columnSizing[col.field]) {
      const resizedWidth = columnSizing[col.field]
      widthMap.set(col.field, {
        id: col.field,
        width: resizedWidth,
        minWidth,
        maxWidth,
      })
      remainingWidth -= resizedWidth
      return
    }

    if (col.flex && col.flex > 0) {
      // Flex column - calculate later
      flexColumns.push({ col, flex: col.flex, minWidth, maxWidth })
      totalFlex += col.flex
      remainingWidth -= minWidth // Reserve minimum width
    } else {
      // Fixed width column
      const width = col.width || 100
      const finalWidth = Math.max(minWidth, Math.min(width, maxWidth))
      widthMap.set(col.field, {
        id: col.field,
        width: finalWidth,
        minWidth,
        maxWidth,
      })
      remainingWidth -= finalWidth
    }
  })

  // Second pass: distribute remaining width to flex columns (only non-resized ones)
  if (flexColumns.length > 0 && totalFlex > 0) {
    const extraWidth = Math.max(0, remainingWidth)

    flexColumns.forEach(({ col, flex, minWidth, maxWidth }) => {
      const proportionalExtra = (flex / totalFlex) * extraWidth
      const calculatedWidth = minWidth + proportionalExtra
      const finalWidth = Math.max(minWidth, Math.min(calculatedWidth, maxWidth))
      widthMap.set(col.field, {
        id: col.field,
        width: finalWidth,
        minWidth,
        maxWidth,
        flex,
      })
    })
  }

  return widthMap
}

// Memoized hook for column widths
function useColumnWidths(
  columns: GridColDef[],
  containerWidth: number,
  checkboxSelection: boolean,
  columnSizing: ColumnSizingState
): Map<string, CalculatedColumnWidth> {
  return React.useMemo(
    () => calculateInitialColumnWidths(columns, containerWidth, checkboxSelection, columnSizing),
    [columns, containerWidth, checkboxSelection, columnSizing]
  )
}

// Column resize handle component - uses TanStack Table's resize handler
const ColumnResizeHandle = ({
  header,
  isResizing,
}: {
  header: any
  isResizing: boolean
}) => {
  return (
    <div
      className={cn(
        // Wider hit area (8px) for easier clicking, but visually narrow
        'absolute right-0 top-0 h-full w-2 cursor-col-resize select-none touch-none z-10',
        // Visual indicator using pseudo-element
        'after:absolute after:right-0 after:top-0 after:h-full after:w-[2px]',
        'hover:after:bg-primary-500',
        isResizing && 'after:bg-primary-500'
      )}
      onMouseDown={header.getResizeHandler()}
      onTouchStart={header.getResizeHandler()}
      onClick={(e) => e.stopPropagation()}
    />
  )
}

// Sort icon component
const SortIcon = ({ direction }: { direction: 'asc' | 'desc' | false }) => {
  if (!direction) {
    return (
      <svg className="ml-1 h-4 w-4 text-muted-foreground/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M7 15l5 5 5-5M7 9l5-5 5 5" />
      </svg>
    )
  }
  return (
    <svg className="ml-1 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      {direction === 'asc' ? <path d="M7 14l5-5 5 5" /> : <path d="M7 10l5 5 5-5" />}
    </svg>
  )
}

// Column visibility dropdown
const ColumnVisibilityDropdown = ({
  table,
}: {
  table: any
}) => {
  const [open, setOpen] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const allColumns = table.getAllLeafColumns().filter((col: any) => col.id !== '__select__')

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(!open)}
        className="h-9 gap-2"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 3v18M3 12h18" />
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
        </svg>
        Columns
      </Button>

      {open && (
        <div className="absolute right-0 top-full mt-1 z-50 min-w-[180px] rounded-md border border-border bg-popover p-2 shadow-md">
          <div className="text-xs font-medium text-foreground mb-2 px-2">Show/Hide Columns</div>
          <div className="max-h-[300px] overflow-auto">
            {allColumns.map((column: any) => {
              const meta = column.columnDef.meta as any
              const headerName = meta?.headerName || column.id

              return (
                <label
                  key={column.id}
                  className="flex items-center gap-2 px-2 py-1.5 hover:bg-muted rounded cursor-pointer"
                >
                  <Checkbox
                    checked={column.getIsVisible()}
                    onChange={(e) => column.toggleVisibility(e.target.checked)}
                  />
                  <span className="text-xs">{headerName}</span>
                </label>
              )
            })}
          </div>
          <div className="border-t border-border mt-2 pt-2 flex gap-2 px-2">
            <Button
              variant="ghost"
              size="sm"
              className="flex-1 h-7 text-xs"
              onClick={() => table.toggleAllColumnsVisible(true)}
            >
              Show All
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex-1 h-7 text-xs"
              onClick={() => table.toggleAllColumnsVisible(false)}
            >
              Hide All
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

// Pagination component using existing Pagination primitives
const DataGridPagination = ({
  table,
  pageSizeOptions = [10, 25, 50, 100],
  rowCount,
  paginationMode,
}: {
  table: any
  pageSizeOptions?: number[]
  rowCount?: number
  paginationMode?: 'client' | 'server'
}) => {
  const pageCount = paginationMode === 'server' && rowCount
    ? Math.ceil(rowCount / table.getState().pagination.pageSize)
    : table.getPageCount()

  const currentPage = table.getState().pagination.pageIndex
  const totalRows = paginationMode === 'server' && rowCount ? rowCount : table.getFilteredRowModel().rows.length
  const pageSize = table.getState().pagination.pageSize

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = []
    const maxVisible = 5

    if (pageCount <= maxVisible) {
      for (let i = 0; i < pageCount; i++) pages.push(i)
    } else {
      // Always show first page
      pages.push(0)

      if (currentPage > 2) {
        pages.push('ellipsis')
      }

      // Show pages around current
      const start = Math.max(1, currentPage - 1)
      const end = Math.min(pageCount - 2, currentPage + 1)

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i)
      }

      if (currentPage < pageCount - 3) {
        pages.push('ellipsis')
      }

      // Always show last page
      if (!pages.includes(pageCount - 1)) {
        pages.push(pageCount - 1)
      }
    }

    return pages
  }

  const startRow = currentPage * pageSize + 1
  const endRow = Math.min((currentPage + 1) * pageSize, totalRows)

  return (
    <div className="flex items-center justify-end gap-4 px-4 py-3 border-t border-border bg-background">
      {/* Rows per page */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground whitespace-nowrap">
        <span>Rows per page:</span>
        <select
          value={pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
          className="h-8 rounded-md border border-border bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      {/* Row count info */}
      <span className="text-xs text-muted-foreground whitespace-nowrap">
        {startRow}-{endRow} of {totalRows}
      </span>

      {/* Pagination controls using existing components */}
      <Pagination className="mx-0 w-auto">
        <PaginationContent>
          {/* First page */}
          <PaginationItem>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 17l-5-5 5-5M18 17l-5-5 5-5" />
              </svg>
            </Button>
          </PaginationItem>

          {/* Previous page */}
          <PaginationItem>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </Button>
          </PaginationItem>

          {/* Page numbers */}
          {getPageNumbers().map((page, idx) =>
            page === 'ellipsis' ? (
              <PaginationItem key={`ellipsis-${idx}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={page}>
                <PaginationLink
                  isActive={page === currentPage}
                  onClick={() => table.setPageIndex(page)}
                >
                  {page + 1}
                </PaginationLink>
              </PaginationItem>
            )
          )}

          {/* Next page */}
          <PaginationItem>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </Button>
          </PaginationItem>

          {/* Last page */}
          <PaginationItem>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => table.setPageIndex(pageCount - 1)}
              disabled={!table.getCanNextPage()}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 17l5-5-5-5M6 17l5-5-5-5" />
              </svg>
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

// Export dropdown component
const ExportDropdown = ({
  onExport,
  rows,
  columns,
  fileName = 'data-export',
}: {
  onExport?: (data: any[], columns: GridColDef[]) => void
  rows: any[]
  columns: GridColDef[]
  fileName?: string
}) => {
  const [open, setOpen] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const exportToCSV = () => {
    const visibleColumns = columns.filter(col => !col.hide && !col.disableExport && !col.hideExport)
    const headers = visibleColumns.map(col => col.headerName || col.field)
    const csvRows = [headers.join(',')]

    rows.forEach(row => {
      const values = visibleColumns.map(col => {
        // Use valueGetter if available, otherwise use direct field access
        let value;
        if (col.valueGetter) {
          value = col.valueGetter({ row, field: col.field });
        } else {
          value = row[col.field];
        }
        // Escape quotes and wrap in quotes if contains comma
        const stringValue = String(value ?? '')
        if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
          return `"${stringValue.replace(/"/g, '""')}"`
        }
        return stringValue
      })
      csvRows.push(values.join(','))
    })

    const csvContent = csvRows.join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `${fileName}.csv`
    link.click()
    URL.revokeObjectURL(link.href)
    setOpen(false)
  }

  const handleCustomExport = () => {
    if (onExport) {
      onExport(rows, columns)
    }
    setOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(!open)}
        className="h-9 gap-2"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        Export
      </Button>

      {open && (
        <div className="absolute right-0 top-full mt-1 z-50 min-w-[140px] rounded-md border border-border bg-popover p-1 shadow-md">
          <button
            className="flex w-full items-center gap-2 rounded px-3 py-2 text-xs hover:bg-muted"
            onClick={exportToCSV}
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            Export CSV
          </button>
          {onExport && (
            <button
              className="flex w-full items-center gap-2 rounded px-3 py-2 text-xs hover:bg-muted"
              onClick={handleCustomExport}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
              Custom Export
            </button>
          )}
        </div>
      )}
    </div>
  )
}

// More options dropdown component
const MoreOptionsDropdown = ({
  options,
}: {
  options: { label: string; onClick: () => void; icon?: React.ReactNode }[]
}) => {
  const [open, setOpen] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (options.length === 0) return null

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setOpen(!open)}
        className="h-9 w-9"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="1" />
          <circle cx="12" cy="5" r="1" />
          <circle cx="12" cy="19" r="1" />
        </svg>
      </Button>

      {open && (
        <div className="absolute right-0 top-full mt-1 z-50 min-w-[160px] rounded-md border border-border bg-popover p-1 shadow-md">
          {options.map((option, index) => (
            <button
              key={index}
              className="flex w-full items-center gap-2 rounded px-3 py-2 text-xs hover:bg-muted"
              onClick={() => {
                option.onClick()
                setOpen(false)
              }}
            >
              {option.icon}
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// Toolbar component
const DataGridToolbar = ({
  title,
  globalFilter,
  setGlobalFilter,
  showQuickFilter = true,
  showColumnSelector = true,
  showExport = true,
  table,
  rows,
  columns,
  onExport,
  exportFileName,
  customButtons,
  moreOptions = [],
}: {
  title?: string
  globalFilter: string
  setGlobalFilter: (value: string) => void
  showQuickFilter?: boolean
  showColumnSelector?: boolean
  showExport?: boolean
  table: any
  rows: any[]
  columns: GridColDef[]
  onExport?: (data: any[], columns: GridColDef[]) => void
  exportFileName?: string
  customButtons?: React.ReactNode
  moreOptions?: { label: string; onClick: () => void; icon?: React.ReactNode }[]
}) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-background">
      {title && (
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      )}
      <div className="flex items-center gap-2 ml-auto">
        {showQuickFilter && (
          <Input
            placeholder="Search..."
            value={globalFilter ?? ''}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="h-9 w-64"
          />
        )}
        {showColumnSelector && (
          <ColumnVisibilityDropdown table={table} />
        )}
        {showExport && (
          <ExportDropdown
            onExport={onExport}
            rows={rows}
            columns={columns}
            fileName={exportFileName}
          />
        )}
        {customButtons}
        {moreOptions.length > 0 && (
          <MoreOptionsDropdown options={moreOptions} />
        )}
      </div>
    </div>
  )
}

// Row span map: columnId -> rowIndex -> span (0 means skip, >1 means render with rowSpan attribute)
// Cells with span=1 are normal, span=0 should be hidden, span>1 should use HTML rowSpan
type RowSpanMap = Map<string, Map<number, number>>

function computeRowSpanMap(
  rows: any[],
  columns: GridColDef[],
): RowSpanMap | undefined {
  // Check if any column uses rowSpan
  const rowSpanColumns = columns.filter((col) => col.rowSpan)
  if (rowSpanColumns.length === 0) return undefined

  const map: RowSpanMap = new Map()

  rowSpanColumns.forEach((col) => {
    const colMap = new Map<number, number>()
    const field = col.field

    if (typeof col.rowSpan === 'function') {
      // Function-based rowSpan
      const rowSpanFn = col.rowSpan
      let i = 0
      while (i < rows.length) {
        const row = rows[i]
        const value = row.original ? row.original[field] : row[field]
        const span = rowSpanFn({ row: row.original || row, value, field, rowIndex: i })
        if (span && span > 1) {
          colMap.set(i, span)
          // Mark subsequent rows as skipped
          for (let j = 1; j < span && (i + j) < rows.length; j++) {
            colMap.set(i + j, 0)
          }
          i += span
        } else {
          colMap.set(i, 1)
          i++
        }
      }
    } else if (col.rowSpan === true) {
      // Auto-merge: merge consecutive rows with the same value
      let i = 0
      while (i < rows.length) {
        const row = rows[i]
        const value = row.original ? row.original[field] : row[field]
        let span = 1
        // Count consecutive identical values
        while (
          i + span < rows.length
        ) {
          const nextRow = rows[i + span]
          const nextValue = nextRow.original ? nextRow.original[field] : nextRow[field]
          if (nextValue === value) {
            span++
          } else {
            break
          }
        }
        colMap.set(i, span)
        // Mark subsequent rows as skipped (span = 0)
        for (let j = 1; j < span; j++) {
          colMap.set(i + j, 0)
        }
        i += span
      }
    }

    if (colMap.size > 0) {
      map.set(field, colMap)
    }
  })

  return map.size > 0 ? map : undefined
}

// Row renderer component for both virtualized and non-virtualized modes
interface RowRendererProps {
  row: any
  rowIndex: number
  rowHeight: number
  showCellVerticalBorder: boolean
  checkboxSelection: boolean
  disableRowSelectionOnClick: boolean
  getRowClassName?: (params: { row: any; rowIndex: number }) => string
  style?: React.CSSProperties
  globalWrapText?: boolean
  columnWidths: Map<string, CalculatedColumnWidth>
  pinnedColumnOffsets?: Map<string, { side: 'left' | 'right'; offset: number }>
  isPinnedRow?: boolean
  rowSpanMap?: RowSpanMap
  gridColumns?: GridColDef[]
}

const RowRenderer = ({
  row,
  rowIndex,
  rowHeight,
  showCellVerticalBorder,
  checkboxSelection,
  disableRowSelectionOnClick,
  getRowClassName,
  style,
  globalWrapText = false,
  columnWidths,
  pinnedColumnOffsets,
  isPinnedRow = false,
  rowSpanMap,
  gridColumns,
}: RowRendererProps) => {
  const customClassName = getRowClassName?.({ row: row.original, rowIndex })
  const visibleCells = row.getVisibleCells()

  // Pre-compute colSpan skip set and colSpan values
  const colSpanSkipSet = new Set<number>()
  const colSpanValues = new Map<number, number>()

  if (gridColumns) {
    visibleCells.forEach((cell: any, cellIndex: number) => {
      if (colSpanSkipSet.has(cellIndex)) return
      const meta = cell.column.columnDef.meta as any
      const colSpanDef = meta?.colSpan
      if (colSpanDef) {
        const value = cell.getValue()
        let span: number | undefined
        if (typeof colSpanDef === 'function') {
          span = colSpanDef({ row: row.original, value, field: cell.column.id, rowIndex })
        } else if (typeof colSpanDef === 'number') {
          span = colSpanDef
        }
        if (span && span > 1) {
          colSpanValues.set(cellIndex, span)
          for (let j = 1; j < span && (cellIndex + j) < visibleCells.length; j++) {
            colSpanSkipSet.add(cellIndex + j)
          }
        }
      }
    })
  }

  return (
    <tr
      key={row.id}
      className={cn(
        'border-b border-border transition-colors hover:bg-muted/50',
        row.getIsSelected() && 'bg-accent/10',
        isPinnedRow && 'bg-muted/30 font-semibold',
        customClassName
      )}
      data-state={row.getIsSelected() ? 'selected' : undefined}
      style={style}
      onClick={() => {
        if (!disableRowSelectionOnClick && checkboxSelection) {
          row.toggleSelected()
        }
      }}
    >
      {visibleCells.map((cell: any, cellIndex: number) => {
        // Skip cells consumed by colSpan
        if (colSpanSkipSet.has(cellIndex)) return null

        // Check rowSpan
        const colId = cell.column.id
        if (rowSpanMap) {
          const colRowSpan = rowSpanMap.get(colId)
          if (colRowSpan) {
            const spanValue = colRowSpan.get(rowIndex)
            if (spanValue === 0) return null // This cell is consumed by a rowSpan above
          }
        }

        const meta = cell.column.columnDef.meta as any
        const align = meta?.align || 'left'
        const wrapText = meta?.wrapText !== undefined ? meta.wrapText : globalWrapText
        const scrollable = meta?.scrollable || false
        const maxCellHeight = meta?.maxCellHeight || 100
        const cellClassName = meta?.cellClassName

        const colWidth = columnWidths.get(cell.column.id)
        const width = colWidth?.width || cell.column.getSize()
        const pinnedInfo = pinnedColumnOffsets?.get(cell.column.id)

        // Compute actual colSpan and rowSpan HTML attributes
        const htmlColSpan = colSpanValues.get(cellIndex)
        let htmlRowSpan: number | undefined
        if (rowSpanMap) {
          const colRowSpan = rowSpanMap.get(colId)
          if (colRowSpan) {
            const spanValue = colRowSpan.get(rowIndex)
            if (spanValue && spanValue > 1) {
              htmlRowSpan = spanValue
            }
          }
        }

        // Calculate width for colSpan (sum of spanned column widths)
        let totalWidth = width
        if (htmlColSpan && htmlColSpan > 1) {
          for (let j = 1; j < htmlColSpan && (cellIndex + j) < visibleCells.length; j++) {
            const spannedCell = visibleCells[cellIndex + j]
            const spannedColWidth = columnWidths.get(spannedCell.column.id)
            totalWidth += spannedColWidth?.width || spannedCell.column.getSize()
          }
        }

        return (
          <td
            key={cell.id}
            colSpan={htmlColSpan}
            rowSpan={htmlRowSpan}
            className={cn(
              'px-4 overflow-hidden border-b border-border',
              showCellVerticalBorder && 'border-r border-border',
              pinnedInfo && 'sticky z-[1] bg-background',
              pinnedInfo?.side === 'left' && 'border-r border-border',
              pinnedInfo?.side === 'right' && 'border-l border-border',
              htmlRowSpan && htmlRowSpan > 1 && 'align-middle',
            )}
            style={{
              height: htmlRowSpan && htmlRowSpan > 1
                ? rowHeight * htmlRowSpan
                : wrapText || scrollable ? undefined : rowHeight,
              minHeight: rowHeight,
              textAlign: align,
              width: htmlColSpan && htmlColSpan > 1 ? totalWidth : width,
              maxWidth: htmlColSpan && htmlColSpan > 1 ? undefined : colWidth?.maxWidth || width,
              minWidth: colWidth?.minWidth || cell.column.columnDef.minSize,
              verticalAlign: htmlRowSpan && htmlRowSpan > 1 ? 'middle' : undefined,
              ...(pinnedInfo ? {
                position: 'sticky' as const,
                [pinnedInfo.side]: pinnedInfo.offset,
                zIndex: 1,
              } : {}),
            }}
          >
            <div
              className={cn(
                wrapText ? 'whitespace-normal break-words' : scrollable ? 'overflow-auto' : 'truncate',
                scrollable && 'max-h-[100px]',
                cellClassName
              )}
              style={{
                maxHeight: scrollable ? `${maxCellHeight}px` : undefined,
              }}
              title={
                !wrapText && !scrollable && (typeof cell.getValue() === 'string' || typeof cell.getValue() === 'number')
                  ? String(cell.getValue())
                  : undefined
              }
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </div>
          </td>
        )
      })}
    </tr>
  )
}

// Virtualized table body component
interface VirtualizedTableBodyProps {
  table: any
  rowHeight: number
  showCellVerticalBorder: boolean
  checkboxSelection: boolean
  disableRowSelectionOnClick: boolean
  getRowClassName?: (params: { row: any; rowIndex: number }) => string
  overscan: number
  parentRef: React.RefObject<HTMLDivElement>
  globalWrapText?: boolean
  columnWidths: Map<string, CalculatedColumnWidth>
  pinnedColumnOffsets?: Map<string, { side: 'left' | 'right'; offset: number }>
  rowSpanMap?: RowSpanMap
  gridColumns?: GridColDef[]
}

const VirtualizedTableBody = ({
  table,
  rowHeight,
  showCellVerticalBorder,
  checkboxSelection,
  disableRowSelectionOnClick,
  getRowClassName,
  overscan,
  parentRef,
  globalWrapText = false,
  columnWidths,
  pinnedColumnOffsets,
  rowSpanMap,
  gridColumns,
}: VirtualizedTableBodyProps) => {
  const rows = table.getRowModel().rows

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => rowHeight,
    overscan,
  })

  const virtualRows = virtualizer.getVirtualItems()

  if (rows.length === 0) {
    return (
      <tbody>
        <tr>
          <td
            colSpan={table.getVisibleLeafColumns().length}
            className="h-32 text-center text-muted-foreground"
          >
            No data available
          </td>
        </tr>
      </tbody>
    )
  }

  // Calculate padding for virtual scroll
  const paddingTop = virtualRows.length > 0 ? virtualRows[0].start : 0
  const paddingBottom = virtualRows.length > 0
    ? virtualizer.getTotalSize() - (virtualRows[virtualRows.length - 1].end)
    : 0

  return (
    <tbody>
      {/* Top spacer row */}
      {paddingTop > 0 && (
        <tr>
          <td
            colSpan={table.getVisibleLeafColumns().length}
            style={{ height: paddingTop, padding: 0, border: 'none' }}
          />
        </tr>
      )}
      {/* Visible rows */}
      {virtualRows.map((virtualRow) => {
        const row = rows[virtualRow.index]
        return (
          <RowRenderer
            key={row.id}
            row={row}
            rowIndex={virtualRow.index}
            rowHeight={rowHeight}
            showCellVerticalBorder={showCellVerticalBorder}
            checkboxSelection={checkboxSelection}
            disableRowSelectionOnClick={disableRowSelectionOnClick}
            getRowClassName={getRowClassName}
            globalWrapText={globalWrapText}
            columnWidths={columnWidths}
            pinnedColumnOffsets={pinnedColumnOffsets}
            rowSpanMap={rowSpanMap}
            gridColumns={gridColumns}
          />
        )
      })}
      {/* Bottom spacer row */}
      {paddingBottom > 0 && (
        <tr>
          <td
            colSpan={table.getVisibleLeafColumns().length}
            style={{ height: paddingBottom, padding: 0, border: 'none' }}
          />
        </tr>
      )}
    </tbody>
  )
}

// Standard table body component
interface StandardTableBodyProps {
  table: any
  rowHeight: number
  showCellVerticalBorder: boolean
  checkboxSelection: boolean
  disableRowSelectionOnClick: boolean
  getRowClassName?: (params: { row: any; rowIndex: number }) => string
  globalWrapText?: boolean
  columnWidths: Map<string, CalculatedColumnWidth>
  pinnedColumnOffsets?: Map<string, { side: 'left' | 'right'; offset: number }>
  rowSpanMap?: RowSpanMap
  gridColumns?: GridColDef[]
}

const StandardTableBody = ({
  table,
  rowHeight,
  showCellVerticalBorder,
  checkboxSelection,
  disableRowSelectionOnClick,
  getRowClassName,
  globalWrapText = false,
  columnWidths,
  pinnedColumnOffsets,
  rowSpanMap,
  gridColumns,
}: StandardTableBodyProps) => {
  const rows = table.getRowModel().rows

  if (rows.length === 0) {
    return (
      <tbody>
        <tr>
          <td
            colSpan={table.getVisibleLeafColumns().length}
            className="h-32 text-center text-muted-foreground"
          >
            No data available
          </td>
        </tr>
      </tbody>
    )
  }

  return (
    <tbody>
      {rows.map((row: any, rowIndex: number) => (
        <RowRenderer
          key={row.id}
          row={row}
          rowIndex={rowIndex}
          rowHeight={rowHeight}
          showCellVerticalBorder={showCellVerticalBorder}
          checkboxSelection={checkboxSelection}
          disableRowSelectionOnClick={disableRowSelectionOnClick}
          getRowClassName={getRowClassName}
          globalWrapText={globalWrapText}
          columnWidths={columnWidths}
          pinnedColumnOffsets={pinnedColumnOffsets}
          rowSpanMap={rowSpanMap}
          gridColumns={gridColumns}
        />
      ))}
    </tbody>
  )
}

// Pinned rows renderer - renders rows outside the scrollable body
interface PinnedRowsRendererProps {
  pinnedData: any[]
  columns: GridColDef[]
  tanstackColumns: ColumnDef<any>[]
  getRowId?: (row: any) => string | number
  rowHeight: number
  showCellVerticalBorder: boolean
  getRowClassName?: (params: { row: any; rowIndex: number }) => string
  globalWrapText?: boolean
  columnWidths: Map<string, CalculatedColumnWidth>
  pinnedColumnOffsets?: Map<string, { side: 'left' | 'right'; offset: number }>
  position: 'top' | 'bottom'
  columnVisibility: VisibilityState
}

const PinnedRowsRenderer = ({
  pinnedData,
  columns: _gridColumns,
  tanstackColumns,
  getRowId: getRowIdFn,
  rowHeight,
  showCellVerticalBorder,
  getRowClassName,
  globalWrapText = false,
  columnWidths,
  pinnedColumnOffsets,
  position,
  columnVisibility,
}: PinnedRowsRendererProps) => {
  // Create a mini table instance for pinned rows
  const pinnedTable = useReactTable({
    data: pinnedData,
    columns: tanstackColumns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: getRowIdFn ? (row) => String(getRowIdFn(row)) : undefined,
    state: { columnVisibility },
  })

  const pinnedRows = pinnedTable.getRowModel().rows
  if (pinnedRows.length === 0) return null

  return (
    <tbody>
      {pinnedRows.map((row: any, rowIndex: number) => {
        const customClassName = getRowClassName?.({ row: row.original, rowIndex })
        return (
          <tr
            key={row.id}
            className={cn(
              'sticky z-[2] border-b border-border bg-muted font-medium',
              position === 'top' && 'top-0 border-b-2 border-b-border',
              position === 'bottom' && 'bottom-0 border-t-2 border-t-border',
              customClassName
            )}
          >
            {row.getVisibleCells().map((cell: any) => {
              const meta = cell.column.columnDef.meta as any
              const align = meta?.align || 'left'
              const wrapText = meta?.wrapText !== undefined ? meta.wrapText : globalWrapText
              const scrollable = meta?.scrollable || false
              const maxCellHeight = meta?.maxCellHeight || 100
              const cellClassName = meta?.cellClassName
              const colWidth = columnWidths.get(cell.column.id)
              const width = colWidth?.width || cell.column.getSize()
              const pinnedInfo = pinnedColumnOffsets?.get(cell.column.id)

              return (
                <td
                  key={cell.id}
                  className={cn(
                    'px-4 overflow-hidden bg-muted border-b border-border',
                    showCellVerticalBorder && 'border-r border-border',
                    pinnedInfo && 'sticky z-[3]',
                    pinnedInfo?.side === 'left' && 'border-r border-border',
                    pinnedInfo?.side === 'right' && 'border-l border-border',
                  )}
                  style={{
                    height: wrapText || scrollable ? 'auto' : rowHeight,
                    minHeight: rowHeight,
                    textAlign: align,
                    width,
                    maxWidth: colWidth?.maxWidth || width,
                    minWidth: colWidth?.minWidth || cell.column.columnDef.minSize,
                    ...(pinnedInfo ? {
                      position: 'sticky' as const,
                      [pinnedInfo.side]: pinnedInfo.offset,
                    } : {}),
                  }}
                >
                  <div
                    className={cn(
                      wrapText ? 'whitespace-normal break-words' : scrollable ? 'overflow-auto' : 'truncate',
                      scrollable && 'max-h-[100px]',
                      cellClassName
                    )}
                    style={{
                      maxHeight: scrollable ? `${maxCellHeight}px` : undefined,
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                </td>
              )
            })}
          </tr>
        )
      })}
    </tbody>
  )
}

// Column group header renderer
interface ColumnGroupHeaderProps {
  columnGroupingModel: ColumnGroupModel[]
  columns: GridColDef[]
  columnWidths: Map<string, CalculatedColumnWidth>
  showColumnVerticalBorder: boolean
  rowHeight: number
  columnVisibility: VisibilityState
  checkboxSelection: boolean
  pinnedColumnOffsets?: Map<string, { side: 'left' | 'right'; offset: number }>
}

const ColumnGroupHeader = ({
  columnGroupingModel,
  columns: gridColumns,
  columnWidths,
  showColumnVerticalBorder,
  rowHeight,
  columnVisibility,
  checkboxSelection,
  pinnedColumnOffsets,
}: ColumnGroupHeaderProps) => {
  // Build a mapping from field → group
  const fieldToGroup = React.useMemo(() => {
    const map = new Map<string, ColumnGroupModel>()
    columnGroupingModel.forEach((group) => {
      group.children.forEach((child) => {
        map.set(child.field, group)
      })
    })
    return map
  }, [columnGroupingModel])

  // Build ordered group header cells, collapsing adjacent columns in the same group
  const groupCells = React.useMemo(() => {
    const cells: {
      groupId: string | null
      headerName: string
      headerAlign?: 'left' | 'center' | 'right'
      colSpan: number
      width: number
      pinnedInfo?: { side: 'left' | 'right'; offset: number }
    }[] = []

    // Collect visible column fields in order
    const visibleFields: string[] = []
    if (checkboxSelection) {
      visibleFields.push('__select__')
    }
    gridColumns.forEach((col) => {
      if (!col.hide && columnVisibility[col.field] !== false) {
        visibleFields.push(col.field)
      }
    })

    let currentGroup: ColumnGroupModel | null = null
    let currentCell: typeof cells[number] | null = null

    visibleFields.forEach((field) => {
      const group = fieldToGroup.get(field)
      const colWidth = columnWidths.get(field)?.width || 100
      const pinnedInfo = pinnedColumnOffsets?.get(field)

      if (group && group === currentGroup && currentCell) {
        // Same group as previous column - extend span
        currentCell.colSpan += 1
        currentCell.width += colWidth
      } else {
        // New group or ungrouped column
        currentCell = {
          groupId: group?.groupId || null,
          headerName: group?.headerName || '',
          headerAlign: group?.headerAlign || 'center',
          colSpan: 1,
          width: colWidth,
          pinnedInfo,
        }
        cells.push(currentCell)
        currentGroup = group || null
      }
    })

    return cells
  }, [fieldToGroup, gridColumns, columnWidths, columnVisibility, checkboxSelection, pinnedColumnOffsets])

  return (
    <tr className="bg-muted">
      {groupCells.map((cell, idx) => (
        <th
          key={`group-${cell.groupId || 'ungrouped'}-${idx}`}
          colSpan={cell.colSpan}
          className={cn(
            'px-4 text-center font-semibold text-muted-foreground border-b border-border bg-muted overflow-hidden',
            showColumnVerticalBorder && 'border-r last:border-r-0',
            cell.pinnedInfo && 'sticky z-[2]',
          )}
          style={{
            height: rowHeight * 0.8,
            textAlign: cell.headerAlign,
            width: cell.width,
            ...(cell.pinnedInfo ? {
              position: 'sticky' as const,
              [cell.pinnedInfo.side]: cell.pinnedInfo.offset,
            } : {}),
          }}
        >
          <div className="truncate">
            {cell.headerName}
          </div>
        </th>
      ))}
    </tr>
  )
}

export function DataGrid<TData extends Record<string, any>>({
  rows,
  columns,
  getRowId,
  loading = false,
  title,
  toolBar = false,
  checkboxSelection = false,
  rowSelectionModel,
  onRowSelectionModelChange,
  disableRowSelectionOnClick = false,
  columnVisibilityModel,
  onColumnVisibilityModelChange,
  paginationMode = 'client',
  paginationModel,
  onPaginationModelChange,
  rowCount,
  pageSizeOptions = [10, 25, 50, 100],
  sortingMode = 'client',
  initialSortModel,
  sortLatestFirst = false,
  filterMode = 'client',
  height = 400,
  minHeight,
  maxHeight,
  density = 'standard',
  showCellVerticalBorder = false,
  showColumnVerticalBorder = false,
  hideFooter = false,
  hideFooterPagination = false,
  virtualized = false,
  overscan = 5,
  wrapText = false,
  getRowClassName,
  slotProps,
  className,
  sx,
  autoHeight = false,
  disableColumnSelector = false,
  onExport,
  exportFileName = 'data-export',
  resizableColumns = false,
  onColumnResize,
  pinnedRows,
  pinnedColumns,
  columnGroupingModel,
}: DataGridProps<TData>) {
  // Refs
  const tableContainerRef = React.useRef<HTMLDivElement>(null)

  // rowSpan is incompatible with virtualization (HTML rowSpan requires all spanned rows in the DOM).
  // Silently disable virtualization when any column uses rowSpan.
  const effectiveVirtualized = virtualized && !columns.some((col) => col.rowSpan)

  // Compute initial sorting state
  const computedInitialSort = React.useMemo<SortingState>(() => {
    if (initialSortModel && initialSortModel.length > 0) {
      return initialSortModel.map((s) => ({ id: s.field, desc: s.sort === 'desc' }))
    }
    if (sortLatestFirst) {
      return [{ id: 'createdAt', desc: true }]
    }
    return []
  }, []) // Only compute once on mount

  // State
  const [sorting, setSorting] = React.useState<SortingState>(computedInitialSort)
  const [globalFilter, setGlobalFilter] = React.useState('')
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>(
    rowSelectionModel || {}
  )
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: paginationModel?.page || 0,
    pageSize: paginationModel?.pageSize || 10,
  })
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>(
    columnVisibilityModel || {}
  )
  const [containerWidth, setContainerWidth] = React.useState(0)
  // TanStack Table's column sizing state - stores resized column widths
  const [columnSizing, setColumnSizing] = React.useState<ColumnSizingState>({})

  // Observe container width for flex column calculations
  React.useEffect(() => {
    const container = tableContainerRef.current
    if (!container) return

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width)
      }
    })

    resizeObserver.observe(container)
    // Set initial width
    setContainerWidth(container.clientWidth)

    return () => resizeObserver.disconnect()
  }, [])

  // Calculate column widths based on flex, width, minWidth, maxWidth
  // Pass columnSizing so resized columns become fixed and don't affect flex distribution
  const columnWidths = useColumnWidths(columns, containerWidth, checkboxSelection, columnSizing)

  // Compute pinned column offsets (sticky left/right positions)
  const pinnedColumnOffsets = React.useMemo(() => {
    if (!pinnedColumns) return undefined
    const offsets = new Map<string, { side: 'left' | 'right'; offset: number }>()

    // Calculate left pinned column offsets (cumulative from left)
    if (pinnedColumns.left?.length) {
      let leftOffset = 0
      // If checkbox selection is enabled, account for the checkbox column width
      if (checkboxSelection) {
        leftOffset = 50
      }
      for (const field of pinnedColumns.left) {
        const colWidth = columnWidths.get(field)
        offsets.set(field, { side: 'left', offset: leftOffset })
        leftOffset += colWidth?.width || 100
      }
    }

    // Calculate right pinned column offsets (cumulative from right)
    if (pinnedColumns.right?.length) {
      let rightOffset = 0
      // Process right-pinned columns in reverse order
      for (let i = pinnedColumns.right.length - 1; i >= 0; i--) {
        const field = pinnedColumns.right[i]
        const colWidth = columnWidths.get(field)
        offsets.set(field, { side: 'right', offset: rightOffset })
        rightOffset += colWidth?.width || 100
      }
    }

    return offsets.size > 0 ? offsets : undefined
  }, [pinnedColumns, columnWidths, checkboxSelection])

  // Create table rows for pinned rows (top and bottom)
  const pinnedTopTable = React.useMemo(() => {
    if (!pinnedRows?.top?.length) return null
    return pinnedRows.top
  }, [pinnedRows?.top])

  const pinnedBottomTable = React.useMemo(() => {
    if (!pinnedRows?.bottom?.length) return null
    return pinnedRows.bottom
  }, [pinnedRows?.bottom])

  // Convert MUI columns to TanStack columns
  const tanstackColumns = React.useMemo(
    () => convertColumns(columns, checkboxSelection),
    [columns, checkboxSelection]
  )

  // Sync external pagination model
  React.useEffect(() => {
    if (paginationModel) {
      setPagination({
        pageIndex: paginationModel.page,
        pageSize: paginationModel.pageSize,
      })
    }
  }, [paginationModel?.page, paginationModel?.pageSize])

  // Sync external row selection
  React.useEffect(() => {
    if (rowSelectionModel) {
      setRowSelection(rowSelectionModel)
    }
  }, [rowSelectionModel])

  // Sync external column visibility
  React.useEffect(() => {
    if (columnVisibilityModel) {
      setColumnVisibility(columnVisibilityModel)
    }
  }, [columnVisibilityModel])

  // Create table instance
  // When virtualized, disable pagination to show all rows
  const table = useReactTable({
    data: rows,
    columns: tanstackColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: effectiveVirtualized ? undefined : (paginationMode === 'client' ? getPaginationRowModel() : undefined),
    getSortedRowModel: sortingMode === 'client' ? getSortedRowModel() : undefined,
    getFilteredRowModel: filterMode === 'client' ? getFilteredRowModel() : undefined,
    getRowId: getRowId ? (row) => String(getRowId(row)) : undefined,
    state: {
      sorting,
      globalFilter,
      rowSelection,
      pagination: effectiveVirtualized ? undefined : pagination,
      columnVisibility,
      columnSizing,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: (updater) => {
      const newValue = typeof updater === 'function' ? updater(rowSelection) : updater
      setRowSelection(newValue)
      onRowSelectionModelChange?.(newValue)
    },
    onPaginationChange: effectiveVirtualized ? undefined : (updater) => {
      const newValue = typeof updater === 'function' ? updater(pagination) : updater
      setPagination(newValue)
      onPaginationModelChange?.({ page: newValue.pageIndex, pageSize: newValue.pageSize })
    },
    onColumnVisibilityChange: (updater) => {
      const newValue = typeof updater === 'function' ? updater(columnVisibility) : updater
      setColumnVisibility(newValue)
      onColumnVisibilityModelChange?.(newValue)
    },
    // Column resizing - use TanStack Table's built-in handling
    enableColumnResizing: resizableColumns,
    columnResizeMode: 'onChange', // Real-time resize (vs 'onEnd' which only updates on mouse up)
    onColumnSizingChange: (updater) => {
      const newValue = typeof updater === 'function' ? updater(columnSizing) : updater
      setColumnSizing(newValue)
      // Notify external callback of resize changes
      if (onColumnResize) {
        Object.entries(newValue).forEach(([columnId, width]) => {
          if (columnSizing[columnId] !== width) {
            onColumnResize(columnId, width)
          }
        })
      }
    },
    enableRowSelection: checkboxSelection,
    manualPagination: effectiveVirtualized ? true : paginationMode === 'server',
    manualSorting: sortingMode === 'server',
    manualFiltering: filterMode === 'server',
    pageCount: effectiveVirtualized ? undefined : (paginationMode === 'server' && rowCount
      ? Math.ceil(rowCount / pagination.pageSize)
      : undefined),
  })

  const rowHeight = densityRowHeights[density]
  const showQuickFilter = slotProps?.toolbar?.showQuickFilter !== false
  const showColumnSelector = !disableColumnSelector && slotProps?.toolbar?.showColumnSelector !== false
  const showExport = slotProps?.toolbar?.showExport !== false
  const customButtons = slotProps?.toolbar?.customButtons
  const moreOptions = slotProps?.toolbar?.moreOptions || []

  // Compute row span map for columns that use rowSpan
  const rowSpanMap = React.useMemo(() => {
    const hasRowSpan = columns.some((col) => col.rowSpan)
    if (!hasRowSpan) return undefined
    return computeRowSpanMap(table.getRowModel().rows, columns)
  }, [table.getRowModel().rows, columns])

  // Check if any column uses colSpan (to pass gridColumns to RowRenderer)
  const hasColSpan = React.useMemo(() => columns.some((col) => col.colSpan), [columns])

  // Calculate container style
  const containerStyle: React.CSSProperties = {
    ...sx,
  }

  if (!autoHeight) {
    containerStyle.height = height
    if (minHeight) containerStyle.minHeight = minHeight
    if (maxHeight) containerStyle.maxHeight = maxHeight
  }

  return (
    <div
      className={cn(
        'rounded-lg border border-border bg-background overflow-hidden flex flex-col text-xs',
        className
      )}
      style={containerStyle}
    >
      {/* Toolbar */}
      {toolBar && (
        <DataGridToolbar
          title={title}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          showQuickFilter={showQuickFilter}
          showColumnSelector={showColumnSelector}
          showExport={showExport}
          table={table}
          rows={rows}
          columns={columns}
          onExport={onExport}
          exportFileName={exportFileName}
          customButtons={customButtons}
          moreOptions={moreOptions}
        />
      )}

      {/* Table container */}
      <div
        ref={tableContainerRef}
        className="relative flex-1 overflow-auto"
      >
        {/* Loading overlay */}
        {loading && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center z-10">
            <Spinner size="lg" />
          </div>
        )}

        <table className="w-full border-separate border-spacing-0 table-fixed">
          {/* Column group for width control */}
          <colgroup>
            {table.getVisibleLeafColumns().map((column) => {
              // columnWidths already incorporates columnSizing (resized widths)
              const colWidth = columnWidths.get(column.id)
              return (
                <col
                  key={column.id}
                  style={{
                    width: colWidth?.width || column.getSize(),
                    minWidth: colWidth?.minWidth || column.columnDef.minSize,
                    maxWidth: colWidth?.maxWidth || column.columnDef.maxSize,
                  }}
                />
              )
            })}
          </colgroup>
          <thead className="sticky top-0 z-[3] bg-muted">
            {/* Column group header row */}
            {columnGroupingModel && columnGroupingModel.length > 0 && (
              <ColumnGroupHeader
                columnGroupingModel={columnGroupingModel}
                columns={columns}
                columnWidths={columnWidths}
                showColumnVerticalBorder={showColumnVerticalBorder}
                rowHeight={rowHeight}
                columnVisibility={columnVisibility}
                checkboxSelection={checkboxSelection}
                pinnedColumnOffsets={pinnedColumnOffsets}
              />
            )}
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-muted">
                {headerGroup.headers.map((header) => {
                  const meta = header.column.columnDef.meta as any
                  const align = meta?.headerAlign || meta?.align || 'left'
                  const colWidth = columnWidths.get(header.column.id)
                  // columnWidths already incorporates columnSizing (resized widths)
                  const effectiveWidth = colWidth?.width || header.getSize()
                  const pinnedInfo = pinnedColumnOffsets?.get(header.column.id)

                  return (
                    <th
                      key={header.id}
                      className={cn(
                        'px-4 text-left text-xs font-medium text-muted-foreground border-b border-border bg-muted overflow-hidden relative',
                        showColumnVerticalBorder && 'border-r last:border-r-0',
                        header.column.getCanSort() && 'cursor-pointer select-none hover:bg-muted/80',
                        // Add cursor class when resizing
                        header.column.getIsResizing() && 'cursor-col-resize',
                        // Pinned column styling
                        pinnedInfo && 'sticky z-[4]',
                        pinnedInfo?.side === 'left' && 'border-r border-border',
                        pinnedInfo?.side === 'right' && 'border-l border-border',
                      )}
                      style={{
                        height: rowHeight,
                        width: effectiveWidth,
                        minWidth: colWidth?.minWidth || header.column.columnDef.minSize,
                        maxWidth: colWidth?.maxWidth || header.column.columnDef.maxSize,
                        textAlign: align,
                        ...(pinnedInfo ? {
                          position: 'sticky' as const,
                          [pinnedInfo.side]: pinnedInfo.offset,
                        } : {}),
                      }}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className={cn(
                        'flex items-center gap-1 truncate',
                        align === 'center' && 'justify-center',
                        align === 'right' && 'justify-end'
                      )}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && (
                          <SortIcon direction={header.column.getIsSorted()} />
                        )}
                      </div>
                      {resizableColumns && header.column.id !== '__select__' && (
                        <ColumnResizeHandle
                          header={header}
                          isResizing={header.column.getIsResizing()}
                        />
                      )}
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>

          {/* Pinned top rows */}
          {pinnedTopTable && pinnedTopTable.length > 0 && (
            <PinnedRowsRenderer
              pinnedData={pinnedTopTable}
              columns={columns}
              tanstackColumns={tanstackColumns}
              getRowId={getRowId}
              rowHeight={rowHeight}
              showCellVerticalBorder={showCellVerticalBorder}
              getRowClassName={getRowClassName}
              globalWrapText={wrapText}
              columnWidths={columnWidths}
              pinnedColumnOffsets={pinnedColumnOffsets}
              columnVisibility={columnVisibility}
              position="top"
            />
          )}

          {effectiveVirtualized ? (
            <VirtualizedTableBody
              table={table}
              rowHeight={rowHeight}
              showCellVerticalBorder={showCellVerticalBorder}
              checkboxSelection={checkboxSelection}
              disableRowSelectionOnClick={disableRowSelectionOnClick}
              getRowClassName={getRowClassName}
              overscan={overscan}
              parentRef={tableContainerRef as React.RefObject<HTMLDivElement>}
              globalWrapText={wrapText}
              columnWidths={columnWidths}
              pinnedColumnOffsets={pinnedColumnOffsets}
              rowSpanMap={rowSpanMap}
              gridColumns={hasColSpan ? columns : undefined}
            />
          ) : (
            <StandardTableBody
              table={table}
              rowHeight={rowHeight}
              showCellVerticalBorder={showCellVerticalBorder}
              checkboxSelection={checkboxSelection}
              disableRowSelectionOnClick={disableRowSelectionOnClick}
              getRowClassName={getRowClassName}
              globalWrapText={wrapText}
              columnWidths={columnWidths}
              pinnedColumnOffsets={pinnedColumnOffsets}
              rowSpanMap={rowSpanMap}
              gridColumns={hasColSpan ? columns : undefined}
            />
          )}

          {/* Pinned bottom rows */}
          {pinnedBottomTable && pinnedBottomTable.length > 0 && (
            <PinnedRowsRenderer
              pinnedData={pinnedBottomTable}
              columns={columns}
              tanstackColumns={tanstackColumns}
              getRowId={getRowId}
              rowHeight={rowHeight}
              showCellVerticalBorder={showCellVerticalBorder}
              getRowClassName={getRowClassName}
              globalWrapText={wrapText}
              columnWidths={columnWidths}
              pinnedColumnOffsets={pinnedColumnOffsets}
              columnVisibility={columnVisibility}
              position="bottom"
            />
          )}
        </table>
      </div>

      {/* Footer with pagination - only show when not virtualized */}
      {!effectiveVirtualized && !hideFooter && !hideFooterPagination && (
        <DataGridPagination
          table={table}
          pageSizeOptions={pageSizeOptions}
          rowCount={rowCount}
          paginationMode={paginationMode}
        />
      )}

      {/* Footer info for virtualized mode */}
      {effectiveVirtualized && !hideFooter && (
        <div className="flex items-center justify-end gap-4 px-4 py-3 border-t border-border bg-background">
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {table.getFilteredRowModel().rows.length} total rows (virtualized)
          </span>
        </div>
      )}
    </div>
  )
}

DataGrid.displayName = 'DataGrid'

// Also export as DataGridV0 for clarity
export { DataGrid as DataGridV0 }
