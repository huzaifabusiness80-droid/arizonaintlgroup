import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function sanitizeVisaData(body: any) {
  const data: any = {};
  if (body.name !== undefined) data.name = body.name || "Untitled Visa";
  if (body.slug !== undefined) data.slug = body.slug;
  if (body.country !== undefined) data.country = body.country || "";
  if (body.flag !== undefined) data.flag = body.flag || "";
  if (body.region !== undefined) data.region = body.region || "asia";
  if (body.regionName !== undefined) data.regionName = body.regionName || "";
  if (body.type !== undefined) data.type = body.type || "";
  if (body.processingTime !== undefined) data.processingTime = body.processingTime || "";
  if (body.entryType !== undefined) data.entryType = body.entryType || "";
  if (body.validity !== undefined) data.validity = body.validity || "";
  if (body.heroImage !== undefined) data.heroImage = body.heroImage || "";
  if (body.cardImage !== undefined) data.cardImage = body.cardImage || "";
  if (body.tagline !== undefined) data.tagline = body.tagline || "";
  if (body.overview !== undefined) data.overview = body.overview || "";
  if (body.pricePkr !== undefined) data.pricePkr = body.pricePkr || "";
  if (body.priceBhd !== undefined) data.priceBhd = body.priceBhd || "";
  if (body.options !== undefined) data.options = Array.isArray(body.options) ? body.options : [];
  if (body.requirements !== undefined) data.requirements = Array.isArray(body.requirements) ? body.requirements : [];
  if (body.processSteps !== undefined) data.processSteps = Array.isArray(body.processSteps) ? body.processSteps : [];
  if (body.included !== undefined) data.included = Array.isArray(body.included) ? body.included : [];
  if (body.isActive !== undefined) data.isActive = Boolean(body.isActive);
  if (body.sortOrder !== undefined) data.sortOrder = typeof body.sortOrder === "number" ? body.sortOrder : 0;
  return data;
}

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.visaListing.findUnique({ where: { id } });
  if (!item) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true, item });
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const body = await request.json();
    const cleanData = sanitizeVisaData(body);
    const item = await prisma.visaListing.update({
      where: { id },
      data: { ...cleanData, updatedAt: new Date() },
    });
    return NextResponse.json({ success: true, item });
  } catch (error: any) {
    console.error("Error updating visa:", error);
    return NextResponse.json({ success: false, error: error?.message || "Failed to update visa" }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    await prisma.visaListing.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || "Failed to delete visa" }, { status: 500 });
  }
}
