import type { AccentColor } from './colors/accents'
import type { GrayColor } from './colors/grays'
import type { RadiusPreset } from './radius'

export type Theme = 'light' | 'dark' | 'system'

export interface ThemeConfig {
  theme: Theme
  accentColor: AccentColor
  grayColor: GrayColor
  radius: RadiusPreset
}

export const defaultThemeConfig: ThemeConfig = {
  theme: 'light',
  accentColor: 'violet',
  grayColor: 'slate',
  radius: 'medium',
}

// Light theme semantic tokens (using gray scale step numbers, or a literal
// hex value for surfaces that must stay pure white regardless of the chosen
// gray palette — e.g. cards need to read as elevated above the gray-1 page
// background, not the same shade as it)
export const lightTheme = {
  background: 1,        // gray-1
  foreground: 12,       // gray-12
  card: '#ffffff',       // pure white — distinct from the gray-1 page background
  cardForeground: 12,   // gray-12
  popover: '#ffffff',    // pure white
  popoverForeground: 12,// gray-12
  muted: 2,             // gray-2
  mutedForeground: 6,   // gray-6
  border: 3,            // gray-3
  input: 3,             // gray-3
  ring: 6,              // accent-6
} as const

// Dark theme semantic tokens (using gray scale step numbers)
export const darkTheme = {
  background: 10,       // gray-10
  foreground: 1,        // gray-1
  card: 9,              // gray-9
  cardForeground: 1,    // gray-1
  popover: 9,           // gray-9
  popoverForeground: 1, // gray-1
  muted: 8,             // gray-8
  mutedForeground: 5,   // gray-5
  border: 8,            // gray-8
  input: 8,             // gray-8
  ring: 6,              // accent-6
} as const
