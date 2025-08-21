"use client"

import Image from "next/image"
import Link from "next/link"
import { Quote, CheckCircle, Users, Award, TrendingUp, ArrowRight } from "lucide-react"
import { YEARS_OF_EXCELLENCE } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useEffect, useState } from "react"
import TestimonialSlider from "@/components/TestimonialSlider"
import Call2Action from "@/components/Call2Action"
import Servicescardab1 from "@/components/Servicescardab1"
import TeamSection from "@/components/TeamSection"
import SharedPageSections from "@/components/SharedPageSections"
import InnerHero from "@/components/InnerHero"
import ImageAccordion from "@/components/ImageAccordion/ImageAccordion"
import galleryConfig from "../../galleryConfig/galleryConfig"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Hero Section - Redesigned to match homepage */}
      <InnerHero>
        <div className="space-y-6">
          <h1 className="hero-title text-white" style={{ fontSize: "0.8em" }}>
            Empowering
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FFBE00] to-[#00B1D2]">
              African Business
            </span>
          </h1>
          <p className="text-white/90 max-w-3xl mx-auto">
            Learn who we are, what we stand for, and how we empower businesses across Africa with tailored
            financial solutions. Discover our story, values, and the people behind Blackbow Consult.
          </p>
        </div>
      </InnerHero>

      {/* Stats Section - Overlapping Design */}
      <section className="relative -mt-16 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-0 max-w-6xl mx-auto">
            <StatCard icon={<img src="/money.png" alt="Ksh" className="h-8 w-8" />} value={YEARS_OF_EXCELLENCE} label="Years of Excellence" />
            <StatCard icon={<Users className="h-8 w-8 text-white" />} value={250} label="Satisfied Clients" />
            <StatCard icon={<Award className="h-8 w-8 text-white" />} value={500} label="Trade Finance Facilitated" />
            <StatCard icon={<CheckCircle className="h-8 w-8 text-white" />} value={100} label="Success Rate" />
          </div>
        </div>

        {/* Background overlay for visual separation */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-white -z-10 mt-16"></div>
      </section>

      {/* Story Section - Modern Layout */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--accent-yellow)' }}>Our Story</h2>
                <p className="text-xl text-gray-600 leading-relaxed mb-6">
                  Founded in 2014, Blackbow Consult has grown from a vision to become Africa's trusted partner in financial
                  solutions, empowering businesses across multiple sectors.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Blackbow Consult Co. Ltd. empowers African businesses by providing financial solutions that unlock
                  growth and success. We provide trade finance, insurance, and investment advisory services across
                  multiple sectors including transport, manufacturing, real estate, aviation, ICT, education, and
                  agribusiness.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our strategic, client-first, and results-driven approach has made us the preferred financial
                  consultant for businesses seeking seamless and tailor-made solutions across Kenya and the rest of
                  Africa.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/90 p-6 rounded-2xl border-l-4 border-[#FFBE00] shadow-md hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 group cursor-pointer">
                  <h3 className="text-xl font-bold text-[#27272A] mb-3 group-hover:text-[#FFBE00] transition-colors duration-300">Our Vision</h3>
                  <p className="text-gray-700">To be the preferred financial consultant in Kenya and the rest of Africa through the provision of seamless and tailor made solutions.</p>
                </div>
                <div className="bg-white/90 p-6 rounded-2xl border-l-4 border-[#00B1D2] shadow-md hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 group cursor-pointer">
                  <h3 className="text-xl font-bold text-[#27272A] mb-3 group-hover:text-[#00B1D2] transition-colors duration-300">Our Mission</h3>
                  <p className="text-gray-700">To inspire entrepreneurship and innovation in Kenya and the rest of the world.</p>
                </div>
              </div>
            </div>

            <div
              className="flex justify-center items-center w-full"
              style={{ boxShadow: 'none !important', border: 'none !important', outline: 'none !important', borderRadius: '0 !important', background: 'none !important' }}
            >
              <Image
                src="/BB-MV-ABT01.png"
                alt="About Us Visual"
                width={600}
                height={600}
                className="w-full h-auto object-contain mx-auto"
                style={{ boxShadow: 'none !important', border: 'none !important', outline: 'none !important', borderRadius: '0 !important', background: 'none !important' }}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Inserted: New Core Values Section (cloned and moved) */}
      <div
        className="relative py-[10%]"
        style={{ backgroundColor: "#f0f0f0" }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--dark-gray)' }}>Our Core Values</h2>
            <p className="max-w-3xl mx-auto" style={{ color: 'var(--dark-gray)' }}>
              These principles guide our approach to business and our relationships with clients, ensuring we deliver excellence in every interaction.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="rounded-xl p-8 transition-all duration-300 group bg-[var(--accent-yellow)] hover:bg-black">
              <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <img
                  src="/integrity.svg"
                  alt="Integrity"
                  className="w-10 h-10 transition-all duration-300 group-hover:filter group-hover:brightness-0 group-hover:invert"
                />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-white">Integrity</h3>
              <p className="text-gray-600 group-hover:text-white">
                Honesty and ethics form the foundation of all our interactions and business practices.
              </p>
            </div>
            <div className="rounded-xl p-8 transition-all duration-300 group bg-[var(--accent-yellow)] hover:bg-black">
              <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <img
                  src="/Client-Centricity.svg"
                  alt="Client Centricity"
                  className="w-10 h-10 transition-all duration-300 group-hover:filter group-hover:brightness-0 group-hover:invert"
                />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-white">Client Centricity</h3>
              <p className="text-gray-600 group-hover:text-white">
                Personalized solutions designed specifically to drive your business growth and success.
              </p>
            </div>
            <div className="rounded-xl p-8 transition-all duration-300 group bg-[var(--accent-yellow)] hover:bg-black">
              <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <img
                  src="/Professionalism.svg"
                  alt="Professionalism"
                  className="w-10 h-10 transition-all duration-300 group-hover:filter group-hover:brightness-0 group-hover:invert"
                />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-white">Professionalism</h3>
              <p className="text-gray-600 group-hover:text-white">
                Expert, accurate, and consistent service delivery that exceeds expectations.
              </p>
            </div>
            <div className="rounded-xl p-8 transition-all duration-300 group bg-[var(--accent-yellow)] hover:bg-black">
              <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <img
                  src="/Excellence.svg"
                  alt="Excellence"
                  className="w-10 h-10 transition-all duration-300 group-hover:filter group-hover:brightness-0 group-hover:invert"
                />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-white">Excellence</h3>
              <p className="text-gray-600 group-hover:text-white">
                Unwavering commitment to surpassing expectations in everything we do.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* TeamIntro Section */}
      <section id="TeamIntro" className="relative pt-[10%] pb-0 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 max-[600px]:grid-cols-1 gap-8 items-center">
            <div className="relative h-[40rem]">
              <Image
                src="/Arnald-CEO1.png.png"
                alt="Arnald CEO"
                fill
                className="object-contain object-bottom"
              />
            </div>
            <div className="text-black">
              <h2
                className="font-italiana text-4xl lg:text-5xl font-bold mb-6"
                style={{ color: 'var(--accent-yellow)' }}
              >
                Meet our team of friendly & experienced experts
              </h2>
              <p className="font-body text-gray-800 text-lg leading-relaxed">
                Our strength lies in our collective expertise and passion. Get to know the dedicated professionals at Blackbow Consult, committed to driving your success with innovative solutions and unwavering support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section - Modern Grid (pulled up to touch the image bottom) */}
      <div className="-mt-8 md:-mt-12 lg:-mt-16">
        <TeamSection />
      </div>
      
      {/* Gallery Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--accent-yellow)' }}>
              Moments That Define Us
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Step into the dynamic world of Blackbow Consult through our Media Gallery. Here, we capture the essence of our journey—from impactful client engagements and industry events to the dedicated team driving Africa's financial future.
            </p>
          </div>
          <ImageAccordion config={galleryConfig} />
        </div>
      </section>
      
      {/* Testimonial Slider */}
      <TestimonialSlider />

      <SharedPageSections />

      {/* Footer */}
      <Footer />
    </div>
  )
}

