import * as React from 'react'
import { cn } from '../utils/cn'
import { Input, type InputProps } from './input'
import { Label } from './label'

export interface TextFieldProps extends Omit<InputProps, 'inputSize' | 'size'> {
  /** Label text */
  label?: React.ReactNode
  /** Helper text shown below input */
  helperText?: React.ReactNode
  /** Error message (also sets error state) */
  errorMessage?: React.ReactNode
  /** Required indicator */
  required?: boolean
  /** Size of the text field */
  size?: 'sm' | 'md' | 'lg'
  /** Full width mode */
  fullWidth?: boolean
  /** Start adornment (icon, text, etc.) */
  startAdornment?: React.ReactNode
  /** End adornment (icon, text, etc.) */
  endAdornment?: React.ReactNode
}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      className,
      label,
      helperText,
      errorMessage,
      required,
      size = 'md',
      fullWidth,
      id: idProp,
      error,
      startAdornment,
      endAdornment,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId()
    const id = idProp || generatedId
    const helperId = `${id}-helper`
    const hasError = error || !!errorMessage

    return (
      <div className={cn('grid gap-1.5', fullWidth && 'w-full', className)}>
        {label && (
          <Label
            htmlFor={id}
            className={cn(
              'text-sm font-medium',
              hasError && 'text-destructive'
            )}
          >
            {label}
            {required && (
              <span className="text-destructive ml-0.5" aria-hidden="true">
                *
              </span>
            )}
          </Label>
        )}
        <Input
          ref={ref}
          id={id}
          inputSize={size}
          error={hasError}
          startAdornment={startAdornment}
          endAdornment={endAdornment}
          aria-describedby={helperText || errorMessage ? helperId : undefined}
          aria-invalid={hasError}
          {...props}
        />
        {(helperText || errorMessage) && (
          <p
            id={helperId}
            className={cn(
              'text-sm',
              hasError
                ? 'text-destructive'
                : 'text-muted-foreground'
            )}
          >
            {errorMessage || helperText}
          </p>
        )}
      </div>
    )
  }
)
TextField.displayName = 'TextField'

export { TextField }
