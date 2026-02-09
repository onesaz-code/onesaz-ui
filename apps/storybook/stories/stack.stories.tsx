import type { Meta, StoryObj } from '@storybook/react'
import { Stack, HStack, VStack, Box, Separator } from '@onesaz/ui'

const meta: Meta<typeof Stack> = {
  title: 'Layout/Stack',
  component: Stack,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['row', 'row-reverse', 'column', 'column-reverse'],
    },
    spacing: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16],
    },
    align: {
      control: 'select',
      options: ['start', 'end', 'center', 'baseline', 'stretch'],
    },
    justify: {
      control: 'select',
      options: ['start', 'end', 'center', 'between', 'around', 'evenly'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Stack>

export const Default: Story = {
  render: () => (
    <Stack spacing={4}>
      <Box p={4} rounded="md" className="bg-accent text-accent-foreground">Item 1</Box>
      <Box p={4} rounded="md" className="bg-accent text-accent-foreground">Item 2</Box>
      <Box p={4} rounded="md" className="bg-accent text-accent-foreground">Item 3</Box>
    </Stack>
  ),
}

export const Horizontal: Story = {
  render: () => (
    <Stack direction="row" spacing={4}>
      <Box p={4} rounded="md" className="bg-green-6 text-white">Item 1</Box>
      <Box p={4} rounded="md" className="bg-green-6 text-white">Item 2</Box>
      <Box p={4} rounded="md" className="bg-green-6 text-white">Item 3</Box>
    </Stack>
  ),
}

export const HStackHelper: Story = {
  render: () => (
    <HStack spacing={4}>
      <Box p={4} rounded="md" className="bg-blue-6 text-white">Item 1</Box>
      <Box p={4} rounded="md" className="bg-blue-6 text-white">Item 2</Box>
      <Box p={4} rounded="md" className="bg-blue-6 text-white">Item 3</Box>
    </HStack>
  ),
}

export const VStackHelper: Story = {
  render: () => (
    <VStack spacing={4}>
      <Box p={4} rounded="md" className="bg-orange-6 text-white">Item 1</Box>
      <Box p={4} rounded="md" className="bg-orange-6 text-white">Item 2</Box>
      <Box p={4} rounded="md" className="bg-orange-6 text-white">Item 3</Box>
    </VStack>
  ),
}

export const WithDivider: Story = {
  render: () => (
    <Stack spacing={4} divider={<Separator />}>
      <Box className="text-foreground">First item</Box>
      <Box className="text-foreground">Second item</Box>
      <Box className="text-foreground">Third item</Box>
    </Stack>
  ),
}

export const Alignment: Story = {
  render: () => (
    <Stack spacing={8}>
      <div>
        <p className="mb-2 text-sm text-muted-foreground">align="start"</p>
        <HStack spacing={4} align="start" className="bg-muted p-4 h-24">
          <Box p={2} className="bg-accent text-accent-foreground h-8">Short</Box>
          <Box p={2} className="bg-accent text-accent-foreground h-16">Medium</Box>
          <Box p={2} className="bg-accent text-accent-foreground h-12">Tall</Box>
        </HStack>
      </div>
      <div>
        <p className="mb-2 text-sm text-muted-foreground">align="center"</p>
        <HStack spacing={4} align="center" className="bg-muted p-4 h-24">
          <Box p={2} className="bg-green-6 text-white h-8">Short</Box>
          <Box p={2} className="bg-green-6 text-white h-16">Medium</Box>
          <Box p={2} className="bg-green-6 text-white h-12">Tall</Box>
        </HStack>
      </div>
      <div>
        <p className="mb-2 text-sm text-muted-foreground">align="end"</p>
        <HStack spacing={4} align="end" className="bg-muted p-4 h-24">
          <Box p={2} className="bg-red-6 text-white h-8">Short</Box>
          <Box p={2} className="bg-red-6 text-white h-16">Medium</Box>
          <Box p={2} className="bg-red-6 text-white h-12">Tall</Box>
        </HStack>
      </div>
    </Stack>
  ),
}

export const Justification: Story = {
  render: () => (
    <VStack spacing={6} className="w-96">
      <div className="w-full">
        <p className="mb-2 text-sm text-muted-foreground">justify="start"</p>
        <HStack spacing={2} justify="start" className="bg-muted p-2">
          <Box p={2} className="bg-accent text-accent-foreground text-xs">1</Box>
          <Box p={2} className="bg-accent text-accent-foreground text-xs">2</Box>
          <Box p={2} className="bg-accent text-accent-foreground text-xs">3</Box>
        </HStack>
      </div>
      <div className="w-full">
        <p className="mb-2 text-sm text-muted-foreground">justify="center"</p>
        <HStack spacing={2} justify="center" className="bg-muted p-2">
          <Box p={2} className="bg-green-6 text-white text-xs">1</Box>
          <Box p={2} className="bg-green-6 text-white text-xs">2</Box>
          <Box p={2} className="bg-green-6 text-white text-xs">3</Box>
        </HStack>
      </div>
      <div className="w-full">
        <p className="mb-2 text-sm text-muted-foreground">justify="end"</p>
        <HStack spacing={2} justify="end" className="bg-muted p-2">
          <Box p={2} className="bg-blue-6 text-white text-xs">1</Box>
          <Box p={2} className="bg-blue-6 text-white text-xs">2</Box>
          <Box p={2} className="bg-blue-6 text-white text-xs">3</Box>
        </HStack>
      </div>
      <div className="w-full">
        <p className="mb-2 text-sm text-muted-foreground">justify="between"</p>
        <HStack spacing={2} justify="between" className="bg-muted p-2">
          <Box p={2} className="bg-orange-6 text-white text-xs">1</Box>
          <Box p={2} className="bg-orange-6 text-white text-xs">2</Box>
          <Box p={2} className="bg-orange-6 text-white text-xs">3</Box>
        </HStack>
      </div>
    </VStack>
  ),
}

export const Wrapping: Story = {
  render: () => (
    <Stack direction="row" spacing={2} wrap="wrap" className="w-64 bg-muted p-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <Box key={i} p={3} rounded="md" className="bg-accent text-accent-foreground">
          Item {i + 1}
        </Box>
      ))}
    </Stack>
  ),
}
