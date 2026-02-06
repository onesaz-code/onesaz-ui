import type { Meta, StoryObj } from '@storybook/react'
import { Pagination } from '@onesaz/ui'

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Pagination>

export const Default: Story = {
  render: () => (
    <Pagination>
      <Pagination.Content>
        <Pagination.Item>
          <Pagination.Previous />
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Link>1</Pagination.Link>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Link isActive>2</Pagination.Link>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Link>3</Pagination.Link>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Ellipsis />
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Link>10</Pagination.Link>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Next />
        </Pagination.Item>
      </Pagination.Content>
    </Pagination>
  ),
}

export const Simple: Story = {
  render: () => (
    <Pagination>
      <Pagination.Content>
        <Pagination.Item>
          <Pagination.Previous />
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Next />
        </Pagination.Item>
      </Pagination.Content>
    </Pagination>
  ),
}

export const WithNumbers: Story = {
  render: () => (
    <Pagination>
      <Pagination.Content>
        <Pagination.Item>
          <Pagination.Link>1</Pagination.Link>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Link>2</Pagination.Link>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Link isActive>3</Pagination.Link>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Link>4</Pagination.Link>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Link>5</Pagination.Link>
        </Pagination.Item>
      </Pagination.Content>
    </Pagination>
  ),
}
