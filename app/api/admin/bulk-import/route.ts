import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function slugify(text: string): string {
  return (text || "")
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

function parseJsonSafe(val: any, fallback: any = []) {
  if (!val) return fallback;
  if (typeof val === "object") return val;
  try {
    return JSON.parse(val);
  } catch {
    if (typeof val === "string" && val.includes("|")) {
      return val.split("|").map((s) => s.trim()).filter(Boolean);
    }
    if (typeof val === "string" && val.includes(",")) {
      return val.split(",").map((s) => s.trim()).filter(Boolean);
    }
    return [val.trim()];
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { section, items } = body;

    if (!section || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Section and items array are required." },
        { status: 400 }
      );
    }

    const results = {
      total: items.length,
      imported: 0,
      errors: [] as { row: number; name?: string; error: string }[],
    };

    const timestamp = Date.now();

    for (let i = 0; i < items.length; i++) {
      const row = items[i];
      const rowIndex = i + 1;

      try {
        if (section === "rent-a-car" || section === "cars") {
          const name = (row.name || row.Name || row.title || row.Title || "").toString().trim();
          if (!name) throw new Error("Car name is required");

          let slug = slugify(row.slug || row.Slug || name);
          if (!slug) slug = `car-${timestamp}-${i}`;
          
          // Check slug uniqueness
          const existing = await prisma.carService.findUnique({ where: { slug } });
          if (existing) {
            slug = `${slug}-${timestamp.toString().slice(-4)}${i}`;
          }

          const pricePkr = (row.pricePkr || row.PricePKR || row.price_pkr || "").toString().trim();
          const priceBhd = (row.priceBhd || row.PriceBHD || row.price_bhd || "").toString().trim();
          const basePriceStr = (row.basePrice || row.BasePrice || row.price || row.Price || "").toString().trim();

          let basePrice = basePriceStr;
          if (pricePkr || priceBhd) {
            basePrice = JSON.stringify({
              pkr: pricePkr,
              bhd: priceBhd,
              text: basePriceStr || pricePkr || priceBhd,
            });
          }

          const options = parseJsonSafe(row.options || row.Options, [
            {
              name: "Daily Rental",
              price: pricePkr || priceBhd || "Contact for quote",
              pricePkr: pricePkr,
              priceBhd: priceBhd,
              period: "Per Day",
              capacity: row.capacity || "5 Passengers",
              badge: "Popular",
              desc: "Includes insurance, standard mileage, 24/7 breakdown assistance.",
            },
          ]);

          const gallery = parseJsonSafe(row.gallery || row.Gallery, []);

          await prisma.carService.create({
            data: {
              name,
              slug,
              tag: (row.tag || row.Tag || row.category || row.Category || "Luxury & Executive").toString().trim(),
              image: (row.image || row.Image || row.imageUrl || "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=800").toString().trim(),
              basePrice,
              pricePkr: pricePkr || "",
              priceBhd: priceBhd || "",
              description: (row.description || row.Description || `${name} luxury rental service.`).toString().trim(),
              about: (row.about || row.About || row.description || `${name} premium fleet rental with chauffeur or self-drive options.`).toString().trim(),
              options,
              gallery,
              isActive: row.isActive !== undefined ? Boolean(row.isActive) : true,
              sortOrder: Number(row.sortOrder) || 0,
            },
          });
          results.imported++;
        } else if (section === "visas") {
          const name = (row.name || row.Name || row.title || row.Title || "").toString().trim();
          if (!name) throw new Error("Visa name is required");

          let slug = slugify(row.slug || row.Slug || name);
          if (!slug) slug = `visa-${timestamp}-${i}`;

          const existing = await prisma.visaListing.findUnique({ where: { slug } });
          if (existing) {
            slug = `${slug}-${timestamp.toString().slice(-4)}${i}`;
          }

          const pricePkr = (row.pricePkr || row.PricePKR || row.price_pkr || "").toString().trim();
          const priceBhd = (row.priceBhd || row.PriceBHD || row.price_bhd || "").toString().trim();

          const reqs = parseJsonSafe(row.requirements || row.Requirements, [
            "Original Passport with min 6 months validity",
            "Passport-size photograph (white background)",
            "National ID Card copy",
          ]);

          const includedItems = parseJsonSafe(row.included || row.Included, [
            "Government Visa Application Fees",
            "Immigration Clearance & Verification",
            "Express E-Visa Delivery via Email & WhatsApp",
          ]);

          const pricingData = {
            items: includedItems,
            pricePkr: pricePkr,
            priceBhd: priceBhd,
            options: parseJsonSafe(row.options || row.Options, []),
          };

          const steps = parseJsonSafe(row.processSteps || row.ProcessSteps, [
            { step: "01", title: "Submit Application", desc: "Send your passport scan and basic travel details." },
            { step: "02", title: "Document Verification", desc: "Our visa specialists prepare and verify your file." },
            { step: "03", title: "Visa Issuance", desc: "Receive your authentic verified visa promptly." },
          ]);

          await prisma.visaListing.create({
            data: {
              name,
              slug,
              country: (row.country || row.Country || name.split(" ")[0] || "Global").toString().trim(),
              flag: (row.flag || row.Flag || "🌐").toString().trim(),
              region: (row.region || row.Region || "asia").toString().toLowerCase().trim(),
              regionName: (row.regionName || row.RegionName || "International Visas").toString().trim(),
              type: (row.type || row.Type || "Tourist / Business E-Visa").toString().trim(),
              processingTime: (row.processingTime || row.ProcessingTime || "2 - 4 Working Days").toString().trim(),
              entryType: (row.entryType || row.EntryType || "Single / Multiple Entry").toString().trim(),
              validity: (row.validity || row.Validity || "30 to 90 Days").toString().trim(),
              heroImage: (row.heroImage || row.HeroImage || row.image || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=800").toString().trim(),
              cardImage: (row.cardImage || row.CardImage || row.image || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=800").toString().trim(),
              tagline: (row.tagline || row.Tagline || "Fast, reliable and 100% genuine visa processing.").toString().trim(),
              overview: (row.overview || row.Overview || row.description || `${name} hassle-free processing with complete documentation guidance.`).toString().trim(),
              pricePkr: pricePkr || "",
              priceBhd: priceBhd || "",
              options: parseJsonSafe(row.options || row.Options, []),
              requirements: reqs,
              processSteps: steps,
              included: pricingData,
              isActive: row.isActive !== undefined ? Boolean(row.isActive) : true,
              sortOrder: Number(row.sortOrder) || 0,
            },
          });
          results.imported++;
        } else if (section === "travel-tours" || section === "tours") {
          const name = (row.name || row.Name || row.title || row.Title || "").toString().trim();
          if (!name) throw new Error("Tour package name is required");

          let slug = slugify(row.slug || row.Slug || name);
          if (!slug) slug = `tour-${timestamp}-${i}`;

          const existing = await prisma.tourService.findUnique({ where: { slug } });
          if (existing) {
            slug = `${slug}-${timestamp.toString().slice(-4)}${i}`;
          }

          const pricePkr = (row.pricePkr || row.PricePKR || row.price_pkr || "").toString().trim();
          const priceBhd = (row.priceBhd || row.PriceBHD || row.price_bhd || "").toString().trim();
          const basePriceStr = (row.basePrice || row.BasePrice || row.price || "").toString().trim();

          let basePrice = basePriceStr;
          if (pricePkr || priceBhd) {
            basePrice = JSON.stringify({
              pkr: pricePkr,
              bhd: priceBhd,
              text: basePriceStr || pricePkr || priceBhd,
            });
          }

          const options = parseJsonSafe(row.options || row.Options, [
            {
              name: "Standard Package",
              price: pricePkr || priceBhd || "Call for pricing",
              pricePkr,
              priceBhd,
              period: row.duration || "Per Person",
              capacity: "All Group Sizes",
              badge: "Featured",
              desc: "Includes flight assistance, hotel stay, transport & visa handling.",
            },
          ]);

          await prisma.tourService.create({
            data: {
              name,
              slug,
              tag: (row.tag || row.Tag || row.category || "Umrah & Holiday Tours").toString().trim(),
              image: (row.image || row.Image || "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=800").toString().trim(),
              basePrice,
              pricePkr: pricePkr || "",
              priceBhd: priceBhd || "",
              description: (row.description || row.Description || `${name} complete travel experience package.`).toString().trim(),
              about: (row.about || row.About || row.description || `${name} curated travel experience by Arizona International.`).toString().trim(),
              options,
              gallery: parseJsonSafe(row.gallery || row.Gallery, []),
              isActive: row.isActive !== undefined ? Boolean(row.isActive) : true,
              sortOrder: Number(row.sortOrder) || 0,
            },
          });
          results.imported++;
        } else if (section === "mobiles-tech" || section === "mobiles") {
          const name = (row.name || row.Name || row.title || row.Title || "").toString().trim();
          if (!name) throw new Error("Product model/name is required");

          let slug = slugify(row.slug || row.Slug || name);
          if (!slug) slug = `tech-${timestamp}-${i}`;

          const existing = await prisma.mobileProduct.findUnique({ where: { slug } });
          if (existing) {
            slug = `${slug}-${timestamp.toString().slice(-4)}${i}`;
          }

          const pricePkr = (row.pricePkr || row.PricePKR || row.price_pkr || "").toString().trim();
          const priceBhd = (row.priceBhd || row.PriceBHD || row.price_bhd || "").toString().trim();
          const basePriceStr = (row.basePrice || row.BasePrice || row.price || "").toString().trim();

          let basePrice = basePriceStr;
          if (pricePkr || priceBhd) {
            basePrice = JSON.stringify({
              pkr: pricePkr,
              bhd: priceBhd,
              text: basePriceStr || pricePkr || priceBhd,
            });
          }

          const options = parseJsonSafe(row.options || row.Options, [
            {
              name: "Standard Edition",
              price: pricePkr || priceBhd || "Contact for wholesale rate",
              pricePkr,
              priceBhd,
              period: "Brand New / Sealed",
              capacity: "Factory Unlocked",
              badge: "Official Warranty",
              desc: "100% Genuine, Sealed Box with official international / local warranty.",
            },
          ]);

          await prisma.mobileProduct.create({
            data: {
              name,
              slug,
              brand: (row.brand || row.Brand || "Apple / Samsung / Tech").toString().trim(),
              tag: (row.tag || row.Tag || row.category || "Flagship Smartphones").toString().trim(),
              image: (row.image || row.Image || "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800").toString().trim(),
              basePrice,
              pricePkr: pricePkr || "",
              priceBhd: priceBhd || "",
              description: (row.description || row.Description || `${name} original tech hardware & electronics.`).toString().trim(),
              about: (row.about || row.About || row.description || `${name} flagship hardware backed by genuine warranty and fast fulfillment.`).toString().trim(),
              options,
              gallery: parseJsonSafe(row.gallery || row.Gallery, []),
              isActive: row.isActive !== undefined ? Boolean(row.isActive) : true,
              sortOrder: Number(row.sortOrder) || 0,
            },
          });
          results.imported++;
        } else if (section === "bahrain-services" || section === "bahrain") {
          const name = (row.name || row.Name || row.title || row.Title || "").toString().trim();
          if (!name) throw new Error("Service name is required");

          let slug = slugify(row.slug || row.Slug || name);
          if (!slug) slug = `bahrain-${timestamp}-${i}`;

          const existing = await prisma.bahrainService.findUnique({ where: { slug } });
          if (existing) {
            slug = `${slug}-${timestamp.toString().slice(-4)}${i}`;
          }

          const pricePkr = (row.pricePkr || row.PricePKR || row.price_pkr || "").toString().trim();
          const priceBhd = (row.priceBhd || row.PriceBHD || row.price_bhd || "").toString().trim();
          const basePriceStr = (row.basePrice || row.BasePrice || row.price || "").toString().trim();

          let basePrice = basePriceStr;
          if (pricePkr || priceBhd) {
            basePrice = JSON.stringify({
              pkr: pricePkr,
              bhd: priceBhd,
              text: basePriceStr || pricePkr || priceBhd,
            });
          }

          const options = parseJsonSafe(row.options || row.Options, [
            {
              name: "Full Service Package",
              price: pricePkr || priceBhd || "Consultation upon request",
              pricePkr,
              priceBhd,
              period: "End-to-End Setup",
              capacity: "Corporate",
              badge: "Government Verified",
              desc: "Complete documentation, official approvals, and government liaison.",
            },
          ]);

          await prisma.bahrainService.create({
            data: {
              name,
              slug,
              tag: (row.tag || row.Tag || row.category || "CR & Company Formation").toString().trim(),
              image: (row.image || row.Image || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800").toString().trim(),
              basePrice,
              pricePkr: pricePkr || "",
              priceBhd: priceBhd || "",
              description: (row.description || row.Description || `${name} corporate solutions in the Kingdom of Bahrain.`).toString().trim(),
              about: (row.about || row.About || row.description || `${name} end-to-end consulting for investors and entrepreneurs.`).toString().trim(),
              options,
              gallery: parseJsonSafe(row.gallery || row.Gallery, []),
              isActive: row.isActive !== undefined ? Boolean(row.isActive) : true,
              sortOrder: Number(row.sortOrder) || 0,
            },
          });
          results.imported++;
        } else if (section === "blogs") {
          const title = (row.title || row.Title || row.name || row.Name || "").toString().trim();
          if (!title) throw new Error("Blog title is required");

          let slug = slugify(row.slug || row.Slug || title);
          if (!slug) slug = `article-${timestamp}-${i}`;

          const existing = await prisma.blogPost.findUnique({ where: { slug } });
          if (existing) {
            slug = `${slug}-${timestamp.toString().slice(-4)}${i}`;
          }

          const content = (row.content || row.Content || row.body || row.description || `Comprehensive guide on ${title}. Contact Arizona International Group for specialized advisory.`).toString().trim();
          const excerpt = (row.excerpt || row.Excerpt || content.slice(0, 160) + "...").toString().trim();

          const tags = parseJsonSafe(row.tags || row.Tags, ["Arizona", "Consultancy", "Guide"]);

          await prisma.blogPost.create({
            data: {
              title,
              slug,
              excerpt,
              content,
              category: (row.category || row.Category || "General Guides").toString().trim(),
              coverImage: (row.coverImage || row.CoverImage || row.image || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800").toString().trim(),
              author: (row.author || row.Author || "Arizona Editorial Team").toString().trim(),
              authorRole: (row.authorRole || row.AuthorRole || "Immigration & Business Consultant").toString().trim(),
              readTime: (row.readTime || row.ReadTime || "5 min read").toString().trim(),
              tags,
              metaTitle: (row.metaTitle || row.MetaTitle || title).toString().trim(),
              metaDescription: (row.metaDescription || row.MetaDescription || excerpt).toString().trim(),
              isPublished: row.isPublished !== undefined ? Boolean(row.isPublished) : true,
              isFeatured: row.isFeatured !== undefined ? Boolean(row.isFeatured) : false,
            },
          });
          results.imported++;
        } else {
          throw new Error(`Unknown section: ${section}`);
        }
      } catch (err: any) {
        console.error(`Error importing row ${rowIndex}:`, err);
        results.errors.push({
          row: rowIndex,
          name: row.name || row.Name || row.title || `Row ${rowIndex}`,
          error: err?.message || "Failed to process row",
        });
      }
    }

    return NextResponse.json({
      success: true,
      imported: results.imported,
      total: results.total,
      errors: results.errors,
      message: `Successfully imported ${results.imported} of ${results.total} records!`,
    });
  } catch (error: any) {
    console.error("Bulk import API error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Internal server error during bulk import." },
      { status: 500 }
    );
  }
}
