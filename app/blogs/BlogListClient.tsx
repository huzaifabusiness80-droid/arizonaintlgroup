"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Clock,
  ArrowRight,
  BookOpen,
  X,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

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
  const { isArabic } = useLanguage();
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
    <div className="space-y-10">
      {/* Search & Filter Header Bar */}
      <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between pb-6 border-b border-slate-200">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
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
                className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? "bg-[#2563eb] text-white"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200"
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[9px] px-1 py-0.2 rounded-md ${
                    isSelected ? "bg-white/20 text-white" : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Live Search Input */}
        <div className="relative min-w-[260px] sm:min-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder={isArabic ? "ابحث عن المقالات أو الأدلة..." : "Search articles & guides..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-2 rounded-md bg-white border border-slate-200 focus:border-[#2563eb] text-xs sm:text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Featured Spotlight Article */}
      {featuredPost && (
        <div className="relative rounded-lg overflow-hidden bg-white border border-slate-200 hover:border-[#93c5fd] transition-colors">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Cover Image */}
            <div className="lg:col-span-7 relative h-56 sm:h-72 lg:h-full min-h-[280px] overflow-hidden bg-slate-100">
              <img
                src={
                  featuredPost.coverImage ||
                  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop"
                }
                alt={featuredPost.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-md border border-slate-700 text-white text-[10px] font-medium uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb]" />
                <span>Featured Guide</span>
              </div>
            </div>

            {/* Content Details */}
            <div className="lg:col-span-5 p-5 sm:p-7 flex flex-col justify-between bg-white">
              <div>
                <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-2">
                  <span className="text-[#2563eb] font-medium uppercase tracking-wider">
                    {featuredPost.category}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {featuredPost.readTime}
                  </span>
                </div>

                <Link href={`/blogs/${featuredPost.slug}`}>
                  <h2 className="text-lg sm:text-xl font-medium text-slate-900 hover:text-[#2563eb] transition-colors leading-snug">
                    {featuredPost.title}
                  </h2>
                </Link>

                <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed font-normal">
                  {featuredPost.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-xs font-medium text-slate-900">{featuredPost.author}</div>
                  <div className="text-[10px] text-slate-500">
                    {new Date(featuredPost.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                </div>

                <Link
                  href={`/blogs/${featuredPost.slug}`}
                  className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-md bg-[#2563eb] text-white text-xs font-medium hover:bg-[#1d4ed8] transition-colors"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Regular Posts */}
      {filteredPosts.length === 0 ? (
        <div className="py-16 text-center rounded-lg bg-slate-50 border border-slate-200">
          <BookOpen className="w-8 h-8 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-medium text-slate-900 mb-1">No articles found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
            No articles match &ldquo;{searchQuery}&rdquo; in category &ldquo;{selectedCategory}&rdquo;.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("ALL");
              setSearchQuery("");
            }}
            className="px-4 py-2 rounded-md bg-[#2563eb] hover:bg-[#1d4ed8] text-xs font-medium text-white transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {regularPosts.map((post) => (
            <article
              key={post.id}
              className="group rounded-lg overflow-hidden bg-white border border-slate-200 hover:border-[#93c5fd] transition-all flex flex-col justify-between"
            >
              <div>
                <Link href={`/blogs/${post.slug}`} className="block relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={
                      post.coverImage ||
                      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop"
                    }
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-md border border-slate-200 text-[10px] font-medium text-[#2563eb] uppercase tracking-wider">
                    {post.category}
                  </div>
                </Link>

                <div className="p-4">
                  <div className="flex items-center gap-2 text-[10px] text-slate-500 mb-1.5">
                    <span>
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5 text-slate-400" />
                      {post.readTime}
                    </span>
                  </div>

                  <Link href={`/blogs/${post.slug}`} className="block group-hover:text-[#2563eb] transition-colors">
                    <h3 className="text-sm sm:text-base font-medium text-slate-900 line-clamp-2 leading-snug">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="mt-1.5 text-xs text-slate-600 line-clamp-2 leading-relaxed font-normal">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-4 pb-4 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                <div className="text-[10px] text-slate-500 font-normal">
                  By {post.author}
                </div>

                <Link
                  href={`/blogs/${post.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#2563eb]"
                >
                  <span>Read</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
