"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface FaqItem {
  question: string
  answer: string
}

export function FaqTabs() {
  const [activeTab, setActiveTab] = useState("faq-1")

  const faqs: FaqItem[] = [
    {
      question: "What kind of financial solutions do you offer?",
      answer:
        "We specialize in a range of financial solutions including innovative Trade Finance, comprehensive Insurance solutions, and expert Investment Advisory services. Our goal is to provide seamless, tailor-made support that unlocks growth and success for your business.",
    },
    {
      question: "Which sectors does Blackbow Consult work with?",
      answer:
        "We have a broad portfolio and provide expert financial consultancy across multiple key sectors. This includes Transport and Logistics, Manufacturing, Real Estate, Aviation, ICT, Education, and Agribusiness.",
    },
    {
      question: "What is your approach to working with clients?",
      answer:
        "We follow a strategic, client-first, and results-driven approach. We begin with an introductory meeting to understand your needs, conduct a thorough needs analysis, present a customized proposal, and then move to contract signing and project execution, ensuring transparency and collaboration at every step.",
    },
    {
      question: "How do I start the engagement process with your team?",
      answer:
        "Starting is simple. Reach out to us via our contact form, email, or phone. We will schedule an introductory meeting to discuss your specific needs and objectives, which is the first step in our 'Work With Us' process.",
    },
    {
      question: "What makes your services trustworthy and efficient?",
      answer:
        "Our reputation is built on years of excellence and a deep commitment to our core values: Integrity, Client-Centricity, Professionalism, and Excellence. We combine this with an efficient, time-tested process to ensure we deliver reliable and impactful results for every client."
    },
  ]

  return (
    <div className="w-full">
      <Tabs defaultValue="faq-1" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="overflow-x-auto pb-2 md:overflow-visible">
          <TabsList className="h-auto p-1 rounded-lg mb-6 flex md:grid md:grid-cols-5 min-w-max md:min-w-0 gap-1" style={{ backgroundColor: 'var(--accent-yellow)' }}>
            {faqs.map((faq, index) => (
              <TabsTrigger
                key={`faq-${index + 1}`}
                value={`faq-${index + 1}`}
                className="py-3 px-4 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md text-sm font-medium transition-all whitespace-normal text-center"
              >
                <span className="line-clamp-1">{faq.question}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {faqs.map((faq, index) => (
          <TabsContent
            key={`faq-${index + 1}`}
            value={`faq-${index + 1}`}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mt-2"
          >
            <h3 className="font-serif text-xl font-bold mb-3 text-[#27272A]">{faq.question}</h3>
            <p className="font-body text-gray-600 leading-relaxed">{faq.answer}</p>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
