import React from "react";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { allVisasData } from "@/lib/data";
import VisaDetailClient from "./VisaDetailClient";

export async function generateStaticParams() {
  return allVisasData.map((v) => ({
    slug: v.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const visa = allVisasData.find((v) => v.slug === slug);
  if (!visa) return { title: "Visa Not Found" };

  return {
    title: `${visa.name} | Arizona International Group`,
    description: visa.overview,
  };
}

export default async function VisaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const visa = allVisasData.find((v) => v.slug === slug);

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
