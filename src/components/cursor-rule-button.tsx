"use client"

import { useState } from "react"
import { CursorIcon } from "./icons"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"

interface CursorRuleButtonProps {
   slug: string
   variant?: "default" | "outline"
}

export function CursorRuleButton({
   slug,
   variant = "outline",
}: CursorRuleButtonProps) {
   const [isOpen, setIsOpen] = useState(false)
   const isMac =
      typeof window !== "undefined" && navigator.platform.includes("Mac")

   return (
      <>
         <Button
            onClick={() => setIsOpen(true)}
            variant={variant}
            size="sm"
            className="gap-2"
         >
            <CursorIcon className="h-4 w-4" />
            Add to Cursor
         </Button>

         <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[425px]">
               <DialogHeader>
                  <DialogTitle>Add Rule to Cursor</DialogTitle>
               </DialogHeader>

               <div className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                     Follow these steps to add the rule to your project:
                  </div>

                  <ol className="list-decimal list-inside space-y-2 text-sm">
                     <li>Install the Cursorrules extension</li>
                     <li>Open Cursor</li>
                     <li className="flex items-center gap-1">
                        Press{" "}
                        <kbd className="px-1.5 py-0.5 text-xs font-semibold bg-muted rounded-md">
                           {isMac ? "⌘" : "Ctrl"}
                        </kbd>
                        +
                        <kbd className="px-1.5 py-0.5 text-xs font-semibold bg-muted rounded-md">
                           Shift
                        </kbd>
                        +
                        <kbd className="px-1.5 py-0.5 text-xs font-semibold bg-muted rounded-md">
                           P
                        </kbd>
                     </li>
                     <li>Type "Cursor Rules: Add"</li>
                     <li>
                        Select this rule:{" "}
                        <code className="px-1.5 py-0.5 text-xs font-mono bg-muted rounded">
                           {slug}
                        </code>
                     </li>
                  </ol>

                  <div className="flex justify-end mt-6">
                     <Button
                        variant="rainbow-outline"
                        onClick={() =>
                           window.open(
                              "https://marketplace.visualstudio.com/items?itemName=nyxb.cursorrules",
                              "_blank",
                           )
                        }
                     >
                        Install Extension
                     </Button>
                  </div>
               </div>
            </DialogContent>
         </Dialog>
      </>
   )
}
