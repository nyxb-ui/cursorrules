import * as path from "path"
import * as vscode from "vscode"
import {
   type Rule,
   createCursorRuleFile,
   fetchCursorRulesList,
} from "../utils/api"

// Hilfsfunktion um zu erkennen, ob wir in Cursor sind
const isCursor = () => {
   return (
      process.env.CURSOR_CHANNEL === "stable" ||
      vscode.env.appName.includes("Cursor")
   )
}

export async function addCursorRuleCommand(
   context: vscode.ExtensionContext,
   selectedSlug?: string,
) {
   try {
      const workspaceFolders = vscode.workspace.workspaceFolders
      if (!workspaceFolders) {
         vscode.window.showErrorMessage("Please open a workspace first.")
         return
      }

      let rules = []
      try {
         rules = await fetchCursorRulesList(context)
      } catch (error) {
         vscode.window.showErrorMessage("Error loading rules list.")
         return
      }

      let selectedRule: Rule | undefined

      if (selectedSlug) {
         selectedRule = rules.find((r) => r.slug === selectedSlug)
      } else {
         const quickPick = vscode.window.createQuickPick()
         quickPick.items = rules.map((rule) => {
            if (isCursor()) {
               // Einfachere Formatierung für Cursor
               return {
                  label: `${rule.title} (by ${rule.author?.name || "Unknown"})`,
                  description: `${rule.tags?.join(", ") || ""} • ${rule.libs?.join(", ") || ""}`,
                  rule,
               }
            } else {
               // Volle Formatierung für VS Code
               return {
                  label: `${rule.title} ${rule.author ? `(by ${rule.author.name})` : ""}`,
                  description: rule.slug,
                  detail: [
                     rule.tags?.length ? `🏷️ ${rule.tags.join(", ")}` : "",
                     rule.libs?.length ? `📚 ${rule.libs.join(", ")}` : "",
                  ]
                     .filter(Boolean)
                     .join(" • "),
                  buttons: [
                     {
                        iconPath: new vscode.ThemeIcon("preview"),
                        tooltip: "Preview Rule Content",
                     },
                  ],
                  rule,
               }
            }
         })

         quickPick.placeholder = "Select a Cursor Rule template..."
         quickPick.matchOnDescription = true
         quickPick.matchOnDetail = true

         selectedRule = await new Promise<Rule | undefined>((resolve) => {
            quickPick.onDidAccept(() => {
               const selection = quickPick
                  .selectedItems[0] as vscode.QuickPickItem & { rule: Rule }
               resolve(selection?.rule)
               quickPick.hide()
            })
            quickPick.onDidHide(() => resolve(undefined))
            quickPick.show()
         })
      }

      if (!selectedRule) {
         vscode.window.showInformationMessage("No rule selected.")
         return
      }

      const workspacePath = workspaceFolders[0].uri.fsPath
      const filePath = path.join(workspacePath, ".cursorrules")

      await createCursorRuleFile(selectedRule, filePath)

      vscode.window.showInformationMessage(
         `.cursorrules file added to ${workspacePath}`,
      )
   } catch (error) {
      vscode.window.showErrorMessage(`Error adding rule file: ${error}`)
   }
}
