import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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

    const inquiry = await prisma.inquiry.create({
      data: {
        name: name.trim(),
        phone: phone.trim(),
        email: (email || "").trim(),
        service: service || "General Inquiry",
        message: (message || "").trim(),
        country: country || "Unknown",
        status: "NEW",
        isRead: false,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Inquiry saved successfully",
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
