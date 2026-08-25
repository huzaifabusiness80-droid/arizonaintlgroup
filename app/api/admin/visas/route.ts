import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function formatVisaItem(item: any) {
  if (!item) return item;
  let pricePkr = "";
  let priceBhd = "";
  let options: any[] = [];
  let included = Array.isArray(item.included) ? item.included : [];

  if (item.included && typeof item.included === "object" && !Array.isArray(item.included)) {
    pricePkr = item.included.pricePkr || "";
    priceBhd = item.included.priceBhd || "";
    options = Array.isArray(item.included.options) ? item.included.options : [];
    included = Array.isArray(item.included.items) ? item.included.items : [];
  }

  return {
    ...item,
    pricePkr,
    priceBhd,
    options,
    included,
  };
}

function sanitizeVisaData(body: any) {
  const name = body.name || "Untitled Visa";
  const slug = (body.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")) || "visa";

  // Persist dual pricing and options securely in JSON
  const rawIncluded = Array.isArray(body.included) ? body.included : [];
  const pricingData = {
    items: rawIncluded,
    pricePkr: body.pricePkr || "",
    priceBhd: body.priceBhd || "",
    options: Array.isArray(body.options) ? body.options : [],
  };

  return {
    slug,
    name,
    country: body.country || "",
    flag: body.flag || "",
    region: body.region || "asia",
    regionName: body.regionName || "",
    type: body.type || "",
    processingTime: body.processingTime || "",
    entryType: body.entryType || "",
    validity: body.validity || "",
    heroImage: body.heroImage || body.image || "",
    cardImage: body.cardImage || body.image || "",
    tagline: body.tagline || "",
    overview: body.overview || body.about || body.description || "",
    requirements: Array.isArray(body.requirements) ? body.requirements : [],
    processSteps: Array.isArray(body.processSteps) ? body.processSteps : [],
    included: pricingData,
    isActive: body.isActive !== undefined ? Boolean(body.isActive) : true,
    sortOrder: typeof body.sortOrder === "number" ? body.sortOrder : 0,
  };
}

export async function GET() {
  try {
    const rawItems = await prisma.visaListing.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });
    const items = rawItems.map(formatVisaItem);
    return NextResponse.json({ success: true, items });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || "Failed to fetch visas" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = sanitizeVisaData(body);

    const item = await prisma.visaListing.create({ data });
    return NextResponse.json({ success: true, item: formatVisaItem(item) });
  } catch (error: any) {
    console.error("Error creating visa:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to create visa listing" },
      { status: 500 }
    );
  }
}
