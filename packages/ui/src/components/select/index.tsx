import * as React from 'react'
import { cn } from '../../utils/cn'

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm',
        'ring-offset-background',
        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    >
      {children}
    </select>
  )
)
Select.displayName = 'Select'

export interface SelectOptionProps extends React.OptionHTMLAttributes<HTMLOptionElement> {}

const SelectOption = React.forwardRef<HTMLOptionElement, SelectOptionProps>(
  ({ className, ...props }, ref) => (
    <option ref={ref} className={cn('py-1.5', className)} {...props} />
  )
)
SelectOption.displayName = 'SelectOption'

export interface SelectGroupProps extends React.OptgroupHTMLAttributes<HTMLOptGroupElement> {}

const SelectGroup = React.forwardRef<HTMLOptGroupElement, SelectGroupProps>(
  ({ className, ...props }, ref) => (
    <optgroup ref={ref} className={cn('font-semibold', className)} {...props} />
  )
)
SelectGroup.displayName = 'SelectGroup'

// Compound component pattern
const SelectNamespace = Object.assign(Select, {
  Option: SelectOption,
  Group: SelectGroup,
})

export {
  SelectNamespace as Select,
  SelectOption,
  SelectGroup,
}
