import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  Box,
  Container,
  HStack,
  VStack,
  Grid,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  Button,
  IconButton,
  Badge,
  Chip,
  Input,
  TextField,
  Label,
  Checkbox,
  RadioGroup,
  RadioGroupItem,
  Separator,
  Typography,
  Stat,
  Stepper,
  SelectField,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@onesaz/ui'

const meta: Meta = {
  title: 'Examples/Checkout',
  parameters: { layout: 'fullscreen' },
}
export default meta
type Story = StoryObj

/* ------------------------------------------------------------------ *
 * Inline icons (library ships no icon set — SVG per the brief)
 * ------------------------------------------------------------------ */
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5"><path d="M20 6 9 17l-5-5" /></svg>
)
const CartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 2-1.58l1.65-7.42H5.12" /></svg>
)
const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><rect width="18" height="11" x="3" y="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
)
const TruckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" /><path d="M15 18H9" /><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14" /><circle cx="17" cy="18" r="2" /><circle cx="7" cy="18" r="2" /></svg>
)
const TagIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" /><circle cx="7.5" cy="7.5" r=".5" fill="currentColor" /></svg>
)
const MinusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className="h-3.5 w-3.5"><path d="M5 12h14" /></svg>
)
const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className="h-3.5 w-3.5"><path d="M12 5v14M5 12h14" /></svg>
)

/* ------------------------------------------------------------------ *
 * Static data
 * ------------------------------------------------------------------ */
const LINE_ITEMS = [
  { id: 1, name: 'Aeron Ergonomic Chair', variant: 'Graphite · Size B', price: 84900, qty: 1, emoji: '\u{1FA91}' },
  { id: 2, name: 'Standing Desk Converter', variant: 'Walnut · 32"', price: 21500, qty: 1, emoji: '\u{1F5A5}️' },
  { id: 3, name: 'Mechanical Keyboard', variant: 'Brown switches', price: 8990, qty: 2, emoji: '⌨️' },
]
const STATES = ['Karnataka', 'Maharashtra', 'Delhi', 'Tamil Nadu', 'Telangana', 'Gujarat', 'West Bengal', 'Kerala']
const inr = (n: number) => '₹' + n.toLocaleString('en-IN')

const SUBTOTAL = LINE_ITEMS.reduce((s, i) => s + i.price * i.qty, 0)
const TAX = Math.round(SUBTOTAL * 0.18)

const STEPS = ['Cart', 'Shipping', 'Payment', 'Review'] as const

/* Stepper header — RESOLVED: now the library <Stepper> component (was ~40
 * lines of hand-styled circles + connector). */

/* ------------------------------------------------------------------ *
 * Page shell: topbar + stepper + responsive 2-col grid
 * ------------------------------------------------------------------ */
