"use client"

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { FileText, Settings, BarChart3, Users } from 'lucide-react'
import Link from 'next/link'
import AdminLayout from "@/components/admin/AdminLayout"

const blogSections = [
    { title: "Articles", description: "Create, edit, and manage blog articles.", icon: FileText, link: "/admin/blog/articles" },
    { title: "Settings", description: "Configure blog settings and preferences.", icon: Settings },
    { title: "Analytics", description: "View blog performance and statistics.", icon: BarChart3 },
    { title: "Authors", description: "Manage blog authors and contributors.", icon: Users },
]

const BlogAdminPage = () => {
    return (
        <AdminLayout 
            title="Blog Management"
            breadcrumbs={[{ label: "Blog" }]}
            backHref="/admin"
        >
            <div className="mb-6">
                <p className="text-gray-600">Manage your blog content, settings, and analytics.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogSections.map((section, index) => (
                    section.link ? (
                        <Link href={section.link} key={index}>
                            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                                <CardHeader>
                                    <div className="flex items-center space-x-4">
                                        <section.icon className="w-8 h-8 text-blue-500" />
                                        <div>
                                            <CardTitle>{section.title}</CardTitle>
                                            <CardDescription>{section.description}</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                            </Card>
                        </Link>
                    ) : (
                        <Card key={index} className="hover:shadow-lg transition-shadow opacity-50">
                            <CardHeader>
                                <div className="flex items-center space-x-4">
                                    <section.icon className="w-8 h-8 text-gray-400" />
                                    <div>
                                        <CardTitle className="text-gray-500">{section.title}</CardTitle>
                                        <CardDescription>{section.description}</CardDescription>
                                        <p className="text-xs text-gray-400 mt-1">Coming soon</p>
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>
                    )
                ))}
            </div>
        </AdminLayout>
    )
}

export default BlogAdminPage 