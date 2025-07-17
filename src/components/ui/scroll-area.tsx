"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {}

const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "overflow-auto rounded-2xl bg-white/10 backdrop-blur-md shadow-inner transition-all duration-200 scrollbar-thin scrollbar-thumb-orange-400/60 scrollbar-track-transparent",
        className
      )}
      {...props}
    />
  )
})
ScrollArea.displayName = "ScrollArea"

export { ScrollArea }
