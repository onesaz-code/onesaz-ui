import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { DataGrid, Badge, Button, type GridColDef, type GridRowSelectionModel, type ColumnVisibilityModel } from '@onesaz/ui'

const meta: Meta<typeof DataGrid> = {
  title: 'Components/DataGrid',
  component: DataGrid,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof DataGrid>

// Sample data
interface User {
  id: number
  name: string
  email: string
  role: string
  status: 'active' | 'inactive' | 'pending'
  department: string
  salary: number
  joinDate: string
}

const users: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', department: 'Engineering', salary: 120000, joinDate: '2023-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Developer', status: 'active', department: 'Engineering', salary: 95000, joinDate: '2023-03-20' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Designer', status: 'inactive', department: 'Design', salary: 85000, joinDate: '2022-11-10' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Manager', status: 'active', department: 'HR', salary: 110000, joinDate: '2022-06-05' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Developer', status: 'pending', department: 'Engineering', salary: 88000, joinDate: '2024-01-02' },
  { id: 6, name: 'Diana Ross', email: 'diana@example.com', role: 'Developer', status: 'active', department: 'Engineering', salary: 92000, joinDate: '2023-07-18' },
  { id: 7, name: 'Edward King', email: 'edward@example.com', role: 'Designer', status: 'active', department: 'Design', salary: 78000, joinDate: '2023-09-25' },
  { id: 8, name: 'Fiona Green', email: 'fiona@example.com', role: 'QA Engineer', status: 'active', department: 'Engineering', salary: 75000, joinDate: '2023-05-12' },
  { id: 9, name: 'George White', email: 'george@example.com', role: 'DevOps', status: 'inactive', department: 'Operations', salary: 105000, joinDate: '2022-08-30' },
  { id: 10, name: 'Hannah Black', email: 'hannah@example.com', role: 'Product Manager', status: 'active', department: 'Product', salary: 115000, joinDate: '2022-04-15' },
  { id: 11, name: 'Ian Gray', email: 'ian@example.com', role: 'Developer', status: 'active', department: 'Engineering', salary: 90000, joinDate: '2023-11-08' },
  { id: 12, name: 'Julia Adams', email: 'julia@example.com', role: 'HR Specialist', status: 'active', department: 'HR', salary: 68000, joinDate: '2024-02-01' },
]

const basicColumns: GridColDef<User>[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', flex: 1, minWidth: 150 },
  { field: 'email', headerName: 'Email', flex: 1, minWidth: 200 },
  { field: 'role', headerName: 'Role', width: 120 },
  { field: 'department', headerName: 'Department', width: 130 },
]

export const Default: Story = {
  render: () => (
    <DataGrid
      rows={users}
      columns={basicColumns}
      getRowId={(row) => row.id}
      height={400}
    />
  ),
}

export const WithToolbar: Story = {
  render: () => (
    <DataGrid
      rows={users}
      columns={basicColumns}
      getRowId={(row) => row.id}
      toolBar
      title="Users List"
      height={450}
    />
  ),
}

export const WithCheckboxSelection: Story = {
  render: function CheckboxSelectionExample() {
    const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>({})

    return (
      <div className="space-y-4">
        <DataGrid
          rows={users}
          columns={basicColumns}
          getRowId={(row) => row.id}
          checkboxSelection
          rowSelectionModel={selectionModel}
          onRowSelectionModelChange={setSelectionModel}
          toolBar
          title="Select Users"
          height={450}
        />
        <div className="text-sm text-muted-foreground">
          Selected IDs: {Object.keys(selectionModel).filter(k => selectionModel[k]).join(', ') || 'None'}
        </div>
      </div>
    )
  },
}

export const WithCustomCellRendering: Story = {
  render: () => {
    const columnsWithRenderers: GridColDef<User>[] = [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'name', headerName: 'Name', flex: 1, minWidth: 150 },
      { field: 'email', headerName: 'Email', flex: 1, minWidth: 200 },
      {
        field: 'status',
        headerName: 'Status',
        width: 120,
        renderCell: ({ value }) => (
          <Badge
            variant={
              value === 'active'
                ? 'default'
                : value === 'pending'
                ? 'secondary'
                : 'destructive'
            }
          >
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
            <Button size="sm" variant="outline">
              Edit
            </Button>
            <Button size="sm" variant="destructive">
              Delete
            </Button>
          </div>
        ),
      },
    ]

    return (
      <DataGrid
        rows={users}
        columns={columnsWithRenderers}
        getRowId={(row) => row.id}
        toolBar
        title="Users with Custom Cells"
        height={450}
      />
    )
  },
}

