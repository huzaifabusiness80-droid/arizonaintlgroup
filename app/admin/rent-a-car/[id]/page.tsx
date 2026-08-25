"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ServiceForm from "@/components/admin/ServiceForm";

export default function EditCarPage() {
  const params = useParams();
  const id = params?.id as string;
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/admin/cars/${id}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setItem(d.item);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div style={{ color: "#aaa", fontSize: 13 }}>Loading...</div>;
  if (!item) return <div style={{ color: "#c00", fontSize: 13 }}>Car service not found.</div>;

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <div style={{ fontSize: 18, fontWeight: 700, color: "#111", marginBottom: 4 }}>
        Edit Car Rental Service — {item.name}
      </div>
      <div style={{ fontSize: 13, color: "#888", marginBottom: 28 }}>
        Update vehicle options, daily/weekly rates, capacity, and fleet details.
      </div>
      <ServiceForm
        mode="edit"
        type="car"
        apiPath="/api/admin/cars"
        backPath="/admin/rent-a-car"
        initialData={item}
        itemId={id}
      />
    </div>
  );
}
