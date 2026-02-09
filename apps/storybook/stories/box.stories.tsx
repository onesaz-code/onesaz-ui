import type { Meta, StoryObj } from '@storybook/react'
import { Box } from '@onesaz/ui'

const meta: Meta<typeof Box> = {
  title: 'Layout/Box',
  component: Box,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    display: {
      control: 'select',
      options: ['block', 'inline-block', 'inline', 'flex', 'inline-flex', 'grid', 'inline-grid', 'none'],
    },
    p: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16],
    },
    rounded: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl', '2xl', 'full'],
    },
    shadow: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Box>

export const Default: Story = {
  args: {
    children: 'Basic Box',
    p: 4,
    className: 'bg-muted',
  },
}

export const FlexContainer: Story = {
  render: () => (
    <Box display="flex" gap={4} p={4} className="bg-muted">
      <Box p={4} rounded="md" className="bg-accent text-accent-foreground">Item 1</Box>
      <Box p={4} rounded="md" className="bg-accent text-accent-foreground">Item 2</Box>
      <Box p={4} rounded="md" className="bg-accent text-accent-foreground">Item 3</Box>
    </Box>
  ),
}

export const FlexColumn: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap={2} p={4} className="bg-muted">
      <Box p={3} rounded="md" className="bg-green-6 text-white">Row 1</Box>
      <Box p={3} rounded="md" className="bg-green-6 text-white">Row 2</Box>
      <Box p={3} rounded="md" className="bg-green-6 text-white">Row 3</Box>
    </Box>
  ),
}

export const CenteredContent: Story = {
  render: () => (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      h="screen"
      className="bg-muted"
      style={{ height: '200px', width: '300px' }}
    >
      <Box p={4} rounded="lg" shadow="md" className="bg-card text-card-foreground">
        Centered Box
      </Box>
    </Box>
  ),
}

export const WithShadows: Story = {
  render: () => (
    <Box display="flex" gap={6} p={4}>
      <Box p={4} rounded="md" shadow="sm" className="bg-card text-card-foreground">
        Small Shadow
      </Box>
      <Box p={4} rounded="md" shadow="md" className="bg-card text-card-foreground">
        Medium Shadow
      </Box>
      <Box p={4} rounded="md" shadow="lg" className="bg-card text-card-foreground">
        Large Shadow
      </Box>
      <Box p={4} rounded="md" shadow="xl" className="bg-card text-card-foreground">
        XL Shadow
      </Box>
    </Box>
  ),
}

export const BorderRadius: Story = {
  render: () => (
    <Box display="flex" gap={4} p={4}>
      <Box p={4} rounded="none" className="bg-accent text-accent-foreground">None</Box>
      <Box p={4} rounded="sm" className="bg-accent text-accent-foreground">SM</Box>
      <Box p={4} rounded="md" className="bg-accent text-accent-foreground">MD</Box>
      <Box p={4} rounded="lg" className="bg-accent text-accent-foreground">LG</Box>
      <Box p={4} rounded="xl" className="bg-accent text-accent-foreground">XL</Box>
      <Box p={4} rounded="full" className="bg-accent text-accent-foreground">Full</Box>
    </Box>
  ),
}

export const Spacing: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap={2}>
      <Box p={2} className="bg-blue-2 text-blue-10">Padding 2 (8px)</Box>
      <Box p={4} className="bg-blue-3 text-blue-10">Padding 4 (16px)</Box>
      <Box p={6} className="bg-blue-4 text-blue-10">Padding 6 (24px)</Box>
      <Box p={8} className="bg-blue-5 text-blue-10">Padding 8 (32px)</Box>
    </Box>
  ),
}

export const PolymorphicAs: Story = {
  render: () => (
    <Box display="flex" gap={4} alignItems="center">
      <Box as="section" p={4} rounded="md" className="bg-muted text-foreground">
        As Section
      </Box>
      <Box as="article" p={4} rounded="md" className="bg-muted text-foreground">
        As Article
      </Box>
      <Box as="span" p={4} rounded="md" display="inline-block" className="bg-muted text-foreground">
        As Span
      </Box>
    </Box>
  ),
}
