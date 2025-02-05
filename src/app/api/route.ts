import { NextResponse } from "next/server"
import { rules } from "~/data"

export const dynamic = "force-static"

export function GET() {
   return NextResponse.json({ data: rules })
}
