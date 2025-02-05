"use client"

import { toast } from "sonner"
import { CursorIcon } from "./icons"
import { Button } from "./ui/button"

interface CursorRuleButtonProps {
   slug: string
   variant?: "default" | "outline"
}

export function CursorRuleButton({
   slug,
   variant = "outline",
}: CursorRuleButtonProps) {
   const handleAddToCursor = async () => {
      try {
         // Prüfe ob wir in Cursor sind
         if (typeof window !== "undefined" && (window as any).vscode) {
            try {
               // Versuche die Extension anzusprechen
               await (window as any).vscode.postMessage({
                  command: "cursorRules.addRule",
                  slug,
               })
               toast.success("Rule added successfully!")
            } catch (error) {
               // Extension ist nicht installiert
               toast.error("Please install the Cursor Rules extension first")
               toast("Opening VS Code Marketplace...", {
                  description: "Install the extension and try again",
                  action: {
                     label: "Install",
                     onClick: () =>
                        window.open(
                           "https://marketplace.visualstudio.com/items?itemName=nyxb.cursorrules",
                           "_blank",
                        ),
                  },
               })
            }
         } else {
            toast.info("Opening Cursor...", {
               description:
                  "Make sure you have Cursor and the Cursor Rules extension installed",
            })

            // Öffne Cursor direkt mit dem cursor:// Protocol Handler
            const cursorUrl = `cursor://open?args=${encodeURIComponent(
               JSON.stringify({
                  command: "cursorRules.addRule",
                  slug: slug,
               }),
            )}`

            window.location.href = cursorUrl

            // Fallback falls cursor:// nicht registriert ist
            setTimeout(() => {
               toast("Cursor not detected", {
                  description:
                     "You'll need both Cursor and the Cursor Rules extension",
                  action: {
                     label: "Get Started",
                     onClick: () => {
                        window.open("https://cursor.sh/download", "_blank")
                        setTimeout(() => {
                           window.open(
                              "https://marketplace.visualstudio.com/items?itemName=nyxb.cursorrules",
                              "_blank",
                           )
                        }, 500)
                     },
                  },
               })
            }, 1000)
         }
      } catch (error) {
         console.error("Error:", error)
         toast.error("Something went wrong. Please try again.")
      }
   }

   return (
      <Button
         onClick={handleAddToCursor}
         variant={variant}
         size="sm"
         className="gap-2"
      >
         <CursorIcon className="h-4 w-4" />
         Add to Cursor
      </Button>
   )
}
