import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogDetailClient from "./BlogDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug },
  });

  if (!post || !post.isPublished) {
    return {
      title: "Article Not Found | Arizona International Group",
    };
  }

  const title = post.metaTitle || `${post.title} | Arizona International Group`;
  const description =
    post.metaDescription ||
    post.excerpt ||
    "Read comprehensive immigration, travel, and Bahrain business insights by Arizona International Group.";

  const coverUrl =
    post.coverImage ||
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop";

  return {
    title,
    description,
    keywords: Array.isArray(post.tags) ? (post.tags as string[]) : [],
    authors: [{ name: post.author || "Arizona International Group" }],
    alternates: {
      canonical: `https://arizonaintlgroup.com/blogs/${post.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://arizonaintlgroup.com/blogs/${post.slug}`,
      siteName: "Arizona International Group",
      type: "article",
      publishedTime: post.createdAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      authors: [post.author || "Arizona International Group"],
      images: [
        {
          url: coverUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [coverUrl],
    },
  };
}

export const revalidate = 60; // ISR

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;

  const post = await prisma.blogPost.findUnique({
    where: { slug },
  });

  if (!post || !post.isPublished) {
    notFound();
  }

  // Fire and forget view increment
  prisma.blogPost
    .update({
      where: { id: post.id },
      data: { views: { increment: 1 } },
    })
    .catch(() => {});

  // Fetch related posts from same category
  const relatedPosts = await prisma.blogPost.findMany({
    where: {
      category: post.category,
      isPublished: true,
      NOT: { id: post.id },
    },
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  // JSON-LD Structured Data for Google Article SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: [post.coverImage],
    datePublished: post.createdAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: {
      "@type": "Person",
      name: post.author || "Arizona International Group",
      jobTitle: post.authorRole || "Senior Immigration Consultant",
    },
    publisher: {
      "@type": "Organization",
      name: "Arizona International Group",
      logo: {
        "@type": "ImageObject",
        url: "https://arizonaintlgroup.com/icon.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://arizonaintlgroup.com/blogs/${post.slug}`,
    },
  };

  const postData = {
    ...post,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
    tags: Array.isArray(post.tags) ? (post.tags as string[]) : [],
  };

  const formattedRelated = relatedPosts.map((r: any) => ({
    ...r,
    createdAt: r.createdAt.toISOString(),
    tags: Array.isArray(r.tags) ? (r.tags as string[]) : [],
  }));

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col justify-between selection:bg-[#2563eb] selection:text-white">
      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Top Navbar */}
      <Navbar />

      {/* Main Blog Detail Client */}
      <main className="flex-1">
        <BlogDetailClient post={postData} relatedPosts={formattedRelated} />
      </main>

      {/* Corporate Footer */}
      <Footer />
    </div>
  );
}
