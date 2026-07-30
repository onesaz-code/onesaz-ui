import * as React from 'react'
import { cn } from '../utils/cn'

export interface Step {
  label: React.ReactNode
  description?: React.ReactNode
}

export interface StepperProps extends React.HTMLAttributes<HTMLOListElement> {
  steps: Step[]
  /** Index of the current (active) step */
  active: number
  /** Orientation */
  orientation?: 'horizontal' | 'vertical'
}

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

/**
 * A step indicator for multi-step flows (checkout, onboarding, wizards).
 * Steps before `active` are complete (filled + check), `active` is highlighted,
 * later steps are muted.
 */
const Stepper = React.forwardRef<HTMLOListElement, StepperProps>(
  ({ className, steps, active, orientation = 'horizontal', ...props }, ref) => {
    const horizontal = orientation === 'horizontal'
    return (
      <ol
        ref={ref}
        className={cn(horizontal ? 'flex items-center' : 'flex flex-col', className)}
        {...props}
      >
        {steps.map((step, i) => {
          const state = i < active ? 'complete' : i === active ? 'active' : 'upcoming'
          const isLast = i === steps.length - 1
          return (
            <li
              key={i}
              aria-current={state === 'active' ? 'step' : undefined}
              className={cn(
                'flex',
                horizontal ? 'flex-1 items-center last:flex-none' : 'items-start gap-3 pb-6 last:pb-0'
              )}
            >
              <div className={cn('flex items-center gap-2', !horizontal && 'flex-col')}>
                <span
                  className={cn(
                    'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-semibold',
                    state === 'complete' && 'border-accent bg-accent text-accent-foreground',
                    state === 'active' && 'border-accent text-accent',
                    state === 'upcoming' && 'border-border text-muted-foreground'
                  )}
                >
                  {state === 'complete' ? <CheckIcon /> : i + 1}
                </span>
                <div className={cn(horizontal ? 'hidden sm:block' : '')}>
                  <div className={cn('text-sm font-medium', state === 'upcoming' ? 'text-muted-foreground' : 'text-foreground')}>
                    {step.label}
                  </div>
                  {step.description && <div className="text-xs text-muted-foreground">{step.description}</div>}
                </div>
              </div>
              {/* connector */}
              {!isLast && (
                <span
                  aria-hidden="true"
                  className={cn(
                    horizontal ? 'mx-3 h-px flex-1' : 'ml-3 mt-1 w-px flex-1 self-stretch',
                    i < active ? 'bg-accent' : 'bg-border'
                  )}
                />
              )}
            </li>
          )
        })}
      </ol>
    )
  }
)
Stepper.displayName = 'Stepper'

export { Stepper }
