import type { Meta, StoryObj } from '@storybook/react'
import { Grid, Box } from '@onesaz/ui'

const meta: Meta<typeof Grid> = {
  title: 'Layout/Grid',
  component: Grid,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6, 12],
    },
    spacing: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16],
    },
  },
}

export default meta
type Story = StoryObj<typeof Grid>

export const Default: Story = {
  render: () => (
    <Grid container columns={12} spacing={4}>
      <Grid item xs={12}>
        <Box p={4} rounded="md" className="bg-accent text-accent-foreground text-center">
          Full Width (12 columns)
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box p={4} rounded="md" className="bg-green-6 text-white text-center">
          Half (6 columns)
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box p={4} rounded="md" className="bg-green-6 text-white text-center">
          Half (6 columns)
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box p={4} rounded="md" className="bg-blue-6 text-white text-center">
          Third (4)
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box p={4} rounded="md" className="bg-blue-6 text-white text-center">
          Third (4)
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box p={4} rounded="md" className="bg-blue-6 text-white text-center">
          Third (4)
        </Box>
      </Grid>
    </Grid>
  ),
}

export const ResponsiveGrid: Story = {
  render: () => (
    <Grid container columns={12} spacing={4}>
      {Array.from({ length: 4 }).map((_, i) => (
        <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
          <Box p={4} rounded="md" className="bg-accent text-accent-foreground text-center">
            Item {i + 1}
          </Box>
        </Grid>
      ))}
    </Grid>
  ),
}

export const UnequalColumns: Story = {
  render: () => (
    <Grid container columns={12} spacing={4}>
      <Grid item xs={12} md={8}>
        <Box p={8} rounded="md" className="bg-accent text-accent-foreground text-center">
          Main Content (8 columns on md+)
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        <Box p={8} rounded="md" className="bg-muted text-foreground text-center">
          Sidebar (4 columns on md+)
        </Box>
      </Grid>
    </Grid>
  ),
}

export const ThreeColumnLayout: Story = {
  render: () => (
    <Grid container columns={12} spacing={4}>
      <Grid item xs={12} lg={3}>
        <Box p={4} rounded="md" className="bg-muted text-foreground min-h-[200px]">
          Left Sidebar
        </Box>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Box p={4} rounded="md" className="bg-card text-card-foreground border border-border min-h-[200px]">
          Main Content Area
        </Box>
      </Grid>
      <Grid item xs={12} lg={3}>
        <Box p={4} rounded="md" className="bg-muted text-foreground min-h-[200px]">
          Right Sidebar
        </Box>
      </Grid>
    </Grid>
  ),
}

export const CardGrid: Story = {
  render: () => (
    <Grid container columns={12} spacing={6}>
      {Array.from({ length: 6 }).map((_, i) => (
        <Grid key={i} item xs={12} sm={6} md={4}>
          <Box p={4} rounded="lg" shadow="md" className="bg-card text-card-foreground">
            <Box className="h-32 bg-muted rounded-md mb-4" />
            <Box className="font-medium text-foreground mb-2">
              Card Title {i + 1}
            </Box>
            <Box className="text-sm text-muted-foreground">
              This is a sample card in a responsive grid layout.
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  ),
}

export const DifferentSpacing: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <p className="mb-2 text-sm text-muted-foreground">spacing={2}</p>
        <Grid container columns={4} spacing={2}>
          {Array.from({ length: 4 }).map((_, i) => (
            <Grid key={i} item xs={1}>
              <Box p={4} rounded="md" className="bg-accent text-accent-foreground text-center">
                {i + 1}
              </Box>
            </Grid>
          ))}
        </Grid>
      </div>
      <div>
        <p className="mb-2 text-sm text-muted-foreground">spacing={4}</p>
        <Grid container columns={4} spacing={4}>
          {Array.from({ length: 4 }).map((_, i) => (
            <Grid key={i} item xs={1}>
              <Box p={4} rounded="md" className="bg-green-6 text-white text-center">
                {i + 1}
              </Box>
            </Grid>
          ))}
        </Grid>
      </div>
      <div>
        <p className="mb-2 text-sm text-muted-foreground">spacing={8}</p>
        <Grid container columns={4} spacing={8}>
          {Array.from({ length: 4 }).map((_, i) => (
            <Grid key={i} item xs={1}>
              <Box p={4} rounded="md" className="bg-blue-6 text-white text-center">
                {i + 1}
              </Box>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  ),
}

export const NestedGrid: Story = {
  render: () => (
    <Grid container columns={12} spacing={4}>
      <Grid item xs={12}>
        <Box p={4} rounded="md" className="bg-accent/10">
          <p className="mb-4 font-medium text-foreground">Parent Grid Item</p>
          <Grid container columns={6} spacing={2}>
            {Array.from({ length: 6 }).map((_, i) => (
              <Grid key={i} item xs={1}>
                <Box p={2} rounded="md" className="bg-accent text-accent-foreground text-center text-sm">
                  {i + 1}
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Grid>
    </Grid>
  ),
}
