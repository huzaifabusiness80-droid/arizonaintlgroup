"use client";

import { useEffect, useState, useCallback } from "react";
import AdminTable from "@/components/admin/AdminTable";

const COLUMNS = [
  { key: "flag", label: "Flag", render: (v: string) => <span style={{ fontSize: 22 }}>{v}</span> },
  { key: "name", label: "Name" },
  { key: "country", label: "Country" },
  { key: "region", label: "Region" },
  { key: "processingTime", label: "Processing Time" },
  { key: "basePrice", label: "Base Price" },
];

export default function AdminVisasPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    setLoading(true);
    fetch("/api/admin/visas")
      .then((r) => r.json())
      .then((d) => { if (d.success) setItems(d.items); })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <div style={{ fontSize: 18, fontWeight: 700, color: "#111", marginBottom: 4 }}>Visa Listings</div>
      <div style={{ fontSize: 13, color: "#888", marginBottom: 24 }}>Manage all visa destinations shown on the website.</div>
      {loading ? (
        <div style={{ color: "#aaa", fontSize: 13 }}>Loading...</div>
      ) : (
        <AdminTable
          title="All Visa Listings"
          section="visas"
          apiPath="/api/admin/visas"
          columns={COLUMNS as any}
          items={items}
          onRefresh={load}
          addHref="/admin/visas/new"
        />
      )}
    </div>
  );
}
