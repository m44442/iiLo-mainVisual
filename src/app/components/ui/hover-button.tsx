import * as React from "react"
import { Button, buttonVariants } from "./button"
import { cn } from "@/lib/utils"
import { VariantProps } from "class-variance-authority"

interface HoverButtonProps
  extends React.ComponentProps<"button">,
    Omit<VariantProps<typeof buttonVariants>, "variant"> {
  normalBg?: string
  normalText?: string
  hoverBg?: string
  hoverText?: string
  asChild?: boolean
}

const HoverButton = React.forwardRef<HTMLButtonElement, HoverButtonProps>(
  ({ 
    className, 
    normalBg = "#ffffff", 
    normalText = "#000000", 
    hoverBg = "#000000", 
    hoverText = "#ffffff",
    style,
    asChild = false,
    ...props 
  }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false)

    return (
      <Button
        ref={ref}
        variant="hoverInvert"
        className={cn(className)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          backgroundColor: isHovered ? hoverBg : normalBg,
          color: isHovered ? hoverText : normalText,
          ...style
        }}
        asChild={asChild}
        {...props}
      />
    )
  }
)
HoverButton.displayName = "HoverButton"

export { HoverButton }