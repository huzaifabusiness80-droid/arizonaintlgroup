import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken, USER_COOKIE_NAME } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get(USER_COOKIE_NAME)?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, user: null, message: "Not authenticated" },
        { status: 401 }
      );
    }

    const payload = verifyToken(token);
    if (!payload || !payload.userId) {
      return NextResponse.json(
        { success: false, user: null, message: "Invalid or expired session" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        country: true,
        city: true,
        avatar: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, user: null, message: "User not found" },
        { status: 404 }
      );
    }

    // Get count of bookings & inquiries for this user
    const [bookingsCount, inquiriesCount] = await Promise.all([
      prisma.booking.count({
        where: {
          OR: [{ userId: user.id }, { customerEmail: user.email }],
        },
      }),
      prisma.inquiry.count({
        where: {
          OR: [{ userId: user.id }, { email: user.email }],
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      user: {
        ...user,
        stats: {
          bookingsCount,
          inquiriesCount,
        },
      },
    });
  } catch (error: any) {
    console.error("Auth Me Error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to fetch user session" },
      { status: 500 }
    );
  }
}
