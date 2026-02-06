# @onesaz/tailwind-config

Shared Tailwind CSS preset for Onesaz applications.

## Installation

```bash
npm install @onesaz/tailwind-config tailwindcss
```

## Usage

Add the preset to your `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('@onesaz/tailwind-config')],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@onesaz/ui/**/*.js',
  ],
}
```

## Features

- Pre-configured color palette using design tokens
- CSS variable-based colors for dynamic theming
- Consistent spacing, typography, and border radius scales
- Dark mode support

## Peer Dependencies

- `tailwindcss` ^3.4.0

## License

MIT
