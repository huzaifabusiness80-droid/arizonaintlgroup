"use client";

import ServiceForm from "@/components/admin/ServiceForm";

export default function NewBahrainPage() {
  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <div style={{ fontSize: 18, fontWeight: 700, color: "#111", marginBottom: 4 }}>
        Add New Bahrain Business Service
      </div>
      <div style={{ fontSize: 13, color: "#888", marginBottom: 28 }}>
        Add a corporate formation or government consultancy service with tiered options and fee structures.
      </div>
      <ServiceForm
        mode="create"
        type="bahrain"
        apiPath="/api/admin/bahrain"
        backPath="/admin/bahrain-services"
      />
    </div>
  );
}
