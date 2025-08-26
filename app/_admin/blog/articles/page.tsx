"use client"

import BlogAdmin from "@/components/admin/BlogAdmin"
import AdminLayout from "@/components/admin/AdminLayout"

export default function AdminBlogArticlesPage() {
  return (
    <AdminLayout 
      title="Blog Management"
      breadcrumbs={[
        { label: "Blog", href: "/admin/blog" },
        { label: "Articles" }
      ]}
      backHref="/admin"
    >
      <div className="bg-white rounded-lg shadow-sm">
        <BlogAdmin config={null} />
      </div>
    </AdminLayout>
  )
} 