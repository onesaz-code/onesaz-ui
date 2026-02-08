import * as React from 'react'

// Import all components
import { ThemeProvider } from './theme/provider'
import { useTheme } from './theme/use-theme'
import { Button } from './components/button'
import { Input } from './components/input'
import { Textarea } from './components/textarea'
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from './components/card'
import { Badge } from './components/badge'
import { Label } from './components/label'
import { Checkbox } from './components/checkbox'
import { Switch } from './components/switch'
import { Separator } from './components/separator'
import { Select, SelectOption, SelectGroup } from './components/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from './components/dialog'
import { Spinner } from './components/spinner'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from './components/table'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from './components/pagination'
import { Combobox } from './components/combobox'

// Section wrapper component
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-8">
    <h2 className="text-xl font-semibold mb-4 text-foreground">{title}</h2>
    <div className="p-4 border border-border rounded-lg bg-background">{children}</div>
  </div>
)

// Theme toggle component
const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()
  return (
    <div className="flex items-center gap-2">
      <Label>Theme:</Label>
      <Select value={theme} onChange={(e) => setTheme(e.target.value as 'light' | 'dark' | 'system')}>
        <SelectOption value="light">Light</SelectOption>
        <SelectOption value="dark">Dark</SelectOption>
        <SelectOption value="system">System</SelectOption>
      </Select>
    </div>
  )
}

