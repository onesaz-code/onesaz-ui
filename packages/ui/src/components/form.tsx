import * as React from 'react'
import { cn } from '../utils/cn'

// Form Context
interface FormControlContextValue {
  id?: string
  error?: boolean
  disabled?: boolean
  required?: boolean
}

const FormControlContext = React.createContext<FormControlContextValue>({})

export function useFormControl() {
  return React.useContext(FormControlContext)
}

// FormControl
export interface FormControlProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Error state */
  error?: boolean
  /** Disabled state */
  disabled?: boolean
  /** Required state */
  required?: boolean
  /** Full width mode */
  fullWidth?: boolean
  /** Margin */
  margin?: 'none' | 'dense' | 'normal'
  /** Orientation */
  orientation?: 'vertical' | 'horizontal'
}

const marginClasses = {
  none: '',
  dense: 'my-1',
  normal: 'my-2',
}

const FormControl = React.forwardRef<HTMLDivElement, FormControlProps>(
  (
    {
      className,
      children,
      error,
      disabled,
      required,
      fullWidth,
      margin = 'none',
      orientation = 'vertical',
      ...props
    },
    ref
  ) => {
    const id = React.useId()

    return (
      <FormControlContext.Provider value={{ id, error, disabled, required }}>
        <div
          ref={ref}
          className={cn(
            'inline-flex',
            orientation === 'vertical' ? 'flex-col gap-1.5' : 'flex-row items-center gap-3',
            fullWidth && 'w-full',
            marginClasses[margin],
            disabled && 'opacity-50 cursor-not-allowed',
            className
          )}
          {...props}
        >
          {children}
        </div>
      </FormControlContext.Provider>
    )
  }
)
FormControl.displayName = 'FormControl'

// FormLabel
export interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** Error state (auto-inherited from FormControl) */
  error?: boolean
  /** Disabled state (auto-inherited from FormControl) */
  disabled?: boolean
  /** Required indicator */
  required?: boolean
}

const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className, children, error: errorProp, disabled: disabledProp, required: requiredProp, htmlFor, ...props }, ref) => {
    const context = useFormControl()
    const error = errorProp ?? context.error
    const disabled = disabledProp ?? context.disabled
    const required = requiredProp ?? context.required
    const id = htmlFor ?? context.id

    return (
      <label
        ref={ref}
        htmlFor={id}
        className={cn(
          'text-sm font-medium leading-none',
          'text-foreground',
          error && 'text-destructive',
          disabled && 'cursor-not-allowed opacity-70',
          className
        )}
        {...props}
      >
        {children}
        {required && (
          <span className="text-destructive ml-0.5" aria-hidden="true">
            *
          </span>
        )}
      </label>
    )
  }
)
FormLabel.displayName = 'FormLabel'

// FormHelperText
export interface FormHelperTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /** Error state (auto-inherited from FormControl) */
  error?: boolean
  /** Disabled state (auto-inherited from FormControl) */
  disabled?: boolean
}

const FormHelperText = React.forwardRef<HTMLParagraphElement, FormHelperTextProps>(
  ({ className, children, error: errorProp, disabled: disabledProp, id, ...props }, ref) => {
    const context = useFormControl()
    const error = errorProp ?? context.error
    const disabled = disabledProp ?? context.disabled
    const helperId = id ?? (context.id ? `${context.id}-helper` : undefined)

    return (
      <p
        ref={ref}
        id={helperId}
        className={cn(
          'text-sm',
          error
            ? 'text-destructive'
            : 'text-muted-foreground',
          disabled && 'opacity-70',
          className
        )}
        {...props}
      >
        {children}
      </p>
    )
  }
)
FormHelperText.displayName = 'FormHelperText'

// FormGroup - for grouping checkboxes/radios
export interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Group orientation */
  row?: boolean
}

const FormGroup = React.forwardRef<HTMLDivElement, FormGroupProps>(
  ({ className, row, ...props }, ref) => (
    <div
      ref={ref}
      role="group"
      className={cn(
        'flex',
        row ? 'flex-row flex-wrap gap-4' : 'flex-col gap-2',
        className
      )}
      {...props}
    />
  )
)
FormGroup.displayName = 'FormGroup'

export { FormControl, FormLabel, FormHelperText, FormGroup }
