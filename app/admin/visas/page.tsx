"use client";

import { useEffect, useState, useCallback } from "react";
import AdminTable from "@/components/admin/AdminTable";

const COLUMNS = [
  { key: "flag", label: "Flag", render: (v: string) => <span style={{ fontSize: 22 }}>{v}</span> },
  { key: "name", label: "Visa Name" },
  { key: "country", label: "Country" },
  { key: "processingTime", label: "Processing Time" },
  {
    key: "pricePkr",
    label: "Pricing (PKR / BHD)",
    render: (_: any, row: any) => {
      if (row.pricePkr || row.priceBhd) {
        return (
          <div style={{ fontSize: 11, lineHeight: 1.4 }}>
            {row.pricePkr && <span style={{ color: "#007700", fontWeight: 600, display: "block" }}>🇵🇰 {row.pricePkr}</span>}
            {row.priceBhd && <span style={{ color: "#b38600", fontWeight: 600, display: "block" }}>🇧🇭 {row.priceBhd}</span>}
          </div>
        );
      }
      return row.basePrice || "—";
    },
  },
  {
    key: "options",
    label: "Packages",
    render: (opts: any) => (Array.isArray(opts) ? `${opts.length} options` : "0 options"),
  },
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
      <div style={{ fontSize: 13, color: "#888", marginBottom: 24 }}>Manage all visa destinations and dual pricing shown on the website.</div>
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
