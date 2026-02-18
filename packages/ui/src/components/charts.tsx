import * as React from 'react'
import {
  BarChart as RechartsBarChart,
  Bar,
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  AreaChart as RechartsAreaChart,
  Area,
  ScatterChart as RechartsScatterChart,
  Scatter,
  RadarChart as RechartsRadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from 'recharts'
import { cn } from '../utils/cn'
import { useTheme } from '../theme/use-theme'
import { accentColors } from '@onesaz/tokens'

// ============================================================================
// Bar Chart
// ============================================================================

// ============================================================================
// Bar Chart
// ============================================================================

export interface BarChartProps {
  /** Chart data */
  data: any[]
  /** Data key for the bars */
  dataKey: string
  /** Multiple data keys for grouped bars */
  dataKeys?: Array<{
    dataKey: string
    fill?: string
    name?: string
  }>
  /** Fill color for single bar */
  fill?: string
  /** Bar name for legend */
  name?: string
  /** Width of the chart */
  width?: number | string
  /** Height of the chart */
  height?: number | string
  /** Margin around the chart */
  margin?: {
    top?: number
    right?: number
    bottom?: number
    left?: number
  }
  /** Show grid lines */
  showGrid?: boolean
  /** Show tooltip */
  showTooltip?: boolean
  /** Show legend */
  showLegend?: boolean
  /** X-axis configuration */
  xAxis?: {
    dataKey?: string
    type?: 'number' | 'category'
    hide?: boolean
    label?: string
    angle?: number
    textAnchor?: 'start' | 'middle' | 'end'
    height?: number
    interval?: number | 'preserveStartEnd' | 'preserveStart' | 'preserveEnd'
    tick?: {
      fontSize?: number
      fontWeight?: string | number
      fill?: string
    }
  }
  /** Y-axis configuration */
  yAxis?: {
    type?: 'number' | 'category'
    hide?: boolean
    label?: string
    angle?: number
    position?: 'insideLeft' | 'insideRight' | 'left' | 'right'
    tick?: {
      fontSize?: number
      fontWeight?: string | number
      fill?: string
    }
  }
  /** Bar styling */
  barProps?: {
    radius?: number | [number, number, number, number]
    maxBarSize?: number
    minPointSize?: number
    barCategoryGap?: number | string
    barGap?: number | string
  }
  /** Label list configuration */
  labelList?: {
    dataKey?: string
    position?: 'top' | 'bottom' | 'left' | 'right' | 'center' | 'inside' | 'outside'
    style?: React.CSSProperties
    formatter?: (value: any, entry: any, index: number) => React.ReactNode
  }
  /** Custom colors array */
  colors?: string[]
  /** Tooltip configuration */
  tooltip?: {
    formatter?: (value: any, name: string, props: any) => [React.ReactNode, string]
    labelFormatter?: (label: any, payload: any[]) => React.ReactNode
    labelStyle?: React.CSSProperties
    contentStyle?: React.CSSProperties
  }
  /** Additional CSS classes */
  className?: string
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  dataKey,
  dataKeys,
  fill,
  name,
  width = '100%',
  height = 300,
  margin = { top: 20, right: 30, left: 20, bottom: 5 },
  showGrid = true,
  showTooltip = true,
  showLegend = false,
  xAxis,
  yAxis,
  barProps = {},
  labelList,
  colors,
  tooltip,
  className,
}) => {
  const { accentColor } = useTheme()

  // Default colors using theme
  const defaultColors = [
    accentColors[accentColor as keyof typeof accentColors][6],
    accentColors[accentColor as keyof typeof accentColors][7],
    accentColors[accentColor as keyof typeof accentColors][8],
    accentColors[accentColor as keyof typeof accentColors][9],
    accentColors[accentColor as keyof typeof accentColors][10],
    accentColors[accentColor as keyof typeof accentColors][11],
    accentColors[accentColor as keyof typeof accentColors][12],
    accentColors[accentColor as keyof typeof accentColors][1],
  ]

  const chartColors = colors || defaultColors

  const bars = dataKeys ? (
    dataKeys.map((keyConfig, index) => (
      <Bar
        key={keyConfig.dataKey}
        dataKey={keyConfig.dataKey}
        fill={keyConfig.fill || chartColors[index % chartColors.length]}
        name={keyConfig.name || keyConfig.dataKey}
        radius={barProps.radius}
        maxBarSize={barProps.maxBarSize}
        minPointSize={barProps.minPointSize}
      >
        {labelList && (
          <LabelList
            dataKey={labelList.dataKey || keyConfig.dataKey}
            position={labelList.position || 'top'}
            style={labelList.style}
            formatter={labelList.formatter}
          />
        )}
      </Bar>
    ))
  ) : (
    <Bar
      dataKey={dataKey}
      fill={fill || chartColors[0]}
      name={name || dataKey}
      radius={barProps.radius}
      maxBarSize={barProps.maxBarSize}
      minPointSize={barProps.minPointSize}
    >
      {labelList && (
        <LabelList
          dataKey={labelList.dataKey || dataKey}
          position={labelList.position || 'top'}
          style={labelList.style}
          formatter={labelList.formatter}
        />
      )}
      {data.map((_entry, index) => (
        <Cell
          key={`cell-${index}`}
          fill={chartColors[index % chartColors.length]}
        />
      ))}
    </Bar>
  )

  const customTooltip = tooltip ? (
    <Tooltip
      formatter={tooltip.formatter}
      labelFormatter={tooltip.labelFormatter}
      labelStyle={tooltip.labelStyle}
      contentStyle={tooltip.contentStyle}
    />
  ) : showTooltip ? (
    <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: '6px', color: 'hsl(var(--foreground))' }} />
  ) : null

  return (
    <div className={cn('w-full', className)}>
      <ResponsiveContainer width={width} height={height}>
        <RechartsBarChart
          data={data}
          margin={margin}
          barCategoryGap={barProps.barCategoryGap}
          barGap={barProps.barGap}
        >
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground))" opacity={0.3} />}
          {xAxis && !xAxis.hide && (
            <XAxis
              dataKey={xAxis.dataKey}
              type={xAxis.type}
              angle={xAxis.angle}
              textAnchor={xAxis.textAnchor}
              height={xAxis.height}
              interval={xAxis.interval}
              className="text-xs"
              tick={xAxis.tick || { fontSize: 12 }}
              label={xAxis.label ? { value: xAxis.label, position: 'insideBottom', offset: -5 } : undefined}
            />
          )}
          {yAxis && !yAxis.hide && (
            <YAxis
              type={yAxis.type}
              orientation={yAxis.position === 'right' ? 'right' : 'left'}
              className="text-xs"
              tick={yAxis.tick || { fontSize: 12 }}
              label={yAxis.label ? { value: yAxis.label, angle: -90, position: yAxis.position || 'insideLeft' } : undefined}
            />
          )}
          {customTooltip}
          {showLegend && <Legend />}
          {bars}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  )
}

