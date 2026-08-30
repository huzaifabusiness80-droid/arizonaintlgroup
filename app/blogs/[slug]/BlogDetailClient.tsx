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

  const formattedHtml = post.content
    .replace(
      /## (.*?)(?:\n|$)/g,
      '<h2 class="text-lg sm:text-xl font-medium text-slate-900 mt-8 mb-3 pb-2 border-b border-slate-200 flex items-center gap-2"><span class="text-[#2563eb]">#</span> $1</h2>'
    )
    .replace(
      /### (.*?)(?:\n|$)/g,
      '<h3 class="text-base sm:text-lg font-medium text-slate-900 mt-6 mb-2 text-[#2563eb]">$1</h3>'
    )
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900 font-semibold">$1</strong>')
    .replace(
      /> (.*?)(?:\n|$)/g,
      '<blockquote class="p-4 my-5 bg-blue-50/60 border-l-4 border-[#2563eb] text-slate-800 italic rounded-r-md text-sm leading-relaxed">$1</blockquote>'
    )
    .replace(/^\* (.*?)$/gm, '<li class="ml-5 list-disc text-slate-700 leading-relaxed">$1</li>')
    .replace(
      /^(\d+)\. (.*?)$/gm,
      '<li class="ml-5 list-decimal text-slate-700 leading-relaxed">$2</li>'
    );

  return (
    <article className="pt-6 pb-16 sm:pt-10 sm:pb-24">
      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4 flex-wrap">
          <Link href="/" className="hover:text-slate-900 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link href="/blogs" className="hover:text-slate-900 transition-colors">
            Articles & Guides
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-[#2563eb] font-medium">{post.category}</span>
        </div>

        {/* Category Pill */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-blue-50 border border-blue-100 text-xs font-medium text-[#2563eb] uppercase tracking-wider mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb]" />
          <span>{post.category}</span>
        </div>

        {/* Title */}
        <h1 className="text-xl sm:text-3xl md:text-4xl font-medium tracking-tight text-slate-900 leading-tight">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            {post.excerpt}
          </p>
        )}

        {/* Meta Bar */}
        <div className="mt-4 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md bg-slate-900 text-white flex items-center justify-center font-medium text-xs">
              {post.author.charAt(0)}
            </div>
            <div>
              <div className="text-xs font-medium text-slate-900">{post.author}</div>
              <div className="text-[10px] text-slate-500">
                {post.authorRole || "Senior Consultant"}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-slate-400" />
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              {post.readTime}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3 text-slate-400" />
              {post.views || 1} views
            </span>
          </div>
        </div>
      </div>

      {/* Featured Cover Image */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
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

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Share Buttons */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200">
          <div className="text-xs font-medium text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Share2 className="w-3 h-3 text-[#2563eb]" /> Share:
          </div>
          <div className="flex items-center gap-1.5">
            <a
              href={waShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-md bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 text-xs font-medium flex items-center gap-1 transition-colors"
              title="Share on WhatsApp"
            >
              <MessageCircle className="w-3 h-3" /> WhatsApp
            </a>
            <a
              href={twShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-md bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-medium transition-colors"
              title="Share on X"
            >
              X / Twitter
            </a>
            <a
              href={fbShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-md bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-medium transition-colors"
              title="Share on Facebook"
            >
              Facebook
            </a>
            <button
              onClick={handleCopyLink}
              className="p-1.5 rounded-md bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
              title="Copy Link"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-600" /> Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" /> Copy Link
                </>
              )}
            </button>
          </div>
        </div>

        {/* Body */}
        <div
          className="prose max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-3 font-normal"
          dangerouslySetInnerHTML={{ __html: formattedHtml }}
        />

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-8 pt-4 border-t border-slate-200 flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-slate-500 font-medium flex items-center gap-1 mr-1">
              <Tag className="w-3 h-3" /> Tags:
            </span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-xs text-slate-600 font-normal"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Author Box */}
        <div className="mt-8 p-5 rounded-lg bg-slate-50 border border-slate-200 flex items-center gap-4">
          <div className="w-12 h-12 rounded-md bg-slate-900 text-white flex items-center justify-center font-semibold text-base shrink-0">
            {post.author.charAt(0)}
          </div>
          <div>
            <div className="text-sm font-medium text-slate-900">{post.author}</div>
            <div className="text-xs text-[#2563eb] font-medium mb-1">
              {post.authorRole || "Senior Consultant | Arizona International Group"}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Specialist in corporate setup, government clearances, and international travel management at Arizona International Group.
            </p>
          </div>
        </div>

        {/* Direct WhatsApp Call to Action Box */}
        <div className="mt-8 p-5 sm:p-6 rounded-lg bg-[#0f172a] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-base sm:text-lg font-medium text-white">
              Have Questions About This Guide?
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Chat directly with our senior consultants on WhatsApp for instant guidance.
            </p>
          </div>

          <a
            href={contact.whatsappLink(`Hi Arizona, I have a question regarding: "${post.title}".`)}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-md bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-medium transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </article>
  );
}
