import * as React from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { cn } from "../../utils/cn";
import { Label } from "../label";

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
  /** Image URL; shown when `imageKey` is set to `"image"` (or pass a custom `imageKey`) */
  image?: string;
}

type ComboboxPrimitiveOption = string;
type ComboboxObjectOption = object;
type ComboboxOptionInput = ComboboxPrimitiveOption | ComboboxObjectOption;
type NormalizedOption<T> = {
  value: string;
  label: string;
  disabled?: boolean;
  /** Resolved image URL for list + trigger, when `imageKey` is set */
  imageSrc?: string;
  raw: T;
};

// ============================================================================
// Shared Props (common to both single and multi)
// ============================================================================
interface ComboboxSharedProps<
  T extends ComboboxOptionInput = ComboboxOptionInput,
> {
  options: T[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  disabled?: boolean;
  className?: string;
  clearable?: boolean;
  openOnFocus?: boolean;
  inputValue?: string;
  onInputChange?: (value: string) => void;
  simpleOptions?: boolean;
  labelKey?: string;
  valueKey?: string;
  /**
   * Object key for an image URL on each option (e.g. `"image"` or `"avatarUrl"`).
   * When set, the dropdown and selected value show that image next to the label.
   * String options never show images.
   */
  imageKey?: string;
  /** Label displayed above the trigger */
  label?: string;
  /** Marks the field as required — shows an asterisk and adds native required to the hidden input */
  required?: boolean;
  /** Node rendered at the start (left) of the trigger button */
  startAdornment?: React.ReactNode;
  /** Click handler for the start adornment — renders it as a button when provided */
  onStartAdornmentClick?: (e: React.MouseEvent) => void;
  /** Node rendered at the end (right) of the trigger button, before the chevron */
  endAdornment?: React.ReactNode;
  /** Click handler for the end adornment — renders it as a button when provided */
  onEndAdornmentClick?: (e: React.MouseEvent) => void;
  /** Enable virtual rendering for large option lists */
  virtual?: boolean;
  /** Height of each option item in pixels (used for virtual rendering) */
  virtualItemHeight?: number;
}

// ============================================================================
// Single Select Combobox Props
// ============================================================================
export interface ComboboxSingleProps<
  T extends ComboboxOptionInput = ComboboxOptionInput,
> extends ComboboxSharedProps<T> {
  value?: T | null;
  defaultValue?: T | null;
  onChange?: (value: T | null) => void;
  multiple?: false;
}

// ============================================================================
// Multi Select Combobox Props
// ============================================================================
export interface ComboboxMultipleProps<
  T extends ComboboxOptionInput = ComboboxOptionInput,
> extends ComboboxSharedProps<T> {
  value?: T[];
  defaultValue?: T[];
  onChange?: (value: T[]) => void;
  multiple: true;
  /** Show select-all option */
  selectAll?: boolean;
  /** Label for select-all option */
  selectAllLabel?: string;
  /** Maximum number of items to display as chips before showing "+N more" */
  maxDisplayItems?: number;
}

export type ComboboxProps = ComboboxSingleProps | ComboboxMultipleProps;

// Type guard to check if props are for multi-select
function isMultipleProps(props: ComboboxProps): props is ComboboxMultipleProps {
  return props.multiple === true;
}

// ============================================================================
// Adornment helper — renders as button (clickable) or span (decorative)
// ============================================================================
function Adornment({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
}) {
  if (onClick) {
    return (
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClick(e);
        }}
        className={cn("shrink-0 rounded p-0.5 hover:bg-muted", className)}
      >
        {children}
      </button>
    );
  }
  return (
    <span className={cn("shrink-0 pointer-events-none opacity-50", className)}>
      {children}
    </span>
  );
}

