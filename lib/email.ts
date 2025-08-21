import nodemailer from "nodemailer";

const {
  SMTP_HOST = "mail.blackbowconsult.co.ke",
  SMTP_PORT = "465",
  SMTP_SECURE = "true",
  SMTP_USER = "finance@blackbowconsult.co.ke",
  SMTP_PASS,
  EMAIL_FROM = "BlackBow Website <finance@blackbowconsult.co.ke>",
} = process.env;

if (!SMTP_PASS) {
  console.warn("⚠️ SMTP_PASS is missing. Emails will fail until it is set in env.");
}

type SendEmailParams = {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
};

export async function sendEmail({ to, subject, html, replyTo }: SendEmailParams) {
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: SMTP_SECURE === "true",
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const info = await transporter.sendMail({
    from: EMAIL_FROM,
    to,
    subject,
    html,
    ...(replyTo ? { replyTo } : {}),
  });

  console.log("Email sent:", info.messageId);
  return info;
}


