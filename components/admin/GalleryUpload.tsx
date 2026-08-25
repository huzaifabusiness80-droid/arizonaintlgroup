"use client";

import React, { useState, useRef } from "react";

interface GalleryUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
  folder?: string;
}

export default function GalleryUpload({
  images,
  onChange,
  folder = "arizonaintl/gallery",
}: GalleryUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setError(null);
    setUploading(true);

    const newUrls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith("image/")) continue;

      try {
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64, folder }),
        });

        const data = await res.json();
        if (data.success && data.url) {
          newUrls.push(data.url);
        }
      } catch (err) {
        console.error("Gallery upload error:", err);
      }
    }

    if (newUrls.length > 0) {
      onChange([...images, ...newUrls]);
    } else {
      setError("Failed to upload selected images. Please check file sizes.");
    }

    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeImage = (index: number) => {
    onChange(images.filter((_, idx) => idx !== index));
  };

  return (
    <div style={{ marginBottom: 20 }}>
      {/* Hidden Multi-file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFiles}
        style={{ display: "none" }}
      />

      {/* Grid of gallery images */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
          gap: 12,
          marginBottom: 12,
        }}
      >
        {images.map((url, i) => (
          <div
            key={i}
            style={{
              position: "relative",
              border: "1px solid #e0e0e0",
              background: "#fff",
              height: 100,
              overflow: "hidden",
            }}
          >
            <img
              src={url}
              alt={`Gallery ${i + 1}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />

            <button
              type="button"
              onClick={() => removeImage(i)}
              style={{
                position: "absolute",
                top: 4,
                right: 4,
                background: "rgba(0,0,0,0.75)",
                color: "#fff",
                border: "none",
                width: 22,
                height: 22,
                cursor: "pointer",
                fontSize: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
              }}
              title="Remove photo"
            >
              ×
            </button>
          </div>
        ))}

        {/* Add photo card button */}
        <div
          onClick={() => {
            if (!uploading) fileInputRef.current?.click();
          }}
          style={{
            border: "1px dashed #ccc",
            background: "#fafafa",
            height: 100,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            cursor: uploading ? "not-allowed" : "pointer",
            padding: 8,
            textAlign: "center",
          }}
        >
          {uploading ? (
            <div style={{ fontSize: 11, color: "#c9a227", fontWeight: 600 }}>
              ⏳ Uploading...
            </div>
          ) : (
            <>
              <span style={{ fontSize: 18, marginBottom: 2 }}>+</span>
              <span style={{ fontSize: 11, color: "#555", fontWeight: 600 }}>
                Upload Photos
              </span>
              <span style={{ fontSize: 9, color: "#999" }}>From Computer</span>
            </>
          )}
        </div>
      </div>

      {error && (
        <div
          style={{
            color: "#c00",
            fontSize: 11,
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
