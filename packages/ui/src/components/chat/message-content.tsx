import * as React from 'react'
import { cn } from '../../utils/cn'
import type {
  ChatMessage,
  CodePart,
  MessagePart,
  RenderCode,
  RenderMarkdown,
  RenderPart,
} from './types'

// ============================================================================
// Tiny, safe default text renderer (NO external markdown dependency)
// ----------------------------------------------------------------------------
// Handles the essentials: fenced code blocks, inline `code`, **bold**, *italic*,
// and autolinked URLs. For full markdown/GFM, pass `renderMarkdown` to plug in
// react-markdown (or anything) without changing this component.
// ============================================================================

const INLINE_RE = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|https?:\/\/[^\s]+)/g

function renderInline(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = []
  let lastIndex = 0
  let key = 0
  for (const match of text.matchAll(INLINE_RE)) {
    const token = match[0]
    const start = match.index ?? 0
    if (start > lastIndex) nodes.push(text.slice(lastIndex, start))

    if (token.startsWith('`')) {
      nodes.push(
        <code
          key={key++}
          className="rounded bg-current/10 px-1 py-0.5 font-mono text-[0.85em]"
        >
          {token.slice(1, -1)}
        </code>
      )
    } else if (token.startsWith('**')) {
      nodes.push(<strong key={key++}>{token.slice(2, -2)}</strong>)
    } else if (token.startsWith('*')) {
      nodes.push(<em key={key++}>{token.slice(1, -1)}</em>)
    } else {
      nodes.push(
        <a
          key={key++}
          href={token}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent underline underline-offset-2 hover:opacity-80"
        >
          {token}
        </a>
      )
    }
    lastIndex = start + token.length
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex))
  return nodes
}

/** Splits a text blob on ``` fences and renders code vs prose. */
function DefaultMarkdown({
  text,
  renderCode,
}: {
  text: string
  renderCode: RenderCode
}) {
  const segments = React.useMemo(() => {
    const out: Array<{ code: false; text: string } | { code: true; part: CodePart }> = []
    const fence = /```(\w+)?\n?([\s\S]*?)```/g
    let last = 0
    let m: RegExpExecArray | null
    while ((m = fence.exec(text)) !== null) {
      if (m.index > last) out.push({ code: false, text: text.slice(last, m.index) })
      out.push({ code: true, part: { type: 'code', language: m[1], code: m[2].replace(/\n$/, '') } })
      last = m.index + m[0].length
    }
    if (last < text.length) out.push({ code: false, text: text.slice(last) })
    return out
  }, [text])

  return (
    <>
      {segments.map((seg, i) =>
        seg.code ? (
          <React.Fragment key={i}>{renderCode(seg.part)}</React.Fragment>
        ) : (
          <p key={i} className="whitespace-pre-wrap break-words leading-relaxed [&:not(:first-child)]:mt-2">
            {renderInline(seg.text)}
          </p>
        )
      )}
    </>
  )
}

// ============================================================================
// Default code block with a copy button
// ============================================================================

