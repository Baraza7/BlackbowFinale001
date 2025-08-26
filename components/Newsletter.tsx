"use client";

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { ArrowRight, Check, X, Loader2, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface NewsletterProps {
  title?: string;
  subtitle?: string;
  customContent?: React.ReactNode;
  showForm?: boolean;
  showWhatsApp?: boolean;
  whatsAppText?: string;
  isFooter?: boolean;
}

const Newsletter: React.FC<NewsletterProps> = ({
  title = "Get In Touch",
  subtitle = "Subscribe to our newsletter to get our latest news and updates.",
  customContent,
  showForm = true,
  showWhatsApp = false,
  whatsAppText = "",
  isFooter = false,
}) => {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState<
    "success" | "fail" | null
  >(null);
  const pathname = usePathname();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getPageName = (path: string) => {
    if (path === '/') return 'Home';
    const pageName = path.replace('/', '');
    return pageName.charAt(0).toUpperCase() + pageName.slice(1);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const pageName = getPageName(pathname);
      // Ensure name is always present for the API validation, especially in footer variant
      const effectiveName = name && name.trim().length > 0 ? name : (isFooter ? 'Footer Newsletter Signup' : 'Website User');
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: effectiveName,
          email,
          phone,
          subject: 'FOOTER EMAIL COLLECTION FORM IN THE BLACKBOW CONSULT WEBSITE',
          message: `Newsletter/CTA submission from ${pageName}.\nPhone: ${phone || '-'}\nEmail: ${email}`,
          privacy: true
        }),
      });

      if (response.ok) {
        setSubmissionStatus('success');
        setName('');
        setPhone('');
        setEmail('');
        setTimeout(() => setSubmissionStatus(null), 5000); // Reset after 5 seconds
      } else {
        setSubmissionStatus('fail');
        setTimeout(() => setSubmissionStatus(null), 5000); // Reset after 5 seconds
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmissionStatus('fail');
      setTimeout(() => setSubmissionStatus(null), 5000); // Reset after 5 seconds
    } finally {
      setIsSubmitting(false);
    }
  };

  const getButtonContent = () => {
    switch (submissionStatus) {
      case 'success':
        return (
          <>
            Submitted <Check className="ml-2 h-5 w-5" />
          </>
        );
      case 'fail':
        return (
          <>
            Failed <X className="ml-2 h-5 w-5" />
          </>
        );
      default:
        return (
          <>
            SUBMIT <ArrowRight className="ml-2 h-5 w-5" />
          </>
        );
    }
  };

  if (isFooter) {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-2 font-heading">Send us your email to find out more!</h3>
            <form onSubmit={handleSubmit} className="flex">
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="flex-1 px-3 py-2 text-sm border bg-transparent placeholder-gray-400 border-[#FFBE00] text-white rounded-l-md focus:outline-none"
                    required
                />
                <button 
                    type="submit"
                    className="bg-[#FFBE00] px-3 py-2 rounded-r-md text-[#27272A] flex items-center justify-center"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <Send className="h-4 w-4" />
                    )}
                </button>
            </form>
        </div>
    );
  }

  return (
    <section className="py-20">
      <div className="mx-auto w-full max-w-screen-xl px-4 md:px-6">
        <div className="relative rounded-2xl p-8 md:p-12 bg-gradient-to-r from-orange-500 to-red-600">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-1 h-24 bg-gray-300/50 hidden md:block"></div>
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight max-w-md">
                {title}
              </h2>
            </div>
            <div className={`lg:w-1/2 ${customContent ? 'text-left' : ''}`}>
              <p className="text-white/90 mb-4">
                {subtitle}
              </p>
              {customContent || (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-4 sm:gap-0">
                    <Input
                      type="text"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-300 sm:w-[48%]"
                    />
                    <Input
                      type="tel"
                      placeholder="Phone Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-300 sm:w-[48%]"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Input
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-300 flex-grow"
                    />
                    <Button 
                      type="submit" 
                      variant="secondary" 
                      disabled={isSubmitting}
                      className={`
                        bg-gray-200 text-black 
                        transition-all duration-300 ease-in-out transform hover:scale-105
                        ${submissionStatus === 'success' && 'bg-green-500 text-white'}
                        ${submissionStatus === 'fail' && 'bg-red-500 text-white'}
                        ${isSubmitting && 'opacity-50 cursor-not-allowed'}
                      `}
                    >
                      {getButtonContent()}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter; 