// Main Playground Component
const PlaygroundContent = () => {
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [checkboxChecked, setCheckboxChecked] = React.useState(false)
  const [switchChecked, setSwitchChecked] = React.useState(false)
  const [inputValue, setInputValue] = React.useState('')
  const [textareaValue, setTextareaValue] = React.useState('')
  const [selectValue, setSelectValue] = React.useState('')
  const [comboboxValue, setComboboxValue] = React.useState('')

  const comboboxOptions = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'solid', label: 'SolidJS' },
  ]

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground">@onesaz/ui Playground</h1>
          <ThemeToggle />
        </div>

        {/* Buttons */}
        <Section title="Button">
          <div className="flex flex-wrap gap-4">
            <Button variant="default">Default</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">🔔</Button>
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            <Button disabled>Disabled</Button>
            <Button variant="outline" disabled>Disabled Outline</Button>
          </div>
        </Section>

        {/* Input */}
        <Section title="Input">
          <div className="space-y-4 max-w-md">
            <div>
              <Label htmlFor="input-default">Default Input</Label>
              <Input
                id="input-default"
                placeholder="Enter text..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="input-disabled">Disabled Input</Label>
              <Input id="input-disabled" placeholder="Disabled..." disabled />
            </div>
            <div>
              <Label htmlFor="input-type">Email Input</Label>
              <Input id="input-type" type="email" placeholder="email@example.com" />
            </div>
          </div>
        </Section>

        {/* Textarea */}
        <Section title="Textarea">
          <div className="space-y-4 max-w-md">
            <div>
              <Label htmlFor="textarea-default">Default Textarea</Label>
              <Textarea
                id="textarea-default"
                placeholder="Enter long text..."
                value={textareaValue}
                onChange={(e) => setTextareaValue(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="textarea-disabled">Disabled Textarea</Label>
              <Textarea id="textarea-disabled" placeholder="Disabled..." disabled />
            </div>
          </div>
        </Section>

        {/* Select */}
        <Section title="Select">
          <div className="space-y-4 max-w-md">
            <div>
              <Label htmlFor="select-default">Default Select</Label>
              <Select
                id="select-default"
                value={selectValue}
                onChange={(e) => setSelectValue(e.target.value)}
              >
                <SelectOption value="">Select an option...</SelectOption>
                <SelectOption value="option1">Option 1</SelectOption>
                <SelectOption value="option2">Option 2</SelectOption>
                <SelectOption value="option3">Option 3</SelectOption>
              </Select>
            </div>
            <div>
              <Label htmlFor="select-grouped">Grouped Select</Label>
              <Select id="select-grouped">
                <SelectGroup label="Fruits">
                  <SelectOption value="apple">Apple</SelectOption>
                  <SelectOption value="banana">Banana</SelectOption>
                </SelectGroup>
                <SelectGroup label="Vegetables">
                  <SelectOption value="carrot">Carrot</SelectOption>
                  <SelectOption value="potato">Potato</SelectOption>
                </SelectGroup>
              </Select>
            </div>
            <div>
              <Label htmlFor="select-disabled">Disabled Select</Label>
              <Select id="select-disabled" disabled>
                <SelectOption value="">Disabled...</SelectOption>
              </Select>
            </div>
          </div>
        </Section>

        {/* Combobox */}
        <Section title="Combobox (Searchable Select)">
          <div className="space-y-4 max-w-md">
            <div>
              <Label>Framework</Label>
              <Combobox
                options={comboboxOptions}
                value={comboboxValue}
                onValueChange={setComboboxValue}
                placeholder="Search frameworks..."
              />
            </div>
          </div>
        </Section>

        {/* Checkbox & Switch */}
        <Section title="Checkbox & Switch">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Checkbox
                id="checkbox"
                checked={checkboxChecked}
                onChange={(e) => setCheckboxChecked(e.target.checked)}
              />
              <Label htmlFor="checkbox">Accept terms and conditions</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="checkbox-disabled" disabled />
              <Label htmlFor="checkbox-disabled">Disabled checkbox</Label>
            </div>
            <Separator />
            <div className="flex items-center gap-2">
              <Switch
                id="switch"
                checked={switchChecked}
                onChange={(e) => setSwitchChecked(e.target.checked)}
              />
              <Label htmlFor="switch">Enable notifications</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="switch-disabled" disabled />
              <Label htmlFor="switch-disabled">Disabled switch</Label>
            </div>
          </div>
        </Section>

        {/* Badge */}
        <Section title="Badge">
          <div className="flex flex-wrap gap-4">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
        </Section>

        {/* Card */}
        <Section title="Card">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card description goes here</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-foreground">This is the card content area.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="mr-2">Cancel</Button>
                <Button>Submit</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Another Card</CardTitle>
                <CardDescription>With different content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="card-input">Name</Label>
                  <Input id="card-input" placeholder="Enter name..." />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Save</Button>
              </CardFooter>
            </Card>
          </div>
        </Section>

        {/* Dialog */}
        <Section title="Dialog">
          <Button onClick={() => setDialogOpen(true)}>Open Dialog</Button>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent onClose={() => setDialogOpen(false)}>
              <DialogHeader>
                <DialogTitle>Create New Zone</DialogTitle>
                <DialogDescription>
                  Fill in the details below to create a new zone.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="zone-name">Zone Name *</Label>
                    <Input id="zone-name" placeholder="eg:hyderabad" />
                  </div>
                  <div>
                    <Label htmlFor="zone-code">Zone Code *</Label>
                    <Input id="zone-code" placeholder="eg :hyd022" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Select id="state">
                      <SelectOption value="">Select state</SelectOption>
                      <SelectOption value="telangana">TELANGANA</SelectOption>
                      <SelectOption value="andhra">ANDHRA PRADESH</SelectOption>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="district">District *</Label>
                    <Select id="district">
                      <SelectOption value="">Select District</SelectOption>
                      <SelectOption value="hyderabad">HYDERABAD</SelectOption>
                      <SelectOption value="rangareddy">RANGAREDDY</SelectOption>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  CANCEL
                </Button>
                <Button onClick={() => setDialogOpen(false)}>Create</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Section>

        {/* Table */}
        <Section title="Table">
          <Table>
            <TableCaption>A list of recent invoices</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>INV001</TableCell>
                <TableCell><Badge>Paid</Badge></TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>INV002</TableCell>
                <TableCell><Badge variant="secondary">Pending</Badge></TableCell>
                <TableCell>PayPal</TableCell>
                <TableCell className="text-right">$150.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>INV003</TableCell>
                <TableCell><Badge variant="destructive">Failed</Badge></TableCell>
                <TableCell>Bank Transfer</TableCell>
                <TableCell className="text-right">$350.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Section>

        {/* Pagination */}
        <Section title="Pagination">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious onClick={() => console.log('Previous')} />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink isActive>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink>2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink>3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext onClick={() => console.log('Next')} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </Section>

        {/* Spinner */}
        <Section title="Spinner">
          <div className="flex items-center gap-8">
            <div className="text-center">
              <Spinner size="sm" />
              <p className="text-sm text-muted-foreground mt-2">Small</p>
            </div>
            <div className="text-center">
              <Spinner size="default" />
              <p className="text-sm text-muted-foreground mt-2">Default</p>
            </div>
            <div className="text-center">
              <Spinner size="lg" />
              <p className="text-sm text-muted-foreground mt-2">Large</p>
            </div>
          </div>
        </Section>

        {/* Separator */}
        <Section title="Separator">
          <div className="space-y-4">
            <p className="text-foreground">Content above separator</p>
            <Separator />
            <p className="text-foreground">Content below separator</p>
            <div className="flex items-center h-10">
              <span className="text-foreground">Left</span>
              <Separator orientation="vertical" className="mx-4" />
              <span className="text-foreground">Right</span>
            </div>
          </div>
        </Section>

        {/* Typography Colors */}
        <Section title="Typography & Colors">
          <div className="space-y-2">
            <p className="text-foreground">text-foreground - Primary text color</p>
            <p className="text-muted-foreground">text-muted-foreground - Muted text color</p>
            <p className="text-accent">text-accent - Accent color</p>
            <p className="text-destructive">text-destructive - Destructive color</p>
          </div>
        </Section>
      </div>
    </div>
  )
}

// Exported Playground wrapped with ThemeProvider
export const Playground = () => (
  <ThemeProvider defaultTheme="light">
    <PlaygroundContent />
  </ThemeProvider>
)

export default Playground
