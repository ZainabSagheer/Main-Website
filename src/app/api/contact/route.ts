import { NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy");

export async function POST(req: Request) {
  try {
    const { name, email, service, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Save lead to MongoDB
    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        subject: service || "General Inquiry",
        message,
        status: "NEW",
      },
    });

    // Attempt to send email, but don't fail the request if it doesn't work
    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== "re_dummy") {
      try {
        await resend.emails.send({
          from: "BITSOL Leads <leads@bitsolmarketing.com>",
          to: "adnan.bashir7895@gmail.com",
          subject: `New Lead: ${name} - ${service}`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; color: #333;">
              <h2 style="color: #00D9FF;">New Inquiry from BITSOL Website</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Interested Service:</strong> ${service}</p>
              <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
              <p><strong>Message:</strong></p>
              <p style="background: #f9f9f9; padding: 15px; border-radius: 8px;">${message}</p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error("Failed to send email via Resend:", emailError);
      }
    }

    return NextResponse.json({ success: true, leadId: lead.id }, { status: 200 });
  } catch (error) {
    console.error("Lead submission error:", error);
    return NextResponse.json(
      { error: "Failed to process inquiry" },
      { status: 500 }
    );
  }
}
