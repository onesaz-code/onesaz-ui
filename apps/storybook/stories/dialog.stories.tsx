import type { Meta, StoryObj } from '@storybook/react'
import { Dialog, Button, Input, Label } from '@onesaz/ui'

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Dialog>

export const Default: Story = {
  render: () => (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </Dialog.Trigger>
      <Dialog.Content className="sm:max-w-[425px]">
        <Dialog.Header>
          <Dialog.Title>Edit profile</Dialog.Title>
          <Dialog.Description>
            Make changes to your profile here. Click save when you're done.
          </Dialog.Description>
        </Dialog.Header>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" defaultValue="@peduarte" className="col-span-3" />
          </div>
        </div>
        <Dialog.Footer>
          <Button type="submit">Save changes</Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  ),
}

export const Confirmation: Story = {
  render: () => (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button variant="destructive">Delete Account</Button>
      </Dialog.Trigger>
      <Dialog.Content className="sm:max-w-[400px]">
        <Dialog.Header>
          <Dialog.Title>Are you sure?</Dialog.Title>
          <Dialog.Description>
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </Dialog.Description>
        </Dialog.Header>
        <Dialog.Footer>
          <Dialog.Close asChild>
            <Button variant="outline">Cancel</Button>
          </Dialog.Close>
          <Button variant="destructive">Delete</Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  ),
}
