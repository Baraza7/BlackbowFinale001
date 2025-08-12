import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.RESEND_FROM_EMAIL || 'noreply@blackbowconsult.co.ke';
const toEmail = process.env.CONTACT_TO_EMAIL || 'info@blackbowconsult.co.ke';

export async function POST(req: NextRequest) {
  // Check if the API key is available
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set in environment variables.');
    return NextResponse.json(
      { error: 'Server configuration error: Missing API Key.' },
      { status: 500 }
    );
  }

  try {
    const { name, phone, email, page } = await req.json();

    const subject = `Used Details from Call to Action Form - ${page} page`;
    const emailBody = `
      <p>You have a new submission from the call to action form on your website.</p>
      <h3>Details:</h3>
      <ul>
        <li><strong>User Name:</strong> ${name}</li>
        <li><strong>Phone Number:</strong> ${phone}</li>
        <li><strong>Email Address:</strong> ${email}</li>
      </ul>
    `;

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: subject,
      html: emailBody,
    });

    if (error) {
      console.error('Resend API Error:', error);
      return NextResponse.json({ error: 'Error sending email', resendError: error }, { status: 500 });
    }

    return NextResponse.json({ message: 'Email sent successfully!', data });

  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: error }, { status: 500 });
  }
} 