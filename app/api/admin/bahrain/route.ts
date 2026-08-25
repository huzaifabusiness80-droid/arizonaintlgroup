import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function formatBahrainItem(item: any) {
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

function sanitizeBahrainData(body: any) {
  const name = body.name || "Untitled Service";
  const slug = (body.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")) || "bahrain-service";

  let basePrice = body.basePrice || "";
  if (body.pricePkr || body.priceBhd) {
    basePrice = JSON.stringify({
      pkr: body.pricePkr || "",
      bhd: body.priceBhd || "",
      text: body.basePrice || "",
    });
  }

  return {
    slug,
    name,
    description: body.description || "",
    tag: body.tag || "",
    image: body.image || "",
    basePrice,
    about: body.about || body.description || "",
    options: Array.isArray(body.options) ? body.options : [],
    gallery: Array.isArray(body.gallery) ? body.gallery : [],
    isActive: body.isActive !== undefined ? Boolean(body.isActive) : true,
    sortOrder: typeof body.sortOrder === "number" ? body.sortOrder : 0,
  };
}

export async function GET() {
  try {
    const rawItems = await prisma.bahrainService.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });
    const items = rawItems.map(formatBahrainItem);
    return NextResponse.json({ success: true, items });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || "Failed to fetch services" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = sanitizeBahrainData(body);
    const item = await prisma.bahrainService.create({ data });
    return NextResponse.json({ success: true, item: formatBahrainItem(item) });
  } catch (error: any) {
    console.error("Error creating bahrain service:", error);
    return NextResponse.json({ success: false, error: error?.message || "Failed to create service" }, { status: 500 });
  }
}
