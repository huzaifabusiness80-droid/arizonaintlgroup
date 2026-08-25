"use client";

import ServiceForm from "@/components/admin/ServiceForm";

export default function NewMobilePage() {
  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <div style={{ fontSize: 18, fontWeight: 700, color: "#111", marginBottom: 4 }}>
        Add New Mobile / Tech Product
      </div>
      <div style={{ fontSize: 13, color: "#888", marginBottom: 28 }}>
        List a new smartphone, laptop, or gadget with specs, storage variants, warranty tiers, and prices.
      </div>
      <ServiceForm
        mode="create"
        type="mobile"
        apiPath="/api/admin/mobiles"
        backPath="/admin/mobiles-tech"
      />
    </div>
  );
}
