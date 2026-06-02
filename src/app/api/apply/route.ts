import { NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy");

const roleTitles: Record<string, string> = {
  nextjs: "Senior React / Next.js Developer",
  "ai-architect": "Generative AI & Automation Architect",
  "seo-growth": "SEO & Search Intelligence Specialist",
};

export async function POST(req: Request) {
  try {
    const { name, email, portfolio, role, pitch } = await req.json();

    if (!name || !email || !portfolio || !pitch) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const roleTitle = roleTitles[role] || role;
    const formattedMessage = `Portfolio/LinkedIn: ${portfolio}\n\nCandidate Pitch:\n${pitch}`;

    // Save candidate application as a Lead in the database
    let leadId = "fallback-id";
    try {
      const lead = await prisma.lead.create({
        data: {
          name,
          email,
          subject: `Job Application: ${roleTitle}`,
          message: formattedMessage,
          status: "NEW",
        },
      });
      leadId = lead.id;
    } catch (dbError) {
      console.error("Failed to save job application to database, proceeding with email/WhatsApp fallback:", dbError);
    }

    // Attempt to notify BITSOL HR via Resend email, but don't fail the request if it doesn't work
    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== "re_dummy") {
      try {
        await resend.emails.send({
          from: "BITSOL Careers <careers@bitsolmarketing.com>",
          to: "adnan.bashir7895@gmail.com",
          subject: `New Candidate: ${name} - ${roleTitle}`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; color: #333;">
              <h2 style="color: #7C3AED;">New Career Application from BITSOL Website</h2>
              <p><strong>Candidate Name:</strong> ${name}</p>
              <p><strong>Email Address:</strong> ${email}</p>
              <p><strong>Applied Path:</strong> ${roleTitle}</p>
              <p><strong>Portfolio/LinkedIn:</strong> <a href="${portfolio}" target="_blank" style="color: #00D9FF; text-decoration: underline;">${portfolio}</a></p>
              <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
              <p><strong>Why BITSOL (Candidate Pitch):</strong></p>
              <p style="background: #f9f9f9; padding: 15px; border-radius: 8px; white-space: pre-wrap;">${pitch}</p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error("Failed to send candidate email via Resend:", emailError);
      }
    }

    return NextResponse.json({ success: true, leadId }, { status: 200 });
  } catch (error) {
    console.error("Application processing error:", error);
    return NextResponse.json(
      { error: "Failed to process job application" },
      { status: 500 }
    );
  }
}
