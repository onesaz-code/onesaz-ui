import type { Meta, StoryObj } from '@storybook/react'
import {
  Box,
  VStack,
  HStack,
  Grid,
  Card,
  CardContent,
  Badge,
  Button,
  Typography,
  Input,
  InputAdornment,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  EmptyState,
} from '@onesaz/ui'

const meta: Meta = {
  title: 'Examples/Fees & Payments',
  parameters: { layout: 'fullscreen' },
}
export default meta
type Story = StoryObj

const SearchIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
)
const RupeeIcon = () => (
  <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12M6 8h12M6 13l8.5 8M6 13h3a5 5 0 0 0 0-10" /></svg>
)

const dues = [
  { name: 'Aarav Sharma', roll: 'Grade 10 · Roll 12', term: 'Term 2 · 2026', amount: '₹18,500', due: '15 Aug 2026', status: 'Pending', color: 'warning' as const },
  { name: 'Diya Menon', roll: 'Grade 9 · Roll 04', term: 'Term 2 · 2026', amount: '₹16,200', due: '05 Aug 2026', status: 'Overdue', color: 'error' as const },
  { name: 'Kabir Singh', roll: 'Grade 10 · Roll 27', term: 'Term 2 · 2026', amount: '₹18,500', due: '20 Aug 2026', status: 'Pending', color: 'warning' as const },
  { name: 'Ananya Rao', roll: 'Grade 8 · Roll 19', term: 'Term 2 · 2026', amount: '₹14,000', due: '28 Jul 2026', status: 'Paid', color: 'success' as const },
  { name: 'Vivaan Patel', roll: 'Grade 9 · Roll 11', term: 'Term 2 · 2026', amount: '₹16,200', due: '02 Aug 2026', status: 'Overdue', color: 'error' as const },
]

function Summary({ label, value, note, color }: { label: string; value: string; note: string; color: 'success' | 'warning' | 'error' }) {
  return (
    <Card>
      <CardContent>
        <Box py={4}>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
          <p className="mt-1 text-2xl font-semibold text-foreground tabular-nums">{value}</p>
          <Box mt={2}><Badge variant="soft" color={color}>{note}</Badge></Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export const Default: Story = {
  render: () => (
    <Box p={8} className="mx-auto max-w-5xl">
      <VStack gap={6} alignItems="stretch">
        <HStack justifyContent="between" alignItems="center" flexWrap="wrap" gap={4}>
          <VStack gap={1} alignItems="start">
            <Typography variant="h4">Fees & Payments</Typography>
            <p className="text-sm text-muted-foreground">Term 2 · 483 students · 71 with pending dues</p>
          </VStack>
          <HStack gap={2}>
            <Button variant="outlined">Send reminders</Button>
            <Button>Collect payment</Button>
          </HStack>
        </HStack>

        <Grid columns={3} gap={4}>
          <Summary label="Collected" value="₹64.2L" note="82% of target" color="success" />
          <Summary label="Pending" value="₹11.8L" note="46 students" color="warning" />
          <Summary label="Overdue" value="₹4.3L" note="25 students" color="error" />
        </Grid>

        <Card>
          <CardContent>
            <Box mb={4} className="max-w-xs">
              <Input placeholder="Search students…" startAdornment={<InputAdornment><SearchIcon /></InputAdornment>} />
            </Box>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Term</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Due date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dues.map((d) => (
                  <TableRow key={d.name}>
                    <TableCell>
                      <TableCell.Primary>{d.name}</TableCell.Primary>
                      <TableCell.Meta>{d.roll}</TableCell.Meta>
                    </TableCell>
                    <TableCell>{d.term}</TableCell>
                    <TableCell className="text-right font-medium">{d.amount}</TableCell>
                    <TableCell>{d.due}</TableCell>
                    <TableCell><Badge variant="soft" color={d.color}>{d.status}</Badge></TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" disabled={d.status === 'Paid'}>Collect</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </VStack>
    </Box>
  ),
}

// Same screen when every due is cleared — showcases the new EmptyState.
export const AllCleared: Story = {
  render: () => (
    <Box p={8} className="mx-auto max-w-5xl">
      <VStack gap={6} alignItems="stretch">
        <VStack gap={1} alignItems="start">
          <Typography variant="h4">Fees & Payments</Typography>
          <p className="text-sm text-muted-foreground">Term 2 · 483 students</p>
        </VStack>
        <Card>
          <CardContent>
            <EmptyState
              icon={<RupeeIcon />}
              title="No pending dues"
              description="Every student has cleared their Term 2 fees. Nice work."
              action={<Button variant="outlined" size="sm">View payment history</Button>}
              size="lg"
            />
          </CardContent>
        </Card>
      </VStack>
    </Box>
  ),
}
