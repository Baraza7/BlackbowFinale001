// Seed script scaffold (do not execute without CEO approval)
import { PrismaClient, ContentType, MediaRole } from "@prisma/client"
import { validateImage, generateVariants } from "@/lib/image-validation"
import fs from "fs"
import path from "path"

const prisma = new PrismaClient()

async function main() {
  if (process.env.NODE_ENV === "production") {
    throw new Error("Do not run seeds in production")
  }

  // 1) Upsert pages
  const home = await prisma.page.upsert({
    where: { slug: "home" },
    update: {},
    create: { slug: "home", title: "Home" },
  })

  // 2) Upsert sections
  const hero = await prisma.section.upsert({
    where: { pageId_key: { pageId: home.id, key: "hero" } },
    update: {},
    create: { pageId: home.id, key: "hero", title: "Hero", order: 0 },
  })

  // 3) Import text blocks (example)
  await prisma.contentBlock.upsert({
    where: { id: "seed-home-hero-title" },
    update: {},
    create: {
      id: "seed-home-hero-title",
      sectionId: hero.id,
      type: ContentType.RICH_TEXT,
      content: "Welcome to <span style='color: #FFBE00;'>Blackbow</span><br />Consult Limited.",
    },
  })

  // 4) Import image (example) from public dir
  const imgPath = path.join(process.cwd(), "public", "Home2Hero.png")
  if (fs.existsSync(imgPath)) {
    const buffer = fs.readFileSync(imgPath)
    await validateImage(buffer, { minWidth: 1600, minHeight: 900, maxBytes: 2 * 1024 * 1024 })
    const variants = await generateVariants(buffer)
    const asset = await prisma.mediaAsset.upsert({
      where: { filename: "Home2Hero.png" },
      update: { variants: { webp: true, avif: true } },
      create: {
        filename: "Home2Hero.png",
        mimeType: "image/png",
        publicPath: "/Home2Hero.png",
        variants: { webp: true, avif: true },
      },
    })

    await prisma.sectionMedia.upsert({
      where: { sectionId_mediaId_role: { sectionId: hero.id, mediaId: asset.id, role: MediaRole.PRIMARY } },
      update: {},
      create: { sectionId: hero.id, mediaId: asset.id, role: MediaRole.PRIMARY, order: 0 },
    })
  }

  // 5) Create baseline revision placeholder (details to be filled in)
  await prisma.revision.create({
    data: {
      label: "Baseline v1.0",
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })


