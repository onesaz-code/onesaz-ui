import * as React from "react";
import { cn } from "../utils/cn";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
    | "default"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "destructive";
  duration?: number | null; // null = stay until manually closed
  onClose?: () => void;
}

/* -------------------------------------------------------------------------- */
/*                                 Variants                                   */
/* -------------------------------------------------------------------------- */

const variants = {
  default: {
    iconBg: "bg-zinc-900",
    progress: "bg-zinc-900",
    textColor: "text-zinc-900",
  },
  info: {
    iconBg: "bg-blue-600",
    progress: "bg-blue-600",
    textColor: "text-blue-600",
  },
  success: {
    iconBg: "bg-emerald-600",
    progress: "bg-emerald-600",
    textColor: "text-emerald-600",
  },
  warning: {
    iconBg: "bg-amber-500",
    progress: "bg-amber-500",
    textColor: "text-amber-500",
  },
  error: {
    iconBg: "bg-rose-600",
    progress: "bg-rose-600",
    textColor: "text-rose-600",
  },
  destructive: {
    iconBg: "bg-rose-700",
    progress: "bg-rose-700",
    textColor: "text-rose-700",
  },
};

/* -------------------------------------------------------------------------- */
/*                                   Icons                                    */
/* -------------------------------------------------------------------------- */

const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="m5 13 4 4L19 7" />
  </svg>
);

const InfoIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4M12 8h.01" />
  </svg>
);

const WarningIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <path d="M12 9v4M12 17h.01" />
  </svg>
);

const XCircleIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="m15 9-6 6M9 9l6 6" />
  </svg>
);

const CloseIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

const iconMap = {
  default: InfoIcon,
  info: InfoIcon,
  success: CheckIcon,
  warning: WarningIcon,
  error: XCircleIcon,
  destructive: XCircleIcon,
};

/* -------------------------------------------------------------------------- */
/*                                   Alert                                    */
/* -------------------------------------------------------------------------- */

export const Alert: React.FC<AlertProps> = ({
  variant = "default",
  duration = 100000000000000, // default 4000ms
  onClose,
  className,
  children,
  ...props
}) => {
  const [visible, setVisible] = React.useState(true);
  const [progress, setProgress] = React.useState(100);

  const styles = variants[variant];
  const Icon = iconMap[variant];

  // Check if there's an AlertDescription
  const hasDescription = React.Children.toArray(children).some(
    (child) => React.isValidElement(child) && child.type === AlertDescription,
  );

  React.useEffect(() => {
    if (duration === null) return; // stay until user closes

    const start = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const percent = 100 - (elapsed / duration) * 100;
      setProgress(percent);

      if (elapsed >= duration) {
        clearInterval(interval);
        handleClose();
      }
    }, 16);

    return () => clearInterval(interval);
  }, [duration]);

  const handleClose = () => {
    setVisible(false);
    onClose?.();
  };

  if (!visible) return null;

  return (
    <div
      role="alert"
      className={cn(
        "relative w-[380px] rounded-xl bg-background border border-border shadow-lg p-4 flex gap-4 items-start overflow-hidden",
        className,
      )}
      {...props}
    >
      {/* Icon */}
      <div
        className={cn(
          "flex items-center justify-center h-10 w-10 rounded-full text-white shrink-0",
          styles.iconBg,
        )}
      >
        <Icon className="h-5 w-5" />
      </div>

      {/* Content */}
      <div className={cn("flex-1", !hasDescription && "flex items-center mt-2")}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === AlertTitle) {
            return React.cloneElement(child, {
              hasDescription,
              variant,
            } as any);
          }
          return child;
        })}
      </div>

      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition"
      >
        <CloseIcon className="h-4 w-4" />
      </button>

      {/* Progress Bar */}
      {duration !== null && (
        <div className="absolute bottom-0 left-0 h-1 w-full bg-muted">
          <div
            className={cn("h-full transition-all", styles.progress)}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
};

export interface AlertTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  hasDescription?: boolean;
  variant?: string;
}

export const AlertTitle: React.FC<AlertTitleProps> = ({
  className,
  children,
  hasDescription = true,
  variant = "default",
  ...props
}) => {
  const styles = variants[variant as keyof typeof variants];

  return (
    <h4
      className={cn("font-semibold text-sm", styles.textColor, className)}
      {...props}
    >
      {children}
    </h4>
  );
};

export interface AlertDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const AlertDescription: React.FC<AlertDescriptionProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <p className={cn("text-sm text-muted-foreground mt-1", className)} {...props}>
      {children}
    </p>
  );
};
