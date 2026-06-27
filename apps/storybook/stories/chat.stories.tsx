import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  ChatWindow,
  type ChatTransport,
  type ChatMessage,
  type MessagePart,
} from '@onesaz/ui'

const meta: Meta<typeof ChatWindow> = {
  title: 'Chat/ChatWindow',
  component: ChatWindow,
  parameters: {
    layout: 'fullscreen',
    docs: {
      source: { type: 'code' },
    },
  },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof ChatWindow>

// ---------------------------------------------------------------------------
// Mock transport — simulates a streaming agent with NO backend.
// In a real app this function does fetch/SSE/SDK calls instead.
// ---------------------------------------------------------------------------

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

const mockReply = `Sure! Here's a quick example in **TypeScript**:

\`\`\`ts
function greet(name: string) {
  return \`Hello, \${name}!\`
}
\`\`\`

You can call it with \`greet("world")\`. Want me to explain how it works?`

const streamingTransport: ChatTransport = async function* () {
  await sleep(500) // "thinking"
  // Yield word-by-word to simulate token streaming.
  for (const word of mockReply.split(/(\s+)/)) {
    await sleep(25)
    yield word
  }
}

// A transport that emits rich parts: text + a tool call + an attachment.
const richTransport: ChatTransport = async function* (): AsyncIterable<MessagePart> {
  await sleep(400)
  yield { type: 'text', text: 'Let me look that up for you.' }
  await sleep(600)
  yield {
    type: 'tool-call',
    name: 'search_orders',
    label: 'Searching orders',
    status: 'success',
    input: { query: 'last invoice', limit: 1 },
    output: { id: 'INV-2042', amount: 4999, currency: 'INR' },
  }
  await sleep(500)
  yield { type: 'text', text: '\n\nFound it — your last invoice **INV-2042** for ₹4,999.' }
  await sleep(300)
  yield {
    type: 'attachment',
    name: 'invoice-INV-2042.pdf',
    mimeType: 'application/pdf',
    size: 84_233,
    url: '#',
  }
}

// Custom action buttons injected per message.
const actions = [
  {
    id: 'copy',
    label: 'Copy',
    onClick: (m: ChatMessage) => {
      const text =
        m.content ??
        m.parts?.map((p) => (p.type === 'text' ? p.text : '')).join('') ??
        ''
      navigator.clipboard?.writeText(text)
    },
    show: (m: ChatMessage) => m.role === 'assistant',
  },
  {
    id: 'like',
    label: '👍',
    onClick: () => alert('Thanks for the feedback!'),
    show: (m: ChatMessage) => m.role === 'assistant',
  },
]

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div style={{ height: '100vh', maxWidth: 720, margin: '0 auto', padding: 16 }}>
    {children}
  </div>
)

export const Streaming: Story = {
  render: () => (
    <Frame>
      <ChatWindow
        transport={streamingTransport}
        header={<strong>Onesaz Assistant</strong>}
        actions={actions}
        showTimestamp
        placeholder="Ask me anything…"
        emptyState={
          <div className="text-center text-muted-foreground">
            <p className="text-sm">👋 Start a conversation</p>
          </div>
        }
      />
    </Frame>
  ),
}

export const ToolCallsAndAttachments: Story = {
  render: () => (
    <Frame>
      <ChatWindow
        transport={richTransport}
        header={<strong>Agent with tools</strong>}
        actions={actions}
        initialMessages={[
          { id: '1', role: 'assistant', content: 'Hi! Ask me about your orders.' },
        ]}
      />
    </Frame>
  ),
}

// Floating action button that toggles a chat popup — the most common pattern.
export const FloatingActionButton: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false)
    return (
      <div style={{ height: '100vh', position: 'relative', background: '#f5f5f5' }}>
        <div className="p-8 text-foreground">
          <h2 className="text-lg font-semibold">Your App</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Click the chat button in the bottom-right corner to open the assistant.
          </p>
        </div>

        {/* Chat popup */}
        {open && (
          <div
            style={{
              position: 'fixed',
              bottom: 88,
              right: 24,
              width: 400,
              height: 520,
              zIndex: 50,
            }}
          >
            <ChatWindow
              transport={streamingTransport}
              header={
                <div className="flex items-center justify-between">
                  <strong>Onesaz Assistant</strong>
                  <button
                    onClick={() => setOpen(false)}
                    className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              }
              actions={actions}
              placeholder="Ask me anything…"
              emptyState={
                <div className="text-center text-muted-foreground">
                  <p className="text-sm">How can I help you today?</p>
                </div>
              }
            />
          </div>
        )}

        {/* FAB */}
        <button
          onClick={() => setOpen((o) => !o)}
          style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 50 }}
          className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg transition-transform hover:scale-105 active:scale-95"
        >
          {open ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          )}
        </button>
      </div>
    )
  },
}

// Controlled mode: app owns the messages array.
export const Controlled: Story = {
  render: () => {
    const messages: ChatMessage[] = [
      { id: '1', role: 'user', content: 'What is the capital of France?' },
      { id: '2', role: 'assistant', content: 'The capital of France is **Paris**.' },
      { id: '3', role: 'system', content: 'Conversation rated 5/5' },
    ]
    return (
      <Frame>
        <ChatWindow
          messages={messages}
          status="idle"
          onSendMessage={(msg) => alert(`App would send: ${JSON.stringify(msg)}`)}
          actions={actions}
          showTimestamp
        />
      </Frame>
    )
  },
}
