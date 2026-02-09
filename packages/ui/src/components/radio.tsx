import * as React from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { cn } from '../utils/cn'

// RadioGroup
export interface RadioGroupProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
  /** Orientation of the radio group */
  orientation?: 'horizontal' | 'vertical'
  /** Size of radio items */
  size?: 'sm' | 'md' | 'lg'
}

const RadioGroupContext = React.createContext<{ size?: 'sm' | 'md' | 'lg' }>({})

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({ className, orientation = 'vertical', size = 'md', ...props }, ref) => {
  return (
    <RadioGroupContext.Provider value={{ size }}>
      <RadioGroupPrimitive.Root
        ref={ref}
        className={cn(
          'grid gap-2',
          orientation === 'horizontal' && 'grid-flow-col auto-cols-max gap-4',
          className
        )}
        {...props}
      />
    </RadioGroupContext.Provider>
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

// RadioGroupItem
export interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  /** Size override for individual item */
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
}

const indicatorSizeClasses = {
  sm: 'h-2 w-2',
  md: 'h-2.5 w-2.5',
  lg: 'h-3 w-3',
}

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, size: sizeProp, ...props }, ref) => {
  const { size: contextSize } = React.useContext(RadioGroupContext)
  const size = sizeProp || contextSize || 'md'

  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        'aspect-square rounded-full',
        'border-2 border-input',
        'ring-offset-background',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'data-[state=checked]:border-accent',
        'transition-colors',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <div
          className={cn(
            'rounded-full bg-accent',
            indicatorSizeClasses[size]
          )}
        />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

// Radio - Convenience component with label
export interface RadioProps extends RadioGroupItemProps {
  /** Label for the radio */
  label?: React.ReactNode
  /** Description text */
  description?: React.ReactNode
  /** ID for accessibility */
  id?: string
}

const Radio = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioProps
>(({ className, label, description, id: idProp, value, size, ...props }, ref) => {
  const generatedId = React.useId()
  const id = idProp || generatedId

  if (!label && !description) {
    return <RadioGroupItem ref={ref} value={value} size={size} {...props} />
  }

  return (
    <div className={cn('flex items-start gap-3', className)}>
      <RadioGroupItem ref={ref} id={id} value={value} size={size} {...props} />
      <div className="grid gap-1">
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-medium leading-none text-foreground cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </label>
        )}
        {description && (
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </div>
  )
})
Radio.displayName = 'Radio'

export { RadioGroup, RadioGroupItem, Radio }
