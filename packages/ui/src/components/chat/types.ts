import * as React from 'react'

// ============================================================================
// Roles & status
// ============================================================================

export type ChatRole = 'user' | 'assistant' | 'system'

/** Lifecycle status of the whole conversation (driven by the hook). */
export type ChatStatus = 'idle' | 'submitted' | 'streaming' | 'error'

/** Per-message status — useful while a single assistant turn streams in. */
export type ChatMessageStatus = 'pending' | 'streaming' | 'complete' | 'error'

// ============================================================================
// Message parts — the rich, extensible content model
// ============================================================================

export interface TextPart {
  type: 'text'
  text: string
}

export interface CodePart {
  type: 'code'
  code: string
  language?: string
}

export interface ToolCallPart {
  type: 'tool-call'
  /** Name of the tool/function the agent invoked. */
  name: string
  /** Optional human-friendly label shown in the UI (defaults to `name`). */
  label?: string
  status?: 'pending' | 'success' | 'error'
  /** Arguments the tool was called with. */
  input?: unknown
  /** Result returned by the tool. */
  output?: unknown
}

export interface AttachmentPart {
  type: 'attachment'
  name: string
  url?: string
  mimeType?: string
  /** Size in bytes. */
  size?: number
}

/**
 * Escape hatch for app-specific content. Render it via `renderPart` on
 * <ChatWindow> / <MessageContent>. The shape is entirely yours.
 */
export interface CustomPart {
  type: 'custom'
  /** Discriminator you choose, e.g. 'chart' | 'product-card'. */
  kind: string
  data?: unknown
}

export type MessagePart =
  | TextPart
  | CodePart
  | ToolCallPart
  | AttachmentPart
  | CustomPart

// ============================================================================
// Message
// ============================================================================

export interface ChatMessage {
  id: string
  role: ChatRole
  /**
   * Rich content. When omitted, `content` is used as a single text part.
   * When both are present, `parts` wins.
   */
  parts?: MessagePart[]
  /** Convenience shortcut for a plain-text message. */
  content?: string
  /** Epoch milliseconds. */
  createdAt?: number
  status?: ChatMessageStatus
  /** Free-form, app-owned data (e.g. citations, ratings). */
  metadata?: Record<string, unknown>
}

// ============================================================================
// Actions — custom buttons rendered per message (copy, retry, +yours)
// ============================================================================

export interface ChatAction {
  /** Stable key for the action. */
  id: string
  label: string
  icon?: React.ReactNode
  onClick: (message: ChatMessage) => void
  /** Return false to hide this action for a given message. */
  show?: (message: ChatMessage) => boolean
  /** Disable without hiding. */
  disabled?: (message: ChatMessage) => boolean
}

/** Actions may be a static list or derived per message. */
export type ChatActionsProp =
  | ChatAction[]
  | ((message: ChatMessage) => ChatAction[])

// ============================================================================
// Transport — YOUR app supplies this. The UI never calls a network itself.
// ============================================================================

export interface ChatTransportArgs {
  /** Full conversation so far, including the just-added user message. */
  messages: ChatMessage[]
  /** Aborts when the user presses Stop or the component unmounts. */
  signal: AbortSignal
}

/**
 * What a transport may return. All four shapes are supported so you can start
 * with plain request/response and upgrade to streaming without touching the UI:
 *
 *  - `string`                      → a complete plain-text reply
 *  - `MessagePart[]`               → a complete rich reply
 *  - `AsyncIterable<string>`       → streamed text tokens (appended)
 *  - `AsyncIterable<MessagePart>`  → streamed rich parts (appended / merged)
 */
export type SendResult =
  | string
  | MessagePart[]
  | AsyncIterable<string>
  | AsyncIterable<MessagePart>

/**
 * The single function that connects the UI to your backend/agent. Implement it
 * with fetch, SSE, a websocket, an AI SDK, or a mock — the UI doesn't care.
 */
export type ChatTransport = (
  args: ChatTransportArgs
) => SendResult | Promise<SendResult>

// ============================================================================
// Render slots — keep the UI dependency-free; plug in heavy renderers per app
// ============================================================================

/** Render a markdown/text string. Default renderer is a tiny built-in. */
export type RenderMarkdown = (text: string) => React.ReactNode

/** Render a code block. Default is a styled <pre> with a copy button. */
export type RenderCode = (part: CodePart) => React.ReactNode

/** Render any part yourself; return null/undefined to fall back to defaults. */
export type RenderPart = (
  part: MessagePart,
  message: ChatMessage
) => React.ReactNode | null | undefined
