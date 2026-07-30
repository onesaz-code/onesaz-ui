import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { accentColors, semanticColors } from '@onesaz/tokens'

const here = dirname(fileURLToPath(import.meta.url))
const read = (p: string) => readFileSync(resolve(here, p), 'utf8')
const v4 = read('../../../tailwind-config/src/v4.css')
const globals = read('../styles/globals.css')
const generated = read('../../../tailwind-config/src/tokens.generated.css')

/**
 * Single-source-of-truth guard: the CSS token values must match the TS tokens.
 * This is the class of bug that shipped earlier (globals.css said #8b5cf6 while
 * the accent was really #6933d3). If someone changes a token in TS and forgets
 * the CSS (or vice-versa), this fails instead of silently drifting.
 */
describe('token → CSS drift guard', () => {
  const accent = accentColors.violet[6] // default accent = violet, step 6

  it('v4.css --accent matches the TS accent token', () => {
    expect(v4).toContain(`--accent: ${accent}`)
  })

  it('globals.css --accent matches the TS accent token (the earlier drift bug)', () => {
    expect(globals).toContain(`--accent: ${accent}`)
  })

  it('v4.css --accent-hover matches accent step 7', () => {
    expect(v4).toContain(`--accent-hover: ${accentColors.violet[7]}`)
  })

  it('v4.css semantic *-500 steps match the TS semantic tokens', () => {
    ;(['success', 'warning', 'error', 'info'] as const).forEach((key) => {
      expect(v4).toContain(`--color-${key}-500: ${semanticColors[key][6]}`)
    })
  })

  it('every generated semantic token appears verbatim in v4.css (generator is authoritative)', () => {
    const semanticLines = generated
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => /^--color-(success|warning|error|info)/.test(l))
    expect(semanticLines.length).toBeGreaterThan(40)
    semanticLines.forEach((line) => expect(v4).toContain(line))
  })
})
