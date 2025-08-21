import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Mail, MapPin, Phone, FileText } from "lucide-react"
import { CANONICAL_ADDRESS, CANONICAL_MAPS_URL, WHATSAPP_URL } from "@/lib/constants"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { InfoCard } from "@/components/InfoCard"
import { FaqTabs } from "@/components/faq-tabs"
import SharedPageSections from "@/components/SharedPageSections"
import InnerHero from "@/components/InnerHero"
import ContactForm from "@/components/contact-form"

export default function ContactsPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800 contacts-page">
      <Header />

      <main>
        {/* Shared Hero Section (matches other pages) */}
        <InnerHero>
          <div className="space-y-6 text-center">
            <h1 className="hero-title text-white whitespace-nowrap">
              Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFBE00] to-[#00B1D2]">Us</span>
            </h1>
            <p className="text-white/90 max-w-3xl mx-auto">
              Welcome to our Contacts page. Our team is ready to answer questions, support ongoing engagements,
              and explore new partnerships. Reach us by phone or email, or visit our Nairobi office during business hours.
            </p>
          </div>
        </InnerHero>

        {/* Overlapping Info Cards Section (matches other pages) */}
        <section className="relative -mt-24 pb-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-0 max-w-5xl mx-auto">
              <InfoCard icon={<FileText className="h-8 w-8 text-white" />} title="Postal Address">
                <p className="text-sm">Blackbow Consult Ltd., P.O. Box 3143-00506, Nairobi – Kenya</p>
              </InfoCard>
              <InfoCard icon={<Phone className="h-8 w-8 text-white" />} title="Contacts">
                <p className="text-sm">+254 728 552 225 / +254 720 709 711</p>
                <p className="text-sm">info@blackbowconsult.co.ke</p>
              </InfoCard>
              <InfoCard icon={<MapPin className="h-8 w-8 text-white" />} title="Physical Address">
                <p className="text-sm">
                  <a href={CANONICAL_MAPS_URL} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:underline">{CANONICAL_ADDRESS}</a>
                </p>
              </InfoCard>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto relative">
              {/* Subtle branded glow */}
              <div className="pointer-events-none absolute -inset-[1px] rounded-3xl" style={{ background: "linear-gradient(135deg, rgba(255,190,0,0.25), rgba(255,255,255,0.05))" }} />
              {/* Glass / floating card */}
              <div className="contact-card relative rounded-3xl border border-black/10 shadow-2xl p-6 sm:p-8 md:p-10"
                   style={{
                     background: '#FFBE00',
                     boxShadow: '0 25px 60px rgba(0,0,0,0.35), 0 10px 25px rgba(0,0,0,0.25)'
                   }}
              >
                <h2 className="text-3xl font-bold mb-6 text-[#D01C1F] text-center md:text-left">Get in Touch</h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
        <SharedPageSections variant="contacts" />
      </main>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#27272A] tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="font-body text-gray-600 max-w-3xl mx-auto text-lg">
              Find quick answers to common questions about our services and process. If you don't find what you're looking for, feel free to send us a message.
            </p>
          </div>
          <div className="max-w-5xl mx-auto">
            <FaqTabs />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
