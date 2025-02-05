import { Slot } from "@radix-ui/react-slot"
import { type VariantProps, cva } from "class-variance-authority"
import { Loader2 } from "lucide-react"
import * as React from "react"

import { ny } from "~/lib/utils"

const buttonVariants = cva(
   "inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
   {
      variants: {
         variant: {
            default:
               "bg-primary text-primary-foreground shadow hover:bg-primary/90",
            destructive:
               "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
            outline:
               "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
            secondary:
               "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            link: "text-primary underline-offset-4 hover:underline",
            rainbow:
               "group relative animate-rainbow cursor-pointer border-0 bg-[linear-gradient(#121213,#121213),linear-gradient(#121213_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))] bg-[length:200%] text-white [background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:calc(0.08*1rem)_solid_transparent] before:absolute before:bottom-[-20%] before:left-1/2 before:z-[0] before:h-[20%] before:w-[60%] before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))] before:bg-[length:200%] before:[filter:blur(calc(0.8*1rem))] dark:bg-[linear-gradient(#fff,#fff),linear-gradient(#fff_50%,rgba(255,255,255,0.6)_80%,rgba(0,0,0,0)),linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))] dark:text-black",
            "rainbow-outline":
               "group relative animate-rainbow cursor-pointer border-0 border-input bg-[linear-gradient(#fff,#fff),linear-gradient(#fff_50%,rgba(255,255,255,0.6)_80%,rgba(0,0,0,0)),linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))] bg-[length:200%] text-black [background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:calc(0.08*1rem)_solid_transparent] before:absolute before:bottom-[-20%] before:left-1/2 before:z-[0] before:h-[20%] before:w-[60%] before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))] before:bg-[length:200%] before:[filter:blur(calc(0.8*1rem))] dark:bg-[linear-gradient(#121213,#121213),linear-gradient(#121213_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))] dark:text-white",
            purple:
               "bg-purple-500 text-white hover:bg-purple-400 focus:ring-purple-500",
            success:
               "bg-green-500 text-white hover:bg-green-400 focus:ring-green-500",
         },
         size: {
            default: "h-9 px-4 py-2",
            sm: "h-8 rounded-xl px-3 text-xs",
            lg: "h-11 rounded-xl px-8",
            icon: "h-9 w-9",
            iconSm: "h-8 w-8 flex-shrink-0",
            "alt-xs": "px-2 py-1 text-xs",
            "alt-sm": "px-2 py-1 text-sm",
            "alt-md": "px-2.5 py-1.5 text-sm",
            "alt-lg": "px-3 py-2 text-sm",
            "alt-xl": "px-3.5 py-2.5 text-sm",
            "alt-2xl": "px-6 py-3 text-base font-medium",
            "alt-circle": "",
         },
         loading: {
            true: "opacity-50 cursor-not-allowed",
         },
      },
      defaultVariants: {
         variant: "default",
         size: "default",
         loading: false,
      },
   },
)

export interface ButtonProps
   extends React.ButtonHTMLAttributes<HTMLButtonElement>,
      VariantProps<typeof buttonVariants> {
   asChild?: boolean
   loading?: boolean
   Icon?: React.ElementType
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
   (
      {
         className,
         variant,
         size,
         asChild = false,
         loading = false,
         children,
         Icon,
         ...props
      },
      ref,
   ) => {
      const Comp = asChild ? Slot : "button"
      const type = props.type ?? "button"
      return (
         <Comp
            className={ny(
               buttonVariants({ variant, size, loading, className }),
            )}
            ref={ref}
            type={type}
            disabled={loading || props.disabled}
            {...props}
         >
            {loading || Icon ? (
               <>
                  {loading ? (
                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : Icon ? (
                     <Icon className="mr-2 h-4 w-4" />
                  ) : null}
                  {children}
               </>
            ) : (
               children
            )}
         </Comp>
      )
   },
)
Button.displayName = "Button"

export { Button, buttonVariants }
