"use client";

import ServiceForm from "@/components/admin/ServiceForm";

export default function NewTourPage() {
  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <div style={{ fontSize: 18, fontWeight: 700, color: "#111", marginBottom: 4 }}>
        Add New Travel & Tour Package
      </div>
      <div style={{ fontSize: 13, color: "#888", marginBottom: 28 }}>
        Create a new travel package (e.g. Umrah Packages, Luxury Resorts, Flight Services) with custom tiered pricing.
      </div>
      <ServiceForm
        mode="create"
        type="tour"
        apiPath="/api/admin/tours"
        backPath="/admin/travel-tours"
      />
    </div>
  );
}
