"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {}

const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className="overflow-auto rounded-2xl bg-primary shadow-inner transition-all duration-200 scrollbar-thin scrollbar-thumb-accent scrollbar-track-transparent"
      {...props}
    />
  )
})
ScrollArea.displayName = "ScrollArea"

export { ScrollArea }
