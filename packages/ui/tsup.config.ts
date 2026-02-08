import { defineConfig } from 'tsup'
import { copyFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
  sourcemap: true,
  external: ['react', 'react-dom'],
  injectStyle: false,
  onSuccess: async () => {
    // Copy styles.css to dist folder
    copyFileSync(
      resolve(__dirname, 'src/styles/styles.css'),
      resolve(__dirname, 'dist/styles.css')
    )
    console.log('✓ Copied styles.css to dist/')
  },
})
