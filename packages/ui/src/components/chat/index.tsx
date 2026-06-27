// Chat / AI Agent UI
// Backend-agnostic: your app supplies a `transport` (or controls state directly).
// The UI never makes a network call itself.

export { ChatWindow, type ChatWindowProps } from './chat-window'
export { MessageList, type MessageListProps } from './message-list'
export { MessageBubble, type MessageBubbleProps } from './message-bubble'
export { MessageContent, type MessageContentProps } from './message-content'
export { Composer, type ComposerProps } from './composer'
export { TypingIndicator, type TypingIndicatorProps } from './typing-indicator'
export { useChat, type UseChatOptions, type UseChatHelpers } from './use-chat'

export type {
  ChatRole,
  ChatStatus,
  ChatMessageStatus,
  ChatMessage,
  MessagePart,
  TextPart,
  CodePart,
  ToolCallPart,
  AttachmentPart,
  CustomPart,
  ChatAction,
  ChatActionsProp,
  ChatTransport,
  ChatTransportArgs,
  SendResult,
  RenderMarkdown,
  RenderCode,
  RenderPart,
} from './types'
