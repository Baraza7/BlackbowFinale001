"use client"

import { useEffect, useState, useRef, useLayoutEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ResponsiveContainer } from "@/components/responsive-container"
import { useMobile } from "@/hooks/use-mobile"
import { useTheme } from "next-themes"
import Servicescardab1 from "@/components/Servicescardab1"
import TeamSection from "@/components/TeamSection"

// Component for Team Member
function TeamMember({ name, position, bio, image }: { name: string; position: string; bio: string; image: string }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow h-full">
      <div className="h-48 xs:h-64 bg-gray-200 relative">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4 xs:p-6">
        <h3 className="service-card-title mb-1">{name}</h3>
        <p style={{ color: "#00B1D2" }} className="font-sans font-medium mb-2 xs:mb-3 text-base">
          {position}
        </p>
        <p className="team-member-bio">{bio}</p>
      </div>
    </div>
  )
}

// Typewriter component for animated text with HTML support
function Typewriter({ text, delay = 100, onComplete }: { text: string; delay?: number; onComplete?: () => void }) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const totalDuration = 3000 // 3 seconds for the entire text
  const calculatedDelay = Math.min(totalDuration / text.length, delay)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, calculatedDelay)

      return () => clearTimeout(timeout)
    } else if (onComplete) {
      onComplete()
    }
  }, [currentIndex, calculatedDelay, onComplete, text])

  return <span dangerouslySetInnerHTML={{ __html: displayText }} />
}

