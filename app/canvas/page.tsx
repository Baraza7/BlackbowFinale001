"use client"

import { useState } from "react"
import Link from "next/link"
import { FileText, TrendingUp, Shield, ArrowRight, Download, DollarSign, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { InnerHeroSection } from "@/components/inner-hero-section"

export default function CanvasPage() {
  const [activeCalculator, setActiveCalculator] = useState("guarantee")
  const [guaranteeAmount, setGuaranteeAmount] = useState("")
  const [guaranteeType, setGuaranteeType] = useState("bid")
  const [projectDuration, setProjectDuration] = useState("")
  const [investmentAmount, setInvestmentAmount] = useState("")
  const [investmentPeriod, setInvestmentPeriod] = useState("")
  const [riskLevel, setRiskLevel] = useState("moderate")

  // Calculate guarantee fee
  const calculateGuaranteeFee = () => {
    if (!guaranteeAmount) return 0
    const amount = Number.parseFloat(guaranteeAmount)
    let rate = 0

    switch (guaranteeType) {
      case "bid":
        rate = 0.015 // 1.5%
        break
      case "performance":
        rate = 0.02 // 2%
        break
      case "advance":
        rate = 0.025 // 2.5%
        break
      default:
        rate = 0.02
    }

    return amount * rate
  }

  // Calculate investment projection
  const calculateInvestmentProjection = () => {
    if (!investmentAmount || !investmentPeriod) return 0
    const amount = Number.parseFloat(investmentAmount)
    const years = Number.parseFloat(investmentPeriod)

    let annualReturn = 0
    switch (riskLevel) {
      case "conservative":
        annualReturn = 0.08 // 8%
        break
      case "moderate":
        annualReturn = 0.12 // 12%
        break
      case "aggressive":
        annualReturn = 0.16 // 16%
        break
      default:
        annualReturn = 0.12
    }

    return amount * Math.pow(1 + annualReturn, years)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Hero Section using the new component */}
      <InnerHeroSection
        title="Business Tools & Calculators"
        description="Professional tools to help you plan your trade finance and investment needs."
        ctaText=""
        backgroundColor="#27272A"
        className="pt-20"
      />

      {/* Tools Navigation */}
      <section id="tools-nav" className="py-8 bg-gray-50 border-b">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setActiveCalculator("guarantee")}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeCalculator === "guarantee"
                  ? "bg-[#FFBE00] text-[#27272A]"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Shield className="inline h-4 w-4 mr-2" />
              Guarantee Calculator
            </button>
            <button
              onClick={() => setActiveCalculator("investment")}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeCalculator === "investment"
                  ? "bg-[#FFBE00] text-[#27272A]"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              <TrendingUp className="inline h-4 w-4 mr-2" />
              Investment Calculator
            </button>
            <button
              onClick={() => setActiveCalculator("resources")}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeCalculator === "resources"
                  ? "bg-[#FFBE00] text-[#27272A]"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              <FileText className="inline h-4 w-4 mr-2" />
              Resources
            </button>
          </div>
        </div>
      </section>

      {/* Calculator Content */}
      <section id="calculator-content" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          {activeCalculator === "guarantee" && (
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-[#27272A]">
                  Guarantee Fee Calculator
                </h2>
                <p className="font-body text-gray-600 max-w-2xl mx-auto text-lg">
                  Calculate the estimated fees for your bid securities, performance guarantees, and advance payment
                  guarantees.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Calculator Form */}
                <Card className="p-8">
                  <h3 className="font-serif text-2xl font-bold mb-6 text-[#27272A]">Calculate Your Guarantee Fee</h3>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Guarantee Type</label>
                      <select
                        value={guaranteeType}
                        onChange={(e) => setGuaranteeType(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFBE00]"
                      >
                        <option value="bid">Bid Security/Bid Bond (1.5%)</option>
                        <option value="performance">Performance Guarantee (2.0%)</option>
                        <option value="advance">Advance Payment Guarantee (2.5%)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contract/Guarantee Amount (KES)
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold text-sm">Ksh</div>
                        <input
                          type="number"
                          value={guaranteeAmount}
                          onChange={(e) => setGuaranteeAmount(e.target.value)}
                          placeholder="Enter amount"
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFBE00]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Project Duration (months)</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="number"
                          value={projectDuration}
                          onChange={(e) => setProjectDuration(e.target.value)}
                          placeholder="Enter duration"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFBE00]"
                        />
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Results */}
                <Card className="p-8 bg-gray-50">
                  <h3 className="font-serif text-2xl font-bold mb-6 text-[#27272A]">Estimated Costs</h3>

                  <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg border-l-4 border-[#FFBE00]">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-700">Guarantee Fee</span>
                        <span className="text-2xl font-bold text-[#27272A]">
                          KES {calculateGuaranteeFee().toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Based on {guaranteeType === "bid" ? "1.5%" : guaranteeType === "performance" ? "2.0%" : "2.5%"}{" "}
                        of guarantee amount
                      </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg">
                      <h4 className="font-semibold text-gray-700 mb-3">What's Included:</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start">
                          <span className="text-[#FFBE00] mr-2">•</span>
                          Bank guarantee processing
                        </li>
                        <li className="flex items-start">
                          <span className="text-[#FFBE00] mr-2">•</span>
                          Documentation preparation
                        </li>
                        <li className="flex items-start">
                          <span className="text-[#FFBE00] mr-2">•</span>
                          Legal compliance review
                        </li>
                        <li className="flex items-start">
                          <span className="text-[#FFBE00] mr-2">•</span>
                          Ongoing support
                        </li>
                      </ul>
                    </div>

                    <Button className="w-full" style={{ backgroundColor: "#D01C1F", color: "white" }}>
                      Request Quote <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {activeCalculator === "investment" && (
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-[#27272A]">
                  Investment Growth Calculator
                </h2>
                <p className="font-body text-gray-600 max-w-2xl mx-auto text-lg">
                  Project the potential growth of your investments based on different risk profiles and time horizons.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Investment Form */}
                <Card className="p-8">
                  <h3 className="font-serif text-2xl font-bold mb-6 text-[#27272A]">Investment Parameters</h3>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Initial Investment Amount (KES)
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold text-sm">Ksh</div>
                        <input
                          type="number"
                          value={investmentAmount}
                          onChange={(e) => setInvestmentAmount(e.target.value)}
                          placeholder="Enter investment amount"
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFBE00]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Investment Period (years)</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="number"
                          value={investmentPeriod}
                          onChange={(e) => setInvestmentPeriod(e.target.value)}
                          placeholder="Enter years"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFBE00]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Risk Profile</label>
                      <select
                        value={riskLevel}
                        onChange={(e) => setRiskLevel(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFBE00]"
                      >
                        <option value="conservative">Conservative (8% annual return)</option>
                        <option value="moderate">Moderate (12% annual return)</option>
                        <option value="aggressive">Aggressive (16% annual return)</option>
                      </select>
                    </div>
                  </div>
                </Card>

                {/* Investment Results */}
                <Card className="p-8 bg-gray-50">
                  <h3 className="font-serif text-2xl font-bold mb-6 text-[#27272A]">Projected Returns</h3>

                  <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg border-l-4 border-[#00B1D2]">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-700">Final Amount</span>
                        <span className="text-2xl font-bold text-[#27272A]">
                          KES {calculateInvestmentProjection().toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        After {investmentPeriod} years at {riskLevel} risk level
                      </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-700">Total Gain</span>
                        <span className="text-xl font-bold text-green-600">
                          KES{" "}
                          {(
                            calculateInvestmentProjection() - Number.parseFloat(investmentAmount || "0")
                          ).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">Projected profit over investment period</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg">
                      <h4 className="font-semibold text-gray-700 mb-3">Investment Options:</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start">
                          <span className="text-[#00B1D2] mr-2">•</span>
                          Government bonds & securities
                        </li>
                        <li className="flex items-start">
                          <span className="text-[#00B1D2] mr-2">•</span>
                          Corporate bonds
                        </li>
                        <li className="flex items-start">
                          <span className="text-[#00B1D2] mr-2">•</span>
                          Equity investments
                        </li>
                        <li className="flex items-start">
                          <span className="text-[#00B1D2] mr-2">•</span>
                          Real estate funds
                        </li>
                      </ul>
                    </div>

                    <Button className="w-full" style={{ backgroundColor: "#00B1D2", color: "white" }}>
                      Schedule Consultation <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {activeCalculator === "resources" && (
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-[#27272A]">Business Resources</h2>
                <p className="font-body text-gray-600 max-w-2xl mx-auto text-lg">
                  Download helpful guides, templates, and resources for your trade finance and investment needs.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ResourceCard
                  title="Trade Finance Application Guide"
                  description="Step-by-step guide to applying for trade finance solutions including required documents and processes."
                  type="PDF Guide"
                  size="2.4 MB"
                  color="#FFBE00"
                />
                <ResourceCard
                  title="Investment Planning Template"
                  description="Excel template to help you plan and track your investment portfolio across different asset classes."
                  type="Excel Template"
                  size="1.8 MB"
                  color="#00B1D2"
                />
                <ResourceCard
                  title="Guarantee Requirements Checklist"
                  description="Complete checklist of documents and requirements for different types of bank guarantees."
                  type="PDF Checklist"
                  size="1.2 MB"
                  color="#D01C1F"
                />
                <ResourceCard
                  title="Risk Assessment Framework"
                  description="Framework for assessing and managing risks in trade finance and investment decisions."
                  type="PDF Framework"
                  size="3.1 MB"
                  color="#FFBE00"
                />
                <ResourceCard
                  title="Financial Projection Calculator"
                  description="Advanced Excel calculator for financial projections and scenario analysis."
                  type="Excel Calculator"
                  size="2.7 MB"
                  color="#00B1D2"
                />
                <ResourceCard
                  title="Compliance Guidelines"
                  description="Guidelines for regulatory compliance in trade finance and investment activities."
                  type="PDF Guide"
                  size="2.0 MB"
                  color="#D01C1F"
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contacts-cta" className="py-16 md:py-20 bg-[#27272A] text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Have a Unique Project in Mind?
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
            Our team thrives on challenges and is ready to bring your vision to life. Let's discuss how we can tailor our services for you.
          </p>
          <Link href="/contacts">
            <Button size="lg" className="bg-[#FFBE00] text-black hover:bg-opacity-90">
              Contact Our Experts <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}

// Component for Resource Card
function ResourceCard({
  title,
  description,
  type,
  size,
  color,
}: {
  title: string
  description: string
  type: string
  size: string
  color: string
}) {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow h-full flex flex-col">
      <div className="mb-4 p-3 rounded-lg inline-block" style={{ backgroundColor: `${color}20` }}>
        <FileText className="h-6 w-6" style={{ color }} />
      </div>
      <h3 className="font-serif text-xl font-bold mb-3 text-[#27272A]">{title}</h3>
      <p className="font-body text-gray-600 mb-4 flex-grow text-sm">{description}</p>
      <div className="flex items-center justify-between">
        <span className="font-body text-xs bg-gray-100 px-3 py-1 rounded text-gray-600">
          {type} • {size}
        </span>
        <Button variant="outline" size="sm" style={{ borderColor: color, color }} className="hover:bg-opacity-10">
          <Download className="mr-2 h-4 w-4" /> Download
        </Button>
      </div>
    </Card>
  )
}
