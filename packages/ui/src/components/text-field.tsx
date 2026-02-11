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
  size?: 'sm' | 'md' | 'lg' | 'small' | 'medium'
  /** Full width mode */
  fullWidth?: boolean
  /** Start adornment (icon, text, etc.) */
  startAdornment?: React.ReactNode
  /** End adornment (icon, text, etc.) */
  endAdornment?: React.ReactNode
  /** Input element props (MUI-compatible) */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
  /** Input container/slot props (MUI-compatible) */
  InputProps?: {
    startAdornment?: React.ReactNode
    endAdornment?: React.ReactNode
    className?: string
    containerClassName?: string
  }
  /** Input label props (MUI-compatible) */
  InputLabelProps?: React.LabelHTMLAttributes<HTMLLabelElement>
  /** Input ref (MUI-compatible) */
  inputRef?: React.Ref<HTMLInputElement>
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
      inputProps,
      InputProps,
      InputLabelProps,
      inputRef,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId()
    const id = idProp || generatedId
    const helperId = `${id}-helper`
    const hasError = error || !!errorMessage
    const mergedRef = (node: HTMLInputElement | null) => {
      if (typeof ref === 'function') ref(node)
      else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node
      if (typeof inputRef === 'function') inputRef(node)
      else if (inputRef) (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = node
    }

    const { className: inputPropsClassName, ...restInputProps } = inputProps ?? {}
    const {
      className: inputSlotClassName,
      containerClassName,
      startAdornment: inputSlotStart,
      endAdornment: inputSlotEnd,
      ...restInputSlotProps
    } = InputProps ?? {}
    const resolvedStartAdornment = inputSlotStart ? (
      <>
        {inputSlotStart}
        {startAdornment}
      </>
    ) : (
      startAdornment
    )
    const resolvedEndAdornment = inputSlotEnd ? (
      <>
        {endAdornment}
        {inputSlotEnd}
      </>
    ) : (
      endAdornment
    )

    const resolvedSize =
      size === 'small' ? 'sm' : size === 'medium' ? 'md' : size

    return (
      <div className={cn('grid gap-1.5', fullWidth && 'w-full', className)}>
        {label && (
          <Label
            htmlFor={id}
            className={cn(
              'text-sm font-medium',
              hasError && 'text-destructive'
            )}
            {...InputLabelProps}
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
          ref={mergedRef}
          id={id}
          inputSize={resolvedSize}
          error={hasError}
          startAdornment={resolvedStartAdornment}
          endAdornment={resolvedEndAdornment}
          aria-describedby={helperText || errorMessage ? helperId : undefined}
          aria-invalid={hasError}
          className={cn(inputSlotClassName, inputPropsClassName)}
          containerClassName={containerClassName}
          {...props}
          {...restInputSlotProps}
          {...restInputProps}
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
