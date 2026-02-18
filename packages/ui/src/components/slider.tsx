import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "../utils/cn";

export interface SliderProps extends Omit<
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>,
  "onValueChange" | "value" | "defaultValue" | "onChange"
> {
  /** Current value */
  value?: number;
  /** Default value */
  defaultValue?: number;
  /** Change handler */
  onChange?: (value: number) => void;
  /** Show value label */
  showValue?: boolean;
  /** Value label position */
  valuePosition?: "top" | "bottom" | "left" | "right";
  /** Custom value formatter */
  valueFormatter?: (value: number) => string;
  /** Additional CSS classes */
  className?: string;
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({
  className,
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue,
  onChange,
  showValue = false,
  valuePosition = "top",
  valueFormatter,
  disabled = false,
  ...props
}, ref) => {
  const [internalValue, setInternalValue] = React.useState<number[]>(
    value !== undefined ? [value] : defaultValue !== undefined ? [defaultValue] : [50]
  );

  // Sync with external value prop
  React.useEffect(() => {
    if (value !== undefined) {
      setInternalValue([value]);
    }
  }, [value]);

  const handleValueChange = (newValue: number[]) => {
    setInternalValue(newValue);
    onChange?.(newValue[0]);
  };

  const currentValue = internalValue[0];
  const displayValue = valueFormatter
    ? valueFormatter(currentValue)
    : currentValue.toString();

  const sliderElement = (
    <SliderPrimitive.Root
      ref={ref}
      min={min}
      max={max}
      step={step}
      value={internalValue}
      onValueChange={handleValueChange}
      disabled={disabled}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-muted">
        <SliderPrimitive.Range className="absolute h-full bg-accent" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-accent bg-background shadow-lg ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent/10 active:bg-accent/20" />
    </SliderPrimitive.Root>
  );

  if (!showValue) {
    return sliderElement;
  }

  const valueElement = (
    <div className="text-sm font-medium text-foreground whitespace-nowrap">
      {displayValue}
    </div>
  );

  const containerClasses = {
    top: "flex flex-col items-center gap-2",
    bottom: "flex flex-col items-center gap-2",
    left: "flex items-center gap-3",
    right: "flex items-center gap-3",
  };

  const orderMap = {
    top: (
      <>
        {valueElement}
        {sliderElement}
      </>
    ),
    bottom: (
      <>
        {sliderElement}
        {valueElement}
      </>
    ),
    left: (
      <>
        {valueElement}
        {sliderElement}
      </>
    ),
    right: (
      <>
        {sliderElement}
        {valueElement}
      </>
    ),
  };

  return (
    <div className={containerClasses[valuePosition]}>
      {orderMap[valuePosition]}
    </div>
  );
});

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
