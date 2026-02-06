import preset from '@onesaz/tailwind-config'

/** @type {import('tailwindcss').Config} */
export default {
  presets: [preset],
  content: [
    './stories/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
}
