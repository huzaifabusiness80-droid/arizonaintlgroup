import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken, USER_COOKIE_NAME } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get(USER_COOKIE_NAME)?.value;
    if (!token) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload?.userId) {
      return NextResponse.json({ success: false, error: "Invalid session" }, { status: 401 });
    }

    // Fetch user email
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, email: true },
    });

    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    // Find all bookings matching user ID or email
    const bookings = await prisma.booking.findMany({
      where: {
        OR: [{ userId: user.id }, { customerEmail: user.email }],
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      items: bookings,
    });
  } catch (error: any) {
    console.error("User Bookings Fetch Error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to fetch bookings." },
      { status: 500 }
    );
  }
}
