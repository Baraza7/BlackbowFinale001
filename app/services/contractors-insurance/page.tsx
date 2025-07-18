import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Check, Shield, AlertTriangle, Users, Wrench } from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function ContractorsInsurancePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-20 h-[60vh] w-full flex items-center">
        <div className="absolute inset-0 z-0 bg-[#27272A]">
          <div className="absolute inset-0 opacity-20 bg-grid-white/10" />
        </div>
        <div className="container relative z-10 mx-auto px-4 md:px-6 text-white">
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-[42px] font-bold mb-6 leading-tight tracking-tight">
              Contractors' All Risk Insurance
            </h1>
            <p className="font-sans text-lg md:text-xl lg:text-2xl mb-8 text-gray-200 max-w-2xl leading-relaxed">
              Comprehensive insurance coverage protecting your construction projects and workforce from unforeseen risks.
            </p>
            <Link href="#contact">
              <Button
                size="lg"
                style={{ backgroundColor: "#D01C1F", color: "white" }}
                className="hover:bg-opacity-90 rounded-full px-8"
              >
                Get a Quote <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
