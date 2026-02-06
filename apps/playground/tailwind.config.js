import preset from '@onesaz/tailwind-config'

/** @type {import('tailwindcss').Config} */
export default {
  presets: [preset],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
}
