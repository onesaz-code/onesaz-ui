import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cn } from '../utils/cn'

// Root
const Tabs = TabsPrimitive.Root

// ============================================================================
// Default (pill) variant
// ============================================================================

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'inline-flex h-10 items-center justify-center rounded-md p-1',
      'bg-muted text-muted-foreground',
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all',
      'ring-offset-background',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      'data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-2',
      'ring-offset-background',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

// ============================================================================
// Underline variant (GitHub-style)
// ============================================================================

const UnderlineTabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'inline-flex items-center gap-0 border-b border-border',
      className
    )}
    {...props}
  />
))
UnderlineTabsList.displayName = 'UnderlineTabsList'

export interface UnderlineTabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  /** Optional count badge displayed next to the label */
  count?: number
}

const UnderlineTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  UnderlineTabsTriggerProps
>(({ className, children, count, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'inline-flex items-center gap-2 whitespace-nowrap px-4 py-2 text-sm font-medium transition-colors',
      'border-b-2 border-transparent -mb-px',
      'text-muted-foreground',
      'hover:text-foreground hover:border-border',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      'data-[state=active]:text-foreground data-[state=active]:border-accent',
      className
    )}
    {...props}
  >
    {children}
    {count !== undefined && (
      <span
        className={cn(
          'inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-medium min-w-[1.25rem]',
          'bg-muted text-muted-foreground'
        )}
      >
        {count}
      </span>
    )}
  </TabsPrimitive.Trigger>
))
UnderlineTabsTrigger.displayName = 'UnderlineTabsTrigger'

const UnderlineTabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'pt-4',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className
    )}
    {...props}
  />
))
UnderlineTabsContent.displayName = 'UnderlineTabsContent'

// ============================================================================
// Vertical variant (GitHub Settings sidebar)
// ============================================================================

const VerticalTabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Root
    ref={ref}
    orientation="vertical"
    className={cn('flex gap-8', className)}
    {...props}
  />
))
VerticalTabs.displayName = 'VerticalTabs'

const VerticalTabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn('flex flex-col gap-0.5 w-[220px] shrink-0', className)}
    {...props}
  />
))
VerticalTabsList.displayName = 'VerticalTabsList'

export interface VerticalTabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  /** Icon element rendered before the label */
  icon?: React.ReactNode
}

const VerticalTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  VerticalTabsTriggerProps
>(({ className, children, icon, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'flex items-center gap-3 rounded-md px-3 py-1.5 text-sm transition-colors text-left w-full',
      'text-muted-foreground',
      'border-l-2 border-transparent -ml-px',
      'hover:bg-muted hover:text-foreground',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
      'disabled:pointer-events-none disabled:opacity-50',
      'data-[state=active]:text-foreground data-[state=active]:font-medium data-[state=active]:bg-muted data-[state=active]:border-l-2 data-[state=active]:border-accent',
      className
    )}
    {...props}
  >
    {icon && <span className="size-4 shrink-0 [&>svg]:size-4">{icon}</span>}
    {children}
  </TabsPrimitive.Trigger>
))
VerticalTabsTrigger.displayName = 'VerticalTabsTrigger'

const VerticalTabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'flex-1 min-w-0',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className
    )}
    {...props}
  />
))
VerticalTabsContent.displayName = 'VerticalTabsContent'

/** Non-interactive section label for grouping vertical tabs */
export interface VerticalTabsGroupLabelProps extends React.HTMLAttributes<HTMLDivElement> {}

const VerticalTabsGroupLabel = React.forwardRef<HTMLDivElement, VerticalTabsGroupLabelProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'px-3 pt-4 pb-1 text-xs font-semibold text-muted-foreground first:pt-0',
        className
      )}
      {...props}
    />
  )
)
VerticalTabsGroupLabel.displayName = 'VerticalTabsGroupLabel'

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  UnderlineTabsList,
  UnderlineTabsTrigger,
  UnderlineTabsContent,
  VerticalTabs,
  VerticalTabsList,
  VerticalTabsTrigger,
  VerticalTabsContent,
  VerticalTabsGroupLabel,
}