function Shell({
  current,
  left,
  right,
}: {
  current: number
  left: React.ReactNode
  right: React.ReactNode
}) {
  return (
    // OVERRIDE: min-h-screen bg-muted/30 — no "page background" prop on Box
    <Box className="min-h-screen bg-muted/30">
      <Box as="header" className="border-b border-border bg-card">
        <Container maxWidth="xl">
          <HStack alignItems="center" justifyContent="between" py={4}>
            <HStack alignItems="center" gap={2}>
              <span className="text-accent"><CartIcon /></span>
              <Typography variant="h6" className="font-bold">Onesaz Store</Typography>
            </HStack>
            <HStack alignItems="center" gap={1} className="text-muted-foreground">
              <LockIcon />
              <Typography variant="caption">Secure checkout</Typography>
            </HStack>
          </HStack>
        </Container>
      </Box>

      <Box className="border-b border-border bg-card">
        <Container maxWidth="xl"><Stepper steps={STEPS.map((label) => ({ label }))} active={current} className="justify-center" /></Container>
      </Box>

      <Container maxWidth="xl">
        <Box py={8}>
          <Grid container columns={{ default: 1, lg: 12 }} gap={8}>
            <Grid item lg={8}>{left}</Grid>
            <Grid item lg={4}>{right}</Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}

/* ------------------------------------------------------------------ *
 * Order summary — STICKY sidebar
 * FINDING #4: no sticky-helper. Box has position="sticky" but no `top`
 * scale, so the offset is a raw className.
 * FINDING #7: no order-summary / line-item-row primitive.
 * ------------------------------------------------------------------ */
function OrderSummary({
  cta,
  editableQty = false,
}: {
  cta: string
  editableQty?: boolean
}) {
  const [qtys, setQtys] = useState<Record<number, number>>(
    Object.fromEntries(LINE_ITEMS.map((i) => [i.id, i.qty]))
  )
  const [promo, setPromo] = useState('')
  const [applied, setApplied] = useState<string | null>(null)

  const subtotal = LINE_ITEMS.reduce((s, i) => s + i.price * qtys[i.id], 0)
  const discount = applied ? Math.round(subtotal * 0.1) : 0
  const tax = Math.round((subtotal - discount) * 0.18)
  const total = subtotal - discount + 249 + tax

  const setQty = (id: number, d: number) =>
    setQtys((q) => ({ ...q, [id]: Math.max(1, q[id] + d) }))

  return (
    // OVERRIDE: sticky top-6 — no offset token on Box position="sticky"
    <Box position="sticky" className="top-6">
      <Card>
        <CardHeader className="pb-4">
          <CardTitle size="md">Order summary</CardTitle>
        </CardHeader>
        <CardContent>
          <VStack gap={4}>
            {/* line items */}
            <VStack gap={4}>
              {LINE_ITEMS.map((item) => (
                <HStack key={item.id} gap={3} alignItems="start">
                  {/* OVERRIDE: fixed thumbnail tile — no Thumbnail/Media primitive */}
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md border border-border bg-muted text-2xl">
                    {item.emoji}
                  </span>
                  <VStack gap={1} className="min-w-0 flex-1">
                    <Typography variant="body2" className="truncate font-medium">{item.name}</Typography>
                    <Typography variant="caption" className="text-muted-foreground">{item.variant}</Typography>
                    {editableQty ? (
                      // FINDING #6: no quantity-stepper component
                      <HStack alignItems="center" gap={2} className="mt-1">
                        <IconButton size="sm" variant="outlined" aria-label="Decrease" onClick={() => setQty(item.id, -1)}><MinusIcon /></IconButton>
                        <span className="w-6 text-center text-sm tabular-nums">{qtys[item.id]}</span>
                        <IconButton size="sm" variant="outlined" aria-label="Increase" onClick={() => setQty(item.id, 1)}><PlusIcon /></IconButton>
                      </HStack>
                    ) : (
                      <Typography variant="caption" className="text-muted-foreground">Qty {qtys[item.id]}</Typography>
                    )}
                  </VStack>
                  <Typography variant="body2" className="shrink-0 font-semibold tabular-nums">
                    {inr(item.price * qtys[item.id])}
                  </Typography>
                </HStack>
              ))}
            </VStack>

            <Separator />

            {/* promo — FINDING #5: no input-with-attached-button primitive */}
            <VStack gap={2}>
              <Label htmlFor="promo">Promo code</Label>
              <HStack gap={2}>
                {/* OVERRIDE: flex-1 so Input shares row with the button */}
                <Input
                  id="promo"
                  placeholder="WELCOME10"
                  value={promo}
                  onChange={(e) => setPromo(e.target.value)}
                  startAdornment={<TagIcon />}
                  className="flex-1"
                  containerClassName="flex-1"
                />
                <Button variant="outlined" onClick={() => promo && setApplied(promo)}>Apply</Button>
              </HStack>
              {applied && (
                <HStack alignItems="center" gap={2}>
                  <Chip size="small" color="success" label={applied} onDelete={() => setApplied(null)} />
                  <Typography variant="caption" className="text-success-600 dark:text-success-400">10% off applied</Typography>
                </HStack>
              )}
            </VStack>

            <Separator />

            {/* totals */}
            <VStack gap={2}>
              <SummaryRow label="Subtotal" value={inr(subtotal)} />
              {discount > 0 && <SummaryRow label="Discount" value={'−' + inr(discount)} accent />}
              <SummaryRow label="Shipping" value={inr(249)} />
              <SummaryRow label="Tax (GST 18%)" value={inr(tax)} />
              <Separator />
              <HStack justifyContent="between" alignItems="center">
                <Typography variant="subtitle1" className="font-semibold">Total</Typography>
                <Typography variant="h6" className="font-bold tabular-nums">{inr(total)}</Typography>
              </HStack>
            </VStack>
          </VStack>
        </CardContent>
        <CardFooter className="flex-col items-stretch gap-2">
          <Button fullWidth size="lg">{cta}</Button>
          <HStack alignItems="center" justifyContent="center" gap={1} className="text-muted-foreground">
            <LockIcon />
            <Typography variant="caption">256-bit SSL encrypted</Typography>
          </HStack>
        </CardFooter>
      </Card>
    </Box>
  )
}

function SummaryRow({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <HStack justifyContent="between" alignItems="center">
      <Typography variant="body2" className="text-muted-foreground">{label}</Typography>
      <Typography variant="body2" className={accent ? 'font-medium tabular-nums text-success-600 dark:text-success-400' : 'font-medium tabular-nums'}>{value}</Typography>
    </HStack>
  )
}

/* ------------------------------------------------------------------ *
 * Delivery method — RadioGroup rendered as selectable cards
 * FINDING #2: no RadioCard. Whole-card selection state is wired by
 * hand (controlled RadioGroup + conditional border on a Label).
 * ------------------------------------------------------------------ */
const DELIVERY = [
  { value: 'standard', title: 'Standard', desc: '5–7 business days', price: 'Free' },
  { value: 'express', title: 'Express', desc: '2–3 business days', price: inr(99) },
  { value: 'overnight', title: 'Overnight', desc: 'Next business day', price: inr(249) },
]

function DeliveryCards() {
  const [value, setValue] = useState('express')
  return (
    <RadioGroup value={value} onValueChange={setValue}>
      <Grid container columns={{ default: 1, sm: 3 }} gap={3}>
        {DELIVERY.map((d) => {
          const selected = value === d.value
          return (
            // OVERRIDE: whole label is the click target + selected border ring.
            // No RadioCard primitive, so the container styling is hand-rolled.
            <Label
              key={d.value}
              htmlFor={`del-${d.value}`}
              className={[
                'flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors',
                selected ? 'border-accent ring-1 ring-accent bg-accent/5' : 'border-border hover:border-accent/50',
              ].join(' ')}
            >
              <RadioGroupItem id={`del-${d.value}`} value={d.value} className="mt-0.5" />
              <VStack gap={1} className="flex-1">
                <HStack alignItems="center" gap={1}><TruckIcon /><span className="font-medium">{d.title}</span></HStack>
                <Typography variant="caption" className="text-muted-foreground">{d.desc}</Typography>
                <Typography variant="body2" className="font-semibold">{d.price}</Typography>
              </VStack>
            </Label>
          )
        })}
      </Grid>
    </RadioGroup>
  )
}

/* ------------------------------------------------------------------ *
 * Shipping-address form
 * FINDING #3: TextField bundles label+input+helper/error cleanly, but
 * Select has NO field wrapper — label/required/helper must be assembled
 * from Label + Select by hand (see StateField).
 * ------------------------------------------------------------------ */
function StateField() {
  const [state, setState] = useState<string>('')
  // RESOLVED: now the library <SelectField> — same label/helper structure as
  // TextField, so it aligns with the City input with no hand-built wrapper.
  return (
    <SelectField
      label="State"
      required
      placeholder="Select state"
      helperText="Determines applicable GST slab."
      value={state}
      onValueChange={setState}
      options={STATES.map((s) => ({ value: s, label: s }))}
    />
  )
}

function ShippingForm() {
  return (
    <VStack gap={6}>
      <Card>
        <CardHeader><CardTitle size="md">Shipping address</CardTitle></CardHeader>
        <CardContent>
          <Grid container columns={{ default: 1, sm: 2 }} gap={4} alignItems="start">
            <Grid item sm={2}><TextField label="Full name" placeholder="Aarav Sharma" required fullWidth /></Grid>
            <Grid item sm={2}><TextField label="Address" placeholder="Flat 4B, 12 MG Road" required fullWidth /></Grid>
            <TextField label="City" placeholder="Bengaluru" required fullWidth />
            <StateField />
            <TextField label="ZIP / PIN code" placeholder="560001" required fullWidth />
            <TextField label="Phone" type="tel" placeholder="+91 98765 43210" required fullWidth helperText="For delivery updates only." />
          </Grid>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle size="md">Delivery method</CardTitle></CardHeader>
        <CardContent><DeliveryCards /></CardContent>
      </Card>
    </VStack>
  )
}

/* ------------------------------------------------------------------ *
 * Payment form (FAKE fields only — no real capture)
 * ------------------------------------------------------------------ */
const SAVED_CARDS = [
  { value: 'visa', brand: 'Visa', last4: '4242', exp: '08/27' },
  { value: 'mc', brand: 'Mastercard', last4: '5555', exp: '11/26' },
]

function PaymentForm() {
  const [mode, setMode] = useState('new')
  const [sameAsShipping, setSameAsShipping] = useState(true)
  return (
    <VStack gap={6}>
      <Card>
        <CardHeader>
          <HStack alignItems="center" justifyContent="between">
            <CardTitle size="md">Payment</CardTitle>
            <Badge variant="soft" color="info">Demo — no real charge</Badge>
          </HStack>
        </CardHeader>
        <CardContent>
          <RadioGroup value={mode} onValueChange={setMode}>
            <VStack gap={3}>
              {/* saved cards */}
              {SAVED_CARDS.map((c) => {
                const selected = mode === c.value
                return (
                  <Label
                    key={c.value}
                    htmlFor={`card-${c.value}`}
                    className={[
                      'flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors',
                      selected ? 'border-accent ring-1 ring-accent bg-accent/5' : 'border-border hover:border-accent/50',
                    ].join(' ')}
                  >
                    <RadioGroupItem id={`card-${c.value}`} value={c.value} />
                    <HStack alignItems="center" justifyContent="between" className="flex-1">
                      <HStack alignItems="center" gap={2}>
                        <Badge variant="outlined" bg>{c.brand}</Badge>
                        <span className="tabular-nums">•••• {c.last4}</span>
                      </HStack>
                      <Typography variant="caption" className="text-muted-foreground">Exp {c.exp}</Typography>
                    </HStack>
                  </Label>
                )
              })}

              {/* new card */}
              <Label
                htmlFor="card-new"
                className={[
                  'flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors',
                  mode === 'new' ? 'border-accent ring-1 ring-accent bg-accent/5' : 'border-border hover:border-accent/50',
                ].join(' ')}
              >
                <RadioGroupItem id="card-new" value="new" className="mt-1" />
                <VStack gap={4} className="flex-1">
                  <span className="font-medium">Use a new card</span>
                  {mode === 'new' && (
                    <Grid container columns={{ default: 1, sm: 2 }} gap={4}>
                      <Grid item sm={2}>
                        <TextField label="Card number" placeholder="4242 4242 4242 4242" fullWidth inputMode="numeric" autoComplete="off" endAdornment={<LockIcon />} />
                      </Grid>
                      <TextField label="Expiry" placeholder="MM / YY" fullWidth autoComplete="off" />
                      <TextField label="CVC" placeholder="123" fullWidth autoComplete="off" />
                      <Grid item sm={2}><TextField label="Name on card" placeholder="Aarav Sharma" fullWidth autoComplete="off" /></Grid>
                    </Grid>
                  )}
                </VStack>
              </Label>
            </VStack>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle size="md">Billing address</CardTitle></CardHeader>
        <CardContent>
          <VStack gap={4}>
            <HStack alignItems="center" gap={2}>
              <Checkbox id="same" checked={sameAsShipping} onChange={(e) => setSameAsShipping(e.target.checked)} />
              <Label htmlFor="same" className="cursor-pointer">Same as shipping address</Label>
            </HStack>
            {!sameAsShipping && (
              <Grid container columns={{ default: 1, sm: 2 }} gap={4}>
                <Grid item sm={2}><TextField label="Address" placeholder="Billing address" fullWidth /></Grid>
                <TextField label="City" placeholder="City" fullWidth />
                <TextField label="ZIP / PIN" placeholder="560001" fullWidth />
              </Grid>
            )}
          </VStack>
        </CardContent>
      </Card>
    </VStack>
  )
}

/* ------------------------------------------------------------------ *
 * Review — summarised sections + Stat row + item table
 * ------------------------------------------------------------------ */
function ReviewSection({ title, onEdit, children }: { title: string; onEdit?: string; children: React.ReactNode }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <HStack alignItems="center" justifyContent="between">
          <CardTitle size="sm">{title}</CardTitle>
          {onEdit && <Button variant="link" size="sm">Edit</Button>}
        </HStack>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}

function ReviewBody() {
  return (
    <VStack gap={6}>
      <Grid container columns={{ default: 1, sm: 3 }} gap={4}>
        <Stat label="Items" value={LINE_ITEMS.reduce((s, i) => s + i.qty, 0)} hint="in this order" />
        <Stat label="Delivery" value="Express" hint="2–3 business days" />
        <Stat label="Order total" value={inr(SUBTOTAL + 249 + TAX)} trend="flat" />
      </Grid>

      <Grid container columns={{ default: 1, md: 2 }} gap={6}>
        <ReviewSection title="Ship to" onEdit="shipping">
          <VStack gap={1}>
            <Typography variant="body2" className="font-medium">Aarav Sharma</Typography>
            <Typography variant="body2" className="text-muted-foreground">Flat 4B, 12 MG Road</Typography>
            <Typography variant="body2" className="text-muted-foreground">Bengaluru, Karnataka 560001</Typography>
            <Typography variant="body2" className="text-muted-foreground">+91 98765 43210</Typography>
          </VStack>
        </ReviewSection>
        <ReviewSection title="Payment" onEdit="payment">
          <HStack alignItems="center" gap={2}>
            <Badge variant="outlined" bg>Visa</Badge>
            <span className="tabular-nums">•••• 4242</span>
            <Typography variant="caption" className="text-muted-foreground">Exp 08/27</Typography>
          </HStack>
        </ReviewSection>
      </Grid>

      <ReviewSection title="Items">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead align="center">Qty</TableHead>
              <TableHead align="right">Price</TableHead>
              <TableHead align="right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {LINE_ITEMS.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <HStack alignItems="center" gap={3}>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border bg-muted text-lg">{item.emoji}</span>
                    <VStack gap={0}>
                      <span className="font-medium">{item.name}</span>
                      <span className="text-xs text-muted-foreground">{item.variant}</span>
                    </VStack>
                  </HStack>
                </TableCell>
                <TableCell align="center">{item.qty}</TableCell>
                <TableCell align="right">{inr(item.price)}</TableCell>
                <TableCell align="right" className="font-semibold">{inr(item.price * item.qty)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ReviewSection>
    </VStack>
  )
}

/* ------------------------------------------------------------------ *
 * Stories
 * ------------------------------------------------------------------ */
export const Shipping: Story = {
  render: () => <Shell current={1} left={<ShippingForm />} right={<OrderSummary cta="Continue to payment" editableQty />} />,
}

export const Payment: Story = {
  render: () => <Shell current={2} left={<PaymentForm />} right={<OrderSummary cta="Review order" />} />,
}

export const Review: Story = {
  render: () => <Shell current={3} left={<ReviewBody />} right={<OrderSummary cta="Place order" />} />,
}
