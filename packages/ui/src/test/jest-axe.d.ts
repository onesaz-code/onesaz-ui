// Ambient types for jest-axe (ships no declarations). Ambient module only —
// no imports/exports here, or it would stop being an ambient declaration.
declare module 'jest-axe' {
  export function axe(
    html: Element | string | Document,
    options?: Record<string, unknown>
  ): Promise<unknown>
  export const toHaveNoViolations: unknown
  export function configureAxe(
    options?: Record<string, unknown>
  ): (html: Element | string | Document) => Promise<unknown>
}
