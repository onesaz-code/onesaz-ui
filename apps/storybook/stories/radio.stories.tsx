import type { Meta, StoryObj } from '@storybook/react'
import { RadioGroup, RadioGroupItem, Radio, FormControl, FormLabel, VStack, HStack, Label } from '@onesaz/ui'
import { useState } from 'react'

const meta: Meta<typeof RadioGroup> = {
  title: 'Forms/Radio',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
}

export default meta
type Story = StoryObj<typeof RadioGroup>

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="option-1">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-1" id="option-1" />
        <Label htmlFor="option-1">Option 1</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-2" id="option-2" />
        <Label htmlFor="option-2">Option 2</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-3" id="option-3" />
        <Label htmlFor="option-3">Option 3</Label>
      </div>
    </RadioGroup>
  ),
}

export const WithRadioComponent: Story = {
  render: () => (
    <RadioGroup defaultValue="comfortable">
      <Radio value="default" label="Default spacing" />
      <Radio value="comfortable" label="Comfortable spacing" />
      <Radio value="compact" label="Compact spacing" />
    </RadioGroup>
  ),
}

export const WithDescriptions: Story = {
  render: () => (
    <RadioGroup defaultValue="standard">
      <Radio
        value="standard"
        label="Standard"
        description="Basic account with limited features"
      />
      <Radio
        value="premium"
        label="Premium"
        description="All features with priority support"
      />
      <Radio
        value="enterprise"
        label="Enterprise"
        description="Custom solutions for large organizations"
      />
    </RadioGroup>
  ),
}

export const Horizontal: Story = {
  render: () => (
    <RadioGroup defaultValue="option-1" orientation="horizontal">
      <Radio value="option-1" label="Option 1" />
      <Radio value="option-2" label="Option 2" />
      <Radio value="option-3" label="Option 3" />
    </RadioGroup>
  ),
}

export const Sizes: Story = {
  render: () => (
    <VStack spacing={8} align="start">
      <div>
        <p className="mb-2 text-sm text-muted-foreground">Small (sm)</p>
        <RadioGroup defaultValue="sm-1" size="sm">
          <Radio value="sm-1" label="Small option 1" />
          <Radio value="sm-2" label="Small option 2" />
        </RadioGroup>
      </div>
      <div>
        <p className="mb-2 text-sm text-muted-foreground">Medium (md) - Default</p>
        <RadioGroup defaultValue="md-1" size="md">
          <Radio value="md-1" label="Medium option 1" />
          <Radio value="md-2" label="Medium option 2" />
        </RadioGroup>
      </div>
      <div>
        <p className="mb-2 text-sm text-muted-foreground">Large (lg)</p>
        <RadioGroup defaultValue="lg-1" size="lg">
          <Radio value="lg-1" label="Large option 1" />
          <Radio value="lg-2" label="Large option 2" />
        </RadioGroup>
      </div>
    </VStack>
  ),
}

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="option-1">
      <Radio value="option-1" label="Enabled option" />
      <Radio value="option-2" label="Disabled option" disabled />
      <Radio value="option-3" label="Another enabled option" />
    </RadioGroup>
  ),
}

export const WithFormControl: Story = {
  render: () => (
    <FormControl>
      <FormLabel>Notification preferences</FormLabel>
      <RadioGroup defaultValue="all" className="mt-2">
        <Radio value="all" label="All notifications" />
        <Radio value="important" label="Important only" />
        <Radio value="none" label="None" />
      </RadioGroup>
    </FormControl>
  ),
}

export const Controlled: Story = {
  render: function ControlledRadio() {
    const [value, setValue] = useState('apple')

    return (
      <VStack spacing={4}>
        <RadioGroup value={value} onValueChange={setValue}>
          <Radio value="apple" label="Apple" />
          <Radio value="banana" label="Banana" />
          <Radio value="orange" label="Orange" />
        </RadioGroup>
        <p className="text-sm text-muted-foreground">
          Selected: <strong>{value}</strong>
        </p>
      </VStack>
    )
  },
}

export const PaymentMethods: Story = {
  render: () => (
    <FormControl className="w-80">
      <FormLabel>Payment Method</FormLabel>
      <RadioGroup defaultValue="card" className="mt-3">
        <Radio
          value="card"
          label="Credit/Debit Card"
          description="Pay securely with your card"
        />
        <Radio
          value="paypal"
          label="PayPal"
          description="Pay using your PayPal account"
        />
        <Radio
          value="bank"
          label="Bank Transfer"
          description="Direct transfer from your bank"
        />
        <Radio
          value="crypto"
          label="Cryptocurrency"
          description="Pay with Bitcoin or Ethereum"
        />
      </RadioGroup>
    </FormControl>
  ),
}

export const PlanSelection: Story = {
  render: function PlanSelect() {
    const [plan, setPlan] = useState('pro')

    return (
      <div className="w-96">
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Select a plan
        </h3>
        <RadioGroup value={plan} onValueChange={setPlan}>
          <div className={`p-4 rounded-lg border-2 mb-3 cursor-pointer transition-colors ${
            plan === 'free'
              ? 'border-accent bg-accent/10'
              : 'border-border'
          }`}>
            <Radio
              value="free"
              label="Free"
              description="For personal projects and testing"
            />
            <p className="mt-2 text-sm font-semibold text-foreground ml-8">
              $0/month
            </p>
          </div>
          <div className={`p-4 rounded-lg border-2 mb-3 cursor-pointer transition-colors ${
            plan === 'pro'
              ? 'border-accent bg-accent/10'
              : 'border-border'
          }`}>
            <Radio
              value="pro"
              label="Pro"
              description="For growing teams and businesses"
            />
            <p className="mt-2 text-sm font-semibold text-foreground ml-8">
              $29/month
            </p>
          </div>
          <div className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
            plan === 'enterprise'
              ? 'border-accent bg-accent/10'
              : 'border-border'
          }`}>
            <Radio
              value="enterprise"
              label="Enterprise"
              description="For large organizations with custom needs"
            />
            <p className="mt-2 text-sm font-semibold text-foreground ml-8">
              Custom pricing
            </p>
          </div>
        </RadioGroup>
      </div>
    )
  },
}
