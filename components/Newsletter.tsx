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
  const [submissionStatus, setSubmissionStatus] = useState<"success" | "fail" | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // For preview: simulate API call with timeout
    setTimeout(() => {
      setSubmissionStatus('success');
      setName('');
      setPhone('');
      setEmail('');
      toast({
        title: "Success!",
        description: "Thank you for subscribing to our newsletter.",
      });
      setTimeout(() => setSubmissionStatus(null), 5000);
      setIsSubmitting(false);
    }, 1000);
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
        <h3 className="text-lg font-semibold mb-2 font-heading">Newsletter</h3>
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
    <section className="py-12 md:py-24" style={{ background: "linear-gradient(to bottom right, #960606 0%, #960606 15%, #D01C1F 25%, #D01C1F 100%)" }}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h2>
          <p className="text-white/80 max-w-2xl mx-auto">{subtitle}</p>
        </div>

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
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-300 sm:flex-1"
              />
              <Button
                type="submit"
                className={cn(
                  "bg-[#FFBE00] text-[#27272A] hover:bg-[#FFBE00]/90 sm:w-[200px]",
                  submissionStatus === "success" && "bg-green-500 hover:bg-green-600",
                  submissionStatus === "fail" && "bg-red-500 hover:bg-red-600"
                )}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    Submitting... <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                  </>
                ) : (
                  getButtonContent()
                )}
              </Button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default Newsletter; 