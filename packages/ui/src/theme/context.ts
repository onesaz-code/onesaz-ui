import { createContext } from 'react'
import type { AccentColor, GrayColor, RadiusPreset, Theme } from '@onesaz/tokens'

export interface ThemeContextValue {
  theme: Theme
  resolvedTheme: 'light' | 'dark'
  accentColor: AccentColor
  grayColor: GrayColor
  radius: RadiusPreset
  setTheme: (theme: Theme) => void
  setAccentColor: (color: AccentColor) => void
  setGrayColor: (color: GrayColor) => void
  setRadius: (radius: RadiusPreset) => void
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)