export const WithValueGetter: Story = {
  render: () => {
    const columnsWithValueGetter: GridColDef<User>[] = [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'name', headerName: 'Name', flex: 1, minWidth: 150 },
      {
        field: 'fullInfo',
        headerName: 'Full Info',
        flex: 1,
        minWidth: 250,
        valueGetter: ({ row }) => `${row.name} (${row.role}) - ${row.department}`,
      },
      {
        field: 'yearsEmployed',
        headerName: 'Years Employed',
        width: 150,
        align: 'center',
        headerAlign: 'center',
        valueGetter: ({ row }) => {
          const joinDate = new Date(row.joinDate)
          const now = new Date()
          const years = (now.getTime() - joinDate.getTime()) / (1000 * 60 * 60 * 24 * 365)
          return years.toFixed(1)
        },
      },
    ]

    return (
      <DataGrid
        rows={users}
        columns={columnsWithValueGetter}
        getRowId={(row) => row.id}
        height={400}
      />
    )
  },
}

export const LoadingState: Story = {
  render: () => (
    <DataGrid
      rows={users}
      columns={basicColumns}
      getRowId={(row) => row.id}
      loading
      toolBar
      title="Loading Data..."
      height={400}
    />
  ),
}

export const EmptyState: Story = {
  render: () => (
    <DataGrid
      rows={[]}
      columns={basicColumns}
      getRowId={(row) => row.id}
      toolBar
      title="No Users Found"
      height={400}
    />
  ),
}

export const DifferentDensities: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-2">Compact</h3>
        <DataGrid
          rows={users.slice(0, 5)}
          columns={basicColumns}
          getRowId={(row) => row.id}
          density="compact"
          height={250}
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Standard (Default)</h3>
        <DataGrid
          rows={users.slice(0, 5)}
          columns={basicColumns}
          getRowId={(row) => row.id}
          density="standard"
          height={320}
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Comfortable</h3>
        <DataGrid
          rows={users.slice(0, 5)}
          columns={basicColumns}
          getRowId={(row) => row.id}
          density="comfortable"
          height={400}
        />
      </div>
    </div>
  ),
}

export const WithBorders: Story = {
  render: () => (
    <DataGrid
      rows={users}
      columns={basicColumns}
      getRowId={(row) => row.id}
      showCellVerticalBorder
      showColumnVerticalBorder
      toolBar
      title="Table with Borders"
      height={400}
    />
  ),
}

export const CustomPageSizes: Story = {
  render: () => (
    <DataGrid
      rows={users}
      columns={basicColumns}
      getRowId={(row) => row.id}
      pageSizeOptions={[5, 10, 20]}
      paginationModel={{ page: 0, pageSize: 5 }}
      toolBar
      title="Custom Page Sizes"
      height={400}
    />
  ),
}

export const WithRowClassName: Story = {
  render: () => (
    <DataGrid
      rows={users}
      columns={basicColumns}
      getRowId={(row) => row.id}
      getRowClassName={({ row }) =>
        row.status === 'inactive' ? 'opacity-50' : ''
      }
      toolBar
      title="Highlighted Rows"
      height={400}
    />
  ),
}

export const HiddenFooter: Story = {
  render: () => (
    <DataGrid
      rows={users.slice(0, 5)}
      columns={basicColumns}
      getRowId={(row) => row.id}
      hideFooter
      toolBar
      title="No Footer"
      height={350}
    />
  ),
}

export const AutoHeight: Story = {
  render: () => (
    <DataGrid
      rows={users.slice(0, 5)}
      columns={basicColumns}
      getRowId={(row) => row.id}
      autoHeight
      toolBar
      title="Auto Height Table"
    />
  ),
}

// Server-side pagination example
export const ServerSidePagination: Story = {
  render: function ServerPaginationExample() {
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 })
    const [loading, setLoading] = useState(false)

    // Simulate server-side data
    const totalRows = 100
    const paginatedData = users.slice(
      paginationModel.page * paginationModel.pageSize,
      (paginationModel.page + 1) * paginationModel.pageSize
    )

    const handlePaginationChange = (model: { page: number; pageSize: number }) => {
      setLoading(true)
      // Simulate API call
      setTimeout(() => {
        setPaginationModel(model)
        setLoading(false)
      }, 500)
    }

    return (
      <DataGrid
        rows={paginatedData}
        columns={basicColumns}
        getRowId={(row) => row.id}
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={handlePaginationChange}
        rowCount={totalRows}
        loading={loading}
        pageSizeOptions={[5, 10, 25]}
        toolBar
        title="Server-side Pagination"
        height={400}
      />
    )
  },
}

