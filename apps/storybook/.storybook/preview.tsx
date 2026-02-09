import * as React from 'react'
import type { Preview, Decorator } from '@storybook/react'
import { ThemeProvider } from '@onesaz/ui'
import type { AccentColor, GrayColor, RadiusPreset, Theme } from '@onesaz/tokens'
import './styles.css'

interface GlobalTypes {
  theme: Theme
  accentColor: AccentColor
  grayColor: GrayColor
  radius: RadiusPreset
}

const ThemeDecorator: Decorator = (Story, context) => {
  const { theme, accentColor, grayColor, radius } = context.globals as GlobalTypes

  return (
    <ThemeProvider
      defaultTheme={theme}
      accentColor={accentColor}
      grayColor={grayColor}
      radius={radius}
    >
      <div className="min-h-[100px] p-4 bg-background text-foreground">
        <Story />
      </div>
    </ThemeProvider>
  )
}

const preview: Preview = {
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Light or dark mode',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
          { value: 'system', icon: 'browser', title: 'System' },
        ],
        dynamicTitle: true,
      },
    },
    accentColor: {
      name: 'Accent Color',
      description: 'Primary accent color',
      defaultValue: 'purple',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'purple', title: 'Purple' },
          { value: 'blue', title: 'Blue' },
          { value: 'cyan', title: 'Cyan' },
          { value: 'teal', title: 'Teal' },
          { value: 'green', title: 'Green' },
          { value: 'orange', title: 'Orange' },
          { value: 'red', title: 'Red' },
          { value: 'pink', title: 'Pink' },
        ],
        dynamicTitle: true,
      },
    },
    grayColor: {
      name: 'Gray Scale',
      description: 'Gray color scale',
      defaultValue: 'slate',
      toolbar: {
        icon: 'contrast',
        items: [
          { value: 'slate', title: 'Slate' },
          { value: 'gray', title: 'Gray' },
          { value: 'zinc', title: 'Zinc' },
          { value: 'neutral', title: 'Neutral' },
        ],
        dynamicTitle: true,
      },
    },
    radius: {
      name: 'Radius',
      description: 'Border radius preset',
      defaultValue: 'medium',
      toolbar: {
        icon: 'outline',
        items: [
          { value: 'none', title: 'None' },
          { value: 'small', title: 'Small' },
          { value: 'medium', title: 'Medium' },
          { value: 'large', title: 'Large' },
          { value: 'full', title: 'Full' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [ThemeDecorator],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      disable: true,
    },
  },
}

export default preview
