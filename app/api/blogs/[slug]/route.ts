import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const item = await prisma.blogPost.findUnique({
      where: { slug },
    });

    if (!item || !item.isPublished) {
      return NextResponse.json(
        { success: false, error: "Article not found" },
        { status: 404 }
      );
    }

    // Fire and forget view increment
    prisma.blogPost
      .update({
        where: { id: item.id },
        data: { views: { increment: 1 } },
      })
      .catch(() => {});

    // Fetch related articles in same category
    const related = await prisma.blogPost.findMany({
      where: {
        category: item.category,
        isPublished: true,
        NOT: { id: item.id },
      },
      take: 3,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      item,
      related,
    });
  } catch (error: any) {
    console.error("Public blog slug API error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to fetch article" },
      { status: 500 }
    );
  }
}
