// Theme
export { ThemeProvider, type ThemeProviderProps } from './theme/provider'
export { useTheme } from './theme/use-theme'
export { ThemeContext, type ThemeContextValue } from './theme/context'

// Utils
export { cn } from './utils/cn'

// Components
export { Button, type ButtonProps } from './components/button'
export { Input, type InputProps } from './components/input'
export { Textarea, type TextareaProps } from './components/textarea'
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from './components/card'
export { Badge, type BadgeProps } from './components/badge'
export { Label, type LabelProps } from './components/label'
export { Checkbox, type CheckboxProps } from './components/checkbox'
export { Switch, type SwitchProps } from './components/switch'
export { Separator, type SeparatorProps } from './components/separator'

// Compound Components
export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
  // Native select for simple use cases
  NativeSelect,
  NativeSelectOption,
  type NativeSelectProps,
  type NativeSelectOptionProps,
} from './components/select'

export {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  type DialogProps,
  type DialogContentProps,
} from './components/dialog'

// New Components
export { Spinner, type SpinnerProps } from './components/spinner'
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from './components/table'
export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  type PaginationProps,
  type PaginationLinkProps,
} from './components/pagination'
export { Combobox, type ComboboxProps, type ComboboxOption } from './components/combobox'

// Playground - for testing all components
export { Playground } from './playground'
