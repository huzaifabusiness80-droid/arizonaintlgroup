import React from "react";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { businessDivisionsData } from "@/lib/data";
import DivisionDetailClient from "./DivisionDetailClient";

export async function generateStaticParams() {
  return businessDivisionsData.map((d) => ({
    slug: d.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const division = businessDivisionsData.find((d) => d.slug === slug);
  if (!division) return { title: "Division Not Found" };

  return {
    title: `${division.title} | Arizona International Group`,
    description: division.overview,
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
      <Navbar />

      <main>
        <DivisionDetailClient division={division} />
      </main>

      <Footer />
    </div>
  );
}
