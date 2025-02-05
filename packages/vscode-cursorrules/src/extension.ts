import * as vscode from "vscode"
import { addCursorRuleCommand } from "./commands/addCursorRule"
import { Cache } from "./utils/cache"

export function activate(context: vscode.ExtensionContext) {
   Cache.getInstance(context)

   const disposable = vscode.commands.registerCommand(
      "cursorRules.addRule",
      (slug?: string) => {
         return addCursorRuleCommand(context, slug)
      },
   )

   // Registriere den Webview Message Handler
   window.addEventListener("message", (event) => {
      const message = event.data
      if (message.command === "cursorRules.addRule") {
         addCursorRuleCommand(context, message.slug)
      }
   })

   context.subscriptions.push(disposable)
}

export function deactivate() {}
