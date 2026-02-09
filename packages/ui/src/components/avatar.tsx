import * as React from 'react'
import { cn } from '../utils/cn'

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Image source URL */
  src?: string
  /** Alt text for the image */
  alt?: string
  /** Size of the avatar */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  /** Fallback text (usually initials) when no image */
  fallback?: string
  /** Shape of the avatar */
  shape?: 'circle' | 'square'
  /** Whether to show a border */
  bordered?: boolean
  /** Custom fallback element */
  fallbackElement?: React.ReactNode
}

const sizeClasses = {
  xs: 'h-6 w-6 text-xs',
  sm: 'h-8 w-8 text-sm',
  md: 'h-10 w-10 text-base',
  lg: 'h-12 w-12 text-lg',
  xl: 'h-16 w-16 text-xl',
  '2xl': 'h-20 w-20 text-2xl',
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt,
      size = 'md',
      fallback,
      shape = 'circle',
      bordered = false,
      fallbackElement,
      className,
      ...props
    },
    ref
  ) => {
    const [imageError, setImageError] = React.useState(false)

    // Reset error state when src changes
    React.useEffect(() => {
      setImageError(false)
    }, [src])

    const showFallback = !src || imageError

    // Generate initials from fallback text
    const getInitials = (text: string) => {
      const words = text.trim().split(' ')
      if (words.length >= 2) {
        return (words[0][0] + words[words.length - 1][0]).toUpperCase()
      }
      return text.slice(0, 2).toUpperCase()
    }

    return (
      <div
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center overflow-hidden bg-muted text-muted-foreground shrink-0',
          sizeClasses[size],
          shape === 'circle' ? 'rounded-full' : 'rounded-md',
          bordered && 'ring-2 ring-background',
          className
        )}
        {...props}
      >
        {!showFallback ? (
          <img
            src={src}
            alt={alt}
            onError={() => setImageError(true)}
            className="h-full w-full object-cover"
          />
        ) : fallbackElement ? (
          fallbackElement
        ) : fallback ? (
          <span className="font-medium">{getInitials(fallback)}</span>
        ) : (
          // Default user icon
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-1/2 w-1/2"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        )}
      </div>
    )
  }
)
Avatar.displayName = 'Avatar'

// Avatar Group for stacking multiple avatars
export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximum number of avatars to show */
  max?: number
  /** Size for all avatars in the group */
  size?: AvatarProps['size']
  /** Children should be Avatar components */
  children: React.ReactNode
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ max, size = 'md', children, className, ...props }, ref) => {
    const childArray = React.Children.toArray(children)
    const visibleChildren = max ? childArray.slice(0, max) : childArray
    const remainingCount = max ? childArray.length - max : 0

    return (
      <div
        ref={ref}
        className={cn('flex -space-x-2', className)}
        {...props}
      >
        {visibleChildren.map((child, index) => {
          if (React.isValidElement<AvatarProps>(child)) {
            return React.cloneElement(child, {
              key: index,
              size: child.props.size || size,
              bordered: true,
              className: cn('ring-2 ring-background', child.props.className),
            })
          }
          return child
        })}
        {remainingCount > 0 && (
          <Avatar
            size={size}
            bordered
            fallback={`+${remainingCount}`}
            className="bg-muted"
          />
        )}
      </div>
    )
  }
)
AvatarGroup.displayName = 'AvatarGroup'

export { Avatar, AvatarGroup }
