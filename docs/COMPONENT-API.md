# Component API Reference

> **AUTO-GENERATED from the TypeScript types — do not edit by hand.**
> Regenerate: `npm run generate:api --workspace=@onesaz/ui`
> This is the source of truth for props; the narrative COMPONENT-GUIDE is for usage/examples.

## Accordion

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `asChild` | `boolean` |  |  |  |

## AccordionContent

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `asChild` | `boolean` |  |  |  |

## AccordionItem

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `asChild` | `boolean` |  |  |  |

## AccordionTrigger

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `asChild` | `boolean` |  |  |  |

## Alert

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `variant` | `enum` |  | `default` |  |
| `onClose` | `() => void` |  |  | Renders a close button; called when clicked. |
| `icon` | `ReactNode` |  |  | Override the default icon. Pass `null` to hide it. |

## AlertDialogAction

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `asChild` | `boolean` |  |  |  |

## AlertDialogCancel

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `asChild` | `boolean` |  |  |  |

## AlertDialogContent

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `variant` | `enum` |  | `default` | Visual variant of the alert dialog |
| `showIcon` | `boolean` |  | `true` | Whether to show an icon |
| `asChild` | `boolean` |  |  |  |

## AlertDialogDescription

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `asChild` | `boolean` |  |  |  |

## AlertDialogOverlay

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `asChild` | `boolean` |  |  |  |

## AlertDialogTitle

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `asChild` | `boolean` |  |  |  |

## AlertDialogTrigger

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `asChild` | `boolean` |  |  |  |

## AreaChart

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `data` | `any[]` |  | `[]` | Chart data |
| `dataKey` | `string` | yes |  | Data key for the area |
| `dataKeys` | `{ dataKey: string; fill?: string; stroke?: string; name?: string; }[]` |  |  | Multiple data keys for stacked areas |
| `fill` | `string` |  |  | Fill color for single area |
| `stroke` | `string` |  |  | Stroke color for single area |
| `name` | `string` |  | `Point` | Area name for legend |
| `width` | `string \| number` |  | `300` | Width of the chart |
| `height` | `string \| number` |  | `300` | Height of the chart |
| `margin` | `{ top?: number; right?: number; bottom?: number; left?: number; }` |  | `{ top: 20, right: 30, left: 20, bottom: 5 }` | Margin around the chart |
| `showGrid` | `boolean` |  | `true` | Show grid lines |
| `showTooltip` | `boolean` |  | `true` | Show tooltip |
| `showLegend` | `boolean` |  | `false` | Show legend |
| `stack` | `boolean` |  | `false` | Stack areas on top of each other |
| `xAxis` | `{ dataKey?: string; type?: "number" \| "category"; hide?: boolean; label?: string; }` |  |  | X-axis configuration |
| `yAxis` | `{ type?: "number" \| "category"; hide?: boolean; label?: string; }` |  |  | Y-axis configuration |
| `className` | `string` |  |  | Additional CSS classes |

## Avatar

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `src` | `string` |  |  | Image source URL |
| `alt` | `string` |  |  | Alt text for the image |
| `size` | `enum` |  | `md` | Size of the avatar |
| `fallback` | `string` |  |  | Fallback text (usually initials) when no image |
| `shape` | `enum` |  | `circle` | Shape of the avatar |
| `bordered` | `boolean` |  | `false` | Whether to show a border |
| `fallbackElement` | `ReactNode` |  |  | Custom fallback element |

## AvatarGroup

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `max` | `number` |  |  | Maximum number of avatars to show |
| `size` | `enum` |  | `md` | Size for all avatars in the group |
| `children` | `ReactNode` | yes |  | Children should be Avatar components |

## Backdrop

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `open` | `boolean` | yes |  | Whether the backdrop is visible |
| `invisible` | `boolean` |  | `false` | Makes the backdrop fully transparent — still captures clicks/events |
| `transitionDuration` | `number` |  | `225` | Duration of the fade transition in ms |
| `keepMounted` | `boolean` |  | `false` | Keep the element in the DOM when closed (avoids remount cost) |
| `disablePortal` | `boolean` |  | `false` | Render inline instead of in a portal |
| `disableScrollLock` | `boolean` |  | `false` | Lock body scroll when open |

## Badge

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `color` | `enum` |  | `default` |  |
| `variant` | `enum` |  | `contained` |  |
| `bg` | `boolean` |  | `false` | When true with `variant="outlined"`, renders a soft filled background with bold text. |

## BarChart

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `data` | `any[]` |  | `[]` | Chart data |
| `dataKey` | `string` | yes |  | Data key for the bars |
| `dataKeys` | `{ dataKey: string; fill?: string; name?: string; stackId?: string; radius?: number \| [number, number, number, number]; label?: { dataKey?: string; position?: "center" \| "top" \| "right" \| "bottom" \| "left" \| "inside" \| "outside"; orientation?: "horizontal" \| "vertical"; style?: CSSProperties; formatter?: (value: any)...` |  |  | Multiple data keys for grouped OR stacked bars.  To stack bars, set the same `stackId` on every key that should stack together. Bars sharing a stackId are drawn vertically on top of each other (recharts semantics).  For end-capped stacks (rounded only at the ends), set `radius` per key — bottom bar `[0,0,r,r]`, middle bars `0`, top bar `[r,r,0,0]`. The bars in `dataKeys` render in array order; for a stack, the first entry is the BOTTOM of the stack and the last is the TOP. |
| `fill` | `string` |  |  | Fill color for single bar |
| `name` | `string` |  | `Point` | Bar name for legend |
| `width` | `string \| number` |  | `300` | Width of the chart |
| `height` | `string \| number` |  | `300` | Height of the chart |
| `margin` | `{ top?: number; right?: number; bottom?: number; left?: number; }` |  | `{ top: 20, right: 30, left: 20, bottom: 5 }` | Margin around the chart |
| `showGrid` | `boolean` |  | `true` | Show grid lines |
| `showTooltip` | `boolean` |  | `true` | Show tooltip |
| `showLegend` | `boolean` |  | `false` | Show legend |
| `xAxis` | `{ dataKey?: string; type?: "number" \| "category"; hide?: boolean; label?: string; angle?: number; textAnchor?: "end" \| "start" \| "middle"; height?: number; interval?: number \| "preserveStartEnd" \| "preserveStart" \| "preserveEnd"; tick?: { ...; }; axisLine?: boolean; tickLine?: boolean; }` |  |  | X-axis configuration |
| `yAxis` | `{ type?: "number" \| "category"; hide?: boolean; label?: string; angle?: number; position?: "right" \| "left" \| "insideLeft" \| "insideRight"; tick?: { fontSize?: number; fontWeight?: string \| number; fill?: string; }; domain?: [...]; ticks?: number[]; axisLine?: boolean; tickLine?: boolean; }` |  |  | Y-axis configuration |
| `barProps` | `{ radius?: number \| [number, number, number, number]; maxBarSize?: number; minPointSize?: number; barCategoryGap?: string \| number; barGap?: string \| number; }` |  | `{}` | Bar styling |
| `labelList` | `{ dataKey?: string; position?: "center" \| "top" \| "right" \| "bottom" \| "left" \| "inside" \| "outside"; style?: CSSProperties; formatter?: (value: any, entry: any, index: number) => ReactNode; }` |  |  | Label list configuration |
| `colors` | `string[]` |  |  | Custom colors array |
| `tooltip` | `{ formatter?: (value: any, name: string, props: any) => [ReactNode, string]; labelFormatter?: (label: any, payload: any[]) => ReactNode; labelStyle?: CSSProperties; contentStyle?: CSSProperties; content?: (props: { ...; }) => ReactNode; cursor?: boolean \| SVGProps<...>; }` |  |  | Tooltip configuration |
| `className` | `string` |  |  | Additional CSS classes |

## BottomNavigation

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `value` | `any` |  |  | The currently selected value. |
| `onChange` | `(event: SyntheticEvent<Element, Event>, newValue: any) => void` |  | `() => {}` | Callback fired when the value changes. |
| `showLabels` | `boolean` |  | `false` | If true, all action labels are always visible (not just the selected one). |

