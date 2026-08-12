import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  Box,
  Container,
  HStack,
  VStack,
  Grid,
  Stat,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
  ButtonGroup,
  IconButton,
  Badge,
  Switch,
  Input,
  Typography,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  LineChart,
  AreaChart,
  BarChart,
  DataGrid,
  type GridColDef,
} from "@onesaz/ui";

// ============================================================================
// Observability / APM Dashboard — dogfooding example
//
// Brand palette (per brief). These are passed to charts as explicit hex.
// ============================================================================
const BRAND = {
  accent: "#6933d3",
  success: "#22c55e",
  warning: "#f59e0b",
  error: "#ef4444",
  info: "#3b82f6",
};

// ---------------------------------------------------------------------------
// Inline SVG icons (brief: icons must be inline SVG)
// ---------------------------------------------------------------------------
const Icon = {
  Activity: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),
  Alert: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
      <path d="M12 9v4M12 17h.01" />
    </svg>
  ),
  Gauge: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m12 14 4-4M3.34 19a10 10 0 1 1 17.32 0" />
    </svg>
  ),
  Smile: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
    </svg>
  ),
  Refresh: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
    </svg>
  ),
  Search: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  ),
};

// ---------------------------------------------------------------------------
// Static realistic time-series data
// ---------------------------------------------------------------------------
const times = ["12:00", "12:05", "12:10", "12:15", "12:20", "12:25", "12:30", "12:35", "12:40", "12:45", "12:50", "12:55"];

const cpuData = times.map((t, i) => ({ t, cpu: [42, 47, 51, 49, 58, 63, 61, 55, 52, 60, 66, 71][i] }));
const memData = times.map((t, i) => ({ t, mem: [61, 62, 63, 64, 64, 65, 66, 66, 67, 68, 69, 70][i] }));
const reqRateData = times.map((t, i) => ({ t, req: [820, 910, 1020, 980, 1150, 1240, 1190, 1080, 1010, 1170, 1320, 1410][i] }));
const errRateData = times.map((t, i) => ({ t, err: [0.21, 0.24, 0.19, 0.28, 0.33, 0.41, 0.38, 0.29, 0.26, 0.35, 0.44, 0.42][i] }));
const latencyData = times.map((t, i) => ({
  t,
  p50: [40, 42, 45, 44, 48, 52, 50, 46, 44, 49, 55, 58][i],
  p95: [180, 195, 210, 205, 240, 262, 255, 228, 214, 246, 280, 298][i],
  p99: [320, 340, 360, 355, 410, 450, 435, 390, 372, 420, 480, 510][i],
}));
const throughputData = times.map((t, i) => ({ t, in: [12, 14, 16, 15, 18, 20, 19, 17, 16, 19, 22, 24][i], out: [10, 11, 13, 12, 15, 17, 16, 14, 13, 16, 19, 21][i] }));

// ---------------------------------------------------------------------------
// Top endpoints table data
// ---------------------------------------------------------------------------
interface EndpointRow {
  id: number;
  endpoint: string;
  method: string;
  requests: number;
  errorPct: number;
  p50: number;
  p95: number;
  p99: number;
}
const endpointRows: EndpointRow[] = [
  { id: 1, endpoint: "/api/v1/checkout", method: "POST", requests: 184203, errorPct: 2.41, p50: 88, p95: 412, p99: 980 },
  { id: 2, endpoint: "/api/v1/products", method: "GET", requests: 921044, errorPct: 0.12, p50: 24, p95: 96, p99: 210 },
  { id: 3, endpoint: "/api/v1/search", method: "GET", requests: 542310, errorPct: 0.88, p50: 61, p95: 248, p99: 640 },
  { id: 4, endpoint: "/api/v1/cart", method: "PUT", requests: 331890, errorPct: 1.72, p50: 45, p95: 190, p99: 470 },
  { id: 5, endpoint: "/api/v1/auth/login", method: "POST", requests: 220145, errorPct: 4.10, p50: 120, p95: 520, p99: 1240 },
  { id: 6, endpoint: "/api/v1/recommendations", method: "GET", requests: 118732, errorPct: 0.34, p50: 78, p95: 300, p99: 720 },
  { id: 7, endpoint: "/api/v1/orders", method: "GET", requests: 402219, errorPct: 0.21, p50: 33, p95: 128, p99: 290 },
  { id: 8, endpoint: "/api/v1/inventory", method: "GET", requests: 89211, errorPct: 6.80, p50: 210, p95: 890, p99: 1980 },
];

