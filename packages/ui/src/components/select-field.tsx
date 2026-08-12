import * as React from 'react'
import { cn } from '../utils/cn'
import { Label } from './label'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './select'

export interface SelectFieldOption {
  value: string
  label: React.ReactNode
}

export interface SelectFieldProps {
  label?: React.ReactNode
  helperText?: React.ReactNode
  errorMessage?: React.ReactNode
  required?: boolean
  placeholder?: string
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  /** Options as data; or pass SelectItem children directly */
  options?: SelectFieldOption[]
  children?: React.ReactNode
  id?: string
  disabled?: boolean
  className?: string
}

/**
 * Select with a label + helper/error, structured **identically to TextField**
 * (grid gap-1.5, text-sm label, text-sm helper) so Select fields line up with
 * TextField fields in the same form row — the alignment gap that forced a
 * hand-built field in the checkout example.
 */
const SelectField = React.forwardRef<HTMLButtonElement, SelectFieldProps>(
  ({ label, helperText, errorMessage, required, placeholder, value, defaultValue, onValueChange, options, children, id: idProp, disabled, className }, ref) => {
    const generatedId = React.useId()
    const id = idProp || generatedId
    const helperId = `${id}-helper`
    const hasError = !!errorMessage

    return (
      <div className={cn('grid w-full gap-1.5', className)}>
        {label && (
          <Label htmlFor={id} className={cn('text-sm font-medium', hasError && 'text-destructive')}>
            {label}
            {required && <span className="ml-0.5 text-destructive" aria-hidden="true">*</span>}
          </Label>
        )}
        <Select value={value} defaultValue={defaultValue} onValueChange={onValueChange} disabled={disabled}>
          <SelectTrigger ref={ref} id={id} aria-describedby={helperText || errorMessage ? helperId : undefined} aria-invalid={hasError}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options
              ? options.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)
              : children}
          </SelectContent>
        </Select>
        {(helperText || errorMessage) && (
          <p id={helperId} className={cn('text-sm', hasError ? 'text-destructive' : 'text-muted-foreground')}>
            {errorMessage || helperText}
          </p>
        )}
      </div>
    )
  }
)
SelectField.displayName = 'SelectField'

export { SelectField }
