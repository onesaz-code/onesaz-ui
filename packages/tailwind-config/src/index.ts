import type { Config } from 'tailwindcss'
import {
  accentColors,
  grayColors,
  semanticColors,
  spacing,
  fontSizes,
  fontFamilies,
  radiusScale,
} from '@onesaz/tokens'

const config: Partial<Config> = {
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // Accent color palettes
        purple: accentColors.purple,
        blue: accentColors.blue,
        cyan: accentColors.cyan,
        teal: accentColors.teal,
        green: accentColors.green,
        orange: accentColors.orange,
        red: accentColors.red,
        pink: accentColors.pink,

        // Gray palettes
        slate: grayColors.slate,
        gray: grayColors.gray,
        zinc: grayColors.zinc,
        neutral: grayColors.neutral,

        // Semantic colors
        success: semanticColors.success,
        warning: semanticColors.warning,
        error: semanticColors.error,
        info: semanticColors.info,

        // CSS variable based colors for dynamic theming
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
          hover: 'var(--accent-hover)',
          1: 'var(--accent-1)',
          2: 'var(--accent-2)',
          3: 'var(--accent-3)',
          4: 'var(--accent-4)',
          5: 'var(--accent-5)',
          6: 'var(--accent-6)',
          7: 'var(--accent-7)',
          8: 'var(--accent-8)',
          9: 'var(--accent-9)',
          10: 'var(--accent-10)',
          11: 'var(--accent-11)',
          12: 'var(--accent-12)',
        },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
      },
      spacing,
      fontSize: fontSizes,
      fontFamily: {
        sans: [fontFamilies.sans],
        mono: [fontFamilies.mono],
      },
      borderRadius: {
        ...radiusScale,
        DEFAULT: 'var(--radius)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'fade-out': {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        'slide-in-from-top': {
          from: { transform: 'translateY(-100%)' },
          to: { transform: 'translateY(0)' },
        },
        'slide-in-from-bottom': {
          from: { transform: 'translateY(100%)' },
          to: { transform: 'translateY(0)' },
        },
        'slide-in-from-left': {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(0)' },
        },
        'slide-in-from-right': {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
        'zoom-in': {
          from: { transform: 'scale(0.95)', opacity: '0' },
          to: { transform: 'scale(1)', opacity: '1' },
        },
        'zoom-out': {
          from: { transform: 'scale(1)', opacity: '1' },
          to: { transform: 'scale(0.95)', opacity: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.2s ease-out',
        'fade-out': 'fade-out 0.2s ease-out',
        'slide-in-from-top': 'slide-in-from-top 0.2s ease-out',
        'slide-in-from-bottom': 'slide-in-from-bottom 0.2s ease-out',
        'slide-in-from-left': 'slide-in-from-left 0.2s ease-out',
        'slide-in-from-right': 'slide-in-from-right 0.2s ease-out',
        'zoom-in': 'zoom-in 0.2s ease-out',
        'zoom-out': 'zoom-out 0.2s ease-out',
      },
    },
  },
  plugins: [],
}

export default config
