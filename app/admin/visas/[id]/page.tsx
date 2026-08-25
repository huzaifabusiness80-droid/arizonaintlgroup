"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ServiceForm from "@/components/admin/ServiceForm";

export default function EditVisaPage() {
  const params = useParams();
  const id = params?.id as string;
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/admin/visas/${id}`)
      .then((r) => r.json())
      .then((d) => { if (d.success) setItem(d.item); })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div style={{ color: "#aaa", fontSize: 13 }}>Loading...</div>;
  if (!item) return <div style={{ color: "#c00", fontSize: 13 }}>Visa not found.</div>;

  // Map visa fields to ServiceForm initialData
  const initialData = {
    ...item,
    pricePkr: item.pricePkr || "",
    priceBhd: item.priceBhd || "",
    description: item.tagline || item.overview || "",
    basePrice: item.basePrice || "",
    image: item.cardImage || item.heroImage || "",
    about: item.overview || "",
    options: item.options || [],
  };

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <div style={{ fontSize: 18, fontWeight: 700, color: "#111", marginBottom: 4 }}>Edit Visa — {item.name}</div>
      <div style={{ fontSize: 13, color: "#888", marginBottom: 28 }}>Update the details below. Changes are saved immediately to the database.</div>
      <ServiceForm
        mode="edit"
        type="visa"
        apiPath="/api/admin/visas"
        backPath="/admin/visas"
        initialData={initialData}
        itemId={id}
      />
    </div>
  );
}
