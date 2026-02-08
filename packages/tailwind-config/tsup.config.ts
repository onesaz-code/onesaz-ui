import { defineConfig } from 'tsup'
import { copyFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  sourcemap: true,
  onSuccess: async () => {
    // Copy v4.css to dist folder
    copyFileSync(
      resolve(__dirname, 'src/v4.css'),
      resolve(__dirname, 'dist/v4.css')
    )
    console.log('✓ Copied v4.css to dist/')
  },
})
