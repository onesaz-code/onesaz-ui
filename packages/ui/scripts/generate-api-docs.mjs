// Generates a component API reference from the TypeScript types, so the docs
// can't drift from the code. Run: `npm run generate:api --workspace=@onesaz/ui`.
// Output: docs/COMPONENT-API.md
import { createRequire } from 'node:module'
import { readdirSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve, join } from 'node:path'

const require = createRequire(import.meta.url)
const docgen = require('react-docgen-typescript')

const here = dirname(fileURLToPath(import.meta.url))
const componentsDir = resolve(here, '../src/components')
const OUT = resolve(here, '../../../docs/COMPONENT-API.md')

const files = readdirSync(componentsDir, { recursive: true })
  .filter((f) => typeof f === 'string' && f.endsWith('.tsx') && !f.endsWith('.test.tsx') && !f.endsWith('.stories.tsx'))
  .map((f) => join(componentsDir, f))

const parser = docgen.withDefaultConfig({
  savePropValueAsString: true,
  shouldExtractLiteralValuesFromEnum: true,
  shouldRemoveUndefinedFromOptional: true,
  // Only the component's own props — skip the inherited HTML/Radix props.
  propFilter: (prop) => !(prop.parent && prop.parent.fileName.includes('node_modules')),
})

const docs = parser.parse(files).filter((c) => Object.keys(c.props || {}).length > 0)
docs.sort((a, b) => a.displayName.localeCompare(b.displayName))

const esc = (s) => (s || '').replace(/\|/g, '\\|').replace(/\r?\n/g, ' ').trim()

let md = `# Component API Reference

> **AUTO-GENERATED from the TypeScript types — do not edit by hand.**
> Regenerate: \`npm run generate:api --workspace=@onesaz/ui\`
> This is the source of truth for props; the narrative COMPONENT-GUIDE is for usage/examples.

`

for (const c of docs) {
  md += `## ${c.displayName}\n\n`
  if (c.description) md += `${esc(c.description)}\n\n`
  md += `| Prop | Type | Required | Default | Description |\n|---|---|---|---|---|\n`
  for (const p of Object.values(c.props)) {
    const type = '`' + esc(p.type?.name) + '`'
    const def = p.defaultValue && p.defaultValue.value !== undefined ? '`' + esc(String(p.defaultValue.value)) + '`' : ''
    md += `| \`${p.name}\` | ${type} | ${p.required ? 'yes' : ''} | ${def} | ${esc(p.description)} |\n`
  }
  md += '\n'
}

writeFileSync(OUT, md)
console.log(`✓ Wrote ${OUT} — ${docs.length} components documented`)
