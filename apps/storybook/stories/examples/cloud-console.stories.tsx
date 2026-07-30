import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  Box,
  HStack,
  VStack,
  Grid,
  Card,
  Button,
  IconButton,
  Badge,
  Chip,
  Input,
  Separator,
  Typography,
  Breadcrumbs,
  BreadcrumbItem,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarItem,
  TopBar,
  TopBarBrand,
  TopBarSection,
  TopBarDivider,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DataGrid,
  LineChart,
  AreaChart,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  type GridColDef,
} from "@onesaz/ui";

// ============================================================================
// Brand palette (on-brand hex per the design brief)
// ============================================================================
const BRAND = {
  accent: "#6933d3",
  success: "#22c55e",
  warning: "#f59e0b",
  error: "#ef4444",
  info: "#3b82f6",
};

// ============================================================================
// Inline SVG icons (library ships no icon set — everything is hand-rolled)
// ============================================================================
type IconProps = { className?: string };
const svg = (path: React.ReactNode) =>
  function Icon({ className }: IconProps) {
    return (
      <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {path}
      </svg>
    );
  };

const ComputeIcon = svg(
  <>
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" />
    <path d="M15 2v2M9 2v2M15 20v2M9 20v2M20 15h2M20 9h2M2 15h2M2 9h2" />
  </>,
);
const StorageIcon = svg(
  <>
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5v14a9 3 0 0 0 18 0V5" />
    <path d="M3 12a9 3 0 0 0 18 0" />
  </>,
);
const DatabaseIcon = svg(
  <>
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5v6a9 3 0 0 0 18 0V5" />
    <path d="M3 11v6a9 3 0 0 0 18 0v-6" />
  </>,
);
const NetworkIcon = svg(
  <>
    <rect x="16" y="16" width="6" height="6" rx="1" />
    <rect x="2" y="16" width="6" height="6" rx="1" />
    <rect x="9" y="2" width="6" height="6" rx="1" />
    <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3M12 12V8" />
  </>,
);
const FunctionIcon = svg(
  <path d="M9 21s3-1 3-9 3-9 3-9M6 12h6" />,
);
const KubernetesIcon = svg(
  <>
    <path d="m12 2 8 4.5v9L12 20l-8-4.5v-9L12 2z" />
    <circle cx="12" cy="12" r="3" />
  </>,
);
const BucketIcon = svg(
  <path d="M5 6h14l-1.5 13a2 2 0 0 1-2 1.8H8.5a2 2 0 0 1-2-1.8L5 6zM5 6l1-3h12l1 3" />,
);
const CdnIcon = svg(
  <>
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15 15 0 0 1 0 20a15 15 0 0 1 0-20z" />
  </>,
);
const SqlIcon = svg(
  <>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M3 10h18M8 14h2M14 14h2" />
  </>,
);
const CacheIcon = svg(
  <>
    <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
  </>,
);
const DnsIcon = svg(
  <>
    <path d="M12 2v20M2 12h20" />
    <circle cx="12" cy="12" r="10" />
  </>,
);
const FirewallIcon = svg(
  <>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </>,
);
const SearchIcon = svg(
  <>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </>,
);
const BellIcon = svg(
  <>
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </>,
);
const PlusIcon = svg(<path d="M12 5v14M5 12h14" />);
const RefreshIcon = svg(
  <>
    <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
  </>,
);
const FilterIcon = svg(<path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />);
const GridIcon = svg(
  <>
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </>,
);
const ActivityIcon = svg(<path d="M22 12h-4l-3 9L9 3l-3 9H2" />);
const GaugeIcon = svg(
  <>
    <path d="m12 14 4-4" />
    <path d="M3.34 19a10 10 0 1 1 17.32 0" />
  </>,
);
const DollarIcon = svg(
  <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />,
);
const CpuIcon = svg(
  <>
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" />
    <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
  </>,
);
const StopIcon = svg(<rect x="5" y="5" width="14" height="14" rx="2" />);
const ChevronDownIcon = svg(<path d="m6 9 6 6 6-6" />);
const CloudIcon = svg(
  <path d="M17.5 19a4.5 4.5 0 0 0 0-9 6 6 0 0 0-11.6 1.5A4 4 0 0 0 6 19h11.5z" />,
);
const HomeIcon = svg(
  <>
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <path d="M9 22V12h6v10" />
  </>,
);
const BillingIcon = svg(
  <>
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <path d="M2 10h20" />
  </>,
);
const UserIcon = svg(
  <>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </>,
);

