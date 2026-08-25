"use client";

import React, { useState, useEffect, useRef } from "react";
import { LucideIcon, Loader2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export interface PlaceItem {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  flag: string;
  state?: string;
  display: string;
}

interface CountrySearchInputProps {
  label: string;
  value: string;
  onChange: (val: string, place?: PlaceItem) => void;
  placeholder: string;
  icon: LucideIcon;
  id?: string;
}

export default function CountrySearchInput({
  label,
  value,
  onChange,
  placeholder,
  icon: Icon,
  id,
}: CountrySearchInputProps) {
  const { isArabic } = useLanguage();
  const [results, setResults] = useState<PlaceItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Sync external value
  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

  // Fetch initial popular places on mount
  useEffect(() => {
    fetch("/api/places")
      .then((r) => r.json())
      .then((d) => {
        if (d.success && Array.isArray(d.results)) {
          setResults(d.results);
        }
      })
      .catch(() => {});
  }, []);

  // Fetch live places from API when user types
  const searchPlaces = (q: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (!q.trim()) {
      fetch("/api/places")
        .then((r) => r.json())
        .then((d) => {
          if (d.success && Array.isArray(d.results)) setResults(d.results);
        })
        .catch(() => {});
      return;
    }

    setLoading(true);
    timeoutRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/places?q=${encodeURIComponent(q.trim())}`);
        const data = await res.json();
        if (data.success && Array.isArray(data.results)) {
          setResults(data.results);
        } else {
          setResults([]);
        }
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 150);
  };

  // Handle outside click to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (place: PlaceItem) => {
    const displayName = `${place.flag} ${place.name}, ${place.country}`;
    setSearchTerm(displayName);
    onChange(displayName, place);
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchTerm(val);
    onChange(val);
    setIsOpen(true);
    searchPlaces(val);
  };

  return (
    <div
      ref={wrapperRef}
      className="relative p-3.5 rounded-2xl bg-[#f8f9fc] border border-neutral-200/80 hover:border-neutral-400 focus-within:border-neutral-900 transition-colors"
    >
      <label className="block text-[11px] font-normal uppercase tracking-wider text-neutral-500 mb-1">
        {label}
      </label>

      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-[#dfb141] shrink-0" />
        <input
          id={id}
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => {
            setIsOpen(true);
            if (!results.length) searchPlaces(searchTerm);
          }}
          className="w-full bg-transparent text-xs sm:text-sm font-normal text-neutral-900 focus:outline-none placeholder:text-neutral-400"
          placeholder={placeholder}
          autoComplete="off"
        />
        {loading && <Loader2 className="w-3.5 h-3.5 animate-spin text-[#dfb141] shrink-0" />}
      </div>

      {/* Autocomplete Dropdown List */}
      {isOpen && (
        <div
          className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 bg-white border border-neutral-200 rounded-2xl shadow-xl max-h-64 overflow-y-auto py-2 text-left"
          style={{ minWidth: 280 }}
        >
          {loading && results.length === 0 ? (
            <div className="px-4 py-3 text-xs text-neutral-400 text-center flex items-center justify-center gap-2">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-[#dfb141]" />
              <span>Searching worldwide cities & countries...</span>
            </div>
          ) : results.length === 0 ? (
            <div className="px-4 py-3 text-xs text-neutral-400 text-center">
              No matching city or country found
            </div>
          ) : (
            results.map((place) => (
              <button
                key={place.id}
                type="button"
                onClick={() => handleSelect(place)}
                className="w-full px-3.5 py-2.5 flex items-center justify-between gap-3 text-xs sm:text-sm hover:bg-neutral-50 transition-colors text-neutral-800 cursor-pointer border-b border-neutral-100/60 last:border-none text-left"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-lg shrink-0">{place.flag}</span>
                  <div className="min-w-0">
                    <span className="font-semibold text-neutral-950 block truncate">
                      {place.name}
                    </span>
                    <span className="text-[11px] text-neutral-500 block truncate">
                      {place.state ? `${place.state}, ` : ""}{place.country}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider shrink-0">
                  {place.countryCode}
                </span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
