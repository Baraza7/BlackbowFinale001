"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ContactForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    privacy: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: checked }))
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    }

    if (!formData.privacy) {
      newErrors.privacy = "You must agree to the privacy policy"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // For preview: simulate API call with timeout
    setTimeout(() => {
      setIsSubmitting(false)
      router.push("/contact/success")
    }, 1000)
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="font-sans text-sm font-medium text-gray-700">
            Full Name <span className="text-[#D01C1F]">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFBE00] font-body ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Your name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="font-sans text-sm font-medium text-gray-700">
            Email Address <span className="text-[#D01C1F]">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFBE00] font-body ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Your email"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="phone" className="font-sans text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFBE00] font-body"
          placeholder="Your phone number"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="subject" className="font-sans text-sm font-medium text-gray-700">
          Subject <span className="text-[#D01C1F]">*</span>
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          value={formData.subject}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFBE00] font-body ${
            errors.subject ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="How can we help you?"
        />
        {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="font-sans text-sm font-medium text-gray-700">
          Message <span className="text-[#D01C1F]">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFBE00] font-body ${
            errors.message ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Your message"
        ></textarea>
        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
      </div>

      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id="privacy"
            name="privacy"
            type="checkbox"
            checked={formData.privacy}
            onChange={handleCheckboxChange}
            className={`w-4 h-4 border rounded focus:ring-[#FFBE00] ${
              errors.privacy ? "border-red-500" : "border-gray-300"
            }`}
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="privacy" className="font-body text-gray-600">
            I agree to the{" "}
            <a href="#" className="text-[#00B1D2] hover:underline">
              privacy policy
            </a>
          </label>
          {errors.privacy && <p className="text-red-500 text-sm mt-1">{errors.privacy}</p>}
        </div>
      </div>

      <Button
        type="submit"
        style={{ backgroundColor: "#D01C1F", color: "white" }}
        className="hover:bg-opacity-90 rounded-full px-8 py-3 flex items-center"
        size="lg"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send Message"} <Send className="ml-2 h-4 w-4" />
      </Button>
    </form>
  )
}
