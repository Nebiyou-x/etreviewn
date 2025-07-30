import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "secondary"
  size?: "sm" | "md" | "lg"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    let base = "font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/70 focus:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none";
    
    // Size classes
    let sizeClass = "";
    if (size === "sm") {
      sizeClass = "px-3 py-2 text-sm";
    } else if (size === "md") {
      sizeClass = "px-4 py-2 text-sm";
    } else if (size === "lg") {
      sizeClass = "px-6 py-3 text-base";
    }
    
    // Variant classes
    let variantClass = "";
    if (variant === "primary") {
      variantClass = "bg-accent text-secondary shadow-md hover:bg-primary hover:text-accent hover:shadow-lg";
    } else if (variant === "outline") {
      variantClass = "bg-transparent border border-accent text-accent hover:bg-accent hover:text-secondary";
    } else if (variant === "secondary") {
      variantClass = "bg-primary border border-accent text-secondary hover:bg-accent hover:text-secondary";
    }
    
    return (
      <button
        ref={ref}
        className={cn(base, sizeClass, variantClass, className)}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
