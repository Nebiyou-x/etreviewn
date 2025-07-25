import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "secondary"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    let base =
      "px-6 py-2 font-bold text-base rounded-full transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-accent/70 focus:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none";
    let variantClass = "";
    if (variant === "primary") {
      variantClass =
        "bg-primary text-secondary shadow-md hover:scale-105 hover:shadow-lg";
    } else if (variant === "outline") {
      variantClass =
        "bg-secondary border border-primary text-primary hover:bg-primary hover:text-secondary hover:scale-105 hover:shadow-md";
    } else if (variant === "secondary") {
      variantClass =
        "bg-accent text-secondary border border-accent hover:bg-primary hover:text-secondary hover:scale-105 hover:shadow-md";
    }
    return (
      <button
        ref={ref}
        className={cn(base, variantClass, className)}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
