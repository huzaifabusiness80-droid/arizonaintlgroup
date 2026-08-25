import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function formatMobileItem(item: any) {
  if (!item) return item;
  let pricePkr = "";
  let priceBhd = "";
  let displayPrice = item.basePrice || "";

  try {
    if (item.basePrice && item.basePrice.startsWith("{")) {
      const parsed = JSON.parse(item.basePrice);
      pricePkr = parsed.pkr || "";
      priceBhd = parsed.bhd || "";
      displayPrice = parsed.text || parsed.pkr || parsed.bhd || "";
    }
  } catch {}

  return {
    ...item,
    pricePkr,
    priceBhd,
    basePrice: displayPrice,
  };
}

function sanitizeMobileData(body: any) {
  const data: any = {};
  if (body.name !== undefined) data.name = body.name || "Untitled Product";
  if (body.brand !== undefined) data.brand = body.brand || "";
  if (body.slug !== undefined) data.slug = body.slug;
  if (body.description !== undefined) data.description = body.description || "";
  if (body.tag !== undefined) data.tag = body.tag || "";
  if (body.image !== undefined) data.image = body.image || "";

  if (body.pricePkr !== undefined || body.priceBhd !== undefined || body.basePrice !== undefined) {
    data.basePrice = JSON.stringify({
      pkr: body.pricePkr || "",
      bhd: body.priceBhd || "",
      text: body.basePrice || "",
    });
  }

  if (body.about !== undefined) data.about = body.about || "";
  if (body.options !== undefined) data.options = Array.isArray(body.options) ? body.options : [];
  if (body.gallery !== undefined) data.gallery = Array.isArray(body.gallery) ? body.gallery : [];
  if (body.isActive !== undefined) data.isActive = Boolean(body.isActive);
  if (body.sortOrder !== undefined) data.sortOrder = typeof body.sortOrder === "number" ? body.sortOrder : 0;
  return data;
}

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.mobileProduct.findUnique({ where: { id } });
  if (!item) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true, item: formatMobileItem(item) });
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const body = await request.json();
    const cleanData = sanitizeMobileData(body);
    const item = await prisma.mobileProduct.update({
      where: { id },
      data: { ...cleanData, updatedAt: new Date() },
    });
    return NextResponse.json({ success: true, item: formatMobileItem(item) });
  } catch (error: any) {
    console.error("Error updating mobile product:", error);
    return NextResponse.json({ success: false, error: error?.message || "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    await prisma.mobileProduct.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || "Failed to delete product" }, { status: 500 });
  }
}
