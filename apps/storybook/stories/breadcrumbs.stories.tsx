import type { Meta, StoryObj } from '@storybook/react'
import {
  Breadcrumbs,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@onesaz/ui'

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Breadcrumbs>

export const Default: Story = {
  render: () => (
    <Breadcrumbs>
      <BreadcrumbItem href="#">Home</BreadcrumbItem>
      <BreadcrumbItem href="#">Products</BreadcrumbItem>
      <BreadcrumbItem current>Electronics</BreadcrumbItem>
    </Breadcrumbs>
  ),
}

export const WithLinks: Story = {
  render: () => (
    <Breadcrumbs>
      <BreadcrumbLink href="#">Home</BreadcrumbLink>
      <BreadcrumbLink href="#">Library</BreadcrumbLink>
      <BreadcrumbLink href="#">Books</BreadcrumbLink>
      <BreadcrumbPage>Current Page</BreadcrumbPage>
    </Breadcrumbs>
  ),
}

export const CustomSeparator: Story = {
  render: () => (
    <div className="space-y-4">
      <Breadcrumbs separator="/">
        <BreadcrumbItem href="#">Home</BreadcrumbItem>
        <BreadcrumbItem href="#">Products</BreadcrumbItem>
        <BreadcrumbItem current>Category</BreadcrumbItem>
      </Breadcrumbs>

      <Breadcrumbs separator="•">
        <BreadcrumbItem href="#">Home</BreadcrumbItem>
        <BreadcrumbItem href="#">Products</BreadcrumbItem>
        <BreadcrumbItem current>Category</BreadcrumbItem>
      </Breadcrumbs>

      <Breadcrumbs separator="→">
        <BreadcrumbItem href="#">Home</BreadcrumbItem>
        <BreadcrumbItem href="#">Products</BreadcrumbItem>
        <BreadcrumbItem current>Category</BreadcrumbItem>
      </Breadcrumbs>
    </div>
  ),
}

export const CustomSeparatorIcon: Story = {
  render: () => (
    <Breadcrumbs
      separator={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-muted-foreground"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      }
    >
      <BreadcrumbItem href="#">Home</BreadcrumbItem>
      <BreadcrumbItem href="#">Dashboard</BreadcrumbItem>
      <BreadcrumbItem href="#">Settings</BreadcrumbItem>
      <BreadcrumbItem current>Profile</BreadcrumbItem>
    </Breadcrumbs>
  ),
}

export const Collapsed: Story = {
  render: () => (
    <Breadcrumbs maxItems={4} itemsBeforeCollapse={1} itemsAfterCollapse={2}>
      <BreadcrumbItem href="#">Home</BreadcrumbItem>
      <BreadcrumbItem href="#">Category</BreadcrumbItem>
      <BreadcrumbItem href="#">Subcategory</BreadcrumbItem>
      <BreadcrumbItem href="#">Products</BreadcrumbItem>
      <BreadcrumbItem href="#">Electronics</BreadcrumbItem>
      <BreadcrumbItem current>Smartphones</BreadcrumbItem>
    </Breadcrumbs>
  ),
}

export const WithClickHandlers: Story = {
  render: () => (
    <Breadcrumbs>
      <BreadcrumbItem onClick={() => console.log('Home clicked')}>
        Home
      </BreadcrumbItem>
      <BreadcrumbItem onClick={() => console.log('Products clicked')}>
        Products
      </BreadcrumbItem>
      <BreadcrumbItem onClick={() => console.log('Category clicked')}>
        Category
      </BreadcrumbItem>
      <BreadcrumbItem current>Current Item</BreadcrumbItem>
    </Breadcrumbs>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <Breadcrumbs>
      <BreadcrumbItem href="#" className="flex items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
        Home
      </BreadcrumbItem>
      <BreadcrumbItem href="#" className="flex items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 3v18h18" />
          <path d="m19 9-5 5-4-4-3 3" />
        </svg>
        Dashboard
      </BreadcrumbItem>
      <BreadcrumbItem current className="flex items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
        Settings
      </BreadcrumbItem>
    </Breadcrumbs>
  ),
}

export const LongPath: Story = {
  render: () => (
    <div className="max-w-md">
      <Breadcrumbs>
        <BreadcrumbItem href="#">Home</BreadcrumbItem>
        <BreadcrumbItem href="#">Category with a very long name</BreadcrumbItem>
        <BreadcrumbItem href="#">Subcategory</BreadcrumbItem>
        <BreadcrumbItem current>Current page with long title</BreadcrumbItem>
      </Breadcrumbs>
    </div>
  ),
}

export const SingleItem: Story = {
  render: () => (
    <Breadcrumbs>
      <BreadcrumbItem current>Home</BreadcrumbItem>
    </Breadcrumbs>
  ),
}

export const TwoItems: Story = {
  render: () => (
    <Breadcrumbs>
      <BreadcrumbItem href="#">Home</BreadcrumbItem>
      <BreadcrumbItem current>Dashboard</BreadcrumbItem>
    </Breadcrumbs>
  ),
}

export const InCard: Story = {
  render: () => (
    <div className="p-4 border rounded-lg bg-card w-[400px]">
      <Breadcrumbs className="mb-4">
        <BreadcrumbItem href="#">Home</BreadcrumbItem>
        <BreadcrumbItem href="#">Products</BreadcrumbItem>
        <BreadcrumbItem current>Details</BreadcrumbItem>
      </Breadcrumbs>
      <h2 className="text-xl font-semibold mb-2">Product Details</h2>
      <p className="text-muted-foreground text-sm">
        View and manage your product information here.
      </p>
    </div>
  ),
}
