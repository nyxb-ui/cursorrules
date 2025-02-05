import { NextResponse } from "next/server"
import { rules } from "~/data"

export async function GET() {
   const formattedRules = rules.map((rule) => ({
      title: rule.title,
      slug: rule.slug,
      content: rule.content,
      tags: rule.tags,
      libs: rule.libs,
      author: rule.author,
   }))

   return NextResponse.json(formattedRules)
}
