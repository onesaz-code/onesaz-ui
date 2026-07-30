import * as React from 'react'
import { cn } from '../utils/cn'

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="w-full rounded-lg border border-border bg-card overflow-hidden">
    <div className="relative w-full overflow-auto">
      <table
        ref={ref}
        className={cn('w-full caption-bottom text-sm', className)}
        {...props}
      />
    </div>
  </div>
))
Table.displayName = 'Table'

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn('[&_tr]:border-b', className)} {...props} />
))
TableHeader.displayName = 'TableHeader'

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn('[&_tr:last-child]:border-0', className)}
    {...props}
  />
))
TableBody.displayName = 'TableBody'

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      'border-t bg-muted/50 font-medium [&>tr]:last:border-b-0',
      className
    )}
    {...props}
  />
))
TableFooter.displayName = 'TableFooter'

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      'border-b border-border/60 transition-colors',
      'hover:bg-muted/50',
      'data-[state=selected]:bg-muted',
      className
    )}
    {...props}
  />
))
TableRow.displayName = 'TableRow'

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      'h-10 px-4 text-left align-middle text-xs font-semibold uppercase tracking-wide text-muted-foreground',
      '[&:has([role=checkbox])]:pr-0',
      className
    )}
    {...props}
  />
))
TableHead.displayName = 'TableHead'

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      // tabular-nums keeps digits fixed-width so numeric columns don't jitter;
      // it only affects digits, so text cells are unaffected. Inherits to
      // TableCell.Primary / TableCell.Meta children.
      'p-4 align-middle tabular-nums [&:has([role=checkbox])]:pr-0',
      className
    )}
    {...props}
  />
))
TableCell.displayName = 'TableCell'

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn('mt-4 text-sm text-muted-foreground', className)}
    {...props}
  />
))
TableCaption.displayName = 'TableCaption'

/** Bold primary line for a two-line table cell, e.g. a person's name. */
const TableCellPrimary = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm font-semibold text-foreground', className)}
    {...props}
  />
))
TableCellPrimary.displayName = 'TableCellPrimary'

/** Muted secondary line for a two-line table cell, e.g. an id or role. */
const TableCellMeta = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-xs text-muted-foreground mt-0.5', className)}
    {...props}
  />
))
TableCellMeta.displayName = 'TableCellMeta'

// Compound component pattern
const TableNamespace = Object.assign(Table, {
  Header: TableHeader,
  Body: TableBody,
  Footer: TableFooter,
  Row: TableRow,
  Head: TableHead,
  Cell: Object.assign(TableCell, {
    Primary: TableCellPrimary,
    Meta: TableCellMeta,
  }),
  Caption: TableCaption,
})

export {
  TableNamespace as Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCellPrimary,
  TableCellMeta,
  TableCaption,
}
