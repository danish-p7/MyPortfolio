import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields.",
        },
        { status: 400 }
      );
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid email address format.",
        },
        { status: 400 }
      );
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",

      // Replace this with your personal email
      to: ["danish.parveez.dev@gmail.com"],

      // When you click Reply, it will reply to the person
      // who submitted the contact form.
      replyTo: email,

      subject: `[Inquiry/Concerns] ${subject}`,

      html: `
        <div style="
          font-family: Arial, Helvetica, sans-serif;
          line-height: 1.6;
          color: #1e293b;
          max-width: 650px;
          margin: 0 auto;
        ">
          <h2 style="
            color: #0f172a;
            margin-bottom: 20px;
          ">
            New Portfolio Contact
          </h2>

          <div style="
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 20px;
          ">
            <p>
              <strong>Name:</strong><br />
              ${escapeHtml(name)}
            </p>

            <p>
              <strong>Email:</strong><br />
              ${escapeHtml(email)}
            </p>

            <p>
              <strong>Subject:</strong><br />
              ${escapeHtml(subject)}
            </p>

            <p>
              <strong>Message:</strong><br />
              ${escapeHtml(message).replace(/\n/g, "<br />")}
            </p>
          </div>

          <p style="
            margin-top: 20px;
            font-size: 13px;
            color: #64748b;
          ">
            This message was submitted through your portfolio contact form.
          </p>
        </div>
      `,
    });

    // Resend returned an error
    if (error) {
      console.error("Resend error:", error);

      return NextResponse.json(
        {
          success: false,
          error: "Unable to send message. Please try again later.",
        },
        { status: 500 }
      );
    }

    // Email successfully sent
    console.log("------------------------------------------");
    console.log("[Portfolio Contact Form - Email Sent]");
    console.log("Timestamp:", new Date().toISOString());
    console.log("From:", name, `<${email}>`);
    console.log("Subject:", subject);
    console.log("Resend Email ID:", data?.id);
    console.log("------------------------------------------");

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you! Your message has been sent successfully. I will get back to you soon.",
        emailId: data?.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact submission:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Internal server error. Please try again later.",
      },
      { status: 500 }
    );
  }
}

/**
 * Prevent user-submitted HTML from being interpreted
 * inside the email body.
 */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* 
      ========================================================================
      TODO: WIRE UP PRODUCTION EMAIL SERVICE HERE
      ========================================================================

      Option 1: Resend (Recommended, easiest Next.js integration)
      -------------------------------------------------------
      import { Resend } from 'resend';
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: 'your-email@domain.com',
        reply_to: email,
        subject: `[Portfolio Inquiry] ${subject} from ${name}`,
        text: `From: ${name} (${email})\n\n${message}`,
      });

      Option 2: Formspree (No API keys or backend code needed)
      -------------------------------------------------------
      Change the fetch URL in ContactForm.tsx to:
      https://formspree.io/f/YOUR_FORM_ID

      Option 3: SendGrid
      -------------------------------------------------------
      import sgMail from '@sendgrid/mail';
      sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
      await sgMail.send({ ... });
      ========================================================================
*/