// ============================================================================
// Option item renderer (shared between virtual and normal list)
// ============================================================================
function OptionItem({
  option,
  isSelected,
  isMultiple,
  isFocused,
  onSelect,
}: {
  option: NormalizedOption<ComboboxOptionInput>;
  isSelected: boolean;
  isMultiple: boolean;
  isFocused: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      disabled={option.disabled}
      onClick={onSelect}
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center gap-2 rounded-sm py-1.5 pl-8 pr-2 text-sm text-left outline-none",
        "hover:bg-muted hover:text-foreground",
        "focus:bg-muted focus:text-foreground",
        "disabled:pointer-events-none disabled:opacity-50",
        (isSelected || isFocused) && "bg-muted",
        isFocused && "ring-2 ring-ring",
      )}
    >
      <span className="absolute left-2 flex h-4 w-4 items-center justify-center">
        {isMultiple ? (
          <div
            className={cn(
              "flex h-4 w-4 items-center justify-center rounded border border-input",
              isSelected && "bg-accent border-accent",
            )}
          >
            {isSelected && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3 w-3"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </div>
        ) : (
          isSelected && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )
        )}
      </span>
      {option.imageSrc ? (
        <img
          src={option.imageSrc}
          alt=""
          className="h-7 w-7 shrink-0 rounded-md object-cover"
        />
      ) : null}
      <span className="min-w-0 flex-1 break-all">{option.label}</span>
    </button>
  );
}

