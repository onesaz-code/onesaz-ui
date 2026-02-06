# @onesaz/ui

A React component library with theming, accessibility, and Tailwind CSS support.

## Installation

```bash
npm install @onesaz/ui
```

## Quick Start

```tsx
import '@onesaz/ui/styles.css'
import { ThemeProvider, Button, Select } from '@onesaz/ui'

function App() {
  return (
    <ThemeProvider defaultTheme="system" accentColor="purple">
      <Button>Click me</Button>

      <Select>
        <Select.Trigger placeholder="Select option..." />
        <Select.Content>
          <Select.Item value="1">Option 1</Select.Item>
          <Select.Item value="2">Option 2</Select.Item>
        </Select.Content>
      </Select>
    </ThemeProvider>
  )
}
```

## Components

### Form Controls
- `Button` - Buttons with multiple variants
- `Input` - Text input fields
- `Textarea` - Multi-line text input
- `Checkbox` - Checkbox with label support
- `Switch` - Toggle switch
- `Select` - Dropdown select with search
- `Combobox` - Autocomplete input
- `Label` - Form labels

### Layout
- `Card` - Container component with header/footer
- `Separator` - Visual divider
- `Table` - Data tables with sorting

### Feedback
- `Badge` - Status badges
- `Spinner` - Loading indicator
- `Dialog` - Modal dialogs

### Navigation
- `Pagination` - Page navigation

## Theming

The library supports dynamic theming with:

- **Light/Dark mode**: Automatic system preference detection
- **Accent colors**: purple, blue, cyan, teal, green, orange, red, pink
- **Gray scales**: slate, gray, zinc, neutral
- **Border radius**: none, small, medium, large, full

```tsx
<ThemeProvider
  defaultTheme="system"
  accentColor="blue"
  grayColor="slate"
  radius="medium"
>
  <App />
</ThemeProvider>
```

### useTheme Hook

```tsx
import { useTheme } from '@onesaz/ui'

function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Toggle theme
    </button>
  )
}
```

## Tailwind CSS Setup

For custom components, use the shared Tailwind config:

```javascript
// tailwind.config.js
module.exports = {
  presets: [require('@onesaz/tailwind-config')],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@onesaz/ui/**/*.js',
  ],
}
```

## Peer Dependencies

- `react` ^18.0.0
- `react-dom` ^18.0.0

## License

MIT