// Threshold color for an error percentage (returns brand hex).
// Shared by the endpoints grid; a Badge could not express the numeric value
// AND a threshold color inline, so we colour the raw number instead.
const errPctColor = (v: number) => (v >= 5 ? BRAND.error : v >= 1 ? BRAND.warning : BRAND.success);

const numberFmt = (v: number) => v.toLocaleString();

// ===========================================================================
// Shared control bar (used by both stories)
// ===========================================================================
const RANGES = ["1h", "6h", "24h", "7d"] as const;

function ControlBar() {
  const [range, setRange] = React.useState<(typeof RANGES)[number]>("6h");
  const [live, setLive] = React.useState(true);

  return (
    <Card>
      <HStack p={4} gap={3} align="center" wrap="wrap" justify="between">
        <HStack gap={2} align="center" wrap="wrap">
          <Select defaultValue="checkout-svc">
            {/* LOG(3): SelectTrigger has no size token; fixed width via className */}
            <SelectTrigger className="h-9 w-[190px]">
              <SelectValue placeholder="Service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="checkout-svc">checkout-service</SelectItem>
              <SelectItem value="catalog-svc">catalog-service</SelectItem>
              <SelectItem value="auth-svc">auth-service</SelectItem>
              <SelectItem value="search-svc">search-service</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="prod">
            <SelectTrigger className="h-9 w-[150px]">
              <SelectValue placeholder="Environment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="prod">production</SelectItem>
              <SelectItem value="staging">staging</SelectItem>
              <SelectItem value="dev">development</SelectItem>
            </SelectContent>
          </Select>

          {/* Time-range segmented control. LOG(4): no ToggleGroup/Segmented
              component — ButtonGroup only groups visually, it does not track a
              selected value, so selection state + per-button variant are hand-rolled. */}
          <ButtonGroup size="sm">
            {RANGES.map((r) => (
              <Button
                key={r}
                variant={range === r ? "contained" : "outlined"}
                onClick={() => setRange(r)}
              >
                {r}
              </Button>
            ))}
          </ButtonGroup>
        </HStack>

        <HStack gap={3} align="center">
          <IconButton variant="outlined" size="sm" aria-label="Refresh">
            <Icon.Refresh />
          </IconButton>
          <HStack gap={2} align="center">
            {/* LOG(5): live "dot" — no status-dot primitive; inline SVG + animate-pulse */}
            <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden className={live ? "animate-pulse" : "opacity-40"}>
              <circle cx="5" cy="5" r="5" fill={live ? BRAND.success : "#9ca3af"} />
            </svg>
            <Typography variant="body2" className="text-muted-foreground">
              Live
            </Typography>
            <Switch checked={live} onChange={(e) => setLive(e.target.checked)} aria-label="Toggle live updates" />
          </HStack>
        </HStack>
      </HStack>
    </Card>
  );
}

// ===========================================================================
// Metric panel — a compact Card wrapping a small chart. This is the pattern
// the brief calls out ("metric card" / dense chart panel).
// ===========================================================================
function MetricPanel({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="p-4 pb-0">
        <HStack justify="between" align="center">
          {/* CardTitle size="sm" is the new dense-header token */}
          <CardTitle size="sm">{title}</CardTitle>
          {hint && (
            <Typography variant="caption" className="text-muted-foreground tabular-nums">
              {hint}
            </Typography>
          )}
        </HStack>
      </CardHeader>
      {/* LOG(6): chart panels need small fixed heights; charts default to
          height={300}. We pass height per chart. CardContent default p-6 pt-0
          is too roomy for a dense panel, so px/py trimmed via className. */}
      <CardContent className="p-4 pt-2">{children}</CardContent>
    </Card>
  );
}

