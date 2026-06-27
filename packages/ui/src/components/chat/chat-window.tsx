import * as React from 'react'
import { cn } from '../../utils/cn'
import { Composer } from './composer'
import { MessageList } from './message-list'
import { useChat } from './use-chat'
import type {
  ChatActionsProp,
  ChatMessage,
  ChatStatus,
  ChatTransport,
  MessagePart,
  RenderCode,
  RenderMarkdown,
  RenderPart,
} from './types'

// ============================================================================
// ChatWindow
// ----------------------------------------------------------------------------
// Two ways to drive it:
//
//  1. Connected (simplest): pass `transport`. The window owns conversation
//     state internally via useChat.
//        <ChatWindow transport={send} />
//
//  2. Controlled: pass `messages` + `onSendMessage` (+ `status`, `onStop`).
//     You own the state — useful when chat state lives in your app/store.
//        <ChatWindow messages={msgs} status={status} onSendMessage={...} />
// ============================================================================

interface ChatWindowCommonProps {
  /** Custom per-message action buttons (copy, retry, +your own). */
  actions?: ChatActionsProp
  hideAvatar?: boolean
  showTimestamp?: boolean
  placeholder?: string
  /** Shown when there are no messages. */
  emptyState?: React.ReactNode
  /** Header slot (title bar). */
  header?: React.ReactNode
  /** Left slot inside the composer (e.g. an attach button). */
  composerStart?: React.ReactNode
  typingLabel?: string
  /** Plug in full markdown (react-markdown) instead of the built-in renderer. */
  renderMarkdown?: RenderMarkdown
  /** Plug in syntax-highlighted code (prism, shiki, …). */
  renderCode?: RenderCode
  /** Render any message part yourself. */
  renderPart?: RenderPart
  className?: string
  /** Height of the whole widget. Defaults to filling its parent (h-full). */
  height?: number | string
}

interface ConnectedProps extends ChatWindowCommonProps {
  /** The function that talks to your backend/agent. */
  transport: ChatTransport
  initialMessages?: ChatMessage[]
  onError?: (error: unknown) => void
  onFinish?: (message: ChatMessage) => void
  // Controlled props are disallowed in connected mode.
  messages?: never
  status?: never
  onSendMessage?: never
  onStop?: never
}

interface ControlledProps extends ChatWindowCommonProps {
  messages: ChatMessage[]
  status?: ChatStatus
  onSendMessage: (message: string | { parts: MessagePart[] }) => void
  onStop?: () => void
  transport?: never
}

export type ChatWindowProps = ConnectedProps | ControlledProps

export const ChatWindow = React.forwardRef<HTMLDivElement, ChatWindowProps>(
  (props, ref) => {
    const isConnected = 'transport' in props && props.transport != null

    // Connected mode owns its own state. The hook is always called (rules of
    // hooks); in controlled mode we simply ignore its output.
    const chat = useChat({
      transport: isConnected ? (props as ConnectedProps).transport : (() => ''),
      initialMessages: isConnected ? (props as ConnectedProps).initialMessages : undefined,
      onError: isConnected ? (props as ConnectedProps).onError : undefined,
      onFinish: isConnected ? (props as ConnectedProps).onFinish : undefined,
    })

    // Controlled mode keeps its own input state locally.
    const [controlledInput, setControlledInput] = React.useState('')

    const {
      actions,
      hideAvatar,
      showTimestamp,
      placeholder,
      emptyState,
      header,
      composerStart,
      typingLabel,
      renderMarkdown,
      renderCode,
      renderPart,
      className,
      height = '100%',
    } = props

    const messages = isConnected ? chat.messages : (props as ControlledProps).messages
    const status: ChatStatus = isConnected
      ? chat.status
      : ((props as ControlledProps).status ?? 'idle')
    const input = isConnected ? chat.input : controlledInput
    const setInput = isConnected ? chat.setInput : setControlledInput
    const isStreaming = status === 'submitted' || status === 'streaming'

    const handleSend = () => {
      const text = input.trim()
      if (!text) return
      if (isConnected) {
        void chat.sendMessage()
      } else {
        ;(props as ControlledProps).onSendMessage(text)
        setControlledInput('')
      }
    }

    const handleStop = () => {
      if (isConnected) chat.stop()
      else (props as ControlledProps).onStop?.()
    }

    return (
      <div
        ref={ref}
        style={{ height }}
        className={cn(
          'flex flex-col overflow-hidden rounded-xl border border-border bg-background',
          className
        )}
      >
        {header && (
          <div className="shrink-0 border-b border-border px-4 py-3">{header}</div>
        )}

        <MessageList
          messages={messages}
          status={status}
          actions={actions}
          hideAvatar={hideAvatar}
          showTimestamp={showTimestamp}
          emptyState={emptyState}
          typingLabel={typingLabel}
          renderMarkdown={renderMarkdown}
          renderCode={renderCode}
          renderPart={renderPart}
        />

        <div className="shrink-0 border-t border-border p-3">
          <Composer
            value={input}
            onChange={setInput}
            onSend={handleSend}
            onStop={handleStop}
            isStreaming={isStreaming}
            placeholder={placeholder}
            startAdornment={composerStart}
          />
        </div>
      </div>
    )
  }
)
ChatWindow.displayName = 'ChatWindow'
