import * as React from 'react'
import { cn } from '../../utils/cn'
import { Avatar } from '../avatar'
import { MessageContent } from './message-content'
import type {
  ChatAction,
  ChatActionsProp,
  ChatMessage,
  RenderCode,
  RenderMarkdown,
  RenderPart,
} from './types'

function resolveActions(
  actions: ChatActionsProp | undefined,
  message: ChatMessage
): ChatAction[] {
  if (!actions) return []
  const list = typeof actions === 'function' ? actions(message) : actions
  return list.filter((a) => (a.show ? a.show(message) : true))
}

export interface MessageBubbleProps {
  message: ChatMessage
  /** Custom action buttons (copy, retry, +your own). */
  actions?: ChatActionsProp
  /** Element rendered as the avatar for this message (overrides defaults). */
  avatar?: React.ReactNode
  /** Hide avatars entirely. */
  hideAvatar?: boolean
  /** Show the timestamp under the bubble. */
  showTimestamp?: boolean
  renderMarkdown?: RenderMarkdown
  renderCode?: RenderCode
  renderPart?: RenderPart
  className?: string
}

function defaultAvatar(message: ChatMessage): React.ReactNode {
  if (message.role === 'assistant')
    return <Avatar size="sm" fallback="AI" />
  if (message.role === 'user')
    return <Avatar size="sm" fallback="You" />
  return null
}

export const MessageBubble = React.forwardRef<HTMLDivElement, MessageBubbleProps>(
  (
    {
      message,
      actions,
      avatar,
      hideAvatar = false,
      showTimestamp = false,
      renderMarkdown,
      renderCode,
      renderPart,
      className,
    },
    ref
  ) => {
    const isUser = message.role === 'user'
    const isSystem = message.role === 'system'
    const resolvedActions = resolveActions(actions, message)

    // System messages render centered and muted.
    if (isSystem) {
      return (
        <div ref={ref} className={cn('my-2 flex justify-center', className)}>
          <div className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
            <MessageContent message={message} renderMarkdown={renderMarkdown} renderCode={renderCode} renderPart={renderPart} />
          </div>
        </div>
      )
    }

    const avatarNode = hideAvatar ? null : (avatar ?? defaultAvatar(message))

    return (
      <div
        ref={ref}
        className={cn(
          'group flex gap-3',
          isUser ? 'flex-row-reverse' : 'flex-row',
          className
        )}
      >
        {avatarNode && <div className="shrink-0 pt-0.5">{avatarNode}</div>}

        <div className={cn('flex min-w-0 max-w-[80%] flex-col', isUser ? 'items-end' : 'items-start')}>
          <div
            className={cn(
              'rounded-2xl px-4 py-2.5',
              isUser
                ? 'rounded-tr-sm bg-accent text-accent-foreground'
                : 'rounded-tl-sm border border-neutral-200 bg-white text-neutral-900 shadow-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100'
            )}
          >
            <MessageContent
              message={message}
              renderMarkdown={renderMarkdown}
              renderCode={renderCode}
              renderPart={renderPart}
            />
          </div>

          {/* Footer: timestamp + actions */}
          {(showTimestamp || resolvedActions.length > 0) && (
            <div
              className={cn(
                'mt-1 flex items-center gap-1',
                isUser ? 'flex-row-reverse' : 'flex-row'
              )}
            >
              {showTimestamp && message.createdAt && (
                <span className="px-1 text-[11px] text-muted-foreground">
                  {new Date(message.createdAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              )}
              {resolvedActions.length > 0 && (
                <div className="flex items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
                  {resolvedActions.map((action) => (
                    <button
                      key={action.id}
                      type="button"
                      title={action.label}
                      aria-label={action.label}
                      disabled={action.disabled?.(message)}
                      onClick={() => action.onClick(message)}
                      className="inline-flex h-7 items-center gap-1 rounded-md px-2 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
                    >
                      {action.icon && <span className="h-3.5 w-3.5 shrink-0">{action.icon}</span>}
                      {action.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }
)
MessageBubble.displayName = 'MessageBubble'
