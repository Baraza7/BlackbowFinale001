"use client"

import ServicesAdmin from "@/components/admin/ServicesAdmin"
import AdminLayout from "@/components/admin/AdminLayout"

export default function AdminServicesManagePage() {
  return (
    <AdminLayout 
      title="Services Management"
      breadcrumbs={[
        { label: "Services", href: "/admin/services" },
        { label: "Manage" }
      ]}
      backHref="/admin"
    >
      <div className="bg-white rounded-lg shadow-sm">
        <ServicesAdmin config={null} />
      </div>
    </AdminLayout>
  )
}