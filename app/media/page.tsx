"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ArrowRight, Calendar, Clock, Download, ExternalLink, Search, User, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { InfoCard } from "@/components/InfoCard"
import { FileText, Megaphone } from "lucide-react"
import SharedPageSections from "@/components/SharedPageSections"
import BentoGridGallery from "@/components/BentoGridGallery"
import InnerHero from "@/components/InnerHero"
import FullGallery from "@/components/FullGallery"
import initialFullGalleryConfig from "../../fullGalleryConfig/fullGalleryConfig"

export default function MediaPage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Header />

      {/* Hero Section */}
      <InnerHero>
        <div className="space-y-6 text-center">
          <h1 className="hero-title text-white whitespace-nowrap">
            Explore Our Journey <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFBE00] to-[#00B1D2]">in Picture &amp; Motion</span>
          </h1>
          <p className="text-white/90 max-w-3xl mx-auto">
            Browse curated moments from events, client engagements, and milestones—captured through photos and
            videos that tell the story of Blackbow’s impact and growth.
          </p>
        </div>
      </InnerHero>

      {/* Info Cards Section - Overlapping Design */}
      <section className="relative -mt-24 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-0 max-w-5xl mx-auto">
            <InfoCard icon={<FileText className="h-8 w-8 text-white" />} title="Latest Updates">
              <p className="text-sm">Latest insights and industry updates</p>
            </InfoCard>
            <InfoCard icon={<Calendar className="h-8 w-8 text-white" />} title="Upcoming Event">
                <p className="text-sm">Webinar: Navigating Market Volatility</p>
            </InfoCard>
            <InfoCard icon={<Megaphone className="h-8 w-8 text-white" />} title="Recent News">
                <p className="text-sm">Blackbow Partners with FinTech Innovators</p>
            </InfoCard>
          </div>
        </div>
      </section>

      {/* Introductory Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--accent-yellow)' }}>
              Moments That Define Us
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Dive into Blackbow's journey through a series of compelling visuals and dynamic videos, offering an immersive look into our story. Each carefully selected snapshot and video clip vividly illustrates our profound impact on the communities we serve, the strong team spirit that drives us, and our contribution to Africa's ongoing financial evolution. See how we're making a difference, frame by frame.
            </p>
          </div>
        </div>
      </section>

      

      {/* Blog Grid Section */}
      <section className="py-20 bg-gray-950 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Picture Gallery
            </h2>
            <p className="text-xl text-white/70 leading-relaxed">
              Explore snapshots of Blackbow's journey—moments that define our impact and team spirit.
            </p>
          </div>
          <FullGallery config={initialFullGalleryConfig} />
        </div>
      </section>

      
      {/* Media Video Promo */}
      <section aria-labelledby="media-video-promo" className="w-full bg-[#FFBE00] py-[100px]">
        <div className="mx-auto w-full max-w-screen-xl px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
            {/* Left: Poster Image */}
            <div className="relative h-[320px] md:h-auto rounded-2xl overflow-hidden">
              <Image
                src="/video01.jpg"
                alt="Blackbow Consult Eldoret – video feature poster"
                fill
                priority={false}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Right: Copy + CTA */}
            <div className="flex flex-col justify-center">
              <h2 id="media-video-promo" className="font-heading text-3xl md:text-4xl font-bold text-gray-900">
                Blackbow Consult Eldoret: Empowering Businesses Across Counties
              </h2>

              <p className="mt-4 text-lg md:text-xl text-gray-700">
                Relationship Manager Neli Yano shares how Blackbow Consult supports diverse clients with tailored financial guarantees.
              </p>

              <p className="mt-6 text-base md:text-lg text-gray-600 leading-relaxed">
                In this feature, <strong>Neli Yano</strong>, Relationship Manager at our Eldoret Branch, highlights how Blackbow Consult Ltd. serves clients across multiple
                counties — from farmers and traders to professionals and contractors. She explains our core financial solutions, including
                <strong> bid bonds, performance bonds, and advance payment guarantees</strong>, designed to help businesses confidently execute projects.
              </p>

              <div className="mt-8">
                <button
                  onClick={() => setIsVideoOpen(true)}
                  className="inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-medium bg-black text-white hover:bg-gray-800 transition-colors duration-200"
                  aria-label="Watch Video"
                >
                  Watch Video
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isVideoOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="video-modal-title">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute -top-3 -right-3 md:top-0 md:right-0 bg-white text-black rounded-full p-2 shadow hover:bg-gray-200"
              aria-label="Close video"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative w-full pt-[56.25%] bg-black rounded-lg overflow-hidden">
              <iframe
                src="https://player.vimeo.com/video/1112093443?autoplay=1&title=0&byline=0&portrait=0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
                title="Blackbow Consult Eldoret: Empowering Businesses Across Counties"
              />
            </div>
          </div>
        </div>
      )}

      <SharedPageSections />
      <Footer />
    </div>
  )
}

// Component for News Card
function NewsCard({ title, date, excerpt, slug }: { title: string; date: string; excerpt: string; slug: string }) {
  return (
    <Card className="p-4 xs:p-5 hover:shadow-md transition-shadow">
      <div className="flex items-center text-xs xs:text-sm text-gray-500 mb-2">
        <Calendar className="h-3 w-3 xs:h-4 xs:w-4 mr-1" />
        <span className="font-body">{date}</span>
      </div>
      <h3 className="font-sans text-base xs:text-lg font-bold mb-2 text-[#27272A]">{title}</h3>
      <p className="font-body text-gray-600 text-xs xs:text-sm mb-3">{excerpt}</p>
      <Link
        href={`/media/news/${slug}`}
        className="font-sans text-[#00B1D2] text-xs xs:text-sm font-medium hover:underline"
      >
        Read more <ArrowRight className="inline h-2 w-2 xs:h-3 xs:w-3 ml-1" />
      </Link>
    </Card>
  )
}

