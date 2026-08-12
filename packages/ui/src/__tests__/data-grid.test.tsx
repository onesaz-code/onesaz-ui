import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DataGrid, type GridColDef } from '../components/data-grid'

type Row = { id: number; symbol: string; pl: number }

const rows: Row[] = [
  { id: 1, symbol: 'AAPL', pl: 3494 },
  { id: 2, symbol: 'NVDA', pl: -4218 },
]

describe('DataGrid conditional cellClassName', () => {
  it('applies a value-derived class per cell (no renderCell needed)', () => {
    const columns: GridColDef<Row>[] = [
      { field: 'symbol', headerName: 'Symbol' },
      {
        field: 'pl',
        headerName: 'P/L',
        align: 'right',
        cellClassName: (p) => (p.value < 0 ? 'pl-negative' : 'pl-positive'),
      },
    ]
    render(<DataGrid rows={rows} columns={columns} getRowId={(r) => r.id} hideFooter autoHeight />)

    const positive = screen.getByText('3494').closest('.pl-positive')
    const negative = screen.getByText('-4218').closest('.pl-negative')
    expect(positive).toBeTruthy()
    expect(negative).toBeTruthy()
  })

  it('still accepts a plain string cellClassName', () => {
    const columns: GridColDef<Row>[] = [
      { field: 'symbol', headerName: 'Symbol', cellClassName: 'mono-cell' },
    ]
    render(<DataGrid rows={rows} columns={columns} getRowId={(r) => r.id} hideFooter autoHeight />)
    expect(screen.getByText('AAPL').closest('.mono-cell')).toBeTruthy()
  })
})
