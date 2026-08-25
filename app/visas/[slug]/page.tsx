import React from "react";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { allVisasData, VisaDetail } from "@/lib/data";
import { prisma } from "@/lib/prisma";
import VisaDetailClient from "./VisaDetailClient";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let name = "";
  let overview = "";

  try {
    const dbVisa = await prisma.visaListing.findUnique({ where: { slug } });
    if (dbVisa) {
      name = dbVisa.name;
      overview = dbVisa.overview || dbVisa.tagline || "";
    }
  } catch {}

  if (!name) {
    const staticVisa = allVisasData.find((v) => v.slug === slug);
    if (staticVisa) {
      name = staticVisa.name;
      overview = staticVisa.overview;
    }
  }

  if (!name) return { title: "Visa Not Found" };

  return {
    title: `${name} | Arizona International Group`,
    description: overview,
  };
}

export default async function VisaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let visa: VisaDetail | null = null;

  try {
    const dbVisa = await prisma.visaListing.findUnique({ where: { slug } });
    if (dbVisa) {
      const v = dbVisa as any;
      visa = {
        slug: v.slug,
        country: v.country || "",
        flag: v.flag || "🌐",
        name: v.name,
        region: (v.region as any) || "asia",
        regionName: v.regionName || "",
        type: v.type || "Visa",
        time: v.processingTime || "",
        entryType: v.entryType || "",
        validity: v.validity || "",
        heroImage: v.heroImage || "",
        cardImage: v.cardImage || "",
        tagline: v.tagline || "",
        overview: v.overview || "",
        pricePkr: v.pricePkr || "",
        priceBhd: v.priceBhd || "",
        options: Array.isArray(v.options) ? (v.options as any[]) : [],
        requirements: Array.isArray(v.requirements) ? (v.requirements as string[]) : [],
        processSteps: Array.isArray(v.processSteps) ? (v.processSteps as any[]) : [],
        included: Array.isArray(v.included) ? (v.included as string[]) : [],
      } as any;
    }
  } catch (err) {
    console.error("DB error fetching visa detail:", err);
  }

  // Fallback to static data if not found in database
  if (!visa) {
    const staticVisa = allVisasData.find((v) => v.slug === slug);
    if (staticVisa) {
      visa = staticVisa;
    }
  }

  if (!visa) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col justify-between">
      <Navbar />

      <main>
        <VisaDetailClient visa={visa} />
      </main>

      <Footer />
    </div>
  );
}