// Common compact chart props for panel charts.
const panelMargin = { top: 6, right: 8, left: -18, bottom: 0 }; // left:-18 pulls hidden Y-axis gutter back
const PANEL_H = 150;

const meta: Meta = {
  title: "Examples/Observability",
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj;

// ===========================================================================
// STORY 1 — Overview
// ===========================================================================
export const Overview: Story = {
  render: function OverviewStory() {
    const endpointColumns: GridColDef<EndpointRow>[] = [
      {
        field: "endpoint",
        headerName: "Endpoint",
        flex: 1,
        minWidth: 240,
        renderCell: ({ row }) => (
          <HStack gap={2} align="center">
            <Badge color="normal" variant="soft" className="font-mono">
              {row.method}
            </Badge>
            {/* LOG(7): font-mono for endpoint path — no monospace typography token */}
            <span className="font-mono text-sm">{row.endpoint}</span>
          </HStack>
        ),
      },
      {
        field: "requests",
        headerName: "Requests",
        width: 130,
        align: "right",
        headerAlign: "right",
        valueFormatter: ({ value }) => numberFmt(value),
      },
      {
        field: "errorPct",
        headerName: "Error %",
        width: 110,
        align: "right",
        headerAlign: "right",
        // Conditional colour on a numeric cell. LOG(8): renderCell + inline
        // style colour — no "conditional colour" affordance on a column.
        renderCell: ({ value }) => (
          <span style={{ color: errPctColor(value), fontWeight: 600 }} className="tabular-nums">
            {value.toFixed(2)}%
          </span>
        ),
      },
      {
        field: "p50",
        headerName: "p50",
        width: 90,
        align: "right",
        headerAlign: "right",
        valueFormatter: ({ value }) => `${value}ms`,
      },
      {
        field: "p95",
        headerName: "p95",
        width: 90,
        align: "right",
        headerAlign: "right",
        valueFormatter: ({ value }) => `${value}ms`,
      },
      {
        field: "p99",
        headerName: "p99",
        width: 100,
        align: "right",
        headerAlign: "right",
        // Colour p99 latency red when it crosses 1s.
        renderCell: ({ value }) => (
          <span style={{ color: value >= 1000 ? BRAND.error : undefined }} className="tabular-nums">
            {value}ms
          </span>
        ),
      },
    ];

    return (
      // LOG(9): fullscreen page shell — min-h-screen + bg-background via
      // className. No "Page"/"Screen" surface component exists.
      <Box className="min-h-screen bg-background">
        <Container maxWidth="full" className="py-6">
          <VStack gap={5}>
            <VStack gap={1}>
              <Typography variant="h4" className="font-semibold">
                Service Health — checkout-service
              </Typography>
              <Typography variant="body2" className="text-muted-foreground">
                production · last 6 hours · updated just now
              </Typography>
            </VStack>

            <ControlBar />

            {/* Health stat tiles */}
            <Grid columns={{ default: 1, sm: 2, lg: 4 }} gap={4}>
              <Stat
                label="Requests / sec"
                value="1.41k"
                delta="+4.2%"
                trend="up"
                hint="vs prev 1h"
                icon={<Icon.Activity />}
              />
              <Stat
                label="Error rate"
                value="0.42%"
                // LOG(10): Stat couples trend→colour (up=green, down=red) to
                // "good", but for error-rate UP is BAD. There is no `invert`.
                // Workaround: trend="flat" + a self-coloured delta node.
                delta={<span className="text-error-600 dark:text-error-400">+0.14%</span>}
                trend="flat"
                hint="vs prev 1h"
                icon={<Icon.Alert />}
              />
              <Stat
                label="p95 latency"
                value="248ms"
                // Same coupling: latency UP is bad → hand-colour the delta.
                delta={<span className="text-error-600 dark:text-error-400">+12ms</span>}
                trend="flat"
                hint="vs prev 1h"
                icon={<Icon.Gauge />}
              />
              <Stat
                label="Apdex"
                value="0.94"
                delta="+0.01"
                trend="up"
                hint="target 0.90"
                icon={<Icon.Smile />}
              />
            </Grid>

            {/* Dense responsive grid of metric panels */}
            <Grid columns={{ default: 1, md: 2, xl: 3 }} gap={4}>
              <MetricPanel title="CPU utilisation" hint="71%">
                <AreaChart
                  data={cpuData}
                  dataKey="cpu"
                  height={PANEL_H}
                  margin={panelMargin}
                  stroke={BRAND.accent}
                  // LOG(11): AreaChart has no `fillOpacity` prop; the fill is
                  // near-opaque. Pass an 8-digit hex to fake translucency.
                  fill={BRAND.accent + "33"}
                  xAxis={{ dataKey: "t" }}
                  showGrid={false}
                />
              </MetricPanel>

              <MetricPanel title="Memory" hint="70%">
                <AreaChart
                  data={memData}
                  dataKey="mem"
                  height={PANEL_H}
                  margin={panelMargin}
                  stroke={BRAND.info}
                  fill={BRAND.info + "33"}
                  xAxis={{ dataKey: "t" }}
                  showGrid={false}
                />
              </MetricPanel>

              <MetricPanel title="Request rate" hint="req/min">
                <BarChart
                  data={reqRateData}
                  dataKey="req"
                  height={PANEL_H}
                  margin={panelMargin}
                  fill={BRAND.accent}
                  xAxis={{ dataKey: "t" }}
                  barProps={{ radius: [3, 3, 0, 0], maxBarSize: 18 }}
                  showGrid={false}
                />
              </MetricPanel>

              <MetricPanel title="Error rate" hint="%">
                <LineChart
                  data={errRateData}
                  dataKey="err"
                  height={PANEL_H}
                  margin={panelMargin}
                  stroke={BRAND.error}
                  xAxis={{ dataKey: "t" }}
                  showGrid={false}
                />
              </MetricPanel>

              <MetricPanel title="Latency percentiles" hint="ms">
                <LineChart
                  data={latencyData}
                  dataKey="p50"
                  dataKeys={[
                    { dataKey: "p50", stroke: BRAND.success, name: "p50" },
                    { dataKey: "p95", stroke: BRAND.warning, name: "p95" },
                    { dataKey: "p99", stroke: BRAND.error, name: "p99" },
                  ]}
                  height={PANEL_H}
                  margin={panelMargin}
                  xAxis={{ dataKey: "t" }}
                  showGrid={false}
                  showLegend
                />
              </MetricPanel>

              <MetricPanel title="Throughput" hint="MB/s">
                <AreaChart
                  data={throughputData}
                  dataKey="in"
                  dataKeys={[
                    { dataKey: "in", stroke: BRAND.accent, fill: BRAND.accent + "33", name: "in" },
                    { dataKey: "out", stroke: BRAND.info, fill: BRAND.info + "33", name: "out" },
                  ]}
                  height={PANEL_H}
                  margin={panelMargin}
                  xAxis={{ dataKey: "t" }}
                  showGrid={false}
                  showLegend
                />
              </MetricPanel>
            </Grid>

            {/* Top endpoints DataGrid */}
            <VStack gap={2}>
              <Typography variant="h6" className="font-semibold">
                Top endpoints
              </Typography>
              <DataGrid
                rows={endpointRows}
                columns={endpointColumns}
                getRowId={(row) => row.id}
                density="compact"
                columnHeaderHeight={40}
                hideFooter
                autoHeight
              />
            </VStack>
          </VStack>
        </Container>
      </Box>
    );
  },
};

// ===========================================================================
// STORY 2 — Logs
// ===========================================================================
type LogLevel = "ERROR" | "WARN" | "INFO" | "DEBUG";

interface LogRow {
  id: number;
  ts: string;
  level: LogLevel;
  service: string;
  message: string;
}

const levelColor: Record<LogLevel, React.ComponentProps<typeof Badge>["color"]> = {
  ERROR: "error",
  WARN: "warning",
  INFO: "info",
  DEBUG: "normal",
};

const rawLogs: Omit<LogRow, "id">[] = [
  { ts: "12:55:03.221", level: "ERROR", service: "checkout-svc", message: "PaymentGatewayTimeout: upstream did not respond within 3000ms (order=8841)" },
  { ts: "12:55:02.980", level: "INFO", service: "catalog-svc", message: "Cache warmed: 12,402 product entries in 214ms" },
  { ts: "12:55:02.771", level: "WARN", service: "auth-svc", message: "Rate limit approaching for client 10.2.9.44 (92% of quota)" },
  { ts: "12:55:02.560", level: "INFO", service: "search-svc", message: "Query 'wireless earbuds' -> 1,204 hits in 61ms" },
  { ts: "12:55:02.113", level: "DEBUG", service: "checkout-svc", message: "Applying discount code SPRING24 to cart 5521" },
  { ts: "12:55:01.902", level: "ERROR", service: "inventory-svc", message: "SKU 99213 oversold: available=-3, reserved=41" },
  { ts: "12:55:01.640", level: "INFO", service: "checkout-svc", message: "Order 8840 confirmed, total ₹4,299.00" },
  { ts: "12:55:01.331", level: "WARN", service: "catalog-svc", message: "Slow query detected: products.findByFacet took 812ms" },
  { ts: "12:55:00.998", level: "INFO", service: "auth-svc", message: "User login success: user=4471 method=oauth-google" },
  { ts: "12:55:00.702", level: "DEBUG", service: "search-svc", message: "Reranking model v3 applied, latency +8ms" },
  { ts: "12:55:00.411", level: "ERROR", service: "auth-svc", message: "InvalidToken: signature verification failed for session 77aa1" },
  { ts: "12:55:00.120", level: "INFO", service: "inventory-svc", message: "Restock event: SKU 44120 +500 units" },
  { ts: "12:54:59.884", level: "WARN", service: "checkout-svc", message: "Retrying payment capture (attempt 2/3) for order 8839" },
  { ts: "12:54:59.550", level: "INFO", service: "catalog-svc", message: "Reindexed 340 products after price update" },
  { ts: "12:54:59.221", level: "DEBUG", service: "checkout-svc", message: "Fraud score 0.12 for order 8838 (threshold 0.80)" },
];
const logRows: LogRow[] = rawLogs.map((r, i) => ({ id: i + 1, ...r }));

// Facet counts
const levelFacets: { level: LogLevel; count: number }[] = [
  { level: "ERROR", count: 3 },
  { level: "WARN", count: 3 },
  { level: "INFO", count: 6 },
  { level: "DEBUG", count: 3 },
];
const serviceFacets = [
  { service: "checkout-svc", count: 5 },
  { service: "catalog-svc", count: 3 },
  { service: "auth-svc", count: 3 },
  { service: "search-svc", count: 2 },
  { service: "inventory-svc", count: 2 },
];

// A single facet row. LOG(12): no List/Facet component with a trailing count,
// so the label + right-aligned count is hand-built with ml-auto + tabular-nums.
function FacetRow({ label, count, dot }: { label: React.ReactNode; count: number; dot?: string }) {
  return (
    <HStack
      gap={2}
      align="center"
      className="cursor-pointer rounded-md px-2 py-1.5 text-sm hover:bg-muted"
    >
      {dot && <span className="h-2 w-2 rounded-full" style={{ backgroundColor: dot }} />}
      {label}
      <span className="ml-auto tabular-nums text-xs text-muted-foreground">{count}</span>
    </HStack>
  );
}

export const Logs: Story = {
  render: function LogsStory() {
    const logColumns: GridColDef<LogRow>[] = [
      {
        field: "ts",
        headerName: "Timestamp",
        width: 130,
        renderCell: ({ value }) => <span className="font-mono text-xs text-muted-foreground">{value}</span>,
      },
      {
        field: "level",
        headerName: "Level",
        width: 90,
        renderCell: ({ row }) => (
          <Badge color={levelColor[row.level]} variant="soft" className="font-mono text-[10px]">
            {row.level}
          </Badge>
        ),
      },
      {
        field: "service",
        headerName: "Service",
        width: 140,
        renderCell: ({ value }) => <span className="font-mono text-xs">{value}</span>,
      },
      {
        field: "message",
        headerName: "Message",
        flex: 1,
        minWidth: 360,
        // LOG(13): mono + truncate for the log line; DataGrid truncates by
        // default but the monospace look needs className.
        renderCell: ({ value }) => <span className="font-mono text-xs">{value}</span>,
      },
    ];

    return (
      <Box className="min-h-screen bg-background">
        <Container maxWidth="full" className="py-6">
          <VStack gap={5}>
            <VStack gap={1}>
              <Typography variant="h4" className="font-semibold">
                Log explorer
              </Typography>
              <Typography variant="body2" className="text-muted-foreground">
                production · 15 events in the last minute
              </Typography>
            </VStack>

            {/* Filter bar */}
            <Card>
              <HStack p={4} gap={3} align="center" wrap="wrap">
                {/* LOG(14): search input has no leading-icon slot; the icon is
                    absolutely positioned over a padded Input by hand. */}
                <Box className="relative w-full max-w-sm">
                  <span className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground">
                    <Icon.Search />
                  </span>
                  <Input placeholder="Filter logs…" className="h-9 pl-9" />
                </Box>
                <Select defaultValue="all">
                  <SelectTrigger className="h-9 w-[150px]">
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All levels</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                    <SelectItem value="warn">Warn</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="debug">Debug</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all">
                  <SelectTrigger className="h-9 w-[180px]">
                    <SelectValue placeholder="Service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All services</SelectItem>
                    <SelectItem value="checkout-svc">checkout-svc</SelectItem>
                    <SelectItem value="catalog-svc">catalog-svc</SelectItem>
                    <SelectItem value="auth-svc">auth-svc</SelectItem>
                  </SelectContent>
                </Select>
                <IconButton variant="outlined" size="sm" aria-label="Refresh">
                  <Icon.Refresh />
                </IconButton>
              </HStack>
            </Card>

            {/* Sidebar facets + logs grid */}
            {/* LOG(15): two-pane layout — fixed-width sidebar has no layout prop,
                so w-60/shrink-0 via className; the grid pane needs min-w-0 to
                stop it overflowing the flex row. */}
            <HStack gap={4} align="start" className="w-full">
              <VStack gap={4} className="w-60 shrink-0">
                <Card>
                  <CardHeader className="p-3 pb-1">
                    <CardTitle size="sm">Levels</CardTitle>
                  </CardHeader>
                  <CardContent className="p-2 pt-0">
                    {levelFacets.map((f) => (
                      <FacetRow
                        key={f.level}
                        dot={f.level === "ERROR" ? BRAND.error : f.level === "WARN" ? BRAND.warning : f.level === "INFO" ? BRAND.info : "#9ca3af"}
                        label={<span className="font-mono text-xs">{f.level}</span>}
                        count={f.count}
                      />
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="p-3 pb-1">
                    <CardTitle size="sm">Services</CardTitle>
                  </CardHeader>
                  <CardContent className="p-2 pt-0">
                    {serviceFacets.map((f) => (
                      <FacetRow key={f.service} label={<span className="font-mono text-xs">{f.service}</span>} count={f.count} />
                    ))}
                  </CardContent>
                </Card>
              </VStack>

              <Box className="min-w-0 flex-1">
                <DataGrid
                  rows={logRows}
                  columns={logColumns}
                  getRowId={(row) => row.id}
                  density="compact"
                  columnHeaderHeight={38}
                  height={560}
                  getRowClassName={({ row }) =>
                    // Tint error rows. LOG(16): getRowClassName returns a raw
                    // className string — the only hook for row-level styling.
                    row.level === "ERROR" ? "bg-error-500/5" : ""
                  }
                />
              </Box>
            </HStack>
          </VStack>
        </Container>
      </Box>
    );
  },
};
