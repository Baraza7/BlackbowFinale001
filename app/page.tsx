"use client"

import { useEffect, useState, useRef, useLayoutEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Mail, MapPin, Phone, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ResponsiveContainer } from "@/components/responsive-container"
import { useMobile } from "@/hooks/use-mobile"
import { useTheme } from "next-themes"
import { BlogCard } from "@/components/BlogCard"

// Component for Service Card
function ServiceCard({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <div className="p-4 xs:p-6 hover:shadow-lg transition-shadow h-full">
      <div className="text-3xl xs:text-4xl mb-3 xs:mb-4">{icon}</div>
      <h3 className="service-card-title">{title}</h3>
      <p className="section-description">{description}</p>
    </div>
  )
}

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

export default function Home() {
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

  // CMS content (fallback to static defaults)
  const [heroTitleHtml, setHeroTitleHtml] = useState("Welcome to <span style='color: #FFBE00;'>Blackbow</span><br />Consult Limited.")
  const [heroSubtitleHtml, setHeroSubtitleHtml] = useState("Your Partner in Customized Trade Finance, Insurance & Investment Solutions Across Africa")
  const [heroBgOverride, setHeroBgOverride] = useState<string | undefined>(undefined)

  useEffect(() => {
    let cancelled = false
    fetch(`/api/content?page=home&section=hero`).then(async (r) => r.json()).then((res) => {
      const d = res?.data
      if (!d || cancelled) return
      if (d.title) setHeroTitleHtml(String(d.title))
      if (d.subtitle) setHeroSubtitleHtml(String(d.subtitle))
      if (d.imageSrc) setHeroBgOverride(String(d.imageSrc))
    }).catch(() => {})
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    setShowBottomSection(!isMobile)

    // Start with everything hidden
    setHeaderVisible(false)
    setSubtitleVisible(false)
    setButtonsVisible(false)
    setServicesCardVisible(false)
    setImageVisible(false)

    // Title animation will start immediately via the Typewriter component
  }, [isMobile])

  // Handle title animation completion
  const handleTitleAnimationComplete = () => {
    setTitleAnimationComplete(true)

    // After title completes, show header and start subtitle + buttons fade-in together
    setHeaderVisible(true)

    // Start subtitle and buttons fade-in together after title completes
    setTimeout(() => {
      setSubtitleVisible(true)
      setButtonsVisible(true)

      // Start services card slide-in after subtitle/buttons complete (1 second)
      setTimeout(() => {
        setServicesCardVisible(true)

        // Start image fade-in after services card completes (3 seconds)
        setTimeout(() => {
          setImageVisible(true)
        }, 3000) // Wait 3s for services card to complete
      }, 1000) // Wait 1s for subtitle/buttons to complete
    }, 500) // Small buffer after title completes
  }

  // Function to precisely adjust the image position
  const adjustImagePosition = () => {
    if (!imageContainerRef.current || !heroSectionRef.current || isMobile) return

    // Make the image container extend from the current position to the bottom of the screen
    const heroSectionRect = heroSectionRef.current.getBoundingClientRect()
    const viewportHeight = window.innerHeight

    // Calculate the height needed to reach the bottom of the screen
    const heightToBottom = viewportHeight - heroSectionRect.top

    // Set the image container to extend to the bottom of the screen
    imageContainerRef.current.style.height = `${heightToBottom}px`
  }

  // Function to adjust the hero content position
  const adjustHeroContentPosition = () => {
    if (!heroContentRef.current || !heroSectionRef.current) return

    // Get the height of the hero section
    const heroSectionHeight = heroSectionRef.current.clientHeight

    // Calculate 5% of the hero section height to move the content up
    const upwardOffset = heroSectionHeight * 0.05

    // Apply the upward offset using transform
    heroContentRef.current.style.transform = `translateY(-${upwardOffset}px)`
  }

  // Use useLayoutEffect for synchronous layout calculations before paint
  useLayoutEffect(() => {
    if (!isMobile) {
      adjustImagePosition()
    }
    adjustHeroContentPosition()
  }, [isMobile, showBottomSection, imageLoaded])

  // Handle image load event
  const handleImageLoad = () => {
    setImageLoaded(true)
    adjustImagePosition()
  }

  useEffect(() => {
    if (isMobile) return

    // Initial adjustment
    adjustImagePosition()
    adjustHeroContentPosition()

    // Adjust on resize with a small debounce to improve performance
    let resizeTimer: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        adjustImagePosition()
        adjustHeroContentPosition()
      }, 50)
    }

    // Adjust on scroll to handle any dynamic content changes
    const handleScroll = () => {
      requestAnimationFrame(() => {
        adjustImagePosition()
        adjustHeroContentPosition()
      })
    }

    // Set up mutation observer to detect DOM changes
    const observer = new MutationObserver(() => {
      adjustImagePosition()
      adjustHeroContentPosition()
    })

    if (heroSectionRef.current) {
      observer.observe(heroSectionRef.current, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true,
      })
    }

    // Add event listeners
    window.addEventListener("resize", handleResize)
    window.addEventListener("scroll", handleScroll)

    // Run adjustment after a short delay to ensure all elements are properly rendered
    const initialTimer = setTimeout(() => {
      adjustImagePosition()
      adjustHeroContentPosition()
    }, 100)

    // Run adjustment periodically for the first few seconds to handle any dynamic content loading
    const intervalId = setInterval(() => {
      adjustImagePosition()
      adjustHeroContentPosition()
    }, 500)
    setTimeout(() => clearInterval(intervalId), 5000)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(resizeTimer)
      clearTimeout(initialTimer)
      clearInterval(intervalId)
      observer.disconnect()
    }
  }, [isMobile, showBottomSection, imageLoaded])

  // Get the background image based on theme
  const getBackgroundImage = () => {
    if (heroBgOverride) return heroBgOverride
    if (!mounted) return "/Home2Hero.png" // Default to new image
    // return theme === "light" ? "/construction-sunset-warm.png" : "/Home2Hero.png"
    return "/Home2Hero.png" // Use Home2Hero.png for all themes
  }

  // Get title text color based on theme
  const getTitleTextColor = () => {
    if (!mounted) return "text-white"
    return theme === "light" ? "text-white" : "text-white"
  }

  // Get subtitle text color based on theme
  const getSubtitleTextColor = () => {
    if (!mounted) return "text-white"
    return theme === "light" ? "text-white" : "text-white"
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-white relative">
      {/* Header */}
      <div className={`transition-opacity duration-1000 ${headerVisible ? "opacity-100" : "opacity-0"}`}>
        <Header isHomePage={true} />
      </div>

      {/* Hero Section */}
      <section ref={heroSectionRef} className="relative h-full w-full flex items-center">
        {/* Background Image with Smooth Transition */}
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <Image
              src={getBackgroundImage() || "/placeholder.svg"}
              alt="Background"
              fill
              className="object-cover transition-all duration-1000 ease-in-out"
              priority
              sizes="100vw"
              style={{
                opacity: mounted ? 1 : 0,
              }}
            />
            {/* New Modern Gradient Overlay */}
            <div
              className="absolute inset-0 transition-opacity duration-1000"
              style={{
                background: 'linear-gradient(to right, rgba(0,0,0,0.60) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.0) 70%)',
                opacity: mounted ? 1 : 0,
              }}
            />
          </div>
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-[7fr_13fr] gap-8 items-center">
            {/* Left Container - Text Content */}
            <div
              ref={heroContentRef}
              id="hero-content-container"
              className="flex flex-col justify-center min-h-[70vh] space-y-4 sm:space-y-6 z-10 relative"
            >
              <h1 className={`hero-title transition-colors duration-1000 ${getTitleTextColor()}`}>
                <Typewriter
                  text={heroTitleHtml}
                  delay={60}
                  onComplete={handleTitleAnimationComplete}
                />
              </h1>
              <p
                className={`hero-subtitle max-w-md transition-all duration-1000 ${
                  subtitleVisible ? "opacity-100" : "opacity-0"
                } ${getSubtitleTextColor()}`}
                dangerouslySetInnerHTML={{
                  __html: heroSubtitleHtml,
                }}
              ></p>
              <div
                className={`flex flex-col xs:flex-row gap-4 transition-opacity duration-1000 ${
                  buttonsVisible ? "opacity-100" : "opacity-0"
                }`}
              >
                <Link
                  href="/services"
                  className="button-text inline-block rounded-md bg-[#FFBE00] px-6 py-3 text-center font-semibold text-[#27272A] transition-all duration-300 hover:-translate-y-0.5 hover:bg-opacity-90 hover:shadow-lg"
                  style={{ textDecoration: 'none' }}
                >
                  Our Services <ArrowRight className="ml-2 inline-block h-4 w-4" />
                </Link>
                <Link
                  href="/contacts"
                  className="button-text inline-block rounded-md bg-white px-6 py-3 text-center font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-opacity-90 hover:shadow-lg"
                  style={{ textDecoration: 'none' }}
                >
                  Talk to us
                </Link>
              </div>
            </div>

            {/* Right Container - Image */}
            <div className="hidden">
              <div
                ref={imageContainerRef}
                className={`hero-image-container absolute right-0 w-full z-10`}
                style={{
                  height: "100vh",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "flex-start",
                  bottom: "0",
                  top: "0",
                  paddingTop: "6rem",
                }}
              >
                <div className="relative w-full h-full pointer-events-auto">
                  <Image
                    ref={imageRef}
                    src="/hero_image_upscaled_artistic.png"
                    alt="Construction professional"
                    className={`object-contain transition-transform duration-5000 ${
                      imageVisible ? "translate-y-0" : "translate-y-full"
                    }`}
                    style={{
                      objectPosition: "bottom right",
                      transitionDuration: "5000ms",
                      transitionTimingFunction: "ease-out",
                      transform: "scale(1.56)",
                      transformOrigin: "bottom right",
                    }}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    onLoad={handleImageLoad}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Bottom Section - Only visible on desktop */}
        {showBottomSection && (
          <div
            id="services-card-section"
            ref={servicesCardRef}
            className={`absolute bottom-0 left-0 right-0 h-[30vh] z-30 transition-transform ease-out ${
              servicesCardVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
            }`}
            style={{ backgroundColor: 'rgba(0,0,0,0.7)', transitionDelay: servicesCardVisible ? "2s" : "0s",  transitionDuration: '3000ms' }}
          >
            <div className="container mx-auto h-full px-4 md:px-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0 h-full items-center">
                {/* Card 1: Trade Finance */}
                <div 
                  className="hero-service-card hero-service-card-bg1"
                  style={{ backgroundColor: '#cf2027' }}
                >
                  <h3 
                    className="hero-service-title"
                  >
                    Trade Finance
                  </h3>
                  <p className="hero-service-description">
                    Comprehensive solutions including bid securities, performance guarantees, and advance payment guarantees.
                  </p>
                  <Link 
                    className="hero-service-link"
                    href="/services"
                  >
                    Learn More <ArrowRight className="inline h-4 w-4 ml-1" />
                  </Link>
                </div>
                {/* Card 2: Investment Advisory */}
                <div 
                  className="hero-service-card hero-service-card-bg2"
                  style={{ backgroundColor: '#b32025' }}
                >
                  <h3 
                    className="hero-service-title"
                  >
                    Investment Advisory
                  </h3>
                  <p className="hero-service-description">
                    Professional guidance to help you grow your investments through a wide range of asset classes.
                  </p>
                  <Link 
                    className="hero-service-link"
                    href="/services"
                  >
                    Learn More <ArrowRight className="inline h-4 w-4 ml-1" />
                  </Link>
                </div>
                {/* Card 3: Insurance Solutions */}
                <div 
                  className="hero-service-card hero-service-card-bg1"
                  style={{ backgroundColor: '#cf2027' }}
                >
                  <h3 
                    className="hero-service-title"
                  >
                    Insurance Solutions
                  </h3>
                  <p className="hero-service-description">
                    Tailored insurance coverage to protect your business and investments from unforeseen risks.
                  </p>
                  <Link 
                    className="hero-service-link"
                    href="/services"
                  >
                    Learn More <ArrowRight className="inline h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* About Us Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="section-heading">About Us</h2>
            <p className="section-description leading-relaxed">
              We are a leading provider of tailor-made trade finance, insurance, and investment solutions. We serve
              businesses across Kenya and Africa, offering seamless and innovative financial services designed to meet
              the unique needs of our clients.
            </p>
            <p className="section-description leading-relaxed mt-4">
              Blackbow Consult Co. Ltd. empowers African businesses by providing financial solutions that unlock growth
              and success.
            </p>
            <ul className="text-left mt-6 space-y-2 section-description">
              <li className="flex items-start">
                <span className="text-[#FFBE00] mr-2">•</span>
                <span>Founded: 2014, registered in Kenya</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#FFBE00] mr-2">•</span>
                <span>Services: Trade finance, insurance, investment advisory</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#FFBE00] mr-2">•</span>
                <span>Sectors: Transport, manufacturing, real estate, aviation, ICT, education, agribusiness</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#FFBE00] mr-2">•</span>
                <span>Approach: Strategic, client-first, and results-driven</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Vision, Mission, Values Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="subsection-heading">Vision</h3>
              <p className="section-description">
                To be the preferred financial consultant in Kenya and the rest of Africa through the provision of
                seamless and tailor-made solutions.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="subsection-heading">Mission</h3>
              <p className="section-description">
                To inspire entrepreneurship and innovation in Kenya and the rest of the world.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="subsection-heading">Core Values</h3>
              <ul className="space-y-2 section-description">
                <li className="flex items-start">
                  <span className="text-[#FFBE00] mr-2">•</span>
                  <span>Integrity: Honesty and ethics in all interactions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FFBE00] mr-2">•</span>
                  <span>Client-Centricity: Personalized solutions that drive growth</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FFBE00] mr-2">•</span>
                  <span>Professionalism: Expert, accurate, and consistent service</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FFBE00] mr-2">•</span>
                  <span>Excellence: Commitment to surpassing expectations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section id="services" className="py-12 xs:py-16 md:py-24 bg-white">
        <ResponsiveContainer className="px-4 md:px-6">
          <div className="text-center mb-8 xs:mb-12">
            <h2 className="section-heading">What We Offer</h2>
            <p className="section-description max-w-2xl mx-auto">
              We have a diverse portfolio encompassing various aspects of doing business and venue generation. Our
              business is making sure our clients maximize on their investments and take corrective action before
              potential losses.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6 md:gap-8">
            <ServiceCard
              title="Bid Securities"
              description="A Tender Security/Bid bond is a guarantee by a bank provided to a tendering institution by a bidder stating that the bidder has the capability to undertake the tendered project if selected by the institution."
              icon="🔐"
            />
            <ServiceCard
              title="Performance Guarantees"
              description="This is a written guarantee by a bank/insurance company issued to a procuring entity on behalf of the winning bidder/contractor to guarantee successful completion of the awarded project/contract."
              icon="📝"
            />
            <ServiceCard
              title="Advance Payment Guarantees"
              description="This is a guarantee issued by a bank on behalf of its clients to a procuring entity to secure upfront payments for jobs awarded but not executed."
              icon="💰"
            />
            <ServiceCard
              title="Contractors' All Risk Insurance"
              description="Comprehensive insurance coverage for contractors, protecting against all risks associated with construction projects as well as work-related injuries to employees."
              icon="🛡️"
            />
            <ServiceCard
              title="Trade Finance Solutions"
              description="Trade finance involves the discounting of Invoices for contracts/orders that have already been serviced while awaiting payments, as well as providing various guarantees to enable business operations."
              icon="🌐"
            />
            <ServiceCard
              title="Investment Advisory"
              description="We offer professional and customized placement options and advisory services which enable our customers grow their investments progressively through a wide range of assets classes."
              icon="📈"
            />
          </div>
        </ResponsiveContainer>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-8">
            <h2 className="section-heading">Work With Us</h2>
            <p className="section-description max-w-2xl mx-auto">Why clients choose Blackbow Consult:</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="subsection-heading">Expertise in trade finance and investments</h3>
              <p className="section-description">
                Our team brings years of experience in the financial sector, with specialized knowledge in trade
                finance, insurance, and investment solutions.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="subsection-heading">Customized solutions for evolving business needs</h3>
              <p className="section-description">
                We understand that every business is unique, which is why we tailor our services to meet your specific
                requirements and help you achieve your goals.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="subsection-heading">Experienced, professional team</h3>
              <p className="section-description">
                Our dedicated professionals are committed to providing exceptional service and support throughout your
                journey with us.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="subsection-heading">Strong financial and institutional partnerships</h3>
              <p className="section-description">
                We have established strong relationships with financial institutions and partners across Africa,
                enabling us to deliver comprehensive solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Message from CEO Section */}
      <section className="py-16 md:py-20" style={{ backgroundColor: "#FAFAFA" }}>
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="section-heading mb-6">Message from the CEO</h2>
          <blockquote className="max-w-3xl mx-auto">
            <p className="ceo-quote mb-6">
              "Thank you for choosing the 'Home of Customized Trade Finance Solutions'. We are excited to partner with
              you and enable your business to fulfil all your obligations in a swift and customized manner. Your success
              is our pride and joy."
            </p>
            <footer className="section-description">
              <cite>— Arnold Midung\'a Ngusale, CEO</cite>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-12 xs:py-16 md:py-24 bg-white">
        <ResponsiveContainer className="px-4 md:px-6">
          <div className="text-center mb-8 xs:mb-12">
            <h2 className="section-heading">Our Team</h2>
            <p className="section-description max-w-2xl mx-auto">
              Meet our experienced professionals dedicated to providing you with the best trade finance solutions.
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
            <TeamMember
              name="Ruth Mwihaki"
              position="Business Development Manager"
              bio="Ruth is a seasoned finance professional with over 8 years experience, she is proficient and skilled in Consumer Banking and Trade Finance. She is our Business Development Manager - Nairobi, Central & Eastern."
              image="/team-member-4.png"
            />
            <TeamMember
              name="Allan Juma"
              position="Operations Manager"
              bio="Allan is skilled and proficient in Banking with 3 years experience in Trade Finance Operations. He is excellent in reconciliations, Report Generation, and Overall Management of Retail Trade finance Data. He serves as our Operations Manager."
              image="/team-member-5.png"
            />
          </div>
        </ResponsiveContainer>
      </section>

      {/* Blog Section - Temporarily removed for deployment */}
      <section className="py-16 md:py-24 bg-gray-50">
        <ResponsiveContainer>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="section-heading">From Our Blog</h2>
            <p className="section-description">
              Stay updated with the latest industry news and insights from our experts.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <BlogCard
              image="/placeholder.svg"
              category="Finance"
              title="Navigating the Complexities of Trade Finance in Africa"
              excerpt="A deep dive into the challenges and opportunities in the African trade finance landscape."
              author="John Doe"
              date="2023-10-26"
              slug="navigating-trade-finance"
            />
            <BlogCard
              image="/placeholder.svg"
              category="Construction"
              title="The Role of Performance Guarantees in Large-Scale Construction"
              excerpt="How performance guarantees can mitigate risks and ensure project success."
              author="Jane Smith"
              date="2023-10-24"
              slug="performance-guarantees"
            />
            <BlogCard
              image="/placeholder.svg"
              category="Real Estate"
              title="Investment Hotspots in East Africa's Real Estate Sector"
              excerpt="Identifying lucrative investment opportunities in the booming East African property market."
              author="Sam Wilson"
              date="2023-10-22"
              slug="investment-hotspots"
            />
          </div>
          <div className="mt-12 text-center">
            <Link href="/blog">
              <Button size="lg" variant="outline">
                View All Posts <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </ResponsiveContainer>
      </section>

      {/* Contact Section */}
      <section id="contacts" className="py-12 xs:py-16 md:py-24 bg-gray-50">
        <ResponsiveContainer className="px-4 md:px-6">
          <div className="text-center mb-8 xs:mb-12">
            <h2 className="section-heading">Contact Us</h2>
            <p className="section-description max-w-2xl mx-auto">
              Have questions about our services? Contact us today and our team will be happy to assist you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <MapPin className="h-8 w-8 mx-auto mb-4" style={{ color: "#FFBE00" }} />
              <h3 className="font-sans font-semibold text-lg mb-2">Address</h3>
              <p className="contacts-info">
                <a href="https://www.google.com/maps?q=Garden+Chambers+Building,+Mokta-Daddah+Street,+Suite+203,+Nairobi,+Kenya" target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:underline">Garden Chambers Building, Mokta-Daddah Street, Suite 203, Nairobi, Kenya</a>
                <br />
                Blackbow Consult Ltd., P.O. Box 3143-00506, Nairobi – Kenya
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Phone className="h-8 w-8 mx-auto mb-4" style={{ color: "#FFBE00" }} />
              <h3 className="font-sans font-semibold text-lg mb-2">Phone</h3>
              <p className="contacts-info">+254 728 552 225 / +254 720 709 711</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Mail className="h-8 w-8 mx-auto mb-4" style={{ color: "#FFBE00" }} />
              <h3 className="font-sans font-semibold text-lg mb-2">Email</h3>
              <p className="contacts-info"><a href="mailto:info@blackbowconsult.co.ke" className="underline-offset-2 hover:underline">info@blackbowconsult.co.ke</a></p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
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
                className="h-8 w-8 mx-auto mb-4"
                style={{ color: "#FFBE00" }}
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="2" x2="22" y1="12" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <h3 className="font-sans font-semibold text-lg mb-2">Website</h3>
              <p className="contacts-info">www.blackbow.co.ke</p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link href="/contacts">
              <Button
                size="lg"
                style={{ backgroundColor: "#D01C1F", color: "white" }}
                className="button-text hover:bg-opacity-90 rounded-full px-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              >
                Get In Touch <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </ResponsiveContainer>
      </section>

      {/* Copyright Strip */}
      <div 
        className="w-full h-[20px] flex items-center justify-center"
        style={{ backgroundColor: '#E6E6E6' }}
      >
        <p 
          className="text-xs font-medium"
          style={{ color: 'var(--accent-yellow)' }}
        >
          Blackbow Consult Ltd &copy; All Rights Reserved, 2025
        </p>
      </div>

      <Footer />
    </div>
  )
}