// ============================================================================
// Local building blocks the library does NOT provide (see FINDINGS)
// ============================================================================

/**
 * FINDING #4 — No Stat/Metric/KPI tile primitive. Hand-composed from
 * Card + Typography + a colored icon chip. The colored icon chip needs a
 * raw className (OVERRIDE) because Box.bg only exposes semantic tokens
 * (accent/muted/...) and not success/warning/error tints.
 */
function StatTile({
  label,
  value,
  sub,
  icon,
  tint,
}: {
  label: string;
  value: string;
  sub?: React.ReactNode;
  icon: React.ReactNode;
  tint: string;
}) {
  return (
    <Card>
      <Box p={4} display="flex" alignItems="start" justifyContent="between" gap={3}>
        <VStack gap={1}>
          <Typography variant="caption" color="muted" textTransform="uppercase">
            {label}
          </Typography>
          <Typography variant="h3" as="div">
            {value}
          </Typography>
          {sub && <div>{sub}</div>}
        </VStack>
        {/* OVERRIDE #1: colored soft icon chip — Box.bg has no color-tint option */}
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${tint}1a`, color: tint }}
        >
          {icon}
        </span>
      </Box>
    </Card>
  );
}

/**
 * FINDING #2 — No icon "service card" primitive. Composed from Card + a
 * colored icon tile + Typography. Whole card is clickable.
 */
function ServiceCard({
  name,
  description,
  icon,
  tint,
}: {
  name: string;
  description: string;
  icon: React.ReactNode;
  tint: string;
}) {
  return (
    <Card
      // OVERRIDE #2: hover affordance — Card exposes no `hoverable`/interactive prop
      className="cursor-pointer transition-shadow hover:shadow-md"
    >
      <Box p={4}>
        <HStack gap={3} alignItems="start">
          {/* OVERRIDE #3: colored icon tile — same Box.bg tint gap as #1 */}
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
            style={{ backgroundColor: `${tint}1a`, color: tint }}
          >
            {icon}
          </span>
          <VStack gap={1}>
            <Typography variant="subtitle2" as="div" fontWeight="semibold">
              {name}
            </Typography>
            <Typography variant="caption" color="muted">
              {description}
            </Typography>
          </VStack>
        </HStack>
      </Box>
    </Card>
  );
}

/**
 * FINDING #3 — No PageHeader/Toolbar primitive. Breadcrumbs + title +
 * actions row is assembled by hand every time.
 */
function PageHeader({
  crumbs,
  title,
  actions,
}: {
  crumbs: { label: string; current?: boolean }[];
  title: string;
  actions?: React.ReactNode;
}) {
  return (
    <VStack gap={3}>
      <Breadcrumbs>
        {crumbs.map((c) => (
          <BreadcrumbItem key={c.label} current={c.current} href={c.current ? undefined : "#"}>
            {c.label}
          </BreadcrumbItem>
        ))}
      </Breadcrumbs>
      <HStack justifyContent="between" alignItems="center" wrap="wrap" gap={3}>
        <Typography variant="h3" as="h1">
          {title}
        </Typography>
        {actions && <HStack gap={2}>{actions}</HStack>}
      </HStack>
    </VStack>
  );
}

/**
 * FINDING #1 — No AppShell/PageLayout. The topbar + sidebar + scrollable
 * content region is wired together manually. The content column needs a raw
 * `flex-1 overflow-auto` because neither Box nor Stack expose a flex-grow prop.
 */
function ConsoleShell({
  active,
  children,
}: {
  active: string;
  children: React.ReactNode;
}) {
  const nav = [
    { key: "home", label: "Home", icon: <HomeIcon /> },
    { key: "compute", label: "Compute", icon: <ComputeIcon /> },
    { key: "storage", label: "Storage", icon: <StorageIcon /> },
    { key: "databases", label: "Databases", icon: <DatabaseIcon /> },
    { key: "networking", label: "Networking", icon: <NetworkIcon /> },
    { key: "monitoring", label: "Monitoring", icon: <ActivityIcon /> },
    { key: "billing", label: "Billing", icon: <BillingIcon /> },
  ];

  const [navOpen, setNavOpen] = React.useState(false);

  const sidebarInner = (
    <>
      <SidebarHeader>
        <Typography variant="overline" color="muted">
          Services
        </Typography>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {nav.map((n) => (
            <SidebarItem key={n.key} icon={n.icon} active={active === n.key} href="#">
              {n.label}
            </SidebarItem>
          ))}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <HStack gap={2} alignItems="center">
          <GaugeIcon className="h-4 w-4 text-muted-foreground" />
          <Typography variant="caption" color="muted">
            Status: All systems operational
          </Typography>
        </HStack>
      </SidebarFooter>
    </>
  );

  return (
    <Box h="screen" display="flex" flexDirection="column" overflow="hidden" bg="background">
      {/* ---- Top bar: logo, region selector, search, notifications, account ---- */}
      <TopBar sticky>
        <IconButton
          variant="ghost"
          size="sm"
          aria-label="Open navigation"
          className="lg:hidden"
          onClick={() => setNavOpen(true)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </IconButton>
        <TopBarBrand
          logo={<span style={{ color: BRAND.accent }}><CloudIcon /></span>}
          name="NimbusCloud"
        />
        <TopBarDivider />
        {/* Region selector */}
        <Select defaultValue="us-east-1">
          {/* OVERRIDE #4: constrain trigger width — SelectTrigger has no width prop */}
          <SelectTrigger className="h-9 w-[190px]">
            <SelectValue placeholder="Region" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="us-east-1">US East (N. Virginia)</SelectItem>
            <SelectItem value="us-west-2">US West (Oregon)</SelectItem>
            <SelectItem value="eu-west-1">EU (Ireland)</SelectItem>
            <SelectItem value="ap-south-1">Asia Pacific (Mumbai)</SelectItem>
          </SelectContent>
        </Select>

        <TopBarSection align="center">
          {/* OVERRIDE #5: fixed search width — Input is 100% wide with no size cap */}
          <Box className="w-[360px] max-w-[42vw]">
            <Input
              inputSize="sm"
              placeholder="Search services, resources, docs..."
              startAdornment={<SearchIcon className="h-4 w-4" />}
            />
          </Box>
        </TopBarSection>

        <TopBarSection align="right">
          <IconButton variant="ghost" size="sm" aria-label="Notifications">
            <BellIcon />
          </IconButton>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" endIcon={<ChevronDownIcon />}>
                <HStack gap={2} alignItems="center">
                  {/* OVERRIDE #6: avatar circle — no Avatar tint helper for initials-on-accent */}
                  <span
                    className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold text-white"
                    style={{ backgroundColor: BRAND.accent }}
                  >
                    AM
                  </span>
                  <span>acme-prod</span>
                </HStack>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>arun@acme.io</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <UserIcon className="h-4 w-4" /> Account settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BillingIcon className="h-4 w-4" /> Billing & usage
              </DropdownMenuItem>
              <DropdownMenuItem>Switch organization</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TopBarSection>
      </TopBar>

      {/* ---- Body: sidebar + scrollable content ---- */}
      <Box display="flex" overflow="hidden" className="flex-1">
        {/* Desktop sidebar (in-flow, hidden on mobile) */}
        <Box className="hidden lg:flex">
          <Sidebar>{sidebarInner}</Sidebar>
        </Box>

        {/* Mobile drawer (dogfoods Box position/inset/z props) */}
        {navOpen && (
          <>
            <Box
              position="fixed"
              inset
              z={40}
              className="bg-black/40 lg:hidden"
              onClick={() => setNavOpen(false)}
            />
            <Box
              position="fixed"
              top={0}
              bottom={0}
              left={0}
              z={50}
              className="lg:hidden bg-card shadow-xl"
              onClick={() => setNavOpen(false)}
            >
              <Sidebar>{sidebarInner}</Sidebar>
            </Box>
          </>
        )}

        {/* Content column: grow + scroll via props (was flex-1 overflow-auto) */}
        <Box grow minW={0} overflow="auto" p={6}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}

// ============================================================================
// Static data
// ============================================================================
const services = {
  Compute: [
    { name: "Virtual Machines", description: "Scalable VM instances on demand", icon: <ComputeIcon />, tint: BRAND.accent },
    { name: "Kubernetes Engine", description: "Managed container orchestration", icon: <KubernetesIcon />, tint: BRAND.accent },
    { name: "Serverless Functions", description: "Run code without managing servers", icon: <FunctionIcon />, tint: BRAND.accent },
  ],
  Storage: [
    { name: "Object Storage", description: "Durable buckets for any object", icon: <BucketIcon />, tint: BRAND.info },
    { name: "Block Volumes", description: "High-performance disks for VMs", icon: <StorageIcon />, tint: BRAND.info },
    { name: "CDN", description: "Cache content at the edge", icon: <CdnIcon />, tint: BRAND.info },
  ],
  Database: [
    { name: "Managed SQL", description: "Postgres & MySQL, fully managed", icon: <SqlIcon />, tint: BRAND.success },
    { name: "NoSQL Document DB", description: "Elastic JSON document store", icon: <DatabaseIcon />, tint: BRAND.success },
    { name: "In-Memory Cache", description: "Sub-millisecond Redis caching", icon: <CacheIcon />, tint: BRAND.success },
  ],
  Networking: [
    { name: "Load Balancer", description: "Distribute traffic across targets", icon: <NetworkIcon />, tint: BRAND.warning },
    { name: "DNS & Domains", description: "Managed authoritative DNS", icon: <DnsIcon />, tint: BRAND.warning },
    { name: "Cloud Firewall", description: "Stateful network security rules", icon: <FirewallIcon />, tint: BRAND.warning },
  ],
};

type InstanceStatus = "running" | "stopped" | "pending" | "terminated";
interface Instance {
  id: string;
  name: string;
  type: string;
  status: InstanceStatus;
  region: string;
  ip: string;
  cost: number;
}
const instances: Instance[] = [
  { id: "i-0a1b2c3d4e5f6", name: "web-server-prod-1", type: "c5.xlarge", status: "running", region: "us-east-1", ip: "54.221.10.4", cost: 122.4 },
  { id: "i-0b2c3d4e5f6a7", name: "web-server-prod-2", type: "c5.xlarge", status: "running", region: "us-east-1", ip: "54.221.10.9", cost: 122.4 },
  { id: "i-0c3d4e5f6a7b8", name: "api-gateway-1", type: "m5.large", status: "running", region: "us-east-1", ip: "3.88.201.15", cost: 70.1 },
  { id: "i-0d4e5f6a7b8c9", name: "batch-worker-1", type: "r5.2xlarge", status: "stopped", region: "us-west-2", ip: "—", cost: 0 },
  { id: "i-0e5f6a7b8c9d0", name: "batch-worker-2", type: "r5.2xlarge", status: "stopped", region: "us-west-2", ip: "—", cost: 0 },
  { id: "i-0f6a7b8c9d0e1", name: "ml-training-gpu", type: "p3.2xlarge", status: "pending", region: "eu-west-1", ip: "—", cost: 918.0 },
  { id: "i-0a7b8c9d0e1f2", name: "staging-app", type: "t3.medium", status: "running", region: "eu-west-1", ip: "34.240.55.12", cost: 30.2 },
  { id: "i-0b8c9d0e1f2a3", name: "bastion-host", type: "t3.micro", status: "running", region: "us-east-1", ip: "54.90.11.7", cost: 7.6 },
  { id: "i-0c9d0e1f2a3b4", name: "legacy-monolith", type: "m4.large", status: "terminated", region: "us-east-1", ip: "—", cost: 0 },
];

const statusColor: Record<InstanceStatus, React.ComponentProps<typeof Badge>["color"]> = {
  running: "success",
  stopped: "normal",
  pending: "warning",
  terminated: "error",
};

// Time-series for the monitoring dashboard
const metricSeries = Array.from({ length: 12 }, (_, i) => {
  const hour = `${String(i * 2).padStart(2, "0")}:00`;
  return {
    time: hour,
    cpu: Math.round(35 + 25 * Math.sin(i / 1.7) + (i % 3) * 4),
    mem: Math.round(55 + 12 * Math.cos(i / 2.1)),
    netIn: Math.round(120 + 90 * Math.abs(Math.sin(i / 1.3))),
    netOut: Math.round(80 + 60 * Math.abs(Math.cos(i / 1.6))),
  };
});

const recentEvents = [
  { time: "09:42:11", type: "Scaling", resource: "web-server-prod", message: "Scaled out to 2 instances", severity: "info" as const },
  { time: "09:15:03", type: "Health", resource: "api-gateway-1", message: "Health check passed", severity: "success" as const },
  { time: "08:58:47", type: "Deploy", resource: "staging-app", message: "Deployment v2.14.0 succeeded", severity: "success" as const },
  { time: "08:31:22", type: "Alarm", resource: "batch-worker-1", message: "CPU > 90% for 5 min", severity: "warning" as const },
  { time: "07:12:09", type: "Error", resource: "ml-training-gpu", message: "Instance failed to start (capacity)", severity: "error" as const },
];
const severityColor: Record<string, React.ComponentProps<typeof Badge>["color"]> = {
  info: "info",
  success: "success",
  warning: "warning",
  error: "error",
};

const money = (n: number) =>
  n === 0 ? "—" : `$${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

// ============================================================================
// Storybook meta
// ============================================================================
const meta: Meta = {
  title: "Examples/Cloud Console",
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj;

// ----------------------------------------------------------------------------
// Story 1 — Services landing
// ----------------------------------------------------------------------------
export const ServicesLanding: Story = {
  render: () => (
    <ConsoleShell active="home">
      <VStack gap={6}>
        <VStack gap={1}>
          <Typography variant="h3" as="h1">
            Welcome back, Arun
          </Typography>
          <Typography variant="body2" color="muted">
            Browse and launch cloud services across your organization.
          </Typography>
        </VStack>

        {Object.entries(services).map(([category, items]) => (
          <VStack key={category} gap={3}>
            <HStack gap={2} alignItems="center">
              <GridIcon className="h-4 w-4 text-muted-foreground" />
              <Typography variant="h5" as="h2">
                {category}
              </Typography>
              <Chip label={`${items.length}`} size="small" variant="outlined" />
            </HStack>
            <Grid columns={{ default: 1, md: 2, lg: 3 }} gap={4}>
              {items.map((s) => (
                <ServiceCard key={s.name} {...s} />
              ))}
            </Grid>
          </VStack>
        ))}
      </VStack>
    </ConsoleShell>
  ),
};

// ----------------------------------------------------------------------------
// Story 2 — Compute service list
// ----------------------------------------------------------------------------
const instanceColumns: GridColDef<Instance>[] = [
  {
    field: "id",
    headerName: "Instance",
    flex: 1,
    minWidth: 220,
    // Two-line cell: id (mono) over friendly name
    renderCell: ({ row }) => (
      <VStack gap={0}>
        {/* OVERRIDE #8: monospace + tight leading — Typography has no `mono` variant */}
        <span className="font-mono text-xs text-foreground">{row.id}</span>
        <span className="text-xs text-muted-foreground">{row.name}</span>
      </VStack>
    ),
  },
  { field: "type", headerName: "Type", width: 120 },
  {
    field: "status",
    headerName: "Status",
    width: 130,
    renderCell: ({ row }) => (
      <Badge color={statusColor[row.status]} variant="soft">
        {row.status}
      </Badge>
    ),
  },
  { field: "region", headerName: "Region", width: 130 },
  {
    field: "ip",
    headerName: "Public IP",
    width: 140,
    // OVERRIDE #9: monospace IP — no library affordance for tabular/mono cell text
    renderCell: ({ row }) => <span className="font-mono text-xs">{row.ip}</span>,
  },
  {
    field: "cost",
    headerName: "Monthly cost",
    width: 140,
    align: "right",
    headerAlign: "right",
    valueFormatter: ({ value }) => money(value as number),
  },
];

export const ComputeService: Story = {
  render: function ComputeServiceStory() {
    const running = instances.filter((i) => i.status === "running").length;
    const stopped = instances.filter((i) => i.status === "stopped").length;
    const vcpus = 148;
    const monthly = instances.reduce((s, i) => s + i.cost, 0);

    const toolbarButtons = (
      <>
        <Button variant="outlined" size="sm" startIcon={<FilterIcon />}>
          Filters
        </Button>
        <Button variant="outlined" size="sm" startIcon={<RefreshIcon />}>
          Refresh
        </Button>
      </>
    );

    return (
      <ConsoleShell active="compute">
        <VStack gap={6}>
          <PageHeader
            crumbs={[
              { label: "Home" },
              { label: "Compute" },
              { label: "Virtual Machines", current: true },
            ]}
            title="Virtual Machines"
            actions={
              <>
                <Button variant="outlined" size="sm" startIcon={<RefreshIcon />}>
                  Refresh
                </Button>
                <Button size="sm" startIcon={<PlusIcon />}>
                  Launch instance
                </Button>
              </>
            }
          />

          <Grid columns={{ default: 1, sm: 2, lg: 4 }} gap={4}>
            <StatTile
              label="Running"
              value={String(running)}
              icon={<CpuIcon />}
              tint={BRAND.success}
              sub={
                <Typography variant="caption" color="success">
                  Healthy
                </Typography>
              }
            />
            <StatTile label="Stopped" value={String(stopped)} icon={<StopIcon />} tint={BRAND.warning} />
            <StatTile label="Total vCPUs" value={String(vcpus)} icon={<GaugeIcon />} tint={BRAND.accent} />
            <StatTile
              label="Est. monthly cost"
              value={money(monthly)}
              icon={<DollarIcon />}
              tint={BRAND.info}
              sub={
                <Typography variant="caption" color="muted">
                  across {instances.length} instances
                </Typography>
              }
            />
          </Grid>

          <DataGrid
            rows={instances}
            columns={instanceColumns}
            getRowId={(row) => row.id}
            toolBar
            title="Instances"
            density="standard"
            height={430}
            slotProps={{ toolbar: { customButtons: toolbarButtons } }}
          />
        </VStack>
      </ConsoleShell>
    );
  },
};

// ----------------------------------------------------------------------------
// Story 3 — Service monitoring dashboard
// ----------------------------------------------------------------------------
function HealthCard({
  label,
  value,
  status,
  hint,
}: {
  label: string;
  value: string;
  status: "success" | "warning" | "error";
  hint: string;
}) {
  return (
    <Card>
      <Box p={4}>
        <VStack gap={2}>
          <HStack justifyContent="between" alignItems="center">
            <Typography variant="caption" color="muted" textTransform="uppercase">
              {label}
            </Typography>
            {/* status dot */}
            <span
              // OVERRIDE #10: status dot — no Badge/Indicator "dot" shape in the library
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: BRAND[status === "success" ? "success" : status] }}
            />
          </HStack>
          <Typography variant="h4" as="div">
            {value}
          </Typography>
          <Typography variant="caption" color="muted">
            {hint}
          </Typography>
        </VStack>
      </Box>
    </Card>
  );
}

export const ServiceDashboard: Story = {
  render: () => (
    <ConsoleShell active="monitoring">
      <VStack gap={6}>
        <PageHeader
          crumbs={[
            { label: "Home" },
            { label: "Compute" },
            { label: "web-server-prod", current: true },
          ]}
          title="web-server-prod · Monitoring"
          actions={
            <Button variant="outlined" size="sm" startIcon={<RefreshIcon />}>
              Last 24h
            </Button>
          }
        />

        {/* Health cards */}
        <Grid columns={{ default: 1, sm: 2, lg: 4 }} gap={4}>
          <HealthCard label="Availability" value="99.98%" status="success" hint="30-day uptime" />
          <HealthCard label="Avg CPU" value="47%" status="success" hint="across 2 instances" />
          <HealthCard label="Error rate" value="0.4%" status="warning" hint="5xx over last hour" />
          <HealthCard label="p99 latency" value="212 ms" status="success" hint="request duration" />
        </Grid>

        {/* Metric charts */}
        <Grid columns={{ default: 1, lg: 2 }} gap={4}>
          <Card>
            <Box p={4}>
              <VStack gap={1}>
                <Typography variant="subtitle2" fontWeight="semibold" as="div">
                  CPU utilization
                </Typography>
                <Typography variant="caption" color="muted">
                  Percent, per 2-hour bucket
                </Typography>
              </VStack>
              <LineChart
                data={metricSeries}
                dataKey="cpu"
                dataKeys={[
                  { dataKey: "cpu", name: "CPU %", stroke: BRAND.accent },
                  { dataKey: "mem", name: "Memory %", stroke: BRAND.info },
                ]}
                xAxis={{ dataKey: "time" }}
                yAxis={{}}
                showLegend
                height={260}
              />
            </Box>
          </Card>
          <Card>
            <Box p={4}>
              <VStack gap={1}>
                <Typography variant="subtitle2" fontWeight="semibold" as="div">
                  Network throughput
                </Typography>
                <Typography variant="caption" color="muted">
                  MB/s in and out
                </Typography>
              </VStack>
              <AreaChart
                data={metricSeries}
                dataKey="netIn"
                dataKeys={[
                  { dataKey: "netIn", name: "In", stroke: BRAND.success, fill: BRAND.success },
                  { dataKey: "netOut", name: "Out", stroke: BRAND.warning, fill: BRAND.warning },
                ]}
                xAxis={{ dataKey: "time" }}
                yAxis={{}}
                showLegend
                height={260}
              />
            </Box>
          </Card>
        </Grid>

        {/* Recent events */}
        <Card className="overflow-hidden">
          <Box p={4}>
            <Typography variant="subtitle2" fontWeight="semibold" as="div">
              Recent events
            </Typography>
          </Box>
          <Separator />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Resource</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Severity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentEvents.map((e, i) => (
                <TableRow key={i}>
                  {/* OVERRIDE #11: monospace timestamp — no mono text affordance */}
                  <TableCell className="font-mono text-xs">{e.time}</TableCell>
                  <TableCell>{e.type}</TableCell>
                  <TableCell>{e.resource}</TableCell>
                  <TableCell>{e.message}</TableCell>
                  <TableCell>
                    <Badge color={severityColor[e.severity]} variant="soft">
                      {e.severity}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </VStack>
    </ConsoleShell>
  ),
};
