"use client";

import React, { useState, useRef } from "react";

interface ImageUploadInputProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  placeholder?: string;
  folder?: string;
}

export default function ImageUploadInput({
  value,
  onChange,
  label,
  placeholder = "Upload image or paste URL",
  folder = "arizonaintl",
}: ImageUploadInputProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file (PNG, JPG, WEBP, SVG)");
      return;
    }

    // Check size limit (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("Image size exceeds 10MB limit");
      return;
    }

    setError(null);
    setUploading(true);

    try {
      // Convert file to base64
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result as string;
        try {
          const res = await fetch("/api/upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ image: base64, folder }),
          });

          const data = await res.json();
          if (data.success && data.url) {
            onChange(data.url);
          } else {
            setError(data.error || "Upload failed. Please try again.");
          }
        } catch {
          setError("Network error while uploading image.");
        } finally {
          setUploading(false);
        }
      };

      reader.onerror = () => {
        setError("Failed to read file.");
        setUploading(false);
      };

      reader.readAsDataURL(file);
    } catch {
      setError("Unexpected error.");
      setUploading(false);
    }
  };

  return (
    <div style={{ marginBottom: 16 }}>
      {label && (
        <label
          style={{
            display: "block",
            fontSize: 11,
            fontWeight: 600,
            color: "#555",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            marginBottom: 6,
          }}
        >
          {label}
        </label>
      )}

      {/* Hidden native file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      {/* Image Preview / Upload Box */}
      {value ? (
        <div
          style={{
            border: "1px solid #e0e0e0",
            background: "#fafafa",
            padding: 12,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <img
            src={value}
            alt="Preview"
            style={{
              width: 100,
              height: 70,
              objectFit: "cover",
              border: "1px solid #ddd",
              background: "#fff",
              flexShrink: 0,
            }}
          />

          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: 11,
                color: "#666",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                marginBottom: 8,
                fontFamily: "monospace",
              }}
              title={value}
            >
              {value}
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                style={{
                  padding: "5px 12px",
                  background: "#fff",
                  border: "1px solid #ccc",
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: uploading ? "not-allowed" : "pointer",
                  color: "#333",
                }}
              >
                {uploading ? "Uploading..." : "Replace Image"}
              </button>

              <button
                type="button"
                onClick={() => onChange("")}
                disabled={uploading}
                style={{
                  padding: "5px 12px",
                  background: "#fff",
                  border: "1px solid #ffcccc",
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: "pointer",
                  color: "#c00",
                }}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            border: "1px dashed #ccc",
            background: "#fafafa",
            padding: "20px 16px",
            textAlign: "center",
            cursor: uploading ? "not-allowed" : "pointer",
            transition: "border-color 0.2s",
          }}
          onClick={() => {
            if (!uploading) fileInputRef.current?.click();
          }}
        >
          {uploading ? (
            <div style={{ color: "#2563eb", fontSize: 13, fontWeight: 600 }}>
              ⏳ Uploading to Cloudinary... Please wait
            </div>
          ) : (
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#111", marginBottom: 4 }}>
                📁 Click to Upload from Computer
              </div>
              <div style={{ fontSize: 11, color: "#888" }}>
                Supports PNG, JPG, JPEG, WEBP (Max 10MB)
              </div>
            </div>
          )}
        </div>
      )}

      {error && (
        <div
          style={{
            color: "#c00",
            fontSize: 11,
            marginTop: 6,
            padding: "4px 8px",
            background: "#fff0f0",
            border: "1px solid #ffcccc",
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
}
