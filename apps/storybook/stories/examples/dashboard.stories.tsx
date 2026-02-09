import type { Meta, StoryObj } from '@storybook/react'
import {
  Box,
  VStack,
  HStack,
  Grid,
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  LinearProgress,
  Input,
  InputAdornment,
  Typography,
} from '@onesaz/ui'

const meta: Meta = {
  title: 'Examples/Dashboard',
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj

// Icons as inline SVGs
const SearchIcon = () => (
  <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
  </svg>
)

const BellIcon = () => (
  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
  </svg>
)

const ChevronDownIcon = () => (
  <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6"/>
  </svg>
)

const MoreVerticalIcon = () => (
  <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>
  </svg>
)

const recentOrders = [
  { id: 'ORD-001', customer: 'John Doe', email: 'john@example.com', amount: '$250.00', status: 'Completed' },
  { id: 'ORD-002', customer: 'Jane Smith', email: 'jane@example.com', amount: '$150.00', status: 'Processing' },
  { id: 'ORD-003', customer: 'Bob Wilson', email: 'bob@example.com', amount: '$350.00', status: 'Pending' },
  { id: 'ORD-004', customer: 'Alice Brown', email: 'alice@example.com', amount: '$450.00', status: 'Completed' },
  { id: 'ORD-005', customer: 'Charlie Davis', email: 'charlie@example.com', amount: '$200.00', status: 'Cancelled' },
]

const getStatusBadge = (status: string) => {
  const variants: Record<string, 'default' | 'secondary' | 'success' | 'warning' | 'destructive'> = {
    Completed: 'success',
    Processing: 'default',
    Pending: 'warning',
    Cancelled: 'destructive',
  }
  return <Badge variant={variants[status] || 'secondary'}>{status}</Badge>
}

export const Dashboard: Story = {
  render: () => (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex h-16 items-center px-6 gap-4">
          <div className="font-semibold text-lg text-foreground">Onesaz Admin</div>

          <div className="flex-1 max-w-md">
            <Input
              placeholder="Search..."
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </div>

          <HStack spacing={4} className="ml-auto">
            <Button variant="ghost" size="icon">
              <BellIcon />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
                    name="Admin User"
                    size="sm"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">Admin User</p>
                    <p className="text-xs text-muted-foreground">admin@onesaz.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </HStack>
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
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </Breadcrumbs>

        {/* Page Title */}
        <HStack className="justify-between mb-6">
          <div>
            <Typography variant="h4" className="mb-1">Dashboard</Typography>
            <Typography variant="body2" color="muted">Welcome back! Here's what's happening.</Typography>
          </div>
          <Button>
            Download Report
            <ChevronDownIcon />
          </Button>
        </HStack>

        {/* Stats Cards */}
        <Grid columns={{ default: 1, sm: 2, lg: 4 }} gap={6} className="mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Revenue</CardDescription>
              <CardTitle className="text-2xl">$45,231.89</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Subscriptions</CardDescription>
              <CardTitle className="text-2xl">+2,350</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">+180.1% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Sales</CardDescription>
              <CardTitle className="text-2xl">+12,234</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">+19% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Active Now</CardDescription>
              <CardTitle className="text-2xl">+573</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">+201 since last hour</p>
            </CardContent>
          </Card>
        </Grid>

        {/* Main Grid */}
        <Grid columns={{ default: 1, lg: 3 }} gap={6}>
          {/* Recent Orders Table */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <HStack className="justify-between">
                <div>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>A list of recent orders from your store.</CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVerticalIcon />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View All</DropdownMenuItem>
                    <DropdownMenuItem>Export CSV</DropdownMenuItem>
                    <DropdownMenuItem>Print</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </HStack>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{order.customer}</p>
                          <p className="text-sm text-muted-foreground">{order.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>{order.amount}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVerticalIcon />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">Cancel</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Sidebar */}
          <VStack spacing={6}>
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates from your team</CardDescription>
              </CardHeader>
              <CardContent>
                <VStack spacing={4}>
                  {[
                    { user: 'John', action: 'created a new project', time: '2 min ago' },
                    { user: 'Sarah', action: 'completed a task', time: '5 min ago' },
                    { user: 'Mike', action: 'uploaded a file', time: '10 min ago' },
                    { user: 'Lisa', action: 'left a comment', time: '15 min ago' },
                  ].map((activity, i) => (
                    <HStack key={i} spacing={3}>
                      <Avatar name={activity.user} size="sm" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">
                          <span className="font-medium">{activity.user}</span>{' '}
                          <span className="text-muted-foreground">{activity.action}</span>
                        </p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </HStack>
                  ))}
                </VStack>
              </CardContent>
            </Card>

            {/* Progress Card */}
            <Card>
              <CardHeader>
                <CardTitle>Storage Used</CardTitle>
                <CardDescription>75% of 100GB used</CardDescription>
              </CardHeader>
              <CardContent>
                <VStack spacing={4}>
                  <LinearProgress value={75} size="md" />
                  <HStack className="justify-between text-sm">
                    <span className="text-muted-foreground">75 GB used</span>
                    <span className="text-muted-foreground">100 GB total</span>
                  </HStack>
                  <Button variant="outline" className="w-full">Upgrade Plan</Button>
                </VStack>
              </CardContent>
            </Card>
          </VStack>
        </Grid>
      </main>
    </div>
  ),
}
