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
         if (
            typeof window !== "undefined" &&
            (window as any).acquireVsCodeApi
         ) {
            try {
               // Nutze die VSCode Webview API
               const vscode = (window as any).acquireVsCodeApi()
               vscode.postMessage({
                  command: "cursorRules.addRule",
                  slug,
               })
               toast.success("Rule added successfully!")
            } catch (error) {
               toast.error("Please install the Cursor Rules extension", {
                  description: "Click to install from VS Code Marketplace",
                  action: {
                     label: "Install",
                     onClick: () =>
                        window.open(
                           "https://marketplace.visualstudio.com/items?itemName=nyxb.cursorrules",
                           "_blank",
                        ),
                  },
                  duration: 5000,
               })
            }
         } else {
            // Prüfe ob Cursor bereits läuft
            try {
               const controller = new AbortController()
               const timeoutId = setTimeout(() => controller.abort(), 500)

               const response = await fetch("http://localhost:9999/status", {
                  method: "HEAD",
                  signal: controller.signal,
               })

               clearTimeout(timeoutId)

               if (response.ok) {
                  // Cursor läuft bereits, sende Kommando direkt
                  await fetch("http://localhost:9999/command", {
                     method: "POST",
                     headers: {
                        "Content-Type": "application/json",
                     },
                     body: JSON.stringify({
                        command: "cursorRules.addRule",
                        args: [slug],
                     }),
                  })
                  toast.success("Rule added to Cursor!")
               } else {
                  throw new Error("Cursor not running")
               }
            } catch {
               // Cursor läuft nicht, öffne es
               const cursorUrl = `cursor://open?command=cursorRules.addRule&args=${encodeURIComponent(
                  JSON.stringify([slug]),
               )}`

               toast.loading("Opening Cursor...", {
                  duration: 3000,
               })

               window.location.href = cursorUrl
            }
         }
      } catch (error) {
         console.error("Error:", error)
         toast.error("Failed to add rule", {
            description: "Please try again or install manually",
         })
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
