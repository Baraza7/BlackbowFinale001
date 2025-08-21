"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Sun, Moon, Palette, Facebook } from 'lucide-react'
import { FaInstagram } from 'react-icons/fa'
import { useMobile } from "@/hooks/use-mobile"
import { useTheme } from "next-themes"
import { useRouter, usePathname } from "next/navigation"

// Define a type for the component's props
interface HeaderProps {
  isHomePage?: boolean;
}

export default function Header({ isHomePage = false }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isMobile } = useMobile()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogoDoubleClick = () => {
    router.push('/admin/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  if (!mounted) {
    return null
  }

  return (
    <header className={`absolute top-0 left-0 right-0 z-50 ${isHomePage ? '' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative flex items-center justify-between h-16 md:h-20">
          {/* Logo - Mobile: 30% width, Desktop: Normal */}
          <div onDoubleClick={handleLogoDoubleClick} className="cursor-pointer max-[500px]:w-[30%] flex justify-start">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <Image
                  src="/logoH-png.png"
                  alt="Blackbow Logo"
                  width={50}
                  height={50}
                  className="h-[29px] md:h-[34px] lg:h-[40px] w-auto transition-transform duration-300 group-hover:scale-105"
                  priority
                  sizes="(max-width: 500px) 29px, (max-width: 768px) 34px, (max-width: 1024px) 34px, 40px"
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation: Absolutely Centered - Hidden below 500px */}
          <nav className="hidden min-[500px]:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div
              className={`flex items-center space-x-8 px-5 py-[5px] rounded-xl 
                ${isHomePage
                  ? 'bg-white/90 backdrop-blur-md border border-black/10'
                  : 'bg-black/70 border border-white/20'
                }`}
            >
              <Link href="/" className={`font-normal text-[13px] transition-colors duration-300 ${pathname === '/' ? 'font-bold text-[#FFBE00]' : isHomePage ? 'text-gray-800 hover:text-[#febf00]' : 'text-white hover:text-[#febf00]'}`}>Home</Link>
              <Link href="/about" className={`font-normal text-[13px] transition-colors duration-300 ${pathname === '/about' ? 'font-bold text-[#FFBE00]' : isHomePage ? 'text-gray-800 hover:text-[#febf00]' : 'text-white hover:text-[#febf00]'}`}>About</Link>
              <Link href="/services" className={`font-normal text-[13px] transition-colors duration-300 ${pathname === '/services' ? 'font-bold text-[#FFBE00]' : isHomePage ? 'text-gray-800 hover:text-[#febf00]' : 'text-white hover:text-[#febf00]'}`}>Services</Link>
              <Link href="/blog" className={`font-normal text-[13px] transition-colors duration-300 ${pathname === '/blog' ? 'font-bold text-[#FFBE00]' : isHomePage ? 'text-gray-800 hover:text-[#febf00]' : 'text-white hover:text-[#febf00]'}`}>Updates</Link>
              <Link href="/media" className={`font-normal text-[13px] transition-colors duration-300 ${pathname === '/media' ? 'font-bold text-[#FFBE00]' : isHomePage ? 'text-gray-800 hover:text-[#febf00]' : 'text-white hover:text-[#febf00]'}`}>Media</Link>
              <Link href="/contacts" className={`font-normal text-[13px] transition-colors duration-300 ${pathname === '/contacts' ? 'font-bold text-[#FFBE00]' : isHomePage ? 'text-gray-800 hover:text-[#febf00]' : 'text-white hover:text-[#febf00]'}`}>Contacts</Link>
            </div>
          </nav>

          {/* Right-aligned items */}
          <div className="flex items-center max-[500px]:w-[10%] max-[500px]:justify-end">
            {/* Social Media Icons - Hidden below 500px */}
            <div className="hidden min-[500px]:flex items-center space-x-3">
              <a href="https://www.facebook.com/share/18DDB3fFtD/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white hover:bg-yellow-400 flex items-center justify-center transition-colors duration-300">
                <Facebook className="w-4 h-4 text-black fill-black" />
              </a>
              <a href="https://www.instagram.com/blackbowconsult?igsh=MWk4cnpoMmt3aTZ0ZA==" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white hover:bg-yellow-400 flex items-center justify-center transition-colors duration-300">
                <FaInstagram className="w-4 h-4 text-black" />
              </a>
              <a href="https://x.com/BlackbowConsult?t=fmFdlDy4FeDoSEHQkd8flA&s=08" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white hover:bg-yellow-400 flex items-center justify-center transition-colors duration-300">
                <svg className="w-4 h-4 text-black fill-black" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>

            {/* Modern Hamburger Menu Button - Below 500px */}
            <button
              onClick={toggleMenu}
              className="max-[500px]:flex min-[500px]:hidden items-center justify-center w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
              aria-label="Toggle menu"
            >
              <div className="flex flex-col items-center justify-center w-6 h-6">
                <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                <span className={`block h-0.5 w-6 bg-white mt-1 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-0.5 w-6 bg-white mt-1 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Modern Mobile Navigation - Only below 500px */}
        {isMenuOpen && (
          <div 
            className={`max-[500px]:block min-[500px]:hidden fixed inset-0 top-16 bg-black/50 backdrop-blur-sm z-40`}
            onClick={() => setIsMenuOpen(false)}
          >
            <div 
              className={`absolute top-4 left-4 right-4 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border 
                ${isHomePage 
                  ? 'bg-white/95 border-gray-200' 
                  : 'bg-black/95 border-white/10'
                }`}
              onClick={(e) => e.stopPropagation()}
            >
              <nav className="flex flex-col space-y-4">
                <Link href="/" className={`font-medium text-base py-3 px-4 rounded-lg transition-all duration-300 ${pathname === '/' ? 'font-bold text-[#FFBE00] bg-[#FFBE00]/10' : isHomePage ? 'text-gray-800 hover:text-[#FFBE00] hover:bg-gray-50' : 'text-white hover:text-[#FFBE00] hover:bg-white/10'}`} onClick={() => setIsMenuOpen(false)}>Home</Link>
                <Link href="/about" className={`font-medium text-base py-3 px-4 rounded-lg transition-all duration-300 ${pathname === '/about' ? 'font-bold text-[#FFBE00] bg-[#FFBE00]/10' : isHomePage ? 'text-gray-800 hover:text-[#FFBE00] hover:bg-gray-50' : 'text-white hover:text-[#FFBE00] hover:bg-white/10'}`} onClick={() => setIsMenuOpen(false)}>About</Link>
                <Link href="/services" className={`font-medium text-base py-3 px-4 rounded-lg transition-all duration-300 ${pathname === '/services' ? 'font-bold text-[#FFBE00] bg-[#FFBE00]/10' : isHomePage ? 'text-gray-800 hover:text-[#FFBE00] hover:bg-gray-50' : 'text-white hover:text-[#FFBE00] hover:bg-white/10'}`} onClick={() => setIsMenuOpen(false)}>Services</Link>
                <Link href="/blog" className={`font-medium text-base py-3 px-4 rounded-lg transition-all duration-300 ${pathname === '/blog' ? 'font-bold text-[#FFBE00] bg-[#FFBE00]/10' : isHomePage ? 'text-gray-800 hover:text-[#FFBE00] hover:bg-gray-50' : 'text-white hover:text-[#FFBE00] hover:bg-white/10'}`} onClick={() => setIsMenuOpen(false)}>Updates</Link>
                <Link href="/media" className={`font-medium text-base py-3 px-4 rounded-lg transition-all duration-300 ${pathname === '/media' ? 'font-bold text-[#FFBE00] bg-[#FFBE00]/10' : isHomePage ? 'text-gray-800 hover:text-[#FFBE00] hover:bg-gray-50' : 'text-white hover:text-[#FFBE00] hover:bg-white/10'}`} onClick={() => setIsMenuOpen(false)}>Media</Link>
                <Link href="/contacts" className={`font-medium text-base py-3 px-4 rounded-lg transition-all duration-300 ${pathname === '/contacts' ? 'font-bold text-[#FFBE00] bg-[#FFBE00]/10' : isHomePage ? 'text-gray-800 hover:text-[#FFBE00] hover:bg-gray-50' : 'text-white hover:text-[#FFBE00] hover:bg-white/10'}`} onClick={() => setIsMenuOpen(false)}>Contacts</Link>
                
                {/* Social Media Links for Mobile - Clean minimal design */}
                <div className={`flex items-center justify-center space-x-6 pt-6 mt-4 border-t ${isHomePage ? 'border-gray-200' : 'border-white/20'}`}>
                  <a href="https://www.facebook.com/share/18DDB3fFtD/" target="_blank" rel="noopener noreferrer" className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${isHomePage ? 'bg-gray-100 hover:bg-[#FFBE00] hover:scale-110' : 'bg-white/10 hover:bg-[#FFBE00] hover:scale-110'}`}>
                    <Facebook className={`w-5 h-5 ${isHomePage ? 'text-gray-700' : 'text-white'} transition-colors duration-300`} />
                  </a>
                  <a href="https://www.instagram.com/blackbowconsult?igsh=MWk4cnpoMmt3aTZ0ZA==" target="_blank" rel="noopener noreferrer" className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${isHomePage ? 'bg-gray-100 hover:bg-[#FFBE00] hover:scale-110' : 'bg-white/10 hover:bg-[#FFBE00] hover:scale-110'}`}>
                    <FaInstagram className={`w-5 h-5 ${isHomePage ? 'text-gray-700' : 'text-white'} transition-colors duration-300`} />
                  </a>
                  <a href="https://x.com/BlackbowConsult?t=fmFdlDy4FeDoSEHQkd8flA&s=08" target="_blank" rel="noopener noreferrer" className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${isHomePage ? 'bg-gray-100 hover:bg-[#FFBE00] hover:scale-110' : 'bg-white/10 hover:bg-[#FFBE00] hover:scale-110'}`}>
                    <svg className={`w-5 h-5 ${isHomePage ? 'text-gray-700' : 'text-white'} transition-colors duration-300`} viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                </div>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
