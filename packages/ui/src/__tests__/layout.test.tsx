import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Box } from '../components/box'
import { Stack, HStack, VStack } from '../components/stack'
import { Container } from '../components/container'
import { Grid } from '../components/grid'

const cls = (ui: React.ReactElement) => (render(ui).container.firstChild as HTMLElement)

describe('Box layout props', () => {
  it('grow → flex-1, shrink={false} → shrink-0', () => {
    expect(cls(<Box grow shrink={false} />).className).toContain('flex-1')
    expect(cls(<Box shrink={false} />).className).toContain('shrink-0')
  })
  it('minH / minW map to min-h-0 / min-w-0', () => {
    expect(cls(<Box minH={0} />).className).toContain('min-h-0')
    expect(cls(<Box minW={0} />).className).toContain('min-w-0')
  })
  it('per-side padding + inset offsets + z', () => {
    const el = cls(<Box pt={4} pb={2} position="fixed" top={0} z={40} inset />)
    expect(el.className).toContain('pt-4')
    expect(el.className).toContain('pb-2')
    expect(el.className).toContain('fixed')
    expect(el.className).toContain('top-0')
    expect(el.className).toContain('z-40')
    expect(el.className).toContain('inset-0')
  })
  it('numeric width/height apply inline style', () => {
    const el = cls(<Box width={260} height={40} />)
    expect(el.style.width).toBe('260px')
    expect(el.style.height).toBe('40px')
  })
  it('keeps existing gap/justifyContent/alignItems', () => {
    const el = cls(<Box gap={4} justifyContent="between" alignItems="center" />)
    expect(el.className).toContain('gap-4')
    expect(el.className).toContain('justify-between')
    expect(el.className).toContain('items-center')
  })
})

describe('Stack vocabulary aliases', () => {
  it('accepts Box vocabulary (gap/justifyContent/alignItems)', () => {
    const el = cls(<Stack gap={4} justifyContent="between" alignItems="center" />)
    expect(el.className).toContain('gap-4')
    expect(el.className).toContain('justify-between')
    expect(el.className).toContain('items-center')
  })
  it('accepts original vocabulary (spacing/justify/align)', () => {
    const el = cls(<Stack spacing={6} justify="center" align="start" />)
    expect(el.className).toContain('gap-6')
    expect(el.className).toContain('justify-center')
    expect(el.className).toContain('items-start')
  })
  it('padding props + flexWrap alias + grow', () => {
    const el = cls(<Stack p={4} px={2} py={6} flexWrap="wrap" grow />)
    expect(el.className).toContain('p-4')
    expect(el.className).toContain('px-2')
    expect(el.className).toContain('py-6')
    expect(el.className).toContain('flex-wrap')
    expect(el.className).toContain('flex-1')
  })
  it('HStack is a row, VStack is a column', () => {
    expect(cls(<HStack />).className).toContain('flex-row')
    expect(cls(<VStack />).className).toContain('flex-col')
  })
})

describe('Container', () => {
  it('defaults to lg (max-w-6xl) and centers', () => {
    const el = cls(<Container />)
    expect(el.className).toContain('max-w-6xl')
    expect(el.className).toContain('mx-auto')
  })
  it('maps maxWidth to the right class', () => {
    expect(cls(<Container maxWidth="sm" />).className).toContain('max-w-2xl')
    expect(cls(<Container maxWidth="xl" />).className).toContain('max-w-7xl')
  })
})

describe('Grid ergonomic API', () => {
  it('any non-item Grid is a grid container', () => {
    const el = cls(<Grid columns={4} gap={4} />)
    expect(el.className).toContain('grid')
    expect(el.className).toContain('grid-cols-4')
    expect(el.className).toContain('gap-4')
  })
  it('responsive columns object generates breakpoint classes', () => {
    const el = cls(<Grid columns={{ default: 1, md: 2, lg: 4 }} />)
    expect(el.className).toContain('grid-cols-1')
    expect(el.className).toContain('md:grid-cols-2')
    expect(el.className).toContain('lg:grid-cols-4')
  })
  it('item renders column spans, not a grid', () => {
    const el = cls(<Grid item xs={6} />)
    expect(el.className).toContain('col-span-6')
    expect(el.className).not.toContain('grid-cols')
  })
  it('MUI-style container + item still works', () => {
    const el = cls(<Grid container columns={12} spacing={4} />)
    expect(el.className).toContain('grid')
    expect(el.className).toContain('grid-cols-12')
    expect(el.className).toContain('gap-4')
  })
})
