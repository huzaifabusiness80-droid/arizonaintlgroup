"use client";

import { useEffect, useState, useCallback } from "react";
import AdminTable from "@/components/admin/AdminTable";

const COLUMNS = [
  {
    key: "image",
    label: "Image",
    render: (v: string) =>
      v ? (
        <img
          src={v}
          alt=""
          style={{ width: 36, height: 36, objectFit: "contain", border: "1px solid #eee", background: "#f8f8f8" }}
        />
      ) : (
        "—"
      ),
  },
  { key: "name", label: "Product / Model" },
  { key: "brand", label: "Brand" },
  { key: "tag", label: "Category / Tag" },
  { key: "basePrice", label: "Starting Price" },
  {
    key: "options",
    label: "Variants / Storage",
    render: (opts: any) => (Array.isArray(opts) ? `${opts.length} variants` : "0 variants"),
  },
];

export default function AdminMobilesPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    setLoading(true);
    fetch("/api/admin/mobiles")
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setItems(d.items);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <div style={{ fontSize: 18, fontWeight: 700, color: "#111", marginBottom: 4 }}>
        Mobiles & Tech Products
      </div>
      <div style={{ fontSize: 13, color: "#888", marginBottom: 24 }}>
        Manage flagship smartphones, laptops, tablets, smart accessories, and wholesale tech hardware.
      </div>
      {loading ? (
        <div style={{ color: "#aaa", fontSize: 13 }}>Loading...</div>
      ) : (
        <AdminTable
          title="All Tech Products & Devices"
          section="mobiles-tech"
          apiPath="/api/admin/mobiles"
          columns={COLUMNS as any}
          items={items}
          onRefresh={load}
          addHref="/admin/mobiles-tech/new"
        />
      )}
    </div>
  );
}