// ============================================================================
// Line Chart
// ============================================================================

export interface LineChartProps {
  /** Chart data */
  data: any[]
  /** Data key for the line */
  dataKey: string
  /** Multiple data keys for multiple lines */
  dataKeys?: Array<{
    dataKey: string
    stroke?: string
    name?: string
  }>
  /** Stroke color for single line */
  stroke?: string
  /** Line name for legend */
  name?: string
  /** Width of the chart */
  width?: number | string
  /** Height of the chart */
  height?: number | string
  /** Margin around the chart */
  margin?: {
    top?: number
    right?: number
    bottom?: number
    left?: number
  }
  /** Show grid lines */
  showGrid?: boolean
  /** Show tooltip */
  showTooltip?: boolean
  /** Show legend */
  showLegend?: boolean
  /** X-axis configuration */
  xAxis?: {
    dataKey?: string
    type?: 'number' | 'category'
    hide?: boolean
    label?: string
  }
  /** Y-axis configuration */
  yAxis?: {
    type?: 'number' | 'category'
    hide?: boolean
    label?: string
  }
  /** Additional CSS classes */
  className?: string
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  dataKey,
  dataKeys,
  stroke,
  name,
  width = '100%',
  height = 300,
  margin = { top: 20, right: 30, left: 20, bottom: 5 },
  showGrid = true,
  showTooltip = true,
  showLegend = false,
  xAxis,
  yAxis,
  className,
}) => {
  const { accentColor } = useTheme()

  // Default colors using theme
  const defaultColors = [
    accentColors[accentColor as keyof typeof accentColors][6],
    accentColors[accentColor as keyof typeof accentColors][7],
    accentColors[accentColor as keyof typeof accentColors][8],
    accentColors[accentColor as keyof typeof accentColors][9],
    accentColors[accentColor as keyof typeof accentColors][10],
    accentColors[accentColor as keyof typeof accentColors][11],
    accentColors[accentColor as keyof typeof accentColors][12],
    accentColors[accentColor as keyof typeof accentColors][1],
  ]

  const lines = dataKeys ? (
    dataKeys.map((keyConfig, index) => (
      <Line
        key={keyConfig.dataKey}
        type="monotone"
        dataKey={keyConfig.dataKey}
        stroke={keyConfig.stroke || defaultColors[index % defaultColors.length]}
        strokeWidth={2}
        name={keyConfig.name || keyConfig.dataKey}
      />
    ))
  ) : (
    <Line
      type="monotone"
      dataKey={dataKey}
      stroke={stroke || defaultColors[0]}
      strokeWidth={2}
      name={name || dataKey}
    />
  )

  return (
    <div className={cn('w-full', className)}>
      <ResponsiveContainer width={width} height={height}>
        <RechartsLineChart data={data} margin={margin}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground))" opacity={0.3} />}
          {xAxis && !xAxis.hide && (
            <XAxis
              dataKey={xAxis.dataKey}
              type={xAxis.type}
              className="text-xs"
              tick={{ fontSize: 12 }}
              label={xAxis.label ? { value: xAxis.label, position: 'insideBottom', offset: -5 } : undefined}
            />
          )}
          {yAxis && !yAxis.hide && (
            <YAxis
              type={yAxis.type}
              className="text-xs"
              tick={{ fontSize: 12 }}
              label={yAxis.label ? { value: yAxis.label, angle: -90, position: 'insideLeft' } : undefined}
            />
          )}
          {showTooltip && <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: '6px', color: 'hsl(var(--foreground))' }} />}
          {showLegend && <Legend />}
          {lines}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  )
}

