import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { businessDivisionsData } from "@/lib/data";
import DivisionDetailClient from "./DivisionDetailClient";
import JsonLd from "@/components/JsonLd";

export async function generateStaticParams() {
  return businessDivisionsData.map((d) => ({
    slug: d.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const division = businessDivisionsData.find((d) => d.slug === slug);
  if (!division) return { title: "Division Not Found" };

  const siteUrl = "https://arizonaintlgroup.com";
  const url = `${siteUrl}/services/${slug}`;

  return {
    title: `${division.title} | ${division.subtitle} - Arizona International`,
    description: division.overview,
    keywords: [
      division.title,
      division.category,
      `${division.title} Bahrain`,
      `${division.title} Pakistan`,
      ...division.servicesList.map((s) => s.name),
      "Arizona International Group",
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${division.title} | Arizona International Group`,
      description: division.overview,
      url: url,
      images: [
        {
          url: division.heroImage,
          width: 1200,
          height: 630,
          alt: division.title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${division.title} | Arizona International Group`,
      description: division.overview,
      images: [division.heroImage],
    },
  };
}

export default async function DivisionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const division = businessDivisionsData.find((d) => d.slug === slug);

  if (!division) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col justify-between">
      <JsonLd type="service" data={division} />
      <Navbar />

      <main>
        <DivisionDetailClient division={division} />
      </main>

      <Footer />
    </div>
  );
}
