import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className="w-full rounded-full bg-primary border border-accent px-5 py-3 text-base text-secondary placeholder-secondary shadow-sm focus:outline-none focus:ring-2 focus:ring-accent/70 focus:border-accent transition-all duration-200"
      {...props}
    />
  )
})
Input.displayName = "Input"

export { Input }
