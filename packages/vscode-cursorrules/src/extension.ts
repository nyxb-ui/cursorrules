import * as vscode from "vscode"
import { addCursorRuleCommand } from "./commands/addCursorRule"
import { Cache } from "./utils/cache"

export function activate(context: vscode.ExtensionContext) {
   Cache.getInstance(context)

   // Registriere den Command Handler
   const disposable = vscode.commands.registerCommand(
      "cursorRules.addRule",
      (slug?: string) => addCursorRuleCommand(context, slug),
   )
   context.subscriptions.push(disposable)

   // Erstelle einen WebviewPanel Provider
   const provider = vscode.window.registerWebviewViewProvider("cursorRules", {
      resolveWebviewView(webviewView) {
         webviewView.webview.options = {
            enableScripts: true,
         }

         // Handle messages von der Webview
         webviewView.webview.onDidReceiveMessage((message) => {
            if (message.command === "cursorRules.addRule") {
               addCursorRuleCommand(context, message.slug)
            }
         })
      },
   })
   context.subscriptions.push(provider)
}

export function deactivate() {}
