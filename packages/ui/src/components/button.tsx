import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '../utils/cn'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap rounded-[var(--radius)] text-sm font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-[var(--accent)] text-[var(--accent-foreground)] hover:bg-[var(--accent-hover)]':
              variant === 'default',
            'bg-[var(--destructive)] text-[var(--destructive-foreground)] hover:bg-[var(--destructive)]/90':
              variant === 'destructive',
            'border border-[var(--input)] bg-[var(--background)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]':
              variant === 'outline',
            'bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--muted)]/80':
              variant === 'secondary',
            'hover:bg-[var(--muted)] hover:text-[var(--foreground)]':
              variant === 'ghost',
            'text-[var(--accent)] underline-offset-4 hover:underline':
              variant === 'link',
          },
          {
            'h-10 px-4 py-2': size === 'default',
            'h-9 rounded-[var(--radius)] px-3': size === 'sm',
            'h-11 rounded-[var(--radius)] px-8': size === 'lg',
            'h-10 w-10': size === 'icon',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button }
