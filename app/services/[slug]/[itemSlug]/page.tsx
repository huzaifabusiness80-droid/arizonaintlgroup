import React from "react";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { businessDivisionsData } from "@/lib/data";
import ServiceItemDetailClient from "./ServiceItemDetailClient";

export async function generateStaticParams() {
  const params: { slug: string; itemSlug: string }[] = [];
  businessDivisionsData.forEach((division) => {
    division.servicesList.forEach((item) => {
      params.push({
        slug: division.slug,
        itemSlug: item.slug,
      });
    });
  });
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; itemSlug: string }>;
}) {
  const { slug, itemSlug } = await params;
  const division = businessDivisionsData.find((d) => d.slug === slug);
  if (!division) return { title: "Item Not Found" };
  const item = division.servicesList.find((s) => s.slug === itemSlug);
  if (!item) return { title: "Item Not Found" };

  return {
    title: `${item.name} | ${division.title} | Arizona International Group`,
    description: item.desc,
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

  const item = division.servicesList.find((s) => s.slug === itemSlug);
  if (!item) notFound();

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
