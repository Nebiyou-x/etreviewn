import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary"
  size?: "sm" | "md"
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "secondary", size = "sm", ...props }, ref) => {
    let base = "inline-flex items-center font-medium rounded-full transition-all duration-200 select-none";
    
    // Size classes
    let sizeClass = "";
    if (size === "sm") {
      sizeClass = "px-2 py-1 text-xs";
    } else if (size === "md") {
      sizeClass = "px-3 py-1 text-sm";
    }
    
    // Variant classes
    let variantClass = "";
    if (variant === "primary") {
      variantClass = "bg-accent text-secondary";
    } else {
      variantClass = "bg-accent/20 text-accent border border-accent/30";
    }
    
    return (
      <span ref={ref} className={cn(base, sizeClass, variantClass, className)} {...props} />
    );
  }
);
Badge.displayName = "Badge";

export { Badge };
