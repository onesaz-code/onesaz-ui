import * as React from 'react'
import { cn } from '../../utils/cn'

export interface TypingIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional label shown next to the dots, e.g. "Assistant is typing". */
  label?: string
}

/** Three bouncing dots shown while the assistant is thinking. */
export const TypingIndicator = React.forwardRef<HTMLDivElement, TypingIndicatorProps>(
  ({ className, label, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center gap-2 text-muted-foreground', className)}
      aria-live="polite"
      {...props}
    >
      <span className="flex gap-1">
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.3s]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.15s]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current" />
      </span>
      {label && <span className="text-xs">{label}</span>}
    </div>
  )
)
TypingIndicator.displayName = 'TypingIndicator'
