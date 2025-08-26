import { prisma } from "@/lib/db"
import Link from "next/link"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

async function getPages() {
  const pages = await prisma.page.findMany({
    orderBy: { slug: "asc" },
    include: {
      sections: {
        orderBy: { order: "asc" },
        select: { id: true, key: true, title: true },
      },
    },
  })
  return pages
}

export default async function AdminContentPage() {
  const pages = await getPages()
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Content (Read-only)</h1>
      {pages.length === 0 ? (
        <p className="text-sm text-muted-foreground">No pages found in DB. Static content will be used publicly.</p>
      ) : (
        <div className="space-y-8">
          {pages.map((p) => (
            <div key={p.id} className="border rounded-md p-4">
              <div className="mb-2 font-medium">/{p.slug}</div>
              {p.sections.length > 0 ? (
                <Tabs defaultValue={p.sections[0]?.key}>
                  <TabsList>
                    {p.sections.map((s) => (
                      <TabsTrigger key={s.id} value={s.key}>
                        {s.key}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {p.sections.map((s) => (
                    <TabsContent key={s.id} value={s.key}>
                      <div className="text-sm">{s.title || s.key}</div>
                      <div className="mt-2 text-xs text-muted-foreground">Read-only mirror. Editing coming soon.</div>
                      <div className="mt-2">
                        <Link href={`/admin/content/${p.slug}/${s.key}`} className="underline text-primary">Open</Link>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              ) : (
                <div className="text-sm text-muted-foreground">No sections found.</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}


