import type { Meta, StoryObj } from '@storybook/react'
import {
  Box,
  VStack,
  HStack,
  Grid,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Avatar,
  Badge,
  Button,
  Separator,
  Breadcrumbs,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  LinearProgress,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Typography,
} from '@onesaz/ui'

const meta: Meta = {
  title: 'Examples/Student Profile',
  parameters: { layout: 'fullscreen' },
}
export default meta
type Story = StoryObj

const MailIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
)
const EditIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z" /></svg>
)

const subjects = [
  { name: 'Mathematics', score: 92, variant: 'success' as const },
  { name: 'Science', score: 84, variant: 'success' as const },
  { name: 'English', score: 78, variant: 'default' as const },
  { name: 'Social Studies', score: 71, variant: 'warning' as const },
  { name: 'Hindi', score: 66, variant: 'warning' as const },
]

const assessments = [
  { title: 'Unit Test 3', subject: 'Mathematics', date: '12 Jul 2026', score: '46 / 50', status: 'Graded', color: 'success' as const },
  { title: 'Mid-term', subject: 'Science', date: '02 Jul 2026', score: '68 / 80', status: 'Graded', color: 'success' as const },
  { title: 'Essay Submission', subject: 'English', date: '28 Jun 2026', score: '—', status: 'Pending', color: 'warning' as const },
  { title: 'Quiz 5', subject: 'Social Studies', date: '20 Jun 2026', score: '14 / 20', status: 'Graded', color: 'success' as const },
]

function Stat({ label, value, sub }: { label: string; value: string; sub?: React.ReactNode }) {
  return (
    <Card>
      <CardContent>
        <Box py={4}>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
          <p className="mt-1 text-2xl font-semibold text-foreground tabular-nums">{value}</p>
          {sub && <div className="mt-2">{sub}</div>}
        </Box>
      </CardContent>
    </Card>
  )
}

export const Default: Story = {
  render: () => (
    <Box p={8} className="mx-auto max-w-5xl">
      <VStack gap={6} alignItems="stretch">
        <Breadcrumbs>
          <BreadcrumbItem><BreadcrumbLink href="#">Students</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbItem><BreadcrumbLink href="#">Grade 10 · A</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbItem><BreadcrumbPage>Aarav Sharma</BreadcrumbPage></BreadcrumbItem>
        </Breadcrumbs>

        {/* Identity header */}
        <Card>
          <CardContent>
            <Box py={6}>
              <HStack justifyContent="between" alignItems="center" flexWrap="wrap" gap={4}>
                <HStack gap={4} alignItems="center">
                  <Avatar size="2xl" fallback="Aarav Sharma" />
                  <VStack gap={2} alignItems="start">
                    <Typography variant="h4">Aarav Sharma</Typography>
                    <HStack gap={2} flexWrap="wrap">
                      <Badge color="normal">Grade 10 · Section A</Badge>
                      <Badge color="normal">Roll No. 12</Badge>
                      <Badge color="success">Active</Badge>
                    </HStack>
                  </VStack>
                </HStack>
                <HStack gap={2}>
                  <Button variant="outlined" startIcon={<MailIcon />}>Message</Button>
                  <Button startIcon={<EditIcon />}>Edit profile</Button>
                </HStack>
              </HStack>
            </Box>
          </CardContent>
        </Card>

        {/* KPI row */}
        <Grid columns={4} gap={4}>
          <Stat label="Attendance" value="94%" sub={<LinearProgress value={94} variant="success" size="sm" />} />
          <Stat label="Avg Score" value="82%" sub={<LinearProgress value={82} variant="success" size="sm" />} />
          <Stat label="Class Rank" value="4 / 48" sub={<Badge variant="soft" color="success">Top 10%</Badge>} />
          <Stat label="Fees Due" value="₹0" sub={<Badge variant="soft" color="success">Cleared</Badge>} />
        </Grid>

        {/* Tabs */}
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="assessments">Assessments</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Grid columns={2} gap={4}>
              <Card>
                <CardHeader><CardTitle className="text-base">Subject performance</CardTitle></CardHeader>
                <CardContent>
                  <VStack gap={4} alignItems="stretch">
                    {subjects.map((s) => (
                      <Box key={s.name}>
                        <HStack justifyContent="between">
                          <span className="text-sm text-foreground">{s.name}</span>
                          <span className="text-sm font-semibold tabular-nums text-foreground">{s.score}%</span>
                        </HStack>
                        <Box mt={2}><LinearProgress value={s.score} variant={s.variant} size="sm" /></Box>
                      </Box>
                    ))}
                  </VStack>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="text-base">Guardian & contact</CardTitle></CardHeader>
                <CardContent>
                  <VStack gap={3} alignItems="stretch">
                    {[
                      ['Guardian', 'Rakesh Sharma'],
                      ['Phone', '+91 98765 43210'],
                      ['Email', 'rakesh.sharma@example.com'],
                      ['Address', '14, Green Park, Bengaluru'],
                      ['Admission No.', 'ADM-2019-0142'],
                    ].map(([k, v]) => (
                      <Box key={k}>
                        <HStack justifyContent="between" gap={4}>
                          <span className="text-sm text-muted-foreground">{k}</span>
                          <span className="text-sm text-foreground">{v}</span>
                        </HStack>
                        <Box mt={3}><Separator /></Box>
                      </Box>
                    ))}
                  </VStack>
                </CardContent>
              </Card>
            </Grid>
          </TabsContent>

          <TabsContent value="assessments">
            <Card>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Assessment</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Score</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assessments.map((a) => (
                      <TableRow key={a.title}>
                        <TableCell>
                          <TableCell.Primary>{a.title}</TableCell.Primary>
                          <TableCell.Meta>{a.subject}</TableCell.Meta>
                        </TableCell>
                        <TableCell>{a.date}</TableCell>
                        <TableCell className="text-right font-medium">{a.score}</TableCell>
                        <TableCell><Badge variant="soft" color={a.color}>{a.status}</Badge></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendance">
            <Card>
              <CardContent>
                <Box py={10} className="text-center">
                  <Typography variant="h4">94% present</Typography>
                  <p className="mt-1 text-sm text-muted-foreground">172 of 183 school days this year</p>
                  <Box mt={4} className="mx-auto max-w-md"><LinearProgress value={94} variant="success" /></Box>
                </Box>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </VStack>
    </Box>
  ),
}
