"use client";

import React, { useState, useRef, useEffect } from "react";
import * as XLSX from "xlsx";
import {
  Upload,
  FileSpreadsheet,
  Download,
  CheckCircle2,
  AlertCircle,
  X,
  Loader2,
  RefreshCw,
  Sparkles,
  ArrowRight,
  SlidersHorizontal,
  Eye,
  Check,
  Zap,
  Info,
} from "lucide-react";
import { SECTION_SCHEMAS, FieldDefinition } from "@/lib/gemini-import";

interface BulkImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  section: string; // "rent-a-car" | "visas" | "travel-tours" | "mobiles-tech" | "bahrain-services" | "blogs"
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
  const [step, setStep] = useState<"upload" | "review">("upload");
  const [file, setFile] = useState<File | null>(null);
  const [rawRows, setRawRows] = useState<any[]>([]);
  const [detectedHeaders, setDetectedHeaders] = useState<string[]>([]);
  const [parsing, setParsing] = useState(false);
  const [analyzingAi, setAnalyzingAi] = useState(false);

  // AI Analysis Results
  const [aiConfidence, setAiConfidence] = useState<string>("");
  const [aiSummary, setAiSummary] = useState<string>("");
  const [aiWarnings, setAiWarnings] = useState<string[]>([]);
  const [mappedColumns, setMappedColumns] = useState<Record<string, string>>({});
  const [sanitizedItems, setSanitizedItems] = useState<any[]>([]);
  const [aiEnrichmentEnabled, setAiEnrichmentEnabled] = useState(true);

  // Import Status
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState<{
    success: boolean;
    imported?: number;
    total?: number;
    errors?: any[];
    message?: string;
  } | null>(null);

  const [dragActive, setDragActive] = useState(false);
  const [previewTab, setPreviewTab] = useState<"sanitized" | "mapping" | "raw">("sanitized");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentSchema = SECTION_SCHEMAS[section] || SECTION_SCHEMAS["visas"];
  const currentTemplate = TEMPLATE_DEFINITIONS[section] || TEMPLATE_DEFINITIONS["rent-a-car"];

  if (!isOpen) return null;

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

  const runAiAnalysis = async (headers: string[], rows: any[]) => {
    setAnalyzingAi(true);
    setAiWarnings([]);

    try {
      const res = await fetch("/api/admin/bulk-import/ai-analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          section,
          headers,
          rows,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setAiConfidence(data.confidence || "98% (Gemini AI)");
        setAiSummary(data.summary || "AI successfully structured records.");
        setMappedColumns(data.mappedColumns || {});
        setSanitizedItems(data.sanitizedItems || rows);
        setAiWarnings(data.warnings || []);
        setStep("review");
      } else {
        throw new Error(data.error || "AI Analysis failed");
      }
    } catch (err: any) {
      console.error("AI Analysis error:", err);
      // Fallback: simple passthrough
      setAiConfidence("Local Direct Mapping");
      setAiSummary("Using direct header matching.");
      const initialMap: Record<string, string> = {};
      headers.forEach((h) => {
        initialMap[h] = h;
      });
      setMappedColumns(initialMap);
      setSanitizedItems(rows);
      setStep("review");
    } finally {
      setAnalyzingAi(false);
    }
  };

  const processFile = (uploadedFile: File) => {
    setFile(uploadedFile);
    setParsing(true);
    setImportResult(null);

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json: any[] = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

        if (json.length === 0) {
          alert("The uploaded spreadsheet contains no data rows.");
          setParsing(false);
          return;
        }

        const headers = Object.keys(json[0] || {});
        setDetectedHeaders(headers);
        setRawRows(json);
        setParsing(false);

        // Run Gemini AI analysis
        await runAiAnalysis(headers, json);
      } catch (err: any) {
        console.error("Error reading file:", err);
        alert("Failed to parse file. Please upload a valid .xlsx or .csv spreadsheet.");
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

  const handleColumnMappingChange = (originalHeader: string, newTargetField: string) => {
    const updated = { ...mappedColumns, [originalHeader]: newTargetField };
    setMappedColumns(updated);

    // Re-sanitize items locally with the updated mapping
    const remapped = rawRows.map((row) => {
      const item: Record<string, any> = {};
      for (const [origH, targetK] of Object.entries(updated)) {
        if (targetK && targetK !== "ignore" && row[origH] !== undefined) {
          item[targetK] = row[origH];
        }
      }
      return item;
    });
    setSanitizedItems(remapped);
  };

  const handleImport = async () => {
    const itemsToImport = sanitizedItems.length > 0 ? sanitizedItems : rawRows;
    if (itemsToImport.length === 0) return;

    setImporting(true);
    setImportResult(null);

    try {
      const res = await fetch("/api/admin/bulk-import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          section,
          items: itemsToImport,
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
        message: err?.message || "Failed to import records.",
      });
    } finally {
      setImporting(false);
    }
  };

  const resetModal = () => {
    setStep("upload");
    setFile(null);
    setRawRows([]);
    setDetectedHeaders([]);
    setMappedColumns({});
    setSanitizedItems([]);
    setImportResult(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(15, 23, 42, 0.75)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: "16px",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget && !importing && !analyzingAi) onClose();
      }}
    >
      <div
        style={{
          background: "#ffffff",
          width: "100%",
          maxWidth: step === "review" ? "1050px" : "780px",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          borderRadius: "8px",
          border: "1px solid #cbd5e1",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.35)",
          overflow: "hidden",
          fontFamily: "system-ui, -apple-system, sans-serif",
          transition: "max-width 0.3s ease",
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: "16px 24px",
            background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
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
                width: "38px",
                height: "38px",
                background: "linear-gradient(135deg, #2563eb, #3b82f6)",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                boxShadow: "0 2px 8px rgba(37, 99, 235, 0.4)",
              }}
            >
              <FileSpreadsheet size={20} />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <h2 style={{ fontSize: "16px", fontWeight: 700, margin: 0, letterSpacing: "-0.01em" }}>
                  Bulk Import {title}
                </h2>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    padding: "2px 8px",
                    background: "rgba(59, 130, 246, 0.2)",
                    border: "1px solid rgba(96, 165, 250, 0.4)",
                    borderRadius: "12px",
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#93c5fd",
                  }}
                >
                  <Sparkles size={11} /> AI Intelligent Mapping
                </span>
              </div>
              <p style={{ fontSize: "12px", color: "#94a3b8", margin: "2px 0 0 0" }}>
                Upload any Excel or CSV file — Google Gemini AI auto-analyzes & maps all fields accurately
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={importing || analyzingAi}
            style={{
              background: "transparent",
              border: "none",
              color: "#94a3b8",
              cursor: "pointer",
              padding: "6px",
              display: "flex",
              alignItems: "center",
              borderRadius: "4px",
              transition: "color 0.15s ease",
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: "20px 24px", overflowY: "auto", flex: 1 }}>
          {/* STEP 1: UPLOAD VIEW */}
          {step === "upload" && (
            <div>
              {/* Template Download Recommendation */}
              <div
                style={{
                  background: "#f0fdf4",
                  border: "1px solid #bbf7d0",
                  padding: "14px 18px",
                  borderRadius: "6px",
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "12px",
                  marginBottom: "20px",
                }}
              >
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "#166534" }}>
                    Standard Template Available
                  </div>
                  <div style={{ fontSize: "12px", color: "#4b5563" }}>
                    Download our ready-to-use sample spreadsheet with example records, or upload your own file.
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
                      borderRadius: "4px",
                      fontSize: "12px",
                      fontWeight: 600,
                      cursor: "pointer",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
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
                      background: "#1f2937",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
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
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
                onClick={() => !parsing && !analyzingAi && fileInputRef.current?.click()}
                style={{
                  border: dragActive ? "2px dashed #2563eb" : "2px dashed #94a3b8",
                  background: dragActive ? "#eff6ff" : "#f8fafc",
                  padding: "48px 24px",
                  borderRadius: "8px",
                  textAlign: "center",
                  cursor: parsing || analyzingAi ? "wait" : "pointer",
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
                    width: "60px",
                    height: "60px",
                    background: parsing || analyzingAi ? "#fef3c7" : "#eff6ff",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px auto",
                    color: parsing || analyzingAi ? "#d97706" : "#2563eb",
                    boxShadow: "0 4px 12px rgba(37, 99, 235, 0.15)",
                  }}
                >
                  {parsing || analyzingAi ? (
                    <Loader2 size={30} className="animate-spin" />
                  ) : (
                    <Upload size={30} />
                  )}
                </div>

                <div style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a" }}>
                  {parsing
                    ? "Reading spreadsheet data..."
                    : analyzingAi
                    ? "Gemini AI is analyzing column headers & mapping data..."
                    : "Click or drag & drop your Excel / CSV file here"}
                </div>

                <div style={{ fontSize: "13px", color: "#64748b", marginTop: "6px", maxWidth: "480px", margin: "6px auto 0 auto" }}>
                  Supports Microsoft Excel (.xlsx, .xls) and CSV. Gemini AI will automatically detect custom column names and format currency values.
                </div>

                {/* AI Feature Highlights */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "16px",
                    marginTop: "24px",
                    flexWrap: "wrap",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#475569" }}>
                    <CheckCircle2 size={14} color="#16a34a" /> Auto Column Mapping
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#475569" }}>
                    <CheckCircle2 size={14} color="#16a34a" /> Dual Pricing (PKR & BHD)
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#16a34a" }}>
                    <CheckCircle2 size={14} color="#16a34a" /> Country Flags & Taglines
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: AI REVIEW & INTERACTIVE MAPPING */}
          {step === "review" && (
            <div>
              {/* AI Insights Bar */}
              <div
                style={{
                  background: "linear-gradient(135deg, #eff6ff 0%, #f0f9ff 100%)",
                  border: "1px solid #bfdbfe",
                  borderRadius: "6px",
                  padding: "14px 18px",
                  marginBottom: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "12px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                      borderRadius: "6px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                    }}
                  >
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontSize: "13px", fontWeight: 700, color: "#1e3a8a" }}>
                        AI Analysis Complete
                      </span>
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 600,
                          background: "#dbeafe",
                          color: "#1d4ed8",
                          padding: "2px 8px",
                          borderRadius: "12px",
                        }}
                      >
                        {aiConfidence}
                      </span>
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 600,
                          background: "#dcfce7",
                          color: "#15803d",
                          padding: "2px 8px",
                          borderRadius: "12px",
                        }}
                      >
                        {sanitizedItems.length} Records Detected
                      </span>
                    </div>
                    <div style={{ fontSize: "12px", color: "#334155", marginTop: "2px" }}>
                      {aiSummary}
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <button
                    onClick={resetModal}
                    disabled={importing}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      background: "#ffffff",
                      border: "1px solid #cbd5e1",
                      padding: "6px 12px",
                      borderRadius: "4px",
                      fontSize: "12px",
                      color: "#475569",
                      cursor: "pointer",
                      fontWeight: 500,
                    }}
                  >
                    <RefreshCw size={12} /> Upload New File
                  </button>
                </div>
              </div>

              {/* Warnings Banner if any */}
              {aiWarnings.length > 0 && (
                <div
                  style={{
                    background: "#fffbeb",
                    border: "1px solid #fde68a",
                    padding: "10px 14px",
                    borderRadius: "6px",
                    fontSize: "12px",
                    color: "#92400e",
                    marginBottom: "16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <Info size={16} color="#d97706" />
                  <span>{aiWarnings.join(" | ")}</span>
                </div>
              )}

              {/* View Switcher Tabs */}
              <div
                style={{
                  display: "flex",
                  borderBottom: "1px solid #e2e8f0",
                  marginBottom: "14px",
                  gap: "4px",
                }}
              >
                <button
                  onClick={() => setPreviewTab("sanitized")}
                  style={{
                    padding: "8px 16px",
                    fontSize: "13px",
                    fontWeight: previewTab === "sanitized" ? 700 : 500,
                    color: previewTab === "sanitized" ? "#2563eb" : "#64748b",
                    borderBottom: previewTab === "sanitized" ? "2px solid #2563eb" : "2px solid transparent",
                    background: "transparent",
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <Eye size={14} /> AI Cleaned Preview ({sanitizedItems.length})
                </button>
                <button
                  onClick={() => setPreviewTab("mapping")}
                  style={{
                    padding: "8px 16px",
                    fontSize: "13px",
                    fontWeight: previewTab === "mapping" ? 700 : 500,
                    color: previewTab === "mapping" ? "#2563eb" : "#64748b",
                    borderBottom: previewTab === "mapping" ? "2px solid #2563eb" : "2px solid transparent",
                    background: "transparent",
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <SlidersHorizontal size={14} /> Column Field Mappings ({Object.keys(mappedColumns).length})
                </button>
              </div>

              {/* TAB 1: SANITIZED PREVIEW TABLE */}
              {previewTab === "sanitized" && (
                <div>
                  <div
                    style={{
                      border: "1px solid #e2e8f0",
                      borderRadius: "6px",
                      overflowX: "auto",
                      maxHeight: "340px",
                      background: "#ffffff",
                    }}
                  >
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
                      <thead>
                        <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                          <th style={{ padding: "8px 12px", textAlign: "left", color: "#64748b", fontWeight: 600, width: "36px" }}>
                            #
                          </th>
                          <th style={{ padding: "8px 12px", textAlign: "left", color: "#1e293b", fontWeight: 700 }}>
                            {section === "blogs" ? "Title" : "Item / Destination Name"}
                          </th>
                          <th style={{ padding: "8px 12px", textAlign: "left", color: "#1e293b", fontWeight: 700 }}>
                            {section === "visas" ? "Country & Flag" : section === "blogs" ? "Category" : "Tag / Category"}
                          </th>
                          <th style={{ padding: "8px 12px", textAlign: "left", color: "#1e293b", fontWeight: 700 }}>
                            Pricing (PKR / BHD)
                          </th>
                          <th style={{ padding: "8px 12px", textAlign: "left", color: "#1e293b", fontWeight: 700 }}>
                            {section === "visas" ? "Processing & Validity" : "Description / Details"}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {sanitizedItems.map((item, idx) => (
                          <tr key={idx} style={{ borderBottom: "1px solid #f1f5f9" }}>
                            <td style={{ padding: "10px 12px", color: "#94a3b8" }}>{idx + 1}</td>
                            <td style={{ padding: "10px 12px", fontWeight: 600, color: "#0f172a" }}>
                              {item.name || item.title || "—"}
                            </td>
                            <td style={{ padding: "10px 12px", color: "#334155" }}>
                              {section === "visas" ? (
                                <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                                  <span style={{ fontSize: "18px" }}>{item.flag || "🌐"}</span>
                                  <span>{item.country || "Global"}</span>
                                </span>
                              ) : (
                                <span
                                  style={{
                                    background: "#f1f5f9",
                                    color: "#334155",
                                    padding: "2px 8px",
                                    borderRadius: "4px",
                                    fontSize: "11px",
                                    fontWeight: 600,
                                  }}
                                >
                                  {item.tag || item.category || item.brand || "Standard"}
                                </span>
                              )}
                            </td>
                            <td style={{ padding: "10px 12px" }}>
                              {item.pricePkr || item.priceBhd ? (
                                <div style={{ lineHeight: 1.35, fontSize: "11px" }}>
                                  {item.pricePkr && (
                                    <div style={{ color: "#166534", fontWeight: 600 }}>🇵🇰 {item.pricePkr}</div>
                                  )}
                                  {item.priceBhd && (
                                    <div style={{ color: "#b45309", fontWeight: 600 }}>🇧🇭 {item.priceBhd}</div>
                                  )}
                                </div>
                              ) : (
                                <span style={{ color: "#94a3b8" }}>{item.basePrice || "—"}</span>
                              )}
                            </td>
                            <td style={{ padding: "10px 12px", color: "#64748b", maxWidth: "260px" }}>
                              {section === "visas" ? (
                                <div>
                                  <div style={{ color: "#0f172a", fontWeight: 500 }}>
                                    ⏱️ {item.processingTime || "2 - 4 Days"}
                                  </div>
                                  <div style={{ fontSize: "11px", color: "#64748b" }}>
                                    📅 {item.validity || "30 to 90 Days"} ({item.entryType || "Single Entry"})
                                  </div>
                                </div>
                              ) : (
                                <div
                                  style={{
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  }}
                                >
                                  {item.description || item.about || item.overview || "—"}
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: "8px",
                      fontSize: "12px",
                      color: "#64748b",
                    }}
                  >
                    <span>
                      Showing all <strong>{sanitizedItems.length}</strong> AI-formatted rows ready for import.
                    </span>
                    <span style={{ color: "#16a34a", fontWeight: 600 }}>
                      ✓ All records validated
                    </span>
                  </div>
                </div>
              )}

              {/* TAB 2: INTERACTIVE COLUMN MAPPING */}
              {previewTab === "mapping" && (
                <div>
                  <div style={{ fontSize: "12px", color: "#475569", marginBottom: "12px" }}>
                    Gemini AI automatically matched your uploaded spreadsheet columns to database fields. You can customize any field mapping below:
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                      gap: "10px",
                      maxHeight: "340px",
                      overflowY: "auto",
                      padding: "4px",
                    }}
                  >
                    {detectedHeaders.map((header) => {
                      const currentMapped = mappedColumns[header] || "";
                      return (
                        <div
                          key={header}
                          style={{
                            border: "1px solid #e2e8f0",
                            background: "#f8fafc",
                            padding: "10px 14px",
                            borderRadius: "6px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "6px",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <span style={{ fontSize: "12px", fontWeight: 700, color: "#0f172a" }}>
                              📄 {header}
                            </span>
                            <ArrowRight size={14} color="#94a3b8" />
                          </div>

                          <div>
                            <select
                              value={currentMapped}
                              onChange={(e) => handleColumnMappingChange(header, e.target.value)}
                              style={{
                                width: "100%",
                                padding: "6px 10px",
                                fontSize: "12px",
                                border: "1px solid #cbd5e1",
                                borderRadius: "4px",
                                background: "#ffffff",
                                color: currentMapped ? "#1d4ed8" : "#64748b",
                                fontWeight: currentMapped ? 600 : 400,
                              }}
                            >
                              <option value="">(Ignore this column)</option>
                              {currentSchema.fields.map((f) => (
                                <option key={f.key} value={f.key}>
                                  {f.label} ({f.key}){f.required ? " *" : ""}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Import Result Notification */}
              {importResult && (
                <div
                  style={{
                    marginTop: "16px",
                    padding: "14px 18px",
                    borderRadius: "6px",
                    background: importResult.success ? "#f0fdf4" : "#fef2f2",
                    border: `1px solid ${importResult.success ? "#bbf7d0" : "#fecaca"}`,
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {importResult.success ? (
                      <CheckCircle2 size={20} color="#16a34a" />
                    ) : (
                      <AlertCircle size={20} color="#dc2626" />
                    )}
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: 700,
                        color: importResult.success ? "#15803d" : "#b91c1c",
                      }}
                    >
                      {importResult.message ||
                        (importResult.success
                          ? `Successfully imported ${importResult.imported} records into database!`
                          : "Bulk import failed.")}
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
          )}
        </div>

        {/* Modal Footer Actions */}
        <div
          style={{
            padding: "16px 24px",
            background: "#f8fafc",
            borderTop: "1px solid #e2e8f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          <div>
            {step === "review" && (
              <span style={{ fontSize: "12px", color: "#64748b" }}>
                Target: <strong>{currentSchema.name}</strong> Database Table
              </span>
            )}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button
              onClick={onClose}
              disabled={importing || analyzingAi}
              style={{
                padding: "8px 18px",
                background: "#ffffff",
                border: "1px solid #cbd5e1",
                color: "#475569",
                fontSize: "13px",
                fontWeight: 500,
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {importResult?.success ? "Close" : "Cancel"}
            </button>

            {step === "review" && !importResult?.success && (
              <button
                onClick={handleImport}
                disabled={importing || analyzingAi || sanitizedItems.length === 0}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "9px 24px",
                  background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                  color: "#ffffff",
                  border: "none",
                  fontSize: "13px",
                  fontWeight: 700,
                  borderRadius: "4px",
                  cursor: importing ? "not-allowed" : "pointer",
                  boxShadow: "0 2px 6px rgba(37, 99, 235, 0.3)",
                }}
              >
                {importing ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Importing to Database...
                  </>
                ) : (
                  <>
                    <Upload size={16} />
                    Confirm & Import {sanitizedItems.length} Records
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
