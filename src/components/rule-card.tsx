"use client"

import { ChevronDown } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "~/components/ui/popover"
import type { Rule } from "~/data"
import { generateNameAbbr, isImageUrl, ny } from "~/lib/utils"
import { CopyButton } from "./copy-button"
import { CursorRuleButton } from "./cursor-rule-button"
import { ShareButton } from "./share-button"

export function RuleCard({ rule, isPage }: { rule: Rule; isPage?: boolean }) {
   return (
      <Card className="bg-background p-4 w-full aspect-square max-h-[600px] flex flex-col hover:shadow-lg transition-all duration-200 group">
         <CardContent
            className={ny(
               "bg-card h-full mb-2 font-mono p-4 text-sm relative flex-grow rounded-md border",
               isPage
                  ? "opacity-100"
                  : "opacity-80 hover:opacity-100 transition-opacity",
            )}
         >
            <div className="absolute right-3 top-3 z-10 space-x-2 flex opacity-0 group-hover:opacity-100 transition-opacity">
               <ShareButton slug={rule.slug} variant="outline" />
               <CopyButton
                  content={rule.content}
                  slug={rule.slug}
                  variant="outline"
               />
            </div>

            <Link href={`/${rule.slug}`} className="block h-full">
               <div className="h-full overflow-y-auto pr-16">
                  <code className="text-base block">{rule.content}</code>
               </div>
            </Link>
         </CardContent>

         <CardHeader className="p-0 space-y-2">
            <div className="flex items-center justify-between bg-muted/30 p-2 rounded-md">
               <CardTitle className="text-sm font-medium">
                  {rule.author?.name}
               </CardTitle>
               {rule.author?.url && (
                  <a
                     href={rule.author.url}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="hover:opacity-80 transition-opacity"
                  >
                     <Avatar className="size-8 ring-2 ring-border">
                        {rule.author.avatar &&
                        isImageUrl(rule.author.avatar) ? (
                           <AvatarImage
                              src={rule.author.avatar}
                              alt={rule.author.name}
                           />
                        ) : (
                           <AvatarFallback>
                              {generateNameAbbr(rule.author.name)}
                           </AvatarFallback>
                        )}
                     </Avatar>
                  </a>
               )}
            </div>

            {rule.libs && rule.libs.length > 0 && (
               <Popover>
                  <PopoverTrigger className="flex gap-2 items-center overflow-x-auto whitespace-nowrap h-6 cursor-pointer hover:bg-accent rounded-md px-2">
                     {rule.libs.slice(0, 2).map((lib) => (
                        <span
                           key={lib}
                           className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-md font-mono flex-shrink-0"
                        >
                           {lib}
                        </span>
                     ))}
                     {rule.libs.length > 2 && (
                        <span className="text-xs text-muted-foreground font-mono flex gap-1 items-center">
                           <span>+{rule.libs.length - 2} more</span>
                           <ChevronDown className="w-3 h-3" />
                        </span>
                     )}
                  </PopoverTrigger>
                  <PopoverContent className="grid gap-2">
                     {rule.libs.map((lib) => (
                        <span
                           key={lib}
                           className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-md font-mono"
                        >
                           {lib}
                        </span>
                     ))}
                  </PopoverContent>
               </Popover>
            )}
         </CardHeader>

         <div className="flex items-center gap-2 mt-4">
            <CursorRuleButton slug={rule.slug} />
         </div>
      </Card>
   )
}
