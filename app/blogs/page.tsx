import React from "react";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import BlogListClient from "./BlogListClient";

export const metadata: Metadata = {
  title: "Articles, Insights & Guides | Arizona International Group",
  description:
    "Official insights, immigration updates, Bahrain business setup guides, worldwide visa requirements, and travel itineraries by Arizona International Group experts.",
  keywords: [
    "Bahrain business setup",
    "Bahrain CR registration",
    "Worldwide visa guides",
    "Umrah travel packages",
    "Schengen visa requirements",
    "Bahrain eVisa guide",
    "Arizona International Group blog",
  ],
  alternates: {
    canonical: "https://arizonaintlgroup.com/blogs",
  },
  openGraph: {
    title: "Articles, Insights & Guides | Arizona International Group",
    description:
      "Expert immigration advice, Bahrain company formation steps, travel tips, and worldwide visa news.",
    url: "https://arizonaintlgroup.com/blogs",
    siteName: "Arizona International Group",
    images: [
      {
        url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Arizona International Group Insights & Guides",
      },
    ],
  },
};

export const revalidate = 60; // ISR revalidate every 60 seconds

export default async function BlogsPage() {
  let posts: any[] = [];
  try {
    const rawPosts = await prisma.blogPost.findMany({
      where: { isPublished: true },
      orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
    });
    posts = rawPosts.map((p: any) => ({
      ...p,
      tags: Array.isArray(p.tags) ? p.tags : [],
      createdAt: p.createdAt ? p.createdAt.toISOString() : new Date().toISOString(),
      updatedAt: p.updatedAt ? p.updatedAt.toISOString() : new Date().toISOString(),
    }));
  } catch (err) {
    console.error("Error loading blog posts from database:", err);
  }

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col justify-between selection:bg-[#2563eb] selection:text-white">
      {/* Sticky Header */}
      <Navbar />

      <main className="flex-1">
        {/* Page Banner with Breadcrumbs */}
        <PageBanner
          title="Articles, Insights & Guides"
          subtitle="Official regulatory updates, Bahrain business setup blueprints, and worldwide visa guides curated by Arizona International Group consultants."
          breadcrumbCurrent="Articles & Guides"
          backgroundImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=85&auto=format&fit=crop"
        />

        {/* Main Content Section */}
        <section className="w-full py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto">
          <BlogListClient initialPosts={posts} />
        </section>
      </main>

      {/* Corporate Footer */}
      <Footer />
    </div>
  );
}
