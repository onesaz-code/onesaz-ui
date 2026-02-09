import type { Meta, StoryObj } from '@storybook/react'
import { TextField, VStack, HStack, Button, InputAdornment } from '@onesaz/ui'
import { useState } from 'react'

const meta: Meta<typeof TextField> = {
  title: 'Forms/TextField',
  component: TextField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
    },
  },
}

export default meta
type Story = StoryObj<typeof TextField>

export const Default: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
  },
}

export const WithHelperText: Story = {
  args: {
    label: 'Password',
    type: 'password',
    helperText: 'Password must be at least 8 characters',
    placeholder: 'Enter password',
  },
}

export const WithError: Story = {
  args: {
    label: 'Email',
    type: 'email',
    errorMessage: 'Please enter a valid email address',
    defaultValue: 'invalid-email',
  },
}

export const Required: Story = {
  args: {
    label: 'Full Name',
    required: true,
    placeholder: 'Enter your full name',
  },
}

export const Sizes: Story = {
  render: () => (
    <VStack spacing={6} className="w-80">
      <TextField label="Small" size="sm" placeholder="Small input" />
      <TextField label="Medium (default)" size="md" placeholder="Medium input" />
      <TextField label="Large" size="lg" placeholder="Large input" />
    </VStack>
  ),
}

export const Disabled: Story = {
  args: {
    label: 'Disabled Field',
    disabled: true,
    defaultValue: 'Cannot edit this',
  },
}

export const FullWidth: Story = {
  render: () => (
    <div className="w-96">
      <TextField
        label="Full Width Field"
        fullWidth
        placeholder="This input takes full width"
      />
    </div>
  ),
}

export const InputTypes: Story = {
  render: () => (
    <VStack spacing={6} className="w-80">
      <TextField label="Text" type="text" placeholder="Enter text" />
      <TextField label="Email" type="email" placeholder="you@example.com" />
      <TextField label="Password" type="password" placeholder="••••••••" />
      <TextField label="Number" type="number" placeholder="0" />
      <TextField label="Phone" type="tel" placeholder="+1 (555) 000-0000" />
      <TextField label="URL" type="url" placeholder="https://example.com" />
    </VStack>
  ),
}

export const WithStartAdornment: Story = {
  render: () => (
    <VStack spacing={6} className="w-80">
      <TextField
        label="Price"
        placeholder="0.00"
        startAdornment={<span className="text-muted-foreground">$</span>}
      />
      <TextField
        label="Website"
        placeholder="example.com"
        startAdornment={
          <span className="text-muted-foreground text-sm">https://</span>
        }
      />
      <TextField
        label="Search"
        placeholder="Search..."
        startAdornment={
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        }
      />
    </VStack>
  ),
}

export const WithEndAdornment: Story = {
  render: () => (
    <VStack spacing={6} className="w-80">
      <TextField
        label="Weight"
        type="number"
        placeholder="0"
        endAdornment={<span className="text-muted-foreground">kg</span>}
      />
      <TextField
        label="Email"
        placeholder="username"
        endAdornment={<span className="text-muted-foreground">@gmail.com</span>}
      />
    </VStack>
  ),
}

export const WithInputAdornment: Story = {
  name: 'With InputAdornment Component',
  render: () => (
    <VStack spacing={6} className="w-80">
      <TextField
        label="Price"
        placeholder="0.00"
        startAdornment={
          <InputAdornment position="start">$</InputAdornment>
        }
      />
      <TextField
        label="Search"
        placeholder="Search..."
        startAdornment={
          <InputAdornment position="start">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            <kbd className="px-1.5 py-0.5 text-xs bg-muted rounded">⌘K</kbd>
          </InputAdornment>
        }
      />
      <TextField
        label="Weight"
        type="number"
        placeholder="0"
        endAdornment={
          <InputAdornment position="end">kg</InputAdornment>
        }
      />
    </VStack>
  ),
}

export const FormExample: Story = {
  render: function FormExample() {
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    })
    const [errors, setErrors] = useState<Record<string, string>>({})

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      const newErrors: Record<string, string> = {}

      if (!formData.firstName) newErrors.firstName = 'First name is required'
      if (!formData.lastName) newErrors.lastName = 'Last name is required'
      if (!formData.email) newErrors.email = 'Email is required'
      else if (!/\S+@\S+\.\S+/.test(formData.email))
        newErrors.email = 'Invalid email format'
      if (!formData.password) newErrors.password = 'Password is required'
      else if (formData.password.length < 8)
        newErrors.password = 'Password must be at least 8 characters'

      setErrors(newErrors)

      if (Object.keys(newErrors).length === 0) {
        alert('Form submitted successfully!')
      }
    }

    return (
      <form onSubmit={handleSubmit} className="w-96 space-y-4">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Create Account
        </h2>
        <HStack spacing={4}>
          <TextField
            label="First Name"
            required
            fullWidth
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            errorMessage={errors.firstName}
          />
          <TextField
            label="Last Name"
            required
            fullWidth
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            errorMessage={errors.lastName}
          />
        </HStack>
        <TextField
          label="Email"
          type="email"
          required
          fullWidth
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          errorMessage={errors.email}
          helperText={!errors.email ? "We'll never share your email" : undefined}
        />
        <TextField
          label="Password"
          type="password"
          required
          fullWidth
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          errorMessage={errors.password}
          helperText={!errors.password ? 'At least 8 characters' : undefined}
        />
        <Button type="submit" className="w-full">
          Create Account
        </Button>
      </form>
    )
  },
}

export const LoginForm: Story = {
  render: () => (
    <div className="w-80 p-6 rounded-lg border border-border bg-card">
      <h2 className="text-xl font-semibold text-center mb-6 text-foreground">
        Welcome Back
      </h2>
      <VStack spacing={4}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          placeholder="you@example.com"
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          placeholder="••••••••"
        />
        <Button className="w-full mt-2">Sign In</Button>
      </VStack>
      <p className="text-sm text-center mt-4 text-muted-foreground">
        Don't have an account?{' '}
        <a href="#" className="text-accent hover:underline">
          Sign up
        </a>
      </p>
    </div>
  ),
}
