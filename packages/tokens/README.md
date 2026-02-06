# @onesaz/tokens

Design tokens for the Onesaz UI component library.

## Installation

```bash
npm install @onesaz/tokens
```

## Usage

```typescript
import { accentColors, grayColors, lightTheme, darkTheme } from '@onesaz/tokens'

// Access color scales
console.log(accentColors.purple[500]) // #8B5CF6

// Use theme tokens
console.log(lightTheme.background) // #FFFFFF
console.log(darkTheme.background) // #0F172A
```

## Available Exports

### Colors

- **Accent Colors**: `purple`, `blue`, `cyan`, `teal`, `green`, `orange`, `red`, `pink`
- **Gray Colors**: `slate`, `gray`, `zinc`, `neutral`

Each color includes a full scale from 50 to 950.

### Themes

- `lightTheme` - Light mode semantic tokens
- `darkTheme` - Dark mode semantic tokens

### Utilities

- `generateCSSVariables()` - Generate CSS custom properties from tokens

## License

MIT
