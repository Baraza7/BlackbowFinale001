"use client";

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Image as ImageIcon, Grid3X3, FileText, Video } from 'lucide-react';
import Link from 'next/link';
import AdminLayout from "@/components/admin/AdminLayout";

const mediaSections = [
    { title: "FullGallery", description: "Manage the 3x3 image grid gallery on Media page.", icon: Grid3X3, link: "/admin/media/fullgallery" },
    { title: "Content", description: "Manage media page text content and sections.", icon: FileText },
    { title: "Videos", description: "Manage video content and media files.", icon: Video },
    { title: "Archive", description: "Manage archived media and historical content.", icon: ImageIcon },
];

const MediaAdminPage = () => {
    return (
        <AdminLayout 
            title="Media Page Management"
            breadcrumbs={[{ label: "Media" }]}
            backHref="/admin"
        >
            <div className="mb-6">
                <p className="text-gray-600">Manage different sections and content of the Media page.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mediaSections.map((section, index) => (
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

export default MediaAdminPage; 