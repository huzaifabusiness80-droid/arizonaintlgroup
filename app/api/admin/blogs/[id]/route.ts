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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const item = await prisma.blogPost.findUnique({
      where: { id },
    });

    if (!item) {
      return NextResponse.json(
        { success: false, error: "Article not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, item });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to fetch article" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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

    let slug = customSlug ? slugify(customSlug) : undefined;

    // Check slug collision if changing
    if (slug) {
      const existing = await prisma.blogPost.findFirst({
        where: { slug, NOT: { id } },
      });
      if (existing) {
        slug = `${slug}-${Date.now().toString().slice(-4)}`;
      }
    }

    const updated = await prisma.blogPost.update({
      where: { id },
      data: {
        ...(title ? { title: title.trim() } : {}),
        ...(slug ? { slug } : {}),
        ...(excerpt !== undefined ? { excerpt: excerpt.trim() } : {}),
        ...(content !== undefined ? { content: content.trim() } : {}),
        ...(coverImage !== undefined ? { coverImage: coverImage.trim() } : {}),
        ...(category ? { category } : {}),
        ...(author ? { author: author.trim() } : {}),
        ...(authorRole !== undefined ? { authorRole: authorRole.trim() } : {}),
        ...(readTime ? { readTime: readTime.trim() } : {}),
        ...(tags !== undefined ? { tags: Array.isArray(tags) ? tags : [] } : {}),
        ...(metaTitle !== undefined ? { metaTitle: metaTitle?.trim() || null } : {}),
        ...(metaDescription !== undefined ? { metaDescription: metaDescription?.trim() || null } : {}),
        ...(isPublished !== undefined ? { isPublished: Boolean(isPublished) } : {}),
        ...(isFeatured !== undefined ? { isFeatured: Boolean(isFeatured) } : {}),
      },
    });

    return NextResponse.json({ success: true, item: updated });
  } catch (error: any) {
    console.error("Failed to update article:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to update article" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.blogPost.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Article deleted successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to delete article" },
      { status: 500 }
    );
  }
}
