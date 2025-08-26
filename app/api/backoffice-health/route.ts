import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET() {
  const checks: Record<string, unknown> = {}
  try {
    const dbPing = await prisma.$queryRaw`SELECT 1 as ok`
    checks.db = Array.isArray(dbPing) ? "ok" : "unknown"
  } catch (e) {
    checks.db = "error"
  }

  const contentSource = process.env.CONTENT_SOURCE || "db"
  checks.contentSource = contentSource

  // content counts
  try {
    const home = await prisma.page.findUnique({ where: { slug: "home" }, include: { sections: { where: { key: "hero" }, include: { blocks: true } } } })
    const about = await prisma.page.findUnique({ where: { slug: "about" }, include: { sections: { where: { key: "intro" }, include: { blocks: true } } } })
    checks.homeHeroBlocks = home?.sections?.[0]?.blocks?.length ?? 0
    checks.aboutIntroBlocks = about?.sections?.[0]?.blocks?.length ?? 0
  } catch {
    checks.homeHeroBlocks = 0
    checks.aboutIntroBlocks = 0
  }

  return NextResponse.json({ ok: true, checks })
}


