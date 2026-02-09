import type { Meta, StoryObj } from '@storybook/react'
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
  DrawerFooter,
  DrawerClose,
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetBody,
  SheetFooter,
  Button,
  Input,
  Label,
} from '@onesaz/ui'

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer',
  component: Drawer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Drawer>

export const Default: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Drawer Title</DrawerTitle>
          <DrawerDescription>
            This is a description of the drawer content.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <p>Your drawer content goes here. This is the main body of the drawer.</p>
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
          <Button>Save Changes</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}

export const LeftSide: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Open Left Drawer</Button>
      </DrawerTrigger>
      <DrawerContent side="left">
        <DrawerHeader>
          <DrawerTitle>Left Drawer</DrawerTitle>
          <DrawerDescription>
            This drawer slides in from the left.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <p>Content for the left-side drawer.</p>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  ),
}

export const TopSide: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Open Top Drawer</Button>
      </DrawerTrigger>
      <DrawerContent side="top">
        <DrawerHeader>
          <DrawerTitle>Top Drawer</DrawerTitle>
          <DrawerDescription>
            This drawer slides in from the top.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <p>Content for the top drawer.</p>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  ),
}

export const BottomSide: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Open Bottom Drawer</Button>
      </DrawerTrigger>
      <DrawerContent side="bottom">
        <DrawerHeader>
          <DrawerTitle>Bottom Drawer</DrawerTitle>
          <DrawerDescription>
            This drawer slides in from the bottom.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <p>Content for the bottom drawer.</p>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  ),
}

export const AllSides: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">Left</Button>
        </DrawerTrigger>
        <DrawerContent side="left">
          <DrawerHeader>
            <DrawerTitle>Left Drawer</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            <p>Left side content</p>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">Right</Button>
        </DrawerTrigger>
        <DrawerContent side="right">
          <DrawerHeader>
            <DrawerTitle>Right Drawer</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            <p>Right side content</p>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">Top</Button>
        </DrawerTrigger>
        <DrawerContent side="top">
          <DrawerHeader>
            <DrawerTitle>Top Drawer</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            <p>Top side content</p>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">Bottom</Button>
        </DrawerTrigger>
        <DrawerContent side="bottom">
          <DrawerHeader>
            <DrawerTitle>Bottom Drawer</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            <p>Bottom side content</p>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  ),
}

export const WithForm: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Edit Profile</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Edit Profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you're done.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="john@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Input id="bio" defaultValue="Software developer" />
            </div>
          </div>
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
          <Button>Save Changes</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}

export const NoCloseButton: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent showClose={false}>
        <DrawerHeader>
          <DrawerTitle>No Close Button</DrawerTitle>
          <DrawerDescription>
            This drawer doesn't have a close button. Use the footer buttons or click outside.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <p>Content without a close button.</p>
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}

export const LongContent: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Open Long Content</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Terms and Conditions</DrawerTitle>
          <DrawerDescription>
            Please read the following terms carefully.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <div className="space-y-4">
            {Array.from({ length: 20 }).map((_, i) => (
              <p key={i}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
            ))}
          </div>
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Decline</Button>
          </DrawerClose>
          <Button>Accept</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}

// Sheet alias examples
export const SheetAlias: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sheet Component</SheetTitle>
          <SheetDescription>
            Sheet is an alias for Drawer. Both work the same way.
          </SheetDescription>
        </SheetHeader>
        <SheetBody>
          <p>Sheet content goes here.</p>
        </SheetBody>
        <SheetFooter>
          <Button>Done</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
}

export const NavigationDrawer: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </Button>
      </DrawerTrigger>
      <DrawerContent side="left" className="w-64">
        <DrawerHeader>
          <DrawerTitle>Navigation</DrawerTitle>
        </DrawerHeader>
        <DrawerBody className="p-0">
          <nav className="space-y-1 p-4">
            {['Dashboard', 'Projects', 'Tasks', 'Team', 'Settings'].map((item) => (
              <DrawerClose key={item} asChild>
                <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-muted">
                  {item}
                </button>
              </DrawerClose>
            ))}
          </nav>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  ),
}
