import * as vscode from "vscode"
import { addCursorRuleCommand } from "./commands/addCursorRule"
import { Cache } from "./utils/cache"

export function activate(context: vscode.ExtensionContext) {
   Cache.getInstance(context)

   const disposable = vscode.commands.registerCommand(
      "cursorRules.addRule",
      (slug?: string) => addCursorRuleCommand(context, slug),
   )
   context.subscriptions.push(disposable)
}

export function deactivate() {}
