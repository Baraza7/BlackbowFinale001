import { prisma } from "./db"
import { ContentType, MediaRole } from "@prisma/client"
import { getStaticSection } from "./static-content"

export type ContentBlockDTO = {
  id: string
  type: ContentType
  content?: string | null
  metadata?: unknown
}

export type MediaAssetDTO = {
  id: string
  filename: string
  mimeType: string
  width?: number | null
  height?: number | null
  sizeBytes?: number | null
  publicPath?: string | null
  externalUrl?: string | null
  role?: MediaRole
  order?: number
}

export type SectionDTO = {
  pageSlug: string
  sectionKey: string
  title?: string | null
  blocks: ContentBlockDTO[]
  media: MediaAssetDTO[]
  source: "db" | "static"
}

export type SimpleContent = {
  id?: string
  title?: string
  subtitle?: string
  body?: string
  imageSrc?: string
  source: "db" | "static"
}

function extractSimpleFromSection(section: {
  title: string | null
  blocks: { id: string; key: string | null; type: ContentType; content: string | null; metadata: unknown }[]
  media: { media: { publicPath: string | null; externalUrl: string | null } | null; role: MediaRole; order: number }[]
}, pageSlug: string, sectionKey: string, source: "db" | "static"): SimpleContent {
  const blocks = section.blocks || []
  const byKey = (k: string) => blocks.find((b) => (b.key || "").toLowerCase() === k.toLowerCase())
  const titleBlock = byKey("title") || blocks[0]
  const subtitleBlock = byKey("subtitle") || blocks[1]
  const bodyBlock = byKey("body")

  const media = section.media || []
  const primary = media.sort((a, b) => a.order - b.order)[0]
  const imageSrc = primary?.media?.publicPath || primary?.media?.externalUrl || undefined

  return {
    id: titleBlock?.id || `${pageSlug}.${sectionKey}`,
    title: titleBlock?.content || undefined,
    subtitle: subtitleBlock?.content || undefined,
    body: bodyBlock?.content || undefined,
    imageSrc,
    source,
  }
}

async function getFromDb(pageSlug: string, sectionKey: string): Promise<SectionDTO | null> {
  const page = await prisma.page.findUnique({
    where: { slug: pageSlug },
    include: {
      sections: {
        where: { key: sectionKey },
        include: {
          blocks: {
            orderBy: { createdAt: "asc" },
          },
          media: {
            orderBy: { order: "asc" },
            include: {
              media: true,
            },
          },
        },
      },
    },
  })

  const section = page?.sections?.[0]
  if (!section) return null

  const blocks: ContentBlockDTO[] = section.blocks.map((b) => ({
    id: b.id,
    type: b.type,
    content: b.content,
    metadata: b.metadata ?? undefined,
  }))

  const media: MediaAssetDTO[] = section.media.map((m) => ({
    id: m.media.id,
    filename: m.media.filename,
    mimeType: m.media.mimeType,
    width: m.media.width,
    height: m.media.height,
    sizeBytes: m.media.sizeBytes,
    publicPath: m.media.publicPath ?? undefined,
    externalUrl: m.media.externalUrl ?? undefined,
    role: m.role,
    order: m.order,
  }))

  return {
    pageSlug,
    sectionKey,
    title: section.title,
    blocks,
    media,
    source: "db",
  }
}

export const contentService = {
  async get(pageSlug: string, sectionKey: string): Promise<SimpleContent | null> {
    const source = (process.env.CONTENT_SOURCE || "db").toLowerCase()

    if (source === "db") {
      const dbResult = await getFromDb(pageSlug, sectionKey)
      if (dbResult && (dbResult.blocks.length > 0 || dbResult.media.length > 0)) {
        return extractSimpleFromSection(
          {
            title: dbResult.title ?? null,
            blocks: dbResult.blocks.map((b) => ({ id: b.id, key: (b as any).key ?? null, type: b.type, content: b.content ?? null, metadata: b.metadata })),
            media: dbResult.media.map((m) => ({ media: { publicPath: m.publicPath ?? null, externalUrl: m.externalUrl ?? null }, role: m.role!, order: m.order })) as any,
          },
          pageSlug,
          sectionKey,
          "db",
        )
      }
    }

    const staticResult = getStaticSection(pageSlug, sectionKey)
    if (staticResult) {
      return extractSimpleFromSection(
        {
          title: staticResult.title ?? null,
          blocks: staticResult.blocks.map((b) => ({ id: b.id, key: (b as any).key ?? null, type: b.type, content: b.content ?? null, metadata: b.metadata })),
          media: staticResult.media.map((m) => ({ media: { publicPath: m.publicPath ?? null, externalUrl: m.externalUrl ?? null }, role: m.role!, order: m.order })) as any,
        },
        pageSlug,
        sectionKey,
        "static",
      )
    }

    return null
  },
}