function DefaultCodeBlock({ part }: { part: CodePart }) {
  const [copied, setCopied] = React.useState(false)
  const copy = () => {
    navigator.clipboard?.writeText(part.code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }
  return (
    <div className="group relative my-2 overflow-hidden rounded-md border border-border bg-muted/50">
      {part.language && (
        <div className="border-b border-border px-3 py-1 font-mono text-xs text-muted-foreground">
          {part.language}
        </div>
      )}
      <button
        type="button"
        onClick={copy}
        className="absolute right-2 top-2 rounded bg-background/80 px-2 py-1 text-xs text-muted-foreground opacity-0 transition-opacity hover:text-foreground group-hover:opacity-100"
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
      <pre className="overflow-x-auto p-3 text-sm">
        <code className="font-mono text-foreground">{part.code}</code>
      </pre>
    </div>
  )
}

// ============================================================================
// Tool-call card
// ============================================================================

function ToolCall({ part }: { part: Extract<MessagePart, { type: 'tool-call' }> }) {
  const [open, setOpen] = React.useState(false)
  const dot =
    part.status === 'error'
      ? 'bg-error-500'
      : part.status === 'success'
        ? 'bg-success-500'
        : 'bg-warning-500 animate-pulse'
  return (
    <div className="my-2 rounded-md border border-border bg-card">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm"
      >
        <span className={cn('h-2 w-2 shrink-0 rounded-full', dot)} />
        <span className="font-medium text-foreground">{part.label ?? part.name}</span>
        <span className="ml-auto text-xs text-muted-foreground">
          {open ? 'Hide' : 'Details'}
        </span>
      </button>
      {open && (
        <div className="space-y-2 border-t border-border px-3 py-2 text-xs">
          {part.input != null && (
            <div>
              <div className="mb-1 text-muted-foreground">Input</div>
              <pre className="overflow-x-auto rounded bg-muted/50 p-2 font-mono text-foreground">
                {typeof part.input === 'string' ? part.input : JSON.stringify(part.input, null, 2)}
              </pre>
            </div>
          )}
          {part.output != null && (
            <div>
              <div className="mb-1 text-muted-foreground">Output</div>
              <pre className="overflow-x-auto rounded bg-muted/50 p-2 font-mono text-foreground">
                {typeof part.output === 'string' ? part.output : JSON.stringify(part.output, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ============================================================================
// Attachment chip
// ============================================================================

function formatSize(bytes?: number): string | null {
  if (bytes == null) return null
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

function Attachment({ part }: { part: Extract<MessagePart, { type: 'attachment' }> }) {
  const isImage = part.mimeType?.startsWith('image/')
  if (isImage && part.url) {
    return (
      <a href={part.url} target="_blank" rel="noopener noreferrer" className="my-2 block">
        <img
          src={part.url}
          alt={part.name}
          className="max-h-64 rounded-md border border-border object-contain"
        />
      </a>
    )
  }
  const size = formatSize(part.size)
  return (
    <a
      href={part.url}
      target="_blank"
      rel="noopener noreferrer"
      className="my-1 inline-flex items-center gap-2 rounded-md border border-border bg-muted/50 px-3 py-2 text-sm text-foreground hover:bg-muted"
    >
      <svg className="h-4 w-4 shrink-0 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      <span className="truncate">{part.name}</span>
      {size && <span className="text-xs text-muted-foreground">{size}</span>}
    </a>
  )
}

// ============================================================================
// MessageContent
// ============================================================================

export interface MessageContentProps {
  message: ChatMessage
  /** Plug in a full markdown renderer (e.g. react-markdown). */
  renderMarkdown?: RenderMarkdown
  /** Plug in a syntax-highlighted code block (e.g. prism-react-renderer). */
  renderCode?: RenderCode
  /** Render a part yourself; return null to fall back to the default. */
  renderPart?: RenderPart
}

/** Normalizes a message into parts (content shortcut → single text part). */
function messageParts(message: ChatMessage): MessagePart[] {
  if (message.parts && message.parts.length > 0) return message.parts
  if (message.content) return [{ type: 'text', text: message.content }]
  return []
}

export const MessageContent = React.forwardRef<HTMLDivElement, MessageContentProps>(
  ({ message, renderMarkdown, renderCode, renderPart }, ref) => {
    const codeRenderer: RenderCode =
      renderCode ?? ((part) => <DefaultCodeBlock part={part} />)

    const parts = messageParts(message)

    return (
      <div ref={ref} className="text-sm">
        {parts.map((part, i) => {
          // 1) Caller override wins for any part type.
          const custom = renderPart?.(part, message)
          if (custom != null && custom !== false) return <React.Fragment key={i}>{custom}</React.Fragment>

          // 2) Built-in defaults.
          switch (part.type) {
            case 'text':
              return (
                <div key={i}>
                  {renderMarkdown ? (
                    renderMarkdown(part.text)
                  ) : (
                    <DefaultMarkdown text={part.text} renderCode={codeRenderer} />
                  )}
                </div>
              )
            case 'code':
              return <React.Fragment key={i}>{codeRenderer(part)}</React.Fragment>
            case 'tool-call':
              return <ToolCall key={i} part={part} />
            case 'attachment':
              return <Attachment key={i} part={part} />
            default:
              return null
          }
        })}
      </div>
    )
  }
)
MessageContent.displayName = 'MessageContent'
