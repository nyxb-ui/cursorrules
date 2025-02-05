"use client"

import { Check, Share } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { ny } from "~/lib/utils"

export function ShareButton({
   slug,
   variant = "default",
}: {
   slug: string
   variant?: "default" | "outline"
}) {
   const [copied, setCopied] = useState(false)

   const handleCopy = () => {
      navigator.clipboard.writeText(`${window.location.origin}/${slug}`)
      setCopied(true)
      toast.success("URL copied to clipboard")

      setTimeout(() => {
         setCopied(false)
      }, 1500)
   }

   return (
      <button
         onClick={handleCopy}
         className={ny(
            "relative inline-flex items-center justify-center size-9 rounded-md transition-all duration-200",
            variant === "default"
               ? "bg-primary text-primary-foreground hover:bg-primary/90"
               : "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
            "active:scale-95",
         )}
         type="button"
      >
         {copied ? (
            <Check className="size-4 transition-all" />
         ) : (
            <Share className="size-4 transition-all" />
         )}
      </button>
   )
}