const Combobox = React.forwardRef<HTMLInputElement, ComboboxProps>(
  (props, ref) => {
    const {
      options,
      placeholder = "Select option...",
      searchPlaceholder = "Search...",
      emptyMessage = "No results found.",
      disabled = false,
      clearable = true,
      openOnFocus = true,
      className,
      label,
      required = false,
      startAdornment,
      onStartAdornmentClick,
      endAdornment,
      onEndAdornmentClick,
      virtual = false,
    } = props;

    const labelKey = props.labelKey ?? "label";
    const valueKey = props.valueKey ?? "value";
    const imageKey = props.imageKey;
    const virtualItemHeight = props.virtualItemHeight ?? (imageKey ? 44 : 36);

    const [dropdownPosition, setDropdownPosition] = React.useState<
      "bottom" | "top"
    >("bottom");

    const getOptionLabel = React.useCallback(
      (option: ComboboxOptionInput) => {
        if (typeof option === "string") return option;
        const record = option as Record<string, unknown>;
        const maybeLabel = labelKey in record ? record[labelKey] : undefined;
        return typeof maybeLabel === "string"
          ? maybeLabel
          : String(maybeLabel ?? "");
      },
      [labelKey],
    );

    const getOptionValue = React.useCallback(
      (option: ComboboxOptionInput) => {
        if (typeof option === "string") return option;
        const record = option as Record<string, unknown>;
        const maybeValue = valueKey in record ? record[valueKey] : undefined;
        if (maybeValue !== undefined && maybeValue !== null) {
          return String(maybeValue);
        }
        return getOptionLabel(option);
      },
      [valueKey, getOptionLabel],
    );

    const getOptionImage = React.useCallback(
      (option: ComboboxOptionInput): string | undefined => {
        if (!imageKey || typeof option === "string") return undefined;
        const record = option as Record<string, unknown>;
        const raw = imageKey in record ? record[imageKey] : undefined;
        if (typeof raw === "string" && raw.trim() !== "") return raw;
        return undefined;
      },
      [imageKey],
    );

    const normalizedOptions = React.useMemo<
      NormalizedOption<ComboboxOptionInput>[]
    >(
      () =>
        (options ?? []).map((option) => ({
          raw: option,
          label: getOptionLabel(option),
          value: getOptionValue(option),
          disabled: Boolean((option as { disabled?: boolean }).disabled),
          imageSrc: getOptionImage(option),
        })),
      [options, getOptionLabel, getOptionValue, getOptionImage],
    );

    const id = React.useId();
    const [open, setOpen] = React.useState(false);
    const [internalSearch, setInternalSearch] = React.useState("");
    const [focusedIndex, setFocusedIndex] = React.useState(-1);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const searchInputRef = React.useRef<HTMLInputElement | null>(null);
    const listContainerRef = React.useRef<HTMLDivElement>(null);

    // Handle single vs multiple value state
    const isMultiple = isMultipleProps(props);
    const selectAll = isMultiple ? (props.selectAll ?? false) : false;
    const selectAllLabel = isMultiple
      ? (props.selectAllLabel ?? "Select all")
      : "Select all";

    // Single select state
    const [internalSingleValue, setInternalSingleValue] =
      React.useState<ComboboxOptionInput | null>(
        !isMultiple ? (props.defaultValue ?? null) : null,
      );

    // Multi select state
    const [internalMultiValue, setInternalMultiValue] = React.useState<
      ComboboxOptionInput[]
    >(isMultiple ? (props.defaultValue ?? []) : []);

    // Get current value(s)
    const singleValue = !isMultiple
      ? props.value !== undefined
        ? (props.value as ComboboxOptionInput | null)
        : internalSingleValue
      : null;
    const multiValue = isMultiple
      ? props.value !== undefined
        ? (props.value as ComboboxOptionInput[])
        : internalMultiValue
      : [];

    const search =
      props.inputValue !== undefined ? props.inputValue : internalSearch;

    const filteredOptions = React.useMemo(() => {
      if (!search) return normalizedOptions;
      return normalizedOptions.filter((option) =>
        option.label.toLowerCase().includes(search.toLowerCase()),
      );
    }, [normalizedOptions, search]);

    // Single select: get selected option
    // Multi select: get selected options
    const selectedOptions = isMultiple ? multiValue : [];
    const selectedValueKeys = React.useMemo(
      () => new Set(selectedOptions.map((option) => getOptionValue(option))),
      [selectedOptions, getOptionValue],
    );
    const singleValueKey = singleValue ? getOptionValue(singleValue) : null;
    const singleValueImage = singleValue
      ? getOptionImage(singleValue)
      : undefined;
    const selectableOptions = React.useMemo(
      () => normalizedOptions.filter((option) => !option.disabled),
      [normalizedOptions],
    );
    const allSelected =
      isMultiple &&
      selectableOptions.length > 0 &&
      selectableOptions.every((option) => selectedValueKeys.has(option.value));

    // ========================================================================
    // Virtual list setup — always initialized, only used when virtual=true
    // ========================================================================
    const rowVirtualizer = useVirtualizer({
      count: virtual ? filteredOptions.length : 0,
      getScrollElement: () => listContainerRef.current,
      estimateSize: () => virtualItemHeight,
      overscan: 5,
    });

    const handleSingleSelect = (option: ComboboxOptionInput) => {
      if (!isMultiple) {
        if (props.value === undefined) {
          setInternalSingleValue(option);
        }
        props.onChange?.(option as never);
        setOpen(false);
        if (props.inputValue === undefined) {
          setInternalSearch("");
        }
      }
    };

    const handleMultiSelect = (option: ComboboxOptionInput) => {
      if (isMultiple) {
        const optionKey = getOptionValue(option);
        const exists = multiValue.some(
          (item) => getOptionValue(item) === optionKey,
        );
        const newValue = exists
          ? multiValue.filter((item) => getOptionValue(item) !== optionKey)
          : [...multiValue, option];

        if (props.value === undefined) {
          setInternalMultiValue(newValue);
        }
        props.onChange?.(newValue as never);
      }
    };

    const handleRemoveItem = (optionValue: string, e: React.MouseEvent) => {
      e.stopPropagation();
      if (isMultiple) {
        const newValue = multiValue.filter(
          (v) => getOptionValue(v) !== optionValue,
        );
        if (props.value === undefined) {
          setInternalMultiValue(newValue);
        }
        props.onChange?.(newValue as never);
      }
    };

    const handleClearAll = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isMultiple) {
        if (props.value === undefined) {
          setInternalMultiValue([]);
        }
        props.onChange?.([] as never);
      }
    };

    const handleSelectAll = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!isMultiple) return;
      const nextValue = allSelected ? [] : selectableOptions;
      if (props.value === undefined) {
        setInternalMultiValue(nextValue.map((option) => option.raw));
      }
      props.onChange?.(nextValue.map((option) => option.raw) as never);
    };

    const handleClearSingle = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!isMultiple) {
        if (props.value === undefined) {
          setInternalSingleValue(null);
        }
        props.onChange?.(null);
        if (props.inputValue === undefined) {
          setInternalSearch("");
        }
      }
    };

    // Close on click outside
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Reset focused index when dropdown state changes
    React.useEffect(() => {
      if (!open) {
        setFocusedIndex(-1);
      }
    }, [open]);

    // Reset focused index when search changes (filtered options change)
    React.useEffect(() => {
      setFocusedIndex(-1);
    }, [search]);

    React.useEffect(() => {
      if (open) {
        searchInputRef.current?.focus();
      }
    }, [open]);

    React.useImperativeHandle(
      ref,
      () => searchInputRef.current as HTMLInputElement,
      [],
    );

    const setSearchRef = (node: HTMLInputElement | null) => {
      searchInputRef.current = node;
    };

    const maxDisplayItems = isMultiple ? (props.maxDisplayItems ?? 3) : 0;
    const displayedOptions = selectedOptions.slice(0, maxDisplayItems);
    const remainingCount = selectedOptions.length - maxDisplayItems;

    const hiddenValue = isMultiple
      ? multiValue.length > 0
        ? "filled"
        : ""
      : singleValue
        ? getOptionValue(singleValue)
        : "";

    React.useEffect(() => {
      if (!open || !containerRef.current) return;

      const recalculate = () => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;
        const dropdownHeight = 340;
        setDropdownPosition(
          spaceBelow < dropdownHeight && spaceAbove > spaceBelow
            ? "top"
            : "bottom",
        );
      };

      recalculate(); // run immediately on open
      window.addEventListener("scroll", recalculate, true);
      window.addEventListener("resize", recalculate);

      return () => {
        window.removeEventListener("scroll", recalculate, true);
        window.removeEventListener("resize", recalculate);
      };
    }, [open]);

    return (
      <div ref={containerRef} className="relative">
        {label && (
          <Label htmlFor={id} className="mb-1.5 block">
            {label}
            {required && (
              <span className="ml-0.5 text-red-500" aria-hidden="true">
                *
              </span>
            )}
          </Label>
        )}
        {/* Hidden input carries the value so native form validation works */}
        <input
          id={id}
          type="text"
          aria-hidden="true"
          tabIndex={-1}
          required={required}
          value={hiddenValue}
          onChange={() => {}}
          className="absolute inset-0 h-px w-px opacity-0 pointer-events-none"
        />
        <button
          type="button"
          role="combobox"
          aria-expanded={open}
          aria-labelledby={label ? id : undefined}
          disabled={disabled}
          onClick={() => setOpen(!open)}
          onKeyDown={(e) => {
            if (disabled) return;

            switch (e.key) {
              case "Enter":
              case " ":
                e.preventDefault();
                setOpen(!open);
                break;
              case "ArrowDown":
              case "ArrowUp":
                e.preventDefault();
                if (!open) {
                  setOpen(true);
                }
                break;
              case "Escape":
                e.preventDefault();
                if (open) {
                  setOpen(false);
                }
                break;
            }
          }}
          className={cn(
            "flex min-h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-left",
            "ring-offset-background",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            (isMultiple && selectedOptions.length > 0) ||
              (!isMultiple && singleValue)
              ? "h-auto items-start justify-between"
              : "items-center justify-between",
            className,
          )}
        >
          {/* Start adornment */}
          {startAdornment && (
            <Adornment onClick={onStartAdornmentClick} className="mr-1.5">
              {startAdornment}
            </Adornment>
          )}

          {isMultiple ? (
            <div className="flex flex-1 flex-wrap items-center gap-1">
              {selectedOptions.length === 0 ? (
                <span className="text-muted-foreground">{placeholder}</span>
              ) : (
                <>
                  {displayedOptions.map((option) => (
                    <span
                      key={getOptionValue(option)}
                      className="inline-flex max-w-full min-w-0 items-center gap-1.5 rounded-md bg-muted px-2 py-0.5 text-xs font-medium"
                    >
                      {getOptionImage(option) ? (
                        <img
                          src={getOptionImage(option)}
                          alt=""
                          className="h-4 w-4 shrink-0 rounded object-cover"
                        />
                      ) : null}
                      <span className="min-w-0 break-all">
                        {getOptionLabel(option)}
                      </span>
                      <button
                        type="button"
                        onClick={(e) =>
                          handleRemoveItem(getOptionValue(option), e)
                        }
                        className="ml-1 rounded-full hover:bg-background/50"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 6 6 18M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  ))}
                  {remainingCount > 0 && (
                    <span className="text-xs text-muted-foreground">
                      +{remainingCount} more
                    </span>
                  )}
                </>
              )}
            </div>
          ) : (
            <span
              className={cn(
                "flex min-w-0 flex-1 items-center gap-2",
                !singleValue && "text-muted-foreground",
              )}
            >
              {singleValueImage ? (
                <img
                  src={singleValueImage}
                  alt=""
                  className="h-6 w-6 shrink-0 rounded-md object-cover"
                />
              ) : null}
              <span className="min-w-0 flex-1 break-all">
                {singleValue ? getOptionLabel(singleValue) : placeholder}
              </span>
            </span>
          )}

          <div className="flex items-center gap-1 shrink-0">
            {/* Clear all button for multi-select */}
            {isMultiple && selectedOptions.length > 0 && (
              <button
                type="button"
                onClick={handleClearAll}
                className="rounded p-0.5 hover:bg-muted"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-50 hover:opacity-100"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            )}
            {!isMultiple && clearable && singleValue && (
              <button
                type="button"
                onClick={handleClearSingle}
                className="rounded p-0.5 hover:bg-muted"
                aria-label="Clear selection"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-50 hover:opacity-100"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            )}

            {/* End adornment — sits before the chevron */}
            {endAdornment && (
              <Adornment onClick={onEndAdornmentClick}>
                {endAdornment}
              </Adornment>
            )}

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={cn(
                "h-4 w-4 shrink-0 opacity-50 transition-transform",
                open && "rotate-180",
              )}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </button>

        {open && (
          <div
            className={cn(
              "absolute z-50 w-full overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-md",
              dropdownPosition === "bottom"
                ? "top-full mt-1"
                : "bottom-full mb-1",
            )}
          >
            <div className="flex items-center border-b border-border px-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-4 w-4 shrink-0 opacity-50"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                ref={setSearchRef}
                className="flex h-10 w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
                placeholder={searchPlaceholder}
                value={search}
                onChange={(e) => {
                  if (props.inputValue === undefined) {
                    setInternalSearch(e.target.value);
                  }
                  props.onInputChange?.(e.target.value);
                }}
                onFocus={() => {
                  if (openOnFocus && !disabled) setOpen(true);
                }}
                onKeyDown={(e) => {
                  if (disabled) return;

                  const availableOptions = filteredOptions.filter(
                    (opt) => !opt.disabled,
                  );
                  const maxIndex = availableOptions.length - 1;

                  switch (e.key) {
                    case "ArrowDown":
                      e.preventDefault();
                      if (!open) {
                        setOpen(true);
                        setFocusedIndex(0);
                      } else {
                        setFocusedIndex((prev) => {
                          const nextIndex = prev + 1;
                          return nextIndex > maxIndex ? 0 : nextIndex;
                        });
                      }
                      break;

                    case "ArrowUp":
                      e.preventDefault();
                      if (!open) {
                        setOpen(true);
                        setFocusedIndex(maxIndex);
                      } else {
                        setFocusedIndex((prev) => {
                          const nextIndex = prev - 1;
                          return nextIndex < 0 ? maxIndex : nextIndex;
                        });
                      }
                      break;

                    case "Enter":
                      e.preventDefault();
                      if (
                        open &&
                        focusedIndex >= 0 &&
                        focusedIndex <= maxIndex
                      ) {
                        const focusedOption = availableOptions[focusedIndex];
                        if (focusedOption) {
                          if (isMultiple) {
                            handleMultiSelect(focusedOption.raw);
                          } else {
                            handleSingleSelect(focusedOption.raw);
                            setOpen(false);
                          }
                        }
                      }
                      break;

                    case "Escape":
                      e.preventDefault();
                      setOpen(false);
                      setFocusedIndex(-1);
                      break;

                    case "Tab":
                      // Let tab work naturally to move to next element
                      setOpen(false);
                      setFocusedIndex(-1);
                      break;
                  }
                }}
              />
            </div>

            {/* Select all (always rendered outside virtual area) */}
            {isMultiple && selectAll && filteredOptions.length > 0 && (
              <div className="px-1 pt-1">
                <button
                  type="button"
                  onClick={handleSelectAll}
                  className={cn(
                    "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none",
                    "hover:bg-muted hover:text-foreground",
                    "focus:bg-muted focus:text-foreground",
                    allSelected && "bg-muted",
                  )}
                >
                  <span className="absolute left-2 flex h-4 w-4 items-center justify-center">
                    <div
                      className={cn(
                        "flex h-4 w-4 items-center justify-center rounded border border-input",
                        allSelected && "bg-accent border-accent",
                      )}
                    >
                      {allSelected && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-3 w-3"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                  </span>
                  {selectAllLabel}
                </button>
              </div>
            )}

            {/* Options list */}
            <div
              ref={listContainerRef}
              className="max-h-[300px] overflow-y-auto p-1"
            >
              {filteredOptions.length === 0 ? (
                <div className="py-6 text-center text-sm text-muted-foreground">
                  {emptyMessage}
                </div>
              ) : virtual ? (
                // ── Virtual list ──────────────────────────────────────────
                <div
                  style={{
                    height: rowVirtualizer.getTotalSize(),
                    position: "relative",
                  }}
                >
                  {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                    const option = filteredOptions[virtualRow.index];
                    const isSelected = isMultiple
                      ? selectedValueKeys.has(option.value)
                      : option.value === singleValueKey;

                    return (
                      <div
                        key={virtualRow.key}
                        style={{
                          position: "absolute",
                          top: virtualRow.start,
                          left: 0,
                          right: 0,
                          height: virtualRow.size,
                        }}
                      >
                        <OptionItem
                          option={option}
                          isSelected={isSelected}
                          isMultiple={isMultiple}
                          isFocused={focusedIndex === virtualRow.index}
                          onSelect={() =>
                            isMultiple
                              ? handleMultiSelect(option.raw)
                              : handleSingleSelect(option.raw)
                          }
                        />
                      </div>
                    );
                  })}
                </div>
              ) : (
                // ── Normal list ───────────────────────────────────────────
                filteredOptions.map((option, index) => {
                  const isSelected = isMultiple
                    ? selectedValueKeys.has(option.value)
                    : option.value === singleValueKey;

                  return (
                    <OptionItem
                      key={option.value}
                      option={option}
                      isSelected={isSelected}
                      isMultiple={isMultiple}
                      isFocused={focusedIndex === index}
                      onSelect={() =>
                        isMultiple
                          ? handleMultiSelect(option.raw)
                          : handleSingleSelect(option.raw)
                      }
                    />
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
    );
  },
);
Combobox.displayName = "Combobox";

export { Combobox };
