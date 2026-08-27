import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    const where: any = {};
    if (category && category !== "ALL") {
      where.category = category;
    }
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { excerpt: { contains: search, mode: "insensitive" } },
      ];
    }

    const items = await prisma.blogPost.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, items });
  } catch (error: any) {
    console.error("Failed to fetch admin blogs:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      slug: customSlug,
      excerpt,
      content,
      coverImage,
      category,
      author,
      authorRole,
      readTime,
      tags,
      metaTitle,
      metaDescription,
      isPublished,
      isFeatured,
    } = body;

    if (!title || !content) {
      return NextResponse.json(
        { success: false, error: "Title and content are required." },
        { status: 400 }
      );
    }

    let slug = customSlug ? slugify(customSlug) : slugify(title);
    if (!slug) slug = `article-${Date.now()}`;

    // Check slug uniqueness
    const existing = await prisma.blogPost.findUnique({ where: { slug } });
    if (existing) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const blog = await prisma.blogPost.create({
      data: {
        title: title.trim(),
        slug,
        excerpt: (excerpt || "").trim(),
        content: content.trim(),
        coverImage: (coverImage || "").trim(),
        category: category || "General Guides",
        author: (author || "Arizona Editorial Team").trim(),
        authorRole: (authorRole || "Immigration & Travel Consultant").trim(),
        readTime: (readTime || "5 min read").trim(),
        tags: Array.isArray(tags) ? tags : [],
        metaTitle: metaTitle ? metaTitle.trim() : null,
        metaDescription: metaDescription ? metaDescription.trim() : null,
        isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
        isFeatured: Boolean(isFeatured),
      },
    });

    return NextResponse.json({ success: true, item: blog });
  } catch (error: any) {
    console.error("Failed to create blog post:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to create blog post" },
      { status: 500 }
    );
  }
}
