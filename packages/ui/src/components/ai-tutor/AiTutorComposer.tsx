import * as React from 'react'
import { cn } from '../../utils/cn'
import { Button } from '../button'
import { Textarea } from '../textarea'
import { FileText, ImagePlus, Paperclip, X } from 'lucide-react'
import type { AiTutorComposerProps, TutorAttachment } from './types'

const DEFAULT_IMAGE_TYPES = 'image/jpeg,image/png,image/webp,image/gif'

export function AiTutorComposer({
  onSend,
  disabled = false,
  loading = false,
  placeholder = 'Ask your tutor anything…',
  className,
  acceptImages = true,
  acceptPdf = true,
  maxFiles = 3,
}: AiTutorComposerProps) {
  const [value, setValue] = React.useState('')
  const [attachments, setAttachments] = React.useState<TutorAttachment[]>([])
  const imageInputRef = React.useRef<HTMLInputElement>(null)
  const pdfInputRef = React.useRef<HTMLInputElement>(null)

  const canSubmit =
    !disabled && !loading && (value.trim().length > 0 || attachments.length > 0)

  const removeAttachment = (index: number) => {
    setAttachments((prev) => {
      const next = [...prev]
      const removed = next.splice(index, 1)[0]
      if (removed?.previewUrl) URL.revokeObjectURL(removed.previewUrl)
      return next
    })
  }

  const addFiles = async (files: FileList | null, kind: 'image' | 'pdf') => {
    if (!files?.length) return
    const slots = maxFiles - attachments.length
    if (slots <= 0) return

    const picked = Array.from(files).slice(0, slots)
    const next: TutorAttachment[] = []

    for (const file of picked) {
      const isPdf = kind === 'pdf' || file.type === 'application/pdf'
      const data = await readFileAsBase64(file)
      next.push({
        type: isPdf ? 'pdf' : 'image',
        mimeType: file.type || (isPdf ? 'application/pdf' : 'image/jpeg'),
        name: file.name,
        data,
        previewUrl: !isPdf ? URL.createObjectURL(file) : undefined,
      })
    }

    setAttachments((prev) => [...prev, ...next])
  }

  const submit = React.useCallback(async () => {
    if (!canSubmit) return
    const text = value.trim()
    const payload = {
      text,
      attachments: attachments.map(({ type, mimeType, name, data }) => ({
        type,
        mimeType,
        name,
        data,
      })),
    }
    setValue('')
    setAttachments((prev) => {
      prev.forEach((a) => {
        if (a.previewUrl) URL.revokeObjectURL(a.previewUrl)
      })
      return []
    })
    await onSend(payload)
  }, [canSubmit, value, attachments, onSend])

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      submit()
    }
  }

  return (
    <div className={cn('flex flex-col gap-2 border-t border-border bg-background p-4', className)}>
      {attachments.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {attachments.map((att, index) => (
            <div
              key={`${att.name}-${index}`}
              className="relative flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-2 py-1.5 text-xs"
            >
              {att.previewUrl ? (
                <img
                  src={att.previewUrl}
                  alt={att.name}
                  className="h-10 w-10 rounded object-cover"
                />
              ) : (
                <FileText className="h-4 w-4 text-muted-foreground" />
              )}
              <span className="max-w-[120px] truncate">{att.name}</span>
              <button
                type="button"
                className="rounded p-0.5 hover:bg-muted"
                onClick={() => removeAttachment(index)}
                aria-label={`Remove ${att.name}`}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      ) : null}

      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        disabled={disabled || loading}
        rows={3}
        className="min-h-[72px] resize-none"
      />

      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1">
          {acceptImages ? (
            <>
              <input
                ref={imageInputRef}
                type="file"
                accept={DEFAULT_IMAGE_TYPES}
                className="hidden"
                multiple
                onChange={(e) => {
                  addFiles(e.target.files, 'image')
                  e.target.value = ''
                }}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={disabled || loading || attachments.length >= maxFiles}
                onClick={() => imageInputRef.current?.click()}
              >
                <ImagePlus className="mr-1 h-4 w-4" />
                Image
              </Button>
            </>
          ) : null}
          {acceptPdf ? (
            <>
              <input
                ref={pdfInputRef}
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(e) => {
                  addFiles(e.target.files, 'pdf')
                  e.target.value = ''
                }}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={disabled || loading || attachments.length >= maxFiles}
                onClick={() => pdfInputRef.current?.click()}
              >
                <Paperclip className="mr-1 h-4 w-4" />
                PDF
              </Button>
            </>
          ) : null}
        </div>
        <Button onClick={submit} disabled={!canSubmit}>
          {loading ? 'Thinking…' : 'Send'}
        </Button>
      </div>
    </div>
  )
}

function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = String(reader.result || '')
      const idx = result.indexOf('base64,')
      resolve(idx >= 0 ? result.slice(idx + 7) : result)
    }
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}
