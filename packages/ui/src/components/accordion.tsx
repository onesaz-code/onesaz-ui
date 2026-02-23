import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { cn } from '../utils/cn'

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      'border border-border rounded-xl overflow-hidden',
      className
    )}
    {...props}
  />
))
AccordionItem.displayName = 'AccordionItem'

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'flex w-full items-center justify-between bg-muted/50 px-4 py-3 text-left text-sm font-medium transition-colors',
        'hover:bg-muted',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'data-[state=open]:bg-muted',
        className
      )}
      {...props}
    >
      <span className="flex-1">{children}</span>
      <svg
        className="ml-2 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 data-[state=open]:rotate-180"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = 'AccordionTrigger'

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      'overflow-hidden text-sm',
      'data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
      className
    )}
    {...props}
  >
    <div className="border-t border-border p-4">{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = 'AccordionContent'

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
