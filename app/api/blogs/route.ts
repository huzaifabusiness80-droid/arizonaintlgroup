import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const featured = searchParams.get("featured");
    const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!) : 50;

    const where: any = {
      isPublished: true,
    };

    if (category && category !== "ALL") {
      where.category = { equals: category, mode: "insensitive" };
    }

    if (featured === "true") {
      where.isFeatured = true;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { excerpt: { contains: search, mode: "insensitive" } },
      ];
    }

    const [items, total, categoriesCount] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
        take: limit,
      }),
      prisma.blogPost.count({ where }),
      prisma.blogPost.groupBy({
        by: ["category"],
        where: { isPublished: true },
        _count: { _all: true },
      }),
    ]);

    return NextResponse.json({
      success: true,
      items,
      total,
      categoriesCount,
    });
  } catch (error: any) {
    console.error("Public blogs API error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to fetch articles" },
      { status: 500 }
    );
  }
}
