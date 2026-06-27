import * as React from 'react'
import { cn } from '../../utils/cn'
import { MessageBubble } from './message-bubble'
import { TypingIndicator } from './typing-indicator'
import type {
  ChatActionsProp,
  ChatMessage,
  ChatStatus,
  RenderCode,
  RenderMarkdown,
  RenderPart,
} from './types'

export interface MessageListProps {
  messages: ChatMessage[]
  status?: ChatStatus
  actions?: ChatActionsProp
  hideAvatar?: boolean
  showTimestamp?: boolean
  /** Rendered when there are no messages yet. */
  emptyState?: React.ReactNode
  /** Label for the typing indicator. */
  typingLabel?: string
  renderMarkdown?: RenderMarkdown
  renderCode?: RenderCode
  renderPart?: RenderPart
  className?: string
}

/** Returns true when the scroll position is near the bottom. */
function isNearBottom(el: HTMLElement, threshold = 80): boolean {
  return el.scrollHeight - el.scrollTop - el.clientHeight < threshold
}

/**
 * Scrollable message list with "sticky bottom" behavior: it follows new content
 * while you're at the bottom, but won't yank you down if you've scrolled up to
 * read history.
 */
export const MessageList = React.forwardRef<HTMLDivElement, MessageListProps>(
  (
    {
      messages,
      status = 'idle',
      actions,
      hideAvatar,
      showTimestamp,
      emptyState,
      typingLabel,
      renderMarkdown,
      renderCode,
      renderPart,
      className,
    },
    ref
  ) => {
    const scrollRef = React.useRef<HTMLDivElement | null>(null)
    const stickRef = React.useRef(true)

    const setRefs = (node: HTMLDivElement | null) => {
      scrollRef.current = node
      if (typeof ref === 'function') ref(node)
      else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
    }

    const onScroll = () => {
      const el = scrollRef.current
      if (el) stickRef.current = isNearBottom(el)
    }

    // Follow new content only when the user is already at the bottom.
    const lastMessage = messages[messages.length - 1]
    const lastLen =
      lastMessage?.content?.length ??
      lastMessage?.parts?.reduce((n, p) => n + (p.type === 'text' ? p.text.length : 1), 0) ??
      0

    React.useLayoutEffect(() => {
      const el = scrollRef.current
      if (el && stickRef.current) el.scrollTop = el.scrollHeight
    }, [messages.length, lastLen, status])

    const showTyping = status === 'submitted'

    return (
      <div
        ref={setRefs}
        onScroll={onScroll}
        className={cn('flex-1 space-y-4 overflow-y-auto bg-neutral-50 p-4 dark:bg-neutral-900', className)}
      >
        {messages.length === 0 && emptyState ? (
          <div className="flex h-full items-center justify-center">{emptyState}</div>
        ) : (
          messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              actions={actions}
              hideAvatar={hideAvatar}
              showTimestamp={showTimestamp}
              renderMarkdown={renderMarkdown}
              renderCode={renderCode}
              renderPart={renderPart}
            />
          ))
        )}
        {showTyping && (
          <div className="px-1">
            <TypingIndicator label={typingLabel} />
          </div>
        )}
      </div>
    )
  }
)
MessageList.displayName = 'MessageList'
