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
      visa = {
        slug: dbVisa.slug,
        country: dbVisa.country || "",
        flag: dbVisa.flag || "🌐",
        name: dbVisa.name,
        region: (dbVisa.region as any) || "asia",
        regionName: dbVisa.regionName || "",
        type: dbVisa.type || "Visa",
        time: dbVisa.processingTime || "",
        entryType: dbVisa.entryType || "",
        validity: dbVisa.validity || "",
        heroImage: dbVisa.heroImage || "",
        cardImage: dbVisa.cardImage || "",
        tagline: dbVisa.tagline || "",
        overview: dbVisa.overview || "",
        requirements: Array.isArray(dbVisa.requirements) ? (dbVisa.requirements as string[]) : [],
        processSteps: Array.isArray(dbVisa.processSteps) ? (dbVisa.processSteps as any[]) : [],
        included: Array.isArray(dbVisa.included) ? (dbVisa.included as string[]) : [],
      };
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
