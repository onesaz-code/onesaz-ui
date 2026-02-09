import type { Meta, StoryObj } from '@storybook/react'
import {
  TopBar,
  TopBarBrand,
  TopBarNav,
  TopBarNavItem,
  TopBarSection,
  TopBarDivider,
  Button,
  Avatar,
  Input,
  InputAdornment,
  Badge,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@onesaz/ui'

const meta: Meta<typeof TopBar> = {
  title: 'Layout/TopBar',
  component: TopBar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof TopBar>

// Icons
const SearchIcon = () => (
  <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
  </svg>
)

const BellIcon = () => (
  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
  </svg>
)

const MenuIcon = () => (
  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>
  </svg>
)

const LogoIcon = () => (
  <svg className="h-8 w-8 text-accent" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
  </svg>
)

export const Default: Story = {
  render: () => (
    <TopBar>
      <TopBarBrand name="Onesaz" logo={<LogoIcon />} href="#" />
      <TopBarSection align="right">
        <Button variant="ghost" size="icon">
          <BellIcon />
        </Button>
        <Avatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
          name="John Doe"
          size="sm"
        />
      </TopBarSection>
    </TopBar>
  ),
}

export const WithNavigation: Story = {
  render: () => (
    <TopBar>
      <TopBarBrand name="Dashboard" logo={<LogoIcon />} />
      <TopBarDivider />
      <TopBarNav>
        <TopBarNavItem href="#" active>Dashboard</TopBarNavItem>
        <TopBarNavItem href="#">Projects</TopBarNavItem>
        <TopBarNavItem href="#">Team</TopBarNavItem>
        <TopBarNavItem href="#">Reports</TopBarNavItem>
      </TopBarNav>
      <TopBarSection align="right">
        <Button>New Project</Button>
      </TopBarSection>
    </TopBar>
  ),
}

export const WithSearch: Story = {
  render: () => (
    <TopBar>
      <TopBarBrand name="Onesaz" logo={<LogoIcon />} />
      <TopBarSection align="center" className="flex-1 max-w-md mx-8">
        <Input
          placeholder="Search..."
          className="w-full"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </TopBarSection>
      <TopBarSection align="right">
        <Button variant="ghost" size="icon">
          <BellIcon />
        </Button>
        <Avatar name="John Doe" size="sm" />
      </TopBarSection>
    </TopBar>
  ),
}

export const WithUserMenu: Story = {
  render: () => (
    <TopBar>
      <TopBarBrand name="Onesaz Admin" logo={<LogoIcon />} />
      <TopBarNav className="ml-8">
        <TopBarNavItem href="#" active>Overview</TopBarNavItem>
        <TopBarNavItem href="#">Analytics</TopBarNavItem>
        <TopBarNavItem href="#">Settings</TopBarNavItem>
      </TopBarNav>
      <TopBarSection align="right">
        <div className="relative">
          <Button variant="ghost" size="icon">
            <BellIcon />
          </Button>
          <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
            3
          </Badge>
        </div>
        <TopBarDivider />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 cursor-pointer hover:opacity-80">
              <Avatar
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
                name="John Doe"
                size="sm"
              />
              <span className="text-sm font-medium hidden sm:block">John Doe</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span className="font-medium">John Doe</span>
                <span className="text-xs text-muted-foreground">john@example.com</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TopBarSection>
    </TopBar>
  ),
}

export const MobileWithHamburger: Story = {
  render: () => (
    <TopBar>
      <Button variant="ghost" size="icon" className="md:hidden">
        <MenuIcon />
      </Button>
      <TopBarBrand name="Onesaz" logo={<LogoIcon />} />
      <TopBarNav className="hidden md:flex ml-8">
        <TopBarNavItem href="#" active>Home</TopBarNavItem>
        <TopBarNavItem href="#">Features</TopBarNavItem>
        <TopBarNavItem href="#">Pricing</TopBarNavItem>
        <TopBarNavItem href="#">Contact</TopBarNavItem>
      </TopBarNav>
      <TopBarSection align="right">
        <Button variant="outline" className="hidden sm:flex">Sign In</Button>
        <Button>Get Started</Button>
      </TopBarSection>
    </TopBar>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <TopBar size="sm">
        <TopBarBrand name="Small TopBar" logo={<LogoIcon />} />
        <TopBarSection align="right">
          <span className="text-sm text-muted-foreground">size="sm"</span>
        </TopBarSection>
      </TopBar>
      <TopBar size="md">
        <TopBarBrand name="Medium TopBar (default)" logo={<LogoIcon />} />
        <TopBarSection align="right">
          <span className="text-sm text-muted-foreground">size="md"</span>
        </TopBarSection>
      </TopBar>
      <TopBar size="lg">
        <TopBarBrand name="Large TopBar" logo={<LogoIcon />} />
        <TopBarSection align="right">
          <span className="text-sm text-muted-foreground">size="lg"</span>
        </TopBarSection>
      </TopBar>
    </div>
  ),
}

export const Sticky: Story = {
  render: () => (
    <div className="h-[400px] overflow-auto bg-muted/30">
      <TopBar sticky>
        <TopBarBrand name="Sticky TopBar" logo={<LogoIcon />} />
        <TopBarSection align="right">
          <span className="text-sm text-muted-foreground">Scroll down to see sticky behavior</span>
        </TopBarSection>
      </TopBar>
      <div className="p-8 space-y-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="p-4 bg-card rounded-lg border border-border">
            Content block {i + 1}
          </div>
        ))}
      </div>
    </div>
  ),
}
