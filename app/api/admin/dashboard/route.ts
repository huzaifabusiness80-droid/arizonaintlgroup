import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [visas, cars, tours, mobiles, bahrain, blogs, users, bookings, inquiries] = await Promise.all([
      prisma.visaListing.count(),
      prisma.carService.count(),
      prisma.tourService.count(),
      prisma.mobileProduct.count(),
      prisma.bahrainService.count(),
      prisma.blogPost.count(),
      prisma.user.count(),
      prisma.booking.count(),
      prisma.inquiry.count({ where: { isRead: false } }),
    ]);

    const recentInquiries = await prisma.inquiry.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
    });

    const recentBookings = await prisma.booking.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
    });

    return NextResponse.json({
      success: true,
      stats: {
        visas,
        cars,
        tours,
        mobiles,
        bahrain,
        blogs,
        users,
        bookings,
        unreadInquiries: inquiries,
      },
      recentInquiries,
      recentBookings,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
