import * as React from 'react'
import { cn } from '../../utils/cn'
import { Spinner } from '../spinner'
import { Typography } from '../typography'
import { FileText } from 'lucide-react'
import type { AiTutorChatProps, TutorMessage } from './types'

function MessageBubble({ message }: { message: TutorMessage }) {
  const isUser = message.role === 'user'
  const attachments = message.attachments || []

  return (
    <div className={cn('flex w-full', isUser ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap',
          isUser
            ? 'bg-primary text-primary-foreground'
            : 'border border-border bg-muted/40 text-foreground'
        )}
      >
        {attachments.length > 0 ? (
          <div className="mb-2 flex flex-wrap gap-2">
            {attachments.map((att, i) =>
              att.previewUrl ? (
                <img
                  key={`${att.name}-${i}`}
                  src={att.previewUrl}
                  alt={att.name}
                  className="max-h-40 rounded-lg border border-white/20 object-contain"
                />
              ) : (
                <div
                  key={`${att.name}-${i}`}
                  className={cn(
                    'flex items-center gap-1 rounded-md px-2 py-1 text-xs',
                    isUser ? 'bg-primary-foreground/10' : 'bg-background'
                  )}
                >
                  <FileText className="h-3.5 w-3.5" />
                  {att.name}
                </div>
              )
            )}
          </div>
        ) : null}
        {message.content && message.content !== '(attachment)' ? message.content : null}
        {message.content === '(attachment)' && attachments.length > 0 ? (
          <span className="opacity-80">Uploaded file for analysis</span>
        ) : null}
      </div>
    </div>
  )
}

export function AiTutorChat({ messages, loading = false, className }: AiTutorChatProps) {
  const endRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const visible = messages.filter((m) => m.role !== 'system')

  return (
    <div className={cn('flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-4', className)}>
      {visible.length === 0 && !loading && (
        <div className="flex flex-1 items-center justify-center text-center">
          <Typography variant="body2" className="max-w-md text-muted-foreground">
            Ask a doubt, upload a question image, or attach a PDF — your tutor will explain
            step by step.
          </Typography>
        </div>
      )}
      {visible.map((message, index) => (
        <MessageBubble key={message.id || `${message.role}-${index}`} message={message} />
      ))}
      {loading && (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Spinner size="sm" />
          <Typography variant="caption">Tutor is thinking…</Typography>
        </div>
      )}
      <div ref={endRef} />
    </div>
  )
}
