"use client";

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Home, Info, Server, Rss, Mail, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

const pageCards = [
    { title: "Home", description: "Manage the home page content.", icon: Home },
    { title: "About", description: "Manage the about page content.", icon: Info },
    { title: "Services", description: "Manage the services page content.", icon: Server },
    { title: "Blog", description: "Manage blog posts and articles.", icon: Rss },
    { title: "Contacts", description: "Manage contact information and forms.", icon: Mail },
    { title: "Gallery", description: "Manage the image accordion gallery.", icon: ImageIcon, link: "/admin/gallery" },
];

const AdminDashboard = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Website Management</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pageCards.map((card, index) => (
                    card.link ? (
                        <Link href={card.link} key={index}>
                            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                                <CardHeader>
                                    <div className="flex items-center space-x-4">
                                        <card.icon className="w-8 h-8 text-blue-500" />
                                        <div>
                                            <CardTitle>{card.title}</CardTitle>
                                            <CardDescription>{card.description}</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                            </Card>
                        </Link>
                    ) : (
                        <Card key={index} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-center space-x-4">
                                    <card.icon className="w-8 h-8 text-blue-500" />
                                    <div>
                                        <CardTitle>{card.title}</CardTitle>
                                        <CardDescription>{card.description}</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>
                    )
                ))}
            </div>
        </div>
    );
};

export default AdminDashboard; 