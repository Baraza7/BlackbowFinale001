"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactsForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Email is invalid"),
    phone: z.string().optional(),
    subject: z.string().min(1, "Subject is required"),
    message: z.string().min(1, "Message is required"),
    privacy: z.boolean().refine((value) => value === true, "You must agree to the privacy policy"),
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      privacy: false,
    },
  })

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      if (response.ok) {
        router.push("/contacts/success")
      } else {
        router.push("/contacts/error")
      }
    } catch (error) {
      router.push("/contacts/error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Full Name <span className="text-[#D01C1F]">*</span>
                </FormLabel>
                <FormControl>
                  <Input aria-label="Full Name" placeholder="Full Name *" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Email Address <span className="text-[#D01C1F]">*</span>
                </FormLabel>
                <FormControl>
                  <Input aria-label="Email Address" placeholder="Email Address *" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input aria-label="Phone Number" placeholder="Phone Number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Subject <span className="text-[#D01C1F]">*</span>
                </FormLabel>
                <FormControl>
                  <Input aria-label="Subject" placeholder="Subject *" {...field} />
                </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Message <span className="text-[#D01C1F]">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea aria-label="Message" placeholder="Your message *" {...field} />
                </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="privacy"
          render={({ field }) => (
            <FormItem className="flex items-start">
              <FormControl>
                <input
                  id="privacy"
                  name="privacy"
                  type="checkbox"
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  className={`w-4 h-4 border rounded focus:ring-[#FFBE00] ${
                    form.formState.errors.privacy ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </FormControl>
              <div className="ml-3 text-sm">
                <FormLabel>
                  I agree to the{" "}
                  <a href="#" className="text-[#D01C1F] no-underline hover:no-underline">
                    privacy policy
                  </a>
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

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
    </Form>
  )
}