// ============================================================================
// Pie Chart
// ============================================================================

export interface PieChartProps {
  /** Chart data */
  data: any[]
  /** Data key for the pie slices */
  dataKey: string
  /** Name key for labels */
  nameKey?: string
  /** Colors for pie slices */
  colors?: string[]
  /** Inner radius for donut effect (set to create donut chart) */
  innerRadius?: number
  /** Outer radius */
  outerRadius?: number
  /** Center coordinates */
  cx?: number | string
  cy?: number | string
  /** Width of the chart */
  width?: number | string
  /** Height of the chart */
  height?: number | string
  /** Show tooltip */
  showTooltip?: boolean
  /** Show legend */
  showLegend?: boolean
  /** Additional CSS classes */
  className?: string
}

export const PieChart: React.FC<PieChartProps> = ({
  data,
  dataKey,
  nameKey,
  colors,
  innerRadius,
  outerRadius,
  cx = '50%',
  cy = '50%',
  width = '100%',
  height = 300,
  showTooltip = true,
  showLegend = false,
  className,
}) => {
  const { accentColor } = useTheme()

  // Default colors using theme
  const defaultColors = [
    accentColors[accentColor as keyof typeof accentColors][6],
    accentColors[accentColor as keyof typeof accentColors][7],
    accentColors[accentColor as keyof typeof accentColors][8],
    accentColors[accentColor as keyof typeof accentColors][9],
    accentColors[accentColor as keyof typeof accentColors][10],
    accentColors[accentColor as keyof typeof accentColors][11],
    accentColors[accentColor as keyof typeof accentColors][12],
    accentColors[accentColor as keyof typeof accentColors][1],
  ]

  const chartColors = colors || defaultColors
  return (
    <div className={cn('w-full', className)}>
      <ResponsiveContainer width={width} height={height}>
        <RechartsPieChart>
          <Pie
            data={data}
            cx={cx}
            cy={cy}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            fill="#8884d8"
            dataKey={dataKey}
            nameKey={nameKey}
          >
            {data.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
            ))}
          </Pie>
          {showTooltip && <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: '6px', color: 'hsl(var(--foreground))' }} />}
          {showLegend && <Legend />}
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  )
}

// ============================================================================
// Area Chart
// ============================================================================

export interface AreaChartProps {
  /** Chart data */
  data: any[]
  /** Data key for the area */
  dataKey: string
  /** Multiple data keys for stacked areas */
  dataKeys?: Array<{
    dataKey: string
    fill?: string
    stroke?: string
    name?: string
  }>
  /** Fill color for single area */
  fill?: string
  /** Stroke color for single area */
  stroke?: string
  /** Area name for legend */
  name?: string
  /** Width of the chart */
  width?: number | string
  /** Height of the chart */
  height?: number | string
  /** Margin around the chart */
  margin?: {
    top?: number
    right?: number
    bottom?: number
    left?: number
  }
  /** Show grid lines */
  showGrid?: boolean
  /** Show tooltip */
  showTooltip?: boolean
  /** Show legend */
  showLegend?: boolean
  /** Stack areas on top of each other */
  stack?: boolean
  /** X-axis configuration */
  xAxis?: {
    dataKey?: string
    type?: 'number' | 'category'
    hide?: boolean
    label?: string
  }
  /** Y-axis configuration */
  yAxis?: {
    type?: 'number' | 'category'
    hide?: boolean
    label?: string
  }
  /** Additional CSS classes */
  className?: string
}

