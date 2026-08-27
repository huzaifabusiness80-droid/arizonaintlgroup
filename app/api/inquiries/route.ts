import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendInquiryEmail } from "@/lib/mailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, service, message, country } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: "Name and phone are required" },
        { status: 400 }
      );
    }

    const cleanName = name.trim();
    const cleanPhone = phone.trim();
    const cleanEmail = (email || "").trim();
    const cleanService = service || "General Inquiry";
    const cleanMessage = (message || "").trim();
    const cleanCountry = country || "Unknown";

    // 1. Save inquiry into Database
    const inquiry = await prisma.inquiry.create({
      data: {
        name: cleanName,
        phone: cleanPhone,
        email: cleanEmail,
        service: cleanService,
        message: cleanMessage,
        country: cleanCountry,
        status: "NEW",
        isRead: false,
      },
    });

    // 2. Send instant email notification via Nodemailer
    try {
      await sendInquiryEmail({
        name: cleanName,
        phone: cleanPhone,
        email: cleanEmail,
        service: cleanService,
        message: cleanMessage,
        country: cleanCountry,
      });
    } catch (mailErr) {
      console.error("Email notification dispatch error:", mailErr);
      // Non-blocking so customer still gets success response
    }

    return NextResponse.json({
      success: true,
      message: "Inquiry saved and notification dispatched successfully",
      inquiry,
    });
  } catch (error: any) {
    console.error("Inquiry creation error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const items = await prisma.inquiry.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    return NextResponse.json({ success: true, items });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to fetch inquiries" },
      { status: 500 }
    );
  }
}
