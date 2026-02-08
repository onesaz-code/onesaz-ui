import * as React from 'react'
import { cn } from '../utils/cn'

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, ...props }, ref) => (
    <label className={cn('relative inline-flex items-center cursor-pointer', className)}>
      <input
        type="checkbox"
        ref={ref}
        className="sr-only peer"
        {...props}
      />
      <div
        className={cn(
          'w-11 h-6 rounded-full transition-colors',
          'bg-input peer-checked:bg-accent',
          'peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background',
          'peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
          'after:content-[""] after:absolute after:top-[2px] after:left-[2px]',
          'after:bg-background after:rounded-full after:h-5 after:w-5',
          'after:transition-transform after:shadow-lg',
          'peer-checked:after:translate-x-5'
        )}
      />
    </label>
  )
)
Switch.displayName = 'Switch'

export { Switch }