export const AreaChart: React.FC<AreaChartProps> = ({
  data,
  dataKey,
  dataKeys,
  fill,
  stroke,
  name,
  width = '100%',
  height = 300,
  margin = { top: 20, right: 30, left: 20, bottom: 5 },
  showGrid = true,
  showTooltip = true,
  showLegend = false,
  stack = false,
  xAxis,
  yAxis,
  className,
}) => {
  const { accentColor } = useTheme()

  // Default colors using theme
  const defaultColors = [
    accentColors[accentColor as keyof typeof accentColors][6],
    accentColors[accentColor as keyof typeof accentColors][7],
    accentColors[accentColor as keyof typeof accentColors][8],
    accentColors[accentColor as keyof typeof accentColors][9],
    accentColors[accentColor as keyof typeof accentColors][10],
    accentColors[accentColor as keyof typeof accentColors][11],
    accentColors[accentColor as keyof typeof accentColors][12],
    accentColors[accentColor as keyof typeof accentColors][1],
  ]

  const areas = dataKeys ? (
    dataKeys.map((keyConfig, index) => (
      <Area
        key={keyConfig.dataKey}
        type="monotone"
        dataKey={keyConfig.dataKey}
        stackId={stack ? '1' : undefined}
        stroke={keyConfig.stroke || defaultColors[index % defaultColors.length]}
        fill={keyConfig.fill || defaultColors[index % defaultColors.length]}
        name={keyConfig.name || keyConfig.dataKey}
      />
    ))
  ) : (
    <Area
      type="monotone"
      dataKey={dataKey}
      stroke={stroke || defaultColors[0]}
      fill={fill || defaultColors[0]}
      name={name || dataKey}
    />
  )

  return (
    <div className={cn('w-full', className)}>
      <ResponsiveContainer width={width} height={height}>
        <RechartsAreaChart data={data} margin={margin}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground))" opacity={0.3} />}
          {xAxis && !xAxis.hide && (
            <XAxis
              dataKey={xAxis.dataKey}
              type={xAxis.type}
              className="text-xs"
              tick={{ fontSize: 12 }}
              label={xAxis.label ? { value: xAxis.label, position: 'insideBottom', offset: -5 } : undefined}
            />
          )}
          {yAxis && !yAxis.hide && (
            <YAxis
              type={yAxis.type}
              className="text-xs"
              tick={{ fontSize: 12 }}
              label={yAxis.label ? { value: yAxis.label, angle: -90, position: 'insideLeft' } : undefined}
            />
          )}
          {showTooltip && <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: '6px', color: 'hsl(var(--foreground))' }} />}
          {showLegend && <Legend />}
          {areas}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  )
}

// ============================================================================
// Scatter Chart
// ============================================================================

export interface ScatterChartProps {
  /** Chart data */
  data: any[]
  /** X-axis data key */
  xDataKey: string
  /** Y-axis data key */
  yDataKey: string
  /** Fill color for points */
  fill?: string
  /** Point name for legend */
  name?: string
  /** Width of the chart */
  width?: number | string
  /** Height of the chart */
  height?: number | string
  /** Margin around the chart */
  margin?: {
    top?: number
    right?: number
    bottom?: number
    left?: number
  }
  /** Show grid lines */
  showGrid?: boolean
  /** Show tooltip */
  showTooltip?: boolean
  /** Show legend */
  showLegend?: boolean
  /** X-axis configuration */
  xAxis?: {
    type?: 'number' | 'category'
    hide?: boolean
    label?: string
  }
  /** Y-axis configuration */
  yAxis?: {
    type?: 'number' | 'category'
    hide?: boolean
    label?: string
  }
  /** Additional CSS classes */
  className?: string
}

export const ScatterChart: React.FC<ScatterChartProps> = ({
  data,
  xDataKey,
  yDataKey,
  fill,
  name = 'Point',
  width = '100%',
  height = 300,
  margin = { top: 20, right: 30, left: 20, bottom: 5 },
  showGrid = true,
  showTooltip = true,
  showLegend = false,
  xAxis,
  yAxis,
  className,
}) => {
  const { accentColor } = useTheme()

  return (
    <div className={cn('w-full', className)}>
      <ResponsiveContainer width={width} height={height}>
        <RechartsScatterChart data={data} margin={margin}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground))" opacity={0.3} />}
          {xAxis && !xAxis.hide && (
            <XAxis
              dataKey={xDataKey}
              type={xAxis.type}
              className="text-xs"
              tick={{ fontSize: 12 }}
              label={xAxis.label ? { value: xAxis.label, position: 'insideBottom', offset: -5 } : undefined}
            />
          )}
          {yAxis && !yAxis.hide && (
            <YAxis
              dataKey={yDataKey}
              type={yAxis.type}
              className="text-xs"
              tick={{ fontSize: 12 }}
              label={yAxis.label ? { value: yAxis.label, angle: -90, position: 'insideLeft' } : undefined}
            />
          )}
          {showTooltip && <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: '6px', color: 'hsl(var(--foreground))' }} />}
          {showLegend && <Legend />}
          <Scatter name={name} dataKey={yDataKey} fill={fill || accentColors[accentColor as keyof typeof accentColors][6]} />
        </RechartsScatterChart>
      </ResponsiveContainer>
    </div>
  )
}

// ============================================================================
// Radar Chart
// ============================================================================

export interface RadarChartProps {
  /** Chart data */
  data: any[]
  /** Data key for the radar values */
  dataKey: string
  /** Name key for labels */
  nameKey: string
  /** Fill color */
  fill?: string
  /** Stroke color */
  stroke?: string
  /** Radar name for legend */
  name?: string
  /** Width of the chart */
  width?: number | string
  /** Height of the chart */
  height?: number | string
  /** Show tooltip */
  showTooltip?: boolean
  /** Show legend */
  showLegend?: boolean
  /** Additional CSS classes */
  className?: string
}

