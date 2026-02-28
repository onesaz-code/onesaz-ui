import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "../utils/cn";

export interface RangeSliderProps extends Omit<
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>,
  "onValueChange" | "value" | "defaultValue" | "onChange"
> {
  /** Current min and max values as tuple [min, max] */
  value?: [number, number];
  /** Default min and max values as tuple [min, max] */
  defaultValue?: [number, number];
  /** Change handler - receives [min, max] tuple */
  onChange?: (value: [number, number]) => void;
  /** Show value labels */
  showValues?: boolean;
  /** Value labels position */
  valuePosition?: "top" | "bottom";
  /** Custom value formatter */
  valueFormatter?: (value: number) => string;
  /** Min label */
  minLabel?: string;
  /** Max label */
  maxLabel?: string;
  /** Additional CSS classes */
  className?: string;
}

const RangeSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  RangeSliderProps
>(({
  className,
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue,
  onChange,
  showValues = true,
  valuePosition = "top",
  valueFormatter,
  minLabel = "Min",
  maxLabel = "Max",
  disabled = false,
  ...props
}, ref) => {
  const [internalValue, setInternalValue] = React.useState<[number, number]>(
    value !== undefined ? value : defaultValue !== undefined ? defaultValue : [min, max]
  );

  // Sync with external value prop
  React.useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  const handleValueChange = (newValue: number[]) => {
    const rangeValue: [number, number] = [newValue[0], newValue[1]];
    setInternalValue(rangeValue);
    onChange?.(rangeValue);
  };

  const formatValue = (val: number): string => {
    return valueFormatter ? valueFormatter(val) : val.toString();
  };

  const minValue = internalValue[0];
  const maxValue = internalValue[1];

  return (
    <div className={cn("w-full", className)}>
      {/* Labels on top */}
      {showValues && valuePosition === "top" && (
        <div className="flex justify-between mb-2">
          <div className="flex flex-col items-start">
            <span className="text-xs text-muted-foreground">{minLabel}</span>
            <span className="text-sm font-semibold text-accent">{formatValue(minValue)}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-xs text-muted-foreground">{maxLabel}</span>
            <span className="text-sm font-semibold text-accent">{formatValue(maxValue)}</span>
          </div>
        </div>
      )}

      {/* Slider */}
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
        )}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-muted">
          <SliderPrimitive.Range className="absolute h-full bg-gradient-to-r from-accent via-accent to-accent/80" />
        </SliderPrimitive.Track>
        {/* Min Thumb */}
        <SliderPrimitive.Thumb 
          className="block h-5 w-5 rounded-full border-2 border-accent bg-background shadow-lg ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent/10 active:bg-accent/20 cursor-grab active:cursor-grabbing" 
          aria-label={minLabel}
        />
        {/* Max Thumb */}
        <SliderPrimitive.Thumb 
          className="block h-5 w-5 rounded-full border-2 border-accent bg-background shadow-lg ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent/10 active:bg-accent/20 cursor-grab active:cursor-grabbing" 
          aria-label={maxLabel}
        />
      </SliderPrimitive.Root>

      {/* Labels on bottom */}
      {showValues && valuePosition === "bottom" && (
        <div className="flex justify-between mt-2">
          <div className="flex flex-col items-start">
            <span className="text-xs text-muted-foreground">{minLabel}</span>
            <span className="text-sm font-semibold text-accent">{formatValue(minValue)}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-xs text-muted-foreground">{maxLabel}</span>
            <span className="text-sm font-semibold text-accent">{formatValue(maxValue)}</span>
          </div>
        </div>
      )}

      {/* Range indicator */}
      {showValues && (
        <div className="flex justify-center mt-1">
          <span className="text-xs text-muted-foreground">
            Range: {formatValue(minValue)} - {formatValue(maxValue)}
          </span>
        </div>
      )}
    </div>
  );
});

RangeSlider.displayName = "RangeSlider";

export { RangeSlider };