// Column visibility example
export const WithColumnVisibility: Story = {
  render: function ColumnVisibilityExample() {
    const [columnVisibility, setColumnVisibility] = useState<ColumnVisibilityModel>({
      department: false, // Hide department by default
    })

    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Click the "Columns" button in the toolbar to show/hide columns.
          The "Department" column is hidden by default.
        </p>
        <DataGrid
          rows={users}
          columns={basicColumns}
          getRowId={(row) => row.id}
          toolBar
          title="Column Visibility"
          columnVisibilityModel={columnVisibility}
          onColumnVisibilityModelChange={setColumnVisibility}
          height={450}
        />
        <div className="text-sm text-muted-foreground">
          Hidden columns: {Object.entries(columnVisibility)
            .filter(([, hidden]) => hidden === false)
            .map(([col]) => col)
            .join(', ') || 'None'}
        </div>
      </div>
    )
  },
}

// Different heights example
export const DifferentHeights: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-2">Small (250px)</h3>
        <DataGrid
          rows={users}
          columns={basicColumns}
          getRowId={(row) => row.id}
          height={250}
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Medium (400px - default)</h3>
        <DataGrid
          rows={users}
          columns={basicColumns}
          getRowId={(row) => row.id}
          height={400}
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Large (600px)</h3>
        <DataGrid
          rows={users}
          columns={basicColumns}
          getRowId={(row) => row.id}
          height={600}
        />
      </div>
    </div>
  ),
}

// Cell content truncation vs wrapping
export const CellContentHandling: Story = {
  render: () => {
    const dataWithLongContent: User[] = [
      { id: 1, name: 'John Doe with a very long name that should be truncated', email: 'john.doe.with.a.very.long.email.address@example-company.com', role: 'Senior Software Developer', status: 'active', department: 'Engineering & Research', salary: 120000, joinDate: '2023-01-15' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Lead Designer', status: 'active', department: 'Design', salary: 95000, joinDate: '2023-03-20' },
      { id: 3, name: 'Bob Johnson with another extremely long name for testing purposes', email: 'bob.johnson.with.a.very.long.email@another-example-company.org', role: 'Principal Engineer', status: 'inactive', department: 'Platform Engineering', salary: 85000, joinDate: '2022-11-10' },
    ]

    return (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-2">Truncated (default) - hover for tooltip</h3>
          <DataGrid
            rows={dataWithLongContent}
            columns={basicColumns}
            getRowId={(row) => row.id}
            height={200}
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Wrapped Text</h3>
          <DataGrid
            rows={dataWithLongContent}
            columns={basicColumns}
            getRowId={(row) => row.id}
            wrapText
            height={250}
          />
        </div>
      </div>
    )
  },
}

// Virtualization example with large dataset
export const Virtualized: Story = {
  render: () => {
    // Generate a large dataset for virtualization demo
    const largeDataset: User[] = Array.from({ length: 10000 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: ['Admin', 'Developer', 'Designer', 'Manager', 'QA Engineer'][i % 5],
      status: (['active', 'inactive', 'pending'] as const)[i % 3],
      department: ['Engineering', 'Design', 'HR', 'Product', 'Operations'][i % 5],
      salary: 50000 + Math.floor(Math.random() * 100000),
      joinDate: `202${(i % 4)}-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
    }))

    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          This DataGrid is virtualized with 10,000 rows. Only visible rows are rendered for optimal performance.
          Scroll to see the virtualization in action.
        </p>
        <DataGrid
          rows={largeDataset}
          columns={basicColumns}
          getRowId={(row) => row.id}
          virtualized
          overscan={10}
          toolBar
          title="Virtualized DataGrid (10,000 rows)"
          height={500}
        />
      </div>
    )
  },
}

// Virtualization with custom cell rendering
export const VirtualizedWithCustomCells: Story = {
  render: () => {
    const largeDataset: User[] = Array.from({ length: 5000 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: ['Admin', 'Developer', 'Designer', 'Manager', 'QA Engineer'][i % 5],
      status: (['active', 'inactive', 'pending'] as const)[i % 3],
      department: ['Engineering', 'Design', 'HR', 'Product', 'Operations'][i % 5],
      salary: 50000 + Math.floor(Math.random() * 100000),
      joinDate: `202${(i % 4)}-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
    }))

    const columnsWithRenderers: GridColDef<User>[] = [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'name', headerName: 'Name', flex: 1, minWidth: 150 },
      { field: 'email', headerName: 'Email', flex: 1, minWidth: 200 },
      {
        field: 'status',
        headerName: 'Status',
        width: 120,
        renderCell: ({ value }) => (
          <Badge
            variant={
              value === 'active'
                ? 'default'
                : value === 'pending'
                ? 'secondary'
                : 'destructive'
            }
          >
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
      { field: 'department', headerName: 'Department', width: 130 },
    ]

    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Virtualized DataGrid with 5,000 rows and custom cell renderers (Badge for status, formatted salary).
        </p>
        <DataGrid
          rows={largeDataset}
          columns={columnsWithRenderers}
          getRowId={(row) => row.id}
          virtualized
          toolBar
          title="Virtualized with Custom Cells (5,000 rows)"
          height={500}
        />
      </div>
    )
  },
}

