"use client";

import React, { useState, useRef } from "react";
import * as XLSX from "xlsx";
import { Upload, FileSpreadsheet, Download, CheckCircle2, AlertCircle, X, Loader2, RefreshCw } from "lucide-react";

interface BulkImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  section: string; // e.g. "rent-a-car", "visas", "travel-tours", "mobiles-tech", "bahrain-services", "blogs"
  title: string;
  onSuccess: () => void;
}

const TEMPLATE_DEFINITIONS: Record<string, { filename: string; sampleData: any[] }> = {
  "rent-a-car": {
    filename: "arizona-rent-a-car-template",
    sampleData: [
      {
        Name: "Toyota Land Cruiser Prado TX (4x4)",
        Category: "Luxury SUV",
        PricePKR: "PKR 35,000 / Day",
        PriceBHD: "BHD 45 / Day",
        Capacity: "7 Passengers",
        Image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=800",
        Description: "Premium 4x4 SUV available for daily, weekly, and chauffeur service.",
        About: "Full comprehensive insurance, 24/7 roadside assistance, luxury leather interior.",
      },
      {
        Name: "Mercedes-Benz S500 VIP Executive",
        Category: "VIP Chauffeur",
        PricePKR: "PKR 65,000 / Day",
        PriceBHD: "BHD 85 / Day",
        Capacity: "4 Passengers VIP",
        Image: "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=800",
        Description: "Chauffeur driven VIP luxury sedan for corporate executives and airport transfers.",
        About: "Includes English & Arabic speaking professional chauffeur, complimentary bottled water and Wi-Fi.",
      },
      {
        Name: "Hyundai Sonata 2025 Sedan",
        Category: "Economy & Business",
        PricePKR: "PKR 18,000 / Day",
        PriceBHD: "BHD 22 / Day",
        Capacity: "5 Passengers",
        Image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800",
        Description: "Reliable, modern sedan with great fuel economy and comfort.",
        About: "Perfect for city travel and corporate daily commute.",
      },
    ],
  },
  visas: {
    filename: "arizona-visas-template",
    sampleData: [
      {
        Name: "Bahrain 1-Year Multiple Entry Visa",
        Country: "Bahrain",
        Flag: "🇧🇭",
        Region: "gcc",
        RegionName: "GCC & Gulf States",
        Type: "Multiple Entry E-Visa",
        ProcessingTime: "2-3 Working Days",
        EntryType: "Multiple Entry",
        Validity: "1 Year (90 Days stay per visit)",
        PricePKR: "PKR 85,000",
        PriceBHD: "BHD 115",
        Tagline: "Official immigration verified e-visa for business & tourism.",
        Image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800",
        Overview: "Fast and reliable 1-year Bahrain business and tourist visa processing with minimum documentation.",
        Requirements: "Original Passport (6 months validity) | White background photo | CNIC copy",
      },
      {
        Name: "Saudi Arabia Tourist & Umrah E-Visa",
        Country: "Saudi Arabia",
        Flag: "🇸🇦",
        Region: "gcc",
        RegionName: "GCC & Gulf States",
        Type: "Tourist & Umrah E-Visa",
        ProcessingTime: "24-48 Hours",
        EntryType: "Multiple Entry",
        Validity: "1 Year Validity (90 Days stay)",
        PricePKR: "PKR 55,000",
        PriceBHD: "BHD 75",
        Tagline: "Perform Umrah anytime with multiple entry tourist visa.",
        Image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=800",
        Overview: "Official Saudi eVisa for tourism and Umrah pilgrimage with instant processing.",
        Requirements: "Passport scan | Digital passport photo | Travel date",
      },
      {
        Name: "Dubai & UAE 30 Days Tourist Visa",
        Country: "United Arab Emirates",
        Flag: "🇦🇪",
        Region: "gcc",
        RegionName: "GCC & Gulf States",
        Type: "Tourist E-Visa",
        ProcessingTime: "24-48 Hours",
        EntryType: "Single Entry",
        Validity: "30 Days Stay",
        PricePKR: "PKR 38,000",
        PriceBHD: "BHD 48",
        Tagline: "Quick express Dubai visa issuance within 24 hours.",
        Image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=800",
        Overview: "Direct immigration approved UAE tourist visa for vacation and business meetings.",
        Requirements: "Passport 1st page scan | Passport photo",
      },
    ],
  },
  "travel-tours": {
    filename: "arizona-tours-template",
    sampleData: [
      {
        Name: "15 Days 4-Star Economy Umrah Package",
        Tag: "Umrah Packages",
        PricePKR: "PKR 295,000",
        PriceBHD: "BHD 390",
        Duration: "15 Days / 14 Nights",
        Image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=800",
        Description: "Complete Umrah package with direct flights, 4-star hotels in Makkah & Madinah, and luxury transport.",
        About: "Includes visa processing, hotel bookings close to Haram, buffet breakfast, Ziyarat tours, and 24/7 ground assistance.",
      },
      {
        Name: "7 Days Baku & Azerbaijan Discovery Tour",
        Tag: "International Holiday Tours",
        PricePKR: "PKR 185,000",
        PriceBHD: "BHD 245",
        Duration: "7 Days / 6 Nights",
        Image: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=800",
        Description: "Explore Old Baku, Flame Towers, Gabala cable cars, and Shahdag mountain resort.",
        About: "Includes 4-star hotel stay with breakfast, return airport transfers, English speaking guide, and e-visa.",
      },
    ],
  },
  "mobiles-tech": {
    filename: "arizona-mobiles-template",
    sampleData: [
      {
        Name: "Apple iPhone 16 Pro Max 256GB Desert Titanium",
        Brand: "Apple",
        Tag: "Flagship Smartphones",
        PricePKR: "PKR 495,000",
        PriceBHD: "BHD 460",
        Image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800",
        Description: "Brand new factory sealed box with Apple 1-Year International Warranty.",
        About: "A18 Pro chip, 48MP Fusion camera system, Super Retina XDR OLED display with ProMotion.",
      },
      {
        Name: "Samsung Galaxy S24 Ultra 512GB Titanium Gray",
        Brand: "Samsung",
        Tag: "Flagship Smartphones",
        PricePKR: "PKR 385,000",
        PriceBHD: "BHD 395",
        Image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=800",
        Description: "Official Samsung sealed unit with Galaxy AI features and built-in S-Pen.",
        About: "Snapdragon 8 Gen 3 processor, 200MP quad camera setup, Corning Gorilla Armor display.",
      },
    ],
  },
  "bahrain-services": {
    filename: "arizona-bahrain-services-template",
    sampleData: [
      {
        Name: "Bahrain W.L.L. Company Formation (100% Foreign Ownership)",
        Tag: "CR & Company Formation",
        PricePKR: "PKR 350,000",
        PriceBHD: "BHD 450",
        Image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800",
        Description: "100% foreign owned Commercial Registration (CR) setup without requiring a local Bahraini sponsor.",
        About: "Includes MOICT commercial activity approval, commercial address documentation, municipality clearance, and corporate bank account facilitation.",
      },
      {
        Name: "LMRA Investor Visa & Work Permit Processing",
        Tag: "LMRA & Investor Visas",
        PricePKR: "PKR 220,000",
        PriceBHD: "BHD 280",
        Image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=800",
        Description: "2-Year renewable investor visa with complete medical, biometrics, and CPR identity card issuance.",
        About: "Dedicated PRO agent handles complete LMRA submission, offense clearing, ceiling increases, and family dependent visas.",
      },
    ],
  },
  blogs: {
    filename: "arizona-blogs-template",
    sampleData: [
      {
        Title: "Complete Guide to Starting a Business in Bahrain 2026",
        Category: "Bahrain Business",
        Author: "Arizona Editorial Team",
        ReadTime: "6 min read",
        CoverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800",
        Excerpt: "Step-by-step guide for foreign investors and entrepreneurs on establishing a 100% foreign-owned WLL in Bahrain.",
        Content: "Bahrain continues to lead the Gulf region as one of the most investor-friendly nations with zero corporate and personal income taxes. Learn the complete procedure for obtaining your Commercial Registration (CR), LMRA visas, and corporate bank account.",
      },
      {
        Title: "Top 5 Countries with Fastest Visa Processing for GCC Residents",
        Category: "Worldwide Visas",
        Author: "Arizona Travel Consultant",
        ReadTime: "4 min read",
        CoverImage: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=800",
        Excerpt: "Discover hassle-free tourist and business e-visa destinations with quick approvals within 48 hours.",
        Content: "Planning your next international travel? Here is our curated list of destinations offering express online e-visas with minimal paperwork for residents.",
      },
    ],
  },
};

