"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Plus, Search, Eye, Edit, Trash2, ExternalLink, Sparkles, CheckCircle2, Clock } from "lucide-react";

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const CATEGORIES = [
    "ALL",
    "Bahrain Business",
    "Worldwide Visas",
    "Travel & Tours",
    "Rent A Car",
    "Mobiles & Tech",
    "General Guides",
  ];

  const load = useCallback(() => {
    setLoading(true);
    let url = "/api/admin/blogs";
    const params = new URLSearchParams();
    if (selectedCategory !== "ALL") params.set("category", selectedCategory);
    if (search.trim()) params.set("search", search.trim());
    if (params.toString()) url += `?${params.toString()}`;

    fetch(url)
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setBlogs(d.items || []);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [selectedCategory, search]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Are you sure you want to delete article:\n"${title}"?`)) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/blogs/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setBlogs((prev) => prev.filter((b) => b.id !== id));
      } else {
        alert(data.error || "Failed to delete article");
      }
    } catch {
      alert("Error deleting article");
    } finally {
      setDeletingId(null);
    }
  }

  async function togglePublish(id: string, currentStatus: boolean) {
    try {
      const res = await fetch(`/api/admin/blogs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: !currentStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setBlogs((prev) =>
          prev.map((b) => (b.id === id ? { ...b, isPublished: !currentStatus } : b))
        );
      }
    } catch {
      alert("Failed to update status");
    }
  }

  async function toggleFeatured(id: string, currentFeatured: boolean) {
    try {
      const res = await fetch(`/api/admin/blogs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isFeatured: !currentFeatured }),
      });
      const data = await res.json();
      if (data.success) {
        setBlogs((prev) =>
          prev.map((b) => (b.id === id ? { ...b, isFeatured: !currentFeatured } : b))
        );
      }
    } catch {
      alert("Failed to update featured status");
    }
  }

  const totalPublished = blogs.filter((b) => b.isPublished).length;
  const totalViews = blogs.reduce((acc, b) => acc + (b.views || 0), 0);

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "#111", margin: "0 0 6px" }}>
            Articles & Blog Management
          </h1>
          <p style={{ fontSize: 13, color: "#777", margin: 0 }}>
            Publish authoritative guides, company formation insights, visa news, and travel tips.
          </p>
        </div>

        <Link
          href="/admin/blogs/new"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 18px",
            background: "#c9a227",
            color: "#000",
            fontWeight: 600,
            fontSize: 13,
            textDecoration: "none",
            borderRadius: 0,
            border: "1px solid #b38e1b",
          }}
        >
          <Plus size={16} />
          Create New Article
        </Link>
      </div>

      {/* Stats Counter Bar */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14, marginBottom: 24 }}>
        <div style={{ background: "#fff", border: "1px solid #e5e5e5", padding: "14px 18px" }}>
          <div style={{ fontSize: 11, color: "#888", textTransform: "uppercase", fontWeight: 600, letterSpacing: "0.05em" }}>Total Articles</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: "#111", marginTop: 4 }}>{blogs.length}</div>
        </div>
        <div style={{ background: "#fff", border: "1px solid #e5e5e5", padding: "14px 18px" }}>
          <div style={{ fontSize: 11, color: "#888", textTransform: "uppercase", fontWeight: 600, letterSpacing: "0.05em" }}>Published Active</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: "#166534", marginTop: 4 }}>{totalPublished}</div>
        </div>
        <div style={{ background: "#fff", border: "1px solid #e5e5e5", padding: "14px 18px" }}>
          <div style={{ fontSize: 11, color: "#888", textTransform: "uppercase", fontWeight: 600, letterSpacing: "0.05em" }}>Drafts</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: "#c2410c", marginTop: 4 }}>{blogs.length - totalPublished}</div>
        </div>
        <div style={{ background: "#fff", border: "1px solid #e5e5e5", padding: "14px 18px" }}>
          <div style={{ fontSize: 11, color: "#888", textTransform: "uppercase", fontWeight: 600, letterSpacing: "0.05em" }}>Total Reader Views</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: "#1e40af", marginTop: 4 }}>{totalViews.toLocaleString()}</div>
        </div>
      </div>

      {/* Search & Filters */}
      <div style={{ background: "#fff", border: "1px solid #e5e5e5", padding: "14px 16px", marginBottom: 20, display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#f8f8f8", border: "1px solid #ddd", padding: "6px 12px", minWidth: 260 }}>
          <Search size={14} color="#888" />
          <input
            type="text"
            placeholder="Search articles by title or keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ border: "none", background: "transparent", fontSize: 13, outline: "none", width: "100%" }}
          />
        </div>

        {/* Category Pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: "6px 12px",
                fontSize: 12,
                cursor: "pointer",
                background: selectedCategory === cat ? "#111" : "#f5f5f5",
                color: selectedCategory === cat ? "#fff" : "#555",
                border: "1px solid",
                borderColor: selectedCategory === cat ? "#111" : "#ddd",
                fontWeight: selectedCategory === cat ? 600 : 400,
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Table */}
      {loading ? (
        <div style={{ background: "#fff", border: "1px solid #e5e5e5", padding: 48, textAlign: "center", color: "#888", fontSize: 14 }}>
          Loading articles from database...
        </div>
      ) : blogs.length === 0 ? (
        <div style={{ background: "#fff", border: "1px solid #e5e5e5", padding: 48, textAlign: "center" }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: "#333", marginBottom: 6 }}>No articles found</div>
          <p style={{ fontSize: 13, color: "#888", marginBottom: 16 }}>
            {search || selectedCategory !== "ALL"
              ? "Try adjusting your search keywords or category filters."
              : "Get started by creating your first authoritative article or guide."}
          </p>
          <Link
            href="/admin/blogs/new"
            style={{
              display: "inline-block",
              padding: "8px 18px",
              background: "#111",
              color: "#fff",
              fontSize: 13,
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            + Create First Article
          </Link>
        </div>
      ) : (
        <div style={{ background: "#fff", border: "1px solid #e5e5e5", overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "#fafafa", borderBottom: "1px solid #eaeaea" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#777", textTransform: "uppercase" }}>Cover</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#777", textTransform: "uppercase" }}>Title & Slug</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#777", textTransform: "uppercase" }}>Category</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#777", textTransform: "uppercase" }}>Author & Time</th>
                <th style={{ padding: "12px 16px", textAlign: "center", fontSize: 11, fontWeight: 600, color: "#777", textTransform: "uppercase" }}>Views</th>
                <th style={{ padding: "12px 16px", textAlign: "center", fontSize: 11, fontWeight: 600, color: "#777", textTransform: "uppercase" }}>Featured</th>
                <th style={{ padding: "12px 16px", textAlign: "center", fontSize: 11, fontWeight: 600, color: "#777", textTransform: "uppercase" }}>Status</th>
                <th style={{ padding: "12px 16px", textAlign: "right", fontSize: 11, fontWeight: 600, color: "#777", textTransform: "uppercase" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((item) => (
                <tr key={item.id} style={{ borderBottom: "1px solid #f0f0f0" }}>
                  {/* Cover */}
                  <td style={{ padding: "12px 16px", verticalAlign: "middle" }}>
                    {item.coverImage ? (
                      <img
                        src={item.coverImage}
                        alt={item.title}
                        style={{ width: 64, height: 42, objectFit: "cover", border: "1px solid #ddd", background: "#f8f8f8" }}
                      />
                    ) : (
                      <div style={{ width: 64, height: 42, background: "#eee", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#999" }}>
                        No Image
                      </div>
                    )}
                  </td>

                  {/* Title & Slug */}
                  <td style={{ padding: "12px 16px", verticalAlign: "middle", maxWidth: 300 }}>
                    <div style={{ fontWeight: 600, color: "#111", fontSize: 13, marginBottom: 2 }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: 11, color: "#888", fontFamily: "monospace" }}>
                      /blogs/{item.slug}
                    </div>
                  </td>

                  {/* Category */}
                  <td style={{ padding: "12px 16px", verticalAlign: "middle" }}>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "3px 8px",
                        fontSize: 11,
                        fontWeight: 600,
                        background: "#f4efe0",
                        color: "#926806",
                        border: "1px solid #e7d8b5",
                      }}
                    >
                      {item.category}
                    </span>
                  </td>

                  {/* Author & Read Time */}
                  <td style={{ padding: "12px 16px", verticalAlign: "middle" }}>
                    <div style={{ fontSize: 12, color: "#333", fontWeight: 500 }}>{item.author || "Arizona Team"}</div>
                    <div style={{ fontSize: 11, color: "#888", marginTop: 2, display: "flex", alignItems: "center", gap: 4 }}>
                      <Clock size={11} /> {item.readTime || "5 min read"}
                    </div>
                  </td>

                  {/* Views */}
                  <td style={{ padding: "12px 16px", verticalAlign: "middle", textAlign: "center" }}>
                    <span style={{ fontSize: 12, color: "#555", fontWeight: 600 }}>
                      {item.views || 0}
                    </span>
                  </td>

                  {/* Featured */}
                  <td style={{ padding: "12px 16px", verticalAlign: "middle", textAlign: "center" }}>
                    <button
                      onClick={() => toggleFeatured(item.id, item.isFeatured)}
                      title="Click to toggle featured"
                      style={{
                        background: item.isFeatured ? "#fff8e1" : "#f9f9f9",
                        border: item.isFeatured ? "1px solid #ffd54f" : "1px solid #eee",
                        color: item.isFeatured ? "#f57f17" : "#aaa",
                        padding: "4px 8px",
                        fontSize: 11,
                        fontWeight: 600,
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <Sparkles size={12} />
                      {item.isFeatured ? "Featured" : "Regular"}
                    </button>
                  </td>

                  {/* Status Toggle */}
                  <td style={{ padding: "12px 16px", verticalAlign: "middle", textAlign: "center" }}>
                    <button
                      onClick={() => togglePublish(item.id, item.isPublished)}
                      style={{
                        background: item.isPublished ? "#e8f5e9" : "#fff3e0",
                        border: item.isPublished ? "1px solid #c8e6c9" : "1px solid #ffe0b2",
                        color: item.isPublished ? "#2e7d32" : "#e65100",
                        padding: "4px 10px",
                        fontSize: 11,
                        fontWeight: 600,
                        cursor: "pointer",
                        textTransform: "uppercase",
                      }}
                    >
                      {item.isPublished ? "Published" : "Draft"}
                    </button>
                  </td>

                  {/* Actions */}
                  <td style={{ padding: "12px 16px", verticalAlign: "middle", textAlign: "right" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                      {item.isPublished && (
                        <a
                          href={`/blogs/${item.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="View Live on Website"
                          style={{
                            padding: "6px",
                            color: "#555",
                            border: "1px solid #ddd",
                            background: "#fff",
                            display: "inline-flex",
                            alignItems: "center",
                            textDecoration: "none",
                          }}
                        >
                          <ExternalLink size={14} />
                        </a>
                      )}
                      <Link
                        href={`/admin/blogs/${item.id}`}
                        title="Edit Article"
                        style={{
                          padding: "6px 10px",
                          color: "#111",
                          border: "1px solid #333",
                          background: "#fff",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                          textDecoration: "none",
                          fontSize: 12,
                          fontWeight: 500,
                        }}
                      >
                        <Edit size={13} /> Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id, item.title)}
                        disabled={deletingId === item.id}
                        title="Delete Article"
                        style={{
                          padding: "6px",
                          color: "#c00",
                          border: "1px solid #ffcccc",
                          background: "#fff5f5",
                          cursor: deletingId === item.id ? "not-allowed" : "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                        }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
