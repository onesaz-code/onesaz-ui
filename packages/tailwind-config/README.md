# @onesaz/tailwind-config

Shared Tailwind CSS configuration for Onesaz applications. Supports both Tailwind v3 and v4.

## Installation

```bash
npm install @onesaz/tailwind-config tailwindcss
```

## Usage

### Tailwind v4 (CSS-first)

In your main CSS file:

```css
@import "tailwindcss";
@import "@onesaz/tailwind-config/v4.css";

/* Your custom styles */
```

### Tailwind v3 (JS preset)

In your `tailwind.config.js`:

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

- Pre-configured color palette (purple, blue, cyan, teal, green, orange, red, pink)
- Gray scales (slate, neutral)
- Semantic colors (success, warning, error, info)
- CSS variable-based colors for dynamic theming
- Typography scale
- Border radius scale
- Shadow scale
- Animation keyframes
- Dark mode support

## Included Colors

### Accent Colors
- `purple-1` to `purple-12`
- `blue-1` to `blue-12`
- `cyan-1` to `cyan-12`
- `teal-1` to `teal-12`
- `green-1` to `green-12`
- `orange-1` to `orange-12`
- `red-1` to `red-12`
- `pink-1` to `pink-12`

### Gray Colors
- `slate-1` to `slate-12`
- `neutral-1` to `neutral-12`

### Semantic Colors
- `success`, `success-light`, `success-dark`
- `warning`, `warning-light`, `warning-dark`
- `error`, `error-light`, `error-dark`
- `info`, `info-light`, `info-dark`

## Peer Dependencies

- `tailwindcss` ^3.4.0 or ^4.0.0

## License

MIT