export default function BulkImportModal({
  isOpen,
  onClose,
  section,
  title,
  onSuccess,
}: BulkImportModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<any[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [parsing, setParsing] = useState(false);
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState<{
    success: boolean;
    imported?: number;
    total?: number;
    errors?: any[];
    message?: string;
  } | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const currentTemplate = TEMPLATE_DEFINITIONS[section] || TEMPLATE_DEFINITIONS["rent-a-car"];

  const handleDownloadTemplate = (format: "xlsx" | "csv") => {
    const ws = XLSX.utils.json_to_sheet(currentTemplate.sampleData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Template");

    if (format === "xlsx") {
      XLSX.writeFile(wb, `${currentTemplate.filename}.xlsx`);
    } else {
      XLSX.writeFile(wb, `${currentTemplate.filename}.csv`, { bookType: "csv" });
    }
  };

  const processFile = (uploadedFile: File) => {
    setFile(uploadedFile);
    setParsing(true);
    setImportResult(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json: any[] = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

        if (json.length === 0) {
          alert("The uploaded file contains no data rows.");
          setParsing(false);
          return;
        }

        const detectedHeaders = Object.keys(json[0] || {});
        setHeaders(detectedHeaders);
        setParsedData(json);
      } catch (err: any) {
        console.error("Error reading file:", err);
        alert("Failed to parse Excel/CSV file. Please ensure it is a valid format.");
      } finally {
        setParsing(false);
      }
    };
    reader.readAsArrayBuffer(uploadedFile);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleImport = async () => {
    if (parsedData.length === 0) return;
    setImporting(true);
    setImportResult(null);

    try {
      const res = await fetch("/api/admin/bulk-import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          section,
          items: parsedData,
        }),
      });

      const data = await res.json();
      setImportResult(data);

      if (data.success && data.imported > 0) {
        onSuccess();
      }
    } catch (err: any) {
      setImportResult({
        success: false,
        message: err?.message || "Failed to import items.",
      });
    } finally {
      setImporting(false);
    }
  };

  const resetModal = () => {
    setFile(null);
    setParsedData([]);
    setHeaders([]);
    setImportResult(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: "16px",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget && !importing) onClose();
      }}
    >
      <div
        style={{
          background: "#ffffff",
          width: "100%",
          maxWidth: "860px",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          borderRadius: "6px",
          border: "1px solid rgba(37, 99, 235, 0.3)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.35)",
          overflow: "hidden",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "18px 24px",
            background: "#0f172a",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "2px solid #2563eb",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
              }}
            >
              <FileSpreadsheet size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: "16px", fontWeight: 700, margin: 0, letterSpacing: "0.02em" }}>
                Bulk Import {title}
              </h2>
              <p style={{ fontSize: "12px", color: "#94a3b8", margin: "2px 0 0 0" }}>
                Upload an Excel (.xlsx / .xls) or CSV file to import multiple items instantly
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={importing}
            style={{
              background: "transparent",
              border: "none",
              color: "#aaa",
              cursor: "pointer",
              padding: "6px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Body Content */}
        <div style={{ padding: "24px", overflowY: "auto", flex: 1 }}>
          {/* Action Bar / Download Template */}
          <div
            style={{
              background: "#eff6ff",
              border: "1px solid #bfdbfe",
              padding: "14px 18px",
              borderRadius: "4px",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
              marginBottom: "20px",
            }}
          >
            <div>
              <div style={{ fontSize: "13px", fontWeight: 600, color: "#1e3a8a" }}>
                Need the correct format & column names?
              </div>
              <div style={{ fontSize: "12px", color: "#64748b" }}>
                Download our pre-formatted sample template with ready-made columns and example data.
              </div>
            </div>

            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={() => handleDownloadTemplate("xlsx")}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "7px 14px",
                  background: "#166534",
                  color: "#fff",
                  border: "none",
                  borderRadius: "3px",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                <Download size={14} /> Download Excel (.xlsx)
              </button>
              <button
                onClick={() => handleDownloadTemplate("csv")}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "7px 14px",
                  background: "#0f172a",
                  color: "#fff",
                  border: "none",
                  borderRadius: "3px",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                <Download size={14} /> Download CSV (.csv)
              </button>
            </div>
          </div>

          {/* Upload Dropzone */}
          {!parsedData.length && (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              style={{
                border: dragActive ? "2px dashed #2563eb" : "2px dashed #cbd5e1",
                background: dragActive ? "#eff6ff" : "#f8fafc",
                padding: "40px 20px",
                borderRadius: "6px",
                textAlign: "center",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx, .xls, .csv"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  background: "#eff6ff",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 12px auto",
                  color: "#2563eb",
                }}
              >
                {parsing ? <Loader2 size={26} className="animate-spin" /> : <Upload size={26} />}
              </div>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "#1e293b" }}>
                {parsing ? "Parsing spreadsheet data..." : "Click or drag & drop your Excel / CSV file here"}
              </div>
              <div style={{ fontSize: "12px", color: "#64748b", marginTop: "4px" }}>
                Supports Microsoft Excel (.xlsx, .xls) and Comma-Separated Values (.csv)
              </div>
            </div>
          )}

          {/* Parsed Preview Table */}
          {parsedData.length > 0 && (
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "12px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span
                    style={{
                      background: "#dcfce7",
                      color: "#166534",
                      padding: "4px 10px",
                      borderRadius: "12px",
                      fontSize: "12px",
                      fontWeight: 600,
                    }}
                  >
                    ✓ {parsedData.length} records ready to import
                  </span>
                  <span style={{ fontSize: "12px", color: "#666" }}>
                    File: <strong style={{ color: "#111" }}>{file?.name}</strong>
                  </span>
                </div>

                <button
                  onClick={resetModal}
                  disabled={importing}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    background: "none",
                    border: "none",
                    color: "#dc2626",
                    fontSize: "12px",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  <RefreshCw size={12} /> Choose another file
                </button>
              </div>

              {/* Data Preview Table */}
              <div
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "4px",
                  overflowX: "auto",
                  maxHeight: "260px",
                  background: "#fff",
                }}
              >
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
                  <thead>
                    <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                      <th style={{ padding: "8px 12px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>#</th>
                      {headers.map((h) => (
                        <th key={h} style={{ padding: "8px 12px", textAlign: "left", color: "#334155", fontWeight: 600 }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {parsedData.slice(0, 5).map((row, idx) => (
                      <tr key={idx} style={{ borderBottom: "1px solid #f1f5f9" }}>
                        <td style={{ padding: "8px 12px", color: "#94a3b8" }}>{idx + 1}</td>
                        {headers.map((h) => (
                          <td
                            key={h}
                            style={{
                              padding: "8px 12px",
                              color: "#1e293b",
                              maxWidth: "200px",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {String(row[h] || "—")}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {parsedData.length > 5 && (
                <div style={{ fontSize: "11px", color: "#888", marginTop: "6px", textAlign: "right" }}>
                  Showing preview of first 5 of {parsedData.length} records...
                </div>
              )}
            </div>
          )}

          {/* Import Result Notification */}
          {importResult && (
            <div
              style={{
                marginTop: "16px",
                padding: "14px 18px",
                borderRadius: "4px",
                background: importResult.success ? "#f0fdf4" : "#fef2f2",
                border: `1px solid ${importResult.success ? "#bbf7d0" : "#fecaca"}`,
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {importResult.success ? (
                  <CheckCircle2 size={18} color="#16a34a" />
                ) : (
                  <AlertCircle size={18} color="#dc2626" />
                )}
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: importResult.success ? "#15803d" : "#b91c1c",
                  }}
                >
                  {importResult.message || (importResult.success ? "Import completed successfully!" : "Import failed.")}
                </span>
              </div>

              {importResult.errors && importResult.errors.length > 0 && (
                <div style={{ fontSize: "12px", color: "#991b1b", marginTop: "4px" }}>
                  <div style={{ fontWeight: 600, marginBottom: "2px" }}>Failed Rows:</div>
                  <ul style={{ margin: 0, paddingLeft: "20px" }}>
                    {importResult.errors.map((err, i) => (
                      <li key={i}>
                        Row {err.row}: {err.name} — {err.error}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div
          style={{
            padding: "16px 24px",
            background: "#f9fafb",
            borderTop: "1px solid #e5e7eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "12px",
          }}
        >
          <button
            onClick={onClose}
            disabled={importing}
            style={{
              padding: "8px 18px",
              background: "#ffffff",
              border: "1px solid #d1d5db",
              color: "#374151",
              fontSize: "13px",
              fontWeight: 500,
              borderRadius: "3px",
              cursor: "pointer",
            }}
          >
            {importResult?.success ? "Close" : "Cancel"}
          </button>

          {parsedData.length > 0 && !importResult?.success && (
            <button
              onClick={handleImport}
              disabled={importing}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 22px",
                background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                color: "#ffffff",
                border: "none",
                fontSize: "13px",
                fontWeight: 600,
                borderRadius: "3px",
                cursor: importing ? "not-allowed" : "pointer",
                boxShadow: "0 2px 4px rgba(37, 99, 235, 0.2)",
              }}
            >
              {importing ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Importing to Database...
                </>
              ) : (
                <>
                  <Upload size={15} />
                  Confirm & Import {parsedData.length} Items
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
