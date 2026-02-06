import * as React from 'react'
import {
  ThemeProvider,
  useTheme,
  Button,
  Input,
  Textarea,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
  Label,
  Checkbox,
  Switch,
  Separator,
  Select,
  Dialog,
} from '@onesaz/ui'
import type { AccentColor, Theme } from '@onesaz/tokens'

function ThemeControls() {
  const { theme, accentColor, setTheme, setAccentColor } = useTheme()

  const accents: AccentColor[] = ['purple', 'blue', 'cyan', 'teal', 'green', 'orange', 'red', 'pink']
  const themes: Theme[] = ['light', 'dark', 'system']

  return (
    <div className="flex items-center gap-4">
      <div className="flex gap-2">
        {themes.map((t) => (
          <Button
            key={t}
            variant={theme === t ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTheme(t)}
          >
            {t}
          </Button>
        ))}
      </div>
      <Separator orientation="vertical" className="h-6" />
      <div className="flex gap-1">
        {accents.map((color) => (
          <button
            key={color}
            onClick={() => setAccentColor(color)}
            className={`h-6 w-6 rounded-full transition-transform ${
              accentColor === color ? 'ring-2 ring-offset-2 ring-[var(--accent)] scale-110' : ''
            }`}
            title={color}
          >
            <span
              className="block h-full w-full rounded-full"
              style={{
                backgroundColor:
                  color === 'purple' ? '#a855f7' :
                  color === 'blue' ? '#3b82f6' :
                  color === 'cyan' ? '#06b6d4' :
                  color === 'teal' ? '#14b8a6' :
                  color === 'green' ? '#22c55e' :
                  color === 'orange' ? '#f97316' :
                  color === 'red' ? '#ef4444' :
                  '#ec4899'
              }}
            />
          </button>
        ))}
      </div>
    </div>
  )
}

function Playground() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-[var(--accent)]" />
            <span className="font-semibold">Onesaz UI</span>
            <Badge>v0.0.0</Badge>
          </div>
          <ThemeControls />
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="mb-2 text-4xl font-bold">Component Playground</h1>
          <p className="text-[var(--muted-foreground)]">
            Test your components with different themes and accent colors.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Buttons */}
          <Card>
            <CardHeader>
              <CardTitle>Buttons</CardTitle>
              <CardDescription>Various button styles and sizes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Button>Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="link">Link</Button>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm">Small</Button>
                <Button>Default</Button>
                <Button size="lg">Large</Button>
              </div>
            </CardContent>
          </Card>

          {/* Inputs */}
          <Card>
            <CardHeader>
              <CardTitle>Inputs</CardTitle>
              <CardDescription>Text inputs and textareas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="name@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Type your message..." />
              </div>
            </CardContent>
          </Card>

          {/* Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Selection</CardTitle>
              <CardDescription>Checkboxes, switches, and selects</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <Label htmlFor="terms">Accept terms</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="notifications" />
                <Label htmlFor="notifications">Notifications</Label>
              </div>
              <Select>
                <Select.Trigger className="w-full">
                  <Select.Value placeholder="Select option" />
                </Select.Trigger>
                <Select.Content>
                  <Select.Item value="option1">Option 1</Select.Item>
                  <Select.Item value="option2">Option 2</Select.Item>
                  <Select.Item value="option3">Option 3</Select.Item>
                </Select.Content>
              </Select>
            </CardContent>
          </Card>

          {/* Badges */}
          <Card>
            <CardHeader>
              <CardTitle>Badges</CardTitle>
              <CardDescription>Status and label badges</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Dialog */}
          <Card>
            <CardHeader>
              <CardTitle>Dialog</CardTitle>
              <CardDescription>Modal dialogs</CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog>
                <Dialog.Trigger asChild>
                  <Button>Open Dialog</Button>
                </Dialog.Trigger>
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>Dialog Title</Dialog.Title>
                    <Dialog.Description>
                      This is a dialog description. You can put any content here.
                    </Dialog.Description>
                  </Dialog.Header>
                  <div className="py-4">
                    <p>Dialog content goes here.</p>
                  </div>
                  <Dialog.Footer>
                    <Dialog.Close asChild>
                      <Button variant="outline">Cancel</Button>
                    </Dialog.Close>
                    <Button>Confirm</Button>
                  </Dialog.Footer>
                </Dialog.Content>
              </Dialog>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <Playground />
    </ThemeProvider>
  )
}
