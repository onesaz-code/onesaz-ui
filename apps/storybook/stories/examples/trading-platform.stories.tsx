import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import {
  Box,
  HStack,
  VStack,
  Grid,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge,
  Button,
  Input,
  Separator,
  Typography,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Table,
  NativeSelect,
  NativeSelectOption,
  AreaChart,
} from '@onesaz/ui'

const meta: Meta = {
  title: 'Examples/Trading Platform',
  parameters: { layout: 'fullscreen' },
}
export default meta
type Story = StoryObj

// ---------------------------------------------------------------------------
// Brand palette (on-brand series colours)
// ---------------------------------------------------------------------------
const ACCENT = '#6933d3'
const SUCCESS = '#22c55e'
const ERROR = '#ef4444'

// ---------------------------------------------------------------------------
// Static, realistic data
// ---------------------------------------------------------------------------
const portfolioSeries = [
  { t: '09:15', v: 248900 },
  { t: '09:45', v: 249620 },
  { t: '10:15', v: 249180 },
  { t: '10:45', v: 250440 },
  { t: '11:15', v: 251020 },
  { t: '11:45', v: 250610 },
  { t: '12:15', v: 251880 },
  { t: '12:45', v: 252740 },
  { t: '13:15', v: 252310 },
  { t: '13:45', v: 253590 },
  { t: '14:15', v: 254120 },
  { t: '14:45', v: 253880 },
  { t: '15:15', v: 255030 },
  { t: '15:30', v: 255480 },
]

const watchlist = [
  { sym: 'AAPL', name: 'Apple Inc.', last: 227.52, chg: 1.84, spark: [220, 221, 219, 223, 224, 226, 227] },
  { sym: 'MSFT', name: 'Microsoft', last: 431.18, chg: 0.62, spark: [426, 428, 427, 429, 430, 431, 431] },
  { sym: 'NVDA', name: 'NVIDIA', last: 118.04, chg: -2.31, spark: [124, 123, 122, 120, 119, 118, 118] },
  { sym: 'TSLA', name: 'Tesla', last: 248.90, chg: 3.47, spark: [238, 240, 242, 241, 245, 247, 249] },
  { sym: 'AMZN', name: 'Amazon', last: 186.33, chg: -0.88, spark: [189, 188, 188, 187, 186, 186, 186] },
]

const holdings = [
  { sym: 'AAPL', name: 'Apple Inc.', qty: 120, avg: 198.40, ltp: 227.52 },
  { sym: 'NVDA', name: 'NVIDIA Corp.', qty: 300, avg: 132.10, ltp: 118.04 },
  { sym: 'TSLA', name: 'Tesla Inc.', qty: 75, avg: 210.55, ltp: 248.90 },
  { sym: 'MSFT', name: 'Microsoft Corp.', qty: 60, avg: 402.75, ltp: 431.18 },
]

const movers = [
  { sym: 'SMCI', name: 'Super Micro', chg: 8.42 },
  { sym: 'PLTR', name: 'Palantir', chg: 5.91 },
  { sym: 'COIN', name: 'Coinbase', chg: 4.63 },
  { sym: 'INTC', name: 'Intel', chg: -6.18 },
  { sym: 'PYPL', name: 'PayPal', chg: -4.05 },
  { sym: 'BABA', name: 'Alibaba', chg: -3.27 },
]

// ---------------------------------------------------------------------------
// Formatting helpers
// ---------------------------------------------------------------------------
const usd = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })
const pct = (n: number) => `${n >= 0 ? '+' : ''}${n.toFixed(2)}%`
const signed = (n: number) => `${n >= 0 ? '+' : ''}${usd(Math.abs(n)).replace('$', '$')}`

// ---------------------------------------------------------------------------
// Icons (inline SVG)
// ---------------------------------------------------------------------------
const ArrowUp = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
    strokeLinecap="round" strokeLinejoin="round" width="14" height="14" aria-hidden="true">
    <path d="M12 19V5M5 12l7-7 7 7" />
  </svg>
)
const ArrowDown = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
    strokeLinecap="round" strokeLinejoin="round" width="14" height="14" aria-hidden="true">
    <path d="M12 5v14M19 12l-7 7-7-7" />
  </svg>
)
const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" width="16" height="16" aria-hidden="true">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
  </svg>
)

