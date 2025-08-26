import { requireAdmin } from "@/lib/admin-auth"
import { prisma } from "@/lib/db"
import { saveSection } from "../actions"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

export default async function AdminSectionEdit({ params }: { params: { page: string; section: string } }) {
  await requireAdmin()
  const page = await prisma.page.findUnique({ where: { slug: params.page } })
  const section = page
    ? await prisma.section.findFirst({ where: { pageId: page.id, key: params.section }, include: { blocks: true, media: { include: { media: true } } } })
    : null

  const byKey = (k: string) => section?.blocks.find((b) => (b.key || "").toLowerCase() === k.toLowerCase())
  const title = byKey("title")?.content || ""
  const subtitle = byKey("subtitle")?.content || ""
  const body = byKey("body")?.content || ""
  const img = section?.media?.[0]?.media?.publicPath || section?.media?.[0]?.media?.externalUrl || ""

  async function action(formData: FormData) {
    "use server"
    return saveSection(params.page, params.section, formData)
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-semibold">Edit /{params.page}/{params.section}</h1>
      <form action={action} className="space-y-4 max-w-2xl">
        <div>
          <label className="block text-sm font-medium mb-1">Title (≤120)</label>
          <Input name="title" defaultValue={title} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Subtitle (≤240)</label>
          <Input name="subtitle" defaultValue={subtitle} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Body (≤8000)</label>
          <Textarea name="body" defaultValue={body} rows={10} />
          <div className="text-xs text-muted-foreground mt-1">If content is long, end-users will see a “Read more” link.</div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Image</label>
          <div className="text-xs text-muted-foreground mb-2">Current: {img || "(none)"}</div>
          <Input type="file" name="image" accept="image/*" />
          <div className="text-xs text-amber-600 mt-1">Image optimization will be enabled on staging/production.</div>
        </div>
        <div className="flex gap-2">
          <Button type="submit" variant="default">Save Draft</Button>
          <Button type="button" variant="outline" disabled>Publish</Button>
          <Button type="button" variant="outline" disabled>Restore Baseline</Button>
          <Button type="button" variant="ghost">Cancel</Button>
        </div>
      </form>
    </div>
  )
}