export const RadarChart: React.FC<RadarChartProps> = ({
  data,
  dataKey,
  nameKey,
  fill,
  stroke,
  name,
  width = '100%',
  height = 300,
  showTooltip = true,
  showLegend = false,
  className,
}) => {
  const { accentColor } = useTheme()

  return (
    <div className={cn('w-full', className)}>
      <ResponsiveContainer width={width} height={height}>
        <RechartsRadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey={nameKey} />
          <PolarRadiusAxis />
          <Radar
            name={name || dataKey}
            dataKey={dataKey}
            stroke={stroke || accentColors[accentColor as keyof typeof accentColors][6]}
            fill={fill || accentColors[accentColor as keyof typeof accentColors][6]}
            fillOpacity={0.6}
          />
          {showTooltip && <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: '6px', color: 'hsl(var(--foreground))' }} />}
          {showLegend && <Legend />}
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  )
}

// ============================================================================
// Donut Chart
// ============================================================================

// ============================================================================
// Donut Chart
// ============================================================================

export interface DonutChartProps {
  /** Chart data */
  data: any[]
  /** Data key for the donut slices */
  dataKey: string
  /** Name key for labels */
  nameKey?: string
  /** Colors for donut slices */
  colors?: string[]
  /** Inner radius */
  innerRadius?: number
  /** Outer radius */
  outerRadius?: number
  /** Center coordinates */
  cx?: number | string
  cy?: number | string
  /** Width of the chart */
  width?: number | string
  /** Height of the chart */
  height?: number | string
  /** Show tooltip */
  showTooltip?: boolean
  /** Show legend */
  showLegend?: boolean
  /** Advanced styling options */
  advancedStyling?: {
    /** Enable gradient effects */
    enableGradients?: boolean
    /** Enable shadow effects */
    enableShadows?: boolean
    /** Custom gradient definitions */
    gradients?: Array<{
      id: string
      colors: [string, string]
      x1?: string
      y1?: string
      x2?: string
      y2?: string
    }>
    /** Background circle styling */
    backgroundCircle?: {
      stroke?: string
      strokeWidth?: number
      filter?: string
    }
    /** Progress arc styling */
    progressArc?: {
      strokeLinecap?: 'butt' | 'round' | 'square'
      filter?: string
    }
  }
  /** Tooltip configuration */
  tooltip?: {
    formatter?: (value: any, name: string, props: any) => [React.ReactNode, string]
    labelFormatter?: (label: any, payload: any[]) => React.ReactNode
    labelStyle?: React.CSSProperties
    contentStyle?: React.CSSProperties
  }
  /** Additional CSS classes */
  className?: string
}

