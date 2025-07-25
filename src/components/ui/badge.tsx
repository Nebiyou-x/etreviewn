import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary"
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "secondary", ...props }, ref) => {
    let base =
      "inline-block px-4 py-1 text-xs font-bold rounded-full transition-all duration-200 shadow-sm select-none";
    let variantClass = "";
    if (variant === "primary") {
      variantClass = "bg-accent text-secondary";
    } else {
      variantClass = "bg-primary text-secondary border border-accent";
    }
    return (
      <span ref={ref} className={cn(base, variantClass, className)} {...props} />
    );
  }
);
Badge.displayName = "Badge";

export { Badge };
