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
          style={{ width: 44, height: 32, objectFit: "cover", border: "1px solid #eee" }}
        />
      ) : (
        "—"
      ),
  },
  { key: "name", label: "Business Service" },
  { key: "tag", label: "Tag / Category" },
  { key: "basePrice", label: "Starting Fee" },
  {
    key: "options",
    label: "Packages",
    render: (opts: any) => (Array.isArray(opts) ? `${opts.length} packages` : "0 packages"),
  },
];

export default function AdminBahrainPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    setLoading(true);
    fetch("/api/admin/bahrain")
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
        Bahrain Business & Corporate Services
      </div>
      <div style={{ fontSize: 13, color: "#888", marginBottom: 24 }}>
        Manage Commercial Registration (CR), 100% foreign ownership setups, LMRA work permits, EWA offices, and corporate banking.
      </div>
      {loading ? (
        <div style={{ color: "#aaa", fontSize: 13 }}>Loading...</div>
      ) : (
        <AdminTable
          title="All Bahrain Corporate Services"
          section="bahrain-services"
          apiPath="/api/admin/bahrain"
          columns={COLUMNS as any}
          items={items}
          onRefresh={load}
          addHref="/admin/bahrain-services/new"
        />
      )}
    </div>
  );
}
