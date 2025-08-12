import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null
const CONTACT_TO = process.env.CONTACT_TO_EMAIL || "info@blackbowconsult.co.ke"
const CONTACT_FROM = process.env.RESEND_FROM_EMAIL || "noreply@blackbowconsult.co.ke"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    const { name, email, phone, subject, message, privacy } = data || {}

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, message: "Missing required fields." },
        { status: 400 },
      )
    }

    if (!resend) {
      console.error("RESEND_API_KEY is not set.")
      return NextResponse.json(
        { success: false, message: "Email service not configured on server." },
        { status: 500 },
      )
    }

    const emailSubject = `EMAIL FROM CONTACT AS FORM BLACKBOWCONSULT.CO.KE`

    const html = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "(not provided)"}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Agreed to Privacy:</strong> ${privacy ? "Yes" : "No"}</p>
      <hr/>
      <p><strong>Message:</strong></p>
      <p>${(message || "").replace(/\n/g, "<br/>")}</p>
    `

    const { error } = await resend.emails.send({
      from: CONTACT_FROM,
      to: [CONTACT_TO],
      subject: emailSubject,
      html,
      replyTo: email,
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json(
        { success: false, message: "There was an error sending your message.", resendError: error },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully. We'll get back to you soon!",
    })
  } catch (error) {
    console.error("Error processing contacts form:", error)
    return NextResponse.json(
      {
        success: false,
        message: "There was an error sending your message. Please try again or contact us directly.",
      },
      { status: 500 },
    )
  }
}
