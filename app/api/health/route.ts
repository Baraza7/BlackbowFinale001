import { NextResponse } from "next/server";

export async function GET() {
  const smtp = {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || "465"),
    user: process.env.SMTP_USER,
    secure: (process.env.SMTP_SECURE || "true") === "true",
    hasPass: Boolean(process.env.SMTP_PASS),
  };
  const contactTo = process.env.CONTACT_TO_EMAIL || "finance@blackbowconsult.co.ke";
  return NextResponse.json({ contactTo, smtp });
}


