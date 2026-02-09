import type { Meta, StoryObj } from '@storybook/react'
import { Typography, H1, H2, H3, H4, H5, H6, Text, Caption, VStack } from '@onesaz/ui'

const meta: Meta<typeof Typography> = {
  title: 'Typography/Typography',
  component: Typography,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'caption', 'overline'],
    },
    color: {
      control: 'select',
      options: ['inherit', 'primary', 'secondary', 'success', 'warning', 'error', 'info', 'muted', 'white', 'dark'],
    },
    fontWeight: {
      control: 'select',
      options: ['light', 'regular', 'medium', 'semibold', 'bold'],
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right', 'justify'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Typography>

export const Default: Story = {
  args: {
    children: 'This is a paragraph of text using the Typography component.',
    variant: 'body1',
  },
}

export const AllVariants: Story = {
  render: () => (
    <VStack spacing={4} align="start">
      <Typography variant="h1">Heading 1</Typography>
      <Typography variant="h2">Heading 2</Typography>
      <Typography variant="h3">Heading 3</Typography>
      <Typography variant="h4">Heading 4</Typography>
      <Typography variant="h5">Heading 5</Typography>
      <Typography variant="h6">Heading 6</Typography>
      <Typography variant="subtitle1">Subtitle 1</Typography>
      <Typography variant="subtitle2">Subtitle 2</Typography>
      <Typography variant="body1">Body 1 - Default paragraph text</Typography>
      <Typography variant="body2">Body 2 - Smaller paragraph text</Typography>
      <Typography variant="caption">Caption - Small helper text</Typography>
      <Typography variant="overline">OVERLINE TEXT</Typography>
    </VStack>
  ),
}

export const HelperComponents: Story = {
  render: () => (
    <VStack spacing={4} align="start">
      <H1>H1 Component</H1>
      <H2>H2 Component</H2>
      <H3>H3 Component</H3>
      <H4>H4 Component</H4>
      <H5>H5 Component</H5>
      <H6>H6 Component</H6>
      <Text>Text Component (body1)</Text>
      <Caption>Caption Component</Caption>
    </VStack>
  ),
}

export const Colors: Story = {
  render: () => (
    <VStack spacing={3} align="start">
      <Typography variant="h5" color="primary">Primary Color</Typography>
      <Typography variant="h5" color="secondary">Secondary Color</Typography>
      <Typography variant="h5" color="success">Success Color</Typography>
      <Typography variant="h5" color="warning">Warning Color</Typography>
      <Typography variant="h5" color="error">Error Color</Typography>
      <Typography variant="h5" color="info">Info Color</Typography>
      <Typography variant="h5" color="muted">Muted Color</Typography>
      <Typography variant="h5" color="dark">Dark Color</Typography>
      <div className="bg-foreground p-2 rounded">
        <Typography variant="h5" color="white">White Color</Typography>
      </div>
    </VStack>
  ),
}

export const FontWeights: Story = {
  render: () => (
    <VStack spacing={3} align="start">
      <Typography variant="body1" fontWeight="light">Light Weight (300)</Typography>
      <Typography variant="body1" fontWeight="regular">Regular Weight (400)</Typography>
      <Typography variant="body1" fontWeight="medium">Medium Weight (500)</Typography>
      <Typography variant="body1" fontWeight="semibold">Semibold Weight (600)</Typography>
      <Typography variant="body1" fontWeight="bold">Bold Weight (700)</Typography>
    </VStack>
  ),
}

export const TextTransform: Story = {
  render: () => (
    <VStack spacing={3} align="start">
      <Typography textTransform="uppercase">UPPERCASE text</Typography>
      <Typography textTransform="lowercase">lowercase text</Typography>
      <Typography textTransform="capitalize">capitalize text</Typography>
      <Typography textTransform="none">Normal text</Typography>
    </VStack>
  ),
}

export const TextAlignment: Story = {
  render: () => (
    <VStack spacing={4} className="w-96">
      <Typography align="left" className="w-full bg-muted p-2">
        Left aligned text
      </Typography>
      <Typography align="center" className="w-full bg-muted p-2">
        Center aligned text
      </Typography>
      <Typography align="right" className="w-full bg-muted p-2">
        Right aligned text
      </Typography>
      <Typography align="justify" className="w-full bg-muted p-2">
        Justified text that wraps to multiple lines will have even spacing between words on each line except the last.
      </Typography>
    </VStack>
  ),
}

export const TextGradient: Story = {
  render: () => (
    <VStack spacing={4} align="start">
      <Typography variant="h2" textGradient gradientColor="primary">
        Primary Gradient
      </Typography>
      <Typography variant="h2" textGradient gradientColor="info">
        Info Gradient
      </Typography>
      <Typography variant="h2" textGradient gradientColor="success">
        Success Gradient
      </Typography>
      <Typography variant="h2" textGradient gradientColor="warning">
        Warning Gradient
      </Typography>
      <Typography variant="h2" textGradient gradientColor="error">
        Error Gradient
      </Typography>
      <Typography variant="h2" textGradient gradientColor="dark">
        Dark Gradient
      </Typography>
    </VStack>
  ),
}

export const GutterBottom: Story = {
  render: () => (
    <div className="bg-muted p-4">
      <Typography variant="h3" gutterBottom>
        Heading with gutter
      </Typography>
      <Typography variant="body1">
        This paragraph follows the heading with proper spacing.
      </Typography>
    </div>
  ),
}

export const NoWrap: Story = {
  render: () => (
    <div className="w-48 bg-muted p-4">
      <Typography noWrap>
        This is a very long text that will be truncated with ellipsis when it overflows
      </Typography>
    </div>
  ),
}

export const Paragraph: Story = {
  render: () => (
    <div className="max-w-xl">
      <Typography variant="h3" gutterBottom>
        Article Title
      </Typography>
      <Typography paragraph>
        This is the first paragraph with proper bottom margin. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </Typography>
      <Typography paragraph>
        This is the second paragraph. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </Typography>
      <Typography>
        This is the last paragraph without extra margin.
      </Typography>
    </div>
  ),
}

export const PolymorphicAs: Story = {
  render: () => (
    <VStack spacing={3} align="start">
      <Typography as="span" variant="h4">
        H4 styled as span
      </Typography>
      <Typography as="div" variant="body1">
        Body1 styled as div
      </Typography>
      <Typography as="label" variant="body2">
        Body2 styled as label
      </Typography>
    </VStack>
  ),
}
