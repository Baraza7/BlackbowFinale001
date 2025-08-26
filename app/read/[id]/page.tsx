import Header from "@/components/header"
import Footer from "@/components/footer"
import { prisma } from "@/lib/db"
import { notFound } from "next/navigation"

async function resolveContent(idOrSlug: string) {
  // id or composite slug like home.hero
  if (idOrSlug.includes(".")) {
    const [pageSlug, sectionKey] = idOrSlug.split(".")
    const page = await prisma.page.findUnique({
      where: { slug: pageSlug },
      include: { sections: { where: { key: sectionKey }, include: { blocks: true } } },
    })
    const section = page?.sections?.[0]
    if (!section) return null
    return { title: section.title || `${pageSlug}.${sectionKey}`, body: section.blocks?.[0]?.content || "" }
  }
  const block = await prisma.contentBlock.findUnique({ where: { id: idOrSlug } })
  if (!block) return null
  return { title: block.key || "Content", body: block.content || "" }
}

export default async function ReadPage({ params }: { params: { id: string } }) {
  const data = await resolveContent(params.id)
  if (!data) return notFound()
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 md:px-6 py-10">
        <h1 className="text-2xl font-semibold mb-4">{data.title}</h1>
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: data.body }} />
      </main>
      <Footer />
    </div>
  )
}


