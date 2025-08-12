"use client";

import Image from 'next/image';
import Link from 'next/link';
import { WHATSAPP_NUMBER_E164, WHATSAPP_MESSAGE } from '@/lib/constants';
import { usePathname } from 'next/navigation';

const FloatingWhatsApp = () => {
    const pathname = usePathname();

    // Do not render on the homepage
    if (pathname === '/') {
        return null;
    }

    // Canonical WhatsApp settings for Blackbow Consult
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER_E164}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

    return (
        <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <div className="fixed bottom-6 right-6 z-50 h-16 w-16 cursor-pointer transition-transform hover:scale-110">
                <Image
                    src="/WhatsAppIcon.png"
                    alt="Chat on WhatsApp"
                    fill
                    className="object-contain"
                />
            </div>
        </Link>
    );
};

export default FloatingWhatsApp; 