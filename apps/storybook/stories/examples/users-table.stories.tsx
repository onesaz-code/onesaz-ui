import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  VStack,
  HStack,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Button,
  Avatar,
  Badge,
  Breadcrumbs,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  TextField,
  Combobox,
  DataGrid,
  type GridColDef,
  Input,
  InputAdornment,
  Typography,
  Checkbox,
} from '@onesaz/ui'

const meta: Meta = {
  title: 'Examples/Users Table',
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj

// Icons
const SearchIcon = () => (
  <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
  </svg>
)

const PlusIcon = () => (
  <svg className="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/><path d="M12 5v14"/>
  </svg>
)

const FilterIcon = () => (
  <svg className="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
  </svg>
)

const MoreIcon = () => (
  <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
  </svg>
)

const ColumnsIcon = () => (
  <svg className="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/><path d="M15 3v18"/>
  </svg>
)

// Sample data
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', department: 'Engineering', status: 'Active', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Manager', department: 'Marketing', status: 'Active', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&crop=face' },
  { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'Developer', department: 'Engineering', status: 'Inactive', avatar: '' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Designer', department: 'Design', status: 'Active', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face' },
  { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', role: 'Developer', department: 'Engineering', status: 'Active', avatar: '' },
  { id: 6, name: 'Diana Miller', email: 'diana@example.com', role: 'HR Manager', department: 'Human Resources', status: 'Active', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=32&h=32&fit=crop&crop=face' },
  { id: 7, name: 'Edward Garcia', email: 'edward@example.com', role: 'Analyst', department: 'Finance', status: 'Pending', avatar: '' },
  { id: 8, name: 'Fiona Martinez', email: 'fiona@example.com', role: 'Developer', department: 'Engineering', status: 'Active', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=32&h=32&fit=crop&crop=face' },
  { id: 9, name: 'George Anderson', email: 'george@example.com', role: 'Manager', department: 'Operations', status: 'Active', avatar: '' },
  { id: 10, name: 'Hannah Thomas', email: 'hannah@example.com', role: 'Designer', department: 'Design', status: 'Inactive', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=32&h=32&fit=crop&crop=face' },
]

const roleOptions = [
  { value: 'admin', label: 'Admin' },
  { value: 'manager', label: 'Manager' },
  { value: 'developer', label: 'Developer' },
  { value: 'designer', label: 'Designer' },
  { value: 'analyst', label: 'Analyst' },
]

const departmentOptions = [
  { value: 'engineering', label: 'Engineering' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'design', label: 'Design' },
  { value: 'finance', label: 'Finance' },
  { value: 'hr', label: 'Human Resources' },
  { value: 'operations', label: 'Operations' },
]

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'pending', label: 'Pending' },
]

export const UsersTable: Story = {
  render: function UsersTablePage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [showStatusFilter, setShowStatusFilter] = useState({
      active: true,
      inactive: true,
      pending: true,
    })

    const columns: GridColDef[] = [
      {
        field: 'name',
        headerName: 'User',
        width: 250,
        renderCell: ({ row }) => (
          <HStack spacing={3}>
            <Avatar src={row.avatar} name={row.name} size="sm" />
            <div>
              <p className="font-medium">{row.name}</p>
              <p className="text-sm text-muted-foreground">{row.email}</p>
            </div>
          </HStack>
        ),
      },
      {
        field: 'role',
        headerName: 'Role',
        width: 120,
      },
      {
        field: 'department',
        headerName: 'Department',
        width: 150,
      },
      {
        field: 'status',
        headerName: 'Status',
        width: 100,
        renderCell: ({ value }) => {
          const variants: Record<string, 'success' | 'secondary' | 'warning'> = {
            Active: 'success',
            Inactive: 'secondary',
            Pending: 'warning',
          }
          return <Badge variant={variants[value as string] || 'secondary'}>{value}</Badge>
        },
      },
      {
        field: 'actions',
        headerName: '',
        width: 50,
        renderCell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Profile</DropdownMenuItem>
              <DropdownMenuItem>Edit User</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Reset Password</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Delete User</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ]

    const filteredUsers = users.filter((user) => {
      const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = showStatusFilter[user.status.toLowerCase() as keyof typeof showStatusFilter]
      return matchesSearch && matchesStatus
    })

    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border bg-card">
          <div className="flex h-16 items-center px-6">
            <div className="font-semibold text-lg text-foreground">User Management</div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          {/* Breadcrumbs */}
          <Breadcrumbs className="mb-6">
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Admin</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbPage>Users</BreadcrumbPage>
            </BreadcrumbItem>
          </Breadcrumbs>

          {/* Page Header */}
          <HStack className="justify-between mb-6">
            <div>
              <Typography variant="h4" className="mb-1">Users</Typography>
              <Typography variant="body2" color="muted">
                Manage your team members and their account permissions.
              </Typography>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <PlusIcon />
                  Add User
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                  <DialogDescription>
                    Create a new user account. They will receive an email to set their password.
                  </DialogDescription>
                </DialogHeader>
                <VStack spacing={4} className="py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <TextField label="First Name" placeholder="John" fullWidth />
                    <TextField label="Last Name" placeholder="Doe" fullWidth />
                  </div>
                  <TextField label="Email" type="email" placeholder="john@example.com" fullWidth />
                  <div className="w-full">
                    <label className="text-sm font-medium mb-1.5 block">Role</label>
                    <Combobox
                      options={roleOptions}
                      placeholder="Select role..."
                      className="w-full"
                    />
                  </div>
                  <div className="w-full">
                    <label className="text-sm font-medium mb-1.5 block">Department</label>
                    <Combobox
                      options={departmentOptions}
                      placeholder="Select department..."
                      className="w-full"
                    />
                  </div>
                </VStack>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button>Create User</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </HStack>

          {/* Filters & Search */}
          <Card>
            <CardContent className="pt-6">
              <HStack className="justify-between mb-4">
                <HStack spacing={4}>
                  <div className="w-64">
                    <Input
                      placeholder="Search users..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      startAdornment={
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      }
                    />
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        <FilterIcon />
                        Status
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem
                        checked={showStatusFilter.active}
                        onCheckedChange={(checked) =>
                          setShowStatusFilter({ ...showStatusFilter, active: checked })
                        }
                      >
                        Active
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={showStatusFilter.inactive}
                        onCheckedChange={(checked) =>
                          setShowStatusFilter({ ...showStatusFilter, inactive: checked })
                        }
                      >
                        Inactive
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={showStatusFilter.pending}
                        onCheckedChange={(checked) =>
                          setShowStatusFilter({ ...showStatusFilter, pending: checked })
                        }
                      >
                        Pending
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </HStack>

                <HStack spacing={2}>
                  <Button variant="outline">
                    <ColumnsIcon />
                    Columns
                  </Button>
                  <Button variant="outline">Export</Button>
                </HStack>
              </HStack>

              {/* Data Grid */}
              <DataGrid
                columns={columns}
                rows={filteredUsers}
                checkboxSelection
                pagination
                pageSize={5}
                pageSizeOptions={[5, 10, 25]}
              />
            </CardContent>
          </Card>
        </main>
      </div>
    )
  },
}
