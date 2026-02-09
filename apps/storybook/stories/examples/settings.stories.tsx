import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  Box,
  VStack,
  HStack,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Button,
  Avatar,
  Breadcrumbs,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  ListDivider,
  TextField,
  Switch,
  Separator,
  Badge,
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
  DrawerFooter,
  DrawerClose,
  Alert,
  AlertTitle,
  AlertDescription,
  Typography,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@onesaz/ui'

const meta: Meta = {
  title: 'Examples/Settings Page',
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj

// Icons
const UserIcon = () => (
  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
)

const BellIcon = () => (
  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
  </svg>
)

const LockIcon = () => (
  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
)

const PaletteIcon = () => (
  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z"/>
  </svg>
)

const CreditCardIcon = () => (
  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>
  </svg>
)

const ChevronRightIcon = () => (
  <svg className="h-4 w-4 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6"/>
  </svg>
)

export const Settings: Story = {
  render: function SettingsPage() {
    const [emailNotifications, setEmailNotifications] = useState(true)
    const [pushNotifications, setPushNotifications] = useState(false)
    const [marketingEmails, setMarketingEmails] = useState(false)
    const [twoFactor, setTwoFactor] = useState(true)

    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border bg-card">
          <div className="flex h-16 items-center px-6">
            <div className="font-semibold text-lg text-foreground">Settings</div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6 max-w-4xl mx-auto">
          {/* Breadcrumbs */}
          <Breadcrumbs className="mb-6">
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbPage>Settings</BreadcrumbPage>
            </BreadcrumbItem>
          </Breadcrumbs>

          {/* Page Title */}
          <div className="mb-8">
            <Typography variant="h4" className="mb-1">Account Settings</Typography>
            <Typography variant="body2" color="muted">Manage your account settings and preferences.</Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Sidebar Navigation */}
            <div className="md:col-span-1">
              <List>
                <ListItem selected className="rounded-md">
                  <UserIcon />
                  <ListItemText primary="Profile" />
                </ListItem>
                <ListItem clickable className="rounded-md">
                  <BellIcon />
                  <ListItemText primary="Notifications" />
                </ListItem>
                <ListItem clickable className="rounded-md">
                  <LockIcon />
                  <ListItemText primary="Security" />
                </ListItem>
                <ListItem clickable className="rounded-md">
                  <PaletteIcon />
                  <ListItemText primary="Appearance" />
                </ListItem>
                <ListItem clickable className="rounded-md">
                  <CreditCardIcon />
                  <ListItemText primary="Billing" />
                </ListItem>
              </List>
            </div>

            {/* Main Settings Area */}
            <div className="md:col-span-3">
              <VStack spacing={6}>
                {/* Profile Section */}
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your profile details and public information.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <VStack spacing={6}>
                      <HStack spacing={4} className="items-start">
                        <Avatar
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face"
                          name="John Doe"
                          size="lg"
                        />
                        <VStack spacing={2} className="flex-1">
                          <Typography variant="body1" fontWeight="medium">Profile Photo</Typography>
                          <Typography variant="body2" color="muted">JPG, PNG or GIF. Max size 2MB.</Typography>
                          <HStack spacing={2}>
                            <Button size="sm" variant="outline">Upload</Button>
                            <Button size="sm" variant="ghost">Remove</Button>
                          </HStack>
                        </VStack>
                      </HStack>

                      <Separator />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <TextField label="First Name" defaultValue="John" fullWidth />
                        <TextField label="Last Name" defaultValue="Doe" fullWidth />
                        <TextField label="Email" type="email" defaultValue="john@example.com" fullWidth />
                        <TextField label="Phone" type="tel" defaultValue="+1 (555) 123-4567" fullWidth />
                      </div>

                      <TextField
                        label="Bio"
                        placeholder="Tell us about yourself..."
                        helperText="Brief description for your profile."
                        fullWidth
                      />

                      <HStack className="justify-end">
                        <Button variant="outline">Cancel</Button>
                        <Button>Save Changes</Button>
                      </HStack>
                    </VStack>
                  </CardContent>
                </Card>

                {/* Notifications Section */}
                <Card>
                  <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>Configure how you receive notifications.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <List>
                      <ListItem
                        trailing={
                          <Switch
                            checked={emailNotifications}
                            onCheckedChange={setEmailNotifications}
                          />
                        }
                      >
                        <ListItemText
                          primary="Email Notifications"
                          secondary="Receive email updates about your account activity."
                        />
                      </ListItem>
                      <ListDivider />
                      <ListItem
                        trailing={
                          <Switch
                            checked={pushNotifications}
                            onCheckedChange={setPushNotifications}
                          />
                        }
                      >
                        <ListItemText
                          primary="Push Notifications"
                          secondary="Receive push notifications on your devices."
                        />
                      </ListItem>
                      <ListDivider />
                      <ListItem
                        trailing={
                          <Switch
                            checked={marketingEmails}
                            onCheckedChange={setMarketingEmails}
                          />
                        }
                      >
                        <ListItemText
                          primary="Marketing Emails"
                          secondary="Receive emails about new features and updates."
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>

                {/* Security Section */}
                <Card>
                  <CardHeader>
                    <CardTitle>Security</CardTitle>
                    <CardDescription>Manage your security preferences.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <VStack spacing={4}>
                      <Alert variant="info">
                        <AlertTitle>Two-factor authentication is enabled</AlertTitle>
                        <AlertDescription>
                          Your account is protected with two-factor authentication.
                        </AlertDescription>
                      </Alert>

                      <List>
                        <ListItem
                          trailing={
                            <Switch
                              checked={twoFactor}
                              onCheckedChange={setTwoFactor}
                            />
                          }
                        >
                          <ListItemText
                            primary="Two-Factor Authentication"
                            secondary="Add an extra layer of security to your account."
                          />
                        </ListItem>
                        <ListDivider />
                        <ListItem clickable trailing={<ChevronRightIcon />}>
                          <ListItemText
                            primary="Change Password"
                            secondary="Update your password regularly for security."
                          />
                        </ListItem>
                        <ListDivider />
                        <ListItem clickable trailing={<ChevronRightIcon />}>
                          <ListItemText
                            primary="Active Sessions"
                            secondary="Manage devices where you're logged in."
                          />
                        </ListItem>
                      </List>
                    </VStack>
                  </CardContent>
                </Card>

                {/* Danger Zone */}
                <Card className="border-destructive/50">
                  <CardHeader>
                    <CardTitle className="text-destructive">Danger Zone</CardTitle>
                    <CardDescription>Irreversible and destructive actions.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <HStack className="justify-between">
                      <div>
                        <Typography variant="body1" fontWeight="medium">Delete Account</Typography>
                        <Typography variant="body2" color="muted">
                          Permanently delete your account and all data.
                        </Typography>
                      </div>
                      <Drawer>
                        <DrawerTrigger asChild>
                          <Button variant="destructive">Delete Account</Button>
                        </DrawerTrigger>
                        <DrawerContent>
                          <DrawerHeader>
                            <DrawerTitle>Are you sure?</DrawerTitle>
                            <DrawerDescription>
                              This action cannot be undone. This will permanently delete your account
                              and remove all your data from our servers.
                            </DrawerDescription>
                          </DrawerHeader>
                          <DrawerBody>
                            <VStack spacing={4}>
                              <Alert variant="destructive">
                                <AlertTitle>Warning</AlertTitle>
                                <AlertDescription>
                                  You will lose access to all your data, including projects, files,
                                  and team memberships.
                                </AlertDescription>
                              </Alert>
                              <TextField
                                label="Type 'DELETE' to confirm"
                                placeholder="DELETE"
                                fullWidth
                              />
                            </VStack>
                          </DrawerBody>
                          <DrawerFooter>
                            <DrawerClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DrawerClose>
                            <Button variant="destructive">Delete My Account</Button>
                          </DrawerFooter>
                        </DrawerContent>
                      </Drawer>
                    </HStack>
                  </CardContent>
                </Card>
              </VStack>
            </div>
          </div>
        </main>
      </div>
    )
  },
}
