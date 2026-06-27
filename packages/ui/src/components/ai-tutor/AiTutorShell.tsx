import * as React from 'react'
import { cn } from '../../utils/cn'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../card'
import { AiTutorChat } from './AiTutorChat'
import { AiTutorComposer } from './AiTutorComposer'
import type { AiTutorShellProps } from './types'

export function AiTutorShell({
  title = 'AI Tutor',
  subtitle = 'Personalized help based on your learning profile',
  messages,
  loading = false,
  disabled = false,
  placeholder,
  onSend,
  className,
}: AiTutorShellProps) {
  return (
    <Card className={cn('flex h-full min-h-[480px] flex-col overflow-hidden', className)}>
      <CardHeader className="border-b border-border py-4">
        <CardTitle className="text-xl">{title}</CardTitle>
        {subtitle ? <CardDescription>{subtitle}</CardDescription> : null}
      </CardHeader>
      <CardContent className="flex min-h-0 flex-1 flex-col p-0">
        <AiTutorChat messages={messages} loading={loading} />
        <AiTutorComposer
          onSend={onSend}
          loading={loading}
          disabled={disabled}
          placeholder={placeholder}
        />
      </CardContent>
    </Card>
  )
}
