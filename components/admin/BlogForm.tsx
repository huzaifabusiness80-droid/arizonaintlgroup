"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Eye,
  FileText,
  Sparkles,
  Search,
  CheckCircle,
  HelpCircle,
  Tag,
  Clock,
  User,
  Globe,
  Plus,
  X,
} from "lucide-react";
import ImageUploadInput from "@/components/admin/ImageUploadInput";

interface BlogFormProps {
  initialData?: any;
  isEdit?: boolean;
}

const CATEGORIES = [
  "Bahrain Business",
  "Worldwide Visas",
  "Travel & Tours",
  "Rent A Car",
  "Mobiles & Tech",
  "General Guides",
];

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export default function BlogForm({ initialData, isEdit = false }: BlogFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");

  // Form State
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [category, setCategory] = useState(initialData?.category || "Bahrain Business");
  const [coverImage, setCoverImage] = useState(initialData?.coverImage || "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [author, setAuthor] = useState(initialData?.author || "Arizona Editorial Team");
  const [authorRole, setAuthorRole] = useState(initialData?.authorRole || "Immigration & Travel Consultant");
  const [readTime, setReadTime] = useState(initialData?.readTime || "5 min read");
  const [tags, setTags] = useState<string[]>(
    Array.isArray(initialData?.tags) ? initialData.tags : []
  );
  const [tagInput, setTagInput] = useState("");
  const [metaTitle, setMetaTitle] = useState(initialData?.metaTitle || "");
  const [metaDescription, setMetaDescription] = useState(initialData?.metaDescription || "");
  const [isPublished, setIsPublished] = useState(initialData?.isPublished ?? true);
  const [isFeatured, setIsFeatured] = useState(initialData?.isFeatured ?? false);

  // Auto-slug generator when title changes (if not edit or if slug matches old title slug)
  useEffect(() => {
    if (!isEdit && title && !slug) {
      setSlug(slugify(title));
    }
  }, [title, isEdit, slug]);

  // Auto-calculate read time based on word count
  useEffect(() => {
    if (content) {
      const words = content.trim().split(/\s+/).length;
      const minutes = Math.max(1, Math.ceil(words / 200));
      setReadTime(`${minutes} min read`);
    }
  }, [content]);

  function insertFormatting(prefix: string, suffix: string = "") {
    const textarea = document.getElementById("blog-content-area") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const replacement = `${prefix}${selectedText || "Your text here"}${suffix}`;

    const newContent = content.substring(0, start) + replacement + content.substring(end);
    setContent(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + replacement.length - suffix.length);
    }, 50);
  }

  function handleAddTag() {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput("");
    }
  }

  function handleRemoveTag(tagToRemove: string) {
    setTags(tags.filter((t) => t !== tagToRemove));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      setError("Please enter an article title.");
      return;
    }
    if (!content.trim()) {
      setError("Please enter article content.");
      return;
    }
    if (!coverImage.trim()) {
      setError("Please upload or provide a cover image for the article.");
      return;
    }

    setError(null);
    setSaving(true);

    const payload = {
      title,
      slug: slug || slugify(title),
      category,
      coverImage,
      excerpt: excerpt || title,
      content,
      author,
      authorRole,
      readTime,
      tags,
      metaTitle: metaTitle || title,
      metaDescription: metaDescription || excerpt || title,
      isPublished,
      isFeatured,
    };

    try {
      const endpoint = isEdit ? `/api/admin/blogs/${initialData.id}` : "/api/admin/blogs";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        router.push("/admin/blogs");
        router.refresh();
      } else {
        setError(data.error || "Failed to save article.");
      }
    } catch {
      setError("An unexpected network error occurred.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ fontFamily: "system-ui, -apple-system, sans-serif", maxWidth: 1200, margin: "0 auto" }}>
      {/* Top action bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link
            href="/admin/blogs"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              color: "#666",
              textDecoration: "none",
              fontSize: 13,
              background: "#fff",
              padding: "6px 12px",
              border: "1px solid #ddd",
            }}
          >
            <ArrowLeft size={14} /> Back to Articles
          </Link>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#111", margin: 0 }}>
            {isEdit ? `Edit: ${initialData?.title || "Article"}` : "Create New Article / Blog"}
          </h1>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            type="submit"
            disabled={saving}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 24px",
              background: "#c9a227",
              color: "#000",
              fontWeight: 700,
              fontSize: 13,
              border: "1px solid #b38e1b",
              cursor: saving ? "not-allowed" : "pointer",
            }}
          >
            <Save size={16} />
            {saving ? "Saving Article..." : isEdit ? "Update Article" : "Publish Article"}
          </button>
        </div>
      </div>

      {error && (
        <div
          style={{
            background: "#fee2e2",
            border: "1px solid #ef4444",
            color: "#991b1b",
            padding: "12px 16px",
            fontSize: 13,
            marginBottom: 20,
          }}
        >
          {error}
        </div>
      )}

      {/* Main Grid: Left Editor (70%), Right Settings & SEO (30%) */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 24, alignItems: "start" }}>
        {/* Left Column: Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Title & Slug */}
          <div style={{ background: "#fff", border: "1px solid #e5e5e5", padding: 20 }}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: "#444", marginBottom: 6 }}>
                Article Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Complete Guide to Starting a Business in Bahrain with 100% Foreign Ownership"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  fontSize: 16,
                  fontWeight: 600,
                  border: "1px solid #ccc",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, textTransform: "uppercase", color: "#777", marginBottom: 4 }}>
                Permalink Slug (URL)
              </label>
              <div style={{ display: "flex", alignItems: "center", background: "#f8f8f8", border: "1px solid #ddd", padding: "0 10px" }}>
                <span style={{ fontSize: 12, color: "#888", userSelect: "none" }}>https://arizonaintlgroup.com/blogs/</span>
                <input
                  type="text"
                  placeholder="article-slug"
                  value={slug}
                  onChange={(e) => setSlug(slugify(e.target.value))}
                  style={{
                    flex: 1,
                    padding: "8px 6px",
                    fontSize: 12,
                    border: "none",
                    background: "transparent",
                    outline: "none",
                    fontFamily: "monospace",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Cover Image */}
          <div style={{ background: "#fff", border: "1px solid #e5e5e5", padding: 20 }}>
            <ImageUploadInput
              label="Article Cover Image *"
              value={coverImage}
              onChange={(url) => setCoverImage(url)}
              folder="arizonaintl/blogs"
              placeholder="Upload article cover image (High resolution)"
            />
          </div>

          {/* Excerpt */}
          <div style={{ background: "#fff", border: "1px solid #e5e5e5", padding: 20 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: "#444", marginBottom: 6 }}>
              Short Excerpt / Summary (Appears in blog cards & Google snippets)
            </label>
            <textarea
              rows={3}
              placeholder="Brief 2-3 sentence overview explaining what the reader will learn in this article..."
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 14px",
                fontSize: 13,
                border: "1px solid #ccc",
                outline: "none",
                boxSizing: "border-box",
                lineHeight: 1.5,
              }}
            />
          </div>

          {/* Full Article Content Editor */}
          <div style={{ background: "#fff", border: "1px solid #e5e5e5", padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <label style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: "#444" }}>
                Article Content * (Supports Markdown & HTML)
              </label>

              {/* Mode toggle */}
              <div style={{ display: "flex", gap: 4 }}>
                <button
                  type="button"
                  onClick={() => setActiveTab("write")}
                  style={{
                    padding: "4px 12px",
                    fontSize: 12,
                    background: activeTab === "write" ? "#111" : "#eee",
                    color: activeTab === "write" ? "#fff" : "#555",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: 500,
                  }}
                >
                  Write / Edit
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("preview")}
                  style={{
                    padding: "4px 12px",
                    fontSize: 12,
                    background: activeTab === "preview" ? "#111" : "#eee",
                    color: activeTab === "preview" ? "#fff" : "#555",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: 500,
                  }}
                >
                  Live Preview
                </button>
              </div>
            </div>

            {/* Quick Formatting Toolbar */}
            {activeTab === "write" && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, padding: "8px 10px", background: "#f8f8f8", border: "1px solid #e5e5e5", borderBottom: "none" }}>
                <button type="button" onClick={() => insertFormatting("## ", "\n")} style={toolBtnStyle}>
                  H2 Heading
                </button>
                <button type="button" onClick={() => insertFormatting("### ", "\n")} style={toolBtnStyle}>
                  H3 Heading
                </button>
                <button type="button" onClick={() => insertFormatting("**", "**")} style={toolBtnStyle}>
                  Bold
                </button>
                <button type="button" onClick={() => insertFormatting("* ", "\n")} style={toolBtnStyle}>
                  • Bullet List
                </button>
                <button type="button" onClick={() => insertFormatting("1. ", "\n")} style={toolBtnStyle}>
                  1. Numbered List
                </button>
                <button type="button" onClick={() => insertFormatting("> ", "\n")} style={toolBtnStyle}>
                  Quote
                </button>
                <button
                  type="button"
                  onClick={() =>
                    insertFormatting(
                      '<div class="p-4 my-4 bg-amber-50 border-l-4 border-amber-500 text-amber-950 rounded-r">\n<strong>💡 Pro Tip:</strong> ',
                      "\n</div>"
                    )
                  }
                  style={{ ...toolBtnStyle, color: "#926806", fontWeight: 600 }}
                >
                  💡 Pro Tip Box
                </button>
                <button
                  type="button"
                  onClick={() =>
                    insertFormatting(
                      '<div class="p-4 my-4 bg-blue-50 border-l-4 border-blue-500 text-blue-950 rounded-r">\n<strong>ℹ️ Important Note:</strong> ',
                      "\n</div>"
                    )
                  }
                  style={{ ...toolBtnStyle, color: "#1d4ed8", fontWeight: 600 }}
                >
                  ℹ️ Notice Box
                </button>
              </div>
            )}

            {activeTab === "write" ? (
              <textarea
                id="blog-content-area"
                required
                rows={18}
                placeholder="Write your comprehensive article here... Use ## for section headings, bullet points, and paragraphs."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={{
                  width: "100%",
                  padding: "14px",
                  fontSize: 14,
                  lineHeight: 1.6,
                  border: "1px solid #e5e5e5",
                  outline: "none",
                  boxSizing: "border-box",
                  fontFamily: "inherit",
                }}
              />
            ) : (
              <div
                style={{
                  padding: "24px",
                  border: "1px solid #e5e5e5",
                  minHeight: 400,
                  background: "#fff",
                  lineHeight: 1.8,
                  fontSize: 15,
                  color: "#222",
                }}
              >
                {/* Simulated live preview */}
                <div style={{ marginBottom: 20, paddingBottom: 16, borderBottom: "1px solid #eee" }}>
                  <span style={{ padding: "4px 8px", background: "#c9a227", color: "#fff", fontSize: 11, fontWeight: 700, textTransform: "uppercase" }}>
                    {category}
                  </span>
                  <h1 style={{ fontSize: 24, fontWeight: 700, margin: "12px 0 6px" }}>{title || "Untitled Article"}</h1>
                  <div style={{ fontSize: 12, color: "#888" }}>
                    By {author} · {readTime}
                  </div>
                </div>

                {coverImage && (
                  <img
                    src={coverImage}
                    alt="Cover preview"
                    style={{ width: "100%", maxHeight: 320, objectFit: "cover", marginBottom: 20 }}
                  />
                )}

                <div
                  style={{ whiteSpace: "pre-wrap" }}
                  dangerouslySetInnerHTML={{
                    __html: content
                      .replace(/## (.*?)\n/g, '<h2 style="font-size: 20px; font-weight: 700; margin: 24px 0 10px; color: #111;">$1</h2>')
                      .replace(/### (.*?)\n/g, '<h3 style="font-size: 17px; font-weight: 600; margin: 18px 0 8px; color: #333;">$1</h3>')
                      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                      .replace(/> (.*?)\n/g, '<blockquote style="border-left: 3px solid #c9a227; padding-left: 14px; margin: 16px 0; color: #555; font-style: italic;">$1</blockquote>'),
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Meta, Publishing & Settings */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Publish Settings */}
          <div style={{ background: "#fff", border: "1px solid #e5e5e5", padding: 18 }}>
            <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: "#444", marginBottom: 14 }}>
              Publication Status
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  style={{ width: 16, height: 16, accentColor: "#111" }}
                />
                <span style={{ fontSize: 13, fontWeight: 600, color: isPublished ? "#166534" : "#991b1b" }}>
                  {isPublished ? "✓ Published (Visible Live)" : "Draft (Hidden from Public)"}
                </span>
              </label>
            </div>

            <div>
              <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  style={{ width: 16, height: 16, accentColor: "#c9a227" }}
                />
                <span style={{ fontSize: 13, fontWeight: 500, color: "#333" }}>
                  ⭐ Spotlight / Featured Article
                </span>
              </label>
            </div>
          </div>

          {/* Category & Metadata */}
          <div style={{ background: "#fff", border: "1px solid #e5e5e5", padding: 18 }}>
            <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: "#444", marginBottom: 14 }}>
              Category & Author
            </div>

            {/* Category */}
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#666", marginBottom: 4 }}>
                CATEGORY
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ width: "100%", padding: "8px 10px", fontSize: 13, border: "1px solid #ccc", outline: "none", background: "#fff" }}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Author */}
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#666", marginBottom: 4 }}>
                AUTHOR NAME
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Arizona Editorial Team"
                style={{ width: "100%", padding: "8px 10px", fontSize: 13, border: "1px solid #ccc", outline: "none", boxSizing: "border-box" }}
              />
            </div>

            {/* Author Role */}
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#666", marginBottom: 4 }}>
                AUTHOR TITLE / ROLE
              </label>
              <input
                type="text"
                value={authorRole}
                onChange={(e) => setAuthorRole(e.target.value)}
                placeholder="Immigration & Travel Consultant"
                style={{ width: "100%", padding: "8px 10px", fontSize: 13, border: "1px solid #ccc", outline: "none", boxSizing: "border-box" }}
              />
            </div>

            {/* Read Time */}
            <div>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#666", marginBottom: 4 }}>
                ESTIMATED READ TIME
              </label>
              <input
                type="text"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                placeholder="5 min read"
                style={{ width: "100%", padding: "8px 10px", fontSize: 13, border: "1px solid #ccc", outline: "none", boxSizing: "border-box" }}
              />
            </div>
          </div>

          {/* Tags */}
          <div style={{ background: "#fff", border: "1px solid #e5e5e5", padding: 18 }}>
            <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: "#444", marginBottom: 12 }}>
              Article Tags
            </div>
            <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
              <input
                type="text"
                placeholder="Add tag (e.g. Bahrain CR, Visa)"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
                style={{ flex: 1, padding: "6px 10px", fontSize: 12, border: "1px solid #ccc", outline: "none" }}
              />
              <button
                type="button"
                onClick={handleAddTag}
                style={{ padding: "6px 12px", background: "#111", color: "#fff", border: "none", fontSize: 12, cursor: "pointer" }}
              >
                Add
              </button>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {tags.map((t) => (
                <span
                  key={t}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    padding: "3px 8px",
                    background: "#f0f0f0",
                    fontSize: 11,
                    color: "#333",
                    border: "1px solid #ddd",
                  }}
                >
                  #{t}
                  <X size={12} style={{ cursor: "pointer", color: "#888" }} onClick={() => handleRemoveTag(t)} />
                </span>
              ))}
            </div>
          </div>

          {/* SEO & Meta preview */}
          <div style={{ background: "#fff", border: "1px solid #e5e5e5", padding: 18 }}>
            <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: "#444", marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
              <Search size={14} /> Search Engine Optimization (SEO)
            </div>

            <div style={{ marginBottom: 12 }}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#666", marginBottom: 4 }}>
                SEO META TITLE
              </label>
              <input
                type="text"
                placeholder={title || "SEO Title"}
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                style={{ width: "100%", padding: "8px 10px", fontSize: 12, border: "1px solid #ccc", outline: "none", boxSizing: "border-box" }}
              />
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#666", marginBottom: 4 }}>
                SEO META DESCRIPTION
              </label>
              <textarea
                rows={3}
                placeholder={excerpt || "Search description for Google"}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                style={{ width: "100%", padding: "8px 10px", fontSize: 12, border: "1px solid #ccc", outline: "none", boxSizing: "border-box", lineHeight: 1.4 }}
              />
            </div>

            {/* Google snippet preview */}
            <div style={{ background: "#f8f9fa", border: "1px solid #e9ecef", padding: 12 }}>
              <div style={{ fontSize: 10, color: "#70757a", marginBottom: 2 }}>Google Search Result Preview</div>
              <div style={{ fontSize: 13, color: "#1a0dab", fontWeight: 500, textDecoration: "underline", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {metaTitle || title || "Article Title — Arizona International Group"}
              </div>
              <div style={{ fontSize: 11, color: "#006621", marginBottom: 2 }}>
                https://arizonaintlgroup.com/blogs/{slug || "slug"}
              </div>
              <div style={{ fontSize: 11, color: "#4d5156", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", lineHeight: 1.4 }}>
                {metaDescription || excerpt || "Read comprehensive guidance, requirements, and expert tips from Arizona International Group."}
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

const toolBtnStyle: React.CSSProperties = {
  padding: "4px 8px",
  background: "#fff",
  border: "1px solid #ccc",
  fontSize: 11,
  cursor: "pointer",
  color: "#333",
};
