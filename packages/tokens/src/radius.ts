export const radiusScale = {
  none: '0px',
  sm: '0.125rem',
  base: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px',
} as const

export const radiusPresets = {
  none: {
    sm: '0px',
    md: '0px',
    lg: '0px',
    full: '0px',
  },
  small: {
    sm: '0.125rem',
    md: '0.25rem',
    lg: '0.375rem',
    full: '9999px',
  },
  medium: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    full: '9999px',
  },
  large: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    full: '9999px',
  },
  full: {
    sm: '9999px',
    md: '9999px',
    lg: '9999px',
    full: '9999px',
  },
} as const

export type RadiusPreset = keyof typeof radiusPresets
