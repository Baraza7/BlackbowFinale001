"use client"

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Briefcase, Settings, BarChart3, Users, FileText } from 'lucide-react'
import Link from 'next/link'
import AdminLayout from "@/components/admin/AdminLayout"

const servicesSections = [
    { title: "Services", description: "Create, edit, and manage services.", icon: Briefcase, link: "/admin/services/manage" },
    { title: "Settings", description: "Configure services settings and preferences.", icon: Settings },
    { title: "Analytics", description: "View services performance and statistics.", icon: BarChart3 },
    { title: "Categories", description: "Manage service categories and tags.", icon: FileText },
]

const ServicesAdminPage = () => {
    return (
        <AdminLayout 
            title="Services Management"
            breadcrumbs={[{ label: "Services" }]}
            backHref="/admin"
        >
            <div className="mb-6">
                <p className="text-gray-600">Manage your services content, settings, and analytics.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {servicesSections.map((section, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                        {section.link ? (
                            <Link href={section.link}>
                                <CardHeader className="text-center">
                                    <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-fit">
                                        <section.icon className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <CardTitle className="text-lg">{section.title}</CardTitle>
                                    <CardDescription className="text-sm">
                                        {section.description}
                                    </CardDescription>
                                </CardHeader>
                            </Link>
                        ) : (
                            <CardHeader className="text-center opacity-50">
                                <div className="mx-auto mb-4 p-3 bg-gray-100 rounded-full w-fit">
                                    <section.icon className="h-6 w-6 text-gray-400" />
                                </div>
                                <CardTitle className="text-lg">{section.title}</CardTitle>
                                <CardDescription className="text-sm">
                                    {section.description}
                                    <span className="block text-xs text-gray-400 mt-1">Coming Soon</span>
                                </CardDescription>
                            </CardHeader>
                        )}
                    </Card>
                ))}
            </div>

            {/* Quick Stats */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium text-gray-600">Total Services</CardTitle>
                        <div className="text-2xl font-bold">6</div>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium text-gray-600">Published</CardTitle>
                        <div className="text-2xl font-bold text-green-600">6</div>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium text-gray-600">Categories</CardTitle>
                        <div className="text-2xl font-bold text-blue-600">3</div>
                    </CardHeader>
                </Card>
            </div>
        </AdminLayout>
    )
}

export default ServicesAdminPage 