function StatCard({ icon, value, label, duration = 1500 }: { icon: React.ReactNode, value: number, label: string, duration?: number }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let start = 0
    const end = value
    if (start === end) return
    let incrementTime = Math.max(10, duration / end)
    const timer = setInterval(() => {
      start += 1
      setCount(start)
      if (start === end) clearInterval(timer)
    }, incrementTime)
    return () => clearInterval(timer)
  }, [value, duration])
  return (
    <div className="bg-gradient-to-br from-[#D01D1F] to-[#b31217] shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.03] group border-none rounded-none text-center h-full flex flex-col justify-center cursor-pointer">
      <div className="p-8 flex flex-col items-center">
        <div className="w-16 h-16 bg-white/20 flex items-center justify-center mx-auto mb-4">
          {icon}
        </div>
        <h3 className="text-4xl font-bold text-white mb-2 transition-all duration-300 group-hover:text-[#FFBE00]">
          {count}
          {typeof value === 'number' && value >= 100 ? '+' : ''}
        </h3>
        <p className="text-white/80 font-medium transition-all duration-300 group-hover:text-white">{label}</p>
      </div>
    </div>
  )
}

interface StatCardHome2Props {
  icon: React.ReactNode;
  value: string;
  label: string;
  description: string;
}

function StatCardHome2({ icon, value, label, description }: StatCardHome2Props) {
  return (
    <div className="group bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 ease-in-out hover:bg-black cursor-pointer flex flex-col items-center text-center h-full">
      <div className="mb-4 text-gray-700 group-hover:text-[var(--accent-yellow)] transition-colors duration-300">
        {icon}
      </div>
      <h3 className="text-3xl font-bold text-gray-900 group-hover:text-[var(--accent-yellow)] mb-2 transition-colors duration-300">
        {value}
      </h3>
      <p className="text-sm font-semibold text-gray-700 group-hover:text-[var(--accent-yellow)] mb-3 transition-colors duration-300">
        {label}
      </p>
      <p className="text-xs text-gray-600 group-hover:text-white transition-colors duration-300">
        {description}
      </p>
    </div>
  );
}
