import { requireAdmin } from "@/lib/admin-auth"

export default async function AdminRootLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin()
  return children
}




