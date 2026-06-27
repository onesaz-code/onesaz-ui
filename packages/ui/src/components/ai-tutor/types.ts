export type TutorAttachmentType = 'image' | 'pdf'

export interface TutorAttachment {
  type: TutorAttachmentType
  mimeType: string
  name: string
  data?: string
  previewUrl?: string
}

export type TutorSurface =
  | 'standalone'
  | 'exam_result'
  | 'exam_analysis'
  | 'practice'
  | 'library'

export interface TutorMessage {
  id?: string
  role: 'user' | 'assistant' | 'system'
  content: string
  attachments?: TutorAttachment[]
}

export interface TutorStudentContext {
  id?: string
  _id?: string
  instituteId?: string
  class?: string
  classVal?: string
  course?: string
  name?: string
  targetExam?: string
}

export interface TutorContext {
  surface?: TutorSurface
  student?: TutorStudentContext
  question?: Record<string, unknown>
  exam?: Record<string, unknown>
  practice?: Record<string, unknown>
  learnerProfile?: Record<string, unknown>
  examMode?: boolean
  metadata?: Record<string, unknown>
}

export interface TutorSendPayload {
  text: string
  attachments?: TutorAttachment[]
}

export interface AiTutorShellProps {
  title?: string
  subtitle?: string
  messages: TutorMessage[]
  loading?: boolean
  disabled?: boolean
  placeholder?: string
  onSend: (payload: TutorSendPayload) => void | Promise<void>
  className?: string
}

export interface AiTutorChatProps {
  messages: TutorMessage[]
  loading?: boolean
  className?: string
}

export interface AiTutorComposerProps {
  onSend: (payload: TutorSendPayload) => void | Promise<void>
  disabled?: boolean
  loading?: boolean
  placeholder?: string
  className?: string
  acceptImages?: boolean
  acceptPdf?: boolean
  maxFiles?: number
}
