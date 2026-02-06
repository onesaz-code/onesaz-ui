import type { Meta, StoryObj } from '@storybook/react'
import { Table, Badge } from '@onesaz/ui'

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Table>

const invoices = [
  { id: 'INV001', status: 'Paid', method: 'Credit Card', amount: '$250.00' },
  { id: 'INV002', status: 'Pending', method: 'PayPal', amount: '$150.00' },
  { id: 'INV003', status: 'Unpaid', method: 'Bank Transfer', amount: '$350.00' },
  { id: 'INV004', status: 'Paid', method: 'Credit Card', amount: '$450.00' },
  { id: 'INV005', status: 'Paid', method: 'PayPal', amount: '$550.00' },
]

export const Default: Story = {
  render: () => (
    <Table>
      <Table.Caption>A list of your recent invoices.</Table.Caption>
      <Table.Header>
        <Table.Row>
          <Table.Head className="w-[100px]">Invoice</Table.Head>
          <Table.Head>Status</Table.Head>
          <Table.Head>Method</Table.Head>
          <Table.Head className="text-right">Amount</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {invoices.map((invoice) => (
          <Table.Row key={invoice.id}>
            <Table.Cell className="font-medium">{invoice.id}</Table.Cell>
            <Table.Cell>
              <Badge
                variant={
                  invoice.status === 'Paid'
                    ? 'default'
                    : invoice.status === 'Pending'
                    ? 'secondary'
                    : 'destructive'
                }
              >
                {invoice.status}
              </Badge>
            </Table.Cell>
            <Table.Cell>{invoice.method}</Table.Cell>
            <Table.Cell className="text-right">{invoice.amount}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
}

export const WithFooter: Story = {
  render: () => (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.Head>Product</Table.Head>
          <Table.Head>Quantity</Table.Head>
          <Table.Head className="text-right">Price</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Widget A</Table.Cell>
          <Table.Cell>2</Table.Cell>
          <Table.Cell className="text-right">$50.00</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Widget B</Table.Cell>
          <Table.Cell>1</Table.Cell>
          <Table.Cell className="text-right">$75.00</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Widget C</Table.Cell>
          <Table.Cell>3</Table.Cell>
          <Table.Cell className="text-right">$25.00</Table.Cell>
        </Table.Row>
      </Table.Body>
      <Table.Footer>
        <Table.Row>
          <Table.Cell colSpan={2}>Total</Table.Cell>
          <Table.Cell className="text-right font-bold">$200.00</Table.Cell>
        </Table.Row>
      </Table.Footer>
    </Table>
  ),
}

export const Simple: Story = {
  render: () => (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.Head>Name</Table.Head>
          <Table.Head>Email</Table.Head>
          <Table.Head>Role</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>John Doe</Table.Cell>
          <Table.Cell>john@example.com</Table.Cell>
          <Table.Cell>Admin</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Jane Smith</Table.Cell>
          <Table.Cell>jane@example.com</Table.Cell>
          <Table.Cell>User</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  ),
}
