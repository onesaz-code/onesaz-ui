// Generates the token CSS custom properties from the TS token source, so the
// stylesheet can never drift from tokens/*.ts. Run: `npm run generate:css`.
// Output: packages/tailwind-config/src/tokens.generated.css
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { accentColors, semanticColors } from '../dist/index.js'

const here = dirname(fileURLToPath(import.meta.url))
const OUT = resolve(here, '../../tailwind-config/src/tokens.generated.css')

// TS scales use steps 1–12; the Tailwind naming uses 50–950 (11 steps).
const STEP_MAP = [
  [1, '50'], [2, '100'], [3, '200'], [4, '300'], [5, '400'], [6, '500'],
  [7, '600'], [8, '700'], [9, '800'], [10, '900'], [11, '950'],
]

const semanticBlock = (key) => {
  const s = semanticColors[key]
  const lines = [`  /* ${key[0].toUpperCase()}${key.slice(1)} */`]
  for (const [ts, css] of STEP_MAP) lines.push(`  --color-${key}-${css}: ${s[ts]};`)
  lines.push(`  --color-${key}: ${s[6]};`)
  lines.push(`  --color-${key}-light: ${s[2]};`)
  lines.push(`  --color-${key}-dark: ${s[7]};`)
  return lines.join('\n')
}

const accentBlock = (name) => {
  const a = accentColors[name]
  const lines = [`  /* Accent: ${name} */`]
  for (let i = 1; i <= 12; i++) lines.push(`  --color-${name}-${i}: ${a[i]};`)
  return lines.join('\n')
}

const semantic = ['success', 'warning', 'error', 'info'].map(semanticBlock).join('\n\n')
const accents = Object.keys(accentColors).map(accentBlock).join('\n\n')

const css = `/* AUTO-GENERATED from @onesaz/tokens — do not edit by hand.
 * Regenerate with: npm run generate:css --workspace=@onesaz/tokens
 * Guarded by packages/ui/src/__tests__/token-drift.test.ts */
@theme {
${semantic}

${accents}
}
`

writeFileSync(OUT, css)
console.log(`✓ Wrote ${OUT}`)
