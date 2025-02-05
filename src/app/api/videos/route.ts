import { NextResponse } from "next/server"
import { videos } from "~/data/videos"

export const dynamic = "force-static"

export function GET() {
   return NextResponse.json({ data: videos })
}
