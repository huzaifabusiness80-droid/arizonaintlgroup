import React from "react";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { businessDivisionsData, ServiceItemDetail } from "@/lib/data";
import { prisma } from "@/lib/prisma";
import ServiceItemDetailClient from "./ServiceItemDetailClient";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; itemSlug: string }>;
}) {
  const { slug, itemSlug } = await params;
  const division = businessDivisionsData.find((d) => d.slug === slug);
  if (!division) return { title: "Item Not Found" };

  let name = "";
  let description = "";

  try {
    let dbItem: any = null;
    if (slug === "rent-a-car") {
      dbItem = await prisma.carService.findUnique({ where: { slug: itemSlug } });
    } else if (slug === "travel-tours") {
      dbItem = await prisma.tourService.findUnique({ where: { slug: itemSlug } });
    } else if (slug === "mobiles-tech") {
      dbItem = await prisma.mobileProduct.findUnique({ where: { slug: itemSlug } });
    } else if (slug === "business-bahrain") {
      dbItem = await prisma.bahrainService.findUnique({ where: { slug: itemSlug } });
    }

    if (dbItem) {
      name = dbItem.name;
      description = dbItem.description;
    }
  } catch {}

  if (!name) {
    const item = division.servicesList.find((s) => s.slug === itemSlug);
    if (item) {
      name = item.name;
      description = item.desc;
    }
  }

  if (!name) return { title: "Item Not Found" };

  return {
    title: `${name} | ${division.title} | Arizona International Group`,
    description: description,
  };
}

export default async function ServiceItemDetailPage({
  params,
}: {
  params: Promise<{ slug: string; itemSlug: string }>;
}) {
  const { slug, itemSlug } = await params;
  const division = businessDivisionsData.find((d) => d.slug === slug);
  if (!division) notFound();

  let item: ServiceItemDetail | null = null;

  try {
    let dbItem: any = null;
    if (slug === "rent-a-car") {
      dbItem = await prisma.carService.findUnique({ where: { slug: itemSlug } });
    } else if (slug === "travel-tours") {
      dbItem = await prisma.tourService.findUnique({ where: { slug: itemSlug } });
    } else if (slug === "mobiles-tech") {
      dbItem = await prisma.mobileProduct.findUnique({ where: { slug: itemSlug } });
    } else if (slug === "business-bahrain") {
      dbItem = await prisma.bahrainService.findUnique({ where: { slug: itemSlug } });
    }

    if (dbItem) {
      item = {
        slug: dbItem.slug,
        name: dbItem.name,
        desc: dbItem.description || "",
        tag: dbItem.tag || "",
        image: dbItem.image || "",
        price: dbItem.basePrice || "",
        gallery: Array.isArray(dbItem.gallery) && dbItem.gallery.length > 0 ? dbItem.gallery : [dbItem.image || ""],
        options: Array.isArray(dbItem.options) ? (dbItem.options as any) : [],
        about: dbItem.about || dbItem.description || "",
      };
    }
  } catch (err) {
    console.error("DB error fetching service item:", err);
  }

  // Fallback to static data if not found in DB
  if (!item) {
    const staticItem = division.servicesList.find((s) => s.slug === itemSlug);
    if (staticItem) {
      item = staticItem;
    }
  }

  if (!item) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col justify-between">
      <Navbar />

      <main>
        <ServiceItemDetailClient division={division} item={item} />
      </main>

      <Footer />
    </div>
  );
}
