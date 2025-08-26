"use server"
import { z } from "zod"
import { prisma } from "@/lib/db"
import { requireAdmin } from "@/lib/admin-auth"

const saveSchema = z.object({
  title: z.string().max(120).optional().nullable(),
  subtitle: z.string().max(240).optional().nullable(),
  body: z.string().max(8000).optional().nullable(),
})

export async function saveSection(pageSlug: string, sectionKey: string, formData: FormData) {
  await requireAdmin()
  const parsed = saveSchema.safeParse({
    title: formData.get("title"),
    subtitle: formData.get("subtitle"),
    body: formData.get("body"),
  })
  if (!parsed.success) {
    return { ok: false, error: parsed.error.flatten() }
  }
  const data = parsed.data

  const page = await prisma.page.findUnique({ where: { slug: pageSlug } })
  if (!page) return { ok: false, error: "Page not found" }
  const section = await prisma.section.findFirst({ where: { pageId: page.id, key: sectionKey } })
  if (!section) return { ok: false, error: "Section not found" }

  // map to blocks by key
  const upserts = [] as any[]
  if (data.title !== undefined) {
    upserts.push(
      prisma.contentBlock.upsert({
        where: { id: `${pageSlug}.${sectionKey}.title` },
        update: { content: data.title ?? null },
        create: { id: `${pageSlug}.${sectionKey}.title`, sectionId: section.id, key: "title", type: "RICH_TEXT", content: data.title ?? null },
      }),
    )
  }
  if (data.subtitle !== undefined) {
    upserts.push(
      prisma.contentBlock.upsert({
        where: { id: `${pageSlug}.${sectionKey}.subtitle` },
        update: { content: data.subtitle ?? null },
        create: { id: `${pageSlug}.${sectionKey}.subtitle`, sectionId: section.id, key: "subtitle", type: "RICH_TEXT", content: data.subtitle ?? null },
      }),
    )
  }
  if (data.body !== undefined) {
    upserts.push(
      prisma.contentBlock.upsert({
        where: { id: `${pageSlug}.${sectionKey}.body` },
        update: { content: data.body ?? null },
        create: { id: `${pageSlug}.${sectionKey}.body`, sectionId: section.id, key: "body", type: "RICH_TEXT", content: data.body ?? null },
      }),
    )
  }

  await prisma.$transaction(upserts)

  await prisma.revision.create({
    data: {
      label: `edit-${pageSlug}-${sectionKey}`,
      items: [
        {
          entityType: "SECTION",
          entityId: section.id,
          data: { ...data },
        },
      ],
    },
  })

  return { ok: true, id: section.id }
}