// MUI DataGrid compatibility demo
export const MUICompatibility: Story = {
  name: 'MUI DataGrid API Compatibility',
  render: () => {
    // This demonstrates that the API is compatible with MUI DataGrid
    const muiStyleColumns: GridColDef<User>[] = [
      { field: 'id', headerName: 'ID', width: 70, sortable: true },
      { field: 'name', headerName: 'Full Name', flex: 1, minWidth: 150 },
      { field: 'email', headerName: 'Email Address', flex: 1, minWidth: 200 },
      {
        field: 'status',
        headerName: 'Status',
        width: 120,
        align: 'center',
        headerAlign: 'center',
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
        type: 'number',
        align: 'right',
        headerAlign: 'right',
        valueFormatter: ({ value }) => `$${value.toLocaleString()}`,
      },
    ]

    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          This DataGrid uses the same API as MUI X DataGrid, making migration easier.
          Props like <code>field</code>, <code>headerName</code>, <code>renderCell</code>,{' '}
          <code>valueFormatter</code>, <code>flex</code>, and <code>align</code> all work the same way.
        </p>
        <DataGrid
          rows={users}
          columns={muiStyleColumns}
          getRowId={(row) => row.id}
          checkboxSelection
          toolBar
          title="MUI-Compatible DataGrid"
          density="standard"
          showCellVerticalBorder
          showColumnVerticalBorder
          height={450}
        />
      </div>
    )
  },
}

