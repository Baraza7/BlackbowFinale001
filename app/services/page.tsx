"use client"

import Image from "next/image"
import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { InfoCard } from "@/components/InfoCard"
import { DollarSign, Zap, ShieldCheck, Briefcase, FileText, Handshake, Building2, Ship, Cpu, GraduationCap, Tractor, Users } from "lucide-react"
import { ServiceGridCard } from "@/components/ServiceGridCard"
import SharedPageSections from "@/components/SharedPageSections"
import InnerHero from "@/components/InnerHero"

const services = [
    {
      icon: <FileText size={40} />,
      title: "Bid Securities",
      description: "Provides financial assurance to project owners that bidders will honor their obligations, facilitating seamless participation in tenders.",
      href: "/services/bid-securities"
    },
    {
      icon: <Handshake size={40} />,
      title: "Performance Guarantees",
      description: "A guarantee issued to a procuring entity on behalf of the winning bidder to guarantee successful completion of the awarded project.",
      href: "/services/performance-guarantees"
    },
    {
      icon: <div className="flex items-center justify-center font-bold text-3xl" style={{ width: '40px', height: '40px' }}>Ksh</div>,
      title: "Advance Payment Guarantees",
      description: "Issued on behalf of our clients to secure upfront payments for jobs awarded but not yet executed, enabling project mobilization.",
      href: "/services/advance-payment-guarantees"
    },
    {
      icon: <ShieldCheck size={40} />,
      title: "Contractors' All Risk Insurance",
      description: "Comprehensive insurance coverage protecting against all risks associated with construction projects and work-related injuries.",
      href: "/services/contractors-insurance"
    },
    {
      icon: <Briefcase size={40} />,
      title: "Trade Finance Solutions",
      description: "Innovative and flexible financing that optimizes cash flow and mitigates risks associated with domestic and international trade.",
      href: "/services/trade-finance"
    },
    {
      icon: <Zap size={40} />,
      title: "Investment Advisory",
      description: "Expert advisory services to help you navigate financial markets and make informed decisions to grow your wealth.",
      href: "/services/investment-advisory"
    }
];

export default function ServicesPage() {
    const [activeCard, setActiveCard] = useState(0);

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Header />

      {/* Hero Section */}
      <InnerHero>
        <div className="space-y-6 text-center">
          <h1 className="hero-title text-white whitespace-nowrap">
            Our Comprehensive <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFBE00] to-[#00B1D2]">Solutions</span>
          </h1>
          <p className="text-white/90 max-w-3xl mx-auto">
            Explore our full range of trade finance, insurance, and advisory services—designed to unlock growth,
            protect projects, and keep your business moving with confidence.
          </p>
        </div>
      </InnerHero>

      {/* Info Cards Section - Overlapping Design */}
      <section className="relative -mt-24 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-0 max-w-5xl mx-auto">
            <InfoCard icon={<div className="h-8 w-8 text-white flex items-center justify-center font-bold text-lg">Ksh</div>} title="Affordable">
              <p className="text-sm">Tailored solutions that fit your budget.</p>
            </InfoCard>
            <InfoCard icon={<Zap className="h-8 w-8 text-white" />} title="Efficient">
                <p className="text-sm">Swift and customized service delivery.</p>
            </InfoCard>
            <InfoCard icon={<ShieldCheck className="h-8 w-8 text-white" />} title="Trustworthy">
                <p className="text-sm">Reliable partnerships built on integrity.</p>
            </InfoCard>
          </div>
        </div>
      </section>

      {/* Introductory Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--accent-yellow)' }}>
              Empowering Your Business Through Our Expertise
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Discover the full range of financial solutions and advisory services Blackbow Consult Ltd. offers. We pride ourselves on delivering tailor-made strategies that drive growth, mitigate risks, and ensure your success across various sectors in Kenya and Africa. Our expertise spans critical areas designed to meet the evolving needs of modern businesses.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-20 bg-gray-950 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            onMouseLeave={() => setActiveCard(0)}
          >
            {services.map((service, index) => (
                <div key={index} onMouseEnter={() => setActiveCard(index)}>
                    <ServiceGridCard 
                        isActive={index === activeCard}
                        icon={service.icon}
                        title={service.title}
                        description={service.description}
                        href={service.href}
                    />
                </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors Section */}
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
                        Serving Key Sectors Across Africa
                    </h2>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Our expertise is not limited by industry. We provide tailored financial solutions to a diverse range of sectors that form the backbone of our economy.
                    </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
                    <SectorCard icon={<Ship size={40} />} name="Transport" />
                    <SectorCard icon={<Building2 size={40} />} name="Manufacturing" />
                    <SectorCard icon={<Briefcase size={40} />} name="Real Estate" />
                    <SectorCard icon={<Cpu size={40} />} name="ICT" />
                    <SectorCard icon={<GraduationCap size={40} />} name="Education" />
                    <SectorCard icon={<Tractor size={40} />} name="Agribusiness" />
                </div>
            </div>
        </section>

      {/* TeamIntro Section */}
      <section id="TeamIntro" className="relative py-[10%] bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 max-[600px]:grid-cols-1 gap-8 items-center">
            <div className="text-black">
              <h2
                className="font-italiana text-4xl lg:text-5xl font-bold mb-6"
                style={{ color: 'var(--accent-yellow)' }}
              >
                Why Choose Us?
              </h2>
              <p className="font-body text-gray-800 text-lg leading-relaxed">
                When you choose our services, you get the perfect blend of affordability, efficiency, and trustworthiness. We offer competitive pricing without compromising quality, ensuring you get the best value for your money. Our streamlined processes guarantee fast and reliable service, saving you time and effort. Plus, with a proven track record of integrity and customer satisfaction, you can trust us to deliver on our promises every time.
              </p>
            </div>
            <div className="relative h-80">
              <Image
                src="/BulldozerSmall.png"
                alt="Bulldozer"
                fill
                className="object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
                <FeatureCard title="Expertise" description="Leveraging deep industry knowledge to provide insightful and effective financial solutions." icon={<Zap size={32} />} />
                <FeatureCard title="Customized Solutions" description="Every solution is tailor-made to fit the unique needs and goals of your business." icon={<ShieldCheck size={32} />} />
                <FeatureCard title="Experienced Team" description="Our team consists of seasoned professionals dedicated to achieving the best outcomes." icon={<Users size={32} />} />
                <FeatureCard title="Strong Partnerships" description="We build lasting, trust-based relationships to foster mutual growth and success." icon={<Handshake size={32} />} />
            </div>
        </div>
      </section>

      <SharedPageSections />

      <Footer />
    </div>
  )
}

const SectorCard = ({ icon, name }: { icon: React.ReactNode; name: string }) => {
    return (
        <div className="group flex flex-col items-center p-6 bg-yellow-400 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-2 hover:bg-black transition-all duration-300">
            <div className="mb-4 text-black group-hover:text-yellow-400 transition-colors duration-300">
                {icon}
            </div>
            <h3 className="text-lg font-semibold text-black group-hover:text-yellow-400 transition-colors duration-300">{name}</h3>
        </div>
    )
}

const FeatureCard = ({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) => {
    return (
        <div className="bg-gradient-to-br from-[#D01D1F] to-[#b31217] p-8 text-white text-center flex flex-col items-center h-full hover:shadow-2xl transition-all duration-300 hover:scale-[1.03] cursor-pointer">
            <div className="mb-4">{icon}</div>
            <h3 className="text-xl font-bold font-serif mb-2">{title}</h3>
            <p className="text-sm text-white/80">{description}</p>
        </div>
    )
}
