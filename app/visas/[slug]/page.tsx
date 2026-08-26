import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { allVisasData, VisaDetail } from "@/lib/data";
import { prisma } from "@/lib/prisma";
import VisaDetailClient from "./VisaDetailClient";
import JsonLd from "@/components/JsonLd";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  let name = "";
  let overview = "";
  let country = "";
  let heroImage = "";

  try {
    const dbVisa = await prisma.visaListing.findUnique({ where: { slug } });
    if (dbVisa) {
      name = dbVisa.name;
      overview = dbVisa.overview || dbVisa.tagline || "";
      country = dbVisa.country || "";
      heroImage = dbVisa.heroImage || "";
    }
  } catch {}

  if (!name) {
    const staticVisa = allVisasData.find((v) => v.slug === slug);
    if (staticVisa) {
      name = staticVisa.name;
      overview = staticVisa.overview;
      country = staticVisa.country;
      heroImage = staticVisa.heroImage;
    }
  }

  if (!name) return { title: "Visa Not Found" };

  const siteUrl = "https://arizonaintlgroup.com";
  const url = `${siteUrl}/visas/${slug}`;

  return {
    title: `${name} Application & Processing | Arizona International`,
    description:
      overview ||
      `Apply for ${name} with fast approval rates. Arizona provides complete embassy documentation, verified flight/hotel vouchers, and express submission from Pakistan and Bahrain.`,
    keywords: [
      name,
      `${country} visa`,
      `${country} tourist visa from Pakistan`,
      `${country} visa from Bahrain`,
      `${country} visa requirements and fees`,
      `${name} processing time`,
      "Arizona International Group",
      "Visa consultancy",
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${name} | Arizona International Group`,
      description: overview,
      url: url,
      images: heroImage
        ? [
            {
              url: heroImage,
              width: 1200,
              height: 630,
              alt: name,
            },
          ]
        : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} | Arizona International`,
      description: overview,
      images: heroImage ? [heroImage] : [],
    },
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
      <JsonLd type="visa" data={visa} />
      <Navbar />

      <main>
        <VisaDetailClient visa={visa} />
      </main>

      <Footer />
    </div>
  );
}
