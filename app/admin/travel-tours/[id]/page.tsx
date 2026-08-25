"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ServiceForm from "@/components/admin/ServiceForm";

export default function EditTourPage() {
  const params = useParams();
  const id = params?.id as string;
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/admin/tours/${id}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setItem(d.item);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div style={{ color: "#aaa", fontSize: 13 }}>Loading...</div>;
  if (!item) return <div style={{ color: "#c00", fontSize: 13 }}>Tour package not found.</div>;

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <div style={{ fontSize: 18, fontWeight: 700, color: "#111", marginBottom: 4 }}>
        Edit Travel Package — {item.name}
      </div>
      <div style={{ fontSize: 13, color: "#888", marginBottom: 28 }}>
        Update itinerary options, pricing, capacity, hotel info, and gallery.
      </div>
      <ServiceForm
        mode="edit"
        type="tour"
        apiPath="/api/admin/tours"
        backPath="/admin/travel-tours"
        initialData={item}
        itemId={id}
      />
    </div>
  );
}
