import Link from "next/link"
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function RequirementsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative pt-20 h-[50vh] w-full flex items-center">
        {/* Dark background with grid pattern - matching the About Us page */}
        <div className="absolute inset-0 z-0 bg-[#27272A]">
          <div className="absolute inset-0 opacity-20 bg-grid-white/10" />
        </div>
        <div className="container relative z-10 mx-auto px-4 md:px-6 text-white">
          <div className="max-w-3xl">
            {/* Using Italiana font for headings as specified */}
            <h1 className="font-serif text-4xl md:text-5xl lg:text-[42px] font-bold mb-6 leading-tight tracking-tight">
              Document Requirements
            </h1>
            {/* Using Roboto for subheadings */}
            <p className="font-sans text-lg md:text-xl lg:text-2xl mb-8 text-gray-200 max-w-2xl leading-relaxed">
              The following documents are required to process your trade finance solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8 text-[#27272A] tracking-tight">
              General Requirements
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              <RequirementItem number="01" text="Fully filled guarantee request form" />
              <RequirementItem number="02" text="Business registration certificate" />
              <RequirementItem number="03" text="ID and pin of the client" />
              <RequirementItem number="04" text="Copy of award letter/Contract" />
              <RequirementItem
                number="05"
                text="6 months Bank Statements with evidence of the receipts from past employers/procuring entities"
              />
              <RequirementItem
                number="06"
                text="Copies of past bid bonds, performance bonds, APG, award letters, ongoing contracts and letters of completion of works if any"
              />
              <RequirementItem number="07" text="Map of the business or premises/Home" />
              <RequirementItem number="08" text="Limited liability company requirements" />
            </div>

            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8 text-[#27272A] tracking-tight">
              Limited Liability Company Requirements
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              <RequirementItem number="09" text="Board resolution to obtain the guarantee" />
              <RequirementItem number="10" text="ID and Pin of all directors" />
              <RequirementItem number="11" text="Copy of search or latest CR" />
              <RequirementItem number="12" text="Certificate of incorporation/Business registration" />
              <RequirementItem number="13" text="Memorandum and articles of association" />
              <RequirementItem number="14" text="Company pin and tax compliance certificate" />
              <RequirementItem
                number="15"
                text="For consideration under the youth fund, all directors must be below the age of 35"
              />
              <RequirementItem
                number="16"
                text="Any other necessary requirements as deemed fit by the credit committee"
              />
            </div>

            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 mb-12">
              <h3 className="font-serif text-2xl font-bold mb-4 text-[#27272A]">Important Notes</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-1"
                    style={{ backgroundColor: "#FFBE00" }}
                  >
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
                      className="h-4 w-4 text-white"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <p className="font-body text-gray-700">
                    All documents must be clear, legible copies of the originals.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-1"
                    style={{ backgroundColor: "#FFBE00" }}
                  >
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
                      className="h-4 w-4 text-white"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <p className="font-body text-gray-700">
                    Additional documents may be requested based on the specific nature of your application.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-1"
                    style={{ backgroundColor: "#FFBE00" }}
                  >
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
                      className="h-4 w-4 text-white"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <p className="font-body text-gray-700">
                    Processing times may vary depending on the completeness of documentation provided.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-1"
                    style={{ backgroundColor: "#FFBE00" }}
                  >
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
                      className="h-4 w-4 text-white"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <p className="font-body text-gray-700">
                    Our team is available to assist you with any questions regarding document requirements.
                  </p>
                </li>
              </ul>
            </div>

            <div className="text-center">
              <p className="font-body text-gray-700 mb-6 text-lg">
                Need assistance with your application or have questions about the requirements?
              </p>
              <Link href="/contacts">
                <Button
                  size="lg"
                  style={{ backgroundColor: "#D01C1F", color: "white" }}
                  className="hover:bg-opacity-90 rounded-full px-8"
                >
                  Contact Us <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-16 md:py-20 bg-[#27272A] text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 tracking-tight">Ready to Get Started?</h2>
          <p className="font-body text-gray-300 max-w-2xl mx-auto mb-8 text-lg">
            Contact us today to discuss how we can help you with your trade finance, investment, and insurance needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Link href="/contacts">
              <Button
                size="lg"
                style={{ backgroundColor: "#D01C1F", color: "white" }}
                className="hover:bg-opacity-90 rounded-full px-8"
              >
                Contact Us <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/services">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 rounded-full px-8"
              >
                View All Services
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-[#FFBE00]/20 flex items-center justify-center mb-4">
                <Phone className="h-6 w-6 text-[#FFBE00]" />
              </div>
              <h3 className="font-sans font-semibold text-lg mb-2">Call Us</h3>
              <p className="text-gray-300">+254 728 552 225 / +254 720 709 711</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-[#FFBE00]/20 flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-[#FFBE00]" />
              </div>
              <h3 className="font-sans font-semibold text-lg mb-2">Email Us</h3>
              <p className="text-gray-300"><a href="mailto:info@blackbowconsult.co.ke" className="underline-offset-2 hover:underline">info@blackbowconsult.co.ke</a></p>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-[#FFBE00]/20 flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-[#FFBE00]" />
              </div>
              <h3 className="font-sans font-semibold text-lg mb-2">Visit Us</h3>
              <p className="text-gray-300"><a href="https://www.google.com/maps?q=Garden+Chambers+Building,+Mokta-Daddah+Street,+Suite+203,+Nairobi,+Kenya" target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:underline">Garden Chambers Building, Mokta-Daddah Street, Suite 203, Nairobi, Kenya</a></p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

// Component for Requirement Item
function RequirementItem({ number, text }: { number: string; text: string }) {
  return (
    <div className="flex items-start gap-4">
      <div
        className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold"
        style={{ backgroundColor: "#FBE08E", color: "#27272A" }}
      >
        {number}
      </div>
      <div className="pt-2">
        <p className="font-body text-gray-700">{text}</p>
      </div>
    </div>
  )
}
