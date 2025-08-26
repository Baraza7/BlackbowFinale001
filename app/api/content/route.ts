import { NextResponse } from "next/server"
import { contentService } from "@/lib/contentService"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = searchParams.get("page") || ""
  const section = searchParams.get("section") || ""
  if (!page || !section) return NextResponse.json({ ok: false, error: "Missing page or section" }, { status: 400 })
  const data = await contentService.get(page, section)
  return NextResponse.json({ ok: true, data })
}


