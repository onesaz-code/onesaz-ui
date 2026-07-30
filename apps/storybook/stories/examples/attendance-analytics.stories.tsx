import type { Meta, StoryObj } from '@storybook/react'
import {
  Box,
  Container,
  VStack,
  HStack,
  Grid,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
  Typography,
  LinearProgress,
  Stat,
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

export const Default: Story = {
  render: () => (
    <Box py={8}>
     <Container maxWidth="xl">
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
          <Stat label="Present today" value="1,182" delta="+2.1%" trend="up" />
          <Stat label="Avg attendance" value="93.4%" delta="+0.6%" trend="up" />
          <Stat label="On leave" value="38" delta="-4" trend="up" />
          <Stat label="Absent" value="71" delta="+9" trend="down" />
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
     </Container>
    </Box>
  ),
}
