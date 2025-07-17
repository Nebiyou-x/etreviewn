import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        "w-full rounded-full bg-white/10 border border-white/20 px-5 py-3 text-base text-white placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400/70 focus:border-orange-400/70 transition-all duration-200",
        className
      )}
      {...props}
    />
  )
})
Input.displayName = "Input"

export { Input }
