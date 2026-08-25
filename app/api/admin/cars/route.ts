import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function sanitizeCarData(body: any) {
  const name = body.name || "Untitled Car Service";
  const slug = (body.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")) || "car-rental";

  return {
    slug,
    name,
    description: body.description || "",
    tag: body.tag || "",
    image: body.image || "",
    basePrice: body.basePrice || "",
    about: body.about || body.description || "",
    options: Array.isArray(body.options) ? body.options : [],
    gallery: Array.isArray(body.gallery) ? body.gallery : [],
    isActive: body.isActive !== undefined ? Boolean(body.isActive) : true,
    sortOrder: typeof body.sortOrder === "number" ? body.sortOrder : 0,
  };
}

export async function GET() {
  try {
    const items = await prisma.carService.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });
    return NextResponse.json({ success: true, items });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || "Failed to fetch cars" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = sanitizeCarData(body);
    const item = await prisma.carService.create({ data });
    return NextResponse.json({ success: true, item });
  } catch (error: any) {
    console.error("Error creating car service:", error);
    return NextResponse.json({ success: false, error: error?.message || "Failed to create car service" }, { status: 500 });
  }
}
