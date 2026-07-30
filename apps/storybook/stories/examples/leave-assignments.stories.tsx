import type { Meta, StoryObj } from '@storybook/react'
import {
  HStack,
  VStack,
  Typography,
  Button,
  Badge,
  Alert,
  AlertTitle,
  AlertDescription,
  DataGrid,
  type GridColDef,
} from '@onesaz/ui'

// Recreates the "Assignments" table screen from the reference design
// (Leave Targeting) so Table/DataGrid/Button/Badge changes can be checked
// against it side by side.

const meta: Meta = {
  title: 'Examples/Leave Assignments',
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj

type Assignment = {
  id: number
  precedence: number
  kind: 'Person' | 'Group'
  assignedTo: string
  meta: string
  leavePolicy: string
  staff: number
  status: 'Active' | 'Needs attention'
}

const assignments: Assignment[] = [
  { id: 1, precedence: 1, kind: 'Person', assignedTo: 'Arjun Reddy', meta: 'E-1077 · Principal', leavePolicy: 'Administration staff', staff: 1, status: 'Active' },
  { id: 2, precedence: 1, kind: 'Person', assignedTo: 'Priya Menon', meta: 'E-1042 · HR Manager', leavePolicy: 'Faculty leave 2026', staff: 1, status: 'Active' },
  { id: 3, precedence: 2, kind: 'Group', assignedTo: 'Science & maths faculty', meta: 'Org unit is Science or Mathematics', leavePolicy: 'Faculty leave 2026', staff: 7, status: 'Needs attention' },
  { id: 4, precedence: 2, kind: 'Group', assignedTo: 'Full-time teaching staff', meta: 'Teaching staff — standard', leavePolicy: 'Teaching staff — standard', staff: 7, status: 'Needs attention' },
]

const PrecedenceBadge = ({ value }: { value: number }) => (
  <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-accent/10 text-xs font-semibold text-accent">
    {value}
  </span>
)

const EditIcon = () => (
  <svg className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
  </svg>
)

export const AssignmentsTable: Story = {
  render: function AssignmentsPage() {
    const columns: GridColDef<Assignment>[] = [
      {
        field: 'precedence',
        headerName: 'Precedence',
        width: 110,
        renderCell: ({ row }) => (
          <HStack spacing={2}>
            <PrecedenceBadge value={row.precedence} />
            <span className="text-xs text-muted-foreground">{row.kind}</span>
          </HStack>
        ),
      },
      {
        field: 'assignedTo',
        headerName: 'Assigned to',
        width: 260,
        renderCell: ({ row }) => (
          <div>
            <p className="text-sm font-semibold text-foreground">{row.assignedTo}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{row.meta}</p>
          </div>
        ),
      },
      { field: 'leavePolicy', headerName: 'Leave policy', width: 200 },
      { field: 'staff', headerName: 'Staff', width: 80 },
      {
        field: 'status',
        headerName: 'Status',
        width: 150,
        renderCell: ({ value }) => (
          <Badge
            variant="outlined"
            bg
            color={value === 'Active' ? 'success' : 'warning'}
          >
            {value as string}
          </Badge>
        ),
      },
      {
        field: 'actions',
        headerName: '',
        width: 90,
        renderCell: () => (
          <Button variant="outlined" size="sm" startIcon={<EditIcon />}>
            Edit
          </Button>
        ),
      },
    ]

    return (
      <div className="min-h-screen bg-background p-8">
        <VStack spacing={6} className="max-w-5xl mx-auto items-stretch">
          {/* Page header */}
          <HStack className="justify-between items-start">
            <div>
              <Typography variant="h4" className="mb-1">Assignments</Typography>
              <Typography variant="body2" color="muted">
                Leave policy assignments, most specific first. Assign to one person, to a staff group, or to the whole institute.
              </Typography>
            </div>
            <Button>+ New assignment</Button>
          </HStack>

          {/* Warning banner */}
          <Alert variant="warning">
            <AlertTitle>5 cases have no clear winner</AlertTitle>
            <AlertDescription>
              Two groups at the same level point at different things, so there is no most-specific rule to pick.
              Requests wait until one side is changed. Rows below are marked Needs attention.
            </AlertDescription>
            <Button variant="outlined" color="warning" size="sm" className="mt-3">
              Show which staff
            </Button>
          </Alert>

          {/* Table */}
          <DataGrid columns={columns} rows={assignments} density="comfortable" />
        </VStack>
      </div>
    )
  },
}
