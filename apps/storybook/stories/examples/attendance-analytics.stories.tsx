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
  Badge,
  Button,
  Typography,
  LinearProgress,
  BarChart,
  DonutChart,
  LineChart,
} from '@onesaz/ui'

const meta: Meta = {
  title: 'Examples/Attendance Analytics',
  parameters: { layout: 'fullscreen' },
}
export default meta
type Story = StoryObj

// Brand palette (on-brand series colours)
const ACCENT = '#6933d3'
const SUCCESS = '#22c55e'
const WARNING = '#f59e0b'
const ERROR = '#ef4444'

const byGrade = [
  { grade: 'Grade 6', present: 96 },
  { grade: 'Grade 7', present: 93 },
  { grade: 'Grade 8', present: 91 },
  { grade: 'Grade 9', present: 88 },
  { grade: 'Grade 10', present: 94 },
]

const todayBreakdown = [
  { name: 'Present', value: 1182 },
  { name: 'On leave', value: 38 },
  { name: 'Absent', value: 71 },
]

const trend = [
  { day: 'Mon', rate: 92 },
  { day: 'Tue', rate: 94 },
  { day: 'Wed', rate: 91 },
  { day: 'Thu', rate: 95 },
  { day: 'Fri', rate: 93 },
  { day: 'Sat', rate: 89 },
]

const classes = [
  { name: 'Grade 10 · A', teacher: 'Mrs. Nair', rate: 96, variant: 'success' as const },
  { name: 'Grade 10 · B', teacher: 'Mr. Iyer', rate: 92, variant: 'success' as const },
  { name: 'Grade 9 · A', teacher: 'Ms. Rao', rate: 84, variant: 'warning' as const },
  { name: 'Grade 9 · B', teacher: 'Mr. Khan', rate: 78, variant: 'warning' as const },
]

function Kpi({ label, value, delta, positive }: { label: string; value: string; delta: string; positive?: boolean }) {
  return (
    <Card>
      <CardContent>
        <Box py={4}>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
          <HStack justifyContent="between" alignItems="center">
            <p className="mt-1 text-2xl font-semibold text-foreground tabular-nums">{value}</p>
            <Badge variant="soft" color={positive ? 'success' : 'error'}>{delta}</Badge>
          </HStack>
        </Box>
      </CardContent>
    </Card>
  )
}

export const Default: Story = {
  render: () => (
    <Box p={8} className="mx-auto max-w-6xl">
      <VStack gap={6} alignItems="stretch">
        <HStack justifyContent="between" alignItems="center" flexWrap="wrap" gap={4}>
          <VStack gap={1} alignItems="start">
            <Typography variant="h4">Attendance & Performance</Typography>
            <p className="text-sm text-muted-foreground">Academic year 2026–27 · updated 5 min ago</p>
          </VStack>
          <HStack gap={2}>
            <Button variant="outlined">This week</Button>
            <Button>Export</Button>
          </HStack>
        </HStack>

        <Grid columns={4} gap={4}>
          <Kpi label="Present today" value="1,182" delta="+2.1%" positive />
          <Kpi label="Avg attendance" value="93.4%" delta="+0.6%" positive />
          <Kpi label="On leave" value="38" delta="-4" positive />
          <Kpi label="Absent" value="71" delta="+9" />
        </Grid>

        <Grid columns={2} gap={4}>
          <Card>
            <CardHeader><CardTitle className="text-base">Attendance by grade (%)</CardTitle></CardHeader>
            <CardContent>
              <BarChart data={byGrade} dataKey="present" fill={ACCENT} xAxis={{ dataKey: 'grade' }} height={280} showGrid showLegend={false} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">Today’s breakdown</CardTitle></CardHeader>
            <CardContent>
              <DonutChart data={todayBreakdown} dataKey="value" nameKey="name" colors={[SUCCESS, WARNING, ERROR]} innerRadius={60} height={280} showLegend />
            </CardContent>
          </Card>
        </Grid>

        <Card>
          <CardHeader><CardTitle className="text-base">Weekly trend (% present)</CardTitle></CardHeader>
          <CardContent>
            <LineChart data={trend} dataKey="rate" stroke={ACCENT} xAxis={{ dataKey: 'day' }} height={240} showGrid showLegend={false} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Lowest-attendance classes</CardTitle></CardHeader>
          <CardContent>
            <VStack gap={4} alignItems="stretch">
              {classes.map((c) => (
                <Box key={c.name}>
                  <HStack justifyContent="between" alignItems="center">
                    <VStack gap={0} alignItems="start">
                      <span className="text-sm font-medium text-foreground">{c.name}</span>
                      <span className="text-xs text-muted-foreground">{c.teacher}</span>
                    </VStack>
                    <span className="text-sm font-semibold tabular-nums text-foreground">{c.rate}%</span>
                  </HStack>
                  <Box mt={2}><LinearProgress value={c.rate} variant={c.variant} size="sm" /></Box>
                </Box>
              ))}
            </VStack>
          </CardContent>
        </Card>
      </VStack>
    </Box>
  ),
}