// 100k rows virtualization stress test
export const VirtualizedLargeDataset: Story = {
  name: 'Virtualized 100k Rows',
  render: () => {
    // Generate 100,000 rows for stress testing
    const largeDataset: User[] = Array.from({ length: 100000 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: ['Admin', 'Developer', 'Designer', 'Manager', 'QA Engineer'][i % 5],
      status: (['active', 'inactive', 'pending'] as const)[i % 3],
      department: ['Engineering', 'Design', 'HR', 'Product', 'Operations'][i % 5],
      salary: 50000 + Math.floor(Math.random() * 100000),
      joinDate: `202${(i % 4)}-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
    }))

    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Stress test with 100,000 rows. Virtualization ensures smooth scrolling by only rendering visible rows.
        </p>
        <DataGrid
          rows={largeDataset}
          columns={basicColumns}
          getRowId={(row) => row.id}
          virtualized
          overscan={15}
          toolBar
          title="100k Rows Stress Test"
          height={600}
        />
      </div>
    )
  },
}

// Export functionality demo
export const WithExport: Story = {
  render: () => {
    const handleCustomExport = (data: User[], columns: typeof basicColumns) => {
      console.log('Custom export triggered:', { rowCount: data.length, columns })
      alert(`Custom export: ${data.length} rows`)
    }

    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Click the "Export" button in the toolbar to download data as CSV or JSON.
        </p>
        <DataGrid
          rows={users}
          columns={basicColumns}
          getRowId={(row) => row.id}
          toolBar
          title="Export Demo"
          onExport={handleCustomExport}
          exportFileName="users-export"
          height={400}
        />
      </div>
    )
  },
}

// Custom toolbar buttons demo
export const WithCustomToolbar: Story = {
  render: () => {
    const customButtons = (
      <>
        <Button
          variant="outline"
          size="sm"
          className="h-9 gap-2"
          onClick={() => alert('Add new user')}
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Add User
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-9 gap-2"
          onClick={() => alert('Refresh data')}
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
          </svg>
          Refresh
        </Button>
      </>
    )

    const moreOptions = [
      { label: 'Print', onClick: () => alert('Print'), icon: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v8H6z" /></svg> },
      { label: 'Settings', onClick: () => alert('Settings'), icon: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg> },
      { label: 'Help', onClick: () => alert('Help'), icon: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" /></svg> },
    ]

    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Custom toolbar buttons and a "More options" menu (three dots icon).
        </p>
        <DataGrid
          rows={users}
          columns={basicColumns}
          getRowId={(row) => row.id}
          toolBar
          title="Custom Toolbar"
          slotProps={{
            toolbar: {
              customButtons,
              moreOptions,
            },
          }}
          height={400}
        />
      </div>
    )
  },
}

// Column resizing demo
export const WithColumnResizing: Story = {
  render: () => {
    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Drag the edge of column headers to resize them. Hover over the right edge of a header to see the resize cursor.
        </p>
        <DataGrid
          rows={users}
          columns={basicColumns}
          getRowId={(row) => row.id}
          resizableColumns
          toolBar
          title="Resizable Columns"
          height={400}
          onColumnResize={(columnId, width) => {
            console.log(`Column ${columnId} resized to ${width}px`)
          }}
        />
      </div>
    )
  },
}

// Full featured demo
export const FullFeatured: Story = {
  render: function FullFeaturedExample() {
    const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>({})
    const [columnVisibility, setColumnVisibility] = useState<ColumnVisibilityModel>({})

    const fullColumns: GridColDef<User>[] = [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'name', headerName: 'Name', flex: 1, minWidth: 150 },
      { field: 'email', headerName: 'Email', flex: 1, minWidth: 200 },
      {
        field: 'status',
        headerName: 'Status',
        width: 120,
        renderCell: ({ value }) => (
          <Badge
            variant={
              value === 'active' ? 'default' : value === 'pending' ? 'secondary' : 'destructive'
            }
          >
            {value}
          </Badge>
        ),
      },
      { field: 'role', headerName: 'Role', width: 130 },
      { field: 'department', headerName: 'Department', width: 130 },
      {
        field: 'salary',
        headerName: 'Salary',
        width: 120,
        align: 'right',
        headerAlign: 'right',
        valueFormatter: ({ value }) => `$${value.toLocaleString()}`,
      },
    ]

    const customButtons = (
      <Button variant="outline" size="sm" className="h-9">
        Add User
      </Button>
    )

    const moreOptions = [
      { label: 'Print', onClick: () => console.log('Print') },
      { label: 'Settings', onClick: () => console.log('Settings') },
    ]

    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Full-featured DataGrid with: checkbox selection, column visibility, export, custom buttons, more options menu, and resizable columns.
        </p>
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
              customButtons,
              moreOptions,
            },
          }}
          height={500}
        />
        <div className="text-sm text-muted-foreground">
          Selected: {Object.keys(selectionModel).filter(k => selectionModel[k]).length} rows
        </div>
      </div>
    )
  },
}

// Virtualized with column resizing
export const VirtualizedWithResizing: Story = {
  name: 'Virtualized + Resizable Columns',
  render: () => {
    // Generate 50,000 rows for stress testing
    const largeDataset: User[] = Array.from({ length: 50000 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: ['Admin', 'Developer', 'Designer', 'Manager', 'QA Engineer'][i % 5],
      status: (['active', 'inactive', 'pending'] as const)[i % 3],
      department: ['Engineering', 'Design', 'HR', 'Product', 'Operations'][i % 5],
      salary: 50000 + Math.floor(Math.random() * 100000),
      joinDate: `202${(i % 4)}-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
    }))

    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Virtualized DataGrid (50,000 rows) with resizable columns. Drag the right edge of column headers to resize.
          Both features should work together smoothly.
        </p>
        <DataGrid
          rows={largeDataset}
          columns={basicColumns}
          getRowId={(row) => row.id}
          virtualized
          resizableColumns
          overscan={10}
          toolBar
          title="Virtualized + Resizable (50k rows)"
          height={500}
          onColumnResize={(columnId, width) => {
            console.log(`Column ${columnId} resized to ${width}px`)
          }}
        />
      </div>
    )
  },
}
