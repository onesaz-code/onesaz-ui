import type { Meta, StoryObj } from '@storybook/react'
import {
  FormControl,
  FormLabel,
  FormHelperText,
  FormGroup,
  Input,
  Checkbox,
  RadioGroup,
  Radio,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  VStack,
  Button,
} from '@onesaz/ui'

const meta: Meta<typeof FormControl> = {
  title: 'Forms/FormControl',
  component: FormControl,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    error: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
    fullWidth: {
      control: 'boolean',
    },
    margin: {
      control: 'select',
      options: ['none', 'dense', 'normal'],
    },
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
    },
  },
}

export default meta
type Story = StoryObj<typeof FormControl>

export const Default: Story = {
  render: () => (
    <FormControl>
      <FormLabel>Email Address</FormLabel>
      <Input placeholder="you@example.com" />
      <FormHelperText>We'll never share your email.</FormHelperText>
    </FormControl>
  ),
}

export const Required: Story = {
  render: () => (
    <FormControl required>
      <FormLabel>Username</FormLabel>
      <Input placeholder="Enter username" />
      <FormHelperText>This field is required.</FormHelperText>
    </FormControl>
  ),
}

export const WithError: Story = {
  render: () => (
    <FormControl error>
      <FormLabel>Password</FormLabel>
      <Input type="password" defaultValue="short" error />
      <FormHelperText>Password must be at least 8 characters.</FormHelperText>
    </FormControl>
  ),
}

export const Disabled: Story = {
  render: () => (
    <FormControl disabled>
      <FormLabel>Disabled Field</FormLabel>
      <Input defaultValue="Cannot edit" disabled />
      <FormHelperText>This field is disabled.</FormHelperText>
    </FormControl>
  ),
}

export const HorizontalLayout: Story = {
  render: () => (
    <FormControl orientation="horizontal" className="w-96">
      <FormLabel className="w-24">Name</FormLabel>
      <Input placeholder="Enter your name" className="flex-1" />
    </FormControl>
  ),
}

export const FullWidth: Story = {
  render: () => (
    <div className="w-96">
      <FormControl fullWidth>
        <FormLabel>Full Width Field</FormLabel>
        <Input placeholder="Takes full width" />
      </FormControl>
    </div>
  ),
}

export const WithRadioGroup: Story = {
  render: () => (
    <FormControl>
      <FormLabel>Notification Preference</FormLabel>
      <RadioGroup defaultValue="email" className="mt-2">
        <Radio value="email" label="Email notifications" />
        <Radio value="sms" label="SMS notifications" />
        <Radio value="push" label="Push notifications" />
        <Radio value="none" label="No notifications" />
      </RadioGroup>
      <FormHelperText>Choose how you'd like to be notified.</FormHelperText>
    </FormControl>
  ),
}

export const WithCheckboxGroup: Story = {
  render: () => (
    <FormControl>
      <FormLabel>Interests</FormLabel>
      <FormGroup className="mt-2">
        <div className="flex items-center gap-2">
          <Checkbox id="tech" />
          <label htmlFor="tech" className="text-sm text-foreground">Technology</label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="design" />
          <label htmlFor="design" className="text-sm text-foreground">Design</label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="business" />
          <label htmlFor="business" className="text-sm text-foreground">Business</label>
        </div>
      </FormGroup>
      <FormHelperText>Select all that apply.</FormHelperText>
    </FormControl>
  ),
}

export const WithSelect: Story = {
  render: () => (
    <FormControl className="w-64">
      <FormLabel>Country</FormLabel>
      <Select>
        <SelectTrigger className="mt-1.5">
          <SelectValue placeholder="Select a country" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="us">United States</SelectItem>
          <SelectItem value="uk">United Kingdom</SelectItem>
          <SelectItem value="ca">Canada</SelectItem>
          <SelectItem value="au">Australia</SelectItem>
          <SelectItem value="in">India</SelectItem>
        </SelectContent>
      </Select>
      <FormHelperText>Select your country of residence.</FormHelperText>
    </FormControl>
  ),
}

export const FormGroupRow: Story = {
  render: () => (
    <FormControl>
      <FormLabel>Subscription Level</FormLabel>
      <FormGroup row className="mt-2">
        <div className="flex items-center gap-2">
          <Checkbox id="basic" />
          <label htmlFor="basic" className="text-sm text-foreground">Basic</label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="pro" defaultChecked />
          <label htmlFor="pro" className="text-sm text-foreground">Pro</label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="enterprise" />
          <label htmlFor="enterprise" className="text-sm text-foreground">Enterprise</label>
        </div>
      </FormGroup>
    </FormControl>
  ),
}

export const CompleteForm: Story = {
  render: () => (
    <div className="w-96 p-6 rounded-lg border border-border bg-card">
      <h2 className="text-lg font-semibold mb-6 text-foreground">
        Account Settings
      </h2>
      <VStack spacing={4}>
        <FormControl fullWidth required>
          <FormLabel>Display Name</FormLabel>
          <Input placeholder="John Doe" />
        </FormControl>

        <FormControl fullWidth>
          <FormLabel>Email</FormLabel>
          <Input type="email" placeholder="john@example.com" />
          <FormHelperText>Your public email address.</FormHelperText>
        </FormControl>

        <FormControl fullWidth>
          <FormLabel>Bio</FormLabel>
          <Input placeholder="Tell us about yourself" />
          <FormHelperText>Max 160 characters.</FormHelperText>
        </FormControl>

        <FormControl fullWidth>
          <FormLabel>Role</FormLabel>
          <Select>
            <SelectTrigger className="mt-1.5">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="developer">Developer</SelectItem>
              <SelectItem value="designer">Designer</SelectItem>
              <SelectItem value="manager">Manager</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <FormLabel>Email Preferences</FormLabel>
          <FormGroup className="mt-2">
            <div className="flex items-center gap-2">
              <Checkbox id="marketing" />
              <label htmlFor="marketing" className="text-sm text-foreground">Marketing emails</label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="updates" defaultChecked />
              <label htmlFor="updates" className="text-sm text-foreground">Product updates</label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="security" defaultChecked />
              <label htmlFor="security" className="text-sm text-foreground">Security alerts</label>
            </div>
          </FormGroup>
        </FormControl>

        <Button className="w-full mt-2">Save Changes</Button>
      </VStack>
    </div>
  ),
}

export const Margins: Story = {
  render: () => (
    <div className="bg-muted p-4 rounded">
      <FormControl margin="none">
        <FormLabel>No margin</FormLabel>
        <Input placeholder="margin='none'" />
      </FormControl>
      <FormControl margin="dense">
        <FormLabel>Dense margin</FormLabel>
        <Input placeholder="margin='dense'" />
      </FormControl>
      <FormControl margin="normal">
        <FormLabel>Normal margin</FormLabel>
        <Input placeholder="margin='normal'" />
      </FormControl>
      <FormControl margin="none">
        <FormLabel>Last field</FormLabel>
        <Input placeholder="No bottom margin" />
      </FormControl>
    </div>
  ),
}