export const DonutChart: React.FC<DonutChartProps> = ({
  data,
  dataKey,
  nameKey,
  colors,
  innerRadius = 60,
  outerRadius,
  cx = '50%',
  cy = '50%',
  width = '100%',
  height = 300,
  showTooltip = true,
  showLegend = false,
  advancedStyling,
  tooltip,
  className,
}) => {
  const { accentColor } = useTheme()

  // Default colors using theme
  const defaultColors = [
    accentColors[accentColor as keyof typeof accentColors][6],
    accentColors[accentColor as keyof typeof accentColors][7],
    accentColors[accentColor as keyof typeof accentColors][8],
    accentColors[accentColor as keyof typeof accentColors][9],
    accentColors[accentColor as keyof typeof accentColors][10],
    accentColors[accentColor as keyof typeof accentColors][11],
    accentColors[accentColor as keyof typeof accentColors][12],
    accentColors[accentColor as keyof typeof accentColors][1],
  ]

  const chartColors = colors || defaultColors

  // Default advanced styling
  const defaultAdvancedStyling = {
    enableGradients: false,
    enableShadows: false,
    gradients: [],
    backgroundCircle: {
      stroke: 'hsl(var(--border))',
      strokeWidth: 14,
      filter: 'url(#deepInsetShadow)',
    },
    progressArc: {
      strokeLinecap: 'round' as const,
      filter: 'url(#dropShadow)',
    },
  }

  const styling = { ...defaultAdvancedStyling, ...advancedStyling }

  // Generate gradient IDs if gradients are enabled
  const gradientDefs = styling.enableGradients ? (
    <defs>
      {/* Deep inset shadow for the background circle */}
      {styling.enableShadows && (
        <filter
          id="deepInsetShadow"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feOffset dx="0" dy="2" />
          <feGaussianBlur stdDeviation="2" result="offsetBlur" />
          <feComposite
            in="SourceAlpha"
            in2="offsetBlur"
            operator="out"
            result="innerShadow"
          />
          <feFlood floodColor="hsl(var(--muted))" floodOpacity="0.9" result="color" />
          <feComposite
            in="color"
            in2="innerShadow"
            operator="in"
            result="shadow"
          />
          <feComposite
            in="shadow"
            in2="SourceGraphic"
            operator="over"
          />
        </filter>
      )}

      {/* Drop shadow for the colored progress arc */}
      {styling.enableShadows && (
        <filter
          id="dropShadow"
          x="-10%"
          y="-10%"
          width="120%"
          height="120%"
        >
          <feDropShadow
            dx="0"
            dy="1"
            stdDeviation="1"
            floodColor="hsl(var(--muted-foreground))"
            floodOpacity="0.5"
          />
        </filter>
      )}

      {/* Custom gradients */}
      {styling.gradients?.map((gradient) => (
        <linearGradient
          key={gradient.id}
          id={gradient.id}
          x1={gradient.x1 || "0%"}
          y1={gradient.y1 || "0%"}
          x2={gradient.x2 || "100%"}
          y2={gradient.y2 || "100%"}
        >
          <stop offset="0%" stopColor={gradient.colors[0]} />
          <stop offset="100%" stopColor={gradient.colors[1]} />
        </linearGradient>
      ))}
    </defs>
  ) : null

  const customTooltip = tooltip ? (
    <Tooltip
      formatter={tooltip.formatter}
      labelFormatter={tooltip.labelFormatter}
      labelStyle={tooltip.labelStyle}
      contentStyle={tooltip.contentStyle}
    />
  ) : showTooltip ? (
    <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: '6px', color: 'hsl(var(--foreground))' }} />
  ) : null

  return (
    <div className={cn('w-full', className)}>
      <ResponsiveContainer width={width} height={height}>
        <RechartsPieChart>
          {gradientDefs}
          <Pie
            data={data}
            cx={cx}
            cy={cy}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            fill="#8884d8"
            dataKey={dataKey}
            nameKey={nameKey}
            strokeLinecap={styling.progressArc.strokeLinecap}
            filter={styling.progressArc.filter}
          >
            {data.map((_entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={chartColors[index % chartColors.length]}
              />
            ))}
          </Pie>
          {customTooltip}
          {showLegend && <Legend />}
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  )
}

// ============================================================================
// Progress Card (Individual Progress Indicator)
// ============================================================================

export interface ProgressCardProps {
  /** Question number or identifier */
  questionNum: string | number
  /** Percentage value (0-100) */
  percentage: number
  /** Optional click handler */
  onClick?: (questionNum: string | number) => void
  /** Size of the donut chart */
  donutSize?: number
  /** Stroke width for the progress arc */
  strokeWidth?: number
  /** Background stroke color */
  backgroundColor?: string
  /** Custom color logic based on percentage */
  getColor?: (percentage: number) => [string, string]
  /** Enable shadows */
  enableShadows?: boolean
  /** Enable gradients */
  enableGradients?: boolean
  /** Typography options */
  typography?: {
    questionFontSize?: string
    percentageFontSize?: string
    questionColor?: string
    percentageColorAuto?: boolean
  }
  /** Additional CSS classes */
  className?: string
}

