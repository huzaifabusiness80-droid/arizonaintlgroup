"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Clock,
  Calendar,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  FileText,
  PhoneCall,
  X,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useGeoLocation } from "@/context/GeoContext";

interface BlogPostItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: string;
  author: string;
  authorRole?: string | null;
  readTime: string;
  tags?: string[];
  isFeatured: boolean;
  views: number;
  createdAt: string;
}

const CATEGORIES = [
  "ALL",
  "Bahrain Business",
  "Worldwide Visas",
  "Travel & Tours",
  "Rent A Car",
  "Mobiles & Tech",
  "General",
];

export default function BlogListClient({ initialPosts }: { initialPosts: BlogPostItem[] }) {
  const { isArabic, t } = useLanguage();
  const { contact } = useGeoLocation();
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const matchCategory =
        selectedCategory === "ALL" ||
        post.category?.toLowerCase() === selectedCategory.toLowerCase();

      const matchSearch =
        !searchQuery.trim() ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (Array.isArray(post.tags) &&
          post.tags.some((tg) => tg.toLowerCase().includes(searchQuery.toLowerCase())));

      return matchCategory && matchSearch;
    });
  }, [initialPosts, selectedCategory, searchQuery]);

  // Featured post spotlight (when viewing ALL without search)
  const featuredPost = useMemo(() => {
    if (selectedCategory === "ALL" && !searchQuery.trim()) {
      return initialPosts.find((p) => p.isFeatured) || initialPosts[0] || null;
    }
    return null;
  }, [initialPosts, selectedCategory, searchQuery]);

  const regularPosts = useMemo(() => {
    if (featuredPost) {
      return filteredPosts.filter((p) => p.id !== featuredPost.id);
    }
    return filteredPosts;
  }, [filteredPosts, featuredPost]);

  return (
    <div className="space-y-12">
      {/* Search & Filter Header Bar */}
      <div className="flex flex-col lg:flex-row gap-5 items-stretch lg:items-center justify-between pb-8 border-b border-neutral-200">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            const count =
              cat === "ALL"
                ? initialPosts.length
                : initialPosts.filter((p) => p.category?.toLowerCase() === cat.toLowerCase()).length;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                  isSelected
                    ? "bg-neutral-950 text-white font-semibold shadow-sm"
                    : "bg-[#f8f9fc] hover:bg-neutral-100 text-neutral-600 hover:text-neutral-900 border border-neutral-200/80"
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isSelected ? "bg-white/20 text-white font-bold" : "bg-neutral-200 text-neutral-600"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Live Search Input */}
        <div className="relative min-w-[280px] sm:min-w-[320px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder={isArabic ? "ابحث عن المقالات أو الأدلة..." : "Search articles & guides..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-white border border-neutral-300 focus:border-[#dfb141] focus:ring-1 focus:ring-[#dfb141] text-xs sm:text-sm text-neutral-900 placeholder-neutral-400 outline-none transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Featured Spotlight Article */}
      {featuredPost && (
        <div className="relative group rounded-3xl overflow-hidden bg-white border border-neutral-200/90 hover:border-neutral-400/80 transition-all duration-300 shadow-xs hover:shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Cover Image */}
            <div className="lg:col-span-7 relative h-64 sm:h-80 lg:h-full min-h-[320px] overflow-hidden bg-neutral-100">
              <img
                src={
                  featuredPost.coverImage ||
                  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop"
                }
                alt={featuredPost.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-neutral-200 text-neutral-900 text-xs font-bold uppercase tracking-wider shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#dfb141]" />
                <span>Featured Guide</span>
              </div>
            </div>

            {/* Content Details */}
            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-white">
              <div>
                <div className="flex items-center gap-3 text-xs text-neutral-500 mb-3">
                  <span className="text-[#c49725] font-semibold uppercase tracking-wider">
                    {featuredPost.category}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-neutral-400" />
                    {featuredPost.readTime}
                  </span>
                </div>

                <Link href={`/blogs/${featuredPost.slug}`}>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-neutral-950 group-hover:text-[#c49725] transition-colors leading-snug">
                    {featuredPost.title}
                  </h2>
                </Link>

                <p className="mt-4 text-xs sm:text-sm text-neutral-600 line-clamp-3 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-neutral-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-neutral-950 text-white flex items-center justify-center text-xs font-bold">
                    {featuredPost.author.charAt(0)}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-neutral-950">{featuredPost.author}</div>
                    <div className="text-[11px] text-neutral-500">
                      {new Date(featuredPost.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </div>

                <Link
                  href={`/blogs/${featuredPost.slug}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-950 text-white text-xs font-semibold hover:bg-neutral-800 transition-colors shadow-xs"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Regular Posts */}
      {filteredPosts.length === 0 ? (
        <div className="py-20 text-center rounded-3xl bg-[#f8f9fc] border border-neutral-200">
          <BookOpen className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-neutral-950 mb-2">No articles found</h3>
          <p className="text-xs sm:text-sm text-neutral-500 max-w-md mx-auto mb-6">
            We couldn&apos;t find any articles matching &ldquo;{searchQuery}&rdquo; in category &ldquo;{selectedCategory}&rdquo;.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("ALL");
              setSearchQuery("");
            }}
            className="px-5 py-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-xs font-semibold text-white transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post) => (
            <article
              key={post.id}
              className="group rounded-3xl overflow-hidden bg-white border border-neutral-200/90 hover:border-neutral-400/80 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 shadow-xs hover:shadow-xl"
            >
              <div>
                {/* Cover Image */}
                <Link href={`/blogs/${post.slug}`} className="block relative aspect-[16/10] overflow-hidden bg-neutral-100">
                  <img
                    src={
                      post.coverImage ||
                      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop"
                    }
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-neutral-200 text-[11px] font-semibold text-[#c49725] uppercase tracking-wider shadow-xs">
                    {post.category}
                  </div>
                </Link>

                {/* Body Details */}
                <div className="p-6">
                  {/* Meta Bar */}
                  <div className="flex items-center gap-3 text-[11px] text-neutral-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-neutral-400" />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <Link href={`/blogs/${post.slug}`} className="block group-hover:text-[#c49725] transition-colors">
                    <h3 className="text-base sm:text-lg font-bold text-neutral-950 line-clamp-2 leading-snug">
                      {post.title}
                    </h3>
                  </Link>

                  {/* Excerpt */}
                  <p className="mt-3 text-xs sm:text-sm text-neutral-600 line-clamp-3 leading-relaxed font-normal">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Bottom Footer */}
              <div className="px-6 pb-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
                <div className="text-xs text-neutral-500 font-medium">
                  By {post.author}
                </div>

                <Link
                  href={`/blogs/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#c49725] group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Read Article</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Corporate Pre-Footer Callout Box */}
      <div className="mt-16 rounded-3xl sm:rounded-[32px] bg-neutral-950 text-white p-8 sm:p-12 relative overflow-hidden">
        <div className="max-w-3xl">
          <span className="text-xs font-bold tracking-widest text-[#dfb141] uppercase block mb-3">
            DIRECT CONSULTANCY DESK
          </span>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-white leading-tight">
            Need Expert Assistance with Your <br />
            <span className="text-[#dfb141] font-bold">Visa, Travel, or Bahrain Business Setup?</span>
          </h3>
          <p className="mt-4 text-xs sm:text-sm text-neutral-300 font-normal leading-relaxed max-w-2xl">
            Speak directly with certified consultants in Bahrain & Pakistan for verified eligibility checks, expedited document processing, and tailored enterprise solutions.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={contact.whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-white text-neutral-950 font-semibold text-xs sm:text-sm hover:bg-neutral-100 transition-all flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>WhatsApp Official Desk</span>
            </a>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm transition-all border border-white/20"
            >
              Book Consultation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
