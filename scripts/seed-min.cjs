/* Seed current static copy (read-only). Idempotent. Local only. */
const { PrismaClient, ContentType } = require("@prisma/client")

async function main() {
  const dbUrl = process.env.DATABASE_URL || ""
  const contentSource = (process.env.CONTENT_SOURCE || "db").toLowerCase()
  if (!dbUrl.startsWith("file:")) {
    console.log("ABORT: DATABASE_URL is not a local sqlite file")
    return
  }
  if (contentSource !== "db") {
    console.log("ABORT: CONTENT_SOURCE is not 'db'")
    return
  }

  const prisma = new PrismaClient()
  let upserts = 0
  try {
    // Pages
    const home = await prisma.page.upsert({ where: { slug: "home" }, update: {}, create: { slug: "home", title: "Home" } })
    const about = await prisma.page.upsert({ where: { slug: "about" }, update: {}, create: { slug: "about", title: "About" } })
    upserts += 2

    // Sections
    const homeHero = await prisma.section.upsert({
      where: { pageId_key: { pageId: home.id, key: "hero" } },
      update: {},
      create: { pageId: home.id, key: "hero", title: "Hero", order: 0 },
    })
    const aboutIntro = await prisma.section.upsert({
      where: { pageId_key: { pageId: about.id, key: "intro" } },
      update: {},
      create: { pageId: about.id, key: "intro", title: "Intro", order: 0 },
    })
    upserts += 2

    // Content blocks (keyed)
    // home.hero
    await prisma.contentBlock.upsert({
      where: { id: "seed-home-hero-title" },
      update: { content: "Welcome to <span style='color: #FFBE00;'>Blackbow</span><br />Consult Limited." },
      create: { id: "seed-home-hero-title", sectionId: homeHero.id, key: "title", type: ContentType.RICH_TEXT, content: "Welcome to <span style='color: #FFBE00;'>Blackbow</span><br />Consult Limited." },
    })
    await prisma.contentBlock.upsert({
      where: { id: "seed-home-hero-subtitle" },
      update: { content: "Your Partner in Customized Trade Finance, Insurance & Investment Solutions Across Africa" },
      create: { id: "seed-home-hero-subtitle", sectionId: homeHero.id, key: "subtitle", type: ContentType.RICH_TEXT, content: "Your Partner in Customized Trade Finance, Insurance & Investment Solutions Across Africa" },
    })
    upserts += 2

    // about.intro
    await prisma.contentBlock.upsert({
      where: { id: "seed-about-intro-title" },
      update: { content: "Meet our team of friendly & experienced experts" },
      create: { id: "seed-about-intro-title", sectionId: aboutIntro.id, key: "title", type: ContentType.RICH_TEXT, content: "Meet our team of friendly & experienced experts" },
    })
    await prisma.contentBlock.upsert({
      where: { id: "seed-about-intro-body" },
      update: { content: "Our strength lies in our collective expertise and passion. Get to know the dedicated professionals at Blackbow Consult, committed to driving your success with innovative solutions and unwavering support." },
      create: { id: "seed-about-intro-body", sectionId: aboutIntro.id, key: "body", type: ContentType.RICH_TEXT, content: "Our strength lies in our collective expertise and passion. Get to know the dedicated professionals at Blackbow Consult, committed to driving your success with innovative solutions and unwavering support." },
    })
    upserts += 2

    // Baseline revision label
    await prisma.revision.upsert({
      where: { id: "seed_v1" },
      update: { label: "seed_v1" },
      create: { id: "seed_v1", label: "seed_v1" },
    })
    upserts += 1

    console.log(JSON.stringify({ ok: true, upserts }, null, 2))
  } finally {
    await prisma.$disconnect()
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})


