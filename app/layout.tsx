import type React from "react"
import type { Metadata } from "next"
import { Inter, Roboto, Italiana, Montserrat } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"
import FloatingWhatsApp from "@/components/FloatingWhatsApp"
import { Providers } from "./providers"

// Inter font configuration with full weight range
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  preload: true,
})

// Roboto font configuration with comprehensive weights
const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
  preload: true,
})

// Italiana font configuration
const italiana = Italiana({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-italiana",
  display: "swap",
  preload: true,
})

// Montserrat font configuration
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: "Blackbow Consult Limited - Trade Finance Solutions",
  description: "Your Partner in Customized Trade Finance, Insurance & Investment Solutions Across Africa",
  generator: 'v0.dev',
  icons: {
    icon: [
      { url: '/crown.png' },
      { url: '/crown.png', sizes: '16x16', type: 'image/png' },
      { url: '/crown.png', sizes: '32x32', type: 'image/png' },
      { url: '/crown.png', sizes: '48x48', type: 'image/png' }
    ],
    shortcut: ['/crown.png'],
    apple: [
      { url: '/crown.png' },
      { url: '/crown.png', sizes: '180x180', type: 'image/png' }
    ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${roboto.variable} ${italiana.variable} ${montserrat.variable} antialiased`}>
        <Providers attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange={false} forcedTheme="light">
          <AuthProvider>
            {children}
            <FloatingWhatsApp />
          </AuthProvider>
        </Providers>
      </body>
    </html>
  )
}
