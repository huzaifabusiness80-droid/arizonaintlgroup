"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Clock,
  Calendar,
  ChevronRight,
  ArrowLeft,
  Share2,
  PhoneCall,
  Check,
  Tag,
  ArrowUpRight,
  MessageCircle,
  Copy,
  Eye,
} from "lucide-react";
import { useGeoLocation } from "@/context/GeoContext";

interface PostData {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  author: string;
  authorRole?: string | null;
  readTime: string;
  tags?: string[];
  views: number;
  createdAt: string;
}

interface BlogDetailClientProps {
  post: PostData;
  relatedPosts: any[];
}

export default function BlogDetailClient({ post, relatedPosts }: BlogDetailClientProps) {
  const { contact } = useGeoLocation();
  const [copied, setCopied] = useState(false);

  const currentUrl =
    typeof window !== "undefined"
      ? window.location.href
      : `https://arizonaintlgroup.com/blogs/${post.slug}`;

  function handleCopyLink() {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  const shareText = encodeURIComponent(
    `Check out this guide: "${post.title}" on Arizona International Group:\n${currentUrl}`
  );
  const waShareUrl = `https://wa.me/?text=${shareText}`;
  const twShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    post.title
  )}&url=${encodeURIComponent(currentUrl)}`;
  const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    currentUrl
  )}`;

  // Parse markdown-like content into clean HTML
  const formattedHtml = post.content
    .replace(
      /## (.*?)(?:\n|$)/g,
      '<h2 class="text-xl sm:text-2xl font-bold text-neutral-950 mt-10 mb-4 pb-2 border-b border-neutral-200 flex items-center gap-2"><span class="text-[#c49725]">#</span> $1</h2>'
    )
    .replace(
      /### (.*?)(?:\n|$)/g,
      '<h3 class="text-lg sm:text-xl font-semibold text-neutral-900 mt-8 mb-3 text-[#b58c1e]">$1</h3>'
    )
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-neutral-950 font-semibold">$1</strong>')
    .replace(
      /> (.*?)(?:\n|$)/g,
      '<blockquote class="p-5 my-6 bg-amber-50/70 border-l-4 border-[#c49725] text-neutral-800 italic rounded-r-xl font-serif text-base leading-relaxed">$1</blockquote>'
    )
    .replace(/^\* (.*?)$/gm, '<li class="ml-5 list-disc text-neutral-700 leading-relaxed">$1</li>')
    .replace(
      /^(\d+)\. (.*?)$/gm,
      '<li class="ml-5 list-decimal text-neutral-700 leading-relaxed">$2</li>'
    );

  return (
    <article className="pt-8 pb-20 sm:pt-12 sm:pb-28">
      {/* Top Breadcrumb & Header Bar */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center gap-2 text-xs text-neutral-500 mb-6 flex-wrap">
          <Link href="/" className="hover:text-neutral-900 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-neutral-400" />
          <Link href="/blogs" className="hover:text-neutral-900 transition-colors">
            Articles & Guides
          </Link>
          <ChevronRight className="w-3 h-3 text-neutral-400" />
          <span className="text-[#c49725] font-semibold">{post.category}</span>
        </div>

        {/* Category Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-xs font-semibold text-[#c49725] uppercase tracking-wider mb-4 shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c49725]" />
          <span>{post.category}</span>
        </div>

        {/* Main Title */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-950 leading-tight">
          {post.title}
        </h1>

        {/* Subtitle / Excerpt */}
        {post.excerpt && (
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
            {post.excerpt}
          </p>
        )}

        {/* Author & Meta Bar */}
        <div className="mt-6 pt-6 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-neutral-950 text-white flex items-center justify-center font-bold text-sm shadow-sm">
              {post.author.charAt(0)}
            </div>
            <div>
              <div className="text-sm font-bold text-neutral-950">{post.author}</div>
              <div className="text-xs text-neutral-500">
                {post.authorRole || "Senior Consultant"}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-neutral-500">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-neutral-400" />
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-neutral-400" />
              {post.readTime}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-neutral-400" />
              {post.views || 1} views
            </span>
          </div>
        </div>
      </div>

      {/* Featured Cover Image */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden bg-neutral-100 border border-neutral-200 shadow-sm">
          <img
            src={
              post.coverImage ||
              "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1400&auto=format&fit=crop"
            }
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Article Content & Share Layout */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Share Buttons */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-neutral-200">
          <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider flex items-center gap-2">
            <Share2 className="w-3.5 h-3.5 text-[#c49725]" /> Share this guide:
          </div>
          <div className="flex items-center gap-2">
            <a
              href={waShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 text-xs font-medium flex items-center gap-1.5 transition-colors"
              title="Share on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
            </a>
            <a
              href={twShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 text-neutral-700 text-xs font-medium transition-colors"
              title="Share on X (Twitter)"
            >
              X / Twitter
            </a>
            <a
              href={fbShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 text-neutral-700 text-xs font-medium transition-colors"
              title="Share on Facebook"
            >
              Facebook
            </a>
            <button
              onClick={handleCopyLink}
              className="p-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 text-neutral-700 text-xs font-medium flex items-center gap-1.5 transition-colors"
              title="Copy Link"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" /> Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" /> Copy Link
                </>
              )}
            </button>
          </div>
        </div>

        {/* Formatted Body Content */}
        <div
          className="prose max-w-none text-neutral-700 text-base sm:text-lg leading-relaxed space-y-4 font-normal"
          dangerouslySetInnerHTML={{ __html: formattedHtml }}
        />

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-10 pt-6 border-t border-neutral-200 flex flex-wrap items-center gap-2">
            <span className="text-xs text-neutral-500 font-medium flex items-center gap-1 mr-2">
              <Tag className="w-3.5 h-3.5" /> Tags:
            </span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-[#f8f9fc] border border-neutral-200 text-xs text-neutral-600 font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Consultation Callout Box */}
        <div className="mt-12 p-8 sm:p-10 rounded-3xl bg-neutral-950 text-white shadow-xl relative overflow-hidden">
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold tracking-widest text-[#dfb141] uppercase block mb-2">
                OFFICIAL ADVISORY
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Have inquiries regarding {post.category}?
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-neutral-300 max-w-lg leading-relaxed">
                Arizona International Group provides step-by-step documentation, government submissions, and dedicated support.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <a
                href={contact.whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-full bg-white text-neutral-950 font-semibold text-xs text-center transition-colors flex items-center justify-center gap-2 whitespace-nowrap shadow-xs hover:bg-neutral-100"
              >
                <PhoneCall className="w-3.5 h-3.5" /> WhatsApp Support
              </a>
              <Link
                href="/contact"
                className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs text-center transition-colors flex items-center justify-center gap-2 whitespace-nowrap border border-white/20"
              >
                Book Consultation
              </Link>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-10 text-center">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-600 hover:text-neutral-950 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to All Articles & Guides
          </Link>
        </div>
      </div>

      {/* Related Articles Section */}
      {relatedPosts.length > 0 && (
        <section className="mt-20 pt-16 border-t border-neutral-200 bg-[#f8f9fc]">
          <div className="max-w-[1580px] mx-auto px-4 sm:px-8 lg:px-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-950">
                  Related Guides in {post.category}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                  Continue reading expert insights from our team.
                </p>
              </div>
              <Link
                href="/blogs"
                className="text-xs font-bold text-[#c49725] hover:underline flex items-center gap-1"
              >
                View All <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/blogs/${rel.slug}`}
                  className="group rounded-3xl overflow-hidden bg-white border border-neutral-200/90 hover:border-neutral-400/80 transition-all flex flex-col justify-between shadow-xs hover:shadow-xl"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                    <img
                      src={
                        rel.coverImage ||
                        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop"
                      }
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-white/95 text-[10px] font-semibold text-[#c49725] uppercase">
                      {rel.category}
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] text-neutral-500 mb-2 flex items-center gap-2">
                        <Calendar className="w-3 h-3 text-neutral-400" />
                        {new Date(rel.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                      <h4 className="text-sm font-bold text-neutral-950 group-hover:text-[#c49725] transition-colors line-clamp-2">
                        {rel.title}
                      </h4>
                    </div>
                    <div className="mt-4 pt-3 border-t border-neutral-100 text-xs font-bold text-[#c49725] flex items-center gap-1">
                      Read Guide <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
