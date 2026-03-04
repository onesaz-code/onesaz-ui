import type { Meta, StoryObj } from '@storybook/react'
import { Dialog, Button, Input, Label, DataGrid, Badge, type GridColDef } from '@onesaz/ui'

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Dialog>

export const Default: Story = {
  render: () => (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </Dialog.Trigger>
      <Dialog.Content size="md">
        <Dialog.Header>
          <Dialog.Title>Edit profile</Dialog.Title>
          <Dialog.Description>
            Make changes to your profile here. Click save when you're done.
          </Dialog.Description>
        </Dialog.Header>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" defaultValue="@peduarte" className="col-span-3" />
          </div>
        </div>
        <Dialog.Footer>
          <Button type="submit">Save changes</Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  ),
}

export const Confirmation: Story = {
  render: () => (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button variant="destructive">Delete Account</Button>
      </Dialog.Trigger>
      <Dialog.Content size="sm">
        <Dialog.Header>
          <Dialog.Title>Are you sure?</Dialog.Title>
          <Dialog.Description>
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </Dialog.Description>
        </Dialog.Header>
        <Dialog.Footer>
          <Dialog.Close asChild>
            <Button variant="outline">Cancel</Button>
          </Dialog.Close>
          <Button variant="destructive">Delete</Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {(['sm', 'md', 'lg', 'xl', '2xl', 'full'] as const).map((size) => (
        <Dialog key={size}>
          <Dialog.Trigger asChild>
            <Button variant="outline">{size}</Button>
          </Dialog.Trigger>
          <Dialog.Content size={size}>
            <Dialog.Header>
              <Dialog.Title>Dialog size: {size}</Dialog.Title>
              <Dialog.Description>
                This dialog uses the `{size}` size preset.
              </Dialog.Description>
            </Dialog.Header>
            <Dialog.Footer>
              <Dialog.Close asChild>
                <Button variant="outline">Close</Button>
              </Dialog.Close>
              <Button>Action</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog>
      ))}
    </div>
  ),
}

// ─── Data for the DataGrid story ─────────────────────────────────────────────

interface Employee {
  id: number
  name: string
  email: string
  department: string
  role: string
  status: 'active' | 'inactive' | 'pending'
  salary: number
}

const employees: Employee[] = [
  { id: 1, name: 'John Doe',       email: 'john@example.com',    department: 'Engineering', role: 'Lead Developer',   status: 'active',   salary: 120000 },
  { id: 2, name: 'Jane Smith',     email: 'jane@example.com',    department: 'Engineering', role: 'Developer',        status: 'active',   salary: 95000  },
  { id: 3, name: 'Bob Johnson',    email: 'bob@example.com',     department: 'Design',      role: 'UI Designer',      status: 'inactive', salary: 85000  },
  { id: 4, name: 'Alice Brown',    email: 'alice@example.com',   department: 'HR',          role: 'HR Manager',       status: 'active',   salary: 110000 },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', department: 'Engineering', role: 'Developer',        status: 'pending',  salary: 88000  },
  { id: 6, name: 'Diana Ross',     email: 'diana@example.com',   department: 'Product',     role: 'Product Manager',  status: 'active',   salary: 115000 },
  { id: 7, name: 'Edward King',    email: 'edward@example.com',  department: 'Operations',  role: 'DevOps Engineer',  status: 'active',   salary: 105000 },
  { id: 8, name: 'Fiona Green',    email: 'fiona@example.com',   department: 'Engineering', role: 'QA Engineer',      status: 'active',   salary: 75000  },
]

const employeeColumns: GridColDef<Employee>[] = [
  { field: 'id',         headerName: 'ID',         width: 60  },
  { field: 'name',       headerName: 'Name',       flex: 1,   minWidth: 140 },
  { field: 'email',      headerName: 'Email',      flex: 1,   minWidth: 180 },
  { field: 'department', headerName: 'Department', width: 130 },
  { field: 'role',       headerName: 'Role',       width: 150 },
  {
    field: 'status',
    headerName: 'Status',
    width: 100,
    renderCell: ({ value }) => (
      <Badge
        variant={value === 'active' ? 'default' : value === 'pending' ? 'secondary' : 'outline'}
      >
        {value}
      </Badge>
    ),
  },
  {
    field: 'salary',
    headerName: 'Salary',
    width: 110,
    align: 'right',
    headerAlign: 'right',
    valueFormatter: ({ value }) =>
      new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value),
  },
]

export const WithDataGrid: Story = {
  render: () => (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button>View Employees</Button>
      </Dialog.Trigger>
      <Dialog.Content size="full">
        <Dialog.Header>
          <Dialog.Title>Employee Directory</Dialog.Title>
          <Dialog.Description>
            Browse all employees across departments.
          </Dialog.Description>
        </Dialog.Header>
        <div className="flex-1 overflow-hidden min-h-0">
          <DataGrid
            rows={employees}
            columns={employeeColumns}
            getRowId={(row) => row.id}
            height="100%"
            toolBar
            slotProps={{ toolbar: { showQuickFilter: true } }}
          />
        </div>
        <Dialog.Footer>
          <Dialog.Close asChild>
            <Button variant="outline">Close</Button>
          </Dialog.Close>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  ),
}
