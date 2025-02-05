"use client"

import { Check, Copy } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import { useState } from "react"
import { toast } from "sonner"
import { voteAction } from "~/actions/vote-action"
import { ny } from "~/lib/utils"

export function CopyButton({
   content,
   slug,
   variant = "default",
}: {
   content: string
   slug: string
   variant?: "default" | "outline"
}) {
   const [copied, setCopied] = useState(false)
   const { execute } = useAction(voteAction)

   const handleCopy = () => {
      execute({ slug })
      navigator.clipboard.writeText(content)
      setCopied(true)
      toast.success(
         "Copied to clipboard. Add a .cursorrules file to your project and paste the rule.",
      )

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
            <Copy className="size-4 transition-all" />
         )}
      </button>
   )
}
