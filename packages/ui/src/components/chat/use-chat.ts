import * as React from 'react'
import type {
  ChatMessage,
  ChatStatus,
  ChatTransport,
  MessagePart,
  SendResult,
} from './types'

// ============================================================================
// Helpers
// ============================================================================

let idCounter = 0
function defaultGenerateId(): string {
  idCounter += 1
  return `msg_${Date.now().toString(36)}_${idCounter}`
}

function isAsyncIterable(value: unknown): value is AsyncIterable<unknown> {
  return (
    value != null &&
    typeof (value as AsyncIterable<unknown>)[Symbol.asyncIterator] === 'function'
  )
}

/** Normalize a message's content into a parts array for editing. */
function toParts(message: ChatMessage): MessagePart[] {
  if (message.parts && message.parts.length > 0) return message.parts
  if (message.content) return [{ type: 'text', text: message.content }]
  return []
}

/** Append a streamed chunk (text or part) onto an assistant message. */
function appendChunk(parts: MessagePart[], chunk: string | MessagePart): MessagePart[] {
  if (typeof chunk === 'string') {
    const last = parts[parts.length - 1]
    if (last && last.type === 'text') {
      const next = parts.slice(0, -1)
      next.push({ type: 'text', text: last.text + chunk })
      return next
    }
    return [...parts, { type: 'text', text: chunk }]
  }
  // Structured part: merge into trailing text if it's a text part too, else push.
  if (chunk.type === 'text') {
    const last = parts[parts.length - 1]
    if (last && last.type === 'text') {
      const next = parts.slice(0, -1)
      next.push({ type: 'text', text: last.text + chunk.text })
      return next
    }
  }
  return [...parts, chunk]
}

// ============================================================================
// Options & return shape
// ============================================================================

export interface UseChatOptions {
  /** The function that talks to your backend/agent. Required for connected mode. */
  transport: ChatTransport
  /** Messages the conversation starts with. */
  initialMessages?: ChatMessage[]
  /** Called when the transport throws (network error, abort is ignored). */
  onError?: (error: unknown) => void
  /** Called after an assistant turn finishes streaming. */
  onFinish?: (message: ChatMessage) => void
  /** Override id generation (e.g. to use uuid). */
  generateId?: () => string
}

export interface UseChatHelpers {
  messages: ChatMessage[]
  status: ChatStatus
  error: unknown
  /** Controlled value for the composer input. */
  input: string
  setInput: React.Dispatch<React.SetStateAction<string>>
  /** Send a new user message (string, or pre-built parts). Uses `input` if omitted. */
  sendMessage: (
    message?: string | { parts: MessagePart[] }
  ) => Promise<void>
  /** Abort the in-flight assistant turn. */
  stop: () => void
  /** Re-run the last user message (drops the last assistant reply). */
  regenerate: () => Promise<void>
  /** Direct access for advanced cases. */
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>
  /** Reset the conversation. */
  clear: () => void
}

// ============================================================================
// useChat
// ============================================================================

export function useChat(options: UseChatOptions): UseChatHelpers {
  const { transport, initialMessages = [], onError, onFinish } = options
  const generateId = options.generateId ?? defaultGenerateId

  const [messages, setMessages] = React.useState<ChatMessage[]>(initialMessages)
  const [status, setStatus] = React.useState<ChatStatus>('idle')
  const [error, setError] = React.useState<unknown>(null)
  const [input, setInput] = React.useState('')

  const abortRef = React.useRef<AbortController | null>(null)
  // Keep latest messages accessible inside async loops without stale closures.
  const messagesRef = React.useRef(messages)
  messagesRef.current = messages

  React.useEffect(() => {
    return () => abortRef.current?.abort()
  }, [])

  const runTransport = React.useCallback(
    async (history: ChatMessage[]) => {
      const controller = new AbortController()
      abortRef.current = controller

      const assistantId = generateId()
      const assistant: ChatMessage = {
        id: assistantId,
        role: 'assistant',
        parts: [],
        createdAt: Date.now(),
        status: 'streaming',
      }
      setMessages((prev) => [...prev, assistant])
      setStatus('submitted')
      setError(null)

      const patchAssistant = (updater: (m: ChatMessage) => ChatMessage) =>
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? updater(m) : m))
        )

      try {
        const result: SendResult = await transport({
          messages: history,
          signal: controller.signal,
        })

        if (typeof result === 'string') {
          patchAssistant((m) => ({
            ...m,
            parts: [{ type: 'text', text: result }],
            status: 'complete',
          }))
        } else if (Array.isArray(result)) {
          patchAssistant((m) => ({ ...m, parts: result, status: 'complete' }))
        } else if (isAsyncIterable(result)) {
          setStatus('streaming')
          for await (const chunk of result as AsyncIterable<string | MessagePart>) {
            if (controller.signal.aborted) break
            patchAssistant((m) => ({
              ...m,
              parts: appendChunk(toParts(m), chunk),
            }))
          }
          patchAssistant((m) => ({ ...m, status: 'complete' }))
        }

        setStatus('idle')
        if (onFinish) {
          const finished = messagesRef.current.find((m) => m.id === assistantId)
          if (finished) onFinish({ ...finished, status: 'complete' })
        }
      } catch (err) {
        if (controller.signal.aborted) {
          // User-initiated stop: keep whatever streamed, mark complete.
          patchAssistant((m) => ({ ...m, status: 'complete' }))
          setStatus('idle')
          return
        }
        patchAssistant((m) => ({ ...m, status: 'error' }))
        setError(err)
        setStatus('error')
        onError?.(err)
      } finally {
        if (abortRef.current === controller) abortRef.current = null
      }
    },
    [transport, generateId, onError, onFinish]
  )

  const sendMessage = React.useCallback(
    async (message?: string | { parts: MessagePart[] }) => {
      const fromInput = typeof message === 'undefined'
      const text = fromInput ? input : typeof message === 'string' ? message : ''
      const parts =
        message && typeof message !== 'string' ? message.parts : undefined

      if (!parts && !text.trim()) return

      const userMessage: ChatMessage = {
        id: generateId(),
        role: 'user',
        ...(parts ? { parts } : { content: text }),
        createdAt: Date.now(),
        status: 'complete',
      }

      const history = [...messagesRef.current, userMessage]
      setMessages(history)
      if (fromInput) setInput('')
      await runTransport(history)
    },
    [input, generateId, runTransport]
  )

  const regenerate = React.useCallback(async () => {
    const history = [...messagesRef.current]
    // Drop trailing assistant message(s) so we re-answer the last user turn.
    while (history.length && history[history.length - 1].role === 'assistant') {
      history.pop()
    }
    if (!history.length) return
    setMessages(history)
    await runTransport(history)
  }, [runTransport])

  const stop = React.useCallback(() => {
    abortRef.current?.abort()
  }, [])

  const clear = React.useCallback(() => {
    abortRef.current?.abort()
    setMessages([])
    setStatus('idle')
    setError(null)
  }, [])

  return {
    messages,
    status,
    error,
    input,
    setInput,
    sendMessage,
    stop,
    regenerate,
    setMessages,
    clear,
  }
}
