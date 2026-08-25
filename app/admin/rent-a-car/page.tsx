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
  { key: "name", label: "Vehicle / Service Name" },
  { key: "tag", label: "Tag / Category" },
  { key: "basePrice", label: "Rate" },
  {
    key: "options",
    label: "Tiers / Fleet",
    render: (opts: any) => (Array.isArray(opts) ? `${opts.length} options` : "0 options"),
  },
];

export default function AdminCarsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    setLoading(true);
    fetch("/api/admin/cars")
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
        Rent A Car Services & Fleet
      </div>
      <div style={{ fontSize: 13, color: "#888", marginBottom: 24 }}>
        Manage all rental vehicle packages, pricing tiers, and daily/monthly fleets.
      </div>
      {loading ? (
        <div style={{ color: "#aaa", fontSize: 13 }}>Loading...</div>
      ) : (
        <AdminTable
          title="All Car Rental Services"
          section="rent-a-car"
          apiPath="/api/admin/cars"
          columns={COLUMNS as any}
          items={items}
          onRefresh={load}
          addHref="/admin/rent-a-car/new"
        />
      )}
    </div>
  );
}
