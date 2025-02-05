import * as fs from "fs"
import axios from "axios"
import type * as vscode from "vscode"
import { Cache } from "./cache"

export interface Rule {
   title: string
   slug: string
   content: string
   tags?: string[]
   libs?: string[]
   author?: {
      name: string
      url: string
      avatar: string
   }
}

const API_URL = "https://cursorrul.es/api/rules" // Ihre API URL
const RULES_CACHE_KEY = "cursor_rules_list"

export async function fetchCursorRulesList(
   context: vscode.ExtensionContext,
): Promise<Rule[]> {
   const cache = Cache.getInstance(context)
   const cachedRules = cache.get<Rule[]>(RULES_CACHE_KEY)

   const updateCache = async () => {
      try {
         console.log("Fetching rules from:", API_URL)
         const response = await axios.get(API_URL)
         console.log("API Response:", response.data)

         if (!response.data) throw new Error("Invalid API response")
         if (!Array.isArray(response.data)) {
            console.error("Response is not an array:", response.data)
            throw new Error("Invalid API response format")
         }

         cache.set(RULES_CACHE_KEY, response.data)
         return response.data
      } catch (error) {
         console.error("Cache update failed:", error)
         // Temporärer Fix: Gib Beispieldaten zurück
         return [
            {
               title: "Test Rule",
               slug: "test-rule",
               content: "Test content",
               tags: ["Test"],
               libs: ["Test Lib"],
               author: {
                  name: "Test Author",
                  url: "https://example.com",
                  avatar: "https://example.com/avatar.png",
               },
            },
         ]
      }
   }

   if (cachedRules) {
      updateCache().catch(console.error)
      return cachedRules
   }

   return await updateCache()
}

export async function createCursorRuleFile(
   rule: Rule,
   filePath: string,
): Promise<void> {
   return fs.promises.writeFile(filePath, rule.content)
}
