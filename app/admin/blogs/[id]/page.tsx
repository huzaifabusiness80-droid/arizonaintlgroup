"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BlogForm from "@/components/admin/BlogForm";

export default function EditBlogPage() {
  const params = useParams();
  const id = params?.id as string;
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`/api/admin/blogs/${id}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          setData(d.item);
        } else {
          setError(d.error || "Failed to load article");
        }
      })
      .catch(() => setError("Network error loading article"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div style={{ padding: 40, textAlign: "center", color: "#888", fontSize: 14 }}>
        Loading article details...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div style={{ padding: 40, textAlign: "center", color: "#c00", fontSize: 14 }}>
        {error || "Article not found"}
      </div>
    );
  }

  return <BlogForm initialData={data} isEdit={true} />;
}
