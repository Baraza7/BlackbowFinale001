"use client";

export const dynamic = 'force-dynamic';

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Image as ImageIcon, Users, FileText, Award } from 'lucide-react';
import Link from 'next/link';
import AdminLayout from "@/components/admin/AdminLayout";

const aboutSections = [
    { title: "Gallery", description: "Manage the image accordion gallery on About page.", icon: ImageIcon, link: "/admin/gallery" },
    { title: "Team Section", description: "Manage team members and their information.", icon: Users },
    { title: "Content", description: "Manage about page text content and sections.", icon: FileText },
    { title: "Values", description: "Manage core values and company principles.", icon: Award },
];

const AboutAdminPage = () => {
    return (
        <AdminLayout 
            title="About Page Management"
            breadcrumbs={[{ label: "About" }]}
            backHref="/admin"
        >
            <div className="mb-6">
                <p className="text-gray-600">Manage different sections and content of the About page.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {aboutSections.map((section, index) => (
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
    );
};

export default AboutAdminPage; 