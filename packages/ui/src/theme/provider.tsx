import * as React from 'react'
import {
  accentColors,
  grayColors,
  radiusPresets,
  lightTheme,
  darkTheme,
  type AccentColor,
  type GrayColor,
  type RadiusPreset,
  type Theme,
} from '@onesaz/tokens'
import { ThemeContext } from './context'

export interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
  accentColor?: AccentColor
  grayColor?: GrayColor
  radius?: RadiusPreset
  storageKey?: string
}

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  accentColor: defaultAccent = 'violet',
  grayColor: defaultGray = 'slate',
  radius: defaultRadius = 'medium',
  storageKey = 'onesaz-theme',
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<Theme>(defaultTheme)
  const [accentColor, setAccentColorState] = React.useState<AccentColor>(defaultAccent)
  const [grayColor, setGrayColorState] = React.useState<GrayColor>(defaultGray)
  const [radius, setRadiusState] = React.useState<RadiusPreset>(defaultRadius)

  const [resolvedTheme, setResolvedTheme] = React.useState<'light' | 'dark'>(() =>
    defaultTheme === 'system' ? getSystemTheme() : defaultTheme === 'dark' ? 'dark' : 'light'
  )

  // Sync state with props when they change (important for Storybook controls)
  React.useEffect(() => {
    setThemeState(defaultTheme)
  }, [defaultTheme])

  React.useEffect(() => {
    setAccentColorState(defaultAccent)
  }, [defaultAccent])

  React.useEffect(() => {
    setGrayColorState(defaultGray)
  }, [defaultGray])

  React.useEffect(() => {
    setRadiusState(defaultRadius)
  }, [defaultRadius])

  // Listen for system theme changes
  React.useEffect(() => {
    if (theme !== 'system') {
      setResolvedTheme(theme)
      return
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setResolvedTheme(mediaQuery.matches ? 'dark' : 'light')

    const handler = (e: MediaQueryListEvent) => {
      setResolvedTheme(e.matches ? 'dark' : 'light')
    }

    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [theme])

  // Generate CSS variables
  React.useEffect(() => {
    const root = document.documentElement
    const themeTokens = resolvedTheme === 'dark' ? darkTheme : lightTheme
    const accent = accentColors[accentColor]
    const gray = grayColors[grayColor] as Record<number, string>
    const radiusValues = radiusPresets[radius]

    // Set theme attribute
    root.setAttribute('data-theme', resolvedTheme)
    root.setAttribute('data-accent', accentColor)

    // Theme tokens are either a gray-scale step (1-12) or a literal hex
    // value for surfaces that must stay fixed regardless of the chosen
    // gray palette (e.g. card/popover white in light mode).
    const resolveToken = (value: number | string) =>
      typeof value === 'string' ? value : gray[value]

    // Set gray-based semantic tokens
    root.style.setProperty('--background', resolveToken(themeTokens.background))
    root.style.setProperty('--foreground', resolveToken(themeTokens.foreground))
    root.style.setProperty('--card', resolveToken(themeTokens.card))
    root.style.setProperty('--card-foreground', resolveToken(themeTokens.cardForeground))
    root.style.setProperty('--popover', resolveToken(themeTokens.popover))
    root.style.setProperty('--popover-foreground', resolveToken(themeTokens.popoverForeground))
    root.style.setProperty('--muted', resolveToken(themeTokens.muted))
    root.style.setProperty('--muted-foreground', resolveToken(themeTokens.mutedForeground))
    root.style.setProperty('--border', resolveToken(themeTokens.border))
    root.style.setProperty('--input', resolveToken(themeTokens.input))

    // Set accent colors
    root.style.setProperty('--accent', accent[6])
    root.style.setProperty('--accent-foreground', '#ffffff')
    root.style.setProperty('--accent-hover', accent[7])
    root.style.setProperty('--ring', accent[6])

    // Set all accent scale values
    Object.entries(accent).forEach(([step, value]) => {
      root.style.setProperty(`--accent-${step}`, value)
    })

    // Set destructive colors
    root.style.setProperty('--destructive', resolvedTheme === 'dark' ? '#ef4444' : '#dc2626')
    root.style.setProperty('--destructive-foreground', '#ffffff')

    // Set radius
    root.style.setProperty('--radius', radiusValues.md)
    root.style.setProperty('--radius-sm', radiusValues.sm)
    root.style.setProperty('--radius-lg', radiusValues.lg)
  }, [resolvedTheme, accentColor, grayColor, radius])

  const setTheme = React.useCallback((newTheme: Theme) => {
    localStorage.setItem(`${storageKey}-mode`, newTheme)
    setThemeState(newTheme)
  }, [storageKey])

  const setAccentColor = React.useCallback((color: AccentColor) => {
    localStorage.setItem(`${storageKey}-accent`, color)
    setAccentColorState(color)
  }, [storageKey])

  const setGrayColor = React.useCallback((color: GrayColor) => {
    localStorage.setItem(`${storageKey}-gray`, color)
    setGrayColorState(color)
  }, [storageKey])

  const setRadius = React.useCallback((newRadius: RadiusPreset) => {
    localStorage.setItem(`${storageKey}-radius`, newRadius)
    setRadiusState(newRadius)
  }, [storageKey])

  const value = React.useMemo(
    () => ({
      theme,
      resolvedTheme,
      accentColor,
      grayColor,
      radius,
      setTheme,
      setAccentColor,
      setGrayColor,
      setRadius,
    }),
    [theme, resolvedTheme, accentColor, grayColor, radius, setTheme, setAccentColor, setGrayColor, setRadius]
  )

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

ThemeProvider.displayName = 'ThemeProvider'