## BottomNavigationAction

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `label` | `ReactNode` |  |  | Text label shown below the icon. |
| `icon` | `ReactNode` |  |  | Icon element. |
| `value` | `any` |  |  | The value of this action (matched against BottomNavigation's value). |
| `showLabel` | `boolean` |  |  | If true, always show the label regardless of selection. Overrides parent showLabels. |

## Box

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `as` | `ElementType<any, keyof IntrinsicElements>` |  | `div` | Render as a different element |
| `display` | `enum` |  |  | Display type |
| `flexDirection` | `enum` |  |  | Flex direction |
| `alignItems` | `enum` |  |  | Align items |
| `justifyContent` | `enum` |  |  | Justify content |
| `flexWrap` | `enum` |  |  | Flex wrap |
| `gap` | `enum` |  |  | Gap |
| `p` | `enum` |  |  | Padding |
| `px` | `enum` |  |  | Padding X |
| `py` | `enum` |  |  | Padding Y |
| `m` | `enum` |  |  | Margin |
| `mx` | `enum` |  |  | Margin X |
| `my` | `enum` |  |  | Margin Y |
| `rounded` | `enum` |  |  | Border radius |
| `shadow` | `enum` |  |  | Shadow |
| `bg` | `enum` |  |  | Background color |
| `color` | `enum` |  |  | Text color |
| `border` | `boolean` |  |  | Border |
| `borderColor` | `enum` |  |  | Border color |
| `w` | `enum` |  |  | Width |
| `h` | `enum` |  |  | Height |
| `position` | `enum` |  |  | Position |
| `overflow` | `enum` |  |  | Overflow |
| `width` | `number` |  |  | Fixed width/height in px (escape hatch beyond the keyword sizes) |
| `height` | `number` |  |  |  |
| `grow` | `boolean` |  |  | Grow to fill available space along the flex axis (flex: 1 1 0%) |
| `shrink` | `boolean` |  |  | Set to `false` to prevent flex shrinking (applies `shrink-0`) |
| `minH` | `enum` |  |  | Min height. `0` is required on a growing flex child for inner scroll to engage. |
| `minW` | `enum` |  |  | Min width. `0` lets a flex child shrink below its content (e.g. so a grid/table can scroll). |
| `pt` | `enum` |  |  | Padding per side |
| `pr` | `enum` |  |  |  |
| `pb` | `enum` |  |  |  |
| `pl` | `enum` |  |  |  |
| `inset` | `boolean` |  |  | Pin all inset edges to 0 (for an absolute overlay) |
| `top` | `enum` |  |  | Inset offsets (for position sticky/absolute/fixed) |
| `right` | `enum` |  |  |  |
| `bottom` | `enum` |  |  |  |
| `left` | `enum` |  |  |  |
| `z` | `enum` |  |  | z-index tier (maps to the design-system z scale) |

## BreadcrumbItem

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `current` | `boolean` |  | `false` | Whether this is the current/active page |
| `href` | `string` |  |  | Href for the breadcrumb link |
| `onClick` | `MouseEventHandler<HTMLAnchorElement \| HTMLSpanElement>` |  |  | Click handler |

## Breadcrumbs

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `separator` | `ReactNode` |  |  | Custom separator element |
| `maxItems` | `number` |  |  | Maximum number of items to display before collapsing |
| `itemsBeforeCollapse` | `number` |  | `1` | Number of items to show at the beginning when collapsed |
| `itemsAfterCollapse` | `number` |  | `2` | Number of items to show at the end when collapsed |

## Button

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `variant` | `enum` |  | `contained` |  |
| `size` | `enum` |  | `md` |  |
| `color` | `enum` |  | `default` |  |
| `fullWidth` | `boolean` |  | `false` | Whether the button should take the full width of its container |
| `loading` | `boolean` |  | `false` | Shows a loading spinner and disables the button |
| `startIcon` | `ReactNode` |  |  | Element rendered before the button label |
| `endIcon` | `ReactNode` |  |  | Element rendered after the button label |

## ButtonGroup

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `variant` | `enum` |  | `contained` | Variant applied to all child buttons (can be overridden per button) |
| `size` | `enum` |  | `md` | Size applied to all child buttons (can be overridden per button) |
| `color` | `enum` |  | `default` | Color applied to all child buttons (can be overridden per button) |
| `orientation` | `enum` |  | `horizontal` | Layout direction |
| `disabled` | `boolean` |  |  | Disable all child buttons |
| `fullWidth` | `boolean` |  | `false` | Stretch group to fill container width |

## Caption

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `color` | `enum` |  | `inherit` | Text color |
| `fontWeight` | `enum` |  |  | Font weight override |
| `opacity` | `number` |  |  | Opacity |
| `as` | `ElementType<any, keyof IntrinsicElements>` |  |  | Render as a different element |
| `align` | `enum` |  |  | Text alignment |
| `noWrap` | `boolean` |  | `false` | Prevent text wrap |
| `textTransform` | `enum` |  |  | Text transform |
| `verticalAlign` | `enum` |  |  | Vertical alignment |
| `textGradient` | `boolean` |  | `false` | Enable text gradient effect |
| `gradientColor` | `enum` |  | `primary` | Gradient color (when textGradient is true) |
| `gutterBottom` | `boolean` |  | `false` | Disable bottom margin |
| `paragraph` | `boolean` |  | `false` | Paragraph mode (adds bottom margin) |
| `mono` | `boolean` |  | `false` | Monospace font — for code, IDs, timestamps, hashes |
| `tabularNums` | `boolean` |  | `false` | Fixed-width digits so numbers don't jitter column-to-column |

## CardTitle

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `size` | `enum` |  | `lg` | Title size. Defaults to `lg` (the original 2xl). Use `sm`/`md` for the common case of a section-header title inside a dense card. |

## ChatWindow

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `transport` | `ChatTransport` |  |  | The function that talks to your backend/agent. |
| `initialMessages` | `ChatMessage[]` |  |  |  |
| `onError` | `(error: unknown) => void` |  |  |  |
| `onFinish` | `(message: ChatMessage) => void` |  |  |  |
| `messages` | `ChatMessage[]` |  |  |  |
| `status` | `enum` |  |  |  |
| `onSendMessage` | `(message: string \| { parts: MessagePart[]; }) => void` |  |  |  |
| `onStop` | `() => void` |  |  |  |
| `actions` | `ChatActionsProp` |  |  | Custom per-message action buttons (copy, retry, +your own). |
| `hideAvatar` | `boolean` |  |  |  |
| `showTimestamp` | `boolean` |  |  |  |
| `placeholder` | `string` |  |  |  |
| `emptyState` | `ReactNode` |  |  | Shown when there are no messages. |
| `header` | `ReactNode` |  |  | Header slot (title bar). |
| `composerStart` | `ReactNode` |  |  | Left slot inside the composer (e.g. an attach button). |
| `typingLabel` | `string` |  |  |  |
| `renderMarkdown` | `RenderMarkdown` |  |  | Plug in full markdown (react-markdown) instead of the built-in renderer. |
| `renderCode` | `RenderCode` |  |  | Plug in syntax-highlighted code (prism, shiki, …). |
| `renderPart` | `RenderPart` |  |  | Render any message part yourself. |
| `className` | `string` |  |  |  |
| `height` | `string \| number` |  |  | Height of the whole widget. Defaults to filling its parent (h-full). |

## ChatWindow

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `transport` | `ChatTransport` |  |  | The function that talks to your backend/agent. |
| `initialMessages` | `ChatMessage[]` |  |  |  |
| `onError` | `(error: unknown) => void` |  |  |  |
| `onFinish` | `(message: ChatMessage) => void` |  |  |  |
| `messages` | `ChatMessage[]` |  |  |  |
| `status` | `enum` |  |  |  |
| `onSendMessage` | `(message: string \| { parts: MessagePart[]; }) => void` |  |  |  |
| `onStop` | `() => void` |  |  |  |
| `actions` | `ChatActionsProp` |  |  | Custom per-message action buttons (copy, retry, +your own). |
| `hideAvatar` | `boolean` |  |  |  |
| `showTimestamp` | `boolean` |  |  |  |
| `placeholder` | `string` |  |  |  |
| `emptyState` | `ReactNode` |  |  | Shown when there are no messages. |
| `header` | `ReactNode` |  |  | Header slot (title bar). |
| `composerStart` | `ReactNode` |  |  | Left slot inside the composer (e.g. an attach button). |
| `typingLabel` | `string` |  |  |  |
| `renderMarkdown` | `RenderMarkdown` |  |  | Plug in full markdown (react-markdown) instead of the built-in renderer. |
| `renderCode` | `RenderCode` |  |  | Plug in syntax-highlighted code (prism, shiki, …). |
| `renderPart` | `RenderPart` |  |  | Render any message part yourself. |
| `className` | `string` |  |  |  |
| `height` | `string \| number` |  |  | Height of the whole widget. Defaults to filling its parent (h-full). |

## Checkbox

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `indeterminate` | `boolean` |  | `false` | Renders a dash instead of a checkmark — useful for "select some" states |

## Chip

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `label` | `string` |  |  | The text content of the chip |
| `variant` | `enum` |  | `contained` | Visual style variant |
| `color` | `enum` |  | `default` | Color scheme |
| `size` | `enum` |  | `medium` | Size of the chip |
| `icon` | `ReactNode` |  |  | Icon element displayed before the label |
| `avatar` | `ReactNode` |  |  | Avatar element displayed before the label |
| `onDelete` | `(event: SyntheticEvent<Element, Event>) => void` |  |  | If provided, renders a delete icon and calls this on click. Also triggered by pressing Delete or Backspace when the chip is focused. |
| `deleteIcon` | `ReactNode` |  |  | Custom delete icon |
| `clickable` | `boolean` |  | `false` | Makes the chip act as a button (adds role, cursor, keyboard support) |
| `disabled` | `boolean` |  | `false` | Whether the chip is disabled |
| `href` | `string` |  |  | Render as a link chip — sets the underlying element to <a> |
| `component` | `ElementType<any, keyof IntrinsicElements>` |  |  | HTML element or React component to render as. Overrides href-based inference. |

## ChipInput

A token / tag / recipient input — type and press Enter or comma to add a chip, Backspace on an empty field removes the last, and each chip has a remove button. Controlled via `value` + `onChange`.

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `value` | `string[]` | yes |  | Current chips (controlled) |
| `onChange` | `(value: string[]) => void` | yes |  |  |
| `placeholder` | `string` |  |  |  |
| `disabled` | `boolean` |  |  |  |
| `unique` | `boolean` |  | `true` | Prevent duplicate entries (default true) |
| `className` | `string` |  |  |  |
| `aria-label` | `string` |  |  |  |

## CircularProgress

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `value` | `number` |  |  | Progress value (0-100). If undefined, shows indeterminate state |
| `variant` | `enum` |  | `default` | Color variant |
| `size` | `number \| "sm" \| "md" \| "lg" \| "xl"` |  | `md` | Size of the circular progress |
| `thickness` | `number` |  | `4` | Thickness of the progress ring |
| `showValue` | `boolean` |  | `false` | Whether to show the value in the center |
| `formatValue` | `(value: number) => string` |  | `(v) => `${Math.round(v)}%`` | Custom label format |
| `children` | `ReactNode` |  |  | Content to show in the center |

## Combobox

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `value` | `ComboboxOptionInput \| ComboboxOptionInput[]` |  |  |  |
| `defaultValue` | `ComboboxOptionInput \| ComboboxOptionInput[]` |  |  |  |
| `onChange` | `((value: ComboboxOptionInput) => void) \| ((value: ComboboxOptionInput[]) => void)` |  |  |  |
| `multiple` | `boolean` |  |  |  |
| `options` | `ComboboxOptionInput[]` | yes |  |  |
| `placeholder` | `string` |  |  |  |
| `searchPlaceholder` | `string` |  |  |  |
| `emptyMessage` | `string` |  |  |  |
| `disabled` | `boolean` |  |  |  |
| `className` | `string` |  |  |  |
| `clearable` | `boolean` |  |  |  |
| `openOnFocus` | `boolean` |  |  |  |
| `inputValue` | `string` |  |  |  |
| `onInputChange` | `(value: string) => void` |  |  |  |
| `simpleOptions` | `boolean` |  |  |  |
| `labelKey` | `string` |  |  |  |
| `valueKey` | `string` |  |  |  |
| `imageKey` | `string` |  |  | Object key for an image URL on each option (e.g. `"image"` or `"avatarUrl"`). When set, the dropdown and selected value show that image next to the label. String options never show images. |
| `colorKey` | `string` |  |  | Object key for a color on each option (e.g. `"color"`). When set, a colored dot is shown next to the label in the dropdown. |
| `label` | `string` |  |  | Label displayed above or inside the trigger |
| `labelPosition` | `enum` |  |  | Where to render `label` — `"above"` (default) or `"inline"` inside the trigger |
| `required` | `boolean` |  |  | Marks the field as required — shows an asterisk and adds native required to the hidden input |
| `startAdornment` | `ReactNode` |  |  | Node rendered at the start (left) of the trigger button |
| `onStartAdornmentClick` | `(e: MouseEvent<Element, MouseEvent>) => void` |  |  | Click handler for the start adornment — renders it as a button when provided |
| `endAdornment` | `ReactNode` |  |  | Node rendered at the end (right) of the trigger button, before the chevron |
| `onEndAdornmentClick` | `(e: MouseEvent<Element, MouseEvent>) => void` |  |  | Click handler for the end adornment — renders it as a button when provided |
| `virtual` | `boolean` |  |  | Enable virtual rendering for large option lists |
| `virtualItemHeight` | `number` |  |  | Height of each option item in pixels (used for virtual rendering) |
| `selectAll` | `boolean` |  |  | Show select-all option |
| `selectAllLabel` | `string` |  |  | Label for select-all option |
| `maxDisplayItems` | `number` |  |  | Maximum number of items to display as chips before showing "+N more" |

## Composer

Auto-growing message input with Send/Stop control.

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `value` | `string` | yes |  |  |
| `onChange` | `(value: string) => void` | yes |  |  |
| `onSend` | `() => void` | yes |  | Called on Enter (without Shift) or Send click. |
| `onStop` | `() => void` |  |  | Called when the user presses Stop while streaming. |
| `isStreaming` | `boolean` |  | `false` | When true, shows a Stop button instead of Send. |
| `disabled` | `boolean` |  | `false` |  |
| `placeholder` | `string` |  | `Type a message…` |  |
| `startAdornment` | `ReactNode` |  |  | Slot rendered on the left of the input (e.g. an attach button). |
| `maxRows` | `number` |  | `6` | Max textarea rows before it scrolls. |
| `className` | `string` |  |  |  |

## Composer

Auto-growing message input with Send/Stop control.

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `value` | `string` | yes |  |  |
| `onChange` | `(value: string) => void` | yes |  |  |
| `onSend` | `() => void` | yes |  | Called on Enter (without Shift) or Send click. |
| `onStop` | `() => void` |  |  | Called when the user presses Stop while streaming. |
| `isStreaming` | `boolean` |  | `false` | When true, shows a Stop button instead of Send. |
| `disabled` | `boolean` |  | `false` |  |
| `placeholder` | `string` |  | `Type a message…` |  |
| `startAdornment` | `ReactNode` |  |  | Slot rendered on the left of the input (e.g. an attach button). |
| `maxRows` | `number` |  | `6` | Max textarea rows before it scrolls. |
| `className` | `string` |  |  |  |

## Container

Centres content and caps its width — the page-shell pattern that otherwise needs a hand-written `mx-auto w-full max-w-* px-4`.

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `maxWidth` | `enum` |  | `lg` | Max content width. Defaults to `lg`. |
| `gutter` | `boolean` |  | `true` | Horizontal gutter padding. Defaults to `true` (px-4). |
| `as` | `ElementType<any, keyof IntrinsicElements>` |  | `div` | Render as a different element |

## DataGrid

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `rows` | `TData[]` | yes |  |  |
| `columns` | `GridColDef<TData>[]` | yes |  |  |
| `getRowId` | `(row: TData) => string \| number` |  |  |  |
| `loading` | `boolean` |  | `false` |  |
| `title` | `string` |  |  |  |
| `toolBar` | `boolean` |  | `false` |  |
| `checkboxSelection` | `boolean` |  | `false` |  |
| `rowSelectionModel` | `GridRowSelectionModel` |  |  |  |
| `onRowSelectionModelChange` | `(model: GridRowSelectionModel) => void` |  |  |  |
| `disableRowSelectionOnClick` | `boolean` |  | `false` |  |
| `columnVisibilityModel` | `ColumnVisibilityModel` |  |  |  |
| `onColumnVisibilityModelChange` | `(model: ColumnVisibilityModel) => void` |  |  |  |
| `paginationMode` | `enum` |  | `client` |  |
| `paginationModel` | `PaginationModel` |  |  |  |
| `onPaginationModelChange` | `(model: PaginationModel) => void` |  |  |  |
| `rowCount` | `number` |  |  |  |
| `pageSizeOptions` | `number[]` |  | `[10, 25, 50, 100]` |  |
| `sortingMode` | `enum` |  | `client` |  |
| `initialSortModel` | `{ field: string; sort: "desc" \| "asc"; }[]` |  |  | Initial sort model - array of { field: string, sort: 'asc' \| 'desc' } |
| `sortLatestFirst` | `boolean` |  | `false` | If true, sorts by createdAt descending (latest first). Requires a 'createdAt' field in rows. |
| `filterMode` | `enum` |  | `client` |  |
| `height` | `string \| number` |  | `400` |  |
| `minHeight` | `string \| number` |  |  |  |
| `maxHeight` | `string \| number` |  |  |  |
| `density` | `enum` |  | `compact` |  |
| `columnHeaderHeight` | `number` |  | `48` | Height of the column header row, in px. Independent of `density` (which only controls data-row height) so the header stays stable as rows compress — matching the MUI DataGrid `columnHeaderHeight` behaviour. |
| `showCellVerticalBorder` | `boolean` |  | `false` |  |
| `showColumnVerticalBorder` | `boolean` |  | `false` |  |
| `hideFooter` | `boolean` |  | `false` |  |
| `hideFooterPagination` | `boolean` |  | `false` |  |
| `virtualized` | `boolean` |  | `false` |  |
| `overscan` | `number` |  | `5` |  |
| `wrapText` | `boolean` |  | `false` |  |
| `getRowClassName` | `(params: { row: TData; rowIndex: number; }) => string` |  |  |  |
| `pinnedRows` | `PinnedRowsModel<TData>` |  |  |  |
| `pinnedColumns` | `PinnedColumnsModel` |  |  |  |
| `columnGroupingModel` | `ColumnGroupModel[]` |  |  |  |
| `slotProps` | `{ toolbar?: { getExportedColumns?: (columns: GridColDef<any>[]) => GridColDef<any>[]; showQuickFilter?: boolean; showColumnSelector?: boolean; showExport?: boolean; customButtons?: ReactNode; moreOptions?: { ...; }[]; }; }` |  |  |  |
| `onExport` | `(data: TData[], columns: GridColDef<TData>[]) => void` |  |  |  |
| `exportFileName` | `string` |  | `data-export` |  |
| `resizableColumns` | `boolean` |  | `false` |  |
| `onColumnResize` | `(columnId: string, width: number) => void` |  |  |  |
| `className` | `string` |  |  |  |
| `sx` | `CSSProperties` |  |  |  |
| `actions` | `{ edit?: boolean; del?: boolean; }` |  |  |  |
| `sensitiveInfo` | `boolean` |  |  |  |
| `autoHeight` | `boolean` |  | `false` |  |
| `disableColumnMenu` | `boolean` |  |  |  |
| `disableColumnFilter` | `boolean` |  |  |  |
| `disableColumnSelector` | `boolean` |  | `false` |  |
| `disableDensitySelector` | `boolean` |  |  |  |

## DataList

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `orientation` | `enum` |  | `horizontal` | Layout direction of label-value pairs. |
| `size` | `enum` |  | `2` | Controls spacing and font size. |

## DataListItem

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `align` | `enum` |  | `baseline` | Vertical alignment of label and value within horizontal items. |

## DataListLabel

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `width` | `Width<string \| number>` |  |  | Fixed width of the label column (CSS value, e.g. "120px" or "8rem"). |
| `minWidth` | `MinWidth<string \| number>` |  |  | Minimum width of the label. |
| `maxWidth` | `MaxWidth<string \| number>` |  |  | Maximum width of the label. |
| `color` | `enum` |  | `muted` | Applies a theme color to the label text. |
| `highContrast` | `boolean` |  | `false` | Increases color contrast. |

## DatePicker

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `value` | `Date` |  |  |  |
| `defaultValue` | `Date` |  |  |  |
| `onChange` | `(date: Date) => void` |  |  |  |
| `format` | `string` |  |  | dayjs format string, default: MM/DD/YYYY |
| `placeholder` | `string` |  |  |  |
| `minDate` | `Date` |  |  |  |
| `maxDate` | `Date` |  |  |  |
| `disabled` | `boolean` |  |  |  |
| `readOnly` | `boolean` |  |  |  |
| `label` | `string` |  |  |  |
| `required` | `boolean` |  |  |  |
| `className` | `string` |  |  |  |
| `disableInput` | `boolean` |  |  | Hide the text input — show only a button trigger |
| `disableCalendar` | `boolean` |  |  | Disable the calendar/popover — text input only |
| `variant` | `enum` |  |  |  |

## DateRangePicker

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `value` | `[Date, Date]` |  |  |  |
| `defaultValue` | `[Date, Date]` |  |  |  |
| `onChange` | `(range: [Date, Date]) => void` |  |  |  |
| `format` | `string` |  |  | dayjs format string, default: MM/DD/YYYY |
| `startPlaceholder` | `string` |  |  |  |
| `endPlaceholder` | `string` |  |  |  |
| `minDate` | `Date` |  |  |  |
| `maxDate` | `Date` |  |  |  |
| `presets` | `DateRangePreset[]` |  |  | Preset range options shown alongside the calendars. Pass `DEFAULT_DATE_RANGE_PRESETS` to use built-ins, or supply your own array. Pass `[]` to disable presets entirely. |
| `disabled` | `boolean` |  |  |  |
| `readOnly` | `boolean` |  |  |  |
| `label` | `string` |  |  |  |
| `required` | `boolean` |  |  |  |
| `className` | `string` |  |  |  |
| `disableInput` | `boolean` |  |  | Hide the text input — show only a button trigger |
| `disableCalendar` | `boolean` |  |  | Disable the calendar/popover — text input only |
| `variant` | `enum` |  |  |  |

## DateTimePicker

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `value` | `Date` |  |  |  |
| `defaultValue` | `Date` |  |  |  |
| `onChange` | `(date: Date) => void` |  |  |  |
| `format` | `string` |  |  | dayjs format string, default: MM/DD/YYYY hh:mm A |
| `placeholder` | `string` |  |  |  |
| `is12Hour` | `boolean` |  |  |  |
| `showSeconds` | `boolean` |  |  |  |
| `minDate` | `Date` |  |  |  |
| `maxDate` | `Date` |  |  |  |
| `disabled` | `boolean` |  |  |  |
| `readOnly` | `boolean` |  |  |  |
| `label` | `string` |  |  |  |
| `required` | `boolean` |  |  |  |
| `className` | `string` |  |  |  |
| `disableInput` | `boolean` |  |  | Hide the text input — show only a button trigger |
| `disableCalendar` | `boolean` |  |  | Disable the calendar/popover — text input only |
| `variant` | `enum` |  |  |  |

## DialogClose

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `asChild` | `boolean` |  |  |  |

## DialogContent

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `hideCloseButton` | `boolean` |  | `false` |  |
| `size` | `enum` |  | `lg` |  |
| `asChild` | `boolean` |  |  |  |

## DialogDescription

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `asChild` | `boolean` |  |  |  |

## DialogOverlay

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `asChild` | `boolean` |  |  |  |

## DialogTitle

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `asChild` | `boolean` |  |  |  |

## DialogTrigger

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `asChild` | `boolean` |  |  |  |

## DonutChart

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `data` | `any[]` |  | `[]` | Chart data |
| `dataKey` | `string` | yes |  | Data key for the donut slices |
| `nameKey` | `string` |  |  | Name key for labels |
| `colors` | `string[]` |  |  | Colors for donut slices |
| `innerRadius` | `number` |  | `60` | Inner radius |
| `outerRadius` | `number` |  | `35` | Outer radius |
| `cx` | `string \| number` |  | `50%` | Center coordinates |
| `cy` | `string \| number` |  | `50%` |  |
| `width` | `string \| number` |  | `300` | Width of the chart |
| `height` | `string \| number` |  | `300` | Height of the chart |
| `showTooltip` | `boolean` |  | `true` | Show tooltip |
| `showLegend` | `boolean` |  | `false` | Show legend |
| `advancedStyling` | `{ enableGradients?: boolean; enableShadows?: boolean; gradients?: { id: string; colors: [string, string]; x1?: string; y1?: string; x2?: string; y2?: string; }[]; backgroundCircle?: { stroke?: string; strokeWidth?: number; filter?: string; }; progressArc?: { ...; }; }` |  |  | Advanced styling options |
| `tooltip` | `{ formatter?: (value: any, name: string, props: any) => [ReactNode, string]; labelFormatter?: (label: any, payload: any[]) => ReactNode; labelStyle?: CSSProperties; contentStyle?: CSSProperties; }` |  |  | Tooltip configuration |
| `className` | `string` |  |  | Additional CSS classes |

## DrawerClose

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `asChild` | `boolean` |  |  |  |

## DrawerContent

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `side` | `enum` |  | `right` | Side from which the drawer slides in |
| `showClose` | `boolean` |  | `true` | Whether to show the close button |
| `asChild` | `boolean` |  |  |  |

## DrawerDescription

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `asChild` | `boolean` |  |  |  |

## DrawerOverlay

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `asChild` | `boolean` |  |  |  |

## DrawerTitle

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `asChild` | `boolean` |  |  |  |

## DrawerTrigger

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `asChild` | `boolean` |  |  |  |

## DropdownMenuCheckboxItem

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `asChild` | `boolean` |  |  |  |

## DropdownMenuContent

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `asChild` | `boolean` |  |  |  |

## DropdownMenuGroup

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `asChild` | `boolean` |  |  |  |

## DropdownMenuItem

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `inset` | `boolean` |  |  |  |
| `asChild` | `boolean` |  |  |  |

## DropdownMenuLabel

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `inset` | `boolean` |  |  |  |
| `asChild` | `boolean` |  |  |  |

## DropdownMenuRadioGroup

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `asChild` | `boolean` |  |  |  |

## DropdownMenuRadioItem

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `asChild` | `boolean` |  |  |  |

## DropdownMenuSeparator

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `asChild` | `boolean` |  |  |  |

## DropdownMenuSubContent

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `asChild` | `boolean` |  |  |  |

## DropdownMenuSubTrigger

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `inset` | `boolean` |  |  |  |
| `asChild` | `boolean` |  |  |  |

## DropdownMenuTrigger

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `asChild` | `boolean` |  |  |  |

## EmptyState

Neutral placeholder for "there is nothing here yet" — an empty table, an unfilled list, a search with no results. Pair with an `action` to point the user at the next step. For an error condition (a load that failed), use `ErrorState` instead.

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `icon` | `ReactNode` |  |  | Icon or illustration shown above the title |
| `title` | `ReactNode` |  | `Something went wrong` | Short, primary message describing the empty condition |
| `description` | `ReactNode` |  | `An unexpected error occurred. Please try again.` | Optional supporting text below the title |
| `action` | `ReactNode` |  |  | Optional action(s), e.g. a Button to create the first record |
| `size` | `enum` |  | `md` | Vertical padding density |

## ErrorState

Signals that something went wrong (a failed fetch, a rejected action) rather than an empty-but-healthy state. Renders a default error icon and message, and an optional retry control wired to `onRetry`. Any `action` you pass is rendered alongside the retry button.

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `title` | `ReactNode` |  | `Something went wrong` | Primary message. Defaults to a generic failure message. |
| `onRetry` | `() => void` |  |  | Called when the user clicks the built-in retry affordance |
| `retryLabel` | `ReactNode` |  | `Try again` | Label for the built-in retry button |
| `action` | `ReactNode` |  |  | Optional action(s), e.g. a Button to create the first record |
| `size` | `enum` |  | `md` | Vertical padding density |
| `icon` | `ReactNode` |  |  | Icon or illustration shown above the title |
| `description` | `ReactNode` |  | `An unexpected error occurred. Please try again.` | Optional supporting text below the title |

## FormControl

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `error` | `boolean` |  |  | Error state |
| `disabled` | `boolean` |  |  | Disabled state |
| `required` | `boolean` |  |  | Required state |
| `fullWidth` | `boolean` |  |  | Full width mode |
| `margin` | `enum` |  | `none` | Margin |
| `orientation` | `enum` |  | `vertical` | Orientation |

## FormGroup

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `row` | `boolean` |  |  | Group orientation |

## FormHelperText

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `error` | `boolean` |  |  | Error state (auto-inherited from FormControl) |
| `disabled` | `boolean` |  |  | Disabled state (auto-inherited from FormControl) |

## FormLabel

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `error` | `boolean` |  |  | Error state (auto-inherited from FormControl) |
| `disabled` | `boolean` |  |  | Disabled state (auto-inherited from FormControl) |
| `required` | `boolean` |  |  | Required indicator |

## Grid

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `container` | `boolean` |  |  | If true, the component is a grid container. Optional — any non-`item` Grid is treated as a container. |
| `item` | `boolean` |  |  | If true, the component is a grid item (renders column spans) |
| `xs` | `enum` |  |  | Columns the item spans (1-12) or 'auto' |
| `sm` | `enum` |  |  | Columns at sm breakpoint (640px) |
| `md` | `enum` |  |  | Columns at md breakpoint (768px) |
| `lg` | `enum` |  |  | Columns at lg breakpoint (1024px) |
| `xl` | `enum` |  |  | Columns at xl breakpoint (1280px) |
| `xxl` | `enum` |  |  | Columns at 2xl breakpoint (1536px) |
| `spacing` | `enum` |  |  | Gap between grid items |
| `gap` | `enum` |  |  | Alias for `spacing` (matches the Box/Stack vocabulary) |
| `rowSpacing` | `enum` |  |  | Row gap |
| `columnSpacing` | `enum` |  |  | Column gap |
| `columns` | `GridColumns` |  |  | Number of columns in the container — a count or a responsive map |
| `alignItems` | `enum` |  |  | Align items |
| `justifyItems` | `enum` |  |  | Justify items |
| `justifyContent` | `enum` |  |  | Justify content |

## H1

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `color` | `enum` |  | `inherit` | Text color |
| `fontWeight` | `enum` |  |  | Font weight override |
| `opacity` | `number` |  |  | Opacity |
| `as` | `ElementType<any, keyof IntrinsicElements>` |  |  | Render as a different element |
| `align` | `enum` |  |  | Text alignment |
| `noWrap` | `boolean` |  | `false` | Prevent text wrap |
| `textTransform` | `enum` |  |  | Text transform |
| `verticalAlign` | `enum` |  |  | Vertical alignment |
| `textGradient` | `boolean` |  | `false` | Enable text gradient effect |
| `gradientColor` | `enum` |  | `primary` | Gradient color (when textGradient is true) |
| `gutterBottom` | `boolean` |  | `false` | Disable bottom margin |
| `paragraph` | `boolean` |  | `false` | Paragraph mode (adds bottom margin) |
| `mono` | `boolean` |  | `false` | Monospace font — for code, IDs, timestamps, hashes |
| `tabularNums` | `boolean` |  | `false` | Fixed-width digits so numbers don't jitter column-to-column |

## H2

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `color` | `enum` |  | `inherit` | Text color |
| `fontWeight` | `enum` |  |  | Font weight override |
| `opacity` | `number` |  |  | Opacity |
| `as` | `ElementType<any, keyof IntrinsicElements>` |  |  | Render as a different element |
| `align` | `enum` |  |  | Text alignment |
| `noWrap` | `boolean` |  | `false` | Prevent text wrap |
| `textTransform` | `enum` |  |  | Text transform |
| `verticalAlign` | `enum` |  |  | Vertical alignment |
| `textGradient` | `boolean` |  | `false` | Enable text gradient effect |
| `gradientColor` | `enum` |  | `primary` | Gradient color (when textGradient is true) |
| `gutterBottom` | `boolean` |  | `false` | Disable bottom margin |
| `paragraph` | `boolean` |  | `false` | Paragraph mode (adds bottom margin) |
| `mono` | `boolean` |  | `false` | Monospace font — for code, IDs, timestamps, hashes |
| `tabularNums` | `boolean` |  | `false` | Fixed-width digits so numbers don't jitter column-to-column |

## H3

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `color` | `enum` |  | `inherit` | Text color |
| `fontWeight` | `enum` |  |  | Font weight override |
| `opacity` | `number` |  |  | Opacity |
| `as` | `ElementType<any, keyof IntrinsicElements>` |  |  | Render as a different element |
| `align` | `enum` |  |  | Text alignment |
| `noWrap` | `boolean` |  | `false` | Prevent text wrap |
| `textTransform` | `enum` |  |  | Text transform |
| `verticalAlign` | `enum` |  |  | Vertical alignment |
| `textGradient` | `boolean` |  | `false` | Enable text gradient effect |
| `gradientColor` | `enum` |  | `primary` | Gradient color (when textGradient is true) |
| `gutterBottom` | `boolean` |  | `false` | Disable bottom margin |
| `paragraph` | `boolean` |  | `false` | Paragraph mode (adds bottom margin) |
| `mono` | `boolean` |  | `false` | Monospace font — for code, IDs, timestamps, hashes |
| `tabularNums` | `boolean` |  | `false` | Fixed-width digits so numbers don't jitter column-to-column |

## H4

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `color` | `enum` |  | `inherit` | Text color |
| `fontWeight` | `enum` |  |  | Font weight override |
| `opacity` | `number` |  |  | Opacity |
| `as` | `ElementType<any, keyof IntrinsicElements>` |  |  | Render as a different element |
| `align` | `enum` |  |  | Text alignment |
| `noWrap` | `boolean` |  | `false` | Prevent text wrap |
| `textTransform` | `enum` |  |  | Text transform |
| `verticalAlign` | `enum` |  |  | Vertical alignment |
| `textGradient` | `boolean` |  | `false` | Enable text gradient effect |
| `gradientColor` | `enum` |  | `primary` | Gradient color (when textGradient is true) |
| `gutterBottom` | `boolean` |  | `false` | Disable bottom margin |
| `paragraph` | `boolean` |  | `false` | Paragraph mode (adds bottom margin) |
| `mono` | `boolean` |  | `false` | Monospace font — for code, IDs, timestamps, hashes |
| `tabularNums` | `boolean` |  | `false` | Fixed-width digits so numbers don't jitter column-to-column |

## H5

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `color` | `enum` |  | `inherit` | Text color |
| `fontWeight` | `enum` |  |  | Font weight override |
| `opacity` | `number` |  |  | Opacity |
| `as` | `ElementType<any, keyof IntrinsicElements>` |  |  | Render as a different element |
| `align` | `enum` |  |  | Text alignment |
| `noWrap` | `boolean` |  | `false` | Prevent text wrap |
| `textTransform` | `enum` |  |  | Text transform |
| `verticalAlign` | `enum` |  |  | Vertical alignment |
| `textGradient` | `boolean` |  | `false` | Enable text gradient effect |
| `gradientColor` | `enum` |  | `primary` | Gradient color (when textGradient is true) |
| `gutterBottom` | `boolean` |  | `false` | Disable bottom margin |
| `paragraph` | `boolean` |  | `false` | Paragraph mode (adds bottom margin) |
| `mono` | `boolean` |  | `false` | Monospace font — for code, IDs, timestamps, hashes |
| `tabularNums` | `boolean` |  | `false` | Fixed-width digits so numbers don't jitter column-to-column |

## H6

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `color` | `enum` |  | `inherit` | Text color |
| `fontWeight` | `enum` |  |  | Font weight override |
| `opacity` | `number` |  |  | Opacity |
| `as` | `ElementType<any, keyof IntrinsicElements>` |  |  | Render as a different element |
| `align` | `enum` |  |  | Text alignment |
| `noWrap` | `boolean` |  | `false` | Prevent text wrap |
| `textTransform` | `enum` |  |  | Text transform |
| `verticalAlign` | `enum` |  |  | Vertical alignment |
| `textGradient` | `boolean` |  | `false` | Enable text gradient effect |
| `gradientColor` | `enum` |  | `primary` | Gradient color (when textGradient is true) |
| `gutterBottom` | `boolean` |  | `false` | Disable bottom margin |
| `paragraph` | `boolean` |  | `false` | Paragraph mode (adds bottom margin) |
| `mono` | `boolean` |  | `false` | Monospace font — for code, IDs, timestamps, hashes |
| `tabularNums` | `boolean` |  | `false` | Fixed-width digits so numbers don't jitter column-to-column |

## HStack

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `p` | `enum` |  |  | Padding (all sides) — matches the Box spacing vocabulary |
| `spacing` | `enum` |  |  | Spacing between items |
| `as` | `ElementType<any, keyof IntrinsicElements>` |  | `div` | Render as a different element |
| `align` | `enum` |  |  | Align items |
| `wrap` | `enum` |  |  | Wrap items |
| `alignItems` | `enum` |  |  | Alias for `align` (matches the Box vocabulary) |
| `justifyContent` | `enum` |  |  | Alias for `justify` (matches the Box vocabulary) |
| `flexWrap` | `enum` |  |  | Alias for `wrap` (matches the Box vocabulary) |
| `gap` | `enum` |  |  | Alias for `spacing` (matches the Box/Grid vocabulary) |
| `px` | `enum` |  |  | Horizontal padding |
| `py` | `enum` |  |  | Vertical padding |
| `grow` | `boolean` |  |  | Grow to fill available space along the parent flex axis (flex: 1 1 0%) |
| `shrink` | `boolean` |  |  | Set to `false` to prevent flex shrinking (applies `shrink-0`) |
| `minH` | `enum` |  |  | Min height. `0` is required on a growing flex child for inner scroll to engage. |
| `minW` | `enum` |  |  | Min width. `0` lets a flex child shrink below its content. |
| `divider` | `ReactNode` |  |  | Divider between items |
| `justify` | `enum` |  |  | Justify content |

## IconButton

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `size` | `enum` |  | `md` | Size of the icon button |
| `rounded` | `boolean` |  | `false` | Whether the button is rounded (circular) |
| `aria-label` | `string` | yes |  | Aria label for accessibility (required for icon-only buttons) |
| `color` | `enum` |  | `default` |  |
| `loading` | `boolean` |  | `false` | Shows a loading spinner and disables the button |
| `variant` | `enum` |  | `contained` |  |
| `fullWidth` | `boolean` |  | `false` | Whether the button should take the full width of its container |

## IconRail

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `hoverExpandRail` | `boolean` |  | `false` | Expand rail on hover |

## IconRailItem

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `railId` | `string` |  |  | Unique identifier for this rail item |
| `icon` | `ReactNode` | yes |  | Icon to display |
| `label` | `string` |  |  | Tooltip label |
| `asButton` | `boolean` |  | `false` | Whether this is just a button (no panel) |
| `toggleRail` | `boolean` |  | `false` | Toggle rail expansion when clicked |
| `iconColor` | `string` |  |  | Custom color for the icon (CSS color value or Tailwind class) |

## Input

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `inputSize` | `enum` |  | `md` | Input size variant |
| `error` | `boolean` |  |  | Error state |
| `startAdornment` | `ReactNode` |  |  | Start adornment |
| `endAdornment` | `ReactNode` |  |  | End adornment |
| `containerClassName` | `string` |  |  | Wrapper class (when using adornments) |

## InputAdornment

InputAdornment - A wrapper component for input adornments (icons, text, etc.)  Can be used standalone or with Input/TextField components.

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `position` | `enum` |  | `start` | Position of the adornment |
| `disablePointerEvents` | `boolean` |  | `false` | Disable pointer events (useful for icons) |

## LinearProgress

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `value` | `number` |  |  | Progress value (0-100). If undefined, shows indeterminate state |
| `variant` | `enum` |  | `default` | Color variant |
| `size` | `enum` |  | `md` | Size of the progress bar |
| `showValue` | `boolean` |  | `false` | Whether to show the value label |
| `formatValue` | `(value: number) => string` |  | `(v) => `${Math.round(v)}%`` | Custom label format |
| `animated` | `boolean` |  | `true` | Whether to animate (only for determinate progress) |

## LineChart

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `data` | `any[]` |  | `[]` | Chart data |
| `dataKey` | `string` | yes |  | Data key for the line |
| `dataKeys` | `{ dataKey: string; stroke?: string; name?: string; }[]` |  |  | Multiple data keys for multiple lines |
| `stroke` | `string` |  |  | Stroke color for single line |
| `name` | `string` |  | `Point` | Line name for legend |
| `width` | `string \| number` |  | `300` | Width of the chart |
| `height` | `string \| number` |  | `300` | Height of the chart |
| `margin` | `{ top?: number; right?: number; bottom?: number; left?: number; }` |  | `{ top: 20, right: 30, left: 20, bottom: 5 }` | Margin around the chart |
| `showGrid` | `boolean` |  | `true` | Show grid lines |
| `showTooltip` | `boolean` |  | `true` | Show tooltip |
| `showLegend` | `boolean` |  | `false` | Show legend |
| `xAxis` | `{ dataKey?: string; type?: "number" \| "category"; hide?: boolean; label?: string; }` |  |  | X-axis configuration |
| `yAxis` | `{ type?: "number" \| "category"; hide?: boolean; label?: string; }` |  |  | Y-axis configuration |
| `className` | `string` |  |  | Additional CSS classes |

## List

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `dividers` | `boolean` |  | `false` | Whether the list has dividers between items |
| `dense` | `boolean` |  | `false` | Compact mode — reduces item padding |
| `clickable` | `boolean` |  | `false` | Whether items are clickable (adds hover styles to all children) |
| `disablePadding` | `boolean` |  | `false` | Removes the list container's vertical padding |

## ListDivider

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `inset` | `boolean` |  | `false` | Whether the divider is inset (indented to align with item text) |

## ListItem

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `selected` | `boolean` |  | `false` | Whether this item is selected/active |
| `disabled` | `boolean` |  | `false` | Whether this item is disabled |
| `clickable` | `boolean` |  | `false` | @deprecated Prefer using ListItemButton for interactive items |
| `leading` | `ReactNode` |  |  | Leading element (icon, avatar, etc.) |
| `trailing` | `ReactNode` |  |  | Trailing element (icon, action, etc.) |
| `secondaryAction` | `ReactNode` |  |  | Secondary action element (absolutely positioned at end) |
| `inset` | `boolean` |  | `false` | Indents the item to align with items that have a leading icon/avatar |
| `disableGutters` | `boolean` |  | `false` | Removes left and right padding |
| `alignItems` | `enum` |  | `center` | Vertical alignment for multi-line content |

## ListItemButton

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `selected` | `boolean` |  | `false` | Whether this item is selected/active |
| `dense` | `boolean` |  | `false` | Compact mode — reduces padding |
| `disableGutters` | `boolean` |  | `false` | Removes left and right padding |
| `divider` | `boolean` |  | `false` | Adds a bottom border to act as a divider |
| `alignItems` | `enum` |  | `center` | Vertical alignment for multi-line content |
| `autoFocus` | `boolean` |  | `false` | Auto-focuses this element on mount |

## ListItemText

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `primary` | `ReactNode` |  |  | Primary text |
| `secondary` | `ReactNode` |  |  | Secondary text |
| `noWrap` | `boolean` |  | `false` | Whether to prevent text wrapping |
| `inset` | `boolean` |  | `false` | Indents text to align with items that have a leading icon/avatar |
| `primaryTypographyProps` | `HTMLAttributes<HTMLParagraphElement>` |  |  | Additional props forwarded to the primary text element |
| `secondaryTypographyProps` | `HTMLAttributes<HTMLParagraphElement>` |  |  | Additional props forwarded to the secondary text element |

## ListSubheader

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `disableSticky` | `boolean` |  | `false` | Disables sticky positioning (sticky is on by default) |
| `disableGutters` | `boolean` |  | `false` | Removes left and right padding |
| `sticky` | `boolean` |  |  | @deprecated Use disableSticky instead |

## MessageBubble

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `message` | `ChatMessage` | yes |  |  |
| `actions` | `ChatActionsProp` |  |  | Custom action buttons (copy, retry, +your own). |
| `avatar` | `ReactNode` |  |  | Element rendered as the avatar for this message (overrides defaults). |
| `hideAvatar` | `boolean` |  | `false` | Hide avatars entirely. |
| `showTimestamp` | `boolean` |  | `false` | Show the timestamp under the bubble. |
| `renderMarkdown` | `RenderMarkdown` |  |  |  |
| `renderCode` | `RenderCode` |  |  |  |
| `renderPart` | `RenderPart` |  |  |  |
| `className` | `string` |  |  |  |

## MessageBubble

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `message` | `ChatMessage` | yes |  |  |
| `actions` | `ChatActionsProp` |  |  | Custom action buttons (copy, retry, +your own). |
| `avatar` | `ReactNode` |  |  | Element rendered as the avatar for this message (overrides defaults). |
| `hideAvatar` | `boolean` |  | `false` | Hide avatars entirely. |
| `showTimestamp` | `boolean` |  | `false` | Show the timestamp under the bubble. |
| `renderMarkdown` | `RenderMarkdown` |  |  |  |
| `renderCode` | `RenderCode` |  |  |  |
| `renderPart` | `RenderPart` |  |  |  |
| `className` | `string` |  |  |  |

## MessageContent

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `message` | `ChatMessage` | yes |  |  |
| `renderMarkdown` | `RenderMarkdown` |  |  | Plug in a full markdown renderer (e.g. react-markdown). |
| `renderCode` | `RenderCode` |  |  | Plug in a syntax-highlighted code block (e.g. prism-react-renderer). |
| `renderPart` | `RenderPart` |  |  | Render a part yourself; return null to fall back to the default. |

## MessageContent

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `message` | `ChatMessage` | yes |  |  |
| `renderMarkdown` | `RenderMarkdown` |  |  | Plug in a full markdown renderer (e.g. react-markdown). |
| `renderCode` | `RenderCode` |  |  | Plug in a syntax-highlighted code block (e.g. prism-react-renderer). |
| `renderPart` | `RenderPart` |  |  | Render a part yourself; return null to fall back to the default. |

## MessageList

Scrollable message list with "sticky bottom" behavior: it follows new content while you're at the bottom, but won't yank you down if you've scrolled up to read history.

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `messages` | `ChatMessage[]` | yes |  |  |
| `status` | `enum` |  | `idle` |  |
| `actions` | `ChatActionsProp` |  |  |  |
| `hideAvatar` | `boolean` |  |  |  |
| `showTimestamp` | `boolean` |  |  |  |
| `emptyState` | `ReactNode` |  |  | Rendered when there are no messages yet. |
| `typingLabel` | `string` |  |  | Label for the typing indicator. |
| `renderMarkdown` | `RenderMarkdown` |  |  |  |
| `renderCode` | `RenderCode` |  |  |  |
| `renderPart` | `RenderPart` |  |  |  |
| `className` | `string` |  |  |  |

## MessageList

Scrollable message list with "sticky bottom" behavior: it follows new content while you're at the bottom, but won't yank you down if you've scrolled up to read history.

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `messages` | `ChatMessage[]` | yes |  |  |
| `status` | `enum` |  | `idle` |  |
| `actions` | `ChatActionsProp` |  |  |  |
| `hideAvatar` | `boolean` |  |  |  |
| `showTimestamp` | `boolean` |  |  |  |
| `emptyState` | `ReactNode` |  |  | Rendered when there are no messages yet. |
| `typingLabel` | `string` |  |  | Label for the typing indicator. |
| `renderMarkdown` | `RenderMarkdown` |  |  |  |
| `renderCode` | `RenderCode` |  |  |  |
| `renderPart` | `RenderPart` |  |  |  |
| `className` | `string` |  |  |  |

## MonthPicker

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `value` | `Date` |  |  |  |
| `defaultValue` | `Date` |  |  |  |
| `onChange` | `(date: Date) => void` |  |  |  |
| `format` | `string` |  |  | dayjs format string, default: MM/YYYY |
| `placeholder` | `string` |  |  |  |
| `minDate` | `Date` |  |  |  |
| `maxDate` | `Date` |  |  |  |
| `disabled` | `boolean` |  |  |  |
| `readOnly` | `boolean` |  |  |  |
| `label` | `string` |  |  |  |
| `required` | `boolean` |  |  |  |
| `className` | `string` |  |  |  |
| `disableInput` | `boolean` |  |  | Hide the text input — show only a button trigger |
| `disableCalendar` | `boolean` |  |  | Disable the calendar/popover — text input only |
| `variant` | `enum` |  |  |  |

## MultiProgressDonut

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `data` | `{ [key: string]: any; value: number; label?: string; }[]` |  | `[]` | Array of data items with value and label |
| `size` | `number` |  | `80` | Size of each donut chart |
| `outerRadius` | `number` |  | `35` | Outer radius |
| `strokeWidth` | `number` |  | `8` | Stroke width for the progress arc |
| `backgroundColor` | `string` |  | `#e2e8f0` | Background stroke color |
| `backgroundStrokeWidth` | `number` |  | `8` | Background stroke width |
| `showPercentage` | `boolean` |  | `true` | Show percentage text in center |
| `getColor` | `(value: number) => [string, string]` |  |  | Custom color logic based on value |
| `enableShadows` | `boolean` |  | `true` | Enable shadows |
| `enableGradients` | `boolean` |  | `true` | Enable gradients |
| `className` | `string` |  |  | Additional CSS classes |

## NavItem

A navigation / list row with a leading icon, label, active state, and a trailing slot — the sidebar/list item that was hand-rolled in every shell. Renders a real `<button>` (keyboard-operable) or an `<a>` when `href` is set.

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `icon` | `ReactNode` |  |  | Leading icon (auto-sized) |
| `active` | `boolean` |  |  | Active/selected state |
| `endAdornment` | `ReactNode` |  |  | Trailing content — a count, badge, or shortcut |
| `href` | `string` |  |  | Renders an anchor instead of a button |
| `onClick` | `() => void` |  |  |  |
| `disabled` | `boolean` |  |  |  |

## PackedBubbleChart

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `data` | `PackedBubbleDataItem[]` |  | `[]` | Chart data |
| `title` | `string` |  |  | Title displayed above the chart |
| `height` | `string \| number` |  | `300` | Height of the chart |
| `minSize` | `number` |  | `30` | Minimum bubble size as percentage |
| `maxSize` | `number` |  | `70` | Maximum bubble size as percentage |
| `defaultColor` | `string` |  | `#6933d3` | Default color for bubbles |
| `colorByValue` | `(value: number) => string` |  |  | Color function based on value |
| `showLabels` | `boolean` |  | `true` | Show labels inside bubbles |
| `showValues` | `boolean` |  | `false` | Show values inside bubbles |
| `onBubbleClick` | `(item: PackedBubbleDataItem) => void` |  |  | Click handler for bubbles |
| `titleStyle` | `CSSProperties` |  |  | Title text style |
| `className` | `string` |  |  | Additional CSS classes |

## PaginationLink

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `isActive` | `boolean` |  |  |  |
| `variant` | `enum` |  |  |  |
| `size` | `enum` |  |  |  |
| `color` | `enum` |  |  |  |
| `fullWidth` | `boolean` |  |  | Whether the button should take the full width of its container |
| `loading` | `boolean` |  |  | Shows a loading spinner and disables the button |
| `startIcon` | `ReactNode` |  |  | Element rendered before the button label |
| `endIcon` | `ReactNode` |  |  | Element rendered after the button label |

## PaginationNext

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `variant` | `enum` |  |  |  |
| `size` | `enum` |  |  |  |
| `color` | `enum` |  |  |  |
| `fullWidth` | `boolean` |  |  | Whether the button should take the full width of its container |
| `loading` | `boolean` |  |  | Shows a loading spinner and disables the button |
| `startIcon` | `ReactNode` |  |  | Element rendered before the button label |
| `endIcon` | `ReactNode` |  |  | Element rendered after the button label |

## PaginationPrevious

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `variant` | `enum` |  |  |  |
| `size` | `enum` |  |  |  |
| `color` | `enum` |  |  |  |
| `fullWidth` | `boolean` |  |  | Whether the button should take the full width of its container |
| `loading` | `boolean` |  |  | Shows a loading spinner and disables the button |
| `startIcon` | `ReactNode` |  |  | Element rendered before the button label |
| `endIcon` | `ReactNode` |  |  | Element rendered after the button label |

## PieChart

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `data` | `any[]` |  | `[]` | Chart data |
| `dataKey` | `string` | yes |  | Data key for the pie slices |
| `nameKey` | `string` |  |  | Name key for labels |
| `colors` | `string[]` |  |  | Colors for pie slices |
| `innerRadius` | `number` |  | `60` | Inner radius for donut effect (set to create donut chart) |
| `outerRadius` | `number` |  | `35` | Outer radius |
| `cx` | `string \| number` |  | `50%` | Center coordinates |
| `cy` | `string \| number` |  | `50%` |  |
| `width` | `string \| number` |  | `300` | Width of the chart |
| `height` | `string \| number` |  | `300` | Height of the chart |
| `showTooltip` | `boolean` |  | `true` | Show tooltip |
| `showLegend` | `boolean` |  | `false` | Show legend |
| `className` | `string` |  |  | Additional CSS classes |

## Popover

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `children` | `ReactNode` | yes |  | Trigger element |
| `content` | `ReactNode` | yes |  | Content shown inside the floating panel |
| `side` | `enum` |  | `bottom` | Side where the panel appears |
| `align` | `enum` |  | `center` | Alignment relative to the trigger |
| `sideOffset` | `number` |  | `6` | Offset from the trigger in px |
| `open` | `boolean` |  |  | Controlled open state |
| `onOpenChange` | `(open: boolean) => void` |  |  | Callback when open state changes |
| `defaultOpen` | `boolean` |  |  | Default open state (uncontrolled) |
| `modal` | `boolean` |  | `false` | When true: scroll locked + focus trapped (like MUI Popover / Dialog). When false (default): non-blocking float (like MUI Popper). |
| `showArrow` | `boolean` |  | `false` | Show an arrow pointing to the trigger |
| `className` | `string` |  |  | Additional className for the content panel |

## PopoverAnchor

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `asChild` | `boolean` |  |  |  |

## PopoverArrow

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `asChild` | `boolean` |  |  |  |

## PopoverClose

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `asChild` | `boolean` |  |  |  |

## PopoverContent

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `showArrow` | `boolean` |  | `false` | Show an arrow pointing to the trigger |
| `asChild` | `boolean` |  |  |  |

## PopoverTrigger

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `asChild` | `boolean` |  |  |  |

## Popper

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `className` | `string` |  |  | Additional className for the content panel |
| `content` | `ReactNode` | yes |  | Content shown inside the floating panel |
| `children` | `ReactNode` | yes |  | Trigger element |
| `defaultOpen` | `boolean` |  |  | Default open state (uncontrolled) |
| `open` | `boolean` |  |  | Controlled open state |
| `onOpenChange` | `(open: boolean) => void` |  |  | Callback when open state changes |
| `align` | `enum` |  | `center` | Alignment relative to the trigger |
| `side` | `enum` |  | `bottom` | Side where the panel appears |
| `sideOffset` | `number` |  | `6` | Offset from the trigger in px |
| `showArrow` | `boolean` |  | `false` | Show an arrow pointing to the trigger |

## Progress

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `value` | `number` |  |  | Progress value (0-100). If undefined, shows indeterminate state |
| `variant` | `enum` |  | `default` | Color variant |
| `size` | `enum` |  | `md` | Size of the progress bar |
| `showValue` | `boolean` |  | `false` | Whether to show the value label |
| `formatValue` | `(value: number) => string` |  | `(v) => `${Math.round(v)}%`` | Custom label format |
| `animated` | `boolean` |  | `true` | Whether to animate (only for determinate progress) |

## ProgressCard

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `questionNum` | `string \| number` | yes |  | Question number or identifier |
| `percentage` | `number` | yes |  | Percentage value (0-100) |
| `onClick` | `(questionNum: string \| number) => void` |  |  | Optional click handler |
| `donutSize` | `number` |  | `50` | Size of the donut chart |
| `strokeWidth` | `number` |  | `8` | Stroke width for the progress arc |
| `backgroundColor` | `string` |  | `#e2e8f0` | Background stroke color |
| `getColor` | `(percentage: number) => [string, string]` |  |  | Custom color logic based on percentage |
| `enableShadows` | `boolean` |  | `true` | Enable shadows |
| `enableGradients` | `boolean` |  | `true` | Enable gradients |
| `typography` | `{ questionFontSize?: string; percentageFontSize?: string; questionColor?: string; percentageColorAuto?: boolean; }` |  | `{     questionFontSize: 'text-sm',     percentageFontSize: 'text-base',     questionColor: 'text-gray-700 dark:text-gray-300',     percentageColorAuto: true,   }` | Typography options |
| `className` | `string` |  |  | Additional CSS classes |

## ProgressDonut

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `data` | `{ [key: string]: any; value: number; label?: string; }[]` |  | `[]` | Array of data items with value and label |
| `width` | `string \| number` |  | `300` | Width of the chart |
| `height` | `string \| number` |  | `300` | Height of the chart |
| `innerRadius` | `number` |  | `60` | Inner radius for donut effect |
| `outerRadius` | `number` |  | `35` | Outer radius |
| `showTooltip` | `boolean` |  | `true` | Show tooltip |
| `showLegend` | `boolean` |  | `false` | Show legend |
| `getColor` | `(value: number) => string` |  |  | Custom color logic based on value |
| `className` | `string` |  |  | Additional CSS classes |

## RadarChart

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `data` | `any[]` |  | `[]` | Chart data |
| `dataKey` | `string` | yes |  | Data key for the radar values |
| `nameKey` | `string` | yes |  | Name key for labels |
| `fill` | `string` |  |  | Fill color |
| `stroke` | `string` |  |  | Stroke color |
| `name` | `string` |  | `Point` | Radar name for legend |
| `width` | `string \| number` |  | `300` | Width of the chart |
| `height` | `string \| number` |  | `300` | Height of the chart |
| `showTooltip` | `boolean` |  | `true` | Show tooltip |
| `showLegend` | `boolean` |  | `false` | Show legend |
| `className` | `string` |  |  | Additional CSS classes |

## Radio

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `label` | `ReactNode` |  |  | Label for the radio |
| `description` | `ReactNode` |  |  | Description text |
| `id` | `string` |  |  | ID for accessibility |
| `size` | `enum` |  | `md` | Size override for individual item |
| `asChild` | `boolean` |  |  |  |

## RadioGroup

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `orientation` | `enum` |  | `vertical` | Orientation of the radio group |
| `size` | `enum` |  | `md` | Size of radio items |
| `asChild` | `boolean` |  |  |  |

## RadioGroupItem

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `size` | `enum` |  | `md` | Size override for individual item |
| `asChild` | `boolean` |  |  |  |

## RailPanel

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `railId` | `string` | yes |  | Which rail this panel belongs to |
| `title` | `string` |  |  | Panel title |

## RailPanelGroup

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `label` | `string` |  |  | Group label |

## RailPanelItem

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `icon` | `ReactNode` |  |  | Icon element |
| `active` | `boolean` |  |  | Whether this item is active |
| `disabled` | `boolean` |  |  | Whether this item is disabled |
| `badge` | `ReactNode` |  |  | Badge or count |
| `href` | `string` |  |  | Link href |

## RangeSlider

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `value` | `[number, number]` |  |  | Current min and max values as tuple [min, max] |
| `defaultValue` | `[number, number]` |  |  | Default min and max values as tuple [min, max] |
| `onChange` | `(value: [number, number]) => void` |  |  | Change handler - receives [min, max] tuple |
| `showValues` | `boolean` |  | `true` | Show value labels |
| `valuePosition` | `enum` |  | `top` | Value labels position |
| `valueFormatter` | `(value: number) => string` |  |  | Custom value formatter |
| `minLabel` | `string` |  | `Min` | Min label |
| `maxLabel` | `string` |  | `Max` | Max label |
| `className` | `string` |  |  | Additional CSS classes |
| `asChild` | `boolean` |  |  |  |

## ScatterChart

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `data` | `any[]` |  | `[]` | Chart data |
| `xDataKey` | `string` | yes |  | X-axis data key |
| `yDataKey` | `string` | yes |  | Y-axis data key |
| `fill` | `string` |  |  | Fill color for points |
| `name` | `string` |  | `Point` | Point name for legend |
| `width` | `string \| number` |  | `300` | Width of the chart |
| `height` | `string \| number` |  | `300` | Height of the chart |
| `margin` | `{ top?: number; right?: number; bottom?: number; left?: number; }` |  | `{ top: 20, right: 30, left: 20, bottom: 5 }` | Margin around the chart |
| `showGrid` | `boolean` |  | `true` | Show grid lines |
| `showTooltip` | `boolean` |  | `true` | Show tooltip |
| `showLegend` | `boolean` |  | `false` | Show legend |
| `xAxis` | `{ type?: "number" \| "category"; hide?: boolean; label?: string; }` |  |  | X-axis configuration |
| `yAxis` | `{ type?: "number" \| "category"; hide?: boolean; label?: string; }` |  |  | Y-axis configuration |
| `className` | `string` |  |  | Additional CSS classes |

## SelectContent

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `asChild` | `boolean` |  |  |  |

## SelectField

Select with a label + helper/error, structured **identically to TextField** (grid gap-1.5, text-sm label, text-sm helper) so Select fields line up with TextField fields in the same form row — the alignment gap that forced a hand-built field in the checkout example.

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `label` | `ReactNode` |  |  |  |
| `helperText` | `ReactNode` |  |  |  |
| `errorMessage` | `ReactNode` |  |  |  |
| `required` | `boolean` |  |  |  |
| `placeholder` | `string` |  |  |  |
| `value` | `string` |  |  |  |
| `defaultValue` | `string` |  |  |  |
| `onValueChange` | `(value: string) => void` |  |  |  |
| `options` | `SelectFieldOption[]` |  |  | Options as data; or pass SelectItem children directly |
| `id` | `string` |  |  |  |
| `disabled` | `boolean` |  |  |  |
| `className` | `string` |  |  |  |

## SelectGroup

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `asChild` | `boolean` |  |  |  |

## SelectItem

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `asChild` | `boolean` |  |  |  |

## SelectLabel

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `asChild` | `boolean` |  |  |  |

## SelectNamespace

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `value` | `string` |  |  |  |
| `defaultValue` | `string` |  |  |  |
| `onValueChange` | `(value: string) => void` |  |  |  |

## SelectScrollDownButton

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `asChild` | `boolean` |  |  |  |

## SelectScrollUpButton

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `asChild` | `boolean` |  |  |  |

## SelectSeparator

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `asChild` | `boolean` |  |  |  |

## SelectTrigger

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `asChild` | `boolean` |  |  |  |

## SelectValue

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `asChild` | `boolean` |  |  |  |

## Separator

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `orientation` | `enum` |  | `horizontal` |  |

## SheetClose

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `asChild` | `boolean` |  |  |  |

## SheetContent

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `side` | `enum` |  | `right` | Side from which the drawer slides in |
| `showClose` | `boolean` |  | `true` | Whether to show the close button |
| `asChild` | `boolean` |  |  |  |

## SheetDescription

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `asChild` | `boolean` |  |  |  |

## SheetOverlay

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `asChild` | `boolean` |  |  |  |

## SheetTitle

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `asChild` | `boolean` |  |  |  |

## SheetTrigger

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `asChild` | `boolean` |  |  |  |

## Sidebar

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `collapsed` | `boolean` |  |  | Whether the sidebar is collapsed |
| `onCollapsedChange` | `(collapsed: boolean) => void` |  |  | Callback when collapsed state changes |
| `defaultCollapsed` | `boolean` |  | `false` | Default collapsed state (uncontrolled) |
| `width` | `string \| number` |  | `256` | Width when expanded |
| `collapsedWidth` | `string \| number` |  | `64` | Width when collapsed |
| `bordered` | `boolean` |  | `true` | Whether the sidebar has a right border |

## SidebarGroup

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `label` | `string` |  |  | Group label |

## SidebarHeader

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `accentColor` | `boolean` |  | `false` | Use accent color for text |

## SidebarItem

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `icon` | `ReactNode` |  |  | Icon element |
| `active` | `boolean` |  |  | Whether this item is active |
| `disabled` | `boolean` |  |  | Whether this item is disabled |
| `badge` | `ReactNode` |  |  | Badge or count to show |
| `onClick` | `() => void` |  |  | Click handler |
| `href` | `string` |  |  | Link href |

## SidebarRail

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `defaultActiveRail` | `string` |  | `null` | Default active rail |
| `activeRail` | `string` |  |  | Controlled active rail |
| `onActiveRailChange` | `(rail: string) => void` |  |  | Callback when active rail changes |
| `hoverExpand` | `boolean` |  | `false` | Whether the panel expands on hover (vs click) |
| `railWidth` | `number` |  | `56` | Width of the icon rail |
| `panelWidth` | `number` |  | `240` | Width of the expanded panel |
| `expandableRail` | `boolean` |  | `false` | Whether the icon rail can expand to show labels |
| `defaultRailExpanded` | `boolean` |  | `false` | Default rail expanded state (uncontrolled) |
| `railExpanded` | `boolean` |  |  | Controlled rail expanded state |
| `onRailExpandedChange` | `(expanded: boolean) => void` |  |  | Callback when rail expanded state changes |
| `railExpandedWidth` | `number` |  | `220` | Width of expanded rail (labels visible) |
| `overlayRail` | `boolean` |  | `false` | Overlay expanded rail on top of secondary panel instead of taking layout space |

## SidebarSubMenu

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `icon` | `ReactNode` |  |  | Icon element |
| `label` | `string` | yes |  | Label text |
| `defaultOpen` | `boolean` |  | `false` | Whether the submenu is open by default |

## Skeleton

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `variant` | `enum` |  | `text` | Variant of the skeleton shape |
| `width` | `string \| number` |  |  | Width of the skeleton (can be number for px or string for any CSS value) |
| `height` | `string \| number` |  |  | Height of the skeleton (can be number for px or string for any CSS value) |
| `animation` | `enum` |  | `pulse` | Whether to animate the skeleton |

## SkeletonAvatar

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `size` | `enum` |  | `md` | Size of the avatar skeleton |
| `animation` | `enum` |  | `pulse` | Animation type |

## SkeletonCard

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `hasImage` | `boolean` |  | `true` | Whether to show an image placeholder |
| `imageHeight` | `number` |  | `200` | Image height |
| `lines` | `number` |  | `3` | Number of text lines |
| `animation` | `enum` |  | `pulse` | Animation type |

## SkeletonTableRow

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `columns` | `number` |  | `4` | Number of columns |
| `animation` | `enum` |  | `pulse` | Animation type |

## SkeletonText

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `lines` | `number` |  | `3` | Number of lines |
| `lastLineWidth` | `number \| "full"` |  | `60` | Width of the last line (percentage or 'full') |
| `gap` | `enum` |  | `md` | Gap between lines |
| `animation` | `enum` |  | `pulse` | Animation type |

## Slider

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `value` | `number` |  |  | Current value |
| `defaultValue` | `number` |  |  | Default value |
| `onChange` | `(value: number) => void` |  |  | Change handler |
| `showValue` | `boolean` |  | `false` | Show value label |
| `valuePosition` | `enum` |  | `top` | Value label position |
| `valueFormatter` | `(value: number) => string` |  |  | Custom value formatter |
| `className` | `string` |  |  | Additional CSS classes |
| `asChild` | `boolean` |  |  |  |

## Snackbar

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `open` | `boolean` | yes |  | Whether the snackbar is visible |
| `message` | `ReactNode` |  |  | Simple text/node — used when no children provided |
| `action` | `ReactNode` |  |  | Action element rendered inside SnackbarContent |
| `autoHideDuration` | `number` |  | `6000` | Ms before auto-close. null to disable. |
| `onClose` | `(event: Event \| SyntheticEvent<Element, Event>, reason: SnackbarCloseReason) => void` |  |  | Fired when the snackbar wants to close |
| `anchorOrigin` | `SnackbarOrigin` |  | `{ vertical: 'bottom', horizontal: 'left' }` | Position on screen |
| `transitionDuration` | `number` |  | `225` | Transition duration in ms |
| `disableWindowBlurListener` | `boolean` |  | `false` | Don't pause timer when window loses focus |
| `disablePortal` | `boolean` |  | `false` | Render inline instead of in a portal |
| `children` | `ReactNode` |  |  | Use <Alert> or any custom content |

## SnackbarContent

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `message` | `ReactNode` |  |  |  |
| `action` | `ReactNode` |  |  |  |

## SnackbarProvider

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `anchorOrigin` | `SnackbarOrigin` |  | `{ vertical: 'bottom', horizontal: 'left' }` | Default anchor position |
| `autoHideDuration` | `number` |  | `6000` | Default auto-hide duration in ms |
| `maxSnack` | `number` |  | `3` | Max snackbars shown at once |
| `transitionDuration` | `number` |  | `225` | Transition duration in ms |

## Spinner

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `size` | `enum` |  | `default` |  |

## Stack

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `direction` | `enum` |  | `column` | Stack direction |
| `spacing` | `enum` |  |  | Spacing between items |
| `gap` | `enum` |  |  | Alias for `spacing` (matches the Box/Grid vocabulary) |
| `align` | `enum` |  |  | Align items |
| `alignItems` | `enum` |  |  | Alias for `align` (matches the Box vocabulary) |
| `justify` | `enum` |  |  | Justify content |
| `justifyContent` | `enum` |  |  | Alias for `justify` (matches the Box vocabulary) |
| `p` | `enum` |  |  | Padding (all sides) — matches the Box spacing vocabulary |
| `px` | `enum` |  |  | Horizontal padding |
| `py` | `enum` |  |  | Vertical padding |
| `wrap` | `enum` |  |  | Wrap items |
| `flexWrap` | `enum` |  |  | Alias for `wrap` (matches the Box vocabulary) |
| `grow` | `boolean` |  |  | Grow to fill available space along the parent flex axis (flex: 1 1 0%) |
| `shrink` | `boolean` |  |  | Set to `false` to prevent flex shrinking (applies `shrink-0`) |
| `minH` | `enum` |  |  | Min height. `0` is required on a growing flex child for inner scroll to engage. |
| `minW` | `enum` |  |  | Min width. `0` lets a flex child shrink below its content. |
| `divider` | `ReactNode` |  |  | Divider between items |
| `as` | `ElementType<any, keyof IntrinsicElements>` |  | `div` | Render as a different element |

## Stat

A labelled metric tile — the single most-repeated dashboard pattern. Renders an overline label, a large tabular value, and an optional colour-coded delta/trend. Wrap-free: use directly in a Grid.

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `label` | `ReactNode` | yes |  | Small overline label, e.g. "Present today" |
| `value` | `ReactNode` | yes |  | The primary metric value (rendered large, with tabular figures) |
| `delta` | `ReactNode` |  |  | Optional change indicator, e.g. "+2.1%" |
| `trend` | `enum` |  | `flat` | Arrow direction next to the delta. Defaults to `flat` (no arrow). |
| `sentiment` | `enum` |  |  | Colour of the delta, independent of arrow direction. Defaults to deriving from `trend` (up→positive/green, down→negative/red). Set explicitly for "lower is better" metrics — e.g. `trend="up" sentiment="negative"` gives a red up-arrow for a rising error rate. |
| `hint` | `ReactNode` |  |  | Optional supporting text under the value |
| `icon` | `ReactNode` |  |  | Optional leading icon, shown in a tinted tile on the right |
| `variant` | `enum` |  | `card` | Render as a bordered card (default) or a bare block |

## StatusDot

A small status indicator dot (health, online, live). Optionally pulses and can carry a label — replaces the hand-rolled `<span className="h-2 w-2 …" />`.

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `color` | `enum` |  | `neutral` | Semantic colour of the dot |
| `size` | `enum` |  | `md` |  |
| `pulse` | `boolean` |  | `false` | Soft pulsing ring — for "live" / active indicators |
| `label` | `ReactNode` |  |  | Optional text rendered next to the dot |

## Stepper

A step indicator for multi-step flows (checkout, onboarding, wizards). Steps before `active` are complete (filled + check), `active` is highlighted, later steps are muted.

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `steps` | `Step[]` | yes |  |  |
| `active` | `number` | yes |  | Index of the current (active) step |
| `orientation` | `enum` |  | `horizontal` | Orientation |

## TableCell

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `align` | `enum` |  | `left` | Horizontal alignment. Use `right` for numeric columns. |

## TableHead

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `align` | `enum` |  | `left` | Horizontal alignment. Default `left`; use `right` for numeric columns. |

## Tabs

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `asChild` | `boolean` |  |  |  |

## TabsContent

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `asChild` | `boolean` |  |  |  |

## TabsList

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `asChild` | `boolean` |  |  |  |

## TabsTrigger

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `asChild` | `boolean` |  |  |  |

## Text

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `color` | `enum` |  | `inherit` | Text color |
| `fontWeight` | `enum` |  |  | Font weight override |
| `opacity` | `number` |  |  | Opacity |
| `as` | `ElementType<any, keyof IntrinsicElements>` |  |  | Render as a different element |
| `align` | `enum` |  |  | Text alignment |
| `noWrap` | `boolean` |  | `false` | Prevent text wrap |
| `textTransform` | `enum` |  |  | Text transform |
| `verticalAlign` | `enum` |  |  | Vertical alignment |
| `textGradient` | `boolean` |  | `false` | Enable text gradient effect |
| `gradientColor` | `enum` |  | `primary` | Gradient color (when textGradient is true) |
| `gutterBottom` | `boolean` |  | `false` | Disable bottom margin |
| `paragraph` | `boolean` |  | `false` | Paragraph mode (adds bottom margin) |
| `mono` | `boolean` |  | `false` | Monospace font — for code, IDs, timestamps, hashes |
| `tabularNums` | `boolean` |  | `false` | Fixed-width digits so numbers don't jitter column-to-column |

## TextField

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `label` | `ReactNode` |  |  | Label text |
| `helperText` | `ReactNode` |  |  | Helper text shown below input |
| `errorMessage` | `ReactNode` |  |  | Error message (also sets error state) |
| `required` | `boolean` |  |  | Required indicator |
| `size` | `enum` |  | `md` | Size of the text field |
| `fullWidth` | `boolean` |  |  | Full width mode |
| `startAdornment` | `ReactNode` |  |  | Start adornment (icon, text, etc.) |
| `endAdornment` | `ReactNode` |  |  | End adornment (icon, text, etc.) |
| `inputProps` | `InputHTMLAttributes<HTMLInputElement>` |  |  | Input element props (MUI-compatible) |
| `InputProps` | `{ startAdornment?: ReactNode; endAdornment?: ReactNode; className?: string; containerClassName?: string; }` |  |  | Input container/slot props (MUI-compatible) |
| `InputLabelProps` | `LabelHTMLAttributes<HTMLLabelElement>` |  |  | Input label props (MUI-compatible) |
| `inputRef` | `Ref<HTMLInputElement>` |  |  | Input ref (MUI-compatible) |
| `error` | `boolean` |  |  | Error state |
| `containerClassName` | `string` |  |  | Wrapper class (when using adornments) |

## TimePicker

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `value` | `string` |  |  | 'HH:mm' \| 'HH:mm:ss' \| 'hh:mm A' \| 'hh:mm:ss A' |
| `defaultValue` | `string` |  |  |  |
| `onChange` | `(time: string) => void` |  |  |  |
| `is12Hour` | `boolean` |  |  |  |
| `showSeconds` | `boolean` |  |  |  |
| `placeholder` | `string` |  |  |  |
| `disabled` | `boolean` |  |  |  |
| `readOnly` | `boolean` |  |  |  |
| `label` | `string` |  |  |  |
| `required` | `boolean` |  |  |  |
| `className` | `string` |  |  |  |
| `disableInput` | `boolean` |  |  | Hide the text input — show only a button trigger |
| `disableCalendar` | `boolean` |  |  | Disable the calendar/popover — text input only |
| `variant` | `enum` |  |  |  |

## ToggleGroup

A single-select segmented control — the "List / Board", "Buy / Sell", "1h / 24h / 7d" pattern that was hand-rolled everywhere. Controlled via `value` + `onValueChange`. Renders an accessible radiogroup.

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `value` | `string` | yes |  | Currently selected value |
| `onValueChange` | `(value: string) => void` | yes |  | Called with the newly selected value |
| `options` | `ToggleOption[]` | yes |  | The segments |
| `size` | `enum` |  | `md` |  |
| `fullWidth` | `boolean` |  |  | Stretch to fill the container, each segment equal width |

## Tooltip

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `content` | `ReactNode` | yes |  | The content to show in the tooltip |
| `children` | `ReactNode` | yes |  | The element that triggers the tooltip |
| `side` | `enum` |  | `top` | Side where the tooltip appears |
| `align` | `enum` |  | `center` | Alignment of the tooltip |
| `delayDuration` | `number` |  | `200` | Delay before showing (ms) |
| `open` | `boolean` |  |  | Whether the tooltip is open (controlled) |
| `onOpenChange` | `(open: boolean) => void` |  |  | Callback when open state changes |
| `disabled` | `boolean` |  | `false` | Whether the tooltip should be disabled |
| `showArrow` | `boolean` |  | `false` | Whether to show an arrow |
| `className` | `string` |  |  | Additional className for the content |

## TooltipArrow

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `asChild` | `boolean` |  |  |  |

## TooltipContent

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `showArrow` | `boolean` |  | `false` | Whether to show an arrow pointing to the trigger |
| `asChild` | `boolean` |  |  |  |

## TooltipTrigger

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `asChild` | `boolean` |  |  |  |

## TopBar

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `bordered` | `boolean` |  | `true` | Whether the topbar has a bottom border |
| `sticky` | `boolean` |  | `false` | Whether the topbar is sticky at the top |
| `size` | `enum` |  | `md` | Height variant |

## TopBarBrand

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `logo` | `ReactNode` |  |  | Logo element or image |
| `name` | `string` |  |  | Brand name text |
| `href` | `string` |  |  | Link href for the brand |

## TopBarNavItem

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `active` | `boolean` |  |  | Whether this nav item is active |

## TopBarSection

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `align` | `enum` |  | `left` | Alignment of the section |

## TypingIndicator

Three bouncing dots shown while the assistant is thinking.

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `label` | `string` |  |  | Optional label shown next to the dots, e.g. "Assistant is typing". |

## TypingIndicator

Three bouncing dots shown while the assistant is thinking.

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `label` | `string` |  |  | Optional label shown next to the dots, e.g. "Assistant is typing". |

## Typography

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `variant` | `enum` |  | `body1` | Typography variant |
| `color` | `enum` |  | `inherit` | Text color |
| `fontWeight` | `enum` |  |  | Font weight override |
| `textTransform` | `enum` |  |  | Text transform |
| `align` | `enum` |  |  | Text alignment |
| `verticalAlign` | `enum` |  |  | Vertical alignment |
| `textGradient` | `boolean` |  | `false` | Enable text gradient effect |
| `gradientColor` | `enum` |  | `primary` | Gradient color (when textGradient is true) |
| `opacity` | `number` |  |  | Opacity |
| `as` | `ElementType<any, keyof IntrinsicElements>` |  |  | Render as a different element |
| `gutterBottom` | `boolean` |  | `false` | Disable bottom margin |
| `noWrap` | `boolean` |  | `false` | Prevent text wrap |
| `paragraph` | `boolean` |  | `false` | Paragraph mode (adds bottom margin) |
| `mono` | `boolean` |  | `false` | Monospace font — for code, IDs, timestamps, hashes |
| `tabularNums` | `boolean` |  | `false` | Fixed-width digits so numbers don't jitter column-to-column |

## UnderlineTabsContent

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `asChild` | `boolean` |  |  |  |

## UnderlineTabsList

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `asChild` | `boolean` |  |  |  |

## UnderlineTabsTrigger

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `count` | `number` |  |  | Optional count badge displayed next to the label |
| `asChild` | `boolean` |  |  |  |

## useChat

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `transport` | `ChatTransport` | yes |  | The function that talks to your backend/agent. Required for connected mode. |
| `initialMessages` | `ChatMessage[]` |  |  | Messages the conversation starts with. |
| `onError` | `(error: unknown) => void` |  |  | Called when the transport throws (network error, abort is ignored). |
| `onFinish` | `(message: ChatMessage) => void` |  |  | Called after an assistant turn finishes streaming. |
| `generateId` | `() => string` |  |  | Override id generation (e.g. to use uuid). |

## VerticalTabs

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `asChild` | `boolean` |  |  |  |

## VerticalTabsContent

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `asChild` | `boolean` |  |  |  |

## VerticalTabsList

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `asChild` | `boolean` |  |  |  |

## VerticalTabsTrigger

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `icon` | `ReactNode` |  |  | Icon element rendered before the label |
| `asChild` | `boolean` |  |  |  |

## VirtualList

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `items` | `T[]` | yes |  | Array of items to render |
| `itemHeight` | `number` |  | `48` | Fixed height of each row in pixels |
| `height` | `number` |  | `400` | Height of the scrollable container in pixels |
| `overscan` | `number` |  | `5` | Number of extra items to render beyond the visible area |
| `renderItem` | `(item: T, index: number) => ReactNode` | yes |  | Render function called for each item |
| `className` | `string` |  |  |  |

## VStack

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `p` | `enum` |  |  | Padding (all sides) — matches the Box spacing vocabulary |
| `spacing` | `enum` |  |  | Spacing between items |
| `as` | `ElementType<any, keyof IntrinsicElements>` |  | `div` | Render as a different element |
| `align` | `enum` |  |  | Align items |
| `wrap` | `enum` |  |  | Wrap items |
| `alignItems` | `enum` |  |  | Alias for `align` (matches the Box vocabulary) |
| `justifyContent` | `enum` |  |  | Alias for `justify` (matches the Box vocabulary) |
| `flexWrap` | `enum` |  |  | Alias for `wrap` (matches the Box vocabulary) |
| `gap` | `enum` |  |  | Alias for `spacing` (matches the Box/Grid vocabulary) |
| `px` | `enum` |  |  | Horizontal padding |
| `py` | `enum` |  |  | Vertical padding |
| `grow` | `boolean` |  |  | Grow to fill available space along the parent flex axis (flex: 1 1 0%) |
| `shrink` | `boolean` |  |  | Set to `false` to prevent flex shrinking (applies `shrink-0`) |
| `minH` | `enum` |  |  | Min height. `0` is required on a growing flex child for inner scroll to engage. |
| `minW` | `enum` |  |  | Min width. `0` lets a flex child shrink below its content. |
| `divider` | `ReactNode` |  |  | Divider between items |
| `justify` | `enum` |  |  | Justify content |

## YearPicker

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `value` | `number` |  |  |  |
| `defaultValue` | `number` |  |  |  |
| `onChange` | `(year: number) => void` |  |  |  |
| `placeholder` | `string` |  |  |  |
| `minYear` | `number` |  |  |  |
| `maxYear` | `number` |  |  |  |
| `disabled` | `boolean` |  |  |  |
| `readOnly` | `boolean` |  |  |  |
| `label` | `string` |  |  |  |
| `required` | `boolean` |  |  |  |
| `className` | `string` |  |  |  |
| `disableInput` | `boolean` |  |  | Hide the text input — show only a button trigger |
| `disableCalendar` | `boolean` |  |  | Disable the calendar/popover — text input only |
| `variant` | `enum` |  |  |  |