export default function Home2Page() {
  const { isMobile } = useMobile()
  const [showBottomSection, setShowBottomSection] = useState(false)
  const servicesCardRef = useRef<HTMLDivElement>(null)
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const heroSectionRef = useRef<HTMLElement>(null)
  const heroContentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Animation states
  const [titleAnimationComplete, setTitleAnimationComplete] = useState(false)
  const [subtitleVisible, setSubtitleVisible] = useState(false)
  const [buttonsVisible, setButtonsVisible] = useState(false)
  const [servicesCardVisible, setServicesCardVisible] = useState(false)
  const [imageVisible, setImageVisible] = useState(false)
  const [headerVisible, setHeaderVisible] = useState(false)

  const { theme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    setShowBottomSection(!isMobile)
    setHeaderVisible(false)
    setSubtitleVisible(false)
    setButtonsVisible(false)
    setServicesCardVisible(false)
    setImageVisible(false)
  }, [isMobile])

  const handleTitleAnimationComplete = () => {
    setTitleAnimationComplete(true)
    setHeaderVisible(true)
    setTimeout(() => {
      setSubtitleVisible(true)
      setButtonsVisible(true)
      setTimeout(() => {
        setServicesCardVisible(true)
        setTimeout(() => {
          setImageVisible(true)
        }, 3000)
      }, 1000)
    }, 500)
  }

  const adjustImagePosition = () => {
    if (!imageContainerRef.current || !heroSectionRef.current || isMobile) return
    const heroSectionRect = heroSectionRef.current.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    const heightToBottom = viewportHeight - heroSectionRect.top
    imageContainerRef.current.style.height = `${heightToBottom}px`
  }

  const adjustHeroContentPosition = () => {
    if (!heroContentRef.current || !heroSectionRef.current) return
    const heroSectionHeight = heroSectionRef.current.clientHeight
    const upwardOffset = heroSectionHeight * 0.05
    heroContentRef.current.style.transform = `translateY(-${upwardOffset}px)`
  }

  useLayoutEffect(() => {
    if (!isMobile) {
      adjustImagePosition()
    }
    adjustHeroContentPosition()
  }, [isMobile, showBottomSection, imageLoaded])

  const handleImageLoad = () => {
    setImageLoaded(true)
    adjustImagePosition()
  }

  useEffect(() => {
    if (isMobile) return
    adjustImagePosition()
    adjustHeroContentPosition()
    let resizeTimer: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        adjustImagePosition()
        adjustHeroContentPosition()
      }, 50)
    }
    const handleScroll = () => {
      requestAnimationFrame(() => {
        adjustImagePosition()
        adjustHeroContentPosition()
      })
    }
    window.addEventListener("resize", handleResize)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [isMobile])

  const getBackgroundImage = () => "/Home2Hero.png"
  const getTitleTextColor = () => theme === "dark" ? "text-white" : "text-black"
  const getSubtitleTextColor = () => theme === "dark" ? "text-gray-300" : "text-gray-700"

  return (
    <div className={`min-h-screen flex flex-col ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}>
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section
          ref={heroSectionRef}
          className={`relative flex flex-col items-center justify-center min-h-[90vh] overflow-hidden transition-opacity duration-1000 ${headerVisible ? "opacity-100" : "opacity-0"}`}
          style={{
            backgroundImage: `url(${getBackgroundImage()})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            className="absolute inset-0 z-0"
            style={{
              background: theme === "dark"
                ? "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.6) 100%)"
                : "linear-gradient(to bottom, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.3) 100%)",
            }}
          />
          <ResponsiveContainer className="relative z-10 text-center py-10 xs:py-16 md:py-20">
            <div ref={heroContentRef} className="max-w-4xl mx-auto">
              <h1 className={`hero-title ${getTitleTextColor()} mb-4 xs:mb-6 md:mb-8`}>
                <Typewriter text="<span style='color: #FFBE00;'>Leading</span> Trade Finance,<br />Insurance & Investment." onComplete={handleTitleAnimationComplete} />
              </h1>
              <p
                className={`hero-subtitle ${getSubtitleTextColor()} mb-6 xs:mb-8 md:mb-10 transition-opacity duration-1000 ${subtitleVisible ? "opacity-100" : "opacity-0"}`}
                style={{ transitionDelay: subtitleVisible ? "0.5s" : "0s" }}
              >
                We empower businesses with innovative financial solutions to thrive in the African market. Your partner in
                growth and success since 2014.
              </p>
              <div
                className={`flex flex-col xs:flex-row justify-center gap-3 xs:gap-4 md:gap-6 transition-opacity duration-1000 ${buttonsVisible ? "opacity-100" : "opacity-0"}`}
                style={{ transitionDelay: buttonsVisible ? "1s" : "0s" }}
              >
                <Link href="/services">
                  <Button
                    size={isMobile ? "sm" : "lg"}
                    className="w-full xs:w-auto bg-gradient-to-r from-[#FFBE00] to-[#00B1D2] text-white hover:opacity-90 transition-opacity duration-300 rounded-full px-6 py-3 xs:px-8 xs:py-4 text-base xs:text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Explore Our Services
                  </Button>
                </Link>
                <Link href="/contacts">
                  <Button
                    size={isMobile ? "sm" : "lg"}
                    variant="outline"
                    className={`w-full xs:w-auto ${theme === "dark" ? "border-white text-white hover:bg-white/10" : "border-black text-black hover:bg-black/5"} transition-colors duration-300 rounded-full px-6 py-3 xs:px-8 xs:py-4 text-base xs:text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105`}
                  >
                    Talk to an Expert <ArrowRight className="ml-2 h-4 w-4 xs:h-5 xs:w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </ResponsiveContainer>
          {showBottomSection && (
            <div className="absolute bottom-0 left-0 right-0 z-20 w-full">
              <ResponsiveContainer className="px-0 md:px-4 lg:px-6 xl:px-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-0 items-end w-full">
                  <div
                    ref={servicesCardRef}
                    className={`md:col-span-5 bg-black/70 backdrop-blur-md p-6 xs:p-8 shadow-2xl transition-transform ease-out ${servicesCardVisible ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}`}
                    style={{ transitionDelay: servicesCardVisible ? "1.5s" : "0s", transitionDuration: '3000ms' }}
                  >
                    <h2 className="text-2xl xs:text-3xl font-bold text-white mb-3 xs:mb-4">
                      <span className="text-[#FFBE00]">Our</span> Services
                    </h2>
                    <ul className="space-y-2 xs:space-y-3">
                      {[
                        "Bid Securities/Tender Bonds",
                        "Performance Guarantees",
                        "Advance Payment Guarantees",
                        "Bank Guarantees",
                        "Insurance Solutions",
                        "Investment Advisory",
                      ].map((service, index) => (
                        <li key={index} className="flex items-center text-sm xs:text-base text-gray-200 hover:text-white transition-colors duration-200">
                          <ArrowRight className="h-3 w-3 xs:h-4 xs:w-4 text-[#FFBE00] mr-2 xs:mr-3 flex-shrink-0" />
                          {service}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 xs:mt-6">
                      <Link href="/services">
                        <Button variant="link" className="text-[#FFBE00] hover:text-black transition-colors duration-300 rounded-full text-sm xs:text-base font-semibold">
                          Learn More <ArrowRight className="ml-1 h-3 w-3 xs:h-4 xs:w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div
                    ref={imageContainerRef}
                    className={`hidden md:block md:col-span-7 transition-opacity ease-out ${imageVisible ? "opacity-100" : "opacity-0"}`}
                    style={{
                      height: "100%",
                      transitionDelay: imageVisible ? "2s" : "0s",
                      transitionDuration: '3000ms',
                    }}
                  >
                    <div className="relative h-full w-full">
                      <Image
                        ref={imageRef}
                        src={theme === "dark" ? "/hero2.png" : "/hero2.png"}
                        alt="Trade Finance Illustration"
                        width={1200}
                        height={800}
                        className="w-full h-auto object-contain"
                        priority
                        onLoad={handleImageLoad}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  </div>
                </div>
              </ResponsiveContainer>
            </div>
          )}
        </section>

        {/* About Us Preview Section */}
        <section className={`py-12 xs:py-16 md:py-24 ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}>
          <ResponsiveContainer className="px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 xs:gap-12 items-center">
              <div>
                <h2 className="section-heading mb-4 xs:mb-6">About Blackbow Consult</h2>
                <p className="section-description mb-4 xs:mb-6">
                  Founded in 2014, Blackbow Consult Co. Ltd. empowers African businesses by providing financial
                  solutions that unlock growth and success. We provide trade finance, insurance, and investment advisory
                  services across multiple sectors including transport, manufacturing, real estate, aviation, ICT,
                  education, and agribusiness.
                </p>
                <p className="section-description mb-6 xs:mb-8">
                  Our strategic, client-first, and results-driven approach has made us the preferred financial consultant
                  for businesses seeking seamless and tailor-made solutions across Kenya and the rest of Africa.
                </p>
                <Link href="/about">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#FFBE00] to-[#00B1D2] text-white hover:opacity-90 transition-opacity duration-300 rounded-full px-8 py-4 text-lg font-semibold shadow-md hover:shadow-lg transform hover:scale-105"
                  >
                    Discover Our Story <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
              <div className="relative h-64 xs:h-80 md:h-96 rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/about-preview.jpg"
                  alt="About Blackbow Consult"
                  fill
                  className="object-cover object-center transform hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </ResponsiveContainer>
        </section>

        {/* Key Services Section - Now uses the reusable component */}
        <Servicescardab1 />

        {/* Message from CEO Section */}
        <section className="py-12 xs:py-16 md:py-20 bg-gradient-to-br from-[#D01D1F] to-[#b31217] text-white">
          <ResponsiveContainer className="px-4 md:px-6 text-center">
            <h2 className="text-3xl xs:text-4xl md:text-5xl font-bold mb-4 xs:mb-6">Message from the CEO</h2>
            <blockquote className="max-w-3xl mx-auto">
              <p className="text-lg xs:text-xl md:text-2xl italic mb-4 xs:mb-6 leading-relaxed">
                "Thank you for choosing the 'Home of Customized Trade Finance Solutions'. We are excited to partner with
                you and enable your business to fulfil all your obligations in a swift and customized manner. Your success
                is our pride and joy."
              </p>
              <footer className="text-base xs:text-lg text-gray-200">
                <cite>— Arnold Midung'a Ngusale, CEO</cite>
              </footer>
            </blockquote>
          </ResponsiveContainer>
        </section>

        {/* Team Section */}
        <section 
          id="team" 
          className={`py-12 xs:py-16 md:py-24`}
          style={{ background: 'linear-gradient(to bottom right, rgba(0,0,0,0.4), rgba(0,0,0,1))' }}
        >
          <ResponsiveContainer className="px-4 md:px-6">
            <div className="text-center mb-8 xs:mb-12">
              <h2 className="section-heading text-white">
                Meet Our Team
              </h2>
              <p className="section-description max-w-2xl mx-auto text-gray-300">
                Our experienced team is dedicated to providing innovative solutions and exceptional service.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6 md:gap-8 max-w-5xl mx-auto">
              <TeamMember
                name="Arnold Midung'a Ngusale"
                position="CEO"
                bio="Consumer Goods Industry, Energy, Government services and Banking spanning 10 years, Interest in Investment Banking and Trade Finance solutions. He provides strategic guidance and Leadership skills to the business."
                image="/team-member-1.png"
              />
              <TeamMember
                name="Susan Awuor"
                position="Chief Operations Officer"
                bio="She is a seasoned Banker with over 10 years' experience in SME, Consumer Banking and Trade Finance, she brings versatility, innovation, strategic and relationship management to the business."
                image="/team-member-2.png"
              />
              <TeamMember
                name="Nelly Yano"
                position="Regional Manager"
                bio="Nelly is a seasoned finance professional with immense experience Banking, She has a wealth of experience spanning over a decade. She is proficient in Agribusiness, Credit and Trade Finance. She is Regional Manager in West and Rift Regions of Kenya."
                image="/team-member-3.png"
              />
            </div>
          </ResponsiveContainer>
        </section>

        {/* Contact Us Section */}
        <section className={`py-12 xs:py-16 md:py-24 ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}>
          <ResponsiveContainer className="px-4 md:px-6">
            <div className="bg-gradient-to-r from-[#FFBE00] to-[#00B1D2] p-8 xs:p-12 md:p-16 rounded-2xl shadow-2xl text-center">
              <h2 className="text-3xl xs:text-4xl md:text-5xl font-bold text-white mb-4 xs:mb-6">
                Ready to Elevate Your Business?
              </h2>
              <p className="text-lg xs:text-xl text-white/90 mb-6 xs:mb-8 max-w-2xl mx-auto leading-relaxed">
                Let's discuss how Blackbow Consult can provide the financial solutions you need to achieve your goals.
                Contact us today for a personalized consultation.
              </p>
              <Link href="/contacts">
                <Button
                  size="lg"
                  className="bg-white text-black hover:bg-gray-100 transition-colors duration-300 rounded-full px-8 py-4 text-lg font-semibold shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  Contact Us Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </ResponsiveContainer>
        </section>
        
        {/* New Team Section - Added for preview */}
        <TeamSection />

      </main>
      <Footer />
    </div>
  )
} 