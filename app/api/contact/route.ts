import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, phone, subject, message, privacy, origin, page } = data || {};
    const TO = process.env.CONTACT_TO_EMAIL || "finance@blackbowconsult.co.ke";

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, message: "Missing required fields." }, { status: 400 });
    }

    const safe = (v: unknown) => (v == null ? "-" : String(v));
    const builtSubject =
      subject ||
      (origin === "newsletter"
        ? "FOOTER EMAIL COLLECTION FORM IN THE BLACKBOW CONSULT WEBSITE"
        : "MAIN EMAIL FORM IN THE BLACKBOW CONSULT WEBSITE'S CONTACTS PAGE");

    const html = `
      <h2>New Website Submission</h2>
      <p><b>Origin:</b> ${safe(origin || page || "contact-form")}</p>
      <p><b>Name:</b> ${safe(name)}</p>
      <p><b>Email:</b> ${safe(email)}</p>
      <p><b>Phone:</b> ${safe(phone)}</p>
      <p><b>Agreed to Privacy:</b> ${privacy ? "Yes" : "No"}</p>
      <hr/>
      <p><b>Message:</b><br/>${safe(message).replace(/\n/g, "<br/>")}</p>
    `;

    await sendEmail({ to: TO, subject: builtSubject, html, replyTo: email });
    return NextResponse.json({ success: true, message: "Email sent." });
  } catch (err) {
    console.error("SMTP error (/api/contact):", err);
    return NextResponse.json({ success: false, message: "Server error while sending email." }, { status: 500 });
  }
}