// ---------------------------------------------------------------------------
// Local helper: Delta — colored +/- value with directional arrow.
// FINDING: the library ships no semantic "delta / trend" element, so up/down
// colouring + arrow + sign is assembled by hand from Typography + inline SVG.
// ---------------------------------------------------------------------------
function Delta({
  children,
  up,
  size = 'body2',
}: {
  children: React.ReactNode
  up: boolean
  size?: 'body1' | 'body2' | 'caption' | 'h4' | 'h6'
}) {
  return (
    <HStack gap={1} alignItems="center" justifyContent="end">
      <Box style={{ color: up ? SUCCESS : ERROR }} display="inline-flex">
        {up ? <ArrowUp /> : <ArrowDown />}
      </Box>
      <Typography variant={size} color={up ? 'success' : 'error'} fontWeight="semibold">
        {children}
      </Typography>
    </HStack>
  )
}

// ---------------------------------------------------------------------------
// Local helper: Sparkline — no Sparkline component exists in the library, so
// this is a hand-rolled inline SVG polyline (allowed: inline SVG).
// ---------------------------------------------------------------------------
function Sparkline({ points, up }: { points: number[]; up: boolean }) {
  const w = 72
  const h = 24
  const min = Math.min(...points)
  const max = Math.max(...points)
  const span = max - min || 1
  const d = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * w
      const y = h - ((p - min) / span) * h
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
      <path d={d} fill="none" stroke={up ? SUCCESS : ERROR} strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ---------------------------------------------------------------------------
// Local helper: KPI stat tile.
// FINDING: no Stat / Metric / KPI primitive exists, so the tile (label, big
// tabular value, delta row) is composed manually. `tabular-nums` is applied
// via className because Typography exposes no tabular-figures prop.
// ---------------------------------------------------------------------------
function Kpi({
  label,
  value,
  deltaText,
  up,
  neutral = false,
}: {
  label: string
  value: string
  deltaText?: string
  up?: boolean
  neutral?: boolean
}) {
  return (
    <Card>
      <CardContent className="p-5">
        <VStack gap={2}>
          <Typography variant="overline" color="muted">
            {label}
          </Typography>
          <Typography variant="h4" className="tabular-nums">
            {value}
          </Typography>
          {deltaText &&
            (neutral ? (
              <Typography variant="body2" color="muted">
                {deltaText}
              </Typography>
            ) : (
              <HStack gap={1} alignItems="center">
                <Box style={{ color: up ? SUCCESS : ERROR }} display="inline-flex">
                  {up ? <ArrowUp /> : <ArrowDown />}
                </Box>
                <Typography variant="body2" color={up ? 'success' : 'error'} fontWeight="semibold">
                  {deltaText}
                </Typography>
              </HStack>
            ))}
        </VStack>
      </CardContent>
    </Card>
  )
}

// ---------------------------------------------------------------------------
// Order panel (Buy / Sell)
// ---------------------------------------------------------------------------
function OrderPanel() {
  const [side, setSide] = React.useState<'buy' | 'sell'>('buy')
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Place Order</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={side} onValueChange={(v) => setSide(v as 'buy' | 'sell')}>
          {/* FINDING: TabsTrigger has no per-trigger semantic colour, so Buy=green
              / Sell=red active states are forced via data-[state=active] className. */}
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="buy"
              className="data-[state=active]:bg-success-500 data-[state=active]:text-white"
            >
              Buy
            </TabsTrigger>
            <TabsTrigger
              value="sell"
              className="data-[state=active]:bg-error-500 data-[state=active]:text-white"
            >
              Sell
            </TabsTrigger>
          </TabsList>

          <TabsContent value="buy">
            <OrderForm side="buy" />
          </TabsContent>
          <TabsContent value="sell">
            <OrderForm side="sell" />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

function OrderForm({ side }: { side: 'buy' | 'sell' }) {
  const [qty, setQty] = React.useState('10')
  const [type, setType] = React.useState('market')
  const price = 227.52
  const est = (Number(qty) || 0) * price
  return (
    <VStack gap={4} className="pt-2">
      <VStack gap={2} alignItems="stretch">
        <Typography variant="caption" color="muted" fontWeight="medium">Symbol</Typography>
        <HStack justifyContent="between" alignItems="center">
          <Typography variant="h6">AAPL</Typography>
          <Typography variant="body2" color="muted" className="tabular-nums">{usd(price)}</Typography>
        </HStack>
      </VStack>

      <VStack gap={2} alignItems="stretch">
        <Typography variant="caption" color="muted" fontWeight="medium">Quantity</Typography>
        <Input
          type="number"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
          inputMode="numeric"
        />
      </VStack>

      <VStack gap={2} alignItems="stretch">
        <Typography variant="caption" color="muted" fontWeight="medium">Order Type</Typography>
        <NativeSelect value={type} onChange={(e) => setType(e.target.value)}>
          <NativeSelectOption value="market">Market</NativeSelectOption>
          <NativeSelectOption value="limit">Limit</NativeSelectOption>
          <NativeSelectOption value="stop">Stop-Loss</NativeSelectOption>
          <NativeSelectOption value="stop-limit">Stop-Limit</NativeSelectOption>
        </NativeSelect>
      </VStack>

      <Separator />

      <HStack justifyContent="between" alignItems="center">
        <Typography variant="body2" color="muted">Est. {side === 'buy' ? 'cost' : 'credit'}</Typography>
        <Typography variant="h6" className="tabular-nums">{usd(est)}</Typography>
      </HStack>

      {/* Button color prop gives semantic green/red — a real affordance. */}
      <Button
        fullWidth
        color={side === 'buy' ? 'success' : 'error'}
        size="lg"
      >
        {side === 'buy' ? 'Buy' : 'Sell'} AAPL
      </Button>
    </VStack>
  )
}

// ---------------------------------------------------------------------------
// Main screen
// ---------------------------------------------------------------------------
export const TradingPlatform: Story = {
  render: function TradingPlatformScreen() {
    const dayPL = 6580.0
    const dayPLpct = 2.64

    return (
      <Box className="min-h-screen" bg="background">
        {/* ---------------- Top bar ---------------- */}
        <Box
          as="header"
          bg="card"
          border
          borderColor="border"
          position="sticky"
          className="top-0 z-40"
        >
          <HStack justifyContent="between" alignItems="center" className="h-16 px-6">
            <HStack gap={6} alignItems="center">
              <HStack gap={2} alignItems="center">
                <Box
                  display="inline-flex"
                  alignItems="center"
                  justifyContent="center"
                  rounded="md"
                  style={{ background: ACCENT, width: 32, height: 32, color: '#fff' }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                    strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-hidden="true">
                    <path d="M3 17l6-6 4 4 8-8" /><path d="M17 7h4v4" />
                  </svg>
                </Box>
                <Typography variant="h6" fontWeight="bold">Vertex Trade</Typography>
              </HStack>

              <HStack gap={5} alignItems="baseline">
                <VStack gap={0} alignItems="start">
                  <Typography variant="caption" color="muted">Portfolio Value</Typography>
                  <Typography variant="h6" className="tabular-nums">{usd(255480)}</Typography>
                </VStack>
                <VStack gap={0} alignItems="start">
                  <Typography variant="caption" color="muted">Day P/L</Typography>
                  <Delta up={dayPL >= 0} size="h6">
                    <span className="tabular-nums">{signed(dayPL)} ({pct(dayPLpct)})</span>
                  </Delta>
                </VStack>
              </HStack>
            </HStack>

            <HStack gap={3} alignItems="center">
              <Box className="w-72">
                <Input placeholder="Search ticker…" startAdornment={<SearchIcon />} inputSize="sm" />
              </Box>
              <Button variant="outlined" size="sm">Deposit</Button>
              <Box
                display="inline-flex" alignItems="center" justifyContent="center" rounded="full"
                bg="muted" className="h-9 w-9"
              >
                <Typography variant="body2" fontWeight="semibold">JD</Typography>
              </Box>
            </HStack>
          </HStack>
        </Box>

        {/* ---------------- Body ---------------- */}
        <Box className="p-6" gap={6} display="flex" flexDirection="column">
          {/* KPI row */}
          <Grid columns={{ default: 1, sm: 2, lg: 4 }} gap={4}>
            <Kpi label="Portfolio Value" value={usd(255480)} deltaText={`${signed(dayPL)} today`} up />
            <Kpi label="Day Change" value={pct(dayPLpct)} deltaText="vs. prev close" up />
            <Kpi label="Buying Power" value={usd(48250)} deltaText="Settled cash" neutral />
            <Kpi label="Total Return" value="+18.42%" deltaText={`${signed(39740)} all-time`} up />
          </Grid>

          {/* Chart + order panel */}
          <Grid columns={{ default: 1, lg: 3 }} gap={6}>
            <Grid item lg={2}>
              <Card className="h-full">
                <CardHeader>
                  <HStack justifyContent="between" alignItems="center">
                    <VStack gap={0} alignItems="start">
                      <CardTitle className="text-lg">Portfolio Performance</CardTitle>
                      <Typography variant="caption" color="muted">Today · 1-minute intervals</Typography>
                    </VStack>
                    <HStack gap={1}>
                      {['1D', '1W', '1M', '1Y', 'ALL'].map((r, i) => (
                        <Button key={r} size="sm" variant={i === 0 ? 'secondary' : 'ghost'}>
                          {r}
                        </Button>
                      ))}
                    </HStack>
                  </HStack>
                </CardHeader>
                <CardContent>
                  <AreaChart
                    data={portfolioSeries}
                    dataKey="v"
                    xAxis={{ dataKey: 't' }}
                    height={300}
                    stroke={ACCENT}
                    fill={ACCENT}
                    showGrid
                    showTooltip
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item lg={1}>
              <OrderPanel />
            </Grid>
          </Grid>

          {/* Watchlist + holdings */}
          <Grid columns={{ default: 1, lg: 2 }} gap={6}>
            {/* Watchlist */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Watchlist</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <Table>
                  <Table.Header>
                    <Table.Row>
                      <Table.Head>Symbol</Table.Head>
                      <Table.Head className="text-right">Last</Table.Head>
                      <Table.Head className="text-right">Chg %</Table.Head>
                      <Table.Head className="text-right">Trend</Table.Head>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {watchlist.map((row) => {
                      const up = row.chg >= 0
                      return (
                        <Table.Row key={row.sym}>
                          <Table.Cell>
                            <Table.Cell.Primary>{row.sym}</Table.Cell.Primary>
                            <Table.Cell.Meta>{row.name}</Table.Cell.Meta>
                          </Table.Cell>
                          <Table.Cell className="text-right font-medium">{usd(row.last)}</Table.Cell>
                          <Table.Cell className="text-right">
                            <Delta up={up}>{pct(row.chg)}</Delta>
                          </Table.Cell>
                          <Table.Cell className="text-right">
                            <Box display="inline-flex" justifyContent="end" w="full">
                              <Sparkline points={row.spark} up={up} />
                            </Box>
                          </Table.Cell>
                        </Table.Row>
                      )
                    })}
                  </Table.Body>
                </Table>
              </CardContent>
            </Card>

            {/* Holdings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Holdings</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <Table>
                  <Table.Header>
                    <Table.Row>
                      <Table.Head>Symbol</Table.Head>
                      <Table.Head className="text-right">Qty</Table.Head>
                      <Table.Head className="text-right">Avg Cost</Table.Head>
                      <Table.Head className="text-right">LTP</Table.Head>
                      <Table.Head className="text-right">P/L</Table.Head>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {holdings.map((row) => {
                      const pl = (row.ltp - row.avg) * row.qty
                      const plPct = ((row.ltp - row.avg) / row.avg) * 100
                      const up = pl >= 0
                      return (
                        <Table.Row key={row.sym}>
                          <Table.Cell>
                            <Table.Cell.Primary>{row.sym}</Table.Cell.Primary>
                            <Table.Cell.Meta>{row.name}</Table.Cell.Meta>
                          </Table.Cell>
                          <Table.Cell className="text-right">{row.qty}</Table.Cell>
                          <Table.Cell className="text-right">{usd(row.avg)}</Table.Cell>
                          <Table.Cell className="text-right font-medium">{usd(row.ltp)}</Table.Cell>
                          <Table.Cell className="text-right">
                            <VStack gap={0} alignItems="end">
                              <Typography
                                variant="body2"
                                color={up ? 'success' : 'error'}
                                fontWeight="semibold"
                                className="tabular-nums"
                              >
                                {signed(pl)}
                              </Typography>
                              <Typography
                                variant="caption"
                                color={up ? 'success' : 'error'}
                                className="tabular-nums"
                              >
                                {pct(plPct)}
                              </Typography>
                            </VStack>
                          </Table.Cell>
                        </Table.Row>
                      )
                    })}
                  </Table.Body>
                </Table>
              </CardContent>
            </Card>
          </Grid>

          {/* Market movers */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Market Movers</CardTitle>
            </CardHeader>
            <CardContent>
              <Grid columns={{ default: 2, sm: 3, lg: 6 }} gap={4}>
                {movers.map((m) => {
                  const up = m.chg >= 0
                  return (
                    <Box
                      key={m.sym}
                      border
                      borderColor="border"
                      rounded="lg"
                      p={4}
                      className="hover:bg-muted/50 transition-colors"
                    >
                      <VStack gap={1} alignItems="start">
                        {/* FINDING: Stack/HStack has no width prop (Box does), so
                            a full-width row needs a raw w-full className. */}
                        <HStack gap={2} alignItems="center" justifyContent="between" className="w-full">
                          <Typography variant="subtitle2" fontWeight="bold">{m.sym}</Typography>
                          <Badge color={up ? 'success' : 'error'} variant="soft">
                            {up ? '▲' : '▼'}
                          </Badge>
                        </HStack>
                        <Typography variant="caption" color="muted" noWrap>{m.name}</Typography>
                        <Typography
                          variant="h6"
                          color={up ? 'success' : 'error'}
                          className="tabular-nums"
                        >
                          {pct(m.chg)}
                        </Typography>
                      </VStack>
                    </Box>
                  )
                })}
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </Box>
    )
  },
}