export const ProgressCard: React.FC<ProgressCardProps> = ({
  questionNum,
  percentage,
  onClick,
  donutSize = 50,
  strokeWidth = 7,
  backgroundColor = '#E0E4E8',
  getColor,
  enableShadows = true,
  enableGradients = true,
  typography = {
    questionFontSize: 'text-sm',
    percentageFontSize: 'text-base',
    questionColor: 'text-gray-700 dark:text-gray-300',
    percentageColorAuto: true,
  },
  className,
}) => {
  // Default color logic matching your example
  const defaultGetColor = (percentage: number): [string, string] => {
    if (percentage <= 30) {
      return ['rgb(132, 249, 169)', '#46AB87'] // Green for success
    } else if (percentage <= 50) {
      return ['#3366cc', '#0066cc'] // Blue for info  
    } else {
      return ['#ff3300', '#cc3300'] // Red for error
    }
  }

  const colorFn = getColor || defaultGetColor
  const normalizedPercentage = Math.min(100, Math.max(0, percentage))
  const gradientId = `progress-gradient-${Math.random().toString(36).substr(2, 9)}`
  const shadowId = `progress-shadow-${Math.random().toString(36).substr(2, 9)}`
  const bgShadowId = `progress-bg-shadow-${Math.random().toString(36).substr(2, 9)}`
  const [startColor, endColor] = colorFn(normalizedPercentage)

  // Get percentage text color if auto-coloring is enabled
  const percentageTextColor = typography.percentageColorAuto
    ? normalizedPercentage <= 30
      ? 'text-green-600'
      : normalizedPercentage <= 50
      ? 'text-blue-600'
      : 'text-red-600'
    : 'text-gray-900 dark:text-gray-100'

  return (
    <div
      className={cn(
        'flex items-center justify-between p-3',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={() => onClick?.(questionNum)}
    >
      {/* Left side: Question Number and Percentage */}
      <div className="flex flex-col items-center">
        <span className={cn('font-bold', typography.questionFontSize, typography.questionColor)}>
          {questionNum}
        </span>
        <span className={cn('font-bold', typography.percentageFontSize, percentageTextColor)}>
          {normalizedPercentage.toFixed(1)}%
        </span>
      </div>

      {/* Right side: Donut Chart */}
      <div className="flex items-center" style={{ width: `${donutSize + 10}px`, height: `${donutSize + 10}px` }}>
        <svg width={donutSize + 10} height={donutSize + 10} viewBox="0 0 100 100">
          <defs>
            {enableGradients && (
              <linearGradient
                id={gradientId}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor={startColor} />
                <stop offset="100%" stopColor={endColor} />
              </linearGradient>
            )}

            {enableShadows && (
              <>
                {/* Deep inset shadow for background circle */}
                <filter
                  id={bgShadowId}
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <feOffset dx="0" dy="2" />
                  <feGaussianBlur stdDeviation="2" result="offsetBlur" />
                  <feComposite
                    in="SourceAlpha"
                    in2="offsetBlur"
                    operator="out"
                    result="innerShadow"
                  />
                  <feFlood floodColor="#c0c0c0" floodOpacity="0.9" result="color" />
                  <feComposite
                    in="color"
                    in2="innerShadow"
                    operator="in"
                    result="shadow"
                  />
                  <feComposite
                    in="shadow"
                    in2="SourceGraphic"
                    operator="over"
                  />
                </filter>

                {/* Drop shadow for progress arc */}
                <filter
                  id={shadowId}
                  x="-10%"
                  y="-10%"
                  width="120%"
                  height="120%"
                >
                  <feDropShadow
                    dx="0"
                    dy="1"
                    stdDeviation="1"
                    floodColor="#bbb"
                    floodOpacity="0.5"
                  />
                </filter>
              </>
            )}
          </defs>

          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            stroke={backgroundColor}
            strokeWidth={strokeWidth * 2}
            filter={enableShadows ? `url(#${bgShadowId})` : undefined}
          />

          {/* Progress arc */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            stroke={enableGradients ? `url(#${gradientId})` : startColor}
            strokeWidth={strokeWidth * 2}
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 40}`}
            strokeDashoffset={`${2 * Math.PI * 40 * (1 - normalizedPercentage / 100)}`}
            transform="rotate(-90 50 50)"
            filter={enableShadows ? `url(#${shadowId})` : undefined}
          />
        </svg>
      </div>
    </div>
  )
}

// ============================================================================
// Progress Donut (Single Donut with Multiple Segments)
// ============================================================================

export interface ProgressDonutProps {
  /** Array of data items with value and label */
  data?: Array<{
    value: number
    label?: string
    [key: string]: any
  }>
  /** Width of the chart */
  width?: number | string
  /** Height of the chart */
  height?: number | string
  /** Inner radius for donut effect */
  innerRadius?: number
  /** Outer radius */
  outerRadius?: number
  /** Show tooltip */
  showTooltip?: boolean
  /** Show legend */
  showLegend?: boolean
  /** Custom color logic based on value */
  getColor?: (value: number) => string
  /** Additional CSS classes */
  className?: string
}

export const ProgressDonut: React.FC<ProgressDonutProps> = ({
  data = [],
  width = 300,
  height = 300,
  innerRadius = 60,
  outerRadius = 80,
  showTooltip = true,
  showLegend = false,
  getColor,
  className,
}) => {
  const { accentColor } = useTheme()

  // Default color logic based on percentage
  const defaultGetColor = (percentage: number): string => {
    if (percentage <= 30) {
      return '#22c55e' // Green for success
    } else if (percentage <= 50) {
      return '#3b82f6' // Blue for info
    } else {
      return '#ef4444' // Red for error
    }
  }

  const colorFn = getColor || defaultGetColor

  // Default colors using theme
  const defaultColors = [
    accentColors[accentColor as keyof typeof accentColors][6],
    accentColors[accentColor as keyof typeof accentColors][7],
    accentColors[accentColor as keyof typeof accentColors][8],
    accentColors[accentColor as keyof typeof accentColors][9],
    accentColors[accentColor as keyof typeof accentColors][10],
    accentColors[accentColor as keyof typeof accentColors][11],
    accentColors[accentColor as keyof typeof accentColors][12],
    accentColors[accentColor as keyof typeof accentColors][1],
  ]

  // If no data provided, return empty
  if (!data || data.length === 0) {
    return <div className={cn('text-gray-500', className)}>No data provided</div>
  }

  return (
    <div className={cn('w-full', className)}>
      <ResponsiveContainer width={width} height={height}>
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            fill="#8884d8"
            dataKey="value"
            nameKey="label"
          >
            {data.map((_entry, index) => {
              const percentage = Math.min(100, Math.max(0, _entry.value))
              const fillColor = colorFn(percentage) || defaultColors[index % defaultColors.length]
              return <Cell key={`cell-${index}`} fill={fillColor} />
            })}
          </Pie>
          {showTooltip && <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: '6px', color: 'hsl(var(--foreground))' }} />}
          {showLegend && <Legend />}
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  )
}

// ============================================================================
// Multi Progress Donut (Multiple Separate Donut Charts)
// ============================================================================

export interface MultiProgressDonutProps {
  /** Array of data items with value and label */
  data?: Array<{
    value: number
    label?: string
    [key: string]: any
  }>
  /** Size of each donut chart */
  size?: number
  /** Outer radius */
  outerRadius?: number
  /** Stroke width for the progress arc */
  strokeWidth?: number
  /** Background stroke color */
  backgroundColor?: string
  /** Background stroke width */
  backgroundStrokeWidth?: number
  /** Show percentage text in center */
  showPercentage?: boolean
  /** Custom color logic based on value */
  getColor?: (value: number) => [string, string]
  /** Enable shadows */
  enableShadows?: boolean
  /** Enable gradients */
  enableGradients?: boolean
  /** Additional CSS classes */
  className?: string
}

export const MultiProgressDonut: React.FC<MultiProgressDonutProps> = ({
  data = [],
  size = 80,
  outerRadius = 35,
  strokeWidth = 8,
  backgroundColor = '#E0E4E8',
  backgroundStrokeWidth = 8,
  showPercentage = true,
  getColor,
  enableShadows = true,
  enableGradients = true,
  className,
}) => {
  // Default color logic based on percentage
  const defaultGetColor = (percentage: number): [string, string] => {
    if (percentage <= 30) {
      return ['#22c55e', '#16a34a'] // Green for success
    } else if (percentage <= 50) {
      return ['#3b82f6', '#2563eb'] // Blue for info
    } else {
      return ['#ef4444', '#dc2626'] // Red for error
    }
  }

  const colorFn = getColor || defaultGetColor

  // If no data provided, return empty
  if (!data || data.length === 0) {
    return <div className={cn('text-gray-500', className)}>No data provided</div>
  }

  return (
    <div className={cn('flex flex-wrap gap-4', className)}>
      {data.map((item, index) => {
        const percentage = Math.min(100, Math.max(0, item.value))
        const gradientId = `progress-gradient-${index}`
        const shadowId = `progress-shadow-${index}`
        const bgShadowId = `progress-bg-shadow-${index}`
        const [startColor, endColor] = colorFn(percentage)

        return (
          <div key={index} className="flex flex-col items-center gap-2">
            {item.label && (
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {item.label}
              </div>
            )}
            <div className="relative">
              <svg width={size} height={size} viewBox="0 0 100 100">
                <defs>
                  {enableGradients && (
                    <linearGradient
                      id={gradientId}
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor={startColor} />
                      <stop offset="100%" stopColor={endColor} />
                    </linearGradient>
                  )}

                  {enableShadows && (
                    <>
                      {/* Deep inset shadow for background circle */}
                      <filter
                        id={bgShadowId}
                        x="-50%"
                        y="-50%"
                        width="200%"
                        height="200%"
                      >
                        <feOffset dx="0" dy="2" />
                        <feGaussianBlur stdDeviation="2" result="offsetBlur" />
                        <feComposite
                          in="SourceAlpha"
                          in2="offsetBlur"
                          operator="out"
                          result="innerShadow"
                        />
                        <feFlood floodColor="#c0c0c0" floodOpacity="0.9" result="color" />
                        <feComposite
                          in="color"
                          in2="innerShadow"
                          operator="in"
                          result="shadow"
                        />
                        <feComposite
                          in="shadow"
                          in2="SourceGraphic"
                          operator="over"
                        />
                      </filter>

                      {/* Drop shadow for progress arc */}
                      <filter
                        id={shadowId}
                        x="-10%"
                        y="-10%"
                        width="120%"
                        height="120%"
                      >
                        <feDropShadow
                          dx="0"
                          dy="1"
                          stdDeviation="1"
                          floodColor="#bbb"
                          floodOpacity="0.5"
                        />
                      </filter>
                    </>
                  )}
                </defs>

                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r={outerRadius}
                  fill="transparent"
                  stroke={backgroundColor}
                  strokeWidth={backgroundStrokeWidth}
                  filter={enableShadows ? `url(#${bgShadowId})` : undefined}
                />

                {/* Progress arc */}
                <circle
                  cx="50"
                  cy="50"
                  r={outerRadius}
                  fill="transparent"
                  stroke={enableGradients ? `url(#${gradientId})` : startColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * outerRadius}`}
                  strokeDashoffset={`${2 * Math.PI * outerRadius * (1 - percentage / 100)}`}
                  transform="rotate(-90 50 50)"
                  filter={enableShadows ? `url(#${shadowId})` : undefined}
                />
              </svg>

              {showPercentage && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                    {percentage.toFixed(1)}%
                  </span>
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}