// Component for Gallery Item
function GalleryItem({ image, title, type }: { image: string; title: string; type: "photo" | "video" }) {
  return (
    <div className="group relative overflow-hidden rounded-lg cursor-pointer">
      <div className="aspect-square relative">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform group-hover:scale-110"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="text-white text-center p-3 xs:p-4">
            <div className="mb-1 xs:mb-2">
              {type === "photo" ? (
                <Search className="h-6 w-6 xs:h-8 xs:w-8 mx-auto" />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 xs:h-8 xs:w-8 mx-auto"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              )}
            </div>
            <h4 className="font-sans font-medium text-xs xs:text-sm">{title}</h4>
            <p className="text-[10px] xs:text-xs mt-1 font-body">{type === "photo" ? "View Photo" : "Watch Video"}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Component for Press Release Item
function PressReleaseItem({
  title,
  date,
  excerpt,
  slug,
}: {
  title: string
  date: string
  excerpt: string
  slug: string
}) {
  return (
    <div className="bg-white p-4 xs:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100">
      <div className="flex items-center text-xs xs:text-sm text-gray-500 mb-2 xs:mb-3">
        <Calendar className="h-3 w-3 xs:h-4 xs:w-4 mr-1" />
        <span className="font-body">{date}</span>
      </div>
      <h3 className="font-sans text-lg xs:text-xl font-bold mb-2 xs:mb-3 text-[#27272A]">{title}</h3>
      <p className="font-body text-gray-600 mb-3 xs:mb-4 text-xs xs:text-sm">{excerpt}</p>
      <div className="flex justify-between items-center">
        <Link href={`/media/press-releases/${slug}`}>
          <Button
            variant="outline"
            style={{ borderColor: "#D01C1F", color: "#D01C1F" }}
            className="hover:bg-[#D01C1F] hover:text-white text-xs xs:text-sm"
          >
            Read Full Release <ArrowRight className="ml-2 h-3 w-3 xs:h-4 xs:w-4" />
          </Button>
        </Link>
        <a
          href="#"
          className="text-gray-500 hover:text-[#00B1D2] transition-colors flex items-center font-sans text-xs xs:text-sm"
        >
          <ExternalLink className="h-3 w-3 xs:h-4 xs:w-4 mr-1" /> PDF
        </a>
      </div>
    </div>
  )
}

// Component for Resource Card
function ResourceCard({
  title,
  description,
  type,
  size,
}: {
  title: string
  description: string
  type: string
  size: string
}) {
  return (
    <Card className="p-4 xs:p-6 hover:shadow-lg transition-shadow h-full flex flex-col">
      <div className="mb-3 xs:mb-4 p-2 xs:p-3 bg-gray-100 rounded-lg inline-block">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 xs:h-6 xs:w-6 text-[#00B1D2]"
        >
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      </div>
      <h3 className="font-sans text-lg xs:text-xl font-bold mb-2 text-[#27272A]">{title}</h3>
      <p className="font-body text-gray-600 mb-3 xs:mb-4 flex-grow text-xs xs:text-sm">{description}</p>
      <div className="flex items-center justify-between">
        <span className="font-body text-xs xs:text-sm bg-gray-100 px-2 py-1 rounded text-gray-600">
          {type} • {size}
        </span>
        <Button
          variant="outline"
          style={{ borderColor: "#00B1D2", color: "#00B1D2" }}
          className="hover:bg-[#00B1D2] hover:text-white text-xs xs:text-sm"
        >
          <Download className="mr-2 h-3 w-3 xs:h-4 xs:w-4" /> Download
        </Button>
      </div>
    </Card>
  )
}

// Component for Event Card
function EventCard({
  title,
  date,
  location,
  description,
}: {
  title: string
  date: string
  location: string
  description: string
}) {
  return (
    <Card className="p-4 xs:p-6 hover:shadow-lg transition-shadow">
      <div className="flex flex-col md:flex-row gap-3 xs:gap-4">
        <div className="md:w-20 xs:md:w-24 flex-shrink-0 bg-[#FFBE00] text-[#27272A] rounded-lg p-2 xs:p-3 text-center">
          <div className="font-body text-xs xs:text-sm font-medium">{date.split(" ")[0]}</div>
          <div className="font-sans text-xl xs:text-2xl font-bold">{date.split(" ")[1].replace(",", "")}</div>
        </div>
        <div>
          <h3 className="font-sans text-lg xs:text-xl font-bold mb-2 text-[#27272A]">{title}</h3>
          <div className="flex items-center font-body text-gray-600 mb-1 xs:mb-2 text-xs xs:text-sm">
            <Calendar className="h-3 w-3 xs:h-4 xs:w-4 mr-2" />
            <span>{date}</span>
          </div>
          <div className="flex items-center font-body text-gray-600 mb-2 xs:mb-3 text-xs xs:text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3 w-3 xs:h-4 xs:w-4 mr-2"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>{location}</span>
          </div>
          <p className="font-body text-gray-600 mb-3 xs:mb-4 text-xs xs:text-sm">{description}</p>
          <Button
            variant="outline"
            style={{ borderColor: "#D01C1F", color: "#D01C1F" }}
            className="hover:bg-[#D01C1F] hover:text-white text-xs xs:text-sm"
          >
            Register Now
          </Button>
        </div>
      </div>
    </Card>
  )
}
